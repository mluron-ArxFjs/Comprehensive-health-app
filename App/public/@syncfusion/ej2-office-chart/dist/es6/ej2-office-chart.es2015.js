import { AccumulationChart, AccumulationDataLabel, AccumulationLegend, AccumulationTooltip, AreaSeries, BarSeries, BubbleSeries, Category, Chart, ColumnSeries, DataLabel, DateTime, ErrorBar, Export, Legend, LineSeries, PieSeries, PolarSeries, RadarSeries, ScatterSeries, SplineSeries, StackingAreaSeries, StackingBarSeries, StackingColumnSeries, StackingLineSeries, Tooltip, Trendlines } from '@syncfusion/ej2-charts';
import { SvgRenderer } from '@syncfusion/ej2-svg-base';
import { createElement, isNullOrUndefined } from '@syncfusion/ej2-base';

/* tslint:disable:no-any */
Chart.Inject(AreaSeries, StackingAreaSeries, BarSeries, PieSeries, StackingBarSeries, PolarSeries, ScatterSeries, BubbleSeries, RadarSeries, DateTime, ColumnSeries, StackingColumnSeries, LineSeries, StackingLineSeries, ErrorBar, Trendlines, SplineSeries, DataLabel, Category, Legend, Tooltip, Export);
AccumulationChart.Inject(AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel);
/**
 * Chart component is used to convert office charts to ej2-charts.
 */
