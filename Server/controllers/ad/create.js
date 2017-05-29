var Ad = require('./../../models/ad.js')
var auth = require('basic-auth')
var validate = require('validate.js')

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
    result['messages'] = ['Nieprawidłowe dane.']
    response.status(406).json(result)
  })
}

module.exports.main = function (request, response) {
  var authData = auth(request)
  var userID = authData.name

  if(typeof request.body.costTotal==='undefined' && typeof request.body.costHour === 'undefined'){
    response.status(406).json('Przynajmniej jedno z pól costTotal i costHour musi być wypełnione.')
  } else {
    Ad.create({
      userId: userID,
      subject: request.body.subject,
      content: request.body.content,
      costTotal: request.body.costTotal,
      costHour: request.body.costHour,
      categoryId: request.body.categoryId
    }).then(function (success) {
          response.status(201).json(success)
        },
        function (error) {
          response.status(406).json(error)
        }
      )
  }
}