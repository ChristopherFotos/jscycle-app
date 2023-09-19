const programReducer = (state, action) => {
	const stateCopy = [...state];

	console.log('ACTION: ', action);

	const actions = {
		completeSet: () => {
			const { week, day, movement, set, isComplete } = action;
			stateCopy[week][day][movement].setsInfo[set].complete = isComplete;

			console.log(stateCopy[week][day][movement].setsInfo);
		},
		changeRPE: () => {
			const { week, day, movement, set, rpe } = action;
			stateCopy[week][day][movement].setsInfo[set].rpe = rpe;

			console.log(stateCopy[week][day][movement].setsInfo);
		},
		changeSetsOrReps: () => {
			const { week, day, movement, set, valueToChange, value } = action;
			stateCopy[week][day][movement].setsInfo[set][valueToChange] = value;

			console.log(stateCopy[week][day][movement].setsInfo);
		},
	};
	if (action.type === 'createNewProgram') {
		localStorage.setItem('jsCycle_program', '[]');
		localStorage.setItem('jsCycle_program', JSON.stringify(action.newProgram));
		return action.newProgram;
	}
	actions[action.type](action.set);
	localStorage.setItem('jsCycle_program', '[]');
	localStorage.setItem('jsCycle_program', JSON.stringify(stateCopy));
	return stateCopy;
};

export default programReducer;
