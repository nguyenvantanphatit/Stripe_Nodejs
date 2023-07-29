const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51Mji83HzN97C2e0r4SxtZIZOjPOaxwwQTkZOhLlMaBw4BkZG7LLa2oLg9mHr2d6tSEPx4yHQGTy4VTYJ1Urifj2a001tesh5o6"
);

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.post("/payment", handlePaymentIntent);

// Function to create a payment intent
async function createPaymentIntent(payment_method_id) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: "usd",
      payment_method: payment_method_id,
      confirm: true,
    });

    return paymentIntent;
  } catch (error) {
    throw error;
  }
}

async function handlePaymentIntent(req, res) {
  try {
    const { payment_method_id } = req.body;

    const paymentIntent = await createPaymentIntent(payment_method_id);

    res.json({ success: true, paymentIntent });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
