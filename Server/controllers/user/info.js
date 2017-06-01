var User = require('./../../models/index.js').User

var validate = require('validate.js')

// Własny walidator sprawdzający czy użytkownik istnieje.
validate.validators.userExistsValidator = function(value) {
  return new validate.Promise(function(resolve, reject) {
    User.findOne({
      where: {
        id: value
      },
      attributes: ['id']
    })
    .then(result => {
      if(result != null) {
        resolve()
      } else {
        resolve('Użytkownik nie istnieje.')
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
    userId: {
      presence: {
        message: 'Id użytkownika jest wymagane.'
      },

      numericality: {
        onlyInteger: true,
        message: 'Id użytkownika musi być liczbą.'
      }
    },
  }

  validate.async.options = {fullMessages: false}
  validate.async(request.params, constraints)
    .then(result => {
      next()
    })
    .catch(result => {
      result['messages'] = ['Coś poszło nie tak.']
      response.status(404).json(result)
    })

}

// Walidacja czy użytkownik istnieje.
module.exports.userExistsValidation = function (request, response, next) {

  var constraints = {
    userId: {
      userExistsValidator: true
    }
  }

  validate.async.options = {fullMessages: false}
  validate.async(request.params, constraints)
    .then(result => {
      next()
    })
    .catch(result => {
      result['messages'] = ['Coś poszło nie tak.']
      response.status(404).json(result)
    })

}

module.exports.main = function(request, response) {

  User.findById(request.params.userId, {
    attributes: ['firstName', 'lastName', 'email'],
  })
    .then(user => {
      response.status(201).json(user)
    })
    .catch(result => {
      console.log('Database error: connection is not established or table users does not exist.')
    })

}
