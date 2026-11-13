import { appConfig } from '../constants/appConfig';
import { Resource } from '../types/models.types';

const url = appConfig.sampleDownloadUrl;

export const mockResources: Resource[] = [
  {
    id: 'r-01',
    title: 'Congress Scientific Program',
    description: 'Complete schedule and session details',
    type: 'PDF',
    sizeMb: 4.2,
    url,
  },
  {
    id: 'r-02',
    title: 'Pediatric Nutrition Guidelines',
    description: 'Clinical reference material',
    type: 'PDF',
    sizeMb: 2.8,
    url,
  },
  {
    id: 'r-03',
    title: 'Keynote Presentation Slides',
    description: 'The Next Era of Nutrition & Health',
    type: 'Slides',
    sizeMb: 8.6,
    url,
  },
  {
    id: 'r-04',
    title: 'Gut Microbiome Research Slides',
    description: 'Evidence summary and references',
    type: 'Slides',
    sizeMb: 6.1,
    url,
  },
  {
    id: 'r-05',
    title: 'Opening Ceremony Recording',
    description: 'Full video recording of the opening session',
    type: 'Video',
    sizeMb: 124.5,
    url,
  },
  {
    id: 'r-06',
    title: 'Allergy Prevention Handbook',
    description: 'Practical guidance for clinical teams',
    type: 'PDF',
    sizeMb: 3.4,
    url,
  },
];
