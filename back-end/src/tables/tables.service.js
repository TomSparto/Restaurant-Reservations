const knex = require("../db/connection");

function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

function create(data) {
  const { table_name, capacity } = data;
  if (data.reservation_id) {
    return knex("tables")
      .insert({
        table_name,
        capacity,
        reservation_id: data.reservation_id,
        status: "occupied",
      })
      .returning("*")
      .then((rows) => rows[0]);
  }
  return knex("tables")
    .insert({
      table_name,
      capacity,
    })
    .returning("*")
    .then((rows) => rows[0]);
}

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function update(data, table) {
  const { reservation_id } = data;
  const { table_id } = table;
  return knex("tables")
    .where({ table_id })
    .update({ reservation_id, status: "occupied" })
    .returning("*")
    .then((rows) => rows[0]);
}

function finishTable(table) {
  const { table_id } = table;
  return knex("tables")
    .where({ table_id })
    .update({ reservation_id: null, status: "free" })
    .returning("*")
    .then((rows) => rows[0]);
}

module.exports = { read, create, list, update, finishTable };
