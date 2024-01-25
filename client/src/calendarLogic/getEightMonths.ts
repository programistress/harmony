import { DateTime } from "luxon";
import { ArrayOfMonths } from "../models/calendar/types";

const englishMonthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getEightMonths = ():ArrayOfMonths => {
  const eightMonths:ArrayOfMonths = []
  let previousMonth = null;

  for (let i = -3; i <= 4; i++) {
    const month = DateTime.now().plus({ months: i });
    // Check if the current month is different from the previous one
    if (month !== previousMonth) {
      // Render the month name
      eightMonths.push({
        monthName: englishMonthNames[month.month - 1],
        days: [],
      });
      previousMonth = month;
    }

    const daysInMonth = Array.from(
      { length: month.daysInMonth as number },
      (_, index) => {
        const currentDate = DateTime.local(
          month.year,
          month.month,
          index + 1
        );
        const isToday =
          currentDate.toLocaleString(DateTime.DATE_SHORT) ===
          DateTime.local().toLocaleString(DateTime.DATE_SHORT);
        return {
          date: currentDate,
          isToday: isToday,
        };
      }
    );

    // Add days to the current month group
    eightMonths[eightMonths.length - 1].days.push(...daysInMonth);
  }
  return eightMonths
};