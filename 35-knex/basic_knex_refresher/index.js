const knex = require("knex");

const db_connection = knex({
    //client driver library
    client: "pg",
    //connection to your db
    connection: "postgres://qofmdqts:ZN3zMWucaYQPvhyahZ1f_eg-uREx6hKv@otto.db.elephantsql.com/qofmdqts"
});

db_connection
    .select("*")
    .from("articles")
    .then( (articleArr) => console.log(articleArr))
    .catch( (err) => console.log(err))
    .finally( () => db_connection.destroy())