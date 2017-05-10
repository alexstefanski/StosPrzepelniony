var Admin = require('./../../../models/index.js').Admin
var Action = require('./../../../models/index.js').Action
var User = require('./../../../models/index.js').User
var Permission = require('./../../../models/index.js').Permission

module.exports.main = function(request, response) {
  let _adminId = request.params.adminId

  Admin
    .findOne({
      where: {
        id: _adminId
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      include: [{
        model: User,
        attributes: ['firstName', 'lastName', 'email']
      },
      {
        model: Permission,
        attributes: ['name'],
        include: [{
          model: Action,
          attributes: ['id', 'name', 'description']
        }]
      }]
    })
    .then(function(admin) {
      if (admin != null) {
        let adminObj = new Object()
        let user = admin.dataValues.user
        let permission = admin.dataValues.permission

        // obiekt zawierający informacje o konkretnych administratorze
        adminObj.adminId = _adminId
        adminObj.user = {
          userId: admin.dataValues.userId,
          firstName: user.dataValues.firstName,
          lastName: user.dataValues.lastName,
          email: user.dataValues.email
        }
        adminObj.permission = {
          permissionId: admin.dataValues.permissionId,
          name: permission.dataValues.name
        }

        // dodanie informacji o akcjach do jakich dany administrator ma dostęp
        let actions = new Array()
        permission.dataValues.actions.forEach((action) => {
          let actionObj =  {
            actionId: action.id,
            name: action.name,
            description: action.description
          }
          actions.push(actionObj)
        })
        // dodanie informacji o akcjach do obiektu administratora
        adminObj.actions = actions

        // zwrócenie informacji o konkretnym administratorze
        response.status(200).json(adminObj)
      } else {
        // administrator o podanym adminId nie istnieje
        response.status(404).send({
          message: 'Nie można wyświetlić informacji o administratorze',
          adminId: 'Administrator nie istnieje'
        })
      } // koniec if
    }) // koniec then

} // koniec main
