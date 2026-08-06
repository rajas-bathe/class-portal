import React from 'react';
import { useTimetable } from '../hooks/useTimetable';
import { useAnnouncementsAirtable } from '../hooks/useAnnouncementsAirtable';
//import { useDarkMode } from '../context/DarkModeContext';
import QuickLinks from '../components/dashboard/QuickLinks';
import AnnouncementsWidget from '../components/dashboard/AnnouncementsWidget';

function Dashboard() {
  const { items: announcements } = useAnnouncementsAirtable();
  //const { isDark, toggleDarkMode } = useDarkMode();

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

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
    <div className="p-6 max-w-6xl mx-auto space-y-6">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-medium text-gray-900 dark:text-gray-50 mb-1">{greeting}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{formattedDate} &middot; Semester III</p>
        </div>
        <div className="flex items-center gap-3">
          {/* <button
            //onClick={toggleDarkMode}
            className="h-9 px-3 flex items-center gap-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <i className={`ti ${isDark ? 'ti-sun' : 'ti-moon'} text-base`} aria-hidden="true" />
            {isDark ? 'Light mode' : 'Dark mode'}
          </button> */}
          <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-200">
            P
          </div>
        </div>
      </div>

      <QuickLinks layout="rail" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

        <div className="lg:col-span-2">
          <AnnouncementsWidget announcements={announcements} variant="full" limit={3} />
        </div>

        <div className="flex flex-col gap-3">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-50 mb-2.5">
              Academic calendar
            </p>
            <div className="space-y-1.5">
              {examDates.map((row) => (
                <div key={row.label} className="flex justify-between">
                  <span className="text-xs text-gray-600 dark:text-gray-300">{row.label}</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">{row.date}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-50 mb-2.5">
              Class
            </p>
            <div className="space-y-1.5">
              {classInfo.map((row) => (
                <div key={row.label} className="flex justify-between">
                  <span className="text-xs text-gray-600 dark:text-gray-300">{row.label}</span>
                  <span className="text-xs text-gray-900 dark:text-gray-100">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;