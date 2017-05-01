var User = require('./../../models/index.js').User
var UserToken = require('./../../models/index.js').UserToken

var validate = require('validate.js')

module.exports.validEmail = function (request, response, next) {
  validate.async(request.body, {email: {email: true}})
    .then(function (success) {
      next()
    },
    function (error) {
      response.status(403).json()
    })
}

module.exports.main = function (request, response) {
  User.findOne({
    where: { email: request.body.email }
  })
    .then(function (user) {

      if(user != null ) {
        response.status(403).json()
      } else {
        response.status(204).json()
      }
    })
}
