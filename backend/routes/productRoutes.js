import express from "express";
import { getProductById, getProducts } from "../controllers/productController.js";
const router = express.Router();

// @description Fetch all products(pass controller function)
router.route("/",).get(getProducts);

// @description Fetch single product(pass controller function)
router.route('/:id').get(getProductById)

export default router;
