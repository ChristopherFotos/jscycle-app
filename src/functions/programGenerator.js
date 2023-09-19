// TODO: add intra-week range and ascending/descending of training variables

const programGenerator = (movements, length) => {
	const program = [];

	// Push a bunch of empty weeks into the program to be filled later
	for (let i = 0; i < length; i++) {
		const newWeek = [];
		for (let i = 0; i < 7; i++) {
			// empty day arrays
			newWeek[i] = [];
		}
		program.push(newWeek);
	}

	movements.forEach((movement) => {
		const trainingVariables = {};

		for (const key in movement.progression[0]) {
			trainingVariables[key] = [];
		}

		movement.progression.forEach((progression, i) => {
			for (const key in progression) {
				trainingVariables[key] = [
					...trainingVariables[key],
					...progression[key],
				];
			}
		});

		movement.days.forEach((day) => {
			program.forEach((week, i) => {
				const values = {
					movement: movement.name,
					setsInfo: [],
				};

				for (const key in trainingVariables) {
					values[key] = trainingVariables[key][i];
				}

				for (let j = 0; j < values.sets; j++) {
					values.setsInfo.push({
						number: j,
						complete: false,
						rpe: 1,
						actualWeight: trainingVariables.weight[i],
						actualReps: trainingVariables.reps[i],
					});
				}

				week[day].push(values);
			});
		});
	});

	return program;
};

export default programGenerator;
