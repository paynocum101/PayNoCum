export enum MeetupStatus {
  DRAFT = "draft",
  PENDING = "pending",
  MODIFIED = "modified",
  APPROVED = "approved",
  COMPLETED = "completed"
}

export interface Partner {
  id: string;
  name: string;
  phone: string;
  approved: boolean;
}

export interface Modification {
  requesterId: string;
  requesterName: string;
  transportRequest: boolean;
  selfieRequest: boolean;
}

export interface Meetup {
  id: string;
  hostId: string;
  location: string;
  activities: string[];
  dateTime: string;
  partners: Partner[];
  requireSelfie: boolean;
  includeTransport: boolean;
  status: MeetupStatus;
  modifications?: Modification[];
}