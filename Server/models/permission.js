/*
 * Created by sowka on 29/04/17
 */

var Sequelize = require('sequelize')
var sequelize = require('./../config/sequelize.js')

var Permission = sequelize.define('permission', {
  name: {
    type: Sequelize.STRING,
    allowNull: 'Nazwa uprawnienia nie może być pusta!'
  }
})

module.exports = Permission
