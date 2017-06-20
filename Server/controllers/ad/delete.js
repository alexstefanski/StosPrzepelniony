var Ad = require('./../../models/ad.js')
var auth = require('basic-auth')
var validate = require('validate.js')


module.exports.main = function (request, response) {
  var authData = auth(request)
  var userID = authData.name
  var responseObject

  Ad.findById(request.params.adId, {
    attributes: ['id','userId','categoryId','subject', 'content','costTotal','costHour','date','status']
  }).then(function (ad) {
    if(ad===null){
      responseObject = {
        messages: ['Usunięcie ogłoszenia nie powiodło się.', 'Wybrane ogłosznie nie istnieje.']
      }
      response.status(406).json(responseObject)
    }else{
      if (userID === String( ad.userId )) {
        ad.destroy()
        response.status(204).json()
      } else {
        responseObject = {
          messages: ['Usunięcie ogłoszenia nie powiodło się.', 'Nie masz uprawnień do edycji tego ogłoszenia.']
        }
        response.status(403).json(responseObject)
      }
    }
    })
}