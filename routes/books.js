const router = require("express").Router();
const { validateBook } = require("../middleware/validate");

const booksController = require("../controllers/books");

const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", booksController.getAll);
router.get("/:id", booksController.getSingle);

router.post("/", isAuthenticated, validateBook, booksController.createBook);

router.put("/:id", isAuthenticated, validateBook, booksController.updateBook);

router.delete("/:id", isAuthenticated, booksController.deleteBook);

module.exports = router;