<template>
  <div :style="styles" :class="['chart-container', cssClasses]">
    <canvas ref="canvas" :height="height" :width="width"></canvas>
    <div class="current-temperature">
      <div>{{ currentTemperature }}°F</div>
    </div>
    <div class="current-time" v-if="currentTime">
      <div>{{ currentTime }}</div>
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
      if (y >= chartArea.top && y <= chartArea.bottom) {
        const x = event.x
        let closestPoint
        let minDistance = Number.MAX_VALUE

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
          chart.$vue._data.currentTemperature = data
          chart.$vue._data.currentTime = label.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
        }
      }
    }
  },
})

export default {
  name: 'LineChart',

  extends: Line,

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
      }, 5000)
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
  div {
    font-family: 'Poppins', sans-serif;
  }
}
</style>
