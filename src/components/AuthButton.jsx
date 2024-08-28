import React from 'react';
import { NavLink } from 'react-router-dom';
import { signInWithGoogle, useAuthState } from '../utilities/firebase';

const SignInButton = () => (
	<button
		className='ms-auto btn btn-dark sign-in-button'
		onClick={signInWithGoogle}>
		Sign in
	</button>
);

const ProfileButton = () => {
	return (
		<NavLink to='profilepage' className='fl-button fs-1'>
			<i className='bi bi-person-circle'></i>
		</NavLink>
	);
};

// This component will display a sign in button if the user is not signed in
// Great Example of conditional rendering
const AuthButton = () => {
	const [user, _] = useAuthState();
	return user ? <ProfileButton /> : <SignInButton />;
};

export default AuthButton;
