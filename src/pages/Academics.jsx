import React from 'react';
import { useTimetable } from '../hooks/useTimetable';
import { 
  ViewToggle, 
  TimetableGrid, 
  MobileSchedule, 
  ExamTimetable,
  InfoCards 
} from '../components/academics';

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
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight leading-tight">
            Academics
          </h1>
          <p className="text-sm text-gray-500">
            Your class schedule and timetable
          </p>
        </div>
        <div className="flex-shrink-0 pb-0.5">
          <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>
      </div>

      {/* Mobile Schedule */}
      <div className="lg:hidden">
        <MobileSchedule 
          days={days}
          periods={periods}
          today={today}
          getFilteredItemsForPeriod={getFilteredItemsForPeriod}
        />
      </div>

      {/* Desktop Timetable */}
      <div className="hidden lg:block">
        <TimetableGrid 
          days={days}
          periods={periods}
          today={today}
          getFilteredItemsForPeriod={getFilteredItemsForPeriod}
        />
      </div>

      {/* Exam Timetable */}
      <ExamTimetable />

      {/* 🔥 NEW: Clickable Info Cards */}
      <InfoCards />

    </div>
  );
}

export default Academics;