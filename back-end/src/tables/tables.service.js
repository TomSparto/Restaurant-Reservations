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

module.exports = { read, create };
