import { useContext, useEffect, useState } from "react";
import "./QuestionsPage.css";
import NumberPicker from "../../components/NumberPicker";
import DatePickerComp from "../../components/DatePickerComp";
import { Link } from "react-router-dom";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";
import { getDatesBetween } from "../../calendarLogic/getDatesBetween";


function QuestionsPage() {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  const [periodLength, setPeriodLength] = useState(5);
  const [cycleLength, setCycleLength] = useState(28);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const periodLengthForDb = {average: periodLength, times: 10}
  const cycleLengthForDb = {average: cycleLength, times: 10}

  const handleClick = () => {
    store.updateUserPeriodLength(periodLengthForDb, store.user.id)
    store.updateUserCycleLength(cycleLengthForDb, store.user.id)
    store.updateUserPeriodDates(getDatesBetween(startDate, endDate), store.user.id)
  }

  if (store.isLoading) {
    return <div className="container__centered title">Loading...</div>
  }
  
  if (store.isAuth) {
    return (
      <div className="container__centered">
        <div className="question__section">
          <h1 className="title">What are the dates of your last period?</h1>
          <div className="daterange">
            <DatePickerComp
              dateSelected={startDate}
              setDate={setStartDate}
              label="Start Date:"
            />
            <DatePickerComp
              dateSelected={endDate}
              setDate={setEndDate}
              label="End Date:"
            />
          </div>
        </div>
        <div className="question__section">
          <h1 className="title">
            How many days does your period usually last?
          </h1>
          <NumberPicker
            number={periodLength}
            setNumber={setPeriodLength}
            range={{ min: 3, max: 7 }}
          />
        </div>
        <div className="question__section">
          <h1 className="title">
            What is the average length of your menstrual cycle?
          </h1>
          <NumberPicker
            number={cycleLength}
            setNumber={setCycleLength}
            range={{ min: 21, max: 35 }}
          />
        </div>
        <Link to={"/"}>
        <button className="btn__questionspage" onClick={handleClick}>Submit</button>
        </Link>
      </div>
    );
  } else {
    return <div className="container__centered title">Loading...</div>;
  }
}

export default observer(QuestionsPage);
