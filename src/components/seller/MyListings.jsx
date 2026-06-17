import React, { useState, useEffect } from 'react';
import { Package, Eye, Heart, Edit, Trash2, CheckCircle, Clock, Check, MoreVertical } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const MyListings = ({ setActiveTab, setEditingProduct }) => {
  const [listings, setListings] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?._id) {
      fetchListings();
    }
  }, [user]);

  const fetchListings = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/marketplace/seller/${user._id}/products`);
      if (res.ok) {
        const data = await res.json();
        setListings(data);
      }
    } catch (err) {
      console.error('Failed to fetch listings', err);
    }
  };

  const summary = {
    total: listings.length,
    active: listings.filter(l => l.status === 'Active').length,
    sold: listings.filter(l => l.status === 'Sold').length,
    views: listings.reduce((sum, l) => sum + (l.views || 0), 0)
  };

  const markAsSold = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/marketplace/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Sold' })
      });
      if (res.ok) {
        setListings(listings.map(l => l._id === id ? { ...l, status: 'Sold' } : l));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteListing = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/marketplace/products/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setListings(listings.filter(l => l._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
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
              {[...listings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(item => (
                <tr key={item._id} className="hover:bg-slate-50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <img src={item.img || item.images?.[0] || 'https://via.placeholder.com/150'} alt={item.title} className="w-16 h-16 rounded-lg object-cover border border-slate-200" />
                      <div>
                        <p className="font-bold text-slate-900 group-hover:text-theme-maroon transition-colors line-clamp-1">{item.title}</p>
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
                  <td className="p-4 text-sm font-medium text-slate-600">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {item.status !== 'Sold' && (
                        <button onClick={() => markAsSold(item._id)} className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors" title="Mark as Sold">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button onClick={() => {
                        setEditingProduct(item);
                        setActiveTab('post');
                      }} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteListing(item._id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete">
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
