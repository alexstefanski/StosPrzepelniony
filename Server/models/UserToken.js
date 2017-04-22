var Sequelize = require('sequelize')
var sequelize = require('./../config/sequelize.js')

var UserToken = sequelize.define('user_token', {
  token: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,

    validate: {
      // size: function(value) {
      //   if(value.length != 512) {
      //     throw new Error('Token powinien zawierać 512 znaków.')
      //   }
      // }
    }
  },

  status: {
    type: Sequelize.INTEGER,
    allowNull: false,

    validate: {
      isInt: true,
      isIn: [[0, 1, 10, 20, 21]]
    }
  },

  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
})

UserToken.sync({ force: true}).then(function() {
  console.log('User token table created!')
})

module.exports = UserToken
