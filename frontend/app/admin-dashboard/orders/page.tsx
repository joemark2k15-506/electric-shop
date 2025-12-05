// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import { getAdminOrders, updateOrderStatus } from "@/lib/api"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Badge } from "@/components/ui/badge"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Loader2, Search, Eye, AlertCircle } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
// import { format } from "date-fns"

// interface Order {
//   _id: string
//   user: {
//     name: string
//     email: string
//   }
//   total: number
//   status: string
//   isPaid: boolean
//   isDelivered: boolean
//   createdAt: string
// }

// export default function AdminOrders() {
//   const [orders, setOrders] = useState<Order[]>([])
//   const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [error, setError] = useState<string | null>(null)
//   const router = useRouter()
//   const { toast } = useToast()

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         setIsLoading(true)
//         const { data } = await getAdminOrders()
//         setOrders(data)
//         setFilteredOrders(data)
//       } catch (err: any) {
//         setError(err.message || "Failed to load orders")
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchOrders()
//   }, [])

//   useEffect(() => {
//     if (searchTerm) {
//       const filtered = orders.filter(
//         (order) =>
//           order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           order.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           order._id.toLowerCase().includes(searchTerm.toLowerCase()),
//       )
//       setFilteredOrders(filtered)
//     } else {
//       setFilteredOrders(orders)
//     }
//   }, [searchTerm, orders])

//   const handleStatusChange = async (orderId: string, status: string) => {
//     try {
//       await updateOrderStatus(orderId, status)

//       // Update local state
//       setOrders(
//         orders.map((order) =>
//           order._id === orderId
//             ? {
//                 ...order,
//                 status,
//                 isDelivered: status === "delivered" ? true : order.isDelivered,
//               }
//             : order,
//         ),
//       )

//       toast({
//         title: "Order Updated",
//         description: `Order status changed to ${status}`,
//       })
//     } catch (err: any) {
//       toast({
//         title: "Error",
//         description: err.message || "Failed to update order status",
//         variant: "destructive",
//       })
//     }
//   }

//   const getStatusBadgeVariant = (status: string) => {
//     switch (status) {
//       case "pending":
//         return "secondary"
//       case "processing":
//         return "primary"
//       case "shipped":
//         return "default"
//       case "delivered":
//         return "success"
//       case "cancelled":
//         return "destructive"
//       default:
//         return "outline"
//     }
//   }

//   if (isLoading) {
//     return (
//       <div className="flex h-full items-center justify-center">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="flex h-full items-center justify-center">
//         <div className="text-center">
//           <AlertCircle className="mx-auto h-8 w-8 text-destructive" />
//           <h3 className="mt-2 text-lg font-semibold">Error Loading Orders</h3>
//           <p className="text-muted-foreground">{error}</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div>
//       <h1 className="mb-6 text-3xl font-bold">Orders</h1>

//       <Card>
//         <CardHeader>
//           <CardTitle>Order Management</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="mb-4">
//             <div className="relative">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search orders..."
//                 className="pl-8"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="rounded-md border">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Order ID</TableHead>
//                   <TableHead>Customer</TableHead>
//                   <TableHead>Date</TableHead>
//                   <TableHead>Total</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Payment</TableHead>
//                   <TableHead>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredOrders.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={7} className="h-24 text-center">
//                       No orders found.
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredOrders.map((order) => (
//                     <TableRow key={order._id}>
//                       <TableCell className="font-medium">{order._id.substring(0, 8)}...</TableCell>
//                       <TableCell>
//                         <div>
//                           <div>{order.user.name}</div>
//                           <div className="text-sm text-muted-foreground">{order.user.email}</div>
//                         </div>
//                       </TableCell>
//                       <TableCell>{format(new Date(order.createdAt), "MMM d, yyyy")}</TableCell>
//                       <TableCell>${order.total.toFixed(2)}</TableCell>
//                       <TableCell>
//                         <Select value={order.status} onValueChange={(value) => handleStatusChange(order._id, value)}>
//                           <SelectTrigger className="w-[130px]">
//                             <SelectValue>
//                               <Badge variant={getStatusBadgeVariant(order.status)}>
//                                 {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                               </Badge>
//                             </SelectValue>
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="pending">Pending</SelectItem>
//                             <SelectItem value="processing">Processing</SelectItem>
//                             <SelectItem value="shipped">Shipped</SelectItem>
//                             <SelectItem value="delivered">Delivered</SelectItem>
//                             <SelectItem value="cancelled">Cancelled</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </TableCell>
//                       <TableCell>
//                         <Badge variant={order.isPaid ? "success" : "outline"}>{order.isPaid ? "Paid" : "Unpaid"}</Badge>
//                       </TableCell>
//                       <TableCell>
//                         <Button variant="outline" size="icon" onClick={() => router.push(`/admin/orders/${order._id}`)}>
//                           <Eye className="h-4 w-4" />
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }



"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAdminOrders, updateOrderStatus } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Search, Eye, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Order {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  total: number;
  status: string;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const { data } = await getAdminOrders();
        setOrders(data);
        setFilteredOrders(data);
      } catch (err: any) {
        setError(err.message || "Failed to load orders");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = orders.filter(
        (order) =>
          order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order._id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  }, [searchTerm, orders]);

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      await updateOrderStatus(orderId, status);

      setOrders(
        orders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                status,
                isDelivered: status === "delivered" ? true : order.isDelivered,
              }
            : order
        )
      );

      toast({
        title: "Order Updated",
        description: `Order status changed to ${status}`,
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to update order status",
        variant: "destructive",
      });
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "processing":
      case "shipped":
      case "delivered":
        return "default";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-8 w-8 text-destructive" />
          <h3 className="mt-2 text-lg font-semibold">Error Loading Orders</h3>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Orders</h1>

      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No orders found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium">{order._id.substring(0, 8)}...</TableCell>
                      <TableCell>
                        <div>
                          <div>{order.user.name}</div>
                          <div className="text-sm text-muted-foreground">{order.user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{format(new Date(order.createdAt), "MMM d, yyyy")}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Select
                          value={order.status}
                          onValueChange={(value) => handleStatusChange(order._id, value)}
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Badge variant={order.isPaid ? "default" : "outline"}>
                          {order.isPaid ? "Paid" : "Unpaid"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="icon" onClick={() => router.push(`/admin/orders/${order._id}`)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
