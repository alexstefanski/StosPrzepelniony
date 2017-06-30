var Sequelize = require('sequelize')
var sequelize = require('./../config/sequelize.js')

var Ad = sequelize.define('ad',{
  userId:{
    type:Sequelize.INTEGER,
    allowNull:false
  },

  subject:{
    type: Sequelize.STRING,
    allowNull:false
  },

  content:{
    type: Sequelize.TEXT('LONG'),
    allowNull:false
  },

  costTotal:{
    type:Sequelize.FLOAT,
    allowNull:true,
    validate: {
      isFloat: true,
    }
  },

  costHour:{
    type:Sequelize.FLOAT,
    allowNull:true,
    validate: {
      isFloat: true
    }
  },

  status:{
    type:Sequelize.INTEGER,
    allowNull:false,
    defaultValue:0,
    validate: {
      isInt: true,
      isIn: [
        [0, 1, 2]
      ]
    }
  },

  date:{
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull:false
  },

  categoryId:{
    type:Sequelize.INTEGER,
    allowNull:false
  }
})

module.exports = Ad