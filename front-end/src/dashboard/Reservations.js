import React from "react";

function Reservations({ reservations }) {
  return reservations.map((reservation) => {
    const { first_name, last_name, mobile_number, reservation_time, people } =
      reservation;
    return (
      <div class="card my-3">
        <div class="card-header">
          <b>Name:</b> {first_name} {last_name}
        </div>
        <div class="card-body">
          <p class="card-title">
            <b>Mobile Number:</b> {mobile_number}
          </p>
          <p class="card-text">
            <b>Time:</b> {reservation_time}
          </p>
          <p class="card-text">
            <b>People:</b> {people}
          </p>
        </div>
      </div>
    );
  });
}

export default Reservations;
