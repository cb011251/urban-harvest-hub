const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err.message)
    return
  }

  console.log('Connected to MySQL database')
})

// Test API
app.get('/', (req, res) => {
  res.json({
    message: 'Urban Harvest Hub API is running',
  })
})

// ==================== PRODUCTS ====================

// Get all products
app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({
        error: 'Failed to fetch products',
      })
    }

    res.json(results)
  })
})

// Get one product
app.get('/products/:id', (req, res) => {
  db.query(
    'SELECT * FROM products WHERE product_id = ?',
    [req.params.id],
    (err, results) => {
      if (err) {
        console.error(err)
        return res.status(500).json({
          error: 'Failed to fetch product',
        })
      }

      if (results.length === 0) {
        return res.status(404).json({
          error: 'Product not found',
        })
      }

      res.json(results[0])
    }
  )
})

// Add product
app.post('/products', (req, res) => {
  const {
    name,
    description,
    price,
    category,
    stock_quantity,
    image,
  } = req.body

  db.query(
    `INSERT INTO products
    (name, description, price, category, stock_quantity, image)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [name, description, price, category, stock_quantity, image],
    (err, result) => {
      if (err) {
        console.error(err)
        return res.status(500).json({
          error: 'Failed to add product',
        })
      }

      res.status(201).json({
        message: 'Product added successfully',
        product_id: result.insertId,
      })
    }
  )
})

// Update product
app.put('/products/:id', (req, res) => {
  const {
    name,
    description,
    price,
    category,
    stock_quantity,
    image,
  } = req.body

  db.query(
    `UPDATE products
     SET name = ?, description = ?, price = ?, category = ?,
         stock_quantity = ?, image = ?
     WHERE product_id = ?`,
    [
      name,
      description,
      price,
      category,
      stock_quantity,
      image,
      req.params.id,
    ],
    (err, result) => {
      if (err) {
        console.error(err)
        return res.status(500).json({
          error: 'Failed to update product',
        })
      }

      res.json({
        message: 'Product updated successfully',
      })
    }
  )
})

// Delete product
app.delete('/products/:id', (req, res) => {
  db.query(
    'DELETE FROM products WHERE product_id = ?',
    [req.params.id],
    (err, result) => {
      if (err) {
        console.error(err)
        return res.status(500).json({
          error: 'Failed to delete product',
        })
      }

      res.json({
        message: 'Product deleted successfully',
      })
    }
  )
})

// ==================== EVENTS ====================

// Get all events
app.get('/events', (req, res) => {
  db.query('SELECT * FROM events', (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({
        error: 'Failed to fetch events',
      })
    }

    res.json(results)
  })
})

// Get one event
app.get('/events/:id', (req, res) => {
  db.query(
    'SELECT * FROM events WHERE event_id = ?',
    [req.params.id],
    (err, results) => {
      if (err) {
        console.error(err)
        return res.status(500).json({
          error: 'Failed to fetch event',
        })
      }

      if (results.length === 0) {
        return res.status(404).json({
          error: 'Event not found',
        })
      }

      res.json(results[0])
    }
  )
})

// Add event
app.post('/events', (req, res) => {
  const {
    title,
    description,
    event_date,
    location,
    capacity,
    image,
  } = req.body

  db.query(
    `INSERT INTO events
    (title, description, event_date, location, capacity, image)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [title, description, event_date, location, capacity, image],
    (err, result) => {
      if (err) {
        console.error(err)
        return res.status(500).json({
          error: 'Failed to add event',
        })
      }

      res.status(201).json({
        message: 'Event added successfully',
        event_id: result.insertId,
      })
    }
  )
})

// Update event
app.put('/events/:id', (req, res) => {
  const {
    title,
    description,
    event_date,
    location,
    capacity,
    image,
  } = req.body

  db.query(
    `UPDATE events
     SET title = ?, description = ?, event_date = ?,
         location = ?, capacity = ?, image = ?
     WHERE event_id = ?`,
    [
      title,
      description,
      event_date,
      location,
      capacity,
      image,
      req.params.id,
    ],
    (err) => {
      if (err) {
        console.error(err)
        return res.status(500).json({
          error: 'Failed to update event',
        })
      }

      res.json({
        message: 'Event updated successfully',
      })
    }
  )
})

