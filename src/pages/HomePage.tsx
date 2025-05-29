import React from 'react';
import { useMeetups } from '../context/MeetupContext';
import { useNavigate } from 'react-router-dom';
import { QrCode, Plus, User, Bell } from 'lucide-react';
import { GlassCard, GradientButton, AvatarStack } from '../components/ui';
import { MeetupStatus } from '../types';
import wavePattern from '../assets/wave-pattern.svg';
import { Calendar as LucideCalendar } from 'lucide-react/dist/esm/icons/calendar';

export const HomePage: React.FC = () => {
  const { meetups, setCurrentMeetup } = useMeetups();
  const navigate = useNavigate();
  
  // Mock user data
  const user = {
    name: 'John',
    avatar: 'https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg'
  };

  const pendingMeetups = meetups.filter(
    m => m.status === MeetupStatus.PENDING || m.status === MeetupStatus.MODIFIED
  );
  
  const approvedMeetups = meetups.filter(
    m => m.status === MeetupStatus.APPROVED
  );

  const handleMeetupClick = (meetupId: string) => {
    const meetup = meetups.find(m => m.id === meetupId);
    if (meetup) {
      setCurrentMeetup(meetup);
      navigate(`/meetup/${meetupId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white pb-24">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-full h-64 opacity-10">
        <img src={wavePattern} alt="background pattern" className="w-full h-full object-cover" />
      </div>

      {/* Header Section */}
      <header className="relative z-10 px-6 pt-8 pb-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-12 h-12 rounded-full border-2 border-teal-400 object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-teal-400 rounded-full border-2 border-slate-900"></div>
            </div>
            <div>
              <p className="text-sm text-teal-200">Welcome back</p>
              <h1 className="text-xl font-bold">{user.name}</h1>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button className="p-2 rounded-full bg-slate-800/50 backdrop-blur-sm">
              <Bell className="text-teal-400" size={20} />
            </button>
            <button 
              onClick={() => navigate('/profile')}
              className="p-2 rounded-full bg-slate-800/50 backdrop-blur-sm"
            >
              <User className="text-teal-400" size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <GradientButton
            colors={['#0D9488', '#14B8A6']}
            onClick={() => navigate('/scan')}
            icon={<QrCode size={18} />}
          >
            Scan QR
          </GradientButton>
          
          <GradientButton
            colors={['#7C3AED', '#8B5CF6']}
            onClick={() => navigate('/create')}
            icon={<Plus size={18} />}
          >
            New Meetup
          </GradientButton>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 space-y-8">
        {/* Calendar Preview */}
        <GlassCard className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold">Upcoming Events</h2>
            <button className="text-teal-400 text-sm">View All</button>
          </div>
          <div className="flex gap-1 overflow-x-auto pb-2">
            {[15, 16, 17, 18, 19].map(day => (
              <div key={day} className={`flex-shrink-0 w-12 h-16 rounded-lg flex flex-col items-center justify-center ${day === 16 ? 'bg-teal-500/20 border border-teal-400' : 'bg-slate-800/50'}`}>
                <span className="text-xs text-slate-300">Jun</span>
                <span className="font-bold text-lg">{day}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Meetup Sections */}
        {pendingMeetups.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-yellow-400 rounded-full"></div>
              <h2 className="font-bold text-lg">Pending Approval</h2>
              <span className="ml-auto bg-yellow-400/20 text-yellow-400 text-xs px-2 py-1 rounded-full">
                {pendingMeetups.length}
              </span>
            </div>
            
            <div className="space-y-3">
              {pendingMeetups.map(meetup => (
                <GlassCard 
                  key={meetup.id}
                  onClick={() => handleMeetupClick(meetup.id)}
                  className="p-4 active:scale-95 transition-transform"
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{meetup.title}</h3>
                      <p className="text-sm text-slate-400">{meetup.location}</p>
                    </div>
                    <span className="text-yellow-400 text-sm">Action needed</span>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <AvatarStack users={meetup.participants} />
                    <span className="text-teal-400 font-medium">₦{meetup.transportFee}</span>
                  </div>
                </GlassCard>
              ))}
            </div>
          </section>
        )}

        {approvedMeetups.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-teal-400 rounded-full"></div>
              <h2 className="font-bold text-lg">Upcoming Meetups</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {approvedMeetups.map(meetup => (
                <GlassCard 
                  key={meetup.id}
                  onClick={() => handleMeetupClick(meetup.id)}
                  className="p-4 active:scale-95 transition-transform"
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{meetup.title}</h3>
                      <p className="text-sm text-slate-400">{meetup.date}</p>
                    </div>
                    <span className="bg-teal-400/10 text-teal-400 text-xs px-2 py-1 rounded-full">
                      Confirmed
                    </span>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <AvatarStack users={meetup.participants} />
                    <div className="text-right">
                      <p className="text-xs text-slate-400">Total</p>
                      <p className="text-teal-400 font-medium">₦{meetup.transportFee}</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </section>
        )}

        {meetups.length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-teal-400/10 rounded-full flex items-center justify-center mb-4">
              <Calendar className="text-teal-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">No meetups scheduled</h3>
            <p className="text-slate-400 mb-6">Create your first meetup to get started</p>
            <GradientButton
              colors={['#7C3AED', '#8B5CF6']}
              onClick={() => navigate('/create')}
              className="w-full"
            >
              Create Meetup
            </GradientButton>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-800/80 backdrop-blur-sm border-t border-slate-700/50">
        <div className="flex justify-around items-center p-3">
          <button className="p-2 text-teal-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="p-2 text-slate-400">
            <QrCode size={24} />
          </button>
          <button className="p-2 -mt-8 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full p-3 shadow-lg shadow-teal-400/30">
            <Plus size={24} className="text-white" />
          </button>
          <button className="p-2 text-slate-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="p-2 text-slate-400">
            <User size={24} />
          </button>
        </div>
      </nav>
    </div>
  );
};