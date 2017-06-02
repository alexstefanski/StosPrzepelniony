var Permission = require('./../../../../models/index.js').Permission

module.exports.main = function (permissionName, callback) {
  Permission
    .findOne({
      where: {
        name: permissionName
      }
    })
    .then(result => callback(null, result))
    .catch(error => callback(error, null))
}
