
import { Link } from 'react-router'

const services = [
  {
    id: 1,
    number: '01',
    title: 'Безкоштовний Wi-Fi',
    category: 'КОМФОРТ',
    description:
      'Залишайтеся на зв’язку навіть під час відпочинку. Швидкісний бездротовий інтернет доступний у номерах та громадських зонах комплексу.',
    image:
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop&q=85',
    price: 'Безкоштовно',
  },
  {
    id: 2,
    number: '02',
    title: 'Паркінг',
    category: 'ЗРУЧНІСТЬ',
    description:
      'Для гостей, які подорожують власним автомобілем, передбачено зручний паркінг на території комплексу.',
    image:
      'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=1200&auto=format&fit=crop&q=85',
    price: 'Безкоштовно',
  },
  {
    id: 3,
    number: '03',
    title: 'Сніданки',
    category: 'ГАСТРОНОМІЯ',
    description:
      'Починайте ранок зі свіжої випічки, ароматної кави та смачних страв нашого ресторану.',
    image:
      'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=1200&auto=format&fit=crop&q=85',
    price: 'За меню ресторану',
    link: '/restaurant/menu',
    linkLabel: 'Переглянути меню',
  },
  {
    id: 4,
    number: '04',
    title: 'Обслуговування номерів',
    category: 'КОМФОРТ',
    description:
      'Насолоджуйтеся відпочинком у власному номері. Замовляйте страви та напої з ресторану для ще більшого комфорту.',
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=85',
    price: 'За запитом',
  },
  {
    id: 5,
    number: '05',
    title: 'Екскурсії та активний відпочинок',
    category: 'ВРАЖЕННЯ',
    description:
      'Відкривайте красу Карпат: мальовничі маршрути, прогулянки серед гір та знайомство з місцевими традиціями.',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop&q=85',
    price: 'За запитом',
  },
  {
    id: 6,
    number: '06',
    title: 'Романтичне оформлення номера',
    category: 'ОСОБЛИВІ МОМЕНТИ',
    description:
      'Створіть незабутню атмосферу для особливої події. Квіти, декор та приємні деталі зроблять ваш відпочинок ще романтичнішим.',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=85',
    price: 'За запитом',
  },
  {
    id: 7,
    number: '07',
    title: 'Організація свят',
    category: 'ОСОБЛИВІ МОМЕНТИ',
    description:
      'Дні народження, річниці та сімейні святкування. Допоможемо створити атмосферу, яка залишить теплі спогади.',
    image:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&auto=format&fit=crop&q=85',
    price: 'За запитом',
  },
]

const advantages = [
  {
    number: '01',
    title: 'Турбота про гостей',
    description:
      'Ми приділяємо увагу деталям, щоб кожен відчував себе комфортно.',
  },
  {
    number: '02',
    title: 'Усе для відпочинку',
    description:
      'Проживання, ресторан, SPA та додаткові послуги в одному комплексі.',
  },
  {
    number: '03',
    title: 'Атмосфера Карпат',
    description:
      'Поєднання сучасного комфорту, природи та незабутніх вражень.',
  },
]

export default function ServicesPage() {
  return (
    <div className="services-page">
      <section className="services-hero">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&auto=format&fit=crop&q=90"
          alt="Готельний комплекс"
        />

        <div className="services-hero-content">
          <span className="services-eyebrow">
            КОМФОРТ У КОЖНІЙ ДЕТАЛІ
          </span>

          <h1>Наші послуги</h1>

          <p>
            Ми подбали про все необхідне,
            щоб ваш відпочинок був комфортним,
            приємним і незабутнім.
          </p>

          <a
            href="#services-list"
            className="services-hero-button"
          >
            Переглянути послуги
          </a>
        </div>
      </section>

      <section className="services-intro">
        <div>
          <span className="services-eyebrow">
            ВАШ КОМФОРТ — НАШ ПРІОРИТЕТ
          </span>

          <h2>Більше, ніж просто проживання</h2>
        </div>

        <div className="services-intro-text">
          <p>
            Наш готельний комплекс — це місце,
            де кожна деталь продумана для вашого
            комфорту та приємного відпочинку.
          </p>

          <p>
            Ми пропонуємо послуги, які допоможуть
            вам насолодитися кожною миттю перебування
            серед мальовничих Карпат.
          </p>
        </div>
      </section>

      <section
        className="services-list-section"
        id="services-list"
      >
        <div className="services-section-heading">
          <span className="services-eyebrow">
            МОЖЛИВОСТІ НАШОГО КОМПЛЕКСУ
          </span>

          <h2>Усе для вашого відпочинку</h2>

          <p>
            Від щоденного комфорту до особливих
            моментів — обирайте те, що потрібно саме вам.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article
              className="service-card"
              key={service.id}
            >
              <div className="service-card-image">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                />
              </div>

              <div className="service-card-content">
                <div className="service-card-top">
                  <span>{service.number}</span>
                  <span>{service.category}</span>
                </div>

                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <div className="service-card-bottom">
                  <strong>{service.price}</strong>

                  {service.link && (
                    <Link to={service.link}>
                      {service.linkLabel}
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="services-advantages">
        {advantages.map((advantage) => (
          <article
            className="services-advantage"
            key={advantage.number}
          >
            <span>{advantage.number}</span>
            <h3>{advantage.title}</h3>
            <p>{advantage.description}</p>
          </article>
        ))}
      </section>

      <section className="services-cta">
        <span className="services-eyebrow">
          ВІДПОЧИНОК ПОЧИНАЄТЬСЯ ТУТ
        </span>

        <h2>Відкрийте для себе Карпати</h2>

        <p>
          Оберіть затишний номер і насолоджуйтеся
          відпочинком, наповненим комфортом,
          спокоєм та приємними враженнями.
        </p>

        <Link
          to="/rooms"
          className="services-cta-button"
        >
          Переглянути номери
        </Link>
      </section>
    </div>
  )
}
