import React, { useState, useEffect, useRef } from 'react'
import { Message } from '../../Message/Message'
import {useLocation} from "react-router-dom";
import "./Room.css"
import { useUser } from '../../context';
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

    const messagesRef = useRef(null);
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
                scrollToBottom();
              } else {
                console.log("No such document!");
              }
            }).catch(function(error) {
              console.log("Error getting document:", error);
            });  
    }

    useEffect(() => {
        fetchRoom(roomId)
        //eslint-disable-next-line
    },[refetch])

    const scrollToBottom=()=>{
        console.log("inside bottom")
        messagesRef.current.scrollIntoView({
            behavior:"smooth",
            block:"nearest"
        })
    }

    const primeMember=accessMembers.find((items)=>items===currentUser.userId)
    
    function msgHandler(){
        let timeStamp = new Date().getTime();
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
        const alreadyRaisedHand = raisedHands.find(hand => hand === desiredUserId)
        if(alreadyRaisedHand){
            alert("Your hand is raised")
        }else {
        const roomsRef = firebase.firestore().collection("rooms").doc(roomId)
        roomsRef.update({
            raisedHands: firebase.firestore.FieldValue.arrayUnion(desiredUserId)
        })
        setRefetch(!refetch)}
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
                <div className="heading">
                    <h2>{topic}</h2>
                    <span className="current-user">{currentUser.name}</span>
                </div>
                <div className="chat-area">
                    {messages.map((message, idx) => {
                        return <Message message={message} userId={currentUser.userId} key={idx}/>
                    })}
                    <div ref={messagesRef}/>
                </div>
                {primeMember?<div className="input-group mb-3 message" >
                        <input className="form-control" placeholder="Type a message" onChange={(e)=>setMsg(e.target.value)}/>
                        <button className="btn btn-primary" onClick={()=>msgHandler()}>Send</button>
                            </div>
                :<button onClick={()=>permissionHandler(currentUser.userId)} className="btn raiseHand">Raise Hand✋</button>}
            </div>
            <div className="room-right-section">
                <h2>📖{" "}Readers</h2>
                <div className="reader-list">
                    {currentUser.userId === adminId ? <div>{users.map(user => {
                        return readers.map(reader => {
                            if(reader.userId === user.userId){
                                return <div className="reader-div">
                                            {reader.userId===adminId?<p><span className="admin">Admin</span>{reader.name}</p>:<p>{reader.name}</p>}
                                            <button className="btn btn-success" onClick={() => giveAccess(reader.userId)}>Access</button>
                                        </div>
                            }
                            return null
                        })
                    })}</div>: <div>{users.map(user => {
                        return readers.map(reader => {
                            if(reader.userId === user.userId){
                                return <div className="reader-div">
                                            {reader.userId===adminId?<p><span className="admin">Admin</span>{reader.name}</p>:<p>{reader.name}</p>}
                                            <div></div>
                                        </div>
                            }
                            return null
                        })
                    })} </div>}   
                </div>
                <div className="reader-list">
                    <h3>✍️{" "}Writers</h3>
                    {currentUser.userId === adminId ? <div> {users.map(user => {
                        return accessMembers.map(accessMember => {
                            if(accessMember === user.userId){
                                return <div className="reader-div">
                                            <p>{user.name}</p>
                                            {user.userId !== adminId ? <button className="btn btn-danger" onClick={() => removeAccess(user.userId)}>Remove</button> : null}
                                        </div>
                            }
                            return null
                        })
                    })} </div> : <div> {users.map(user => {
                        return accessMembers.map(accessMember => {
                            if(accessMember === user.userId){
                                return <div className="reader-div">
                                            <p>{user.name}</p>
                                            <div></div>
                                        </div>
                            }
                            return null
                        })
                    })} </div>}
                </div>
                <div className="reader-list">
                    <h3>✋{" "}Hand Raised</h3>
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
