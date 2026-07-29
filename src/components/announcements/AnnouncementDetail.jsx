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
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900">{item.title}</h2>

          {/* Message + Category + Sender */}
          <p className="text-gray-700 whitespace-pre-wrap">
            {item.message}
          </p>
          <p className="text-sm text-gray-500">
            Category: {item.category} · Sender: {item.sender}
          </p>

          {/* Image */}
          {item.imageUrl && (
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full object-cover max-h-96"
                loading="lazy"
              />
            </div>
          )}

          {/* Priority Badge */}
          {item.priority === 'High' && (
            <span className="inline-block text-xs font-medium bg-red-100 text-red-700 px-3 py-1 rounded-full">
              ⚡ High Priority
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnnouncementDetail;