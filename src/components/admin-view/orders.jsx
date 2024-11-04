import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import axios from "axios";

function AdminOrdersView() {
  const [orderList, setOrderList] = useState([]);

  // Fetch all orders from the API
  const fetchOrders = async () => {
    try {
      const response = await axios.get("https://ravel-be.vercel.app/api/shop/order/get");
      setOrderList(response.data); // Assume response data is an array of orders
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Date</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Cart Items</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow key={orderItem._id}>
                    <TableCell>{new Date(orderItem.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {orderItem.address.address}, {orderItem.address.city}, {orderItem.address.pincode}
                      <br />
                      Phone: {orderItem.address.phone}
                      <br />
                      Notes: {orderItem.address.notes}
                    </TableCell>
                    <TableCell>
                      <ul>
                        {orderItem.cartItems.map((item) => (
                          <li key={item.productId} className="flex items-center">
                            <img src={item.img} alt={item.title} className="w-20 h-20 object-cover mr-2" />
                            <span>{item.title} - ${item.price} (x{item.quantity})</span>
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                  </TableRow>
                ))
              : <TableRow><TableCell colSpan={3}>No orders found.</TableCell></TableRow>}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;
