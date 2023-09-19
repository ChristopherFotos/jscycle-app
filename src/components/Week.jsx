import React from 'react';
import { useContext } from 'react';
import ProgramContext from '../context';
import { Link, useParams } from 'react-router-dom';
import { List, ListItemButton, ListItemText, Typography } from '@mui/material';

export default function Week() {
	let { weekId } = useParams();
	const program = useContext(ProgramContext);

	return (
		<div>
			<Link to='/'>
				<Typography sx={{ my: 3 }} variant='subtitle1' className>
					{'<'} Back to program
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
						<Link to={`/weeks/${weekId}/${i}`}>
							<ListItemText primary={`Day ${i}`}></ListItemText>
						</Link>
					</ListItemButton>
				))}
			</List>
		</div>
	);
}
