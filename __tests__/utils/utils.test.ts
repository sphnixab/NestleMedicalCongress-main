import { formatLongDate, formatTimeRange, to12Hour } from '../../src/utils/dateUtils';
import { filterResources, filterSessions, getUpcomingSessions, sortQuestions } from '../../src/utils/filterUtils';
import { getInitials, getPercentage, matchesQuery } from '../../src/utils/formatUtils';
import { mockQuestions } from '../../src/data/mockQuestions';
import { mockResources } from '../../src/data/mockResources';
import { mockSessions } from '../../src/data/mockSessions';

describe('formatUtils', () => {
  it('builds initials', () => {
    expect(getInitials('Huda Latheef')).toBe('HL');
    expect(getInitials('Dr. Sarah Johnson')).toBe('SJ');
    expect(getInitials('Madonna')).toBe('M');
  });

  it('calculates percentages safely', () => {
    expect(getPercentage(55, 101)).toBe(54);
    expect(getPercentage(5, 0)).toBe(0);
  });

  it('matches queries case-insensitively', () => {
    expect(matchesQuery('PEDIA', 'Future of Pediatric Nutrition')).toBe(true);
    expect(matchesQuery('', 'anything')).toBe(true);
    expect(matchesQuery('zzz', 'abc', undefined)).toBe(false);
  });
});

describe('dateUtils', () => {
  it('formats times', () => {
    expect(to12Hour('08:30')).toEqual({ time: '08:30', period: 'AM' });
    expect(to12Hour('13:05')).toEqual({ time: '01:05', period: 'PM' });
    expect(formatTimeRange('09:30', '10:15')).toBe('09:30 AM - 10:15 AM');
  });

  it('derives the correct weekday', () => {
    expect(formatLongDate('2026-05-22')).toBe('Friday, May 22, 2026');
  });
});

describe('filterUtils', () => {
  it('filters sessions by day, category and query', () => {
    const day1 = filterSessions(mockSessions, { day: 1, category: 'All', query: '' });
    expect(day1.every(item => item.day === 1)).toBe(true);
    expect(day1[0].startTime <= day1[1].startTime).toBe(true);

    const keynotes = filterSessions(mockSessions, { day: 1, category: 'Keynote', query: '' });
    expect(keynotes.every(item => item.category === 'Keynote')).toBe(true);

    const search = filterSessions(mockSessions, { day: 1, category: 'All', query: 'sarah' });
    expect(search.map(item => item.id)).toEqual(['s-03']);
  });

  it('falls back to the first sessions when none are upcoming', () => {
    const result = getUpcomingSessions(mockSessions, Date.UTC(2027, 0, 1), 3);
    expect(result).toHaveLength(3);
    expect(result[0].id).toBe('s-01');
  });

  it('filters resources by saved state and type', () => {
    expect(filterResources(mockResources, { filter: 'Saved', query: '', savedIds: ['r-02'] })).toHaveLength(1);
    expect(filterResources(mockResources, { filter: 'Videos', query: '', savedIds: [] })[0].type).toBe('Video');
  });

  it('sorts questions', () => {
    expect(sortQuestions(mockQuestions, 'Popular')[0].upvotes).toBe(24);
    expect(sortQuestions(mockQuestions, 'Answered').every(item => item.answered)).toBe(true);
  });
});
