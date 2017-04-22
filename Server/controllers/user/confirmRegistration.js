var User = require('./../../models/User.js')
var UserToken = require('./../../models/UserToken.js')

var moment = require('moment')
moment().format();

module.exports.validUserMiddleware = function(request, response, next) {

  User.findById(request.params.userId)
    .then(function(user) {

      if(user == null) {
        response.status(404).json()
      } else if ( user.status == 1 ) {
        response.status(405).json()
      } else {
        next()
      }

    })

}

module.exports.validTokenMiddleware = function(request, response, next) {

  UserToken.findAll({
    where: { userId: request.params.userId, status: 0 },
    order: [['createdAt', 'DESC']]
  })
    .then(function(userTokens) {

      if(userTokens.length != 0) {

        var tokenExpiresIn = 7
        var createdMoment = moment(userTokens[0].createdAt, "YYYY-MM-DD HH:mm:ss:SSS ZZ")

        if (userTokens[0].id != request.params.tokenId || userTokens[0].token != request.params.token) {
          response.status(406).json()
        } else if (createdMoment.add(tokenExpiresIn, 'days') < moment()) {
          response.status(408).json()
        } else {
          next()
        }

      } else {
        response.status(408).json()
      }
    })
}

module.exports.main = function(request, response) {

  User.findById(request.params.userId)
    .then(function(user) {

        user.update({ status: 1 })
          .then(function(user) {

            UserToken.findById(request.params.tokenId)
              .then(function(userToken) {

                userToken.update({ status: 1 })
                  .then(function(userToken) {

                    response.status(204).json()

                  })

              })

          })

    })

}
