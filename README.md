# Urban Harvest Hub

Urban Harvest Hub is a full-stack Progressive Web Application designed for eco-conscious communities. Users can explore sustainable products, workshops and events, view details and submit bookings.

## Technologies Used

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- vite-plugin-pwa

### Backend

- Node.js
- Express.js
- MySQL
- mysql2

### External API

- Open-Meteo Weather API

### Deployment

- Frontend: Vercel
- Backend and Database: Railway

## Features

- Browse sustainable products
- Browse workshops and events
- Filter events by category
- View individual product, workshop and event details
- Submit workshop and event bookings
- View current Colombo weather
- Progressive Web Application installation
- Responsive design for desktop and mobile
- REST API and MySQL database integration

## Database Setup

The application uses MySQL.

The database contains tables for products, workshops, events and bookings.

The `bookings` table contains:

- `booking_id`
- `user_id`
- `event_id`
- `workshop_id`
- `booking_date`
- `status`

The backend connects to the MySQL database using environment variables.

## Running the Frontend

Install the frontend dependencies:

```bash
npm install