class ChartComponent {
    constructor() {
        /**
         * @private
         */
        this.keywordIndex = undefined;
    }
    /**
     * @private
     */
    chartRender(chart, keywordIndex) {
        this.keywordIndex = !isNullOrUndefined(keywordIndex) ? keywordIndex : 0;
        this.chartType = chart[chartTypeProperty[this.keywordIndex]];
        this.isPieType = (this.chartType === 'Pie' || this.chartType === 'Doughnut');
        let chartData = this.chartData(chart, this.chartType);
        let chartModel = {
            enableAnimation: false,
            width: chart[widthProperty[this.keywordIndex]] * (96 / 72) + 'px',
            height: chart[heightProperty[this.keywordIndex]] * (96 / 72) + 'px'
        };
        if (this.isPieType) {
            this.chart = new AccumulationChart(chartModel);
        }
        else {
            this.chart = new Chart(chartModel);
            this.chart.primaryXAxis = this.chartPrimaryXAxis(chart[chartPrimaryCategoryAxisProperty[this.keywordIndex]], this.chartType);
            this.chart.primaryYAxis = this.chartPrimaryYAxis(chart[chartPrimaryValueAxisProperty[this.keywordIndex]]);
        }
        this.chart.series = this.chartSeries(chart[chartSeriesProperty[this.keywordIndex]], chartData, this.chartType);
        for (let i = 0; i < this.chart.series.length; i++) {
            this.chart.series[parseInt(i.toString(), 10)].animation.enable = false;
        }
        this.chart.title = chart[chartTitleProperty[this.keywordIndex]];
        this.chart.legendSettings = this.parseChartLegend(chart[chartLegendProperty[this.keywordIndex]]);
    }
    /**
     * @private
     */
    convertChartToImage(chart, elementWidth, elementHeight) {
        let promise;
        return promise = new Promise((resolve, reject) => {
            let width = 0;
            let height = 0;
            let dataInfo = this.getControlsValue([chart], elementWidth, elementHeight);
            width = width ? width : dataInfo.width;
            height = height ? height : dataInfo.height;
            let element = createElement('canvas');
            let displayPixelRatio = Math.max(1, window.devicePixelRatio || 1);
            element.width = width * (displayPixelRatio);
            element.height = height * (displayPixelRatio);
            element.style.width = width + 'px';
            element.style.height = height + 'px';
            // tslint:disable-next-line:max-line-length
            let url = window.URL.createObjectURL(new Blob([(new XMLSerializer()).serializeToString(dataInfo.svg)], { type: 'image/svg+xml' }));
            let image = new Image();
            let canvasContext = element.getContext('2d');
            canvasContext.scale(displayPixelRatio, displayPixelRatio);
            image.onload = (() => {
                canvasContext.drawImage(image, 0, 0);
                window.URL.revokeObjectURL(url);
                let dataURL = element.toDataURL('image/png');
                resolve(dataURL);
            });
            image.onerror = (() => {
                reject('Invalid data');
            });
            image.src = url;
        });
    }
    getControlsValue(controls, elementWidth, elementHeight) {
        let width = 0;
        let height = 0;
        let content = '';
        let svgRenderer = new SvgRenderer('').createSvg({
            id: 'Image_Export',
            width: 200, height: 200
        });
        controls.map((control) => {
            if (control) {
                let svgElement = control.svgObject.cloneNode(true);
                let groupElement = control.renderer.createGroup({
                    style: 'transform: translateY(' + height + 'px)'
                });
                groupElement.appendChild(svgElement);
                width = Math.max(control.availableSize.width, elementWidth);
                height += control.availableSize.height;
                content += control.svgObject.outerHTML;
                svgRenderer.appendChild(groupElement);
            }
        });
        svgRenderer.setAttribute('width', width + '');
        svgRenderer.setAttribute('height', height + '');
        return {
            'width': width,
            'height': height,
            'svg': svgRenderer
        };
    }
    officeChartType(type) {
        let chartType = '';
        switch (type) {
            case 'Area_Stacked':
                chartType = 'StackingArea';
                break;
            case 'Area':
                chartType = 'Area';
                break;
            case 'Area_Stacked_100':
                chartType = 'StackingArea100';
                break;
            case 'Bar_Clustered':
                chartType = 'Bar';
                break;
            case 'Bar_Stacked':
                chartType = 'StackingBar';
                break;
            case 'Bar_Stacked_100':
                chartType = 'StackingBar100';
                break;
            case 'Column_Clustered':
                chartType = 'Column';
                break;
            case 'Column_Stacked':
                chartType = 'StackingColumn';
                break;
            case 'Column_Stacked_100':
                chartType = 'StackingColumn100';
                break;
            case 'Scatter_Markers':
                chartType = 'Scatter';
                break;
            case 'Bubble':
                chartType = 'Bubble';
                break;
            case 'Doughnut':
            case 'Pie':
                chartType = 'Pie';
                break;
            case 'Line_Stacked_100':
            case 'Line_Markers_Stacked_100':
                chartType = 'StackingLine100';
                break;
            case 'Line':
            case 'Line_Markers':
                chartType = 'Line';
                break;
            case 'Line_Stacked':
            case 'Line_Markers_Stacked':
                chartType = 'StackingLine';
                break;
        }
        return chartType;
    }
    chartSeries(series, data, type) {
        // json data
        let chartSeries = [];
        for (let i = 0; i < series.length; i++) {
            let seriesData = series[parseInt(i.toString(), 10)];
            let seriesValue = this.writeChartSeries(seriesData, data, type, i);
            chartSeries.push(seriesValue);
        }
        return chartSeries;
    }
    writeChartSeries(seriesData, data, type, count) {
        let chartType = this.officeChartType(type);
        // let isAreaType: boolean = (type === 'Area_Stacked_100' || type === 'Area' || type === 'Area_Stacked');
        let seriesFormat = seriesData[dataPointsProperty[this.keywordIndex]][parseInt(count.toString(), 10)];
        let series = {};
        let fill;
        series.type = chartType;
        series.dataSource = data;
        series.name = seriesData[seriesNameProperty[this.keywordIndex]];
        series.xName = 'x';
        series.yName = 'y' + count;
        if (type === 'Bubble') {
            series.size = 'size' + count;
        }
        if (this.isPieType) {
            series.pointColorMapping = 'color';
            if (type === 'Doughnut') {
                series.innerRadius = '75%';
                series.radius = '70%';
            }
        }
        else {
            if (isNullOrUndefined(seriesFormat)) {
                seriesFormat = seriesData[dataPointsProperty[this.keywordIndex]][0];
            }
            fill = this.chartFormat(seriesFormat, chartType);
            series.fill = fill;
            if (!isNullOrUndefined(seriesFormat[fillProperty[this.keywordIndex]][foreColorProperty[this.keywordIndex]])) {
                series.pointColorMapping = 'color';
            }
        }
        if (type === 'Line_Markers' || type === 'Line_Markers_Stacked' || type === 'Line_Markers_Stacked_100') {
            series.marker = { visible: true };
        }
        if (seriesData.hasOwnProperty(dataLabelProperty[this.keywordIndex])) {
            if (this.isPieType) {
                series.dataLabel = this.parseDataLabels(seriesData[dataLabelProperty[this.keywordIndex]]);
            }
            else {
                let data = {};
                data.dataLabel = this.parseDataLabels(seriesData[dataLabelProperty[this.keywordIndex]]);
                series.marker = data;
            }
        }
        if (seriesData.hasOwnProperty(errorBarProperty[this.keywordIndex])) {
            let errorBarData = seriesData[errorBarProperty[this.keywordIndex]];
            series.errorBar = this.parseErrorBars(errorBarData);
        }
        if (seriesData.hasOwnProperty(trendLinesProperty[this.keywordIndex])) {
            let trendLines = seriesData[trendLinesProperty[this.keywordIndex]];
            let trendLinesData = [];
            for (let count = 0; count < trendLines.length; count++) {
                let trendLine = trendLines[parseInt(count.toString(), 10)];
                let data = {};
                data = this.parseTrendLines(trendLine, fill);
                trendLinesData.push(data);
                series.trendlines = trendLinesData;
            }
        }
        return series;
    }
    parseDataLabels(label) {
        let dataLabel = {};
        dataLabel.visible = true;
        if (this.isPieType) {
            if (label[positionProperty[this.keywordIndex]] === 'BestFit' || label[positionProperty[this.keywordIndex]] === 'Inside') {
                dataLabel.position = 'Inside';
            }
            else {
                dataLabel.position = 'Outside';
            }
        }
        else {
            dataLabel.position = this.dataLabelPosition(label[positionProperty[this.keywordIndex]]);
        }
        return dataLabel;
    }
    parseErrorBars(errorBarData) {
        let errorBar = {};
        errorBar.visible = true;
        errorBar.type = errorBarData[typeProperty[this.keywordIndex]];
        errorBar.direction = errorBarData[directionProperty[this.keywordIndex]];
        if (errorBarData[endStyleProperty[this.keywordIndex]] === 'Cap') {
            errorBar.errorBarCap = { width: 1 };
        }
        else {
            errorBar.errorBarCap = { width: 0 };
        }
        return errorBar;
    }
    parseTrendLines(trendLines, fill) {
        let trendLine = {};
        trendLine.type = trendLines[typeProperty[this.keywordIndex]];
        trendLine.name = trendLines[nameProperty[this.keywordIndex]];
        trendLine.forwardForecast = trendLines[forwardProperty[this.keywordIndex]];
        trendLine.backwardForecast = trendLines[backwardProperty[this.keywordIndex]];
        if (trendLines[interceptProperty[this.keywordIndex]] === 'NaN') {
            trendLine.intercept = 0;
        }
        else {
            trendLine.intercept = trendLines[interceptProperty[this.keywordIndex]];
        }
        trendLine.fill = fill;
        return trendLine;
    }
    dataLabelPosition(position) {
        let labelPosition = 'Auto';
        switch (position) {
            case 'Outside':
                labelPosition = 'Outer';
                break;
            case 'Center':
                labelPosition = 'Middle';
                break;
            case 'Inside':
                labelPosition = 'Top';
                break;
            case 'OutsideBase':
                labelPosition = 'Bottom';
                break;
        }
        return labelPosition;
    }
    chartFormat(dataPoints, type) {
        let format = dataPoints;
        if (type === 'Line' || type === 'StackingLine' || type === 'StackingLine100') {
            return format[lineProperty[this.keywordIndex]][rgbProperty[this.keywordIndex]];
        }
        else {
            return format[fillProperty[this.keywordIndex]][rgbProperty[this.keywordIndex]];
        }
    }
    chartPrimaryXAxis(data, type) {
        // json data
        let primaryXAxis = {};
        if (data[chartTitleProperty[this.keywordIndex]]) {
            primaryXAxis.title = data[chartTitleProperty[this.keywordIndex]];
        }
        let categoryType = this.chartCategoryType(data[categoryTypeProperty[this.keywordIndex]]);
        primaryXAxis.valueType = categoryType;
        if (categoryType === 'DateTime') {
            primaryXAxis.intervalType = 'Days';
            primaryXAxis.labelFormat = 'M/d/yyyy';
            primaryXAxis.edgeLabelPlacement = 'Shift';
        }
        if (type === 'Scatter_Markers' || type === 'Bubble') {
            this.checkAndSetAxisValue(primaryXAxis, data);
        }
        if (this.parseBoolValue(data[hasMajorGridLinesProperty[this.keywordIndex]])) {
            primaryXAxis.majorGridLines = { width: 1 };
        }
        if (this.parseBoolValue(data[hasMinorGridLinesProperty[this.keywordIndex]])) {
            primaryXAxis.minorTicksPerInterval = 4;
        }
        return primaryXAxis;
    }
    chartCategoryType(categoryType) {
        let type = '';
        switch (categoryType) {
            case 'Time':
                type = 'DateTime';
                break;
            case 'Automatic':
                type = 'Category';
                break;
        }
        return type;
    }
    chartPrimaryYAxis(data) {
        // json data
        let primaryYAxis = {};
        if (data[chartTitleProperty[this.keywordIndex]]) {
            primaryYAxis.title = data[chartTitleProperty[this.keywordIndex]];
        }
        this.checkAndSetAxisValue(primaryYAxis, data);
        if (data[hasMajorGridLinesProperty[this.keywordIndex]]) {
            primaryYAxis.majorGridLines = { width: 1 };
        }
        if (data[hasMinorGridLinesProperty[this.keywordIndex]]) {
            primaryYAxis.minorTicksPerInterval = 4;
        }
        return primaryYAxis;
    }
    checkAndSetAxisValue(primaryYAxis, data) {
        if (data[minimumValueProperty[this.keywordIndex]] !== 0) {
            primaryYAxis.minimum = data[minimumValueProperty[this.keywordIndex]];
        }
        if (data[maximumValueProperty[this.keywordIndex]] !== 0) {
            primaryYAxis.maximum = data[maximumValueProperty[this.keywordIndex]];
        }
        if (data[majorUnitProperty[this.keywordIndex]] !== 0) {
            primaryYAxis.interval = data[majorUnitProperty[this.keywordIndex]];
        }
    }
    chartData(chart, type) {
        // json data
        let data = chart[chartCategoryProperty[this.keywordIndex]];
        let chartData = [];
        for (let i = 0; i < data.length; i++) {
            let xData = data[parseInt(i.toString(), 10)];
            let plotValue = this.chartPlotData(xData, chart, type, i);
            chartData.push(plotValue);
        }
        return chartData;
    }
    chartPlotData(data, chart, type, count) {
        let plotValue = {};
        let series = chart[chartSeriesProperty[this.keywordIndex]];
        if (chart[chartPrimaryCategoryAxisProperty[this.keywordIndex]][numberFormatProperty[this.keywordIndex]] === 'm/d/yyyy') {
            let date = data[categoryXNameProperty[this.keywordIndex]];
            let array = date.split('/');
            let month = Number(array[0]);
            let day = Number(array[1]);
            let year = Number(array[2]);
            plotValue.x = new Date(year, month - 1, day);
        }
        else {
            plotValue.x = data[categoryXNameProperty[this.keywordIndex]];
        }
        for (let j = 0; j < series.length; j++) {
            let yData = data[chartDataProperty[this.keywordIndex]][parseInt(j.toString(), 10)];
            plotValue['y' + j] = yData[yValueProperty[this.keywordIndex]];
            if (type === 'Bubble') {
                plotValue['size' + j] = yData[sizeProperty[this.keywordIndex]];
            }
            if (chart[chartTypeProperty[this.keywordIndex]] === 'Pie' || chart[chartTypeProperty[this.keywordIndex]] === 'Doughnut' || chart[chartTypeProperty[this.keywordIndex]] === 'Column_Stacked') {
                let seriesData = series[parseInt(j.toString(), 10)];
                let seriesDataPoints = seriesData[dataPointsProperty[this.keywordIndex]].find((obj) => {
                    return obj.id === count;
                });
                if (!isNullOrUndefined(seriesDataPoints)) {
                    plotValue.color = this.chartFormat(seriesDataPoints, type);
                }
                else {
                    if (seriesData[dataPointsProperty[this.keywordIndex]].length > 1 && seriesData[dataPointsProperty[this.keywordIndex]][parseInt(count.toString(), 10)].id === 0) {
                        seriesDataPoints = seriesData[dataPointsProperty[this.keywordIndex]][parseInt(count.toString(), 10)];
                        plotValue.color = this.chartFormat(seriesDataPoints, type);
                    }
                    else {
                        if (!isNullOrUndefined(seriesData[seriesFormatProperty[this.keywordIndex]]) && !isNullOrUndefined(seriesData[seriesFormatProperty[this.keywordIndex]][fillProperty[this.keywordIndex]])) {
                            if (seriesData[seriesFormatProperty[this.keywordIndex]][fillProperty[this.keywordIndex]][rgbProperty[this.keywordIndex]].length > 7) {
                                plotValue.color = this.getColor(seriesData[seriesFormatProperty[this.keywordIndex]][fillProperty[this.keywordIndex]][rgbProperty[this.keywordIndex]]);
                            }
                        }
                    }
                }
            }
        }
        return plotValue;
    }
    getColor(color) {
        if (color.length > 0) {
            if (color[0] === '#') {
                if (color.length > 7) {
                    return color.substr(0, 7);
                }
            }
        }
        return color;
    }
    parseChartLegend(data) {
        let legendSettings = {};
        let position = data[positionProperty[this.keywordIndex]];
        if (position === 'Corner') {
            position = 'right';
        }
        if (position) {
            legendSettings.visible = true;
            legendSettings.position = position.charAt(0).toUpperCase() + position.slice(1);
        }
        else {
            legendSettings.visible = false;
        }
        return legendSettings;
    }
    parseBoolValue(value) {
        if (value instanceof String) {
            if (isNullOrUndefined(value) || value == "f" || value == "0" || value == "off" || value == "false") {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            if (value == 1) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    /**
     * Destroys the internal objects which is maintained.
     */
    destroy() {
        if (this.chart) {
            this.chart.destroy();
        }
        this.chart = undefined;
    }
}

const widthProperty = ['width', 'w'];
const heightProperty = ['height', 'h'];
const chartDataProperty = ['chartData', 'chd'];
const chartCategoryProperty = ['chartCategory', 'c'];
const chartSeriesProperty = ['chartSeries', 'cs'];
const chartLegendProperty = ['chartLegend', 'cl'];
const chartPrimaryCategoryAxisProperty = ['chartPrimaryCategoryAxis', 'cpca'];
const chartPrimaryValueAxisProperty = ['chartPrimaryValueAxis', 'cpva'];
const chartTitleProperty = ['chartTitle', 'ctt'];
const chartTypeProperty = ['chartType', 'ct'];
const trendLinesProperty = ['trendLines', 'tl'];
const dataPointsProperty = ['dataPoints', 'dp'];
const seriesNameProperty = ['seriesName', 'sn'];
const dataLabelProperty = ['dataLabel', 'sl'];
const errorBarProperty = ['errorBar', 'eb'];
const fillProperty = ['fill', 'f'];
const lineProperty = ['line', 'l'];
const rgbProperty = ['rgb', 'rgb'];
const foreColorProperty = ['foreColor', 'fc'];
const positionProperty = ['position', 'p'];
const typeProperty = ['type', 't'];
const nameProperty = ['name', 'n'];
const directionProperty = ['direction', 'dir'];
const endStyleProperty = ['endStyle', 'est'];
const forwardProperty = ['forward', 'fw'];
const backwardProperty = ['backward', 'bw'];
const interceptProperty = ['intercept', 'itr'];
const categoryTypeProperty = ['categoryType', 'ct'];
const hasMajorGridLinesProperty = ['hasMajorGridLines', 'hmajgl'];
const hasMinorGridLinesProperty = ['hasMinorGridLines', 'hmingl'];
const majorUnitProperty = ['majorUnit', 'maju'];
const maximumValueProperty = ['maximumValue', 'maxv'];
const minimumValueProperty = ['minimumValue', 'minv'];
const categoryXNameProperty = ['categoryXName', 'cx'];
const numberFormatProperty = ['numberFormat', 'nf'];
const yValueProperty = ['yValue', 'y'];
const sizeProperty = ['size', 'sz'];
const seriesFormatProperty = ['seriesFormat', 'sf'];

/**
 * export word-chart modules
 */

/**
 * export word-chart modules
 */

export { ChartComponent, widthProperty, heightProperty, chartDataProperty, chartCategoryProperty, chartSeriesProperty, chartLegendProperty, chartPrimaryCategoryAxisProperty, chartPrimaryValueAxisProperty, chartTitleProperty, chartTypeProperty, trendLinesProperty, dataPointsProperty, seriesNameProperty, dataLabelProperty, errorBarProperty, fillProperty, lineProperty, rgbProperty, foreColorProperty, positionProperty, typeProperty, nameProperty, directionProperty, endStyleProperty, forwardProperty, backwardProperty, interceptProperty, categoryTypeProperty, hasMajorGridLinesProperty, hasMinorGridLinesProperty, majorUnitProperty, maximumValueProperty, minimumValueProperty, categoryXNameProperty, numberFormatProperty, yValueProperty, sizeProperty, seriesFormatProperty };
//# sourceMappingURL=ej2-office-chart.es2015.js.map
