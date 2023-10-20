var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/* eslint-disable jsdoc/require-returns */
/* eslint-disable valid-jsdoc */
/* eslint-disable jsdoc/require-param */
import { withInRange } from '../../common/utils/helper';
import { PathOption } from '@syncfusion/ej2-svg-base';
import { subArraySum, getElement, appendChildElement, redrawElement } from '../../common/utils/helper';
import { ColumnBase } from './column-base';
/**
 * `WaterfallSeries` module is used to render the waterfall series.
 */
var WaterfallSeries = /** @class */ (function (_super) {
    __extends(WaterfallSeries, _super);
    function WaterfallSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render waterfall series.
     *
     * @returns {void}
     * @private
     */
    WaterfallSeries.prototype.render = function (series) {
        var rect;
        var sideBySideInfo = this.getSideBySideInfo(series);
        var origin = Math.max(series.yAxis.visibleRange.min, 0);
        var argsData;
        var prevEndValue = 0;
        var direction = '';
        var currentEndValue = 0;
        var originValue;
        var prevRegion = null;
        var y;
        var isInversed = series.chart.requireInvertedAxis;
        var intermediateOrigin = 0;
        var redraw = series.chart.redraw;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var point = _a[_i];
            point.symbolLocations = [];
            point.regions = [];
            if (point.visible && withInRange(series.points[point.index - 1], point, series.points[point.index + 1], series)) {
                //Calcute the current point value to render waterfall series.
                var isSum = this.isIntermediateSum(series, point.index);
                var totalSum = this.isSumIndex(series, point.index);
                currentEndValue += isSum || totalSum === true ? 0 : point.yValue;
                //Calcute the origin value for points
                originValue = (isSum === true ? intermediateOrigin : ((prevEndValue !== null && !totalSum) ? prevEndValue : origin));
                rect = this.getRectangle(point.xValue + sideBySideInfo.start, currentEndValue, point.xValue + sideBySideInfo.end, originValue, series);
                argsData = this.triggerPointRenderEvent(series, point);
                //intermediateOrigin is used only for imtermediate data
                if (isSum) {
                    intermediateOrigin = currentEndValue;
                }
                prevEndValue = currentEndValue;
                if (!argsData.cancel) {
                    this.updateSymbolLocation(point, rect, series);
                    this.drawRectangle(series, point, rect, argsData);
                }
                var currentRegion = point.regions[0];
                if (prevRegion !== null) {
                    var prevLeft = isInversed ? prevRegion.x : prevRegion.y;
                    var currentLeft = isInversed ? currentRegion.x : currentRegion.y;
                    var prevBottom = void 0;
                    var currentBottom = void 0;
                    var currentYValue = currentRegion.y;
                    var currentXValue = currentRegion.x;
                    var beforePoint = series.points[point.index - 1];
                    if (point.yValue === 0) {
                        prevBottom = isInversed ? prevRegion.x + prevRegion.width : prevRegion.y + prevRegion.height;
                        currentBottom = isInversed ?
                            point.symbolLocations[0].x : point.symbolLocations[0].y;
                    }
                    else {
                        prevBottom = isInversed ? (beforePoint.yValue === 0) ?
                            beforePoint.symbolLocations[0].x : prevRegion.x + prevRegion.width : (beforePoint.yValue === 0) ?
                            beforePoint.symbolLocations[0].y : prevRegion.y + prevRegion.height;
                        currentBottom = isInversed ?
                            currentRegion.x + currentRegion.width : currentRegion.y + currentRegion.height;
                    }
                    if (Math.round(prevLeft) === Math.round(currentLeft) ||
                        Math.round(prevBottom) === Math.round(currentLeft)) {
                        y = isInversed ? (currentRegion.x === 0 && prevRegion.x === 0) ? currentBottom : currentRegion.x : currentRegion.y;
                        y = (point.yValue === 0) ?
                            (isInversed ? point.symbolLocations[0].x : point.symbolLocations[0].y) : y;
                    }
                    else {
                        y = currentBottom;
                    }
                    if (isInversed) {
                        if (beforePoint.yValue === 0) {
                            prevRegion.y = ((prevRegion.y + prevRegion.height / 2) + (rect.height / 2)) - prevRegion.height;
                        }
                        if (point.yValue === 0) {
                            currentYValue = ((currentRegion.y + currentRegion.height / 2) - (rect.height / 2));
                        }
                        direction = direction.concat('M' + ' ' + y + ' ' + (prevRegion.y + prevRegion.height) + ' ' +
                            'L' + ' ' + y + ' ' + currentYValue + ' ');
                    }
                    else {
                        if (beforePoint.yValue === 0) {
                            prevRegion.x = ((prevRegion.x + prevRegion.width / 2) - (rect.width / 2));
                            currentXValue = ((currentRegion.x + currentRegion.width / 2) + (rect.width / 2)) - currentRegion.width;
                        }
                        direction = direction.concat('M' + ' ' + prevRegion.x + ' ' + y + ' ' +
                            'L' + ' ' + (currentXValue + currentRegion.width) + ' ' + y + ' ');
                    }
                }
                prevRegion = point.regions[0];
            }
        }
        var options = new PathOption(series.chart.element.id + '_Series_' + series.index + '_Connector_', 'none', series.connector.width, series.connector.color, series.opacity, series.connector.dashArray, direction);
        if (redraw && getElement(options.id)) {
            direction = getElement(options.id).getAttribute('d');
        }
        var element = (redrawElement(redraw, options.id, options, series.chart.renderer) ||
            series.chart.renderer.drawPath(options, new Int32Array([series.clipRect.x, series.clipRect.y])));
        element.style.visibility = (!series.chart.enableCanvas) ? ((series.animation.enable && series.chart.animateSeries) ?
            'hidden' : 'visible') : null;
        appendChildElement(series.chart.enableCanvas, series.seriesElement, element, redraw, true, null, null, null, direction);
        this.renderMarker(series);
    };
    /**
     * To check intermediateSumIndex in waterfall series.
     *
     * @returns {boolean} check intermediateSumIndex
     * @private
     */
    WaterfallSeries.prototype.isIntermediateSum = function (series, index) {
        if (series.intermediateSumIndexes !== undefined && series.intermediateSumIndexes.indexOf(index) !== -1) {
            return true;
        }
        return false;
    };
    /**
     * To check sumIndex in waterfall series.
     *
     * @returns {boolean} check sumIndex
     * @private
     */
    WaterfallSeries.prototype.isSumIndex = function (series, index) {
        if (series.sumIndexes !== undefined && series.sumIndexes.indexOf(index) !== -1) {
            return true;
        }
        return false;
    };
    /**
     * To trigger the point rendering event for waterfall series.
     *
     * @returns {IPointRenderEventArgs} point rendering event values
     * @private
     */
    WaterfallSeries.prototype.triggerPointRenderEvent = function (series, point) {
        var color;
        var isSum = this.isIntermediateSum(series, point.index);
        var totalSum = this.isSumIndex(series, point.index);
        if (isSum || totalSum) {
            color = series.summaryFillColor;
        }
        else if (point.y < 0) {
            color = series.negativeFillColor;
        }
        else {
            color = series.interior;
        }
        return this.triggerEvent(series, point, color, { color: series.border.color, width: series.border.width });
    };
    /**
     * Add sumIndex and intermediateSumIndex data.
     *
     * @returns {object[]} data
     * @private
     */
    WaterfallSeries.prototype.processInternalData = function (json, series) {
        var data = json;
        var index;
        var sumValue = 0;
        var intermediateSum = series.intermediateSumIndexes;
        var sumIndex = series.sumIndexes;
        if (intermediateSum !== undefined && intermediateSum.length > 0) {
            for (var i = 0; i < intermediateSum.length; i++) {
                for (var j = 0; j < data.length; j++) {
                    if (j === intermediateSum[i]) {
                        if (i === 0) {
                            index = subArraySum(data, -1, intermediateSum[i], null, series);
                        }
                        else {
                            index = subArraySum(data, intermediateSum[i - 1], intermediateSum[i], null, series);
                        }
                        data[j][series.yName] = index;
                    }
                }
            }
        }
        if (sumIndex !== undefined && sumIndex.length > 0) {
            for (var k = 0; k < sumIndex.length; k++) {
                for (var j = 0; j < data.length; j++) {
                    if (j === sumIndex[k]) {
                        if (intermediateSum !== undefined) {
                            index = subArraySum(data, intermediateSum[k] - 1, sumIndex[k], sumIndex, series);
                        }
                        else {
                            if (k === 0) {
                                index = subArraySum(data, -1, sumIndex[k], null, series);
                            }
                            else {
                                index = subArraySum(data, sumIndex[k - 1], sumIndex[k], null, series);
                            }
                        }
                        sumValue += index;
                        data[j][series.yName] = sumValue;
                    }
                }
            }
        }
        return data;
    };
    /**
     * Animates the series.
     *
     * @param  {Series} series - Defines the series to animate.
     * @returns {void}
     */
    WaterfallSeries.prototype.doAnimation = function (series) {
        this.animate(series);
    };
    /**
     * Get module name.
     */
    WaterfallSeries.prototype.getModuleName = function () {
        return 'WaterfallSeries';
        /**
         * return the module name
         */
    };
    /**
     * To destroy the waterfall series.
     *
     * @returns {void}
     * @private
     */
    WaterfallSeries.prototype.destroy = function () {
        /**
         * Destroys the waterfall series.
         */
    };
    return WaterfallSeries;
}(ColumnBase));
export { WaterfallSeries };
