var User = require('./../../models/index.js').User
var UserToken = require('./../../models/index.js').UserToken

var validate = require('validate.js')

// Własny walidator sprawdzający czy adres e-mail jest unikalny.
validate.validators.uniqueEmail = function(value) {
  return new validate.Promise(function(resolve, reject) {
    User.findOne({
      where: {email: value},
      attributes: ['id']
    })
    .then(result => {
      if(result == null) {
        resolve()
      } else {
        resolve('Ten adres e-mail jest już w użyciu.')
      }
    })
    .catch(errors => {
      console.log('Database error: connection is not established or table users does not exist.')
    })
  })
}

// Walidacja przychodzących danych.
module.exports.validate = function(request, response, next) {
  var constraints = {
    email: {
      presence: {
        message: 'Adres e-mail jest wymagany.'
      },
      email: {
        message: 'To nie przypomina adresu e-mail.'
      },
      uniqueEmail: {
        message: 'Ten adres e-mail jest już w użyciu.'
      }
    },

    firstName: {
      presence: {
        message: 'Imię jest wymagane.'
      },
      length: {
        minimum: 4,
        maximum: 255,
        message: 'Imię musi zawierać od 4 do 255 znaków.'
      },
    },

    lastName: {
      presence: {
        message: 'Nazwisko jest wymagane.'
      },
      length: {
        minimum: 4,
        maximum: 255,
        message: 'Nazwisko musi zawierać od 4 do 255 znaków.'
      },
    },

    password: {
      presence: {
        message: 'Hasło jest wymagane.'
      },
      length: {
        minimum: 6,
        maximum: 255,
        message: 'Hasło musi zawierać od 6 do 255 znaków.'
      },
    }
  }

  validate.async.options = {fullMessages: false}
  validate.async(request.body, constraints)
    .then(result => {
      next()
    })
    .catch(result => {
      result['messages'] = ['Coś poszło nie tak.']
      response.status(406).json(result)
    })
}

module.exports.main = function(request, response) {

  User.create({
    email: request.body.email,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    password: request.body.password
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
      console.log('Confirm link for user ' + user.email + ': ', 'http:\/\/localhost:3000' + confirmEmailLink)

      response.status(201).json({ messages: ['Użytkownik zarejestrowany pomyślnie. Potwierdź konto linkiem aktywacyjnym przesłanym na podany adres e-mail', 'http:\/\/localhost:3000' + confirmEmailLink]  })

    })
    .catch(errors => {
      console.log('Database error: connection is not established or table userTokens does not exist.')
    })
  })
  .catch(errors => {
      console.log('Database error: connection is not established or table users does not exist.')
  })
}
