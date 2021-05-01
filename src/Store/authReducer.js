export const AuthReducer = (state,action) => {
    switch (action.type) {
        case "USER_LOGIN":
            return {...state, isUserLogin: true}
        case "USER_LOGOUT":
            return {...state, isUserLogin: false}
        default:
            return state;
    }
}
