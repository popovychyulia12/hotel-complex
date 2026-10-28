
import { useState } from 'react'
import { NavLink } from 'react-router'

export default function MainNav({ links }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <nav className="main-nav" aria-label="Основна навігація">
      <button
        type="button"
        className="mobile-menu-toggle"
        aria-label={
          isMenuOpen ? 'Закрити меню' : 'Відкрити меню'
        }
        aria-expanded={isMenuOpen}
        aria-controls="main-navigation-list"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className={isMenuOpen ? 'menu-line open' : 'menu-line'} />
        <span className={isMenuOpen ? 'menu-line open' : 'menu-line'} />
        <span className={isMenuOpen ? 'menu-line open' : 'menu-line'} />
      </button>

      <ul
        id="main-navigation-list"
        className={`nav-list ${isMenuOpen ? 'nav-list-open' : ''}`}
      >
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              end={link.end}
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
