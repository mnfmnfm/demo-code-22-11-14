const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));

// set up our app to allow json data in the request body
app.use(express.json());

const {birds} = require('../data/birds');
// console.log(birds);

// application code goes here
app.get('/', (req, res, next) => {
  res.send('You found the root.');
});

// get all the birds
app.get('/birds', (req, res, next) => {
  res.json({data: birds});
})

// get one bird
app.get('/birds/:id', (req, res, next) => {
  // grab that bird out of our array of birds
  const id = parseInt(req.params.id);
  const bird = birds.find(bird => bird.id === id);
  if(!bird) {
    return next({
      status: 404,
      message: `The bird with id ${id} was not found.`
    })
  }
  console.log(bird);
  res.json({data: bird});
});

let nextId = 4;
// create a bird
app.post('/birds', (req, res, next) => {
  // grab the info we care about from the request body
  const newBird = {
    name: req.body.data.name,
    diet: req.body.data.diet,
    color: req.body.data.color,
    region: req.body.data.region
  };

  // assign an id to the bird
  newBird.id = nextId;
  // make sure the nextId is higher, for the next bird that gets posted
  nextId++;
  // add the bird into our array of birds
  birds.push(newBird);
  // send the bird data back with a 201 response code
  res.status(201).json({data: newBird});
});

app.delete('/birds/:id', (req, res, next) => {
  // find where that bird is in the birds array
  const id = parseInt(req.params.id);
  let birdIndex = -1;
  for(let i = 0; i < birds.length; i++) {
    if(birds[i].id === id) {
      birdIndex = i;
    }
  }
  if(birdIndex === -1) {
    return next({
      status: 404,
      message: `The bird with id ${id} does not exist.`
    });
  }

  // remove that element from the birds array
  birds.splice(birdIndex, 1);

  // send my 204 response
  res.status(204).send();
})

// 404 handler
app.use((req, res, next) => {
  next({
    status: 404,
    message: `The route ${req.url} does not exist.`
  });
});

// error handler
app.use((error, req, res, next) => {
  res.status(error.status).send(error.message);
});

module.exports = app;
