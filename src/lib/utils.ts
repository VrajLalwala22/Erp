import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatNumber(number: number): string {
  return new Intl.NumberFormat('en-US').format(number);
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(dateObj);
}

export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    active: 'text-[#34D399] bg-emerald-50',
    inactive: 'text-gray-600 bg-gray-100',
    pending: 'text-[#FACC15] bg-yellow-50',
    completed: 'text-[#34D399] bg-emerald-50',
    cancelled: 'text-[#F87171] bg-red-50',
    draft: 'text-gray-600 bg-gray-100',
    paid: 'text-[#34D399] bg-emerald-50',
    unpaid: 'text-[#F87171] bg-red-50',
    overdue: 'text-[#F87171] bg-red-50',
    high: 'text-[#F87171] bg-red-50',
    medium: 'text-[#FACC15] bg-yellow-50',
    low: 'text-[#34D399] bg-emerald-50',
  };
  
  return statusColors[status.toLowerCase()] || 'text-gray-600 bg-gray-100';
}