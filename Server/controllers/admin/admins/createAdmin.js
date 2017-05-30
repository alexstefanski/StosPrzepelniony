var Admin = require('./../../../models/index.js').Admin
var Permission = require('./../../../models/index.js').Permission
var isPermissionExist = require('./helpers/isPermissionExist.js').main
var isUserExist = require('./helpers/isUserExist.js').main

module.exports.main = function(request, response) {
  let _userId = request.body.userId
  let _permissionId = request.body.permissionId

  isUserExist(_userId, (err, res) => {
    if (res != null) {
      isPermissionExist(_permissionId, (err, res) => {
        if (res != null) {
          // próba tworzenia administratora
          createAdmin(_userId, _permissionId, response)
        } else {
          // Uprawnienie o podanym permissionId nie istnieje
          response.status(406).json({
            message: `Nie można utworzyć administratora`,
            permissionId: 'Uprawnienie nie istnieje'
          })
        } // koniec if
      }) // koniec isPermissionExist
    } else {
      // Użytkownik o podanym userId nie istnieje
      response.status(406).json({
        message: `Nie można utworzyć administratora`,
        userId: 'Użytkownik nie istnieje'
      })
    } // koniec if
  }) // koniec isUserExist

} // koniec main


function createAdmin(_userId, _permissionId, response) {

  Admin
    .findOrCreate({
      where: {
        userId: _userId
      },
      defaults: {
        userId: _userId,
        permissionId: _permissionId
      },
      transaction: null
    })
    .spread(function(admin, created) {
      if (created) {
        // Pomyślnie utworzono administratora
        response.sendStatus(201).json()
      } else {
        // Taki administrator już istnieje w bazie
        response.status(406).json({
          message: `Nie można utworzyć administratora`,
          userId: `Taki administrator już istnieje`
        })
      } // koniec if
    }) // koniec spread

} // koniec createAdmin
