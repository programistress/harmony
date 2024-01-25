import React from "react";

function NumberPicker({ number, setNumber, range }) {
  const incrementNumber = () => {
    setNumber((prevNumber) => Math.min(range.max, prevNumber + 1));
  };

  const decrementNumber = () => {
    setNumber((prevNumber) => Math.max(range.min, prevNumber - 1));
  };

  return (
    <div className="numberpicker">
      <button className="pink" onClick={decrementNumber}>
        &#9666;
      </button>
      <p className="center">
        {number === range.max
          ? number + " or more"
          : number <= range.min
          ? number + " or less"
          : number}
      </p>
      <button className="pink" onClick={incrementNumber}>
        &#9656;
      </button>
    </div>
  );
}

export default NumberPicker;
