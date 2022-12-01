import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";

const defaultFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: ""
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;
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

		// Check that password matches
		if (password !== confirmPassword) {
			alert("Password do not match");
			return;
		}

		//The user is authenticated using email and password
		try {
			const { user } = await createAuthUserWithEmailAndPassword(email, password);

			//Create user document
			const userDocRef = createUserDocumentFromAuth(user, { displayName });
			resetFormFields();
			console.log(userDocRef);
		} catch (error) {
			if (error.code === "auth/email-already-in-use") {
				alert("Email is already in use, Try another Email");
			}
			console.log(error.code);
		}
	};
	return (
		<div className="sign-up-container">
			<h2>Dont have an account</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Display Name"
					onChange={handleChange}
					type="text"
					name="displayName"
					value={displayName}
					required
				/>

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
				<FormInput
					label="Confirm password"
					onChange={handleChange}
					type="password"
					name="confirmPassword"
					value={confirmPassword}
					required
				/>
				<Button type="submit">Sign Up</Button>
			</form>
		</div>
	);
};
export default SignUpForm;
