import { createContext, useContext, useReducer } from "react";
import { UserReducer } from "./userReducer";


const UserContext = createContext()


export const useUser = () => {
    return useContext(UserContext)
}

export const UserProvider = ({children}) => {
    const initialState = {
        user: null
    }

    const [userState, userDispatch] = useReducer(UserReducer, initialState)

    return <UserContext.Provider value={{userState, userDispatch}}>{children}</UserContext.Provider>
}