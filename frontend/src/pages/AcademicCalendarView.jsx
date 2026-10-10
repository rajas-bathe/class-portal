import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { academicCalendarData, CATEGORY_CONFIG } from '../data/academicCalendarData';

// ─── Constants ───────────────────────────────────────────────────────────────
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DAY_HEADERS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

// Priority when multiple events occur on the same day
const CATEGORY_PRIORITY = {
  holiday: 6,
  exam: 5,
  review: 4,
  important: 3,
  meeting: 2,
  attendance: 1,
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

function buildDateMap(events, year, month) {
  const map = {};
  events.forEach(({ startDate, endDate, category }) => {
    const start = new Date(`${startDate}T00:00:00`);
    const end = endDate ? new Date(`${endDate}T00:00:00`) : new Date(`${startDate}T00:00:00`);
    const cur = new Date(start);
    while (cur <= end) {
      if (cur.getFullYear() === year && cur.getMonth() + 1 === month) {
        const d = cur.getDate();
        if (!map[d] || CATEGORY_PRIORITY[category] > CATEGORY_PRIORITY[map[d]]) {
          map[d] = category;
        }
      }
      cur.setDate(cur.getDate() + 1);
    }
  });
  return map;
}

// ─── MiniCalendar (Authentic Grid Layout) ────────────────────────────────────
function MiniCalendar({ year, month, dateMap }) {
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month, 0).getDate();

  const cells = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="w-full select-none">
      {/* Calendar Grid Table */}
      <div className="border-2 border-gray-800 rounded-lg overflow-hidden bg-white">
        {/* Day Header Row */}
        <div className="grid grid-cols-7 bg-gray-100 border-b-2 border-gray-800 text-center">
          {DAY_HEADERS.map((day, i) => (
            <div
              key={day}
              className={`py-1.5 text-[10px] font-extrabold border-r border-gray-300 last:border-r-0 ${
                i === 0
                  ? 'text-blue-700 bg-blue-50/60'
                  : i === 6
                  ? 'text-red-600 bg-red-50/60'
                  : 'text-gray-700'
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 divide-x divide-y divide-gray-200">
          {cells.map((day, idx) => {
            const colIdx = idx % 7;
            const category = day ? dateMap[day] : null;
            const isSunday = colIdx === 0;
            const isSaturday = colIdx === 6;

            let cellContent = null;
            if (day) {
              if (category) {
                const cfg = CATEGORY_CONFIG[category];
                cellContent = (
                  <span
                    className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-bold ${cfg.calCell}`}
                  >
                    {day}
                  </span>
                );
              } else {
                cellContent = (
                  <span
                    className={`text-xs font-semibold ${
                      isSunday
                        ? 'text-blue-700 font-bold'
                        : isSaturday
                        ? 'text-red-600 font-bold'
                        : 'text-gray-800'
                    }`}
                  >
                    {day}
                  </span>
                );
              }
            }

            return (
              <div
                key={idx}
                className={`h-9 flex items-center justify-center ${
                  !day ? 'bg-gray-50/50' : 'bg-white'
                }`}
              >
                {cellContent}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── EventRow (High Contrast, Clear Boundaries) ──────────────────────────────
function EventRow({ event }) {
  const cfg = CATEGORY_CONFIG[event.category] ?? CATEGORY_CONFIG.important;
  const dateLabel = event.endDate
    ? `${formatDate(event.startDate)} – ${formatDate(event.endDate)}`
    : formatDate(event.startDate);

  return (
    <div
      className={`bg-white border-2 border-gray-800 rounded-lg p-3 ${cfg.leftBorder} border-l-[6px] hover:shadow-sm transition-shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2`}
    >
      <div className="flex items-start gap-2.5 min-w-0">
        <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5 ${cfg.dot}`} />
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-mono text-[11px] font-bold bg-gray-100 text-gray-800 border border-gray-300 px-2 py-0.5 rounded">
              📅 {dateLabel}
            </span>
            <span
              className={`sm:hidden text-[10px] font-bold px-2 py-0.5 rounded-full border ${cfg.badge}`}
            >
              {cfg.label}
            </span>
          </div>
          <p className="text-sm font-bold text-gray-900 leading-snug">
            {event.title}
          </p>
        </div>
      </div>

      <span
        className={`hidden sm:inline-flex flex-shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full border ${cfg.badge}`}
      >
        {cfg.label}
      </span>
    </div>
  );
}

// ─── MonthSection ─────────────────────────────────────────────────────────────
function MonthSection({ data }) {
  const { year, month, events, notes } = data;
  const dateMap = buildDateMap(events, year, month);
  const monthLabel = `${MONTH_NAMES[month - 1].toUpperCase()} ${year}`;

  return (
    <div className="bg-white border-2 border-gray-800 rounded-xl overflow-hidden shadow-sm">
      {/* Yellow Top Banner */}
      <div className="bg-yellow-300 border-b-2 border-gray-800 px-4 py-2.5 flex items-center justify-between">
        <h3 className="text-base font-extrabold text-gray-900 tracking-wider">
          {monthLabel}
        </h3>
        <span className="text-xs font-bold bg-white border border-gray-800 px-2.5 py-0.5 rounded">
          {events.length} Event{events.length === 1 ? '' : 's'}
        </span>
      </div>

      {/* Two Column Layout: Left Calendar Grid | Right Event List */}
      <div className="flex flex-col md:flex-row">
        {/* Left: Mini Calendar with solid right border */}
        <div className="p-4 md:w-80 md:flex-shrink-0 md:border-r-2 md:border-gray-800 bg-gray-50/50 flex flex-col justify-start">
          <div className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <span>🗓️</span> Month Overview
          </div>
          <MiniCalendar year={year} month={month} dateMap={dateMap} />
        </div>

        {/* Right: Events List with clean spacing */}
        <div className="flex-1 p-4 md:p-5 border-t-2 md:border-t-0 border-gray-800 space-y-3 bg-white">
          <div className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <span>📌</span> Scheduled Events & Notices
          </div>

          {events.length === 0 ? (
            <div className="p-6 text-center text-gray-400 text-xs font-medium border border-dashed border-gray-300 rounded-lg">
              No specific events scheduled for this month.
            </div>
          ) : (
            <div className="space-y-2.5">
              {events.map((event, i) => (
                <EventRow key={i} event={event} />
              ))}
            </div>
          )}

          {/* Footnotes / Important Notes */}
          {notes?.length > 0 && (
            <div className="pt-2 space-y-2">
              {notes.map((note, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 px-3.5 py-2.5 bg-yellow-50 border-2 border-amber-300 rounded-lg text-amber-900 text-xs font-semibold leading-relaxed"
                >
                  <span className="text-base flex-shrink-0 leading-none">⚠️</span>
                  <span>{note}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Legend Component (Grounded Brutalist Card) ───────────────────────────────
function Legend() {
  return (
    <div className="bg-white border-2 border-gray-800 rounded-xl p-3.5 shadow-xs">
      <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
        Event Legend:
      </div>
      <div className="flex flex-wrap gap-2">
        {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => (
          <div
            key={key}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${cfg.badge}`}
          >
            <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
            {cfg.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Term Schedule Table ─────────────────────────────────────────────────────
function TermSchedule({ data }) {
  return (
    <div className="bg-white border-2 border-gray-800 rounded-xl overflow-hidden shadow-sm">
      <div className="bg-yellow-300 border-b-2 border-gray-800 px-4 py-2.5">
        <h3 className="text-sm font-extrabold text-gray-900 tracking-wider">
          📅 TERM SCHEDULE
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-gray-100 border-b-2 border-gray-800 text-gray-800 font-bold uppercase tracking-wider">
              <th className="py-2.5 px-4 w-16 border-r border-gray-300 text-center">Sr. No.</th>
              <th className="py-2.5 px-4 border-r border-gray-300">Activity</th>
              <th className="py-2.5 px-4 text-center w-36">Number of Weeks</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.srNo}
                className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors font-medium text-gray-800"
              >
                <td className="py-3 px-4 text-center font-bold border-r border-gray-200">
                  {row.srNo}
                </td>
                <td className="py-3 px-4 border-r border-gray-200 font-semibold text-gray-900">
                  {row.activity}
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="inline-block bg-gray-800 text-white font-bold text-xs px-3 py-1 rounded-full">
                    {row.weeks} Weeks
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Main Academic Calendar Page ─────────────────────────────────────────────
function AcademicCalendarView() {
  const navigate = useNavigate();
  const { title, months, termSchedule } = academicCalendarData;

  useEffect(() => {
    window.scrollTo(0, 0);
    const main = document.querySelector('main');
    if (main) main.scrollTop = 0;
  }, []);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* Back Button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-800 rounded-xl text-xs md:text-sm font-bold text-gray-900 hover:bg-gray-100 shadow-xs hover:shadow-sm active:scale-95 transition-all group"
        >
          <span className="text-base transition-transform group-hover:-translate-x-1 leading-none font-extrabold">←</span>
          <span>Back</span>
        </button>
      </div>

      {/* Page Header (Clean, Subtitle Removed) */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
          📅 {title}
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Academic schedule, examinations, holidays & important dates (June 2026 – January 2027)
        </p>
      </div>

      {/* Category Legend */}
      <Legend />

      {/* Month Cards */}
      <div className="space-y-6">
        {months.map((monthData, i) => (
          <MonthSection key={i} data={monthData} />
        ))}
      </div>

      {/* Term Schedule Table */}
      <TermSchedule data={termSchedule} />
    </div>
  );
}

export default AcademicCalendarView;