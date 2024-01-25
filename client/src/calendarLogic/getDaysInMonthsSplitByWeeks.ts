import { ArrayOfMonths, ArrayOfMonthsSplitByWeeks, DayData, MonthSplitByWeeks } from "../models/calendar/types";


export const getDaysInMonthsSplitByWeeks = (months:ArrayOfMonths):ArrayOfMonthsSplitByWeeks => {
  const result:ArrayOfMonthsSplitByWeeks = []
  let tempArray:DayData[] = []
  months.forEach((month) => {
    let monthArr:MonthSplitByWeeks = {monthName: month.monthName, weeks: []}

    month.days.forEach((currValue: DayData, currIndex: number) => {
      tempArray.push(currValue)
      if (currValue.date.weekday === 7 || currIndex === month.days.length - 1) {
        monthArr.weeks.push(tempArray)
        tempArray = []
      }
    })
    result.push(monthArr)
  })
  return result
}