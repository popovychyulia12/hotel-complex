
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  MoveUpRight,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import StayPlanner from '../components/StayPlanner.jsx'
import './HomePage.css'

gsap.registerPlugin(ScrollTrigger)

let introAlreadyShown = false


const images = {
  hero: '/hotel-hero.png.webp',
  interiorOne: '/rooms/Одномісний 1 2.webp',
  interiorTwo: '/spaprogram/карпатська гармонія.webp',
  interiorThree: '/menu/ресторан 2.webp',
  restaurant: '/menu/ресторан 4.webp',
  spa: '/spaprogram/романтичний спа.webp',
  landscape: '/services/вайфай.webp',
}



const rooms = [
  {
    id: 1,
    number: '01',
    name: 'Стандартний двомісний',
    subtitle: 'КОМФОРТ ДЛЯ ДВОХ',
    description:
      'Затишний простір для спокійного відпочинку, неквапливих ранків і вечорів удвох.',
    price: '1 800',
    image: '/rooms/Стандарт 2 1 (2).webp',
  },
  {
    id: 2,
    number: '02',
    name: 'Люкс',
    subtitle: 'ОСОБЛИВИЙ КОМФОРТ',
    description:
      'Більше простору, продуманий інтер’єр та атмосфера, у якій легко забути про буденність.',
    price: '3 200',
    image: '/rooms/Люкс 1.webp',
  },
  {
    id: 3,
    number: '03',
    name: 'Сімейний номер',
    subtitle: 'ЧАС БУТИ РАЗОМ',
    description:
      'Місце для спільного відпочинку з близькими, приємних розмов і нових спогадів.',
    price: '4 000',
    image: '/rooms/Сімейний 1.webp',
  },
]

