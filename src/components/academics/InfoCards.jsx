import React from 'react';
import { useNavigate } from 'react-router-dom';

function InfoCards() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Academic Calendar Card — Opens Modal (kept as before) */}
      <button
        onClick={() => navigate('/academics/calendar')}
        className="bg-white border-2 border-gray-800 rounded-xl p-6 text-left hover:shadow-lg transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">📅</span>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Academic Calendar</h3>
            <p className="text-sm text-gray-500">Upcoming events, holidays & deadlines</p>
          </div>
        </div>
        <div className="mt-3 text-xs font-medium text-gray-400 flex items-center gap-1">
          Click to view <span className="text-gray-600">→</span>
        </div>
      </button>

      {/* Subject Info Card — Navigates to detailed page */}
      <button
        onClick={() => navigate('/academics/subjects')}
        className="bg-white border-2 border-gray-800 rounded-xl p-6 text-left hover:shadow-lg transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">📋</span>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Subject Information</h3>
            <p className="text-sm text-gray-500">Full syllabus, marking scheme & resources</p>
          </div>
        </div>
        <div className="mt-3 text-xs font-medium text-gray-400 flex items-center gap-1">
          Click to view <span className="text-gray-600">→</span>
        </div>
      </button>
    </div>
  );
}

export default InfoCards;