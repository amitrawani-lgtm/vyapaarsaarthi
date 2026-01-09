import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2, MessageSquare, Shield } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen bg-slate-900 text-white selection:bg-indigo-500 selection:text-white">
            {/* Navbar */}
            <nav className="border-b border-slate-800 backdrop-blur-md fixed w-full z-50 bg-slate-900/80">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                        VyapaarSaarthi
                    </div>
                    <div className="flex items-center space-x-6">
                        <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                            Login
                        </Link>
                        <Link
                            to="/login" // Or /signup if you have it
                            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-full text-sm font-semibold transition-all shadow-lg shadow-indigo-500/20"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-8">
                            Smart Business Automation for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">MSMEs</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed">
                            Manage inventory, track orders, and get AI-powered insights using just your voice.
                            The intelligent assistant your business deserves.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/login"
                                className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-slate-50 transition-all flex items-center"
                            >
                                Start Free Trial
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                            <button className="px-8 py-4 bg-slate-800 text-white rounded-full font-bold text-lg hover:bg-slate-700 transition-all border border-slate-700">
                                Watch Demo
                            </button>
                        </div>
                    </div>
                </div>

                {/* Background Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-3xl opacity-30 -z-10 animate-pulse"></div>
            </div>

            {/* Features Grid */}
            <div className="py-24 bg-slate-900 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12">
                        <FeatureCard
                            icon={<MessageSquare className="w-8 h-8 text-indigo-400" />}
                            title="Voice Command Center"
                            description="Speak naturally to manage your business. 'Add 50 boxes of soap' is all you need to say."
                        />
                        <FeatureCard
                            icon={<BarChart2 className="w-8 h-8 text-cyan-400" />}
                            title="Real-time Analytics"
                            description="Get instant insights on sales, inventory trends, and profit margins without complex spreadsheets."
                        />
                        <FeatureCard
                            icon={<Shield className="w-8 h-8 text-emerald-400" />}
                            title="Secure & Private"
                            description="Your business data is encrypted and secure. Access it from anywhere, anytime."
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-12 border-t border-slate-800 text-center text-slate-500">
                <p>&copy; 2026 VyapaarSaarthi. Built for India's Growth.</p>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="p-8 rounded-3xl bg-slate-800/50 border border-slate-700 hover:border-indigo-500/50 transition-all hover:bg-slate-800 group">
            <div className="mb-6 p-4 rounded-2xl bg-slate-900 inline-block group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
            <p className="text-slate-400 leading-relaxed">
                {description}
            </p>
        </div>
    );
}
