import { timetableData } from '../data/timetableData';

// Get all time slots from all days
export const getAllTimeSlots = () => {
  const timeSet = new Set();
  Object.values(timetableData).forEach(day => {
    [...day.classes, ...day.labs].forEach(item => {
      timeSet.add(item.time);
    });
  });
  return Array.from(timeSet).sort();
};

// Get color for subject
export const getSubjectColor = (subject) => {
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
export const getEmoji = (subject) => {
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
export const isLab = (subject) => subject?.includes('Lab');

// Get today's day name
export const getToday = () => {
  const today = new Date().getDay();
  const dayMap = { 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday' };
  return dayMap[today] || 'Monday';
};

// Check if a time slot is currently happening
export const isCurrentTimeSlot = (time) => {
  const now = new Date();
  const currentTimeStr = now.toTimeString().slice(0, 5);
  return time.split('-')[0] <= currentTimeStr && time.split('-')[1] >= currentTimeStr;
};

// Get item at specific day and time
export const getItem = (day, time) => {
  const dayData = timetableData[day];
  if (!dayData) return null;
  const allItems = [...dayData.classes, ...dayData.labs];
  return allItems.find(item => item.time === time) || null;
};