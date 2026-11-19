
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownRight,
  Clock3,
  X,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import './SpaProgramsPage.css'

gsap.registerPlugin(ScrollTrigger)

const categories = [
  'Усі програми',
  'Масажі',
  'SPA-ритуали',
  'Водні процедури',
  'Для двох',
]

const programs = [
  {
    id: 1,
    name: 'Класичний масаж',
    category: 'Масажі',
    duration: '60 хв',
    price: 950,
    description:
      'Масаж усього тіла, спрямований на розслаблення м’язів та зняття напруження.',
    image: '/spaprogram/класичний масаж.jpg',
  },
  {
    id: 2,
    name: 'Аромамасаж',
    category: 'Масажі',
    duration: '60 хв',
    price: 1100,
    description:
      'Розслаблювальний масаж із використанням ароматичних олій.',
    image: '/spaprogram/аромамасаж.jpg',
  },
  {
    id: 3,
    name: 'Масаж спини',
    category: 'Масажі',
    duration: '30 хв',
    price: 650,
    description:
      'Процедура для розслаблення м’язів спини, шиї та плечей.',
    image: '/spaprogram/масаж спини.jpg',
  },
  {
    id: 4,
    name: 'Масаж гарячим камінням',
    category: 'Масажі',
    duration: '75 хв',
    price: 1350,
    description:
      'Поєднання масажних технік із приємним теплом гладенького каміння.',
    image: '/spaprogram/масаж камінням.jpg',
  },
  {
    id: 5,
    name: 'Карпатська гармонія',
    category: 'SPA-ритуали',
    duration: '120 хв',
    price: 2400,
    description:
      'Комплексний ритуал із масажем, доглядом за тілом та ароматерапією.',
    image: '/spaprogram/карпатська гармонія.jpg',
  },
  {
    id: 6,
    name: 'Шовковий дотик',
    category: 'SPA-ритуали',
    duration: '90 хв',
    price: 1750,
    description:
      'Ніжне скрабування, зволоження шкіри та розслаблювальний масаж.',
    image: '/spaprogram/шовковий дотик.jpg',
  },
  {
    id: 7,
    name: 'Лісове відновлення',
    category: 'SPA-ритуали',
    duration: '120 хв',
    price: 2200,
    description:
      'Догляд за тілом із природними ароматами та розслаблювальними процедурами.',
    image: '/spaprogram/лісове відновлення.jpg',
  },
  {
    id: 8,
    name: 'Фінська сауна',
    category: 'Водні процедури',
    duration: '60 хв',
    price: 850,
    description:
      'Відпочинок у сауні з атмосферою натурального дерева та сухого тепла.',
    image: '/spaprogram/фінська сауна.jpg',
  },
  {
    id: 9,
    name: 'Джакузі',
    category: 'Водні процедури',
    duration: '45 хв',
    price: 750,
    description:
      'Відпочинок у теплій воді з гідромасажем.',
    image: '/spaprogram/джакузі.jpg',
  },
  {
    id: 10,
    name: 'Басейн та релакс',
    category: 'Водні процедури',
    duration: '120 хв',
    price: 600,
    description:
      'Відвідування басейну та відпочинок у зоні релаксу.',
    image: '/spaprogram/басейн.jpg',
  },
  {
    id: 11,
    name: 'Романтичний SPA',
    category: 'Для двох',
    duration: '120 хв',
    price: 3900,
    description:
      'Спільний відпочинок для двох із масажем та атмосферою романтики.',
    image: '/spaprogram/романтичний спа.jpg',
  },
  {
    id: 12,
    name: 'Гармонія для двох',
    category: 'Для двох',
    duration: '150 хв',
    price: 4500,
    description:
      'Комплексна SPA-програма для пари з ароматерапією та відпочинком.',
    image: '/spaprogram/гармонія для двох.jpg',
  },
]

