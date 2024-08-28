import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { objectToArray } from '../utilities/helpers';
import './FoundPage.css'; // Importing CSS to have classes available

import SearchSort from '../components/SearchSort';

const FoundPage = ({ posts }) => {
	const [sortOption, setSortOption] = useState('newest'); //
	const [sortedPosts, setSortedPosts] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');

	let formattedPosts = objectToArray(posts);
	formattedPosts = formattedPosts.filter((post) => !post.hidden);

	// useEffect to limit the number of renders. This is not the best way to do this,
	// but it is a simple way to show how useEffect works.
	useEffect(() => {
		// Sort posts based on selected option
		if (sortOption === 'newest') {
			formattedPosts.sort((x, y) => y.id - x.id);
		} else if (sortOption === 'oldest') {
			formattedPosts.sort((x, y) => x.id - y.id);
		}

		// Filter posts based on the search query
		const filteredPosts = formattedPosts.filter((post) =>
			post.description.toLowerCase().includes(searchQuery.toLowerCase())
		);

		// WARNING: Be very careful setting state in a useEffect
		// If the variable set is in the dependency array, you will create
		// an INFINITE LOOP!
		setSortedPosts(filteredPosts);
	}, [sortOption, searchQuery]); // Dependency array: Array of variables that will trigger this effect

	const handleSortChange = (e) => {
		setSortOption(e.target.value);
	};

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	return (
		<div className='lost-page'>
			<div className='lost-page-header'>
				<h2>Found Items</h2>
				<SearchSort // Great Component to look into basic input interactions in react
					handleSearchChange={handleSearchChange}
					handleSortChange={handleSortChange}
					searchQuery={searchQuery}
					sortOption={sortOption}></SearchSort>
			</div>

			<div className='card-container'>
				{sortedPosts.map(
					(
						post // Map is a function that takes an array and applies a function to each element
					) => (
						// React interprets the array of JSX elements as a list of children in a return
						<PostCard key={post.id} post={post} />
					)
				)}
			</div>
		</div>
	);
};

export default FoundPage;
