import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
//  Firebase configuration

const firebaseConfig = {
	apiKey: "AIzaSyC4GMJpfafcXmDVVLcrVPrkBE8wLk0M-10",

	authDomain: "premier-clothing-db.firebaseapp.com",

	projectId: "premier-clothing-db",

	storageBucket: "premier-clothing-db.appspot.com",

	messagingSenderId: "572338386616",

	appId: "1:572338386616:web:9277a0091ff79829aaa64d"
};

// Firestore Configuration

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
	prompt: "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async userAuth => {
	const userDocRef = doc(db, "users", userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	// If the user data does not exists
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt
			});
		} catch (error) {
			console.log("error creating the user", error.message);
		}
	}
	// If the user data exists
	return userDocRef;
};
