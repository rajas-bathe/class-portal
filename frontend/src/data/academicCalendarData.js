// ─── Category Config ────────────────────────────────────────────────────────
// Defines colors and labels matching the website's clean, high-contrast palette
export const CATEGORY_CONFIG = {
  holiday: {
    label: 'Holiday',
    badge: 'bg-red-100 text-red-800 border-red-300',
    leftBorder: 'border-l-red-500',
    dot: 'bg-red-500',
    calCell: 'bg-red-500 text-white font-bold',
  },
  exam: {
    label: 'Examination',
    badge: 'bg-blue-100 text-blue-800 border-blue-300',
    leftBorder: 'border-l-blue-600',
    dot: 'bg-blue-600',
    calCell: 'bg-blue-600 text-white font-bold',
  },
  important: {
    label: 'Academic',
    badge: 'bg-amber-100 text-amber-900 border-amber-300',
    leftBorder: 'border-l-amber-500',
    dot: 'bg-amber-500',
    calCell: 'bg-amber-400 text-gray-900 font-bold',
  },
  meeting: {
    label: 'Meeting',
    badge: 'bg-purple-100 text-purple-800 border-purple-300',
    leftBorder: 'border-l-purple-500',
    dot: 'bg-purple-500',
    calCell: 'bg-purple-500 text-white font-bold',
  },
  attendance: {
    label: 'Attendance',
    badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    leftBorder: 'border-l-emerald-500',
    dot: 'bg-emerald-500',
    calCell: 'bg-emerald-500 text-white font-bold',
  },
  review: {
    label: 'Project Review',
    badge: 'bg-teal-100 text-teal-800 border-teal-300',
    leftBorder: 'border-l-teal-500',
    dot: 'bg-teal-500',
    calCell: 'bg-teal-500 text-white font-bold',
  },
};

