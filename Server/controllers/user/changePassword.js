var User = require('./../../models/index.js').User

var validate = require('validate.js')
var auth = require('basic-auth')

// Własny walidator sprawdzający czy wprowadzone stare hasło użytkownika jest prawidłowe.
validate.validators.validOldPassword = function(value, options) {
  return new validate.Promise(function(resolve, reject) {
    User.findOne({
      where: {
        id: options.userId,
        password: value
      }
    })
      .then(response => {
        if(response != null) {
          resolve()
        } else {
          resolve('Stare hasło jest nieprawidłowe.')
        }
      })
      .catch(response => {
        console.log('Database error: connection is not established or table users does not exist.')
      })
  })
}

// Podstawowa walidacja przychodzących danych.
module.exports.validation = function(request, response, next) {

  var authData = auth(request)

  var constraints = {
    oldPassword: {
      presence: {
        message: 'Stare hasło jest wymagane.'
      },

      length: {
        minimum: 6,
        maximum: 255,
        message: 'Stare hasło musi zawierać od 6 do 255 znaków.'
      }
    },

    newPassword: {
      presence: {
        message: 'Nowe hasło jest wymagane.'
      },

      length: {
        minimum: 6,
        maximum: 255,
        message: 'Nowe hasło musi zawierać od 6 do 255 znaków.'
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

// Walidacja czy hasło użytkownika jest prawidłowe.
module.exports.validOldPassword = function(request, response, next) {

  var authData = auth(request)

  var constraints = {
    oldPassword: {
      validOldPassword: {
        userId: authData.name
      }
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

  var authData = auth(request)

  User.findOne({
    where: {
      id: authData.name,
      $and: [
        { status: 1 },
        { password: request.body.oldPassword }
      ]
    }
  })
    .then(user => {
      user.update({
        password: request.body.newPassword
      })
        .then(result => {
          var responseObject = {
            messages: ['Hasło zmienione pomyślnie.']
          }
          response.status(201).json(responseObject)
        })
        .catch(errors => {
          console.log('Database error: connection is not established or table users does not exist.')
        })
    })
    .catch(errors => {
      console.log('Database error: connection is not established or table users does not exist.')
    })
}
