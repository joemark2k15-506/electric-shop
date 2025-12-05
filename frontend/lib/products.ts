// import type { Product } from "./types"

// // Mock product data
// const products: Product[] = [
//   {
//     id: "1",
//     name: "LED Bulb - 10W",
//     description:
//       "Energy-efficient LED bulb with 10W power consumption. Provides bright, warm light and lasts up to 25,000 hours.",
//     price: 8.99,
//     category: "bulbs",
//     image: "/placeholder.svg?height=400&width=400",
//     stock: 50,
//   },
//   {
//     id: "2",
//     name: "Smart LED Strip Light",
//     description:
//       "RGB LED strip light with smartphone control. Create the perfect ambiance with millions of colors and preset scenes.",
//     price: 29.99,
//     category: "bulbs",
//     image: "/placeholder.svg?height=400&width=400",
//     stock: 25,
//   },
//   {
//     id: "3",
//     name: "Wall Switch - Double",
//     description:
//       "Modern double wall switch with sleek design. Easy installation and compatible with most electrical systems.",
//     price: 12.5,
//     category: "switches",
//     image: "/placeholder.svg?height=400&width=400",
//     stock: 100,
//   },
//   {
//     id: "4",
//     name: "Smart Wall Switch",
//     description:
//       "WiFi-enabled smart wall switch. Control your lights from anywhere using your smartphone or voice commands.",
//     price: 34.99,
//     category: "switches",
//     image: "/placeholder.svg?height=400&width=400",
//     stock: 15,
//   },
//   {
//     id: "5",
//     name: "Ceiling Fan - 52 inch",
//     description:
//       "Modern ceiling fan with 3 speed settings and reversible motor. Includes remote control for convenient operation.",
//     price: 129.99,
//     category: "fans",
//     image: "/placeholder.svg?height=400&width=400",
//     stock: 10,
//   },
//   {
//     id: "6",
//     name: "USB Wall Socket",
//     description:
//       "Wall socket with built-in USB charging ports. Perfect for charging smartphones and tablets without adapters.",
//     price: 19.99,
//     category: "sockets",
//     image: "/placeholder.svg?height=400&width=400",
//     stock: 30,
//   },
//   {
//     id: "7",
//     name: "Extension Cord - 10ft",
//     description: "Heavy-duty extension cord with multiple outlets. Perfect for home, office, or workshop use.",
//     price: 15.99,
//     category: "cables",
//     image: "/placeholder.svg?height=400&width=400",
//     stock: 40,
//   },
//   {
//     id: "8",
//     name: "Desk Lamp",
//     description:
//       "Adjustable desk lamp with multiple brightness levels and color temperatures. Perfect for work or study.",
//     price: 45.99,
//     category: "lamps",
//     image: "/placeholder.svg?height=400&width=400",
//     stock: 20,
//   },
// ]

// // Simulate API calls with a delay
// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// export async function getProducts(): Promise<Product[]> {
//   await delay(500) // Simulate network delay
//   return products
// }

// export async function getProduct(id: string): Promise<Product | undefined> {
//   await delay(300) // Simulate network delay
//   return products.find((product) => product.id === id)
// }


import { getProducts as fetchProducts, getProduct as fetchProduct } from "@/lib/api"
import { Product } from "./types"

export async function getProducts(): Promise<Product[]> {
  try {
    const { data } = await fetchProducts()
    return data.map((product: any) => ({
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      stock: product.stock
    }))
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export async function getProduct(id: string): Promise<Product | undefined> {
  try {
    const { data } = await fetchProduct(id)
    return {
      id: data._id,
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      image: data.image,
      stock: data.stock
    }
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error)
    return undefined
  }
}