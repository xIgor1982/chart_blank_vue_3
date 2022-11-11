<template>
	<div class="chartMenu">
		<p>
			Как отобразить данные по щелчку в строках таблицы из двух диаграмм в Chart
			JS
		</p>
	</div>
	<div class="chartCard">
		<div class="chartBox">
			<BarChart :chartData="testData" :options="options" :plugins="plugins" />
			<LineChart
				:chartData="testData2"
				:options="options2"
				:plugins="plugins2"
			/>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { BarChart, LineChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

// график 1
const data = ref();

data.value = [18, 12, 6, 9, 12, 3, 9];

const testData = ref({
	labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
		},
	],
});
const options = ref({
	scales: {
		y: {
			beginAtZero: true,
		},
	},
});
const plugins = ref({});

// график 2
const data2 = ref();

data2.value = [3, 4, 2, 5, 6, 1, 7];

const testData2 = ref({
	labels: ['A', 'B', 'C', 'D', 'I', 'F', 'G'],
	datasets: [
		{
			label: 'Weekly Sales',
			data: data2.value,
			backgroundColor: ['rgba(255, 26, 104, 0.2)'],
			borderColor: ['rgba(255, 26, 104, 1)'],
		},
	],
});
const options2 = ref({
	scales: {
		y: {
			beginAtZero: true,
		},
	},
});
const plugins2 = ref({});
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
	width: 25%;
	/* height: 70%; */
	padding: 20px;
	border-radius: 20px;
	border: solid 3px rgba(255, 26, 104, 1);
	background: white;
}
</style>
