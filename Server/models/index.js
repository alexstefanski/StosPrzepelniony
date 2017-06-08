var User = require('./user.js')
var UserToken = require('./userToken.js')
var Admin = require('./admin.js')
var PermissionAction = require('./permissionAction.js')
var Action = require('./action.js')
var Permission = require('./permission.js')
var Ad = require('./ad.js')
var Category = require('./category.js')
var Message = require('./message.js')
var MessageList = require('./messageList.js')

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

User.hasMany(Ad,{
  foreignKey: 'userId'
})

Ad.belongsTo(User,{
  foreignKey: 'userId'
})
Ad.belongsTo(Category,{
  foreignKey: 'categoryId'
})
Message.belongsTo(Ad,{
  foreignKey: 'adId'
})
MessageList.belongsTo(Ad,{
  foreignKey: 'adId'
})



module.exports.User = User
module.exports.UserToken = UserToken
module.exports.Admin = Admin
module.exports.Permission = Permission
module.exports.Action = Action
module.exports.PermissionAction = PermissionAction
module.exports.Ad = Ad
module.exports.Category = Category
module.exports.Message = Message
module.exports.MessageList = MessageList