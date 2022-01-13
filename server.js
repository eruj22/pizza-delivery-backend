require("dotenv").config();
require("express-async-errors");

const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const cors = require("cors");

const express = require("express");
const app = express();

// connect DB
const connectDB = require("./db/connect");

// routes
const pizzaRouter = require("./routes/pizza");
const pizzeriaRouter = require("./routes/pizzeria");
const paymentRouter = require("./routes/payment");
const orderRouter = require("./routes/order");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("working");
});

app.use("/pizzas", pizzaRouter);
app.use("/pizzerias", pizzeriaRouter);
app.use("/create-payment-intent", paymentRouter);
app.use("/orders", orderRouter);

let collection;

app.post("/search", async (req, res) => {
  try {
    let result = await collection
      .aggregate([
        {
          $search: {
            index: "autocomplete",
            text: {
              query: `${req.body.query}`,

              path: {
                wildcard: "*",
              },
            },
          },
        },
      ])
      .toArray();

    res.send(result);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await client.connect();
    collection = client.db("food-ordering-app").collection("pizzas");

    await connectDB(process.env.MONGO_URI);

    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
