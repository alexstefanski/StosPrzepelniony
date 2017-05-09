var User = require('./../models/index.js').User
var UserToken = require('./../models/index.js').UserToken
var Admin = require('./../models/index.js').Admin

var auth = require('basic-auth')
var moment = require('moment')

/**
 * Middleware sprawdza czy użytkownik jest adminem.
 */
module.exports.main = function(request, response, next) {

  var authData = auth(request)

  Admin.findOne({
    where: {
      userId: authData.name
    }
  }).then(function(admin) {
    if (admin != null) {
      next()
    } else {
      response.status(408).json()
    }
  })
}
