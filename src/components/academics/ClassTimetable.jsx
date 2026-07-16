import React from 'react'

function ClassTimetable() {

    //sample timetable data
    const timetable = {

         Monday: [
      { time: '09:00-10:00', subject: 'Mathematics', teacher: 'Mr. Smith', room: '201' },
      { time: '10:00-11:00', subject: 'Science', teacher: 'Ms. Johnson', room: '105' },
      { time: '11:00-12:00', subject: 'History', teacher: 'Dr. Brown', room: '302' },
      { time: '13:00-14:00', subject: 'English', teacher: 'Mrs. Davis', room: '204' },
    ],
    Tuesday: [
      { time: '09:00-10:00', subject: 'Science', teacher: 'Ms. Johnson', room: '105' },
      { time: '10:00-11:00', subject: 'Mathematics', teacher: 'Mr. Smith', room: '201' },
      { time: '11:00-12:00', subject: 'Art', teacher: 'Mr. Wilson', room: '401' },
      { time: '13:00-14:00', subject: 'PE', teacher: 'Coach Miller', room: 'Gym' },
    ],
    Wednesday: [
      { time: '09:00-10:00', subject: 'History', teacher: 'Dr. Brown', room: '302' },
      { time: '10:00-11:00', subject: 'English', teacher: 'Mrs. Davis', room: '204' },
      { time: '11:00-12:00', subject: 'Mathematics', teacher: 'Mr. Smith', room: '201' },
      { time: '13:00-14:00', subject: 'Science', teacher: 'Ms. Johnson', room: '105' },
    ],
    Thursday: [
      { time: '09:00-10:00', subject: 'English', teacher: 'Mrs. Davis', room: '204' },
      { time: '10:00-11:00', subject: 'History', teacher: 'Dr. Brown', room: '302' },
      { time: '11:00-12:00', subject: 'Science', teacher: 'Ms. Johnson', room: '105' },
      { time: '13:00-14:00', subject: 'Mathematics', teacher: 'Mr. Smith', room: '201' },
    ],
    Friday: [
      { time: '09:00-10:00', subject: 'Art', teacher: 'Mr. Wilson', room: '401' },
      { time: '10:00-11:00', subject: 'Mathematics', teacher: 'Mr. Smith', room: '201' },
      { time: '11:00-12:00', subject: 'Science', teacher: 'Ms. Johnson', room: '105' },
      { time: '13:00-14:00', subject: 'History', teacher: 'Dr. Brown', room: '302' },
    ],

    };

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
    <div className="p-4 bg-blue-50 border-b">
    <h2 className="text-xl font-bold text-gray-800">Weekly Timetable</h2>
    </div>

    <div className="overflow-x-auto">
        <table className="w-full">
            <thead>
                <tr className="bg-gray-100">
                    <th className="p-3 text-left text-sm font-semibold text-gray-600">Time</th>

                {days.map((day) => (

                   <th key={day} className="p-3 text-left text-sm font-semibold text-gray-600">{day}</th> 
     
                ))}
                </tr>
            </thead>
        </table>
    </div>
    </div>
  );
}

export default ClassTimetable