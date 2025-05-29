import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/ui/Button';
import { ToggleGroup, ToggleItem } from '../components/ui/ToggleGroup';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { useMeetups } from '../context/MeetupContext';
import { MapPin, Calendar, Clock, Camera, DollarSign } from 'lucide-react';

export const PartnerAcceptPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { meetups, approvePartner, requestModification } = useMeetups();
  const navigate = useNavigate();
  
  const [requestTransport, setRequestTransport] = useState(false);
  const [requestSelfie, setRequestSelfie] = useState(false);
  const [showModifications, setShowModifications] = useState(false);
  
  const meetup = meetups.find(m => m.id === id);
  
  useEffect(() => {
    if (!meetup) {
      navigate('/');
    }
  }, [meetup, navigate]);
  
  if (!meetup) return null;
  
  const handleAccept = () => {
    if (id) {
      // In a real app, this would use the authenticated user's ID
      approvePartner(id, 'partner-id');
      navigate('/');
    }
  };
  
  const handleRequestModifications = () => {
    if (id) {
      requestModification(id, {
        requesterId: 'partner-id', // Would be actual user ID in real app
        requesterName: 'Partner Name', // Would be actual user name in real app
        transportRequest: requestTransport,
        selfieRequest: requestSelfie
      });
      navigate('/');
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="min-h-screen bg-slate-900 text-white pb-6">
      <PageHeader 
        title="Meetup Invitation" 
        showBackButton
      />
      
      <div className="px-4 py-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">{meetup.activities.join(', ')}</h1>
          <p className="text-slate-400">You've been invited to join this meetup</p>
        </div>
        
        <Card>
          <CardContent className="py-4">
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin size={20} className="text-slate-500 mr-3" />
                <span>{meetup.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={20} className="text-slate-500 mr-3" />
                <span>{formatDate(meetup.dateTime)}</span>
              </div>
              <div className="flex items-center">
                <Clock size={20} className="text-slate-500 mr-3" />
                <span>{formatTime(meetup.dateTime)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div>
          <h2 className="text-lg font-semibold mb-3">Current Requirements</h2>
          <Card>
            <CardContent className="py-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Camera size={20} className={meetup.requireSelfie ? "text-sky-500" : "text-slate-500"} />
                  <span className="ml-3">
                    {meetup.requireSelfie ? "Selfie verification required" : "No selfie required"}
                  </span>
                </div>
                <div className="flex items-center">
                  <DollarSign size={20} className={meetup.includeTransport ? "text-sky-500" : "text-slate-500"} />
                  <span className="ml-3">
                    {meetup.includeTransport ? "Transport fee included" : "No transport fee"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {showModifications ? (
          <div>
            <h2 className="text-lg font-semibold mb-3">Request Changes</h2>
            <Card className="bg-slate-800">
              <CardContent className="py-4">
                <ToggleGroup>
                  <ToggleItem
                    label="Request Transport Fee"
                    isChecked={requestTransport}
                    onChange={setRequestTransport}
                    colorScheme="warning"
                  />
                  <ToggleItem
                    label="Require Host Selfie"
                    isChecked={requestSelfie}
                    onChange={setRequestSelfie}
                    colorScheme="warning"
                  />
                </ToggleGroup>
              </CardContent>
              <CardFooter>
                <div className="flex space-x-3 w-full">
                  <Button 
                    colorScheme="secondary" 
                    onClick={() => setShowModifications(false)}
                    fullWidth
                  >
                    Cancel
                  </Button>
                  <Button 
                    colorScheme="warning" 
                    onClick={handleRequestModifications}
                    fullWidth
                    isDisabled={!requestTransport && !requestSelfie}
                  >
                    Submit Changes
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        ) : (
          <div className="flex space-x-3">
            <Button 
              colorScheme="warning" 
              onClick={() => setShowModifications(true)}
              fullWidth
            >
              Request Changes
            </Button>
            <Button 
              colorScheme="success" 
              onClick={handleAccept}
              fullWidth
            >
              Accept
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};