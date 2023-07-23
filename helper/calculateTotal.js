import { hours } from "@/data/timeSlotData";

export function calculateTotal(cookieStands) {
  let totalAll = 0;
  const hourlyTotals = Array(hours.length)
    .fill(0)
    .map((_, i) => {
      const curr = cookieStands.reduce(
        (prev, curr) => prev + curr.hourlySales[i],
        0
      );
      totalAll += curr;
      return curr;
    });
  return { hourlyTotals, totalAll };
}
