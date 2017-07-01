var Admin = require('./../models/index.js').Admin
var Permission = require('./../models/index.js').Permission
var Action = require('./../models/index.js').Action

var auth = require('basic-auth')
var moment = require('moment')

/**
 * Middleware sprawdza czy uprawnienie które posiada ma dostęp do wybranej
 * akcji. Sprawdzenie dokonuje się na podstawie id akcji.
 */
module.exports.main = function(actionId) {
  return function(request, response, next) {

    var authData = auth(request)

    Admin.findOne({
      where: {
        userId: authData.name
      },
      include: [{
        model: Permission,
        include: [{
          model: Action,
          where: {
            id: actionId
          }
        }]
      }]
    }).then(function(admin) {
      if (admin != null) {
        next()
      } else {
        response.status(422).json({
          messages: 'Brak wystarczających uprawnień'
        })
      }
    })
  }
}
