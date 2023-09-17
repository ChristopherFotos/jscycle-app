import '../App.css';

import program from '../program';
import Week from './Week';

function Root() {
	console.log(program);
	return (
		<div className='App'>
			{program.map((week, i) => (
				<Week week={week} weekNumber={i}></Week>
			))}
		</div>
	);
}

export default Root;
