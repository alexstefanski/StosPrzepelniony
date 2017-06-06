var Message = require('./../../models/message.js');
var MessagesList = require('./../../models/messageList.js');
var User = require('./../../models/user.js');
var Ad = require('./../../models/ad.js');
var moment = require('moment');
var Sequelize = require('sequelize');
var sequelize = require('./../../config/sequelize.js');


module.exports.main = function(request, response) {

    User.findOne({
        attributes: {include:['userId'], exclude :['id','createdAt','updatedAt','email','password','status']},
        where:{userId:request.params.userIdSender}
    }).then(function (user) {
        if(user===null)
            response.status(404).json();
        else{

            Ad.findOne({
                attributes: { include:['adId'], exclude :['id','createdAt','updatedAt']},
                where:{adId:request.params.adId}
            }).then(function(ad){
                if(ad === null)
                    response.status(404).json();
                else {

                    Message.findAll({
                        attributes: {exclude: ['id','createdAt','updatedAt']},
                        where:{adId:ad.dataValues.adId, userIdSender:user.dataValues.userId }
                    }).then(function (messages) {
                        obj = new Array();
                        messages.forEach(function (element,id) {

                            User.findOne({
                                attributes: {exclude :['id','createdAt','updatedAt','email','password','status']},
                                where:{userId:element.userId }
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
        function () {
            response.status(404).json();
        }
    )
    
}
