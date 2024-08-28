// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
} from 'firebase/auth';
import {
	connectDatabaseEmulator,
	ref as dbRef,
	getDatabase,
	onValue,
	update,
} from 'firebase/database';
import {
	getDownloadURL,
	getStorage,
	ref as sRef,
	uploadBytes,
	uploadBytesResumable,
} from 'firebase/storage';
import { useCallback, useEffect, useState } from 'react';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyD_217B5P7p20G3IdSd5QUWPQ2opmCEo4k',
	authDomain: 'lostnfound-c4ccf.firebaseapp.com',
	projectId: 'lostnfound-c4ccf',
	storageBucket: 'lostnfound-c4ccf.appspot.com',
	messagingSenderId: '449979642883',
	appId: '1:449979642883:web:e79e3f497bf6eb8c918a36',
	measurementId: 'G-ZMRQTF40W3',
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const database = getDatabase(firebase);
const storage = getStorage(firebase);
export const auth = getAuth(firebase);

export const useStorageUpload = (file, path) => {
	return new Promise((resolve, reject) => {
		const storageRef = sRef(storage, path);
		const uploadTask = uploadBytesResumable(storageRef, file);

		// Register three observers:
		// 1. 'state_changed' observer, called any time the state changes
		// 2. Error observer, called on failure
		// 3. Completion observer, called on successful completion
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				// Observe state change events such as progress, pause, and resume
				// Use snapshot to get the progress, including bytes transferred and total bytes
			},
			(error) => {
				// Handle unsuccessful uploads
				reject(error);
			},
			() => {
				// Handle successful uploads on complete
				// uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
				// 	resolve(downloadURL);
				// });
				getDownloadURL(uploadTask.snapshot.ref).then((url) =>
					resolve(url)
				);
			}
		);
	});
};

export const useDbData = (path) => {
	const [data, setData] = useState();
	const [error, setError] = useState(null);

	useEffect(
		() =>
			onValue(
				dbRef(database, path),
				(snapshot) => {
					setData(snapshot.val());
				},
				(error) => {
					setError(error);
				}
			),
		[path]
	);

	return [data, error];
};

const makeResult = (error) => {
	const timestamp = Date.now();
	const message =
		error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
	return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
	const [result, setResult] = useState();
	const updateData = useCallback(
		(value) => {
			update(dbRef(database, path), value)
				.then(() => setResult(makeResult()))
				.catch((error) => setResult(makeResult(error)));
		},
		[database, path]
	);

	return [updateData, result];
};

export const signInWithGoogle = () => {
	signInWithPopup(getAuth(firebase), new GoogleAuthProvider()).then(
		(userCredential) => {
			const isEqual =
				userCredential.user.metadata.creationTime ===
				userCredential.user.metadata.lastSignInTime;
			if (isEqual) {
				const value = {
					uid: userCredential.user.uid,
					email: userCredential.user.email,
					name: userCredential.user.displayName,
				};
				const path = `users/${userCredential.user.uid}`;
				update(dbRef(database, path), value)
					.then()
					.catch((error) => console.log(error));
			}
		}
	);
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
	// A custom hook is basically a unique combination of other hooks, since
	// hooks are just functions that return stateful logic. It also has an added
	// benefit of being reusable across multiple components, while still using the same logic.
	// only once. This is useful for fetching data from an API, for example.
	const [user, setUser] = useState();
	const [isNorthwesternStudent, setIsNorthwesternStudent] = useState(false);

	useEffect(() => {
		// useEffect for Long-Running Effects
		const result = onAuthStateChanged(getAuth(firebase), (user) => {
			setIsNorthwesternStudent(false);
			setUser(user);
			if (user.email.endsWith('northwestern.edu')) {
				setIsNorthwesternStudent(true);
			}
		});
		return result;
	}, []);

	return [user, isNorthwesternStudent];
};
