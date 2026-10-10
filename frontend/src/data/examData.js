export const examTypes = ['mse', 'ese', 'espe'];

export const examData = {
  mse: {
    name: 'Mid Semester Examination (MSE) — SH 2026',
    isLocked: false,
    timing: '10:30 am – 11:30 am',
    schedule: [
      {
        day: 'Monday',
        date: '28/09/2026',
        time: '10:30 am – 11:30 am',
        subject: 'Operating System',
        code: 'OS',
      },
      {
        day: 'Tuesday',
        date: '29/09/2026',
        time: '10:30 am – 11:30 am',
        subject: 'Data Structures',
        code: 'DS',
      },
      {
        day: 'Wednesday',
        date: '30/09/2026',
        time: '10:30 am – 11:30 am',
        subject: 'Foundation of Embedded System',
        code: 'FES',
      },
    ],
  },
  ese: {
    name: 'End Semester Theory Examination (ESE)',
    isLocked: true,
    approxTime: 'Mid to Late November',
    schedule: [
      { subject: 'Operating System', code: 'OS', date: 'TBA', time: 'TBA' },
      { subject: 'Data Structures', code: 'DS', date: 'TBA', time: 'TBA' },
      { subject: 'Foundation of Embedded System', code: 'FES', date: 'TBA', time: 'TBA' },
    ],
  },
  espe: {
    name: 'End Semester Practical Examination (ESPE)',
    isLocked: true,
    approxTime: 'Mid to Late November',
    schedule: [
      { subject: 'Operating System Practical', code: 'OS Lab', date: 'TBA', time: 'TBA' },
      { subject: 'Data Structures Practical', code: 'DS Lab', date: 'TBA', time: 'TBA' },
      { subject: 'Microprocessor Practical', code: 'MP Lab', date: 'TBA', time: 'TBA' },
    ],
  },
};