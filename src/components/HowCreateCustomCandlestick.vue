<template>
	<div class="chartMenu">
		<p>How to Create Custom Candlestick</p>
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
	{
		x: new Date('2022-06-01').setHours(0, 0, 0, 0),
		o: 1.25,
		h: 1.35,
		l: 1.0,
		c: 1.1,
		s: [1.25, 1.1],
	},
	{
		x: new Date('2022-06-02').setHours(0, 0, 0, 0),
		o: 1.1,
		h: 1.35,
		l: 1.0,
		c: 1.2,
		s: [1.1, 1.2],
	},
	{
		x: new Date('2022-06-03').setHours(0, 0, 0, 0),
		o: 1.2,
		h: 1.5,
		l: 1.2,
		c: 1.5,
		s: [1.2, 1.5],
	},
	{
		x: new Date('2022-06-04').setHours(0, 0, 0, 0),
		o: 1.5,
		h: 1.8,
		l: 1.2,
		c: 1.4,
		s: [1.5, 1.4],
	},
	{
		x: new Date('2022-06-05').setHours(0, 0, 0, 0),
		o: 1.4,
		h: 2.0,
		l: 1.3,
		c: 1.75,
		s: [1.4, 1.75],
	},
];

const testData = ref({
	// labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	datasets: [
		{
			label: 'Weekly Sales',
			data: data.value,
			backgroundColor: ctx => {
				// console.log('ctx =>', ctx);
				const {
					raw: { o, c },
				} = ctx;
				return c >= o ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 26, 104, 1)';
			},

			// backgroundColor: [
			// 	'rgba(255, 26, 104, 0.2)',
			// 	'rgba(54, 162, 235, 0.2)',
			// 	'rgba(255, 206, 86, 0.2)',
			// 	'rgba(75, 192, 192, 0.2)',
			// 	'rgba(153, 102, 255, 0.2)',
			// 	'rgba(255, 159, 64, 0.2)',
			// 	'rgba(0, 0, 0, 0.2)',
			// ],
			borderColor: ['rgba(0, 0, 0, 1)'],
			borderWidth: 2,
			// Отрисовка границы снизу (закрыть по контуру)
			borderSkipped: false,
		},
	],
});
const options = ref({
	// Разбор своих данных
	parsing: {
		xAxisKey: 'x',
		yAxisKey: 's',
	},
	scales: {
		x: {
			type: 'timeseries',
			time: {
				unit: 'day',
			},
		},
		y: {
			beginAtZero: true,
			// Дополнительный резерв - запас свободного места. 
			grace: '10%'
		},
	},
});
//plugins
const candlestick = {
	id: 'candlestick',
	// до того как будет нарисован набор данных
	beforeDatasetsDraw(chart, args, pluginOptions) {
		const {
			ctx,
			data,
			chartArea: { top, bottom, left, right, width, height },
			scales: { x, y },
		} = chart;
		// сохранение полученных переменных
		ctx.save();

		// толщина линии
		ctx.lineWidth = 2;
		// стиль строки
		ctx.strokeStyle = 'rgba(0, 0, 0, 1)';

		// Создаем цикл для отрисовки всех столбцов
		data.datasets[0].data.forEach((datapoint, index) => {
			// Нарисовать новую фигуру не связанную с другими
			ctx.beginPath();
			// Точки рисования
			// начальная точка -> ctx.moveTo(x, y); chart.getDatasetMeta(0)
			ctx.moveTo(
				chart.getDatasetMeta(0).data[index].x,
				chart.getDatasetMeta(0).data[index].y
			);
			// линия куда рисовать
			// getPixelForValue() -> получить значение пикселей
			ctx.lineTo(
				chart.getDatasetMeta(0).data[index].x,
				y.getPixelForValue(data.datasets[0].data[index].h)
			);
			// рисуем линию
			ctx.stroke();

			// Создаем новый путь
			ctx.beginPath();
			ctx.moveTo(
				chart.getDatasetMeta(0).data[index].x,
				chart.getDatasetMeta(0).data[index].y
			);
			ctx.lineTo(
				chart.getDatasetMeta(0).data[index].x,
				y.getPixelForValue(data.datasets[0].data[index].l)
			);
			ctx.stroke();
		});
	},
};

const plugins = ref([candlestick]);
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
