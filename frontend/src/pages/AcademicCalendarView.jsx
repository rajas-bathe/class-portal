import { useNavigate } from 'react-router-dom';
import { academicCalendarData, CATEGORY_CONFIG } from '../data/academicCalendarData';

// ─── Constants ───────────────────────────────────────────────────────────────
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DAY_ABBREVS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

// Priority when two events land on the same calendar day
const CATEGORY_PRIORITY = { holiday: 6, exam: 5, review: 4, important: 3, meeting: 2, attendance: 1 };

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

// Returns { day: category } for every event date that falls in year/month
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

// ─── MiniCalendar ─────────────────────────────────────────────────────────────
function MiniCalendar({ year, month, dateMap }) {
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month, 0).getDate();

  // Build flat array of cells: nulls for leading blanks, then day numbers
  const cells = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null); // trailing blanks

  return (
    <div className="select-none w-full">
      {/* Day-of-week header */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_ABBREVS.map((abbr, i) => (
          <div
            key={abbr}
            className={`text-center text-[10px] font-bold py-1 ${
              i === 0 ? 'text-blue-600' : i === 6 ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            {abbr}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, idx) => {
          const colIdx = idx % 7;
          const category = day ? dateMap[day] : null;

          // Decide colour
          let cellClass = '';
          if (category) {
            cellClass = CATEGORY_CONFIG[category]?.calCell ?? 'bg-gray-200';
          } else if (colIdx === 0) {
            cellClass = 'text-blue-600 font-medium';
          } else if (colIdx === 6) {
            cellClass = 'text-red-500';
          } else {
            cellClass = 'text-gray-700';
          }

          return (
            <div key={idx} className="flex items-center justify-center h-7">
              {day ? (
                <span
                  className={`flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-medium transition-all ${cellClass}`}
                >
                  {day}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── EventRow ─────────────────────────────────────────────────────────────────
function EventRow({ event }) {
  const cfg = CATEGORY_CONFIG[event.category] ?? CATEGORY_CONFIG.important;
  const dateLabel = event.endDate
    ? `${formatDate(event.startDate)} – ${formatDate(event.endDate)}`
    : formatDate(event.startDate);

  return (
    <div className={`flex items-start gap-2.5 px-3 py-2.5 rounded-lg border ${cfg.bg} ${cfg.border}`}>
      {/* Coloured dot */}
      <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot}`} />

      <div className="flex-1 min-w-0">
        {/* Date */}
        <p className={`text-[10px] font-mono font-semibold leading-none mb-0.5 ${cfg.text} opacity-70`}>
          {dateLabel}
        </p>
        {/* Title */}
        <p className={`text-xs font-semibold leading-snug ${cfg.text}`}>
          {event.title}
        </p>
      </div>

      {/* Category badge — hidden on xs screens to save space */}
      <span
        className={`hidden sm:inline-flex flex-shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${cfg.bg} ${cfg.text} ${cfg.border}`}
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
  const monthLabel = `${MONTH_NAMES[month - 1].toUpperCase()}  ${year}`;

  return (
    <div className="bg-white border-2 border-gray-800 rounded-xl overflow-hidden shadow-sm">
      {/* Month Header */}
      <div className="bg-yellow-300 border-b-2 border-gray-800 px-4 py-2.5">
        <h3 className="text-center text-sm font-bold text-gray-900 tracking-widest">
          {monthLabel}
        </h3>
      </div>

      {/* Two-column body: calendar left, events right */}
      <div className="flex flex-col md:flex-row">
        {/* ── Mini Calendar (fixed width on md+) ── */}
        <div className="p-4 md:w-60 md:flex-shrink-0 md:border-r-2 border-gray-100">
          <MiniCalendar year={year} month={month} dateMap={dateMap} />
        </div>

        {/* ── Events list ── */}
        <div className="flex-1 p-4 border-t-2 md:border-t-0 border-gray-100 space-y-2">
          {events.length === 0 ? (
            <p className="text-gray-400 text-xs text-center py-6">No events this month.</p>
          ) : (
            events.map((event, i) => <EventRow key={i} event={event} />)
          )}

          {/* Notes / footnotes */}
          {notes?.length > 0 && (
            <div className="pt-1 space-y-1.5">
              {notes.map((note, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 px-3 py-2 bg-yellow-50 border border-yellow-300 rounded-lg"
                >
                  <span className="flex-shrink-0 text-amber-500 text-xs">📌</span>
                  <p className="text-xs font-semibold text-amber-900 leading-snug">{note}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Legend ───────────────────────────────────────────────────────────────────
function Legend() {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => (
        <div
          key={key}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${cfg.bg} ${cfg.text} ${cfg.border}`}
        >
          <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
          {cfg.label}
        </div>
      ))}
    </div>
  );
}

// ─── TermSchedule ─────────────────────────────────────────────────────────────
function TermSchedule({ data }) {
  return (
    <div className="bg-white border-2 border-gray-800 rounded-xl overflow-hidden shadow-sm">
      <div className="bg-yellow-300 border-b-2 border-gray-800 px-4 py-2.5">
        <h3 className="text-center text-sm font-bold text-gray-900 tracking-widest">
          TERM SCHEDULE
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b-2 border-gray-200">
              <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider w-16">
                Sr. No.
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Activity
              </th>
              <th className="px-4 py-3 text-right text-[11px] font-bold text-gray-500 uppercase tracking-wider w-28">
                Weeks
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.srNo} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-500 text-center">{row.srNo}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-800">{row.activity}</td>
                <td className="px-4 py-3 text-right">
                  <span className="inline-block bg-blue-100 text-blue-800 font-bold text-sm px-3 py-0.5 rounded-full">
                    {row.weeks}
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

// ─── Page ─────────────────────────────────────────────────────────────────────
function AcademicCalendarView() {
  const navigate = useNavigate();
  const { title, subtitle, months, termSchedule } = academicCalendarData;

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
      >
        ← Back
      </button>

      {/* Page header */}
      <div className="text-center space-y-2">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
          📅 {title}
        </h1>
        <p className="text-xs text-gray-500 leading-relaxed max-w-2xl mx-auto">{subtitle}</p>
      </div>

      {/* Colour legend */}
      <Legend />

      {/* Month sections */}
      {months.map((monthData, i) => (
        <MonthSection key={i} data={monthData} />
      ))}

      {/* Term schedule */}
      <TermSchedule data={termSchedule} />
    </div>
  );
}

export default AcademicCalendarView;