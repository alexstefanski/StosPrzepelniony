var User = require('./../../models/index.js').User
var UserToken = require('./../../models/index.js').UserToken

var validate = require('validate.js')

// Własny walidator sprawdzający czy adres e-mail istnieje.
validate.validators.emailExists = function(value) {
  return new validate.Promise(function(resolve, reject) {
    User.findOne({
      where: {email: value},
      attributes: ['id']
    })
    .then(result => {
      if(result != null) {
        resolve()
      } else {
        resolve('does not exist.')
      }
    })
    .catch(errors => {
      console.log('Database error: connection is not established or table users does not exist.')
    })
  })
}

// Walidacja przychodzących danych.
module.exports.validation = function (request, response, next) {
  var constraints = {
    email: {
      presence: true,
      email: true,
      emailExists: true
    },

    password: {
      presence: true,
      length: {minimum: 6, maximum: 255},
    }
  }

  validate.async(request.body, constraints)
    .then(result => {
      next()
    })
    .catch(result => {
      var responseObject = {
        messages: ['Nieprawidłowy adres e-mail lub hasło.']
      }
      response.status(404).json(responseObject)
    })
}

module.exports.main = function (request, response) {
  User.findOne({
    where: { email : request.body.email, $and: [{ status: 1}, { password: request.body.password }]}
  })
  .then(user => {
    if(user != null) {

      // Generating random token
      var token = "";
      var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i = 0; i < 32; i++ ) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      UserToken.create({
        token: token,
        status: 10,
        userId: user.id
      })
      .then(userToken => {

        var responseObject = {
          userId: user.id,
          sessionToken: userToken.token
        }

        return response.status(200).json(responseObject)
      })
      .catch(errors => {
        console.log('Database error: connection is not established or table userTokens does not exist.')
      })

    } else {
      var responseObject = {
        messages: ['Nieprawidłowy adres e-mail lub hasło.']
      }
      response.status(404).json(responseObject)
    }
  })
  .catch(errors => {
    console.log('Database error: connection is not established or table users does not exist.')
  })
}
