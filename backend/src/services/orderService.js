const Order = require('../models/Order');
const Product = require('../models/Product');

const createOrder = async (orderData, userId) => {
    let totalAmount = 0;
    const items = [];

    for (const item of orderData.items) {
        const product = await Product.findOne({
            user: userId,
            name: { $regex: new RegExp(item.name, 'i') }
        });

        if (!product) throw new Error(`Product ${item.name} not found`);

        if (product.stock < item.quantity) {
            throw new Error(`Insufficient stock for ${product.name}. Available: ${product.stock}`);
        }

        // Deduct stock
        product.stock -= item.quantity;
        await product.save();

        items.push({
            product: product._id,
            name: product.name,
            quantity: item.quantity,
            price: product.price
        });

        totalAmount += product.price * item.quantity;
    }

    const order = await Order.create({
        user: userId,
        customerName: orderData.customerName,
        items,
        totalAmount,
        status: 'Completed'
    });

    return order;
};

module.exports = {
    createOrder
};
