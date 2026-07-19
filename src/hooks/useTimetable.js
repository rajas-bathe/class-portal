import { useState, useMemo } from 'react';
import { timetableData, days } from '../data/timetableData';
import { 
  getToday, 
  isLab, 
  getAllTimeSlots, 
  getItem,
  isCurrentTimeSlot 
} from '../utils/timetableHelpers';

export function useTimetable() {
  const [viewMode, setViewMode] = useState('combined');

  const timeSlots = useMemo(() => getAllTimeSlots(), []);
  const today = getToday();

  // Get filtered item based on view mode
  const getFilteredItem = (day, time) => {
    const item = getItem(day, time);
    if (!item) return null;
    
    if (viewMode === 'lectures' && isLab(item.subject)) return null;
    if (viewMode === 'labs' && !isLab(item.subject)) return null;
    return item;
  };

  // Get next lecture
  const getNextLecture = () => {
    const now = new Date();
    const currentTimeStr = now.toTimeString().slice(0, 5);
    
    const dayData = timetableData[today];
    if (!dayData) return null;
    
    let allItems = [...dayData.classes, ...dayData.labs];
    
    if (viewMode === 'lectures') {
      allItems = allItems.filter(item => !isLab(item.subject));
    } else if (viewMode === 'labs') {
      allItems = allItems.filter(item => isLab(item.subject));
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
    timeSlots,
    today,
    nextLecture,
    days,
    getFilteredItem,
    isCurrentTimeSlot
  };
}