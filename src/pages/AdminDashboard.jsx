import React, { useState } from "react";
import { Users, ShoppingBag, AlertTriangle, BarChart3, Settings, Layers, LogOut, Bell, Search, Megaphone, ShieldCheck, LayoutDashboard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import AdminOverview from "../components/admin/AdminOverview";
import UserManagement from "../components/admin/UserManagement";
import ListingManagement from "../components/admin/ListingManagement";
import CategoryManagement from "../components/admin/CategoryManagement";
import ReportedListings from "../components/admin/ReportedListings";
import MarketplaceAnalytics from "../components/admin/MarketplaceAnalytics";

import Verifications from "../components/admin/Verifications";
import PlatformSettings from "../components/admin/PlatformSettings";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogout = () => {
    navigate("/admin/login");
  };

  const navItems = [
    { id: "dashboard", label: "Overview", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 className="w-5 h-5" /> },
    { id: "reports", label: "Reports", icon: <AlertTriangle className="w-5 h-5" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-5 h-5" /> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminOverview />;
      case "users":
        return <UserManagement />;
      case "listings":
        return <ListingManagement />;
      case "categories":
        return <CategoryManagement />;
      case "reports":
        return <ReportedListings />;
      case "analytics":
        return <MarketplaceAnalytics />;

      case "verifications":
        return <Verifications />;
      case "settings":
        return <PlatformSettings />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col h-screen flex-shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-slate-100 flex-shrink-0">
          <Link to="/" className="font-extrabold text-2xl text-slate-900 tracking-tight flex items-center gap-2">
            <span className="bg-theme-maroon text-white p-1.5 rounded-lg text-sm">Admin</span>
            <span>
              Campus<span className="text-theme-maroon">Bazar</span>
            </span>
          </Link>
        </div>

        <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Menu</div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === item.id ? "bg-theme-maroon text-white shadow-md shadow-theme-maroon/20 font-medium" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}>
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-slate-100 flex-shrink-0">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all font-medium">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 flex-shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-800 capitalize">{navItems.find((i) => i.id === activeTab)?.label || "Dashboard"}</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
              <div className="w-9 h-9 bg-theme-dark-maroon rounded-full flex items-center justify-center text-white font-bold shadow-sm">A</div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-slate-800 leading-tight">Admin User</p>
                <p className="text-xs text-slate-500">Superadmin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 bg-slate-50">{renderContent()}</div>
      </main>
    </div>
  );
};

export default AdminDashboard;
