// Import all the necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const path = require('path');
require('dotenv').config();

// Import our controllers/Routes
const routes = require('./controllers');

// Set up the Express App
const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({})

// Set up the sessions
const sess = {
  secret: process.env.SESS_SECRET,
  cookie: {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// To parse cookies from the HTTP Request
app.use(cookieParser());

// Set up the Route to get to the App homepage
app.use(express.static(__dirname + '/public'));

// Register `exphbs.engine` with the Express app.
//Sets our app to use the handlebars engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Express middleware that allows "POST" data 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// Hook up to our Routes / Controllers
app.use(routes);

// Sync our sequelize models and then start server, then we start the server.
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Listening for requests on http://localhost:${PORT} 🚀`));
});
