const knex = require("../db/connection");
const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
/**
 * List handler for reservation resources
 */

// This is a test
const VALID = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

async function list(req, res) {
  const data = await service.list(req.query.date);
  res.json({ data });
}

async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;
  const reservation = await service.read(reservation_id);
  if (reservation.length === 0) {
    return next({
      status: 404,
      message: `Reservation with id does not exist: ${reservation_id}`,
    });
  }
  res.locals.reservation = reservation;
  next();
}

function read(req, res) {
  const data = res.locals.reservation;
  res.json({ data });
}

function validateData(req, res, next) {
  const { data } = req.body;
  if (!data) {
    return next({
      status: 400,
      message: "Body is missing the data property.",
    });
  }
  res.locals.data = data;

  next();
}

function validateProperties(req, res, next) {
  const { data } = res.locals;
  VALID.forEach((property) => {
    if (!data[property] || data[property] === "") {
      next({
        status: 400,
        message: `The '${property}' property is missing or empty`,
      });
    }
  });

  next();
}

function validateDate(req, res, next) {
  const { reservation_date } = res.locals.data;
  if (!/^\d{4}\-\d{2}\-\d{2}$/.test(reservation_date)) {
    next({
      status: 400,
      message: "reservation_date needs to look like 'YYYY-MM-DD'",
    });
  }

  next();
}

function validateTime(req, res, next) {
  const { reservation_time } = res.locals.data;
  if (!/^\d{2}\:\d{2}/.test(reservation_time)) {
    next({
      status: 400,
      message: "reservation_time needs to look like 'HH:MM'",
    });
  }
  next();
}

function validatePeople(req, res, next) {
  const { people } = res.locals.data;
  if (typeof people !== "number") {
    next({
      status: 400,
      message: "people has to be a number",
    });
  }
  if (people === 0) {
    next({
      status: 400,
      message: "people cannot equal 0",
    });
  }
  next();
}

async function create(req, res) {
  const data = await service.create(res.locals.data);
  res.status(201).json({ data: res.locals.data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reservationExists), read],
  create: [
    validateData,
    validateProperties,
    validateDate,
    validateTime,
    validatePeople,
    asyncErrorBoundary(create),
  ],
};
