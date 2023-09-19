import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItemButton } from '@mui/material';
import '../App.scss';

export default function Program({ program }) {
	return (
		<div>
			<Link to={`/EditProgram`}>
				<p className='program__btn-text'>Create a new program</p>
			</Link>
			<List className='program__week-list'>
				{program.map((week, i) => (
					<ListItemButton divider className='program__week' key={week + i}>
						<Link to={`/weeks/${i}`}>
							<p className='program__btn-text'>Week {i}</p>
						</Link>
					</ListItemButton>
				))}
			</List>
		</div>
	);
}
