/**
 * Created by malasz on 4/24/17.
 */
var Category = require('./../../models/category.js');


module.exports.main = function (request, response) {

    Category.findOne({
        where:  {categoryId: request.params.categoryId},
        attributes: {exclude: ['id','createdAt', 'updatedAt'], include:['categoryId']}
    }).then( function (category) {
            if(category===null)
                response.status(404).json({messages:'Nie udało się zaktualizować kategorii', categoryId:"Nie znaleziono kategorii o podanym ID!"})
            Category.findAll({
                where:  {categoryId: request.body.categoryIdParent},
                attributes: {exclude: ['id','createdAt', 'updatedAt'], include:['categoryId']}
            }).then( function (category) {
                if ((category.length === 0 && request.body.categoryIdParent !== 0) || request.body.categoryIdParent < 0)
                    response.status(406).json({messages:'Nie udało się zaktualizować kategorii', categoryIdParent:"Id rodzica musi zostać zdefiniowane i być równe przynajmniej 0!"})
                else {
                    if (typeof request.body.name === 'undefined' || !request.body.name)
                        response.status(406).json({
                            messages: 'Nie udało się dodać kategorii!',
                            name: 'Nazwa kategorii musi zostać podana.'
                        })
                    else {
                        if (typeof request.body.description === 'undefined' || !request.body.description)
                            response.status(406).json({messages:'Nie udało się dodać kategorii!',description:'Opis kategorii musi zostać podany'})
                        else {
                            Category.update({
                                    categoryIdParent: request.body.categoryIdParent,
                                    name: request.body.name,
                                    description: request.body.description
                                },
                                {
                                    where: {categoryId: request.params.categoryId}
                                }).then(function (category) {
                                response.status(200).json({messages:"Kategoria została pomyślnie zaktualizowana"})
                            })
                        }

                    }

                }

            })

        },
        function (errors) {
            response.status(406).json({messages:'DB ERROR', info:errors.toString()})
        })



}
