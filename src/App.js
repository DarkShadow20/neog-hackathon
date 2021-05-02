import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import {Login,PrivateRoute,Home, PageNotFound} from "./pages";
import {Room} from "./pages/Room/Room";

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
          <Route path="/login" element={<Login />} /> 
          <PrivateRoute path="/room" element ={<Room/>}/>
          <Route path="/*" element={<PageNotFound/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
