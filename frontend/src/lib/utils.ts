import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    ...options,
  }).format(date);
}

export function formatDateShort(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number = 300
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function createArray(length: number): number[] {
  return Array.from({ length }, (_, i) => i + 1);
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function isEmpty(obj: any): boolean {
  return obj === null || obj === undefined || obj === '';
}

export function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const result = { ...target };

  for (const key in source) {
    if (source[key] !== undefined) {
      if (
        typeof result[key] === 'object' &&
        result[key] !== null &&
        typeof source[key] === 'object' &&
        !Array.isArray(source[key])
      ) {
        result[key] = deepMerge(result[key], source[key] as T);
      } else {
        result[key] = source[key] as T[keyof T];
      }
    }
  }

  return result;
}

export function getContrastYIQ(hexColor: string): 'white' | 'black' {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'black' : 'white';
}

export function hexToRgba(hex: string, alpha: number): string {
  const hexClean = hex.replace('#', '');
  const r = parseInt(hexClean.substr(0, 2), 16);
  const g = parseInt(hexClean.substr(2, 2), 16);
  const b = parseInt(hexClean.substr(4, 2), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function randomString(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'absolute';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    return new Promise<void>((resolve, reject) => {
      try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (successful) {
          resolve();
        } else {
          reject(new Error('Copy failed'));
        }
      } catch (err) {
        document.body.removeChild(textArea);
        reject(err);
      }
    });
  }
}

export function downloadFile(url: string, filename: string): Promise<void> {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to download file');
      }
      return response.blob();
    })
    .then(blob => {
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    });
}

export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function getWindowSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024,
  };
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const handleResize = debounce(() => {
      setWindowSize(getWindowSize());
    }, 250);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export function useIsomorphicLayoutEffect(callback: () => void, deps: any[] = []) {
  const isServer = typeof window === 'undefined';
  const useEffect = isServer ? () => {} : React.useEffect;
  return useEffect(callback, deps);
}

export function inverseColor(color: string): string {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  const inverseR = (255 - r).toString(16).padStart(2, '0');
  const inverseG = (255 - g).toString(16).padStart(2, '0');
  const inverseB = (255 - b).toString(16).padStart(2, '0');

  return `#${inverseR}${inverseG}${inverseB}`;
}

export function isObjectEmpty(obj: any): boolean {
  return Object.keys(obj).length === 0;
}

export function sortBy<T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const groupKey = String(item[key]);
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export function sum(array: number[]): number {
  return array.reduce((acc, curr) => acc + curr, 0);
}

export function average(array: number[]): number {
  return array.length ? sum(array) / array.length : 0;
}

export function median(array: number[]): number {
  const sorted = [...array].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function retry<T>(fn: () => Promise<T>, retries: number = 3, delay: number = 1000): Promise<T> {
  return fn().catch((error) => {
    if (retries <= 1) throw error;
    return delay(delay).then(() => retry(fn, retries - 1, delay));
  });
}

export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce((result, key) => {
    result[key] = obj[key];
    return result;
  }, {} as Pick<T, K>);
}

export function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  keys.forEach(key => {
    delete result[key];
  });
  return result;
}

export function values<T>(obj: Record<string, T>): T[] {
  return Object.values(obj);
}

export function entries<T>(obj: Record<string, T>): [string, T][] {
  return Object.entries(obj) as [string, T][];
}

export function mapValues<T, U>(obj: Record<string, T>, fn: (value: T, key: string) => U): Record<string, U> {
  const result: Record<string, U> = {};
  for (const [key, value] of entries(obj)) {
    result[key] = fn(value, key);
  }
  return result;
}

export function filterObject<T>(obj: Record<string, T>, predicate: (value: T, key: string) => boolean): Partial<T> {
  const result: Partial<T> = {};
  for (const [key, value] of entries(obj)) {
    if (predicate(value, key)) {
      result[key] = value;
    }
  }
  return result;
}

export function hasProperty<T>(obj: any, key: string): key is keyof T {
  return key in obj;
}

export function safeJSONParse<T>(str: string, fallback?: T): T | null {
  try {
    return JSON.parse(str) as T;
  } catch {
    return fallback ?? null;
  }
}

export function safeJSONStringify<T>(obj: T): string {
  try {
    return JSON.stringify(obj);
  } catch {
    return '{}';
  }
}

export function compareObjects(obj1: any, obj2: any, deep: boolean = false): boolean {
  if (obj1 === obj2) return true;

  if (typeof obj1 !== typeof obj2) return false;

  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) return false;
    return obj1.every((item, index) => compareObjects(item, obj2[index], deep));
  }

  if (
    typeof obj1 === 'object' &&
    typeof obj2 === 'object' &&
    obj1 !== null &&
    obj2 !== null
  ) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    return keys1.every(key => {
      if (!keys2.includes(key)) return false;
      return compareObjects(obj1[key], obj2[key], deep);
    });
  }

  return false;
}

export function debouncePromise<T>(fn: (...args: any[]) => Promise<T>, wait: number): (...args: any[]) => Promise<T> {
  let timeout: NodeJS.Timeout;
  return (...args) => {
    clearTimeout(timeout);
    return new Promise((resolve, reject) => {
      timeout = setTimeout(async () => {
        try {
          const result = await fn(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, wait);
    });
  };
}

export function throttle(fn: (...args: any[]) => any, limit: number) {
  let inThrottle = false;
  return (...args: any[]) => {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}