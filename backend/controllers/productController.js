import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Product from "../models/productModel.js";


// @description        Fetch all products
// @route              GET/api/products
// @access             Public
const getProducts = asyncHandler(async (req,res) => {
  const products = await Product.find({})

  res.json(products)
})

// @description       Fetch single product
// @route             GET /api/products/:id
// @access            Public
const getProductById = asyncHandler(async (req,res) => {
      // Validate if the id is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      const product = await Product.findById(req.params.id);
  
      if (product) {
        res.json(product);
      } else {
        res.status(404);
        throw new Error("Product not found");
      }
})

export {getProducts,getProductById}