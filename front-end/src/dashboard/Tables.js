import React from "react";

function Tables({ tables }) {
  return tables.map((table, index) => {
    const { table_name, capacity, status } = table;
    return (
      <div className="card my-3" key={index}>
        <div className="card-header">
          <b>Table:</b> {table_name}
        </div>
        <div className="card-body">
          <p className="card-text">
            <b>Capacity:</b> {capacity}
          </p>
          <p className="card-text" data-table-id-status={table.table_id}>
            <b>Status:</b> {status}
          </p>
        </div>
      </div>
    );
  });
}

export default Tables;
