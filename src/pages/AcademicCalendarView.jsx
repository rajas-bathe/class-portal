import React from 'react';
import { useNavigate } from 'react-router-dom';
import AcademicCalendar from '../components/academics/AcademicCalendar';

function AcademicCalendarView() {
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      
      {/* Back Button */}
      <button
        onClick={() => navigate('/resources')}
        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
      >
        ← Back to Resources
      </button>

      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">📅 Academic Calendar</h1>
        <p className="text-sm text-gray-500">Upcoming events, holidays, and important deadlines</p>
      </div>

      {/* Calendar Content */}
      <div className="bg-white border-2 border-gray-800 rounded-xl p-4 md:p-6">
        <AcademicCalendar />
      </div>

    </div>
  );
}

export default AcademicCalendarView;