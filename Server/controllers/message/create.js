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
            attributes: {include:['id'], exclude :['id','createdAt','updatedAt','email','password','status', 'firstName', 'lastName']},
            where:{id:request.params.userIdSender}
        }).then(function (user) {
            if(user !== null)
            {
                Ad.findOne({
                    attributes: { include:['id', 'userId'], exclude :['createdAt','updatedAt']},
                    where:{id:request.params.adId}
                }).then(function (ad) {
                    if(ad !== null)
                    {
                        if(!request.body.content)
                            response.status(406).json({messages:"Nie udało się wysłać wiadomości",content:"Treść wiadomości nie może być pusta!"});
                        else {
                            console.log(userID);
                            console.log(ad.dataValues.userId);
                            if(userID != request.params.userIdSender)
                            {
                                Message.create({
                                    adId: ad.dataValues.id,
                                    userId: userID,
                                    userIdSender:request.params.userIdSender,
                                    content: request.body.content
                                }).then(function (message) {
                                    response.status(200).json({messages:"Wiadomość pomyślnie wysłana!"});
                                });
                            }
                            else {
                                response.status(404).json({messages:"Rozmowa nie istnieje lub nie masz uprawnień"})

                            }



                        }

                    }
                    else
                        response.status(404).json({messages:"Rozmowa nie istnieje", adId:'Nie znaleziono takiego ogłoszenia!'});

                })

            }
            else
                response.status(404).json({messages:"Rozmowa nie istnieje", userIdSender:'Nie znaleziono takiego użytkownika!'});

        })

    }
    else
        response.status(406).json({messages:"Autoryzacja użytkownika nie powiodła się!", username:'Nie podano userId!'});


}
