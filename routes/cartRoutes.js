const express = require('express');
const auth = require('../middleware/auth');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
// cartRoutes.js

const router = express.Router();

// auth middleware

router.post('/add', auth, async (req, res) => {
    try {
        const { product, quantity } = req.body;
        const cart = await Cart.findOne({ user: req.user._id });

        // first find product of that id
        const productDetails = await Product.findById(product);
        if (!productDetails) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (cart) {
            // If the cart already exists, update the quantity of the existing product or add a new product
            const existingProduct = cart.products.find(p => p.product.toString() === productDetails._id.toString());
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
        console.log(error);
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

router.get('/', auth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('products.product');
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
