import { periods } from '../data/timetableData';

// ----- PERIOD HELPERS -----

export const getAllPeriods = () => periods;

export const isCurrentPeriod = (time) => {
  const now = new Date();
  const currentTimeStr = now.toTimeString().slice(0, 5);
  const [start, end] = time.split('-');
  return start <= currentTimeStr && end >= currentTimeStr;
};

// ----- SUBJECT HELPERS -----

export const getSubjectShort = (subject) => {
  const shorts = {
    'Microprocessor': 'MP',
    'Operating System': 'OS',
    'Foundation of Embedded System': 'FES',
    'Engineering Career Navigation': 'ECN',
    'Indian Philosophical Systems': 'IKS: IPS',
    'Sanskrit and Computational Linguistics': 'IKS: SCL',
  };
  return shorts[subject] || subject;
};

export const getSubjectColor = (subject) => {
  const colors = {
    'Microprocessor': 'bg-blue-50 border-blue-500 text-blue-700',
    'Operating System': 'bg-green-50 border-green-500 text-green-700',
    'Foundation of Embedded System': 'bg-purple-50 border-purple-500 text-purple-700',
    'Engineering Career Navigation': 'bg-orange-50 border-orange-500 text-orange-700',
    'Indian Philosophical Systems': 'bg-indigo-50 border-indigo-500 text-indigo-700',
    'Sanskrit and Computational Linguistics': 'bg-rose-50 border-rose-500 text-rose-700',
  };
  return colors[subject] || 'bg-gray-50 border-gray-500 text-gray-700';
};

export const getEmoji = (subject) => {
  const emojis = {
    'Microprocessor': '💻',
    'Operating System': '🖥️',
    'Foundation of Embedded System': '🔌',
    'Engineering Career Navigation': '🧭',
    'Indian Philosophical Systems': '🕉️',
    'Sanskrit and Computational Linguistics': '📜',
  };
  return emojis[subject] || '📖';
};

export const isLab = (subject) => subject?.includes('Lab');

// ----- DATE HELPERS -----

export const getToday = () => {
  const today = new Date().getDay();
  const dayMap = { 
    1: 'Monday', 
    2: 'Tuesday', 
    3: 'Wednesday', 
    4: 'Thursday', 
    5: 'Friday',
    6: 'Saturday' 
  };
  return dayMap[today] || 'Monday';
};

// ----- BATCH HELPERS -----

export const getBatchLabel = (batch) => batch || 'A';

// ----- FORMATTING HELPERS (optional) -----

export const formatCellContent = (items) => {
  if (!items || items.length === 0) return '—';
  
  const grouped = items.reduce((acc, item) => {
    const key = item.subject;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const parts = [];

  Object.keys(grouped).forEach((subject) => {
    const subjectItems = grouped[subject];
    const shortName = getSubjectShort(subject);

    const batchA = subjectItems.find(i => i.batch === 'A');
    const batchB = subjectItems.find(i => i.batch === 'B');

    if (batchA) {
      parts.push(`A ${shortName} /${batchA.teacher} ${batchA.room}`);
    }
    if (batchB) {
      parts.push(`B ${shortName} /${batchB.teacher} ${batchB.room}`);
    }
    if (!batchA && !batchB) {
      const item = subjectItems[0];
      parts.push(`${shortName} /${item.teacher} ${item.room}`);
    }
  });

  return parts.join(' ');
};