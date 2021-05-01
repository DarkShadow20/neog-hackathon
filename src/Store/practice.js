 /*try {
        const response = await firebase.auth().signInWithEmailAndPassword(email,password)
        const userId = response.user.uid
        if(response){
          authDispatch({type: "USER_LOGIN"})
          navigate(location?.state?.from ? location.state.from : "/");
        }
      } catch (error) {
        setError(error.message)
      }*/



/*import { createContext, useContext, useReducer} from "react";
import {AuthReducer} from "./authReducer";


export const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}


export const AuthProvider = ({children}) => {

    const initalState = {
        isUserLoggedIn: false
    }

   

    const [authState, authDispatch] = useReducer(AuthReducer, initalState)

    

    return <AuthContext.Provider value={{authState, authDispatch}}>{children}</AuthContext.Provider>
}*/