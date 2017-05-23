/**
 * Created by malasz on 5/23/17.
 */


var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize.js');

var Message = sequelize.define('message',
    {
        messageId:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        adId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        userIdSender: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    });

module.exports = Message;