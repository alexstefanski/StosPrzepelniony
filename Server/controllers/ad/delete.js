var Ad = require('./../../models/ad.js')
var auth = require('basic-auth')
var validate = require('validate.js')


module.exports.main = function (request, response) {
  var authData = auth(request)
  var userID = authData.name

  Ad.findById(request.params.adId, {
    attributes: ['id','userId','categoryId','subject', 'content','costTotal','costHour','date','status']
  }).then(function (ad) {
    if(ad===null){
      response.status(404).json('Brak ogłoszenia o podanym id.')
    }else{
      if (userID === String( ad.userId )) {
        ad.destroy()
        response.status(204).json()
      } else {
        response.status(403).json('Użytkownik nie ma uprawnień do edycji tego ogłoszenia.')
      }
    }
    })
}