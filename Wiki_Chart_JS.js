const data = {
labels: [...[]], // имя элемента графика
datasets: [
	{
	//* Пример конфигурации набора данных --->
	barPercentage: 0.5,
	barThickness: 6,
	maxBarThickness: 8,
	minBarLength: 2,
	data: [10, 20, 30, 40, 50, 60, 70],
	// <---
	barPercentage: 0.5, // процентный заполнения колонки
	categoryPercentage: 1.0 // 100% заполнение категории т.е. barPercentage
	},
],
};

const config = {
type: 'bar', //тип отображаемого графика
data, // массив отображаемых данных
options: {
	indexAxis: 'y', //горизонтальное расположение графика
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
},
};

// пример плагина изменяющего цвет фона --> chartAreaPlugin
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



// Исходник для рисования на VUE JS 3 --->
/* 
<template>
	<div v-if="storeArrow.allPackageDB != null">
		<BarChart
			:chart-data="data"
			:options="options"
			css-classes="chart-container"
		/>
	</div>
	<div v-else>Данные загружаются.</div>
</template>

<script setup>
	import { BarChart } from 'vue-chart-3';

	import { ref, computed } from 'vue';
	import { Chart, registerables } from 'chart.js';

	Chart.register(...registerables);

	const options = ref({
			scales: {
				y: {
					beginAtZero: true
				}
			}
		});

	const data = computed(() => ({
		labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
		datasets: [{
			label: '# of Votes',
			data: [12, 19, 3, 5, 2, 3],
			backgroundColor: [
				'rgba(255, 99, 132, 0.2)',
				'rgba(54, 162, 235, 0.2)',
				'rgba(255, 206, 86, 0.2)',
				'rgba(75, 192, 192, 0.2)',
				'rgba(153, 102, 255, 0.2)',
				'rgba(255, 159, 64, 0.2)'
			],
			borderColor: [
				'rgba(255, 99, 132, 1)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(75, 192, 192, 1)',
				'rgba(153, 102, 255, 1)',
				'rgba(255, 159, 64, 1)'
			],
			borderWidth: 1,
		}]
	}))
</script>

*/
