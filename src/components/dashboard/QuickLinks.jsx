import React from 'react';
import { Link } from 'react-router-dom';

const ICONS = {
  table: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="9" y1="10" x2="9" y2="20" />
    </svg>
  ),
  drive: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2 L2 12 L8 22 L16 22 L22 12 L16 2 Z" />
      <line x1="2" y1="12" x2="22" y2="12" />
    </svg>
  ),
  photo: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="2" />
      <path d="M21 16 L16 11 L5 20" />
    </svg>
  ),
  calendar: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="8" y1="3" x2="8" y2="7" />
      <line x1="16" y1="3" x2="16" y2="7" />
    </svg>
  ),
};

const LINKS = [
  { path: '/academics', label: 'Timetable', icon: 'table' },
  { path: '/resources', label: 'Drive', icon: 'drive' },
  { path: '/class', label: 'Gallery', icon: 'photo' },
  { path: '/academics', label: 'Academic calendar', icon: 'calendar' },
];

// layout: 'grid' (mobile 2x2) | 'rail' (desktop horizontal row)
function QuickLinks({ layout = 'grid' }) {
  const containerClass =
    layout === 'rail'
      ? 'grid grid-cols-4 gap-3'
      : 'grid grid-cols-2 gap-2';

  const cardClass =
    layout === 'rail'
      ? 'flex items-center gap-3 p-4'
      : 'flex flex-col gap-2.5 p-4';

  return (
    <div className={containerClass}>
      {LINKS.map((item, i) => (
        <Link
          key={`${item.path}-${i}`}
          to={item.path}
          className={`${cardClass} bg-white border border-gray-200 rounded-xl hover:border-gray-400 active:scale-[0.98] transition-all duration-150 text-gray-800`}
        >
          {ICONS[item.icon]}
          <span className="text-sm font-medium text-gray-900">
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default QuickLinks;