var Permission = require('./../../../models/index.js').Permission
var Action = require('./../../../models/index.js').Action
var PermissionAction = require('./../../../models/index.js').PermissionAction

var validate = require('validate.js')

// Własny walidator sprawdzający czy pole jest tablicą zawierają id
// istniejących akcji.
validate.validators.isActionArray = function(value) {
	return new validate.Promise(function(resolve, reject) {

		if(!(value instanceof Array)) {
			resolve('Tablica akcji jest wymagana.')
		}

		if(value.length == 0) {
			resolve('Nie wybrano żadnej akcji.')
		}

		Action.findAll({
			attributes: ['id'],
			where: {
				id: value
			}
		})
			.then(response => {
				if(response.length == value.length) {
					resolve()
				} else {
					resolve('Niektóre z wybranych akcji nie istnieją.')
				}
			})
			.catch(response => {
				console.log('Database error: connection is not established or table actions does not exist.')
			})

	}
)}

// Własny walidator sprawdzajaczy czy uprawnienie istnieje na podstawie jego id.
validate.validators.permissionExistsById = function(value) {
	return new validate.Promise(function(resolve, reject) {

		Permission.findOne({
			attributes: ['id'],
			where: {
				id: value
			}
		})
			.then(response => {
				if(response != null) {
					resolve()
				} else {
					resolve('Uprawnienie o wybranym id nie istnieje.')
				}
			})
			.catch(response => {
				console.log('Database error: connection is not established or table permissions does not exist.')
			})
	})
}

module.exports.basicValidation = function(request, response, next) {

	var constraints = {
    name: {
      presence: {
        message: 'Nazwa uprawnienia jest wymagana.'
      },

	    length: {
        minimum: 2,
        maximum: 255,
        message: 'Nazwa uprawnienia musi zawierać od 2 do 255 znaków.'
      }
    },

		actions: {
			isActionArray: true
		}
  }

	validate.async.options = {fullMessages: false}
  validate.async(request.body, constraints)
    .then(result => {
      next()
    })
    .catch(result => {
			console.log(result)
      result['messages'] = ['Coś poszło nie tak.']
      response.status(406).json(result)
    })

}

module.exports.permissionExistsValidation = function(request, response, next) {

	var constraints = {
		permissionId: {
			permissionExistsById: true
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

	Permission.findOne({
		where: {
			id: request.params.permissionId
		},
		include: [Action]
	})
		.then(permission => {

			permission.update({
				name: request.body.name,
			})
				.then(updatedPermission => {

					// TODO: Aktualizacja akcji uprawnienia może zostać zoptymalizowana.

					// Usuwa wszytskie aktualnie zapisane akcje do uprawnienia.
					PermissionAction.destroy({
						where: {
							permissionId: permission.id
						}
					})
						.catch(errors => {
							console.log('Database error: connection is not established or table permission_action does not exist.')
						})

					// Zapisuje nowe akcje dla uprawnienia.
					newPermissionActions = []

					request.body.actions.forEach(function(actionId) {
						var permissionAction = {
							actionId: actionId,
							permissionId: permission.id
						}

						newPermissionActions.push(permissionAction)
					})

					PermissionAction.bulkCreate(newPermissionActions)
						.then(createdPermissionActions => {

							response.status(201).json({ messages: ['Uprawnienie zaktualizowane.']})

						})
						.catch(errors => {
							console.log('Database error: connection is not established or table permission_action does not exist.')
						})

				})
				.catch(error => {
					console.log(error)
					console.log('Database error: connection is not established or table permissions does not exist.')
				})

		})
		.catch(error => {
			console.log('Database error: connection is not established or table permissions does not exist.')
		})

}
