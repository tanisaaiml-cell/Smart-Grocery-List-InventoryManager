const express = require('express');
const {
  createItem,
  getItems,
  getItemById,
  updateItem,
  adjustQuantity,
  deleteItem
} = require('../controllers/groceryController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, createItem).get(protect, getItems);
router.route('/:id').get(protect, getItemById).put(protect, updateItem).delete(protect, deleteItem);
router.patch('/:id/quantity', protect, adjustQuantity);

module.exports = router;
