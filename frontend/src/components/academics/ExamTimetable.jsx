import React from 'react';
import { useExamTimetable } from '../../hooks/useExamTimetable';
import { examTypes, examData } from '../../data/examData';

function ExamTimetable() {
  const { activeExam, setActiveExam, currentData } = useExamTimetable('mse');

  return (
    <div className="space-y-4">
      {/* Section Title */}
      <div className="border-b-2 border-gray-800 pb-1 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">📋 Exams & Timetable</h2>
        <span className="text-xs font-semibold text-gray-500">Semester III</span>
      </div>

      {/* Three Big Buttons: MSE | ESE | ESPE */}
      <div className="grid grid-cols-3 gap-2.5">
        {examTypes.map((type) => {
          const label = type.toUpperCase();
          const emoji = type === 'mse' ? '📝' : type === 'ese' ? '📄' : '🧪';
          const isSelected = activeExam === type;

          return (
            <button
              key={type}
              onClick={() => setActiveExam(type)}
              className={`
                py-3 px-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-150 border-2 shadow-xs
                ${
                  isSelected
                    ? 'bg-gray-800 text-white border-gray-800 shadow-md scale-[1.01]'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-800 hover:bg-gray-50'
                }
              `}
            >
              {emoji} {label}
            </button>
          );
        })}
      </div>

      {/* Exam Schedule Card */}
      {currentData && (
        <>
          {currentData.isLocked ? (
            /* Locked and Blurred Card */
            <div className="bg-white border-2 border-gray-800 rounded-xl overflow-hidden shadow-sm">
              {/* Header */}
              <div className="bg-gray-100 border-b-2 border-gray-800 px-4 py-2.5 flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-gray-800 leading-snug">{currentData.name}</span>
                <span className="text-xs font-bold text-gray-700 bg-white border border-gray-300 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                  🔒 Locked
                </span>
              </div>

              {/* Locked Body Container (below header, impossible to overlap) */}
              <div className="relative p-6 sm:p-8 flex flex-col items-center justify-center min-h-[220px] overflow-hidden">
                {/* Blurred Placeholder / Skeleton */}
                <div className="absolute inset-0 p-5 filter blur-[5px] opacity-25 select-none pointer-events-none space-y-3 flex flex-col justify-center">
                  <div className="h-8 bg-gray-300 rounded-lg w-full"></div>
                  <div className="h-8 bg-gray-200 rounded-lg w-full"></div>
                  <div className="h-8 bg-gray-300 rounded-lg w-full"></div>
                  <div className="h-8 bg-gray-200 rounded-lg w-full"></div>
                </div>

                {/* Light blur overlay inside body */}
                <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div>

                {/* Centered Lock & Announcement Content */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-sm px-2">
                  <div className="w-12 h-12 rounded-2xl bg-yellow-300 border-2 border-gray-800 flex items-center justify-center text-xl shadow-xs mb-2.5">
                    🔒
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-gray-900 tracking-tight">
                    Dates To Be Announced Soon
                  </h3>
                  <div className="mt-2 text-xs sm:text-sm font-bold text-gray-800 bg-yellow-100 border border-yellow-400 px-3.5 py-1 rounded-full shadow-xs">
                    ⏳ (Approx Time Mid to Late November)
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium mt-2">
                    Official timetable will be updated once published by the exam cell
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Active Midsem Timetable Table */
            <div className="bg-white border-2 border-gray-800 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-gray-100 border-b-2 border-gray-800 px-4 py-2.5 flex items-center justify-between flex-wrap gap-2">
                <span className="text-sm font-bold text-gray-800">
                  {currentData.name}
                </span>
                <span className="text-xs font-bold bg-white border border-gray-300 px-2.5 py-0.5 rounded-full text-gray-700">
                  ⏰ {currentData.timing}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-gray-100 border-b-2 border-gray-800 text-gray-800 font-bold uppercase tracking-wider">
                      <th className="px-4 py-2.5 text-left border-r border-gray-300 w-44">
                        Date & Day
                      </th>
                      <th className="px-4 py-2.5 text-left border-r border-gray-300 w-48">
                        Time
                      </th>
                      <th className="px-4 py-2.5 text-left">
                        Subject
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.schedule.map((item, idx) => (
                      <tr
                        key={idx}
                        className={`border-b border-gray-200 ${
                          idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        } hover:bg-yellow-50/60 transition-colors`}
                      >
                        <td className="px-4 py-3 font-semibold text-gray-900 border-r border-gray-200">
                          <span className="font-mono font-bold text-sm">{item.date}</span>
                          <span className="block text-xs text-gray-500 font-medium">
                            {item.day}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-semibold text-gray-800 border-r border-gray-200">
                          {item.time}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold bg-gray-200 text-gray-800 px-2 py-0.5 rounded border border-gray-300">
                              {item.code}
                            </span>
                            <span className="font-bold text-gray-900 text-sm">
                              {item.subject}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ExamTimetable;