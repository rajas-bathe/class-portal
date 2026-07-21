import React from 'react';
import { getSubjectShort, isCurrentPeriod } from '../../utils/timetableHelpers';

function TimetableGrid({ 
  days, 
  periods, 
  today, 
  getFilteredItemsForPeriod 
}) {
  return (
    <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden border-2 border-gray-800">

{/* Header - College Info */}
<div className="p-3 md:p-4 border-b-2 border-gray-800 bg-gray-100">
  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 md:gap-2">
    <div>
      {/* "CLASS TIME TABLE" — Smaller, cleaner */}
      <h2 className="text-base md:text-lg font-bold text-gray-900 tracking-tight">
        CLASS TIME TABLE
      </h2>
      <p className="text-xs md:text-sm text-gray-700 mt-0.5">
        <span className="font-semibold">Department:</span> Computer Engineering &nbsp;|&nbsp;
        <span className="font-semibold">Class:</span> SY B.Tech (UG) &nbsp;|&nbsp;
        <span className="font-semibold">Division:</span> SYCM3
      </p>
      <p className="text-xs md:text-sm text-gray-700">
        <span className="font-semibold">w.e.f.</span> 25/08/2026 &nbsp;|&nbsp;
        <span className="font-semibold">Class Teacher:</span> Ms. Preethi Paul
      </p>
    </div>
    <div className="text-right text-xs md:text-sm text-gray-700">
      <p><span className="font-semibold">Semester:</span> III &nbsp;|&nbsp; <span className="font-semibold">Academic Year:</span> 2026-27 (SH 2026)</p>
      <p><span className="font-semibold">Version:</span> V1</p>
    </div>
  </div>
</div>

      {/* Timetable Table - Fully responsive */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[700px] md:min-w-full border-collapse text-xs md:text-sm">
          <thead>
            <tr className="bg-gray-200 border-b-2 border-gray-800">
              <th className="p-1.5 md:p-3 text-center font-bold text-gray-900 sticky left-0 bg-gray-200 z-10 min-w-[50px] md:min-w-[70px] border-r-2 border-gray-800">
                Period
              </th>
              <th className="p-1.5 md:p-3 text-center font-bold text-gray-900 min-w-[80px] md:min-w-[110px] border-r-2 border-gray-800">
                Time
              </th>
              {days.map((day) => (
                <th key={day} className={`
                  p-1.5 md:p-3 text-center font-bold text-gray-900 min-w-[90px] md:min-w-[120px]
                  ${day === today ? 'bg-gray-300' : ''}
                  border-r-2 border-gray-800 last:border-r-0
                `}>
                  {day}
                  {day === today && (
                    <span className="block text-[6px] md:text-[8px] text-gray-700 font-normal">● Today</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {periods.map((period, rowIndex) => {
              const isCurrent = isCurrentPeriod(period.time);
              return (
                <tr key={period.number} className={`
                  ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  ${isCurrent ? 'bg-yellow-100' : ''}
                  border-b border-gray-300
                `}>
                  {/* Period Number */}
                  <td className={`
                    p-1.5 md:p-3 text-center font-bold text-gray-900 sticky left-0 
                    ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    ${isCurrent ? 'bg-yellow-100' : ''}
                    z-10 border-r-2 border-gray-800
                    text-xs md:text-sm
                  `}>
                    {period.number}
                    {isCurrent && <span className="block text-[6px] md:text-[8px] text-green-700 font-bold">● LIVE</span>}
                  </td>

                  {/* Time */}
                  <td className="p-1.5 md:p-3 text-center font-medium text-gray-800 border-r-2 border-gray-800 text-xs md:text-sm">
                    {period.time}
                  </td>

                  {/* Days */}
                  {days.map((day) => {
                    const items = getFilteredItemsForPeriod(day, period.time);
                    const isToday = day === today;

                    if (items.length === 0) {
                      return (
                        <td key={`${day}-${period.number}`} className={`
                          p-1.5 md:p-3 align-middle text-center text-gray-400
                          ${isToday ? 'bg-gray-100' : ''}
                          ${isCurrent && isToday ? 'bg-yellow-100' : ''}
                          border-r-2 border-gray-800 last:border-r-0
                          text-xs md:text-sm
                        `}>
                          —
                        </td>
                      );
                    }

                    // Group by subject to combine A and B batches
                    const grouped = items.reduce((acc, item) => {
                      const key = item.subject;
                      if (!acc[key]) acc[key] = [];
                      acc[key].push(item);
                      return acc;
                    }, {});

                    return (
                      <td key={`${day}-${period.number}`} className={`
                        p-1 md:p-2 align-middle
                        ${isToday ? 'bg-gray-100' : ''}
                        ${isCurrent && isToday ? 'bg-yellow-100' : ''}
                        border-r-2 border-gray-800 last:border-r-0
                        text-[10px] md:text-sm
                      `}>
                        {Object.keys(grouped).map((subject) => {
                          const subjectItems = grouped[subject];
                          const shortName = getSubjectShort(subject);

                          const batchA = subjectItems.find(i => i.batch === 'A');
                          const batchB = subjectItems.find(i => i.batch === 'B');

                          let cellText = '';
                          if (batchA) {
                            cellText = `A ${shortName} /${batchA.teacher} ${batchA.room}`;
                          }
                          if (batchB) {
                            if (cellText) cellText += ' ';
                            cellText += `B ${shortName} /${batchB.teacher} ${batchB.room}`;
                          }
                          if (!batchA && !batchB) {
                            const item = subjectItems[0];
                            cellText = `${shortName} /${item.teacher} ${item.room}`;
                          }

                          return (
                            <div key={subject} className="py-0.5 leading-relaxed text-gray-900 font-medium">
                              {cellText}
                            </div>
                          );
                        })}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer - Subject & Faculty Legend */}
      <div className="p-3 md:p-4 border-t-2 border-gray-800 bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
          <div>
            <p className="text-[10px] md:text-xs font-bold text-gray-900 mb-0.5 md:mb-1">SUBJECT CODES:</p>
            <div className="flex flex-wrap gap-x-2 md:gap-x-3 gap-y-0.5 md:gap-y-1 text-[9px] md:text-xs text-gray-800">
              <span>OS - Operating System</span>
              <span>MP - Microprocessor</span>
              <span>FES - Foundation of Embedded System</span>
              <span>ECN - Engineering Career Navigation</span>
              <span>IKS: IPS - Indian Philosophical Systems</span>
              <span>IKS: SCL - Sanskrit & Computational Linguistics</span>
            </div>
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-bold text-gray-900 mb-0.5 md:mb-1">FACULTY CODES:</p>
            <div className="flex flex-wrap gap-x-2 md:gap-x-3 gap-y-0.5 md:gap-y-1 text-[9px] md:text-xs text-gray-800">
              <span>AD - Mr. Amol Dhumal</span>
              <span>VM - Ms. Vaishnavi V. Mestry</span>
              <span>AAK - Ms. Amruta Kulkarni</span>
              <span>RD - Ms. Ranjana Deshmukh</span>
              <span>VK - Ms. Vaishali Kosamkar</span>
              <span>AN - Dr. Archana Nath</span>
              <span>AB - Mr. Atul Bharate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Section */}
      <div className="p-3 md:p-4 border-t-2 border-gray-800 bg-gray-100 flex flex-wrap justify-between items-center text-xs md:text-sm text-gray-900">
        <div className="flex flex-col items-center min-w-[60px] md:min-w-[80px]">
          <div className="w-20 md:w-48 h-8 md:h-10 border-b-2 border-gray-800"></div>
          <span className="mt-1 font-semibold text-[10px] md:text-sm">HOD</span>
        </div>
        <div className="flex flex-col items-center min-w-[60px] md:min-w-[80px]">
          <div className="w-20 md:w-48 h-8 md:h-10 border-b-2 border-gray-800"></div>
          <span className="mt-1 font-semibold text-[10px] md:text-sm">Dean Academics</span>
        </div>
        <div className="flex flex-col items-center min-w-[60px] md:min-w-[80px]">
          <div className="w-20 md:w-48 h-8 md:h-10 border-b-2 border-gray-800"></div>
          <span className="mt-1 font-semibold text-[10px] md:text-sm">Principal</span>
        </div>
      </div>
    </div>
  );
}

export default TimetableGrid;