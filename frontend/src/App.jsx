import Dashboard from "./pages/Dashboard";
import Academics from "./pages/Academics"; 
import Resources from "./pages/Resources";
import Announcements from "./pages/Announcements";
import Class from "./pages/Class";
import SubjectDetail from "./pages/SubjectDetail";
import DriveView from "./pages/DriveView";
import AcademicCalendarView from "./pages/AcademicCalendarView";
import DriveFileView from "./pages/DriveFileView";
import About from "./pages/About";

import SideBar from "./components/layout/SideBar";
import MobileNavbar from "./components/layout/MobileNavbar";

import { SidebarProvider } from "./context/SidebarContext";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen">
        <MobileNavbar />
        <div className="flex flex-1 overflow-hidden">
          <SideBar />
          <main className="flex-1 overflow-y-auto bg-neutral-300">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/academics" element={<Academics />} />
              <Route path="/academics/subjects" element={<SubjectDetail />} />
              <Route path="/academics/calendar" element={<AcademicCalendarView />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/about" element={<About />} />
              
              <Route path="/resources/drive" element={<DriveView />} />
              <Route path="/resources/drive/file/:fileId" element={<DriveFileView />} />
              <Route path="/resources/drive/:folderId" element={<DriveView />} />
              
              
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/class" element={<Class />} />
            </Routes>
          </main>
        </div>
      </div>
      <Analytics />
    </SidebarProvider>
  );
}

export default App;