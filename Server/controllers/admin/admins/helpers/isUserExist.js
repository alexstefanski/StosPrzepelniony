var User = require('./../../../../models/index.js').User

module.exports.main = function (userId, callback) {
  User
    .findOne({
      where: {
        id: userId
      }
    })
    .then(result => callback(null, result))
    .catch(error => callback(error, null))
}
