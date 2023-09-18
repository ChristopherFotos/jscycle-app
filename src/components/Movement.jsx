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
} from '@mui/material';

export default function Movement({
	movement,
	handleCompleteSet,
	handleChangeRPE,
	handleChangeSetsOrReps,
}) {
	const makeTrainingVariablesArray = (movement) => {
		const trainingVariableNames = Object.keys(movement);
		trainingVariableNames.shift();

		const trainingVariableArray = trainingVariableNames
			.filter((name) => name !== 'setsInfo' && name !== 'index')
			.map((name, i) => {
				return { name: name, value: movement[name] };
			});
		return trainingVariableArray;
	};

	return (
		<div className='movement'>
			<Card sx={{ p: 4 }} variant='outlined'>
				<Typography variant='h6'>{movement.movement}</Typography>
				{makeTrainingVariablesArray(movement).map((tv) => (
					<div>
						<Typography variant='body1'>{tv.name}</Typography>
						<Typography variant='body2'>{tv.value}</Typography>
					</div>
				))}
				<Accordion>
					<AccordionSummary aria-controls='panel1a-content' id='panel1a-header'>
						<Typography>Sets</Typography>
					</AccordionSummary>
					{movement.setsInfo.map((set, i) => (
						<AccordionDetails>
							<FormGroup>
								<FormControlLabel
									control={<Checkbox checked={set.complete} />}
									onChange={(e) => {
										console.log('SET:', set);
										handleCompleteSet(e, {
											movement: movement.index,
											set: i,
										});
									}}
									label={`Set ${set.number}`}
								/>

								{set.complete && (
									<>
										<Typography variant='subtitle1'>Actual weight:</Typography>
										<TextField
											value={set.actualWeight}
											type='number'
											inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
											onChange={(e) =>
												handleChangeSetsOrReps(e, {
													movement: movement.index,
													valueToChange: 'actualWeight',
													set: i,
												})
											}
										/>
										<Typography variant='subtitle1'>Actual reps:</Typography>
										<TextField
											value={set.actualReps}
											type='number'
											inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
											onChange={(e) =>
												handleChangeSetsOrReps(e, {
													movement: movement.index,
													valueToChange: 'actualReps',
													set: i,
												})
											}
										/>
										<Typography variant='subtitle1'>RPE:</Typography>
										<Slider
											aria-label='Temperature'
											defaultValue={0}
											valueLabelDisplay='auto'
											step={1}
											value={set.rpe}
											marks
											min={0}
											max={10}
											onChange={(e) =>
												handleChangeRPE(e, {
													movement: movement.index,
													set: i,
												})
											}
										/>
									</>
								)}
							</FormGroup>
						</AccordionDetails>
					))}
				</Accordion>
			</Card>
		</div>
	);
}
