const router = require("express").Router();
const { validateClient } = require('../middleware/validate');

const clientsController = require("../controllers/clients");

router.get("/", clientsController.getAll);
router.get("/:id", clientsController.getSingle);

router.post("/", validateClient, clientsController.createClient);

router.put("/:id", validateClient, clientsController.updateClient);

router.delete("/:id", clientsController.deleteClient);

module.exports = router;