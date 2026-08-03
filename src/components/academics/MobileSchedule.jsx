import React, { useState, useMemo, useCallback } from 'react';

function MobileSchedule({ days, periods, today, getFilteredItemsForPeriod }) {
  // Find today's index
  const todayIndex = days.indexOf(today);
  const [currentIndex, setCurrentIndex] = useState(todayIndex);

  const getDayItems = (day) => {
    const items = [];
    periods.forEach(period => {
      if (period.isBreak) {
        items.push({ period: period.number, time: period.time, items: [], isBreak: true });
        return;
      }
      const dayItems = getFilteredItemsForPeriod(day, period.time);
      if (dayItems.length > 0) {
        items.push({
          period: period.number,
          time: period.time,
          items: dayItems,
          isBreak: false
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

  const keyOf = (it) => `${it.subject}|${it.teacher}|${it.room}`;

  const sameContent = (itemsA, itemsB) => {
    if (itemsA.length !== itemsB.length) return false;
    const mapA = {};
    itemsA.forEach((it) => { mapA[it.batch || 'A'] = keyOf(it); });
    const mapB = {};
    itemsB.forEach((it) => { mapB[it.batch || 'A'] = keyOf(it); });
    const batchesA = Object.keys(mapA).sort();
    const batchesB = Object.keys(mapB).sort();
    if (batchesA.join(',') !== batchesB.join(',')) return false;
    return batchesA.every((b) => mapA[b] === mapB[b]);
  };

  // Merge consecutive periods (no break/gap between them) that have the
  // exact same class(es) scheduled into a single block — mirrors the
  // desktop grid's rowSpan behaviour for a lecture spanning multiple hours.
  const groupConsecutivePeriods = (entries) => {
    const groups = [];
    let i = 0;
    while (i < entries.length) {
      if (entries[i].isBreak) {
        groups.push({
          isBreak: true,
          periodStart: entries[i].period,
          periodEnd: entries[i].period,
          time: entries[i].time,
          items: [],
        });
        i += 1;
        continue;
      }
      let j = i + 1;
      while (
        j < entries.length &&
        !entries[j].isBreak &&
        entries[j].period === entries[j - 1].period + 1 &&
        sameContent(entries[i].items, entries[j].items)
      ) {
        j += 1;
      }
      const block = entries.slice(i, j);
      const startTime = block[0].time.split('-')[0];
      const endTime = block[block.length - 1].time.split('-')[1];
      groups.push({
        isBreak: false,
        periodStart: block[0].period,
        periodEnd: block[block.length - 1].period,
        time: `${startTime}-${endTime}`,
        items: block[0].items,
      });
      i = j;
    }
    return groups;
  };

  const dayBlocks = useMemo(() => groupConsecutivePeriods(dayItems), [dayItems]);
  const hasClasses = dayItems.some((entry) => !entry.isBreak);

  const isClassLive = (time) => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);
    const [start, end] = time.split('-');
    return start <= currentTime && end >= currentTime;
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

  return (
    <div className="space-y-4">
      {/* Day Selector — Smaller & without class count */}
      <div className="bg-white border-2 border-gray-800 rounded-xl p-3">
        <div className="flex items-center gap-2">
          {/* Left Arrow */}
          <button
            onClick={goBack}
            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-base font-bold bg-gray-100 text-gray-800 hover:bg-gray-200 active:scale-95 transition-all duration-200 touch-manipulation"
            aria-label="Previous day"
          >
            ‹
          </button>

          {/* Day Buttons — 3 visible days in circular order */}
          <div className="flex-1 grid grid-cols-3 gap-1.5">
            {visibleIndices.map((idx) => {
              const day = days[idx];
              const isActive = idx === currentIndex;
              const isTodayDay = day === today;
              
              return (
                <button
                  key={day}
                  onClick={() => setCurrentIndex(idx)}
                  className={`
                    py-2 px-1 rounded-lg text-center
                    transition-all duration-200 touch-manipulation
                    ${isActive 
                      ? 'bg-gray-800 text-white shadow-sm' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                    border border-transparent
                    ${isActive ? 'border-gray-800' : 'hover:border-gray-300'}
                    relative
                  `}
                >
                  <div className="text-xs font-bold uppercase tracking-wide">
                    {getDayShort(day)}
                  </div>
                  {isTodayDay && (
                    <span className={`
                      absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full 
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
            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-base font-bold bg-gray-100 text-gray-800 hover:bg-gray-200 active:scale-95 transition-all duration-200 touch-manipulation"
            aria-label="Next day"
          >
            ›
          </button>
        </div>
      </div>

      {/* Schedule Cards — consecutive periods with identical class(es) are
          already merged into one block by groupConsecutivePeriods, so a
          2-hour lecture renders as a single card, not two stacked ones.
          Break periods render as their own flat grey band. */}
      {hasClasses ? (
        <div className="space-y-3">
          {dayBlocks.map((block) => {
            if (block.isBreak) {
              return (
                <div
                  key={block.periodStart}
                  className="bg-gray-200 border-2 border-gray-800 rounded-xl px-4 py-3 flex items-center justify-between"
                >
                  <span className="text-sm font-bold text-gray-900">
                    {block.time}
                  </span>
                  <span className="text-xs font-bold tracking-widest text-gray-600">
                    BREAK
                  </span>
                </div>
              );
            }

            const isLive = isClassLive(block.time);
            const periodLabel =
              block.periodStart === block.periodEnd
                ? `Period ${block.periodStart}`
                : `Period ${block.periodStart}-${block.periodEnd}`;
            const isUnified =
              block.items.length === 1 ||
              (block.items.length === 2 && keyOf(block.items[0]) === keyOf(block.items[1]));

            return (
              <div 
                key={block.periodStart} 
                className={`
                  bg-white border-2 rounded-xl overflow-hidden
                  ${isLive ? 'border-green-500 shadow-lg shadow-green-100' : 'border-gray-800'}
                  transition-all duration-200
                `}
              >
                {/* Block Header */}
                <div className={`
                  flex items-center justify-between px-4 py-2.5
                  ${isLive ? 'bg-green-50' : 'bg-gray-100'}
                  border-b-2 ${isLive ? 'border-green-500' : 'border-gray-800'}
                `}>
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-bold text-gray-900">
                      {block.time}
                    </span>
                    {isLive && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-green-600">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        LIVE
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-medium text-gray-600">
                    {periodLabel}
                  </span>
                </div>

                {/* Class Items — no nested box; single flat area, split only
                    when batches actually differ. The unified block gets an
                    invisible label placeholder (same size as the real "A"/"B"
                    badge) so both card shapes are the same height. */}
                {isUnified ? (
                  <div className="p-3 flex flex-col items-center text-center">
                    <span className="text-[10px] font-bold text-transparent mb-1 select-none" aria-hidden="true">A</span>
                    <div className="text-sm font-bold text-gray-900">
                      {getShortSubject(block.items[0].subject)}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {block.items[0].teacher} &middot; {block.items[0].room}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 divide-x-2 divide-gray-300">
                    {block.items.map((item, idx) => {
                      const batch = item.batch || 'A';
                      const shortName = getShortSubject(item.subject);
                      return (
                        <div key={idx} className="p-3 flex flex-col items-center text-center">
                          <span className="text-[10px] font-bold text-gray-500 mb-1">
                            {batch}
                          </span>
                          <div className="text-sm font-bold text-gray-900">
                            {shortName}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {item.teacher} &middot; {item.room}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
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