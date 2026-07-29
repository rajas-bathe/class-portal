import React from 'react';
import { formatDistanceToNow } from 'date-fns';

function AnnouncementItem({ item, onClick }) {
  const timeAgo = item.time ? formatDistanceToNow(new Date(item.time), { addSuffix: true }) : '';

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 bg-white border-2 rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] ${
        item.unread ? 'border-blue-500 bg-blue-50/50' : 'border-gray-800'
      }`}
    >
      {/* Avatar */}
      <div className="w-12 h-12 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-2xl">
        {item.avatar || '📢'}
      </div>

      {/* Content */}
      <div className="flex-1 text-left min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900">{item.sender}</span>
          {item.unread && (
            <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>
          )}
          <span className="text-xs text-gray-400 ml-auto">{timeAgo}</span>
        </div>
        <p className="text-sm font-medium text-gray-800 truncate">{item.title}</p>
        <div className="flex gap-2 mt-1">
          <span className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
            {item.category}
          </span>
          {item.priority === 'high' && (
            <span className="text-[10px] font-medium bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
              ⚡ High priority
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

export default AnnouncementItem;