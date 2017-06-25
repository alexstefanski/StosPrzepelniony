var Permission = require('./../../../models/index.js').Permission
var PermissionAction = require('./../../../models/index.js').PermissionAction

var isPermissionExist = require('./helpers/isPermissionExist.js').main
var isActionsExist = require('./helpers/isActionsExist.js').main


module.exports.main = function(request, response) {
  let _permissionName = request.body.name
  let _actionIds = new Array()
  request.body.actions.map(i => _actionIds.push(i.actionId))

  isPermissionExist(_permissionName, (err, res) => {
    if (res == null) {
      isActionsExist(_actionIds, (err, res) => {
        if (res != null) {
          // Tworzenie nowego dostępu
          createPermissionAction(_permissionName, _actionIds, response)
        } else {
          response.status(406).json({
            message: 'Nie można utworzyć nowego dostępu',
            actions: 'Przynajmniej jedna akcja nie istnieje'
          })
        }
      }) // koniec isActionsExist
    } else {
      response.status(406).json({
        message: 'Nie można utworzyć nowego dostępu',
        name: 'Podane uprawnienie już istnieje'
      })
    } // koniec if
  }) // koniec isPermissionExist

} // koniec main

function createPermissionAction(permissionName, actionIds, response) {
  Permission
    .create({name: permissionName})
    .then(function(addedPermission) {
        var permissionActions = new Array()
        actionIds.forEach(id => {
            permissionActions.push({permissionId: addedPermission.id, actionId: id})
        })

        PermissionAction
          .bulkCreate(permissionActions)
          .then(function(result) {
            if (result != null) {
              response.status(201).json()
            } else {
              response.status(400).json({
                message: 'Coś poszło nie tak'
              })
            }
          }) //koniec then

    }) // koniec then

} // koniec createPermissionAction
