<template>
	<div class="chartMenu">
		<p>
			Как создать прокручиваемую горизонтальную гистограмму с фиксированным
			масштабом в Chart JS
		</p>
	</div>
	<div class="chartCard">
		<div class="chartBox">
			<div class="scrollBox">
				<div class="scrollBoxBody">
					<BarChart
						style="width: 100%;"
						:chartData="testData1"
						:options="options1"
						:plugins="plugins1"
					/>
					<!-- <BarChart
						style="width:100%; height:100%;"
						:chartData="testData1"
						:options="options1"
						:plugins="plugins1"
					/> -->
				</div>
			</div>
			<div class="boxBar">
				<BarChart
					style="width: 100%; height: 100%"
					:chartData="testData2"
					:options="options2"
					:plugins="plugins2"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

// 1 график

const data1 = ref();

data1.value = [18, 12, 6, 9, 12, 3, 9];

const rightWidth = ref(0);

const testData1 = ref({
	labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	datasets: [
		{
			label: 'Weekly Sales',
			data: data1.value,
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
const options1 = ref({
	responsive: true,
	//Сохранение соотношения сторон
	maintainAspectRatio: false,
	//Отступ от границ грая полотна до графика
	layout: {
		padding: {
			right: 5,
		},
	},
	//Перестроить вывод осей
	indexAxis: 'y',
	scales: {
		x: {
			beginAtZero: true,
			//Убираем отображение нижних галочек (полоски опускающиеся от графика)
			grid: {
				drawTicks: false,
				// Убрать рисование нижней границы графика
				drawBorder: false,
			},
			//Убрать ярлыки (цифры)
			ticks: {
				display: false,
			},
		},
		y: {
			afterFit: context => {
				// console.log(context)
				// context.width += 30
				rightWidth.value = context.width;
			},
		},
	},
});
const addHeight = {
	id: 'addHeight',
	afterDraw(chart, args, options) {
		if(chart.data.labels.length > 5) {
			const newHeight = 300 + ((chart.data.labels.length - 5) * 20);
			console.log(chart.ctx.height = 900)
		}
	},
};

const plugins1 = ref([addHeight]);

//2 график

const testData2 = ref({
	responsive: true,
	// maintainAspectRatio: false,
	//Убираем данные со второго графика
	labels: [],
	datasets: [
		{
			label: 'Weekly Sales',
			data: data1.value,
			// backgroundColor: [],
			// borderColor: [],
			// borderWidth: 1,
		},
	],
});
const options2 = ref({
	//Перестроить вывод осей
	indexAxis: 'y',
	//Отступ от границ грая полотна до графика
	layout: {
		padding: {
			right: 22,
		},
	},
	scales: {
		x: {
			beginAtZero: true,
			//Работа с высотой графика (сжимаем нижний график)
			afterFit: context => {
				// console.log(context);
				context.height += 30;
			},
		},
		//Делаем отступ слева до начала рисования графика
		y: {
			//Работа с шириной графика
			afterFit: context => {
				// console.log(context)
				context.width += rightWidth.value;
			},
			//Убрать галочки
			grid: {
				drawTicks: false,
			},
		},
	},
	plugins: {
		//Убрать отображение легенды в графике
		legend: {
			display: false,
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
#scrollBar {
	width: 100%;
	height: 100%;
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
	height: 500px;
	max-height: 200px;
	overflow-y: scroll;
	/* margin-bottom: -11px; */
}

.boxBar {
	height: 45px;
	/* margin-top: -11px; */
	/* background-color: white; */
}
/* .scrollBoxBody {
	height: 300px;
} */
</style>
