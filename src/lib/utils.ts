import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: Date | string, locale = 'en-US'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateRange(
  start: Date | string,
  end?: Date | string | null,
  locale = 'en-US'
): string {
  const startDate = typeof start === 'string' ? new Date(start) : start;
  const startStr = startDate.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
  });

  if (!end) {
    return `${startStr} - Present`;
  }

  const endDate = typeof end === 'string' ? new Date(end) : end;
  const endStr = endDate.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
  });

  return `${startStr} - ${endStr}`;
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// Fisher-Yates shuffle
export function getShuffledArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

export const isClient = typeof window !== 'undefined';
export const isDev = process.env.NODE_ENV === 'development';
