/**
 * Created by malasz on 5/23/17.
 */

var Message = require('./../../models/message.js');
var MessagesList = require('./../../models/messageList.js');
var User = require('./../../models/user.js');
var Ad = require('./../../models/ad.js');

var auth = require('basic-auth');
var moment = require('moment');
var Sequelize = require('sequelize');


module.exports.main = function(request, response) {
    var NextStep = function(list, userId){

        list.forEach(function(e){
           //console.log(e.dataValues);
            Message.findOne({
                attributes: {exclude: ['id','createdAt','updatedAt'], include:['messageId']},
                where: { messageId: e.dataValues.lastMessageId }
                }).then(function (message) {
                        User.findOne({
                            attributes: { exclude :['id','createdAt','updatedAt','userId','email','password','status']},
                            where:{userId:userId === message.dataValues.userId ? message.dataValues.userIdSender : message.dataValues.userId}
                        }).then(function (user) {
                            Ad.findOne({
                                attributes: { exclude :['id','createdAt','updatedAt']},
                                where:{adId:message.adId}
                            }).then(function(ad){

                                obj = new Object();
                                obj.receiverId = e.dataValues.receiverId;
                                obj.senderId = e.dataValues.senderId;
                                obj.date  = e.dataValues.date;

                                obj.ad = new Object();
                                obj.ad.adId = message.adId;
                                obj.ad.subject = ad.subject;


                                obj.user = new Object();
                                obj.user.userId = userId === message.dataValues.userId ? message.dataValues.userIdSender : message.dataValues.userId;
                                obj.user.firstName = user.firstName;
                                obj.user.lastName = user.lastName;



                                obj.LastMessage = new Object();
                                obj.LastMessage.user = new Object();
                                obj.LastMessage.user.userId = message.dataValues.userIdSender;
                                obj.LastMessage.content = message.dataValues.content;
                                response.status(200).json(obj);
                            })
                        })

                })
        });

    }

    var authData = auth(request)
    if (typeof authData != 'undefined') {
        var userID = authData.name;
        var type = '0';
        if(request.query.type !== {})
            type = request.query.type;



        switch(type)
        {
            case '0':
                MessagesList.findAll({
                    attributes: {exclude: ['id','createdAt','updatedAt']},
                    where:{senderId: userID}
                }).then(function(list) {
                    if(list.length < 1)
                        response.status(404).json({messages:"Rozmowa nie istnieje"});
                    NextStep(list,userID);
                });
                break;
            case '1':
                MessagesList.findAll({
                    attributes: {exclude: ['id','createdAt','updatedAt']},
                    where:{receiverId: userID}
                }).then(function(list) {
                    if(list.length < 1)
                        response.status(404).json({messages:"Rozmowa nie istnieje"});
                    NextStep(list,userID);
                });

                break;
            case '2':
                MessagesList.findAll({
                    attributes: {exclude: ['id','createdAt','updatedAt']},
                    where: Sequelize.or({senderId: userID },{receiverId: userID })
                }).then(function(list) {
                    if (list.length < 1)
                        response.status(404).json({messages:"Rozmowa nie istnieje"});
                    NextStep(list,userID);
                });
                break;
        }
    }
    else response.status(406).json({messages:"Niepoprawne dane autoryzacji", username:userID});


}
