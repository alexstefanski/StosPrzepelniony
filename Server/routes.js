// API for user/users
var usersPublic = require('./controllers/user/index.js')

// API for admin/admins
var admins = require('./controllers/admin/admins/index.js')
// API for admin/users
var users = require('./controllers/admin/users/index.js')
// API for admin/permissions
var permissions = require('./controllers/admin/permissions/index.js')
// API for admin/actions
var actions = require('./controllers/admin/actions/index.js')
// API for admin/ads
var ad = require('./controllers/admin/ads/index.js')

var categoryCreate  = require('./controllers/category/create.js')
var categoryRead = require('./controllers/category/read.js')
var categoryUpdate  = require('./controllers/category/update.js')
var categoryDelete =  require('./controllers/category/delete.js')


var messageList = require('./controllers/message/list.js')
var showMessages = require('./controllers/message/show.js')
var sendMessage = require('./controllers/message/create.js')

var adCreate  = require('./controllers/ad/create.js')
var adInfo  = require('./controllers/ad/info.js')
var adEdit  = require('./controllers/ad/edit.js')
var adStatusChange  = require('./controllers/ad/statusChange.js')
var adDelete  = require('./controllers/ad/delete.js')
var adList = require('./controllers/ad/list.js')

// Common middlewares
var authenticatedUser = require('./middlewares/authenticatedUser.js')
var isAdministrator = require('./middlewares/isAdministrator.js')
var isAllowed = require('./middlewares/isAllowed.js')

