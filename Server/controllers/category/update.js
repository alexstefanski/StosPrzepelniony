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
        else {
                 parentId=request.body.categoryIdParent;
                 if((category.length === 0 && request.body.categoryIdParent !== 0) || request.body.categoryIdParent < 0 || request.body.categoryIdParent===null)
                     parentId = 0;
                 Category.findAll({
                         where:  {categoryId: parentId},
                         attributes: {exclude: ['id','createdAt', 'updatedAt'], include:['categoryId']}
                     }).then( function (parent) {
                        if(parentId == 0 || parent !== null)
                        {
                            if (typeof request.body.name === 'undefined' || !request.body.name)
                                response.status(406).json({ messages: 'Nie udało się zaktualizować kategorii!',
                                                            name: 'Nazwa kategorii musi zostać podana.'})
                            else {
                                if (typeof request.body.description === 'undefined' || !request.body.description)
                                    response.status(406).json({messages:'Nie udało się zaktualizować kategorii!',description:'Opis kategorii musi zostać podany'})
                                else {
                                    Category.findAll({ where:  {name: request.body.name},
                                        attributes: {exclude: ['id','createdAt', 'updatedAt'], include:['categoryId']}})
                                        .then(function (categories) {
                                            if(categories.length === 0 || (categories.length === 1 && categories[0].categoryId==request.params.categoryId) )
                                            {
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
                                            else {
                                                response.status(406).json({messages:'Nie udało się zaktualizować kategorii!',name:'Nazwa musi być unikatowa!'})
                                            }

                                        });
                                }
                            }
                     }
                     else {
                            response.status(406).json({messages:'Nie udało się zaktualizować kategorii!',categoryIdParent:'Rodzic musi istnieć!'})
                        }
                     });
             }

    });

}
