import './App.css';
import ProgramContext from './context';
import { useState } from 'react';
import program from './program';
import Program from './components/Program';
import Week from './components/Week';
import { Link, Route, Routes } from 'react-router-dom';
import Day from './components/Day';

function App() {
	console.log(program);
	return (
		<ProgramContext.Provider value={program}>
			<div className='App'>
				<Link to='/'>
					<h1>bleep bloop</h1>
				</Link>
				<Routes>
					<Route path='/' element={<Program program={program} />} />
					<Route path='/weeks'>
						<Route path=':weekId' element={<Week />}></Route>
					</Route>
				</Routes>
			</div>
		</ProgramContext.Provider>
	);
}

export default App;
