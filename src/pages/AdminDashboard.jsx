import React, { useState } from 'react';
import { 
  Users, 
  ShoppingBag, 
  AlertTriangle, 
  BarChart3, 
  Settings, 
  Layers, 
  LogOut,
  Bell,
  Search,
  CheckCircle,
  XCircle,
  MoreVertical
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = () => {
    navigate('/admin/login');
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'users', label: 'User Management', icon: <Users className="w-5 h-5" /> },
    { id: 'listings', label: 'Listing Moderation', icon: <ShoppingBag className="w-5 h-5" /> },
    { id: 'reports', label: 'Reports & Complaints', icon: <AlertTriangle className="w-5 h-5" /> },
    { id: 'categories', label: 'Categories', icon: <Layers className="w-5 h-5" /> },
    { id: 'settings', label: 'Platform Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const stats = [
    { title: 'Total Users', value: '12,450', increase: '+12%', color: 'bg-blue-50 text-blue-700' },
    { title: 'Active Listings', value: '4,892', increase: '+5%', color: 'bg-emerald-50 text-emerald-700' },
    { title: 'Pending Approvals', value: '145', increase: '-2%', color: 'bg-amber-50 text-amber-700' },
    { title: 'New Reports', value: '28', increase: '+8%', color: 'bg-red-50 text-red-700' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex fixed h-full z-20">
        <div className="h-20 flex items-center px-6 border-b border-slate-100">
          <Link to="/" className="font-extrabold text-2xl text-slate-900 tracking-tight flex items-center gap-2">
            <span className="bg-theme-maroon text-white p-1.5 rounded-lg text-sm">Admin</span>
            <span>Campus<span className="text-theme-maroon">Bazar</span></span>
          </Link>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Menu</div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-theme-maroon text-white shadow-md shadow-theme-maroon/20 font-medium' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all font-medium"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-800 capitalize">
              {navItems.find(i => i.id === activeTab)?.label || 'Dashboard'}
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-theme-maroon/20 focus:border-theme-maroon transition-all w-64"
              />
            </div>
            
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            
            <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
              <div className="w-9 h-9 bg-theme-dark-maroon rounded-full flex items-center justify-center text-white font-bold shadow-sm">
                A
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-slate-800 leading-tight">Admin User</p>
                <p className="text-xs text-slate-500">Superadmin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-6 lg:p-10 overflow-y-auto">
          {activeTab === 'dashboard' ? (
            <div className="max-w-6xl mx-auto space-y-8">
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                    <div className="flex items-end justify-between">
                      <h3 className="text-3xl font-extrabold text-slate-800">{stat.value}</h3>
                      <span className={`text-xs font-bold px-2 py-1 rounded-md ${stat.color}`}>
                        {stat.increase}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800">Recent Listings Pending Approval</h3>
                    <button className="text-sm text-theme-maroon font-semibold hover:underline">View All</button>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-200 rounded-lg shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-slate-800 text-sm">Calculus Textbook 9th Ed</h4>
                            <p className="text-xs text-slate-500 mt-1">Listed by user123 • Books & Materials</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors" title="Approve">
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors" title="Reject">
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Alerts */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-5 border-b border-slate-100">
                    <h3 className="font-bold text-slate-800">System Alerts</h3>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">High volume of reports</p>
                        <p className="text-xs text-slate-500 mt-1">5 users reported the same listing in the last hour.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">New signups spiking</p>
                        <p className="text-xs text-slate-500 mt-1">150 new users registered today, up 40% from yesterday.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="flex items-center justify-center h-64 border-2 border-dashed border-slate-200 rounded-2xl bg-white">
              <div className="text-center">
                <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-600">{navItems.find(i => i.id === activeTab)?.label} Module</h3>
                <p className="text-slate-400 text-sm mt-1">This section is currently under development.</p>
              </div>
            </div>
          )}
        </div>
      </main>

    </div>
  );
};

export default AdminDashboard;
