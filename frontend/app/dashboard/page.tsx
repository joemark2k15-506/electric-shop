// "use client"

// import { useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { useAuth } from "@/lib/auth-context"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Separator } from "@/components/ui/separator"
// import { Package, ShoppingBag, User, MapPin, CreditCard, LogOut } from "lucide-react"
// import AddressForm from "@/components/address-form"

// export default function DashboardPage() {
//   const { user, isLoading, logout } = useAuth()
//   const router = useRouter()

//   useEffect(() => {
//     if (!isLoading && !user) {
//       router.push("/login")
//     }
//   }, [user, isLoading, router])

//   if (isLoading) {
//     return (
//       <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[calc(100vh-200px)]">
//         <p>Loading...</p>
//       </div>
//     )
//   }

//   if (!user) {
//     return null // Will redirect in useEffect
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//         <div>
//           <h1 className="text-3xl font-bold">My Account</h1>
//           <p className="text-muted-foreground">Welcome back, {user.name}</p>
//         </div>
//         <Button variant="outline" onClick={logout}>
//           <LogOut className="mr-2 h-4 w-4" />
//           Logout
//         </Button>
//       </div>

//       <Tabs defaultValue="profile" className="space-y-4">
//         <TabsList>
//           <TabsTrigger value="profile">
//             <User className="mr-2 h-4 w-4" />
//             Profile
//           </TabsTrigger>
//           <TabsTrigger value="orders">
//             <ShoppingBag className="mr-2 h-4 w-4" />
//             Orders
//           </TabsTrigger>
//           <TabsTrigger value="addresses">
//             <MapPin className="mr-2 h-4 w-4" />
//             Addresses
//           </TabsTrigger>
//           <TabsTrigger value="payment">
//             <CreditCard className="mr-2 h-4 w-4" />
//             Payment Methods
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="profile" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Profile Information</CardTitle>
//               <CardDescription>View and update your account details</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm font-medium">Name</p>
//                   <p className="text-lg">{user.name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium">Email</p>
//                   <p className="text-lg">{user.email}</p>
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button variant="outline">Edit Profile</Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>

//         <TabsContent value="orders" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Order History</CardTitle>
//               <CardDescription>View your recent orders and their status</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="text-center py-12">
//                 <Package className="mx-auto h-12 w-12 text-muted-foreground" />
//                 <p className="mt-4 text-muted-foreground">No orders yet</p>
//                 <Button className="mt-4" asChild>
//                   <a href="/">Start Shopping</a>
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="addresses" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Shipping Addresses</CardTitle>
//               <CardDescription>Manage your shipping addresses</CardDescription>
//             </CardHeader>
//             <CardContent>
//               {user.address ? (
//                 <div className="space-y-4">
//                   <div className="border rounded-md p-4">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <p className="font-medium">{user.name}</p>
//                         <p>{user.address.street}</p>
//                         <p>
//                           {user.address.city}, {user.address.state} {user.address.zipCode}
//                         </p>
//                         <p>{user.address.country}</p>
//                       </div>
//                       <Button variant="outline" size="sm">
//                         Edit
//                       </Button>
//                     </div>
//                   </div>
//                   <Separator />
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   <p className="text-muted-foreground">No addresses saved yet</p>
//                   <Separator />
//                 </div>
//               )}

//               <div className="mt-4">
//                 <h3 className="text-lg font-medium mb-4">Add New Address</h3>
//                 <AddressForm />
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="payment" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Payment Methods</CardTitle>
//               <CardDescription>Manage your payment methods</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="text-center py-12">
//                 <CreditCard className="mx-auto h-12 w-12 text-muted-foreground" />
//                 <p className="mt-4 text-muted-foreground">No payment methods saved yet</p>
//                 <Button className="mt-4" variant="outline">
//                   Add Payment Method
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }


"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Package, ShoppingBag, User, MapPin, CreditCard, LogOut } from "lucide-react"
import AddressForm from "@/components/address-form"

export default function DashboardPage() {
  const { user, isLoading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return null // Redirects in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Account</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}</p>
        </div>
        <Button variant="outline" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="orders">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="addresses">
            <MapPin className="mr-2 h-4 w-4" />
            Addresses
          </TabsTrigger>
          <TabsTrigger value="payment">
            <CreditCard className="mr-2 h-4 w-4" />
            Payment Methods
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>View and update your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Name</p>
                  <p className="text-lg">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-lg">{user.email}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Edit Profile</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View your recent orders and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">No orders yet</p>
                <Button className="mt-4" asChild>
                  <a href="/">Start Shopping</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="addresses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Addresses</CardTitle>
              <CardDescription>Manage your shipping addresses</CardDescription>
            </CardHeader>
            <CardContent>
              {user.address && user.address.length > 0 ? (
                <div className="space-y-4">
                  {user.address.map((address, index) => (
                    <div key={index} className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p>{address.street}</p>
                          <p>
                            {address.city}, {address.state} {address.zipCode}
                          </p>
                          <p>{address.country}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Separator />
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-muted-foreground">No addresses saved yet</p>
                  <Separator />
                </div>
              )}

              <div className="mt-4">
                <h3 className="text-lg font-medium mb-4">Add New Address</h3>
                <AddressForm />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <CreditCard className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">No payment methods saved yet</p>
                <Button className="mt-4" variant="outline">
                  Add Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
