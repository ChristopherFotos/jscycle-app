import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { faker } from '@faker-js/faker';
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
	cubicInterpolationMode: 'default',
	// maintainAspectRatio: false,
	responsive: true,
	plugins: {
		legend: {
			position: 'top',
		},
		title: {
			display: true,
			text: 'Chart.js Line Chart',
		},
	},
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
