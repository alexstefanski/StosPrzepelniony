var Admin = require('./../../../models/index.js').Admin
var Permission = require('./../../../models/index.js').Permission
var isPermissionExist = require('./helpers/isPermissionExist').main

var auth = require('basic-auth')

module.exports.main = function(request, response) {
  let _adminId = request.params.adminId
  let _permissionId = request.body.permissionId

  var _authData = auth(request)
  var _currentUserId = _authData.name

  Admin
    .findOne({
      where: {
        userId: _currentUserId
      }
    })
    .then((currentAdmin) => {
      // sprawdzenie czy nie następuje próba edycji samego siebie
      if (+currentAdmin.id === +_adminId) {
        response.status(403).json({
          message: 'Nie można edytować uprawnienia',
          adminId: 'Nie można edytować własnego uprawnienia'
        })
      } else if (+_adminId === 1) {
        response.status(403).json({
          message: 'Nie można edytować uprawnienia',
          adminId: 'Nie można edytować uprawnienia głównego admina'
        })
      } else {
        // edycja uprawnień admina
        Admin
          .findOne({
            where: {
              id: _adminId
            }
          })
          .then(function(admin) {
            if (admin != null) {
              isPermissionExist(_permissionId, (err, res) => {
                if (res != null) {
                  admin.update({
                    permissionId: _permissionId
                  }).then(function() {
                    // uaktualniono pomyślnie uprawnienia
                    response.status(201).json()
                  })
                } else {
                  // nie ma takiego permissionId
                  response.status(406).json({
                    message: 'Nie można uaktualnić uprawnień',
                    permissionId: 'Uprawnienie nie istnieje'
                  })
                } // koniec if
              }) // koniec isPermissionExist
            } else {
              // nie ma takiego administratora
              response.status(406).json({
                message: 'Nie można uaktualnić uprawnień',
                adminId: 'Administrator nie istnieje'
              })
            } // koniec if
          }) // koniec then
      }
    })

} // koniec main
