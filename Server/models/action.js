/*
 * Created by sowka on 29/04/17
 */

var Sequelize = require('sequelize')
var sequelize = require('./../config/sequelize.js')

var Action = sequelize.define('action', {
  name: {
    type: Sequelize.STRING,
    allowNull: 'Nazwa akcji nie może być pusta!'
  },

  description: {
    type: Sequelize.TEXT,
    allowNull: true
  }
})

module.exports = Action
