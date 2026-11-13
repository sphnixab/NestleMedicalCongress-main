import { Poll } from '../types/models.types';

export const mockPolls: Poll[] = [
  {
    id: 'p-01',
    question: 'How would you rate the current session?',
    category: 'Audience Feedback',
    options: [
      { id: 'p-01-a', label: 'Excellent', votes: 55 },
      { id: 'p-01-b', label: 'Very Good', votes: 31 },
      { id: 'p-01-c', label: 'Good', votes: 10 },
      { id: 'p-01-d', label: 'Fair', votes: 5 },
    ],
  },
  {
    id: 'p-02',
    question: 'Which topic should we explore further next year?',
    category: 'Programme Planning',
    options: [
      { id: 'p-02-a', label: 'Gut microbiome', votes: 38 },
      { id: 'p-02-b', label: 'Personalised nutrition', votes: 46 },
      { id: 'p-02-c', label: 'Allergy prevention', votes: 24 },
      { id: 'p-02-d', label: 'Digital health tools', votes: 19 },
    ],
  },
  {
    id: 'p-03',
    question: 'How likely are you to apply today\'s learnings in practice?',
    category: 'Impact',
    options: [
      { id: 'p-03-a', label: 'Very likely', votes: 62 },
      { id: 'p-03-b', label: 'Likely', votes: 41 },
      { id: 'p-03-c', label: 'Unsure', votes: 12 },
      { id: 'p-03-d', label: 'Unlikely', votes: 3 },
    ],
  },
];
