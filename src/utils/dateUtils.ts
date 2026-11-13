const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const parseIsoDate = (iso: string): Date => {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
};

export const formatLongDate = (iso: string): string => {
  const date = parseIsoDate(iso);
  return `${WEEKDAYS[date.getUTCDay()]}, ${MONTHS[date.getUTCMonth()].slice(0, 3)} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
};

export const formatShortMonthDay = (iso: string): string => {
  const date = parseIsoDate(iso);
  return `${MONTHS[date.getUTCMonth()].slice(0, 3)} ${date.getUTCDate()}`;
};

export const formatLongDateFull = (iso: string): string => {
  const date = parseIsoDate(iso);
  return `${WEEKDAYS[date.getUTCDay()]}, ${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
};

export interface ClockParts {
  time: string;
  period: 'AM' | 'PM';
}

export const to12Hour = (time24: string): ClockParts => {
  const [hours, minutes] = time24.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return { time: `${String(hour12).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`, period };
};

export const formatTimeRange = (start: string, end: string): string => {
  const from = to12Hour(start);
  const to = to12Hour(end);
  return `${from.time} ${from.period} - ${to.time} ${to.period}`;
};

export const timeAgo = (iso: string, now: number = Date.now()): string => {
  const diffMinutes = Math.max(0, Math.round((now - new Date(iso).getTime()) / 60000));
  if (diffMinutes < 1) {
    return 'Just now';
  }
  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  }
  const hours = Math.round(diffMinutes / 60);
  if (hours < 24) {
    return `${hours}h ago`;
  }
  return `${Math.round(hours / 24)}d ago`;
};
