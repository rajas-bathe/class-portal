import React from 'react';
import { isLab } from '../../utils/timetableHelpers';

function UpcomingSchedule({ items = [] }) {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-400">No upcoming classes</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100"
        >
          <div className="text-3xl">
            {isLab(item.subject) ? '🔬' : '📖'}
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-800">{item.subject}</h4>
            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
              <span>🕐 {item.time}</span>
              <span>👨‍🏫 {item.teacher}</span>
              <span>🏫 {item.room}</span>
            </div>
          </div>
          <span className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full">
            Upcoming
          </span>
        </div>
      ))}
    </div>
  );
}

export default UpcomingSchedule;