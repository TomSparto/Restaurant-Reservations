const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

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

module.exports = {
  read: [asyncErrorBoundary(tableExists), read],
  create: [validateData],
};
