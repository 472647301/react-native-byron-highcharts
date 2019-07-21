import HighCharts from './highcharts'

export type _event = 'initChart' | 'updateChart'
export type IOnMessage = {
  event: 'initDone' | 'updateDone'
}

export function sendMessageHtml(
  name: _event,
  params: HighCharts.Options,
  debug?: boolean
) {
  return `
  window.sendMessageHtml(${JSON.stringify({
    event: name,
    option: params,
    debug: debug
  })})
  `
}
