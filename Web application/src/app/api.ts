export const server = 'http://localhost:3000';

// User APIS
export const registerUser = server  + '/users/register';
export const checkUserEmail = server + '/users/checkemail';
export const resendRegistrationEmail = server + '/users/resendverificationemail';
export const loginUser = server + '/users/login';
export const isUserLogged = server + '/users/isLoggedIn';
export const logOutUser = server + '/users/logout';
export const userInfo = function(userId) {return server + '/users/' + userId + '/info'; };
export const changePassword = server + '/users/changepassword';
export const resendEmail = server + '/users/resendverificationemail';
export const confirmRegister = function(userId, tokenId, token) {
  return server + '/users/' + userId + '/register/confirm/' + tokenId + '/' + token
}
export const resetPassword = server + '/users/resetpassword'
export const setNewPassword = function(userId, tokenId, token) {
  return server + '/users/' + userId + '/resetpassword/' + tokenId + '/' + token
}
export const messagesList = server + '/messages/list';
export const messagesShow = function(adId,userIdSender) {return server + '/messages/' + adId + '/' + userIdSender; };
export const messageSend = function(adId,userIdSender) {return server + '/messages/' + adId + '/' + userIdSender + '/send'; };

export const addAds = server + '/ads/add';
export const listAds = server + '/ads/list';
export const showAd = function (adId) { return server + '/ads/' + adId + '/info'; };
export const editAd = function (adId) { return server + '/ads/' + adId + '/edit'; };
export const deleteAd = function (adId) { return server + '/ads/' + adId + '/delete'; };
export const changeAdStatus = function (adId) { return server + '/ads/' + adId + '/status'; };

export const categoriesList = server + '/categories/list';
// Admin APIs
export const isUserAdmin = function (userId) {return server + '/admin/admins/' + userId + '/isadmin'; };

export const adminsList = server + '/admin/admins/list';
export const adminsAdd = server + '/admin/admins/add';
export const adminEdit = function (adminId) {return server + '/admin/admins/' + adminId + '/edit'};
export const adminDelete = function(adminId) {return server + '/admin/admins/' + adminId + '/delete'; };
export const adminUser = server + '/admin/users/list';
export const adminUserDelete = function(userId) {return server + '/admin/users/' + userId + '/delete'; };
export const adminCategoryAdd = server + '/admin/categories/create';
export const adminCategoryDelete = function(categoryId) {return server + '/admin/categories/' + categoryId + '/delete'; };
export const adminCategoryEdit = function(categoryId) {return server + '/admin/categories/ ' + categoryId + '/edit'; };
export const adminActionsList = server + '/admin/actions/list';
export const adminPermissionsList = server + '/admin/permissions/list';
export const adminPermissionShow = function(permId) {return server + '/admin/permissions/' + permId + '/info'};
export const adminPermissionAdd = server + '/admin/permissions/add';
export const adminPermissionDelete = function(permId) {return server + '/admin/permissions/' + permId + '/delete'};
export const adminPermissionEdit = function(permId) {return server + '/admin/permissions/' + permId + '/edit'; };
export const adminAdsList = server + '/admin/ads/list';
export const adminAdsStatusEdit = function(adId) {return server + '/admin/ads/' + adId + '/status'; };
export const adminAdsDeleteById = function(adId) {return server + '/admin/ads/' + adId + '/delete'; };
export const adminUserEditStatus = function(userId) {return server + '/admin/users/' + userId + '/status'; };
