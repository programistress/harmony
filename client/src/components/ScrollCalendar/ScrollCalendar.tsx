import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./ScrollCalendar.css";
import { getEightMonths } from "../../calendarLogic/getEightMonths";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";
import { DateTime } from "luxon";

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

type Props = {
  setPickedDate: Dispatch<SetStateAction<any>>;
  setPickedMonth: Dispatch<SetStateAction<any>>;
  predictedPeriodDates: Date[];
};

function ScrollCalendar({
  setPickedDate,
  setPickedMonth,
  predictedPeriodDates,
}: Props) {
  const todayRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const eightMonths = getEightMonths();
  const { store } = useContext(Context);

  const scrollTodayIntoView = () => {
    if (todayRef.current) {
      todayRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  };

  const handleScroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -357 : 357;
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollTodayIntoView();
  }, []);

  const handleClick = (day) => {
    setPickedDate(day.date.day);
    setPickedMonth(englishMonthNames[day.date.month - 1]);
  };

  const colorPeriodDates = () => {
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

  const dateTimeObjects = colorPeriodDates();

  const colorPredictedPeriodDates = () => {
    if (predictedPeriodDates && predictedPeriodDates.length > 0) {
      return predictedPeriodDates.map((date) => {
        if (!isNaN(date.getTime())) {
          return DateTime.fromJSDate(date);
        }
      });
    } else {
      return [];
    }
  };

  const predictedDateTimeObjects = colorPredictedPeriodDates();

  if (eightMonths) {
    return (
      <div className="scrollcalendar">
        <button className="pink" onClick={() => handleScroll("left")}>
          &#9666;
        </button>
        <div className="calendar__allitems" ref={containerRef}>
          {eightMonths.map((monthGroup, monthIndex) => (
            <div key={monthIndex} className="singlemonth__div">
              <h1 className="singlemonth__name">{monthGroup.monthName}</h1>
              {monthGroup.days.map((day, dayIndex) => {
                if (
                  dateTimeObjects?.some((date) =>
                    date.some(
                      (dateTime) =>
                        dateTime.day === day.date.day &&
                        dateTime.month === day.date.month &&
                        dateTime.year === day.date.year
                    )
                  )
                ) {
                  return (
                    <CalendarItem
                      key={dayIndex}
                      value={day.date.day.toString()}
                      isToday={day.isToday}
                      ref={day.isToday ? todayRef : null}
                      onClick={() => handleClick(day)}
                      className={
                        day.isToday
                          ? "calendar__item-pink today"
                          : "calendar__item-pink"
                      }
                    />
                  );
                } else if (
                  predictedDateTimeObjects?.some(
                    (dateTime) =>
                      dateTime.day === day.date.day &&
                      dateTime.month === day.date.month &&
                      dateTime.year === day.date.year
                  )
                ) {
                  return (
                    <CalendarItem
                      key={dayIndex}
                      value={day.date.day.toString()}
                      isToday={day.isToday}
                      ref={day.isToday ? todayRef : null}
                      onClick={() => handleClick(day)}
                      className={
                        day.isToday
                          ? "calendar__item-pred today"
                          : "calendar__item-pred"
                      }
                    />
                  );
                } else {
                  return (
                    <CalendarItem
                      key={dayIndex}
                      value={day.date.day.toString()}
                      isToday={day.isToday}
                      ref={day.isToday ? todayRef : null}
                      onClick={() => handleClick(day)}
                      className={
                        day.isToday ? "calendar__item today" : "calendar__item"
                      }
                    />
                  );
                }
              })}
            </div>
          ))}
        </div>
        <button className="pink" onClick={() => handleScroll("right")}>
          &#9656;
        </button>
      </div>
    );
  }
}

const CalendarItem = React.forwardRef<
  HTMLDivElement,
  { value: string; isToday: boolean; onClick; className: string }
>(({ value, isToday, onClick, className }, ref) => (
  <div className="calitem__wrapper">
    <div className={className} ref={ref} onClick={onClick}>
      {value}
    </div>
    <h3 className={isToday ? "showToday" : "hidden"}>today!</h3>
  </div>
));

export default observer(ScrollCalendar);
