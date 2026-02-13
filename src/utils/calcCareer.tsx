import type { Career } from "@/types/profile";

function toMonthCount(date: Date) {
  return date.getFullYear() * 12 + date.getMonth();
}

function parseDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

export function calcTotalCareer(careers: Career[]) {
  const now = new Date();
  let totalMonths = 0;

  careers.forEach((c) => {
    if (!c.startDate) return;

    const start = parseDate(c.startDate);
    const end = c.isCurrent || !c.endDate ? now : parseDate(c.endDate);

    const diff = toMonthCount(end) - toMonthCount(start) + 1;
    if (diff > 0) totalMonths += diff;
  });

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return { years, months, totalMonths };
}

export function calcCareerDuration(c: Career) {
  if (!c.startDate) return null;

  const now = new Date();

  const start = parseDate(c.startDate);
  const end = c.isCurrent || !c.endDate ? now : parseDate(c.endDate);

  const totalMonths = toMonthCount(end) - toMonthCount(start) + 1;
  if (totalMonths <= 0) return null;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return { years, months, totalMonths };
}

export function formatDuration(duration: { years: number; months: number }) {
  if (duration.years === 0) return `${duration.months}개월`;
  if (duration.months === 0) return `${duration.years}년`;
  return `${duration.years}년 ${duration.months}개월`;
}