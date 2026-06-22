import React, { useState } from "react";
import { Search, Filter, MoreVertical, Shield, User, Package, Clock, Eye, Ban, CheckCircle, Trash2 } from "lucide-react";

import SellerMonitoring from "./SellerMonitoring";
import BuyerActivity from "./BuyerActivity";

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("all");

  const users = [
    { id: 1, name: "Rahul Sharma", email: "rahul.s@college.edu", dept: "Computer Science", listings: 12, status: "Active", joined: "Aug 12, 2023", avatar: "R" },
    { id: 2, name: "Priya Patel", email: "priya.p@college.edu", dept: "Electronics", listings: 5, status: "Active", joined: "Sep 05, 2023", avatar: "P" },
    { id: 3, name: "Amit Kumar", email: "amit.k@college.edu", dept: "Mechanical", listings: 0, status: "Suspended", joined: "Oct 20, 2023", avatar: "A" },
    { id: 4, name: "Neha Gupta", email: "neha.g@college.edu", dept: "Civil Engineering", listings: 8, status: "Active", joined: "Nov 11, 2023", avatar: "N" },
    { id: 5, name: "Vikas Singh", email: "vikas.s@college.edu", dept: "Information Tech", listings: 3, status: "Active", joined: "Dec 02, 2023", avatar: "V" }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">User Management</h2>
          <p className="text-sm font-medium text-slate-500">Manage and monitor student accounts</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("all")}
          className={`pb-3 px-4 text-sm font-bold transition-colors border-b-2 ${activeTab === "all" ? "border-theme-maroon text-theme-maroon" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
          All Users
        </button>
        <button
          onClick={() => setActiveTab("sellers")}
          className={`pb-3 px-4 text-sm font-bold transition-colors border-b-2 ${activeTab === "sellers" ? "border-theme-maroon text-theme-maroon" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
          Top Sellers
        </button>
        <button
          onClick={() => setActiveTab("buyers")}
          className={`pb-3 px-4 text-sm font-bold transition-colors border-b-2 ${activeTab === "buyers" ? "border-theme-maroon text-theme-maroon" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
          Buyer Activity
        </button>
      </div>

      {activeTab === "all" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-theme-maroon/20 focus:border-theme-maroon transition-all outline-none"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-xs border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4 text-center">Listings</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Joined</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-theme-maroon text-white flex items-center justify-center font-bold shrink-0">{user.avatar}</div>
                        <div>
                          <p className="font-bold text-slate-900">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">{user.dept}</td>
                    <td className="px-6 py-4 text-center font-bold text-slate-700">{user.listings}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${user.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                        {user.status === "Active" ? <CheckCircle className="w-3.5 h-3.5" /> : <Ban className="w-3.5 h-3.5" />}
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{user.joined}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Listings">
                          <Package className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-theme-maroon hover:bg-theme-maroon/5 rounded-lg transition-colors" title="Suspend User">
                          <Ban className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete User">
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
      )}

      {activeTab === "sellers" && <SellerMonitoring />}
      {activeTab === "buyers" && <BuyerActivity />}
    </div>
  );
};

export default UserManagement;
