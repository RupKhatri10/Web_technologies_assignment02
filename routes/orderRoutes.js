const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/createOrder', auth, async (req, res) => {
    try {
        const { _id } = req.user; // Accessing req.user._id from the auth middleware
        // Create a new order using the req.body and the user's _id
        const cart = await Cart.findOne({ user: _id });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        const order = new Order({ ...req.body, user: _id, products: cart.products });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create order' });
    }
});

router.get('/:orderId', auth, async (req, res) => {
    try {
        const { _id } = req.user; // Accessing req.user._id from the auth middleware
        const orderId = req.params.orderId;
        // Find the order with the provided orderId and the user's _id
        const order = await Order.findOne({ _id: orderId, user: _id });
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get order' });
    }
});

router.put('/:updateByOrderId', auth, async (req, res) => {
    try {
        const { _id } = req.user; // Accessing req.user._id from the auth middleware
        const orderId = req.params.updateByOrderId;
        // Find and update the order with the provided orderId and the user's _id
        const order = await Order.findOneAndUpdate(
            { _id: orderId, user: _id },
            req.body,
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update order' });
    }
});

module.exports = router;