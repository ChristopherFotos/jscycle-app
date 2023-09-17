// TODO: add intra-week range ascending/descending of training variables

const waveLoading = (trainingVariables, programLength, blockLength) => {
	const blocks = [];

	for (let block = 0; block <= programLength - 1; block++) {
		const firstWeek = {};

		trainingVariables.forEach((trainingVariable) => {
			const { name, startingValue, deloadIncrement } = trainingVariable;

			firstWeek[name] = [startingValue + deloadIncrement * block];
		});

		blocks.push(firstWeek);

		for (let week = 0; week <= blockLength - 2; week++) {
			trainingVariables.forEach((trainingVariable) => {
				const { name, max, increment } = trainingVariable;

				let newValue = blocks[block][name][0] + increment * (week + 1);
				newValue < max
					? blocks[block][name].push(newValue)
					: blocks[block][name].push(max);
			});

			// let newWeight = blocks[block].weights[0] + weightIncrement * (week + 1);
			// newWeight < maxWeight
			// 	? blocks[block].weights.push(newWeight)
			// 	: blocks[block].weights.push(maxWeight);

			// let newSet = blocks[block].sets[0] + setsIncrement * (week + 1);
			// newSet < maxSets
			// 	? blocks[block].sets.push(newSet)
			// 	: blocks[block].sets.push(maxSets);

			// let newRep = blocks[block].reps[0] + repsIncrement * (week + 1);
			// newRep < maxReps
			// 	? blocks[block].reps.push(newRep)
			// 	: blocks[block].reps.push(maxReps);
		}
	}

	return blocks;
};

export default waveLoading;
