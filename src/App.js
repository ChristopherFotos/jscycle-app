import ProgramContext from './context';
import program from './program';
import Program from './components/Program';
import Week from './components/Week';
import { Link, Route, Routes } from 'react-router-dom';
import Day from './components/Day';
import { Container, Typography, Paper } from '@mui/material';
import { useReducer } from 'react';
import programReducer from './reducers/programReducer';

import './App.scss';

function App() {
	const [programState, programDispatcher] = useReducer(programReducer, program);

	return (
		<Container>
			<ProgramContext.Provider value={program}>
				<div className='App'>
					<Routes>
						<Route path='/' element={<Program program={program} />} />
						<Route path='/:weekId' element={<Week program={program} />} />
						<Route
							path='/:weekId/:dayId'
							element={
								<Day programDispatcher={programDispatcher} program={program} />
							}
						/>
						sx
					</Routes>
				</div>
			</ProgramContext.Provider>
		</Container>
	);
}

export default App;
