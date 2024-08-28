import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import { useDbUpdate } from '../utilities/firebase';
import Modal from './Modal';
import './PostCard.css';

const ProfileCard = ({ post }) => {
	const [updateData, result] = useDbUpdate(
		`${post.lostOrFound}Posts/${post.id}`
	);
	const [showModal, setShowModal] = useState(false);

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	const options = ['Delete'];

	const ITEM_HEIGHT = 48;

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleEdit = () => {
		setAnchorEl(null);
		console.log('Edit');
	};

	const handleDelete = () => {
		setAnchorEl(null);
		console.log('Delete');
		updateData({
			hidden: true,
		});
	};

	return (
		<div className='post-card'>
			<div className='card-body'>
				<div className='description'>{post.description}</div>
				<div className='name'>By: {post.name}</div>
			</div>

			<div className='post-image'>
				<img src={post.image} alt={post.title} />
			</div>

			<button className='button' onClick={toggleModal}>
				More Information
			</button>

			<div className='optionsButton'>
				<IconButton
					aria-label='more'
					id='long-button'
					aria-controls={open ? 'long-menu' : undefined}
					aria-expanded={open ? 'true' : undefined}
					aria-haspopup='true'
					onClick={handleClick}>
					<MoreVertIcon />
				</IconButton>
				<Menu
					id='long-menu'
					MenuListProps={{
						'aria-labelledby': 'long-button',
					}}
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					PaperProps={{
						style: {
							maxHeight: ITEM_HEIGHT * 4.5,
							width: '20ch',
						},
					}}>
					{options.map((option) => (
						<MenuItem
							key={option}
							selected={option === 'Pyxis'}
							//   onClick={handleClose}
							onClick={
								option === 'Edit' ? handleEdit : handleDelete
							}>
							{option}
						</MenuItem>
					))}
				</Menu>
			</div>

			{showModal && <Modal post={post} onClose={toggleModal} />}
		</div>
	);
};

export default ProfileCard;
