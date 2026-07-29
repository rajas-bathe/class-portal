import React from 'react';
import { formatDistanceToNow } from 'date-fns';

function AnnouncementItem({ item }) {
  const timeAgo = item.time ? formatDistanceToNow(new Date(item.time), { addSuffix: true }) : '';

  return (
    <div className="w-full p-4 bg-white border-2 border-gray-800 rounded-xl hover:shadow-lg transition-all duration-200">
      <div className="flex flex-col">
        {/* Top Row: Title (left) + Category & Time (right) */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-bold text-gray-900 flex-1 leading-snug">
            {item.title || 'Untitled'}
          </h3>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            {item.category && (
              <span className="text-[10px] font-medium bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                {item.category}
              </span>
            )}
            <span className="text-[10px] text-gray-400">{timeAgo}</span>
          </div>
        </div>

        {/* Message */}
        <p className="text-sm text-gray-700 mt-1 leading-relaxed">{item.message || ''}</p>

        {/* Image (if any) */}
        {item.imageUrl && (
          <div className="mt-2 rounded-lg overflow-hidden border border-gray-200 max-w-[200px]">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-auto max-h-40 object-cover"
              loading="lazy"
            />
          </div>
        )}

        {/* Sender */}
        <div className="mt-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-gray-500 bg-gray-100/80 border border-gray-200/80 px-2.5 py-0.5 rounded-full">
            <span className="text-gray-400 text-[10px]">👤</span>
            {item.sender || 'Admin'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementItem;