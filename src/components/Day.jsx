import React from 'react';
import { useContext } from 'react';
import ProgramContext from '../context';
import { useParams, Link } from 'react-router-dom';
import {
	Typography,
	Card,
	FormGroup,
	Checkbox,
	FormControlLabel,
	Accordion,
} from '@mui/material';
import '../App.scss';
import Movement from './Movement';

export default function Day({ day, dayNumber, programDispatcher }) {
	let { dayId, weekId } = useParams();
	const program = useContext(ProgramContext);

	const handleCompleteSet = (e, setInfo) => {
		const isComplete = e.target.checked;

		programDispatcher({
			type: 'completeSet',
			week: weekId,
			day: dayId,
			movement: setInfo.movement,
			set: setInfo.set,
			isComplete,
		});
	};

	const handleChangeRPE = (e, setInfo) => {
		programDispatcher({
			type: 'changeRPE',
			week: weekId,
			day: dayId,
			movement: setInfo.movement,
			set: setInfo.set,
			rpe: e.target.value,
		});
	};

	const handleChangeSetsOrReps = (e, setInfo) => {
		programDispatcher({
			type: 'changeSetsOrReps',
			week: weekId,
			day: dayId,
			movement: setInfo.movement,
			set: setInfo.set,
			value: parseInt(e.target.value),
			valueToChange: setInfo.valueToChange,
		});
	};

	return (
		<div>
			<Link to={`/weeks/${weekId}`}>
				<Typography sx={{ my: 3 }} variant='subtitle1' className>
					{'<'} Back to week {weekId}
				</Typography>
			</Link>
			<Typography variant='h5'>day {dayId}</Typography>
			{program[weekId][dayId].map((movement, i) => (
				<Movement
					handleCompleteSet={handleCompleteSet}
					movement={{ ...movement, index: i }}
					handleChangeRPE={handleChangeRPE}
					handleChangeSetsOrReps={handleChangeSetsOrReps}
				/>
			))}
		</div>
	);
}
