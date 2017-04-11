var userController = require('./controllers/userController.js')

module.exports = function(app) {

  app.get('/', function(request, response) {
    response.send('Hello world from server!')
  })

  app.post('/api/v1/users/register', userController.register)
}
