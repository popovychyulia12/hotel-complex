
import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './AboutPage.css'

gsap.registerPlugin(ScrollTrigger)

const images = {
  hero: '/hotel-hero.png.png',
  interior: '/menu/ресторан 1.jpg',
  room: '/rooms/Президентський 2.webp',
  restaurant: '/menu/ресторан 2.jpg',
  pool: '/spaprogram/карпатська гармонія.jpg',
}

const gallery = [
  {
    id: '01',
    image: images.interior,
    title: 'Архітектура та атмосфера',
    label: 'КОМПЛЕКС',
    to: '/about',
  },
  {
    id: '02',
    image: images.room,
    title: 'Комфорт у деталях',
    label: 'НОМЕРИ',
    to: '/rooms',
  },
  {
    id: '03',
    image: images.restaurant,
    title: 'Смак особливих моментів',
    label: 'РЕСТОРАН',
    to: '/restaurant',
  },
  {
    id: '04',
    image: images.pool,
    title: 'Час для відновлення',
    label: 'ВІДПОЧИНОК',
    to: '/spa',
  },
]

const advantages = [
  {
    number: '01',
    title: 'Продуманий комфорт',
    description:
      'Затишні номери, сучасний дизайн та увага до кожної деталі.',
    to: '/rooms',
  },
  {
    number: '02',
    title: 'SPA & Wellness',
    description:
      'Простір, у якому можна сповільнитися, відновити сили й приділити час собі.',
    to: '/spa',
  },
  {
    number: '03',
    title: 'Гастрономія',
    description:
      'Ресторан для неспішних сніданків, особливих вечорів і приємних зустрічей.',
    to: '/restaurant',
  },
  {
    number: '04',
    title: 'Атмосфера',
    description:
      'Місце для відпочинку, теплих розмов і моментів, до яких хочеться повертатися.',
    to: '#about-gallery',
  },
]

const exploreLinks = [
  { title: 'Номери', to: '/rooms' },
  { title: 'Ресторан', to: '/restaurant' },
  { title: 'SPA & Wellness', to: '/spa' },
]

function Benefit({ item }) {
  const content = (
    <>
      <span className="lux-about-benefit-index">
        {item.number}
      </span>

      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>

      <ArrowUpRight size={23} aria-hidden="true" />
    </>
  )

  const className = 'lux-about-benefit lux-about-reveal'

  return item.to.startsWith('#') ? (
    <a href={item.to} className={className}>
      {content}
    </a>
  ) : (
    <Link to={item.to} className={className}>
      {content}
    </Link>
  )
}

export default function AboutPage() {
  const pageRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const context = gsap.context(() => {
      gsap.utils.toArray('.lux-about-reveal').forEach((element) => {
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
    <div className="lux-about" ref={pageRef}>

      {/* HERO */}
      <section className="lux-about-hero-section">
        <div className="lux-about-hero">
          <img
            className="lux-about-hero-photo"
            src={images.hero}
            alt="HOTEL & WELLNESS — готельний комплекс"
            fetchPriority="high"
            decoding="async"
          />

          <div className="lux-about-hero-shade" />

          <div className="lux-about-hero-content">
            <span className="lux-about-overline lux-about-overline-light">
              HOTEL & WELLNESS / НАША ІСТОРІЯ
            </span>

            <h1>
              БІЛЬШЕ,
              <br />
              <span>НІЖ ГОТЕЛЬ.</span>
            </h1>

            <div className="lux-about-hero-foot">
              <p>
                Простір, де кожна деталь створена
                для вашого комфорту.
              </p>

              <a
                href="#about-story"
                className="lux-about-circle"
                aria-label="Дізнатися більше"
              >
                <ArrowDown size={25} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="lux-about-story" id="about-story">
        <div className="lux-about-story-copy lux-about-reveal">
          <span className="lux-about-overline">
            01 / ЗНАЙОМСТВО
          </span>

          <h2>
            Тут починаються
            <em> особливі моменти.</em>
          </h2>

          <p>
            HOTEL & WELLNESS — це поєднання сучасної
            архітектури, продуманого сервісу та атмосфери,
            у якій легко відпочити від щоденного ритму.
          </p>

          <p>
            Ми створюємо простір для різних історій:
            неспішних вихідних удвох, зустрічей із близькими,
            відновлення сил та нових вражень.
          </p>

          <Link to="/rooms" className="lux-about-text-link">
            Відкрити наші номери
            <ArrowUpRight size={19} />
          </Link>
        </div>

        <div className="lux-about-story-visual lux-about-reveal">
          <img
            src={images.interior}
            alt="Сучасний готельний інтер’єр"
            loading="lazy"
            decoding="async"
          />
          <span>THE ART OF STAYING</span>
        </div>
      </section>

      {/* GALLERY */}
      <section
        className="lux-about-gallery-section"
        id="about-gallery"
      >
        <div className="lux-about-section-heading lux-about-reveal">
          <div>
            <span className="lux-about-overline">
              02 / АТМОСФЕРА
            </span>

            <h2>
              Кожен простір —
              <br />
              <em>частина вражень.</em>
            </h2>
          </div>

          <p>
            Деталі, з яких складається ваш відпочинок:
            від затишного номера до вечора в ресторані.
          </p>
        </div>

        <div className="lux-about-gallery">
          {gallery.map((item) => (
            <Link
              key={item.id}
              to={item.to}
              className={`lux-about-gallery-card lux-about-gallery-card-${item.id}`}
              aria-label={item.title}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                decoding="async"
              />

              <div className="lux-about-gallery-overlay" />

              <span className="lux-about-gallery-number">
                {item.id} / 04
              </span>

              <div className="lux-about-gallery-caption">
                <div>
                  <small>{item.label}</small>
                  <h3>{item.title}</h3>
                </div>

                <span className="lux-about-gallery-icon">
                  <ArrowUpRight size={22} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="lux-about-benefits">
        <div className="lux-about-section-heading lux-about-reveal">
          <div>
            <span className="lux-about-overline">
              03 / ЩО НАС ВИРІЗНЯЄ
            </span>

            <h2>
              Усе, що потрібно,
              <br />
              <em>в одному місці.</em>
            </h2>
          </div>
        </div>

        <div className="lux-about-benefits-list">
          {advantages.map((item) => (
            <Benefit key={item.number} item={item} />
          ))}
        </div>
      </section>

      {/* EXPLORE */}
      <section className="lux-about-explore">
        <div className="lux-about-explore-photo">
          <img
            src={images.pool}
            alt="Басейн та зона відпочинку"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="lux-about-explore-shade" />

        <div className="lux-about-explore-content lux-about-reveal">
          <span className="lux-about-overline lux-about-overline-light">
            04 / ВІДКРИВАЙТЕ БІЛЬШЕ
          </span>

          <h2>
            Ваш відпочинок.
            <br />
            <em>Ваші правила.</em>
          </h2>

          <div className="lux-about-explore-links">
            {exploreLinks.map(({ title, to }) => (
              <Link key={to} to={to}>
                {title}
                <ArrowUpRight size={19} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
