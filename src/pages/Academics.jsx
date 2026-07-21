import React from 'react';
import { useTimetable } from '../hooks/useTimetable';
import { ViewToggle, TimetableGrid, MobileSchedule } from '../components/academics';

function Academics() {
  const { 
    viewMode, 
    setViewMode, 
    periods, 
    today, 
    days, 
    getFilteredItemsForPeriod 
  } = useTimetable();

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      
      {/* Header — Stacks on mobile, row on desktop */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Academics</h1>
          <p className="text-sm text-gray-500">Your class schedule and timetable</p>
        </div>
        <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>

      {/* Mobile: Schedule Cards */}
      <div className="lg:hidden">
        <MobileSchedule 
          days={days}
          periods={periods}
          today={today}
          getFilteredItemsForPeriod={getFilteredItemsForPeriod}
        />
      </div>

      {/* Desktop: Full Timetable Grid */}
      <div className="hidden lg:block">
        <TimetableGrid 
          days={days}
          periods={periods}
          today={today}
          getFilteredItemsForPeriod={getFilteredItemsForPeriod}
        />
      </div>

    </div>
  );
}

export default Academics;