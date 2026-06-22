import React from "react";
import { Megaphone, Plus, Edit2, Trash2, Globe, EyeOff, Calendar } from "lucide-react";

const Announcements = () => {
  const announcements = [
    { id: 1, title: "New Feature Released", message: "You can now filter listings by specific college departments!", status: "Published", date: "Oct 15, 2023", type: "Feature" },
    { id: 2, title: "Marketplace Rules Updated", message: "Please review the updated guidelines regarding acceptable items for sale.", status: "Published", date: "Oct 10, 2023", type: "Policy" },
    { id: 3, title: "Scheduled Maintenance Notice", message: "The platform will be down for 2 hours on Sunday midnight for upgrades.", status: "Draft", date: "Oct 18, 2023", type: "Maintenance" }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Announcement Management</h2>
          <p className="text-sm font-medium text-slate-500">Broadcast important messages to buyers and sellers</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-theme-maroon text-white rounded-xl font-bold hover:bg-theme-dark-maroon transition-colors shadow-lg shadow-theme-maroon/20">
          <Plus className="w-5 h-5" /> Create Announcement
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-xs border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 w-1/2">Announcement</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {announcements.map((ann) => (
                <tr key={ann.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <p className="font-bold text-slate-900 flex items-center gap-2">
                        <Megaphone className="w-4 h-4 text-theme-maroon" /> {ann.title}
                      </p>
                      <p className="text-xs text-slate-500 line-clamp-1">{ann.message}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider">{ann.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${ann.status === "Published" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                      {ann.status === "Published" ? <Globe className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      {ann.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-medium flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" /> {ann.date}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {ann.status === "Draft" && (
                        <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Publish Announcement">
                          <Globe className="w-4 h-4" />
                        </button>
                      )}
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Announcement">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Announcement">
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

export default Announcements;
