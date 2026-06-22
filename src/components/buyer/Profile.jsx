import React, { useState } from "react";
import { User, Mail, MapPin, Building, BookOpen, Clock, ShieldCheck, Edit3, Camera, CheckCircle2, TrendingUp, Package, Star, Settings, X, Save, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getSafeAvatarUrl } from "../../utils/avatarUtils";

const Profile = () => {
  const { user, role, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "ap@gmail.com",
    avatarUrl: user?.avatarUrl || null,
    coverUrl: user?.coverUrl || null,
    studentId: user?.studentId || "CB-2023-4589",
    department: user?.department || "Computer Science & Engineering",
    year: user?.year || "3rd Year",
    campus: user?.campus || "Main Campus, North Block",
    joined: user?.joined || "August 2023",
    verified: true,
    stats: user?.stats || {
      itemsBought: 12,
      savedAmount: 4500,
      activeWishlist: 8,
      reviewsGiven: 5
    },
    preferences: user?.preferences || {
      emailNotifications: true,
      profileVisibility: false
    }
  });

  const [formData, setFormData] = useState({ ...profileData });
  const fileInputRef = React.useRef(null);
  const coverInputRef = React.useRef(null);

  const handleEditClick = () => {
    setFormData({ ...profileData });
    setIsEditing(true);
  };

  const togglePreference = async (key) => {
    const updatedPreferences = {
      ...profileData.preferences,
      [key]: !profileData.preferences[key]
    };

    // Optimistic update
    setProfileData((prev) => ({
      ...prev,
      preferences: updatedPreferences
    }));

    // Save to backend immediately
    if (user?._id) {
      try {
        const fd = new FormData();
        fd.append("preferences", JSON.stringify(updatedPreferences));
        const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/users/${user._id}`, {
          method: "PUT",
          body: fd
        });
        if (res.ok) {
          const updatedUser = await res.json();
          updateUser({ ...user, ...updatedUser });
        }
      } catch (err) {
        console.error("Failed to update preference", err);
        // Revert on failure
        setProfileData((prev) => ({
          ...prev,
          preferences: profileData.preferences
        }));
      }
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      let currentUserId = user?._id;

      // Ensure we have a valid user ID
      if (!currentUserId || currentUserId === "undefined" || currentUserId === "null") {
        const syncRes = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/users/sync`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user?.email, name: user?.name, role: role })
        });

        if (syncRes.ok) {
          const fullUser = await syncRes.json();
          currentUserId = fullUser._id;
          updateUser(fullUser);
        } else {
          throw new Error("Could not sync user profile. Please login again.");
        }
      }

      if (!currentUserId || currentUserId === "undefined") {
        throw new Error("Still missing user ID after sync.");
      }

      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("email", formData.email);
      fd.append("studentId", formData.studentId);
      fd.append("department", formData.department);
      fd.append("year", formData.year);
      fd.append("campus", formData.campus);

      if (avatarFile) fd.append("avatar", avatarFile);
      if (coverFile) fd.append("cover", coverFile);

      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/users/${currentUserId}`, {
        method: "PUT",
        body: fd
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setProfileData((prev) => ({ ...prev, ...updatedUser }));
        updateUser({ ...user, ...updatedUser });
        setIsEditing(false);
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setIsUploadingAvatar(true);
      const url = URL.createObjectURL(file);
      setProfileData((prev) => ({ ...prev, avatarUrl: url }));

      if (user?._id) {
        try {
          const fd = new FormData();
          fd.append("avatar", file);
          const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/users/${user._id}`, {
            method: "PUT",
            body: fd
          });
          if (res.ok) {
            const updatedUser = await res.json();
            setProfileData((prev) => ({ ...prev, ...updatedUser }));
            updateUser({ ...user, ...updatedUser });
          }
        } catch (err) {
          console.error("Failed to upload avatar", err);
        } finally {
          setIsUploadingAvatar(false);
        }
      } else {
        setIsUploadingAvatar(false);
      }
    }
  };

  const handleCoverChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      setIsUploadingCover(true);
      const url = URL.createObjectURL(file);
      setProfileData((prev) => ({ ...prev, coverUrl: url }));

      if (user?._id) {
        try {
          const fd = new FormData();
          fd.append("cover", file);
          const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/users/${user._id}`, {
            method: "PUT",
            body: fd
          });
          if (res.ok) {
            const updatedUser = await res.json();
            setProfileData((prev) => ({ ...prev, ...updatedUser }));
            updateUser({ ...user, ...updatedUser });
          }
        } catch (err) {
          console.error("Failed to upload cover", err);
        } finally {
          setIsUploadingCover(false);
        }
      } else {
        setIsUploadingCover(false);
      }
    }
  };

  const getCoverUrl = () => {
    if (!profileData.coverUrl || profileData.coverUrl === "null" || profileData.coverUrl === "undefined") {
      return null;
    }
    return profileData.coverUrl;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 pb-12">
      {/* Header Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden relative">
        {/* Cover Photo */}
        <div
          className="h-32 sm:h-48 w-full relative overflow-hidden"
          style={{
            backgroundColor: getCoverUrl() ? "transparent" : "#8B0000", // theme-maroon hex approx
            backgroundImage: getCoverUrl() ? `url(${getCoverUrl()})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}>
          {!getCoverUrl() && <div className="absolute inset-0 bg-theme-maroon"></div>}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>

          <input type="file" ref={coverInputRef} onChange={handleCoverChange} accept="image/*" className="hidden" />
          <button onClick={() => coverInputRef.current?.click()} className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors">
            <Edit3 className={`w-4 h-4 ${isUploadingCover ? "animate-pulse" : ""}`} />
          </button>
        </div>

        {/* Profile Info */}
        <div className="px-6 sm:px-10 pb-8 relative">
          <div className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-8 -mt-16 sm:-mt-20 mb-6">
            <div className="relative inline-block group">
              <img
                src={getSafeAvatarUrl(profileData.avatarUrl, profileData.name, profileData.email)}
                alt="Profile"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white border-4 border-white shadow-xl object-cover"
              />
              <input type="file" ref={fileInputRef} onChange={handleAvatarChange} accept="image/*" className="hidden" />
              <button
                onClick={() => !isUploadingAvatar && fileInputRef.current?.click()}
                disabled={isUploadingAvatar}
                className={`absolute bottom-2 right-2 p-2.5 bg-theme-maroon text-white rounded-full shadow-lg transition-colors scale-0 group-hover:scale-100 origin-center duration-200 ${isUploadingAvatar ? "opacity-70 cursor-not-allowed scale-100" : "hover:bg-theme-dark-maroon"}`}>
                {isUploadingAvatar ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
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
              <button
                onClick={handleEditClick}
                className="flex-1 sm:flex-none px-6 py-2.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
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
                { id: "emailNotifications", title: "Email Notifications", desc: "Receive emails about new messages and order updates.", enabled: profileData.preferences.emailNotifications },
                { id: "profileVisibility", title: "Profile Visibility", desc: "Allow other students to see your basic profile information.", enabled: profileData.preferences.profileVisibility }
              ].map((pref) => (
                <div key={pref.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-theme-maroon/30 transition-colors">
                  <div className="pr-4">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">{pref.title}</h4>
                    <p className="text-xs text-slate-500 font-medium">{pref.desc}</p>
                  </div>
                  <button onClick={() => togglePreference(pref.id)} className={`w-12 h-6 rounded-full relative flex-shrink-0 transition-colors ${pref.enabled ? "bg-theme-maroon" : "bg-slate-300"}`}>
                    <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${pref.enabled ? "translate-x-6" : "translate-x-0"}`}></span>
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

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col transform transition-all">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-theme-maroon" /> Edit Profile Details
              </h2>
              <button onClick={() => setIsEditing(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-theme-maroon focus:ring-1 focus:ring-theme-maroon rounded-xl transition-all outline-none text-slate-700 font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-theme-maroon focus:ring-1 focus:ring-theme-maroon rounded-xl transition-all outline-none text-slate-700 font-medium"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Student ID</label>
                  <input
                    type="text"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-theme-maroon focus:ring-1 focus:ring-theme-maroon rounded-xl transition-all outline-none text-slate-700 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Year of Study</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-theme-maroon focus:ring-1 focus:ring-theme-maroon rounded-xl transition-all outline-none text-slate-700 font-medium"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Department</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-theme-maroon focus:ring-1 focus:ring-theme-maroon rounded-xl transition-all outline-none text-slate-700 font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Campus Location</label>
                <input
                  type="text"
                  value={formData.campus}
                  onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-theme-maroon focus:ring-1 focus:ring-theme-maroon rounded-xl transition-all outline-none text-slate-700 font-medium"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
              <button onClick={() => setIsEditing(false)} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-2.5 bg-theme-maroon text-white text-sm font-bold rounded-xl hover:bg-theme-dark-maroon shadow-md shadow-theme-maroon/20 flex items-center gap-2 transition-all disabled:opacity-70">
                <Save className="w-4 h-4" /> {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ChevronRight = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

export default Profile;
