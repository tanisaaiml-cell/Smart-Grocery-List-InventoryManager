const dotenv = require('dotenv');
const connectDB = require('../config/db');
const User = require('../models/User');
const GroceryItem = require('../models/GroceryItem');

dotenv.config();
connectDB();

const seed = async () => {
  try {
    await User.deleteMany();
    await GroceryItem.deleteMany();

    const user = await User.create({ name: 'Demo Student', email: 'demo@example.com', password: '123456' });
    await GroceryItem.insertMany([
      { user: user._id, name: 'Rice', category: 'Grains', quantity: 3, unit: 'kg', minStock: 2, expiryDate: '2026-12-20', location: 'Pantry' },
      { user: user._id, name: 'Milk', category: 'Dairy', quantity: 1, unit: 'litre', minStock: 2, expiryDate: '2026-06-02', location: 'Fridge' },
      { user: user._id, name: 'Bread', category: 'Bakery', quantity: 1, unit: 'pack', minStock: 1, expiryDate: '2026-06-01', location: 'Kitchen' },
      { user: user._id, name: 'Eggs', category: 'Protein', quantity: 6, unit: 'pcs', minStock: 6, expiryDate: '2026-06-08', location: 'Fridge' },
      { user: user._id, name: 'Tomatoes', category: 'Vegetables', quantity: 4, unit: 'pcs', minStock: 5, expiryDate: '2026-06-03', location: 'Basket' }
    ]);

    console.log('Sample data inserted. Login: demo@example.com / 123456');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
