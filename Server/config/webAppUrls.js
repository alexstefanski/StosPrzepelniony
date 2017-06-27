var webApplicationUrl = 'http://localhost:3000'

var confirmRegisterWebAppUrl = function(userId, tokenId, token) {
  return webApplicationUrl + '/confirm-register/' + userId + '/' + tokenId + '/' + token
}

var resetPasswordWebAppUrl = function(userId, tokenId, token) {
  return webApplicationUrl + '/set-new-password/' + userId + '/' + tokenId + '/' + token
}

module.exports.webApplicationUrl = 'http://localhost:3000'
module.exports.confirmRegisterWebAppUrl = confirmRegisterWebAppUrl
module.exports.resetPasswordWebAppUrl = resetPasswordWebAppUrl
