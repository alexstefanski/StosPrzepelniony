var Ad = require('./../../../models/index.js').Ad
var User = require('./../../../models/index.js').User
var Category = require('./../../../models/index.js').Category

module.exports.main = function(request, response) {

  Ad
    .findAll({
      attributes: [ 'id' , 'subject' , 'costTotal' , 'costHour' , 'date'],
      include: [
        {
          model: User,
          attributes: [ 'id' , 'firstName' , 'lastName' ]
        },
        {
          model: Category,
          attributes: [ 'categoryId' ]
        }
      ]
    })
    .then(function(ads) {
      if (ads != null) {
        let adsList = new Array();

        ads.forEach((ad) => {
          let obj = new Object();

          obj.adId = ad.id;
          obj.user = {
            userId: ad.user.id,
            firstName: ad.user.firstName,
            lastName: ad.user.lastName
          }
          let categoriesArray = new Array();
          categoriesArray.push(ad.category.categoryId);
          obj.categories = categoriesArray;
          obj.subject = ad.subject;
          obj.costTotal = ad.costTotal;
          obj.costHour = ad.costHour;
          obj.date = ad.date;

          adsList.push(obj);
        }); // koniec forEach

        response.status(200).json(adsList)
      } else {
        response.status(404).json({
          message: 'List ogłoszeń jest pusta',
        })
      } // koniec if
    })

}
