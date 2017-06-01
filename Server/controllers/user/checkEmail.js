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
module.exports.validation = function (request, response, next) {

  var constraints = {
    email: {
      presence: {
        message: 'Adres e-mail jest wymagany.'
      },

      email: {
        message: 'To nie przypomina adresu e-mail.'
      },

      uniqueEmail: true
    }
  }

  validate.async.options = {fullMessages: false}
  validate.async(request.body, constraints)
    .then(result => {
      next()
    })
    .catch(result => {
      result['messages'] = ['Coś poszło nie tak.']
      response.status(403).json(result)
    })

}

module.exports.main = function (request, response) {

  // Odpowiedź
  var responseObject = {
    messages: ['Adres e-mail jest dostępny.']
  }

  response.status(200).json(responseObject)
}
