const Pizza = require("../models/Pizza");
const { StatusCodes } = require("http-status-codes");

const getAllPizzas = async (req, res) => {
  const pizzas = await Pizza.find({});
  res.status(StatusCodes.OK).json({ pizzas });
};

const getPizza = async (req, res) => {
  const id = req.params.id;

  const pizza = await Pizza.findById({ _id: id });

  if (!pizza) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: `No pizza with id ${id}` });
  }

  res.status(StatusCodes.OK).json({ pizza });
};

module.exports = { getAllPizzas, getPizza };
