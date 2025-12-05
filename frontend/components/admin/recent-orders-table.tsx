// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Badge } from "@/components/ui/badge"
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
//   createdAt: string
// }

// interface RecentOrdersTableProps {
//   orders: Order[]
// }

// export default function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
//   const getStatusBadgeVariant = (status: string) => {
//     switch (status) {
//       case 'pending':
//         return 'secondary'
//       case 'processing':
//         return 'primary'
//       case 'shipped':
//         return 'default'
//       case 'delivered':
//         return 'success'
//       case 'cancelled':
//         return 'destructive'
//       default:
//         return 'outline'
//     }
//   }

//   return (
//     <div className="rounded-md border">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Order ID</TableHead>
//             <TableHead>Customer</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead>Total</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead>Payment</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {orders.length === 0 ? (
//             <TableRow>
//               <TableCell colSpan={6} className="h-24 text-center">
//                 No recent orders.
//               </TableCell>
//             </TableRow>
//           ) : (
//             orders.map((order) => (
//               <TableRow key={order._id}>
//                 <TableCell className="font-medium">{order._id.substring(0, 8)}...</TableCell>
//                 <TableCell>
//                   <div>
//                     <div>{order.user.name}</div>
//                     <div className="text-sm text-muted-foreground">{order.user.email}</div>
//                   </div>
//                 </TableCell>
//                 <TableCell>{format(new Date(order.createdAt), 'MMM d, yyyy')}</TableCell>
//                 <TableCell>${order.total.toFixed(2)}</TableCell>
//                 <TableCell>
//                   <Badge variant={getStatusBadgeVariant(order.status)}>
//                     {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                   </Badge>
//                 </TableCell>
//                 <TableCell>
//                   <Badge variant={order.isPaid ? "success" : "outline"}>
//                     {order.isPaid ? "Paid" : "Unpaid"}
//                   </Badge>
//                 </TableCell>
//               </TableRow>
//             ))
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   )
// }


import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
  createdAt: string;
}

interface RecentOrdersTableProps {
  orders: Order[];
}

export default function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
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

  return (
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No recent orders.
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
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
                  <Badge variant={getStatusBadgeVariant(order.status)}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={order.isPaid ? "default" : "outline"}>
                    {order.isPaid ? "Paid" : "Unpaid"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
