const mongoose = require('mongoose');

const groceryItemSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['Grains', 'Dairy', 'Bakery', 'Vegetables', 'Fruits', 'Protein', 'Snacks', 'Beverages', 'Household', 'Other'],
      default: 'Other'
    },
    quantity: { type: Number, required: true, min: 0, default: 0 },
    unit: { type: String, default: 'pcs', trim: true },
    minStock: { type: Number, required: true, min: 0, default: 1 },
    expiryDate: { type: Date },
    notes: { type: String, default: '', trim: true },
    location: { type: String, default: 'Kitchen', trim: true }
  },
  { timestamps: true }
);

groceryItemSchema.virtual('isLowStock').get(function () {
  return this.quantity <= this.minStock;
});

groceryItemSchema.set('toJSON', { virtuals: true });
groceryItemSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('GroceryItem', groceryItemSchema);
