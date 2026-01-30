import { User } from "../models/User.js";
import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";

export const createOrder = async (req, res) => {
  const { items, buyerPhone, shopkeeperPhone } = req.body;
  const shopkeeper = await User.findOne({
    number: shopkeeperPhone,
  });

  if (!shopkeeper) {
    return res.status(404).json({ message: "Shopkeeper not found" });
  }

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "No order items" });
  }

  let totalAmount = 0;
  const orderItems = [];

  for (const item of items) {
    const product = await Product.findOne({
      user: shopkeeper._id,
      name: item.name,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.stock < item.quantity) {
      return res.status(400).json({
        message: `${product.name} is out of stock`,
      });
    }

    // Calculate price
    totalAmount += product.price * item.quantity;

    orderItems.push({
      product: product._id,
      quantity: item.quantity,
      priceAtPurchase: product.price,
    });

    // Reduce stock
    product.stock -= item.quantity;
    await product.save();
  }

  const order = await Order.create({
    orderId: `ORD-${Date.now().toString().slice(-8)}-${Math.floor(Math.random() * 900 + 100)}`,
    buyerPhone,
    items: orderItems,
    totalAmount,
    shopkeeper: shopkeeper._id,
    status: "completed"
  });
  res.status(201).json(order);
};

export const getOrderCondroller = async (req, res) => {
  const orders = await Order.find({ shopkeeper: req.user._id });
  res.send(orders);
}