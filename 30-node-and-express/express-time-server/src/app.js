// pull in the express dependency
const express = require("express");
// actually set up an express app
const app = express();

// use morgan to log all requests
const morgan = require("morgan");
app.use(morgan("dev"));

// middleware: on any request, log and then do the next thing
// http methods include get, post, put, delete, patch, ...
// app.use applies to ALL of those methods
app.use((req, res, next) => {
    console.log('this is our middleware');
    next();
});

// where the magic will happen... soon

// when a request comes to /current-time
const currentTimeHandler = (req, res, next) => {
    // log and send the time
    console.log('got a request for the current time');
    let currentDate = new Date();
    res.send(currentDate.toString());
};
app.get('/current-time', currentTimeHandler);


// expecting query parameters of firstName
app.get('/welcome', (req, res, next) => {
    // req.query to access query string data
    // let firstName = req.query.firstName;
    let {firstName} = req.query;
    if (firstName && (firstName.length > 2)) {
        res.send(`Welcome to the site, ${firstName}!`);
    } else {
        // trigger error handler
        next({
            status: 400,
            //      What ? True : False
            message: firstName ? 'The firstName must be at least 3 letters long' : 'You must supply a firstName query parameter.'
        });
    }
});

app.get('/books/recent', (req, res, next) => {
    res.send('You have read 300 books recently. Nice work.');
});

app.get('/books/:coolBook', (req, res, next) => {
    // access route parameters via req.params
    let {coolBook} = req.params;
    res.send(`This Book is called ${coolBook}.`);
});

app.get('/', (req, res, next) => {
    res.send('This is the root.');
})

// listen on all of the routes, match everything
app.get('*', (req, res, next) => {
    // triger error handler by call next with an argument
    next({
        status: 404,
        message: 'That route does not exist.'
    });
})

// error handling - function takes in 4 parameters, starting with error
app.use((error, req, res, next) => {
    res.status(error.status).send(error.message);
});

// export the app so server.js can have it
module.exports = app;
