export const getInitials = (fullName: string): string => {
  const parts = fullName
    .replace(/^(dr|prof)\.?\s+/i, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) {
    return '?';
  }
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
};

export const getPercentage = (value: number, total: number): number =>
  total <= 0 ? 0 : Math.round((value / total) * 100);

export const formatFileSize = (sizeMb: number): string => `${sizeMb.toFixed(1)} MB`;

export const padCount = (value: number): string => String(value).padStart(2, '0');

export const firstName = (fullName: string): string => fullName.trim().split(/\s+/)[0] ?? '';

export const normalizeText = (value: string): string => value.trim().toLowerCase();

export const matchesQuery = (query: string, ...fields: (string | undefined)[]): boolean => {
  const needle = normalizeText(query);
  if (!needle) {
    return true;
  }
  return fields.some(field => (field ?? '').toLowerCase().includes(needle));
};
