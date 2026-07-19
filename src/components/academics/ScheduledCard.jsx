import React from 'react';
import { getSubjectColor, getEmoji, isLab } from '../../utils/timetableHelpers';

function ScheduledCard({ item }) {
  if (!item) return null;

  return (
    <div className={`
      p-4 rounded-xl border-l-4 shadow-sm
      ${getSubjectColor(item.subject)}
    `}>
      <div className="flex items-start gap-3">
        <div className="min-w-[70px]">
          <span className="text-xs font-bold bg-white px-2 py-1 rounded-full shadow-sm">
            {item.time}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xl">{getEmoji(item.subject)}</span>
            <h3 className="font-bold text-gray-800">{item.subject}</h3>
            {isLab(item.subject) && (
              <span className="text-xs bg-purple-200 text-purple-700 px-2 py-0.5 rounded-full">
                Lab
              </span>
            )}
          </div>
          <div className="mt-1 flex flex-wrap gap-3 text-sm text-gray-600">
            <span>👨‍🏫 {item.teacher}</span>
            <span>🏫 {item.room}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduledCard;