import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, LogIn } from "lucide-react";
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

    // Send only relevant fields based on mode
    const dataToSend = isLogin
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const res = await api.post(endpoint, dataToSend);

      const data = res.data;

      // Success
      localStorage.setItem("token", data.token);
      // Optionally store user info if needed elsewhere
      localStorage.setItem("userInfo", JSON.stringify(data));

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            VyapaarSaarthi
          </h1>
          <p className="text-slate-400">
            {isLogin ? "Welcome back, Entrepreneur!" : "Join the revolution"}
          </p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
          )}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-1">
                Business Name
              </label>
              <input
                type="text"
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="Your Business Name"
                value={formData.businessName}
                onChange={(e) =>
                  setFormData({ ...formData, businessName: e.target.value })
                }
              />
            </div>
          )}

          {!isLogin && (
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-1">
                City
              </label>
              <input
                type="text"
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="Your City"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center"
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : isLogin ? (
              "Login"
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-400 hover:text-white text-sm transition-colors"
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
