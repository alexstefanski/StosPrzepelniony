var User = require('./../../../models/index.js').User

var auth = require('basic-auth')
var validate = require('validate.js')

// Walidacja przychodzących danych
module.exports.validate = function(request, response, next) {
  var constraints = {
    status: {
      presence: {
        message: 'Status jest wymagany'
      },
      format: {
        pattern: '^[0-2]{1}$',
        message: 'Status może przyjmować jedynie wartości [0,1,2]'
      }
    },

    userId: {
      presence: {
        message: 'Id użytkownika jest wymagane'
      },
      format: {
        pattern: '[0-9]+',
        message: 'Id musi być liczbą'
      }
    }

  }

  const objToValidate = {
    status: request.body.status,
    userId: request.params.userId
  }

  validate.async.options = { fullMessages: false }
  validate.async(objToValidate, constraints)
    .then(result => {
      next()
    })
    .catch(result => {
      result['messages'] = ['Coś poszło nie tak.']
      response.status(406).json(result)
    })
}

module.exports.main = function(request, response) {
  let _userId = request.params.userId
  let _status = request.body.status

  var _authData = auth(request)
  var _currentUserId = _authData.name

  if (+_userId === +_currentUserId) {
      response.status(403).json({
        message: 'Nie można edytować statusu użytkownika',
        userId: 'Nie można edytować własnego status'
      })
      return
  }

  User
    .findOne({
      where: {
        id: _userId
      }
    })
    .then(function(user) {
      if (user != null) {
        user.update({
          status: _status
        }).then(function() {
          // uaktualniono pomyślnie status
          response.status(204).json()
        })
      } else {
        response.status(404).json({
          message: 'Nie można zaktualizować statusu użytkownika',
          userId: 'Podany użytkownik nie istnieje'
        })
      } // koniec if
    })
}
