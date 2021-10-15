import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationForm() {
  const history = useHistory();

  const [createError, setCreateError] = useState(null);
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    formData.people = parseInt(formData.people);
    try {
      await createReservation(formData);
      setFormData({ ...initialFormState });
      history.push(`/dashboard?date=${formData.reservation_date}`);
    } catch (error) {
      setCreateError(error);
    }
  };

  return (
    <div>
      <form>
        <div className="row my-3">
          <div className="col">
            <label htmlFor="first_name">
              <b>First Name:</b>
            </label>
            <input
              name="first_name"
              id="first_name"
              type="text"
              className="form-control"
              onChange={handleChange}
              value={formData.first_name}
              required
            />
          </div>
          <div className="col">
            <label htmlFor="last_name">
              <b>Last Name:</b>
            </label>
            <input
              name="last_name"
              id="last_name"
              type="text"
              className="form-control"
              onChange={handleChange}
              value={formData.last_name}
              required
            />
          </div>
          <div className="col">
            <label htmlFor="mobile_number">
              <b>Mobile Number:</b>
            </label>
            <small className="float-right">
              Format: 123-456-7890 or 123-4567
            </small>
            <input
              name="mobile_number"
              id="mobile_number"
              type="tel"
              className="form-control"
              onChange={handleChange}
              value={formData.mobile_number}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="reservation_date">
              <b>Reservation Date:</b>
            </label>
            <input
              name="reservation_date"
              id="reservation_date"
              type="date"
              className="form-control"
              onChange={handleChange}
              value={formData.reservation_date}
              required
            />
          </div>
          <div className="col">
            <label htmlFor="reservation_time">
              <b>Reservation Time:</b>
            </label>
            <input
              name="reservation_time"
              id="reservation_time"
              type="time"
              className="form-control"
              onChange={handleChange}
              value={formData.reservation_time}
              required
            />
          </div>
          <div className="col">
            <label htmlFor="people">
              <b>Party of How Many:</b>
            </label>
            <input
              name="people"
              id="people"
              type="number"
              className="form-control"
              onChange={handleChange}
              value={formData.people}
              required
            />
          </div>
        </div>
      </form>
      <ErrorAlert error={createError} />
      <div className="my-3">
        <button
          type="submit"
          className="btn btn-primary mr-3"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => history.goBack()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ReservationForm;
