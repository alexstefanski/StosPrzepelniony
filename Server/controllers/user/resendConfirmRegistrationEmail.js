var User = require('./../../models/index.js').User
var UserToken = require('./../../models/index.js').UserToken

var validate = require('validate.js')

// Własny walidator sprawdzający czy adres e-mail użytkownika istnieje.
validate.validators.emailExistsValidator = function(value) {
  return new validate.Promise(function(resolve, reject) {
    User.findOne({
      where: {
        email: value
      },
      attributes: ['id']
    })
    .then(result => {
      if(result != null) {
        resolve()
      } else {
        resolve('Adres e-mail nie istnieje.')
      }
    })
    .catch(errors => {
      console.log('Database error: connection is not established or table users does not exist.')
    })
  })
}

// Własny walidator sprawdzający czy konto użytkownik jest jeszcze nie aktywowane.
validate.validators.inactiveUserValidatorByEmail = function(value) {
  return new validate.Promise(function(resolve, reject) {
    User.findOne({
      where: {
        email: value,
        status: 0
      },
      attributes: ['id']
    })
    .then(result => {
      if(result != null) {
        resolve()
      } else {
        resolve('Konto użytkownika zostało już aktywowane.')
      }
    })
    .catch(errors => {
      console.log('Database error: connection is not established or table users does not exist.')
    })
  })
}

module.exports.validation = function (request, response, next) {

  var constraints = {
    email: {
      presence: {
        message: 'Adres e-mail jest wymagany.'
      },

      email: {
        messages: 'To nie przypomina adresu e-mail.'
      },

      emailExistsValidator: true
    }
  }

  validate.async.options = {fullMessages: false}
  validate.async(request.body, constraints)
    .then(result => {
      next()
    })
    .catch(result => {
      result['messages'] = ['Coś poszło nie tak.']

      response.status(404).json(result)
    })
}

// Walidacja czy konto użytkownika nie jest jeszcze aktywowane.
module.exports.inactiveUserValidation = function(request, response, next) {

  var constraints = {
    email: {
      inactiveUserValidatorByEmail: true
    }
  }

  validate.async.options = {fullMessages: false}
  validate.async(request.body, constraints)
    .then(result => {
      next()
    })
    .catch(result => {
      result['messages'] = ['Coś poszło nie tak.']

      response.status(409).json(result)
    })

}

module.exports.main = function(request, response) {

  User.findOne({
    where: {
      email: request.body.email
    }
  })
  .then(user => {

    // Generating random token
    var token = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

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

      response.status(200).json(responseObject)
    })
    .catch(errors => {
      console.log('Database error: connection is not established or table userTokens does not exist.')
    })
  })
  .catch(errors => {
    console.log('Database error: connection is not established or table users does not exist.')
  })
}
