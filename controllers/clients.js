const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId; //Is the unique MongoDb ID that assing to any entry.

const getAll = async (req, res) => {
    //#swagger.tags=["Clients"]
    try {
        const result = await mongodb.getDatabase().db().collection("clients").find();
        result.toArray().then((clients) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(clients);
        });
    } catch (error) {
        console.log(error);
    } 
}

const getSingle = async (req, res) => {
    //#swagger.tags=["Clients"]
    if (ObjectId.isValid(req.params.id)) {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection("clients").find({ _id: userId });
        result.toArray().then((clients) => {
            if (clients.length === 0) {
                // No client found with the provided ID
                res.status(404).json({ error: "Client not found" });
                return;
            }
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(clients[0]);
        });
    } else {
        res.status(400).json({ error: "Invalid ID" });
    } 
}

const createClient = async (req, res) => {
    //#swagger.tags=["Clients"]
    try {
        const client = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address
        };
        const response = await mongodb.getDatabase().db().collection("clients").insertOne(client);
        if(response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Some error ocurred while updating the user.");
        }
    } catch (error) {
        console.log(error);
    } 
}

const updateClient = async (req, res) => {
    //#swagger.tags=["Clients"]
    if (ObjectId.isValid(req.params.id)) {
        const userId = new ObjectId(req.params.id);
        const client = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address
        };
        const response = await mongodb.getDatabase().db().collection("clients").replaceOne({ _id: userId }, client);
        if(response.modifiedCount > 0) { //So we can do a modified count to see if it's greater than zero, then it's successful.
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Some error ocurred while updating the user.");
        }
    } else {
        res.status(400).json({ error: "Invalid ID" });
    } 
}

const deleteClient = async (req, res) => {
    //#swagger.tags=["Clients"]
    if (ObjectId.isValid(req.params.id)) {
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection("clients").deleteOne({ _id: userId });
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
    createClient,
    updateClient,
    deleteClient
}