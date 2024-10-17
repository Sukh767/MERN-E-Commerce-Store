import express from 'express';
import {
  deleteProduct,
  getProductById,
  getProducts,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authmiddleware.js';
const router = express.Router();

//By-Pass controller
router.route('/').get(getProducts);
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct); //protect by admin(only admin can access this route with token)

export default router;
