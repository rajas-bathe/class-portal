import React from 'react';
import { Link } from 'react-router-dom';

const CATEGORY_STYLES = {
  news: 'bg-blue-100 text-blue-700 border-blue-200',
  exam: 'bg-red-100 text-red-700 border-red-200',
  general: 'bg-gray-100 text-gray-700 border-gray-200',
  club: 'bg-purple-100 text-purple-700 border-purple-200',
  sports: 'bg-green-100 text-green-700 border-green-200',
};

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) return 'today';
  if (days === 1) return '1 day ago';
  return `${days}d ago`;
}

function FileIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
      className="flex gap-3 bg-white border-2 border-gray-200 rounded-xl p-3.5 hover:border-blue-300 hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-200"
    >
      <div
        className={`${thumbSize} flex-shrink-0 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden text-gray-400`}
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
        <div className="flex justify-between gap-2 mb-2">
          <p className="text-sm font-bold text-gray-900 truncate">
            {item.title || 'Untitled'}
          </p>
          <span className={`text-[10px] px-2 py-1 rounded-full flex-shrink-0 font-semibold border ${badgeClass}`}>
            {item.category || 'General'}
          </span>
        </div>
        {item.body && (
          <p className="text-xs text-gray-600 truncate mb-1.5">
            {item.body}
          </p>
        )}
        <p className="text-[11px] text-gray-500 font-medium">
          {item.author || 'Admin'} &middot; {timeAgo(item.createdAt)}
        </p>
      </div>
    </Link>
  );
}

function AnnouncementsWidget({ announcements = [], variant = 'compact', limit = 3 }) {
  const items = announcements.slice(0, limit);
  const thumbSize = variant === 'full' ? 'w-[88px] h-[68px]' : 'w-[52px] h-[52px]';

  return (
    <div>
      {items.length === 0 ? (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300 rounded-xl p-6 text-center">
          <p className="text-3xl mb-2">📭</p>
          <p className="text-sm text-gray-600 font-medium">No new announcements yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <AnnouncementRow key={item.id} item={item} thumbSize={thumbSize} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AnnouncementsWidget;