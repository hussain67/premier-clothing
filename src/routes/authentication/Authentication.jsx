import { useState } from "react";
import SignInForm from "../../component/sign-in-form /Sign-in-form";
import SignUpForm from "../../component/sign-up-form/Sign-up-form";
import "./authentication.scss";
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
