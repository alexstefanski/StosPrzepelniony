export const server = 'http://localhost:3000'

// User APIS
export const registerUser = server  + '/api/v1/users/register'
export const checkUserEmail = server + '/api/v1/users/checkemail'
export const resendRegistrationEmail = server + '/api/v1/users/resendverificationemail'
export const loginUser = server + '/api/v1/users/login'
export const isUserLogged = server + '/api/v1/users/isLoggedIn'
export const logOutUser = server + '/api/v1/users/logout'
export const userInfo = function(userId) {return server + '/api/v1/users/' + userId + '/info'}
export const changePassword = server + '/api/v1/users/changepassword'
