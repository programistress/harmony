import "./CalendarPage.css";
import { getEightMonths } from "../../calendarLogic/getEightMonths";
import { getDaysInMonthsSplitByWeeks } from "../../calendarLogic/getDaysInMonthsSplitByWeeks";
import NavBar from "../../components/NavBar";
import { useContext } from "react";
import { Context } from "../../main";
import { DateTime } from "luxon";
import { observer } from "mobx-react-lite";

function CalendarPage() {
  const colorPeriodDates = () => {
    const { store } = useContext(Context);

    if (store.user.periodDates && store.user.periodDates.length > 0) {
      return store.user.periodDates.map((row) =>
        row.map((dateString) => {
          const dateObject = new Date(dateString);
          if (!isNaN(dateObject.getTime())) {
            return DateTime.fromJSDate(dateObject);
          } else {
            // Handle the case where the date string is invalid
            console.error(`Invalid date string: ${dateString}`);
            return null; // or handle it in another way, like returning a default value
          }
        })
      );
    } else {
      return [];
    }
  };

  const isDateInDateTimeObjects = (date) => {
    return (
      dateTimeObjects &&
      dateTimeObjects.some((dateArray) =>
        dateArray.some(
          (dateTime) =>
            dateTime.day === date.c.day &&
            dateTime.month === date.c.month &&
            dateTime.year === date.c.year
        )
      )
    );
  };

  const dateTimeObjects = colorPeriodDates();
  const eightMonths = getEightMonths();
  const splitByWeeks = getDaysInMonthsSplitByWeeks(eightMonths);
  return (
    <div className="container">
      <NavBar />
      <div className="calendar">
        {splitByWeeks.map((month) => (
          <div className="month__div">
            <h1 className="month_title">{month.monthName}</h1>
            <ul className="day__names">
              <li>M</li>
              <li>T</li>
              <li>W</li>
              <li>T</li>
              <li>F</li>
              <li>S</li>
              <li>S</li>
            </ul>
            {month.weeks.map((week) => (
              <div className="week_line">
                {week.map((day) => (
                  <div
                    className={
                      day.isToday
                        ? "calendar__day-today"
                        : isDateInDateTimeObjects(day.date)
                        ? "calendar__day-period"
                        : "calendar__day"
                    }
                  >
                    {day.date.c.day}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default observer(CalendarPage)
