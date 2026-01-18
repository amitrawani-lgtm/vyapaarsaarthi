import { Search, Filter, Plus, MoreHorizontal, AlertCircle, ArrowUpDown, Download } from 'lucide-react';

export default function Inventory() {
    const products = [
        { id: 1, name: "Premium Wireless Headphones", category: "Electronics", price: "₹ 2,499", stock: 45, status: "In Stock" },
        { id: 2, name: "Ergonomic Office Chair", category: "Furniture", price: "₹ 8,999", stock: 12, status: "In Stock" },
        { id: 3, name: "Organic Green Tea", category: "Groceries", price: "₹ 450", stock: 8, status: "Low Stock" },
        { id: 4, name: "Smart Fitness Watch", category: "Electronics", price: "₹ 3,299", stock: 0, status: "Out of Stock" },
        { id: 5, name: "Running Shoes", category: "Footwear", price: "₹ 1,899", stock: 25, status: "In Stock" },
        { id: 6, name: "Ceramic Coffee Mug Set", category: "Home & Kitchen", price: "₹ 899", stock: 150, status: "In Stock" },
        { id: 7, name: "Bluetooth Speaker", category: "Electronics", price: "₹ 1,299", stock: 5, status: "Low Stock" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Inventory</h1>
                    <p className="text-slate-500">Manage your products and stock levels</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white text-slate-600 rounded-lg border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all flex items-center shadow-sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 transition-all flex items-center shadow-md">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Product
                    </button>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-xl flex flex-col sm:flex-row gap-4 justify-between border border-slate-100 shadow-sm">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all"
                    />
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white text-slate-600 border border-slate-200 rounded-lg flex items-center hover:bg-slate-50 transition-all">
                        <Filter className="w-4 h-4 mr-2" />
                        Filters
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-slate-900 uppercase font-semibold border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Product Name</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Stock</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900">{product.name}</td>
                                    <td className="px-6 py-4">{product.category}</td>
                                    <td className="px-6 py-4 font-medium">{product.price}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {product.stock}
                                            {product.stock < 10 && <AlertCircle className="w-4 h-4 text-amber-500" />}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${product.status === 'In Stock' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                product.status === 'Low Stock' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                    'bg-rose-50 text-rose-600 border-rose-100'
                                            }`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-sm">
                    <span className="text-slate-500">Showing 1-7 of 45 products</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 bg-white border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50">Previous</button>
                        <button className="px-3 py-1 bg-white border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 hover:text-slate-900">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}