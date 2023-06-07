<template>
  <div>
    <div v-if="isEmpty">
      <div
        :id="id"
        ref="chart"
        :class="className"
        :style="{ height: height }"
        style="width: 100%"
      />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  props: {
    className: {
      type: String,
      default: 'barchart'
    },
    id: {
      type: String,
      default: 'barchart'
    },
    height: {
      type: String,
      default: '200px'
    },
    chartsData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chart: null,
      isEmpty: false
    }
  },
  watch: {
    '$props.chartsData': {
      handler(newValue, oldValue) {
        if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
          const { data = [] } = newValue
          this.isEmpty = data.length > 0
          if (this.isEmpty) {
            this.$nextTick(() => {
              this.initChart()
            })
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    initChart() {
      const that = this
      console.log('yyy', echarts)
      this.chart = echarts.init(that.$refs.chart)
      const color = [
        'rgba(61, 160, 235, 1)',
        'rgba(0, 228, 206, 0.8)',
        'rgba(255, 115, 33, 1)'
      ]
      // 更换rgba的颜色值透明度
      const colorAlpha = (rgbaColor, alpha = 0.3) => {
        return rgbaColor.replace(
          /rgba\(((\s*\d+\s*,){3}\s*)(\d?.?\d+)\)$/g,
          `rgba($1${alpha})`
        )
      }
      this.chart.setOption({
        grid: {
          top: '30px',
          left: 10,
          right: '40px',
          bottom: 0,
          containLabel: true
        },
        color,
        legend: {
          orient: 'horizontal',
          left: 'right',
          width: '100%',
          top: '-20px'
        },
        tooltip: {
          extraCssText: 'text-align: left'
        },

        xAxis: [
          {
            splitLine: {
              // 网格线
              show: false
            },
            data: this.chartsData.axis
          }
        ],
        yAxis: [
          {
            splitLine: {
              lineStyle: {
                color: '#e2e2e2',
                type: 'dashed'
              }
            }
          }
        ],
        series: [
          {
            data: this.chartsData.data,
            type: 'line',
            smooth: true,
            label: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            },
            itemStyle: {
              normal: {
                lineStyle: {
                  color: 'rgba(61, 160, 235, 0.8)',
                  borderColor: 'red' // 拐点边框颜色
                }
              }
            },
            symbolSize: 8,
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: '#b2deff00'
                  },
                  {
                    offset: 1,
                    color: '#b2deff'
                  }
                ],
                globalCoord: false
              }
            },
            axisLabel: {
              textStyle: {
                color: '#fff'
              }
            },
            markPoint: {
              label: {
                color: '#fff'
              },
              symbol: 'roundRect', // 标记(气泡)的图形
              symbolSize: [30, 20], // 标记(气泡)的大小
              symbolOffset: [0, '-80%'],
              itemStyle: {
                color: color[0], // 图形的颜色。
                borderColor: '#000', // 图形的描边颜色。支持的颜色格式同 color，不支持回调函数。
                borderWidth: 0, // 描边线宽。为 0 时无描边。
                borderType: 'solid' // 柱条的描边类型，默认为实线，支持 ‘solid’, ‘dashed’, ‘dotted’。
              },
              data: [{ type: 'max', name: '最大值' }]
            }
          }
        ]
      })
    }
  }
}
</script>

<style></style>
