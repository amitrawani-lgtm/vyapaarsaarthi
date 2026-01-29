import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";
// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private
const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1. Total Sales (Items sold successfully)
    // Aggregating all completed orders
    const totalSalesResult = await Order.aggregate([
      { $match: { user: userId, status: "Completed" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const totalSales =
      totalSalesResult.length > 0 ? totalSalesResult[0].total : 0;

    // 2. Active Orders
    const activeOrdersCount = await Order.countDocuments({
      user: userId,
      status: "Pending",
    });

    // 3. Low Inventory
    // Products with stock less than 10
    const lowInventoryCount = await Product.countDocuments({
      user: userId,
      stock: { $lt: 10 },
    });

    // 4. Net Profit (Simplified: 20% of Total Sales for now as we don't have cost price)
    const netProfit = totalSales * 0.2;

    // 5. Recent Orders (Last 5)
    const recentOrders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("_id totalAmount status createdAt items");

    res.status(200).json({
      totalSales,
      activeOrders: activeOrdersCount,
      lowInventory: lowInventoryCount,
      netProfit,
      recentOrders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export { getDashboardStats };
