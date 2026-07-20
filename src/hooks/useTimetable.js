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

  // Get filtered items based on view mode
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

  // Get next lecture
  const getNextLecture = () => {
    const now = new Date();
    const currentTimeStr = now.toTimeString().slice(0, 5);
    
    const dayData = timetableData[today];
    if (!dayData) return null;
    
    let allItems = dayData.classes;
    
    if (viewMode === 'lectures') {
      allItems = allItems.filter(item => !item.subject.includes('Lab'));
    } else if (viewMode === 'labs') {
      allItems = allItems.filter(item => item.subject.includes('Lab'));
    }
    
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