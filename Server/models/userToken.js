var Sequelize = require('sequelize')
var sequelize = require('./../config/sequelize.js')

var UserToken = sequelize.define('user_token', {
  token: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },

  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
})

module.exports = UserToken
