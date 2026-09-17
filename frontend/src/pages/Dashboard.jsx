import React from 'react';
import { useAnnouncementsAirtable } from '../hooks/useAnnouncementsAirtable';
import MobileDashboardView from '../components/dashboard/MobileDashboardView';
import DesktopDashboardView from '../components/dashboard/DesktopDashboardView';

// Controller — owns data fetching + shared derived values.
// Mirrors the Academics.jsx pattern: hooks run once here,
// mobile/desktop are pure presentational components underneath.
function Dashboard() {
  const { items: announcements } = useAnnouncementsAirtable();

  const today = new Date();
  const hour = today.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  // Static reference data — replace with real data source (exam schedule, class info)
  const examDates = [
    { label: 'MSE — Operating system', date: '25 Jul' },
    { label: 'MSE — Microprocessor', date: '28 Jul' },
    { label: 'MSE — Embedded systems', date: '30 Jul' },
  ];

  const classInfo = [
    { label: 'Division', value: 'SYCM3' },
    { label: 'Class teacher', value: 'Ms. Preethi Paul' },
    { label: 'Students', value: '60' },
  ];

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto">

      {/* Mobile — shown below lg breakpoint */}
      <div className="lg:hidden">
        <MobileDashboardView
          greeting={greeting}
          today={today}
          announcements={announcements}
        />
      </div>

      {/* Desktop — shown at lg breakpoint and up */}
      <div className="hidden lg:block">
        <DesktopDashboardView
          greeting={greeting}
          today={today}
          announcements={announcements}
          examDates={examDates}
          classInfo={classInfo}
        />
      </div>

    </div>
  );
}

export default Dashboard;