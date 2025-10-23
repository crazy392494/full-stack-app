const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, subtotal, deliveryCost, total } = req.body;

    if (!orderItems || orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new Order({
            // Map frontend item structure to backend schema
            orderItems: orderItems.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                product: item.id, // 'id' from frontend cart becomes 'product' reference
            })),
            user: req.user._id,
            subtotal,
            deliveryCost,
            total,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});

// @desc    Get orders of the logged-in user
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
});

module.exports = { addOrderItems, getMyOrders };
