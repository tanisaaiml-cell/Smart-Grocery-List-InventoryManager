# Smart Grocery List & Inventory Manager

A full-stack MERN project for managing grocery stock, expiry dates, low-stock alerts, and auto-generated shopping lists.

## Project Overview

Smart Grocery List & Inventory Manager is an inventory system for daily grocery management. Users can register, login, add grocery items, update quantities, set expiry dates, track minimum stock levels, and get alerts before items run out or expire.

## Simple Explanation

This app works like a digital grocery notebook. You add items like rice, milk, bread, eggs, and vegetables. The app tells you what is running low, what is expiring soon, and what you need to buy next.

## Technical Explanation

This is a MERN stack application with React frontend, Node.js/Express backend, MongoDB database, Mongoose models, JWT authentication, protected REST APIs, dashboard aggregation logic, and Recharts visualization.

## Problem Statement

Families, students, hostels, small shops, grocery stores, and cloud kitchens often waste food or forget to restock items. This app solves that by tracking quantity, expiry date, minimum stock, and category-wise inventory.

## Workflow

`user login → add grocery item → update quantity → track inventory → generate shopping list → low-stock/expiry alert → dashboard`

## Tech Stack Options

### Option A: Easy
- React
- LocalStorage
- Basic CSS
- No backend

### Option B: Intermediate — Selected
- React.js
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- REST APIs
- Recharts
- Premium custom CSS

### Option C: Advanced
- MERN stack
- Role-based access
- Barcode scanner
- Email alerts
- PWA support
- AI purchase prediction

Option B is best for students because it is industry-relevant but still beginner-friendly.

## Features

- User registration and login
- JWT protected routes
- Add grocery item
- Edit grocery item
- Delete grocery item
- Increase/decrease item quantity
- Category filter
- Search by item name
- Low-stock alerts
- Expiry-soon alerts
- Expired item tracking
- Auto-generated shopping list
- Dashboard summary cards
- Category distribution chart
- GitHub-ready documentation

## Architecture

```text
Frontend React App
 ├── Auth Pages
 ├── Dashboard
 ├── Inventory Page
 ├── Add Item Page
 └── Axios API Service
          ↓
Backend Express API
 ├── Auth Routes
 ├── Grocery CRUD Routes
 ├── Dashboard Routes
 ├── JWT Middleware
 └── Error Middleware
          ↓
MongoDB Atlas
 ├── users collection
 └── groceryitems collection
```

## API Flow

```text
Register/Login → JWT Token → Protected API Request → Controller → Mongoose Model → MongoDB → JSON Response
```

## Database Flow

```text
User document
  ↓ owns many
GroceryItem documents
  ↓ used for
Dashboard summary, alerts, shopping list, filters
```

## Folder Structure

```text
Smart-Grocery-Inventory-Manager/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   └── package.json
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── docs/
├── .gitignore
└── README.md
```

## Phase-wise Implementation Plan

| Phase | What to do | Why | Expected Output | Common Mistake |
|---|---|---|---|---|
| 1 | Setup folders | Organize project | GitHub-ready structure | Mixing frontend/backend files |
| 2 | Create frontend | Build UI | Login/dashboard pages | Wrong routes |
| 3 | Create backend | Build APIs | Express server running | Wrong port |
| 4 | Connect MongoDB | Store data | DB connected | Bad Mongo URI/password |
| 5 | Authentication | Secure app | Register/login working | Missing JWT secret |
| 6 | Grocery CRUD | Main feature | Add/edit/delete item | Not sending token |
| 7 | Quantity update | Track usage | + and - buttons work | Negative quantity bug |
| 8 | Alerts | Useful intelligence | Low-stock/expiry cards | Date format mistakes |
| 9 | Dashboard/filter | Better UX | Summary + chart | API URL mismatch |
| 10 | UI polishing | Portfolio quality | Premium design | Unresponsive layout |
| 11 | Testing | Find bugs | Stable app | Testing only happy path |
| 12 | GitHub upload | Proof of work | Public repo | Uploading `.env` |

## Installation Guide

### Requirements

- Node.js LTS
- npm
- MongoDB Atlas account
- VS Code
- CMD, PowerShell, Git Bash, or terminal

## Backend Setup

```bash
cd server
npm install
copy .env.example .env
npm run dev
```

For Mac/Linux:

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

Edit `server/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_secret_key
CLIENT_URL=http://localhost:5173
```

Expected output:

```text
MongoDB connected: cluster-name
Server running on port 5000
```

## Frontend Setup

```bash
cd client
npm install
copy .env.example .env
npm run dev
```

For Mac/Linux:

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Edit `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Open:

```text
http://localhost:5173
```

## Seed Demo Data

After backend `.env` is ready:

```bash
cd server
npm run seed
```

Demo login:

```text
Email: demo@grocery.com
Password: 123456
```

## API Endpoints

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| POST | `/api/auth/register` | Register user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/profile` | Get profile | Yes |
| POST | `/api/groceries` | Add grocery item | Yes |
| GET | `/api/groceries` | Get all items | Yes |
| GET | `/api/groceries/:id` | Get item by ID | Yes |
| PUT | `/api/groceries/:id` | Update item | Yes |
| DELETE | `/api/groceries/:id` | Delete item | Yes |
| PATCH | `/api/groceries/:id/quantity` | Increase/decrease stock | Yes |
| GET | `/api/dashboard/summary` | Dashboard summary | Yes |

## Virtual Simulation

1. Register a user.
2. Add grocery items:
   - Rice, 2 kg, minimum stock 5 kg
   - Milk, 1 l, minimum stock 2 l, expiry in 3 days
   - Bread, 1 packet, expiry in 2 days
   - Eggs, 12 pcs
   - Tomatoes, 0.5 kg, minimum stock 1 kg
3. Go to dashboard.
4. Check low-stock alerts.
5. Check expiry-soon alerts.
6. Open inventory.
7. Decrease milk quantity.
8. Confirm shopping list updates automatically.

## Screenshots to Upload

- Register page
- Login page
- Dashboard
- Add grocery item page
- Inventory list
- Edit item modal
- Low-stock alert section
- Expiry alert section
- Shopping list
- MongoDB Atlas collection
- API testing screenshot
- GitHub repo preview

## GitHub Upload Steps

```bash
git init
git add .
git commit -m "initial smart grocery inventory manager project"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

Best repository name:

```text
Smart-Grocery-Inventory-Manager
```

Repository description:

```text
A MERN stack smart grocery inventory manager with JWT auth, MongoDB, stock tracking, expiry alerts, shopping list, and dashboard analytics.
```

GitHub tags:

```text
mern-stack, react, nodejs, expressjs, mongodb, jwt-authentication, inventory-management, grocery-app, full-stack-project
```

Never upload `.env`. Use `.env.example` only.

## Deployment Notes

### Render Backend

Root directory:

```text
server
```

Build command:

```text
npm install
```

Start command:

```text
npm start
```

Environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLIENT_URL=https://your-vercel-app.vercel.app
```

### Vercel Frontend

Root directory:

```text
client
```

Environment variable:

```env
VITE_API_URL=https://your-render-backend.onrender.com/api
```

## Learning Outcomes

- MERN stack folder structure
- REST API development
- MongoDB schema design
- JWT authentication
- Protected frontend routes
- API integration with Axios
- Dashboard and chart visualization
- Error handling
- Deployment preparation
- GitHub documentation

## Future Improvements

- Barcode scanning
- Email alerts
- OCR bill upload
- Family/shared inventory
- Cloud kitchen role-based dashboard
- AI purchase prediction
- PWA mobile install support
