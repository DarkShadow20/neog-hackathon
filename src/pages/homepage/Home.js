import "./Home.css";
import NavBar from '../../components/NavBar';
import { Link } from 'react-router-dom';
import {useEffect, useRef, useState} from "react";
import firebase from "firebase/app";
import { useUser } from "../../context";
import { useAuth } from "../../hooks";

export const roomsOld=[{
    id:1,
    topic:"Simply Gaming",
    adminId:"Sumit",
    readers:[],
    accessMembers:[],
    Messages:[]
},{
    id:2,
    topic:"avalon meet",
    adminId:"Varun",
    readers:[],
    accessMembers:[],
    Messages:[]
},{
    id:3,
    topic:"Songs",
    adminId:"Kunal",
    readers:[],
    accessMembers:[],
    Messages:[]
},{
    id:4,
    topic:"Reading",
    adminId:"Bill",
    readers:[],
    accessMembers:[],
    Messages:[]
}]

function Home() {
    const divRef=useRef(null)
    const inputRef=useRef(null)
    const [text,setText]=useState("");
    const [rooms, setRooms] = useState([])

    const {userState,userDispatch} = useUser()
    const {currentUser} = userState

    const {userId} = useAuth()
    
    function clickHandler(){
        
    }

    const fetchCurrentUser = (users) => {
        const foundUser = users.find(user => user.userId === userId)
        if(foundUser){
            userDispatch({type: "LOAD_USER", payload: foundUser})
        }
        
    }

    const fetchDatas = async () => {
        try {
            const roomsRef = await firebase.firestore().collection("rooms")
            roomsRef.onSnapshot(snap => {
                let documents = [];
                snap.forEach(doc => {
                    documents.push({...doc.data(), roomId: doc.id})
                })
                setRooms(documents)
            })
        } catch (error) {
            console.log(error)
        }

        try {
            const usersRef = await firebase.firestore().collection("users")
            usersRef.onSnapshot(snap => {
                let documents = [];
                snap.forEach(doc => {
                    documents.push({...doc.data(), userId: doc.id})
                })
                userDispatch({type: "LOAD_ALL_USERS", payload: documents})
                fetchCurrentUser(documents)
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchDatas()
    },[])
    return (
        <>
            <NavBar/>
            <div className="room-section">
                {rooms.map((items)=>(
                    <Link
                    state={{
                      from: items
                    }}
                    replace
                    to="/room"
                        >
                        <div className="rooms" key={items.roomId}>
                            Channel Name: {items.topic}<br/>
                            Admin Name: {items.adminId}<br/>
                            Participants: {items.readers.length}
                        </div>
                    </Link>
                ))}
            <footer>
                <div className="wrapper">
                    <button className="create-btnroom" onClick={()=>{divRef.current.style.display="block";inputRef.current.focus();}}>Create Room</button>
                    <div  ref={divRef} className="create-room" style={{display:"none"}}>
                       Topic <input className="topic-name" type="text" placeholder="new room" ref={inputRef} value={text}
                        onChange={(e) => setText(e.target.value)}/>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <button
                                onClick={() => {
                                divRef.current.style.display = "none";
                                setText("");
                                }}
                            >
                                x
                            </button>
                        <button
                            onClick={() => {
                            divRef.current.style.display = "none";
                            if (text !== "") {
                                setText("");
                            clickHandler()}
                            }}
                        >
                            Create
                        </button>
                        </div>
                    </div>
                </div>
            </footer>
            </div>
        </>
    )
}

export default Home