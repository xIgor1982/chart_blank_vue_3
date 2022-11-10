<template>
	<div class="chartMenu">
		<p>Рисуем вертикальные линии по щелчку на точки данных.</p>
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

const data = ref();
const clicked = ref([]);

data.value = [18, 12, 6, 9, 12, 3, 9];

for (let i = 0; i < data.value.length; i++) {
	clicked.value[i] = 0;
}

const testData = ref({
	labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	datasets: [
		{
			label: 'Weekly Sales',
			data: data.value,
			backgroundColor: ['rgba(255, 26, 104, 0.2)'],
			borderColor: ['rgba(255, 26, 104, 1)'],
			// радиус срабатывания при наведении на точку данных
			hitRadius: 10,
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
// Описание <class Line> -> нужны top и bottom

// class Line {
// 	constructor(xCoor) {
// 		this.width = xCoor;
// 	}
// 	draw(ctx) {
// 		//  Удалить настройки по умолчанию
// 		ctx.restore();
// 		// Начинаем новый рисунок
// 		ctx.beginPath();
// 		ctx.lineWidth = 1;
// 		ctx.strokeStyle = 'rgba(102, 102, 102, 0.2)';
// 		// Начало нового рисунка -> ctx.moveTo(x, y);
// 		ctx.moveTo(this.width, top);
// 		// путь линии до
// 		ctx.lineTo(this.width, bottom);
// 		ctx.stroke();
// 		// сохранить текущий рисунок
// 		ctx.save();
// 	}
// }

// clickableLines plugin block
const clickableLines = {
	id: 'clickableLines',
	afterEvent(chart, args, pluginOptions) {
		// console.log(args.event.type);
		const xCursor = args.event.x;
		const yCursor = args.event.y;
		const click = args.event.type;
		if (click === 'click') {
			// console.log(`x = ${xCursor}, y = ${yCursor}`);
			// Получаем x и у - координаты данных графика
			// console.log(chart._metasets[0].data);
			const curData = chart._metasets[0].data;
			for (let i = 0; i < curData.length; i++) {
				// console.log(`curData[${i}] =`, curData[i].x);
				const xMin = curData[i].x - 10;
				const xMax = curData[i].x + 10;
				const yMin = curData[i].y - 10;
				const yMax = curData[i].y + 10;
				// if(xCursor >= xMin && xCursor <= xMax) {
				// 	console.log('xCursor =', xCursor);
				// 	console.log('xMin =', xMin);
				// 	console.log('xMax =', xMax);
				// }
				if (
					xCursor >= xMin &&
					xCursor <= xMax &&
					yCursor >= yMin &&
					yCursor <= yMax
				) {
					console.log('xCursor =', xCursor, '| yCursor =', yCursor);
					clicked.value[i] = clicked.value[i] === 0 ? 1 : 0;
					console.log('clicked.value', clicked.value);
				}
			}
			chart.update();
		}

	},
	beforeDatasetsDraw(chart, args, pluginOptions) {
		const {
			ctx,
			chartArea: { top, bottom },
		} = chart;

		class Line {
			constructor(xCoor) {
				this.width = xCoor;
			}
			draw(ctx) {
				//  Удалить настройки по умолчанию
				ctx.restore();
				// Начинаем новый рисунок
				ctx.beginPath();
				ctx.lineWidth = 3;
				ctx.setLineDash([6, 6]);
				ctx.strokeStyle = 'rgba(102, 102, 102, 0.2)';
				// ctx.strokeStyle = 'red';
				// Начало нового рисунка -> ctx.moveTo(x, y);
				ctx.moveTo(this.width, top);
				// путь линии до
				ctx.lineTo(this.width, bottom);
				ctx.stroke();
				// сохранить текущий рисунок
				ctx.save();
				ctx.setLineDash([]);
			}
		}

		for (let i = 0; i < clicked.value.length; i++) {
			if (clicked.value[i] == 1) {
				let drawLine = new Line(chart._metasets[0].data[i].x);
				drawLine.draw(ctx);
			}
		}
	},
};

const plugins = ref([clickableLines]);
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
</style>
