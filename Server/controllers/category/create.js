/**
 * Created by malasz on 4/24/17.
 */
var Category = require('./../../models/category.js');




module.exports.main = function (request, response) {



    Category.findAll({
        where:  {categoryId: request.body.categoryIdParent},
        attributes: {exclude: ['id','createdAt', 'updatedAt'], include:['categoryId']}
    }).then( function (category) {
        if ( category.length === 0 &&  request.body.categoryIdParent != 0)
            response.status(404).json()
        else
        {
            if(typeof request.body.name === 'undefined' || !request.body.name ||
                typeof request.body.description === 'undefined' || !request.body.description || request.body.categoryIdParent < 0)
                    response.status(406).json()
            else
            {
                Category.create({
                    categoryIdParent: request.body.categoryIdParent,
                        name: request.body.name,
                        description: request.body.description
                    }).then(function (category) {
                    response.status(200).json()
                })
            }
        }
    },
    function (errors) {
        response.status(406).json()
    })



}
