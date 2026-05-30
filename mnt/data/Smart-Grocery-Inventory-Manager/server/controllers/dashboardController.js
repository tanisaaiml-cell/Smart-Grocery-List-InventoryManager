const GroceryItem = require('../models/GroceryItem');

const addDays = (date, days) => {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
};

const getDashboard = async (req, res) => {
  const items = await GroceryItem.find({ user: req.user._id });
  const today = new Date();
  const weekAhead = addDays(today, 7);

  const lowStockItems = items.filter((item) => item.quantity <= item.minStock);
  const expiringSoonItems = items.filter((item) => item.expiryDate && item.expiryDate >= today && item.expiryDate <= weekAhead);
  const expiredItems = items.filter((item) => item.expiryDate && item.expiryDate < today);

  const categorySummary = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.quantity;
    return acc;
  }, {});

  const shoppingList = lowStockItems.map((item) => ({
    _id: item._id,
    name: item.name,
    category: item.category,
    suggestedQuantity: Math.max(item.minStock * 2 - item.quantity, 1),
    unit: item.unit
  }));

  res.json({
    totals: {
      totalItems: items.length,
      totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
      lowStock: lowStockItems.length,
      expiringSoon: expiringSoonItems.length,
      expired: expiredItems.length
    },
    categorySummary,
    lowStockItems,
    expiringSoonItems,
    expiredItems,
    shoppingList
  });
};

module.exports = { getDashboard };
