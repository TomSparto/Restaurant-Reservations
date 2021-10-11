import React from "react";
import Form from "./Form";

function NewReservation({ setDate }) {
  return (
    <div>
      <h1>Create a new reservation</h1>
      <Form setDate={setDate} />
    </div>
  );
}

export default NewReservation;
