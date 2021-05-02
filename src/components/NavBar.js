import React,{useState}  from 'react'
import ReorderIcon from "@material-ui/icons/Reorder";
import {useAuth} from "../hooks";
import "./NavBar.css";
import { useNavigate } from 'react-router';
import { useUser } from '../context';

function NavBar() {
    const [showLinks,setShowLinks]=useState(false)
    
    const navigate=useNavigate();

    const { isUserLoggedIn, setLogin} = useAuth();

    const {userState} = useUser()
    const {currentUser} = userState;

    return (
             <>
            <nav>
                    <div className="Logo">connectNeoG</div>
                        <div className="leftSide">
                            <div className="link" id={showLinks?"hidden":""}>
                                {isUserLoggedIn ? (
                                  <>
                                  <button className="username"
                                    >
                                      <div>Hi {currentUser?.name}</div>
                                    </button>
                                    <button
                                      onClick={() => {
                                        setLogin(false);
                                      }}
                                    >
                                      <div>Log out</div>
                                    </button>
                                    
                                  </>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => {
                                        navigate("/login");
                                      }}
                                    >
                                      <div>Login</div>
                                    </button>
                                    <button
                                      onClick={() => {
                                        navigate("/signup");
                                      }}
                                    >
                                      <div>Sign up</div>
                                    </button>
                                  </>
                                )}
                            </div>
                        </div>
                        <div className="rightSide">
                        <button onClick={()=>setShowLinks(!showLinks)}><ReorderIcon/></button>
                        </div>
                </nav>
        </>
    )
}

export default NavBar