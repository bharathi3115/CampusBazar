import React, { useState, useEffect } from 'react';
import { 
  Home, Search, PlusCircle, Bell, MessageSquare, Heart, 
  ShoppingBag, Settings, LogOut, ChevronRight, TrendingUp,
  Tag, MapPin, Eye, Star, Clock, CheckCircle, Package, User, ShoppingCart, ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { io } from 'socket.io-client';
import DashboardOverview from '../components/buyer/DashboardOverview';
import BrowseMarketplace from '../components/buyer/BrowseMarketplace';
import Wishlist from '../components/buyer/Wishlist';
import MyPurchases from '../components/buyer/MyPurchases';
import Messages from '../components/buyer/Messages';
import Profile from '../components/buyer/Profile';

const BuyerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const { user, role, logout, switchRole } = useAuth();

  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    if (!user) return;
    
    const fetchUnread = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/messages/conversations/${user._id}`);
        if (res.ok) {
          const convos = await res.json();
          let unread = 0;
          convos.forEach(c => {
             const isMeBuyer = c.buyerId?._id === user._id || c.buyerId === user._id;
             unread += isMeBuyer ? (c.unreadByBuyer || 0) : (c.unreadBySeller || 0);
          });
          setUnreadMessages(unread);
        }
      } catch (err) {
        console.error(err);
      }
    };
    
    fetchUnread();

    const socket = io(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}`);
    socket.emit('join_chat', user._id);
    socket.on('receive_message', () => {
      fetchUnread();
    });

    return () => socket.close();
  }, [user]);

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: Home },
    { id: 'browse', label: 'Marketplace', icon: Search },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'purchases', label: 'My Purchases', icon: ShoppingBag },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: unreadMessages > 0 ? (
      <span className="flex w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
    ) : null },
    { id: 'profile', label: 'Profile', icon: User },
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
                  <div className="flex items-center justify-center">
                    {item.badge}
                  </div>
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
        <header className="py-4 bg-white border-b-2 border-slate-200 px-6 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between flex-shrink-0 gap-4">
          <div className="flex flex-col items-center justify-center gap-1 flex-1">
            <div className="flex items-center justify-center gap-2">
              <ShoppingBag className="w-7 h-7 text-theme-maroon" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-theme-maroon tracking-tight">Buyer</h1>
            </div>
            <p className="text-sm font-medium text-slate-500 text-center">Discover items, track purchases, and chat with sellers.</p>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-5">


            
            <div className="relative pl-2 sm:pl-4 sm:border-l border-slate-200">
              <div 
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => setShowRoleMenu(!showRoleMenu)}
              >
                <img 
                  src={user?.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || 'John'}`} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 object-cover"
                />
                <div className="hidden sm:block">
                  <p className="text-sm font-bold text-slate-900">{user?.name || user?.email || 'John Doe'}</p>
                  <p className="text-xs text-slate-500 font-medium capitalize flex items-center gap-1">
                    Role: {role || 'Buyer'} <ChevronDown className="w-3 h-3" />
                  </p>
                </div>
              </div>
              
              {showRoleMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50">
                  <p className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Switch Role</p>
                  <button 
                    onClick={() => { switchRole('buyer'); setShowRoleMenu(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-theme-maroon transition-colors bg-theme-maroon/5 text-theme-maroon font-bold"
                  >
                    Buyer
                  </button>
                  <button 
                    onClick={() => { switchRole('seller'); setShowRoleMenu(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-theme-maroon transition-colors"
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
          {activeTab === 'dashboard' && <DashboardOverview setActiveTab={setActiveTab} />}
          {activeTab === 'browse' && <BrowseMarketplace setActiveTab={setActiveTab} />}
          {activeTab === 'wishlist' && <Wishlist setActiveTab={setActiveTab} />}
          {activeTab === 'purchases' && <MyPurchases setActiveTab={setActiveTab} />}
          {activeTab === 'messages' && <Messages />}
          {activeTab === 'profile' && <Profile />}
        </div>
      </main>
    </div>
  );
};

export default BuyerDashboard;
