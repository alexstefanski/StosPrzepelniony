var Admin = require('./../../../models/index.js').Admin

module.exports.main = function(request, response) {
  let userId = request.params.userId

  Admin
    .findOne({
      where: {
        userId: userId
      }
    })
    .then(function(admin) {
      if (admin != null) {
        // Użytkownik o podanym userId nie jest administratorem
        response.sendStatus(204)
      } else {
        // Użytkownik o podanym userId nie jest administratorem
        response.status(404).send({
          userId: 'Użytkownik nie jest administratorem'
        })
      } // koniec if
    }) // koniec then

} // koniec main
