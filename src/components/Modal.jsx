import { useEffect, useRef } from 'react';
import './Modal.css';

const Modal = ({ post, onClose }) => {
	const modalRef = useRef(null);

	const handleClickOutside = (event) => {
		if (modalRef.current && !modalRef.current.contains(event.target)) {
			onClose();
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className='modal-overlay'>
			<div className='modal-content' ref={modalRef}>
				<div className='modal-hdr'>Item Details</div>
				<div className='description'>
					<b>{post.description} </b>
					found at {post.location}
				</div>
				<div className='contact-info'>
					Please contact {post.name} at 123-456-7890
				</div>
				<button className='modal-btn' onClick={onClose}>
					Close
				</button>
			</div>
		</div>
	);
};

export default Modal;
