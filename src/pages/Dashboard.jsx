import React from 'react';

function Dashboard() {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your dashboard!</p>
        
        {/* Sample dashboard cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-neutral-200">
            <h3 className="font-semibold text-gray-700">Total Classes</h3>
            <p className="text-2xl font-bold text-blue-600">12</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-neutral-200">
            <h3 className="font-semibold text-gray-700">Total Students</h3>
            <p className="text-2xl font-bold text-green-600">48</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-neutral-200">
            <h3 className="font-semibold text-gray-700">Active Now</h3>
            <p className="text-2xl font-bold text-purple-600">6</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;