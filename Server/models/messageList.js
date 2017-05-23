/**
 * Created by malasz on 5/23/17.
 */


var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize.js');

var MessagesList = sequelize.define('messagesList',
    {
        senderId:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        receiverId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        lastMessageId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        adId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        date: {
            type: Sequelize.DataTypes.TIME,
            allowNull: false
        }
    },
    {
        tableName:'messagesList'
    });

module.exports = MessagesList;