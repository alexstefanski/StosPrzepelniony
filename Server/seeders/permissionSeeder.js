var Permission = require('./../models/permission.js')

Permission.bulkCreate([
  { name: 'Administrator' },
  { name: 'Moderator' }
])
