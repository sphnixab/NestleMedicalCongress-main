import { Question } from '../types/models.types';

const minutesAgo = (minutes: number): string =>
  new Date(Date.now() - minutes * 60000).toISOString();

export const mockQuestions: Question[] = [
  {
    id: 'q-01',
    text: 'How can pediatric nutrition plans be personalized for children with different growth patterns?',
    category: 'Nutrition',
    author: 'Dr. Ahmed',
    createdAt: minutesAgo(35),
    upvotes: 24,
    answered: true,
    answer:
      'Start from the growth trajectory rather than a single measurement, then adjust energy and protein targets with regular follow-up. We will share a worked example in the session slides.',
    answeredBy: 'Dr. Sarah Johnson',
  },
  {
    id: 'q-02',
    text: 'Is there enough evidence to recommend early allergen introduction for all infants?',
    category: 'Clinical',
    author: 'Dr. Noor Rahman',
    createdAt: minutesAgo(90),
    upvotes: 17,
    answered: false,
  },
  {
    id: 'q-03',
    text: 'What sample sizes are needed for meaningful real-world evidence in infant feeding studies?',
    category: 'Research',
    author: 'Dr. Karim Saleh',
    createdAt: minutesAgo(180),
    upvotes: 11,
    answered: true,
    answer:
      'It depends on the effect size and outcome, but registries with several thousand participants are usually the minimum for subgroup conclusions.',
    answeredBy: 'Dr. Michael Chen',
  },
  {
    id: 'q-04',
    text: 'Are there any recommended tools for tracking micronutrient intake in busy clinics?',
    category: 'General',
    author: 'Dr. Fatima Zaid',
    createdAt: minutesAgo(300),
    upvotes: 8,
    answered: false,
  },
];