const experiences = [
  {
    id: '01',
    category: 'ГАСТРОНОМІЯ',
    title: 'Ресторан',
    description: 'Смакуйте моменти, які хочеться продовжити.',
    image: images.restaurant,
    url: '/restaurant',
  },
  {
    id: '02',
    category: 'ВІДНОВЛЕННЯ',
    title: 'SPA & Wellness',
    description: 'Простір, у якому можна нарешті сповільнитися.',
    image: images.spa,
    url: '/spa',
  },
  {
    id: '03',
    category: 'ВРАЖЕННЯ',
    title: 'Послуги',
    description: 'Більше можливостей для особливого відпочинку.',
    image: images.interiorThree,
    url: '/services',
  },
]

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function HomePage() {
  const pageRef = useRef(null)
  const introRef = useRef(null)
  const introImageRef = useRef(null)
  const introTimelineRef = useRef(null)
  const roomImageRef = useRef(null)
  const roomContentRef = useRef(null)
  const roomTimelineRef = useRef(null)
  const roomSwitchingRef = useRef(false)

  const [activeRoom, setActiveRoom] = useState(0)

  const [introVisible, setIntroVisible] = useState(() => {
    const shouldShow =
      !introAlreadyShown &&
      typeof window !== 'undefined' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (shouldShow) introAlreadyShown = true

    return shouldShow
  })

  const currentRoom = rooms[activeRoom]

  useEffect(() => {
    const reducedMotion = prefersReducedMotion()
    const previousOverflow = document.body.style.overflow

    if (introVisible && introRef.current && !reducedMotion) {
      document.body.style.overflow = 'hidden'
    }

    const context = gsap.context(() => {
      if (introVisible && introRef.current && !reducedMotion) {
        const timeline = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = previousOverflow
            setIntroVisible(false)
            ScrollTrigger.refresh()
          },
        })

        introTimelineRef.current = timeline

        timeline
          .fromTo(
            introImageRef.current,
            {
              scale: 1,
              filter: 'brightness(0.65)',
            },
            {
              scale: 1.28,
              filter: 'brightness(1)',
              duration: 2.8,
              ease: 'power2.inOut',
            }
          )
          .to(
            introRef.current,
            {
              autoAlpha: 0,
              duration: 0.8,
              ease: 'power2.inOut',
            },
            '-=0.5'
          )
      }

      if (reducedMotion) return

      gsap.fromTo(
        '.lux-hero-title-line',
        {
          yPercent: 110,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.35,
          stagger: 0.13,
          delay: 0.25,
          ease: 'power4.out',
        }
      )

      gsap.utils.toArray('.lux-reveal').forEach((element) => {
        gsap.fromTo(
          element,
          {
            y: 48,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 90%',
              once: true,
            },
          }
        )
      })

      gsap.utils.toArray('.lux-image-reveal').forEach((element) => {
        gsap.fromTo(
          element,
          {
            clipPath: 'inset(9% 5% 9% 5%)',
            opacity: 0.65,
          },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.25,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 88%',
              once: true,
            },
          }
        )
      })

      gsap.utils.toArray('.lux-parallax').forEach((element) => {
        gsap.fromTo(
          element,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: {
              trigger: element.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        )
      })
    }, pageRef)

    return () => {
      introTimelineRef.current?.kill()
      roomTimelineRef.current?.kill()

      gsap.killTweensOf([
        roomImageRef.current,
        roomContentRef.current,
      ].filter(Boolean))

      roomSwitchingRef.current = false
      context.revert()
      document.body.style.overflow = previousOverflow
    }
  }, [])

  function skipIntro() {
    if (introTimelineRef.current) {
      introTimelineRef.current.progress(1)
    } else {
      document.body.style.overflow = ''
      setIntroVisible(false)
    }
  }

  function changeRoom(index) {
    if (
      index === activeRoom ||
      roomSwitchingRef.current ||
      index < 0 ||
      index >= rooms.length
    ) {
      return
    }

    if (prefersReducedMotion()) {
      setActiveRoom(index)
      return
    }

    const elements = [
      roomImageRef.current,
      roomContentRef.current,
    ].filter(Boolean)

    if (!elements.length) {
      setActiveRoom(index)
      return
    }

    roomSwitchingRef.current = true
    roomTimelineRef.current?.kill()

    roomTimelineRef.current = gsap.timeline({
      onComplete: () => {
        roomSwitchingRef.current = false
        roomTimelineRef.current = null
      },
    })

    roomTimelineRef.current
      .to(elements, {
        opacity: 0,
        y: 12,
        duration: 0.22,
      })
      .call(() => {
        setActiveRoom(index)
      })
      .fromTo(
        elements,
        {
          opacity: 0,
          y: 16,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        }
      )
  }

  function nextRoom() {
    changeRoom((activeRoom + 1) % rooms.length)
  }

  function previousRoom() {
    changeRoom((activeRoom - 1 + rooms.length) % rooms.length)
  }

  return (
    <div className="lux-home" ref={pageRef}>

      {/* 01 — ВСТУПНА АНІМАЦІЯ */}
      {introVisible && (
        <div className="lux-intro" ref={introRef}>
          <img
            ref={introImageRef}
            src={images.hero}
            alt=""
            fetchPriority="high"
          />

          <button
            type="button"
            className="lux-intro-skip"
            onClick={skipIntro}
            aria-label="Пропустити вступ"
          >
            <ArrowRight size={21} />
          </button>
        </div>
      )}

      {/* 02 — ГОЛОВНИЙ ЕКРАН */}
      <section className="lux-hero-section">
        <div className="lux-hero">
          <div className="lux-hero-image">
            <img
              src={images.hero}
              alt="HOTEL & WELLNESS — готель із басейном"
              fetchPriority="high"
            />
          </div>

          <div className="lux-hero-overlay" />

          <div className="lux-hero-action">
            <Link
              to="/rooms"
              className="lux-hero-circle"
              aria-label="Переглянути номери"
            >
              <ArrowUpRight size={30} />
            </Link>
          </div>

          <div className="lux-hero-bottom">
            <h1
              className="lux-hero-title"
              style={{
                margin: 0,
                width: '100%',
                fontSize: 'inherit',
                fontWeight: 'inherit',
              }}
            >
              <div className="lux-title-mask">
                <span
                  className="lux-hero-title-line"
                  style={{
                    fontSize: 'clamp(64px, 10vw, 175px)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  HOTEL &
                </span>
              </div>

              <div className="lux-title-mask">
                <span
                  className="lux-hero-title-line"
                  style={{
                    fontSize: 'clamp(64px, 10vw, 175px)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  WELLNESS
                </span>
              </div>
            </h1>
          </div>
        </div>

        <div className="lux-hero-under">
          <p>
            Комфорт. Відпочинок. Нові враження.
            <br />
            Усе, що потрібно, — в одному місці.
          </p>

          <Link to="/rooms" className="lux-under-link">
            Знайти свій номер
            <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>

      {/* 03 — ГАЛЕРЕЯ */}
      <section className="lux-discover">
        <div className="lux-section-heading lux-reveal">
          <div>
            <span className="lux-eyebrow">
              01 / ВІДКРИЙТЕ ДЛЯ СЕБЕ
            </span>

            <h2>
              Більше, ніж
              <br />
              просто <em>готель.</em>
            </h2>
          </div>

          <p>
            Продуманий простір для відпочинку,
            натхнення та моментів, які хочеться
            залишити у пам'яті.
          </p>
        </div>

        <div className="lux-gallery">
          <Link
            to="/rooms"
            className="lux-gallery-card lux-gallery-main lux-image-reveal"
          >
            <img
              src={images.interiorOne}
              alt="Інтер'єр готельного номера"
              loading="lazy"
              decoding="async"
            />

            <span className="lux-gallery-index">01 / 03</span>

            <div className="lux-gallery-bottom">
              <div>
                <small>ПРОЖИВАННЯ</small>
                <h3>Номери</h3>
              </div>

              <span className="lux-gallery-arrow">
                <ArrowUpRight size={23} />
              </span>
            </div>
          </Link>

          <Link
            to="/spa"
            className="lux-gallery-card lux-gallery-second lux-image-reveal"
          >
            <img
              src={images.spa}
              alt="SPA-зона"
              loading="lazy"
              decoding="async"
            />

            <span className="lux-gallery-index">02 / 03</span>

            <div className="lux-gallery-bottom">
              <div>
                <small>ВІДНОВЛЕННЯ</small>
                <h3>SPA & Wellness</h3>
              </div>

              <span className="lux-gallery-arrow">
                <ArrowUpRight size={23} />
              </span>
            </div>
          </Link>

          <Link
            to="/restaurant"
            className="lux-gallery-card lux-gallery-third lux-image-reveal"
          >
            <img
              src={images.restaurant}
              alt="Ресторан готелю"
              loading="lazy"
              decoding="async"
            />

            <span className="lux-gallery-index">03 / 03</span>

            <div className="lux-gallery-bottom">
              <div>
                <small>ГАСТРОНОМІЯ</small>
                <h3>Ресторан</h3>
              </div>

              <span className="lux-gallery-arrow">
                <ArrowUpRight size={23} />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 04 — АТМОСФЕРА */}
      <section className="lux-statement">
        <span className="lux-eyebrow">
          THE ART OF SLOW LIVING
        </span>

        <p className="lux-reveal">
          Відпочинок починається там,
          <br />
          де можна <em>бути собою.</em>
        </p>

        <span className="lux-statement-symbol">✳</span>
      </section>

      {/* 05 — НОМЕРИ */}
      <section className="lux-rooms">
        <div className="lux-section-heading lux-reveal">
          <div>
            <span className="lux-eyebrow">
              02 / НАШІ НОМЕРИ
            </span>

            <h2>
              Оберіть свій
              <br />
              <em>простір.</em>
            </h2>
          </div>

          <Link to="/rooms" className="lux-text-link">
            Усі номери
            <ArrowUpRight size={19} />
          </Link>
        </div>

        <div className="lux-room-showcase">
          <div className="lux-room-image" ref={roomImageRef}>
            <img
              src={currentRoom.image}
              alt={currentRoom.name}
              loading="lazy"
              decoding="async"
            />

            <span className="lux-room-image-index">
              {currentRoom.number} / 03
            </span>
          </div>

          <div className="lux-room-panel">
            <div className="lux-room-tabs">
              {rooms.map((room, index) => (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => changeRoom(index)}
                  className={
                    activeRoom === index
                      ? 'lux-room-tab active'
                      : 'lux-room-tab'
                  }
                  aria-pressed={activeRoom === index}
                >
                  {room.number}
                </button>
              ))}
            </div>

            <div
              className="lux-room-content"
              ref={roomContentRef}
            >
              <span className="lux-eyebrow">
                {currentRoom.subtitle}
              </span>

              <h3>{currentRoom.name}</h3>
              <p>{currentRoom.description}</p>

              <div className="lux-room-price">
                від {currentRoom.price} грн / ніч
              </div>

              <Link
                to={`/rooms/${currentRoom.id}`}
                className="lux-button"
              >
                Детальніше про номер
                <ArrowUpRight size={19} />
              </Link>
            </div>

            <div className="lux-room-navigation">
              <span>
                0{activeRoom + 1}
                <span className="lux-room-total"> / 03</span>
              </span>

              <div>
                <button
                  type="button"
                  onClick={previousRoom}
                  aria-label="Попередній номер"
                >
                  <ArrowLeft size={20} />
                </button>

                <button
                  type="button"
                  onClick={nextRoom}
                  aria-label="Наступний номер"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — КОНСТРУКТОР ВІДПОЧИНКУ */}
      <section className="lux-planner-section">
        <div className="lux-planner-heading lux-reveal">
          <span className="lux-eyebrow">
            03 / ВАШ ВІДПОЧИНОК
          </span>

          <h2>
            Створіть власний
            <br />
            <em>сценарій відпочинку.</em>
          </h2>

          <p>
            Кілька відповідей — і ми допоможемо
            підібрати найкращий варіант.
          </p>
        </div>

        <div className="lux-planner-layout">
          <div className="lux-planner-photo lux-planner-photo-left">
            <img
              src={images.interiorTwo}
              alt="Сучасний інтер'єр готелю"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="lux-planner-center">
            <div className="lux-planner-center-top">
              <span>PERSONAL STAY PLANNER</span>
              <span>01 — 04</span>
            </div>

            <div className="lux-planner-widget">
              <StayPlanner />
            </div>
          </div>

          <div className="lux-planner-photo lux-planner-photo-right">
            <img
              src={images.interiorThree}
              alt="Затишний інтер'єр"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* 07 — ПОСЛУГИ ТА ВРАЖЕННЯ */}
      <section className="lux-experiences">
        <div className="lux-section-heading lux-reveal">
          <div>
            <span className="lux-eyebrow">
              04 / ВРАЖЕННЯ
            </span>

            <h2>
              Більше
              <br />
              <em>можливостей.</em>
            </h2>
          </div>

          <p>
            Від гастрономічних відкриттів
            до повного перезавантаження.
          </p>
        </div>

        <div className="lux-experience-list">
          {experiences.map((item) => (
            <Link
              to={item.url}
              key={item.id}
              className="lux-experience"
            >
              <span className="lux-experience-index">
                {item.id}
              </span>

              <div className="lux-experience-photo">
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="lux-experience-copy">
                <span className="lux-eyebrow">
                  {item.category}
                </span>

                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>

              <span className="lux-experience-arrow">
                <MoveUpRight size={23} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 08 — БАСЕЙН / SPA */}
      <section className="lux-atmosphere">
        <div className="lux-atmosphere-image">
          <img
            src={images.landscape}
            alt="Басейн готельного комплексу"
            className="lux-parallax"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="lux-atmosphere-overlay" />

        <div className="lux-atmosphere-content lux-reveal">
          <span className="lux-eyebrow">
            A MOMENT TO REMEMBER
          </span>

          <h2>
            Знайдіть час
            <br />
            <em>для себе.</em>
          </h2>

          <Link to="/about" className="lux-outline-button">
            Більше про комплекс
            <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>

      {/* 09 — ФІНАЛЬНИЙ БЛОК */}
      <section className="lux-final">
        <div>
          <span className="lux-eyebrow">
            YOUR NEXT ESCAPE
          </span>

          <h2 className="lux-reveal">
            Ваш відпочинок
            <br />
            починається <em>тут.</em>
          </h2>
        </div>

        <Link to="/rooms" className="lux-final-button">
          Обрати номер
          <ArrowUpRight size={22} />
        </Link>
      </section>
    </div>
  )
}
