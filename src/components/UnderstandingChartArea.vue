<template>
	<div class="chartMenu">
		<p>WWW.CHARTJS3.COM (Chart JS 3.9.1)</p>
	</div>
	<div class="chartCard">
		<div class="chartBox">
			<BarChart
				ref="$myChart"
				:chartData="testData"
				:options="options"
				:plugins="plugins"
			/>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const data = ref([18, 12, 6, 9, 12, 3, 9]);
const $myChart = ref(null);

// chartAreaPlugin
const chartAreaPlugin = {
	id: 'chartAreaPlugin',
	//до рисования графика (за графиком)
	beforeDraw(chart, args, options) {
		const {
			ctx,
			chartArea: { top, bottom, left, right, width, height },
		} = chart;
		ctx.save();

		// изменяем фон (половну - левую часть)
		ctx.fillStyle = 'Lavender';
		ctx.fillRect(left, top, width / 2, height);

		// изменяем фон (вторую половну - правую часть часть)
		ctx.fillStyle = 'AntiqueWhite';
		const startTwoColor = width / 2 + left;
		ctx.fillRect(startTwoColor, top, width / 2, height);
	},
	//после рисования графика
	afterDraw(chart, args, options) {
		const {
			ctx,
			chartArea: { top, bottom, left, right, width, height },
		} = chart;
		ctx.save();

		console.log(
			`top = ${top}, bottom = ${bottom}, left = ${left}, right = ${right}, width = ${width}, height= ${height}`
		);
		// Сохранить текущие значения на холсте, что бы можно было их изменять
		ctx.fillStyle = 'black';
		// ctx.fillRect(x, y, width, height)
		ctx.fillRect(10, 10, 10, 10);
	},
};

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
const plugins = ref([chartAreaPlugin]);

// onMounted(() => {
// 	console.log('$myChart =>');
// 	console.table($myChart.value.chartInstance.chartArea);
// });
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
</style>
