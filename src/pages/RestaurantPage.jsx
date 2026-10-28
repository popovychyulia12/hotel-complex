
import { Link } from 'react-router'

const restaurantPhotos = [
  {
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=85',
    alt: 'Затишний інтер’єр ресторану',
  },
  {
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&auto=format&fit=crop&q=85',
    alt: 'Елегантне сервірування столу',
  },
  {
    src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&auto=format&fit=crop&q=85',
    alt: 'Атмосфера ресторану',
  },
]

const features = [
  {
    number: '01',
    title: 'Карпатська кухня',
    description:
      'Традиційні українські смаки в сучасному виконанні. Локальні продукти, сезонні інгредієнти та авторська подача.',
  },
  {
    number: '02',
    title: 'Сніданки для гостей',
    description:
      'Починайте день із ароматної кави, свіжої випічки та смачних сніданків у затишній атмосфері.',
  },
  {
    number: '03',
    title: 'Особливі вечори',
    description:
      'Романтична вечеря, сімейне свято чи зустріч із друзями — створюємо атмосферу для незабутніх моментів.',
  },
]

export default function RestaurantPage() {
  return (
    <div className="restaurant-page">
      <section className="restaurant-hero">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1800&auto=format&fit=crop&q=90"
          alt="Інтер’єр ресторану готельного комплексу"
        />

        <div className="restaurant-hero-overlay">
          <span className="restaurant-eyebrow">
            СМАК, ЩО СТВОРЮЄ СПОГАДИ
          </span>

          <h1>Ресторан</h1>

          <p>
            Місце, де карпатські традиції зустрічаються
            із сучасною гастрономією.
          </p>
        </div>
      </section>

      <section className="restaurant-intro">
        <div className="restaurant-intro-label">
          <span className="restaurant-eyebrow">
            ГАСТРОНОМІЧНА ПОДОРОЖ
          </span>

          <h2>Відчуйте Карпати на смак</h2>
        </div>

        <div className="restaurant-intro-text">
          <p>
            Наш ресторан — це простір, у якому кожна
            деталь створена для вашого задоволення.
            Теплі природні матеріали, затишне освітлення
            та особлива атмосфера допомагають
            насолодитися кожною миттю.
          </p>

          <p>
            Ми поєднуємо традиції карпатської кухні
            із сучасними кулінарними ідеями, приділяючи
            увагу якості продуктів, смаку та подачі.
          </p>
        </div>
      </section>

      <section className="restaurant-features">
        {features.map((feature) => (
          <article
            className="restaurant-feature"
            key={feature.number}
          >
            <span>{feature.number}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </section>


<section className="restaurant-menu-promo">
  <span className="restaurant-eyebrow">
    ГАСТРОНОМІЧНІ ВРАЖЕННЯ
  </span>

  <h2>Відкрийте наше меню</h2>

  <p>
    Традиційні карпатські страви, авторські
    поєднання, ароматні напої та десерти —
    обирайте те, що до смаку саме вам.
  </p>

  <Link
    to="/restaurant/menu"
    className="restaurant-cta-button"
  >
    Переглянути меню
  </Link>
</section>

      <section className="restaurant-gallery-section">
        <div className="restaurant-section-heading">
          <span className="restaurant-eyebrow">
            АТМОСФЕРА НАШОГО РЕСТОРАНУ
          </span>

          <h2>Моменти, які хочеться повторити</h2>

          <p>
            Насолоджуйтеся смаком, атмосферою
            та приємними зустрічами.
          </p>
        </div>

        <div className="restaurant-gallery">
          {restaurantPhotos.map((photo) => (
            <img
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
            />
          ))}
        </div>
      </section>

      <section className="restaurant-cta">
        <span className="restaurant-eyebrow">
          ВАШ ІДЕАЛЬНИЙ ВІДПОЧИНОК
        </span>

        <h2>Залишайтеся трохи довше</h2>

        <p>
          Доповніть гастрономічні враження
          комфортним проживанням у нашому комплексі.
        </p>

        <Link to="/rooms" className="restaurant-cta-button">
          Переглянути номери
        </Link>
      </section>
    </div>
  )
}
