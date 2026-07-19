import React from 'react';
import { isLab } from '../../utils/timetableHelpers';

function NextLecture({ lecture, today }) {
  if (!lecture) {
    return (
      <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
        <p className="text-green-600 font-medium">🎉 No more classes today!</p>
        <p className="text-sm text-gray-500">Enjoy your free time!</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-4 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80 font-medium">⏰ Next Class</p>
          <h3 className="text-xl font-bold mt-1">{lecture.subject}</h3>
          <div className="flex flex-wrap gap-3 mt-1 text-sm opacity-90">
            <span>🕐 {lecture.time}</span>
            <span>📅 {today}</span>
            <span>👨‍🏫 {lecture.teacher}</span>
            <span>🏫 {lecture.room}</span>
          </div>
        </div>
        <div className="text-4xl">
          {isLab(lecture.subject) ? '🔬' : '📖'}
        </div>
      </div>
    </div>
  );
}

export default NextLecture;