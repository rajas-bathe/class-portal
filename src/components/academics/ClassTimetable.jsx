import React from 'react';

function ClassTimetable({ classes = [] }) {
  if (!classes || classes.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-400">No classes scheduled</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {classes.map((item) => (
        <div
          key={item.id || Math.random()}
          className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500"
        >
          <span className="text-2xl">📚</span>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold bg-white px-2 py-0.5 rounded-full shadow-sm">
                {item.time}
              </span>
              <h4 className="font-medium text-gray-800">{item.subject}</h4>
            </div>
            <div className="mt-1 flex flex-wrap gap-3 text-xs text-gray-500">
              <span>👨‍🏫 {item.teacher}</span>
              <span>🏫 Room {item.room}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ClassTimetable;