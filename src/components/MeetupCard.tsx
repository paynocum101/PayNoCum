import React from 'react';
import { Meetup, MeetupStatus } from '../types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/Card';
import { Badge } from './ui/Badge';
import { Clock, MapPin, Users, Calendar } from 'lucide-react';

interface MeetupCardProps {
  meetup: Meetup;
  onClick: () => void;
}

export const MeetupCard: React.FC<MeetupCardProps> = ({ meetup, onClick }) => {
  const getStatusBadge = () => {
    switch (meetup.status) {
      case MeetupStatus.DRAFT:
        return <Badge colorScheme="secondary">Draft</Badge>;
      case MeetupStatus.PENDING:
        return <Badge colorScheme="warning">Pending</Badge>;
      case MeetupStatus.MODIFIED:
        return <Badge colorScheme="warning">Modified</Badge>;
      case MeetupStatus.APPROVED:
        return <Badge colorScheme="success">Approved</Badge>;
      case MeetupStatus.COMPLETED:
        return <Badge colorScheme="primary">Completed</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' }),
      time: date.toLocaleString('default', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const { day, month, time } = formatDate(meetup.dateTime);
  const isModified = meetup.status === MeetupStatus.MODIFIED;
  const cardClass = isModified ? 'border-l-4 border-yellow-500' : '';

  return (
    <Card isHoverable onClick={onClick} className={cardClass}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-center justify-center w-12 h-12 bg-slate-700 rounded-lg">
              <span className="text-lg font-bold">{day}</span>
              <span className="text-xs text-slate-400">{month}</span>
            </div>
            <div>
              <CardTitle>{meetup.activities.join(', ')}</CardTitle>
              <p className="text-sm text-slate-400">{time}</p>
            </div>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center text-slate-300">
            <MapPin size={16} className="mr-2" />
            <span>{meetup.location}</span>
          </div>
          <div className="flex items-center text-slate-300">
            <Users size={16} className="mr-2" />
            <span>{meetup.partners.length} partners</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex space-x-1">
          {meetup.requireSelfie && (
            <Badge colorScheme="secondary" variant="outline">Selfie</Badge>
          )}
          {meetup.includeTransport && (
            <Badge colorScheme="secondary" variant="outline">Transport</Badge>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};