import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations } from "../utils/api";

function Search() {
  const history = useHistory();
  const [mobile_number, setMobile_number] = useState("");
  const [reservations, setReservations] = useState([]);
  const handleChange = (event) => {
    setMobile_number(event.target.value);
  };
  const handleFind = async () => {
    history.push(`/search?mobile_number=${mobile_number}`);
    const cleanNumber = mobile_number.split("-").join("");
    listReservations({ mobile_number: cleanNumber }).then(setReservations);
  };

  return (
    <div>
      <h1>Search for a phone number</h1>
      <form className="mt-5">
        <div className="form-group">
          <label htmlFor="mobile_number">
            <b>Phone Number:</b>
          </label>
          <input
            type="text"
            className="form-control"
            name="mobile_number"
            id="mobile_number"
            onChange={handleChange}
            value={mobile_number}
            placeholder="Enter a customer's phone number"
          />
        </div>
      </form>
      <button type="submit" className="btn btn-primary" onClick={handleFind}>
        Find
      </button>
      <hr></hr>
      {reservations.length > 0 ? (
        <div>
          <h1>Found Reservations</h1>
          {reservations.map((reservation, index) => {
            const {
              reservation_id,
              first_name,
              last_name,
              mobile_number,
              reservation_time,
              people,
              status,
            } = reservation;
            return (
              <div className="card my-3" key={index}>
                <div className="card-header">
                  <b>Name:</b> {first_name} {last_name}
                </div>
                <div className="card-body">
                  <p className="card-title">
                    <b>Mobile Number:</b> {mobile_number}
                  </p>
                  <p className="card-text">
                    <b>Time:</b> {reservation_time}
                  </p>
                  <p className="card-text">
                    <b>People:</b> {people}
                  </p>
                  <p
                    className="card-text"
                    data-reservation-id-status={reservation_id}
                  >
                    <b>Status:</b> {status}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h1>No reservations found</h1>
      )}
    </div>
  );
}

export default Search;
