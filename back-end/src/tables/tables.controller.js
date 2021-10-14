const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { json } = require("express");

async function tableExists(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(table_id);
  if (!table) {
    return next({
      status: 404,
      message: `Table with id does not exist: ${table_id}`,
    });
  }
  res.locals.table = table;
  next();
}

function read(req, res) {
  const data = res.locals.table;
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

function validateName(req, res, next) {
  const { table_name } = res.locals.data;
  if (!table_name) {
    return next({
      status: 400,
      message: "table_name is missing or empty",
    });
  }
  if (table_name.length < 2) {
    return next({
      status: 400,
      message: "table_name has to be more than one character",
    });
  }
  next();
}

function validateCapacity(req, res, next) {
  const { capacity } = res.locals.data;
  if (!capacity) {
    return next({
      status: 400,
      message: "capacity is missing or empty and it cannot be zero",
    });
  }
  if (typeof capacity !== "number") {
    return next({
      status: 400,
      message: "capacity has to be a number",
    });
  }
  next();
}

async function create(req, res) {
  const data = await service.create(res.locals.data);
  res.status(201).json({ data: res.locals.data });
}

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

module.exports = {
  read: [asyncErrorBoundary(tableExists), read],
  create: [
    validateData,
    validateName,
    validateCapacity,
    asyncErrorBoundary(create),
  ],
  list: asyncErrorBoundary(list),
};
