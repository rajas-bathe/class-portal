import { useState } from 'react';
import { timetableData, days, periods } from '../data/timetableData';
import { getToday } from '../utils/timetableHelpers';

export function useTimetable() {
  const [viewMode, setViewMode] = useState('combined');

  const today = getToday();

  // Get items for a specific day and period
  const getItemsForPeriod = (day, time) => {
    const dayData = timetableData[day];
    if (!dayData) return [];
    return dayData.classes.filter(item => item.time === time);
  };

  // Get filtered items based on view mode (for the grid)
  const getFilteredItemsForPeriod = (day, time) => {
    const items = getItemsForPeriod(day, time);
    
    if (viewMode === 'lectures') {
      return items.filter(item => !item.subject.includes('Lab'));
    }
    if (viewMode === 'labs') {
      return items.filter(item => item.subject.includes('Lab'));
    }
    return items;
  };

  // Get next lecture — ALWAYS without filtering (uniform)
  const getNextLecture = () => {
    const now = new Date();
    const currentTimeStr = now.toTimeString().slice(0, 5);
    
    const dayData = timetableData[today];
    if (!dayData) return null;
    
    // ✅ No viewMode filter here – always show the next class
    const allItems = dayData.classes;
    
    const upcoming = allItems
      .filter(item => item.time.split('-')[0] > currentTimeStr)
      .sort((a, b) => a.time.localeCompare(b.time));
    
    return upcoming[0] || null;
  };

  const nextLecture = getNextLecture();

  return {
    viewMode,
    setViewMode,
    periods,
    today,
    nextLecture,
    days,
    getFilteredItemsForPeriod,
  };
}