import React from 'react';
import { getSubjectShort } from '../../utils/timetableHelpers';

function NextClassCard({ lecture, today }) {
  if (!lecture) {
    return (
      <div className="bg-white border-2 border-gray-800 rounded-xl p-4 text-center">
        <p className="text-3xl mb-1">🎉</p>
        <p className="text-gray-500 font-medium text-sm">No more classes today!</p>
        <p className="text-xs text-gray-400">Enjoy your free time.</p>
      </div>
    );
  }

  const batch = lecture.batch || 'A';
  const shortName = getSubjectShort(lecture.subject);
  const timeRange = lecture.timeRange || lecture.time;

  return (
    <div className="bg-white border-2 border-gray-800 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">⏰ Next Class</p>
          <p className="text-base font-bold text-gray-900 mt-1">
            {batch} {shortName}
          </p>
          <p className="text-xs text-gray-600 mt-0.5">{lecture.teacher} · {lecture.room}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-medium text-gray-700">{timeRange}</span>
            <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded-full text-gray-600">
              {today}
            </span>
          </div>
        </div>
        <div className="text-4xl opacity-50">
          {shortName === 'Lab' ? '🔬' : '📖'}
        </div>
      </div>
    </div>
  );
}

export default NextClassCard;