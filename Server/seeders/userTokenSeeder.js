var UserToken = require('./../models/userToken.js')

UserToken.bulkCreate([
  { token: 'xxx', status: 1, userId: 1 },
  { token: 'yyy', status: 10, userId: 1 }
])
