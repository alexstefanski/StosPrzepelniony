var User = require('./../../../models/index.js').User
var Admin = require('./../../../models/index.js').Admin

var auth = require('basic-auth')

module.exports.main = function(request, response) {
  let _userId = request.params.userId
  var _authData = auth(request)
  var _currentAdminId = _authData.name

  getAdminUserId(_currentAdminId, (err, res) => {
    if (res != null) {
      // sprawdzenie czy admin nie usuwa sam siebie
      if (res != _userId) {

        User
          .findById(_userId)
          .then(function(user) {
            if (user != null) {
              user.destroy().then(function() {
                // pomyślnie usunięto użytkownika
                response.sendStatus(204)
              })
            } else {
              // użytkownik o podanym id nie istnieje
              response.status(404).send({
                message: 'Nie można usunąć użytkownika',
                userId: 'Użytkownik nie istnieje'
              })
            } // koniec if
          }) // koniec User.then

      } else {
        response.status(403).send({
          message: 'Nie można usunąć użytkownika',
          userId: 'Nie można usunąć samego siebie'
        })
      } // koniec if

    } else {
      response.status(404).send({
        message: 'Nie można usunąć użytkownika',
        adminId: 'Nie ma takiego administratora'
      })
    } // koniec if
  }) // koniec getAdminUserId

} // koniec main

function getAdminUserId(adminId, callback) {
  Admin
    .findOne({
      where: {
        id: adminId
      },
      attributes: {
        exclude: ['id', 'createdAt', 'updatedAt', 'permissionId']
      }
    })
    .then(function(admin) {
      if (admin != null) {
        callback(null, admin.dataValues.userId)
      } else {
        callback(null, null)
      }
    })
    .catch(error => callback(error, null))
}
