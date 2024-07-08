const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product'); 
const auth = require('../middleware/auth'); 

const router = express.Router();

router.post('/createOrder', auth, async (req, res) => {
    try {
        const { _id } = req.user; // Accessing req.user._id from the auth middleware
        // Creating a new order using the req.body and the user's _id
        const cart = await Cart.findOne({ user: _id });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        // calculate total price
        let total = 0;
        
        for (let i = 0; i < cart.products.length; i++) {
            const product = cart.products[i];
            let shippingCost = 0;
            const productDetail = await Product.findById(product.product);
            if (productDetail) {
                shippingCost = productDetail.shippingCost;
                total += productDetail.pricing * product.quantity;
                total += shippingCost;
            }
        }

        const order = new Order({ ...req.body, user: _id, products: cart.products, total });
        await order.save();

        // Clear the user's cart
        await Cart.findOneAndDelete({ user: _id });

        res.status(201).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

router.get('/:orderId', auth, async (req, res) => {
    try {
        const { _id } = req.user; 
        const orderId = req.params.orderId;
        
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
        const { _id } = req.user; 
        const orderId = req.params.updateByOrderId;
        
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