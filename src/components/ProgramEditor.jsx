import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MovementEditor from './MovementEditor';
import programGenerator from '../functions/programGenerator';
import waveLoading from '../functions/waveLoading';
import { Typography, TextField, Fab, Button, Snackbar } from '@mui/material';

export default function ProgramEditor({ programDispatcher }) {
	const [movements, setMovements] = useState([]);
	const [lengths, setLengths] = useState({ cycleLength: 4, cycles: 3 });
	const [snackbarIsOpen, setSnackbarIsOpen] = useState(false);

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setSnackbarIsOpen(false);
	};

	useEffect(() => {
		if (localStorage.getItem('jsCycle_program-seed')) {
			setMovements(JSON.parse(localStorage.getItem('jsCycle_program-seed')));
		}
	}, []);

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

	const handleRemoveMovement = (index) => {
		const stateCopy = [...movements];
		stateCopy.splice(index, 1);
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

	const handleSubmit = () => {
		setSnackbarIsOpen(true);
		programDispatcher({
			type: 'createNewProgram',
			newProgram: generateProgram(),
		});

		localStorage.setItem('jsCycle_program-seed', JSON.stringify(movements));
		console.log('SETTING LS IN PROGRAM EDITOR');
	};

	return (
		<div>
			<Typography sx={{ mt: 2 }} variant='h3'>
				Program editor
			</Typography>
			<Typography sx={{ mt: 2 }} variant='body1'>
				How long will your program be?
			</Typography>
			<TextField
				sx={{ my: 4, mx: 1 }}
				type='number'
				inputProps={{ inputMode: 'numeric' }}
				onChange={(e) =>
					setLengths({ ...lengths, cycleLength: e.target.value })
				}
				label='Microcycle length'
				value={lengths.cycleLength}
			/>
			<TextField
				sx={{ my: 4, mx: 1 }}
				type='number'
				inputProps={{ inputMode: 'numeric' }}
				onChange={(e) => setLengths({ ...lengths, cycles: e.target.value })}
				label='Number of cycles'
				value={lengths.cycles}
			/>
			<Typography sx={{ mt: 2 }} variant='body1'>
				What movements will you be doing?
			</Typography>
			{movements.map((m, i) => (
				<MovementEditor
					handleRemoveMovement={handleRemoveMovement}
					handleChangeMovementProperties={handleChangeMovementProperties}
					handleChangeProgressionProperties={handleChangeProgressionProperties}
					handleChangeMovementDays={handleChangeMovementDays}
					movement={m}
					index={i}
				/>
			))}
			<Button
				sx={{ width: '100%', height: '3rem', my: '1rem' }}
				variant='contained'
				size='large'
				disabled={movements.length < 1}
				onClick={handleSubmit}>
				{movements.length
					? 'Generate Program'
					: 'Add a movement to get started'}
			</Button>
			<Fab
				sx={{
					position: 'sticky',
					bottom: 2,
					backgroundColor: '#ff8d22',
					left: 2,
				}}
				onClick={handleAddMovement}>
				Add
			</Fab>
			<Snackbar
				open={snackbarIsOpen}
				autoHideDuration={2000}
				onClose={handleSnackbarClose}
				message='Your program has been updated!'
			/>
		</div>
	);
}
