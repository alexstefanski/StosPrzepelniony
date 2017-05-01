var User = require('./user.js')
var UserToken = require('./userToken.js')
var Admin = require('./admin.js')
var PermissionAction = require('./permissionAction.js')
var Action = require('./action.js')
var Permission = require('./permission.js')

User.hasMany(UserToken, {
  foreignKey: 'userId',
  sourceKey: 'id'
})

Admin.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id'
})

Admin.belongsTo(Permission, {
  foreignKey: 'permissionId',
  targetKey: 'id'
})

Permission.hasMany(Admin, {
  foreignKey: 'permissionId',
  sourceKey: 'id'
})

Permission.belongsToMany(Action, {
  through: 'permission_action',
  foreignKey: 'permissionId',
})

Action.belongsToMany(Permission, {
  through: 'permission_action',
  foreignKey: 'actionId',
})

module.exports.User = User
module.exports.UserToken = UserToken
module.exports.Admin = Admin
module.exports.Permission = Permission
module.exports.Action = Action
module.exports.PermissionAction = PermissionAction
