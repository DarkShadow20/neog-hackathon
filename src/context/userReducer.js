export const UserReducer = (state, action) => {
    switch (action.type) {
        case "LOAD_ALL_USERS":
            return {...state, users: action.payload}
        case "LOAD_USER":
            return {...state, currentUser: action.payload}
        default:
            return state
    }
}