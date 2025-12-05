import ProductList from "@/components/product-list"
import { getProducts } from "@/lib/products"

export default async function Home() {
  const products = await getProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Electric Shop</h1>
      <ProductList products={products} />
    </div>
  )
}

