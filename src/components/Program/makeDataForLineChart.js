import _ from 'lodash';

const makeDataForLineChart = (program) => {
	const flattenedProgram = _.flatten(program);
	const dataForLineChart = {};
	const microcycleLength = program[0].length;

	flattenedProgram.forEach((day, i) => {
		if ((i % microcycleLength) - 1) return; // show weekly data instead of daily
		day.forEach((m) => {
			if (dataForLineChart[m.movement]) {
				dataForLineChart[m.movement].weight.push(m.weight);
				dataForLineChart[m.movement].sets.push(m.sets);
				dataForLineChart[m.movement].reps.push(m.reps);
				return;
			}

			dataForLineChart[m.movement] = {};
			dataForLineChart[m.movement].weight = [m.weight];
			dataForLineChart[m.movement].sets = [m.sets];
			dataForLineChart[m.movement].reps = [m.reps];
		});
	});

	return dataForLineChart;
};

const makeRandomColors = () => ({
	rgba: `rgba(${_.random(0, 255, false)}, ${_.random(
		0,
		255,
		false
	)}, ${_.random(0, 255, false)}, 0.5)`,

	rgb: `rgba(${_.random(0, 255, false)}, ${_.random(0, 255, false)}, ${_.random(
		0,
		255,
		false
	)})`,
});

export function makeLabels(dataForLineChart) {
	const dataLength =
		dataForLineChart[Object.keys(dataForLineChart)[0]].weight.length;

	let labels = [];
	for (let i = 0; i < dataLength; i++) {
		labels.push(i.toString());
	}

	return labels;
}

export function makeLabeledData(labels, dataForLineChart, filters) {
	const labeledData = {
		labels,
		datasets: [],
	};

	console.log(
		'LABELS: ',
		labels,
		'DfLC: ',
		dataForLineChart,
		'FILTERS: ',
		filters
	);

	filters.movements.forEach((movement) => {
		filters.trainingVariables.forEach((tv) => {
			if (!dataForLineChart[movement]) return;
			console.log(
				'MOVEMENT: ',
				movement,
				'TV: ',
				tv,
				'COMBINED:',
				dataForLineChart[movement][tv]
			);
			labeledData.datasets.push({
				label: `${movement} ${tv}`,
				data: dataForLineChart[movement][tv],
				borderColor: makeRandomColors().rgb,
				backgroundColor: makeRandomColors().rgba,
			});
		});
	});

	console.log('LABLED', labeledData);

	return labeledData;
}

export default makeDataForLineChart;
