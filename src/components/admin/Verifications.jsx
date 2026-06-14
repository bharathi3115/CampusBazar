import React from 'react';
import { ShieldCheck, CheckCircle, XCircle, FileText, Search, Filter, Clock } from 'lucide-react';

const Verifications = () => {
  const requests = [
    { id: 1, name: 'Sanjay Kumar', email: 'sanjay.k@college.edu', dept: 'Mechanical Eng.', status: 'Pending', date: 'Oct 15, 2023', docType: 'Student ID' },
    { id: 2, name: 'Ritika Singh', email: 'ritika.s@college.edu', dept: 'Computer Science', status: 'Pending', date: 'Oct 15, 2023', docType: 'Fee Receipt' },
    { id: 3, name: 'Ankur Patel', email: 'ankur.p@college.edu', dept: 'Civil Eng.', status: 'Approved', date: 'Oct 14, 2023', docType: 'Student ID' },
    { id: 4, name: 'Megha Sharma', email: 'megha.s@college.edu', dept: 'Information Tech.', status: 'Rejected', date: 'Oct 12, 2023', docType: 'Library Card' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Student Verifications</h2>
          <p className="text-sm font-medium text-slate-500">Review student ID documents to verify accounts</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-theme-maroon/20 focus:border-theme-maroon transition-all outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors outline-none cursor-pointer">
              <option>Status: Pending</option>
              <option>Status: Approved</option>
              <option>Status: Rejected</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-xs border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Document Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-slate-900">{req.name}</p>
                      <p className="text-xs text-slate-500">{req.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">{req.dept}</td>
                  <td className="px-6 py-4 text-slate-500 font-medium flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-slate-400" /> {req.docType}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                      req.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : 
                      req.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 
                      'bg-red-50 text-red-600'
                    }`}>
                      {req.status === 'Approved' && <CheckCircle className="w-3.5 h-3.5" />}
                      {req.status === 'Pending' && <Clock className="w-3.5 h-3.5" />}
                      {req.status === 'Rejected' && <XCircle className="w-3.5 h-3.5" />}
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {req.status === 'Pending' && (
                        <>
                          <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Approve Verification">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Reject Verification">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Document">
                        <ShieldCheck className="w-4 h-4" />
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

export default Verifications;
