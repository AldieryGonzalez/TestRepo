import { useState } from 'react';
import { useAuthState } from '../utilities/firebase';
import Modal from './Modal';
import './PostCard.css';

const PostCard = ({ post }) => {
	const [showModal, setShowModal] = useState(false);

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	// This is a custom hook that checks if the user is logged in and if they have a Northwestern email
	// If they do, it returns the user object and true, otherwise it returns null and false
	// TODO: Command + Click on the function name to see the implementation!

	// Uncomment the line below to use this hook as if you are signed in properly
	// const [_, isNorthwesternEmail] = useAuthState();
	const isNorthwesternEmail = true; // This is a placeholder for the above line

	return (
		<div className='post-card'>
			<div className='card-body'>
				<div className='description'>{post.description}</div>
				<div className='name'>By: {post.name}</div>
			</div>

			{post.image != '' ? (
				<div className='post-image'>
					<img src={post.image} alt={post.description} />
				</div>
			) : null}

			<button
				disabled={!isNorthwesternEmail}
				className='button'
				onClick={toggleModal}>
				More Information
			</button>

			{showModal && <Modal post={post} onClose={toggleModal} />}
		</div>
	);
};

export default PostCard;
