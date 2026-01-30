import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";

const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const ownerQuery = { $or: [{ shopkeeper: userId }, { user: userId }] };
    const completedStatuses = ["completed", "Completed"];

    const totalSalesResult = await Order.aggregate([
      { $match: { $and: [ownerQuery, { status: { $in: completedStatuses } }] } },
      { $group: { _id: null, total: { $sum: { $ifNull: ["$totalAmount", 0] } } } },
    ]);
    const totalSales = Number(totalSalesResult[0]?.total ?? 0);

    // 2. Active Orders (pending + processing)
    const activeStatuses = ["pending", "processing", "Pending", "Processing"];
    const activeOrdersCount = await Order.countDocuments({ $and: [ownerQuery, { status: { $in: activeStatuses } }] });

    // 3. Low Inventory
    // Products with stock less than 10
    const lowInventoryCount = await Product.countDocuments({
      user: userId,
      stock: { $lt: 10 },
    });

    // 4. Net Profit (Simplified: 20% of Total Sales for now as we don't have cost price)
    const netProfit = totalSales * 0.2;

    // 5. Recent Orders (Last 5)
    const recentOrders = await Order.find(ownerQuery)
      .sort({ createdAt: -1 })
      .limit(5)
      .select("_id totalAmount status createdAt items");

   
    if (process.env.NODE_ENV !== 'production' && totalSales === 0) {
      console.debug('dashboard:getDashboardStats — totalSalesResult sample:', totalSalesResult.slice(0,3));
      console.debug('dashboard:getDashboardStats — recentOrders count:', recentOrders.length);
    }

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
