var User = require('./../models/index.js').User
var UserToken = require('./../models/index.js').UserToken

var auth = require('basic-auth')
var moment = require('moment')

/**
 * Middleware sprawdza czy żądanie zawiera nagłówek: Authorization typu Basic
 * wraz z danymi. Następnie weryfikuje ważność danych (userId, sessionToken):
 * 1. Sprawdza czy sessionToken należy do użytkownika.
 * 2. Sprawdza czy sessionToken jest jeszcze ważny.
 */
module.exports.main = function(request, response, next) {

  var authData = auth(request)

  if (typeof authData != 'undefined') {

    // Check if user token exists.
    UserToken.findOne({
      where: {
        token: authData.pass,
        $and: [{
          status: 10,
          userId: authData.name
        }]
      }
    }).then(function(userToken) {
      if (userToken != null) {

        var tokenExpiresIn = 31
        var createdMoment = moment(userToken.createdAt, "YYYY-MM-DD HH:mm:ss:SSS ZZ")

        // Check if token is live.
        if (createdMoment.add(tokenExpiresIn, 'days') > moment()) {
          next()
        } else {
          response.status(408).json()
        }
      } else {
        response.status(405).json()
      }
    }, function(response) {
      response.status(422).json()
    })
  } else {
    response.status(404).json()
  }
}
