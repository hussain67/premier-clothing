import { useState } from "react";
import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
//import { useContext } from "react";
//import { UserContext } from "../contexts/user.context";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
	email: "",
	password: ""
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;
	//const { setCurrentUser } = useContext(UserContext);
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
			//setCurrentUser(user);
			resetFormFields();
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
		<div className="sign-in-container">
			<h2> Already have an account</h2>
			<span>Sign in with your email and password</span>
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
		</div>
	);
};
export default SignInForm;
