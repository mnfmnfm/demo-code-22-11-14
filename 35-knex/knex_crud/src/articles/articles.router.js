const articleRouter = require("express").Router();
const { list, create, read, update, destroy } = require("./articles.controller");

//create endpoints for when we reach /articles
articleRouter.route("/").get(list).post(create)
articleRouter.route("/:articleId").get(read).put(update).delete(destroy)

// .route allows us to skip writing each http verb endpoint
// router.get('/', (req, res) => {
//     res.send('Birds home page')
// })

// router.post('/', (req, res) => {
//     res.send('Birds home page')
// })

// router.get('/:id', (req, res) => {
//     res.send('Birds home page')
// })

// router.put('/:id', (req, res) => {
//     res.send('Birds home page')
// })

// router.delete('/:id', (req, res) => {
//     res.send('Birds home page')
// })

module.exports = articleRouter