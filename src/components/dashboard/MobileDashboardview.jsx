import React from 'react';
import { Link } from 'react-router-dom';
import QuickLinks from './QuickLinks';
import AnnouncementsWidget from './AnnouncementsWidget';

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79 A9 9 0 1 1 11.21 3 A7 7 0 0 0 21 12.79 Z" />
    </svg>
  );
}

function MobileDashboardView({ greeting, today, announcements }) {
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-start gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            👋 {greeting.charAt(0).toUpperCase() + greeting.slice(1)}
          </h1>
          <p className="text-sm text-gray-600 font-medium">{formattedDate}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="w-9 h-9 rounded-full border-2 border-gray-300 flex items-center justify-center bg-white hover:bg-gray-50 transition-colors text-gray-700 hover:scale-105 active:scale-95"
            aria-label="Dark mode"
          >
            <MoonIcon />
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white shadow-md flex items-center justify-center text-xs font-bold text-white">
            P
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
          🚀 Quick Access
        </h2>
        <QuickLinks layout="grid" />
      </div>

      {/* Announcements */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            📢 Announcements
          </h2>
          <Link
            to="/announcements"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
          >
            View all →
          </Link>
        </div>
        <AnnouncementsWidget announcements={announcements} variant="compact" limit={3} />
      </div>

    </div>
  );
}

export default MobileDashboardView;