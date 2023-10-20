// Import the connection object
var fs = require('fs');
var path = require('path');
const sequelize = require('../config/connection');
const { Sequelize } = require('sequelize');
const db = {};

// set a reference to this file's name so we can exclude it later
var basename = path.basename(__filename);

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully!');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

// This gathers up all the model files we have yet to create, and
// puts them onto our db object, so we can use them in the rest
// of our application

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    try {
      db[model.name] = model
    } catch (err) {
      console.error(err)
    }
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// These commands export sequelize connection
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;