// Delete event
app.delete('/events/:id', (req, res) => {
  db.query(
    'DELETE FROM events WHERE event_id = ?',
    [req.params.id],
    (err) => {
      if (err) {
        console.error(err)
        return res.status(500).json({
          error: 'Failed to delete event',
        })
      }

      res.json({
        message: 'Event deleted successfully',
      })
    }
  )
})

// ==================== WORKSHOPS ====================

// Get all workshops
app.get('/workshops', (req, res) => {
  db.query('SELECT * FROM workshops', (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({
        error: 'Failed to fetch workshops',
      })
    }

    res.json(results)
  })
})

// Get one workshop
app.get('/workshops/:id', (req, res) => {
  db.query(
    'SELECT * FROM workshops WHERE workshop_id = ?',
    [req.params.id],
    (err, results) => {
      if (err) {
        console.error(err)
        return res.status(500).json({
          error: 'Failed to fetch workshop',
        })
      }

      if (results.length === 0) {
        return res.status(404).json({
          error: 'Workshop not found',
        })
      }

      res.json(results[0])
    }
  )
})

// Add workshop
app.post('/workshops', (req, res) => {
  const {
    title,
    description,
    workshop_date,
    location,
    capacity,
    image,
  } = req.body

  db.query(
    `INSERT INTO workshops
    (title, description, workshop_date, location, capacity, image)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [
      title,
      description,
      workshop_date,
      location,
      capacity,
      image,
    ],
    (err, result) => {
      if (err) {
        console.error(err)
        return res.status(500).json({
          error: 'Failed to add workshop',
        })
      }

      res.status(201).json({
        message: 'Workshop added successfully',
        workshop_id: result.insertId,
      })
    }
  )
})

// Update workshop
app.put('/workshops/:id', (req, res) => {
  const {
    title,
    description,
    workshop_date,
    location,
    capacity,
    image,
  } = req.body

  db.query(
    `UPDATE workshops
     SET title = ?, description = ?, workshop_date = ?,
         location = ?, capacity = ?, image = ?
     WHERE workshop_id = ?`,
    [
      title,
      description,
      workshop_date,
      location,
      capacity,
      image,
      req.params.id,
    ],
    (err) => {
      if (err) {
        console.error(err)
        return res.status(500).json({
          error: 'Failed to update workshop',
        })
      }

      res.json({
        message: 'Workshop updated successfully',
      })
    }
  )
})

// Delete workshop
app.delete('/workshops/:id', (req, res) => {
  db.query(
    'DELETE FROM workshops WHERE workshop_id = ?',
    [req.params.id],
    (err) => {
      if (err) {
        console.error(err)
        return res.status(500).json({
          error: 'Failed to delete workshop',
        })
      }

      res.json({
        message: 'Workshop deleted successfully',
      })
    }
  )
})

// ==================== BOOKINGS ====================

// Create booking
app.post('/bookings', (req, res) => {
  const {
    user_id,
    event_id,
    workshop_id,
    booking_date,
    status,
  } = req.body

  if (!user_id || !booking_date) {
    return res.status(400).json({
      error: 'user_id and booking_date are required',
    })
  }

  if (!event_id && !workshop_id) {
    return res.status(400).json({
      error: 'event_id or workshop_id is required',
    })
  }

  db.query(
    `INSERT INTO bookings
    (user_id, event_id, workshop_id, booking_date, status)
    VALUES (?, ?, ?, ?, ?)`,
    [
      user_id,
      event_id || null,
      workshop_id || null,
      booking_date,
      status || 'confirmed',
    ],
    (err, result) => {
      if (err) {
        console.error(err)
        return res.status(500).json({
          error: 'Failed to create booking',
        })
      }

      res.status(201).json({
        message: 'Booking created successfully',
        booking_id: result.insertId,
      })
    }
  )
})

// Get all bookings
app.get('/bookings', (req, res) => {
  db.query('SELECT * FROM bookings', (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).json({
        error: 'Failed to fetch bookings',
      })
    }

    res.json(results)
  })
})

// ==================== SERVER ====================

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})