export const timetableData = {
  Monday: {
    classes: [
      { id: 1, time: '09:00-10:00', subject: 'Mathematics', teacher: 'Mr. Smith', room: '201' },
      { id: 2, time: '10:00-11:00', subject: 'Science', teacher: 'Ms. Johnson', room: '105' },
      { id: 3, time: '11:00-12:00', subject: 'History', teacher: 'Dr. Brown', room: '302' },
    ],
    labs: [
      { id: 4, time: '14:00-16:00', subject: 'Physics Lab', teacher: 'Dr. Kumar', room: 'Lab 101' },
    ]
  },
  Tuesday: {
    classes: [
      { id: 5, time: '09:00-10:00', subject: 'Science', teacher: 'Ms. Johnson', room: '105' },
      { id: 6, time: '10:00-11:00', subject: 'Mathematics', teacher: 'Mr. Smith', room: '201' },
    ],
    labs: [
      { id: 7, time: '14:00-16:00', subject: 'Chemistry Lab', teacher: 'Dr. Sharma', room: 'Lab 203' },
    ]
  },
  Wednesday: {
    classes: [
      { id: 8, time: '09:00-10:00', subject: 'History', teacher: 'Dr. Brown', room: '302' },
      { id: 9, time: '10:00-11:00', subject: 'English', teacher: 'Mrs. Davis', room: '204' },
    ],
    labs: [
      { id: 10, time: '14:00-16:00', subject: 'Biology Lab', teacher: 'Dr. Patel', room: 'Lab 305' },
    ]
  },
  Thursday: {
    classes: [
      { id: 11, time: '09:00-10:00', subject: 'English', teacher: 'Mrs. Davis', room: '204' },
      { id: 12, time: '10:00-11:00', subject: 'History', teacher: 'Dr. Brown', room: '302' },
    ],
    labs: []
  },
  Friday: {
    classes: [
      { id: 13, time: '09:00-10:00', subject: 'Art', teacher: 'Mr. Wilson', room: '401' },
      { id: 14, time: '10:00-11:00', subject: 'Mathematics', teacher: 'Mr. Smith', room: '201' },
    ],
    labs: []
  },
};

export const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];