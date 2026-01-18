import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, ArrowRight } from "lucide-react";
import api from "../api/axios";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    businessName: "",
    city: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = isLogin ? "/auth/login" : "/auth/register";
    const dataToSend = isLogin
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const res = await api.post(endpoint, dataToSend);
      const data = res.data;
      localStorage.setItem("token", data.token);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Left: Form */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-8 lg:p-12 order-2 lg:order-1">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h1 className="text-2xl font-bold flex items-center gap-2 text-blue-600 mb-8">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-lg font-bold">V</div>
              VyapaarSaarthi
            </h1>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              {isLogin ? "Welcome Back" : "Create an Account"}
            </h2>
            <p className="text-slate-500">
              {isLogin ? "Please enter your details." : "Join now to streamline your experience from day one."}
            </p>
          </div>

          {error && (
            <div className="bg-rose-50 text-rose-600 p-4 rounded-xl text-sm font-medium mb-6 border border-rose-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <InputGroup label="Full Name" placeholder="Roger Gerrard" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                <InputGroup label="Business Name" placeholder="SelloStore" value={formData.businessName} onChange={(e) => setFormData({ ...formData, businessName: e.target.value })} />
                <InputGroup label="City" placeholder="Mumbai" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
              </div>
            )}

            <InputGroup label="Email" type="email" placeholder="name@company.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <InputGroup label="Password" type="password" placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 mt-4"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (isLogin ? "Login" : "Register")}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 font-semibold hover:underline"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </div>
          <p className="mt-12 text-xs text-center text-slate-400">© 2026 VyapaarSaarthi Enterprises LTD.</p>
        </div>
      </div>

      {/* Right: Branding (Solid Blue) */}
      <div className="w-full lg:w-[55%] bg-blue-600 p-12 lg:p-20 flex flex-col justify-center text-white relative overflow-hidden order-1 lg:order-2">
        {/* Background Shapes */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-white blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-xl">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Effortlessly manage your team and operations.
          </h2>
          <p className="text-blue-100 text-lg mb-12">
            Log in to access your CRM dashboard and manage your team.
          </p>

          {/* Mock Dashboard Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
            <div className="flex gap-4 mb-6">
              <div className="flex-1 bg-white/20 h-24 rounded-xl p-4">
                <div className="w-8 h-8 bg-blue-500 rounded-lg mb-2"></div>
                <div className="h-4 w-12 bg-white/30 rounded mb-1"></div>
                <div className="h-6 w-20 bg-white rounded"></div>
              </div>
              <div className="flex-1 bg-white/20 h-24 rounded-xl p-4">
                <div className="w-8 h-8 bg-purple-500 rounded-lg mb-2"></div>
                <div className="h-4 w-12 bg-white/30 rounded mb-1"></div>
                <div className="h-6 w-20 bg-white rounded"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-10 bg-white/10 rounded-lg w-full"></div>
              <div className="h-10 bg-white/5 rounded-lg w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputGroup({ label, type = "text", placeholder, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
      <input
        type={type}
        required
        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
