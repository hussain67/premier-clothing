import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../../store/user/user.action";
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import Button from "../button/button";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.scss";

const defaultFormFields = {
	email: "",
	password: ""
};

const SignInForm = ({ setIsRegistered }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	function handleChange(e) {
		const name = e.target.name;
		const value = e.target.value;
		setFormFields({ ...formFields, [name]: value });
	}

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};
	const handleSubmit = async event => {
		event.preventDefault();
		try {
			const { user } = await signInAuthUserWithEmailAndPassword(email, password);
			dispatch(setCurrentUser(user));
			resetFormFields();
			navigate("/");
		} catch (error) {
			switch (error.code) {
				case "auth/wrong-password":
					alert("Password do not match");
					break;
				case "auth/user-not-found":
					alert("No user found with this Email");
					break;
				default:
					console.log(error.code);
			}
		}
	};
	const signInWithGoogle = async () => {
		await signInWithGooglePopup();
	};

	return (
		<div className="sign-in">
			<h2 className="sign-in-heading">
				{" "}
				Welcome to Premier Clothing
				<span> Please Sign in</span>
			</h2>

			<form onSubmit={handleSubmit}>
				<FormInput
					label="Email"
					onChange={handleChange}
					name="email"
					type="email"
					value={email}
					required
				/>

				<FormInput
					label="Password"
					onChange={handleChange}
					type="password"
					name="password"
					value={password}
					required
				/>
				<div className="buttons-container">
					<Button type="submit">Sign In</Button>
					<Button
						// button inside form is of type submit by default
						type="button"
						onClick={signInWithGoogle}
						buttonType="google"
					>
						Google Sign In
					</Button>
				</div>
			</form>
			<hr className="sign-in-hr" />
			<h2 className="new-customer">New customer</h2>
			<Button
				buttonType="inverted"
				onClick={() => setIsRegistered(false)}
			>
				Create an account
			</Button>
		</div>
	);
};
export default SignInForm;
