import { Exhibitor, Notice, VenueInfo } from '../types/models.types';

export const mockVenue: VenueInfo = {
  name: 'Dubai International Convention & Exhibition Center',
  address: 'World Trade Centre, Dubai, United Arab Emirates',
  dates: '22 - 23 May 2026',
  latitude: 25.2285,
  longitude: 55.2867,
  facilities: [
    { id: 'wifi', label: 'Free Wi-Fi', icon: 'wifi' },
    { id: 'parking', label: 'Parking', icon: 'car-outline' },
    { id: 'catering', label: 'Catering', icon: 'restaurant-outline' },
    { id: 'access', label: 'Accessible', icon: 'accessibility-outline' },
  ],
};

export const mockExhibitors: Exhibitor[] = [
  {
    id: 'e-01',
    name: 'NutriScience Labs',
    category: 'Research',
    booth: 'A-12',
    description: 'Clinical nutrition research and analytical services.',
  },
  {
    id: 'e-02',
    name: 'Little Steps Health',
    category: 'Pediatrics',
    booth: 'A-14',
    description: 'Paediatric feeding resources and parent education tools.',
  },
  {
    id: 'e-03',
    name: 'MedData Systems',
    category: 'Digital Health',
    booth: 'B-03',
    description: 'Clinic software for growth tracking and dietary records.',
  },
  {
    id: 'e-04',
    name: 'Gulf Dietetics Association',
    category: 'Association',
    booth: 'B-07',
    description: 'Professional network for dietitians across the region.',
  },
  {
    id: 'e-05',
    name: 'BioGut Diagnostics',
    category: 'Diagnostics',
    booth: 'C-01',
    description: 'Microbiome testing and interpretation support.',
  },
  {
    id: 'e-06',
    name: 'Wellspring Publishing',
    category: 'Publishing',
    booth: 'C-09',
    description: 'Medical journals and clinical reference titles.',
  },
];

export const mockNotices: Notice[] = [
  {
    id: 'n-01',
    title: 'Registration opens at 07:30',
    body: 'Collect your badge at the main entrance. Have your QR code ready.',
    time: 'Day 1 · 07:00',
  },
  {
    id: 'n-02',
    title: 'Poster session moved to Hall B',
    body: 'The poster session will now take place in Hall B at 12:30.',
    time: 'Day 1 · 09:00',
  },
  {
    id: 'n-03',
    title: 'Certificates available after Day 2',
    body: 'Attendance certificates will be listed in your profile after the closing keynote.',
    time: 'Day 2 · 08:00',
  },
];
