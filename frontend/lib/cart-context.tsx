// "use client"

// import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
// import type { CartItem, Product } from "./types"
// import { useToast } from "@/hooks/use-toast"

// interface CartContextType {
//   cart: CartItem[]
//   addToCart: (product: Product, quantity?: number) => void
//   removeFromCart: (productId: string) => void
//   updateQuantity: (productId: string, quantity: number) => void
//   clearCart: () => void
//   totalItems: number
//   totalPrice: number
// }

// const CartContext = createContext<CartContextType | undefined>(undefined)

// export function CartProvider({ children }: { children: ReactNode }) {
//   const [cart, setCart] = useState<CartItem[]>([])
//   const { toast } = useToast()

//   // Load cart from localStorage on initial render
//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart")
//     if (savedCart) {
//       try {
//         setCart(JSON.parse(savedCart))
//       } catch (error) {
//         console.error("Failed to parse cart from localStorage:", error)
//       }
//     }
//   }, [])

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart))
//   }, [cart])

//   const addToCart = (product: Product, quantity = 1) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.product.id === product.id)

//       if (existingItem) {
//         // If product already exists in cart, update quantity
//         const newQuantity = Math.min(existingItem.quantity + quantity, product.stock)

//         toast({
//           title: "Cart updated",
//           description: `${product.name} quantity updated to ${newQuantity}`,
//         })

//         return prevCart.map((item) => (item.product.id === product.id ? { ...item, quantity: newQuantity } : item))
//       } else {
//         // If product doesn't exist in cart, add it
//         toast({
//           title: "Added to cart",
//           description: `${product.name} added to your cart`,
//         })

//         return [...prevCart, { product, quantity }]
//       }
//     })
//   }

//   const removeFromCart = (productId: string) => {
//     setCart((prevCart) => {
//       const item = prevCart.find((item) => item.product.id === productId)
//       if (item) {
//         toast({
//           title: "Removed from cart",
//           description: `${item.product.name} removed from your cart`,
//         })
//       }
//       return prevCart.filter((item) => item.product.id !== productId)
//     })
//   }

//   const updateQuantity = (productId: string, quantity: number) => {
//     if (quantity <= 0) {
//       removeFromCart(productId)
//       return
//     }

//     setCart((prevCart) =>
//       prevCart.map((item) => {
//         if (item.product.id === productId) {
//           // Ensure quantity doesn't exceed stock
//           const newQuantity = Math.min(quantity, item.product.stock)
//           return { ...item, quantity: newQuantity }
//         }
//         return item
//       }),
//     )
//   }

//   const clearCart = () => {
//     setCart([])
//     toast({
//       title: "Cart cleared",
//       description: "All items have been removed from your cart",
//     })
//   }

//   const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

//   const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0)

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         totalItems,
//         totalPrice,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   )
// }

// export function useCart() {
//   const context = useContext(CartContext)
//   if (context === undefined) {
//     throw new Error("useCart must be used within a CartProvider")
//   }
//   return context
// }



"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { CartItem, Product } from "./types";
import { useToast } from "@/hooks/use-toast";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [lastAction, setLastAction] = useState<{ type: string; product?: Product; quantity?: number } | null>(null);
  const { toast } = useToast();

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Show toast notifications based on the last action
  useEffect(() => {
    if (!lastAction) return;

    switch (lastAction.type) {
      case "add":
        toast({
          title: "Added to cart",
          description: `${lastAction.product?.name} added to your cart`,
        });
        break;

      case "update":
        toast({
          title: "Cart updated",
          description: `${lastAction.product?.name} quantity updated to ${lastAction.quantity}`,
        });
        break;

      case "remove":
        toast({
          title: "Removed from cart",
          description: `${lastAction.product?.name} removed from your cart`,
        });
        break;

      case "clear":
        toast({
          title: "Cart cleared",
          description: "All items have been removed from your cart",
        });
        break;
    }

    setLastAction(null);
  }, [lastAction, toast]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);

      if (existingItem) {
        const newQuantity = Math.min(existingItem.quantity + quantity, product.stock);

        setLastAction({ type: "update", product, quantity: newQuantity });

        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      } else {
        setLastAction({ type: "add", product });

        return [...prevCart, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const item = prevCart.find((item) => item.product.id === productId);
      if (item) {
        setLastAction({ type: "remove", product: item.product });
      }
      return prevCart.filter((item) => item.product.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product.id === productId) {
          const newQuantity = Math.min(quantity, item.product.stock);
          setLastAction({ type: "update", product: item.product, quantity: newQuantity });
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setLastAction({ type: "clear" });
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
