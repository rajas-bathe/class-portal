import React, { useState } from 'react';
import { useAnnouncements } from '../hooks/useAnnouncements';
import AnnouncementItem from '../components/announcements/AnnouncementItem';
import AnnouncementDetail from '../components/announcements/AnnouncementDetail';

function Announcements() {
  const { items, loading, error, markAsRead } = useAnnouncements();
  const [selectedId, setSelectedId] = useState(null);

  if (loading) {
    return (
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-gray-200 rounded-xl h-20 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 text-center">
          <p className="text-red-600 font-medium">⚠️ Failed to load announcements</p>
          <p className="text-sm text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 bg-gray-800 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-gray-900"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const selectedItem = items.find(item => item.id == selectedId);

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">📢 Announcements</h1>
        <p className="text-sm text-gray-500">Stay updated with the latest from clubs & committees</p>
      </div>

      {/* Unread count */}
      <p className="text-sm font-medium text-gray-500">
        {items.filter(i => i.unread).length} unread
      </p>

      {/* Announcement List */}
      <div className="space-y-2">
        {items.map((item) => (
          <AnnouncementItem
            key={item.id}
            item={item}
            onClick={() => {
              if (item.unread) markAsRead(item.id);
              setSelectedId(item.id);
            }}
          />
        ))}
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <AnnouncementDetail
          item={selectedItem}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}

export default Announcements;