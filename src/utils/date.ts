import type { Iso8601 } from "@/types";

export function parseDate(date: Iso8601): Date {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid ISO 8601 date format");
  }
  return parsedDate;
}

/**
 * @example getDuration("2025-01-01", "2026-03-05") // "P1Y2M4D"
 */
export function getDuration(startDate?: Iso8601, endDate?: Iso8601): Iso8601 {
  if (!startDate || !endDate) return "";
  const start = parseDate(startDate);
  const end = parseDate(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) return "";

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += lastMonth.getDate();
    months--;
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const duration = [`${years}Y`, `${months}M`, `${days}D`]
    .filter((p) => !p.startsWith("0"))
    .join("");

  return duration ? `P${duration}` : "P0D";
}
