/**
 * Created by malasz on 4/24/17.
 */
var User = require('./../../models/Category');

module.exports.main = function (request, response) {
    Category.create({
            categoryIdParent: request.body.categoryParentId,
            name: request.body.name,
            description: request.body.description
        }).then(function (category) {
        
    })
}