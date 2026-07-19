import React from 'react';
import { useTimetable } from '../hooks/useTimetable';
import { 
  ViewToggle, 
  NextLecture, 
  TimetableGrid,
  TimetableLegend 
} from '../components/academics';

function Academics() {
  const { 
    viewMode, 
    setViewMode, 
    timeSlots, 
    today, 
    nextLecture, 
    days, 
    getFilteredItem, 
    isCurrentTimeSlot 
  } = useTimetable();

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-4">
      {/* Header with Toggle */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">📚 Timetable</h1>
            <p className="text-gray-500 text-sm">Your weekly class schedule</p>
          </div>
          <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>
      </div>

      {/* Next Lecture */}
      <NextLecture lecture={nextLecture} today={today} />

      {/* Timetable Grid */}
      <TimetableGrid 
        days={days}
        timeSlots={timeSlots}
        today={today}
        getFilteredItem={getFilteredItem}
        isCurrentTimeSlot={isCurrentTimeSlot}
      />

      {/* Legend */}
      <TimetableLegend />
    </div>
  );
}

export default Academics;