const router = require("express").Router(); // The method .Routes() of express module will help us handle different routes.

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
    //#swagger.tags=["Project 2"]
    res.send("Project 2")});

router.use("/books", require("./books"));
router.use("/clients", require("./clients"));

module.exports = router;