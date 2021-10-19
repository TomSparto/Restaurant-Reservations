import React from "react";
import { Link } from "react-router-dom";
import { previous, next, today } from "../utils/date-time";

/**
 * Defines the buttons on the dashboard the change the date.
 * @param date
 *  the date for the currently viewed page.
 * @returns {JSX.Element}
 */
function Buttons({ date }) {
  return (
    <div className="d-flex justify-content-center">
      <Link to={`/dashboard?date=${previous(date)}`}>
        <button type="button" className="btn btn-secondary mr-3">
          Previous
        </button>
      </Link>
      <Link to={`/dashboard?date=${today()}`}>
        <button type="button" className="btn btn-primary">
          Today
        </button>
      </Link>
      <Link to={`/dashboard?date=${next(date)}`}>
        <button type="button" className="btn btn-secondary mx-3">
          Next
        </button>
      </Link>
    </div>
  );
}

export default Buttons;
