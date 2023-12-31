/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jsdoc/require-returns */
/* eslint-disable valid-jsdoc */
/* eslint-disable jsdoc/require-param */
import { getAnimationFunction, pathAnimation, getElement } from '../../common/utils/helper';
import { Rect } from '@syncfusion/ej2-svg-base';
import { Animation, isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * Base for line type series.
 */
var LineBase = /** @class */ (function () {
    /** @private */
    function LineBase(chartModule) {
        this.chart = chartModule;
    }
    /**
     * To improve the chart performance.
     *
     * @returns {void}
     * @private
     */
    LineBase.prototype.enableComplexProperty = function (series) {
        var tempPoints = [];
        var tempPoints2 = [];
        var xVisibleRange = series.xAxis.visibleRange;
        var yVisibleRange = series.yAxis.visibleRange;
        var seriesPoints = series.points;
        var areaBounds = series.clipRect;
        var xTolerance = Math.abs(xVisibleRange.delta / areaBounds.width);
        var yTolerance = Math.abs(yVisibleRange.delta / areaBounds.height);
        var prevXValue = (seriesPoints[0] && seriesPoints[0].xValue > xTolerance) ? 0 : xTolerance;
        var prevYValue = (seriesPoints[0] && seriesPoints[0].y > yTolerance) ? 0 : yTolerance;
        var xVal = 0;
        var yVal = 0;
        for (var _i = 0, seriesPoints_1 = seriesPoints; _i < seriesPoints_1.length; _i++) {
            var currentPoint = seriesPoints_1[_i];
            currentPoint.symbolLocations = [];
            xVal = currentPoint.xValue ? currentPoint.xValue : xVisibleRange.min;
            yVal = currentPoint.yValue ? currentPoint.yValue : yVisibleRange.min;
            if (Math.abs(prevXValue - xVal) >= xTolerance || Math.abs(prevYValue - yVal) >= yTolerance) {
                tempPoints.push(currentPoint);
                prevXValue = xVal;
                prevYValue = yVal;
            }
        }
        var tempPoint;
        for (var i = 0; i < tempPoints.length; i++) {
            tempPoint = tempPoints[i];
            if (isNullOrUndefined(tempPoint.x) || (series.category === 'Indicator' && (isNaN(tempPoint.xValue) || isNaN(tempPoint.yValue)))) {
                continue;
            }
            else {
                tempPoints2.push(tempPoint);
            }
        }
        return tempPoints2;
    };
    /**
     * To generate the line path direction.
     *
     * @param {Points} firstPoint firstPoint
     * @param {Points} secondPoint secondPoint
     * @param {Series} series series
     * @param {boolean} isInverted isInverted
     * @param {Function} getPointLocation getPointLocation
     * @param {string} startPoint startPoint
     */
    LineBase.prototype.getLineDirection = function (firstPoint, secondPoint, series, isInverted, getPointLocation, startPoint) {
        var direction = '';
        if (firstPoint != null) {
            var point1 = getPointLocation(firstPoint.xValue, firstPoint.yValue, series.xAxis, series.yAxis, isInverted, series);
            var point2 = getPointLocation(secondPoint.xValue, secondPoint.yValue, series.xAxis, series.yAxis, isInverted, series);
            direction = startPoint + ' ' + (point1.x) + ' ' + (point1.y) + ' ' +
                'L' + ' ' + (point2.x) + ' ' + (point2.y) + ' ';
        }
        return direction;
    };
    /**
     * To append the line path.
     *
     * @returns {void}
     * @private
     */
    LineBase.prototype.appendLinePath = function (options, series, clipRect) {
        var element = getElement(options.id);
        var chart = series.chart;
        var previousDirection = element ? element.getAttribute('d') : null;
        var htmlObject = series.chart.renderer.drawPath(options, new Int32Array([series.clipRect.x, series.clipRect.y]));
        if (htmlObject) {
            htmlObject.setAttribute('clip-path', clipRect);
        }
        series.pathElement = htmlObject;
        if (!series.chart.enableCanvas) {
            series.seriesElement.appendChild(htmlObject);
        }
        series.isRectSeries = false;
        pathAnimation(element, options.d, series.chart.redraw, previousDirection, chart.duration);
    };
    /**
     * To render the marker for the series.
     *
     * @returns {void}
     * @private
     */
    LineBase.prototype.renderMarker = function (series) {
        if (series.marker && series.marker.visible) {
            series.chart.markerRender.render(series);
        }
    };
    /**
     * To do the progressive animation.
     *
     * @returns {void}
     * @private
     */
    LineBase.prototype.doProgressiveAnimation = function (series, option) {
        var animation = new Animation({});
        var path = series.pathElement;
        var strokeDashArray = path.getAttribute('stroke-dasharray');
        var pathLength = series.pathElement.getTotalLength();
        var currentTime;
        path.style.visibility = 'hidden';
        animation.animate(path, {
            duration: option.duration,
            delay: option.delay,
            progress: function (args) {
                if (args.timeStamp >= args.delay) {
                    path.style.visibility = 'visible';
                    currentTime = Math.abs(Math.round(((args.timeStamp - args.delay) * pathLength) / args.duration));
                    path.setAttribute('stroke-dasharray', currentTime + ',' + pathLength);
                }
            },
            end: function () {
                path.setAttribute('stroke-dasharray', strokeDashArray);
                series.chart.trigger('animationComplete', { series: series.chart.isBlazor ? {} : series });
            }
        });
    };
    /**
     * To store the symbol location and region.
     *
     * @param {Points} point point
     * @param {Series} series series
     * @param {boolean} isInverted isInverted
     * @param {Function} getLocation getLocation
     */
    LineBase.prototype.storePointLocation = function (point, series, isInverted, getLocation) {
        var markerWidth = (series.marker && series.marker.width) ? series.marker.width : 0;
        var markerHeight = (series.marker && series.marker.height) ? series.marker.height : 0;
        point.symbolLocations.push(getLocation(point.xValue, point.yValue, series.xAxis, series.yAxis, isInverted, series));
        point.regions.push(new Rect(point.symbolLocations[0].x - markerWidth, point.symbolLocations[0].y - markerHeight, 2 * markerWidth, 2 * markerHeight));
    };
    /**
     * To find point with in the visible range
     *
     * @param {Points} point point
     * @param {Axis} yAxis yAxis
     * @private
     */
    LineBase.prototype.withinYRange = function (point, yAxis) {
        return point.yValue >= yAxis.visibleRange.min && point.yValue <= yAxis.visibleRange.max;
    };
    /**
     * To get first and last visible points
     *
     * @private
     */
    LineBase.prototype.getFirstLastVisiblePoint = function (points) {
        var first = null;
        var last = null;
        for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
            var point = points_1[_i];
            if (first === null && point.visible) {
                first = last = point;
            }
            last = point.visible ? point : last;
        }
        return { first: first ? first : points[0], last: last ? last : points[points.length - 1] };
    };
    /**
     * To Generate the area series border path direction from area series main direction path.
     *
     *  @param {string} direction direction
     *
     * */
    LineBase.prototype.getBorderDirection = function (direction) {
        var coordinates = direction.split(' ');
        if (coordinates.length > 3 && !(this.chart.stackingAreaSeriesModule) && !(this.chart.stackingStepAreaSeriesModule)) {
            coordinates.splice(coordinates.length - 4, 3);
        }
        else if (this.chart.stackingAreaSeriesModule || this.chart.stackingStepAreaSeriesModule) {
            coordinates.splice(coordinates.length / 2 + 1, coordinates.length / 2 + 1);
            if (coordinates[coordinates.length - 1] === 'L') {
                coordinates.splice(coordinates.length - 1, 1);
            }
        }
        return coordinates.join(' ');
    };
    /**
     * To remove empty point directions from series direction of area types.
     *
     *  @param {string} borderDirection direction
     *
     * */
    LineBase.prototype.removeEmptyPointsBorder = function (borderDirection) {
        var startIndex = 0;
        var coordinates = borderDirection.split(' ');
        // eslint-disable-next-line @typescript-eslint/tslint/config
        var point;
        do {
            point = coordinates.indexOf('M', startIndex);
            if (point > -1) {
                coordinates.splice(point + 1, 3);
                startIndex = point + 1;
                if (point - 6 > 0) {
                    coordinates.splice(point - 6, 6);
                    startIndex -= 6;
                }
            }
        } while (point !== -1);
        return coordinates.join(' ');
    };
    /**
     * To do the linear animation.
     *
     * @returns {void}
     * @private
     */
    LineBase.prototype.doLinearAnimation = function (series, animation) {
        var clipRect = series.clipRectElement.childNodes[0].childNodes[0];
        var duration = series.chart.animated ? series.chart.duration : animation.duration;
        var effect = getAnimationFunction('Linear');
        var elementHeight = +clipRect.getAttribute('height');
        var elementWidth = +clipRect.getAttribute('width');
        var xCenter = +clipRect.getAttribute('x');
        var yCenter = series.chart.requireInvertedAxis ? +clipRect.getAttribute('height') + +clipRect.getAttribute('y') :
            +clipRect.getAttribute('y');
        var value;
        clipRect.style.visibility = 'hidden';
        new Animation({}).animate(clipRect, {
            duration: duration,
            delay: animation.delay,
            progress: function (args) {
                if (args.timeStamp >= args.delay) {
                    clipRect.style.visibility = 'visible';
                    if (series.chart.requireInvertedAxis) {
                        value = effect(args.timeStamp - args.delay, 0, elementHeight, args.duration);
                        clipRect.setAttribute('transform', 'translate(' + xCenter + ' ' + yCenter +
                            ') scale(1,' + (value / elementHeight) + ') translate(' + (-xCenter) + ' ' + (-yCenter) + ')');
                    }
                    else {
                        value = effect(args.timeStamp - args.delay, 0, elementWidth, args.duration);
                        clipRect.setAttribute('transform', 'translate(' + xCenter + ' ' + yCenter +
                            ') scale(' + (value / elementWidth) + ', 1) translate(' + (-xCenter) + ' ' + (-yCenter) + ')');
                    }
                }
            },
            end: function () {
                clipRect.setAttribute('transform', 'translate(0,0)');
                series.chart.trigger('animationComplete', { series: series.chart.isBlazor ? {} : series });
            }
        });
    };
    return LineBase;
}());
export { LineBase };
