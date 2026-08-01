import React, { useMemo } from 'react';
import { getSubjectShort, isCurrentPeriod } from '../../utils/timetableHelpers';

/**
 * IMPORTANT LAYOUT INVARIANT — read before touching this file
 * ---------------------------------------------------------------------
 * HTML tables assign column position purely by left-to-right <td> order
 * within a row — there is no such thing as "day 3's column" unless every
 * row emits the exact same NUMBER of <td> elements for every day. If one
 * day emits 1 <td> in a row while neighboring days emit 2, everything to
 * its right silently shifts one column left for that row, even though
 * each individual day's own rowSpan math was correct in isolation. This
 * was the root cause of the misaligned columns in the previous version.
 *
 * Fix: every day ALWAYS contributes exactly ONE <td> group per period
 * row — either:
 *   - one unified <td colSpan={2}> when both batches share the same
 *     class (or the period is empty), or
 *   - two <td>s (A, B) when batches differ,
 * and rowSpan is used to merge vertically within a day. The colSpan on
 * the unified case reserves both grid columns, so total column count
 * per row stays fixed at 2 (period+time) + 2*days.length regardless of
 * which days are unified vs split that row.
 */
function buildDayColumn(day, periods, getFilteredItemsForPeriod) {
  const periodItems = periods.map((p) => (p.isBreak ? [] : getFilteredItemsForPeriod(day, p.time)));

  const keyOf = (item) => `${item.subject}|${item.teacher}|${item.room}`;

  const groupByBatch = (items) => {
    const out = { A: null, B: null };
    items.forEach((item) => {
      if (item.batch === 'A') out.A = item;
      else if (item.batch === 'B') out.B = item;
    });
    return out;
  };

  const grouped = periodItems.map(groupByBatch);

  // unified[i] = true if this period's A and B are the same class (or
  // both empty) and should render as one merged cell.
  const unified = grouped.map((g) => {
    if (!g.A && !g.B) return true; // empty period
    if (g.A && g.B && keyOf(g.A) === keyOf(g.B)) return true; // same class
    return false;
  });

  const rowSpan = periods.map(() => 1);
  const skip = periods.map(() => false); // whole-row skip, for unified runs
  const rowSpanFor = periods.map(() => ({ A: 1, B: 1 }));
  const skipSlot = periods.map(() => ({ A: false, B: false })); // per-slot skip, for split runs

  let i = 0;
  while (i < periods.length) {
    if (periods[i].isBreak) {
      i += 1;
      continue;
    }
    if (unified[i]) {
      const cur = grouped[i].A; // representative content (or null if empty)
      const curKey = cur ? keyOf(cur) : null;
      let j = i + 1;
      while (
        j < periods.length &&
        !periods[j].isBreak &&
        unified[j] &&
        (grouped[j].A ? keyOf(grouped[j].A) : null) === curKey
      ) {
        skip[j] = true;
        j += 1;
      }
      rowSpan[i] = j - i;
      i = j;
      continue;
    }

    // Split period (A != B). Merge each slot independently, but only
    // through a run of periods that are ALSO split (never merge a split
    // slot's run into a neighboring unified period).
    const slotSpan = { A: 1, B: 1 };
    ['A', 'B'].forEach((slot) => {
      const cur = grouped[i][slot];
      let k = i + 1;
      if (!cur) {
        while (
          k < periods.length &&
          !periods[k].isBreak &&
          !unified[k] &&
          !grouped[k][slot]
        ) {
          skipSlot[k][slot] = true;
          k += 1;
        }
      } else {
        while (
          k < periods.length &&
          !periods[k].isBreak &&
          !unified[k] &&
          grouped[k][slot] &&
          keyOf(grouped[k][slot]) === keyOf(cur)
        ) {
          skipSlot[k][slot] = true;
          k += 1;
        }
      }
      slotSpan[slot] = k - i;
    });
    rowSpanFor[i].A = slotSpan.A;
    rowSpanFor[i].B = slotSpan.B;
    i += 1;
  }

  return { grouped, unified, rowSpan, skip, rowSpanFor, skipSlot };
}

function SubjectBlock({ item }) {
  if (!item) return null;
  const shortName = getSubjectShort(item.subject);
  return (
    <div className="leading-tight text-center">
      <div className="font-semibold text-gray-900">{shortName}</div>
      <div className="text-gray-600 text-[9px] md:text-xs">
        /{item.teacher} &middot; {item.room}
      </div>
    </div>
  );
}

