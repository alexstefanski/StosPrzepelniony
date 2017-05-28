var User = require('./../../models/index.js').User
var UserToken = require('./../../models/index.js').UserToken

var auth = require('basic-auth')

module.exports.main = function(request, response) {

  var authData = auth(request)

  UserToken.findOne({
    where: {
      token: authData.pass,
      $and: [
        { status: 10, userId: authData.name }
      ]
    }
  })
  .then(function(userToken) {
    if(userToken != null) {
      userToken.destroy()
      response.status(204).json(null)
    } else {
      response.status(404).json(null)
    }
  }, function(error) {
    response.status(422).json(null)
  })
}
