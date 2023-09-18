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
		}
	}

	return blocks;
};

export default waveLoading;
