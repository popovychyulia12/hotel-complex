
import { useState } from 'react'
import { Link } from 'react-router'

const categories = [
  'Усі страви',
  'Сніданки',
  'Закуски',
  'Перші страви',
  'Основні страви',
  'Десерти',
  'Напої',
]

const menuItems = [
  {
    id: 1,
    name: 'Карпатський сніданок',
    category: 'Сніданки',
    description: 'Яєчня, домашня ковбаса, сир, овочі та свіжий хліб.',
    weight: '350 г',
    price: 290,
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&auto=format&fit=crop&q=85',
  },
  {
    id: 2,
    name: 'Сирники з ягодами',
    category: 'Сніданки',
    description: 'Ніжні сирники зі сметаною, ягодами та медом.',
    weight: '250 г',
    price: 225,
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&auto=format&fit=crop&q=85',
  },
  {
    id: 3,
    name: 'Омлет із сиром',
    category: 'Сніданки',
    description: 'Повітряний омлет із сиром, зеленню та овочами.',
    weight: '280 г',
    price: 195,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop&q=85',
  },
  {
    id: 4,
    name: 'Авокадо-тост',
    category: 'Сніданки',
    description: 'Підсмажений хліб, авокадо, яйце пашот та зелень.',
    weight: '240 г',
    price: 245,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop&q=85',
  },
  {
    id: 5,
    name: 'Карпатська сирна тарілка',
    category: 'Закуски',
    description: 'Добірка локальних сирів із медом та горіхами.',
    weight: '250 г',
    price: 340,
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&auto=format&fit=crop&q=85',
  },
  {
    id: 6,
    name: 'Овочева тарілка',
    category: 'Закуски',
    description: 'Свіжі сезонні овочі із зеленню та соусом.',
    weight: '300 г',
    price: 190,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=85',
  },
  {
    id: 7,
    name: 'Брускети з томатами',
    category: 'Закуски',
    description: 'Хрусткі брускети з томатами, базиліком та оливковою олією.',
    weight: '200 г',
    price: 210,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=85',
  },
  {
    id: 8,
    name: 'Грибна закуска',
    category: 'Закуски',
    description: 'Обсмажені лісові гриби з цибулею та ароматними травами.',
    weight: '220 г',
    price: 245,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=85',
  },
  {
    id: 9,
    name: 'Карпатський бограч',
    category: 'Перші страви',
    description: 'Густий суп із м’ясом, овочами, паприкою та спеціями.',
    weight: '350 г',
    price: 285,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=85',
  },
  {
    id: 10,
    name: 'Грибна юшка',
    category: 'Перші страви',
    description: 'Ароматна юшка з лісових грибів і зелені.',
    weight: '300 г',
    price: 225,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=85',
  },
  {
    id: 11,
    name: 'Український борщ',
    category: 'Перші страви',
    description: 'Традиційний борщ зі сметаною та домашнім хлібом.',
    weight: '350 г',
    price: 235,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=85',
  },
  {
    id: 12,
    name: 'Крем-суп із гарбуза',
    category: 'Перші страви',
    description: 'Ніжний гарбузовий суп із вершками та насінням.',
    weight: '300 г',
    price: 210,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=85',
  },
  {
    id: 13,
    name: 'Банош із бринзою',
    category: 'Основні страви',
    description: 'Кукурудзяна каша на вершках із бринзою та шкварками.',
    weight: '350 г',
    price: 265,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=85',
  },
  {
    id: 14,
    name: 'Деруни з грибним соусом',
    category: 'Основні страви',
    description: 'Золотисті картопляні деруни з вершково-грибним соусом.',
    weight: '300 г',
    price: 245,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=85',
  },
  {
    id: 15,
    name: 'Форель із травами',
    category: 'Основні страви',
    description: 'Запечена форель із лимоном, травами та овочами.',
    weight: '350 г',
    price: 425,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=85',
  },
  {
    id: 16,
    name: 'Стейк із яловичини',
    category: 'Основні страви',
    description: 'Соковитий стейк із запеченою картоплею та соусом.',
    weight: '350 г',
    price: 590,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=85',
  },
  {
    id: 17,
    name: 'Куряче філе з овочами',
    category: 'Основні страви',
    description: 'Ніжне куряче філе на грилі із сезонними овочами.',
    weight: '320 г',
    price: 325,
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800&auto=format&fit=crop&q=85',
  },
  {
    id: 18,
    name: 'Вареники з картоплею',
    category: 'Основні страви',
    description: 'Домашні вареники з картоплею, цибулею та сметаною.',
    weight: '300 г',
    price: 225,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=85',
  },
  {
    id: 19,
    name: 'Медовик',
    category: 'Десерти',
    description: 'Ніжні медові коржі з вершковим кремом.',
    weight: '150 г',
    price: 175,
    image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=800&auto=format&fit=crop&q=85',
  },
  {
    id: 20,
    name: 'Шоколадний фондан',
    category: 'Десерти',
    description: 'Теплий шоколадний десерт із рідкою серединкою.',
    weight: '160 г',
    price: 210,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=85',
  },
  {
    id: 21,
    name: 'Чизкейк із ягодами',
    category: 'Десерти',
    description: 'Класичний вершковий чизкейк із ягідним соусом.',
    weight: '160 г',
    price: 195,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop&q=85',
  },
  {
    id: 22,
    name: 'Яблучний штрудель',
    category: 'Десерти',
    description: 'Тонке тісто з яблуками, корицею та ванільним соусом.',
    weight: '180 г',
    price: 185,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=85',
  },
  {
    id: 23,
    name: 'Еспресо',
    category: 'Напої',
    description: 'Насичена ароматна кава.',
    weight: '30 мл',
    price: 75,
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=800&auto=format&fit=crop&q=85',
  },
  {
    id: 24,
    name: 'Капучино',
    category: 'Напої',
    description: 'Еспресо з молоком та ніжною молочною пінкою.',
    weight: '250 мл',
    price: 105,
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=800&auto=format&fit=crop&q=85',
  },
  {
    id: 25,
    name: 'Карпатський трав’яний чай',
    category: 'Напої',
    description: 'Ароматний чай із добірних гірських трав.',
    weight: '400 мл',
    price: 125,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=85',
  },
  {
    id: 26,
    name: 'Домашній лимонад',
    category: 'Напої',
    description: 'Освіжаючий лимонад із лимоном, м’ятою та льодом.',
    weight: '400 мл',
    price: 135,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765edfd4?w=800&auto=format&fit=crop&q=85',
  },
]

