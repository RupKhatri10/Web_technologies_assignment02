const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    images: {
        type: [String]
    },
    text: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Comment', commentSchema);