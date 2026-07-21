export const subjectData = [
  { 
    id: 1,
    code: 'OS', 
    name: 'Operating System', 
    faculty: 'Mr. Amol Dhumal', 
    credits: 4, 
    marking: { cia: 20, mse: 30, ese: 50 },
    syllabus: [
      { module: 1, topic: 'Introduction to Operating Systems', details: 'Types of OS, Batch, Time-sharing, Real-time systems' },
      { module: 2, topic: 'Process Management', details: 'Process states, Process Control Block, Scheduling algorithms (FCFS, SJF, Round Robin)' },
      { module: 3, topic: 'Memory Management', details: 'Paging, Segmentation, Virtual Memory, Page Replacement algorithms' },
      { module: 4, topic: 'File Systems', details: 'File concepts, Access methods, Directory structure, Protection' },
      { module: 5, topic: 'I/O Systems', details: 'I/O hardware, Kernel I/O subsystem, Device drivers' },
    ],
    resources: ['Textbook: Operating System Concepts (Silberschatz)', 'Reference: Modern Operating Systems (Tanenbaum)']
  },
  { 
    id: 2,
    code: 'MP', 
    name: 'Microprocessor', 
    faculty: 'Ms. Vaishnavi V. Mestry', 
    credits: 4, 
    marking: { cia: 20, mse: 30, ese: 50 },
    syllabus: [
      { module: 1, topic: '8086 Architecture', details: 'Architecture, Register organization, Memory segmentation' },
      { module: 2, topic: 'Instruction Set', details: 'Data transfer, Arithmetic, Logical, Branch instructions' },
      { module: 3, topic: 'Addressing Modes', details: 'Immediate, Direct, Register, Register indirect, Indexed' },
      { module: 4, topic: 'Assembly Language Programming', details: 'Procedures, Macros, Interrupts' },
      { module: 5, topic: 'Interfacing', details: 'Memory and I/O interfacing, 8255 PPI, 8254 Timer' },
    ],
    resources: ['Textbook: Microprocessor Architecture (Ramesh Gaonkar)', 'Reference: 8086 Microprocessor (Nagoor Kani)']
  },
  { 
    id: 3,
    code: 'FES', 
    name: 'Foundation of Embedded System', 
    faculty: 'Ms. Amruta Kulkarni', 
    credits: 3, 
    marking: { cia: 20, mse: 30, ese: 50 },
    syllabus: [
      { module: 1, topic: 'Introduction to Embedded Systems', details: 'Definition, Characteristics, Applications' },
      { module: 2, topic: 'Microcontrollers', details: '8051 architecture, PIC, ARM basics' },
      { module: 3, topic: 'Embedded C Programming', details: 'Data types, Loops, Functions, Pointers in embedded context' },
      { module: 4, topic: 'Interfacing', details: 'LED, LCD, Keypad, Sensors' },
    ],
    resources: ['Textbook: Embedded Systems (Raj Kamal)', 'Reference: Embedded System Design (Frank Vahid)']
  },
  { 
    id: 4,
    code: 'ECN', 
    name: 'Engineering Career Navigation', 
    faculty: 'Ms. Ranjana Deshmukh', 
    credits: 2, 
    marking: { cia: 30, mse: 30, ese: 40 },
    syllabus: [
      { module: 1, topic: 'Career Planning', details: 'Self-assessment, Goal setting, Career paths' },
      { module: 2, topic: 'Resume Writing', details: 'Formatting, Keywords, Tailoring to job descriptions' },
      { module: 3, topic: 'Interview Skills', details: 'Types of interviews, Common questions, Body language' },
      { module: 4, topic: 'Professional Ethics', details: 'Workplace ethics, Communication, Teamwork' },
    ],
    resources: ['Reference: Engineering Career Guide (online)', 'Workshop materials']
  }
];