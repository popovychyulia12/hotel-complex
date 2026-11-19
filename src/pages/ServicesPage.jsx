
import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { ArrowUpRight, ArrowDown, ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ServicesPage.css'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: 1,
    number: '01',
    title: 'Безкоштовний Wi-Fi',
    category: 'КОМФОРТ',
    description:
      'Залишайтеся на зв’язку навіть під час відпочинку. Швидкісний бездротовий інтернет доступний у номерах та громадських зонах комплексу.',
    image:
      '/public/services/вайфай.jpg',
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
      '/public/services/паркінг.jpg',
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
      '/public/menu/фірмовий сніданок.jpg',
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
      '/public/rooms/Президентський 1.jpg',
    price: 'За запитом',
  },
  {
    id: 5,
    number: '05',
    title: 'Екскурсії та активний відпочинок',
    category: 'ВРАЖЕННЯ',
    description:
      'Відкривайте нові місця, мальовничі маршрути та цікаві локації поблизу комплексу. Наповнюйте відпочинок новими враженнями.',
    image:
      '/public/spaprogram/басейн.jpg',
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
      '/public/services/номер.jpg',
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
      '/public/services/свята.jpg',
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
    title: 'Атмосфера затишку',
    description:
      'Поєднання сучасного комфорту, спокою та приємних вражень.',
  },
]

export default function ServicesPage() {
  const pageRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const context = gsap.context(() => {
      gsap.utils.toArray('.svc-reveal').forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 35 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
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
    <div className="svc-page" ref={pageRef}>

      {/* HERO */}

      <section className="svc-hero">
        <div className="svc-hero-copy">
          <span className="svc-label">
            HOTEL & WELLNESS / SERVICES
          </span>

          <div>
            <span className="svc-hero-overline">
              ПРОДУМАНО ДО ДРІБНИЦЬ
            </span>

            <h1>
              ВСЕ ДЛЯ
              <br />
              <span>ВАШОГО</span>
              <br />
              КОМФОРТУ.
            </h1>
          </div>

          <div className="svc-hero-bottom">
            <p>
              Маленькі деталі створюють великі
              враження. Ми подбали про те, щоб
              кожна мить вашого відпочинку була особливою.
            </p>

            <a
              href="#svc-catalog"
              className="svc-circle-button"
              aria-label="До послуг"
            >
              <ArrowDown size={24} />
            </a>
          </div>
        </div>

        <div className="svc-hero-image">
          <img
            src='/public/services/номер.jpg'
            alt="Атмосфера готельного комплексу"
            fetchPriority="high"
          />
          <span>YOUR STAY. OUR CARE.</span>
        </div>
      </section>

      {/* INTRO */}

      <section className="svc-intro">
        <div className="svc-intro-left svc-reveal">
          <span className="svc-label">01 / НАШ ПІДХІД</span>
          <h2>
            Комфорт —
            <br />
            у кожній <em>деталі.</em>
          </h2>
        </div>

        <div className="svc-intro-right svc-reveal">
          <p>
            Наш готельний комплекс — це більше, ніж місце
            для проживання. Це простір, де можна
            відпочити від щоденних турбот і присвятити
            час собі та близьким.
          </p>
          <p>
            Від ранкової кави до особливих подій —
            ми пропонуємо послуги, які зроблять
            ваше перебування ще приємнішим.
          </p>
        </div>
      </section>

      {/* SERVICES */}

      <section className="svc-catalog" id="svc-catalog">
        <div className="svc-section-heading svc-reveal">
          <span className="svc-label">02 / НАШІ ПОСЛУГИ</span>

          <div className="svc-heading-row">
            <h2>
              Створено для
              <br />
              <em>вашого відпочинку.</em>
            </h2>
            <p>
              Від щоденних зручностей до особливих
              моментів. Обирайте те, що потрібно саме вам.
            </p>
          </div>
        </div>

        <div className="svc-grid">
          {services.map((service) => (
            <article
              className="svc-card svc-reveal"
              key={service.id}
            >
              <div className="svc-card-image">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                />
                <span className="svc-card-number">
                  {service.number}
                </span>
              </div>

              <div className="svc-card-content">
                <span className="svc-card-category">
                  {service.category}
                </span>

                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <div className="svc-card-footer">
                  <span>{service.price}</span>

                  {service.link && (
                    <Link
                      to={service.link}
                      className="svc-card-link"
                    >
                      {service.linkLabel}
                      <ArrowUpRight size={18} />
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ADVANTAGES */}

      <section className="svc-advantages">
        <div className="svc-advantages-heading svc-reveal">
          <span className="svc-label">03 / ЧОМУ МИ</span>
          <h2>
            Більше турботи.
            <br />
            <em>Більше вражень.</em>
          </h2>
        </div>

        <div className="svc-advantages-list">
          {advantages.map((advantage) => (
            <article
              className="svc-advantage svc-reveal"
              key={advantage.number}
            >
              <span className="svc-advantage-number">
                {advantage.number}
              </span>

              <h3>{advantage.title}</h3>
              <p>{advantage.description}</p>

              <ArrowUpRight size={22} aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}

      <section className="svc-cta">
        <div className="svc-cta-copy svc-reveal">
          <span className="svc-label">04 / ВАШ ВІДПОЧИНОК</span>

          <h2>
            Час для
            <br />
            <em>себе.</em>
          </h2>

          <p>
            Оберіть затишний номер і дозвольте
            собі відпочинок, у якому все
            продумано до дрібниць.
          </p>

          <Link to="/rooms" className="svc-cta-button">
            Переглянути номери
            <ArrowRight size={21} />
          </Link>
        </div>

        <div className="svc-cta-image">
          <img
            src='/public/rooms/покращений 2 1.jpg'
            alt="Затишний готельний номер"
            loading="lazy"
          />
        </div>
      </section>

    </div>
  )
}
