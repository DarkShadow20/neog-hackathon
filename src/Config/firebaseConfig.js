import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

var firebaseConfig = {
    apiKey: "AIzaSyAEi6-qNfP7CSbAXx4Th3pKDwnH0LWpRrk",
    authDomain: "connectneog-2755b.firebaseapp.com",
    projectId: "connectneog-2755b",
    storageBucket: "connectneog-2755b.appspot.com",
    messagingSenderId: "518358257097",
    appId: "1:518358257097:web:66f29134a5718fc63aac18",
    measurementId: "G-JTM7W9GV6R"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({timestampsInSnapshots: true});
  
  export default firebase;