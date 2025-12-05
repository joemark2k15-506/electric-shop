const express = require("express")
const router = express.Router()
const Order = require("../models/Order")
const Product = require("../models/Product")
const { protect, authorize } = require("../middleware/auth")

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post("/", protect, async (req, res, next) => {
  try {
    const { items, shippingAddress, paymentMethod, subtotal, tax, shipping, total } = req.body

    if (items && items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No order items",
      })
    }

    // Verify items and prices
    const orderItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.product)

        if (!product) {
          return res.status(404).json({
            success: false,
            message: `Product not found with id of ${item.product}`,
          })
        }

        // Check if enough stock
        if (product.stock < item.quantity) {
          return res.status(400).json({
            success: false,
            message: `Not enough stock for ${product.name}`,
          })
        }

        // Update stock
        product.stock -= item.quantity
        await product.save()

        return {
          product: item.product,
          name: product.name,
          quantity: item.quantity,
          price: product.price,
          image: product.image,
        }
      }),
    )

    // Create order
    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      subtotal,
      tax,
      shipping,
      total,
    })

    res.status(201).json({
      success: true,
      data: order,
    })
  } catch (err) {
    next(err)
  }
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
router.get("/", protect, authorize("admin"), async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate("user", "id name email")

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    })
  } catch (err) {
    next(err)
  }
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
router.get("/myorders", protect, async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id })

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    })
  } catch (err) {
    next(err)
  }
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
router.get("/:id", protect, async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email")

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order not found with id of ${req.params.id}`,
      })
    }

    // Make sure user is order owner or admin
    if (order.user._id.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this order",
      })
    }

    res.status(200).json({
      success: true,
      data: order,
    })
  } catch (err) {
    next(err)
  }
})

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
router.put("/:id/pay", protect, async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order not found with id of ${req.params.id}`,
      })
    }

    // Make sure user is order owner or admin
    if (order.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized to update this order",
      })
    }

    if (order.isPaid) {
      return res.status(400).json({
        success: false,
        message: "Order already paid",
      })
    }

    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    }

    const updatedOrder = await order.save()

    res.status(200).json({
      success: true,
      data: updatedOrder,
    })
  } catch (err) {
    next(err)
  }
})

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
router.put("/:id/status", protect, authorize("admin"), async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order not found with id of ${req.params.id}`,
      })
    }

    order.status = req.body.status

    if (req.body.status === "delivered") {
      order.isDelivered = true
      order.deliveredAt = Date.now()
    }

    const updatedOrder = await order.save()

    res.status(200).json({
      success: true,
      data: updatedOrder,
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router

