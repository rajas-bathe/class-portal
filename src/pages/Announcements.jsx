import React, { useState } from 'react';
import { useAnnouncementsAirtable } from '../hooks/useAnnouncementsAirtable';
import AnnouncementItem from '../components/announcements/AnnouncementItem';

function Announcements() {
  const { items, loading, error } = useAnnouncementsAirtable();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Hackathon', 'Club', 'Sports', 'Exam', 'General'];

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter(item => item.category === selectedCategory);

  if (loading) {
    return (
      <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-200 rounded-xl h-24 animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-6 max-w-3xl mx-auto">
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

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">📢 Announcements</h1>
        <p className="text-sm text-gray-500">Stay updated with the latest from clubs & committees</p>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              selectedCategory === cat
                ? 'bg-gray-800 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-sm font-medium text-gray-500">{filteredItems.length} announcements</p>

      {/* Announcement List */}
      <div className="space-y-3">
        {filteredItems.map((item) => (
          <AnnouncementItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Announcements;