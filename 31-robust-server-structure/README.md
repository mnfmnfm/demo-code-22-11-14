# Lecture Topics

## Jan 25 Afternoon Lecture

- Hello!
- Any review topics from morning?
  - Order matters?
    - Express reads in order what routes it should execute, so it'll do whatever you added first
    - app.use(1) will run before app.use(2)
    - app.get matches exact paths, but app.use will also run subpaths that match
      - i.e. app.use('/pastes') will also run on the path '/pastes/:id'
- Testing
  - Basics of Supertest
  - Installing Supertest, requiring in our app, etc
  - Setting up data for our tests
  - Making requests & asserting things about the responses

## Jan 25 Morning Lecture

- Hello! A couple of new tools I'm using
- Review topics?
- REST and CRUD
  - overview
  - The Table
- Building an app
  - You will have to help me build the app - be ready with ideas, suggestions, questions
  - BIRDS