module.exports = function(app) {

  app.get('/', function(request, response) {
    response.send('Hello world from server!')
  })

  // Routes for user/users
  app.use('/users/register', usersPublic.register.validate)
  app.use('/users/register', usersPublic.register.validateEmailUnique)
  app.post('/users/register', usersPublic.register.main)

  app.use('/users/:userId/register/confirm/:tokenId/:token', usersPublic.confirmRegistration.basicValidation)
  app.use('/users/:userId/register/confirm/:tokenId/:token', usersPublic.confirmRegistration.userExistsValidation)
  app.use('/users/:userId/register/confirm/:tokenId/:token', usersPublic.confirmRegistration.userInactiveValidation)
  app.use('/users/:userId/register/confirm/:tokenId/:token', usersPublic.confirmRegistration.correctTokenValidation)
  app.use('/users/:userId/register/confirm/:tokenId/:token', usersPublic.confirmRegistration.liveTokenValidation)
  app.get('/users/:userId/register/confirm/:tokenId/:token', usersPublic.confirmRegistration.main)

  app.use('/users/checkemail', usersPublic.checkEmail.validation);
  app.post('/users/checkemail', usersPublic.checkEmail.main);

  app.use('/users/resendverificationemail', usersPublic.resendConfirmRegistrationEmail.validation)
  app.use('/users/resendverificationemail', usersPublic.resendConfirmRegistrationEmail.exitingUserValidation)
  app.use('/users/resendverificationemail', usersPublic.resendConfirmRegistrationEmail.inactiveUserValidation)
  app.post('/users/resendverificationemail', usersPublic.resendConfirmRegistrationEmail.main)

  app.use('/users/login', usersPublic.login.validation)
  app.post('/users/login', usersPublic.login.main)

  app.use('/users/isLoggedIn', authenticatedUser.main)
  app.get('/users/isLoggedIn', usersPublic.isLoggedIn.main)

  app.use('/users/logout', authenticatedUser.main)
  app.post('/users/logout', usersPublic.logout.main)

  app.use('/users/:userId/info', authenticatedUser.main)
  app.use('/users/:userId/info', usersPublic.info.validation)
  app.use('/users/:userId/info', usersPublic.info.userExistsValidation)
  app.get('/users/:userId/info', usersPublic.info.main)

  app.use('/users/changepassword', authenticatedUser.main)
  app.use('/users/changepassword', usersPublic.changePassword.validation)
  app.use('/users/changepassword', usersPublic.changePassword.validOldPassword)
  app.post('/users/changepassword', usersPublic.changePassword.main)

  app.use('/users/resetpassword', usersPublic.resetPassword.basicValidation)
  app.use('/users/resetpassword', usersPublic.resetPassword.userAvalibleValidator)
  app.post('/users/resetpassword', usersPublic.resetPassword.main)

  app.use('/users/:userId/resetpassword/:tokenId/:token', usersPublic.confirmResetPassword.basicValidation)
  app.use('/users/:userId/resetPassword/:tokenId/:token', usersPublic.confirmResetPassword.userAvalibleValidator)
  app.use('/users/:userId/resetPassword/:tokenId/:token', usersPublic.confirmResetPassword.correctTokenValidator)
  app.use('/users/:userId/resetPassword/:tokenId/:token', usersPublic.confirmResetPassword.aliveTokenValidator)
  app.post('/users/:userId/resetpassword/:tokenId/:token', usersPublic.confirmResetPassword.main)

  app.use('/categories/list', authenticatedUser.main)
  app.get('/categories/list', categoryRead.main)

  // API for admin/categories
  app.use('/admin/categories/create', authenticatedUser.main)
  app.use('/admin/categories/create', isAdministrator.main)
  app.use('/admin/categories/create', isAllowed.main(7))
  app.post('/admin/categories/create',categoryCreate.main)

  app.use('/admin/categories/:categoryId/edit', authenticatedUser.main)
  app.use('/admin/categories/:categoryId/edit', isAdministrator.main)
  app.use('/admin/categories/:categoryId/edit', isAllowed.main(8))
  app.post('/admin/categories/:categoryId/edit', categoryUpdate.main)

  app.use('/admin/categories/:categoryId/delete', authenticatedUser.main)
  app.use('/admin/categories/:categoryId/delete', isAdministrator.main)
  app.use('/admin/categories/:categoryId/delete', isAllowed.main(9))
  app.delete('/admin/categories/:categoryId/delete', categoryDelete.main )

  app.use('/messages/list', authenticatedUser.main)
  app.get('/messages/list',messageList.main);

  app.use('/messages/:adId/:userIdSender', authenticatedUser.main)
  app.get('/messages/:adId/:userIdSender', showMessages.main)

  app.use('/messages/:adId/:userIdSender/send', authenticatedUser.main)
  app.post('/messages/:adId/:userIdSender/send', sendMessage.main)

  // Routes for admin/admins
  app.use('/admin/admins/add', authenticatedUser.main)
  app.use('/admin/admins/add', isAdministrator.main)
  app.use('/admin/admins/add', isAllowed.main(2))
  app.post('/admin/admins/add', admins.create.main)

  app.use('/admin/admins/:userId/isadmin', authenticatedUser.main)
  app.get('/admin/admins/:userId/isadmin', admins.isAdmin.main)

  app.use('/admin/admins/list', authenticatedUser.main)
  app.use('/admin/admins/list', isAdministrator.main)
  app.use('/admin/admins/list', isAllowed.main(1))
  app.get('/admin/admins/list', admins.list.main)

  app.use('/admin/admins/:adminId/info', authenticatedUser.main)
  app.use('/admin/admins/:adminId/info', isAdministrator.main)
  app.use('/admin/admins/:adminId/info', isAllowed.main(3))
  app.get('/admin/admins/:adminId/info', admins.info.main)

  app.use('/admin/admins/:adminId/edit', authenticatedUser.main)
  app.use('/admin/admins/:adminId/edit', isAdministrator.main)
  app.use('/admin/admins/:adminId/edit', isAllowed.main(4))
  app.post('/admin/admins/:adminId/edit', admins.edit.main)

  app.use('/admin/admins/:adminId/delete', authenticatedUser.main)
  app.use('/admin/admins/:adminId/delete', isAdministrator.main)
  app.use('/admin/admins/:adminId/delete', isAllowed.main(5))
  app.delete('/admin/admins/:adminId/delete', admins.delete.main)

  // Routes for admin/users
  app.use('/admin/users/list', authenticatedUser.main)
  app.use('/admin/users/list', isAdministrator.main)
  app.use('/admin/users/list', isAllowed.main(10))
  app.get('/admin/users/list', users.list.main)

  app.use('/admin/users/:userId/status', authenticatedUser.main)
  app.use('/admin/users/:userId/status', isAdministrator.main)
  app.use('/admin/users/:userId/status', isAllowed.main(11))
  app.use('/admin/users/:userId/status', users.editStatus.validate)
  app.post('/admin/users/:userId/status', users.editStatus.main)

  app.use('/admin/users/:userId/delete', authenticatedUser.main)
  app.use('/admin/users/:userId/delete', isAdministrator.main)
  app.use('/admin/users/:userId/delete', isAllowed.main(12))
  app.use('/admin/users/:userId/delete', users.delete.validate)
  app.delete('/admin/users/:userId/delete', users.delete.main)

  // Routes for admin/permissions
  app.use('/admin/permissions/list', authenticatedUser.main)
  app.use('/admin/permissions/list', isAdministrator.main)
  app.use('/admin/permissions/list', isAllowed.main(16))
  app.get('/admin/permissions/list', permissions.list.main)

  app.use('/admin/permissions/:permissionId/info', authenticatedUser.main)
  app.use('/admin/permissions/:permissionId/info', isAdministrator.main)
  app.use('/admin/permissions/:permissionId/info', isAllowed.main(17))
  app.get('/admin/permissions/:permissionId/info', permissions.info.main)

  app.use('/admin/permissions/add', authenticatedUser.main)
  app.use('/admin/permissions/add', isAdministrator.main)
  app.use('/admin/permissions/add', isAllowed.main(18))
  app.post('/admin/permissions/add', permissions.add.main)

  app.use('/admin/permissions/:permissionId/delete', authenticatedUser.main)
  app.use('/admin/permissions/:permissionId/delete', isAdministrator.main)
  app.use('/admin/permissions/:permissionId/delete', isAllowed.main(20))
  app.use('/admin/permissions/:permissionId/delete', permissions.delete.permissionExistsValidation)
  app.use('/admin/permissions/:permissionId/delete', permissions.delete.hasNoAdministratorsValidation)
  app.delete('/admin/permissions/:permissionId/delete', permissions.delete.main)

  app.use('/admin/permissions/:permissionId/edit', authenticatedUser.main)
  app.use('/admin/permissions/:permissionId/edit', isAdministrator.main)
  app.use('/admin/permissions/:permissionId/edit', isAllowed.main(19))
  app.use('/admin/permissions/:permissionId/edit', permissions.edit.basicValidation)
  app.use('/admin/permissions/:permissionId/edit', permissions.edit.permissionExistsValidation)
  app.post('/admin/permissions/:permissionId/edit', permissions.edit.main)

  // Routes for admin/actions
  app.use('/admin/actions/:actionId/info', authenticatedUser.main)
  app.use('/admin/actions/:actionId/info', isAdministrator.main)
  app.use('/admin/actions/:actionId/info', isAllowed.main(22))
  app.use('/admin/actions/:actionId/info', actions.info.actionExistsValidation)
  app.get('/admin/actions/:actionId/info', actions.info.main)

  app.use('/admin/actions/list', authenticatedUser.main)
  app.use('/admin/actions/list', isAdministrator.main)
  app.use('/admin/actions/list', isAllowed.main(21))
  app.get('/admin/actions/list', actions.list.main)

  // Routes for admin/ads
  app.use('/admin/ads/:adId/status', authenticatedUser.main)
  app.use('/admin/ads/:adId/status', isAdministrator.main)
  app.use('/admin/ads/:adId/status', isAllowed.main(14))
  app.use('/admin/ads/:adId/status', ad.editStatus.validate)
  app.post('/admin/ads/:adId/status', ad.editStatus.main)

  app.use('/admin/ads/list', authenticatedUser.main)
  app.use('/admin/ads/list', isAdministrator.main)
  app.use('/admin/ads/list', isAllowed.main(13))
  app.get('/admin/ads/list', ad.list.main)

  app.use('/admin/ads/:adId/delete', authenticatedUser.main)
  app.use('/admin/ads/:adId/delete', isAdministrator.main)
  app.use('/admin/ads/:adId/delete', isAllowed.main(15))
  app.delete('/admin/ads/:adId/delete', ad.delete.main)

  //Routes for user/ads
  app.use('/ads/add',authenticatedUser.main)
  app.use('/ads/add',adCreate.validate)
  app.post('/ads/add', adCreate.main)

  app.use('/ads/:adId/edit',authenticatedUser.main)
  app.use('/ads/:adId/edit', adEdit.validate)
  app.post('/ads/:adId/edit', adEdit.main)

  app.use('/ads/:adId/status',authenticatedUser.main)
  app.use('/ads/:adId/status', adStatusChange.validate)
  app.post('/ads/:adId/status', adStatusChange.main)

  app.use('/ads/:adId/delete',authenticatedUser.main)
  app.delete('/ads/:adId/delete', adDelete.main)

  app.get('/ads/:adId/info', adInfo.main)

  app.get('/ads/list', adList.main)
};
