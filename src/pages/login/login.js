import { useAuth } from "../../hooks";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import { validateUserInput } from "../utils";
import "./Login.css";
import { NavBar } from "../../components";
import firebase from "firebase/app"


export const Login = () => {
  const { isUserLoggedIn, setLogin, setUserId } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [togglePassword, setTogglePassword] = useState(true);

  const loginBtnHandler = async (event) => {
    event.preventDefault();
    if (validateUserInput({ email }).checkEmail) {
      setError("");
        try {
          const response = await firebase.auth().signInWithEmailAndPassword(email,password)
          

          if(response){
           setLogin(true)
           setUserId(response.user.uid)
            navigate(location?.state?.from ? location.state.from : "/");
          }
        } catch (error) {
          setError(error.message)
        }
    } else {
      setError("Enter valid email!");
    }
  };

  return (
    <>
    <NavBar/>
    <div className="login-wrapper">
      {isUserLoggedIn && (
        <Navigate to={location?.state?.from ? location.state.from : "/"} />
      )}
      <h1>Login</h1>
      <div className="login-inputWrapper">
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>

      <div className="login-inputWrapper">
        <label>
          Password
          <div style={{ position: "relative" }}>
            <input
              type={togglePassword ? "password" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              onClick={() => setTogglePassword((prev) => !prev)}
              className="login-toggleShowPassword"
            >
              {togglePassword ? "Show" : "Hide"}
            </div>
          </div>
        </label>
        <span className="login-errorPrompt">{error}</span>
      </div>
      <button onClick={loginBtnHandler}>Login</button>
    </div>
    </>
  );
};