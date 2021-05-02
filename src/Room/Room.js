import React, { useState,useReducer } from 'react'
import { Message } from '../Message/Message'
import {useLocation} from "react-router-dom";
import "./Room.css"
import { useUser } from '../context';

export const Room = (props) => {
    const location = useLocation();
    const [msg,setMsg]=useState();
    const [permission,setPermission]=useState(false)
    const [reader3,setReader3]=useState([])
    const {userState}=useUser();
    const {users,currentUser}=userState
    console.log(location.state.from)
    const {accessMembers,readers,messages,topic,adminId}=location.state.from;

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
    function reducer(state,action){
        switch(action.type){
            case 'ADD_MESSAGE':
                return[...state,{text:action.payload.msg,userId:action.payload.primeMember,timeStamp:action.payload.timeStamp,name:"Admin"}]
            default:
                return {...state}
        }
    }
    function msgHandler(primeMember){
        let timeStamp = new Date().getTime();
        dispatch({type:"ADD_MESSAGE",payload:{msg,primeMember,timeStamp}})
        setMsg("")
    }
    const permissionHandler=(userId)=>{
        readers.map((items)=>{
            if(items.userId===userId){
                return items.isRaisedHand=true;
            }
            return items
        })
    }
    const [state,dispatch]=useReducer(reducer,messages)
    return (
        <div className="room-container">
            <div className="room-left-section">
                <h2>{topic}{" "}{currentUser.name}</h2>
                <div className="chat-area">
                    {state.map((message, idx) => {
                        return <Message message={message} userId={currentUser.userId} key={idx}/>
                    })}
                </div>
                {primeMember?<div className="input-group mb-3 message">
                                        <input className="form-control" placeholder="Type a message" onChange={(e)=>setMsg(e.target.value)}/>
                                        <button className="btn btn-primary" onClick={()=>msgHandler(primeMember)}>Send</button>
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
                                            <div>{reader.isRaisedHand && "✋"}</div>
                                            <h5>{user.name}</h5>
                                            <div>{reader.hasAccess && "✔️"}</div>
                                            <button className="btn btn-secondary">Access</button>
                                        </div>
                            }
                            return null
                        })
                    })}</>: <>{users.map(user => {
                        return readers.map(reader => {
                            if(reader.userId === user.userId){
                                return <div className="reader-div">
                                            <div>{reader.isRaisedHand && "✋"}</div>
                                            <p>{user.name}</p>
                                            <div>{reader.hasAccess && "✔️"}</div>
                                            <div></div>
                                        </div>
                            }
                            return null
                        })
                    })} </>}


                   
                </div>
            </div>
        </div>
    )
}
