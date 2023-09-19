import React from 'react';
import { Link } from 'react-router-dom';
import {
	List,
	ListItemButton,
	Button,
	Accordion,
	AccordionSummary,
	Typography,
	AccordionDetails,
} from '@mui/material';
import '../App.scss';

export default function Program({ program }) {
	return (
		<div className='weeks'>
			<Accordion sx={{ my: '3' }}>
				<AccordionSummary>
					<Typography>Weeks</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<List className='program__week-list'>
						{program.map((week, i) => (
							<ListItemButton divider className='program__week' key={week + i}>
								<Link to={`/weeks/${i}`}>
									<p className='program__btn-text'>Week {i}</p>
								</Link>
							</ListItemButton>
						))}
					</List>
				</AccordionDetails>
			</Accordion>
			<Link to={`/EditProgram`}>
				<Button sx={{ my: 3 }} variant='contained'>
					Create a new program
				</Button>
			</Link>
		</div>
	);
}
