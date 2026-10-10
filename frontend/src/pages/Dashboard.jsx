import React from 'react';
import { useAnnouncementsAirtable } from '../hooks/useAnnouncementsAirtable';
import MobileDashboardView from '../components/dashboard/MobileDashboardView';
import DesktopDashboardView from '../components/dashboard/DesktopDashboardView';

// Controller — owns data fetching + shared derived values.
// Mirrors the Academics.jsx pattern: hooks run once here,
// mobile/desktop are pure presentational components underneath.
function Dashboard() {
  const { items: announcements, loading: announcementsLoading } = useAnnouncementsAirtable();

  const today = new Date();
  const hour = today.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  // Static reference data — matching official MSE timetable
  const examDates = [
    { label: 'MSE — Operating System', date: '28 Sep' },
    { label: 'MSE — Data Structures', date: '29 Sep' },
    { label: 'MSE — Foundation of Embedded System', date: '30 Sep' },
  ];

  const classInfo = [
    { label: 'Division', value: 'SYCM3' },
    { label: 'Branch', value: 'Computer Engineering' },
    { label: 'Students', value: '70' },
  ];

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">

      <div className="lg:hidden">
        <MobileDashboardView
          greeting={greeting}
          today={today}
          announcements={announcements}
          loading={announcementsLoading}
          classInfo={classInfo}
        />
      </div>

      <div className="hidden lg:block">
        <DesktopDashboardView
          greeting={greeting}
          today={today}
          announcements={announcements}
          loading={announcementsLoading}
          examDates={examDates}
          classInfo={classInfo}
        />
      </div>

    </div>
  );
}

export default Dashboard;