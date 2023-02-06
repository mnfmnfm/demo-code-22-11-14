const {
    getAllArticles,
    createArticle,
    destroyArticle,
    updateArticle,
    readArticle
} = require("./article.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

// try {
//     async function list(req, res, _next) {
//         let articleList = await getAllArticles();
//         res.json({articleList})
//     },
//     async function list(req, res, _next) {
//         let articleList = await getAllArticles();
//         res.json({articleList})
//     },
//     async function list(req, res, _next) {
//         let articleList = await getAllArticles();
//         res.json({articleList})
//     },
//     async function list(req, res, _next) {
//         let articleList = await getAllArticles();
//         res.json({articleList})
//     }
// } catch (error) {
//     next(error)
// }

// const wrappedList = asyncErrorBoundary(list)

async function list(req, res, _next) {
    let articleList = await getAllArticles();
    res.json({articleList})
}

async function create(req, res, _next) {

    let data = await createArticle(req.body);
    res.json({data})
}

async function destroy(req, res, _next) {
    const data = await destroyArticle(req.params.articleId);
    res.json({ data });
}

async function update(req, res, next) {
    const data = await updateArticle(req.params.articleId, req.body);
    res.json({ data });
}

async function read(req, res, next) {
    const { articleId } = req.params;
    const data = await readArticle(articleId);
    res.json({ data });
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: asyncErrorBoundary(create),
    read: asyncErrorBoundary(read),
    update: asyncErrorBoundary(update),
    destroy: asyncErrorBoundary(destroy)
}