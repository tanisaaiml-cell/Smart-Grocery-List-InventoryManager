import GroceryItem from "../models/GroceryItem.js";

export const createItem = async (req, res, next) => {
  try {
    const { name, category, quantity, unit, minStock, expiryDate, notes } = req.body;
    if (!name || quantity === undefined || !expiryDate) {
      res.status(400);
      throw new Error("Name, quantity and expiry date are required.");
    }
    const item = await GroceryItem.create({
      user: req.user._id,
      name,
      category,
      quantity,
      unit,
      minStock,
      expiryDate,
      notes,
    });
    res.status(201).json({ success: true, item });
  } catch (error) {
    next(error);
  }
};

export const getItems = async (req, res, next) => {
  try {
    const { search = "", category = "All", stock = "All" } = req.query;
    const query = { user: req.user._id };
    if (search) query.name = { $regex: search, $options: "i" };
    if (category !== "All") query.category = category;

    let items = await GroceryItem.find(query).sort({ isPinned: -1, expiryDate: 1, createdAt: -1 });
    if (stock === "Low") items = items.filter((item) => item.quantity <= item.minStock);
    if (stock === "Good") items = items.filter((item) => item.quantity > item.minStock);
    res.json({ success: true, count: items.length, items });
  } catch (error) {
    next(error);
  }
};

export const getItemById = async (req, res, next) => {
  try {
    const item = await GroceryItem.findOne({ _id: req.params.id, user: req.user._id });
    if (!item) {
      res.status(404);
      throw new Error("Item not found.");
    }
    res.json({ success: true, item });
  } catch (error) {
    next(error);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const item = await GroceryItem.findOne({ _id: req.params.id, user: req.user._id });
    if (!item) {
      res.status(404);
      throw new Error("Item not found.");
    }
    Object.assign(item, req.body);
    const updatedItem = await item.save();
    res.json({ success: true, item: updatedItem });
  } catch (error) {
    next(error);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const item = await GroceryItem.findOne({ _id: req.params.id, user: req.user._id });
    if (!item) {
      res.status(404);
      throw new Error("Item not found.");
    }
    await item.deleteOne();
    res.json({ success: true, message: "Item deleted." });
  } catch (error) {
    next(error);
  }
};

export const adjustQuantity = async (req, res, next) => {
  try {
    const { action, amount = 1 } = req.body;
    const item = await GroceryItem.findOne({ _id: req.params.id, user: req.user._id });
    if (!item) {
      res.status(404);
      throw new Error("Item not found.");
    }
    const value = Number(amount) || 1;
    if (action === "increase") item.quantity += value;
    if (action === "decrease") item.quantity = Math.max(0, item.quantity - value);
    if (!['increase', 'decrease'].includes(action)) {
      res.status(400);
      throw new Error("Action must be increase or decrease.");
    }
    const updatedItem = await item.save();
    res.json({ success: true, item: updatedItem });
  } catch (error) {
    next(error);
  }
};
