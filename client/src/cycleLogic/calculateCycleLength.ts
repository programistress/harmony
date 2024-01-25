import { getDatesBetweenExceptLast } from "../calendarLogic/getDatesBetween"

export const calculateCycleLength = (startDate, previousStartDate) => {
  // get current period date input or even just the start date
  // get the one before it
  // get how much days between
   const cycle = getDatesBetweenExceptLast(startDate, previousStartDate)
   return cycle.length
}