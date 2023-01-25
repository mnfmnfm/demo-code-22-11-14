const request = require('supertest');
const app = require('../src/app.js');
const {birds} = require('../data/birds.js');

// YOU DO NOT WANT THIS REQUIRE
// if this shows up in your code, get rid of it (delete or comment out)
// const { beforeEach } = require('node:test');

describe('/birds', () => {
  // empty out the birds array before each test
  beforeEach(() => {
    birds.splice(0, birds.length);
  });
  it('get request sends all the birds', async () => {
    // set up the birds array with some data
    const expected = [{
      id: 17,
      name: "Blue Jay",
      color: "blue",
      region: "North America",
      diet: "seeds"
    },
    {
      id: 18,
      name: "penguin",
      color: "black and white",
      region: "south", 
      diet: "fish"
    }];
    birds.push(...expected);
    // make the request to the app
    const response = await request(app).get('/birds');
    // make sure that the response we get back matches what we expect
    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toEqual(expected);
  });
  it('get request sends an empty array when there are zero birds', async () => {
    const response = await request(app).get('/birds');
    // console.log(response);
    expect(response.statusCode).toEqual(200);
    expect(response.body.data).toEqual([]);
  });
  it('post request adds a bird to the array', async () => {
    const bird = {
      name: "Blue Jay",
      color: "blue",
      region: "North America",
      diet: "seeds"
    };
    const response = await 
      request(app)
        .post('/birds')
        .set('Accept', 'application/json') // the json thing: the same every time
        .send({data: bird}); /*send the body data*/
    expect(response.statusCode).toEqual(201);
    expect(response.body.data).toEqual({
      id: 4, // that's what I set as the first nextId in my app.js
      ...bird
    });
  })
});


