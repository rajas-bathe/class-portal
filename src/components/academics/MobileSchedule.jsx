import React, { useState, useMemo, useCallback } from 'react';

function MobileSchedule({ days, periods, today, getFilteredItemsForPeriod }) {
  // Find today's index
  const todayIndex = days.indexOf(today);
  const [currentIndex, setCurrentIndex] = useState(todayIndex);

  const getDayItems = (day) => {
    const items = [];
    periods.forEach(period => {
      const dayItems = getFilteredItemsForPeriod(day, period.time);
      if (dayItems.length > 0) {
        items.push({
          period: period.number,
          time: period.time,
          items: dayItems
        });
      }
    });
    return items;
  };

  const selectedDay = days[currentIndex];
  const dayItems = getDayItems(selectedDay);
  const isToday = selectedDay === today;

  const getShortSubject = (subject) => {
    const map = {
      'Microprocessor': 'MP',
      'Operating System': 'OS',
      'Foundation of Embedded System': 'FES',
      'Engineering Career Navigation': 'ECN',
      'Indian Philosophical Systems': 'IKS: IPS',
      'Sanskrit and Computational Linguistics': 'IKS: SCL',
    };
    return map[subject] || subject;
  };

  const getDayShort = (day) => day.slice(0, 3);

  const isClassLive = (time) => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);
    const [start, end] = time.split('-');
    return start <= currentTime && end >= currentTime;
  };

  const getDayClassCount = (day) => {
    let count = 0;
    periods.forEach(period => {
      const items = getFilteredItemsForPeriod(day, period.time);
      if (items.length > 0) count++;
    });
    return count;
  };

  // Infinite scroll helpers
  const totalDays = days.length;

  const getVisibleIndices = useCallback((centerIdx) => {
    const prev = (centerIdx - 1 + totalDays) % totalDays;
    const curr = centerIdx;
    const next = (centerIdx + 1) % totalDays;
    return [prev, curr, next];
  }, [totalDays]);

  const visibleIndices = useMemo(() => getVisibleIndices(currentIndex), [currentIndex, getVisibleIndices]);

  const goBack = () => {
    setCurrentIndex((prev) => (prev - 1 + totalDays) % totalDays);
  };

  const goForward = () => {
    setCurrentIndex((prev) => (prev + 1) % totalDays);
  };

  // Keyboard support (optional)
  // Could add left/right arrow key listeners

  return (
    <div className="space-y-4">
      {/* Day Selector — Infinite 3-Day View */}
      <div className="bg-white border-2 border-gray-800 rounded-xl p-3">
        <div className="flex items-center gap-2">
          {/* Left Arrow */}
          <button
            onClick={goBack}
            className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold bg-gray-100 text-gray-800 hover:bg-gray-200 active:scale-95 transition-all duration-200 touch-manipulation"
            aria-label="Previous day"
          >
            ‹
          </button>

          {/* Day Buttons — 3 visible days in circular order */}
          <div className="flex-1 grid grid-cols-3 gap-1.5">
            {visibleIndices.map((idx) => {
              const day = days[idx];
              const classCount = getDayClassCount(day);
              const isActive = idx === currentIndex;
              const isTodayDay = day === today;
              
              return (
                <button
                  key={day}
                  onClick={() => setCurrentIndex(idx)}
                  className={`
                    py-3 px-1 rounded-lg text-center
                    transition-all duration-200 touch-manipulation
                    ${isActive 
                      ? 'bg-gray-800 text-white shadow-lg scale-[1.02]' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                    border-2 border-transparent
                    ${isActive ? 'border-gray-800' : 'hover:border-gray-300'}
                    relative
                  `}
                >
                  <div className="text-sm font-bold">
                    {getDayShort(day)}
                  </div>
                  <div className="text-[10px] opacity-70">
                    {classCount} cls
                  </div>
                  {isTodayDay && (
                    <span className={`
                      absolute -top-1 -right-1 w-3 h-3 rounded-full 
                      ${isActive ? 'bg-green-400' : 'bg-green-500'}
                      border-2 border-white
                    `}></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={goForward}
            className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold bg-gray-100 text-gray-800 hover:bg-gray-200 active:scale-95 transition-all duration-200 touch-manipulation"
            aria-label="Next day"
          >
            ›
          </button>
        </div>
      </div>

      {/* Schedule Cards */}
      {dayItems.length > 0 ? (
        <div className="space-y-3">
          {dayItems.map((period) => {
            const isLive = isClassLive(period.time);
            
            return (
              <div 
                key={period.period} 
                className={`
                  bg-white border-2 rounded-xl overflow-hidden
                  ${isLive ? 'border-green-500 shadow-lg shadow-green-100' : 'border-gray-800'}
                  transition-all duration-200
                `}
              >
                {/* Period Header */}
                <div className={`
                  flex items-center justify-between px-4 py-2.5
                  ${isLive ? 'bg-green-50' : 'bg-gray-100'}
                  border-b-2 ${isLive ? 'border-green-500' : 'border-gray-800'}
                `}>
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-bold text-gray-900">
                      Period {period.period}
                    </span>
                    {isLive && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-green-600">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        LIVE
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-medium text-gray-600">
                    {period.time}
                  </span>
                </div>

                {/* Class Items — Vertical Split (A/B side by side) */}
                <div className="p-3">
                  {period.items.length === 1 ? (
                    // Single class — full width
                    <div className="py-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-bold text-gray-900">
                            {period.items[0].batch || 'A'} {getShortSubject(period.items[0].subject)}
                          </span>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {period.items[0].teacher}
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-lg">
                          {period.items[0].room}
                        </span>
                      </div>
                    </div>
                  ) : (
                    // Multiple classes — split vertically (A left, B right)
                    <div className="grid grid-cols-2 gap-3">
                      {period.items.map((item, idx) => {
                        const batch = item.batch || 'A';
                        const shortName = getShortSubject(item.subject);
                        return (
                          <div key={idx} className={`
                            p-3 rounded-lg border-2
                            ${batch === 'A' ? 'border-blue-200 bg-blue-50/50' : 'border-orange-200 bg-orange-50/50'}
                          `}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-bold text-gray-500">Batch {batch}</span>
                              <span className="text-xs font-medium text-gray-600">{item.room}</span>
                            </div>
                            <div className="text-sm font-bold text-gray-900">
                              {shortName}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              {item.teacher}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border-2 border-gray-800 rounded-xl p-10 text-center">
          <p className="text-5xl mb-3">🎉</p>
          <p className="text-gray-500 font-medium">No classes on {selectedDay}</p>
          <p className="text-sm text-gray-400 mt-1">Enjoy your day off!</p>
        </div>
      )}
    </div>
  );
}

export default MobileSchedule;