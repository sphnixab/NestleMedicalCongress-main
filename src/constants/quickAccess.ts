import { QuickAccessItem } from '../types/models.types';

export const quickAccessItems: QuickAccessItem[] = [
  {
    id: 'agenda',
    title: 'Agenda',
    subtitle: 'View full congress schedule',
    icon: 'calendar-outline',
    category: 'Event',
    route: 'Agenda',
  },
  {
    id: 'speakers',
    title: 'Speakers',
    subtitle: 'Explore global medical experts',
    icon: 'people',
    category: 'Event',
    route: 'Speakers',
  },
  {
    id: 'nametag',
    title: 'Name Tag',
    subtitle: 'Access your digital badge',
    icon: 'id-card-outline',
    category: 'Tools',
    route: 'NameTag',
  },
  {
    id: 'venue',
    title: 'Venue',
    subtitle: 'Location, facilities and directions',
    icon: 'location-outline',
    category: 'Event',
    route: 'Venue',
  },
  {
    id: 'voting',
    title: 'Voting',
    subtitle: 'Join live polls and share feedback',
    icon: 'bar-chart',
    category: 'Interactive',
    route: 'Voting',
  },
  {
    id: 'qa',
    title: 'Ask Q&A',
    subtitle: 'Send questions to the speakers',
    icon: 'chatbox-outline',
    category: 'Interactive',
    route: 'QA',
  },
  {
    id: 'resources',
    title: 'Resources',
    subtitle: 'Slides, documents and media',
    icon: 'folder-open-outline',
    category: 'Tools',
    route: 'Resources',
  },
  {
    id: 'exhibitors',
    title: 'Exhibitors',
    subtitle: 'Meet partners and sponsors',
    icon: 'briefcase-outline',
    category: 'Event',
    route: 'Exhibitors',
  },
];

export const quickAccessFilters = ['All', 'Event', 'Interactive', 'Tools'] as const;
