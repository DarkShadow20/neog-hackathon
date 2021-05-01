import React from 'react'
import { Message } from '../Message/Message'
import "./Room.css"

export const Room = () => {

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

    const accessMembers = ["abc", "abc1"]

    const mesasges = [
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
    ]
    return (
        <div className="room-container">
            <div className="room-left-section">
                <h2>Topic</h2>
                <div className="chat-area">
                    {mesasges.map((message, idx) => {
                        return <Message message={message} userId={currentUser.userId} key={idx}/>
                    })}
                </div>
                {accessMembers.map(member => {
                        if(member === currentUser.userId){
                            return <div className="input-group mb-3 message">
                                    <input className="form-control" placeholder="Type a message"/>
                                    <button className="btn btn-primary">Send</button>
                                    </div>
                        }
                        return null
                    })
                }
            </div>
            <div className="room-right-section">
                <h2>Readers</h2>
                <div className="reader-list">
                    {users.map(user => {
                        return readers.map(reader => {
                            if(reader === user.id){
                                return <div className="reader">
                                            <h4>{user.name}</h4>
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
