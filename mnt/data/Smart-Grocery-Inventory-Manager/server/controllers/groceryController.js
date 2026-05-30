const GroceryItem = require('../models/GroceryItem');

const addDays = (date, days) => {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
};

const createItem = async (req, res) => {
  const { name, category, quantity, unit, minStock, expiryDate, notes, location } = req.body;
  if (!name) return res.status(400).json({ message: 'Item name is required' });

  const item = await GroceryItem.create({
    user: req.user._id,
    name,
    category,
    quantity,
    unit,
    minStock,
    expiryDate,
    notes,
    location
  });

  res.status(201).json(item);
};

const getItems = async (req, res) => {
  const { search = '', category = 'All', status = 'All' } = req.query;
  const query = { user: req.user._id };

  if (search) query.name = { $regex: search, $options: 'i' };
  if (category !== 'All') query.category = category;

  let items = await GroceryItem.find(query).sort({ createdAt: -1 });

  const today = new Date();
  const weekAhead = addDays(today, 7);
  if (status === 'Low Stock') items = items.filter((item) => item.quantity <= item.minStock);
  if (status === 'Expiring Soon') items = items.filter((item) => item.expiryDate && item.expiryDate <= weekAhead);

  res.json(items);
};

const getItemById = async (req, res) => {
  const item = await GroceryItem.findOne({ _id: req.params.id, user: req.user._id });
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
};

const updateItem = async (req, res) => {
  const item = await GroceryItem.findOne({ _id: req.params.id, user: req.user._id });
  if (!item) return res.status(404).json({ message: 'Item not found' });

  const fields = ['name', 'category', 'quantity', 'unit', 'minStock', 'expiryDate', 'notes', 'location'];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) item[field] = req.body[field];
  });

  const updated = await item.save();
  res.json(updated);
};

const adjustQuantity = async (req, res) => {
  const { change } = req.body;
  const item = await GroceryItem.findOne({ _id: req.params.id, user: req.user._id });
  if (!item) return res.status(404).json({ message: 'Item not found' });

  item.quantity = Math.max(0, item.quantity + Number(change || 0));
  const updated = await item.save();
  res.json(updated);
};

const deleteItem = async (req, res) => {
  const item = await GroceryItem.findOne({ _id: req.params.id, user: req.user._id });
  if (!item) return res.status(404).json({ message: 'Item not found' });
  await item.deleteOne();
  res.json({ message: 'Item removed' });
};

module.exports = { createItem, getItems, getItemById, updateItem, adjustQuantity, deleteItem };
