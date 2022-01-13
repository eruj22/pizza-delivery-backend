const express = require("express");
const router = express.Router();

const { getAllPizzerias, getPizzeria } = require("../controllers/pizzeria");

router.get("/", getAllPizzerias);
router.get("/:id", getPizzeria);

module.exports = router;
