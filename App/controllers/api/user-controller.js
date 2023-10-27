const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const withAuth = require('../../middleware/custom-auth-middleware')

// Grab the User & AuthToken models from the models folder,
const { User, AuthToken } = require('../../models');

/* Register Route 
========================================================= */
router.post('/register', async (req, res) => {
  // create a new user with the password hash from bcrypt
  // we are never storing plain text passwords. This is crucial
  // for keeping your db clean of sensitive data
  try {
    const newUser = req.body;
    const salt = await bcrypt.genSalt(10);
    // hash the password from 'req.body' and save to newUser
    newUser.password = await bcrypt.hash(req.body.password, salt);

    //create a new user with the password hash from bcrypt
    //using separate class for attributes
    let createdUser = await User.create(newUser);
    // It will be an object with the user and it's authtoken
    let userToken = await AuthToken.generate(createdUser.id);
    // save { user, token } as an object

    // send back the newUser and authtoken to the client { user, authtoken }
    return res.status(200).json({ User: createdUser, AuthToken: userToken });
  } catch (err) {
    res.status(400).json(err);
  }
});

/* Login Route
========================================================= */
router.post('/login', async (req, res) => {

  const { username, password } = req.body.data;
  // if the username / password is missing, we use status code 400
  // indicating a bad request was made and send back a message
  if (!username || !password) {
    return res.status(400).send(
      'Request missing username or password param'
    );
  }
  try {
    // this is the user authenticate method in the next section
    //let user = await User.authenticate(username, password)
    const userData = await User.findOne({ where: { username },
      include: [{ model: AuthToken }]
    });
    const user = userData.get({plain:true});
    // bcrypt is a one-way hashing algorithm that allows us to
    // store strings on the database rather than the raw password
    if (bcrypt.compareSync(password, user.password)) {
      return res.json({ user, useridToken: user.AuthToken.token });
    }
   
  } catch (err) {
    return res.status(400).send('invalid username or password');
  }
});

/* Logout Route
========================================================= */
router.delete('/logout', withAuth, async (req, res) => {
  // because the logout request needs to be send with
  // authorization we should have access to the user
  // on the req object, so we will try to find it and
  // call the model method logout
  const { user, cookies: { auth_token: authToken } } = req
  // we only want to attempt a logout if the user is
  // present in the req object, meaning it already
  // passed the authentication middleware. There is no reason
  // the authToken should be missing at this point, check anyway
  if (user && authToken) {
    //await req.user.logout(authToken);
    return res.status(200).send('sucessfully logout!')
  }

  // if the user missing, the user is not logged in, hence we
  // use status code 400 indicating a bad request was made
  return res.status(400).send(
    { errors: [{ message: 'not authenticated' }] }
  );
});

// export the router so we can pass the routes to our server
module.exports = router;