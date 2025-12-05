const express = require("express")
const router = express.Router()
const User = require("../models/User")
const { protect, authorize } = require("../middleware/auth")

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put("/profile", protect, async (req, res, next) => {
  try {
    const { name, email } = req.body

    // Build update object
    const updateFields = {}
    if (name) updateFields.name = name
    if (email) updateFields.email = email

    const user = await User.findByIdAndUpdate(req.user.id, updateFields, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (err) {
    next(err)
  }
})

// @desc    Add user address
// @route   POST /api/users/addresses
// @access  Private
router.post("/addresses", protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)

    // If this is the first address, make it default
    if (user.addresses.length === 0) {
      req.body.isDefault = true
    }

    // If this address is set as default, unset any existing default
    if (req.body.isDefault) {
      user.addresses.forEach((address) => {
        address.isDefault = false
      })
    }

    user.addresses.push(req.body)

    await user.save()

    res.status(201).json({
      success: true,
      data: user.addresses,
    })
  } catch (err) {
    next(err)
  }
})

// @desc    Update user address
// @route   PUT /api/users/addresses/:id
// @access  Private
router.put("/addresses/:id", protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)

    // Find address index
    const addressIndex = user.addresses.findIndex((address) => address._id.toString() === req.params.id)

    if (addressIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      })
    }

    // If this address is being set as default, unset any existing default
    if (req.body.isDefault) {
      user.addresses.forEach((address) => {
        address.isDefault = false
      })
    }

    // Update address fields
    Object.keys(req.body).forEach((key) => {
      user.addresses[addressIndex][key] = req.body[key]
    })

    await user.save()

    res.status(200).json({
      success: true,
      data: user.addresses,
    })
  } catch (err) {
    next(err)
  }
})

// @desc    Delete user address
// @route   DELETE /api/users/addresses/:id
// @access  Private
router.delete("/addresses/:id", protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)

    // Find address index
    const addressIndex = user.addresses.findIndex((address) => address._id.toString() === req.params.id)

    if (addressIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      })
    }

    // Remove address
    user.addresses.splice(addressIndex, 1)

    // If we removed the default address and there are other addresses, make the first one default
    if (user.addresses.length > 0 && !user.addresses.some((addr) => addr.isDefault)) {
      user.addresses[0].isDefault = true
    }

    await user.save()

    res.status(200).json({
      success: true,
      data: user.addresses,
    })
  } catch (err) {
    next(err)
  }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
router.get("/", protect, authorize("admin"), async (req, res, next) => {
  try {
    const users = await User.find()

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router

