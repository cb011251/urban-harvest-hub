import { Link } from 'react-router-dom'
import images from '../data/images'

function ItemCard({ item, type }) {
  return (
    <article className="harvest-card overflow-hidden">
      <img
        src={images[item.image]}
        alt={item.name}
        className="h-52 w-full object-cover"
      />

      <div className="mt-4">
        <p className="text-sm font-semibold text-harvest-green">
          {item.category}
        </p>

        <h2 className="mt-1 text-xl font-bold text-gray-900">
          {item.name}
        </h2>

        <p className="mt-2 line-clamp-2 text-gray-600">
          {item.description}
        </p>

        <div className="mt-4 flex items-center justify-end">
          {type === 'products' && (
            <span className="mr-auto font-bold text-earth-brown">
              {item.price === 0 ? 'Free' : `Rs. ${item.price}`}
            </span>
          )}

          <Link
            to={`/${type}/${item.id}`}
            className="rounded-full bg-harvest-green px-4 py-2 text-sm font-semibold text-white hover:opacity-90 focus:outline-2 focus:outline-offset-2 focus:outline-harvest-green"
            aria-label={`View details for ${item.name}`}
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  )
}

export default ItemCard