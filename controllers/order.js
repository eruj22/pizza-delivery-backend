const Order = require("../models/Order");
const { StatusCodes } = require("http-status-codes");

const createOrder = async (req, res) => {
  const order = await Order.create(req.body);

  res.status(StatusCodes.CREATED).json({ order });
};

const getAllOrders = async (req, res) => {
  const order = await Order.find({});

  res.status(StatusCodes.OK).json({ order });
};

const getOrder = async (req, res) => {
  const id = req.params.id;

  const order = await Order.findById({ _id: id });

  if (!order) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `No order with id ${id}` });
  }

  res.status(StatusCodes.OK).json({ order });
};

module.exports = { createOrder, getAllOrders, getOrder };
