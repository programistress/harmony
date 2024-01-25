export function getDatesBetween(start:Date, end:Date) {
  const dates = [];
  let currentDate = new Date(start);

  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

export function getDatesBetweenExceptLast(start:Date, end:Date) {
  const dates = [];
  let currentDate = new Date(start);

  while (currentDate < end) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}