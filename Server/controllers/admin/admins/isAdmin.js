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
        response.status(204).json()
      } else {
        // Użytkownik o podanym userId nie jest administratorem
        response.status(404).json({
          userId: 'Użytkownik nie jest administratorem'
        })
      } // koniec if
    }) // koniec then

} // koniec main
