/**
 * Created by malasz on 4/24/17.
 */

var Sequelize = require('sequelize')
var sequelize = require('./../configs/sequelize.js')

var Category = sequelize.define('category',
    {
        categoryIdParent: {
            type: SEQUELIZE.INTEGER,
            validate: {
                isNull: {
                    msg: "Kategoria musi mieć ID rodzica lub wartość 0"
                }
            }
        },
        name: {
            type: SEQUELIZE.STRING,
            validate: {
                isNull: {
                    msg: "Nazwa kategorii nie może być pusta!"
                }
            }
        },
        description: {
            type: SEQUELIZE.TEXT,
            allowNull: true
        }

    });