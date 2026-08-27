import { useEffect, useState } from 'react'
import ItemCard from '../components/ItemCard'

function Events() {
  const [events, setEvents] = useState([])
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    fetch('http://localhost:5000/events')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch events')
        }
        return response.json()
      })
      .then((data) => {
        const formattedEvents = data.map((event) => ({
          ...event,
          id: event.event_id,
          name: event.title,
          date: event.event_date,
          availability: event.capacity,
        }))

        setEvents(formattedEvents)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError('Unable to load events.')
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=6.9271&longitude=79.8612&current=temperature_2m,weather_code'
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Weather request failed')
        }
        return response.json()
      })
      .then((data) => {
        setWeather(data.current)
      })
      .catch((err) => {
        console.error('Weather API error:', err)
      })
  }, [])

  const categories = [
    'All',
    ...new Set(events.map((event) => event.category).filter(Boolean)),
  ]

  const filteredEvents =
    category === 'All'
      ? events
      : events.filter((event) => event.category === category)

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="font-semibold uppercase tracking-wider text-harvest-green">
            Community Activities
          </p>

          <h1 className="mt-2 font-harvest text-4xl font-bold text-gray-900">
            Upcoming Events
          </h1>

          <p className="mt-3 max-w-2xl text-gray-600">
            Join local activities and connect with your eco-conscious community.
          </p>
        </div>

        {weather && (
          <div className="mb-8 rounded-2xl bg-white p-5 shadow-sm">
            <p className="font-semibold text-harvest-green">
              🌤️ Current Weather
            </p>

            <p className="mt-2 text-gray-700">
              Colombo: {weather.temperature_2m}°C
            </p>
          </div>
        )}

        {loading && (
          <p className="text-gray-600">Loading events...</p>
        )}

        {error && (
          <p className="text-red-600">{error}</p>
        )}

        {!loading && !error && (
          <section
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            aria-label="Events"
          >
            {filteredEvents.map((event) => (
              <ItemCard
                key={event.id}
                item={event}
                type="events"
              />
            ))}
          </section>
        )}
      </div>
    </main>
  )
}

export default Events