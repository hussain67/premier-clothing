import SignUpForm from "../../component/sign-up-form/sign-up-form.component";
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
const SignIn = () => {
	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		const userDocRef = await createUserDocumentFromAuth(user);
		console.log(userDocRef);
	};
	return (
		<>
			<div>
				<h1>Sign In page</h1>
			</div>
			<button onClick={logGoogleUser}>Sign in with google pop up</button>
			<SignUpForm />
		</>
	);
};
export default SignIn;
