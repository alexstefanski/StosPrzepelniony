var User = require('./../models/User.js')
var validate = require('validate.js')

module.exports.register = function(request, response) {
  // --- Authentication ---
  // TODO: Here goes middlewares IsAutheticatedUser or IsAutheticatedAdministrator or HasPermission

  // --- Custom validation ---
  // Basic validation rules definde in User model

  // --- Database operations ---
  var creatingUserPromise = User.create({
    email: request.body.email,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    password: request.body.password
  })

  // --- Response ---
  creatingUserPromise
    .then(function(result) {

      // On success
      // TODO: Sending email to succesfully registerd user.
      response.status(201).json()
    }, function(result) {

      // On errors
      var errors = []

      // Preparing error messages
      result.errors.forEach(function (error) {
        var errorObject = {
          field: error.path,
          message: error.message
        }

        errors.push(errorObject)
      })

      response.status(406).json(errors)
    })
}
