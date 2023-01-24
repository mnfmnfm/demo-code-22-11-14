const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));

// application code goes here
app.get('/', (req, res, next) => {
  res.send('You found the root.');
});

// 404 handler
app.use((req, res, next) => {
  next({
    status: 404,
    message: `The route ${req.url} does not exist.`
  });
})

// error handler
app.use((error, req, res, next) => {
  res.status(error.status).send(error.message);
})

module.exports = app;
