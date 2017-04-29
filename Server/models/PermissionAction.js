/*
 * Created by sowka on 29/04/17
 */

 var Sequelize = require('sequelize');
 var sequelize = require('./../config/sequelize.js');

 var Permission = require('./Permission.js');
 var Action = require('./Action.js');

 var PermissionAction = sequelize.define('permissionAction',
     {
        permissionId: {
          type: Sequelize.INTEGER,
          validate: {
              isNull: {
                msg: "ID uprawnień nie może być puste!"
              }
          }
        },
        actionId: {
          type: Sequelize.INTEGER,
          validate: {
              isNull: {
                msg: "ID akcji nie może być puste!"
              }
          }
        }

 });

 // TODO
 // dodać foreignKey

module.exports = PermissionAction;
