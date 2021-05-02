import "./Home.css";
import NavBar from '../../components/NavBar';
import { Link } from 'react-router-dom';
import {useEffect, useRef, useState} from "react";
import firebase from "firebase/app";
import { useUser } from "../../context";
import { useAuth } from "../../hooks";


function Home() {
    const divRef=useRef(null)
    const inputRef=useRef(null)
    const [text,setText]=useState("");
    const [rooms, setRooms] = useState([])
    //eslint-disable-next-line
    const [errorMessage, setErrorMessage] = useState("")

    const {userState,userDispatch} = useUser()
    const {currentUser} = userState

    const {userId} = useAuth()
    
    const addRoomBtn = () => {
        const newRoom = {
            adminId: currentUser.userId,
            adminName: currentUser.name,
            topic: text,
            accessMembers: [currentUser.userId],
            readers: [{userId: currentUser.userId, name: currentUser.name}],
            raisedHands: [],
            messages:[]
        }

        const roomsRef = firebase.firestore().collection("rooms")
        roomsRef.add(newRoom)
        setText("")
    }

    const removeRoomBtn = (desiredRoomId) => {
        const foundRoom = rooms.find(room => room.roomId === desiredRoomId)
        if(foundRoom.adminId === currentUser.userId){
            //eslint-disable-next-line
            const roomRef = firebase.firestore().collection("rooms").doc(desiredRoomId).delete()
        }
        else {
            setErrorMessage("Only admin can delete this room")
            alert("Only admin can delete this room")
        }
    }

    const addToReadersBtn = (desiredRoomId) => {
        const foundRoom = rooms.find(room => room.roomId === desiredRoomId)
        if(foundRoom){
            const alreadyReader = foundRoom.readers.find(reader => reader.userId === currentUser.userId)
            if(alreadyReader){
                return null
            }
            else {
                const roomRef = firebase.firestore().collection("rooms").doc(desiredRoomId)
                const newReader = {
                    name: currentUser.name,
                    userId: currentUser.userId
                }
                roomRef.update({
                    readers: firebase.firestore.FieldValue.arrayUnion(newReader)
                })
            }
        }else{
            alert("Room not found")
        }
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
        //eslint-disable-next-line
    },[])
    return (
        <>
            <NavBar/>
            <div className="room-section">
                {rooms.map((items)=>(
                        <div className="rooms" key={items.roomId}>
                            <div className="room-field">
                                <p>Topic: </p>
                                <p>{items.topic}</p>
                            </div>
                            <div className="room-field">
                                <p>Admin: </p>
                                <p>{items.adminName}</p>
                            </div>
                            <div className="room-field">
                                <p>Readers: </p>
                                <p>{items.readers.length}</p>
                            </div>
                            <Link state={{from: items}} replace to="/room" onClick={() => addToReadersBtn(items.roomId)}><button className="btn btn-warning entry" >Enter Room</button></Link>
                            <button className="btn trash" onClick={() => removeRoomBtn(items.roomId)}>🗑️</button>
                        </div>
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
                            addRoomBtn()}
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