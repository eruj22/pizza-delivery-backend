const mongoose = require("mongoose");

const PizzaSchema = new mongoose.Schema({
  image: String,
  name: String,
  prices: Array,
  ingredients: Array,
  restaurant: String,
  category: String,
});

module.exports = mongoose.model("Pizza", PizzaSchema);
