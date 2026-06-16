import React, { useState } from 'react';
import { Settings, MessageSquare, Heart, AlertTriangle, Image, CheckSquare, Save } from 'lucide-react';

const PlatformSettings = () => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('platformSettings');
    return saved ? JSON.parse(saved) : {
      enableChat: true,
      enableWishlist: true,
      enableReports: true,
      maxImages: 5,
    };
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    setShowSuccess(false);
  };

  const handleMaxImagesChange = (e) => {
    setSettings(prev => ({ ...prev, maxImages: parseInt(e.target.value) || 5 }));
    setShowSuccess(false);
  };

  const handleSave = () => {
    setIsSaving(true);
    // Save to localStorage and simulate API delay
    localStorage.setItem('platformSettings', JSON.stringify(settings));
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 600);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Platform Settings</h2>
          <p className="text-sm font-medium text-slate-500">Configure essential marketplace features</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg w-44 ${
            showSuccess 
              ? 'bg-green-600 text-white shadow-green-600/20' 
              : 'bg-theme-maroon text-white hover:bg-theme-dark-maroon shadow-theme-maroon/20'
          }`}
        >
          {isSaving ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : showSuccess ? (
            <>Saved!</>
          ) : (
            <><Save className="w-5 h-5" /> Save Changes</>
          )}
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8">
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Settings className="w-5 h-5 text-theme-maroon" /> Marketplace Controls
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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


          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-theme-maroon/30 transition-colors md:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex gap-3 items-start">
                <Image className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Maximum Images Per Listing</h4>
                  <p className="text-xs text-slate-500 font-medium">Limit the number of photos a seller can upload.</p>
                </div>
              </div>
              <div className="pl-8 sm:pl-0">
                <input 
                  type="number" 
                  value={settings.maxImages}
                  onChange={handleMaxImagesChange}
                  min="1" max="10"
                  className="w-24 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-theme-maroon/20 focus:border-theme-maroon transition-all outline-none"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PlatformSettings;
