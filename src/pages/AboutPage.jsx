
import { Link } from 'react-router'

const gallery = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200&auto=format&fit=crop&q=85',
    alt: 'Затишний відпочинок серед природи',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200&auto=format&fit=crop&q=85',
    alt: 'Будиночок серед гірської природи',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop&q=85',
    alt: 'Гірські краєвиди Карпат',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&auto=format&fit=crop&q=85',
    alt: 'Атмосфера готельного комплексу',
  },
]

const advantages = [
  {
    number: '01',
    title: 'Природа Карпат',
    description:
      'Мальовничі краєвиди, свіже гірське повітря та атмосфера спокою.',
  },
  {
    number: '02',
    title: 'Комфортне проживання',
    description:
      'Різноманітні категорії номерів для романтичних подорожей, сімейного та індивідуального відпочинку.',
  },
  {
    number: '03',
    title: 'Відпочинок для душі',
    description:
      'SPA-простір, ресторан та можливості для відновлення сил.',
  },
  {
    number: '04',
    title: 'Особливі враження',
    description:
      'Затишна атмосфера, смачна кухня та незабутні моменти серед гір.',
  },
]

export default function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1800&auto=format&fit=crop&q=90"
          alt="Мальовничі гори Карпат"
        />

        <div className="about-hero-content">
          <span className="about-eyebrow">
            МІСЦЕ, ДЕ ПОЧИНАЄТЬСЯ ВІДПОЧИНОК
          </span>

          <h1>Про наш комплекс</h1>

          <p>
            Відчуйте гармонію природи, затишку
            та справжньої карпатської гостинності.
          </p>
        </div>
      </section>

      <section className="about-story">
        <div className="about-story-image">
          <img
            src="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200&auto=format&fit=crop&q=85"
            alt="Відпочинок серед природи"
            loading="lazy"
          />
        </div>

        <div className="about-story-content">
          <span className="about-eyebrow">
            НАША ІСТОРІЯ
          </span>

          <h2>Місце, створене для особливих моментів</h2>

          <p>
            Наш готельний комплекс — це простір,
            у якому сучасний комфорт поєднується
            з природною красою Карпат.
          </p>

          <p>
            Ми прагнемо створити атмосферу, де можна
            забути про щоденні турботи, відновити сили
            та провести незабутній час із близькими.
          </p>

          <p>
            Тут кожен знайде свій ідеальний відпочинок:
            від спокійного ранку з кавою та видом на гори
            до насиченого дня, сповненого нових вражень.
          </p>
        </div>
      </section>

      <section className="about-philosophy">
        <span className="about-eyebrow">
          НАША ФІЛОСОФІЯ
        </span>

        <h2>
          Відпочинок — це мистецтво
          насолоджуватися моментом
        </h2>

        <p>
          Ми віримо, що справжній відпочинок
          починається там, де панують спокій,
          гармонія та турбота про кожну деталь.
        </p>
      </section>

      <section className="about-gallery-section">
        <div className="about-section-heading">
          <span className="about-eyebrow">
            АТМОСФЕРА НАШОГО КОМПЛЕКСУ
          </span>

          <h2>Місце, куди хочеться повертатися</h2>

          <p>
            Природа, затишок і краса кожної миті.
          </p>
        </div>

        <div className="about-gallery">
          {gallery.map((photo) => (
            <div
              className="about-gallery-item"
              key={photo.id}
            >
              <img
                src={photo.image}
                alt={photo.alt}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="about-advantages-section">
        <div className="about-section-heading">
          <span className="about-eyebrow">
            ЧОМУ ОБИРАЮТЬ НАС
          </span>

          <h2>Усе для незабутнього відпочинку</h2>
        </div>

        <div className="about-advantages-grid">
          {advantages.map((advantage) => (
            <article
              className="about-advantage-card"
              key={advantage.number}
            >
              <span>{advantage.number}</span>
              <h3>{advantage.title}</h3>
              <p>{advantage.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-explore">
        <div className="about-explore-content">
          <span className="about-eyebrow">
            ВІДКРИЙТЕ БІЛЬШЕ
          </span>

          <h2>Створіть свою історію відпочинку</h2>

          <p>
            Затишні номери, вишукана кухня,
            SPA та мальовничі Карпати —
            усе для ваших особливих моментів.
          </p>

          <div className="about-explore-links">
            <Link to="/rooms">Наші номери</Link>
            <Link to="/restaurant">Ресторан</Link>
            <Link to="/spa">SPA & Wellness</Link>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <span className="about-eyebrow">
          ВАША ПОДОРОЖ ПОЧИНАЄТЬСЯ ТУТ
        </span>

        <h2>Подаруйте собі незабутній відпочинок</h2>

        <p>
          Оберіть ідеальний номер та насолоджуйтеся
          атмосферою Карпат.
        </p>

        <Link to="/rooms" className="about-cta-button">
          Обрати номер
        </Link>
      </section>
    </div>
  )
}
