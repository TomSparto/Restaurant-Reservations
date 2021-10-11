import React from "react";

function Reservations({ reservations }) {
  return reservations.map((reservation, index) => {
    const { first_name, last_name, mobile_number, reservation_time, people } =
      reservation;
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
        </div>
      </div>
    );
  });
}

export default Reservations;
