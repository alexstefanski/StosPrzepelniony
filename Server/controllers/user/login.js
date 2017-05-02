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
    where: { email : request.body.email, $and: [{ status: 1}, { password: request.body.password }]}
  })
  .then(function (user) {
    if(user != null) {

      // Generating random token
      var token = "";
      var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i = 0; i < 32; i++ ) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      UserToken.create({
        token: token,
        status: 10,
        userId: user.id
      })
      .then(function (userToken) {

        var responseObject = {
          userId: user.id,
          sessionToken: userToken.token
        }

        return response.status(200).json(responseObject)
      })

    } else {
      response.status(404).json()
    }
  })
}
