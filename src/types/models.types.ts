export type SessionCategory = 'Keynote' | 'Nutrition' | 'Research' | 'Pediatrics';
export type SpeakerCategory = 'Nutrition' | 'Research' | 'Pediatrics';
export type QuestionCategory = 'General' | 'Nutrition' | 'Research' | 'Clinical';
export type ResourceType = 'PDF' | 'Slides' | 'Video';

export interface User {
  id: string;
  fullName: string;
  email: string;
  organization: string;
  designation: string;
  phone: string;
  location: string;
  attendeeType: string;
  badgeId: string;
  certificates: number;
  avatarUrl?: string;
}

export interface Session {
  id: string;
  day: 1 | 2;
  date: string;
  startTime: string;
  endTime: string;
  title: string;
  description: string;
  category: SessionCategory;
  location: string;
  speakerId: string;
  speakerName: string;
}

export interface Speaker {
  id: string;
  name: string;
  designation: string;
  country: string;
  specialization: string;
  category: SpeakerCategory;
  featured: boolean;
  bio: string;
  sessionIds: string[];
}

export interface PollOption {
  id: string;
  label: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  category: string;
  options: PollOption[];
}

export interface Question {
  id: string;
  text: string;
  category: QuestionCategory;
  author: string;
  createdAt: string;
  upvotes: number;
  answered: boolean;
  answer?: string;
  answeredBy?: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  sizeMb: number;
  url: string;
}

export interface Exhibitor {
  id: string;
  name: string;
  category: string;
  booth: string;
  description: string;
}

export interface VenueInfo {
  name: string;
  address: string;
  dates: string;
  latitude: number;
  longitude: number;
  facilities: { id: string; label: string; icon: string }[];
}

export interface Notice {
  id: string;
  title: string;
  body: string;
  time: string;
}

export interface QuickAccessItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  category: 'Event' | 'Interactive' | 'Tools';
  route: QuickAccessRoute;
}

export type QuickAccessRoute =
  | 'Agenda'
  | 'Speakers'
  | 'NameTag'
  | 'Venue'
  | 'Voting'
  | 'QA'
  | 'Resources'
  | 'Exhibitors';
