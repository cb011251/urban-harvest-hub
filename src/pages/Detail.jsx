import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import images from '../data/images'

const API_URL = 'https://urban-harvest-hub-production-8721.up.railway.app'

function Detail() {
  const { id } = useParams()
  const location = useLocation()

  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  let type = 'products'

  if (location.pathname.startsWith('/workshops')) {
    type = 'workshops'
  } else if (location.pathname.startsWith('/events')) {
    type = 'events'
  }

  useEffect(() => {
    const loadItem = async () => {
      try {
        setLoading(true)
        setError('')
        setItem(null)

        const response = await fetch(`${API_URL}/${type}`)

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`)
        }

        const data = await response.json()

        console.log('Detail type:', type)
        console.log('Detail ID:', id)
        console.log('API data:', data)

        const foundItem = data.find((entry) => {
          if (type === 'products') {
            return String(entry.product_id) === String(id)
          }

          if (type === 'workshops') {
            return String(entry.workshop_id) === String(id)
          }

          if (type === 'events') {
            return String(entry.event_id) === String(id)
          }

          return false
        })

        if (!foundItem) {
          throw new Error(`No ${type} found with ID ${id}`)
        }

        const formattedItem = {
          ...foundItem,

          id:
            type === 'products'
              ? foundItem.product_id
              : type === 'workshops'
                ? foundItem.workshop_id
                : foundItem.event_id,

          name: foundItem.name || foundItem.title,

          date:
            foundItem.event_date ||
            foundItem.workshop_date,

          availability:
            foundItem.stock_quantity !== undefined
              ? foundItem.stock_quantity
              : foundItem.capacity,
        }

        setItem(formattedItem)
      } catch (err) {
        console.error('DETAIL PAGE ERROR:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadItem()
  }, [type, id])

  const isProduct = type === 'products'

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-gray-600">Loading details...</p>
        </div>
      </main>
    )
  }

  if (error || !item) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-harvest text-4xl font-bold text-gray-900">
            Unable to Load Item
          </h1>

          <p className="mt-4 text-red-600">
            {error || 'The item could not be found.'}
          </p>

          <Link
            to={`/${type}`}
            className="mt-6 inline-block rounded-full bg-harvest-green px-6 py-3 font-semibold text-white"
          >
            Back
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <Link
          to={`/${type}`}
          className="font-semibold text-harvest-green hover:underline"
        >
          ← Back to {type}
        </Link>

        <article className="mt-8 grid overflow-hidden rounded-3xl bg-white shadow-sm md:grid-cols-2">
          <img
            src={images[item.image]}
            alt={item.name}
            className="h-full min-h-80 w-full object-cover"
          />

          <div className="p-8 md:p-10">
            <p className="font-semibold uppercase tracking-wider text-harvest-green">
              {item.category || type}
            </p>

            <h1 className="mt-3 font-harvest text-4xl font-bold text-gray-900">
              {item.name}
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              {item.description}
            </p>

            <div className="mt-8 space-y-3 text-gray-700">
              {!isProduct && (
                <>
                  <p>
                    <strong>Date:</strong>{' '}
                    {new Date(item.date).toLocaleDateString()}
                  </p>

                  <p>
                    <strong>Location:</strong> {item.location}
                  </p>

                  <p>
                    <strong>Available places:</strong>{' '}
                    {item.availability}
                  </p>
                </>
              )}

              {isProduct && (
                <>
                  <p className="text-xl font-bold text-earth-brown">
                    Rs. {item.price}
                  </p>

                  <p>
                    <strong>Availability:</strong>{' '}
                    {item.stock_quantity > 0
                      ? `${item.stock_quantity} in stock`
                      : 'Out of stock'}
                  </p>
                </>
              )}
            </div>

            <Link
              to={`/booking?type=${type}&id=${item.id}`}
              className="mt-8 inline-block rounded-full bg-harvest-green px-7 py-3 font-semibold text-white hover:opacity-90"
            >
              {isProduct ? 'Buy' : 'Book Now'}
            </Link>
          </div>
        </article>
      </div>
    </main>
  )
}

export default Detail