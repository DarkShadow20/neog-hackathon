import React, { useState,useReducer, useEffect } from 'react'
import { Message } from '../Message/Message'
import {useLocation} from "react-router-dom";
import "./Room.css"
import { useUser } from '../context';
import firebase from "firebase/app"

export const Room = (props) => {
    const location = useLocation();
    const [msg,setMsg]=useState("");
    
    const [refetch, setRefetch] = useState(false)

    const {userState}=useUser();
    const {users,currentUser}=userState

    const [accessMembers, setAccessMembers] = useState(location.state.from.accessMembers)
    const [readers, setReaders] = useState(location.state.from.readers)
    const [raisedHands, setRaisedHands] = useState(location.state.from.raisedHands)
    const [messages, setMessages] = useState(location.state.from.messages)


    const {topic,adminId, roomId}=location.state.from;


    const fetchRoom = async (roomId) => {
            const roomsRef = firebase.firestore().collection("rooms").doc(roomId)
            roomsRef.get()
            .then(function(doc) {
              if (doc.exists) {
                const data = doc.data()
                setAccessMembers(data.accessMembers)
                setReaders(data.readers)
                setRaisedHands(data.raisedHands)
                setMessages(data.messages)
              } else {
                console.log("No such document!");
              }
            }).catch(function(error) {
              console.log("Error getting document:", error);
            });  
    }

    useEffect(() => {
        fetchRoom(roomId)
    },[refetch])


    //const newReaders=readers.map((items)=>({userId:items , isRaisedHand:false }))
    //setReader3(newReaders)
    //console.log(newReaders)
    //console.log(accessMembers,readers,messages,users,currentUser)
    // const users = [
    //     {
    //         id: "abc",
    //         name: "Rupam",
    //         email: "rupam@gmail.com",
    //         password: "123456"
    //     },
    //     {
    //         id: "abc1",
    //         name: "Kunal",
    //         email: "kunal@gmail.com",
    //         password: "123456"
    //     },
    //     {
    //         id: "abc2",
    //         name: "Ram",
    //         email: "ram@gmail.com",
    //         password: "123456"
    //     },
    //     {
    //         id: "admin",
    //         name: "Admin",
    //         email: "admin@gmail.com",
    //         password: "123456"
    //     },
    // ]

    // const currentUser = {
    //     userId: "abc",
    //     name: "Rupam",
    //     email: "rupam@gmail.com",
    //     password: "123456"
    // }

    //const readers = ["abc","abc1","admin"]

    // const accessmembers = ["abc", "abc1", "admin"]
    // console.log(accessmembers)
    const primeMember=accessMembers.find((items)=>items===currentUser.userId)
    // const initialMesasges = [
    //     {
    //         text: "I love react",
    //         userId: "abc",
    //         timestamp: 1,
    //         name: "Rupam"
    //     },
    //     {
    //         text: "I also like react but angular is not that bad",
    //         userId: "abc1",
    //         timestamp: 2,
    //         name: "Kunal"
    //     },
    //     {
    //         text: "You should try it once",
    //         userId: "abc1",
    //         timestamp: 3,
    //         name: "Kunal"
    //     },
    //     {
    //         text: "Oh..if you are saying I should try once.",
    //         userId: "abc",
    //         timestamp: 4,
    //         name: "Rupam"
    //     },
    //     {
    //         text: "Yaa you can",
    //         userId: "abc1",
    //         timestamp: 5,
    //         name: "Kunal"
    //     },
    //     {
    //         text: "All of you. Give valid points",
    //         userId: "admin",
    //         timestamp: 6,
    //         name: "Admin"
    //     },
    //     {
    //         text: "Ok. we are deviating",
    //         userId: "abc1",
    //         timestamp: 7,
    //         name: "Kunal"
    //     },
    //     {
    //         text: "Ok give some advantages over that",
    //         userId: "abc",
    //         timestamp: 8,
    //         name: "Rupam"
    //     },
    //     {
    //         text: "and some disadvantages too",
    //         userId: "abc",
    //         timestamp: 9,
    //         name: "Rupam"
    //     },
    //     {
    //         text: "Here are some advantages",
    //         userId: "abc1",
    //         timestamp: 10,
    //         name: "Kunal"
    //     },

    // ]


   // const [state,dispatch]=useReducer(reducer,messages)

  /*  function reducer(state,action){
        switch(action.type){
            case 'ADD_MESSAGE':
                return[...state,{
                    text:action.payload.msg,
                    userId: currentUser.userId,
                    timeStamp:action.payload.timeStamp,
                    name: currentUser.name}]
            default:
                return {...state}
        }
    }*/
    function msgHandler(){
        let timeStamp = new Date().getTime();
        //dispatch({type:"ADD_MESSAGE",payload: { msg, timeStamp }})

        const newMessage = {
                    text: msg,
                    userId: currentUser.userId,
                    timeStamp: timeStamp,
                    name: currentUser.name
        }
        
        const roomsRef = firebase.firestore().collection("rooms").doc(roomId)
        roomsRef.update({
            messages: firebase.firestore.FieldValue.arrayUnion(newMessage)
        })
        
        setRefetch(!refetch)
        setMsg("")
    }



    const permissionHandler=(desiredUserId)=>{
        const roomsRef = firebase.firestore().collection("rooms").doc(roomId)
        roomsRef.update({
            raisedHands: firebase.firestore.FieldValue.arrayUnion(desiredUserId)
        })
        setRefetch(!refetch)
    }

    const giveAccess = (desiredUserId) => {
        const roomsRef = firebase.firestore().collection("rooms").doc(roomId)
        roomsRef.update({
            accessMembers: firebase.firestore.FieldValue.arrayUnion(desiredUserId)
        })
        const foundUserInRaisedHand = raisedHands.find(user => user===desiredUserId)
        if(foundUserInRaisedHand){
            roomsRef.update({
                raisedHands: firebase.firestore.FieldValue.arrayRemove(desiredUserId)
            })
        }
        setRefetch(!refetch)
    }

    const removeAccess = (desiredUserId) => {
        const roomsRef = firebase.firestore().collection("rooms").doc(roomId)
        roomsRef.update({
            accessMembers: firebase.firestore.FieldValue.arrayRemove(desiredUserId)
        })
        setRefetch(!refetch)
    }

   

    return (
        <div className="room-container">
            <div className="room-left-section">
                <h2>{topic}{" "}{currentUser.name}</h2>
                <div className="chat-area">
                    {messages.map((message, idx) => {
                        return <Message message={message} userId={currentUser.userId} key={idx}/>
                    })}
                </div>
                {primeMember?<div className="input-group mb-3 message">
                                        <input className="form-control" placeholder="Type a message" onChange={(e)=>setMsg(e.target.value)}/>
                                        <button className="btn btn-primary" onClick={()=>msgHandler()}>Send</button>
                                    </div>
                        :<button onClick={()=>permissionHandler(currentUser.userId)}>Raise Hand</button>}
            </div>
            <div className="room-right-section">
                <h2>Readers</h2>
                <div className="reader-list">
                    {currentUser.userId === adminId ? <>{users.map(user => {
                        return readers.map(reader => {
                            if(reader.userId === user.userId){
                                return <div className="reader-div">
                                            <p>{reader.name}</p>
                                            <button className="btn btn-success" onClick={() => giveAccess(reader.userId)}>Access</button>
                                        </div>
                            }
                            return null
                        })
                    })}</>: <>{users.map(user => {
                        return readers.map(reader => {
                            if(reader.userId === user.userId){
                                return <div className="reader-div">
                                            <p>{reader.name}</p>
                                            <div></div>
                                        </div>
                            }
                            return null
                        })
                    })} </>}   
                </div>
                <div className="reader-list">
                    <h3>Writers</h3>
                   {users.map(user => {
                        return accessMembers.map(accessMember => {
                            if(accessMember === user.userId){
                                return <div className="reader-div">
                                            <p>{user.name}</p>
                                            <button className="btn btn-danger" onClick={() => removeAccess(user.userId)}>Remove</button>
                                        </div>
                            }
                            return null
                        })
                    })}   
                </div>
                <div className="reader-list">
                    <h3>Hand Raised</h3>
                   {users.map(user => {
                        return raisedHands.map(hand => {
                            if(hand === user.userId){
                                return <div className="reader-div">
                                            <p>{user.name}</p>
                                        </div>
                            }
                            return null
                        })
                    })}   
                </div>
            </div>
        </div>
    )
}
