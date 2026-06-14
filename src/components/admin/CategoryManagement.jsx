import React from 'react';
import { Layers, Plus, Edit2, Trash2, Search, BookOpen, Laptop, Calculator, Bike, FlaskConical, PenTool } from 'lucide-react';

const CategoryManagement = () => {
  const categories = [
    { id: 1, name: 'Books', icon: BookOpen, listings: 245, active: 210, revenue: '₹45,000', status: 'Active' },
    { id: 2, name: 'Electronics', icon: Laptop, listings: 124, active: 105, revenue: '₹120,000', status: 'Active' },
    { id: 3, name: 'Calculators', icon: Calculator, listings: 85, active: 75, revenue: '₹42,500', status: 'Active' },
    { id: 4, name: 'Cycles', icon: Bike, listings: 42, active: 38, revenue: '₹150,000', status: 'Active' },
    { id: 5, name: 'Lab Equipment', icon: FlaskConical, listings: 28, active: 20, revenue: '₹14,000', status: 'Active' },
    { id: 6, name: 'Stationery', icon: PenTool, listings: 18, active: 15, revenue: '₹3,500', status: 'Active' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Category Management</h2>
          <p className="text-sm font-medium text-slate-500">Organize and structure marketplace items</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-theme-maroon text-white rounded-xl font-bold hover:bg-theme-dark-maroon transition-colors shadow-lg shadow-theme-maroon/20">
          <Plus className="w-5 h-5" /> Add Category
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search categories..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-theme-maroon/20 focus:border-theme-maroon transition-all outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-xs border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Category Name</th>
                <th className="px-6 py-4 text-center">Total Listings</th>
                <th className="px-6 py-4 text-center">Active Listings</th>
                <th className="px-6 py-4 text-center">Total Revenue</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                        <cat.icon className="w-5 h-5 text-slate-600" />
                      </div>
                      <span className="font-bold text-slate-900">{cat.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-slate-700">{cat.listings}</td>
                  <td className="px-6 py-4 text-center font-bold text-slate-700">{cat.active}</td>
                  <td className="px-6 py-4 text-center font-black text-emerald-600">{cat.revenue}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-50 text-emerald-600">
                      {cat.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Category">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Category">
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

export default CategoryManagement;
