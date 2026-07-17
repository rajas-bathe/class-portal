import { useState, useMemo } from 'react';
import { timetableData, days } from '../data/timetableData';

// Helper functions directly in the hook
const getDayItems = (day) => {
  const data = timetableData[day] || { classes: [], labs: [] };
  return [...data.classes, ...data.labs];
};

const getNextLecture = (dayItems) => {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5);
  
  const upcoming = dayItems
    .filter(item => {
      const startTime = item.time.split('-')[0];
      return startTime > currentTime;
    })
    .sort((a, b) => a.time.localeCompare(b.time));
  
  return upcoming[0] || null;
};

export function useTimetable() {
  const [selectedDay, setSelectedDay] = useState('Monday');

  // Memoized calculations
  const dayItems = useMemo(() => getDayItems(selectedDay), [selectedDay]);
  const nextLecture = useMemo(() => getNextLecture(dayItems), [dayItems]);
  const todayData = useMemo(() => 
    timetableData[selectedDay] || { classes: [], labs: [] }, 
    [selectedDay]
  );

  // Stats
  const stats = {
    classes: todayData.classes.length,
    labs: todayData.labs.length,
    total: dayItems.length,
  };

  // Actions
  const selectDay = (day) => setSelectedDay(day);

  return {
    selectedDay,
    dayItems,
    nextLecture,
    stats,
    days,
    selectDay,
  };
}