import React, { useState, useEffect } from 'react';
import { useTimetable } from '../hooks/useTimetable';
import { useAnnouncementsAirtable } from '../hooks/useAnnouncementsAirtable';
import { 
  NextClassCard,
  TodayStatus,
  QuickActions,
  AnnouncementsPreview
} from '../components/dashboard';

function Dashboard() {
  const { today, nextLecture, getFilteredItemsForPeriod, periods } = useTimetable();
  const { items: announcements } = useAnnouncementsAirtable();

  // Live clock
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleDarkModeToggle = () => {
    console.log('Dark mode toggle clicked — coming soon!');
  };

  // Count today's classes
  const todayClasses = periods.filter(p => 
    getFilteredItemsForPeriod(today, p.time).length > 0
  );

  // Unread announcements count
  const unreadCount = announcements.filter(a => a.unread).length;

  // Latest announcement
  const latestAnnouncement = announcements.length > 0 ? announcements[0] : null;

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-4">
      
      {/* Header: Welcome + Time + Dark Mode */}
      <div className="bg-white border-2 border-gray-800 rounded-xl p-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">👋 Hello!</h1>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-gray-900">{formattedTime}</span>
            <button
              onClick={handleDarkModeToggle}
              className="p-2 rounded-lg border-2 border-gray-300 hover:border-gray-800 hover:bg-gray-100 transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              <span className="text-lg">🌙</span>
            </button>
          </div>
        </div>
      </div>

      {/* Latest Announcement */}
      <AnnouncementsPreview announcement={latestAnnouncement} />

      {/* Today's Status 
      <TodayStatus classCount={todayClasses.length} unreadCount={unreadCount} /> */}

      {/* Quick Actions */}
      <QuickActions />



      {/* Next Class 
      <NextClassCard lecture={nextLecture} today={today} /> */}

    </div>
  );
}

export default Dashboard;