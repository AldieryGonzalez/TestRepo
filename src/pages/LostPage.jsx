// import "./LostPage.css";
import { useState, useEffect } from "react";
import { objectToArray } from "../utilities/helpers";
import PostCard from "../components/PostCard";
import SearchSort from "../components/SearchSort";
import "./FoundPage.css";

const LostPage = ({ posts }) => {
	let formattedPosts = objectToArray(posts);
	formattedPosts = formattedPosts.filter((post) => !post.hidden);

	const [sortOption, setSortOption] = useState("newest");
	const [sortedPosts, setSortedPosts] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		// Sort posts based on selected option

		if (sortOption === "newest") {
			formattedPosts.sort((x, y) => y.id - x.id);
		} else if (sortOption === "oldest") {
			formattedPosts.sort((x, y) => x.id - y.id);
		}

		// Filter posts based on the search query
		const filteredPosts = formattedPosts.filter((post) =>
			post.description.toLowerCase().includes(searchQuery.toLowerCase())
		);

		setSortedPosts(filteredPosts);
	}, [sortOption, searchQuery]);

	const handleSortChange = (e) => {
		setSortOption(e.target.value);
	};

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	return (
		<div className='lost-page'>
			<div className='lost-page-header'>
				<h2>Lost Items</h2>
				<SearchSort
					handleSearchChange={handleSearchChange}
					handleSortChange={handleSortChange}
					searchQuery={searchQuery}
					sortOption={sortOption}></SearchSort>
			</div>
			<div className='card-container'>
				{sortedPosts.map((post) => (
					<PostCard key={post.id} post={post} />
				))}
			</div>
		</div>
	);
};

export default LostPage;
