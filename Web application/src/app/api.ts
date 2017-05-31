export const server = 'http://localhost:3000';

// User APIS
export const registerUser = server  + '/api/v1/users/register';
export const checkUserEmail = server + '/api/v1/users/checkemail';
export const resendRegistrationEmail = server + '/api/v1/users/resendverificationemail';
export const loginUser = server + '/api/v1/users/login';
export const isUserLogged = server + '/api/v1/users/isLoggedIn';
export const logOutUser = server + '/api/v1/users/logout';
export const userInfo = function(userId) {return server + '/api/v1/users/' + userId + '/info'; };
export const changePassword = server + '/api/v1/users/changepassword';
export const resendEmail = server + '/api/v1/users/resendverificationemail';
export const isUserAdmin = function (userId) {return server + '/api/v1/admins/' + userId + '/isadmin'; };

export const adminCategories = server + '/categories/list';
export const adminCategoryAdd = server + '/categories/create';
export const adminCategoryDelete = function(categoryId) {return server + '/categories/' + categoryId + '/delete'; };
export const adminCategoryEdit = function(categoryId) {return server + '/categories/ ' + categoryId + '/edit'; };
