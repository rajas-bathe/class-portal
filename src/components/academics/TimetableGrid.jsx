import React from 'react';
import { getSubjectColor, getEmoji, isLab } from '../../utils/timetableHelpers';

function TimetableGrid({ 
  days, 
  timeSlots, 
  today, 
  getFilteredItem, 
  isCurrentTimeSlot 
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-3 text-left text-sm font-semibold text-gray-600 sticky left-0 bg-gray-50 z-10 min-w-[80px]">
                Time
              </th>
              {days.map((day) => (
                <th key={day} className="p-3 text-left text-sm font-semibold text-gray-600 min-w-[120px]">
                  {day}
                  {day === today && (
                    <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                      Today
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((time, rowIndex) => {
              const isCurrent = isCurrentTimeSlot(time);
              
              return (
                <tr key={time} className={`
                  ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                  ${isCurrent ? 'bg-yellow-50/30' : ''}
                `}>
                  <td className={`
                    p-3 text-sm font-medium text-gray-700 sticky left-0 bg-inherit z-10 border-r
                    ${isCurrent ? 'font-bold text-blue-600' : ''}
                  `}>
                    {time}
                    {isCurrent && <span className="ml-1 text-xs text-green-500">●</span>}
                  </td>

                  {days.map((day) => {
                    const item = getFilteredItem(day, time);
                    const isToday = day === today;
                    
                    return (
                      <td key={`${day}-${time}`} className="p-2">
                        {item ? (
                          <div className={`
                            p-2 rounded-lg text-xs
                            ${getSubjectColor(item.subject)}
                            ${isLab(item.subject) ? 'border-2 border-dashed border-purple-300' : ''}
                            ${isToday && isCurrent ? 'ring-2 ring-blue-400 ring-offset-1' : ''}
                          `}>
                            <div className="flex items-center gap-1">
                              <span>{getEmoji(item.subject)}</span>
                              <span className="font-medium truncate">{item.subject}</span>
                            </div>
                            <div className="text-[10px] opacity-75 mt-0.5 truncate">
                              {item.teacher} • {item.room}
                            </div>
                            <div className="flex flex-wrap gap-1 mt-0.5">
                              {isLab(item.subject) && (
                                <span className="text-[8px] bg-purple-200 text-purple-700 px-1.5 py-0.5 rounded-full">
                                  Lab
                                </span>
                              )}
                              {isToday && isCurrent && (
                                <span className="text-[8px] bg-blue-500 text-white px-1.5 py-0.5 rounded-full animate-pulse">
                                  Live
                                </span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="h-full min-h-[50px] flex items-center justify-center">
                            <span className="text-gray-300 text-xs">—</span>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TimetableGrid;