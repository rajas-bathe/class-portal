import React from 'react';
import { Link } from 'react-router-dom';
import QuickLinks from './QuickLinks';
import AnnouncementsWidget from './AnnouncementsWidget';

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79 A9 9 0 1 1 11.21 3 A7 7 0 0 0 21 12.79 Z" />
    </svg>
  );
}

function DesktopDashboardView({ greeting, today, announcements, examDates, classInfo }) {
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-8">

      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-1">
            👋 {greeting.charAt(0).toUpperCase() + greeting.slice(1)}
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            {formattedDate} &middot; <span className="font-semibold">Semester III</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 text-sm border border-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-800"
          >
            <MoonIcon />
            Dark mode
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white shadow-md flex items-center justify-center text-sm font-bold text-white">
            P
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            🚀 Quick Access
          </h2>
        </div>
        <QuickLinks layout="rail" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

        {/* Announcements Column */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                📢 Latest Announcements
              </h2>
              <Link
                to="/announcements"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
              >
                View all →
              </Link>
            </div>
            <AnnouncementsWidget announcements={announcements} variant="full" limit={3} />
          </div>
        </div>

        {/* Sidebar - Reference Info */}
        <div className="space-y-5">

          {/* Academic Calendar Card */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              📅 Academic Calendar
            </h3>
            <div className="space-y-2.5">
              {examDates.map((row) => (
                <div key={row.label} className="flex justify-between items-center pb-2 border-b border-orange-100 last:border-0">
                  <span className="text-sm font-medium text-gray-700">{row.label}</span>
                  <span className="text-xs font-semibold text-orange-600 bg-white px-2.5 py-1 rounded-full">
                    {row.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Class Info Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              👥 Class Details
            </h3>
            <div className="space-y-3">
              {classInfo.map((row) => (
                <div key={row.label}>
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
                    {row.label}
                  </p>
                  <p className="text-base font-bold text-gray-900">
                    {row.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats 
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              ✨ Quick Stats
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Announcements</span>
                <span className="text-lg font-bold text-green-600">{announcements?.length || 0}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-green-100">
                <span className="text-sm text-gray-600">Division</span>
                <span className="text-lg font-bold text-green-600">SYCM3</span>
              </div>
            </div>
          </div>
            */}
        </div>

      </div>

    </div>
  );
}

export default DesktopDashboardView;