var Ad = require('./../../models/ad.js')
var User = require('./../../models/user.js')
module.exports.main = function (request, response) {

  Ad.findById(request.params.adId, {
    attributes: ['id','categoryId','subject', 'content','costTotal','costHour','date','status'],
    include  : [{
      model: User,
      attributes: ['id','firstName']
    }],
  }).then(function (ad) {
    if(ad===null){
      responseObject = {
          messages: ['Nie udało sie wyświetlić ogłoszenia.', 'Wybrane ogłosznie nie istnieje.']
      }
      response.status(404).json(responseObject)
    } else{
      responseObject = {
        adId:ad.id,
        user:{
          userId:ad.user.id,
          firstName:ad.user.firstName
        },
        categoryId: ad.categoryId,
        subject: ad.subject,
        content: ad.content,
        costTotal: ad.costTotal,
        costHour: ad.costHour,
        date: ad.date,
        status: ad.status
      }
      response.status(200).json(responseObject)
    }},
    function (error) {
      response.status(404).json(error)
    }
  )
}
