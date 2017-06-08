/**
 * Created by malasz on 4/24/17.
 */
var Category = require('./../../models/category.js');


module.exports.main = function (request, response) {
    Category.findOne({
        where:  {categoryIdParent: request.params.categoryId},
        attributes: {exclude: ['id','createdAt', 'updatedAt'], include:['categoryId']}
    }).then(function (category) {
        if(category!==null)
            response.status(406).json({messages:'Nie udało się usunąć kategorii', categoryId:"Nie znaleziono kategorii o podanym ID!"})
        else {
            Category.destroy({where: {categoryID: request.params.categoryId}}).then(function () {
                response.status(204).json({messages:'Pomyślnie usunięto kategorię'});
            })
        }
    })


}
