import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import {Login,SignUp,PrivateRoute,Home} from "./pages";
import {Room} from "./Room/Room";

import {firebaseConfig} from "./Config/firebaseConfig"
import firebase from "firebase"
import "firebase/auth"
import "firebase/firestore"

firebase.initializeApp(firebaseConfig)

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <PrivateRoute path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} /> 
          <PrivateRoute path="/room" element ={<Room/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
