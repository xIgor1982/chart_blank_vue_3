<template>
	<div class="chartMenu">
		<p>WWW.CHARTJS3.COM (Chart JS 3.9.1)</p>
	</div>
	<div class="chartCard">
		<div class="chartBox">
			<BarChart :chartData="testData" :options="options" :plugins="plugins" />
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const data = ref();

data.value = [
	{x: ['2022-11-03', '2022-11-06'], y: 'Задача 1', name: 'James'},
	{x: ['2022-11-06', '2022-11-12'], y: 'Задача 2', name: 'Luna'},
	{x: ['2022-11-09', '2022-11-12'], y: 'Задача 3', name: 'Dvid'},
	{x: ['2022-11-12', '2022-11-21'], y: 'Задача 4', name: 'Lily'},
	{x: ['2022-11-15', '2022-11-24'], y: 'Задача 5', name: 'Santiago'},
	{x: ['2022-11-18', '2022-11-29'], y: 'Задача 6', name: 'James'},
];

const testData = ref({
	// labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	datasets: [
		{
			label: 'Weekly Sales',
			data: data.value,
			backgroundColor: [
				'rgba(255, 26, 104, 0.2)',
				'rgba(54, 162, 235, 0.2)',
				'rgba(255, 206, 86, 0.2)',
				'rgba(75, 192, 192, 0.2)',
				'rgba(153, 102, 255, 0.2)',
				'rgba(255, 159, 64, 0.2)',
				'rgba(0, 0, 0, 0.2)',
			],
			borderColor: [
				'rgba(255, 26, 104, 1)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(75, 192, 192, 1)',
				'rgba(153, 102, 255, 1)',
				'rgba(255, 159, 64, 1)',
				'rgba(0, 0, 0, 1)',
			],
			borderWidth: 1,
			borderSkipped: false,
			borderRadius: 5,
			barPercentage: 0.5
		},
	],
});
const options = ref({
	layout: {
		padding: {
			left: 100,
		},
	},
	indexAxis: 'y',
	scales: {
		x: {
			position: 'top',
			type: 'time',
			time: {
				unit: 'day'
			},
			min: '2022-11-01',
			max: '2022-11-30'
		},
	},
	plugins: {
		legend: {
			display: false,
		}
	}
});

// todayLine plugin block
const todayLine = {
	id: 'todayLine',
	afterDatasetsDraw(chart, args, pligunOptions){
		const {ctx, data, chartArea:{top, bottom, left, right}, scales: {x, y}} = chart;

		ctx.save();

		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.strokeStyle = 'rgba(255, 26, 104, 1)';
		ctx.setLineDash([10,10]);
		// ctx.moveTo(x, y);
		ctx.moveTo(x.getPixelForValue(new Date()), top);
		ctx.lineTo(x.getPixelForValue(new Date()), bottom);
		ctx.stroke();

		// Еще раз переопределяем линию, что бы она не распространялась на другие элементы графика
		ctx.setLineDash([]);

	}
}
// assignedTasks plugin block
const assignedTasks = {
	id: 'assignedTasks',
	afterDatasetsDraw(chart, args, pligunOptions){
		const {ctx, data, chartArea:{top, bottom, left, right}, scales: {x, y}} = chart;
	
		ctx.font = 'bolder 12px sans-serif';
		ctx.fillStyle='black';
		ctx.textBaseline = 'middle';
		// ctx.fillText(text, x, y);
		// ctx.fillText(data.datasets[0].data[0].name, 10, y.getPixelForValue(0));
		data.datasets[0].data.forEach((datapoint, index) => {
			ctx.fillText(datapoint.name, 10, y.getPixelForValue(index));
		});
	}
}

const plugins = ref([todayLine, assignedTasks]);
</script>

<style scope>
* {
	margin: 0;
	padding: 0;
	font-family: sans-serif;
}
.chartMenu {
	width: 100vw;
	height: 5%;
	background: #1a1a1a;
	color: rgba(255, 26, 104, 1);
}
.chartMenu p {
	padding: 10px;
	font-size: 20px;
}
.chartCard {
	width: 100vw;
	height: calc(100vh - 40px);
	background: rgba(255, 26, 104, 0.2);
	display: flex;
	align-items: center;
	justify-content: center;
}
.chartBox {
	width: 90%;
	padding: 20px;
	border-radius: 20px;
	border: solid 3px rgba(255, 26, 104, 1);
	background: white;
}
</style>
