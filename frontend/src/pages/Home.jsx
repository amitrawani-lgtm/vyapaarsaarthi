import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2, Zap, Shield, MessageSquare, Briefcase } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
            {/* Navbar */}
            <nav className="border-b border-transparent fixed w-full z-50 bg-white/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                            <Briefcase className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold text-slate-900">VyapaarSaarthi</span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Features</a>
                        <a href="#benefits" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Benefits</a>
                        <a href="#pricing" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Pricing</a>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link to="/login" className="text-sm font-medium text-slate-900 hover:text-blue-600 transition-colors">
                            Login
                        </Link>
                        <Link
                            to="/login"
                            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-semibold transition-all shadow-lg shadow-blue-500/20"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative pt-40 pb-20 sm:pt-48 sm:pb-32 overflow-hidden">
                <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center justify-center px-4 py-1.5 mb-8 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-100">
                        <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
                        Trusted by 10,000+ MSMEs
                    </div>

                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 text-slate-900 leading-tight">
                        Turn Scattered Data Into <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Smart Decisions</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                        One simple dashboard to track your inventory, orders, and sales growth—without the chaos of spreadsheets.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
                        <Link
                            to="/login"
                            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/25 w-full sm:w-auto"
                        >
                            Get Started For Free
                        </Link>
                        <div className="flex items-center text-sm text-slate-500 gap-2">
                            <CreditCardIcon className="w-5 h-5 text-slate-400" />
                            No credit card required
                        </div>
                    </div>

                    {/* Floating Icons (Simulating the reference image) */}
                    <FloatingIcon icon={BarChart2} className="top-10 left-10 md:top-20 md:left-20 rotate-[-6deg] bg-white text-cyan-500" delay="0s" />
                    <FloatingIcon icon={Zap} className="top-20 right-10 md:top-32 md:right-24 rotate-[12deg] bg-white text-amber-500" delay="1s" />
                    <FloatingIcon icon={Shield} className="bottom-20 left-10 md:bottom-32 md:left-32 rotate-[4deg] bg-white text-emerald-500" delay="2s" />
                    <FloatingIcon icon={MessageSquare} className="bottom-10 right-10 md:bottom-20 md:right-40 rotate-[-8deg] bg-white text-indigo-500" delay="3s" />
                </div>

                {/* Dashboard Preview (Fade out effect) */}
                <div className="max-w-6xl mx-auto px-6 relative mt-10">
                    <div className="rounded-3xl bg-slate-50 p-4 shadow-2xl border border-slate-200">
                        {/* Abstract representation of dashboard */}
                        <div className="bg-white rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] relative flex shadow-inner">
                            {/* Mock Sidebar */}
                            <div className="w-16 sm:w-56 hidden sm:block border-r border-slate-100 p-4 bg-white z-10">
                                <div className="flex items-center gap-2 mb-8 px-2">
                                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">A</div>
                                    <span className="font-bold text-slate-800 text-lg hidden lg:block">Alytics</span>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium">
                                        <div className="w-4 h-4 bg-current rounded-sm opacity-50"></div>
                                        <span className="hidden lg:block">Dashboard</span>
                                    </div>
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="flex items-center gap-3 px-3 py-2 text-slate-400 rounded-lg text-sm">
                                            <div className="w-4 h-4 border border-slate-200 rounded-sm"></div>
                                            <div className="h-2 w-16 bg-slate-100 rounded hidden lg:block"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Mock Content */}
                            <div className="flex-1 bg-slate-50/50 p-4 sm:p-8 overflow-hidden flex flex-col gap-4 sm:gap-6">
                                {/* Header */}
                                <div className="flex justify-between items-center">
                                    <div className="h-8 w-32 sm:w-64 bg-white border border-slate-200 rounded-lg shadow-sm"></div>
                                    <div className="h-8 w-8 bg-white border border-slate-200 rounded-full shadow-sm"></div>
                                </div>

                                {/* Top Row Stats */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                                    {/* Card 1: Revenue */}
                                    <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                                        <div className="text-sm text-slate-500 font-medium mb-2">Revenues</div>
                                        <div className="flex items-end gap-2 mb-2">
                                            <div className="text-3xl sm:text-4xl font-bold text-slate-800">15%</div>
                                            <div className="mb-1 text-blue-500">↗</div>
                                        </div>
                                        <div className="text-xs text-slate-400">Increase compared to last week</div>
                                        <div className="mt-4 flex items-center text-xs text-blue-500 font-medium">
                                            Revenues report →
                                        </div>
                                    </div>
                                    {/* Card 2: Lost Deals */}
                                    <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                                        <div className="text-sm text-slate-500 font-medium mb-2">Lost deals</div>
                                        <div className="flex items-end gap-2 mb-2">
                                            <div className="text-3xl sm:text-4xl font-bold text-slate-800">4%</div>
                                        </div>
                                        <div className="text-xs text-slate-400">You closed 96 out of 100 deals</div>
                                        <div className="mt-4 flex items-center text-xs text-blue-500 font-medium">
                                            All deals →
                                        </div>
                                    </div>
                                    {/* Card 3: Quarter Goal (Gauge) */}
                                    <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center justify-center relative">
                                        <div className="text-sm text-slate-500 font-medium absolute top-5 left-5">Quarter goal</div>
                                        <div className="mt-4 relative w-32 h-16 overflow-hidden">
                                            <div className="absolute top-0 left-0 w-32 h-32 rounded-full border-[10px] border-slate-100"></div>
                                            <div className="absolute top-0 left-0 w-32 h-32 rounded-full border-[10px] border-blue-500 border-b-transparent border-l-transparent transform -rotate-45"></div>
                                        </div>
                                        <div className="text-2xl font-bold text-slate-800 -mt-8">84%</div>
                                        <div className="mt-4 text-xs text-blue-500 font-medium">All goals →</div>
                                    </div>
                                </div>

                                {/* Bottom Row: Customers & Growth */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 flex-1">
                                    {/* Customers */}
                                    <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                                        <div className="flex justify-between mb-4">
                                            <div className="text-sm text-slate-800 font-bold">Customers</div>
                                            <div className="text-xs text-slate-400">Sort by Newest</div>
                                        </div>
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="flex items-center gap-3 mb-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                                                <div className="flex-1">
                                                    <div className="h-2 w-20 bg-slate-800 rounded mb-1"></div>
                                                    <div className="h-2 w-12 bg-slate-200 rounded"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {/* Growth Chart */}
                                    <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col">
                                        <div className="flex justify-between mb-4">
                                            <div className="text-sm text-slate-800 font-bold">Growth</div>
                                            <div className="text-xs text-slate-400">Yearly</div>
                                        </div>
                                        <div className="flex-1 flex items-end">
                                            {/* Simulated Area Chart */}
                                            <div className="w-full h-32 relative overflow-hidden">
                                                <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full">
                                                    <defs>
                                                        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                                                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                                                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                                        </linearGradient>
                                                    </defs>
                                                    <path d="M0,40 L0,30 Q25,10 50,25 T100,20 L100,40 Z" fill="url(#gradient)" />
                                                    <path d="M0,30 Q25,10 50,25 T100,20" fill="none" stroke="#3b82f6" strokeWidth="1" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FloatingIcon({ icon: Icon, className, delay }) {
    return (
        <div
            className={`absolute hidden md:flex w-16 h-16 rounded-2xl shadow-xl border border-slate-100 items-center justify-center animate-bounce ${className}`}
            style={{ animationDuration: '3s', animationDelay: delay }}
        >
            <Icon className="w-8 h-8" />
        </div>
    );
}

function CreditCardIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
    )
}
