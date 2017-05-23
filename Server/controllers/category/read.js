/**
 * Created by malasz on 4/24/17.
 *
 * TODO: Autoryzacja Basic HTTP Authentication userId:sessionToken
 */

var Category = require('./../../models/category.js');

module.exports.main = function(request, response) {

    function FindParentInArray(cat, arr){
        var parent  = null;
        var i = 0;
        do{
            parent = FindParent(obj, arr[i++]);
        }while(i < arr.length && parent == null);
        return parent;
    }
    function FindParent(cat, root) {
        if(cat.categoryIdParent == root.categoryId)
            return root;
        if(root.children.length==0)
            return null;
        var i = 0;
        var k = null;
        do {
                k = FindParent(cat,root.children[i++]);
        }  while(i < root.children.length && k == null);
        return k;
    }
    Category.findAll({
        attributes: {exclude: ['id','createdAt','updatedAt'], include:['categoryId']},
    })
        .then(function(categories) {
            var categoryTree = new Array();
            categories.sort(function(a,b){return a.categoryIdParent - b.categoryIdParent;}).forEach(function (c) {
                obj = new Object();
                obj.categoryId = c.dataValues.categoryId;
                obj.categoryIdParent = c.dataValues.categoryIdParent;
                obj.name = c.dataValues.name;
                obj.children = new Array();

                if(c.dataValues.categoryIdParent==0)
                    categoryTree.push(obj);
                else
                    FindParentInArray(obj, categoryTree).children.push(obj);
            });

            response.status(200).json(categoryTree);
        }, function(errors) {
            console.log(errors);
        })

}
