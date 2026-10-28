
import { Link } from 'react-router'
import StayPlanner from '../components/StayPlanner.jsx'

import { Mountain, BedDouble, Waves } from 'lucide-react'


const popularRooms = [
  {
    id: 1,
    name: 'Стандартний двомісний',
    description:
      'Затишний простір для комфортного відпочинку вдвох.',
    price: 1800,
    image:
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1000&auto=format&fit=crop&q=85',
  },
  {
    id: 2,
    name: 'Люкс',
    description:
      'Елегантний інтер’єр і продуманий комфорт у кожній деталі.',
    price: 3200,
    image:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1000&auto=format&fit=crop&q=85',
  },
  {
    id: 3,
    name: 'Сімейний номер',
    description:
      'Просторий номер для теплих моментів із близькими.',
    price: 4000,
    image:
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1000&auto=format&fit=crop&q=85',
  },
]


const advantages = [
  {
    number: '01',
    icon: Mountain,
    title: 'Природа Карпат',
    description:
      'Мальовничі краєвиди та свіже гірське повітря.',
  },
  {
    number: '02',
    icon: BedDouble,
    title: 'Комфортні номери',
    description:
      'Різноманітні варіанти проживання для кожного гостя.',
  },
  {
    number: '03',
    icon: Waves,
    title: 'Ресторан і SPA',
    description:
      'Усе для гастрономічних вражень та відновлення сил.',
  },
]


export default function HomePage() {
  return (
    <div className="home-page">
      {/* ГОЛОВНИЙ БАНЕР */}
      <section
        className="hotel-hero"
        aria-labelledby="hero-title"
      >
        <div className="hotel-hero-content">
          <span className="hero-eyebrow">
            ВАШ ІДЕАЛЬНИЙ ВІДПОЧИНОК У КАРПАТАХ
          </span>

          <h1 id="hero-title">
            Відпочинок, до якого хочеться повертатися
          </h1>

          <p>
            Відчуйте гармонію природи, затишку
            та справжнього комфорту серед мальовничих гір.
          </p>

          <Link to="/rooms" className="hero-button">
            Переглянути номери
          </Link>
        </div>
      </section>

      {/* ПРО КОМПЛЕКС */}
      <section className="home-about">
        <div className="home-about-image">
          <img
            src="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200&auto=format&fit=crop&q=85"
            alt="Атмосфера відпочинку серед природи"
            loading="lazy"
          />
        </div>

        <div className="home-about-content">
          <span className="home-eyebrow">
            ЛАСКАВО ПРОСИМО
          </span>

          <h2>Місце, де починається ваш спокій</h2>

          <p>
            Серед мальовничих Карпат на вас чекає
            особливий простір, створений для відпочинку,
            натхнення та незабутніх моментів.
          </p>

          <p>
            Затишні номери, ресторан, SPA та природа
            навколо — усе, щоб ви могли відволіктися
            від щоденних турбот і насолодитися
            кожною миттю.
          </p>

          <Link to="/about" className="home-text-link">
            Дізнатися більше про комплекс
            <span aria-hidden="true"> →</span>
          </Link>
        </div>
      </section>

     
{/* ПЕРЕВАГИ */}
<section className="home-advantages">
  {advantages.map((advantage) => {
    const Icon = advantage.icon

    return (
      <article
        key={advantage.number}
        className="home-advantage"
      >
        <div className="home-advantage-top">
          <span className="home-advantage-number">
            {advantage.number}
          </span>

          <span className="home-advantage-icon">
            <Icon size={29} strokeWidth={1.3} />
          </span>
        </div>

        <div className="home-advantage-line" />

        <h3>{advantage.title}</h3>
        <p>{advantage.description}</p>
      </article>
    )
  })}
</section>

      {/* ПОПУЛЯРНІ НОМЕРИ */}
      <section className="home-popular-rooms">
        <div className="home-section-heading">
          <span className="home-eyebrow">
            ПРОЖИВАННЯ
          </span>

          <h2>Ваш простір для відпочинку</h2>

          <p>
            Оберіть номер, у якому кожна деталь
            створена для вашого комфорту.
          </p>
        </div>

        <div className="home-rooms-grid">
          {popularRooms.map((room) => (
            <article
              className="home-room-card"
              key={room.id}
            >
              <Link
                to={`/rooms/${room.id}`}
                className="home-room-image"
              >
                <img
                  src={room.image}
                  alt={room.name}
                  loading="lazy"
                />
              </Link>

              <div className="home-room-content">
                <h3>{room.name}</h3>
                <p>{room.description}</p>

                <div className="home-room-bottom">
                  <span>
                    від <strong>
                      {room.price.toLocaleString('uk-UA')} грн
                    </strong> / ніч
                  </span>

                  <Link to={`/rooms/${room.id}`}>
                    Детальніше →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="home-rooms-all">
          <Link to="/rooms" className="home-dark-button">
            Переглянути всі номери
          </Link>
        </div>
      </section>

      {/* КОНСТРУКТОР ВІДПОЧИНКУ */}
      <section className="home-planner-section">
        <div className="home-section-heading">
          <span className="home-eyebrow">
            ВІДПОЧИНОК ПІД ВАШІ ПОБАЖАННЯ
          </span>

          <h2>Сплануйте свою ідеальну подорож</h2>

          <p>
            Розкажіть про свої побажання —
            і ми допоможемо підібрати відповідний номер.
          </p>
        </div>

        <StayPlanner />
      </section>

      {/* РЕСТОРАН І SPA */}
      <section className="home-experiences">
        <div className="home-section-heading">
          <span className="home-eyebrow">
            БІЛЬШЕ, НІЖ ПРОЖИВАННЯ
          </span>

          <h2>Відкрийте нові враження</h2>

          <p>
            Смаки, атмосфера та відпочинок,
            які залишаються у спогадах.
          </p>
        </div>

        <div className="home-experiences-grid">
          <article className="home-experience-card">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&auto=format&fit=crop&q=85"
              alt="Атмосфера ресторану"
              loading="lazy"
            />

            <div className="home-experience-overlay">
              <span className="home-eyebrow">
                ГАСТРОНОМІЯ
              </span>

              <h3>Наш ресторан</h3>

              <p>
                Відкрийте для себе смаки Карпат
                та особливу атмосферу.
              </p>

              <Link to="/restaurant">
                Відкрити ресторан →
              </Link>
            </div>
          </article>

          <article className="home-experience-card">
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&auto=format&fit=crop&q=85"
              alt="SPA та відпочинок"
              loading="lazy"
            />

            <div className="home-experience-overlay">
              <span className="home-eyebrow">
                ГАРМОНІЯ ТА ВІДНОВЛЕННЯ
              </span>

              <h3>SPA & Wellness</h3>

              <p>
                Подаруйте собі час для спокою,
                відновлення та релаксу.
              </p>

              <Link to="/spa">
                Відкрити SPA →
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* ЗАКЛИК ДО БРОНЮВАННЯ */}
      <section className="home-final-cta">
        <span className="home-eyebrow">
          ВАШ ВІДПОЧИНОК ПОЧИНАЄТЬСЯ ТУТ
        </span>

        <h2>Час подарувати собі незабутні моменти</h2>

        <p>
          Оберіть ідеальний номер і відкрийте
          для себе справжню атмосферу Карпат.
        </p>

        <Link to="/rooms" className="home-dark-button">
          Обрати номер
        </Link>
      </section>
    </div>
  )
}
