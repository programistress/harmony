import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NumberPicker({ number, setNumber, range }) {
  const incrementNumber = () => {
    setNumber((prevNumber) => Math.min(range.max, prevNumber + 1));
  };

  const decrementNumber = () => {
    setNumber((prevNumber) => Math.max(range.min, prevNumber - 1));
  };

  return (
    <div className="numberpicker">
      <button className="pink numberpicker__btn" onClick={decrementNumber}>
      <FontAwesomeIcon icon={faCaretLeft} style={{
                width: 20,
                height: 20,
              }}/>
      </button>
      <p className="center">
        {number === range.max
          ? number + " or more"
          : number <= range.min
          ? number + " or less"
          : number}
      </p>
      <button className="pink numberpicker__btn" onClick={incrementNumber}>
      <FontAwesomeIcon icon={faCaretRight} style={{
                width: 20,
                height: 20,
              }}/>
      </button>
    </div>
  );
}

export default NumberPicker;
