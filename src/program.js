import waveLoading from './functions/waveLoading';
import programGenerator from './functions/programGenerator';

const squat = {
	name: 'squat',
	days: [1, 3, 5],
	progression: waveLoading(
		[
			{
				name: 'weight',
				startingValue: 240,
				increment: 5,
				deloadIncrement: 5,
				max: Infinity,
			},
			{
				name: 'sets',
				startingValue: 3,
				increment: 1,
				deloadIncrement: 1,
				max: Infinity,
			},
			{
				name: 'reps',
				startingValue: 5,
				increment: 1,
				deloadIncrement: 5,
				max: Infinity,
			},
		],
		3,
		4
	),
};

const bench = {
	name: 'bench',
	days: [2, 4, 6],
	progression: waveLoading(
		[
			{
				name: 'weight',
				startingValue: 240,
				increment: 5,
				deloadIncrement: 5,
				max: Infinity,
			},
			{
				name: 'sets',
				startingValue: 3,
				increment: 1,
				deloadIncrement: 1,
				max: Infinity,
			},
			{
				name: 'reps',
				startingValue: 2,
				increment: 5,
				deloadIncrement: 5,
				max: Infinity,
			},
		],
		3,
		4
	),
};

const deadlift = {
	name: 'deadlift',
	days: [2, 4, 6],
	progression: waveLoading(
		[
			{
				name: 'weight',
				startingValue: 240,
				increment: 5,
				deloadIncrement: 5,
				max: Infinity,
			},
			{
				name: 'sets',
				startingValue: 3,
				increment: 1,
				deloadIncrement: 1,
				max: Infinity,
			},
			{
				name: 'reps',
				startingValue: 2,
				increment: 5,
				deloadIncrement: 5,
				max: Infinity,
			},
			{
				name: 'silly noodles',
				startingValue: 2000,
				increment: 100,
				deloadIncrement: 90,
				max: Infinity,
			},
		],
		3,
		4
	),
};

const WORKING_PROGRAM = [squat, bench, deadlift];
const unfilteredProgram = programGenerator([squat, bench, deadlift], 12);

const program = unfilteredProgram.map((week) => {
	return week.filter((day) => day.length > 0);
});

export default program;
