import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, test, vi } from 'vitest';
import App from './App';
import { useAuth } from './contexts/AuthContext';
import { useAuthState, useDbData } from './utilities/firebase';

vi.mock('./utilities/firebase');
vi.mock('./contexts/AuthContext');

const mockData = {
	foundPosts: {
		1697653581919: {
			contactInfo: '8478147947',
			description: 'Water bottle',
			hidden: false,
			id: 1697653581919,
			image: 'https://firebasestorage.googleapis.com/v0/b/lostnfound-c4ccf.appspot.com/o/C%3A%5Cfakepath%5Cwaterbottle.JPG?alt=media&token=32c34369-acea-498a-8a60-173e7e1af743',
			location: 'Tech Auditorium',
			lostOrFound: 'found',
			name: 'Jeremy Schofield',
			uid: '9NgmBelwvrdbN67HfZjWdEKtUVV2',
		},
	},
	lostPosts: {
		1697673281449: {
			contactInfo: '8471238890',
			description: 'Charger',
			hidden: false,
			id: 1697673281449,
			image: 'https://firebasestorage.googleapis.com/v0/b/lostnfound-c4ccf.appspot.com/o/C%3A%5Cfakepath%5CIMG_2553.JPG?alt=media&token=742439ac-2415-47ed-9710-12a94707ff78',
			location: 'Kresge',
			lostOrFound: 'lost',
			name: 'John King',
			uid: '9NgmBelwvrdbN67HfZjWdEKtUVV2',
		},
	},
	users: {
		'77U9GhbcXTSSUSSepq9YoyM2nOQ2': {
			email: 'your@gmail.com',
			name: 'Jerry Seinfeld',
			uid: '77U9GhbcXTSSUSSepq9YoyM2nOQ2',
		},
	},
};

describe('counter tests', () => {
	test('Should test for Found Posts', () => {
		useDbData.mockReturnValue([mockData, null]);
		useAuthState.mockReturnValue([null, null]);
		useAuth.mockReturnValue([null, null]);
		render(<App />);
		screen.queryByText(/Found Items/);
		// const title = screen.queryByText(/Found Items/);
		// expect(title).toBeInTheDocument;
	});
	// test("asks for data once", () => {
	//   useDbData.mockReturnValue([mockData, null]);
	//   useAuthState.mockReturnValue([null, null]);
	//   useAuth.mockReturnValue([null, null]);
	//   render(<App />);
	//   expect(useDbData).toHaveBeenCalledTimes(2);
	// });
	// test("Counter should be 0 at the start", () => {
	//   render(<App />);
	//   expect(screen.getByText('count is: 0')).toBeDefined();
	// });
	// test("Counter should increment by one when clicked", async () => {
	//   render(<App />);
	//   const counter = screen.getByRole('button');
	//   fireEvent.click(counter);
	//   expect(await screen.getByText('count is: 1')).toBeDefined();
	// });
});
