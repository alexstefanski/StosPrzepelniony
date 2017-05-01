var databaseName = '12280081_sptmp';//'database'

var databaseUser = '12280081_sptmp';//'root'

var databasePassword = 'Stos2017$';//''

var databaseHost = 'serwer1384076.home.pl';//'localhost'

var databaseDialect = 'mysql';//'sqlite'

//var databaseStorage = 'database.sqlite'

var Sequelize = require('sequelize');

var databaseObject = new Sequelize(databaseName, databaseUser, databasePassword, {
  host: databaseHost,
  dialect: databaseDialect,
  define:{
    timestamps: false
  }
  //storage: databaseStorage
});

module.exports = databaseObject;
