const productRouter = require("express").Router();
const controller = require("./products.controller");

// products
productRouter.route("/").get(controller.list);

// custom routes
productRouter.route("/out-of-stock-count").get(controller.listOutOfStockCount);
productRouter.route("/price-summary").get(controller.listPriceSummary);

// params route
productRouter.route("/:product_id").get(controller.read);

module.exports = productRouter;
