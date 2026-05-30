import GroceryItem from "../models/GroceryItem.js";

export const getDashboardSummary = async (req, res, next) => {
  try {
    const items = await GroceryItem.find({ user: req.user._id });
    const today = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(today.getDate() + 7);

    const lowStockItems = items.filter((item) => item.quantity <= item.minStock);
    const expiringSoonItems = items.filter((item) => {
      const exp = new Date(item.expiryDate);
      return exp >= today && exp <= sevenDaysFromNow;
    });
    const expiredItems = items.filter((item) => new Date(item.expiryDate) < today);

    const categoryMap = items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});

    const shoppingList = lowStockItems.map((item) => ({
      _id: item._id,
      name: item.name,
      needed: Math.max(item.minStock + 1 - item.quantity, 1),
      unit: item.unit,
      category: item.category,
    }));

    res.json({
      success: true,
      summary: {
        totalItems: items.length,
        lowStockCount: lowStockItems.length,
        expiringSoonCount: expiringSoonItems.length,
        expiredCount: expiredItems.length,
        totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
      },
      lowStockItems,
      expiringSoonItems,
      expiredItems,
      shoppingList,
      categoryData: Object.entries(categoryMap).map(([name, value]) => ({ name, value })),
    });
  } catch (error) {
    next(error);
  }
};
