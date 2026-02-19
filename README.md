# Hotel Booking App

A full-stack hotel booking application built with React, Node.js, Express, and MongoDB.

**Live Demo:** [https://hotel-booking-nine-zeta-62.vercel.app](https://hotel-booking-nine-zeta-62.vercel.app)

---

## Features

- **User Authentication** — Secure login and registration via Clerk
- **Hotel Management** — Hotel owners can register and manage their hotels
- **Room Listings** — Browse available rooms with filtering by type, price range, and destination
- **Room Availability** — Check availability for specific dates before booking
- **Booking System** — Book rooms with check-in/check-out dates and guest count
- **Dashboard** — Hotel owners can view bookings, revenue, and manage room availability
- **Image Uploads** — Room images uploaded via Cloudinary
- **Recent Search** — Personalized hotel recommendations based on recently searched cities

---

## Tech Stack

### Frontend
- React
- Tailwind CSS
- React Router
- Clerk (Authentication)
- Axios

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Clerk (Webhook & Middleware)
- Cloudinary (Image Storage)
- Multer (File Uploads)
- Svix (Webhook Verification)

---

## Project Structure

```
booking-app/
├── client/                   # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── context/          # App context (state management)
│   │   ├── pages/            # Page components
│   │   └── assets/           # Static assets
│
└── server/                   # Node.js backend
    ├── configs/              # DB and Cloudinary config
    ├── controllers/          # Route controllers
    ├── middleware/           # Auth and upload middleware
    ├── models/               # Mongoose models
    ├── routes/               # Express routes
    └── server.js             # Entry point
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Clerk account
- Cloudinary account

### Installation

1. **Clone the repository**
```bash
git clone Lemlime5336/hotel-booking-app
cd booking-app
```

2. **Install server dependencies**
```bash
cd server
npm install
```

3. **Install client dependencies**
```bash
cd ../client
npm install
```

4. **Set up environment variables**

Create a `.env` file in the `server/` directory:
```env
MONGODB_URI=your_mongodb_connection_string
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Create a `.env` file in the `client/` directory:
```env
VITE_BACKEND_URL=http://localhost:3000
VITE_CURRENCY=RM
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

5. **Run the development servers**

Start the backend:
```bash
cd server
npm run server
```

Start the frontend:
```bash
cd client
npm run dev
```

---

## API Endpoints

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user` | Get user data |
| POST | `/api/user/store-recent-search` | Store recent searched city |

### Hotels
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/hotels` | Register a hotel |

### Rooms
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/rooms` | Get all available rooms |
| POST | `/api/rooms` | Create a new room |
| GET | `/api/rooms/owner` | Get rooms for hotel owner |
| POST | `/api/rooms/toggle-availability` | Toggle room availability |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bookings/check-availability` | Check room availability |
| POST | `/api/bookings/book` | Create a booking |
| GET | `/api/bookings/user` | Get user bookings |
| GET | `/api/bookings/hotel` | Get hotel bookings and dashboard data |

### Webhooks
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/clerk` | Clerk webhook for user sync |

---

## Models

- **User** — Stores user profile, role, and recent searched cities
- **Hotel** — Stores hotel details and owner reference
- **Room** — Stores room type, price, amenities, images, and availability
- **Booking** — Stores booking details, dates, guests, and payment status

---

## Deployment

- **Frontend** — Deployed on Vercel
- **Backend** — Can be deployed on Railway, Render, or any Node.js hosting (currently deployed on Vercel)
