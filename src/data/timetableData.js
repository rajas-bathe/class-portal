// Period 3 (12:00-13:00) is the lunch BREAK — no classes are scheduled
// then. This mirrors the paper timetable exactly: periods 1-2 run
// 10:00-12:00, then break, then periods 4-7 run 13:00-17:00.
export const timetableData = {
  Monday: {
    classes: [
      { id: 1, period: 1, time: '10:00-11:00', subject: 'Microprocessor', teacher: 'VM', room: '603', batch: 'A' },
      { id: 2, period: 1, time: '10:00-11:00', subject: 'Operating System', teacher: 'AD', room: '604', batch: 'B' },
      { id: 3, period: 2, time: '11:00-12:00', subject: 'Microprocessor', teacher: 'VM', room: '603', batch: 'A' },
      { id: 4, period: 2, time: '11:00-12:00', subject: 'Operating System', teacher: 'AD', room: '604', batch: 'B' },
      { id: 5, period: 4, time: '13:00-14:00', subject: 'Foundation of Embedded System', teacher: 'AAK', room: '603', batch: 'A' },
      { id: 6, period: 4, time: '13:00-14:00', subject: 'Operating System', teacher: 'AD', room: '604', batch: 'B' },
      { id: 7, period: 5, time: '14:00-15:00', subject: 'Foundation of Embedded System', teacher: 'AAK', room: '603', batch: 'A' },
      { id: 8, period: 5, time: '14:00-15:00', subject: 'Operating System', teacher: 'AD', room: '604', batch: 'B' },
      { id: 9, period: 6, time: '15:00-16:00', subject: 'Microprocessor', teacher: 'VM', room: '609', batch: 'A' },
      { id: 10, period: 6, time: '15:00-16:00', subject: 'Microprocessor', teacher: 'VM', room: '609', batch: 'B' },
      { id: 11, period: 7, time: '16:00-17:00', subject: 'Microprocessor', teacher: 'VM', room: '609', batch: 'A' },
      { id: 12, period: 7, time: '16:00-17:00', subject: 'Microprocessor', teacher: 'VM', room: '609', batch: 'B' },
    ],
    labs: []
  },
  Tuesday: {
    classes: [
      { id: 13, period: 1, time: '10:00-11:00', subject: 'Operating System', teacher: 'AD', room: '623', batch: 'A' },
      { id: 14, period: 1, time: '10:00-11:00', subject: 'Foundation of Embedded System', teacher: 'AAK', room: '603', batch: 'B' },
      { id: 15, period: 2, time: '11:00-12:00', subject: 'Operating System', teacher: 'AD', room: '623', batch: 'A' },
      { id: 16, period: 2, time: '11:00-12:00', subject: 'Foundation of Embedded System', teacher: 'AAK', room: '603', batch: 'B' },
      { id: 17, period: 4, time: '13:00-14:00', subject: 'Microprocessor', teacher: 'VM', room: '609', batch: 'A' },
      { id: 18, period: 4, time: '13:00-14:00', subject: 'Microprocessor', teacher: 'VM', room: '609', batch: 'B' },
      { id: 19, period: 5, time: '14:00-15:00', subject: 'Microprocessor', teacher: 'VM', room: '609', batch: 'A' },
      { id: 20, period: 5, time: '14:00-15:00', subject: 'Microprocessor', teacher: 'VM', room: '609', batch: 'B' },
      { id: 21, period: 6, time: '15:00-16:00', subject: 'Foundation of Embedded System', teacher: 'AAK', room: '603', batch: 'A' },
      { id: 22, period: 6, time: '15:00-16:00', subject: 'Microprocessor', teacher: 'VM', room: '620', batch: 'B' },
      { id: 23, period: 7, time: '16:00-17:00', subject: 'Foundation of Embedded System', teacher: 'AAK', room: '603', batch: 'A' },
      { id: 24, period: 7, time: '16:00-17:00', subject: 'Microprocessor', teacher: 'VM', room: '620', batch: 'B' },
    ],
    labs: []
  },
  Wednesday: {
    classes: [
      { id: 25, period: 1, time: '10:00-11:00', subject: 'Operating System', teacher: 'VK', room: '609', batch: 'A' },
      { id: 26, period: 1, time: '10:00-11:00', subject: 'Operating System', teacher: 'VK', room: '609', batch: 'B' },
      { id: 27, period: 2, time: '11:00-12:00', subject: 'Operating System', teacher: 'VK', room: '609', batch: 'A' },
      { id: 28, period: 2, time: '11:00-12:00', subject: 'Operating System', teacher: 'VK', room: '609', batch: 'B' },
      { id: 29, period: 4, time: '13:00-14:00', subject: 'Engineering Career Navigation', teacher: 'RD', room: '609', batch: 'A' },
      { id: 30, period: 4, time: '13:00-14:00', subject: 'Engineering Career Navigation', teacher: 'RD', room: '609', batch: 'B' },
      { id: 31, period: 5, time: '14:00-15:00', subject: 'Engineering Career Navigation', teacher: 'RD', room: '609', batch: 'A' },
      { id: 32, period: 5, time: '14:00-15:00', subject: 'Engineering Career Navigation', teacher: 'RD', room: '609', batch: 'B' },
      { id: 33, period: 6, time: '15:00-16:00', subject: 'Operating System', teacher: 'VK', room: '609', batch: 'A' },
      { id: 34, period: 6, time: '15:00-16:00', subject: 'Operating System', teacher: 'VK', room: '609', batch: 'B' },
      { id: 35, period: 7, time: '16:00-17:00', subject: 'Operating System', teacher: 'VK', room: '609', batch: 'A' },
      { id: 36, period: 7, time: '16:00-17:00', subject: 'Operating System', teacher: 'VK', room: '609', batch: 'B' },
    ],
    labs: []
  },
  Thursday: {
    classes: [
      { id: 37, period: 1, time: '10:00-11:00', subject: 'Operating System', teacher: 'AD', room: '604', batch: 'A' },
      { id: 38, period: 1, time: '10:00-11:00', subject: 'Microprocessor', teacher: 'VM', room: '618', batch: 'B' },
      { id: 39, period: 2, time: '11:00-12:00', subject: 'Operating System', teacher: 'AD', room: '604', batch: 'A' },
      { id: 40, period: 2, time: '11:00-12:00', subject: 'Microprocessor', teacher: 'VM', room: '618', batch: 'B' },
      { id: 41, period: 4, time: '13:00-14:00', subject: 'Engineering Career Navigation', teacher: 'RD', room: '609', batch: 'A' },
      { id: 42, period: 4, time: '13:00-14:00', subject: 'Engineering Career Navigation', teacher: 'RD', room: '609', batch: 'B' },
      { id: 43, period: 5, time: '14:00-15:00', subject: 'Engineering Career Navigation', teacher: 'RD', room: '609', batch: 'A' },
      { id: 44, period: 5, time: '14:00-15:00', subject: 'Engineering Career Navigation', teacher: 'RD', room: '609', batch: 'B' },
      // Periods 6-7: no class (paper shows "--")
    ],
    labs: []
  },
  Friday: {
    classes: [
      { id: 45, period: 1, time: '10:00-11:00', subject: 'Foundation of Embedded System', teacher: 'AAK', room: '609', batch: 'A' },
      { id: 46, period: 1, time: '10:00-11:00', subject: 'Foundation of Embedded System', teacher: 'AAK', room: '609', batch: 'B' },
      { id: 47, period: 2, time: '11:00-12:00', subject: 'Foundation of Embedded System', teacher: 'AAK', room: '609', batch: 'A' },
      { id: 48, period: 2, time: '11:00-12:00', subject: 'Foundation of Embedded System', teacher: 'AAK', room: '609', batch: 'B' },
      { id: 49, period: 4, time: '13:00-14:00', subject: 'Engineering Career Navigation', teacher: 'RD', room: '609', batch: 'A' },
      { id: 50, period: 4, time: '13:00-14:00', subject: 'Engineering Career Navigation', teacher: 'RD', room: '609', batch: 'B' },
      { id: 51, period: 5, time: '14:00-15:00', subject: 'Engineering Career Navigation', teacher: 'RD', room: '609', batch: 'A' },
      { id: 52, period: 5, time: '14:00-15:00', subject: 'Engineering Career Navigation', teacher: 'RD', room: '609', batch: 'B' },
      { id: 53, period: 6, time: '15:00-16:00', subject: 'Operating System', teacher: 'VK', room: '609', batch: 'A' },
      { id: 54, period: 6, time: '15:00-16:00', subject: 'Operating System', teacher: 'VK', room: '609', batch: 'B' },
      { id: 55, period: 7, time: '16:00-17:00', subject: 'Operating System', teacher: 'VK', room: '609', batch: 'A' },
      { id: 56, period: 7, time: '16:00-17:00', subject: 'Operating System', teacher: 'VK', room: '609', batch: 'B' },
    ],
    labs: []
  },
  Saturday: {
    classes: [
      { id: 57, period: 1, time: '10:00-11:00', subject: 'Microprocessor', teacher: 'VM', room: '604', batch: 'A' },
      { id: 58, period: 1, time: '10:00-11:00', subject: 'Microprocessor', teacher: 'VM', room: '604', batch: 'B' },
      { id: 59, period: 2, time: '11:00-12:00', subject: 'Microprocessor', teacher: 'VM', room: '604', batch: 'A' },
      { id: 60, period: 2, time: '11:00-12:00', subject: 'Microprocessor', teacher: 'VM', room: '604', batch: 'B' },
      { id: 61, period: 4, time: '13:00-14:00', subject: 'Engineering Career Navigation', teacher: 'RD', room: '609', batch: 'A' },
      { id: 62, period: 4, time: '13:00-14:00', subject: 'Engineering Career Navigation', teacher: 'RD', room: '609', batch: 'B' },
      { id: 63, period: 5, time: '14:00-15:00', subject: 'Microprocessor', teacher: 'VM', room: '609', batch: 'A' },
      { id: 64, period: 5, time: '14:00-15:00', subject: 'Microprocessor', teacher: 'VM', room: '609', batch: 'B' },
      // Periods 6-7: no class
    ],
    labs: []
  },
};

export const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Period 3 (12:00-13:00) is the lunch break — kept in this array (with
// isBreak: true) so the grid renders a full-width BREAK band for it,
// exactly like the paper timetable.
export const periods = [
  { number: 1, time: '10:00-11:00' },
  { number: 2, time: '11:00-12:00' },
  { number: 3, time: '12:00-13:00', isBreak: true },
  { number: 4, time: '13:00-14:00' },
  { number: 5, time: '14:00-15:00' },
  { number: 6, time: '15:00-16:00' },
  { number: 7, time: '16:00-17:00' },
];