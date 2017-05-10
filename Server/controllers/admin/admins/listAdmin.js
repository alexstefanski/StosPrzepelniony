var Admin = require('./../../../models/index.js').Admin
var User = require('./../../../models/index.js').User
var Permission = require('./../../../models/index.js').Permission

module.exports.main = function(request, response) {
  let adminsList = new Array()

  Admin
    .findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      include: [{
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: Permission,
        attributes: ['name']
      }]
    })
    .then(function(admins) {
      if (admins != null) {
        admins.forEach((admin) => {
          let user = admin.dataValues.user
          let adminObj = new Object()

          // obiekt zawierający informacje o administratorze
          adminObj.adminId = admin.dataValues.id
          adminObj.user = {
            userId: user.dataValues.id,
            firstName: user.dataValues.firstName,
            lastName: user.dataValues.lastName
          }
          adminObj.permission = {
            permissionId: admin.dataValues.permissionId,
            name: admin.dataValues.permission.name
          }
          // dodanie obiektu z informacjami do listy administratorów
          adminsList.push(adminObj)
        }) // koniec forEach

        // zwrócenie listy pobranych administratorów
        response.status(200).json(adminsList)
      } else {
        // Lista administratorow jest pusta
        response.sendStatus(404)
      } // koniec if
    }) // koniec then

} // koniec main
