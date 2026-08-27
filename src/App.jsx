import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Workshops from './pages/Workshops'
import Events from './pages/Events'
import Detail from './pages/Detail'
import Navbar from './components/Navbar'
import Booking from './pages/Booking'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/events" element={<Events />} />

        <Route path="/products/:id" element={<Detail />} />
        <Route path="/workshops/:id" element={<Detail />} />
        <Route path="/events/:id" element={<Detail />} />

        <Route path="/booking" element={<Booking />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App