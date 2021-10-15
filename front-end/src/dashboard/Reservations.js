import React from "react";
import { Link } from "react-router-dom";

function Reservations({ reservations }) {
  return reservations.map((reservation, index) => {
    const {
      reservation_id,
      first_name,
      last_name,
      mobile_number,
      reservation_time,
      people,
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
          <Link
            to={`/reservations/${reservation_id}/seat`}
            className="btn btn-primary"
          >
            Seat
          </Link>
        </div>
      </div>
    );
  });
}

export default Reservations;
