const { StatusCodes } = require("http-status-codes");

// stripe
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const pizzas = require("../helpers/allPizzas");
const { deliveryPrice } = require("../helpers/functions");

const payment = async (req, res) => {
  const { paymentMethodType, currency, items } = req.body;
  const sizes = ["Small", "Medium", "Large"];

  let selectedPizzasPrices = [];
  items.forEach((item) => {
    const foundPizza = pizzas.find((pizza) => pizza._id === item.id);

    const price = foundPizza.prices[sizes.indexOf(item.size)];
    const total = Number(price) * item.amount;

    selectedPizzasPrices.push(total);
  });

  const totalAmount = selectedPizzasPrices.reduce((prev, cur) => prev + cur);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: (parseInt(totalAmount) + deliveryPrice(totalAmount)) * 100,
      currency,
      payment_method_types: [paymentMethodType],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: { message: error.message } });
  }
};

module.exports = { payment };
