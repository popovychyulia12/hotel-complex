
import { Link } from 'react-router'
import {
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
} from 'lucide-react'

import './SpaPage.css'

const spaZones = [
  {
    id: 1,
    number: '01',
    title: 'Басейн',
    subtitle: 'Гармонія води та спокою',
    description:
      'Просторий басейн із комфортною температурою води — місце, де можна відпочити, поплавати та відновити сили.',
    image: '/spaprogram/басейн.jpg',
  },
  {
    id: 2,
    number: '02',
    title: 'Фінська сауна',
    subtitle: 'Тепло, яке відновлює',
    description:
      'Атмосфера натурального дерева, приємне сухе тепло та можливість повністю розслабитися.',
    image: '/spaprogram/фінська сауна.jpg',
  },
  {
    id: 3,
    number: '03',
    title: 'Джакузі',
    subtitle: 'Мить лише для себе',
    description:
      'Тепла вода та гідромасаж допоможуть відволіктися від щоденних турбот і насолодитися моментом.',
    image: '/spaprogram/джакузі.jpg',
  },
  {
    id: 4,
    number: '04',
    title: 'Масажі',
    subtitle: 'Турбота про тіло',
    description:
      'Розслаблювальні масажі та SPA-ритуали, створені для відновлення внутрішньої гармонії.',
    image: '/spaprogram/карпатська гармонія.jpg',
  },
]

export default function SpaPage() {
  return (
    <div className="wellness-page">
      {/* HERO */}

      <section className="wellness-hero">
        <div className="wellness-hero-top">
          <span className="wellness-label">
            HOTEL & WELLNESS / SPA EXPERIENCE
          </span>

          <span className="wellness-hero-note">
            МІСЦЕ, ДЕ ЧАС СПОВІЛЬНЮЄТЬСЯ
          </span>
        </div>

        <div className="wellness-hero-layout">
          <div className="wellness-hero-title">
            <span className="wellness-label">
              ПРОСТІР ДЛЯ ВАШОГО ВІДНОВЛЕННЯ
            </span>

            <h1>
              МИСТЕЦТВО
              <br />
              <span>ВІДПОЧИНКУ.</span>
            </h1>
          </div>

          <div className="wellness-hero-description">
            <span className="wellness-symbol">✳</span>

            <p>
              Дозвольте собі сповільнитися.
              Відчуйте гармонію, відновіть сили
              та насолодіться моментом.
            </p>

            <a href="#wellness-about">
              Відкрити SPA
              <ArrowDownRight size={19} />
            </a>
          </div>
        </div>

        <div className="wellness-hero-photo">
          <img
            src="/spaprogram/басейн.jpg"
            alt="Басейн у зоні відпочинку"
            fetchPriority="high"
            decoding="async"
          />

          <span className="wellness-photo-caption">
            YOUR MOMENT OF CALM
          </span>
        </div>
      </section>

      {/* ABOUT */}

      <section
        className="wellness-about"
        id="wellness-about"
      >
        <div className="wellness-about-left">
          <span className="wellness-label">
            01 / ФІЛОСОФІЯ SPA
          </span>

          <h2>
            СПОКІЙ
            <br />
            ПОЧИНАЄТЬСЯ
            <br />
            <span>ТУТ.</span>
          </h2>
        </div>

        <div className="wellness-about-right">
          <span className="wellness-about-mark">✳</span>

          <p className="wellness-about-lead">
            Іноді найкраще, що можна зробити
            для себе, — просто зупинитися.
          </p>

          <p>
            Наш SPA-простір створений для тих,
            хто цінує спокій, комфорт і можливість
            відновити сили. Тут кожна деталь
            допомагає залишити щоденну метушню
            позаду.
          </p>

          <div className="wellness-about-line">
            <span>RELAX</span>
            <span>RESTORE</span>
            <span>RECONNECT</span>
          </div>
        </div>
      </section>

      {/* ATMOSPHERE */}

      <section className="wellness-atmosphere">
        <div className="wellness-atmosphere-image">
          <img
            src="/spaprogram/карпатська гармонія.jpg"
            alt="Атмосфера SPA"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="wellness-atmosphere-content">
          <span className="wellness-label">
            ВАШ ОСОБИСТИЙ ПРОСТІР
          </span>

          <div>
            <h2>
              ЧАС
              <br />
              <span>ДЛЯ СЕБЕ.</span>
            </h2>

            <p>
              Без поспіху. Без зайвого шуму.
              Лише спокійна атмосфера,
              приємні відчуття та можливість
              присвятити час собі.
            </p>
          </div>

          <span className="wellness-atmosphere-footer">
            SLOW DOWN. FEEL MORE.
          </span>
        </div>
      </section>

      {/* ZONES */}

      <section
        className="wellness-zones"
        id="wellness-zones"
      >
        <div className="wellness-zones-header">
          <div>
            <span className="wellness-label">
              02 / НАШІ SPA-ЗОНИ
            </span>

            <h2>
              ПРОСТІР
              <br />
              <span>ВІДНОВЛЕННЯ.</span>
            </h2>
          </div>

          <p>
            Обирайте відпочинок, який відповідає
            вашому настрою: вода, тепло,
            масаж або повне розслаблення.
          </p>
        </div>

        <div className="wellness-zones-grid">
          {spaZones.map((zone) => (
            <article
              className="wellness-zone-card"
              key={zone.id}
            >
              <div className="wellness-zone-image">
                <img
                  src={zone.image}
                  alt={zone.title}
                  loading="lazy"
                  decoding="async"
                />

                <span>{zone.number}</span>
              </div>

              <div className="wellness-zone-heading">
                <div>
                  <span>{zone.subtitle}</span>
                  <h3>{zone.title}</h3>
                </div>
              </div>

              <p>{zone.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* PROGRAMS */}

      <section className="wellness-programs">
        <div className="wellness-programs-content">
          <span className="wellness-label">
            03 / SPA-ПРОГРАМИ
          </span>

          <h2>
            ВІДЧУЙТЕ
            <br />
            <span>ТУРБОТУ.</span>
          </h2>

          <p>
            Масажі, SPA-ритуали, водні процедури
            та особливі програми для двох.
            Знайдіть свій спосіб відновлення.
          </p>

          <Link
            to="/spa/programs"
            className="wellness-programs-button"
          >
            Переглянути SPA-програми
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="wellness-programs-image">
          <img
            src="/spaprogram/романтичний спа.jpg"
            alt="SPA-масаж"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      {/* FINAL */}

      <section className="wellness-final">
        <span className="wellness-label">
          ВІДПОЧИНОК, ЯКИЙ ХОЧЕТЬСЯ ПРОДОВЖИТИ
        </span>

        <h2>
          ЗАЛИШАЙТЕСЯ
          <br />
          <span>ДОВШЕ.</span>
        </h2>

        <p>
          Поєднайте SPA-відпочинок із комфортним
          проживанням у нашому готелі.
        </p>

        <Link to="/rooms">
          Переглянути номери
          <ArrowUpRight size={19} />
        </Link>
      </section>
    </div>
  )
}
