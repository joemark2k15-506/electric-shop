// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { useAuth } from "@/lib/auth-context"
// import { useCart } from "@/lib/cart-context"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Separator } from "@/components/ui/separator"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Loader2, CreditCard, MapPin, Truck, CheckCircle } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"
// import AddressForm from "@/components/address-form"

// export default function CheckoutPage() {
//   const { user, isLoading: authLoading } = useAuth()
//   const { cart, totalPrice, clearCart } = useCart()
//   const router = useRouter()
//   const [activeStep, setActiveStep] = useState("shipping")
//   const [isProcessing, setIsProcessing] = useState(false)

//   // Redirect to login if not authenticated
//   useEffect(() => {
//     if (!authLoading && !user) {
//       router.push("/login?redirect=checkout")
//     }
//   }, [user, authLoading, router])

//   // Redirect to cart if cart is empty
//   useEffect(() => {
//     if (cart.length === 0) {
//       router.push("/cart")
//     }
//   }, [cart, router])

//   if (authLoading) {
//     return (
//       <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[calc(100vh-200px)]">
//         <p>Loading...</p>
//       </div>
//     )
//   }

//   if (!user || cart.length === 0) {
//     return null // Will redirect in useEffect
//   }

//   const handlePlaceOrder = async () => {
//     setIsProcessing(true)

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 2000))
//       clearCart()
//       router.push("/order-success")
//     } catch (error) {
//       setIsProcessing(false)
//     }
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Checkout</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2">
//           <Tabs value={activeStep} onValueChange={setActiveStep} className="space-y-8">
//             <TabsList className="grid grid-cols-3 w-full">
//               <TabsTrigger value="shipping" className="flex items-center gap-2">
//                 <MapPin className="h-4 w-4" />
//                 <span className="hidden sm:inline">Shipping</span>
//               </TabsTrigger>
//               <TabsTrigger value="payment" className="flex items-center gap-2">
//                 <CreditCard className="h-4 w-4" />
//                 <span className="hidden sm:inline">Payment</span>
//               </TabsTrigger>
//               <TabsTrigger value="review" className="flex items-center gap-2">
//                 <CheckCircle className="h-4 w-4" />
//                 <span className="hidden sm:inline">Review</span>
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="shipping" className="space-y-4">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Shipping Address</CardTitle>
//                   <CardDescription>Enter your shipping address</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   {user.address ? (
//                     <div className="space-y-4">
//                       <div className="border rounded-md p-4">
//                         <RadioGroup defaultValue="default" className="space-y-4">
//                           <div className="flex items-start space-x-3">
//                             <RadioGroupItem value="default" id="default-address" />
//                             <div className="grid gap-1.5">
//                               <Label htmlFor="default-address" className="font-medium">
//                                 Default Address
//                               </Label>
//                               <p className="text-sm text-muted-foreground">
//                                 {user.name}
//                                 <br />
//                                 {user.address.street}
//                                 <br />
//                                 {user.address.city}, {user.address.state} {user.address.zipCode}
//                                 <br />
//                                 {user.address.country}
//                               </p>
//                             </div>
//                           </div>
//                           <div className="flex items-start space-x-3">
//                             <RadioGroupItem value="new" id="new-address" />
//                             <div className="grid gap-1.5">
//                               <Label htmlFor="new-address" className="font-medium">
//                                 Use a different address
//                               </Label>
//                             </div>
//                           </div>
//                         </RadioGroup>
//                       </div>
//                     </div>
//                   ) : (
//                     <AddressForm />
//                   )}
//                 </CardContent>
//                 <CardFooter className="flex justify-between">
//                   <Button variant="outline" asChild>
//                     <Link href="/cart">Back to Cart</Link>
//                   </Button>
//                   <Button onClick={() => setActiveStep("payment")}>Continue to Payment</Button>
//                 </CardFooter>
//               </Card>
//             </TabsContent>

//             <TabsContent value="payment" className="space-y-4">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Payment Method</CardTitle>
//                   <CardDescription>Choose your payment method</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <RadioGroup defaultValue="card" className="space-y-4">
//                     <div className="flex items-center space-x-3 border rounded-md p-4">
//                       <RadioGroupItem value="card" id="card-payment" />
//                       <Label htmlFor="card-payment" className="flex items-center gap-2">
//                         <CreditCard className="h-4 w-4" />
//                         Credit/Debit Card
//                       </Label>
//                     </div>
//                   </RadioGroup>

//                   <div className="space-y-4 mt-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="cardName">Name on Card</Label>
//                       <Input id="cardName" placeholder="John Doe" />
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="cardNumber">Card Number</Label>
//                       <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="expiry">Expiry Date</Label>
//                         <Input id="expiry" placeholder="MM/YY" />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="cvv" />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="cvv">CVV</Label>
//                         <Input id="cvv" placeholder="123" />
//                       </div>
//                     </div>

//                     <div className="flex items-center space-x-2 mt-2">
//                       <Checkbox id="saveCard" />
//                       <Label htmlFor="saveCard">Save card for future purchases</Label>
//                     </div>
//                   </div>
//                 </CardContent>
//                 <CardFooter className="flex justify-between">
//                   <Button variant="outline" onClick={() => setActiveStep("shipping")}>
//                     Back to Shipping
//                   </Button>
//                   <Button onClick={() => setActiveStep("review")}>Continue to Review</Button>
//                 </CardFooter>
//               </Card>
//             </TabsContent>

