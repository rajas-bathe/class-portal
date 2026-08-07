import React from 'react';
import { Link } from 'react-router-dom';

const CATEGORY_STYLES = {
  news: 'bg-blue-50 text-blue-800',
  exam: 'bg-red-50 text-red-800',
  general: 'bg-gray-100 text-gray-700',
  club: 'bg-purple-50 text-purple-800',
  sports: 'bg-green-50 text-green-800',
};

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) return 'today';
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
}

function FileIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2 H6 a2 2 0 0 0 -2 2 V20 a2 2 0 0 0 2 2 H18 a2 2 0 0 0 2 -2 V8 Z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function AnnouncementRow({ item, thumbSize }) {
  const category = (item.category || 'general').toLowerCase();
  const badgeClass = CATEGORY_STYLES[category] || CATEGORY_STYLES.general;

  return (
    <Link
      to="/announcements"
      className="flex gap-3 bg-white border border-gray-200 rounded-xl p-3 hover:border-gray-400 transition-colors duration-150"
    >
      <div
        className={`${thumbSize} flex-shrink-0 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden text-gray-400`}
      >
        {item.image ? (
          <img
            src={item.image}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <FileIcon />
        )}
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex justify-between gap-2 mb-1">
          <p className="text-sm font-medium text-gray-900 truncate">
            {item.title || 'Untitled'}
          </p>
          <span className={`text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 ${badgeClass}`}>
            {item.category || 'General'}
          </span>
        </div>
        {item.body && (
          <p className="text-xs text-gray-500 truncate mb-1">
            {item.body}
          </p>
        )}
        <p className="text-[11px] text-gray-400">
          {item.author || 'Admin'} &middot; {timeAgo(item.createdAt)}
        </p>
      </div>
    </Link>
  );
}

// variant: 'compact' (mobile, small thumbs) | 'full' (desktop, larger thumbs)
function AnnouncementsWidget({ announcements = [], variant = 'compact', limit = 3 }) {
  const items = announcements.slice(0, limit);
  const thumbSize = variant === 'full' ? 'w-[88px] h-[68px]' : 'w-[52px] h-[52px]';

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <p className="text-xs font-medium text-gray-400 tracking-wide">
          Announcements
        </p>
        <Link
          to="/announcements"
          className="text-xs text-gray-600 flex items-center gap-1 hover:text-gray-900"
        >
          View all
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500">No new announcements.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {items.map((item) => (
            <AnnouncementRow key={item.id} item={item} thumbSize={thumbSize} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AnnouncementsWidget;