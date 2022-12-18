import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";
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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);
	objectsToAdd.forEach(object => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});
	await batch.commit();
	//console.log("done");
};

export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(db, "categories");
	const q = query(collectionRef);
	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
};

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
	if (!userAuth) return;
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
				createdAt,
				...additionalInformation
			});
		} catch (error) {
			console.log("error creating the user", error.message);
		}
	}
	// If the user data exists
	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async callback => await signOut(auth);

export const onAuthStateChangedListner = callback => onAuthStateChanged(auth, callback);
