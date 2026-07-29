import React from 'react';
import { formatDistanceToNow } from 'date-fns';

function AnnouncementDetail({ item, onClose }) {
  const timeAgo = item.time ? formatDistanceToNow(new Date(item.time), { addSuffix: true }) : '';

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-2xl w-full max-h-[90vh] rounded-xl border-2 border-gray-800 shadow-2xl p-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-2xl">
              {item.avatar || '📢'}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{item.sender}</p>
              <p className="text-xs text-gray-500">{timeAgo}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 transition-colors text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">{item.title}</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{item.message}</p>
          {item.imageUrl && (
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <img src={item.imageUrl} alt="Announcement" className="w-full object-cover" />
            </div>
          )}
          <div className="flex gap-3 pt-4">
            <span className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
              {item.category}
            </span>
            {item.priority === 'high' && (
              <span className="text-xs font-medium bg-red-100 text-red-600 px-3 py-1 rounded-full">
                ⚡ High priority
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementDetail;