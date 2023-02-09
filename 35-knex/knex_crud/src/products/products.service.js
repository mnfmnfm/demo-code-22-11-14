const knex = require("../db/connection");
const mapProperties = require("../utils/mapProperties");

// configuration object
// {
//   "supplier.name": "Dennis",
//   "supplier.address": "123 north pole"
// }

// addSupplier is a function with the config object passed in
const addSupplier = mapProperties({
  supplier_id: "supplier.supplier_id",
  supplier_name: "supplier.supplier_name",
  supplier_city: "supplier.supplier_city",
  supplier_state: "supplier.supplier_state",
  
});

function list() {
  // SELECT * FROM products;
  return knex("products").select("*");
}

function listOutOfStockCount() {
  // counts the number of products that have a quantity of 0

  // SELECT product_quanity_in_stock as out_of_stock, COUNT(product_id)
  // FROM products
  // WHERE out_of_stock = 0
  // GROUPBY out_of_stock

  return knex("products")
    .select("product_quantity_in_stock as out_of_stock")
    .count("product_id")
    .where({ product_quantity_in_stock: 0 })
    .groupBy("out_of_stock");
}

function listPriceSummary() {
  // provides the min, max, and average product prices for each supplier

  // SELECT supplier_id, MIN(product_price), MAX(product_price), AVG(product_price)
  // FROM products
  // GROUP BY supplier_id

  return knex("products")
    .select("supplier_id")
    .min("product_price")
    .max("product_price")
    .avg("product_price")
    .groupBy("supplier_id")

}

function read(product_id) {
    //join product and suppliers where product is matching the given id

    // SELECT *
    // FROM products AS p
    // JOIN suppliers AS s
    // ON s.supplier_id = p.supplier_id
    // WHERE product_id = ${product_id}

    return knex("products as p")
      .select("*")
      .join("suppliers as s", "s.supplier_id", "p.supplier_id")
      .where({product_id})
      .first() // get the first record
      .then(addSupplier)
}

module.exports = {
  list,
  listOutOfStockCount,
  listPriceSummary,
  read,
};