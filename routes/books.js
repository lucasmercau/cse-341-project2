const router = require("express").Router();
const { validateBook } = require('../middleware/validate');

const booksController = require("../controllers/books");

router.get("/", booksController.getAll);
router.get("/:id", booksController.getSingle);

router.post("/", validateBook, booksController.createBook);

router.put("/:id", validateBook, booksController.updateBook);

router.delete("/:id", booksController.deleteBook);

module.exports = router;