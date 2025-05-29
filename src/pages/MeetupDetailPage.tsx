import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { useMeetups } from '../context/MeetupContext';
import { MeetupStatus, Partner } from '../types';
import { MapPin, Calendar, Clock, Users, Camera, DollarSign } from 'lucide-react';

export const MeetupDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { meetups, setCurrentMeetup, approveModification } = useMeetups();
  const navigate = useNavigate();
  
  const meetup = meetups.find(m => m.id === id);
  
  useEffect(() => {
    if (meetup) {
      setCurrentMeetup(meetup);
    } else {
      navigate('/');
    }
  }, [meetup, setCurrentMeetup, navigate]);
  
  if (!meetup) return null;
  
  const isHost = true; // In a real app, this would check if current user is the host
  const isModified = meetup.status === MeetupStatus.MODIFIED;
  
  const handleApproveModifications = () => {
    if (id) approveModification(id, true);
  };
  
  const handleRejectModifications = () => {
    if (id) approveModification(id, false);
  };
  
  const getStatusColor = (status: MeetupStatus) => {
    switch (status) {
      case MeetupStatus.DRAFT: return 'secondary';
      case MeetupStatus.PENDING: return 'warning';
      case MeetupStatus.MODIFIED: return 'warning';
      case MeetupStatus.APPROVED: return 'success';
      case MeetupStatus.COMPLETED: return 'primary';
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
        title="Meetup Details" 
        showBackButton
      />
      
      <div className="px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{meetup.activities.join(', ')}</h1>
          <Badge colorScheme={getStatusColor(meetup.status)}>
            {meetup.status.charAt(0).toUpperCase() + meetup.status.slice(1)}
          </Badge>
        </div>
        
        <Card>
          <CardContent className="py-4">
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin size={20} className="text-sky-500 mr-3" />
                <span>{meetup.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={20} className="text-sky-500 mr-3" />
                <span>{formatDate(meetup.dateTime)}</span>
              </div>
              <div className="flex items-center">
                <Clock size={20} className="text-sky-500 mr-3" />
                <span>{formatTime(meetup.dateTime)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div>
          <h2 className="text-lg font-semibold mb-3">Requirements</h2>
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
        
        <div>
          <h2 className="text-lg font-semibold mb-3">Partners</h2>
          <div className="space-y-3">
            {meetup.partners.map((partner, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <span>{partner.name || partner.phone}</span>
                    <Badge colorScheme={partner.approved ? "success" : "warning"}>
                      {partner.approved ? "Approved" : "Pending"}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
        
        {isHost && isModified && meetup.modifications && meetup.modifications.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3">Requested Modifications</h2>
            <Card className="border-l-4 border-yellow-500">
              <CardContent className="py-4">
                <div className="space-y-3">
                  {meetup.modifications[meetup.modifications.length - 1].transportRequest && (
                    <div className="flex items-center">
                      <DollarSign size={20} className="text-yellow-500" />
                      <span className="ml-3">Transport fee requested</span>
                    </div>
                  )}
                  {meetup.modifications[meetup.modifications.length - 1].selfieRequest && (
                    <div className="flex items-center">
                      <Camera size={20} className="text-yellow-500" />
                      <span className="ml-3">Selfie verification requested</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex space-x-3 w-full">
                  <Button 
                    colorScheme="error" 
                    onClick={handleRejectModifications}
                    fullWidth
                  >
                    Decline
                  </Button>
                  <Button 
                    colorScheme="success" 
                    onClick={handleApproveModifications}
                    fullWidth
                  >
                    Approve
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};