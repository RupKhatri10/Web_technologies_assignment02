//product schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String], // Array of strings used to store images url
        required: true
    },
    pricing: {
        type: Number,
        required: true
    },
    shippingCost: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);