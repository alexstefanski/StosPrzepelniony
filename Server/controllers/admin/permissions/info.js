var Admin = require('./../../../models/index.js').Admin
var Action = require('./../../../models/index.js').Action
var User = require('./../../../models/index.js').User
var Permission = require('./../../../models/index.js').Permission

module.exports.main = function(request, response) {
  let _permissionId = request.params.permissionId

  Permission
        .findOne({
          where: {
            id: _permissionId
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          },
              include: [{
                model: Action,
                attributes: ['id', 'name', 'description'],
            },
            {
              model: Admin,
              attributes: ['id'],
              include: [{
                model: User,
                attributes: ['id', 'firstName', 'lastName', 'email']
            }]
          }]
        })
        .then(function(result) {
            response.json(result)
          })//koniec then
}//koniec main
