import React from 'react';
import { 
  User, Mail, MapPin, Building, BookOpen, Clock, ShieldCheck, 
  Edit3, Camera, CheckCircle2, TrendingUp, Package, Star, Settings
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user, role } = useAuth();
  
  // Dummy User Data
  const profileData = {
    name: user?.name || 'John Doe',
    email: user?.email || 'ap@gmail.com',
    studentId: 'CB-2023-4589',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    campus: 'Main Campus, North Block',
    joined: 'August 2023',
    verified: true,
    stats: {
      itemsBought: 12,
      savedAmount: 4500,
      activeWishlist: 8,
      reviewsGiven: 5
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 pb-12">
      
      {/* Header Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden relative">
        {/* Cover Photo */}
        <div className="h-32 sm:h-48 bg-theme-maroon w-full relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
          <button className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors">
            <Edit3 className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Info */}
        <div className="px-6 sm:px-10 pb-8 relative">
          <div className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-8 -mt-16 sm:-mt-20 mb-6">
            <div className="relative inline-block group">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData.email}`} 
                alt="Profile" 
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white border-4 border-white shadow-xl"
              />
              <button className="absolute bottom-2 right-2 p-2.5 bg-theme-maroon hover:bg-theme-dark-maroon text-white rounded-full shadow-lg transition-colors scale-0 group-hover:scale-100 origin-center duration-200">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">{profileData.name}</h1>
                {profileData.verified && (
                  <span className="flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded-md border border-blue-100">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Student
                  </span>
                )}
              </div>
              <p className="text-slate-500 font-medium text-sm flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" /> {profileData.email}
              </p>
            </div>

            <div className="flex gap-3 pb-2 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none px-6 py-2.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                <Edit3 className="w-4 h-4" /> Edit Profile
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 sm:p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
              <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                <Package className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider">Items Bought</span>
              </div>
              <div className="text-2xl font-black text-slate-900">{profileData.stats.itemsBought}</div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                <TrendingUp className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider">Saved Est.</span>
              </div>
              <div className="text-2xl font-black text-green-600">₹{profileData.stats.savedAmount}</div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                <CheckCircle2 className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider">Wishlisted</span>
              </div>
              <div className="text-2xl font-black text-slate-900">{profileData.stats.activeWishlist}</div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                <Star className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider">Reviews</span>
              </div>
              <div className="text-2xl font-black text-slate-900">{profileData.stats.reviewsGiven}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        
        {/* Academic Details */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-theme-maroon" /> Academic Information
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Student ID</span>
                <p className="font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400" /> {profileData.studentId}
                </p>
              </div>
              
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Department</span>
                <p className="font-bold text-slate-900 flex items-center gap-2">
                  <Building className="w-4 h-4 text-slate-400" /> {profileData.department}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Year of Study</span>
                <p className="font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" /> {profileData.year}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Campus Location</span>
                <p className="font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" /> {profileData.campus}
                </p>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-theme-maroon" /> Account Preferences
            </h2>
            
            <div className="space-y-4">
              {[
                { title: 'Email Notifications', desc: 'Receive emails about new messages and order updates.', enabled: true },
                { title: 'Price Drop Alerts', desc: 'Get notified when an item in your wishlist drops in price.', enabled: true },
                { title: 'Profile Visibility', desc: 'Allow other students to see your basic profile information.', enabled: false }
              ].map((pref, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-theme-maroon/30 transition-colors">
                  <div className="pr-4">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">{pref.title}</h4>
                    <p className="text-xs text-slate-500 font-medium">{pref.desc}</p>
                  </div>
                  <button className={`w-12 h-6 rounded-full relative flex-shrink-0 transition-colors ${pref.enabled ? 'bg-theme-maroon' : 'bg-slate-300'}`}>
                    <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${pref.enabled ? 'translate-x-6' : 'translate-x-0'}`}></span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6 sm:space-y-8">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 mb-4">Security</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-xl hover:bg-slate-50 text-sm font-bold text-slate-700 transition-colors flex items-center justify-between">
                Change Password <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button className="w-full text-left p-3 rounded-xl hover:bg-slate-50 text-sm font-bold text-slate-700 transition-colors flex items-center justify-between">
                Two-Factor Authentication <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button className="w-full text-left p-3 rounded-xl hover:bg-red-50 hover:text-red-600 text-sm font-bold text-slate-700 transition-colors flex items-center justify-between">
                Deactivate Account <ChevronRight className="w-4 h-4 text-slate-400 opacity-50 group-hover:opacity-100" />
              </button>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
};

const ChevronRight = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

export default Profile;
