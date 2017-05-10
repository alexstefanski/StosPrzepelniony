var Admin = require('./../../../models/index.js').Admin
var Permission = require('./../../../models/index.js').Permission
var isPermissionExist = require('./helpers/isPermissionExist').main

module.exports.main = function(request, response) {
  let _adminId = request.params.adminId
  let _permissionId = request.body.permissionId

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
              response.sendStatus(201)
            })
          } else {
            // nie ma takiego permissionId
            response.status(406).send({
              message: 'Nie można uaktualnić uprawnień',
              permissionId: 'Uprawnienie nie istnieje'
            })
          } // koniec if
        }) // koniec isPermissionExist
      } else {
        // nie ma takiego administratora
        response.status(406).send({
          message: 'Nie można uaktualnić uprawnień',
          adminId: 'Administrator nie istnieje'
        })
      } // koniec if
    }) // koniec then

} // koniec main
