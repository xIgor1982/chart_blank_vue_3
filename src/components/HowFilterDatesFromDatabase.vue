<template>
	<div class="chartMenu">
		<p>How to Filter Dates from PHP MYSQL Database to Javascript to Chart JS</p>
	</div>
	<div class="chartCard">
		<div class="chartBox">
			<input
				class="input"
				type="date"
				:value="itemValue1"
				:min="DATE_MIN_VALUE"
				:max="DATE_MAX_VALUE"
				:onchange="startDateFilter"
			/>
			<input
				class="input"
				type="date"
				:value="itemValue2"
				:min="DATE_MIN_VALUE"
				:max="DATE_MAX_VALUE"
				:onchange="endDateFilter"
			/>
			<BarChart :chartData="testData" :options="options" :plugins="plugins" />
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables);

const dateMonth = [
	'2022-04-01',
	'2022-04-02',
	'2022-04-03',
	'2022-04-04',
	'2022-04-05',
	'2022-04-06',
	'2022-04-07',
	'2022-04-08',
	'2022-04-09',
	'2022-04-10',
	'2022-04-11',
	'2022-04-12',
	'2022-04-13',
	'2022-04-14',
	'2022-04-15',
	'2022-04-16',
	'2022-04-17',
	'2022-04-18',
	'2022-04-19',
	'2022-04-20',
	'2022-04-21',
	'2022-04-22',
	'2022-04-23',
	'2022-04-24',
	'2022-04-25',
	'2022-04-26',
	'2022-04-27',
	'2022-04-28',
	'2022-04-29',
	'2022-04-30',
];

const DATE_MIN_VALUE = '2022-04-01';
const DATE_MAX_VALUE = '2022-04-30';

const itemValue1 = ref(DATE_MIN_VALUE);
const itemValue2 = ref(DATE_MAX_VALUE);

const data = ref();
data.value = [
	10.55, 11.1, 11.15, 9.5, 10.12, 11.11, 11.55, 10.0, 10.7, 10.75, 11.0, 11.05,
	11.1, 10.9, 10.95, 11.05, 11.1, 11.11, 11.16, 10.56, 10.59, 11.06, 11.08,
	11.09, 12.0, 10.55, 11.05, 12.05, 13, 11.45,
];

const startDateFilter = item => {
	itemValue1.value = item.target.value;
	if (itemValue2.value < itemValue1.value) {
		itemValue2.value = item.target.value;
	}
	console.log(`itemValue1.value =>`, itemValue1.value);
};

const endDateFilter = item => {
	itemValue2.value = item.target.value;
	if (itemValue1.value > itemValue2.value) {
		itemValue1.value = item.target.value;
	}
	console.log(`itemValue2.value =>`, itemValue2.value);
};

const dateChartJS = dateMonth.map((day, index) => {
	// console.log(`day = ${day}, index = ${index}`);
	const dayjs = new Date(day);
	// console.log(`dayjs = ${dayjs}`);
	return dayjs.setHours(0, 0, 0, 0);
});

// console.log(`data =`, data.value);

const testData = ref({
	labels: dateChartJS,
	datasets: [
		{
			label: 'Weekly Sales',
			data: data.value,
			backgroundColor: ['rgba(255, 26, 104, 0.2)'],
			borderColor: ['rgba(255, 26, 104, 1)'],
			borderWidth: 1,
		},
	],
});
const options = ref({
	scales: {
		// отключение авто-пропуска
		// autoSkip: false,
		x: {
			min: itemValue1.value,
			max: itemValue2.value,
			type: 'time',
			time: {
				unit: 'day',
			},
		},
		y: {
			beginAtZero: true,
		},
	},
});

const updateChart = {
	id: 'updateChart',
	beforeDraw(chart, args, options) {
		const { ctx } = chart;
		chart.config.options.scales.x.min = itemValue1.value;
		chart.config.options.scales.x.max = itemValue2.value;
		chart.update();
	},
};

const plugins = ref([updateChart]);
</script>

<style scope>
* {
	margin: 0;
	padding: 0;
	font-family: sans-serif;
}
.chartMenu {
	width: 100vw;
	height: 40px;
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
	width: 80%;
	padding: 20px;
	border-radius: 20px;
	border: solid 3px rgba(255, 26, 104, 1);
	background: white;
}

.input {
	border: 2px solid black;
	border-radius: 5px;
	padding: 2px 5px;
	margin: 2px 5px;
}
</style>
