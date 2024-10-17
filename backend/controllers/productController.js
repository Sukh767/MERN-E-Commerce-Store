import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Product from '../models/productModel.js';

// @description        Fetch all products
// @route              GET/api/products
// @access             Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

// @description       Fetch single product
// @route             GET /api/products/:id
// @access            Public
const getProductById = asyncHandler(async (req, res) => {
  // Validate if the id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @description        Delete a product
// @route              DELETE/api/products/:id
// @access             Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.json({ message: 'Product Deleted successfully' });
  } else {
    throw new Error('Product not found');
  }
});

// @description        Create a product
// @route              POST/api/products
// @access             Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: './images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @description        Update a product
// @route              PUT/api/products/:id
// @access             Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    numReviews,
    description,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.brand = brand;
    product.image = image;
    product.description = description;
    product.category = category;
    product.countInStock = countInStock;
    product.numReviews = numReviews;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
