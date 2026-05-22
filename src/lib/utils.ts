import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
}

export function formatPercent(num: number): string {
  return `${num >= 0 ? '+' : ''}${num.toFixed(2)}%`;
}

export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function severityColor(severity: string): string {
  switch (severity) {
    case 'critical': return 'text-red-400 border-red-500/50 bg-red-500/10';
    case 'high': return 'text-orange-400 border-orange-500/50 bg-orange-500/10';
    case 'medium': return 'text-yellow-400 border-yellow-500/50 bg-yellow-500/10';
    case 'low': return 'text-blue-400 border-blue-500/50 bg-blue-500/10';
    default: return 'text-gray-400 border-gray-500/50 bg-gray-500/10';
  }
}
