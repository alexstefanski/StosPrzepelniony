var express = require('express');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');


var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var myurl = express.Router();
require('./routes.js')(myurl);
app.use('/', myurl);

var user = require('./models/User.js');

app.listen(3000);
console.log('Server started at port 3000 ...');
