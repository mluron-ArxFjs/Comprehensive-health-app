const { User, AuthToken }= require('../models');
const util = require('util');

const withAuth = async function(req, res, next) {
  
  // Look for an authorization auth_token or header authorization in the cookies
  const token = req.cookies.auth_token || req.headers.authorization;
  console.log('cookie storage', util.inspect(token, {depth:5}))
  
  // If there is one, we attach it to the req object so any
  // following middleware or routing logic will have access to
  // the authenticated user.
  if (token) {
    // look for an auth token that matches the cookie
    const authToken = await AuthToken.findOne(
      { where: { token }, 
      include: [{ model: User }] }
    );
   
    // if there is an auth token found, we attach it's associated
    // user to the req object so we can use it in our routes
    if (authToken) {
      req.user = authToken.User;
    }
  }
  
  next();
}

module.exports = withAuth;