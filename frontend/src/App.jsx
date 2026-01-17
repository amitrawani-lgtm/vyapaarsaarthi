import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import CommandCenter from "./pages/CommandCenter";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

// Placeholder components
const Orders = () => (
  <div className="p-10 text-xl text-slate-500 text-center">
    📦 Orders Management Coming Soon...
  </div>
);
const Inventory = () => (
  <div className="p-10 text-xl text-slate-500 text-center">
    📋 Inventory Tracking Coming Soon...
  </div>
);
const Analytics = () => (
  <div className="p-10 text-xl text-slate-500 text-center">
    📊 Analytics Dashboard Coming Soon...
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* App Routes wrapped in MainLayout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/command" element={<CommandCenter />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
