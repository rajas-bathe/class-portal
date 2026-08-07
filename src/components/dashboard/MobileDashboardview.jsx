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
function MobileDashboardView({ greeting, today, announcements }) {
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="space-y-5">

      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500 mb-0.5">{greeting}</p>
          <p className="text-base font-medium text-gray-900">{formattedDate}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-700"
            aria-label="Dark mode"
          >
            <MoonIcon />
          </button>
          <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-medium text-gray-700">
            P
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-gray-400 tracking-wide mb-2">
          Quick links
        </p>
        <QuickLinks layout="grid" />
      </div>

      <AnnouncementsWidget announcements={announcements} variant="compact" limit={3} />

    </div>
  );
}

export default MobileDashboardView;