var register = require('./controllers/user/register.js')
var confirmRegistration = require('./controllers/user/confirmRegistration.js')
var checkEmail = require('./controllers/user/checkEmail.js')


module.exports = function(app) {

  app.get('/', function(request, response) {
    response.send('Hello world from server!')
  })

  app.post('/api/v1/users/register', register.main)

  app.use('/api/v1/users/:userId/register/confirm/:tokenId/:token', confirmRegistration.validUserMiddleware)
  app.use('/api/v1/users/:userId/register/confirm/:tokenId/:token', confirmRegistration.validTokenMiddleware)
  app.get('/api/v1/users/:userId/register/confirm/:tokenId/:token', confirmRegistration.main)

  app.use('/api/v1/users/checkemail', checkEmail.validEmail)
  app.post('/api/v1/users/checkemail', checkEmail.main)
}
