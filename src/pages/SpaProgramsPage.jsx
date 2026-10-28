
import { useState } from 'react'
import { Link } from 'react-router'

const categories = [
  'Усі програми',
  'Масажі',
  'SPA-ритуали',
  'Водні процедури',
  'Для двох',
]

const programs = [
  {
    id: 1,
    name: 'Класичний масаж',
    category: 'Масажі',
    duration: '60 хв',
    price: 950,
    description:
      'Масаж усього тіла, спрямований на розслаблення м’язів та зняття напруження.',
    image:
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&auto=format&fit=crop&q=85',
  },
  {
    id: 2,
    name: 'Аромамасаж',
    category: 'Масажі',
    duration: '60 хв',
    price: 1100,
    description:
      'Розслаблювальний масаж із використанням ароматичних олій.',
    image:
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=900&auto=format&fit=crop&q=85',
  },
  {
    id: 3,
    name: 'Масаж спини',
    category: 'Масажі',
    duration: '30 хв',
    price: 650,
    description:
      'Процедура для розслаблення м’язів спини, шиї та плечей.',
    image:
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&auto=format&fit=crop&q=85',
  },
  {
    id: 4,
    name: 'Масаж гарячим камінням',
    category: 'Масажі',
    duration: '75 хв',
    price: 1350,
    description:
      'Поєднання масажних технік із приємним теплом гладенького каміння.',
    image:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&auto=format&fit=crop&q=85',
  },
  {
    id: 5,
    name: 'Карпатська гармонія',
    category: 'SPA-ритуали',
    duration: '120 хв',
    price: 2400,
    description:
      'Комплексний ритуал із масажем, доглядом за тілом та ароматерапією.',
    image:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&auto=format&fit=crop&q=85',
  },
  {
    id: 6,
    name: 'Шовковий дотик',
    category: 'SPA-ритуали',
    duration: '90 хв',
    price: 1750,
    description:
      'Ніжне скрабування, зволоження шкіри та розслаблювальний масаж.',
    image:
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=900&auto=format&fit=crop&q=85',
  },
  {
    id: 7,
    name: 'Лісове відновлення',
    category: 'SPA-ритуали',
    duration: '120 хв',
    price: 2200,
    description:
      'Догляд за тілом із природними ароматами та розслаблювальними процедурами.',
    image:
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&auto=format&fit=crop&q=85',
  },
  {
    id: 8,
    name: 'Фінська сауна',
    category: 'Водні процедури',
    duration: '60 хв',
    price: 850,
    description:
      'Відпочинок у сауні з атмосферою натурального дерева та сухого тепла.',
    image:
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=900&auto=format&fit=crop&q=85',
  },
  {
    id: 9,
    name: 'Джакузі',
    category: 'Водні процедури',
    duration: '45 хв',
    price: 750,
    description:
      'Відпочинок у теплій воді з гідромасажем.',
    image:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&auto=format&fit=crop&q=85',
  },
  {
    id: 10,
    name: 'Басейн та релакс',
    category: 'Водні процедури',
    duration: '120 хв',
    price: 600,
    description:
      'Відвідування басейну та відпочинок у зоні релаксу.',
    image:
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=900&auto=format&fit=crop&q=85',
  },
  {
    id: 11,
    name: 'Романтичний SPA',
    category: 'Для двох',
    duration: '120 хв',
    price: 3900,
    description:
      'Спільний відпочинок для двох із масажем та атмосферою романтики.',
    image:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&auto=format&fit=crop&q=85',
  },
  {
    id: 12,
    name: 'Гармонія для двох',
    category: 'Для двох',
    duration: '150 хв',
    price: 4500,
    description:
      'Комплексна SPA-програма для пари з ароматерапією та відпочинком.',
    image:
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=900&auto=format&fit=crop&q=85',
  },
]

export default function SpaProgramsPage() {
  const [activeCategory, setActiveCategory] = useState('Усі програми')
  const [selectedProgram, setSelectedProgram] = useState(null)

  const filteredPrograms =
    activeCategory === 'Усі програми'
      ? programs
      : programs.filter(
          (program) => program.category === activeCategory
        )

  return (
    <div className="spa-programs-page">
      <section className="spa-programs-hero">
        <span className="spa-eyebrow">
          МИСТЕЦТВО ВІДНОВЛЕННЯ
        </span>

        <h1>SPA-програми</h1>

        <p>
          Обирайте процедури, які подарують вам
          відчуття спокою, легкості та гармонії.
        </p>

        <Link to="/spa" className="spa-back-link">
          ← Повернутися до SPA
        </Link>
      </section>

      <section className="spa-programs-content">
        <div className="spa-programs-categories">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={
                activeCategory === category
                  ? 'spa-category-button selected'
                  : 'spa-category-button'
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <p className="spa-programs-count">
          Знайдено програм: {filteredPrograms.length}
        </p>

        <div className="spa-programs-grid">
          {filteredPrograms.map((program) => (
            <article
              className="spa-program-card"
              key={program.id}
            >
              <button
                type="button"
                className="spa-program-image-button"
                onClick={() => setSelectedProgram(program)}
                aria-label={`Детальніше про ${program.name}`}
              >
                <img
                  src={program.image}
                  alt={program.name}
                  loading="lazy"
                />
              </button>

              <div className="spa-program-info">
                <span className="spa-program-category">
                  {program.category}
                </span>

                <h2>{program.name}</h2>

                <p>{program.description}</p>

                <div className="spa-program-bottom">
                  <span>{program.duration}</span>

                  <strong>
                    {program.price.toLocaleString('uk-UA')} грн
                  </strong>
                </div>

                <button
                  type="button"
                  className="spa-program-details"
                  onClick={() => setSelectedProgram(program)}
                >
                  Детальніше
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedProgram && (
        <div
          className="spa-modal-backdrop"
          onClick={() => setSelectedProgram(null)}
        >
          <div
            className="spa-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="spa-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="spa-modal-close"
              onClick={() => setSelectedProgram(null)}
              aria-label="Закрити"
            >
              ×
            </button>

            <img
              src={selectedProgram.image}
              alt={selectedProgram.name}
            />

            <div className="spa-modal-content">
              <span className="spa-program-category">
                {selectedProgram.category}
              </span>

              <h2 id="spa-modal-title">
                {selectedProgram.name}
              </h2>

              <p>{selectedProgram.description}</p>

              <div className="spa-program-bottom">
                <span>{selectedProgram.duration}</span>

                <strong>
                  {selectedProgram.price.toLocaleString('uk-UA')} грн
                </strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
