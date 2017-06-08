/**
 * Created by malasz on 4/24/17.
 */

var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize.js');

var Category = sequelize.define('category',
    {
        categoryId:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true,
            allowNull: false
        },
        categoryIdParent: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false
        }

    }, {
        timestamps: false
    });

module.exports = Category;