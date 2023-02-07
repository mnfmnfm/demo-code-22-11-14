const productsService = require("./products.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const data = await productsService.list();
  res.json({ data });
}

async function read(req, res, next) {
  const { product_id } = req.params;

  const data = await productsService.read(product_id);
  res.json({ data });
}

async function listOutOfStockCount(req, res, next) {
  const data = await productsService.listOutOfStockCount();
  // format the response from the service before responding
  // convert the count from "string" to "number"
  const newData = data.map((row) => ({ ...row, count: Number(row.count) }));
  res.json({ data: newData });
}

async function listPriceSummary(req, res, next) {
  const data = await productsService.listPriceSummary();
  // perform data formatting as neccessary
  // Math.round()
  // convert strings to numbers
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: asyncErrorBoundary(read),
  listOutOfStockCount: asyncErrorBoundary(listOutOfStockCount),
  listPriceSummary: asyncErrorBoundary(listPriceSummary),
};
