
import { Link } from 'react-router'

const footerLinks = [
  { to: '/', label: 'Головна' },
  { to: '/rooms', label: 'Номери' },
  { to: '/restaurant', label: 'Ресторан' },
  { to: '/spa', label: 'SPA & Wellness' },
  { to: '/services', label: 'Послуги' },
  { to: '/about', label: 'Про комплекс' },
  { to: '/bookings', label: 'Бронювання' },
]

export default function SiteFooter() {
  return (
    <footer className="hotel-footer">
      <div className="hotel-footer-inner">

        <div className="footer-about">
          <Link to="/" className="footer-logo">
            ✦ HOTEL & WELLNESS
          </Link>

          <p>
            Місце, де гармонія природи поєднується
            із затишком, комфортом та особливою
            атмосферою відпочинку.
          </p>

          <span className="footer-location">
            Україна, Карпати
          </span>
        </div>

        <div className="footer-navigation">
          <h3>Навігація</h3>

          <ul>
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Зв'язок із нами</h3>

          <p>
            Маєте запитання щодо проживання
            або хочете дізнатися більше про наш комплекс?
          </p>

          <Link to="/rooms" className="footer-book-link">
            Обрати номер →
          </Link>

          <div className="footer-contact-note">
            Контактні дані комплексу будуть
            розміщені тут.
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Hotel & Wellness.
          Усі права захищено.
        </span>

        <span>
          Створено з любов'ю до відпочинку ✦
        </span>
      </div>
    </footer>
  )
}
