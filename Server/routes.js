// API for user/users
var usersPublic = require('./controllers/user/index.js')

// API for admin/admins
var admins = require('./controllers/admin/admins/index.js')
// API for admin/users
var users = require('./controllers/admin/users/index.js')
// API for admin/permissions
var permissions = require('./controllers/admin/permissions/index.js')
// API for admin/ads
var ad = require('./controllers/admin/ads/index.js')

var categoryCreate  = require('./controllers/category/create.js')
var categoryRead = require('./controllers/category/read.js')
var categoryUpdate  = require('./controllers/category/update.js')
var categoryDelete =  require('./controllers/category/delete.js')


var messageList = require('./controllers/message/list.js')

var adCreate  = require('./controllers/ad/create.js')
var adInfo  = require('./controllers/ad/info.js')
var adEdit  = require('./controllers/ad/edit.js')
var adStatusChange  = require('./controllers/ad/statusChange.js')
var adDelete  = require('./controllers/ad/delete.js')
var adList = require('./controllers/ad/list.js')

// Common middlewares
var authenticatedUser = require('./middlewares/authenticatedUser.js')
var isAdministrator = require('./middlewares/isAdministrator.js')

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

  app.use('/categories/list', authenticatedUser.main)
  app.use('/categories/list', isAdministrator.main)
  app.get('/categories/list', categoryRead.main)


  app.use('/categories/create', authenticatedUser.main)
  app.use('/categories/create', isAdministrator.main)
  app.post('/categories/create',categoryCreate.main)

  app.use('/categories/:categoryId/edit', authenticatedUser.main)
  app.use('/categories/:categoryId/edit', isAdministrator.main)
  app.post('/categories/:categoryId/edit', categoryUpdate.main)

  app.use('/categories/:categoryId/delete', authenticatedUser.main)
  app.use('/categories/:categoryId/delete', isAdministrator.main)
  app.delete('/categories/:categoryId/delete', categoryDelete.main )

  app.use('/messages/list', authenticatedUser.main)
  app.get('/messages/list',messageList.main);

  // Routes for admin/admins
  app.use('/api/v1/admins/add', authenticatedUser.main)
  app.use('/api/v1/admins/add', isAdministrator.main)
  app.post('/api/v1/admins/add', admins.create.main)

  app.use('/api/v1/admins/:userId/isadmin', authenticatedUser.main)
  app.get('/api/v1/admins/:userId/isadmin', admins.isAdmin.main)

  app.use('/api/v1/admins/list', authenticatedUser.main)
  app.use('/api/v1/admins/list', isAdministrator.main)
  app.get('/api/v1/admins/list', admins.list.main)

  app.use('/api/v1/admins/:adminId/info', authenticatedUser.main)
  app.use('/api/v1/admins/:adminId/info', isAdministrator.main)
  app.get('/api/v1/admins/:adminId/info', admins.info.main)

  app.use('/api/v1/admins/:adminId/edit', authenticatedUser.main)
  app.use('/api/v1/admins/:adminId/edit', isAdministrator.main)
  app.post('/api/v1/admins/:adminId/edit', admins.edit.main)

  app.use('/api/v1/admins/:adminId/delete', authenticatedUser.main)
  app.use('/api/v1/admins/:adminId/delete', isAdministrator.main)
  app.delete('/api/v1/admins/:adminId/delete', admins.delete.main)

  // Routes for admin/users
  app.use('/api/v1/users/list', authenticatedUser.main)
  app.use('/api/v1/users/list', isAdministrator.main)
  app.get('/api/v1/users/list', users.list.main)

  app.use('/api/v1/users/:userId/status', authenticatedUser.main)
  app.use('/api/v1/users/:userId/status', isAdministrator.main)
  app.use('/api/v1/users/:userId/status', users.editStatus.validate)
  app.post('/api/v1/users/:userId/status', users.editStatus.main)

  app.use('/api/v1/users/:userId/delete', authenticatedUser.main)
  app.use('/api/v1/users/:userId/delete', isAdministrator.main)
  app.use('/api/v1/users/:userId/delete', users.delete.validate)
  app.delete('/api/v1/users/:userId/delete', users.delete.main)

  // Routes for admin/permissions
  app.use('/api/v1/permissions/list', authenticatedUser.main)
  app.use('/api/v1/permissions/list', isAdministrator.main)
  app.get('/api/v1/permissions/list', permissions.list.main)

  app.use('/api/v1/permissions/:permissionId/info', authenticatedUser.main)
  app.use('/api/v1/permissions/:permissionId/info', isAdministrator.main)
  app.get('/api/v1/permissions/:permissionId/info', permissions.info.main)

  // Routes for admin/ads
  app.use('/api/v1/ads/:adId/status', authenticatedUser.main)
  app.use('/api/v1/ads/:adId/status', isAdministrator.main)
  app.use('/api/v1/ads/:adId/status', ad.editStatus.validate)
  app.post('/api/v1/ads/:adId/status', ad.editStatus.main)

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
