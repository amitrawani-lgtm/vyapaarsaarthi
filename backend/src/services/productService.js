import { Product } from "../models/Product.js";

const addProduct = async (productData, userId) => {
  const product = await Product.create({
    ...productData,
    user: userId,
  });
  return product;
};

const getProducts = async (userId, query = {}) => {
  return await Product.find({ user: userId, ...query });
};

const updateStock = async (name, quantity, userId) => {
  // Find product by name (fuzzy search or exact)
  const product = await Product.findOne({
    user: userId,
    name: { $regex: new RegExp(name, "i") },
  });

  if (!product) throw new Error(`Product ${name} not found`);

  product.stock += quantity;
  await product.save();
  return product;
};

export { addProduct, getProducts, updateStock };
