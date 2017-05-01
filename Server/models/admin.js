/*
 * Created by sowka on 29/04/17
 */

var Sequelize = require('sequelize')
var sequelize = require('./../config/sequelize.js')

var Admin = sequelize.define('admin', {
  permissionId: {
    type: Sequelize.INTEGER,
    allowNull: 'ID uprawnień nie może być puste!'
  },

  userId: {
    type: Sequelize.INTEGER,
    allowNull: 'ID użytkownika nie może być puste!'
  }
})

module.exports = Admin
