import { type ClassValue, clsx } from 'clsx';

/**
 * Merge class names with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date | string, locale = 'en-US'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format date range (e.g., "Jan 2020 - Present")
 */
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

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}

/**
 * Generate slug from string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Debounce function
 */
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

/**
 * Mélange un tableau de manière équitable.
 * @param array Le tableau à mélanger (modifié sur place).
 * @returns Le tableau mélangé.
 */
export function getShuffledArray<T> (array: T[]): T[] {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

/**
 * Check if we're on the client side
 */
export const isClient = typeof window !== 'undefined';

/**
 * Check if we're in development mode
 */
export const isDev = process.env.NODE_ENV === 'development';
