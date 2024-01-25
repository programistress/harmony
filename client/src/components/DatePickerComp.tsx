import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  dateSelected: Date;
  setDate: (date: Date) => void;
  label?: string;
}

const DatePickerComp: React.FC<Props> = (props) => {
  const CustomInput = React.forwardRef<HTMLButtonElement, { value: string; onClick: () => void }>(
    ({ value, onClick }, ref) => (
      <button onClick={onClick} className="date_picker" ref={ref}>
        {value}
      </button>
    )
  );

  return (
    <div className="daterange__item">
      <label>{props.label}</label>
      <DatePicker
        selected={props.dateSelected}
        onChange={(date) => props.setDate(date as Date)}
        customInput={<CustomInput />}
      />
    </div>
  );
};

export default DatePickerComp;