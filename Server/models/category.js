/**
 * Created by malasz on 4/24/17.
 */

var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize.js');

var Category = sequelize.define('category',
    {
        categoryIdParent: {
            type: Sequelize.INTEGER,
            validate: {
                isNull: {
                    msg: "Kategoria musi mieć ID rodzica lub wartość 0"
                }
            }
        },
        name: {
            type: Sequelize.STRING,
            validate: {
                isNull: {
                    msg: "Nazwa kategorii nie może być pusta!"
                }
            }
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true
        }

    });

module.exports = Category;