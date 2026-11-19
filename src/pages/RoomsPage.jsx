
import { useEffect, useRef } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { rooms } from '../data/rooms.js'
import RoomFilters from '../components/rooms/RoomFilters.jsx'
import RoomList from '../components/rooms/RoomList.jsx'
import useRoomFilters from '../hooks/useRoomFilters.js'
import useRoomSelection from '../hooks/useRoomSelection.js'
import './RoomsPage.css'

gsap.registerPlugin(ScrollTrigger)

const heroImage = rooms[5]?.image || rooms[0]?.image

export default function RoomsPage() {
  const pageRef = useRef(null)

  const { selectedId, selectRoom } = useRoomSelection()

  const {
    query,
    availableOnly,
    visibleRooms,
    resetFilters,
  } = useRoomFilters(rooms)

  useEffect(() => {
    const page = pageRef.current

    if (!page) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    const context = gsap.context(() => {
      const elements = gsap.utils.toArray('.rooms-reveal')

      elements.forEach((element) => {
        gsap.fromTo(
          element,
          {
            autoAlpha: 0,
            y: 35,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 90%',
              once: true,
            },
          }
        )
      })
    }, page)

    return () => {
      context.revert()
    }
  }, [])

  const emptyTitle =
    rooms.length === 0
      ? 'Номери ще не додано.'
      : 'За цими фільтрами нічого не знайдено.'

  return (
    <div
      className="rooms-page"
      ref={pageRef}
      style={{
        display: 'block',
        width: '100%',
        maxWidth: 'none',
        minWidth: 0,
        margin: 0,
        padding: 0,
      }}
    >
      {/* HERO */}

      <section className="rooms-hero">
        <div className="rooms-hero-copy">
          <span className="rooms-label">
            HOTEL & WELLNESS / ROOMS
          </span>

          <div className="rooms-hero-title">
            <span className="rooms-overline">
              МІСЦЕ, ДЕ ХОЧЕТЬСЯ ЗАЛИШИТИСЬ
            </span>

            <h1>
              ПРОСТІР
              <br />
              ДЛЯ
              <br />
              <em>ВІДПОЧИНКУ.</em>
            </h1>
          </div>

          <div className="rooms-hero-bottom">
            <p>
              Від затишних стандартних номерів до
              просторих люксів. Знайдіть свій
              ідеальний простір для відпочинку.
            </p>

            <a
              href="#rooms-catalog"
              className="rooms-scroll-button"
              aria-label="Перейти до номерів"
            >
              <ArrowDown size={24} />
            </a>
          </div>
        </div>

        <div className="rooms-hero-photo">
          <img
            src={heroImage}
            alt="Інтер'єр готельного номера"
            fetchPriority="high"
            decoding="async"
          />

          <div className="rooms-hero-photo-label">
            <span>YOUR SPACE TO UNWIND</span>
            <ArrowUpRight size={20} />
          </div>
        </div>
      </section>

      {/* КАТАЛОГ НОМЕРІВ */}

      <section
        className="rooms-catalog"
        id="rooms-catalog"
      >
        <div className="rooms-catalog-heading rooms-reveal">
          <span className="rooms-label">
            01 / КОЛЕКЦІЯ НОМЕРІВ
          </span>

          <div className="rooms-catalog-heading-row">
            <h2>
              Оберіть свій
              <br />
              <em>ідеальний номер.</em>
            </h2>

            <p>
              Вісім категорій номерів для різних
              побажань, подорожей та особливих моментів.
            </p>
          </div>
        </div>

        <div className="rooms-filter-panel">
          <RoomFilters
            query={query}
            availableOnly={availableOnly}
            onReset={resetFilters}
          />

          <p className="rooms-results">
            Знайдено категорій: {visibleRooms.length}
          </p>
        </div>

        <RoomList
          rooms={visibleRooms}
          selectedId={selectedId}
          onSelect={selectRoom}
          emptyTitle={emptyTitle}
        />
      </section>
    </div>
  )
}
