import ProgramContext from './context';
import program from './program';
import Program from './components/Program';
import Week from './components/Week';
import { Route, Routes } from 'react-router-dom';
import Day from './components/Day';
import { Container } from '@mui/material';
import { useEffect, useReducer } from 'react';
import programReducer from './reducers/programReducer';
import ProgramEditor from './components/ProgramEditor';
import MenuBar from './components/MenuBar';
import './App.scss';

function App() {
	const [programState, programDispatcher] = useReducer(programReducer, program);

	useEffect(() => {
		if (localStorage.getItem('jsCycle_program')) {
			programDispatcher({
				type: 'createNewProgram',
				newProgram: JSON.parse(localStorage.getItem('jsCycle_program')),
			});
		}
	}, []);

	return (
		<>
			<MenuBar />
			<Container>
				<ProgramContext.Provider value={programState}>
					<div className='App'>
						<Routes>
							<Route
								path='/EditProgram'
								element={
									<ProgramEditor
										programDispatcher={programDispatcher}
										program={program}
									/>
								}
							/>
							<Route path='/' element={<Program program={programState} />} />
							<Route
								path='/weeks/:weekId'
								element={<Week program={programState} />}
							/>
							<Route
								path='/weeks/:weekId/:dayId'
								element={
									<Day
										programDispatcher={programDispatcher}
										program={programState}
									/>
								}
							/>
						</Routes>
					</div>
				</ProgramContext.Provider>
			</Container>
		</>
	);
}

export default App;
