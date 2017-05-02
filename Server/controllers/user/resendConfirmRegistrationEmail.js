var User = require('./../../models/index.js').User
var UserToken = require('./../../models/index.js').UserToken

var validate = require('validate.js')

module.exports.validEmail = function (request, response, next) {
  validate.async(request.body, {email: {email: true}})
    .then(function (success) {
      next()
    },
    function (error) {
      response.status(404).json()
    })
}

module.exports.belongsToInactiveUser = function(request, response, next) {
  User.findOne({
    where: { email: request.body.email, $and: [{ status: 0 }]}
  })
  .then(function (User) {
    if(User != null) {
      next()
    } else {
      response.status(409).json()
    }
  })
}

module.exports.main = function(request, response) {

  User.findOne({
    where: {email: request.body.email}
  })
  .then(function (user) {

    // Generating random token
    var token = "";
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i = 0; i < 16; i++ ) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    UserToken.create({
      token: token,
      status: 0,
      userId: user.id
    })
    .then(function (userToken) {

      var confirmEmailLink = "/users/" + userToken.userId + "/register/confirm/" + userToken.id + "/" + userToken.token

      // TODO: Sending email with confirm link.
      console.log('Confirm link for user ' + user.email + ': ', confirmEmailLink)

      response.status(204).json()
    })
  })
}
