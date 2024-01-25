//get a current cycle array
//and then just structure it by days?

import { datesArrOfArr } from "../models/cycle/types";

export const countPhases = (cycle:datesArrOfArr, periodLength: number) => {
  if (cycle) {
    const follicularLength = Math.round(cycle.length * 0.32);
    const ovulationLength = Math.round(cycle.length * 0.16);

    const menstrual = cycle.slice(0, periodLength);
    const follicular = cycle.slice(
      periodLength,
      periodLength + follicularLength
    );
    const ovulation = cycle.slice(
      periodLength + follicularLength,
      periodLength + follicularLength + ovulationLength
    );
    const luteral = cycle.slice(
      periodLength + follicularLength + ovulationLength
    );

    return { menstrual, follicular, ovulation, luteral };
  }
};