const formatPrice = (price) =>
  `${price.toLocaleString('uk-UA')} грн`

function ProgramImage({ program, loading = 'lazy' }) {
  return (
    <img
      src={program.image}
      alt={program.name}
      loading={loading}
      decoding="async"
    />
  )
}

export default function SpaProgramsPage() {
  const [activeCategory, setActiveCategory] = useState('Усі програми')
  const [selectedProgram, setSelectedProgram] = useState(null)

  const pageRef = useRef(null)
  const modalRef = useRef(null)
  const closeButtonRef = useRef(null)
  const triggerRef = useRef(null)

  const filteredPrograms =
    activeCategory === 'Усі програми'
      ? programs
      : programs.filter(
          (program) => program.category === activeCategory
        )

  const openProgram = (program, trigger) => {
    triggerRef.current = trigger
    setSelectedProgram(program)
  }

  const closeProgram = () => {
    setSelectedProgram(null)
  }

  // GSAP: анімації появи секцій

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (reduceMotion) {
      return
    }

    const context = gsap.context(() => {
      gsap.utils.toArray('.spp-reveal').forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 92%',
              once: true,
            },
          }
        )
      })
    }, pageRef)

    return () => context.revert()
  }, [])

  // Модальне вікно: прокручування, фокус і клавіатура

  useEffect(() => {
    if (!selectedProgram) {
      return
    }

    const modal = modalRef.current
    const previousOverflow = document.body.style.overflow
    const previousFocus = triggerRef.current

    document.body.style.overflow = 'hidden'

    closeButtonRef.current?.focus()

    const getFocusableElements = () => {
      if (!modal) return []

      return Array.from(
        modal.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter(
        (element) => element.getClientRects().length > 0
      )
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeProgram()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const focusableElements = getFocusableElements()

      if (focusableElements.length === 0) {
        event.preventDefault()
        modal?.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement =
        focusableElements[focusableElements.length - 1]

      const currentElement = document.activeElement
      const focusIsInside = modal?.contains(currentElement)

      if (event.shiftKey) {
        if (
          currentElement === firstElement ||
          !focusIsInside
        ) {
          event.preventDefault()
          lastElement.focus()
        }
      } else if (
        currentElement === lastElement ||
        !focusIsInside
      ) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)

      if (previousFocus?.isConnected) {
        previousFocus.focus()
      }
    }
  }, [selectedProgram])

  return (
    <div className="spp-page" ref={pageRef}>
      {/* ПЕРШИЙ ЕКРАН */}

      <section className="spp-hero">
        <div className="spp-hero-top">
          <Link to="/spa" className="spp-back">
            <ArrowLeft size={17} />
            Повернутися до SPA
          </Link>

          <span className="spp-hero-index">
            HOTEL & WELLNESS / SPA MENU
          </span>
        </div>

        <div className="spp-hero-banner">
          <img
            src="/spaprogram/романтичний спа.jpg"
            alt="Атмосфера SPA"
            fetchPriority="high"
            decoding="async"
          />

          <div className="spp-hero-overlay">
            <span className="spp-eyebrow">
              ВАШ ОСОБИСТИЙ РИТУАЛ ВІДНОВЛЕННЯ
            </span>

            <h1>
              SPA-
              <br />
              <em>ПРОГРАМИ.</em>
            </h1>

            <div className="spp-hero-bottom">
              <p>
                Від розслаблювального масажу до
                особливих ритуалів для двох.
                Обирайте час, присвячений собі.
              </p>

              <a href="#spp-catalog" aria-label="До програм">
                <ArrowDownRight size={26} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ВСТУП */}

      <section className="spp-intro spp-reveal">
        <div>
          <span className="spp-eyebrow">
            01 / ОБЕРІТЬ СВІЙ РИТУАЛ
          </span>

          <h2>
            ВАШ ЧАС.
            <br />
            <span>ВАШІ ВІДЧУТТЯ.</span>
          </h2>
        </div>

        <p>
          Кожна процедура — це можливість сповільнитися,
          відновити сили та подарувати собі кілька
          годин справжнього комфорту.
        </p>
      </section>

      {/* КАТАЛОГ */}

      <section className="spp-catalog" id="spp-catalog">
        <div className="spp-catalog-top spp-reveal">
          <span className="spp-eyebrow">
            02 / КАТАЛОГ ПРОЦЕДУР
          </span>

          <span className="spp-total">
            {String(filteredPrograms.length).padStart(2, '0')} ПРОГРАМ
          </span>
        </div>

        <div
          className="spp-filters"
          aria-label="Категорії SPA-програм"
        >
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={
                activeCategory === category
                  ? 'spp-filter active'
                  : 'spp-filter'
              }
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="spp-grid">
          {filteredPrograms.map((program, index) => (
            <article
              className="spp-card"
              key={program.id}
            >
              <button
                type="button"
                className="spp-card-image"
                onClick={(event) =>
                  openProgram(program, event.currentTarget)
                }
                aria-label={`Детальніше про ${program.name}`}
              >
                <ProgramImage program={program} />

                <span className="spp-card-number">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span className="spp-card-arrow">
                  <ArrowUpRight size={23} />
                </span>
              </button>

              <div className="spp-card-body">
                <div className="spp-card-meta">
                  <span>{program.category}</span>

                  <span className="spp-duration">
                    <Clock3 size={14} />
                    {program.duration}
                  </span>
                </div>

                <h3>{program.name}</h3>

                <p>{program.description}</p>

                <div className="spp-card-footer">
                  <strong>
                    {formatPrice(program.price)}
                  </strong>

                  <button
                    type="button"
                    onClick={(event) =>
                      openProgram(program, event.currentTarget)
                    }
                  >
                    Детальніше
                    <ArrowUpRight size={17} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ЗАВЕРШАЛЬНИЙ БЛОК */}

      <section className="spp-bottom">
        <div className="spp-bottom-inner spp-reveal">
          <span className="spp-eyebrow">
            ВІДПОЧИНОК ПОЧИНАЄТЬСЯ З ВИБОРУ
          </span>

          <h2>
            ПОДАРУЙТЕ СОБІ
            <br />
            <em>МИТЬ СПОКОЮ.</em>
          </h2>

          <p>
            Відкрийте для себе простір,
            де кожна деталь створена для вашого комфорту.
          </p>

          <Link to="/spa" className="spp-bottom-link">
            Повернутися до SPA
            <ArrowUpRight size={19} />
          </Link>
        </div>
      </section>

      {/* МОДАЛЬНЕ ВІКНО */}

      {selectedProgram && (
        <div
          className="spp-modal-backdrop"
          onClick={closeProgram}
        >
          <div
            ref={modalRef}
            className="spp-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="spp-modal-title"
            tabIndex={-1}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="spp-modal-close"
              onClick={closeProgram}
              aria-label="Закрити"
            >
              <X size={22} />
            </button>

            <div className="spp-modal-image">
              <ProgramImage
                program={selectedProgram}
                loading="eager"
              />
            </div>

            <div className="spp-modal-content">
              <span className="spp-eyebrow">
                {selectedProgram.category}
              </span>

              <h2 id="spp-modal-title">
                {selectedProgram.name}
              </h2>

              <p>{selectedProgram.description}</p>

              <div className="spp-modal-details">
                <div>
                  <span>ТРИВАЛІСТЬ</span>
                  <strong>
                    {selectedProgram.duration}
                  </strong>
                </div>

                <div>
                  <span>ВАРТІСТЬ</span>
                  <strong>
                    {formatPrice(selectedProgram.price)}
                  </strong>
                </div>
              </div>

              <button
                type="button"
                className="spp-modal-button"
                onClick={closeProgram}
              >
                Повернутися до програм
                <ArrowLeft size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
