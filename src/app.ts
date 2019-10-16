import Vue from 'vue'
import Component from 'vue-class-component'
import HighCharts from 'highcharts'
import lodash from 'lodash'

// 全局对象
declare global {
  interface Window {
    [key: string]: any
  }
}
type _event = 'initChart' | 'updateChart'

@Component({
  template: '<div id="app"></div>'
})
class App extends Vue {
  public chartDom?: HighCharts.Chart
  public option: HighCharts.Options = {}
  public pricePrecision = 0

  public initChart(option: HighCharts.Options) {
    if ((option as any).pricePrecision) {
      this.pricePrecision = (option as any).pricePrecision
    }
    this.option = lodash.merge(this.option, option)
    HighCharts.setOptions({ global: { useUTC: false } })
    this.chartDom = HighCharts.chart('app', this.option)
    console.info(` >> Chart init:`, this.option)
    this.postMessage(JSON.stringify({ event: 'initDone' }))
  }

  public updateChart(option: HighCharts.Options) {
    if (!this.chartDom) return
    if (
      this.chartDom.series &&
      option.series &&
      option.series[0] &&
      option.series[0].data
    ) {
      this.chartDom.series[0].setData(option.series[0].data)
    }
    if (
      this.chartDom.series &&
      option.series &&
      option.series[1] &&
      option.series[1].data
    ) {
      this.chartDom.series[1].setData(option.series[1].data)
    }
    const pricePrecision = this.pricePrecision
    this.option = lodash.merge(this.option, option, {
      xAxis: {
        labels: {
          formatter: function() {
            const value: any = (this as any).value
            return value ? Number(value).toFixed(pricePrecision) : value
          }
        }
      }
    })
    this.chartDom.update(this.option)
    console.info(` >> Chart update:`, this.option)
    this.postMessage(JSON.stringify({ event: 'updateDone' }))
  }

  public receiveMessage(data: {
    event: _event
    option: HighCharts.Options
    debug?: boolean
  }) {
    if (data.debug) {
      const VConsole = require('vconsole')
      const vsonsole = new VConsole()
    }
    console.info(` >> Receive message:`, data.event, data.option)
    switch (data.event) {
      case 'initChart':
        this.initChart(data.option)
        break
      case 'updateChart':
        this.updateChart(data.option)
        break
    }
  }

  public postMessage(message: string) {
    console.info(' >> Post message:', message)
    if (typeof message !== 'string') {
      message = JSON.stringify(message)
    }
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(message)
    }
  }

  public created() {
    window.sendMessageHtml = this.receiveMessage.bind(this)
  }
}

export default App
