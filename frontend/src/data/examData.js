export const examTypes = ['mse', 'ese', 'ciap'];

export const examData = {
  mse: {
    name: 'Mid Semester Exam (MSE)',
    schedule: [
      { subject: 'Operating System', date: '25/07/2026', time: '10:00 AM', syllabus: 'Chapter 1-5' },
      { subject: 'Microprocessor', date: '28/07/2026', time: '10:00 AM', syllabus: 'Chapter 3-7' },
      { subject: 'Foundation of Embedded System', date: '30/07/2026', time: '02:00 PM', syllabus: 'Chapter 1-4' },
    ]
  },
  ese: {
    name: 'End Semester Exam (ESE)',
    schedule: [
      { subject: 'Operating System', date: '15/11/2026', time: '10:00 AM', syllabus: 'Full Syllabus' },
      { subject: 'Microprocessor', date: '18/11/2026', time: '10:00 AM', syllabus: 'Full Syllabus' },
      { subject: 'Foundation of Embedded System', date: '20/11/2026', time: '02:00 PM', syllabus: 'Full Syllabus' },
      { subject: 'Engineering Career Navigation', date: '22/11/2026', time: '10:00 AM', syllabus: 'Full Syllabus' },
    ]
  },
  ciap: {
    name: 'Continuous Internal Assessment (CIAP)',
    schedule: [
      { subject: 'Operating System', date: '10/08/2026', time: '11:00 AM', syllabus: 'Quiz 1' },
      { subject: 'Microprocessor', date: '12/08/2026', time: '11:00 AM', syllabus: 'Quiz 1' },
      { subject: 'Foundation of Embedded System', date: '14/08/2026', time: '11:00 AM', syllabus: 'Quiz 1' },
    ]
  }
};