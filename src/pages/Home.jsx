import homePageImage from "../assets/home-page.jpg";

function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <p className="mb-4 font-semibold uppercase tracking-wider text-harvest-green">
          Urban Harvest Hub
        </p>

        <h1 className="font-harvest text-5xl font-bold text-gray-900">
          Grow Better. Live Greener.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          Discover sustainable products, community workshops, and local
          eco-friendly events in one place.
        </p>
      </section>
      <section className="mt-20 px-6 pb-20">
  <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
    <div className="rounded-2xl border border-green-100 bg-green-50 p-6 text-center">
      <h3 className="text-xl font-semibold text-green-800">
        🌱 Products
      </h3>
      <p className="mt-3 text-gray-600">
        Discover sustainable and locally sourced products.
      </p>
    </div>

    <div className="rounded-2xl border border-green-100 bg-green-50 p-6 text-center">
      <h3 className="text-xl font-semibold text-green-800">
        🌿 Workshops
      </h3>
      <p className="mt-3 text-gray-600">
        Learn practical skills and connect with the community.
      </p>
    </div>

    <div className="rounded-2xl border border-green-100 bg-green-50 p-6 text-center">
      <h3 className="text-xl font-semibold text-green-800">
        🌍 Events
      </h3>
      <p className="mt-3 text-gray-600">
        Find upcoming eco-friendly activities and events.
      </p>
    </div>
  </div>
</section>

<section className="px-6 pb-20">
  <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl">
    <img
      src={homePageImage}
      alt="Urban Harvest"
      className="h-72 w-full object-cover md:h-96"
    />
  </div>
</section>

    </main>
  )
}

export default Home