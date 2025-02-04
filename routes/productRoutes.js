const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a new product
router.post('/createProduct', auth, async (req, res) => {
    const product = new Product({
        ...req.body
    });
    try {
        await product.save();
        res.status(201).json({
            product,
            message: 'Product created'
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all products
router.get("/getAllProducts", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a product by its ID
router.get('/:findById', async (req, res) => {
    try {
        const product = await Product.findById(req.params.findById);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a product by its ID
router.put('/:updateById', auth, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.updateById, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a product by its ID
router.delete('/:deleteById', auth, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.deleteById);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
