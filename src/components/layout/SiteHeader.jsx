
import { Link } from 'react-router'
import MainNav from '../navigation/MainNav.jsx'

export default function SiteHeader({ title, links }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="site-title" to="/">
          <span className="header-logo-mark">✦</span>

          <span className="header-brand">
            <strong>{title}</strong>
            <small>HOTEL & WELLNESS</small>
          </span>
        </Link>

        <MainNav links={links} />

        <Link to="/rooms" className="header-book-button">
          Забронювати
        </Link>
      </div>
    </header>
  )
}
