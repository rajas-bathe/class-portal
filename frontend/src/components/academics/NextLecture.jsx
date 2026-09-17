import React from 'react';
import { getSubjectShort } from '../../utils/timetableHelpers';

function NextLecture({ lecture, today }) {
  if (!lecture) {
    return (
      <div className="border-2 border-gray-300 rounded-lg p-3 text-center bg-gray-50 mb-4">
        <p className="text-gray-500 font-medium text-sm">🎉 No more classes today!</p>
        <p className="text-xs text-gray-400">Enjoy your free time.</p>
      </div>
    );
  }

  const batch = lecture.batch || 'A';
  const shortName = getSubjectShort(lecture.subject);
  const cellText = `${batch} ${shortName} /${lecture.teacher} ${lecture.room}`;

  return (
    <div className="border-2 border-gray-800 rounded-lg p-3 bg-white mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <div className="flex items-center gap-2">
          <span className="text-lg">⏰</span>
          <div>
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Next Class</p>
            <p className="text-sm font-bold text-gray-900">{cellText}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <span className="font-medium text-xs">{lecture.time}</span>
          <span className="inline-block bg-gray-200 px-2 py-0.5 rounded-full text-[10px] font-semibold text-gray-700">
            {today}
          </span>
        </div>
      </div>
    </div>
  );
}

export default NextLecture;