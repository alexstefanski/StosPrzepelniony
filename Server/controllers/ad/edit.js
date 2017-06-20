var Ad = require('./../../models/ad.js')
var auth = require('basic-auth')
var validate = require('validate.js')

// Walidacja przychodzących danych.
module.exports.validate = function(request, response, next) {
  var constraints = {
    subject:{
      presence:{
        message:"Pole subject nie może być puste."
      }
    },
    content:{
      presence:{
        message:"Pole content nie może być puste."
      },
    },
    categoryId: {
      presence:{
        message:"Przynajmniej jedna kategoria musi być wybrana."
      }
    },
    costTotal:{
      numericality:{
        message:"Wartości pola costTotal muszą być typu float"
      }
    },
    costHour:{
      numericality:{
        message:"Wartości pola costHour muszą być typu float"
      }
    }
  }

  validate.async(request.body, constraints)
    .then(result => {
    next()
  })
  .catch(result => {
    result['messages'] = ['Edycja ogłoszenia nie powiodła się.', 'Popraw zaznaczone pola.']
    response.status(406).json(result)
})
}

module.exports.main = function (request, response) {
  var authData = auth(request)
  var userID = authData.name
  var responseObject

  if(typeof request.body.costTotal==='undefined' && typeof request.body.costHour === 'undefined'){
    responseObject = {
      messages:['Dodanie ogłoszenia nie powiodło się.', 'Popraw zaznaczone pola.'],
      costTotal:['Wpisz wynagrodzenie miesięczne lub wynagrodzenie godzinowe.'],
      costHour:['Wpisz wynagrodzenie godzinowe lub wynagrodzenie miesięczne.']
    }
    response.status(406).json(responseObject)
  }else{
    Ad.findById(request.params.adId, {
      attributes: ['id','userId','categoryId','subject', 'content','costTotal','costHour','date','status']
    }).then(function (ad) {
      if(ad===null){
        responseObject = {
          messages: ['Edycja ogłoszenia nie powiodła się.', 'Wybrane ogłosznie nie istnieje.']
        }
        response.status(406).json(responseObject)
      }else {
        if (userID === String(ad.userId)) {
          ad.update({
            subject: request.body.subject,
            content: request.body.content,
            costTotal: request.body.costTotal,
            costHour: request.body.costHour,
            categoryId: request.body.categoryId
          }).then(function () {
            responseObject = {
              messages: ['Edycja ogłoszenia zakończona powodzeniem.']
            }
            response.status(201).json(responseObject)
          })
        } else {
          responseObject = {
            messages: ['Edycja ogłoszenia nie powiodła się.', 'Nie masz uprawnień do edycji tego ogłoszenia.']
          }
          response.status(403).json(responseObject)
        }
      }
    })
  }
}