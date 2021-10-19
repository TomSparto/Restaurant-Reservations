import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readReservation, listTables, updateTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function SeatReservation() {
  const history = useHistory();
  const { reservation_id } = useParams();
  const [readError, setReadError] = useState(null);
  const [reservation, setReservation] = useState({});
  const [tables, setTables] = useState([]);
  const [tableError, setTableError] = useState(null);
  const [formData, setFormData] = useState("");
  const [updateError, setUpdateError] = useState(null);
  const { first_name, last_name, people } = reservation;

  const handleSelect = (event) => {
    setFormData(event.target.value);
  };

  useEffect(getReservation, [reservation_id]);
  useEffect(getTables, []);

  function getReservation() {
    const abortController = new AbortController();
    setReadError(null);
    readReservation(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setReadError);
    return () => abortController.abort();
  }

  function getTables() {
    const abortController = new AbortController();
    setTableError(null);
    listTables(abortController.signal).then(setTables).catch(setTableError);
    return () => abortController.abort();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const tableName = formData.split("-")[0].trim();
    const table_id = tables.find(
      (table) => table.table_name === tableName
    ).table_id;
    const tableBody = { data: { reservation_id } };
    try {
      await updateTable(tableBody, table_id);
      setFormData("");
      history.goBack();
    } catch (error) {
      setUpdateError(error);
    }
  };

  return (
    <div>
      <h1>Select a table to seat this reservation</h1>
      <h3 className="my-3">
        {first_name} {last_name} party of {people}
      </h3>
      <ErrorAlert error={readError} />
      <ErrorAlert error={tableError} />
      <form className="my-5">
        <label htmlFor="table_id">
          <b>Table:</b>
        </label>
        <select
          name="table_id"
          id="table_id"
          className="mx-3"
          onChange={handleSelect}
          value={formData}
        >
          <option value="">Select a table</option>
          {tables.map((table) => {
            const { table_id, table_name, capacity } = table;
            return (
              <option
                key={table_id}
                name={table_id}
                value={`${table_name} - ${capacity}`}
              >
                {table_name} - {capacity}
              </option>
            );
          })}
        </select>
        <small>table - capacity</small>
      </form>
      <ErrorAlert error={updateError} />
      <div className="my-3">
        <button
          type="submit"
          className="btn btn-primary mr-3"
          onClick={handleSubmit}
          disabled={formData === "" ? true : false}
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

export default SeatReservation;
