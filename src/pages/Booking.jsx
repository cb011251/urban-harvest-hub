import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

function Booking() {
  const [searchParams] = useSearchParams()

  const type = searchParams.get('type')
  const id = searchParams.get('id')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '1',
  })

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')
    setLoading(true)

    try {
      const response = await fetch('https://urban-harvest-hub-production-8721.up.railway.app/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 1,
          event_id: type === 'events' ? Number(id) : null,
          workshop_id: type === 'workshops' ? Number(id) : null,
          booking_date: formData.date,
          status: 'confirmed',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Booking failed')
      }

      setMessage(
        `Booking submitted successfully! Your booking ID is ${data.booking_id}.`
      )

      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        guests: '1',
      })
    } catch (error) {
      console.error(error)
      setMessage('Unable to submit booking. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <p className="font-semibold uppercase tracking-wider text-harvest-green">
            Reservations
          </p>

          <h1 className="mt-2 font-harvest text-4xl font-bold text-gray-900">
            Book Your Place
          </h1>

          <p className="mt-3 text-gray-600">
            Complete the form below to submit your booking request.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-8 shadow-sm"
        >
          <div className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block font-semibold text-gray-800"
              >
                Full Name *
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-harvest-green focus:ring-2 focus:ring-harvest-green/20"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-semibold text-gray-800"
              >
                Email *
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-harvest-green focus:ring-2 focus:ring-harvest-green/20"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block font-semibold text-gray-800"
              >
                Phone Number *
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-harvest-green focus:ring-2 focus:ring-harvest-green/20"
              />
            </div>

            <div>
              <label
                htmlFor="date"
                className="mb-2 block font-semibold text-gray-800"
              >
                Preferred Date *
              </label>

              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-harvest-green focus:ring-2 focus:ring-harvest-green/20"
              />
            </div>

            <div>
              <label
                htmlFor="guests"
                className="mb-2 block font-semibold text-gray-800"
              >
                Number of Guests
              </label>

              <input
                id="guests"
                name="guests"
                type="number"
                min="1"
                max="20"
                value={formData.guests}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-harvest-green focus:ring-2 focus:ring-harvest-green/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-harvest-green px-6 py-3 font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Submitting...' : 'Submit Booking'}
            </button>

            {message && (
              <p
                role="status"
                className="rounded-xl bg-green-50 p-4 font-medium text-harvest-green"
              >
                {message}
              </p>
            )}
          </div>
        </form>
      </div>
    </main>
  )
}

export default Booking