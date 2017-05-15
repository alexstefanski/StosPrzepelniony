// Controllers
var register = require('./controllers/user/register.js');
var confirmRegistration = require('./controllers/user/confirmRegistration.js');
var checkEmail = require('./controllers/user/checkEmail.js');
var resendConfirmRegistrationEmail = require('./controllers/user/resendConfirmRegistrationEmail.js');
var login = require('./controllers/user/login.js')
var isLoggedIn = require('./controllers/user/isLoggedIn.js')
var logout = require('./controllers/user/logout.js')
var info = require('./controllers/user/info.js')

// API for admin/admins
var admins = require('./controllers/admin/admins/index.js')
// API for admin/users
var users = require('./controllers/admin/users/index.js')
// API for admin/permissions
var permissions = require('./controllers/admin/permissions/index.js')

var categoryCreate  = require('./controllers/category/create')
var categoryRead = require('./controllers/category/read')
var categoryUpdate  = require('./controllers/category/update')
var categoryDelete =  require('./controllers/category/delete')

// Common middlewares
var authenticatedUser = require('./middlewares/authenticatedUser.js')
var isAdministrator = require('./middlewares/isAdministrator.js')

module.exports = function(app) {

  app.get('/', function(request, response) {
    response.send('Hello world from server!')
  })

  app.use('/api/v1/users/register', register.validate)
  app.post('/api/v1/users/register', register.main);

  app.use('/users/:userId/register/confirm/:tokenId/:token', confirmRegistration.validUserMiddleware);
  app.use('/users/:userId/register/confirm/:tokenId/:token', confirmRegistration.validTokenMiddleware);
  app.get('/users/:userId/register/confirm/:tokenId/:token', confirmRegistration.main);

  app.use('/api/v1/users/checkemail', checkEmail.validEmail);
  app.post('/api/v1/users/checkemail', checkEmail.main);

  app.use('/api/v1/users/resendverificationemail', resendConfirmRegistrationEmail.validEmail)
  app.use('/api/v1/users/resendverificationemail', resendConfirmRegistrationEmail.belongsToInactiveUser)
  app.post('/api/v1/users/resendverificationemail', resendConfirmRegistrationEmail.main)

  app.use('/api/v1/users/login', login.validEmail)
  app.post('/api/v1/users/login', login.main)

  app.use('/api/v1/users/isLoggedIn', isLoggedIn.validBasicAuthHeader)
  app.get('/api/v1/users/isLoggedIn', isLoggedIn.main)

  app.use('/api/v1/users/logout', authenticatedUser.main)
  app.post('/api/v1/users/logout', logout.main)

  app.use('/api/v1/users/:userId/info', authenticatedUser.main)
  app.get('/api/v1/users/:userId/info', info.main)

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

  // Routes for admin/admins
  app.use('/api/v1/admins/add', authenticatedUser.main)
  app.use('/api/v1/admins/add', isAdministrator.main)
  app.post('/api/v1/admins/add', admins.create.main)

  app.use('/api/v1/admins/:userId/isadmin', authenticatedUser.main)
  app.use('/api/v1/admins/:userId/isadmin', isAdministrator.main)
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
  app.post('/api/v1/users/:userId/status', users.editStatus.main)

  app.use('/api/v1/users/:userId/delete', authenticatedUser.main)
  app.use('/api/v1/users/:userId/delete', isAdministrator.main)
  app.delete('/api/v1/users/:userId/delete', users.delete.main)

  // Routes for admin/permissions
  app.use('/api/v1/permissions/list', authenticatedUser.main)
  app.use('/api/v1/permissions/list', isAdministrator.main)
  app.get('/api/v1/permissions/list', permissions.list.main)
};
