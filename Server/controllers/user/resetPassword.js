var User = require('./../../models/index.js').User
var UserToken = require('./../../models/index.js').UserToken

var validate = require('validate.js')

var resetPasswordTokenLength = require('./../../config/userTokens.js').resetPasswordTokenLength

var resetPasswordWebAppUrl = require('./../../config/webAppUrls.js').resetPasswordWebAppUrl

// Własny walidator sprawdzający czy użytkownik jest aktywowany i nie
// zablokowany - status użytkownika wynosi 1.
validate.validators.isActivatedByEmail = function(value) {
  return new validate.Promise(function(resolve, reject) {

    User.findOne({
      where: {
        email: value,
        status: 1
      }
    })
      .then(user => {

        if(user != null) {
          resolve()
        } else {
          resolve('Konto tego użytkownika jest nieaktywowane lub zablokowane.')
        }

      })
      .catch(error => {
        console.log('Database error: connection is not established or table users does not exist.')
      })

  })
}

module.exports.basicValidation = function(request, response, next) {

  var constraints = {
    email: {
      presence: {
        message: 'Adres e-mail jest wymagany.'
      },
      email: {
        message: 'To nie przypomina adresu e-mail.'
      }
    }
  }

  validate.async.options = { fullMessages: false }
  validate.async(request.body, constraints)
    .then(success => {
      next()
    })
    .catch(error => {
      error['messages'] = ['Coś poszło nie tak.']
      response.status(403).json(error)
    })

}

module.exports.userAvalibleValidator = function(request, response, next) {

  var constraints = {
    email: {
      isActivatedByEmail: true
    }
  }

  validate.async.options = { fullMessages: false }
  validate.async(request.body, constraints)
    .then(success => {
      next()
    })
    .catch(error => {
      error['messages'] = ['Coś poszło nie tak.']
      response.status(409).json(error)
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

      for( var i = 0; i < resetPasswordTokenLength; i++ ) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      UserToken.create({
        token: token,
        status: 20,
        userId: user.id
      })
        .then(userToken => {

          var resetPasswordLink = resetPasswordWebAppUrl(userToken.userId, userToken.id, userToken.token)

          // TODO: Wysyłanie wiadomosci e-mail z linkiem zmiany hasła do konta.

          var responseObject = {
            messages: ['Na podany adres e-mail została wysłana wiadomość z linkem umożliwiającym zmiane hasła.', resetPasswordLink]
          }

          response.status(201).json(responseObject)

        })
        .catch(error => {
          console.log('Database error: connection is not established or table user_tokens does not exist.')
        })

    })
    .catch(error => {
      console.log('Database error: connection is not established or table users does not exist.')
    })

}
