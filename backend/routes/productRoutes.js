import express from 'express';
import {
  getProducts,
  getProductById,
  deleteProductById,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, isAdmin, createProduct);
router.route('/:id/reviews').post(protect, createProductReview);
router.get('/top', getTopProducts);

router
  .route('/:id')
  .get(getProductById)
  .delete(protect, isAdmin, deleteProductById)
  .put(protect, isAdmin, updateProduct);

export default router;
