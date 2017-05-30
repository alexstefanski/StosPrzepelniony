var User = require('./../../../models/index.js').User
var Admin = require('./../../../models/index.js').Admin

var auth = require('basic-auth')
var validate = require('validate.js')

// Walidacja przychodzących danych
module.exports.validate = function(request, response, next) {
  var constraints = {

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

  validate.async.options = { fullMessages: false }
  validate.async(request.params, constraints)
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
  var _authData = auth(request)
  var _currentAdminId = _authData.name

  getAdminUserId(_currentAdminId, (err, res) => {
    if (res != null) {
      // sprawdzenie czy admin nie usuwa sam siebie
      if (res != _userId) {

        User
          .findById(_userId)
          .then(function(user) {
            if (user != null) {
              user.destroy().then(function() {
                // pomyślnie usunięto użytkownika
                response.status(204).json()
              })
            } else {
              // użytkownik o podanym id nie istnieje
              response.status(404).json({
                message: 'Nie można usunąć użytkownika',
                userId: 'Użytkownik nie istnieje'
              })
            } // koniec if
          }) // koniec User.then

      } else {
        response.status(403).json({
          message: 'Nie można usunąć użytkownika',
          userId: 'Nie można usunąć samego siebie'
        })
      } // koniec if

    } else {
      response.status(404).json({
        message: 'Nie można usunąć użytkownika',
        adminId: 'Nie ma takiego administratora'
      })
    } // koniec if
  }) // koniec getAdminUserId

} // koniec main

function getAdminUserId(adminId, callback) {
  Admin
    .findOne({
      where: {
        id: adminId
      },
      attributes: {
        exclude: ['id', 'createdAt', 'updatedAt', 'permissionId']
      }
    })
    .then(function(admin) {
      if (admin != null) {
        callback(null, admin.dataValues.userId)
      } else {
        callback(null, null)
      }
    })
    .catch(error => callback(error, null))
}
