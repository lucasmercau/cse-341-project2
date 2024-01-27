const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId; //Is the unique MongoDb ID that assing to any entry.

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection("books").find();
    result.toArray().then((books) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(books);
    })
}

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("books").find({ _id: userId });
    result.toArray().then((books) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(books[0]);
    })
}

module.exports = {
    getAll,
    getSingle
}