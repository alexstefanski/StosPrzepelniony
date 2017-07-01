var User = require('./../models/user.js')
var UserToken = require('./../models/userToken.js')
var Admin = require('./../models/admin.js')
var Action = require('./../models/action.js')
var Permission = require('./../models/permission.js')
var PermissionAction = require('./../models/permissionAction.js')
var Ad = require('./../models/ad.js')
var Category = require('./../models/category.js')
var MessageList = require('./../models/messageList.js')
var Message = require('./../models/message.js')

var sequelize = require('./../config/sequelize.js')

User.sync({ force: true }).then(res => {
  // Stworzenie triggera który podczas usuwania usera usunie również
  // wszystkie jego ogłoszenia z tabeli ads
  sequelize.query(`CREATE TRIGGER DeleteUserAds
                    BEFORE DELETE
                        ON users
                  FOR EACH ROW
                  BEGIN
                      DELETE FROM ads
                            WHERE UserId = old.Id;
                  END;`)
})
UserToken.sync({ force: true })
Admin.sync({ force: true })
PermissionAction.sync({ force: true })
Action.sync({ force: true })
Permission.sync({ force: true }).then(res => {
  // Stworzenie triggera który podczas usuwania permission usunie rekordy
  // z permission_action gdzie permissionId jest równe id usuwanego permission
  sequelize.query(`CREATE TRIGGER DeletePermissionsActions
                    BEFORE DELETE
                        ON permissions
                  FOR EACH ROW
                  BEGIN
                      DELETE FROM permission_action
                            WHERE permissionId = old.id;
                  END;`)
})
Ad.sync({force: true })
Category.sync({force: true})
MessageList.sync({force:true})
Message.sync({force:true})
