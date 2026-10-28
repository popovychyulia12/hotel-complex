
import { Outlet } from 'react-router'

import SiteHeader from './SiteHeader.jsx'
import SiteFooter from './SiteFooter.jsx'

import RoomSelectionProvider from '../../providers/RoomSelectionProvider.jsx'

export default function AppLayout({ title, links, children }) {
  return (
    <>
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
