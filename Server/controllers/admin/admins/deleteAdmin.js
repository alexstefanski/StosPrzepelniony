var Admin = require('./../../../models/index.js').Admin

var auth = require('basic-auth')

module.exports.main = function(request, response) {
  let _adminId = request.params.adminId
  var _authData = auth(request)
  var _currentAdminId = _authData.name

  // sprawdzenie czy nie następuje próba usunięcia samego siebie
  if (_adminId == _currentAdminId) {
    response.status(403).json({
      message: 'Nie można usunąć administratora',
      adminId: 'Administrator nie może usunąć sam siebie'
    })
    return
  }

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

} // koniec main
