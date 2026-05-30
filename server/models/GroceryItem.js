import mongoose from "mongoose";

const groceryItemSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["Grains", "Dairy", "Bakery", "Vegetables", "Fruits", "Snacks", "Beverages", "Household", "Other"],
      default: "Other",
    },
    quantity: { type: Number, required: true, min: 0, default: 1 },
    unit: { type: String, enum: ["kg", "g", "l", "ml", "pcs", "packets", "bottles"], default: "pcs" },
    minStock: { type: Number, required: true, min: 0, default: 1 },
    expiryDate: { type: Date, required: true },
    notes: { type: String, trim: true, default: "" },
    isPinned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

groceryItemSchema.virtual("isLowStock").get(function () {
  return this.quantity <= this.minStock;
});

groceryItemSchema.virtual("daysLeft").get(function () {
  const today = new Date();
  const end = new Date(this.expiryDate);
  return Math.ceil((end - today) / (1000 * 60 * 60 * 24));
});

groceryItemSchema.set("toJSON", { virtuals: true });
groceryItemSchema.set("toObject", { virtuals: true });

const GroceryItem = mongoose.model("GroceryItem", groceryItemSchema);
export default GroceryItem;
