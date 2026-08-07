import React from 'react';
import QuickLinks from './QuickLinks';
import AnnouncementsWidget from './AnnouncementsWidget';

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79 A9 9 0 1 1 11.21 3 A7 7 0 0 0 21 12.79 Z" />
    </svg>
  );
}

// Pure presentational — no data fetching, receives everything as props.
function DesktopDashboardView({ greeting, today, announcements, examDates, classInfo }) {
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-medium text-gray-900 mb-1">{greeting}</h1>
          <p className="text-sm text-gray-500">{formattedDate} &middot; Semester III</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="h-9 px-3 flex items-center gap-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
          >
            <MoonIcon />
            Dark mode
          </button>
          <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-sm font-medium text-gray-700">
            P
          </div>
        </div>
      </div>

      <QuickLinks layout="rail" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

        <div className="lg:col-span-2">
          <AnnouncementsWidget announcements={announcements} variant="full" limit={3} />
        </div>

        <div className="flex flex-col gap-3">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-sm font-medium text-gray-900 mb-2.5">
              Academic calendar
            </p>
            <div className="space-y-1.5">
              {examDates.map((row) => (
                <div key={row.label} className="flex justify-between">
                  <span className="text-xs text-gray-600">{row.label}</span>
                  <span className="text-xs text-gray-400">{row.date}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-sm font-medium text-gray-900 mb-2.5">
              Class
            </p>
            <div className="space-y-1.5">
              {classInfo.map((row) => (
                <div key={row.label} className="flex justify-between">
                  <span className="text-xs text-gray-600">{row.label}</span>
                  <span className="text-xs text-gray-900">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default DesktopDashboardView;