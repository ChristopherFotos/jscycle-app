import React from 'react';
import Day from './Day';
import { useContext } from 'react';
import ProgramContext from '../context';
import { Link, useParams, Routes, Route } from 'react-router-dom';

export default function Week() {
	let { weekId } = useParams();
	const program = useContext(ProgramContext);

	console.log('weekId: ', weekId);
	return (
		<div>
			<h3>Week {weekId}</h3>
			{program[weekId].map((day, i) => (
				<div>
					<Link to={`/weeks/${weekId}/days/${i}`}>Day {i}</Link>
					<Routes>
						<Route
							path='weeks/:weekId/days'
							element={<Day program={program} />}
						/>
					</Routes>
				</div>
			))}
		</div>
	);
}
