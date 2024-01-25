const areDatesEqualIgnoringTime = (date1, date2) =>
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate();

export const getCurrentCycle = (cycleArray, today) => {
  const targetDate = today[0]?.date?.toJSDate();

  if (targetDate) {
    return cycleArray.find((cycle) =>
      cycle.some((dateString) =>
        areDatesEqualIgnoringTime(new Date(dateString), targetDate)
      )
    );
  }

  return undefined;
};
