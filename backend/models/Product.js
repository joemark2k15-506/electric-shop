const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price cannot be negative"],
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
    enum: ["bulbs", "switches", "fans", "sockets", "cables", "lamps", "other"],
  },
  stock: {
    type: Number,
    required: [true, "Product stock is required"],
    min: [0, "Stock cannot be negative"],
    default: 0,
  },
  image: {
    type: String,
    default: "/placeholder.svg",
  },
  reviews: [ReviewSchema],
  averageRating: {
    type: Number,
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Calculate average rating when reviews are modified
ProductSchema.pre("save", function (next) {
  if (this.reviews.length > 0) {
    this.averageRating = this.reviews.reduce((acc, item) => item.rating + acc, 0) / this.reviews.length
  } else {
    this.averageRating = 0
  }
  next()
})

module.exports = mongoose.model("Product", ProductSchema)

