import { hours } from "@/data/timeSlotData";

export function calculateTotal(cookieStands) {
  let totalAll = 0;
  const hourlyTotals = hours.map((_, i) => {
    const curr = cookieStands
      .filter((stand) => stand.hourly_sales)
      .reduce((prev, curr) => prev + curr.hourly_sales[i] || 0, 0);
    totalAll += curr;
    return curr;
  });
  return { hourlyTotals, totalAll };
}
