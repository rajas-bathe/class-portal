import React, { useState, useEffect } from 'react';
import { timetableData, days } from '../data/timetableData';

function Academics() {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // 🆕 NEW: View mode state
  const [viewMode, setViewMode] = useState('combined'); // 'lectures' | 'labs' | 'combined'

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Get all time slots from all days
  const getAllTimeSlots = () => {
    const timeSet = new Set();
    Object.values(timetableData).forEach(day => {
      [...day.classes, ...day.labs].forEach(item => {
        timeSet.add(item.time);
      });
    });
    return Array.from(timeSet).sort();
  };

  const timeSlots = getAllTimeSlots();

  // Get color for subject
  const getSubjectColor = (subject) => {
    const colors = {
      'Mathematics': 'bg-blue-100 text-blue-800',
      'Science': 'bg-green-100 text-green-800',
      'History': 'bg-purple-100 text-purple-800',
      'English': 'bg-orange-100 text-orange-800',
      'Art': 'bg-pink-100 text-pink-800',
      'Physics Lab': 'bg-indigo-100 text-indigo-800',
      'Chemistry Lab': 'bg-teal-100 text-teal-800',
      'Biology Lab': 'bg-rose-100 text-rose-800',
    };
    return colors[subject] || 'bg-gray-100 text-gray-800';
  };

  // Get emoji for subject
  const getEmoji = (subject) => {
    const emojis = {
      'Mathematics': '📐',
      'Science': '🔬',
      'History': '📜',
      'English': '📚',
      'Art': '🎨',
      'Physics Lab': '⚛️',
      'Chemistry Lab': '🧪',
      'Biology Lab': '🧬',
    };
    return emojis[subject] || '📖';
  };

  // Check if item is a lab
  const isLab = (subject) => subject?.includes('Lab');

  // 🆕 NEW: Find item at specific day and time with filter
  const getItem = (day, time) => {
    const dayData = timetableData[day];
    if (!dayData) return null;
    
    const allItems = [...dayData.classes, ...dayData.labs];
    return allItems.find(item => item.time === time) || null;
  };

  // 🆕 NEW: Get filtered item based on view mode
  const getFilteredItem = (day, time) => {
    const item = getItem(day, time);
    if (!item) return null;
    
    // Filter based on view mode
    if (viewMode === 'lectures' && isLab(item.subject)) return null;
    if (viewMode === 'labs' && !isLab(item.subject)) return null;
    return item;
  };

  // Get today's day name
  const getToday = () => {
    const today = new Date().getDay();
    const dayMap = { 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday' };
    return dayMap[today] || 'Monday';
  };

  // Find next lecture
  const getNextLecture = () => {
    const today = getToday();
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);
    
    const dayData = timetableData[today];
    if (!dayData) return null;
    
    let allItems = [...dayData.classes, ...dayData.labs];
    
    // 🆕 NEW: Filter next lecture based on view mode
    if (viewMode === 'lectures') {
      allItems = allItems.filter(item => !isLab(item.subject));
    } else if (viewMode === 'labs') {
      allItems = allItems.filter(item => isLab(item.subject));
    }
    
    const upcoming = allItems
      .filter(item => {
        const startTime = item.time.split('-')[0];
        return startTime > currentTime;
      })
      .sort((a, b) => a.time.localeCompare(b.time));
    
    return upcoming[0] || null;
  };

  const nextLecture = getNextLecture();
  const today = getToday();

  // 🆕 NEW: View Toggle Component (inline for now)
  const ViewToggle = () => (
    <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
      <button
        onClick={() => setViewMode('lectures')}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
          viewMode === 'lectures' 
            ? 'bg-white text-blue-600 shadow-sm' 
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        📚 Lectures
      </button>
      <button
        onClick={() => setViewMode('labs')}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
          viewMode === 'labs' 
            ? 'bg-white text-purple-600 shadow-sm' 
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        🔬 Labs
      </button>
      <button
        onClick={() => setViewMode('combined')}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
          viewMode === 'combined' 
            ? 'bg-white text-green-600 shadow-sm' 
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        📊 Combined
      </button>
    </div>
  );

  // 🆕 NEW: Today's Schedule Component (inline for now)
  const TodaysSchedule = () => {
    const dayData = timetableData[today];
    if (!dayData) return null;
    
    let allItems = [...dayData.classes, ...dayData.labs];
    
    // Filter based on view mode
    if (viewMode === 'lectures') {
      allItems = allItems.filter(item => !isLab(item.subject));
    } else if (viewMode === 'labs') {
      allItems = allItems.filter(item => isLab(item.subject));
    }
    
    if (allItems.length === 0) return null;

    return (
      <div className="bg-white rounded-xl shadow-sm p-3">
        <h3 className="text-xs font-semibold text-gray-700 mb-2">📅 Today's Schedule</h3>
        <div className="flex flex-wrap gap-2">
          {allItems.map((item, i) => (
            <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
              {item.time} • {item.subject}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-4">
      {/* 🆕 CHANGED: Header with Toggle */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">📚 Timetable</h1>
            <p className="text-gray-500 text-sm">Your weekly class schedule</p>
          </div>
          <ViewToggle />
        </div>
      </div>

      {/* 🆕 NEW: Today's Schedule Section */}
      <TodaysSchedule />

      {/* Next Lecture - Priority at top */}
      {nextLecture ? (
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80 font-medium">⏰ Next Class</p>
              <h3 className="text-xl font-bold mt-1">{nextLecture.subject}</h3>
              <div className="flex flex-wrap gap-3 mt-1 text-sm opacity-90">
                <span>🕐 {nextLecture.time}</span>
                <span>📅 {today}</span>
                <span>👨‍🏫 {nextLecture.teacher}</span>
                <span>🏫 {nextLecture.room}</span>
              </div>
            </div>
            <div className="text-4xl">
              {isLab(nextLecture.subject) ? '🔬' : '📖'}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
          <p className="text-green-600 font-medium">🎉 No more classes today!</p>
          <p className="text-sm text-gray-500">Enjoy your free time!</p>
        </div>
      )}

      {/* Timetable Grid - Scrollable on mobile */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            {/* Header */}
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-3 text-left text-sm font-semibold text-gray-600 sticky left-0 bg-gray-50 z-10 min-w-[80px]">
                  Time
                </th>
                {days.map((day) => (
                  <th key={day} className="p-3 text-left text-sm font-semibold text-gray-600 min-w-[120px]">
                    {day}
                    {day === today && (
                      <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                        Today
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {timeSlots.map((time, rowIndex) => {
                // Check if this time slot has any class happening now
                const now = new Date();
                const currentTime = now.toTimeString().slice(0, 5);
                const isCurrentTime = time.split('-')[0] <= currentTime && time.split('-')[1] >= currentTime;
                
                return (
                  <tr key={time} className={`
                    ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                    ${isCurrentTime ? 'bg-yellow-50/30' : ''}
                  `}>
                    {/* Time Column - Sticky */}
                    <td className={`
                      p-3 text-sm font-medium text-gray-700 sticky left-0 bg-inherit z-10 border-r
                      ${isCurrentTime ? 'font-bold text-blue-600' : ''}
                    `}>
                      {time}
                      {isCurrentTime && (
                        <span className="ml-1 text-xs text-green-500">●</span>
                      )}
                    </td>

                    {/* 🆕 CHANGED: Day Columns - using getFilteredItem instead of getItem */}
                    {days.map((day) => {
                      const item = getFilteredItem(day, time); // 🆕 Changed here
                      const isToday = day === today;
                      
                      return (
                        <td key={`${day}-${time}`} className="p-2">
                          {item ? (
                            <div className={`
                              p-2 rounded-lg text-xs
                              ${getSubjectColor(item.subject)}
                              ${isLab(item.subject) ? 'border-2 border-dashed border-purple-300' : ''}
                              ${isToday && isCurrentTime ? 'ring-2 ring-blue-400 ring-offset-1' : ''}
                            `}>
                              <div className="flex items-center gap-1">
                                <span>{getEmoji(item.subject)}</span>
                                <span className="font-medium">{item.subject}</span>
                              </div>
                              <div className="text-[10px] opacity-75 mt-0.5">
                                {item.teacher} • {item.room}
                              </div>
                              {isLab(item.subject) && (
                                <span className="text-[8px] bg-purple-200 text-purple-700 px-1.5 py-0.5 rounded-full mt-0.5 inline-block">
                                  Lab
                                </span>
                              )}
                              {isToday && isCurrentTime && (
                                <span className="text-[8px] bg-blue-500 text-white px-1.5 py-0.5 rounded-full mt-0.5 inline-block ml-1">
                                  Live
                                </span>
                              )}
                            </div>
                          ) : (
                            <div className="h-full min-h-[50px] flex items-center justify-center">
                              <span className="text-gray-300 text-xs">—</span>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-wrap items-center gap-4">
          <h3 className="text-sm font-semibold text-gray-700">📖 Legend:</h3>
          <div className="flex flex-wrap gap-3">
            <span className="px-2 py-1 bg-blue-100 rounded text-xs">📐 Math</span>
            <span className="px-2 py-1 bg-green-100 rounded text-xs">🔬 Science</span>
            <span className="px-2 py-1 bg-purple-100 rounded text-xs">📜 History</span>
            <span className="px-2 py-1 bg-orange-100 rounded text-xs">📚 English</span>
            <span className="px-2 py-1 bg-pink-100 rounded text-xs">🎨 Art</span>
            <span className="px-2 py-1 border-2 border-dashed border-purple-300 rounded text-xs">🔬 Lab</span>
            <span className="px-2 py-1 bg-blue-500 text-white rounded text-xs">● Live</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Academics;