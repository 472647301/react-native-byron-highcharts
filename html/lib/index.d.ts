import HighCharts from './highcharts';
export declare type _event = 'initChart' | 'updateChart';
export declare type IOnMessage = {
    event: 'initDone' | 'updateDone';
};
export declare function sendMessageHtml(name: _event, params: HighCharts.Options): string;
