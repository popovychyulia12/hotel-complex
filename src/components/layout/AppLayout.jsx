
import { useLayoutEffect } from 'react'
import { Outlet, useLocation } from 'react-router'

import SiteHeader from './SiteHeader.jsx'
import SiteFooter from './SiteFooter.jsx'
import RoomSelectionProvider from '../../providers/RoomSelectionProvider.jsx'

function ScrollToTop() {
  const { pathname, search, hash } = useLocation()

  useLayoutEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      const target = document.getElementById(id)

      if (target) {
        target.scrollIntoView({
          behavior: 'instant',
          block: 'start',
        })
        return
      }
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }, [pathname, search, hash])

  return null
}

export default function AppLayout({ title, links, children }) {
  return (
    <>
      <ScrollToTop />

      <a className="skip-link" href="#main-content">
        Перейти до вмісту
      </a>

      <SiteHeader title={title} links={links} />

      <RoomSelectionProvider>
        <main id="main-content" tabIndex={-1}>
          {children ?? <Outlet />}
        </main>
      </RoomSelectionProvider>

      <SiteFooter />
    </>
  )
}
