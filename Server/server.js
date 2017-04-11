var express = require('express')
var Sequelize = require('sequelize')
var bodyParser = require('body-parser')
var routes = require('./routes.js')

var app = express()
app.use(bodyParser.json())
routes(app)

var user = require('./models/User.js')

app.listen(3000)
console.log('Server started at port 3000 ...')
