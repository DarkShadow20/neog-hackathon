import React, { useState,useReducer } from 'react'
import { Message } from '../Message/Message'
import {useLocation} from "react-router-dom";
import "./Room.css"

export const Room = (props) => {
    const location = useLocation();
    const [msg,setMsg]=useState();
    console.log(location.state)
    const users = [
        {
            id: "abc",
            name: "Rupam",
            email: "rupam@gmail.com",
            password: "123456"
        },
        {
            id: "abc1",
            name: "Kunal",
            email: "kunal@gmail.com",
            password: "123456"
        },
        {
            id: "abc2",
            name: "Ram",
            email: "ram@gmail.com",
            password: "123456"
        },
        {
            id: "admin",
            name: "Admin",
            email: "admin@gmail.com",
            password: "123456"
        },
    ]

    const currentUser = {
        userId: "abc",
        name: "Rupam",
        email: "rupam@gmail.com",
        password: "123456"
    }

    const readers = ["abc","abc1","admin"]

    const accessMembers = ["abc", "abc1", "admin"]
    const primeMember=accessMembers.find((items)=>items===currentUser.userId)
    const initialMesasges = [
        {
            text: "I love react",
            userId: "abc",
            timestamp: 1,
            name: "Rupam"
        },
        {
            text: "I also like react but angular is not that bad",
            userId: "abc1",
            timestamp: 2,
            name: "Kunal"
        },
        {
            text: "You should try it once",
            userId: "abc1",
            timestamp: 3,
            name: "Kunal"
        },
        {
            text: "Oh..if you are saying I should try once.",
            userId: "abc",
            timestamp: 4,
            name: "Rupam"
        },
        {
            text: "Yaa you can",
            userId: "abc1",
            timestamp: 5,
            name: "Kunal"
        },
        {
            text: "All of you. Give valid points",
            userId: "admin",
            timestamp: 6,
            name: "Admin"
        },
        {
            text: "Ok. we are deviating",
            userId: "abc1",
            timestamp: 7,
            name: "Kunal"
        },
        {
            text: "Ok give some advantages over that",
            userId: "abc",
            timestamp: 8,
            name: "Rupam"
        },
        {
            text: "and some disadvantages too",
            userId: "abc",
            timestamp: 9,
            name: "Rupam"
        },
        {
            text: "Here are some advantages",
            userId: "abc1",
            timestamp: 10,
            name: "Kunal"
        },

    ]
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
    const [state,dispatch]=useReducer(reducer,initialMesasges)
    return (
        <div className="room-container">
            <div className="room-left-section">
                <h2>Topic</h2>
                <div className="chat-area">
                    {state.map((message, idx) => {
                        return <Message message={message} userId={currentUser.userId} key={idx}/>
                    })}
                </div>
                {primeMember?<div className="input-group mb-3 message">
                                        <input className="form-control" placeholder="Type a message" onChange={(e)=>setMsg(e.target.value)}/>
                                        <button className="btn btn-primary" onClick={()=>msgHandler(primeMember)}>Send</button>
                                    </div>
                        :<button>Raise Hand</button>}
            </div>
            <div className="room-right-section">
                <h2>Readers</h2>
                <div className="reader-list">
                    {users.map(user => {
                        return readers.map(reader => {
                            if(reader === user.id){
                                return <div className="reader">
                                            <h5>{user.name}</h5>
                                            <button className="btn btn-secondary">Access</button>
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
