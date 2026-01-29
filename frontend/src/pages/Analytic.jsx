import {
  Calendar,
  DollarSign,
  Users,
  ShoppingBag,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import Box from '@mui/material/Box';
import { BarChart } from '@mui/x-charts/BarChart';

const Profit = [600,650,620,700,780,1050,850];
const Revenue = [6500,7200,  6800,  7500,  8200,  11000, 9000 ];
const xLabels = [
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
  'SUN',
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Analytics Dashboard
          </h1>
          <p className="text-slate-500">
            Real-time insights on your business performance
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white text-slate-600 rounded-lg border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all flex items-center shadow-sm">
            <Calendar className="w-4 h-4 mr-2" />
            Last 7 Days
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 transition-all shadow-md">
            Download Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="₹ 1,24,500"
          change="+12.5%"
          icon={DollarSign}
          positive={true}
          color="bg-indigo-50 text-indigo-600"
        />
        <StatCard
          title="Total Orders"
          value="1,482"
          change="+5.2%"
          icon={ShoppingBag}
          positive={true}
          color="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="New Customers"
          value="342"
          change="+18.7%"
          icon={Users}
          positive={true}
          color="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          title="Growth Rate"
          value="24.5%"
          change="-2.1%"
          icon={TrendingUp}
          positive={false}
          color="bg-amber-50 text-amber-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Revenue Overview
            </h3>
            <select className="bg-slate-50 border border-slate-200 text-slate-600 text-sm rounded-lg focus:ring-0 cursor-pointer p-2 outline-none">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
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

        {/* Top Products / Doughnut */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">
            Top Categories
          </h3>

          <div className="flex justify-center mb-6">
            <div className="w-48 h-48 rounded-full border-[1.5rem] border-slate-100 relative flex items-center justify-center">
              {/* Simple CSS simulated conic sections */}
              <div className="absolute inset-0 rounded-full border-[1.5rem] border-blue-500/80 border-r-transparent border-b-transparent transform rotate-45"></div>
              <div className="absolute inset-0 rounded-full border-[1.5rem] border-purple-500/80 border-l-transparent border-t-transparent border-r-transparent transform -rotate-12"></div>

              <div className="text-center">
                <span className="block text-2xl font-bold text-slate-900">
                  4.2k
                </span>
                <span className="text-xs text-slate-500">Total Sales</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <CategoryLegend
              label="Electronics"
              value="45%"
              color="bg-blue-500"
            />
            <CategoryLegend
              label="Home & Kitchen"
              value="30%"
              color="bg-purple-500"
            />
            <CategoryLegend
              label="Fashion"
              value="15%"
              color="bg-emerald-500"
            />
            <CategoryLegend label="Others" value="10%" color="bg-slate-300" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title = "—",
  value = "-",
  change = null,
  icon: Icon,
  positive = true,
  color = "bg-slate-100 text-slate-600",
}) {
  const displayValue =
    typeof value === "number"
      ? new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(
          value,
        )
      : (value ?? "-");

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-all cursor-default group shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div
          className={`p-3 rounded-xl ${color} opacity-90 group-hover:opacity-100 transition-opacity`}
        >
          {Icon ? (
            <Icon className="w-6 h-6" />
          ) : (
            <div className="w-6 h-6 rounded bg-slate-200" aria-hidden />
          )}
        </div>

        {/* only render change when provided (avoids showing "undefined") */}
        {change ? (
          <div
            className={`flex items-center text-sm font-medium ${positive ? "text-emerald-600" : "text-rose-600"}`}
          >
            {positive ? (
              <ArrowUpRight className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDownRight className="w-4 h-4 mr-1" />
            )}
            {change}
          </div>
        ) : null}
      </div>

      <h3 className="text-slate-500 font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-slate-900 tracking-tight">
        {displayValue}
      </p>
    </div>
  );
}

function CategoryLegend({ label = "—", value = "0%", color = "bg-slate-300" }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${color}`} />
        <span className="text-sm text-slate-600 font-medium">{label}</span>
      </div>
      <span className="text-sm text-slate-500">{value}</span>
    </div>
  );
}
