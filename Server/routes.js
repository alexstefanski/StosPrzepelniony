// Controllers
var register = require('./controllers/user/register.js');
var confirmRegistration = require('./controllers/user/confirmRegistration.js');
var checkEmail = require('./controllers/user/checkEmail.js');
var resendConfirmRegistrationEmail = require('./controllers/user/resendConfirmRegistrationEmail.js');
var login = require('./controllers/user/login.js')
var isLoggedIn = require('./controllers/user/isLoggedIn.js')
var logout = require('./controllers/user/logout.js')

var categoryRead = require('./controllers/category/read.js');

// Common middlewares
var authenticatedUser = require('./middlewares/authenticatedUser.js')

module.exports = function(app) {

  app.get('/', function(request, response) {
    response.send('Hello world from server!')
  })

  app.post('/api/v1/users/register', register.main);

  app.use('/api/v1/users/:userId/register/confirm/:tokenId/:token', confirmRegistration.validUserMiddleware);
  app.use('/api/v1/users/:userId/register/confirm/:tokenId/:token', confirmRegistration.validTokenMiddleware);
  app.get('/api/v1/users/:userId/register/confirm/:tokenId/:token', confirmRegistration.main);

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

  app.get('/categories/list', categoryRead.main);
};
