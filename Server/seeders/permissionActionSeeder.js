var PermissionAction = require('./../models/permissionAction.js')

PermissionAction.bulkCreate([
  { permissionId: 1, actionId: 1 },
  { permissionId: 1, actionId: 2 },
  { permissionId: 1, actionId: 3 }
])
