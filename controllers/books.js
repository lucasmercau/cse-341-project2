const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId; //Is the unique MongoDb ID that assing to any entry.

const getAll = async (req, res) => {
    //#swagger.tags=["Books"]
    try {
        const result = await mongodb.getDatabase().db().collection("books").find();
        result.toArray().then((books) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(books);
        });
    } catch (error) {
        console.log(error);
    } 
}

const getSingle = async (req, res) => {
    //#swagger.tags=["Books"]
    if (ObjectId.isValid(req.params.id)) {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection("books").find({ _id: userId });
        result.toArray().then((books) => {
            if (books.length === 0) {
                // No book found with the provided ID
                res.status(404).json({ error: "Book not found" });
                return;
            }
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(books[0]);
        });
    } else {
        res.status(400).json({ error: "Invalid ID" });
    } 
}

const createBook = async (req, res) => {
    //#swagger.tags=["Books"]
    try {
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
    } catch (error) {
        console.log(error);
    } 
}

const updateBook = async (req, res) => {
    //#swagger.tags=["Books"]
    if (ObjectId.isValid(req.params.id)) {
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
    } else {
        res.status(400).json({ error: "Invalid ID" });
    } 
}

const deleteBook = async (req, res) => {
    //#swagger.tags=["Books"]
    if (ObjectId.isValid(req.params.id)) {
        const userId = new ObjectId(req.params.id);
        if (!isValidObjectId(userId)) {
            // If the provided ID is not a valid ObjectId, return a 400 Bad Request response
            res.status(400).json({ error: "Invalid ID format" });
            return;
        }
        const response = await mongodb.getDatabase().db().collection("books").deleteOne({ _id: userId });
        if(response.deletedCount > 0) { //So we can do a deleted count to see if it's greater than zero, then it's successful.
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Some error ocurred while updating the user.");
        }
    } else {
        res.status(400).json({ error: "Invalid ID" });
    }
}

module.exports = {
    getAll,
    getSingle,
    createBook,
    updateBook,
    deleteBook
}