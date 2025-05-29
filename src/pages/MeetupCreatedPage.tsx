import React, { useEffect } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/ui/Button';
import { useMeetups } from '../context/MeetupContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Share2, Sparkles } from 'lucide-react';

export const MeetupCreatedPage: React.FC = () => {
  const { currentMeetup, generateQRCode } = useMeetups();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!currentMeetup) {
      navigate('/');
    }
  }, [currentMeetup, navigate]);
  
  if (!currentMeetup) return null;
  
  const handleShare = () => {
    // In a real app, this would use the Web Share API
    alert('Sharing functionality would be implemented here');
  };
  
  const handleViewMeetup = () => {
    navigate(`/meetup/${currentMeetup.id}`);
  };
  
  // Enhanced QR code display with animated border
  const qrCodeDisplay = (
    <div className="relative w-72 h-72 mx-auto bg-gradient-to-br from-purple-600 to-blue-500 p-1 rounded-2xl shadow-lg animate-gradient-border">
      <div className="w-full h-full bg-slate-900 rounded-xl flex flex-col items-center justify-center p-4">
        <div className="absolute -top-3 -right-3">
          <Sparkles className="text-yellow-400 animate-pulse" size={24} />
        </div>
        <div className="text-white font-mono text-center mb-2">
          Meetup #{currentMeetup.id.slice(0, 8)}
        </div>
        <div className="w-48 h-48 bg-white rounded-md flex items-center justify-center">
          <div className="grid grid-cols-4 gap-1">
            {Array.from({ length: 16 }).map((_, i) => (
              <div 
                key={i}
                className={`w-5 h-5 rounded-sm ${Math.random() > 0.5 ? 'bg-slate-900' : 'bg-white'}`}
              />
            ))}
          </div>
        </div>
        <div className="text-xs text-slate-400 mt-2">Scan to join</div>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <PageHeader title="Meetup Created" showBackButton />
      
      <div className="px-6 py-8 flex flex-col items-center">
        <div className="relative">
          <div className="absolute -inset-2 bg-green-500 rounded-full blur opacity-75 animate-pulse"></div>
          <div className="relative w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mb-4">
            <CheckCircle size={36} className="text-white" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
          Success!
        </h2>
        <p className="text-slate-300 text-center mb-8 max-w-md">
          Your meetup is ready to go! Share the QR code below with your partners 
          <span className="block text-sm text-slate-500 mt-1">or use the share button</span>
        </p>
        
        {qrCodeDisplay}
        
        <div className="mt-10 w-full max-w-md space-y-4">
          <Button 
            colorScheme="primary"
            leftIcon={<Share2 size={18} />}
            onClick={handleShare}
            fullWidth
            className="hover:scale-[1.02] transition-transform duration-200 shadow-lg shadow-blue-500/20"
          >
            Share Invite
          </Button>
          
          <Button 
            colorScheme="secondary"
            onClick={handleViewMeetup}
            fullWidth
            className="hover:scale-[1.02] transition-transform duration-200 shadow-lg shadow-purple-500/20"
          >
            View Meetup Details
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 animate-gradient-x"></div>
    </div>
  );
};