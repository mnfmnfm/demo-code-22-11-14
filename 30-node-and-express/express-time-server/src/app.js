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

// where the magic happens: the actual routes that define our server

// when a request comes to /current-time
const currentTime = (req, res, next) => {
    // log and send the time
    console.log('got a request for the current time');
    let currentDate = new Date();
    res.send(currentDate.toString());
};
app.get('/current-time', currentTime);


// expecting query parameters of firstname
app.get('/welcome', (req, res, next) => {
    // req.query to access query string data
    // let firstName = req.query.firstname;
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

app.get('/books/:myBook', (req, res, next) => {
    // access route parameters via req.params
    let {book} = req.params;
    res.send(`This book is called ${book}.`);
});

app.get('/books/recent', (req, res, next) => {
    res.send('You have read 300 books recently. Nice work.');
});

app.get('/', (req, res, next) => {
    // it's like we get to run code here & see what it does
    res.send('This is the root.');
})

// middleware to validate that the area code is real
let areaCodeValidator = (req, res, next) => {
    // destructuring is fun
    let {code} = req.params;
    // let code = req.params.code;

    // if the area code is invalid, call next({message: 'an error message'})
    // how do we know the area code is invalid?
    // too long, too short = needs to be exactly 3 chars
    if(code.length !== 3) {
        next({
            status: 400,
            message: 'Area codes must be 3 characters long.'
        });
    }
    // has to be all numbers
    else if(!/^\d+$/.test(code)) {
        next({
            status: 400,
            message: 'Area codes must be all numbers.'
        })
    }
    // has to exist in the codeToState object
    else if(!codeToState[code]) {
        next({
            status: 404,
            message: 'Area code does not exist.'
        })
    }
    // if the area code is valid, just call next()
    else {
        next();
    }
};

// pull in object from file
const {codeToState} = require('../data/areacodes.js');
// a route that takes in an area code and sends back what state that area code is from
// the colon means that that's a route parameter
app.get('/areacode/:code', areaCodeValidator, (req, res, next) => {
    // query params come from the query string, after the question mark in the URL
    // let name = req.query.name;
    const state = codeToState[req.params.code];
    res.send(`The area code ${req.params.code} comes from ${state}.`);
});



// listen on all of the routes, match everything
app.get('*', (req, res, next) => {
    // triger error handler by call next with an argument
    next({
        status: 404,
        message: 'That route does not exist.'
    });
})

// error handling - function takes in 4 parameters, starting with error
// this gets triggered whenever we call next('with an argument')
app.use((error, req, res, next) => {
    res.status(error.status).send(error.message);
});

// export the app so server.js can have it
module.exports = app;
