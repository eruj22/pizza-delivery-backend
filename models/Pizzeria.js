const mongoose = require("mongoose");

const PizzeriaSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
});

module.exports = mongoose.model("Pizzeria", PizzeriaSchema);
