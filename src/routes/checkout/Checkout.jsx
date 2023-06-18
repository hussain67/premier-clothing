import "./checkout.scss";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import PaymentForm from "../../component/payment-form/Payment-form";

const Checkout = () => {
	const cartTotal = useSelector(selectCartTotal);
	const user = useSelector(selectCurrentUser);
	console.log(user?.displayName);
	return (
		<div className="checkout-container">
			<h3>Hello {user?.displayName}</h3>
			<p>Your total is £ {cartTotal}</p>
			<PaymentForm />
		</div>
	);
};

export default Checkout;
