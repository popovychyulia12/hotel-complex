
import { Link } from 'react-router'

const spaZones = [
  {
    id: 1,
    number: '01',
    title: 'Басейн',
    subtitle: 'Гармонія води та спокою',
    description:
      'Просторий критий басейн із комфортною температурою води — ідеальне місце для плавання, відпочинку та відновлення сил після насиченого дня.',
    image:
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&auto=format&fit=crop&q=85',
  },
  {
    id: 2,
    number: '02',
    title: 'Фінська сауна',
    subtitle: 'Тепло, яке відновлює',
    description:
      'Насолодіться атмосферою натурального дерева, приємним теплом та відчуттям повного розслаблення.',
    image:
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1200&auto=format&fit=crop&q=85',
  },
  {
    id: 3,
    number: '03',
    title: 'Джакузі',
    subtitle: 'Мить лише для себе',
    description:
      'Тепла вода та гідромасаж допоможуть розслабитися, відволіктися від щоденних турбот і насолодитися відпочинком.',
    image:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&auto=format&fit=crop&q=85',
  },
  {
    id: 4,
    number: '04',
    title: 'Масажі',
    subtitle: 'Турбота про тіло',
    description:
      'Від класичного розслаблювального масажу до ароматерапії — обирайте процедуру, яка подарує вам відчуття легкості та комфорту.',
    image:
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&auto=format&fit=crop&q=85',
  },
]

const benefits = [
  {
    number: '01',
    title: 'Атмосфера спокою',
    description:
      'Затишні інтер’єри, природні матеріали та простір для відпочинку.',
  },
  {
    number: '02',
    title: 'Відновлення сил',
    description:
      'Водні процедури, тепло сауни та розслаблювальні масажі.',
  },
  {
    number: '03',
    title: 'Час для себе',
    description:
      'Можливість відпочити від щоденної метушні та насолодитися моментом.',
  },
]

export default function SpaPage() {
  return (
    <div className="spa-page">
      <section className="spa-hero">
        <img
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1800&auto=format&fit=crop&q=90"
          alt="Атмосфера SPA та відпочинку"
        />

        <div className="spa-hero-content">
          <span className="spa-eyebrow">
            ПРОСТІР ГАРМОНІЇ
          </span>

          <h1>SPA & Wellness</h1>

          <p>
            Зупиніть час. Відчуйте спокій.
            Подаруйте собі відпочинок, на який заслуговуєте.
          </p>

          <a href="#spa-zones" className="spa-hero-button">
            Відкрити простір релаксу
          </a>
        </div>
      </section>

      <section className="spa-intro">
        <div>
          <span className="spa-eyebrow">
            МИСТЕЦТВО ВІДПОЧИНКУ
          </span>

          <h2>Відновіть гармонію тіла та думок</h2>
        </div>

        <div className="spa-intro-description">
          <p>
            Наш SPA-простір створений для тих, хто прагне
            відпочити від щоденної метушні та відновити
            внутрішню рівновагу.
          </p>

          <p>
            Тут на вас чекають тепла вода, затишна атмосфера,
            аромат натурального дерева та процедури,
            які допоможуть розслабитися й відчути
            справжній комфорт.
          </p>
        </div>
      </section>

      <section className="spa-zones-section" id="spa-zones">
        <div className="spa-section-heading">
          <span className="spa-eyebrow">
            НАШІ SPA-ЗОНИ
          </span>

          <h2>Простір для вашого відпочинку</h2>

          <p>
            Обирайте те, що допоможе вам відновити сили
            та насолодитися кожною миттю.
          </p>
        </div>

        <div className="spa-zones-list">
          {spaZones.map((zone, index) => (
            <article
              key={zone.id}
              className={`spa-zone ${
                index % 2 === 1 ? 'spa-zone-reverse' : ''
              }`}
            >
              <div className="spa-zone-image">
                <img
                  src={zone.image}
                  alt={zone.title}
                  loading="lazy"
                />
              </div>

              <div className="spa-zone-content">
                <span className="spa-zone-number">
                  {zone.number}
                </span>

                <span className="spa-eyebrow">
                  {zone.subtitle}
                </span>

                <h3>{zone.title}</h3>

                <p>{zone.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="spa-benefits">
        {benefits.map((benefit) => (
          <article
            key={benefit.number}
            className="spa-benefit"
          >
            <span>{benefit.number}</span>
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
          </article>
        ))}
      </section>

      <section className="spa-programs-promo">
        <span className="spa-eyebrow">
          ВАШ ЧАС ДЛЯ ВІДНОВЛЕННЯ
        </span>

        <h2>SPA-програми та процедури</h2>

        <p>
          Від короткого розслаблювального масажу
          до комплексних SPA-ритуалів.
          Знайдіть ідеальний спосіб подбати про себе.
        </p>

        <Link
          to="/spa/programs"
          className="spa-programs-button"
        >
          Переглянути SPA-програми
        </Link>
      </section>

      <section className="spa-final">
        <div className="spa-final-content">
          <span className="spa-eyebrow">
            ВІДПОЧИНОК, ЯКИЙ НАДИХАЄ
          </span>

          <h2>Залишайтеся з нами довше</h2>

          <p>
            Поєднайте SPA-відпочинок із комфортним
            проживанням серед мальовничих Карпат.
          </p>

          <Link to="/rooms" className="spa-final-button">
            Переглянути номери
          </Link>
        </div>
      </section>
    </div>
  )
}
