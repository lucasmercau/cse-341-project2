const passport = require("passport");

const router = require("express").Router(); // The method .Routes() of express module will help us handle different routes.

router.use("/", require("./swagger"));
router.use("/books", require("./books"));
router.use("/clients", require("./clients"));

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", function(req, res, next) {
    req.logout(function(err) {
        if (err) {return next(err); }
        res.redirect("/");
    });
});

module.exports = router;