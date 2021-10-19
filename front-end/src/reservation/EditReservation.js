import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

function EditReservation() {
  const { reservation_id } = useParams();
  const [reservation, setReservation] = useState({});
  const [readError, setReadError] = useState(null);
  useEffect(getReservation, [reservation_id]);
  function getReservation() {
    const abortController = new AbortController();
    setReadError(null);
    readReservation(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setReadError);
    return () => abortController.abort();
  }
  return (
    <div>
      <h1 className="d-flex justify-content-center my-3">
        Edit Existing Reservation
      </h1>
      <ErrorAlert error={readError} />
      <hr></hr>
      <ReservationForm reservation={reservation} />
    </div>
  );
}

export default EditReservation;