function TimetableGrid({
  days,
  periods,
  today,
  getFilteredItemsForPeriod,
}) {
  const dayColumns = useMemo(() => {
    const map = {};
    days.forEach((day) => {
      map[day] = buildDayColumn(day, periods, getFilteredItemsForPeriod);
    });
    return map;
  }, [days, periods, getFilteredItemsForPeriod]);

  const totalCols = 2 + days.length * 2;

  return (
    <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden border-2 border-gray-800">

      {/* Header - College Info */}
      <div className="p-3 md:p-4 border-b-2 border-gray-800 bg-gray-100">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1 md:gap-2">
          <div>
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

      {/* Timetable Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[700px] md:min-w-full border-collapse text-xs md:text-sm table-fixed">
          <thead>
            <tr className="bg-gray-200 border-b-2 border-gray-800">
              <th className="p-1.5 md:p-3 text-center font-bold text-gray-900 sticky left-0 bg-gray-200 z-10 w-[50px] md:w-[70px] border-r-2 border-gray-800">
                Period
              </th>
              <th className="p-1.5 md:p-3 text-center font-bold text-gray-900 w-[80px] md:w-[110px] border-r-2 border-gray-800">
                Time
              </th>
              {days.map((day) => (
                <th key={day} colSpan={2} className={`
                  p-1.5 md:p-3 text-center font-bold text-gray-900 min-w-[110px] md:min-w-[150px]
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
              // BREAK band — a single full-width row, no per-day cells at all.
              if (period.isBreak) {
                return (
                  <tr key={period.number} className="bg-gray-200 border-b-2 border-gray-800">
                    <td className="p-1.5 md:p-3 text-center font-bold text-gray-900 border-r-2 border-gray-800 text-xs md:text-sm">
                      {period.number}
                    </td>
                    <td className="p-1.5 md:p-3 text-center font-medium text-gray-800 border-r-2 border-gray-800 text-xs md:text-sm">
                      {period.time}
                    </td>
                    <td colSpan={totalCols - 2} className="p-1.5 md:p-2 text-center font-bold tracking-widest text-gray-700 text-xs md:text-sm">
                      BREAK
                    </td>
                  </tr>
                );
              }

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

                  {/* Days — every day ALWAYS contributes exactly 2 grid
                      columns per row (via colSpan for unified cells, or
                      two <td>s for split cells), so column position never
                      drifts between days regardless of what any other
                      day is doing that row. */}
                  {days.map((day) => {
                    const { grouped, unified, rowSpan, skip, rowSpanFor, skipSlot } = dayColumns[day];
                    const isToday = day === today;
                    const bg = isToday ? 'bg-gray-100' : '';
                    const bgCurrent = isCurrent && isToday ? 'bg-yellow-100' : '';

                    if (unified[rowIndex]) {
                      if (skip[rowIndex]) return null; // covered by a rowSpan above
                      const item = grouped[rowIndex].A; // representative (A === B content), or null
                      return (
                        <td
                          key={`${day}-${period.number}`}
                          colSpan={2}
                          rowSpan={rowSpan[rowIndex]}
                          className={`
                            p-1 md:p-1.5 align-middle text-center
                            ${bg} ${bgCurrent}
                            border-r-2 border-gray-800 last:border-r-0
                            text-[10px] md:text-sm
                          `}
                        >
                          {item ? <SubjectBlock item={item} /> : <span className="text-gray-300">—</span>}
                        </td>
                      );
                    }

                    // Split A | B cell
                    const g = grouped[rowIndex];
                    const skipA = skipSlot[rowIndex].A;
                    const skipB = skipSlot[rowIndex].B;
                    const spanA = rowSpanFor[rowIndex].A;
                    const spanB = rowSpanFor[rowIndex].B;

                    return (
                      <React.Fragment key={`${day}-${period.number}`}>
                        {!skipA && (
                          <td
                            rowSpan={spanA}
                            className={`
                              p-1 md:p-1.5 align-middle
                              ${bg} ${bgCurrent}
                              border-r border-gray-300
                              text-[10px] md:text-sm
                            `}
                          >
                            {g.A ? (
                              <div className="flex flex-col items-center justify-center text-center">
                                <span className="text-[8px] md:text-[10px] font-bold text-gray-500 mb-0.5">A</span>
                                <SubjectBlock item={g.A} />
                              </div>
                            ) : (
                              <span className="text-gray-300">—</span>
                            )}
                          </td>
                        )}
                        {!skipB && (
                          <td
                            rowSpan={spanB}
                            className={`
                              p-1 md:p-1.5 align-middle
                              ${bg} ${bgCurrent}
                              border-r-2 border-gray-800 last:border-r-0
                              text-[10px] md:text-sm
                            `}
                          >
                            {g.B ? (
                              <div className="flex flex-col items-center justify-center text-center">
                                <span className="text-[8px] md:text-[10px] font-bold text-gray-500 mb-0.5">B</span>
                                <SubjectBlock item={g.B} />
                              </div>
                            ) : (
                              <span className="text-gray-300">—</span>
                            )}
                          </td>
                        )}
                      </React.Fragment>
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