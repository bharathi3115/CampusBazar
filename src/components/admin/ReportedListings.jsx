import React from 'react';
import { AlertTriangle, Eye, Trash2, ShieldAlert, CheckCircle } from 'lucide-react';

const ReportedListings = () => {
  const reports = [
    { id: 1, product: 'iPhone 13 Pro Max - Too Good to be True', reason: 'Fake Product', reportedBy: 'vikas.s@college.edu', date: 'Oct 14, 2023', severity: 'High' },
    { id: 2, title: 'Earn ₹5000 Daily without working', reason: 'Spam Listing', reportedBy: 'amit.k@college.edu', date: 'Oct 13, 2023', severity: 'High' },
    { id: 3, product: 'Calculus Textbook 9th Ed (Duplicate)', reason: 'Duplicate Listing', reportedBy: 'neha.g@college.edu', date: 'Oct 13, 2023', severity: 'Low' },
    { id: 4, product: 'Party Speakers', reason: 'Inappropriate Content', reportedBy: 'priya.p@college.edu', date: 'Oct 12, 2023', severity: 'Medium' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Reported Listings</h2>
          <p className="text-sm font-medium text-slate-500">Review and moderate community reports</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-red-50/50 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <h3 className="font-bold text-red-900">Active Reports ({reports.length})</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-xs border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Reported Product</th>
                <th className="px-6 py-4">Reason</th>
                <th className="px-6 py-4">Reported By</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900 line-clamp-1 max-w-[200px]">{report.product || report.title}</p>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 mt-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                      report.severity === 'High' ? 'bg-red-100 text-red-700' : 
                      report.severity === 'Medium' ? 'bg-amber-100 text-amber-700' : 
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {report.severity} Severity
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200">
                      <AlertTriangle className="w-3.5 h-3.5" /> {report.reason}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-600">{report.reportedBy}</td>
                  <td className="px-6 py-4 text-slate-500 font-medium">{report.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Report Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Warn User">
                        <ShieldAlert className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Remove Listing">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Ignore Report">
                        <CheckCircle className="w-4 h-4" />
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

export default ReportedListings;
