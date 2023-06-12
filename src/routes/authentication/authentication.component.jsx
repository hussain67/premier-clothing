import { useState } from "react";
import SignInForm from "../../component/sign-in-form /sign-in-form.component";
import SignUpForm from "../../component/sign-up-form/sign-up-form.component";
import "./authentication.styles.scss";
const Authentication = () => {
	const [isRegistered, setIsRegistered] = useState(true);
	return (
		<div className="authentication">
			{isRegistered && <SignInForm setIsRegistered={setIsRegistered} />}
			{!isRegistered && <SignUpForm setIsRegistered={setIsRegistered} />}
		</div>
	);
};
export default Authentication;
