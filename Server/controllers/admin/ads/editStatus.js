var Ad = require('./../../../models/index.js').Ad

var validate = require('validate.js')

// Walidacja przychodzących danych
module.exports.validate = function(request, response, next) {
  var constraints = {
    status: {
      presence: {
        message: 'Status jest wymagany'
      },
      format: {
        pattern: '^[0-2]{1}$',
        message: 'Status może przyjmować jedynie wartości [0,1,2]'
      }
    },

    adId: {
      presence: {
        message: 'Id ogłoszenia jest wymagane'
      },
      format: {
        pattern: '[0-9]+',
        message: 'Id musi być liczbą'
      }
    }

  }

  const objToValidate = {
    status: request.body.status,
    adId: request.params.adId
  }

  validate.async.options = { fullMessages: false }
  validate.async(objToValidate, constraints)
    .then(result => {
      next()
    })
    .catch(result => {
      result['messages'] = ['Coś poszło nie tak.']
      response.status(406).json(result)
    })
}

module.exports.main = function(request, response) {
  let _adId = request.params.adId
  let _status = request.body.status

  Ad
    .findOne({
      where: {
        id: _adId
      }
    })
    .then(function(ad) {
      if (ad != null) {
        ad.update({
          status: _status
        }).then(function() {
          // uaktualniono pomyślnie status
          response.status(204).json()
        })
      } else {
        response.status(404).json({
          message: 'Nie można zaktualizować statusu ogłoszenia',
          adId: 'Podane ogłoszenie nie istnieje'
        })
      } // koniec if
    })
    
}
