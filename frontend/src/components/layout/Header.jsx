import { Bell, Search, User, UserStar } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
    const userInfoStr = localStorage.getItem("userInfo");
    const userInfo = userInfoStr ? JSON.parse(userInfoStr) : { name: "User" };
    const [name,setName] = useState(userInfo.name);
    return (
        <header className="h-16 px-8 flex items-center justify-between bg-white border-b border-slate-200 sticky top-0 z-10 transition-all">
            <div className="flex items-center">
                {/* Placeholder for page title or breadcrumbs */}
                <h2 className="text-xl font-semibold text-slate-800">Overview</h2>
            </div>

            <div className="flex items-center items-end space-x-6">
                <div className="relative">
                    <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 rounded-full border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm w-64 transition-all placeholder:text-slate-400"
                    />
                </div>

                <button className="relative p-2 rounded-full hover:bg-slate-100 transition-colors">
                    <Bell className="w-5 h-5 text-slate-500 hover:text-slate-900" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="flex items-center space-x-3 pl-6 border-l border-slate-200">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-medium text-slate-900">{name}</p>
                        <p className="text-xs text-slate-500">User</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold ring-2 ring-white">
                        {name.charAt(0)}
                    </div>
                </div>
            </div>
        </header>
    );
}
