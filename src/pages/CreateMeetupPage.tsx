import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { BottomNav } from '../components/BottomNav';
import { Button } from '../components/ui/Button';
import { ToggleGroup, ToggleItem } from '../components/ui/ToggleGroup';
import { useMeetups } from '../context/MeetupContext';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, Users, Check } from 'lucide-react';

export const CreateMeetupPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState('');
  const [activities, setActivities] = useState<string[]>([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [partners, setPartners] = useState<string[]>(['']);
  const [requireSelfie, setRequireSelfie] = useState(false);
  const [includeTransport, setIncludeTransport] = useState(false);
  
  const { createMeetup } = useMeetups();
  const navigate = useNavigate();
  
  const handleNext = () => {
    setStep(prev => prev + 1);
  };
  
  const handleBack = () => {
    setStep(prev => prev - 1);
  };
  
  const handleAddPartner = () => {
    setPartners([...partners, '']);
  };
  
  const handlePartnerChange = (index: number, value: string) => {
    const newPartners = [...partners];
    newPartners[index] = value;
    setPartners(newPartners);
  };
  
  const handleAddActivity = (activity: string) => {
    if (!activities.includes(activity)) {
      setActivities([...activities, activity]);
    } else {
      setActivities(activities.filter(a => a !== activity));
    }
  };
  
  const handleCreateMeetup = () => {
    const dateTime = new Date(`${date}T${time}`).toISOString();
    
    createMeetup({
      hostId: 'current-user-id', // Would come from auth in real app
      location,
      activities,
      dateTime,
      partners: partners
        .filter(p => p.trim() !== '')
        .map(phone => ({
          name: 'Partner', // In real app, would be fetched from contacts or left blank
          phone,
          id: '', // Will be filled by context
          approved: false
        })),
      requireSelfie,
      includeTransport
    });
    
    navigate('/meetup-created');
  };
  
  const isNextDisabled = () => {
    switch (step) {
      case 1:
        return partners.filter(p => p.trim() !== '').length === 0;
      case 2:
        return location.trim() === '';
      case 3:
        return activities.length === 0;
      case 4:
        return !date || !time;
      default:
        return false;
    }
  };
  
  const activityOptions = [
    'Coffee', 'Lunch', 'Dinner', 'Movie',
    'Hiking', 'Shopping', 'Museum', 'Concert'
  ];
  
  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20">
      <PageHeader 
        title={`Create Meetup (${step}/5)`} 
        showBackButton={step > 1}
      />
      
      <div className="px-4 py-6">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Who's joining?</h2>
            <div className="space-y-4">
              {partners.map((partner, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Users size={20} className="text-sky-500" />
                  <input
                    type="tel"
                    value={partner}
                    onChange={(e) => handlePartnerChange(index, e.target.value)}
                    placeholder="Partner's phone number"
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white"
                  />
                </div>
              ))}
              <Button 
                colorScheme="secondary" 
                leftIcon={<Users size={18} />}
                onClick={handleAddPartner}
              >
                Add Another Partner
              </Button>
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Where are you meeting?</h2>
            <div className="flex items-center space-x-2">
              <MapPin size={20} className="text-sky-500" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
                className="flex-1 bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white"
              />
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">What are you planning?</h2>
            <div className="grid grid-cols-2 gap-3">
              {activityOptions.map(activity => (
                <div 
                  key={activity}
                  className={`p-3 rounded-md flex items-center justify-between ${
                    activities.includes(activity) 
                      ? 'bg-sky-500 text-white' 
                      : 'bg-slate-800 text-slate-300'
                  }`}
                  onClick={() => handleAddActivity(activity)}
                >
                  <span>{activity}</span>
                  {activities.includes(activity) && <Check size={18} />}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">When are you meeting?</h2>
            <div className="flex items-center space-x-2 mb-4">
              <Calendar size={20} className="text-sky-500" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={20} className="text-sky-500" />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white"
              />
            </div>
          </div>
        )}
        
        {step === 5 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Additional Options</h2>
            <ToggleGroup>
              <ToggleItem
                label="Request Verification Selfie"
                isChecked={requireSelfie}
                onChange={setRequireSelfie}
                colorScheme="primary"
              />
              <ToggleItem
                label="Include Transport Fee"
                isChecked={includeTransport}
                onChange={setIncludeTransport}
                colorScheme="primary"
              />
            </ToggleGroup>
          </div>
        )}
        
        <div className="mt-8 flex space-x-3">
          {step > 1 && (
            <Button 
              colorScheme="secondary" 
              onClick={handleBack}
              fullWidth
            >
              Back
            </Button>
          )}
          
          {step < 5 ? (
            <Button 
              colorScheme="primary" 
              onClick={handleNext}
              fullWidth
              isDisabled={isNextDisabled()}
            >
              Next
            </Button>
          ) : (
            <Button 
              colorScheme="primary" 
              onClick={handleCreateMeetup}
              fullWidth
            >
              Create Meetup
            </Button>
          )}
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};