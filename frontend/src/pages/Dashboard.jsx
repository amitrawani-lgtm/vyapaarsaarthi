import { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, IndianRupee, ShoppingBag, Package, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';
import api from '../api/axios';

import Box from '@mui/material/Box';
import { BarChart } from '@mui/x-charts/BarChart';


const StatCard = ({ title, value, change, trend, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
            <div className={cn("p-3 rounded-xl", color)}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            {trend === 'up' ? (
                <div className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full text-xs font-medium">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    {change}
                </div>
            ) : (
                <div className="flex items-center text-rose-600 bg-rose-50 px-2 py-1 rounded-full text-xs font-medium">
                    <ArrowDownRight className="w-3 h-3 mr-1" />
                    {change}
                </div>
            )}
        </div>
        <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
    </div>
);

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalSales: 0,
        activeOrders: 0,
        lowInventory: 0,
        netProfit: 0,
        recentOrders: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/dashboard/stats');
                setStats(res.data);
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const Profit = [600,650,620,700,780,stats.netProfit];
     const Revenue = [6500,7200,  6800,  7500,  8200,stats.totalSales];
      const xLabels = [
    'SUN',
    'MON',
    'TUE',
    'WED',
    'THR',
    'FRI',
    'SAT',
     ];

    if (loading) {
        return <div className="flex justify-center items-center h-full"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
    }

    return (
        <div className="space-y-8">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-8 text-white shadow-xl shadow-indigo-500/20">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Namaste! 🙏</h1>
                    <p className="text-indigo-100 text-lg opacity-90">Here is your business overview for today.</p>
                    <div className="flex space-x-4 mt-6">
                        <button className="bg-white text-indigo-600 px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-indigo-50 transition-colors shadow-lg">
                            Create New Order
                        </button>
                        <button className="bg-white/20 backdrop-blur text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-white/30 transition-colors border border-white/20">
                            Scan Inventory
                        </button>
                    </div>
                </div>
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-40 h-40 bg-indigo-500/30 rounded-full blur-2xl"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Sales"
                    value={`₹${stats.totalSales.toLocaleString()}`}
                    change="+12.5%"
                    trend="up"
                    icon={IndianRupee}
                    color="bg-emerald-500"
                />
                <StatCard
                    title="Active Orders"
                    value={stats.activeOrders}
                    change="+3"
                    trend="up"
                    icon={ShoppingBag}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Low Inventory"
                    value={`${stats.lowInventory} Items`}
                    change="-2"
                    trend="down"
                    icon={Package}
                    color="bg-amber-500"
                />
                <StatCard
                    title="Net Profit"
                    value={`₹${stats.netProfit.toLocaleString()}`}
                    change="+8.2%"
                    trend="up"
                    icon={TrendingUp}
                    color="bg-violet-500"
                />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-slate-900">
                Sale Analytics
                </h3>
            </div>

          {/* CSS Bar Chart Simulation */}
          <Box sx={{ width: '100%', height: 300 }}>
          <BarChart
           series={[
          { data: Revenue, label: 'Revenue', id: 'pvId' },
          { data: Profit, label: 'Profit', id: 'uvId' },
          ]}
            xAxis={[{ data: xLabels, height: 28 }]}
            yAxis={[{ width: 50 }]}
          />
          </Box>
       </div>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Orders</h3>
                    <div className="space-y-4">
                        {stats.recentOrders.length > 0 ? (
                            stats.recentOrders.map((order) => (
                                <div key={order._id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer group">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                                            #{order._id.toString().slice(-4)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                                                {order.status}
                                            </p>
                                            <p className="text-xs text-slate-500">{new Date(order.createdAt).toLocaleTimeString()}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm font-bold text-slate-800">₹{order.totalAmount}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-slate-500 text-center py-4">No recent orders</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
