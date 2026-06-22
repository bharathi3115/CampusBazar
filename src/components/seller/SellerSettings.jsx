import React, { useState } from "react";
import { User, Bell, Lock, Shield, MapPin, Trash2, Save, ShoppingBag } from "lucide-react";

const SellerSettings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    messages: true,
    sales: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: "Public",
    showContact: false
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 font-medium mt-1">Manage your account preferences and seller settings.</p>
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
          <User className="w-5 h-5 text-theme-maroon" />
          <h2 className="font-bold text-slate-900 text-lg">Account Settings</h2>
        </div>
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-theme-maroon focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
              <input
                type="email"
                defaultValue="john@campus.edu"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-theme-maroon focus:bg-white transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Change Password</label>
            <div className="flex items-center gap-3">
              <input
                type="password"
                placeholder="Enter new password"
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-theme-maroon focus:bg-white transition-all"
              />
              <button className="px-4 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors text-sm">Update</button>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
          <Bell className="w-5 h-5 text-theme-maroon" />
          <h2 className="font-bold text-slate-900 text-lg">Notification Settings</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Email Notifications</h4>
              <p className="text-xs font-medium text-slate-500">Receive daily summaries and important updates.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={notifications.email} onChange={() => setNotifications({ ...notifications, email: !notifications.email })} className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-theme-maroon"></div>
            </label>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Message Notifications</h4>
              <p className="text-xs font-medium text-slate-500">Get notified immediately when a buyer messages you.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={notifications.messages} onChange={() => setNotifications({ ...notifications, messages: !notifications.messages })} className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-theme-maroon"></div>
            </label>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Sales Alerts</h4>
              <p className="text-xs font-medium text-slate-500">Get notified when someone wants to buy your item.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={notifications.sales} onChange={() => setNotifications({ ...notifications, sales: !notifications.sales })} className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-theme-maroon"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Privacy & Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
            <Shield className="w-5 h-5 text-theme-maroon" />
            <h2 className="font-bold text-slate-900 text-lg">Privacy Settings</h2>
          </div>
          <div className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Profile Visibility</label>
              <select
                value={privacy.profileVisibility}
                onChange={(e) => setPrivacy({ ...privacy, profileVisibility: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-theme-maroon focus:bg-white transition-all font-medium">
                <option value="Public">Public (Everyone can see)</option>
                <option value="Campus">Campus Only (Logged in students)</option>
                <option value="Private">Private (Hidden)</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-700">Show Contact Info</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={privacy.showContact} onChange={() => setPrivacy({ ...privacy, showContact: !privacy.showContact })} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-theme-maroon"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-theme-maroon" />
            <h2 className="font-bold text-slate-900 text-lg">Marketplace Preferences</h2>
          </div>
          <div className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Default Category</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-theme-maroon focus:bg-white transition-all font-medium">
                <option>Books</option>
                <option>Electronics</option>
                <option>Stationery</option>
                <option>Lab Equipment</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" /> Default Meeting Location
              </label>
              <input
                type="text"
                defaultValue="Central Library"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-theme-maroon focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 border-t border-slate-200 pt-6">
        <button className="px-6 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors text-sm">Cancel</button>
        <button className="px-6 py-2.5 bg-theme-maroon text-white font-bold rounded-xl shadow-lg shadow-theme-maroon/20 hover:bg-theme-dark-maroon transition-all flex items-center gap-2 text-sm">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 rounded-2xl border border-red-100 shadow-sm overflow-hidden mt-8">
        <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-red-700 text-lg">Danger Zone</h3>
            <p className="text-sm font-medium text-red-500 mt-1">Once you delete your account, there is no going back. Please be certain.</p>
          </div>
          <button className="px-5 py-2.5 bg-white border-2 border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-600 hover:text-white hover:border-red-600 transition-all flex items-center gap-2 text-sm whitespace-nowrap">
            <Trash2 className="w-4 h-4" /> Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerSettings;
