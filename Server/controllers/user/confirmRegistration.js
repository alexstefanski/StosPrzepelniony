var User = require('./../../models/index.js').User
var UserToken = require('./../../models/index.js').UserToken

var validate = require('validate.js')
var moment = require('moment')

var registerTokenDuration = require('./../../config/userTokens.js').registerTokenDuration
var registerTokenLength = require('./../../config/userTokens.js').registerTokenLength

// Własny walidator sprawdzający czy użytkownik istnieje.
validate.validators.userExistsValidator = function(value) {
  return new validate.Promise(function(resolve, reject) {
    console.log('Value from userExistsValidator', value)
    User.findOne({
      where: {
        id: value
      },
      attributes: ['id']
    })
    .then(result => {
      if(result != null) {
        resolve()
      } else {
        resolve('Użytkownik nie istnieje.')
      }
    })
    .catch(errors => {
      console.log('Database error: connection is not established or table users does not exist.')
    })
  })
}

// Własny walidator sprawdzający czy konto użytkownik jest jeszcze nie aktywowane.
validate.validators.inactiveUserValidatorById = function(value) {
  return new validate.Promise(function(resolve, reject) {
    // console.log(value)
    User.findOne({
      where: {
        id: value,
        status: 0
      },
      attributes: ['id', 'email']
    })
    .then(result => {
      if(result != null) {
        resolve()
      } else {
        resolve('Konto użytkownika zostało już aktywowane.')
      }
    })
    .catch(errors => {
      console.log('Database error: connection is not established or table users does not exist.')
    })
  })
}

// Własny walidator sprawdzający token jest prawidłowy i należy do użytkowka.
validate.validators.correctTokenValidator = function(value, options) {
  return new validate.Promise(function(resolve, reject) {
    UserToken.findOne({
      where: {
        id: options.tokenId,
        userId: options.userId,
        token: value
      },
      attributes: ['id']
    })
    .then(result => {
      if(result != null) {
        resolve()
      } else {
        resolve('Token jest nieprawidłowy.')
      }
    })
    .catch(errors => {
      console.log('Database error: connection is not established or table user tokens does not exist.')
    })
  })
}

// Własny walidator sprawdzający token jest aktualny.
validate.validators.tokenLiveValidator = function(value) {
  return new validate.Promise(function(resolve, reject) {
    UserToken.findOne({
      where: {
        id: value,
      }
    })
    .then(result => {

      var createdMoment = moment(result.createdAt, "YYYY-MM-DD HH:mm:ss:SSS ZZ")

      if(createdMoment.add(registerTokenDuration, 'days') > moment()) {
        resolve()
      } else {
        resolve('Token jest już nie ważny.')
      }

    })
    .catch(errors => {
      console.log('Database error: connection is not established or table user tokens does not exist.')
    })
  })
}

// Podstawowa walidacja danych.
module.exports.basicValidation = function(request, response, next) {

  var constraints = {
    userId: {
      presence: {
        message: 'Id użytkownika jest wymagane.'
      },

      numericality: {
        onlyInteger: true,
        message: 'Id użytkownika musi być liczbą.'
      }
    },

    tokenId: {
      presence: {
        message: 'Id tokenu jest wymagane.'
      },

      numericality: {
        onlyInteger: true,
        message: 'Id tokenu musi być liczbą.'
      }
    },

    token: {
      presence: {
        message: 'Token jest wymagany.'
      },

      length: {
        is: registerTokenLength,
        message: 'Token musi zawierać ' + registerTokenLength + ' znaków.'
      }
    }
  }

  validate.async.options = {fullMessages: false}
  validate.async(request.params, constraints)
    .then(result => {
      next()
    })
    .catch(result => {
      result['messages'] = ['Coś poszło nie tak.']
      response.status(406).json(result)
    })
}

// Walidacja czy użytkownik istnieje.
module.exports.userExistsValidation = function(request, response, next) {

  var constraints = {
    userId: {
      userExistsValidator: true
    }
  }

  validate.async.options = {fullMessages: false}
  validate.async(request.params, constraints)
    .then(result => {
      next()
    })
    .catch(result => {
      result['messages'] = ['Coś poszło nie tak.']
      response.status(404).json(result)
    })

}

// Walidacja czy konto użytkownika nie jest jeszcze aktywowane.
module.exports.userInactiveValidation = function(request, response, next) {

  console.log('Request params', request.params)

  var constraints = {
    userId: {
      inactiveUserValidatorById: true
    }
  }

  validate.async.options = {fullMessages: false}
  validate.async(request.params, constraints)
    .then(result => {
      next()
    })
    .catch(result => {
      result['messages'] = ['Coś poszło nie tak.']
      response.status(405).json(result)
    })

}

// Walidacja czy kombinacja danych tokenId, token oraz userId jest poprawna.
module.exports.correctTokenValidation = function(request, response, next) {

  var constraints = {
    token: {
      correctTokenValidator: {
        tokenId: request.params.tokenId,
        userId: request.params.userId
      }
    }
  }

  validate.async.options = {fullMessages: false}
  validate.async(request.params, constraints)
    .then(result => {
      next()
    })
    .catch(result => {
      result['messages'] = ['Coś poszło nie tak.']
      response.status(406).json(result)
    })

}

// Walidacja czy token jest jeszcze aktualny.
module.exports.liveTokenValidation = function(request, response, next) {

  var constraints = {
    tokenId: {
      tokenLiveValidator: true
    }
  }

  validate.async.options = {fullMessages: false}
  validate.async(request.params, constraints)
    .then(result => {
      next()
    })
    .catch(result => {
      result['messages'] = ['Coś poszło nie tak.']
      response.status(408).json(result)
    })

}

module.exports.main = function(request, response) {

  User.findById(request.params.userId)
    .then(user => {

      // Aktualizacja statusu użytkownika.
      user.update({
        status: 1
      })
      .then(result => {

        // Aktualizacja statusu tokena.
        UserToken.findById(request.params.tokenId)
          .then(token => {

            token.update({
              status: 1
            })
              .then(result => {

                var responseObject = {
                  messages: ['Użytkownik aktywowany.', 'Możesz sie teraz zalogować.']
                }

                response.status(201).json(responseObject)

              })
              .catch(result => {
                console.log('Database error: connection is not established or table users tokens does not exist.')
              })
            })
            .catch(result => {
              console.log('Database error: connection is not established or table users tokens does not exist.')
            })
      })
      .catch(result => {
        console.log('Database error: connection is not established or table users does not exist.')
      })

    })
    .catch(result => {
      console.log('Database error: connection is not established or table users does not exist.')
    })

}
