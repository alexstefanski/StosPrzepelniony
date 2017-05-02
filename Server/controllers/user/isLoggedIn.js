var User = require('./../../models/index.js').User
var UserToken = require('./../../models/index.js').UserToken

var auth = require('basic-auth')
var moment = require('moment')

module.exports.validBasicAuthHeader = function(request, response, next) {

  var authData = auth(request)

  if (typeof authData != 'undefined') {
    next()
  } else {
    response.status(404).json()
  }
}

module.exports.main = function (request, response) {

  var authData = auth(request)

  UserToken.findOne({
    where: {
      token: authData.pass,
      $and: [
        { status: 10, userId: authData.name }
      ]
    }
  })
  .then(function(userToken) {
    if(userToken != null) {

      var tokenExpiresIn = 31
      var createdMoment = moment(userToken.createdAt, "YYYY-MM-DD HH:mm:ss:SSS ZZ")

      // Check if token is live.
      if(createdMoment.add(tokenExpiresIn, 'days') > moment()) {
        response.status(204).json()
      } else {
        response.status(408).json()
      }
    } else {
      response.status(404).json()
    }
  }, function(response) {
    response.status(422).json()
  })
}
