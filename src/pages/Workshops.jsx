import { useEffect, useState } from 'react'
import ItemCard from '../components/ItemCard'

function Workshops() {
  const [workshops, setWorkshops] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000/workshops')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch workshops')
        }
        return response.json()
      })
      .then((data) => {
        const formattedWorkshops = data.map((workshop) => ({
          ...workshop,
          id: workshop.workshop_id,
          name: workshop.title,
          date: workshop.workshop_date,
          availability: workshop.capacity,
        }))

        setWorkshops(formattedWorkshops)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError('Unable to load workshops.')
        setLoading(false)
      })
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="font-semibold uppercase tracking-wider text-harvest-green">
            Community Learning
          </p>

          <h1 className="mt-2 font-harvest text-4xl font-bold text-gray-900">
            Sustainable Workshops
          </h1>

          <p className="mt-3 max-w-2xl text-gray-600">
            Learn practical skills that help you live a more sustainable life.
          </p>
        </div>

        {loading && (
          <p className="text-gray-600">Loading workshops...</p>
        )}

        {error && (
          <p className="text-red-600">{error}</p>
        )}

        {!loading && !error && (
          <section
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            aria-label="Workshops"
          >
            {workshops.map((workshop) => (
              <ItemCard
                key={workshop.id}
                item={workshop}
                type="workshops"
              />
            ))}
          </section>
        )}
      </div>
    </main>
  )
}

export default Workshops