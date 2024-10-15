import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Order from '../models/orderModel.js';

// @description      create a new order
// @route            POST/api/order
// @access           Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    payementMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(401);
    throw new Error('No order items');
    return;
  } else {
    const order = new Order({
    orderItems,
    user: req.user._id,
    shippingAddress,
    payementMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    });

    //To save order details in data base
    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
});

export {
  addOrderItems
}
