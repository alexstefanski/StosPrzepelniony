var User = require('./../../models/index.js').User
var UserToken = require('./../../models/index.js').UserToken

var validate = require('validate.js')
var moment = require('moment')

var resetPasswordTokenDuration = require('./../../config/userTokens.js').resetPasswordTokenDuration
var resetPasswordTokenLength = require('./../../config/userTokens.js').resetPasswordTokenLength

// Własny walidator sprawdzający czy użytkownik jest aktywowany i nie
// zablokowany - status użytkownika wynosi 1.
validate.validators.isActivatedById = function(value) {
  return new validate.Promise(function(resolve, reject) {

    User.findOne({
      where: {
        id: value,
        status: 1
      }
    })
      .then(user => {

        if(user != null) {
          resolve()
        } else {
          resolve('Konto tego użytkownika jest nieaktywowane lub zablokowane.')
        }

      })
      .catch(error => {
        console.log('Database error: connection is not established or table users does not exist.')
      })

  })
}

// Własny walidator sprawdzający token jest prawidłowy i należy do użytkownika.
validate.validators.isTokenCorrect = function(value, options) {
  return new validate.Promise(function(resolve, reject) {
    UserToken.findOne({
      where: {
        id: options.tokenId,
        userId: options.userId,
        token: value,
        status: 20
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
      console.log('Database error: connection is not established or table user_tokens does not exist.')
    })
  })
}

// Własny walidator sprawdzający token jest aktualny.
validate.validators.isTokenAlive = function(value) {
  return new validate.Promise(function(resolve, reject) {
    UserToken.findOne({
      where: {
        id: value,
      }
    })
    .then(result => {

      var createdMoment = moment(result.createdAt, "YYYY-MM-DD HH:mm:ss:SSS ZZ")

      if(createdMoment.add(resetPasswordTokenDuration, 'days') > moment()) {
        resolve()
      } else {
        resolve('Token jest już nie ważny.')
      }

    })
    .catch(errors => {
      console.log('Database error: connection is not established or table user_tokens does not exist.')
    })
  })
}

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
        messages: 'Id tokena jest wymagane.'
      },

      numericality: {
        onlyInteger: true,
        message: 'Id tokena musi być liczbą.'
      }
    },

    token: {
      presence: {
        messages: 'Token jest wymagany.',
      },

      length: {
        is: resetPasswordTokenLength,
        message: 'Token musi zawierać ' + resetPasswordTokenLength + ' znaków.'
      }
    },

    password: {
      presence: {
        message: 'Hasło jest wymagane.'
      },

      length: {
        minimum: 6,
        maximum: 255,
        message: 'Hasło powinno zawierać od 6 do 255 znaków.'
      }
    }
  }

  validate.async.options = {fullMessages: false}
  validate.async(Object.assign(request.params, request.body), constraints)
    .then(success => {
      next()
    })
    .catch(error => {
      error['messages'] = ['Coś poszło nie tak.']
      response.status(406).json(error)
    })

}

module.exports.userAvalibleValidator = function(request, response, next) {

  var constraints = {
    userId: {
      isActivatedById: true
    }
  }

  validate.async.options = {fullMessages: false}
  validate.async(request.params, constraints)
    .then(success => {
      next()
    })
    .catch(error => {
      error['messages'] = ['Coś poszło nie tak.']
      response.status(409).json(error)
    })

}

module.exports.correctTokenValidator = function(request, response, next) {

  var constraints = {
    token: {
      isTokenCorrect: {
        tokenId: request.params.tokenId,
        userId: request.params.userId
      }
    }
  }

  validate.async.options = { fullMessages: false }
  validate.async(request.params, constraints)
    .then(success => {
      next()
    })
    .catch(error => {
      error['messages'] = ['Coś poszło nie tak.']
      response.status(406).json(error)
    })

}

module.exports.aliveTokenValidator = function(request, response, next) {

  var constraints = {
    tokenId: {
      isTokenAlive: true
    }
  }

  validate.async.options = { fullMessages: false }
  validate.async(request.params, constraints)
    .then(success => {
      next()
    })
    .catch(error => {
      error['messages'] = ['Coś poszło nie tak.']
      response.status(408).json(error)
    })

}

module.exports.main = function(request, response) {

  User.findOne({
    where: {
      id: request.params.userId
    }
  })
    .then(user => {

      user.update({
        password: request.body.password
      })
        .then(updatedUser => {

          UserToken.destroy({
            where: {
              id: request.params.tokenId
            }
          })

          var responseObject = {
            messages: ['Hasło zostało zmienione pomyślnie.']
          }

          response.status(201).json(responseObject)

        })
        .catch(error => {
          console.log('Database error: connection is not established or table users does not exist.')
        })

    })
    .catch(error => {
      console.log('Database error: connection is not established or table users does not exist.')
    })

}
