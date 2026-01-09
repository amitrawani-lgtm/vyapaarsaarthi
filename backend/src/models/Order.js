const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    customerName: {
        type: String,
        default: 'Walk-in Customer'
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            name: String, // Snapshot of name
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
        default: 0.0
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Cancelled'],
        default: 'Completed' // Default for POS style
    },
    paymentMethod: {
        type: String,
        enum: ['Cash', 'UPI', 'Credit'],
        default: 'Cash'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
