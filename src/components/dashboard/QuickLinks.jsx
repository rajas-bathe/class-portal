import React from 'react';
import { Link } from 'react-router-dom';

const LINKS = [
  { path: '/academics', label: 'Timetable', icon: 'ti-table' },
  { path: '/resources', label: 'Drive', icon: 'ti-brand-google-drive' },
  { path: '/class', label: 'Gallery', icon: 'ti-photo' },
  { path: '/academics', label: 'Academic calendar', icon: 'ti-calendar' },
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
          className={`${cardClass} bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-gray-400 dark:hover:border-gray-500 active:scale-[0.98] transition-all duration-150`}
        >
          <i className={`ti ${item.icon} text-xl text-gray-800 dark:text-gray-100`} aria-hidden="true" />
          <span className="text-sm font-medium text-gray-900 dark:text-gray-50">
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default QuickLinks;