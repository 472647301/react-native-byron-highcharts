import HighCharts from './highcharts'

export type _event = 'initChart' | 'updateChart'
export type IOnMessage = {
  event: 'initDone' | 'updateDone'
}

export function sendMessageHtml(name: _event, params: HighCharts.Options) {
  return `
  window.sendMessageHtml(${JSON.stringify({
    event: name,
    data: params
  })})
  `
}
