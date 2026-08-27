import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  const [language, setLanguage] = useState('EN')

  const linkClass = ({ isActive }) =>
    `font-medium transition ${
      isActive
        ? 'text-harvest-green'
        : 'text-gray-600 hover:text-harvest-green'
    }`

  const enableNotifications = async () => {
    if (!('Notification' in window)) {
      alert('Notifications are not supported by this browser.')
      return
    }

    const permission = await Notification.requestPermission()

    if (permission === 'granted') {
      alert('Notifications enabled successfully!')
    }
  }

  const tamil = language === 'TA'

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
        aria-label="Main navigation"
      >
        <NavLink
          to="/"
          className="font-harvest text-2xl font-bold text-harvest-green"
        >
          Urban Harvest
        </NavLink>

        <div className="flex items-center gap-6">
          <NavLink to="/" className={linkClass}>
            {tamil ? 'முகப்பு' : 'Home'}
          </NavLink>

          <NavLink to="/products" className={linkClass}>
            {tamil ? 'தயாரிப்புகள்' : 'Products'}
          </NavLink>

          <NavLink to="/workshops" className={linkClass}>
            {tamil ? 'பயிற்சிப்பட்டறைகள்' : 'Workshops'}
          </NavLink>

          <NavLink to="/events" className={linkClass}>
            {tamil ? 'நிகழ்வுகள்' : 'Events'}
          </NavLink>

          <button
            onClick={enableNotifications}
            className="rounded-full bg-harvest-green px-4 py-2 font-medium text-white transition hover:opacity-90 focus:outline-2 focus:outline-offset-2 focus:outline-harvest-green"
          >
            🔔 {tamil ? 'அறிவிப்புகள்' : 'Notifications'}
          </button>

          <button
            onClick={() => setLanguage(tamil ? 'EN' : 'TA')}
            className="rounded-full border border-harvest-green px-4 py-2 font-medium text-harvest-green hover:bg-gray-50"
            aria-label="Change language"
          >
            {tamil ? 'EN' : 'தமிழ்'}
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar