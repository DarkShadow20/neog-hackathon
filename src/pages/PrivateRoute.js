import { Navigate, Route } from "react-router-dom";
import {useAuth} from "../hooks";

export const PrivateRoute=(prop)=>{
    const {isUserLoggedIn}=useAuth()

    return (
        <>
            {isUserLoggedIn?(<Route {...prop}/>
            ):(<Navigate state={{from :prop.path}} replace to="/login"/>)
            }
        </>
    )
}