var User = require('./../../models/index.js').User
var UserToken = require('./../../models/index.js').UserToken

var validate = require('validate.js')

// Własny walidator sprawdzający czy adres e-mail jest unikalny.
validate.validators.uniqueEmail = function(value) {
  return new validate.Promise(function(resolve, reject) {
    User.findOne({
      where: {email: value},
      attributes: ['id']
    })
    .then(result => {
      if(result == null) {
        resolve()
      } else {
        resolve('already in use.')
      }
    })
  })
}

// Walidacja przychodzących danych.
module.exports.validate = function(request, response, next) {
  var constraints = {
    email: {
      presence: true,
      email: true,
      uniqueEmail: true
    },

    firstName: {
      presence: true,
      length: {minimum: 4, maximum: 255},
    },

    lastName: {
      presence: true,
      length: {minimum: 4, maximum: 255},
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
      response.status(422).json(result)
    })
}

module.exports.main = function(request, response) {

  User.create({
    email: request.body.email,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    password: request.body.password
  })
  .then(function(user) {

    // Generating random token
    var token = "";
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i = 0; i < 16; i++ ) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    UserToken.create({
      token: token,
      status: 0,
      userId: user.id
    })
    .then(function(userToken) {

      var confirmEmailLink = "/users/" + userToken.userId + "/register/confirm/" + userToken.id + "/" + userToken.token

      // TODO: Sending email with confirm link.
      console.log('Confirm link for user ' + user.email + ': ', confirmEmailLink)

      response.status(201).json(confirmEmailLink)

    }, function(errors) {

      response.status(406).json()

    })

  }, function(errors) {

    var emailExists = false;

    errors.errors.forEach(function (error) {
      if(error.type == "unique violation") {
        emailExists = true
      }
    });

    if(emailExists) {
      response.status(409).json()
    } else {
      response.status(406).json()
    }

  })

}
