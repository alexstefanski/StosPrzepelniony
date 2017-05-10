var Permission = require('./../../../../models/index.js').Permission

module.exports.main = function (permissionId, callback) {
  Permission
    .findOne({
      where: {
        id: permissionId
      }
    })
    .then(result => callback(null, result))
    .catch(error => callback(error, null))
}
