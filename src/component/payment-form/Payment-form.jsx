import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Button from "../button/button";
import "./payment-form.scss";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

const PaymentForm = () => {
	const stripe = useStripe();
	const elements = useElements();
	const amount = useSelector(selectCartTotal);
	const currentUser = useSelector(selectCurrentUser);
	const [isProcessingPayment, setIsProcessingPayment] = useState(false);

	const paymentHandler = async e => {
		e.preventDefault();
		if (!stripe || !elements) {
			return;
		}
		setIsProcessingPayment(true);
		const response = await fetch("/.netlify/functions/create-payment-intent", {
			method: "post",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({ amount: amount * 100 })
		}).then(res => res.json());

		const {
			paymentIntent: { client_secret }
		} = response;

		const paymentResult = await stripe.confirmCardPayment(client_secret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: currentUser ? currentUser.displayName : "Guest"
				}
			}
		});
		setIsProcessingPayment(false);
		if (paymentResult.error) {
			alert(paymentResult.error.message);
		} else {
			if (paymentResult.paymentIntent.status === "succeeded") {
				alert("Payment Successful");
			}
		}
	};
	return (
		<div className="payment-form-container">
			<form
				className="form-container"
				onSubmit={paymentHandler}
			>
				<h2>Credit card payment</h2>
				<div className="card-info">{<CardElement />}</div>

				<Button disabled={isProcessingPayment}>Pay Now</Button>
			</form>
		</div>
	);
};
export default PaymentForm;
