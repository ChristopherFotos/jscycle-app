import React from 'react';
import { useContext } from 'react';
import ProgramContext from '../context';
import { useParams } from 'react-router-dom';

export default function Day({ day, dayNumber }) {
	let { dayId } = useParams();
	const program = useContext(ProgramContext);

	const makeTrainingVariablesArray = (movement) => {
		const trainingVariableNames = Object.keys(movement);
		trainingVariableNames.shift();

		const trainingVariableArray = trainingVariableNames.map((name, i) => {
			return { name: name, value: movement[name] };
		});

		return trainingVariableArray;
	};

	return (
		<div>
			<h1>HIHFEIUD</h1>
			<h5>day {dayId}</h5>
			{day.map((movement, i) => (
				<div>
					<h6>{movement.movement}</h6>
					{makeTrainingVariablesArray(movement).map((tv) => (
						<div>
							<p>{tv.name}</p>
							<p>{tv.value}</p>
						</div>
					))}
				</div>
			))}
		</div>
	);
}
