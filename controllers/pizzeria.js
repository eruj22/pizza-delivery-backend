const Pizzeria = require("../models/Pizzeria");
const { StatusCodes } = require("http-status-codes");

const getAllPizzerias = async (req, res) => {
  const pizzeria = await Pizzeria.find({});
  res.status(StatusCodes.OK).json({ pizzeria });
};

const getPizzeria = (req, res) => {
  res.send("pizzeria");
};

module.exports = { getAllPizzerias, getPizzeria };
