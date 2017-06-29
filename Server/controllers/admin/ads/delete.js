var Ad = require('./../../../models/ad.js')

module.exports.main = function (request, response) {
  let _adId = request.params.adId
  let responseObject

  Ad
  .findById(_adId)
  .then(function(ad) {
    if(ad === null){
      responseObject = {
        messages: ['Usunięcie ogłoszenia nie powiodło się.', 'Wybrane ogłosznie nie istnieje.']
      }
      response.status(406).json(responseObject)
    } else {
        ad.destroy()
        response.status(204).json()
    }
  })

}
