import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function TableForm() {
  const history = useHistory();
  const initialFormState = {
    table_name: "",
    capacity: 0,
  };
  const [createError, setCreateError] = useState(null);
  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    formData.capacity = parseInt(formData.capacity);
    try {
      await createTable({ data: formData });
      setFormData({ ...initialFormState });
      history.goBack();
    } catch (error) {
      setCreateError(error);
    }
  };

  return (
    <div>
      <form>
        <div className="row my-3">
          <div className="col">
            <label htmlFor="table_name">
              <b>Table Name:</b>
            </label>
            <input
              name="table_name"
              id="table_name"
              type="text"
              className="form-control"
              onChange={handleChange}
              value={formData.table_name}
              required
            />
          </div>
          <div className="col">
            <label htmlFor="capacity">
              <b>Capacity:</b>
            </label>
            <input
              name="capacity"
              id="capacity"
              type="number"
              className="form-control"
              onChange={handleChange}
              value={formData.capacity}
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

export default TableForm;
