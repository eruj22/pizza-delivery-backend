const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    payment: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    paymentId: String,
    order: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
