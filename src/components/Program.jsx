import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, List, ListItemButton, ListItemText } from '@mui/material';
import '../App.scss';

export default function Program({ program }) {
	console.log('PROGRAM RERENDERING');

	return (
		<div>
			<List className='program__week-list'>
				{program.map((_week, i) => (
					<ListItemButton divider className='program__week'>
						<Link to={`/${i}`}>
							<p className='program__btn-text'>Week {i}</p>
						</Link>
					</ListItemButton>
				))}
			</List>
		</div>
	);
}
