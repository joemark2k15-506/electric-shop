const express = require("express")
const router = express.Router()
const Cart = require("../models/Cart")
const Product = require("../models/Product")
const { protect } = require("../middleware/auth")

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
router.get("/", protect, async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate({
      path: "items.product",
      select: "name price image stock",
    })

    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: [],
      })
    }

    res.status(200).json({
      success: true,
      data: cart,
    })
  } catch (err) {
    next(err)
  }
})

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
router.post("/", protect, async (req, res, next) => {
  try {
    const { productId, quantity } = req.body

    // Validate product
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      })
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock available",
      })
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: req.user.id })

    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: [],
      })
    }

    // Check if product already in cart
    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId)

    if (itemIndex > -1) {
      // Update quantity if product exists
      cart.items[itemIndex].quantity = quantity
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        quantity,
      })
    }

    await cart.save()

    // Populate product details
    await cart.populate({
      path: "items.product",
      select: "name price image stock",
    })

    res.status(200).json({
      success: true,
      data: cart,
    })
  } catch (err) {
    next(err)
  }
})

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
// @access  Private
router.put("/:productId", protect, async (req, res, next) => {
  try {
    const { quantity } = req.body
    const { productId } = req.params

    // Validate product
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      })
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock available",
      })
    }

    // Find cart
    const cart = await Cart.findOne({ user: req.user.id })

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      })
    }

    // Find item index
    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId)

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      })
    }

    // Update quantity
    cart.items[itemIndex].quantity = quantity

    await cart.save()

    // Populate product details
    await cart.populate({
      path: "items.product",
      select: "name price image stock",
    })

    res.status(200).json({
      success: true,
      data: cart,
    })
  } catch (err) {
    next(err)
  }
})

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
router.delete("/:productId", protect, async (req, res, next) => {
  try {
    const { productId } = req.params

    // Find cart
    const cart = await Cart.findOne({ user: req.user.id })

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      })
    }

    // Remove item
    cart.items = cart.items.filter((item) => item.product.toString() !== productId)

    await cart.save()

    // Populate product details
    await cart.populate({
      path: "items.product",
      select: "name price image stock",
    })

    res.status(200).json({
      success: true,
      data: cart,
    })
  } catch (err) {
    next(err)
  }
})

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
router.delete("/", protect, async (req, res, next) => {
  try {
    // Find cart
    const cart = await Cart.findOne({ user: req.user.id })

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      })
    }

    // Clear items
    cart.items = []

    await cart.save()

    res.status(200).json({
      success: true,
      data: cart,
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router

