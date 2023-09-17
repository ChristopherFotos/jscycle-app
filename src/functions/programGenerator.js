// TODO: add intra-week range and ascending/descending of training variables

const programGenerator = (movements, length) => {
	const program = [];

	// Push a bunch of empty weeks into the program to be filled later
	for (let i = 0; i < length; i++) {
		const newWeek = [];
		for (let i = 0; i < 7; i++) {
			newWeek[i] = [];
		}
		program.push(newWeek);
	}

	movements.forEach((movement) => {
		// will need to make a 2D array here...
		const trainingVariables = {};
		for (const key in movement.progression[0]) {
			trainingVariables[key] = [];
		}

		movement.progression.forEach((progression, i) => {
			// ...and iterate through it here
			for (const key in progression) {
				trainingVariables[key] = [
					...trainingVariables[key],
					...progression[key],
				];
			}

			// weights = [...weights, ...progression.weights];
			// sets = [...sets, ...progression.sets];
			// reps = [...reps, ...progression.reps];
		});

		movement.days.forEach((day) => {
			program.forEach((week, i) => {
				const values = {
					movement: movement.name,
					// weight: weights[i],
					// sets: sets[i],
					// reps: reps[i],
				};

				for (const key in trainingVariables) {
					values[key] = trainingVariables[key][i];
				}

				week[day].push(values);
			});
		});
	});

	return program;
};

export default programGenerator;
