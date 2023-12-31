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
import { getPoint, withInRange, ChartLocation } from '../../common/utils/helper';
import { PathOption, Rect } from '@syncfusion/ej2-svg-base';
import { LineBase } from './line-base';
/**
 * `RangeStepAreaSeries` Module used to render the range step area series.
 */
var RangeStepAreaSeries = /** @class */ (function (_super) {
    __extends(RangeStepAreaSeries, _super);
    function RangeStepAreaSeries() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.borderDirection = '';
        _this.prevPoint = null;
        return _this;
    }
    /**
     * Render RangeStepArea series.
     *
     * @returns {void}
     * @private
     */
    RangeStepAreaSeries.prototype.render = function (series, xAxis, yAxis, isInverted) {
        var point;
        var currentPoint;
        var secondPoint;
        var start = null;
        var direction = '';
        var lineLength = 0;
        var command = 'M';
        var closed = undefined;
        var low;
        var high;
        var borderWidth = series.border.width ? series.border.width : 0;
        var borderColor = series.border.color ? series.border.color : series.interior;
        var origin = Math.max(series.yAxis.visibleRange.min, 0);
        var visiblePoints = this.enableComplexProperty(series);
        if (xAxis.valueType === 'Category' && xAxis.labelPlacement === 'BetweenTicks') {
            lineLength = 0.5;
        }
        for (var i = 0, length_1 = visiblePoints.length; i < length_1; i++) {
            point = visiblePoints[i];
            point.symbolLocations = [];
            point.regions = [];
            low = Math.min(point.low, point.high);
            high = Math.max(point.low, point.high);
            if (yAxis.isAxisInverse) {
                var temp = low;
                low = high;
                high = temp;
            }
            var lowPoint = getPoint(point.xValue, low, xAxis, yAxis, isInverted);
            var highPoint = getPoint(point.xValue, high, xAxis, yAxis, isInverted);
            point.symbolLocations.push(highPoint);
            point.symbolLocations.push(lowPoint);
            var rect = new Rect(Math.min(lowPoint.x, highPoint.x), Math.min(lowPoint.y, highPoint.y), Math.max(Math.abs(highPoint.x - lowPoint.x), series.marker.width), Math.max(Math.abs(highPoint.y - lowPoint.y), series.marker.width));
            point.regions.push(rect);
            //Path to connect the high points.
            if (point.visible && withInRange(visiblePoints[point.index - 1], point, visiblePoints[point.index + 1], series)) {
                if (start === null) {
                    start = new ChartLocation(point.xValue, 0);
                    // Start point for the current path.
                    currentPoint = getPoint(point.xValue - lineLength, origin, xAxis, yAxis, isInverted);
                    direction += (command + ' ' + (currentPoint.x) + ' ' + (currentPoint.y) + ' ');
                    currentPoint = getPoint(point.xValue - lineLength, point.high > point.low ? point.high
                        : point.low, xAxis, yAxis, isInverted);
                    direction += ('L' + ' ' + (currentPoint.x) + ' ' + (currentPoint.y) + ' ');
                    this.borderDirection += (command + ' ' + (currentPoint.x) + ' ' + (currentPoint.y) + ' ');
                }
                // First Point to draw the RangeStepArea path.
                if (this.prevPoint != null) {
                    currentPoint = getPoint(point.xValue, point.high > point.low ? point.high
                        : point.low, xAxis, yAxis, isInverted);
                    secondPoint = getPoint(this.prevPoint.xValue, this.prevPoint.high > this.prevPoint.low ? this.prevPoint.high
                        : this.prevPoint.low, xAxis, yAxis, isInverted);
                    direction += (command + ' ' +
                        (currentPoint.x) + ' ' + (secondPoint.y) + command + ' ' + (currentPoint.x) + ' ' + (currentPoint.y) + ' ');
                    this.borderDirection += (command + ' ' +
                        (currentPoint.x) + ' ' + (secondPoint.y) + command + ' ' + (currentPoint.x) + ' ' + (currentPoint.y) + ' ');
                }
                else if (series.emptyPointSettings.mode === 'Gap') {
                    currentPoint = getPoint(point.xValue, point.high > point.low ? point.high
                        : point.low, xAxis, yAxis, isInverted);
                    direction += command + ' ' + (currentPoint.x) + ' ' + (currentPoint.y) + ' ';
                    this.borderDirection += command + ' ' + (currentPoint.x) + ' ' + (currentPoint.y) + ' ';
                }
                closed = false;
                if ((i + 1 < visiblePoints.length && !visiblePoints[i + 1].visible)
                    || i === visiblePoints.length - 1) {
                    // Path to connect the low points.
                    direction = this.closeRangeStepAreaPath(visiblePoints, point, series, direction, i, xAxis, yAxis, isInverted);
                    command = 'M';
                    direction = direction.concat(' ' + 'Z');
                    closed = true;
                }
                command = ' L';
                this.prevPoint = point;
            }
            else {
                if (closed === false && i !== 0) {
                    direction = this.closeRangeStepAreaPath(visiblePoints, point, series, direction, i, xAxis, yAxis, isInverted);
                    closed = true;
                }
                command = 'M';
                point.symbolLocations = [];
            }
        }
        var options = new PathOption(series.chart.element.id + '_Series_' + series.index, series.interior, 0, 'transparent', series.opacity, series.dashArray, direction);
        this.appendLinePath(options, series, '');
        /**
         * To draw border for the range step area chart.
         */
        if (series.border.width !== 0) {
            this.appendLinePath(new PathOption(series.chart.element.id + '_Series_border_' + series.index, 'transparent', borderWidth, borderColor, 1, series.dashArray, this.borderDirection), series, '');
            this.borderDirection = '';
        }
        this.renderMarker(series);
    };
    /**
     * Calculating path direction for rendering the low points.
     *
     * @returns {void}.
     * @private
     */
    RangeStepAreaSeries.prototype.closeRangeStepAreaPath = function (visiblePoints, point, series, direction, i, xAxis, yAxis, isInverted) {
        var currentPoint;
        var secondPoint;
        var low;
        var high;
        for (var j = i; j >= 0; j--) {
            if (visiblePoints[j].visible) {
                point = visiblePoints[j];
                low = Math.min(point.low, point.high);
                high = Math.max(point.low, point.high);
                if (yAxis.isAxisInverse) {
                    var temp = low;
                    low = high;
                    high = temp;
                }
                // Lowpoint for RangeStepArea path.
                if (this.prevPoint != null) {
                    currentPoint = getPoint(point.xValue, point.low < point.high ? point.low
                        : point.high, xAxis, yAxis, isInverted);
                    secondPoint = getPoint(this.prevPoint.xValue, this.prevPoint.low < this.prevPoint.high ? this.prevPoint.low
                        : this.prevPoint.high, xAxis, yAxis, isInverted);
                    direction += ('L' + ' ' +
                        (currentPoint.x) + ' ' + (secondPoint.y) + ' L' + ' ' + (currentPoint.x) + ' ' + (currentPoint.y) + ' ');
                    if (j === i) {
                        this.borderDirection += 'M' + ' ' +
                            (currentPoint.x) + ' ' + (currentPoint.y) + ' L' + ' ' + (currentPoint.x) + ' ' + (currentPoint.y) + ' ';
                    }
                    else {
                        this.borderDirection += 'L' + ' ' +
                            (currentPoint.x) + ' ' + (secondPoint.y) + ' L' + ' ' + (currentPoint.x) + ' ' + (currentPoint.y) + ' ';
                    }
                }
            }
            else {
                break;
            }
            this.prevPoint = point;
        }
        return direction;
    };
    /**
     * Animates the series.
     *
     * @param  {Series} series - Defines the series to animate.
     * @returns {void}
     */
    RangeStepAreaSeries.prototype.doAnimation = function (series) {
        var option = series.animation;
        this.doLinearAnimation(series, option);
    };
    /**
     * Get module name.
     */
    RangeStepAreaSeries.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series.
         */
        return 'RangeStepAreaSeries';
    };
    /**
     * To destroy the range step area series.
     *
     * @returns {void}
     * @private
     */
    RangeStepAreaSeries.prototype.destroy = function () {
        /**
         * Destroys range step area series.
         */
    };
    return RangeStepAreaSeries;
}(LineBase));
export { RangeStepAreaSeries };
