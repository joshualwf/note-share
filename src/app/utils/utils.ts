export function getRelativeTime(date: Date | string): string {
  const now = new Date();
  const targetDate = date instanceof Date ? date : new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);

  const intervals: { unit: string; seconds: number }[] = [
    { unit: "y", seconds: 31536000 },
    { unit: "mo", seconds: 2592000 },
    { unit: "w", seconds: 604800 },
    { unit: "d", seconds: 86400 },
    { unit: "h", seconds: 3600 },
    { unit: "m", seconds: 60 },
    { unit: "s", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count > 0) {
      return `${count}${interval.unit}`;
    }
  }

  return "now";
}
