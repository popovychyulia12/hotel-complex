
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { ArrowLeft, ArrowUpRight, X } from 'lucide-react'
import './RestaurantMenuPage.css'

const categories = [
  'Усі страви',
  'Сніданки',
  'Закуски',
  'Перші страви',
  'Основні страви',
  'Десерти',
  'Напої',
]

// Окремі зображення для кожної позиції.
// Для локальних фото збережи файл у public/menu/
// і заміни URL на /menu/назва-файлу.webp.

const menuItems = [
  {
    id: 1,
    name: 'Фірмовий сніданок',
    category: 'Сніданки',
    description: 'Яєчня, домашня ковбаса, сир, овочі та свіжий хліб.',
    weight: '350 г',
    price: 290,
    image:
      '/menu/фірмовий сніданок.webp',
  },
  {
    id: 2,
    name: 'Сирники з ягодами',
    category: 'Сніданки',
    description: 'Ніжні сирники зі сметаною, ягодами та медом.',
    weight: '250 г',
    price: 225,
    image:
      '/menu/сирники.jpg',
  },
  {
    id: 3,
    name: 'Омлет із сиром',
    category: 'Сніданки',
    description: 'Повітряний омлет із сиром, зеленню та овочами.',
    weight: '280 г',
    price: 195,
    image:
      '/menu/омлет з сиром.webp',
  },
  {
    id: 4,
    name: 'Авокадо-тост',
    category: 'Сніданки',
    description: 'Підсмажений хліб, авокадо, яйце пашот та зелень.',
    weight: '240 г',
    price: 245,
    image:
    '/menu/авокадо тост.webp'
  },
  {
    id: 5,
    name: 'Сирна тарілка',
    category: 'Закуски',
    description: 'Добірка сирів із медом та горіхами.',
    weight: '250 г',
    price: 340,
    image:
    '/menu/сирна тарілка.webp'
  },
  {
    id: 6,
    name: 'Овочева тарілка',
    category: 'Закуски',
    description: 'Свіжі сезонні овочі із зеленню та соусом.',
    weight: '300 г',
    price: 190,
    image: '/menu/овочева тарілка.webp'
  },
  {
    id: 7,
    name: 'Брускети з томатами',
    category: 'Закуски',
    description: 'Хрусткі брускети з томатами, базиліком та оливковою олією.',
    weight: '200 г',
    price: 210,
    image:'/menu/брускети з томатами.webp'
  },
  {
    id: 8,
    name: 'Грибна закуска',
    category: 'Закуски',
    description: 'Обсмажені гриби з цибулею та ароматними травами.',
    weight: '220 г',
    price: 245,
    image:'/menu/грибна закуска.webp'
  },
  {
    id: 9,
    name: 'Бограч',
    category: 'Перші страви',
    description: 'Густий суп із м’ясом, овочами, паприкою та спеціями.',
    weight: '350 г',
    price: 285,
    image: '/menu/бограч.webp'
  },
  {
    id: 10,
    name: 'Грибна юшка',
    category: 'Перші страви',
    description: 'Ароматна юшка з грибів і зелені.',
    weight: '300 г',
    price: 225,
    image: '/menu/грибна юшка.webp'
  },
  {
    id: 11,
    name: 'Український борщ',
    category: 'Перші страви',
    description: 'Традиційний борщ зі сметаною та домашнім хлібом.',
    weight: '350 г',
    price: 235,
    image: '/menu/борщ.webp'
  },
  {
    id: 12,
    name: 'Крем-суп із гарбуза',
    category: 'Перші страви',
    description: 'Ніжний гарбузовий суп із вершками та насінням.',
    weight: '300 г',
    price: 210,
    image: '/menu/крем-суп.webp'
  },
  {
    id: 13,
    name: 'Банош із бринзою',
    category: 'Основні страви',
    description: 'Кукурудзяна каша на вершках із бринзою та шкварками.',
    weight: '350 г',
    price: 265,
    image:'/menu/банош.webp'
  },
  {
    id: 14,
    name: 'Деруни з грибним соусом',
    category: 'Основні страви',
    description: 'Золотисті картопляні деруни з вершково-грибним соусом.',
    weight: '300 г',
    price: 245,
    image:'/menu/деруни.jpg'
  },
  {
    id: 15,
    name: 'Форель із травами',
    category: 'Основні страви',
    description: 'Запечена форель із лимоном, травами та овочами.',
    weight: '350 г',
    price: 425,
    image: '/menu/форель.webp'
  },
  {
    id: 16,
    name: 'Стейк із яловичини',
    category: 'Основні страви',
    description: 'Соковитий стейк із запеченою картоплею та соусом.',
    weight: '350 г',
    price: 590,
    image: '/menu/стейк.webp'
  },
  {
    id: 17,
    name: 'Куряче філе з овочами',
    category: 'Основні страви',
    description: 'Ніжне куряче філе на грилі із сезонними овочами.',
    weight: '320 г',
    price: 325,
    image:'/menu/філе.webp'
  },
  {
    id: 18,
    name: 'Вареники з картоплею',
    category: 'Основні страви',
    description: 'Домашні вареники з картоплею, цибулею та сметаною.',
    weight: '300 г',
    price: 225,
    image: '/menu/Вареники.webp'
  },
  {
    id: 19,
    name: 'Медовик',
    category: 'Десерти',
    description: 'Ніжні медові коржі з вершковим кремом.',
    weight: '150 г',
    price: 175,
    image: '/menu/медовик.webp'
  },
  {
    id: 20,
    name: 'Шоколадний фондан',
    category: 'Десерти',
    description: 'Теплий шоколадний десерт із рідкою серединкою.',
    weight: '160 г',
    price: 210,
    image: '/menu/фондан.webp'
  },
  {
    id: 21,
    name: 'Чизкейк із ягодами',
    category: 'Десерти',
    description: 'Класичний вершковий чизкейк із ягідним соусом.',
    weight: '160 г',
    price: 195,
    image:'/menu/чизкейк.webp'
  },
  {
    id: 22,
    name: 'Яблучний штрудель',
    category: 'Десерти',
    description: 'Тонке тісто з яблуками, корицею та ванільним соусом.',
    weight: '180 г',
    price: 185,
    image: '/menu/штрудель.webp'
  },
  {
    id: 23,
    name: 'Еспресо',
    category: 'Напої',
    description: 'Насичена ароматна кава.',
    weight: '30 мл',
    price: 75,
    image:'/menu/еспресо.webp'
  },
  {
    id: 24,
    name: 'Капучино',
    category: 'Напої',
    description: 'Еспресо з молоком та ніжною молочною пінкою.',
    weight: '250 мл',
    price: 105,
    image: '/menu/капучино.webp'
  },
  {
    id: 25,
    name: 'Трав’яний чай',
    category: 'Напої',
    description: 'Ароматний чай із добірних трав.',
    weight: '400 мл',
    price: 125,
    image: '/menu/чай.webp'
  },
  {
    id: 26,
    name: 'Домашній лимонад',
    category: 'Напої',
    description: 'Освіжаючий лимонад із лимоном, м’ятою та льодом.',
    weight: '400 мл',
    price: 135,
    image: '/menu/лимонад.webp'
  },
]

