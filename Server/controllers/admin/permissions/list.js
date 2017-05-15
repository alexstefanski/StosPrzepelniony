var Permission = require('./../../../models/index.js').Permission

module.exports.main = function(request, response) {

let permissionsList = new Array()
  Permission
    .findAll({
      attributes: ['id', 'name']

    })
    .then(function(permissions){
      if(permissions != null) {
        permissions.forEach((permission) => {
          let permObj = new Object()

          //obiekt zwraca info o uprawnieniach
          permObj.permissionId = permission.dataValues.id
          permObj.name = permission.dataValues.name

          permissionsList.push(permObj)
        })//koniec forEach

        //zwrócenie listy pobranych uprawnień
        response.status(200).json(permissionsList)
      } else {
        response.sendStatus(404)

      }//koniec if else
    })//koniec .then

} // koniec main
