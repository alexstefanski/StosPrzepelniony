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
export const isUserAdmin = function (userId) {return server + '/admins/' + userId + '/isadmin'; };

export const adminsList = server + '/admins/list';
export const adminDelete = function(adminId) {return server + '/admins/' + adminId + '/delete'; };
export const adminCategories = server + '/categories/list';
export const adminCategoryAdd = server + '/categories/create';
export const adminCategoryDelete = function(categoryId) {return server + '/categories/' + categoryId + '/delete'; };
export const adminCategoryEdit = function(categoryId) {return server + '/categories/ ' + categoryId + '/edit'; };

export const permissionsList = server + '/permissions/list';
export const adminPermissionEdit = function(adminId) {return server + '/admins/ ' + adminId + '/edit'; };

export const addAds = server + '/ads/add';
