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
        greaterThanOrEqualTo:0
      }
    }
  }
  validate.async(request.body, constraints)
    .then(result => {
    next()
  })
  .catch(result => {
    result['messages'] = ['Nieprawidłowe dane.']
    response.status(406).json(result)
})
}

module.exports.main = function (request, response) {
  var authData = auth(request)
  var userID = authData.name

    Ad.findById(request.params.adId, {
      attributes: ['id','userId','categoryId','subject', 'content','costTotal','costHour','date','status']
    }).then(function (ad) {
      if(ad===null){
        response.status(406).json('Brak ogłoszenia o podanym id.')
      }else{
        if (userID ===  String(ad.userId)) {
          ad.update({
            status: request.body.status,
          }).then(function () {
            response.status(204).json()
          })
        } else {
          response.status(403).json('Brak uprawnień do edycji tego ogłoszenia')
        }
      }
      })
}