<template>
	<div class="chartMenu">
		<p>Создание горизонтальной полосы с текстом</p>
	</div>
	<div class="chartCard">
		<div class="chartBox">
			<LineChart :chartData="testData" :options="options" :plugins="plugins" />
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const data = ref([18, 12, 6, 9, 12, 3, 9]);

const testData = ref({
	labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	datasets: [
		{
			label: 'Weekly Sales',
			data: data.value,
			backgroundColor: 'rgba(255, 26, 104, 0.2)',
			borderColor: ['rgba(255, 26, 104, 1)'],
			tension: 0.4,
		},
	],
});
const options = ref({
	scales: {
		y: {
			beginAtZero: true,
		},
	},
	// создаем плагин для передачи данных в основной плагин
	plugins: {
		successTracker: {
			successLineColor: 'green',
			successBackgroundColor: `rgba(0, 200, 0, 0.2)`,
			successFontSize: 24,
			successText: 'Success Tracker Line'
		},
	},
});

const successTracker = {
	id: 'successTracker',
	// До рисования (сзади за графиком)
	beforeDraw(chart, args, options) {
	// После рисования
	// afterDraw(chart, args, options) {
		const {
			ctx,
			chartArea: { top, right, bottom, left, width, height },
			scales: { x, y },
		} = chart;
		// сохранение переменных
		ctx.save();

		// ----> success Line
		// 1 вариант - пишем здесь цвет.
		// ctx.strokeStyle = 'green';
		// 2 вариант - задаем цвет через параметр опции
		ctx.strokeStyle = options.successLineColor;
		// ctx.strokeRect(x0, y0, x1, y1);
		// getPixelForValue - получить индекс точки
		ctx.strokeRect(left, y.getPixelForValue(12), width, 0);
		// восстановление или сброс настроек для того, что бы в дальнейшем можно было переиспользовать свойства
		ctx.restore();

		// ----> success Background
		// заливка
		ctx.fillStyle = options.successBackgroundColor;
		// ctx.fillRect(left, y0, width, y1);
		ctx.fillRect(
			left,
			top,
			width,
			y.getPixelForValue(12) - top
		);
		ctx.restore();

		// success Text
		ctx.font = `${options.successFontSize}px Arial`;
		ctx.fillStyle = options.successLineColor;
		// ctx.fillText('text', xposition, yposition);
		ctx.fillText(
			options.successText,
			width / 2 + left,
			y.getPixelForValue(12) - options.successFontSize
		);
		ctx.textAlign = 'center';
		ctx.restore();
	},
};

const plugins = ref([successTracker]);
</script>

<style scope>
* {
	margin: 0;
	padding: 0;
	font-family: sans-serif;
}
.chartMenu {
	width: 100vw;
	height: 50px;
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
