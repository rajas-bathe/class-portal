import React from 'react';
import { formatDistanceToNow } from 'date-fns';

function AnnouncementItem({ item, onImageClick }) {
  const timeAgo = item.time ? formatDistanceToNow(new Date(item.time), { addSuffix: true }) : '';

  return (
    <div className="w-full p-4 bg-white border-2 border-gray-800 rounded-xl hover:shadow-lg transition-all duration-200">
      <div className="flex flex-col">
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

        <p className="text-sm text-gray-700 mt-1 leading-relaxed">{item.message || ''}</p>

        {item.imageUrl && (
          <div className="mt-3">
            <div
              onClick={() => onImageClick?.({
                imageUrl: item.imageUrl,
                title: item.title,
                category: item.category,
                sender: item.sender,
                timeAgo: timeAgo,
              })}
              className="group/img relative inline-block max-w-sm rounded-xl overflow-hidden border-2 border-gray-800 bg-gray-50 cursor-pointer shadow-xs hover:shadow-md transition-all active:scale-[0.99]"
              title="Click to view full image"
            >
              <img
                src={item.imageUrl}
                alt={item.title || 'Announcement'}
                className="max-h-72 sm:max-h-80 w-auto max-w-full h-auto object-contain block group-hover/img:scale-[1.02] transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="bg-white/95 border-2 border-gray-800 text-gray-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5 transform translate-y-1 group-hover/img:translate-y-0 transition-transform">
                  <span>🔍</span> Click to expand
                </span>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-xs flex items-center">
                View
              </span>
            </div>
          </div>
        )}

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