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
/* eslint-disable jsdoc/require-param */
/* eslint-disable valid-jsdoc */
/* eslint-disable jsdoc/require-returns */
import { getPoint, appendClipElement, pathAnimation } from '../../common/utils/helper';
import { LineBase } from './line-base';
import { RectOption, getElement } from '../../common/utils/helper';
import { DataUtil } from '@syncfusion/ej2-data';
/**
 * Base class for multi colored series
 */
var MultiColoredSeries = /** @class */ (function (_super) {
    __extends(MultiColoredSeries, _super);
    function MultiColoredSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * To Generate the area path direction.
     *
     * @param {number} xValue xValue
     * @param {number} yValue yValue
     * @param {Series} series series
     * @param {boolean} isInverted isInverted
     * @param {Function} getPointLocation getPointLocation
     * @param {ChartLocation} startPoint startPoint
     * @param {string} startPath startPath
     */
    MultiColoredSeries.prototype.getAreaPathDirection = function (xValue, yValue, series, isInverted, getPointLocation, startPoint, startPath) {
        var direction = '';
        var firstPoint;
        if (startPoint === null) {
            firstPoint = getPointLocation(xValue, yValue, series.xAxis, series.yAxis, isInverted, series);
            direction += (startPath + ' ' + (firstPoint.x) + ' ' + (firstPoint.y) + ' ');
        }
        return direction;
    };
    /**
     * To Generate the empty point direction.
     *
     * @param {ChartLocation} firstPoint firstPoint
     * @param {ChartLocation} secondPoint secondPoint
     * @param {Series} series series
     * @param {boolean} isInverted isInverted
     * @param {Function} getPointLocation getPointLocation
     */
    MultiColoredSeries.prototype.getAreaEmptyDirection = function (firstPoint, secondPoint, series, isInverted, getPointLocation) {
        var direction = '';
        direction += this.getAreaPathDirection(firstPoint.x, firstPoint.y, series, isInverted, getPointLocation, null, 'L');
        direction += this.getAreaPathDirection(secondPoint.x, secondPoint.y, series, isInverted, getPointLocation, null, 'L');
        return direction;
    };
    /**
     * To set point color.
     */
    MultiColoredSeries.prototype.setPointColor = function (currentPoint, previous, series, isXSegment, segments) {
        if (series.pointColorMapping === '') {
            var segment = void 0;
            var value = void 0;
            for (var i = 0; i < segments.length; i++) {
                segment = segments[i];
                value = isXSegment ? currentPoint.xValue : currentPoint.yValue;
                if (value <= this.getAxisValue(segment.value, isXSegment ? series.xAxis : series.yAxis, series.chart) ||
                    (!segment.value && segment.value !== 0)) {
                    currentPoint.interior = segment.color;
                    break;
                }
            }
            if (currentPoint.interior == null) {
                currentPoint.interior = series.interior;
            }
            return false;
        }
        else {
            if (previous) {
                return series.setPointColor(currentPoint, series.interior) !== series.setPointColor(previous, series.interior);
            }
            else {
                return false;
            }
        }
    };
    MultiColoredSeries.prototype.sortSegments = function (series, chartSegments) {
        var _this = this;
        var axis = series.segmentAxis === 'X' ? series.xAxis : series.yAxis;
        var segments = [].concat(chartSegments);
        return segments.sort(function (a, b) {
            return _this.getAxisValue(a.value, axis, series.chart) - _this.getAxisValue(b.value, axis, series.chart);
        });
    };
    /**
     * Segment calculation performed here.
     *
     * @param {Series} series series
     * @param {PathOption[]} options options
     * @param {ChartSegmentModel[]} segments chartSegments
     */
    MultiColoredSeries.prototype.applySegmentAxis = function (series, options, segments) {
        var _this = this;
        if (series.pointColorMapping !== '') {
            options.map(function (option) {
                _this.appendLinePath(option, series, '');
            });
            return null;
        }
        var isXSegment = series.segmentAxis === 'X';
        var axis = isXSegment ? series.xAxis : series.yAxis;
        var chart = series.chart;
        var segment;
        this.includeSegment(segments, axis, series, segments.length);
        var length = segments.length;
        var value;
        var clipPath;
        var attributeOptions;
        var areaBorderCount = 0;
        var _loop_1 = function (index) {
            segment = segments[index];
            value = this_1.getAxisValue(segment.value, axis, series.chart);
            clipPath = this_1.createClipRect(index ? this_1.getAxisValue(segments[index - 1].value, axis, series.chart)
                : axis.visibleRange.min, value, series, index, isXSegment);
            if (clipPath) {
                options.map(function (option) {
                    areaBorderCount += 1;
                    attributeOptions = {
                        'clip-path': clipPath,
                        'stroke-dasharray': segment.dashArray,
                        'opacity': option.opacity,
                        'stroke': series.type.indexOf('Line') > -1 ? segment.color || series.interior : option['stroke'],
                        'stroke-width': option['stroke-width'],
                        'fill': series.type.indexOf('Line') > -1 ? 'none' : segment.color || series.interior,
                        'id': option.id + '_Segment_' + index,
                        'd': option.d
                    };
                    if (areaBorderCount % 2 === 0 && _this.chart.multiColoredAreaSeriesModule && series.border.color !== 'transparent' && attributeOptions['stroke-width'] !== 0) {
                        attributeOptions.fill = 'transparent';
                    }
                    pathAnimation(getElement(attributeOptions.id), attributeOptions.d, chart.redraw);
                    series.pathElement = chart.renderer.drawPath(attributeOptions);
                    if (!series.chart.enableCanvas) {
                        series.seriesElement.appendChild(chart.renderer.drawPath(attributeOptions));
                    }
                });
            }
        };
        var this_1 = this;
        for (var index = 0; index < length; index++) {
            _loop_1(index);
        }
    };
    MultiColoredSeries.prototype.includeSegment = function (segments, axis, series, length) {
        if (length <= 0) {
            segments.push({ value: axis.visibleRange.max, color: series.interior });
            return null;
        }
        if (this.getAxisValue(segments[length - 1].value, axis, series.chart) < axis.visibleRange.max) {
            segments.push({ value: axis.visibleRange.max, color: series.interior });
        }
    };
    /**
     * To create clip rect for segment axis.
     *
     * @param {number} startValue startValue
     * @param {number} endValue endValue
     * @param {Series} series series
     * @param {number} index index
     * @param {boolean} isX isX
     */
    MultiColoredSeries.prototype.createClipRect = function (startValue, endValue, series, index, isX) {
        var isRequired = series.chart.requireInvertedAxis;
        var startPointLocation = getPoint(isX ? startValue : series.xAxis.visibleRange.min, isX ? series.yAxis.visibleRange.max : endValue, series.xAxis, series.yAxis, isRequired);
        var endPointLocation = getPoint(isX ? endValue : series.xAxis.visibleRange.max, isX ? series.yAxis.visibleRange.min : startValue, series.xAxis, series.yAxis, isRequired);
        endPointLocation = isRequired ?
            [startPointLocation, startPointLocation = endPointLocation][0] : endPointLocation;
        var options;
        if ((series.xAxis.isInversed ? startPointLocation.x - endPointLocation.x > 0 : endPointLocation.x - startPointLocation.x > 0) &&
            (series.yAxis.isInversed ? startPointLocation.y - endPointLocation.y > 0 : endPointLocation.y - startPointLocation.y > 0)) {
            options = new RectOption(series.chart.element.id + '_ChartSegment' + series.index + 'ClipRect_' + index, 'transparent', { width: 1, color: 'Gray' }, 1, {
                x: series.xAxis.isInversed ? endPointLocation.x : startPointLocation.x,
                y: series.yAxis.isInversed ? endPointLocation.y : startPointLocation.y,
                width: series.xAxis.isInversed ? startPointLocation.x - endPointLocation.x : endPointLocation.x - startPointLocation.x,
                height: series.yAxis.isInversed ? startPointLocation.y - endPointLocation.y : endPointLocation.y - startPointLocation.y
            });
            if (!series.chart.enableCanvas) {
                series.seriesElement.appendChild(appendClipElement(series.chart.redraw, options, series.chart.renderer));
            }
            return 'url(#' + series.chart.element.id + '_ChartSegment' + series.index + 'ClipRect_' + index + ')';
        }
        return null;
    };
    /**
     * To get exact value from segment value.
     *
     * @param {Object} segmentValue segmentValue
     * @param {Axis} axis axis
     * @param {Chart} chart chart
     */
    MultiColoredSeries.prototype.getAxisValue = function (segmentValue, axis, chart) {
        if (segmentValue === null) {
            segmentValue = axis.visibleRange.max;
        }
        if (axis.valueType === 'DateTime') {
            var option = { skeleton: 'full', type: 'dateTime' };
            return Date.parse(chart.intl.getDateParser(option)(chart.intl.getDateFormat(option)(new Date(DataUtil.parse.parseJson({ val: segmentValue }).val))));
        }
        else if (axis.valueType.indexOf('Category') > -1) {
            var xValue = axis.valueType === 'DateTimeCategory' ?
                (segmentValue.getTime()).toString() :
                segmentValue;
            return (axis.labels.indexOf(xValue) < 0) ? +segmentValue : axis.labels.indexOf(xValue);
        }
        else {
            return +segmentValue;
        }
    };
    return MultiColoredSeries;
}(LineBase));
export { MultiColoredSeries };
