<template>
  <!-- Основной контейнер для графика и информации о температуре -->
  <div :style="styles" :class="['chart-container', cssClasses]">
    <!-- Элемент canvas для отрисовки графика -->
    <canvas ref="canvas" :height="height" :width="width"></canvas>

    <!-- Информация о текущей температуре -->
    <div class="current-temperature">
      <div>{{ currentTemperature }}°F</div>
    </div>

    <!-- Информация о текущем времени -->
    <div class="current-time" v-if="currentTime">
      <div>{{ currentTime }}</div>
    </div>
  </div>
</template>

<script>
// Импортируем компоненты и библиотеки
import { Line } from 'vue-chartjs' // Импорт компонента Line из vue-chartjs
import Chart from 'chart.js' // Импорт библиотеки Chart.js

export default {
  name: 'LineChart', // Имя компонента

  extends: Line, // Расширение компонента Line из vue-chartjs

  props: {
    // ID графика, по умолчанию 'line-chart'
    chartId: {
      type: String,
      default: 'line-chart',
    },
    // Ключ для идентификации данных в наборе данных, по умолчанию 'label'
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    // CSS-классы для стилизации компонента
    cssClasses: {
      type: String,
      default: '',
    },
    // Высота графика, по умолчанию '50px'
    height: {
      type: String,
      default: '50px',
    },
    // Ширина графика, по умолчанию '75px'
    width: {
      type: String,
      default: '75px',
    },
    // Стили для контейнера графика
    styles: {
      type: Object,
      default: () => ({}),
    },
    // Плагины для Chart.js, по умолчанию пустой массив
    plugins: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      // Данные графика
      chartData: {
        labels: [], // Метки на оси X
        datasets: [
          {
            label: 'CPU Temperature', // Название набора данных
            data: [], // Данные для графика
            fill: false, // Не заполнять область под графиком
            borderColor: '#0071E2', // Цвет границы линии графика
            backgroundColor: '#0071E2', // Цвет фона линии графика
            pointBorderColor: '#0071E2', // Цвет границы точки
            pointBackgroundColor: '#FFF', // Цвет заливки точки
            borderWidth: 2, // Ширина границы линии
            pointRadius: 0, // Радиус точки
            pointHoverRadius: 6, // Радиус точки при наведении
          },
        ],
      },

      // Опции для графика
      chartOptions: {
        responsive: true, // График будет адаптироваться к размерам контейнера
        maintainAspectRatio: false, // График не будет сохранять соотношение сторон
        legend: {
          display: false, // Не отображать легенду
        },
        scales: {
          xAxes: [
            {
              type: 'time', // Ось X будет отображать время
              time: {
                displayFormats: {
                  minute: 'h:mm a', // Формат отображения времени
                },
                tooltipFormat: 'h:mm a', // Формат времени в тултипе
                unit: 'minute', // Единица времени
              },
              gridLines: {
                display: false, // Не отображать линии сетки на оси X
              },
              ticks: {
                display: false, // Не отображать деления на оси X
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                display: false, // Не отображать деления на оси Y
                beginAtZero: true, // Начинать отсчет с нуля
              },
              gridLines: {
                display: false, // Не отображать линии сетки на оси Y
              },
            },
          ],
        },
        tooltips: {
          enabled: false, // Отключить тултипы
        },
        hover: {
          mode: 'nearest',
          intersect: true,
          onHover: this.handleHover,
        },
      },

      // Переменные состояния графика
      chart: null,
      currentTemperature: 0, // Текущая температура
      currentTime: '', // Текущее время
      maxPoints: 100, // Максимальное количество точек на графике
    }
  },

  mounted() {
    // Создаем график после монтирования компонента
    this.createChart()
    // Запускаем получение данных о температуре
    this.fetchCpuTemperature()
  },

  methods: {
    // Метод для создания графика
    createChart() {
      const ctx = this.$refs.canvas.getContext('2d') // Получаем контекст канваса
      this.chart = new Chart(ctx, {
        type: 'line', // Тип графика
        data: this.chartData, // Данные для графика
        options: this.chartOptions, // Опции для графика
      })
    },

    // Метод для эмуляции получения данных о температуре
    fetchCpuTemperature() {
      setInterval(() => {
        const newTemperature = Math.floor(Math.random() * 100) // Генерируем случайную температуру
        const currentTime = new Date() // Получаем текущее время
        const timeString = currentTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }) // Форматируем время

        // Добавляем новые данные в график
        this.chartData.labels.push(currentTime)
        this.chartData.datasets[0].data.push(newTemperature)
        this.currentTemperature = newTemperature
        this.currentTime = timeString

        // Удаляем старые данные, если их больше 10
        if (this.chartData.labels.length > 10) {
          this.chartData.labels.shift()
          this.chartData.datasets[0].data.shift()
        }
        // Удаляем старые данные, если их больше maxPoints
        if (this.chartData.labels.length > this.maxPoints) {
          this.chartData.labels.shift()
          this.chartData.datasets[0].data.shift()
        }

        // Обновляем график
        this.chart.update()
      }, 5000) // Интервал обновления данных 2 секунды
    },

    // Метод для обработки наведения на точку
    handleHover(event, activeElements) {
      if (activeElements.length > 0) {
        const pointIndex = activeElements[0]._index
        const datasetIndex = activeElements[0]._datasetIndex
        const data = this.chart.data.datasets[datasetIndex].data[pointIndex]
        const label = this.chart.data.labels[pointIndex]
        this.currentTemperature = data
        this.currentTime = label.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      }
    },
  },
}
</script>

<style scoped lang="scss">
@function rem($px) {
  @return ($px / 16px) + rem;
}

.chartjs-render-monitor {
  height: rem(40px);
}
.chart-container {
  position: relative;
  width: 70%;
  height: 100%;
}

.current-temperature {
  position: absolute;
  top: 0;
  right: -30%;
  transform: translateX(50%);
  font-size: 24px;
  font-weight: bold;
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.current-time {
  font-size: rem(12px);
  line-height: rem(5px);
  color: rgba(20, 18, 31, 1);
  padding: rem(8px) rem(8px);
  background: rgba(245, 245, 248, 1);
  border-radius: rem(8px);
  position: absolute;
  bottom: rem(0px);
  right: 50%;
  transform: translateX(50%);
  margin-bottom: rem(-8px);
  font-weight: 400;
}
</style>
