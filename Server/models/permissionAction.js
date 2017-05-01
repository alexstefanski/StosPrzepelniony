/*
 * Created by sowka on 29/04/17
 */

var Sequelize = require('sequelize')
var sequelize = require('./../config/sequelize.js')

var PermissionAction = sequelize.define('permission_action', {
  permissionId: {
    type: Sequelize.INTEGER,
    allowNull: 'ID uprawnień nie może być puste!'
  },

  actionId: {
    type: Sequelize.INTEGER,
    allowNull: 'ID akcji nie może być puste!'
  }
}, {
  freezeTableName: true
})

module.exports = PermissionAction
