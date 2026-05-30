import express from "express";
import {
  adjustQuantity,
  createItem,
  deleteItem,
  getItemById,
  getItems,
  updateItem,
} from "../controllers/groceryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getItems).post(protect, createItem);
router.route("/:id").get(protect, getItemById).put(protect, updateItem).delete(protect, deleteItem);
router.patch("/:id/quantity", protect, adjustQuantity);

export default router;
