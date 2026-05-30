# Smart Grocery List & Inventory Manager

A full-stack MERN project with JWT authentication, MongoDB inventory storage, premium React dashboard UI, low-stock alerts, expiry alerts, shopping-list generation, category filters, search, and dashboard analytics.

## Problem Statement
Families, students, hostels, cloud kitchens, small shops, and grocery stores often forget stock levels and expiry dates. This causes food waste, duplicate purchases, and poor planning. This app lets users add grocery items, update quantity, track inventory, set minimum stock levels, monitor expiry dates, and automatically generate a shopping list.

## Workflow
User login → add grocery item → update quantity → track inventory → generate shopping list → low-stock/expiry alert → dashboard.

## Tech Stack

Best student option selected: **Intermediate MERN**

- React.js + Vite
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT authentication
- CSS glassmorphism premium UI
- REST APIs
- Recharts

## Features

- Register and login with JWT
- Add grocery items with name, category, quantity, unit, min stock, expiry date, notes, and location
- Edit and delete items
- Increase/decrease quantity quickly
- Low-stock alert logic
- Expiry-soon alert logic for next 7 days
- Auto shopping list from low-stock items
- Dashboard summary cards
- Category stock chart
- Search, category filter, and status filter
- GitHub-ready code structure

## Architecture

```text
Client React App
  |-- Login / Register
  |-- Dashboard
  |-- Grocery Form
  |-- Inventory Table
  |-- Alert Panels
  |-- Chart
       |
       | REST API + JWT Bearer Token
       v
Node + Express Backend
  |-- Auth routes
  |-- Grocery CRUD routes
  |-- Dashboard summary route
  |-- JWT middleware
       |
       v
MongoDB Atlas
  |-- users collection
  |-- groceryitems collection
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
│   ├── package.json
│   └── .env.example
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   ├── utils/
│   ├── package.json
│   ├── server.js
│   └── .env.example
├── docs/
├── images/
├── outputs/
├── README.md
└── .gitignore
```

## API Endpoints

### Auth

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get profile |

### Grocery

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/grocery` | Get all items with filters |
| POST | `/api/grocery` | Create item |
| GET | `/api/grocery/:id` | Get one item |
| PUT | `/api/grocery/:id` | Update item |
| PATCH | `/api/grocery/:id/quantity` | Increase/decrease quantity |
| DELETE | `/api/grocery/:id` | Delete item |

### Dashboard

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/dashboard` | Summary, alerts, shopping list, chart data |

## How to Run Locally

### 1. Backend

```bash
cd server
npm install
copy .env.example .env
npm run dev
```

Set your `.env` file:

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

### 2. Frontend

Open a second terminal:

```bash
cd client
npm install
copy .env.example .env
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

Backend URL:

```text
http://localhost:5000
```

## Optional Seed Data

After setting MongoDB `.env`, run:

```bash
cd server
npm run seed
```

Demo login:

```text
demo@example.com
123456
```

## Virtual Simulation

Use these items to demonstrate real inventory workflow:

| Item | Category | Quantity | Unit | Min Stock | Expiry |
|---|---|---:|---|---:|---|
| Rice | Grains | 3 | kg | 2 | Future date |
| Milk | Dairy | 1 | litre | 2 | Within 7 days |
| Bread | Bakery | 1 | pack | 1 | Within 7 days |
| Eggs | Protein | 6 | pcs | 6 | Future date |
| Tomatoes | Vegetables | 4 | pcs | 5 | Within 7 days |

Expected results:

- Milk and tomatoes appear in low-stock alerts.
- Items expiring in 7 days appear in expiry alerts.
- Shopping list suggests what to buy.
- Dashboard cards update automatically.

## Screenshots to Capture

Save screenshots in the `images/` folder:

1. Register page
2. Login page
3. Dashboard overview
4. Add grocery item form
5. Inventory list
6. Edit item state
7. Low-stock alerts
8. Expiry alerts
9. Auto shopping list
10. MongoDB collection data
11. Thunder Client API testing
12. GitHub repository preview

## GitHub Upload Steps

```bash
git init
git add .
git commit -m "Initial commit: Smart Grocery Inventory Manager"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/Smart-Grocery-Inventory-Manager.git
git push -u origin main
```

Never upload `.env`. Upload `.env.example` only.

## Best Repository Details

Repository name:

```text
Smart-Grocery-Inventory-Manager
```

Description:

```text
A MERN full-stack grocery and inventory manager with JWT auth, MongoDB, low-stock alerts, expiry tracking, shopping-list generation, and premium React dashboard UI.
```

Topics:

```text
mern-stack react nodejs express mongodb mongoose jwt-auth inventory-management grocery-app full-stack-project dashboard rest-api
```

## Day-wise Proof Building Strategy

| Day | Work | Commit Message | Screenshot |
|---|---|---|---|
| Day 1 | Frontend setup | `setup react frontend with premium UI base` | Login/Register UI |
| Day 2 | Backend setup | `setup express backend server` | API running |
| Day 3 | Database models | `add user and grocery item models` | MongoDB collection |
| Day 4 | Authentication | `implement jwt auth flow` | Register/Login success |
| Day 5 | Grocery CRUD | `add grocery item crud APIs and UI` | Inventory table |
| Day 6 | Inventory alerts | `add low stock expiry and shopping list logic` | Alert panels |
| Day 7 | Dashboard docs | `finalize dashboard filters charts and documentation` | Full dashboard + README |

## Interview Preparation

### 1. Explain your project.
This project is a Smart Grocery List & Inventory Manager built using the MERN stack. It helps users manage grocery stock, track quantity, set minimum stock levels, monitor expiry dates, and generate shopping lists automatically. The frontend is built with React and the backend uses Node.js, Express.js, MongoDB, Mongoose, and JWT authentication.

### 2. What problem does it solve?
It reduces food waste, prevents duplicate grocery purchases, and helps families, hostels, cloud kitchens, and small shops maintain stock properly.

### 3. Why did you use MongoDB?
MongoDB is flexible for storing grocery items because each item may have different categories, units, notes, locations, and expiry dates.

### 4. How does authentication work?
The user registers or logs in. The backend verifies credentials and sends a JWT token. The frontend stores the token in localStorage and sends it in the Authorization header for protected APIs.

### 5. How is low-stock calculated?
If `quantity <= minStock`, the item is considered low stock and appears in the low-stock alert and shopping list.

### 6. How is expiry-soon calculated?
The backend checks if the expiry date is between today and the next 7 days.

### 7. What are the main APIs?
Auth APIs handle login/register. Grocery APIs handle CRUD and quantity updates. Dashboard API returns summary, alerts, shopping list, and chart data.

### 8. What did you learn?
I learned MERN project architecture, JWT auth, protected routes, REST API integration, MongoDB schema design, dashboard logic, and clean UI development.

### 9. How can this project be improved?
It can be improved with barcode scanning, bill upload OCR, push notifications, multi-user family sharing, AI-based consumption prediction, and deployment.

### 10. Why is this full-stack?
It includes frontend UI, backend REST APIs, database storage, authentication, business logic, and API integration.

## Deployment Notes

- Backend can be deployed on Render.
- Frontend can be deployed on Vercel.
- Add environment variables on both platforms.
- In Vercel, set `VITE_API_URL` to your Render backend API URL ending with `/api`.
- In Render, set `CLIENT_URL` to your Vercel frontend URL.
