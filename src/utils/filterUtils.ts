import { QuickAccessItem, Question, Resource, Session, Speaker } from '../types/models.types';
import { matchesQuery } from './formatUtils';

export const filterSessions = (
  sessions: Session[],
  options: { day: 1 | 2; category: string; query: string },
): Session[] =>
  sessions
    .filter(session => session.day === options.day)
    .filter(session => options.category === 'All' || session.category === options.category)
    .filter(session =>
      matchesQuery(options.query, session.title, session.speakerName, session.location, session.category),
    )
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

export const getUpcomingSessions = (sessions: Session[], now: number, limit: number): Session[] => {
  const sorted = [...sessions].sort((a, b) =>
    `${a.date}T${a.startTime}`.localeCompare(`${b.date}T${b.startTime}`),
  );
  const future = sorted.filter(session => new Date(`${session.date}T${session.startTime}:00Z`).getTime() >= now);
  return (future.length > 0 ? future : sorted).slice(0, limit);
};

export const filterSpeakers = (
  speakers: Speaker[],
  options: { category: string; query: string; favouritesOnly?: boolean; favouriteIds?: string[] },
): Speaker[] =>
  speakers
    .filter(speaker => options.category === 'All' || speaker.category === options.category)
    .filter(speaker => !options.favouritesOnly || (options.favouriteIds ?? []).includes(speaker.id))
    .filter(speaker =>
      matchesQuery(options.query, speaker.name, speaker.designation, speaker.country, speaker.specialization),
    )
    .sort((a, b) => Number(b.featured) - Number(a.featured));

export const filterResources = (
  resources: Resource[],
  options: { filter: 'All' | 'PDF' | 'Slides' | 'Videos' | 'Saved'; query: string; savedIds: string[] },
): Resource[] =>
  resources
    .filter(resource => {
      switch (options.filter) {
        case 'All':
          return true;
        case 'PDF':
          return resource.type === 'PDF';
        case 'Slides':
          return resource.type === 'Slides';
        case 'Videos':
          return resource.type === 'Video';
        default:
          return options.savedIds.includes(resource.id);
      }
    })
    .filter(resource => matchesQuery(options.query, resource.title, resource.description));

export const sortQuestions = (
  questions: Question[],
  tab: 'Popular' | 'Recent' | 'Answered',
): Question[] => {
  const list = tab === 'Answered' ? questions.filter(item => item.answered) : [...questions];
  if (tab === 'Recent') {
    return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
  return list.sort((a, b) => b.upvotes - a.upvotes);
};

export const filterQuickAccess = (
  items: QuickAccessItem[],
  options: { category: string; query: string },
): QuickAccessItem[] =>
  items
    .filter(item => options.category === 'All' || item.category === options.category)
    .filter(item => matchesQuery(options.query, item.title, item.subtitle));
