/*
 * Created by sowka on 29/04/17
 */

 var Sequelize = require('sequelize');
 var sequelize = require('./../config/sequelize.js');

 var Permisson = require('./Permisson.js');
 var User = require('./User.js');

 var Admin = sequelize.define('admin',
     {
        permissionId: {
          type: Sequelize.INTEGER,
          validate: {
              isNull: {
                msg: "ID uprawnień nie może być puste!"
              }
          }
        },
        userId: {
          type: Sequelize.INTEGER,
          validate: {
              isNull: {
                msg: "ID użytkownika nie może być puste!"
              }
          }
        }

  });

// TODO
// dodać foreignKey

module.exports = Admin;
