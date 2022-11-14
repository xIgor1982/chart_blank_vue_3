<template>
	<div class="chartMenu">
		<p>
			Получаем координаты по щелчку мыши в диаграмме JS и выводим данные о
			графике в таблице
		</p>
	</div>
	<div class="chartCard">
		<div class="chartBox">
			<BarChart :chartData="testData" :options="options" :plugins="plugins" />
			<table class="table">
				<thead>
					<tr>
						<th>Label</th>
						<th>Value</th>
					</tr>
				</thead>
				<tbody>
					<td>...</td>
					<td>...</td>
				</tbody>
			</table>
			<div>
				<p>xCoord = {{ xCoord }}</p>
				<p>yCoord = {{ yCoord }}</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const data = ref();
const xCoord = ref(0);
const yCoord = ref(0);

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

const clickChartCoord = {
	id: 'clickChartCoord',
	afterEvent(chart, args, pluginOptions) {
		// получаем координаты х и у при движении курсора над графиком
		const xCursor = args.event.x;
		const yCursor = args.event.y;
		// Получаем тип события
		const click = args.event.type;
		if (click === 'click') {
			xCoord.value = xCursor;
			yCoord.value = yCursor;
			// Получить данные графика
			const curData = chart._metasets[0];
			console.log('curData');
			console.dir(curData);
		}
	},
};

const plugins = ref([clickChartCoord]);
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
	width: 80%;
	padding: 20px;
	border-radius: 20px;
	border: solid 3px rgba(255, 26, 104, 1);
	background: white;
}
.table {
	width: 100%;
	margin-top: 30px;
	margin-bottom: 30px;
}

.table,
.table tr,
.table th,
.table td {
	padding: 10px;
	border: 1px solid black;
	border-collapse: collapse;
}
</style>
