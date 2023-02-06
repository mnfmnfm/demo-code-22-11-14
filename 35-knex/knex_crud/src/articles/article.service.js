const db = require("../db/connection");

function getAllArticles() {
    return db("articles").select("*");
}

function createArticle(newArticle) {
    return db("articles")
      .insert(newArticle)
      .returning('*')
      .then(rows => {
        rows[0]
    })
}

function readArticle(article_id) {
    // SELECT * FROM articles WHERE article_id = ${article_id}
    return db("articles").select("*").where({ article_id });
}

function destroyArticle(article_id) {
    return db("articles")
        .where({ article_id })
        .delete();
}

function updateArticle(article_id, updatedArticle) {
    return db("articles")
        .select("*")
        .where({ article_id })
        .update(updatedArticle, "*")
        .then((updatedRecords) => updatedRecords[0]);
}
  
module.exports = {
    getAllArticles,
    createArticle,
    readArticle,
    destroyArticle,
    updateArticle
};