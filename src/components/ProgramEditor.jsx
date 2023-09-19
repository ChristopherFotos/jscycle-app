import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MovementEditor from './MovementEditor';
import programGenerator from '../functions/programGenerator';
import waveLoading from '../functions/waveLoading';
import { Typography, Fab, Button } from '@mui/material';

export default function ProgramEditor({ programDispatcher }) {
	const [movements, setMovements] = useState([]);
	const [lengths, setLengths] = useState({ cycleLength: 4, cycles: 3 });

	const handleAddMovement = () => {
		setMovements([
			...movements,
			{
				name: 'bench press',
				days: [1, 3, 5],
				progression: [
					{
						name: 'weight',
						startingValue: 240,
						increment: 5,
						deloadIncrement: 5,
						max: Infinity,
					},
					{
						name: 'sets',
						startingValue: 3,
						increment: 1,
						deloadIncrement: 1,
						max: Infinity,
					},
					{
						name: 'reps',
						startingValue: 3,
						increment: 1,
						deloadIncrement: 1,
						max: Infinity,
					},
				],
			},
		]);
	};

	const handleChangeMovementProperties = (e, info) => {
		const stateCopy = [...movements];
		const { index, property } = info;

		stateCopy[index][property] = e.target.value;

		setMovements(stateCopy);
	};

	const handleChangeProgressionProperties = (e, info) => {
		const stateCopy = [...movements];
		const { index, property, progressionIndex } = info;

		stateCopy[index].progression[progressionIndex][property] = parseFloat(
			e.target.value
		);

		setMovements(stateCopy);
	};

	const handleChangeMovementDays = (e, info) => {
		const stateCopy = [...movements];
		const { index, day } = info;
		const isChecked = e.target.checked;
		let { days } = stateCopy[index];

		isChecked
			? stateCopy[index].days.push(day)
			: (stateCopy[index].days = stateCopy[index].days.filter(
					(d) => d !== day
			  ));

		days.sort();

		setMovements(stateCopy);
	};

	const generateProgram = () => {
		const processedMovements = movements.map((m) => {
			const copy = { ...m };
			copy.progression = waveLoading(
				copy.progression,
				lengths.cycles,
				lengths.cycleLength
			);
			return copy;
		});

		const newProgram = programGenerator(
			processedMovements,
			lengths.cycles * lengths.cycleLength
		);

		return newProgram.map((week) => {
			return week.filter((day) => day.length > 0);
		});
	};

	return (
		<div>
			<Typography variant='body1'>
				<Link to='/program'>Go to active program</Link>
			</Typography>
			{movements.map((m, i) => (
				<MovementEditor
					handleChangeMovementProperties={handleChangeMovementProperties}
					handleChangeProgressionProperties={handleChangeProgressionProperties}
					handleChangeMovementDays={handleChangeMovementDays}
					movement={m}
					index={i}
				/>
			))}
			<Button
				sx={{ width: '100%', height: '3rem' }}
				variant='contained'
				size='large'
				disabled={movements.length < 1}
				onClick={() => {
					programDispatcher({
						type: 'createNewProgram',
						newProgram: generateProgram(),
					});
				}}>
				{movements.length
					? 'Generate Program'
					: 'Add a movement to get started'}
			</Button>
			<Fab
				sx={{
					position: 'absolute',
					bottom: 20,
					right: 20,
				}}
				onClick={handleAddMovement}>
				Add
			</Fab>
		</div>
	);
}
