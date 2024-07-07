const express = require('express');
const cartController = require('../controllers/cartController');
const auth = require('../middleware/auth');
const Cart = require('../models/cartSchema');

// cartRoutes.js

const router = express.Router();

// auth middleware

router.post('/add', auth, async (req, res) => {
    try {
        const { product, quantity } = req.body;
        const cart = await Cart.findOne({ user: req.user._id });

        if (cart) {
            // If the cart already exists, update the quantity of the existing product or add a new product
            const existingProduct = cart.products.find(p => p.product.toString() === product);
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.products.push({ product, quantity });
            }
        } else {
            // If the cart doesn't exist, create a new cart and add the product
            const newCart = new Cart({
                products: [{ product, quantity }],
                user: req.user._id
            });
            await newCart.save();
        }

        res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/remove', auth, async (req, res) => {
    try {
        const { product } = req.body;
        const cart = await Cart.findOne({ user: req.user._id });

        if (cart) {
            // If the cart exists, remove the product from the cart
            cart.products = cart.products.filter(p => p.product.toString() !== product);
            await cart.save();
        }

        res.status(200).json({ message: 'Product removed from cart successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