// ─── Calendar Data ───────────────────────────────────────────────────────────
export const academicCalendarData = {
  title: 'Academic Calendar (SH-2026)',
  months: [
    // ── JUNE 2026 ─────────────────────────────────────────────────────────────
    {
      year: 2026,
      month: 6,
      events: [
        {
          startDate: '2026-06-09',
          endDate: null,
          title: 'Holiday: Muharram',
          category: 'holiday',
        },
        {
          startDate: '2026-06-10',
          endDate: null,
          title:
            'Display of Time-table & Roll Call List as per Electives — UG and PG. Display List of mentors and Class Teachers. Display List of Experiments.',
          category: 'important',
        },
        {
          startDate: '2026-06-29',
          endDate: null,
          title:
            'Commencement of the Term SH2026 for UG-SY, TY, B.Tech, BVOC and WP.',
          category: 'important',
        },
        {
          startDate: '2026-06-30',
          endDate: null,
          title: 'Mentor Mentee Meeting',
          category: 'meeting',
        },
      ],
      notes: [
        'Registration on ERP for admission to the course — within two weeks of declaration of results.',
      ],
    },

    // ── JULY 2026 ─────────────────────────────────────────────────────────────
    {
      year: 2026,
      month: 7,
      events: [
        {
          startDate: '2026-07-04',
          endDate: null,
          title: 'Project Title Finalization Review',
          category: 'review',
        },
        {
          startDate: '2026-07-29',
          endDate: null,
          title: 'Display of Attendance Record 1',
          category: 'attendance',
        },
        {
          startDate: '2026-07-31',
          endDate: null,
          title: 'Mentor Mentee Meeting',
          category: 'meeting',
        },
      ],
      notes: [],
    },

    // ── AUGUST 2026 ───────────────────────────────────────────────────────────
    {
      year: 2026,
      month: 8,
      events: [
        {
          startDate: '2026-08-06',
          endDate: null,
          title: 'Holiday: Id-E-Milad',
          category: 'holiday',
        },
        {
          startDate: '2026-08-12',
          endDate: '2026-08-14',
          title:
            'Project Review I of UG and PG Programme (CEP / Capstone / Dissertation etc.)',
          category: 'review',
        },
        {
          startDate: '2026-08-15',
          endDate: null,
          title: 'Holiday: Independence Day Celebration',
          category: 'holiday',
        },
        {
          startDate: '2026-08-28',
          endDate: null,
          title: 'Display of Attendance Record 2',
          category: 'attendance',
        },
        {
          startDate: '2026-08-31',
          endDate: null,
          title: 'Mentor Mentee Meeting',
          category: 'meeting',
        },
      ],
      notes: [],
    },

    // ── SEPTEMBER 2026 ────────────────────────────────────────────────────────
    {
      year: 2026,
      month: 9,
      events: [
        {
          startDate: '2026-09-04',
          endDate: '2026-09-18',
          title: 'Ganesh Festival (Mid Term Break)',
          category: 'holiday',
        },
        {
          startDate: '2026-09-05',
          endDate: null,
          title: 'Parent Teacher Meeting',
          category: 'meeting',
        },
        {
          startDate: '2026-09-25',
          endDate: null,
          title: 'Mentor Mentee Meeting',
          category: 'meeting',
        },
        {
          startDate: '2026-09-28',
          endDate: '2026-10-05',
          title: 'Mid Semester Examinations for SY, TY, B.Tech, BVOC and WP',
          category: 'exam',
        },
        {
          startDate: '2026-09-29',
          endDate: null,
          title: 'Display of Attendance Record 3',
          category: 'attendance',
        },
      ],
      notes: [],
    },

    // ── OCTOBER 2026 ──────────────────────────────────────────────────────────
    {
      year: 2026,
      month: 10,
      events: [
        {
          startDate: '2026-09-28',
          endDate: '2026-10-05',
          title: 'Mid Semester Examinations for SY, TY, B.Tech, BVOC and WP',
          category: 'exam',
        },
        {
          startDate: '2026-10-02',
          endDate: null,
          title: 'Holiday: Gandhi Jayanti',
          category: 'holiday',
        },
        {
          startDate: '2026-10-14',
          endDate: '2026-10-16',
          title:
            'Project Review II of UG and PG Programme (CEP / Capstone / Dissertation etc.)',
          category: 'review',
        },
        {
          startDate: '2026-10-17',
          endDate: null,
          title: 'Mid Semester Examination Result Declaration',
          category: 'important',
        },
        {
          startDate: '2026-10-20',
          endDate: null,
          title: 'Holiday: Dassera',
          category: 'holiday',
        },
        {
          startDate: '2026-10-30',
          endDate: null,
          title: 'Mentor-Mentee Meeting — End of the Term SH2026',
          category: 'meeting',
        },
      ],
      notes: [],
    },

    // ── NOVEMBER 2026 ─────────────────────────────────────────────────────────
    {
      year: 2026,
      month: 11,
      events: [
        {
          startDate: '2026-11-10',
          endDate: '2026-11-11',
          title: 'Holiday: Diwali',
          category: 'holiday',
        },
        {
          startDate: '2026-11-16',
          endDate: '2026-11-28',
          title: 'End Semester Theory Examination',
          category: 'exam',
        },
        {
          startDate: '2026-11-30',
          endDate: null,
          title: 'Holiday: Guru Nanak Jayanti',
          category: 'holiday',
        },
        {
          startDate: '2026-11-30',
          endDate: '2026-12-10',
          title: 'End Semester Practical Examination',
          category: 'exam',
        },
      ],
      notes: [],
    },

    // ── DECEMBER 2026 ─────────────────────────────────────────────────────────
    {
      year: 2026,
      month: 12,
      events: [
        {
          startDate: '2026-11-30',
          endDate: '2026-12-10',
          title: 'End Semester Practical Examination',
          category: 'exam',
        },
        {
          startDate: '2026-12-01',
          endDate: '2026-12-10',
          title: 'Ph.D Assessment',
          category: 'review',
        },
        {
          startDate: '2026-12-25',
          endDate: null,
          title: 'Holiday: Christmas',
          category: 'holiday',
        },
        {
          startDate: '2026-12-31',
          endDate: null,
          title: 'End Semester Exam Result Declaration',
          category: 'important',
        },
      ],
      notes: [
        'Commencement of Supplementary and Backlog Examination for UG, PG and Ph.D. Programme — after one month of declaration of result of main examination.',
      ],
    },

    // ── JANUARY 2027 ──────────────────────────────────────────────────────────
    {
      year: 2027,
      month: 1,
      events: [
        {
          startDate: '2027-01-04',
          endDate: null,
          title:
            'Commencement of the term FH2027 for S.Y., T.Y., Final Year of UG, PG and Ph.D. Programme',
          category: 'important',
        },
      ],
      notes: [],
    },
  ],

  termSchedule: [
    {
      srNo: 1,
      activity: 'Teaching Learning from 29/06/2026 to 30/10/2026',
      weeks: 18,
    },
  ],
};
