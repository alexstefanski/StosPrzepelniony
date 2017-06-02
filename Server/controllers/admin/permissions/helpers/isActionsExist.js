var Action = require('./../../../../models/index.js').Action

module.exports.main = function (actionIds, callback) {
  let i = 0

  actionIds.forEach(id => {
    Action
      .findById(id)
      .then(function(action) {
        i++
        if (action == null) {
          callback(error, null)
        }
        if (i === actionIds.length) {
          callback(null, true)
        }
      })
      .catch(error => callback(error, null))
  })
}
