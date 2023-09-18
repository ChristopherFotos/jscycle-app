import React from 'react';
import {
	Card,
	Typography,
	FormGroup,
	Checkbox,
	FormControlLabel,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Slider,
	TextField,
	Fab,
} from '@mui/material';

export default function MovementEditor({
	movement,
	index,
	handleChangeMovementProperties,
	handleChangeProgressionProperties,
	handleChangeMovementDays,
}) {
	const labels = [
		{ label: 'Starting value', name: 'startingValue' },
		{ label: 'increment', name: 'increment' },
		{ label: 'deload increment', name: 'deloadIncrement' },
	];

	const days = [0, 1, 2, 3, 4, 5, 6, 7];

	return (
		<Card sx={{ p: 2, my: 2 }}>
			<TextField
				sx={{ my: 2 }}
				onChange={(e) =>
					handleChangeMovementProperties(e, {
						index,
						property: 'name',
					})
				}
				label='name'
				value={movement.name}
			/>

			<Accordion>
				<AccordionSummary>
					<Typography>Days</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<FormGroup sx={{ display: 'flex' }}>
						{days.map((day, i) => (
							<FormControlLabel
								control={
									<Checkbox
										checked={movement.days.includes(day)}
										onChange={(e) =>
											handleChangeMovementDays(e, {
												index,
												day: day,
											})
										}
									/>
								}
								label={i + 1}
							/>
						))}
					</FormGroup>
				</AccordionDetails>
			</Accordion>

			{movement.progression.map((trainingVariable, i) => {
				return (
					<Accordion>
						<AccordionSummary
							aria-controls='panel1a-content'
							id='panel1a-header'>
							<Typography>{trainingVariable.name}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							{labels.map((label) => {
								return (
									<TextField
										sx={{ my: 4, display: 'block' }}
										type='number'
										inputProps={{ inputMode: 'numeric' }}
										onChange={(e) =>
											handleChangeProgressionProperties(e, {
												index,
												progressionIndex: i,
												property: label.name,
											})
										}
										label={label.label}
										value={trainingVariable[label.name]}
									/>
								);
							})}
						</AccordionDetails>
					</Accordion>
				);
			})}
		</Card>
	);
}

// name: 'weight',
// startingValue: 240,
// increment: 5,
// deloadIncrement: 5,
// max: Infinity,
