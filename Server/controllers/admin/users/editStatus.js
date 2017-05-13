var User = require('./../../../models/index.js').User

module.exports.main = function(request, response) {
  let _statusList = [ 0 , 1 , 2 ]
  let _userId = request.params.userId
  let _status = request.body.status

  if (_statusList.indexOf(_status) <= -1) {
    response.status(406).send({
      message: 'Nie można zmienić statusu użytkownika',
      status: 'Podany status nie istnieje'
    })
    return
  }

  User
    .findOne({
      where: {
        id: _userId
      }
    })
    .then(function(user) {
      if (user != null) {
        user.update({
          status: _status
        }).then(function() {
          // uaktualniono pomyślnie status
          response.sendStatus(204)
        })
      } else {
        response.status(404).send({
          message: 'Nie można zaktualizować statusu użytkownika',
          userId: 'Podany użytkownik nie istnieje'
        })
      } // koniec if
    })
}
