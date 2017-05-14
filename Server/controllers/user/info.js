var User = require('./../../models/index.js').User
var UserToken = require('./../../models/index.js').UserToken
var Admin = require('./../../models/index.js').Admin

module.exports.main = function(request, response) {

  User.findById(request.params.userId, {
    attributes: ['firstName', 'lastName', 'email'],
  })
    .then(function(user) {
      response.status(200).json(user)
    })
}
