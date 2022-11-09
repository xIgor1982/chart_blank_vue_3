<template>
	<div class="chartMenu">
		<p>Как создать прокручиваемую горизонтальную гистограмму с фиксированным масштабом X</p>
	</div>
	<div class="chartCard">
		<div class="chartBox">
			<div class='scrollBox'>
				<!-- <div class='scrollBoxBody'>	 -->
				<div :style='styleHeight'>		
					<BarChart :chartData="testData" :options="options" :plugins="plugins" />
				</div>
			</div>
			<div class='boxBarChart'>
				<BarChart :chartData="testData2" :options="options2" :plugins="plugins2" height='45' />
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
const blanckHeight = (h) => `height: ${h}px;`

const layoutPdR = 5;
const contextWidth = ref(30)
const styleHeight = ref(blanckHeight(565));

// 1 график
const data = ref();

data.value = [18, 12, 6, 9, 12, 3, 9, 18, 12, 6, 9, 12, 3, 9, 18, 12, 6, 9, 12, 3, 9, ];
styleHeight.value = blanckHeight(55 * data.value.length)


const testData = ref({
	labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
	// Сохранение сторон (не работает с vuetify)
	maintainAspectRatio: false,
	// настраиваем отступы внутри макета
	layout: {
		padding: {
			right: layoutPdR
		}
	},
	indexAxis: 'y',
	scales: {
		x: {
			beginAtZero: true,
			// удалить галочки (палочки, черточки)
			grid: {
				// drawTicks: false,
				drawBorder: false
			},
			// удалить надписи
			ticks: {
				display: false,
			}
		},
		y: {
			afterFit: ((context) => {				
				// console.log('options =',context);
				contextWidth.value = context.width;
			})
		}
	},
});
const plugins = ref({});

// 2 график
const testData2 = ref({
	// labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	datasets: [
		{
			label: 'Weekly Sales',
			data: data.value,
			// backgroundColor: [
			// 	'rgba(255, 26, 104, 0.2)',
			// 	'rgba(54, 162, 235, 0.2)',
			// 	'rgba(255, 206, 86, 0.2)',
			// 	'rgba(75, 192, 192, 0.2)',
			// 	'rgba(153, 102, 255, 0.2)',
			// 	'rgba(255, 159, 64, 0.2)',
			// 	'rgba(0, 0, 0, 0.2)',
			// ],
			// borderColor: [
			// 	'rgba(255, 26, 104, 1)',
			// 	'rgba(54, 162, 235, 1)',
			// 	'rgba(255, 206, 86, 1)',
			// 	'rgba(75, 192, 192, 1)',
			// 	'rgba(153, 102, 255, 1)',
			// 	'rgba(255, 159, 64, 1)',
			// 	'rgba(0, 0, 0, 1)',
			// ],
			borderWidth: 1,
		},
	],
});
const options2 = ref({
	maintainAspectRatio: false,
	layout: {
		padding: {
			right: layoutPdR + 17
		}
	},
	indexAxis: 'y',
	scales: {
		x: {
			beginAtZero: true,
			// высота
			afterFit: ((context) => {
				// убираем оставшуюся часть столбца
				context.height += 25;
			})
		},
		y: {
			// ширина
			afterFit: ((context) => {				
				context.width = contextWidth.value;
			}),
			grid: {
				drawTicks: false,
			}
		}
	},
	plugins: {
		legend: {
			display: false
		}
	}
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
	width: 80%;
	padding: 20px;
	border-radius: 20px;
	border: solid 3px rgba(255, 26, 104, 1);
	background: white;
}
.scrollBox {
	/* height: 500px; */
	max-height: 250px;
	overflow-y: scroll;
}
/* .boxBarChart {
	max-height: 50px !important;
} */
</style>
