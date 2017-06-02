var Admin = require('./../../../models/index.js').Admin
var Permission = require('./../../../models/index.js').Permission
var Action = require('./../../../models/index.js').Action

module.exports.main = function(request, response) {
  let _permissionId = request.params.permissionId
  let _permissionName = request.params.name
  let _actionId = request.params.actionId

  Permission
    .findOrCreate({
      where: {
        permissionId: _permissionId
      },
      defaults: {
        permissionName: _permissionName,
        actionId: _actionId
      },
      transaction: null
    })
    .spread(function(permission, created) {
      if (created) {
        // Pomyślnie utworzono
        response.sendStatus(201)
      } else {
        // istnieje w bazie
        response.status(406).send({
          message: `Nie można utworzyć uprawnienia`,
          permissionId: `Takie uprawnienie już istnieje`
        })
      } // koniec if
    }) // koniec spread

}
