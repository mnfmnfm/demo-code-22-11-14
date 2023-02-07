/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const suppliers = require("../fixtures/suppliers"); // load in the data

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE suppliers RESTART IDENTITY CASCADE")
    .then(function () {
      return knex("suppliers").insert(suppliers); // insert the data into DB
    });
};
