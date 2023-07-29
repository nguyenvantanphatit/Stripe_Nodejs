import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./components/CheckoutButton";

const stripePublicKey =
  "pk_test_51Mji83HzN97C2e0rWEsBzLc1LzwfHK523H0Ui2l2mggr5U5HqMLpVPHyk9J5ZrKAYnmrxhleK2WnjbBy2XsCGWu6008lpzp1n2";
const stripePromise = loadStripe(stripePublicKey);

function App() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm
        phone="YOUR_PHONE_NUMBER"
        address="YOUR_ADDRESS"
        price="YOUR_PRICE"
      />
    </Elements>
  );
}

export default App;
