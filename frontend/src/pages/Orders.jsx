import axios from "axios";
import { Search, Filter, Eye, MoreHorizontal, ArrowUpDown, Calendar } from 'lucide-react';
import { useState } from "react";
import { useEffect } from 'react';

export const Orders = () => {
  // const orders = [
  //   { id: "#ORD-7829", customer: "Rahul Sharma", date: "Jan 18, 2026", amount: "₹ 4,200", status: "Completed", items: 3 },
  //   { id: "#ORD-7830", customer: "Priya Singh", date: "Jan 18, 2026", amount: "₹ 1,850", status: "Pending", items: 1 },
  //   { id: "#ORD-7831", customer: "Amit Patel", date: "Jan 17, 2026", amount: "₹ 12,400", status: "Processing", items: 8 },
  //   { id: "#ORD-7832", customer: "Sneha Gupta", date: "Jan 17, 2026", amount: "₹ 890", status: "Cancelled", items: 1 },
  //   { id: "#ORD-7833", customer: "Vikram Malhotra", date: "Jan 16, 2026", amount: "₹ 3,500", status: "Completed", items: 2 },
  //   { id: "#ORD-7834", customer: "Anjali Desai", date: "Jan 16, 2026", amount: "₹ 6,200", status: "Completed", items: 4 },
  // ];

  const [orders,setOrders] = useState([]);
  useEffect(()=>{
      const fetchOrders = async()=>{
        try{
          const response = await axios.get("http://localhost:8080/api/order",{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data);
        setOrders(response.data); 
        }catch(err){
          console.error(`error in fecting Orders ${err}`);
        }
       }
    fetchOrders();
},[]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
          <p className="text-slate-500">Track and manage your customer orders</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white text-slate-600 rounded-lg border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all flex items-center shadow-sm">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 Days
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 transition-all shadow-md">
            Create Order
          </button>
        </div>
      </div>

      {/* Tabs & Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-slate-200 pb-4">
        <div className="flex gap-6 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
          {['All Orders', 'Pending', 'Processing', 'Completed', 'Cancelled'].map((tab, i) => (
            <button key={tab} className={`text-sm font-medium whitespace-nowrap transition-colors ${i === 0 ? 'text-blue-600 border-b-2 border-blue-600 pb-4 -mb-4.5' : 'text-slate-500 hover:text-slate-900 pb-4'}`}>
              {tab}
            </button>
          ))}
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-900 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer number</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{order.orderId}</td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    {/* <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                      {order.customer.charAt(0)}
                    </div> */}
                    {order.buyerPhone}
                  </td>
                  <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{order.items.length} items</td>
                  <td className="px-6 py-4 font-medium text-slate-800">{order.totalAmount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${order.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        order.status === 'processing' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                          order.status === 'cancelled' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                            'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-lg text-slate-400 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
