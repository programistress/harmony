import './CalendarPage.css'
import { getEightMonths } from "../../calendarLogic/getEightMonths";
import { getDaysInMonthsSplitByWeeks } from "../../calendarLogic/getDaysInMonthsSplitByWeeks";
import NavBar from '../../components/NavBar';

function CalendarPage() {
  const eightMonths = getEightMonths();
  const splitByWeeks = getDaysInMonthsSplitByWeeks(eightMonths)
  return (
    <div className='container'>
      <NavBar />
      <div className='calendar'>
      {splitByWeeks.map(month => (
        <div className='month__div'>
          <h1 className='month_title'>{month.monthName}</h1>
          <ul className='day__names'>
            <li>M</li>
            <li>T</li>
            <li>W</li>
            <li>T</li>
            <li>F</li>
            <li>S</li>
            <li>S</li>
          </ul>
          {month.weeks.map(week => (
            <div className='week_line'>
              {week.map(day => (
                <div className={day.isToday ? 'calendar__day-today' : 'calendar__day'}>{day.date.c.day}</div>
              ))}
            </div>
          ))}
        </div>
      ))}
      </div>
    </div>
  )
}

export default CalendarPage