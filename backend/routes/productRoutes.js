import express from 'express';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authmiddleware.js';
const router = express.Router();

//By-Pass controller
router.route('/').get(getProducts).post(protect, admin, createProduct);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)//protect by admin(only admin can access this route with token)
  .put(protect, admin, updateProduct); 
export default router;
