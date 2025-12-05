const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");

exports.getAdminStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    
    res.status(200).json({ totalProducts, totalOrders, totalUsers });
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin stats" });
  }
};
