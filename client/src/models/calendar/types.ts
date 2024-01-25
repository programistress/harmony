import { DateTime } from "luxon";

export type DayData = {
  date: DateTime;
  isToday: boolean;
};

export type Month = {
  monthName: string,
  days: DayData[]
}

export type Weeks = Array<DayData[]>

export type MonthSplitByWeeks = {
  monthName: string,
  weeks: Weeks
}


export type ArrayOfMonths = Month[]

export type ArrayOfMonthsSplitByWeeks = MonthSplitByWeeks[]