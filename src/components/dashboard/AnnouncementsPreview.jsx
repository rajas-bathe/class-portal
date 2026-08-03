import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

function AnnouncementPreview({ announcement }) {
  const navigate = useNavigate();

  if (!announcement) {
    return (
      <div className="bg-white border-2 border-gray-800 rounded-xl p-4 text-center">
        <p className="text-gray-500 text-sm">No announcements yet</p>
      </div>
    );
  }

  const timeAgo = announcement.time 
    ? formatDistanceToNow(new Date(announcement.time), { addSuffix: true }) 
    : '';

  return (
    <div className="bg-white border-2 border-gray-800 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-800">📢 Latest Announcement</h3>
        <button
          onClick={() => navigate('/announcements')}
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          View All →
        </button>
      </div>
      <div className="mt-2">
        <p className="text-sm font-medium text-gray-800">{announcement.title}</p>
        <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{announcement.message}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded-full text-gray-600">
            {announcement.category}
          </span>
          <span className="text-[10px] text-gray-400">{timeAgo}</span>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementPreview;