import { set, get } from 'idb-keyval';

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
		set('jsCycle_program', action.newProgram)
			.then((e) => console.log('Program updated successfuly', e))
			.catch((e) => console.warn('Error while updating program', e));
		return action.newProgram;
	}
	actions[action.type](action.set);
	set('jsCycle_program', stateCopy)
		.then((e) => console.log('Program updated successfuly', e))
		.catch((e) => console.warn('Error while updating program', e));

	return stateCopy;
};

export default programReducer;

/*  



*/
