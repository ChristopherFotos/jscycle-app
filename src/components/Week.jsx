import React from 'react';
import { useContext } from 'react';
import ProgramContext from '../context';
import { Link, useParams } from 'react-router-dom';
import {
	List,
	ListItemButton,
	ListItemText,
	Typography,
	Paper,
} from '@mui/material';

export default function Week() {
	let { weekId } = useParams();
	const program = useContext(ProgramContext);

	return (
		<div>
			<Link to='/program'>
				<Typography variant='h5' className>
					{'<'} Back to all weeks
				</Typography>
			</Link>

			<Typography align='center' variant='h6'>
				Week {weekId}
			</Typography>

			<List className='program__week-list'>
				{program[weekId].map((day, i) => (
					<ListItemButton
						divider
						className='program__week'
						key={`day-${day}${i}`}>
						<Link to={`/${weekId}/${i}`}>
							<ListItemText primary={`Day ${i}`}></ListItemText>
						</Link>
					</ListItemButton>
				))}
			</List>
		</div>
	);
}
