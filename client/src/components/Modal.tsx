import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import DatePickerComp from "./DatePickerComp";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Context } from "../main";
import { getDatesBetween } from "../calendarLogic/getDatesBetween";
import { observer } from "mobx-react-lite";

interface ModalProps {
  visibleModal: boolean;
  setVisibleModal: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({ visibleModal, setVisibleModal }: ModalProps) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [clickable, setClickable] = useState(true);
  const { store } = useContext(Context);

  useEffect(() => {
    if (store.user.periodDates.length > 0) {
      const jsDates = store.user.periodDates.map((row) =>
        row.map((dateString) => new Date(dateString))
      );
      const sortedDates = jsDates.sort((a, b) => a[0] - b[0]);
      store.setNewPeriodDates(sortedDates, store.user.id);
    }
  }, []);

  const onClose = () => {
    setVisibleModal(false);
  };

  useEffect(() => {
    if (startDate > endDate) {
      setClickable(false);
    } else {
      setClickable(true);
    }

    const octoberFirst = new Date(2023, 9, 1);
    if (startDate < octoberFirst || endDate < octoberFirst) {
      setClickable(false);
    } else {
      setClickable(true);
    }

    const currentDate = new Date();
    if (startDate > currentDate || endDate > currentDate) {
      setClickable(false);
    } else {
      setClickable(true);
    }
  }, [startDate, endDate]);

  const onSubmit = async () => {
    if (!clickable) {
      return;
    } else {
      await store.updateUserPeriodDates(
        getDatesBetween(startDate, endDate),
        store.user.id
      );
      setClickable(true);
      setVisibleModal(false);
      location.reload();
    }
  };

  return (
    <div className={visibleModal ? "modal-overlay" : "none"} onClick={onClose}>
      <div className="logperiod__wrapper" onClick={(e) => e.stopPropagation()}>
        <h1 className="smaller__title">Please log the dates of your periods</h1>

        <div className="flex__wrapper">
          <div className="close__icon" onClick={onClose}>
            <FontAwesomeIcon
              icon={faXmark}
              style={{
                width: 20,
                height: 20,
                color: "black",
              }}
            />
          </div>
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
        <p className="warning">{clickable ? "" : "Please input valid date"}</p>
        <div className="center__div">
          <button
            className={
              clickable ? "submit__button" : "submit__button pointerevents-none"
            }
            onClick={() => onSubmit()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default observer(Modal);
