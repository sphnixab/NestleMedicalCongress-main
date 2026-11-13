import { User } from '../types/models.types';

export interface MockUserRecord extends User {
  password: string;
}

export const DEMO_CREDENTIALS = {
  email: 'basit@gmail.com',
  password: 'Basit@2026',
} as const;

export const mockUsers: MockUserRecord[] = [
  {
    id: 'u-001',
    fullName: 'Basit Najar',
    email: DEMO_CREDENTIALS.email,
    password: DEMO_CREDENTIALS.password,
    organization: 'Dubai Medical Centre',
    designation: 'Mobile Developer',
    phone: '+971 54 341 7765',
    location: 'Dubai, UAE',
    attendeeType: 'Attendee',
    badgeId: 'NMC-2026-001',
    certificates: 3,
  },
];
