var Ad = require('./../../models/ad.js')
var auth = require('basic-auth')
var validate = require('validate.js')

// Walidacja przychodzących danych.
module.exports.validate = function(request, response, next) {
  var constraints = {
    status:{
      numericality: {
        presence:true,
        onlyInteger: true,
        lessThanOrEqualTo: 1,
        greaterThanOrEqualTo:0,
        message:"Status powinien być 0 lub 1"
      }
    }
  }
  validate.async(request.body, constraints)
    .then(result => {
    next()
  })
  .catch(result => {
    result['messages'] = ['Zmiana statusu ogłoszenia nie powiodła się.', 'Popraw zaznaczone pola.']
    response.status(406).json(result)
})
}

module.exports.main = function (request, response) {
  var authData = auth(request)
  var userID = authData.name
  var responseObject
    Ad.findById(request.params.adId, {
      attributes: ['id','userId','categoryId','subject', 'content','costTotal','costHour','date','status']
    }).then(function (ad) {
      if(ad===null){
        responseObject = {
          messages: ['Zmiana statusu nie powiodła się.', 'Wybrane ogłosznie nie istnieje.']
        }
        response.status(406).json(responseObject)
      }else{
        if (userID ===  String(ad.userId)) {
          ad.update({
            status: request.body.status
          }).then(function () {
            response.status(204).json()
          })
        } else {
          responseObject = {
            messages: ['Zmiana statusu nie powiodła się.', 'Nie masz uprawnień do zmiany statusu tego ogłoszenia.']
          }
          response.status(403).json(responseObject)
        }
      }
      })
}