export default function RestaurantMenuPage() {
  const [activeCategory, setActiveCategory] = useState('Усі страви')
  const [selectedDish, setSelectedDish] = useState(null)

  const filteredItems =
    activeCategory === 'Усі страви'
      ? menuItems
      : menuItems.filter(
          (item) => item.category === activeCategory
        )

  return (
    <div className="restaurant-menu-page">
      <section className="restaurant-menu-hero">
        <span className="restaurant-eyebrow">
          СМАК КАРПАТ
        </span>

        <h1>Меню ресторану</h1>

        <p>
          Від традиційних карпатських страв
          до сучасних гастрономічних поєднань.
        </p>

        <Link to="/restaurant" className="menu-back-link">
          ← Повернутися до ресторану
        </Link>
      </section>

      <section className="restaurant-menu-content">
        <div className="menu-category-list">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={
                activeCategory === category
                  ? 'menu-category-button selected'
                  : 'menu-category-button'
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <p className="menu-results-count">
          Знайдено позицій: {filteredItems.length}
        </p>

        <div className="restaurant-menu-grid">
          {filteredItems.map((item) => (
            <article className="menu-dish-card" key={item.id}>
              <button
                type="button"
                className="menu-dish-image-button"
                onClick={() => setSelectedDish(item)}
                aria-label={`Переглянути страву ${item.name}`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                />
              </button>

              <div className="menu-dish-info">
                <span className="menu-dish-category">
                  {item.category}
                </span>

                <h2>{item.name}</h2>

                <p>{item.description}</p>

                <div className="menu-dish-bottom">
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
          className="menu-modal-backdrop"
          onClick={() => setSelectedDish(null)}
        >
          <div
            className="menu-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="menu-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="menu-modal-close"
              onClick={() => setSelectedDish(null)}
              aria-label="Закрити"
            >
              ×
            </button>

            <img
              src={selectedDish.image}
              alt={selectedDish.name}
            />

            <div className="menu-modal-content">
              <span className="menu-dish-category">
                {selectedDish.category}
              </span>

              <h2 id="menu-modal-title">
                {selectedDish.name}
              </h2>

              <p>{selectedDish.description}</p>

              <div className="menu-dish-bottom">
                <span>{selectedDish.weight}</span>

                <strong>
                  {selectedDish.price.toLocaleString('uk-UA')} грн
                </strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
