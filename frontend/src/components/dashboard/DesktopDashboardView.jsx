import React from 'react';
import { Link } from 'react-router-dom';
import QuickLinks from './QuickLinks';
import AnnouncementsWidget from './AnnouncementsWidget';


function DesktopDashboardView({ greeting, today, announcements, loading, examDates, classInfo }) {
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
            <AnnouncementsWidget announcements={announcements} loading={loading} variant="full" limit={3} />
          </div>
        </div>

        {/* Sidebar - Reference Info */}
        <div className="space-y-5">

          {/* Academics Hub Card */}
          <div className="bg-white border-2 border-gray-800 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-gray-100 border-b-2 border-gray-800 px-4 py-2.5 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                🎓 Academics Hub
              </h3>
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                Quick Access
              </span>
            </div>

            <div className="p-3 space-y-2.5">
              {/* Academic Calendar Button */}
              <Link
                to="/academics/calendar"
                className="group flex items-center justify-between p-3 rounded-lg border-2 border-gray-200 hover:border-gray-800 bg-white hover:bg-orange-50/60 transition-all duration-150 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 border border-orange-300 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                    📅
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900 group-hover:text-orange-950 transition-colors">
                      Academic Calendar
                    </div>
                    <p className="text-xs text-gray-500">
                      Holidays, term schedule & deadlines
                    </p>
                  </div>
                </div>
                <span className="text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all duration-150 text-base font-bold ml-2">
                  →
                </span>
              </Link>

              {/* Subject Information Button */}
              <Link
                to="/academics/subjects"
                className="group flex items-center justify-between p-3 rounded-lg border-2 border-gray-200 hover:border-gray-800 bg-white hover:bg-blue-50/60 transition-all duration-150 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 border border-blue-300 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                    📚
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900 group-hover:text-blue-950 transition-colors">
                      Subject Information
                    </div>
                    <p className="text-xs text-gray-500">
                      Sem-3 subjects, syllabus & marking scheme
                    </p>
                  </div>
                </div>
                <span className="text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all duration-150 text-base font-bold ml-2">
                  →
                </span>
              </Link>
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