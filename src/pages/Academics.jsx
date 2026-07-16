import React from 'react';
import UpcomingSchedule from '../components/academics/UpcomingSchedule';
import ClassTimetable from '../components/academics/ClassTimetable';
import LabTimetable from '../components/academics/LabTimetable';

function Academics() {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <h1 className="text-2xl font-bold text-gray-800">📚 Academics</h1>
        <p className="text-gray-600">Your class and lab schedule</p>
      </div>

      {/* Upcoming - Full Width */}
      <UpcomingSchedule />

      {/* Class Timetable - Full Width */}
      <ClassTimetable />

      {/* Lab Timetable - Full Width */}
      <LabTimetable />
    </div>
  );
}

export default Academics;