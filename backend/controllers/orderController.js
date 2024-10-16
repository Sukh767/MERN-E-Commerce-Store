import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Order from '../models/orderModel.js';

// @description      create a new order
// @route            POST/api/orders
// @access           Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    // To save order details in database
    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @description      Get order By ID
// @route            GET/api/orders/:id
// @access           Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @description      Update order to paid
// @route            GET/api/orders/:id/pay
// @access           Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    // PayPal response
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updateOrder = await order.save();

    res.json(updateOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @description      Update order to delivered
// @route            GET/api/orders/:id/delivered
// @access           Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now();
    const updateOrder = await order.save();

    res.json(updateOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @description      Get logged in user orders
// @route            GET/api/orders/myorders
// @access           Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @description      Get all Orders
// @route            GET/api/orders
// @access           Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});

// Export all functions in one export statement
export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
};
