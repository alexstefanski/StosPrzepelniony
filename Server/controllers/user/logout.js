var UserToken = require('./../../models/index.js').UserToken

var auth = require('basic-auth')

module.exports.main = function(request, response) {

  var authData = auth(request)

  UserToken.findOne({
    where: {
      token: authData.pass,
      status: 10,
      userId: authData.name
    }
  })
    .then(userToken => {

      userToken.destroy()
        .then(result => {

          var responseObject = {
            messages: ['Wylogowano pomyślnie.']
          }

          response.status(204).json(responseObject)
        })
        .catch(result => {
          console.log('Database error: connection is not established or table users toknes does not exist.')
        })

    })
    .catch(result => {
      console.log('Database error: connection is not established or table users toknes does not exist.')
    })

}
