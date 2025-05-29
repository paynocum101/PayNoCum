import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MeetupProvider } from './context/MeetupContext';
import { HomePage } from './pages/HomePage';
import { CreateMeetupPage } from './pages/CreateMeetupPage';
import { MeetupCreatedPage } from './pages/MeetupCreatedPage';
import { MeetupDetailPage } from './pages/MeetupDetailPage';
import { PartnerAcceptPage } from './pages/PartnerAcceptPage';
import { ProfilePage } from './pages/ProfilePage';

function App() {
  return (
    <MeetupProvider>
      <Router>
        <div className="min-h-screen bg-slate-900 text-white">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreateMeetupPage />} />
            <Route path="/meetup-created" element={<MeetupCreatedPage />} />
            <Route path="/meetup/:id" element={<MeetupDetailPage />} />
            <Route path="/partner-accept/:id" element={<PartnerAcceptPage />} />
            <Route path="/meetups" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </MeetupProvider>
  );
}

export default App;