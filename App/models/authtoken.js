'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AuthToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        AuthToken.belongsTo(models.User,{
          foreignKey: 'userId'
         }); 
      }
  }
  AuthToken.init({
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AuthToken',
  });

  // This function generates a random 15 character token and
  // associates it with a new user
  
  AuthToken.generate = async function (userId) {
    
    let token = '';
    const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
    'abcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 15; i++) {
          token += possibleCharacters.charAt(
            Math.floor(Math.random() * possibleCharacters.length)
          );
        }

    const userToken = await AuthToken.create({token, userId});
  return userToken;
  }

  return AuthToken;
};