var Message = require('./../../models/message.js');
var MessagesList = require('./../../models/messageList.js');
var User = require('./../../models/user.js');
var Ad = require('./../../models/ad.js');
var moment = require('moment');
var Sequelize = require('sequelize');
var sequelize = require('./../../config/sequelize.js');
var auth = require('basic-auth');

module.exports.main = function(request, response) {

    var authData = auth(request)
    if (typeof authData != 'undefined') {
        var userID = authData.name;

        User.findOne({
            attributes: {include:['userId'], exclude :['id','createdAt','updatedAt','email','password','status', 'firstName', 'lastName']},
            where:{userId:request.params.userIdSender}
        }).then(function (user) {
            if(user !== null)
            {
                Ad.findOne({
                    attributes: { include:['adId'], exclude :['id','createdAt','updatedAt']},
                    where:{adId:request.params.adId}
                }).then(function (ad) {
                    if(ad !== null)
                    {
                        if(!request.body.content)
                            response.status(406).json();
                        else {
                             Message.create({
                                adId: ad.dataValues.adId,
                                 userId: userID,
                                 userIdSender: ad.dataValues.userId,
                                 content: request.body.content
                             }).then(function (message) {
                                response.status(200).json(message);
                             });


                        }

                    }
                    else
                        response.status(404).json();

                })

            }
            else
                response.status(404).json();

        })

    }
    else
        response.status(406).json();


}