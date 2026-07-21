import { useState } from 'react';
import { examData } from '../data/examData';

export function useExamTimetable(initialExam = 'mse') {
  const [activeExam, setActiveExam] = useState(initialExam);

  const currentData = examData[activeExam];

  return {
    activeExam,
    setActiveExam,
    currentData,
  };
}