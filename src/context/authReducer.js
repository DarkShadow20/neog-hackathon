export const AuthReducer = (state,action) => {
    switch (action.type) {
        case "USER_LOGIN":
            console.log(action.type)
            return {...state, isUserLoggedIn: true}
        case "USER_LOGOUT":
            return {...state, isUserLoggedIn: false}
        default:
            return state;
    }
}
