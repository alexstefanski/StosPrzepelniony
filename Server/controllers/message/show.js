var Message = require('./../../models/message.js');
var MessagesList = require('./../../models/messageList.js');
var User = require('./../../models/user.js');
var Ad = require('./../../models/ad.js');
var moment = require('moment');
var Sequelize = require('sequelize');
var sequelize = require('./../../config/sequelize.js');


module.exports.main = function(request, response) {

    User.findOne({
        attributes: {include:['id'], exclude :['createdAt','updatedAt','email','password','status']},
        where:{id: request.params.userIdSender}
    }).then(function (user) {
        if(user===null)
            response.status(404).json({messages:"Rozmowa nie istnieje", userIdSender:'Nie znaleziono takiego użytkownika!'});
        else{

            Ad.findOne({
                attributes: { include:['id'], exclude :['createdAt','updatedAt']},
                where:{id: request.params.adId}
            }).then(function(ad){
                if(ad === null)
                    response.status(404).json({messages:"Rozmowa nie istnieje", adId:'Nie znaleziono takiego ogłoszenia!'});
                else {

                    Message.findAll({
                        attributes: {exclude: ['id','createdAt','updatedAt']},
                        where:{adId: ad.dataValues.id, userIdSender: user.dataValues.id}
                    }).then(function (messages) {
                        obj = new Array();
                        messages.sort(function (a,b) {
                            return a.date < b.date;
                        }).forEach(function (element,id) {

                            User.findOne({
                                attributes: {exclude :['id','createdAt','updatedAt','email','password','status']},
                                where:{id :element.userId }
                            }).then(function (u1) {
                                if(u1 !== null)
                                {
                                    message = new Object();
                                    message.messageId = element.messageId;
                                    message.userIdSender = element.userIdSender;
                                    message.content = element.content;
                                    message.date = moment(element.date).format('HH:mm:ss DD.MM.YYYY');

                                    message.user = new Object();
                                    message.user.userId = element.userId;
                                    message.user.firstName = u1.firstName;
                                    message.user.lastName = u1.lastName;
                                    obj.push(message);
                                }

                                if(id === messages.length - 1)
                                    response.status(200).json(obj);
                            })


                        })

                    })

                }

            })

        }

    },
        function (errors) {
            response.status(404).json({messages:'DB ERROR', info:errors.toString()});
        }
    )

}
