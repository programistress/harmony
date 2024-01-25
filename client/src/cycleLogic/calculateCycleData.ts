import { getDatesBetweenExceptLast } from "../calendarLogic/getDatesBetween";
import { datesArrOfArr } from "../models/cycle/types";

export const calculateCycleData = (periodInfo:datesArrOfArr) => {
  //make two consts for cycle elements and for cycle lengthes
  const cycleArray = [];
  const cycleLengths = [];
  if (periodInfo && periodInfo.length > 0) {
    //convert everything to date js
    const convertedPhases = periodInfo.map((phase) => {
      if (!Array.isArray(phase) || phase.length === 0) {
        throw new Error("Invalid input.");
      }
      
      const convertedDates = phase.map((date) => new Date(date));
      return convertedDates;
    });
    for (let i = 0; i < convertedPhases.length - 1; i++) {
      //take first day of first array and first date of second
      const currentPhase = convertedPhases[i];
      const nextPhase = convertedPhases[i + 1];

      const firstDayOfCurrentPhase = currentPhase[0];
      const firstDayOfNextPhase = nextPhase[0];
      //get length of this array and put into cycle lengthes
      const cycleLength = Math.round(
        //This subtraction results in the difference in milliseconds between
        (firstDayOfNextPhase - firstDayOfCurrentPhase) / (24 * 60 * 60 * 1000)
      );
      cycleLengths.push(cycleLength);

      const cycle = getDatesBetweenExceptLast(
        firstDayOfCurrentPhase,
        firstDayOfNextPhase
      );
      cycleArray.push(cycle);
    }
  }
  return {
    cycleArray,
    cycleLengths,
  };
};
