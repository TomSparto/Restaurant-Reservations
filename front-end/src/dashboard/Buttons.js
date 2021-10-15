import React from "react";
import { Link } from "react-router-dom";
import { previous, next, today } from "../utils/date-time";

function Buttons({ date }) {
  return (
    <div>
      <Link to={`/dashboard?date=${previous(date)}`}>
        <button type="button" className="btn btn-secondary mr-3">
          Previous Day
        </button>
      </Link>
      <Link to={`/dashboard?date=${today()}`}>
        <button type="button" className="btn btn-primary">
          Today
        </button>
      </Link>
      <Link to={`/dashboard?date=${next(date)}`}>
        <button type="button" className="btn btn-secondary mx-3">
          Next Day
        </button>
      </Link>
    </div>
  );
}

export default Buttons;
