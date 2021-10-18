const knex = require("../db/connection");

function list(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .orderBy("reservation_time");
}

function read(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

function create(data) {
  const {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  } = data;
  return knex("reservations")
    .insert({
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people,
    })
    .returning("*")
    .then((rows) => rows[0]);
}

function update({ status }, { reservation_id }) {
  if (status === "booked") {
    return knex("reservations")
      .where({ reservation_id })
      .update({ status: "booked" })
      .returning("*")
      .then((rows) => rows[0]);
  }
  if (status === "seated") {
    return knex("reservations")
      .where({ reservation_id })
      .update({ status: "seated" })
      .returning("*")
      .then((rows) => rows[0]);
  }
  if (status === "finished") {
    return knex("reservations")
      .where({ reservation_id })
      .update({ status: "finished" })
      .returning("*")
      .then((rows) => rows[0]);
  }
}

module.exports = { list, read, create, update };
