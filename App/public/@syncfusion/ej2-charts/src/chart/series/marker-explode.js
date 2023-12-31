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
/* eslint-disable jsdoc/check-param-names */
/* eslint-disable jsdoc/require-param-type */
/* eslint-disable jsdoc/require-param */
/* eslint-disable jsdoc/require-param-description */
/* eslint-disable valid-jsdoc */
import { drawSymbol } from '../../common/utils/helper';
import { PathOption, Size } from '@syncfusion/ej2-svg-base';
import { Browser, extend, remove, isNullOrUndefined, Animation } from '@syncfusion/ej2-base';
import { ChartData } from '../../chart/utils/get-data';
import { withInBounds, PointData, stopTimer } from '../../common/utils/helper';
import { colorNameToHex, convertHexToColor } from '../../common/utils/helper';
/**
 * Marker Module used to render the marker for line type series.
 */
var MarkerExplode = /** @class */ (function (_super) {
    __extends(MarkerExplode, _super);
    /**
     * Constructor for the marker module.
     *
     * @private
     */
    function MarkerExplode(chart) {
        var _this = _super.call(this, chart) || this;
        _this.elementId = chart.element.id;
        _this.commonXvalues = [];
        return _this;
    }
    /**
     * @hidden
     */
    MarkerExplode.prototype.addEventListener = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        this.chart.on(Browser.touchMoveEvent, this.mouseMoveHandler, this);
        this.chart.on(Browser.touchEndEvent, this.mouseUpHandler, this);
    };
    /**
     * @hidden
     */
    MarkerExplode.prototype.removeEventListener = function () {
        if (this.chart.isDestroyed) {
            return;
        }
        this.chart.off(Browser.touchMoveEvent, this.mouseMoveHandler);
        this.chart.off(Browser.touchEndEvent, this.mouseUpHandler);
    };
    /**
     * @hidden
     */
    MarkerExplode.prototype.mouseUpHandler = function () {
        var chart = this.chart;
        if (chart.isTouch && !chart.crosshair.enable && !this.isSelected(chart)) {
            this.markerMove(true);
        }
    };
    /**
     * @hidden
     */
    MarkerExplode.prototype.mouseMoveHandler = function () {
        var chart = this.chart;
        if ((chart.highlightMode !== 'None' || (chart.tooltip.enable)) && (!chart.isTouch || chart.startMove) && !this.isSelected(chart)) {
            this.markerMove(false);
        }
    };
    MarkerExplode.prototype.markerMove = function (remove) {
        var _this = this;
        var chart = this.chart;
        this.currentPoints = [];
        var data;
        var previous;
        var explodeSeries;
        var series;
        if (!chart.tooltip.shared || !chart.tooltip.enable) {
            data = this.getData();
            series = data.series;
            previous = this.previousPoints[0];
            explodeSeries = series && ((series.type === 'Bubble' || series.drawType === 'Scatter' || series.type === 'Scatter') ||
                (((series.type !== 'Candle') && (series.type !== 'Hilo') && (series.type !== 'HiloOpenClose')) &&
                    (series.marker.visible && series.marker.width !== 0 && series.marker.height !== 0)));
            data.lierIndex = this.lierIndex;
            if (data.point && explodeSeries && ((!previous || (previous.point !== data.point)) ||
                (previous && previous.lierIndex > 3 && previous.lierIndex !== this.lierIndex))) {
                this.currentPoints.push(data);
            }
            if (data.point && explodeSeries && chart.isPointMouseDown) {
                this.currentPoints.push(data);
            }
        }
        else {
            if (!withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect)) {
                return null;
            }
            if (chart.tooltip.enable) {
                var pointData = chart.chartAreaType === 'PolarRadar' ? this.getData() : null;
                for (var _i = 0, _a = chart.visibleSeries; _i < _a.length; _i++) {
                    var chartSeries = _a[_i];
                    if (!chartSeries.enableTooltip || chartSeries.category === 'Indicator') {
                        continue;
                    }
                    if (chart.chartAreaType === 'Cartesian' && chartSeries.visible) {
                        data = this.getClosestX(chart, chartSeries, this.commonXValue(this.chart.visibleSeries));
                    }
                    else if (chart.chartAreaType === 'PolarRadar' && chartSeries.visible && pointData.point !== null) {
                        data = new PointData(chartSeries.points[pointData.point.index], chartSeries);
                    }
                    if (data) {
                        this.currentPoints.push(data);
                        data = null;
                    }
                }
            }
        }
        var length = this.previousPoints.length;
        if (this.currentPoints.length > 0) {
            if (length === 0 || chart.isPointMouseDown || (length > 0 && this.previousPoints[0].point !== this.currentPoints[0].point)) {
                if (this.previousPoints.length > 0) {
                    for (var _b = 0, _c = this.previousPoints; _b < _c.length; _b++) {
                        var previousPoint = _c[_b];
                        if (!isNullOrUndefined(previousPoint)) {
                            this.removeHighlightedMarker(previousPoint.series, previousPoint.point);
                        }
                    }
                }
                var _loop_1 = function (data_1) {
                    if ((data_1 && data_1.point) || ((series.type !== 'Candle') &&
                        (series.type !== 'Hilo') && (series.type !== 'HiloOpenClose'))) {
                        stopTimer(this_1.markerExplode);
                        this_1.isRemove = true;
                        data_1.point.symbolLocations.map(function (location, index) {
                            if (data_1.series.marker.allowHighlight && (!data_1.series.isRectSeries || data_1.point.marker.visible)) {
                                _this.drawTrackBall(data_1.series, data_1.point, location, index);
                            }
                        });
                    }
                };
                var this_1 = this;
                for (var _d = 0, _e = this.currentPoints; _d < _e.length; _d++) {
                    var data_1 = _e[_d];
                    _loop_1(data_1);
                }
                this.previousPoints = extend([], this.currentPoints, null, true);
            }
        }
        if (!chart.tooltip.enable && ((this.currentPoints.length === 0 && this.isRemove) || (remove && this.isRemove) ||
            !withInBounds(chart.mouseX, chart.mouseY, chart.chartAxisLayoutPanel.seriesClipRect))) {
            this.isRemove = false;
            if (!isNullOrUndefined(this.previousPoints[0])) {
                this.markerExplode = +setTimeout(function () {
                    if (_this.previousPoints[0]) {
                        _this.removeHighlightedMarker(_this.previousPoints[0].series, _this.previousPoints[0].point);
                    }
                }, 2000);
            }
        }
        this.currentPoints = [];
    };
    MarkerExplode.prototype.animationDuration = function () {
        var duration = 200;
        if (this.chart.maxPointCount > 100) {
            duration = 10;
        }
        else if (this.chart.maxPointCount > 50) {
            duration = 100;
        }
        return duration;
    };
    MarkerExplode.prototype.drawTrackBall = function (series, point, location, index) {
        var marker = point.marker;
        var seriesMarker = series.marker;
        var shape = marker.shape || seriesMarker.shape || 'Circle';
        var svg;
        if (shape === 'None' || shape === 'Image') {
            return null;
        }
        var element = series.symbolElement || series.seriesElement;
        var className;
        if (this.chart.highlightModule && this.chart.highlightMode !== 'None') {
            className = this.chart.highlightModule.generateStyle(series);
        }
        if (this.chart.selectionModule && this.chart.selectionMode !== 'None') {
            className = this.chart.selectionModule.generateStyle(series);
        }
        var symbolId = this.elementId + '_Series_' + series.index + '_Point_' + point.index + '_Trackball' +
            (index ? index : '');
        var size = new Size((marker.width || seriesMarker.width) + 3, (marker.height || seriesMarker.height) + 3);
        var border = (marker.border || series.border);
        var explodeSeries = (series.type === 'BoxAndWhisker' || series.type === 'Bubble' || series.type === 'Scatter');
        var borderColor = (border.color && border.color !== 'transparent') ? border.color :
            marker.fill || point.interior || (explodeSeries ? point.color : series.interior);
        var colorValue = convertHexToColor(colorNameToHex(borderColor));
        var borderWidth = marker.border ? marker.border.width : seriesMarker.border.width;
        var markerShadow = series.chart.themeStyle.markerShadow ||
            'rgba(' + colorValue.r + ',' + colorValue.g + ',' + colorValue.b + ',0.2)';
        var markerElement = document.getElementById(this.elementId + '_Series_' + series.index + '_Point_' +
            point.index + '_Symbol');
        if (!isNullOrUndefined(markerElement)) {
            markerElement.setAttribute('visibility', 'hidden');
        }
        if (this.chart.enableCanvas) {
            var trackElement = document.getElementById(this.chart.element.id + '_Secondary_Element');
            svg = this.chart.svgRenderer.createSvg({
                id: this.chart.element.id + '_trackball_svg',
                width: this.chart.availableSize.width,
                height: this.chart.availableSize.height
            });
            svg.style.cssText = 'position: absolute; pointer-events: none';
            trackElement.appendChild(svg);
        }
        for (var i = 0; i < 2; i++) {
            var options = new PathOption(symbolId + '_' + i, i ? (marker.fill || point.color || (explodeSeries ? series.interior : '#ffffff')) : 'transparent', borderWidth + (i ? 0 : 8), i ? borderColor : markerShadow, (marker.opacity || seriesMarker.opacity), null, null);
            var symbol = drawSymbol(location, shape, size, marker.imageUrl, options, '', this.chart.svgRenderer, series.clipRect);
            // incident: 252450 point click selection not working while maker explode
            //symbol.setAttribute('style', 'pointer-events:none');
            symbol.setAttribute('class', 'EJ2-Trackball_Series_' + series.index + '_Point_' + point.index);
            var selectionId = element.id.indexOf('Symbol') !== -1 ? '_Symbol' : '';
            var seletionElem = document.getElementById(this.elementId + '_Series_' + series.index + '_Point_' +
                point.index + selectionId);
            if (className !== '' && !isNullOrUndefined(className) && !isNullOrUndefined(seletionElem) &&
                seletionElem.hasAttribute('class') && (className === seletionElem.getAttribute('class'))) {
                symbol.classList.add(className);
            }
            symbol.setAttribute('role', 'img');
            symbol.setAttribute('clip-path', element.getAttribute('clip-path'));
            symbol.setAttribute('transform', element.getAttribute('transform'));
            if (this.chart.enableCanvas) {
                svg.appendChild(symbol);
            }
            else {
                this.chart.svgObject.appendChild(symbol);
            }
        }
        this.doAnimation(series, point, false);
    };
    /**
     * Animates the series.
     *
     * @param  {Series} series - Defines the series to animate.
     * @returns {void}
     */
    MarkerExplode.prototype.doAnimation = function (series, point, endAnimate) {
        if (endAnimate === void 0) { endAnimate = false; }
        var duration = this.animationDuration();
        var delay = series.animation.delay;
        var rectElements = document.getElementsByClassName('EJ2-Trackball_Series_' + series.index + '_Point_' + point.index);
        for (var i = 0, len = rectElements.length; i < len; i++) {
            this.trackballAnimate(rectElements[i], delay, duration, series, point.index, point.symbolLocations[0], false, endAnimate);
        }
    };
    /**
     * Animation Effect Calculation End
     *
     * @private
     */
    MarkerExplode.prototype.trackballAnimate = function (elements, delays, durations, series, pointIndex, point, isLabel, endAnimate) {
        var centerX = point.x;
        var centerY = point.y;
        var clipX = (series.type !== 'Polar' && series.type !== 'Radar') ? series.clipRect.x : 0;
        var clipY = (series.type !== 'Polar' && series.type !== 'Radar') ? series.clipRect.y : 0;
        var height = 0;
        elements.style.visibility = 'hidden';
        var reducedHeight = endAnimate ? -8 : 1;
        var transform = elements.getAttribute('transform');
        new Animation({}).animate(elements, {
            duration: durations,
            delay: delays,
            progress: function (args) {
                if (args.timeStamp > args.delay) {
                    args.element.style.visibility = 'visible';
                    height = ((args.timeStamp - args.delay) / args.duration);
                    elements.setAttribute('transform', 'translate(' + (centerX + clipX)
                        + ' ' + (centerY + clipY) + ') scale(' + (height / reducedHeight) + ') translate(' + (-centerX) + ' ' + (-centerY) + ')');
                }
            },
            end: function () {
                elements.style.visibility = '';
                elements.setAttribute('transform', transform);
                if (!isLabel && (pointIndex === series.points.length - 1)) {
                    series.chart.trigger('animationComplete', { series: series.chart.isBlazor ? {} : series });
                }
                if (endAnimate) {
                    remove(elements);
                }
            }
        });
    };
    /**
     * @param series
     * @param point
     * @param fadeOut
     * @param series
     * @param point
     * @param fadeOut
     * @param series
     * @param point
     * @param fadeOut
     * @hidden
     */
    MarkerExplode.prototype.removeHighlightedMarker = function (series, point, fadeOut) {
        if (series === void 0) { series = null; }
        if (point === void 0) { point = null; }
        if (fadeOut === void 0) { fadeOut = false; }
        if (!isNullOrUndefined(series) && !isNullOrUndefined(point)) {
            var markerElement = document.getElementById(this.elementId + '_Series_' + series.index + '_Point_' +
                point.index + '_Symbol');
            var trackballElements = document.getElementsByClassName('EJ2-Trackball_Series_' + series.index + '_Point_' + point.index);
            for (var i = 0, len = trackballElements.length; i < len; i++) {
                remove(trackballElements[0]);
            }
            if (!isNullOrUndefined(markerElement)) {
                markerElement.setAttribute('visibility', 'visible');
            }
        }
        else {
            for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
                var point_1 = _a[_i];
                var elements = document.getElementsByClassName('EJ2-Trackball_Series_' + series.index + '_Point_' + point_1.index);
                var markerElement = document.getElementById(this.elementId + '_Series_' + series.index + '_Point_' +
                    point_1.index + '_Symbol');
                for (var i = 0, len = elements.length; i < len; i++) {
                    if (!isNullOrUndefined(markerElement)) {
                        markerElement.setAttribute('visibility', 'visible');
                    }
                    remove(elements[0]);
                }
            }
        }
        if (fadeOut) {
            this.previousPoints = [];
        }
    };
    return MarkerExplode;
}(ChartData));
export { MarkerExplode };
