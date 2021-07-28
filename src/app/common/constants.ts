export const constants = { 
    EMAIL_PATTERN: "^([a-zA-Z0-9_\\-\\.\\+]+)@([a-zA-Z0-9_\\-\\.]+)\\.(\\b(?!web\\b)[a-zA-Z]{2,5})$",
    PASSWORD_PATTERN: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",

    NOTIFY_MSG: {
        LOGIN_SUCESS: 'Login Successful',
        LOGIN_FAIL: 'Unable to login, Please try again later',
        NO_DATA: 'No Data Found',
        DETAIL_FAIL: 'User details update failed',
        DETAIL_SUCCESS: 'User details updated',
        DELETE_FAIL: 'Unable to Delete User',
        DELETE_SUCCESS: 'User deleted successfully'
    },

    ROUTE_URL: {
        USERS: '/users',
        LOGIN: '/login',
    }
}