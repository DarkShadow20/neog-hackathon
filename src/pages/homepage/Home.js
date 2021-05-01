import "./Home.css";
import NavBar from '../../components/NavBar';
import { Link } from 'react-router-dom';
export const rooms=[{
    id:1,
    name:"neog",
    admin:"Tanay",
    participant:20
},{
    id:2,
    name:"teamtanay",
    admin:"Tanay",
    participant:50
},{
    id:3,
    name:"mico",
    admin:"Mihir",
    participant:10
},{
    id:4,
    name:"Simply Gaming",
    admin:"Sumit",
    participant:30
},{
    id:5,
    name:"avalon meet",
    admin:"Varun",
    participant:45
},{
    id:6,
    name:"Songs",
    admin:"Kunal",
    participant:10
}]

function Home() {
    return (
        <>
            <NavBar/>
            <div className="room-section">
                {rooms.map((items)=>(
                    <Link to={{
                        pathname:'/room',
                        state:{items:items}
                        }}
                        >
                        <div className="rooms"  key={items.id}>
                            Channel Name: {items.name}<br/>
                            Admin Name: {items.admin}<br/>
                            Total Participants: {items.participant}
                        </div>
                    </Link>
                ))}
            <footer>
                <button className="create-room">Create Room</button>
            </footer>
            </div>
        </>
    )
}

export default Home