const mongoose = require("mongoose")
const dotenv = require("dotenv")
const colors = require("colors")
const User = require("../models/User")
const Product = require("../models/Product")
const Order = require("../models/Order")

// Load env vars
dotenv.config()

// Connect to DB
mongoose.connect(process.env.MONGODB_URI)

// Sample data
const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "password123",
    role: "admin",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
  },
]

const products = [
  {
    name: "LED Bulb - 10W",
    description:
      "Energy-efficient LED bulb with 10W power consumption. Provides bright, warm light and lasts up to 25,000 hours.",
    price: 8.99,
    category: "bulbs",
    stock: 50,
    image: "/placeholder.svg",
  },
  {
    name: "Smart LED Strip Light",
    description:
      "RGB LED strip light with smartphone control. Create the perfect ambiance with millions of colors and preset scenes.",
    price: 29.99,
    category: "bulbs",
    stock: 25,
    image: "/placeholder.svg",
  },
  {
    name: "Wall Switch - Double",
    description:
      "Modern double wall switch with sleek design. Easy installation and compatible with most electrical systems.",
    price: 12.5,
    category: "switches",
    stock: 100,
    image: "/placeholder.svg",
  },
  {
    name: "Smart Wall Switch",
    description:
      "WiFi-enabled smart wall switch. Control your lights from anywhere using your smartphone or voice commands.",
    price: 34.99,
    category: "switches",
    stock: 15,
    image: "/placeholder.svg",
  },
  {
    name: "Ceiling Fan - 52 inch",
    description:
      "Modern ceiling fan with 3 speed settings and reversible motor. Includes remote control for convenient operation.",
    price: 129.99,
    category: "fans",
    stock: 10,
    image: "/placeholder.svg",
  },
  {
    name: "USB Wall Socket",
    description:
      "Wall socket with built-in USB charging ports. Perfect for charging smartphones and tablets without adapters.",
    price: 19.99,
    category: "sockets",
    stock: 30,
    image: "/placeholder.svg",
  },
  {
    name: "Extension Cord - 10ft",
    description: "Heavy-duty extension cord with multiple outlets. Perfect for home, office, or workshop use.",
    price: 15.99,
    category: "cables",
    stock: 40,
    image: "/placeholder.svg",
  },
  {
    name: "Desk Lamp",
    description:
      "Adjustable desk lamp with multiple brightness levels and color temperatures. Perfect for work or study.",
    price: 45.99,
    category: "lamps",
    stock: 20,
    image: "/placeholder.svg",
  },
]

// Import data
const importData = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()

    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)

    console.log("Data Imported!".green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

// Delete data
const destroyData = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()

    console.log("Data Destroyed!".red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

// Run script based on command line argument
if (process.argv[2] === "-d") {
  destroyData()
} else {
  importData()
}

