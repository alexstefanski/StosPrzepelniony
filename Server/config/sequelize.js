var databaseName = 'database'

var databaseUser = 'root'

var databasePassword = ''

var databaseHost = 'localhost'

var databaseDialect = 'sqlite'

var databaseStorage = 'database.sqlite'

var Sequelize = require('sequelize')

var databaseObject = new Sequelize(databaseName, databaseUser, databasePassword, {
  host: databaseHost,
  dialect: databaseDialect,
  storage: databaseStorage
})

module.exports = databaseObject
