import RoomCard 
from '../components/RoomCard.jsx'; 
import { rooms } 
from '../data/rooms.js'; 
export default function HomePage() { 
    return <main><h1>Готельний комплекс</h1><p>Комфортний відпочинок та затишні номери для наших гостей.</p><h2>Наші номери</h2><div className="rooms">{rooms.map((room) => <RoomCard key={room.id} room={room} />)}</div></main> }