import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	List,
	ListItemButton,
	Button,
	Accordion,
	AccordionSummary,
	Typography,
	AccordionDetails,
} from '@mui/material';
import _ from 'lodash';
import { Line } from 'react-chartjs-2';
import '../../App.scss';
import { options, data } from '../../LineChart';
import programGenerator from '../../functions/programGenerator';
import { borderColor } from '@mui/system';
import makeDataForLineChart, {
	makeLabels,
	makeLabeledData,
} from './makeDataForLineChart';

export default function Program({ program }) {
	const [lineChartData, setLineChartData] = useState({});
	const [filters, setFilters] = useState({
		trainingVariables: ['reps', 'sets', 'weight'],
		movements: [],
	});
	const [activeFilters, setActiveFilters] = useState({
		trainingVariables: ['sets', 'reps'],
		movements: ['bench', 'squat'],
	});

	useEffect(() => {
		const dataForLineChart = makeDataForLineChart(program);
		console.log('LCD', dataForLineChart);
		setFilters({ ...filters, movements: Object.keys(dataForLineChart) });
		setLineChartData(
			makeLabeledData(
				makeLabels(dataForLineChart),
				dataForLineChart,
				activeFilters
			)
		);
	}, [program, activeFilters]);

	return (
		<div className='weeks'>
			<Accordion sx={{ my: '3' }}>
				<AccordionSummary>
					<Typography>Weeks</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<List className='program__week-list'>
						{program.map((week, i) => (
							<ListItemButton divider className='program__week' key={week + i}>
								<Link to={`/weeks/${i}`}>
									<p className='program__btn-text'>Week {i}</p>
								</Link>
							</ListItemButton>
						))}
					</List>
				</AccordionDetails>
			</Accordion>
			{Object.keys(lineChartData).length > 0 && (
				<Line options={options} data={lineChartData} height={200} width={100} />
			)}
			<Typography>Filter by movement:</Typography>
			{filters.movements.map((k) => (
				<Button variant='outlined' sx={{ m: 1 }}>
					{k}
				</Button>
			))}
			<Typography>Filter by training variable:</Typography>

			{filters.trainingVariables.map((k) => (
				<Button variant='outlined' sx={{ m: 1 }}>
					{k}
				</Button>
			))}
			<Link to={`/EditProgram`}>
				<Button sx={{ my: 3, display: 'block' }} variant='contained'>
					Create a new program
				</Button>
			</Link>
		</div>
	);
}
