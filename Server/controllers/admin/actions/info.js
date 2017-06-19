var Action = require('./../../../models/index.js').Action
var Permission = require('./../../../models/index.js').Permission

var validate = require('validate.js')

validate.validators.actionExistsById = function(value) {
  return new validate.Promise(function(resolve, reject) {

    Action.findOne({
      where: {
        id: value
      }
    })
      .then(action => {
        if(action != null) {
          resolve()
        } else {
          resolve('Akcja o wybranym id nie istnieje.')
        }
      })
      .catch(error => {
        console.log(error)
        console.log('Database error: connection is not established or table actions do not exist.')
      })

  })
}

module.exports.actionExistsValidation = function(request, response, next) {

  var constraints = {
    actionId: {
      actionExistsById: true
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

module.exports.main = function(request, response) {

  Action.findOne({
    where: {
      id: request.params.actionId
    },
    include: [Permission]
  })
    .then(action => {

      response.json(action)

    })
    .catch(error => {
      console.log('Database error: connection is not established or table actions do not exist.')
    })
}
