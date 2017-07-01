var Admin = require('./../../../models/index.js').Admin
var Permission = require('./../../../models/index.js').Permission
var Action = require('./../../../models/index.js').Action
var PermissionAction = require('./../../../models/index.js').PermissionAction

var validate = require('validate.js')

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

// Własny walidator sprawdzajacy czy do uprawnienia nie są przypisani
// administratorzy.
validate.validators.hasNoAdministrators = function(value) {
  return new validate.Promise(function(resolve, reject) {

    Permission.findOne({
  		where: {
  			id: value
  		},
  		include: [Admin]
  	})
      .then(permission => {
        if(permission.admins.length == 0) {
          resolve()
        } else {
          resolve('Do tego uprawnienia przypisany jest co najmniej jeden administrator.')
        }
      })
      .catch(error => {
        console.log('Database error: connection is not established or table permissions does not exist.')
      })
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
			console.log(result)
      result['messages'] = ['Coś poszło nie tak.']
      response.status(404).json(result)
    })

}

module.exports.hasNoAdministratorsValidation = function(request, response, next) {

  var constraints = {
    permissionId: {
      hasNoAdministrators: true
    }
  }

  validate.async.options = {fullMessages: false}
  validate.async(request.params, constraints)
    .then(result => {
      next()
    })
    .catch(result => {
      console.log(result)
      result['messages'] = ['Coś poszło nie tak.']
      response.status(403).json(result)
    })

}

module.exports.main = function(request, response) {

  Permission.destroy({
    where: {
      id: request.params.permissionId
    }
  })
    .then(deletedPermission => {

      response.status(201).json({ messages: 'Uprawnienie usunięte.'})

    })
    .catch(error => {
      console.log('Database error: connection is not established or table permissions does not exist.')
			response.status(400).json(error);
		})

}
