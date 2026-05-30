# API Testing Guide

Base URL: `http://localhost:5000/api`

## 1. Register
POST `/auth/register`
```json
{
  "name": "Tanisa Das",
  "email": "tanisa@example.com",
  "password": "123456"
}
```
Copy the token from the response.

## 2. Login
POST `/auth/login`
```json
{
  "email": "tanisa@example.com",
  "password": "123456"
}
```

## 3. Add Grocery Item
POST `/groceries`
Header: `Authorization: Bearer YOUR_TOKEN`
```json
{
  "name": "Rice",
  "category": "Grains",
  "quantity": 2,
  "unit": "kg",
  "minStock": 5,
  "expiryDate": "2026-08-30",
  "notes": "Buy 10kg pack next time"
}
```

## 4. Get Inventory
GET `/groceries`
Header: `Authorization: Bearer YOUR_TOKEN`

## 5. Update Quantity
PATCH `/groceries/ITEM_ID/quantity`
```json
{
  "action": "decrease",
  "amount": 1
}
```

## 6. Dashboard Summary
GET `/dashboard/summary`
Header: `Authorization: Bearer YOUR_TOKEN`
