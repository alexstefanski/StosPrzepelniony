var User = require('./../../models/index.js').User
var UserToken = require('./../../models/index.js').UserToken

var validate = require('validate.js')

module.exports.validation = function (request, response, next) {
  var constraints = {
    email: {
      presence: true,
      email: true
    }
  }

  validate.async(request.body, constraints)
    .then(result => {
      next()
    })
    .catch(result => {
      result['messages'] = ['Coś poszło nie tak.']

      response.status(404).json(result)
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
      var responseObject = {
        messages: ['Coś poszło nie tak.'],
        email: ['Adres e-mail nie istnieje lub został już aktywowany.']
      }
      response.status(409).json(responseObject)
    }
  })
}

module.exports.main = function(request, response) {

  User.findOne({
    where: {email: request.body.email}
  })
  .then(user => {

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
    .then(userToken => {

      var confirmEmailLink = "/users/" + userToken.userId + "/register/confirm/" + userToken.id + "/" + userToken.token

      // TODO: Sending email with confirm link.
      console.log('Confirm link for user ' + user.email + ': ', confirmEmailLink)

      var responseObject = {
        messages: ['Wiadomość z linkiem aktywacyjnym została ponownie wysłana na wskazany adres e-mail.', 'http:\/\/localhost:3000' + confirmEmailLink],
      }

      response.status(201).json(responseObject)
    })
    .catch(errors => {
      console.log('Database error: connection is not established or table userTokens does not exist.')
    })
  })
  .catch(errors => {
    console.log('Database error: connection is not established or table users does not exist.')
  })
}
