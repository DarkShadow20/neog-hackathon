import { createContext, useContext, useReducer} from "react";
import {AuthReducer} from "./authReducer";


export const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}


export const AuthProvider = ({children}) => {

    const initalState = {
        isUserLogin: false
    }

   

    const [authState, authDispatch] = useReducer(AuthReducer, initalState)

    

    return <AuthContext.Provider value={{authState, authDispatch}}>{children}</AuthContext.Provider>
}