import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./HomePage.css";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import ScrollCalendar from "../../components/ScrollCalendar/ScrollCalendar";
import NavBar from "../../components/NavBar";
import { observer } from "mobx-react-lite";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Context } from "../../main";
import Modal from "../../components/Modal";
import { getEightMonths } from "../../calendarLogic/getEightMonths";
import { countPhases } from "../../cycleLogic/countPhases";
import {
  getDatesBetween,
  getDatesBetweenExceptLast,
} from "../../calendarLogic/getDatesBetween";
import { deepEqual } from "../../cycleLogic/deepEqual";

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

function HomePage() {
  const [visibleModal, setVisibleModal] = useState(false);
  const { store } = useContext(Context);

  const eightMonths = getEightMonths();
  const today = eightMonths.flatMap((month) =>
    month.days.filter((item) => item.isToday === true)
  );

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  const [pickedDate, setPickedDate] = useState(today[0].date.c.day);
  const [pickedMonth, setPickedMonth] = useState(
    englishMonthNames[today[0].date.c.month - 1]
  );

  const [phases, setPhases] = useState<any>();
  const [menstrualPhase, setMenstrualPhase] = useState<any>(["", "", "", ""]);
  const [follicularPhase, setFollicularPhase] = useState<any>(["", "", "", ""]);
  const [ovulatoryPhase, setOvulatoryPhase] = useState<any>(["", "", "", ""]);
  const [luteralPhase, setLuteralPhase] = useState<any>(["", "", "", ""]);

  const makePhaseArray = (
    fullArray: Array<Date>,
    setPhase: Dispatch<SetStateAction<any>>
  ) => {
    setPhase([
      fullArray[0].getDate(),
      englishMonthNames[fullArray[0].getMonth()].slice(0, 3),
      fullArray[fullArray.length - 1].getDate(),
      englishMonthNames[fullArray[fullArray.length - 1].getMonth()].slice(0, 3),
    ]);
  };
  //0 - 1st date, 1 - 1st month, 2 - 2nd date, 3 - 2nd month

  useEffect(() => {
    if (phases) {
      makePhaseArray(phases.menstrual, setMenstrualPhase);
      makePhaseArray(phases.follicular, setFollicularPhase);
      makePhaseArray(phases.ovulation, setOvulatoryPhase);
      makePhaseArray(phases.luteral, setLuteralPhase);
    }
  }, [phases]);

  const nextPredictedPeriod = () => {
    //get the most recent period from period dates
    if (store.user.periodDates && store.user.periodDates.length > 0) {
      // [[], [], []]
      const latestPeriod =
        store.user.periodDates[store.user.periodDates.length - 1]; //[];
      if (latestPeriod && latestPeriod.length > 0) {
        const firstDateOfLatestPeriod = new Date(latestPeriod[0]); //Date
        //get average cycle length
        if (store.user.cycleLength && store.user.cycleLength.average) {
          const cycleLength = store.user.cycleLength.average;
          //count the length from the first day of our period to the first day of predicted
          const predictedStart = new Date(firstDateOfLatestPeriod);
          predictedStart.setDate(
            firstDateOfLatestPeriod.getDate() + cycleLength
          );
          //make it average period length
          if (store.user.periodLength && store.user.periodLength.average) {
            const periodLength = store.user.periodLength.average;
            const predictedEnd = new Date(predictedStart);
            predictedEnd.setDate(predictedStart.getDate() + periodLength);
            const predictedPeriodDates = getDatesBetween(
              predictedStart,
              predictedEnd
            );
            return predictedPeriodDates;
          }
        }
      }
    }
  };

  const predictedPeriodDates = nextPredictedPeriod();

  const countTheCurrentCycle = () => {
    if (predictedPeriodDates) {
      const endDate = predictedPeriodDates[0];
      if (store.user.periodDates && store.user.periodDates.length > 0) {
        const latestPeriod =
          store.user.periodDates[store.user.periodDates.length - 1];
        const startDate = new Date(latestPeriod[0]);
        const cycle = getDatesBetweenExceptLast(startDate, endDate);
        if (store.user.periodLength && store.user.periodLength.average)
          return countPhases(cycle, store.user.periodLength.average);
      }
    }
  };
  useEffect(() => {
    const cyclePhases = countTheCurrentCycle();
    if (!deepEqual(cyclePhases, phases)) {
      setPhases(cyclePhases);
    }
  }, [predictedPeriodDates, store.user.periodDates]);
  
  if (store.isAuth) {
    return (
      <div className="container">
        <NavBar />
        <div className="mainpart">
          <h1 className="title">
            Hi <span className="pink">{store.user.name}!</span>
          </h1>
          <h1 className="heart__text">
            {pickedDate}
            <span className="th">th</span>
          </h1>
          <FontAwesomeIcon
            icon={solidHeart}
            style={{ width: 300, height: 300, color: "#d56694" }}
          />
          <p className="hearttext__month">{pickedMonth}</p>
          <button className="log__button" onClick={() => setVisibleModal(true)}>
            log period
          </button>
          <h3 className="heart__text-bottom"></h3>
          <ScrollCalendar
            setPickedDate={setPickedDate}
            setPickedMonth={setPickedMonth}
            predictedPeriodDates={predictedPeriodDates}
          />
          <Modal
            visibleModal={visibleModal}
            setVisibleModal={setVisibleModal}
          />
          <div className="phases__wrapper">
            <div className="menstrual__phase">
              <div className="phase__section">
                <div className="phase__toppart">
                  <h2 className="phase__title red">Menstrual phase</h2>
                  <p>
                    {menstrualPhase[1]}, {menstrualPhase[0]} -{" "}
                    {menstrualPhase[3]}, {menstrualPhase[2]}
                  </p>
                </div>
                <p className="phase__desc">
                  A time for self-care and introspection, marked by a need for
                  rest and renewal. Emotions may range from introspective calm
                  to physical discomfort.
                </p>
              </div>
            </div>
            <div className="menstrual__phase">
              <div className="phase__section">
                <div className="phase__toppart">
                  <h2 className="phase__title purple">Follicular phase</h2>
                  <p>
                    {follicularPhase[1]}, {follicularPhase[0]} -{" "}
                    {follicularPhase[3]}, {follicularPhase[2]}
                  </p>
                </div>
                <p className="phase__desc">
                  A surge of energy and optimism accompanies this phase,
                  fostering a sense of renewal and readiness for new
                  opportunities. Emotions may be characterized by a positive
                  outlook and increased vitality.
                </p>
              </div>
            </div>
            <div className="menstrual__phase">
              <div className="phase__section">
                <div className="phase__toppart">
                  <h2 className="phase__title pink">Ovulatory phase</h2>
                  <p>
                    {ovulatoryPhase[1]}, {ovulatoryPhase[0]} -{" "}
                    {ovulatoryPhase[3]}, {ovulatoryPhase[2]}
                  </p>
                </div>
                <p className="phase__desc">
                  Peak energy and confidence define this phase, accompanied by a
                  sense of heightened fertility. Emotions may lean towards
                  assertiveness and a positive, radiant mood.
                </p>
              </div>
            </div>
            <div className="menstrual__phase">
              <div className="phase__section">
                <div className="phase__toppart">
                  <h2 className="phase__title peach">Luteral phase</h2>
                  <p>
                    {luteralPhase[1]}, {luteralPhase[0]} - {luteralPhase[3]},{" "}
                    {luteralPhase[2]}
                  </p>
                </div>
                <p className="phase__desc">
                  A mix of emotions unfolds during this phase, including nesting
                  instincts, introspection, and potential mood swings. As the
                  body prepares for menstruation, emotions may fluctuate,
                  ranging from reflective to more introspective states.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    <h1>not authorized</h1>;
  }
}

export default observer(HomePage);
