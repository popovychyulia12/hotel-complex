import { rooms } from '../data/rooms.js'
import Section from '../components/ui/Section.jsx'
import RoomList from '../components/rooms/RoomList.jsx'

export default function HomePage() {
  return (
    <>
      <Section id="about" title="Про готель">
        <p>
          Комфортний відпочинок та затишні номери для наших гостей.
        </p>
      </Section>

      <Section id="rooms" title="Наші номери">
       <RoomList rooms={rooms} />
      </Section>
    </>
  )
}
