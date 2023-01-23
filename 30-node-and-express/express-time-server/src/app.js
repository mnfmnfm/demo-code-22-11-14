// pull in the express dependency
const express = require("express");
// actually set up an express app
const app = express();

// use morgan to log all requests
const morgan = require("morgan");
app.use(morgan("dev"));

// where the magic will happen... soon

// when a request comes to /current-time
app.get('/current-time', (req, res, next) => {
    // log and send the time
    console.log('got a request for the current time');
    let currentDate = new Date();
    res.send(currentDate.toString());
});

app.get('/welcome', (req, res, next) => {
    res.send('Welcome to the site!');
})

app.get('/', (req, res, next) => {
    res.send('This is the root.');
})

// export the app so server.js can have it
module.exports = app;