//             <TabsContent value="review" className="space-y-4">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Review Your Order</CardTitle>
//                   <CardDescription>Please review your order details before placing your order</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div>
//                     <h3 className="font-medium mb-2">Shipping Address</h3>
//                     <div className="text-sm text-muted-foreground">
//                       {user.name}
//                       <br />
//                       {user.address?.street || "No address provided"}
//                       <br />
//                       {user.address ? `${user.address.city}, ${user.address.state} ${user.address.zipCode}` : ""}
//                       <br />
//                       {user.address?.country || ""}
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="font-medium mb-2">Payment Method</h3>
//                     <div className="text-sm text-muted-foreground flex items-center gap-2">
//                       <CreditCard className="h-4 w-4" />
//                       Credit/Debit Card (ending in 3456)
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="font-medium mb-2">Shipping Method</h3>
//                     <div className="text-sm text-muted-foreground flex items-center gap-2">
//                       <Truck className="h-4 w-4" />
//                       Standard Shipping (3-5 business days)
//                     </div>
//                   </div>

//                   <Separator />

//                   <div>
//                     <h3 className="font-medium mb-4">Order Items</h3>
//                     <div className="space-y-4">
//                       {cart.map((item) => (
//                         <div key={item.product.id} className="flex gap-4">
//                           <div className="relative w-16 h-16 flex-shrink-0">
//                             <Image
//                               src={item.product.image || "/placeholder.svg"}
//                               alt={item.product.name}
//                               fill
//                               className="object-cover rounded-md"
//                             />
//                           </div>
//                           <div className="flex-grow">
//                             <p className="font-medium">{item.product.name}</p>
//                             <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
//                             <p className="text-sm">${(item.product.price * item.quantity).toFixed(2)}</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </CardContent>
//                 <CardFooter className="flex justify-between">
//                   <Button variant="outline" onClick={() => setActiveStep("payment")}>
//                     Back to Payment
//                   </Button>
//                   <Button onClick={handlePlaceOrder} disabled={isProcessing}>
//                     {isProcessing ? (
//                       <>
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                         Processing...
//                       </>
//                     ) : (
//                       "Place Order"
//                     )}
//                   </Button>
//                 </CardFooter>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>

//         <div>
//           <Card>
//             <CardHeader>
//               <CardTitle>Order Summary</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 {cart.map((item) => (
//                   <div key={item.product.id} className="flex justify-between text-sm">
//                     <span>
//                       {item.quantity} × {item.product.name}
//                     </span>
//                     <span>${(item.product.price * item.quantity).toFixed(2)}</span>
//                   </div>
//                 ))}
//               </div>

//               <Separator />

//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span>${totalPrice.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Shipping</span>
//                 <span>Free</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Tax</span>
//                 <span>${(totalPrice * 0.08).toFixed(2)}</span>
//               </div>

//               <Separator />

//               <div className="flex justify-between font-bold">
//                 <span>Total</span>
//                 <span>${(totalPrice + totalPrice * 0.08).toFixed(2)}</span>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }


"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, CreditCard, MapPin, Truck, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddressForm from "@/components/address-form";

export default function CheckoutPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState("shipping");
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=checkout");
    }
  }, [user, authLoading, router]);

  // Redirect to cart if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      router.push("/cart");
    }
  }, [cart, router]);

  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user || cart.length === 0) {
    return null; // Will redirect in useEffect
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      clearCart();
      router.push("/order-success");
    } catch (error) {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs value={activeStep} onValueChange={setActiveStep} className="space-y-8">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="shipping">
                <MapPin className="h-4 w-4" /> Shipping
              </TabsTrigger>
              <TabsTrigger value="payment">
                <CreditCard className="h-4 w-4" /> Payment
              </TabsTrigger>
              <TabsTrigger value="review">
                <CheckCircle className="h-4 w-4" /> Review
              </TabsTrigger>
            </TabsList>

            {/* Shipping Step */}
            <TabsContent value="shipping">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                  <CardDescription>Enter your shipping address</CardDescription>
                </CardHeader>
                <CardContent>
                  {user.address && user.address.length > 0 ? (
                    <RadioGroup defaultValue={user.address[0]._id} className="space-y-4">
                      {user.address.map((addr) => (
                        <div key={addr._id} className="flex items-start space-x-3">
                          <RadioGroupItem value={addr._id} id={`address-${addr._id}`} />
                          <div className="grid gap-1.5">
                            <Label htmlFor={`address-${addr._id}`} className="font-medium">
                              {addr.isDefault ? "Default Address" : "Other Address"}
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              {user.name}
                              <br />
                              {addr.street}, {addr.city}, {addr.state} {addr.zipCode}
                              <br />
                              {addr.country}
                            </p>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : (
                    <AddressForm />
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href="/cart">Back to Cart</Link>
                  </Button>
                  <Button onClick={() => setActiveStep("payment")}>Continue to Payment</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Payment Step */}
            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup defaultValue="card" className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="card" />
                      <Label>
                        <CreditCard className="h-4 w-4" /> Credit/Debit Card
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveStep("shipping")}>
                    Back to Shipping
                  </Button>
                  <Button onClick={() => setActiveStep("review")}>Continue to Review</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Review Step */}
            <TabsContent value="review">
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Order</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="font-medium mb-2">Shipping Address</h3>
                  {user.address && user.address.length > 0 ? (
                    <p className="text-sm text-muted-foreground">
                      {user.name}
                      <br />
                      {user.address[0].street}, {user.address[0].city}, {user.address[0].state} {user.address[0].zipCode}
                      <br />
                      {user.address[0].country}
                    </p>
                  ) : (
                    <p>No address provided</p>
                  )}

                  <Separator />

                  <h3 className="font-medium mb-4">Order Items</h3>
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <Image src={item.product.image || "/placeholder.svg"} alt={item.product.name} width={50} height={50} />
                      <p>{item.product.name} x {item.quantity}</p>
                      <p>${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveStep("payment")}>
                    Back to Payment
                  </Button>
                  <Button onClick={handlePlaceOrder} disabled={isProcessing}>
                    {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Place Order"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

