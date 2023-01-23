// for the port, either use whatever process.env says, or if there isn't one, use port 5000
const { PORT = 5000 } = process.env;
// pull in the app file - this is where most of our code lives
const app = require("./app");

// defining a function that will console.log the port
const listener = () => console.log(`Listening on Port ${PORT}!`);
// setting up our server to listen on that port, and console.log when it's ready
app.listen(PORT, listener);
