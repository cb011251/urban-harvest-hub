import { useEffect, useState } from 'react'
import ItemCard from '../components/ItemCard'

function Products() {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        return response.json()
      })
      .then((data) => {
        const formattedProducts = data.map((product) => ({
          ...product,
          id: product.product_id,
          image: product.image,
        }))

        setProducts(formattedProducts)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError('Unable to load products.')
        setLoading(false)
      })
  }, [])

  const categories = [
    'All',
    ...new Set(products.map((product) => product.category)),
  ]

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      category === 'All' || product.category === category

    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())

    return matchesCategory && matchesSearch
  })

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="font-semibold uppercase tracking-wider text-harvest-green">
            Sustainable Products
          </p>

          <h1 className="mt-2 font-harvest text-4xl font-bold text-gray-900">
            Shop Sustainably
          </h1>

          <p className="mt-3 max-w-2xl text-gray-600">
            Discover practical eco-friendly products for everyday living.
          </p>
        </div>

        {loading && (
          <p className="text-gray-600">Loading products...</p>
        )}

        {error && (
          <p className="text-red-600">{error}</p>
        )}

        {!loading && !error && (
          <>
            <div className="mb-6">
              <label
                htmlFor="product-search"
                className="sr-only"
              >
                Search products
              </label>

              <input
                id="product-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products..."
                className="w-full max-w-xl rounded-full border border-gray-300 bg-white px-5 py-3 text-gray-800 outline-none focus:border-harvest-green focus:ring-2 focus:ring-harvest-green/20"
              />
            </div>

            <div
              className="mb-8 flex flex-wrap gap-3"
              aria-label="Product categories"
            >
              {categories.map((itemCategory) => (
                <button
                  key={itemCategory}
                  onClick={() => setCategory(itemCategory)}
                  className={`rounded-full px-5 py-2 font-medium transition focus:outline-2 focus:outline-offset-2 focus:outline-harvest-green ${
                    category === itemCategory
                      ? 'bg-harvest-green text-white'
                      : 'bg-white text-gray-700 shadow-sm hover:bg-gray-100'
                  }`}
                  aria-pressed={category === itemCategory}
                >
                  {itemCategory}
                </button>
              ))}
            </div>

            <section
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              aria-label="Products"
            >
              {filteredProducts.map((product) => (
                <ItemCard
                  key={product.id}
                  item={product}
                  type="products"
                />
              ))}
            </section>

            {filteredProducts.length === 0 && (
              <p className="mt-8 text-center text-gray-600">
                No products found.
              </p>
            )}
          </>
        )}
      </div>
    </main>
  )
}

export default Products