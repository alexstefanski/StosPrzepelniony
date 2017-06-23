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

export const addAds = server + '/ads/add';
export const listAds = server + '/ads/list';
export const showAd = function (adId) { return server + '/ads/' + adId + '/info'; };
export const deleteAd = function (adId) { return server + '/ads/' + adId + '/delete'; };
export const changeAdStatus = function (adId) { return server + '/ads/' + adId + '/status'; };
// Admin APIs
export const isUserAdmin = function (userId) {return server + '/admin/admins/' + userId + '/isadmin'; };

export const adminsList = server + '/admin/admins/list';
export const adminDelete = function(adminId) {return server + '/admin/admins/' + adminId + '/delete'; };
export const adminCategories = server + '/admin/categories/list';
export const adminCategoryAdd = server + '/admin/categories/create';
export const adminCategoryDelete = function(categoryId) {return server + '/admin/categories/' + categoryId + '/delete'; };
export const adminCategoryEdit = function(categoryId) {return server + '/admin/categories/ ' + categoryId + '/edit'; };

export const adminPermissionsList = server + '/admin/permissions/list';
export const adminPermissionEdit = function(adminId) {return server + '/admin/admins/ ' + adminId + '/edit'; };


