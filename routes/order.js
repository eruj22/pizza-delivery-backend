const express = require("express");
const router = express.Router();

const { getAllOrders, getOrder, createOrder } = require("../controllers/order");

router.route("/").post(createOrder).get(getAllOrders);
router.get("/:id", getOrder);

module.exports = router;
