import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Meetup, MeetupStatus, Partner, Modification } from '../types';

interface MeetupContextType {
  meetups: Meetup[];
  currentMeetup: Meetup | null;
  createMeetup: (meetup: Omit<Meetup, 'id' | 'status'>) => void;
  updateMeetup: (id: string, updates: Partial<Meetup>) => void;
  addPartner: (meetupId: string, partner: Omit<Partner, 'id' | 'approved'>) => void;
  approvePartner: (meetupId: string, partnerId: string) => void;
  requestModification: (meetupId: string, modification: Omit<Modification, 'id'>) => void;
  approveModification: (meetupId: string, approve: boolean) => void;
  setCurrentMeetup: (meetup: Meetup | null) => void;
  generateQRCode: (meetupId: string) => string;
}

const MeetupContext = createContext<MeetupContextType | undefined>(undefined);

export const MeetupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [meetups, setMeetups] = useState<Meetup[]>([]);
  const [currentMeetup, setCurrentMeetup] = useState<Meetup | null>(null);

  const createMeetup = (meetup: Omit<Meetup, 'id' | 'status'>) => {
    const newMeetup: Meetup = {
      ...meetup,
      id: Date.now().toString(),
      status: MeetupStatus.DRAFT,
    };
    setMeetups((prev) => [...prev, newMeetup]);
    setCurrentMeetup(newMeetup);
  };

  const updateMeetup = (id: string, updates: Partial<Meetup>) => {
    setMeetups((prev) => 
      prev.map((meetup) => 
        meetup.id === id ? { ...meetup, ...updates } : meetup
      )
    );
    
    if (currentMeetup?.id === id) {
      setCurrentMeetup((prev) => prev ? { ...prev, ...updates } : null);
    }
  };

  const addPartner = (meetupId: string, partner: Omit<Partner, 'id' | 'approved'>) => {
    const newPartner: Partner = {
      ...partner,
      id: Date.now().toString(),
      approved: false,
    };
    
    updateMeetup(meetupId, {
      partners: [...(meetups.find(m => m.id === meetupId)?.partners || []), newPartner],
      status: MeetupStatus.PENDING
    });
  };

  const approvePartner = (meetupId: string, partnerId: string) => {
    const meetup = meetups.find(m => m.id === meetupId);
    if (!meetup) return;
    
    const updatedPartners = meetup.partners.map(partner => 
      partner.id === partnerId ? { ...partner, approved: true } : partner
    );
    
    const allApproved = updatedPartners.every(partner => partner.approved);
    
    updateMeetup(meetupId, {
      partners: updatedPartners,
      status: allApproved ? MeetupStatus.APPROVED : MeetupStatus.PENDING
    });
  };

  const requestModification = (meetupId: string, modification: Omit<Modification, 'id'>) => {
    updateMeetup(meetupId, {
      modifications: [...(meetups.find(m => m.id === meetupId)?.modifications || []), modification as Modification],
      status: MeetupStatus.MODIFIED
    });
  };

  const approveModification = (meetupId: string, approve: boolean) => {
    const meetup = meetups.find(m => m.id === meetupId);
    if (!meetup || !meetup.modifications?.length) return;
    
    const latestMod = meetup.modifications[meetup.modifications.length - 1];
    
    if (approve) {
      updateMeetup(meetupId, {
        requireSelfie: latestMod.selfieRequest || meetup.requireSelfie,
        includeTransport: latestMod.transportRequest || meetup.includeTransport,
        status: MeetupStatus.PENDING,
        modifications: [] // Clear modifications after approval
      });
    } else {
      updateMeetup(meetupId, {
        status: MeetupStatus.PENDING,
        modifications: [] // Clear modifications after rejection
      });
    }
  };

  const generateQRCode = (meetupId: string) => {
    // In a real app, this would generate an actual QR code
    // For this demo, we'll just return the meetup ID as a placeholder
    return `qr-code-for-${meetupId}`;
  };

  return (
    <MeetupContext.Provider
      value={{
        meetups,
        currentMeetup,
        createMeetup,
        updateMeetup,
        addPartner,
        approvePartner,
        requestModification,
        approveModification,
        setCurrentMeetup,
        generateQRCode,
      }}
    >
      {children}
    </MeetupContext.Provider>
  );
};

export const useMeetups = () => {
  const context = useContext(MeetupContext);
  if (context === undefined) {
    throw new Error('useMeetups must be used within a MeetupProvider');
  }
  return context;
};