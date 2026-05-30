# Interview Preparation

## 1. Explain your project.
**Answer:** My project is a Smart Grocery List & Inventory Manager built with the MERN stack. It helps users manage grocery stock, expiry dates, low-stock alerts, and an auto-generated shopping list. Users can register, login, add grocery items, update quantities, filter inventory, and view dashboard analytics. It proves full-stack skills because it includes React UI, REST APIs, MongoDB schemas, JWT authentication, protected routes, CRUD operations, and dashboard logic.

## 2. What problem does it solve?
It prevents grocery wastage, duplicate purchases, and sudden stock shortages by tracking item quantity, minimum stock level, and expiry date.

## 3. Why did you use MongoDB?
MongoDB is flexible for item-based inventory data. Each grocery item can store category, quantity, unit, expiry date, notes, and user reference in one document.

## 4. How does authentication work?
The backend creates a JWT token after successful login or registration. The frontend stores the token in localStorage and sends it in the Authorization header for protected APIs.

## 5. How do low-stock alerts work?
Each item has `quantity` and `minStock`. If quantity is less than or equal to minStock, the backend marks it as low stock and includes it in dashboard alerts.

## 6. How do expiry alerts work?
The dashboard API compares each item expiry date with today and the next 7 days. Items expiring within that window appear in the expiry alert section.

## 7. What APIs did you create?
I created APIs for authentication, profile, grocery CRUD, quantity updates, and dashboard summaries.

## 8. What is the shopping list feature?
The shopping list is generated automatically from low-stock items. It calculates the needed amount based on minimum stock.

## 9. What challenges did you face?
Common challenges are connecting MongoDB Atlas, setting environment variables, protecting private routes, and handling deployed frontend-backend CORS.

## 10. How can you improve this project?
I can add barcode scanning, email alerts, multi-user family inventory, bill upload OCR, AI-based purchase prediction, and mobile PWA support.

## HR Explanation
This project shows that I can build a real-world full-stack application from planning to deployment. It is useful for families, hostels, cloud kitchens, and small shops. I also documented it for GitHub proof of work.

## Technical Explanation
The application uses React and Vite for frontend, Express for REST APIs, MongoDB and Mongoose for data storage, JWT for authentication, and Recharts for dashboard visualization. Protected routes ensure each user only accesses their own inventory.
