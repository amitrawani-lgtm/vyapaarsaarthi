import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, MessageSquare, Package, BarChart2, Settings, LogOut, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import api from '../../api/axios';

export default function Sidebar() {
    const location = useLocation();

    const links = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Command Center', href: '/command', icon: MessageSquare },
        { name: 'Orders', href: '/orders', icon: ShoppingCart },
        { name: 'Inventory', href: '/inventory', icon: Package },
        { name: 'Analytics', href: '/analytics', icon: BarChart2 },
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        window.location.href = '/login';
        api.post('/auth/logout').catch(console.error);
    };

    return (
        <div className="flex flex-col h-screen w-64 bg-white border-r border-slate-200 shadow-sm z-20">
            <div className="flex items-center justify-center h-20 border-b border-slate-100">
                <h1 className="text-2xl font-bold flex items-center gap-2 text-blue-600">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-lg">
                        <Package className="w-5 h-5 text-white" />
                    </div>
                    Vyapaar
                </h1>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.href;
                    return (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={cn(
                                "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                                isActive
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <div className="flex items-center">
                                <Icon className={cn("w-5 h-5 mr-3 transition-colors", isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600")} />
                                {link.name}
                            </div>
                            {isActive && <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-100">
                <Link
                    to="/settings"
                    className="flex items-center px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors mb-2"
                >
                    <Settings className="w-5 h-5 mr-3 text-slate-400" />
                    Settings
                </Link>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium text-rose-500 hover:bg-rose-50 transition-colors"
                >
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                </button>
            </div>
        </div>
    );
}
