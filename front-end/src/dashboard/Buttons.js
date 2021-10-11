import React from "react";
import { previous, next, today } from "../utils/date-time";

function Buttons({ date, setDate }) {
  const todayHandler = () => {
    setDate(today());
  };

  const nextHandler = (date) => {
    setDate(next(date));
  };

  const previousHandler = (date) => {
    setDate(previous(date));
  };

  return (
    <div>
      <button
        type="button"
        class="btn btn-secondary mr-3"
        onClick={() => previousHandler(date)}
      >
        Previous Day
      </button>
      <button type="button" class="btn btn-primary" onClick={todayHandler}>
        Today
      </button>
      <button
        type="button"
        class="btn btn-secondary mx-3"
        onClick={() => nextHandler(date)}
      >
        Next Day
      </button>
    </div>
  );
}

export default Buttons;
