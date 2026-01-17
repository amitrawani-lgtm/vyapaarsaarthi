import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, MessageSquare, Package, BarChart2, Settings, Mic, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';
import api from '../../api/axios';

export default function Sidebar() {
    const location = useLocation();

    const links = [
        { name: 'Dashboard', href: '/', icon: LayoutDashboard },
        { name: 'Command Center', href: '/command', icon: MessageSquare }, // Chat
        { name: 'Orders', href: '/orders', icon: ShoppingCart },
        { name: 'Inventory', href: '/inventory', icon: Package },
        { name: 'Analytics', href: '/analytics', icon: BarChart2 },
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        window.location.href = '/login';

        // Optional: Call backend to log out (fire and forget as it is stateless now)
        api.post('/auth/logout').catch(console.error);
    };

    return (
        <div className="flex flex-col h-screen w-64 bg-slate-900 text-slate-100 border-r border-slate-800">
            <div className="flex items-center justify-center h-20 border-b border-slate-800">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    VyapaarSaarthi
                </h1>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.href;
                    return (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={cn(
                                "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                            )}
                        >
                            <Icon className="w-5 h-5 mr-3" />
                            {link.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <Link
                    to="/settings"
                    className="flex items-center px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                    <Settings className="w-5 h-5 mr-3" />
                    Settings
                </Link>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-900/20 transition-colors mt-1"
                >
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                </button>
            </div>
        </div>
    );
}
