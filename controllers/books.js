const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId; //Is the unique MongoDb ID that assing to any entry.

const getAll = async (req, res) => {
    //#swagger.tags=["Books"]
    const result = await mongodb.getDatabase().db().collection("books").find();
    result.toArray().then((books) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(books);
    })
}

const getSingle = async (req, res) => {
    //#swagger.tags=["Books"]
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("books").find({ _id: userId });
    result.toArray().then((books) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(books[0]);
    })
}

const createBook = async (req, res) => {
    //#swagger.tags=["Books"]
    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        publishedYear: req.body.publishedYear,
        pages: req.body.pages,
        protagonist: req.body.protagonist,
        themes: req.body.themes,
        setting: req.body.setting
    };
    const response = await mongodb.getDatabase().db().collection("books").insertOne(book);
    if(response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error ocurred while updating the user.");
    }
}

const updateBook = async (req, res) => {
    //#swagger.tags=["Books"]
    const userId = new ObjectId(req.params.id);
    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        publishedYear: req.body.publishedYear,
        pages: req.body.pages,
        protagonist: req.body.protagonist,
        themes: req.body.themes,
        setting: req.body.setting
    };
    const response = await mongodb.getDatabase().db().collection("books").replaceOne({ _id: userId }, book);
    if(response.modifiedCount > 0) { //So we can do a modified count to see if it's greater than zero, then it's successful.
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error ocurred while updating the user.");
    }
}

const deleteBook = async (req, res) => {
    //#swagger.tags=["Books"]
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection("books").deleteOne({ _id: userId });
    if(response.deletedCount > 0) { //So we can do a deleted count to see if it's greater than zero, then it's successful.
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error ocurred while updating the user.");
    }
}

module.exports = {
    getAll,
    getSingle,
    createBook,
    updateBook,
    deleteBook
}