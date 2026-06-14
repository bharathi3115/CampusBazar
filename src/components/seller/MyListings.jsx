import React, { useState } from 'react';
import { Package, Eye, Heart, Edit, Trash2, CheckCircle, Clock, Check, MoreVertical } from 'lucide-react';

const MyListings = () => {
  const [listings, setListings] = useState([
    {
      id: 1,
      name: 'Engineering Graphics Textbook',
      category: 'Books',
      price: 250,
      status: 'Active',
      views: 45,
      wishlistCount: 12,
      postedDate: '2025-01-15',
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400&h=400&fit=crop'
    },
    {
      id: 2,
      name: 'Data Structures Textbook',
      category: 'Books',
      price: 350,
      status: 'Active',
      views: 78,
      wishlistCount: 22,
      postedDate: '2025-01-20',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&h=400&fit=crop'
    },
    {
      id: 3,
      name: 'Casio Scientific Calculator',
      category: 'Calculators',
      price: 500,
      status: 'Sold',
      views: 120,
      wishlistCount: 18,
      postedDate: '2025-01-10',
      image: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?q=80&w=400&h=400&fit=crop'
    },
    {
      id: 4,
      name: 'Physics Lab Coat',
      category: 'Lab Equipment',
      price: 300,
      status: 'Active',
      views: 85,
      wishlistCount: 9,
      postedDate: '2025-02-01',
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=400&h=400&fit=crop'
    },
    {
      id: 5,
      name: 'Mountain Bicycle',
      category: 'Vehicles',
      price: 3500,
      status: 'Sold',
      views: 210,
      wishlistCount: 25,
      postedDate: '2025-01-05',
      image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=400&h=400&fit=crop'
    },
    {
      id: 6,
      name: 'Laptop Cooling Pad',
      category: 'Electronics',
      price: 450,
      status: 'Active',
      views: 32,
      wishlistCount: 4,
      postedDate: '2025-02-10',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=400&h=400&fit=crop'
    },
    {
      id: 7,
      name: 'Drawing Board',
      category: 'Stationery',
      price: 700,
      status: 'Pending',
      views: 156,
      wishlistCount: 30,
      postedDate: '2025-01-25',
      image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?q=80&w=400&h=400&fit=crop'
    },
    {
      id: 8,
      name: 'Scientific Instruments Kit',
      category: 'Lab Equipment',
      price: 1200,
      status: 'Active',
      views: 64,
      wishlistCount: 15,
      postedDate: '2025-02-05',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=400&h=400&fit=crop'
    }
  ]);

  const summary = {
    total: listings.length,
    active: listings.filter(l => l.status === 'Active').length,
    sold: listings.filter(l => l.status === 'Sold').length,
    views: listings.reduce((sum, l) => sum + l.views, 0)
  };

  const markAsSold = (id) => {
    setListings(listings.map(l => l.id === id ? { ...l, status: 'Sold' } : l));
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Active': return <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md text-xs font-bold">Active</span>;
      case 'Sold': return <span className="bg-slate-200 text-slate-600 px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1"><Check className="w-3 h-3"/> Sold</span>;
      case 'Pending': return <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1"><Clock className="w-3 h-3"/> Pending</span>;
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Listings</h1>
          <p className="text-slate-500 font-medium mt-1">Manage your active products, track performance, and update statuses.</p>
        </div>
      </div>



      {/* Listings Table/Cards */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-sm font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Product</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4">Engagement</th>
                <th className="p-4">Posted Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {listings.map(item => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover border border-slate-200" />
                      <div>
                        <p className="font-bold text-slate-900 group-hover:text-theme-maroon transition-colors line-clamp-1">{item.name}</p>
                        <p className="text-xs font-bold text-slate-400 mt-0.5">{item.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-black text-slate-900">₹{item.price}</td>
                  <td className="p-4">{getStatusBadge(item.status)}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3 text-sm font-bold text-slate-500">
                      <span className="flex items-center gap-1" title="Views"><Eye className="w-4 h-4 text-slate-400"/> {item.views}</span>
                      <span className="flex items-center gap-1" title="Wishlist"><Heart className="w-4 h-4 text-rose-400"/> {item.wishlistCount}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-medium text-slate-600">{new Date(item.postedDate).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {item.status !== 'Sold' && (
                        <button onClick={() => markAsSold(item.id)} className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors" title="Mark as Sold">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyListings;
