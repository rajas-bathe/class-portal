import React from 'react';
import { Link } from 'react-router-dom';
import QuickLinks from './QuickLinks';
import AnnouncementsWidget from './AnnouncementsWidget';


function DesktopDashboardView({ greeting, today, announcements, examDates, classInfo }) {
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-8">

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