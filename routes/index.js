const router = require("express").Router(); // The method .Routes() of express module will help us handle different routes.

router.get("/", (req, res) => {res.send("Project 2")});

router.use("/books", require("./books"));

module.exports = router;