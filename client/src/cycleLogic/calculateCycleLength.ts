import { getDatesBetweenExceptLast } from "../calendarLogic/getDatesBetween"

export const calculateCycleLength = (startDate, previousStartDate) => {
   const cycle = getDatesBetweenExceptLast(startDate, previousStartDate)
   return cycle.length
}