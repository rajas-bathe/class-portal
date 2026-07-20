import React from 'react';
import { useTimetable } from '../hooks/useTimetable';
import { ViewToggle, NextLecture, TimetableGrid, TimetableLegend } from '../components/academics';

function Academics() {
  const { 
    viewMode, 
    setViewMode, 
    periods, 
    today, 
    nextLecture, 
    days, 
    getFilteredItemsForPeriod 
  } = useTimetable();

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-4">
      {/* Next Lecture */}
      <NextLecture lecture={nextLecture} today={today} />

      {/* Timetable Grid */}
      <TimetableGrid 
        days={days}
        periods={periods}
        today={today}
        getFilteredItemsForPeriod={getFilteredItemsForPeriod}
      />
    </div>
  );
}

export default Academics;