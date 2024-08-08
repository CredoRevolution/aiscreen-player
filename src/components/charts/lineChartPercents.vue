<template>
  <div :style="styles" :class="['chart-container', cssClasses]">
    <canvas ref="canvas" :height="height" :width="width"></canvas>
    <div class="current-temperature" @click="showOverlay = true">
      <div>{{ currentTemperature }}%</div>
    </div>
    <div class="current-time" v-if="currentTime">
      <div>{{ currentTime }}</div>
    </div>
    <div v-if="showOverlay" class="overlay">
      <div class="overlay-content">
        <button @click="showOverlay = false" class="close-btn">Close</button>
        <line-chart-overlay
          :data="overlayChartData"
          :options="overlayChartOptions"
        ></line-chart-overlay>
      </div>
    </div>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import Chart from 'chart.js'

Chart.plugins.register({
  afterEvent: function (chart, event) {
    if (event.type === 'mousemove') {
      const chartArea = chart.chartArea
      const y = event.y
      if (chartArea && y >= chartArea.top && y <= chartArea.bottom) {
        const x = event.x
        let closestPoint
        let minDistance = Number.MAX_VALUE

        if (chart.data && chart.data.datasets && chart.data.datasets[0]) {
          chart.data.datasets[0].data.forEach((dataPoint, index) => {
            const xPos = chart.scales['x-axis-0'].getPixelForValue(
              chart.data.labels[index]
            )
            const distance = Math.abs(xPos - x)
            if (distance < minDistance) {
              minDistance = distance
              closestPoint = index
            }
          })

          if (closestPoint !== undefined) {
            const datasetIndex = 0 // Assuming only one dataset
            const data = chart.data.datasets[datasetIndex].data[closestPoint]
            const label = chart.data.labels[closestPoint]

            // Update current temperature and time
            if (chart.$vue) {
              chart.$vue.currentTemperature = data
              chart.$vue.currentTime = label.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })
            }
          }
        }
      }
    }
  },
})

export default {
  name: 'LineChart',

  extends: Line,

  components: {
    'line-chart-overlay': {
      extends: Line,
      props: ['data', 'options'],
      mounted() {
        this.renderChart(this.data, this.options)
      },
    },
  },

  props: {
    chartId: {
      type: String,
      default: 'line-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    cssClasses: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '50px',
    },
    width: {
      type: String,
      default: '75px',
    },
    styles: {
      type: Object,
      default: () => ({}),
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'CPU Temperature',
            data: [],
            fill: false,
            borderColor: '#0071E2',
            backgroundColor: '#0071E2',
            pointBorderColor: '#0071E2',
            pointBackgroundColor: '#FFF',
            hoverBackgroundColor: '#FFF',
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 6,
          },
        ],
      },

      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        layout: {
          padding: {
            top: 7,
            bottom: 7,
            left: 7,
            right: 7,
          },
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                displayFormats: {
                  minute: 'h:mm a',
                },
                tooltipFormat: 'h:mm a',
                unit: 'minute',
              },
              gridLines: {
                display: false,
              },
              ticks: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                display: false,
                beginAtZero: true,
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
        tooltips: {
          enabled: false, // Отключаем тултипы
        },
        hover: {
          mode: 'nearest',
          intersect: false,
        },
      },

      chart: null,
      currentTemperature: 0,
      currentTime: '',
      maxPoints: 10,
      showOverlay: false, // Состояние для отображения оверлея
      overlayChartData: null, // Данные для графика в оверлее
      overlayChartOptions: null, // Опции для графика в оверлее
    }
  },

  mounted() {
    this.createChart()
    this.fetchCpuTemperature()
  },

  methods: {
    createChart() {
      const ctx = this.$refs.canvas.getContext('2d')
      this.chart = new Chart(ctx, {
        type: 'line',
        data: this.chartData,
        options: this.chartOptions,
      })
      this.chart.$vue = this
    },

    fetchCpuTemperature() {
      setInterval(() => {
        const newTemperature = Math.floor(Math.random() * 100)
        const currentTime = new Date()
        const timeString = currentTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })

        this.chartData.labels.push(currentTime)
        this.chartData.datasets[0].data.push(newTemperature)
        this.currentTemperature = newTemperature
        this.currentTime = timeString

        if (this.chartData.labels.length > 10) {
          this.chartData.labels.shift()
          this.chartData.datasets[0].data.shift()
        }

        if (this.chartData.labels.length > this.maxPoints) {
          this.chartData.labels.shift()
          this.chartData.datasets[0].data.shift()
        }

        this.chart.update()

        // Обновить данные для оверлея
        this.updateOverlayChartData()
      }, 5000)
    },

    updateOverlayChartData() {
      // Сгенерируем данные за последние 24 часа для оверлея
      const overlayData = {
        labels: [],
        datasets: [
          {
            label: 'CPU Temperature (24h)',
            data: [],
            fill: false,
            borderColor: '#0071E2',
            backgroundColor: '#0071E2',
            pointBorderColor: '#0071E2',
            pointBackgroundColor: '#FFF',
            hoverBackgroundColor: '#FFF',
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 6,
          },
        ],
      }

      for (let i = 0; i < 24; i++) {
        const pastDate = new Date(Date.now() - i * 60 * 60 * 1000)
        overlayData.labels.unshift(pastDate)
        overlayData.datasets[0].data.unshift(Math.floor(Math.random() * 100))
      }

      this.overlayChartData = overlayData
      this.overlayChartOptions = {
        ...this.chartOptions,
        scales: {
          ...this.chartOptions.scales,
          xAxes: [
            {
              type: 'time',
              time: {
                displayFormats: {
                  hour: 'MMM D, hA',
                },
                tooltipFormat: 'MMM D, h:mm a',
                unit: 'hour',
              },
              gridLines: {
                display: true,
              },
              ticks: {
                display: true,
              },
            },
          ],
        },
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
  cursor: pointer;
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
  width: max-content;
  div {
    font-family: 'Poppins', sans-serif;
  }
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.overlay-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  width: 80%;
  max-width: 800px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}
</style>
