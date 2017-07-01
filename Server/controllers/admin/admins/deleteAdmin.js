var Admin = require('./../../../models/index.js').Admin

var auth = require('basic-auth')

module.exports.main = function(request, response) {
  let _adminId = request.params.adminId
  var _authData = auth(request)
  var _currentUserId = _authData.name

  if (isNaN(_adminId)) {
    response.status(406).json({
      message: 'Nie można usunąć administratora',
      adminId: 'To nie wygląda jak id'
    })
    return
  } else if (isNaN(_currentUserId)) {
    response.status(406).json({
      message: 'Nie można usunąć administratora',
      currentAdminId: 'To nie wygląda jak id'
    })
    return
  }

  Admin
    .findOne({
      where: {
        userId: _currentUserId
      }
    })
    .then((currentAdmin) => {
      // sprawdzenie czy nie następuje próba usunięcia samego siebie
      if (+currentAdmin.id === +_adminId) {
        response.status(403).json({
          message: 'Nie można usunąć administratora',
          adminId: 'Administrator nie może usunąć sam siebie'
        })
      } else if (+_adminId === 1) {
        response.status(403).json({
          message: 'Nie można usunąć administratora',
          adminId: 'Nie wolno usunąć głównego administratora!'
        })
      } else {
         // usuwanie admina
          Admin
            .findOne({
              where: {
                id: _adminId
              }
            })
            .then(function(admin) {
              if (admin != null) {
                admin.destroy().then(function() {
                  // pomyślnie usunięto administratora
                  response.status(204).json()
                })
              } else {
                // administrator o podanym adminId nie istnieje
                response.status(406).json({
                  message: 'Nie można usunąć administratora',
                  adminId: 'Administrator nie istnieje'
                })
              } // koniec if
            }) // koniec then
      }

    }) // koniec then

} // koniec main
