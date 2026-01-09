const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a product name']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    stock: {
        type: Number,
        required: [true, 'Please add stock quantity'],
        default: 0
    },
    category: {
        type: String,
        default: 'General'
    },
    description: String,
    imageUrl: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
