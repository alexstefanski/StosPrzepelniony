/**
 * Created by malasz on 4/24/17.
 */
var Category = require('./../../models/category.js');
var Ad = require('./../../models/ad.js');

module.exports.main = function (request, response) {
    Category.findOne({
        where:  {categoryIdParent: request.params.categoryId},
        attributes: {exclude: ['id','createdAt', 'updatedAt'], include:['categoryId']}
    }).then(function (category) {
        if(category===null)
            response.status(406).json({messages:'Nie udało się usunąć kategorii', categoryId:"Nie znaleziono kategorii o podanym ID!"});
        else {
            Ad.findOne({
                where: {categoryId: category.categoryId },
                attributes: {exclude: ['id', 'createdAt', 'updatedAt']}
            }).then(function (ad) {
                if(ad === null){
                    Category.destroy({where: {categoryID: request.params.categoryId}}).then(function () {
                    response.status(200).json({messages:'Pomyślnie usunięto kategorię'});
                });}
                else{
                    response.status(406).json({messages:'Nie udało się usunąć kategorii', categoryId: "Istnieją ogłoszenia powiązane z tą kategorią!"});
                }
            });
        }
    })
}
