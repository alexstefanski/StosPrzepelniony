var Ad = require('./../../models/ad.js')
var User = require('./../../models/user.js')
var Category = require('./../../models/category.js')

module.exports.main = function (request, response) {
  var filters=request.query

  Ad.findAll({
    include  : [{
      model: User,
      attributes: ['id','firstName']
    },
    {
      model: Category,
      attributes: ['categoryId','name']
    }],
    attributes: {
      include: ['id','categoryId','subject','costTotal','costHour','date'],
      exclude: ['createdAt','updatedAt','userId','status']
    },
  }).then(
    function (ads) {
       var result = new Array()
      ads.forEach(function (ad) {
        if( CheckUserId(ad) && CheckCategoryId(ad) && CheckSubject(ad) &&
          CheckContent(ad) && CheckCostHour(ad) && CheckCostTotal(ad)) {
          var responseObject = {
            adId: ad.id,
            user:{
              userId: ad.user.id,
              firstName: ad.user.firstName
            },
            category:{
              categoryId: ad.categoryId,
              categoryName: ad.category.name
            },
            categoryId: ad.categoryId,
            subject: ad.subject,
            costTotal: ad.costTotal,
            costHour: ad.costHour,
            date: ad.date
          }
          result.push(responseObject)
        }
      })
      response.status(200).json(result)
    }
  )

  function CheckUserId(ad){
    if( filters.userId===null || typeof filters.userId==='undefined'|| String(filters.userId ) === String( ad.user.id )){
      return true
    }
    else{
      return false
    }

  }

  function CheckCategoryId(ad){
    if( filters.categoryId===null || typeof filters.categoryId==='undefined'){
      return true
    }
    else {
      if (typeof filters.categoryId === 'object') {
        flaga = false
        filters.categoryId.forEach(function (catId) {
          if (Number(catId) === Number(ad.categoryId)) {
            flaga = true
          }
        })

        if (flaga) {
          return true
        } else {
          return false
        }
      }
      else {
        if (Number(filters.categoryId) === ad.categoryId) {
          return true
        }
        else {
          return false
        }
      }
    }
  }

  function CheckSubject(ad){
    if( filters.subject===null || typeof filters.subject==='undefined'){
      return true
    }
    else{
      return Contains(ad.subject,filters.subject)
    }
  }

  function CheckContent(ad) {
    if( filters.content===null || typeof filters.content==='undefined'){
      return true
    }
    else{
      return Contains(ad.content,filters.content)
    }
  }

  function CheckCostTotal(ad){
    if(filters.costTotal===null || typeof filters.costTotal==='undefined'){
      return true
    }
    else if(ad.costTotal ===null){
      return false;
    }
    else {
      minValue = Number(filters.costTotal.split('-',2)[0])
      maxValue = Number(filters.costTotal.split('-',2)[1])
      if(isNaN(maxValue) || isNaN(minValue)){
        return true
      } else {
        if(Number(ad.costTotal) < maxValue){
          return true
        }
        else{
          return false
        }
      }
    }
  }

  function CheckCostHour(ad){
    if(filters.costHour===null || typeof filters.costHour==='undefined'){
      return true
    }
    else if(ad.costHour === null){
      return false;
    }
    else {
      minValue = Number(filters.costHour.split('-',2)[0])
      maxValue = Number(filters.costHour.split('-',2)[1])
      if(isNaN(maxValue) || isNaN(minValue)){
        return true
      } else {
        if(ad.costHour > minValue && ad.costHour < maxValue){
          return true
        }
        else{
          return false
        }
      }
    }
  }

  function Contains(string1,string2){
    return string1.indexOf(string2)!==-1
  }
}