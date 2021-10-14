const knex = require("../db/connection");

function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

function create(data) {
  const { table_name, capacity } = data;
  return knex("tables").insert({
    table_name,
    capacity,
  });
}

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

module.exports = { read, create, list };
