import React, { useState } from 'react';
import { 
  Home, Search, PlusCircle, Bell, MessageSquare, Heart, 
  ShoppingBag, Settings, LogOut, ChevronRight, TrendingUp,
  Tag, MapPin, Eye, Star, Clock, CheckCircle, Package, User, ShoppingCart
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'browse', label: 'Browse Items', icon: Search },
    { id: 'listings', label: 'My Listings', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 3 },
    { id: 'purchases', label: 'My Purchases', icon: ShoppingBag },
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
          <button className="w-full flex items-center gap-3 p-3 rounded-xl font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all">
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
            
            <div className="flex items-center gap-3 pl-2 sm:pl-4 sm:border-l border-slate-200 cursor-pointer">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" 
                alt="Profile" 
                className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200"
              />
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-slate-900">John Doe</p>
                <p className="text-xs text-slate-500 font-medium">Computer Science</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
            
            {/* Welcome & Stats Row */}
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-1">Welcome back, John! 👋</h1>
              <p className="text-slate-500 font-medium mb-6">Here's what's happening in your campus marketplace today.</p>
              
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { label: 'Active Listings', value: '4', icon: Tag, color: 'text-blue-600', bg: 'bg-blue-100' },
                  { label: 'Items Sold', value: '12', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
                  { label: 'Wishlist', value: '8', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-100' },
                  { label: 'Unread Messages', value: '3', icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-100' },
                  { label: 'Profile Views', value: '142', icon: Eye, color: 'text-amber-600', bg: 'bg-amber-100', hideOnSm: true }
                ].map((stat, i) => (
                  <div key={i} className={`bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow ${stat.hideOnSm ? 'col-span-2 lg:col-span-1' : ''}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
                    <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                
                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { label: 'Post New Item', icon: PlusCircle, color: 'bg-theme-maroon text-white hover:bg-theme-dark-maroon shadow-md border border-transparent' },
                      { label: 'Browse Market', icon: Search, color: 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200' },
                      { label: 'View Messages', icon: MessageSquare, color: 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200' },
                      { label: 'Manage Listings', icon: Settings, color: 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200' },
                    ].map((action, i) => (
                      <button key={i} className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all gap-2 ${action.color}`}>
                        <action.icon className="w-6 h-6" />
                        <span className="text-sm font-bold text-center">{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Listings */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-slate-900">Your Recent Listings</h2>
                    <button className="text-theme-maroon font-bold text-sm hover:underline flex items-center gap-1">
                      View All <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {[
                      { title: 'Engineering Graphics Textbook', price: '$25', views: 45, status: 'Active', img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200&h=200&fit=crop' },
                      { title: 'Casio Scientific Calculator', price: '$15', views: 120, status: 'Sold', img: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?q=80&w=200&h=200&fit=crop' }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <img src={item.img} alt={item.title} className="w-20 h-20 rounded-xl object-cover" />
                        <div className="flex-1">
                          <h3 className="font-bold text-slate-900">{item.title}</h3>
                          <p className="text-theme-maroon font-bold mt-1">{item.price}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs font-medium text-slate-500">
                            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {item.views} Views</span>
                            <span className={`px-2.5 py-0.5 rounded-full font-bold ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                              {item.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-row sm:flex-col gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
                          <button className="flex-1 sm:flex-none py-2 px-4 sm:p-2 text-sm font-bold sm:text-transparent sm:font-normal text-slate-500 hover:text-theme-maroon bg-slate-50 hover:bg-theme-maroon/10 rounded-lg transition-colors flex items-center justify-center gap-2">
                            <Settings className="w-4 h-4" /> <span className="sm:hidden">Edit Listing</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended For You */}
                <div>
                  <h2 className="text-lg font-bold text-slate-900 mb-4">Recommended For You</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { title: 'MacBook Air M1', price: '$650', seller: 'Alice S.', category: 'Electronics', img: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=300&h=200&fit=crop' },
                      { title: 'Dorm Mini Fridge', price: '$40', seller: 'Mike T.', category: 'Hostellers', img: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?q=80&w=300&h=200&fit=crop' }
                    ].map((item, i) => (
                      <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
                        <div className="relative h-40 overflow-hidden">
                          <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-full text-slate-400 hover:text-rose-500 hover:bg-white transition-colors shadow-sm">
                            <Heart className="w-4 h-4" />
                          </button>
                          <span className="absolute bottom-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-bold rounded-lg tracking-wider uppercase">
                            {item.category}
                          </span>
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-slate-900 line-clamp-1">{item.title}</h3>
                            <span className="font-bold text-theme-maroon">{item.price}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                            <User className="w-4 h-4" />
                            <span>{item.seller}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column - Sidebar Widgets */}
              <div className="space-y-6 sm:space-y-8">
                
                {/* Profile Completion */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-2">Profile Completion</h3>
                  <div className="flex items-end justify-between mb-2">
                    <span className="text-3xl font-bold text-theme-maroon">85%</span>
                    <span className="text-sm font-bold text-green-600 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> Verified
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 mb-4">
                    <div className="bg-theme-maroon h-2.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <button className="w-full text-sm font-bold text-slate-700 bg-slate-50 border border-slate-200 hover:bg-slate-100 py-2.5 rounded-xl transition-colors">
                    Complete Profile
                  </button>
                </div>

                {/* Trending Categories */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-4">Trending Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Books', 'Lab Equipment', 'Calculators', 'Bicycles', 'Electronics', 'Stationery'].map((cat, i) => (
                      <span key={i} className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-sm font-bold text-slate-600 rounded-lg hover:border-theme-maroon hover:text-theme-maroon hover:bg-theme-maroon/5 cursor-pointer transition-colors">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recent Messages */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900">Recent Messages</h3>
                    <span className="text-xs font-bold text-white bg-red-500 px-2 py-0.5 rounded-full">3 New</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { name: 'Sarah M.', item: 'Calculus Book', msg: 'Is this still available?', time: '10m ago', unread: true },
                      { name: 'David K.', item: 'Bicycle', msg: 'Can you do $40?', time: '2h ago', unread: false },
                      { name: 'Prof. Miller', item: 'Lab Coat', msg: 'Sure, meet me at the lab.', time: '1d ago', unread: false }
                    ].map((chat, i) => (
                      <div key={i} className="flex gap-3 cursor-pointer group">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.name}`} className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200" alt="" />
                        <div className="flex-1 overflow-hidden">
                          <div className="flex justify-between items-center mb-0.5">
                            <h4 className={`text-sm ${chat.unread ? 'font-bold text-slate-900' : 'font-bold text-slate-700'} group-hover:text-theme-maroon transition-colors`}>{chat.name}</h4>
                            <span className="text-xs font-medium text-slate-400">{chat.time}</span>
                          </div>
                          <p className={`text-xs truncate ${chat.unread ? 'font-bold text-slate-800' : 'font-medium text-slate-500'}`}>
                            <span className="text-theme-maroon">[{chat.item}]</span> {chat.msg}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 text-sm font-bold text-theme-maroon hover:underline">
                    View All Messages
                  </button>
                </div>

                {/* Campus Insights */}
                <div className="bg-gradient-to-br from-theme-dark-maroon to-theme-maroon p-6 rounded-2xl shadow-lg shadow-theme-maroon/20 text-white relative overflow-hidden group">
                  <TrendingUp className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="font-bold text-white mb-4 relative z-10 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" /> Campus Insights
                  </h3>
                  <div className="space-y-3 relative z-10">
                    <div className="flex justify-between items-center border-b border-white/20 pb-2">
                      <span className="text-sm font-medium text-white/90">Active Students</span>
                      <span className="font-bold">2,451</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/20 pb-2">
                      <span className="text-sm font-medium text-white/90">Items Sold This Week</span>
                      <span className="font-bold">142</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-white/90">Popular Category</span>
                      <span className="font-bold text-theme-light-maroon">Books</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
