module.exports.main = function (request, response) {

  // Odpowiedź
  var responseObject = {
    messages: ['Token użytkownika ważny.']
  }

  response.status(204).json(responseObject)

}
