const programReducer = (state, action) => {
	const stateCopy = [...state];

	const actions = {
		completeSet: () => {
			const { week, day, movement, set, isComplete } = action;
			stateCopy[week][day][movement].setsInfo[set].complete = isComplete;
		},
		changeRPE: () => {
			const { week, day, movement, set, rpe } = action;
			stateCopy[week][day][movement].setsInfo[set].rpe = rpe;
		},
		changeSetsOrReps: () => {
			const { week, day, movement, set, valueToChange, value } = action;
			stateCopy[week][day][movement].setsInfo[set][valueToChange] = value;
		},
	};
	if (action.type === 'createNewProgram') {
		localStorage.removeItem('jsCycle_program');
		localStorage.setItem('jsCycle_program', JSON.stringify(action.newProgram));
		console.log('SETTING LS IN REDUCER');
		return action.newProgram;
	}
	actions[action.type](action.set);
	localStorage.removeItem('jsCycle_program');
	localStorage.setItem('jsCycle_program', JSON.stringify(stateCopy));
	console.log('SETTING LS IN REDUCER');

	return stateCopy;
};

export default programReducer;

/*  



*/
