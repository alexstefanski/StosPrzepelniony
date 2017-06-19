var Action = require('./../../../models/index.js').Action

module.exports.main = function(request, response) {

  Action.findAll({
    order: 'createdAt ASC'
  })
    .then(actions => {

      response.json(actions)

    })
    .catch(error => {
      console.log('Database error: connection is not established or table actions do not exist.')
    })
}
