import React from "react";
import ReservationForm from "./ReservationForm";

function NewReservation({ setDate }) {
  return (
    <div>
      <h1>Create a new reservation</h1>
      <ReservationForm setDate={setDate} />
    </div>
  );
}

export default NewReservation;
