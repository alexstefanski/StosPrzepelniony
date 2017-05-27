var User = require('./../../../models/index.js').User

module.exports.main = function(request, response) {
  let usersList = new Array()

  User
    .findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password']
      }
    })
    .then(function(users) {
      if (users != null) {
        users.forEach((user) => {
          let userObj = new Object()

          // obiekt zawierający informacje o konkretnym użytkowniku
          userObj.userId = user.dataValues.id
          userObj.firstName = user.dataValues.firstName
          userObj.lastName = user.dataValues.lastName
          userObj.email = user.dataValues.email
          userObj.status = user.dataValues.status

          usersList.push(userObj)
        }) // koniec forEach

        // zwrócenie listy pobranych użytkowników
        response.status(200).json(usersList)
      } else {
        // brak użytkowników w bazie
        response.sendStatus(404)
      } // koniec if
    })
}
