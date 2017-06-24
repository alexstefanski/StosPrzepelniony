var Ad = require('./../../models/ad.js')
var auth = require('basic-auth')
var validate = require('validate.js')

module.exports.validate = function(request, response, next) {
  var constraints = {
    subject:{
      presence:{
        message:"Tytuł ogłoszenia nie może być pusty."
      }
    },
    content:{
      presence:{
        message:"Opis ogłoszenia nie może być pusty."
      },
    },
    categoryId: {
      presence:{
        message:"Przynajmniej jedna kategoria musi być wybrana."
      }
    },
    costTotal:{
      numericality:{
        message:"Wynagrodzenie miesięczne musi być liczbą"
      }
    },
    costHour:{
      numericality:{
        message:"Wynagrodzenie godzinowe musi być liczbą"
      }
    }
  }
  
  validate.async.options = { fullMessages: false }
  validate.async(request.body, constraints)
    .then(result => {
    next()
  })
  .catch(result => {
    result['messages'] = ['Dodanie ogłoszenia nie powiodło się.', 'Popraw zaznaczone pola.']
    response.status(406).json(result)
  })
}

module.exports.main = function (request, response) {
  var authData = auth(request)
  var userID = authData.name
  var responseObject;
  if(typeof request.body.costTotal==='undefined' && typeof request.body.costHour === 'undefined'){
    responseObject = {
      messages:['Dodanie ogłoszenia nie powiodło się.', 'Popraw zaznaczone pola.'],
      costTotal:['Wpisz wynagrodzenie miesięczne lub wynagrodzenie godzinowe.'],
      costHour:['Wpisz wynagrodzenie godzinowe lub wynagrodzenie miesięczne.']
    }
    response.status(406).json(responseObject)
  } else {
    Ad.create({
      userId: userID,
      subject: request.body.subject,
      content: request.body.content,
      costTotal: request.body.costTotal,
      costHour: request.body.costHour,
      categoryId: request.body.categoryId
    }).then(function () {
        responseObject={
          messages: ['Ogłoszenie zostało dodane.']
        }
        response.status(201).json(responseObject)
      }, function (error) {
        response.status(406).json(error)
      }
    )
  }
}
