import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans text-slate-900">
      <div className="bg-white p-8 rounded-3xl shadow-lg text-center max-w-md w-full border border-slate-100">
        <h1 className="text-3xl font-bold mb-4 text-theme-maroon">User Dashboard</h1>
        <p className="text-slate-600 mb-8">Welcome back! Your dashboard is currently under construction.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-theme-maroon text-white px-6 py-3 rounded-xl font-bold hover:bg-theme-dark-maroon shadow-lg shadow-theme-maroon/20 transition-all w-full"
        >
          Return Home
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
