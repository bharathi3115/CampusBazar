import React, { useState } from 'react';
import { Settings, MessageSquare, Heart, AlertTriangle, Megaphone, ShieldCheck, Image, CheckSquare, Trash2, Save } from 'lucide-react';

const PlatformSettings = () => {
  const [settings, setSettings] = useState({
    enableChat: true,
    enableWishlist: true,
    enableReports: true,
    enableAnnouncements: true,
    enableVerification: false,
    listingApproval: true,
    autoDelete: false,
    maxImages: 5,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleMaxImagesChange = (e) => {
    setSettings(prev => ({ ...prev, maxImages: parseInt(e.target.value) || 5 }));
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Platform Settings</h2>
          <p className="text-sm font-medium text-slate-500">Configure global marketplace features and behaviors</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-theme-maroon text-white rounded-xl font-bold hover:bg-theme-dark-maroon transition-colors shadow-lg shadow-theme-maroon/20">
          <Save className="w-5 h-5" /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Marketplace Controls */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Settings className="w-5 h-5 text-theme-maroon" /> Marketplace Controls
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-theme-maroon/30 transition-colors">
              <div className="pr-4 flex gap-3 items-start">
                <MessageSquare className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Enable Chat System</h4>
                  <p className="text-xs text-slate-500 font-medium">Allow buyers and sellers to communicate directly.</p>
                </div>
              </div>
              <button onClick={() => toggleSetting('enableChat')} className={`w-12 h-6 rounded-full relative flex-shrink-0 transition-colors ${settings.enableChat ? 'bg-theme-maroon' : 'bg-slate-300'}`}>
                <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${settings.enableChat ? 'translate-x-6' : 'translate-x-0'}`}></span>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-theme-maroon/30 transition-colors">
              <div className="pr-4 flex gap-3 items-start">
                <Heart className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Enable Wishlist</h4>
                  <p className="text-xs text-slate-500 font-medium">Allow users to save items for later.</p>
                </div>
              </div>
              <button onClick={() => toggleSetting('enableWishlist')} className={`w-12 h-6 rounded-full relative flex-shrink-0 transition-colors ${settings.enableWishlist ? 'bg-theme-maroon' : 'bg-slate-300'}`}>
                <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${settings.enableWishlist ? 'translate-x-6' : 'translate-x-0'}`}></span>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-theme-maroon/30 transition-colors">
              <div className="pr-4 flex gap-3 items-start">
                <AlertTriangle className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Enable Reports</h4>
                  <p className="text-xs text-slate-500 font-medium">Allow users to report suspicious listings.</p>
                </div>
              </div>
              <button onClick={() => toggleSetting('enableReports')} className={`w-12 h-6 rounded-full relative flex-shrink-0 transition-colors ${settings.enableReports ? 'bg-theme-maroon' : 'bg-slate-300'}`}>
                <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${settings.enableReports ? 'translate-x-6' : 'translate-x-0'}`}></span>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-theme-maroon/30 transition-colors">
              <div className="pr-4 flex gap-3 items-start">
                <Megaphone className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Enable Announcements</h4>
                  <p className="text-xs text-slate-500 font-medium">Display global admin announcements to users.</p>
                </div>
              </div>
              <button onClick={() => toggleSetting('enableAnnouncements')} className={`w-12 h-6 rounded-full relative flex-shrink-0 transition-colors ${settings.enableAnnouncements ? 'bg-theme-maroon' : 'bg-slate-300'}`}>
                <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${settings.enableAnnouncements ? 'translate-x-6' : 'translate-x-0'}`}></span>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-theme-maroon/30 transition-colors">
              <div className="pr-4 flex gap-3 items-start">
                <ShieldCheck className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Enable User Verification</h4>
                  <p className="text-xs text-slate-500 font-medium">Require admin approval for new student accounts.</p>
                </div>
              </div>
              <button onClick={() => toggleSetting('enableVerification')} className={`w-12 h-6 rounded-full relative flex-shrink-0 transition-colors ${settings.enableVerification ? 'bg-theme-maroon' : 'bg-slate-300'}`}>
                <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${settings.enableVerification ? 'translate-x-6' : 'translate-x-0'}`}></span>
              </button>
            </div>
          </div>
        </div>

        {/* Additional Settings */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Settings className="w-5 h-5 text-theme-maroon" /> Additional Settings
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-theme-maroon/30 transition-colors">
              <div className="flex gap-3 items-start mb-3">
                <Image className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Maximum Images Per Listing</h4>
                  <p className="text-xs text-slate-500 font-medium">Limit the number of photos a seller can upload.</p>
                </div>
              </div>
              <div className="pl-8">
                <input 
                  type="number" 
                  value={settings.maxImages}
                  onChange={handleMaxImagesChange}
                  min="1" max="10"
                  className="w-24 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-theme-maroon/20 focus:border-theme-maroon transition-all outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-theme-maroon/30 transition-colors">
              <div className="pr-4 flex gap-3 items-start">
                <CheckSquare className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Listing Approval Required</h4>
                  <p className="text-xs text-slate-500 font-medium">New listings must be approved by an admin before going live.</p>
                </div>
              </div>
              <button onClick={() => toggleSetting('listingApproval')} className={`w-12 h-6 rounded-full relative flex-shrink-0 transition-colors ${settings.listingApproval ? 'bg-theme-maroon' : 'bg-slate-300'}`}>
                <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${settings.listingApproval ? 'translate-x-6' : 'translate-x-0'}`}></span>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-theme-maroon/30 transition-colors">
              <div className="pr-4 flex gap-3 items-start">
                <Trash2 className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Auto Delete Inactive Listings</h4>
                  <p className="text-xs text-slate-500 font-medium">Automatically remove listings with no activity for 90 days.</p>
                </div>
              </div>
              <button onClick={() => toggleSetting('autoDelete')} className={`w-12 h-6 rounded-full relative flex-shrink-0 transition-colors ${settings.autoDelete ? 'bg-theme-maroon' : 'bg-slate-300'}`}>
                <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${settings.autoDelete ? 'translate-x-6' : 'translate-x-0'}`}></span>
              </button>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default PlatformSettings;
