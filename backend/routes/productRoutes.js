import express from 'express';
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProduct,
  updateProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authmiddleware.js';
const router = express.Router();

//By-Pass controller
router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id/reviews').get(getProducts).post(protect,createProductReview);
router.get('/top',getTopProduct)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)//protect by admin(only admin can access this route with token)
  .put(protect, admin, updateProduct); 
export default router;
