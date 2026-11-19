
import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { ArrowUpRight, ArrowDown, ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './RestaurantPage.css'

gsap.registerPlugin(ScrollTrigger)


const photos = {
  interior: '/menu/ресторан 1.webp',
  dining: '/menu/ресторан 2.webp',
  atmosphere: '/menu/ресторан 4.webp',
  food: '/menu/ресторан 3.webp',
}


const features = [
  {
    number: '01',
    title: 'Авторська кухня',
    description:
      'Знайомі смаки у сучасному виконанні, сезонні продукти та увага до кожної деталі подачі.',
    target: '#rest-gastronomy',
  },
  {
    number: '02',
    title: 'Неспішні сніданки',
    description:
      'Ароматна кава, улюблені ранкові страви та час, який хочеться присвятити собі.',
    target: '#rest-story',
  },
  {
    number: '03',
    title: 'Особливі вечори',
    description:
      'Зустрічі з близькими, романтичні вечері та атмосфера, у якій народжуються спогади.',
    target: '#rest-atmosphere',
  },
]

export default function RestaurantPage() {
  const pageRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const context = gsap.context(() => {
      gsap.utils.toArray('.rest-reveal').forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 35 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 90%',
              once: true,
            },
          }
        )
      })
    }, pageRef)

    return () => context.revert()
  }, [])

  return (
    <div
      className="rest-page"
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
      {/* INTRO */}
      <section className="rest-intro">
        <div className="rest-intro-copy">
          <span className="rest-label">
            HOTEL & WELLNESS / RESTAURANT
          </span>

          <h1>
            СМАК
            <br />
            <span>МОМЕНТУ.</span>
          </h1>

          <div className="rest-intro-bottom">
            <p>
              Гастрономія, атмосфера та деталі,
              що перетворюють звичайну вечерю
              на особливу подію.
            </p>

            <a
              href="#rest-story"
              className="rest-round-link"
              aria-label="Дізнатися про ресторан"
            >
              <ArrowDown size={24} />
            </a>
          </div>
        </div>

        <div className="rest-intro-photo">
          <img
            src={photos.interior}
            alt="Інтер’єр сучасного ресторану"
            fetchPriority="high"
          />
          <span>THE ART OF DINING</span>
        </div>
      </section>

      {/* STORY */}
      <section className="rest-story" id="rest-story">
        <div className="rest-story-heading rest-reveal">
          <span className="rest-label">01 / НАША КОНЦЕПЦІЯ</span>

          <h2>
            Більше,
            <br />
            ніж <em>вечеря.</em>
          </h2>
        </div>

        <div className="rest-story-body rest-reveal">
          <p>
            Наш ресторан — це місце, де смачна їжа
            поєднується з естетикою простору,
            теплим освітленням та невимушеною атмосферою.
          </p>

          <p>
            Тут можна розпочати день із неспішного
            сніданку, зустрітися з друзями або
            провести особливий вечір удвох.
          </p>
        </div>

        <div className="rest-story-photo rest-reveal">
          <img
            src={photos.dining}
            alt="Елегантно сервірований стіл у ресторані"
            loading="lazy"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="rest-features">
        <div className="rest-section-heading rest-reveal">
          <span className="rest-label">02 / НАШІ ОСОБЛИВОСТІ</span>

          <h2>
            Кожен візит —
            <br />
            <em>нові враження.</em>
          </h2>
        </div>

        <div className="rest-features-list">
          {features.map((feature) => (
            <a
              className="rest-feature rest-reveal"
              key={feature.number}
              href={feature.target}
              aria-label={`Дізнатися більше: ${feature.title}`}
            >
              <span className="rest-feature-number">
                {feature.number}
              </span>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

              <ArrowUpRight size={22} aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>

      {/* MENU FEATURE */}
      <section className="rest-menu-feature" id="rest-gastronomy">
        <div className="rest-menu-photo">
          <img
            src={photos.food}
            alt="Страва ресторанної кухні"
            loading="lazy"
          />
        </div>

        <div className="rest-menu-content rest-reveal">
          <span className="rest-label">03 / ГАСТРОНОМІЯ</span>

          <h2>
            Смак, який
            <br />
            <em>варто відкрити.</em>
          </h2>

          <p>
            Від улюблених сніданків до вишуканих
            основних страв і десертів. Знайдіть
            щось особливе для себе.
          </p>

          <Link to="/restaurant/menu" className="rest-menu-button">
            Переглянути меню
            <ArrowUpRight size={22} />
          </Link>
        </div>
      </section>

      {/* GALLERY */}
      <section className="rest-gallery-section" id="rest-atmosphere">
        <div className="rest-gallery-heading rest-reveal">
          <span className="rest-label">04 / АТМОСФЕРА</span>

          <h2>
            Моменти,
            <br />
            які хочеться <em>повторити.</em>
          </h2>
        </div>

        <div className="rest-gallery">
          <div className="rest-gallery-large">
            <img
              src={photos.atmosphere}
              alt="Атмосфера ресторану"
              loading="lazy"
            />
          </div>

          <div className="rest-gallery-small">
            <img
              src={photos.dining}
              alt="Сервірування столу"
              loading="lazy"
            />
          </div>

          <div className="rest-gallery-text">
            <span>GOOD FOOD. GOOD MOMENTS.</span>

            <p>
              Не просто місце для вечері.
              Місце для ваших історій.
            </p>

            <ArrowUpRight size={30} />
          </div>
        </div>
      </section>

      {/* BOTTOM LINK */}
      <section className="rest-bottom">
        <div>
          <span className="rest-label">ВІДКРИЙТЕ БІЛЬШЕ</span>

          <h2>
            Що сьогодні <em>до смаку?</em>
          </h2>
        </div>

        <Link to="/restaurant/menu">
          До меню
          <ArrowRight size={23} />
        </Link>
      </section>
    </div>
  )
}
