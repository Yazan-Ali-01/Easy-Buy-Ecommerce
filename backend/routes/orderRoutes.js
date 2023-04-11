import express from 'express';
import { isAdmin, protect } from '../middleware/authMiddleware.js';
import {
  addOrderItems,
  getMyOrders,
  getOrderByID,
  updateOrderToPaid,
  getOrders,
} from '../controllers/orderController.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, isAdmin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderByID);
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;
