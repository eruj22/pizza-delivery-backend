const express = require("express");
const router = express.Router();

const { getAllPizzas, getPizza } = require("../controllers/pizza");

router.get("/", getAllPizzas);
router.get("/:id", getPizza);

module.exports = router;
