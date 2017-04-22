var Sequelize = require('sequelize')
var sequelize = require('./../config/sequelize.js')

var UserToken = require('./UserToken')

var User = sequelize.define('user', {
  email: {
      type: Sequelize.STRING,
      unique: { msg: 'Ten adres e-mail jest już w użyciu'},
      allowNull: false,

      validate: {
          isEmail: { msg: 'To nie jest prawidłowy adres e-mail' },
          len: { args: [4, 255], msg: 'Adres e-mail może zawierać od 4 do 255 znaków.'},
        }
  },

  firstName: {
      type: Sequelize.STRING,
      allowNull: false,

      validate: {
        len: { args: [2, 255], msg: 'Imię może zawierać od 4 do 255 znaków.'},
      }
  },

  lastName: {
      type: Sequelize.STRING,
      allowNull: false,

      validate: {
        len: { args: [2, 255], msg: 'Nazwisko może zawierać od 4 do 255 znaków.'},
      }
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,

    validate: {
      len: { args: [6, 255], msg: 'Hasło może zawierać od 4 do 255 znaków.'},
    }
  },

  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,

    validate: {
      isInt: true,
      isIn: [[0, 1, 2]],
    }
  }
});

User.hasMany(UserToken, { foreignKey: 'userId', sourceKey: 'id' })

User.sync({ force: true }).then(function() {

  var first_names = ['Maria', 'Krystyna', 'Anna', 'Barbara', 'Teresa', 'Elżbieta', 'Janina', 'Zofia', 'Jadwiga', 'Danuta', 'Halina', 'Irena', 'Ewa', 'Małgorzata', 'Helena', 'Grażyna', 'Bożena', 'Stanisława', 'Jolanta'];
  var last_names = ['Nowak', 'Kowalska', 'Wiśniewska', 'Dąbrowska', 'Lewandowska', 'Wójcik', 'Kamińska', 'Kowalczyk', 'Zielińska', 'Szymańska', 'Woźniak', 'Kozłowska', 'Jankowska', 'Wojciechowska'];

  for (i = 0; i < 25; i++) {
    var randomFirstName = first_names[Math.floor(Math.random() * first_names.length)]
    var randomLastName = last_names[Math.floor(Math.random() * last_names.length)]
    var randomServer = Math.floor(Math.random() * 100000);

    var randomUser = {
      email: randomFirstName.toLowerCase() + '@' + randomServer + '.com',
      firstName: randomFirstName,
      lastName: randomLastName,
      password: 'qwerty',
      status: 1
    }

    User.create(randomUser)
  }

  console.log('User table created!')
})

module.exports = User
