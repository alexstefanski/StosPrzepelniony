var User = require('./../../models/index.js').User
var UserToken = require('./../../models/index.js').UserToken

module.exports.main = function(request, response) {

  User.create({
    email: request.body.email,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    password: request.body.password
  })
  .then(function(user) {

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
    .then(function(userToken) {

      var confirmEmailLink = "/users/" + userToken.userId + "/register/confirm/" + userToken.id + "/" + userToken.token

      // TODO: Sending email with confirm link.
      console.log('Confirm link for user ' + user.email + ': ', confirmEmailLink)

      response.status(201).json(confirmEmailLink)

    }, function(errors) {

      response.status(406).json()

    })

  }, function(errors) {

    var emailExists = false;

    errors.errors.forEach(function (error) {
      if(error.type == "unique violation") {
        emailExists = true
      }
    });

    if(emailExists) {
      response.status(409).json()
    } else {
      response.status(406).json()
    }

  })

}
