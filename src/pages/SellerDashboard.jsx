import React, { useState } from 'react';
import { 
  Home, Search, PlusCircle, Bell, MessageSquare, Heart, 
  ShoppingBag, Settings, LogOut, ChevronRight, TrendingUp,
  Tag, MapPin, Eye, Star, Clock, CheckCircle, Package, User, ShoppingCart, ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SellerOverview from '../components/seller/SellerOverview';
import PostListing from '../components/seller/PostListing';

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const { user, role, logout, switchRole } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: Home },
    { id: 'post', label: 'Post New Listing', icon: PlusCircle },
    { id: 'listings', label: 'My Listings', icon: Package },
    { id: 'buyers', label: 'Interested Buyers', icon: Eye },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 3 },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-slate-100">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 bg-theme-maroon rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-theme-maroon/30">
              <ShoppingCart className="text-white w-6 h-6" />
            </div>
            <span className="font-extrabold text-2xl text-slate-900 tracking-tight">Campus<span className="text-theme-maroon">Bazar</span></span>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                  isActive 
                  ? 'bg-theme-maroon/10 text-theme-maroon font-bold' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-theme-maroon' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-theme-maroon text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
        
        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 p-3 rounded-xl font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Navigation Bar */}
        <header className="h-20 bg-white border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search campus marketplace..." 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-transparent focus:bg-white focus:border-theme-maroon focus:ring-2 focus:ring-theme-maroon/20 rounded-xl transition-all outline-none font-medium text-sm"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-5">
            <button className="hidden md:flex items-center gap-2 bg-theme-maroon text-white px-5 py-2.5 rounded-xl font-bold hover:bg-theme-dark-maroon shadow-lg shadow-theme-maroon/20 transition-all text-sm">
              <PlusCircle className="w-5 h-5" />
              <span>Post Listing</span>
            </button>
            
            <button className="relative p-2 text-slate-400 hover:text-slate-900 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            
            <div className="relative pl-2 sm:pl-4 sm:border-l border-slate-200">
              <div 
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => setShowRoleMenu(!showRoleMenu)}
              >
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || 'John'}`} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200"
                />
                <div className="hidden sm:block">
                  <p className="text-sm font-bold text-slate-900">{user?.email || 'John Doe'}</p>
                  <p className="text-xs text-slate-500 font-medium capitalize flex items-center gap-1">
                    Role: {role || 'Seller'} <ChevronDown className="w-3 h-3" />
                  </p>
                </div>
              </div>
              
              {showRoleMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50">
                  <p className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Switch Role</p>
                  <button 
                    onClick={() => { switchRole('buyer'); setShowRoleMenu(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-theme-maroon transition-colors"
                  >
                    Buyer
                  </button>
                  <button 
                    onClick={() => { switchRole('seller'); setShowRoleMenu(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-theme-maroon transition-colors bg-theme-maroon/5 text-theme-maroon font-bold"
                  >
                    Seller
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {activeTab === 'dashboard' && <SellerOverview setActiveTab={setActiveTab} />}
          {activeTab === 'post' && <PostListing setActiveTab={setActiveTab} />}
          {activeTab === 'listings' && <div className="max-w-7xl mx-auto p-4"><h1 className="text-2xl font-bold">My Listings</h1></div>}
          {activeTab === 'buyers' && <div className="max-w-7xl mx-auto p-4"><h1 className="text-2xl font-bold">Interested Buyers</h1></div>}
          {activeTab === 'messages' && <div className="max-w-7xl mx-auto p-4"><h1 className="text-2xl font-bold">Messages</h1></div>}
          {activeTab === 'profile' && <div className="max-w-7xl mx-auto p-4"><h1 className="text-2xl font-bold">Profile</h1></div>}
          {activeTab === 'settings' && <div className="max-w-7xl mx-auto p-4"><h1 className="text-2xl font-bold">Settings</h1></div>}
        </div>
      </main>
    </div>
  );
};

export default SellerDashboard;