function DishImage({ item }) {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setFailed(false)
  }, [item.image])

  if (failed) {
    return (
      <div className="rm-dish-photo-placeholder">
        <span>{item.category}</span>
        <strong>{item.name}</strong>
      </div>
    )
  }

  return (
    <img
      className="rm-dish-photo"
      src={item.image}
      alt={item.name}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

export default function RestaurantMenuPage() {
  const [activeCategory, setActiveCategory] = useState('Усі страви')
  const [selectedDish, setSelectedDish] = useState(null)

  const filteredItems =
    activeCategory === 'Усі страви'
      ? menuItems
      : menuItems.filter(
          (item) => item.category === activeCategory
        )

  useEffect(() => {
    if (!selectedDish) return

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setSelectedDish(null)
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [selectedDish])

  return (
    <main className="rm-page">

      <section className="rm-header">
        <Link to="/restaurant" className="rm-back">
          <ArrowLeft size={18} />
          До ресторану
        </Link>

        <div className="rm-header-main">
          <div>
            <span className="rm-label">
              HOTEL & WELLNESS / GASTRONOMY
            </span>

            <h1>
              НАШЕ
              <br />
              <span>МЕНЮ</span>
            </h1>
          </div>

          <p>
            Сніданки, авторські страви, десерти
            та напої. Обирайте те, що до смаку
            саме вам.
          </p>
        </div>
      </section>

      <section className="rm-content">
        <div className="rm-categories" aria-label="Категорії меню">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={
                activeCategory === category
                  ? 'rm-category active'
                  : 'rm-category'
              }
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="rm-results">
          <span>ОБЕРІТЬ СВОЄ</span>
          <span>ПОЗИЦІЙ: {filteredItems.length}</span>
        </div>

        <div className="rm-grid">
          {filteredItems.map((item) => (
            <article className="rm-card" key={item.id}>
              <button
                type="button"
                className="rm-card-image"
                onClick={() => setSelectedDish(item)}
                aria-label={`Детальніше про ${item.name}`}
              >
                <DishImage item={item} />

                <span className="rm-card-arrow">
                  <ArrowUpRight size={22} />
                </span>
              </button>

              <div className="rm-card-content">
                <span className="rm-card-category">
                  {item.category}
                </span>

                <h2>{item.name}</h2>

                <p>{item.description}</p>

                <div className="rm-card-bottom">
                  <span>{item.weight}</span>
                  <strong>
                    {item.price.toLocaleString('uk-UA')} грн
                  </strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedDish && (
        <div
          className="rm-modal-backdrop"
          onClick={() => setSelectedDish(null)}
        >
          <div
            className="rm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="rm-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="rm-modal-close"
              onClick={() => setSelectedDish(null)}
              aria-label="Закрити"
            >
              <X size={24} />
            </button>

            <div className="rm-modal-photo">
              <DishImage item={selectedDish} />
            </div>

            <div className="rm-modal-content">
              <span className="rm-card-category">
                {selectedDish.category}
              </span>

              <h2 id="rm-modal-title">
                {selectedDish.name}
              </h2>

              <p>{selectedDish.description}</p>

              <div className="rm-card-bottom">
                <span>{selectedDish.weight}</span>
                <strong>
                  {selectedDish.price.toLocaleString('uk-UA')} грн
                </strong>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  )
}
