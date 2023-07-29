import React from "react";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = ({ phone, address, price }) => {
  const stripePublicKey = "pk_test_51Mji83HzN97C2e0rWEsBzLc1LzwfHK523H0Ui2l2mggr5U5HqMLpVPHyk9J5ZrKAYnmrxhleK2WnjbBy2XsCGWu6008lpzp1n2";
  const stripe = useStripe();
  const elements = useElements();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded, or Elements is not yet initialized.
      return;
    }

    try {
      // Step 1: Collect payment information using CardElement
      const cardElement = elements.getElement(CardElement);
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        console.error("Error creating payment method:", error.message);
        return;
      }

      // Step 2: Call the backend API to confirm the PaymentIntent with the payment method
      const response = await axios.post("http://localhost:3000/payment", {
        phone: phone,
        address: address,
        price: price,
        payment_method_id: paymentMethod.id, // Pass the payment method ID to the backend
      });

      if (response.data.success) {
        console.log("Payment successful!");
      } else {
        console.error("Payment failed:", response.data.error);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} style={{ marginLeft: "650px" }}>
      <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      <button type="submit">Submit Payment</button>
    </form>
  );
};

export default PaymentForm;
