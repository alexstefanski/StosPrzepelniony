var User = require('./../../models/index.js').User
var UserToken = require('./../../models/index.js').UserToken

var validate = require('validate.js')
var auth = require('basic-auth')

// Walidacja danych
module.exports.validation = function(request, response, next) {
  var constraints = {
    oldPassword: {
      presence: true,
      length: {minimum: 6, maximum: 255},
    },

    newPassword: {
      presence: true,
      length: {minimum: 6, maximum: 255},
    }
  }

  validate.async(request.body, constraints)
    .then(result => {
      next()
    })
    .catch(result => {
      result['messages'] = ['Coś poszło nie tak.']
      response.status(401).json(result)
    })
}

module.exports.main = function(request, response) {

  var authData = auth(request)

  User.findOne({
    where: {
      id: authData.name,
      $and: [
        { status: 1},
        { password: request.body.oldPassword }
      ]
    }
  })
  .then(user => {
    if(user != null) {
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
    } else {
      var responseObject = {
        oldPassword: ['Stare hasło jest nieprawidłowe.'],
        messages: ['Coś poszło nie tak.']
      }
      response.status(409).json(responseObject)
    }
  })
  .catch(errors => {
    console.log('Database error: connection is not established or table users does not exist.')
  })
}
