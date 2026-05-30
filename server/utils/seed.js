import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import GroceryItem from "../models/GroceryItem.js";

dotenv.config();
await connectDB();

const runSeed = async () => {
  try {
    await User.deleteMany({ email: "demo@grocery.com" });
    const user = await User.create({ name: "Demo User", email: "demo@grocery.com", password: "123456" });
    const today = new Date();
    const days = (n) => new Date(today.getTime() + n * 24 * 60 * 60 * 1000);
    await GroceryItem.insertMany([
      { user: user._id, name: "Rice", category: "Grains", quantity: 2, unit: "kg", minStock: 5, expiryDate: days(120), notes: "Buy 10kg pack" },
      { user: user._id, name: "Milk", category: "Dairy", quantity: 1, unit: "l", minStock: 2, expiryDate: days(3), notes: "Expiring soon" },
      { user: user._id, name: "Bread", category: "Bakery", quantity: 1, unit: "packets", minStock: 1, expiryDate: days(2) },
      { user: user._id, name: "Eggs", category: "Other", quantity: 12, unit: "pcs", minStock: 6, expiryDate: days(15) },
      { user: user._id, name: "Tomatoes", category: "Vegetables", quantity: 0.5, unit: "kg", minStock: 1, expiryDate: days(5) }
    ]);
    console.log("Seed complete. Login: demo@grocery.com / 123456");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runSeed();
