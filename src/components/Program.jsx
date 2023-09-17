import React from 'react';
import Week from './Week';
import { Link } from 'react-router-dom';

export default function Program({ program }) {
	return (
		<div>
			{program.map((week, i) => (
				<Link to={`/weeks/${i}`}>Week {i}</Link>
			))}
		</div>
	);
}
