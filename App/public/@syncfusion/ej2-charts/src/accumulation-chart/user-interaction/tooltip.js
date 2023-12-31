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
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */
/* eslint-disable valid-jsdoc */
/**
 * AccumulationChart Tooltip file
 */
import { Browser, remove } from '@syncfusion/ej2-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { AccPointData, withInBounds, indexFinder } from '../../common/utils/helper';
//import { Rect } from '@syncfusion/ej2-svg-base';
import { BaseTooltip } from '../../common/user-interaction/tooltip';
import { tooltipRender } from '../../common/model/constants';
/**
 * `AccumulationTooltip` module is used to render tooltip for accumulation chart.
 */
var AccumulationTooltip = /** @class */ (function (_super) {
    __extends(AccumulationTooltip, _super);
    function AccumulationTooltip(accumulation) {
        var _this = _super.call(this, accumulation) || this;
        _this.accumulation = accumulation;
        _this.addEventListener();
        _this.template = _this.accumulation.tooltip.template;
        return _this;
    }
    /**
     * @hidden
     */
    AccumulationTooltip.prototype.addEventListener = function () {
        if (this.accumulation.isDestroyed) {
            return;
        }
        this.accumulation.on(Browser.isPointer ? 'pointerleave' : 'mouseleave', this.mouseLeaveHandler, this);
        this.accumulation.on(Browser.touchMoveEvent, this.mouseMoveHandler, this);
        this.accumulation.on(Browser.touchEndEvent, this.mouseUpHandler, this);
    };
    AccumulationTooltip.prototype.mouseLeaveHandler = function (e) {
        this.removeTooltip(this.accumulation.tooltip.fadeOutDuration);
    };
    AccumulationTooltip.prototype.mouseUpHandler = function (e) {
        var control = this.accumulation;
        if (control.tooltip.enable && control.isTouch && withInBounds(control.mouseX, control.mouseY, control.initialClipRect)) {
            this.tooltip(e);
            this.removeTooltip(2000);
        }
    };
    AccumulationTooltip.prototype.mouseMoveHandler = function (e) {
        var control = this.accumulation;
        // Tooltip for chart series.
        if (control.tooltip.enable && withInBounds(control.mouseX, control.mouseY, control.initialClipRect)) {
            this.tooltip(e);
        }
    };
    /**
     * Renders the tooltip.
     *
     * @param  {PointerEvent} event - Mouse move event.
     * @return {void}
     */
    AccumulationTooltip.prototype.tooltip = function (event) {
        this.renderSeriesTooltip(this.accumulation, this.getPieData(event, this.accumulation, this.accumulation.mouseX, this.accumulation.mouseY));
    };
    /**
     * @private
     */
    AccumulationTooltip.prototype.renderSeriesTooltip = function (chart, data) {
        var svgElement = this.getElement(this.element.id + '_tooltip_svg');
        var isTooltip = svgElement && parseInt(svgElement.getAttribute('opacity'), 10) > 0;
        var tooltipDiv = this.getTooltipElement(isTooltip);
        var isFirst = !isTooltip;
        this.currentPoints = [];
        if (data.point && (!this.previousPoints[0] || (this.previousPoints[0].point !== data.point))) {
            if (this.previousPoints[0] && data.point.index === this.previousPoints[0].point.index
                && data.series.index === this.previousPoints[0].series.index) {
                return null;
            }
            if (this.pushData(data, isFirst, tooltipDiv, false)) {
                this.triggerTooltipRender(data, isFirst, this.getTooltipText(data, chart.tooltip), this.findHeader(data));
            }
        }
        else {
            if (!data.point && this.isRemove) {
                this.removeTooltip(this.accumulation.tooltip.fadeOutDuration);
                this.isRemove = false;
            }
        }
    };
    AccumulationTooltip.prototype.triggerTooltipRender = function (point, isFirst, textCollection, headerText, firstText) {
        var _this = this;
        if (firstText === void 0) { firstText = true; }
        //let template: string;
        var argsData = {
            cancel: false, name: tooltipRender, text: textCollection, point: point.point, textStyle: this.textStyle,
            series: this.accumulation.isBlazor ? {} : point.series, headerText: headerText,
            data: {
                pointX: point.point.x, pointY: point.point.y, seriesIndex: point.series.index,
                pointIndex: point.point.index, pointText: point.point.text, seriesName: point.series.name
            }
        };
        var tooltipSuccess = function (argsData) {
            if (!argsData.cancel) {
                _this.formattedText = _this.formattedText.concat(argsData.text);
                _this.text = _this.formattedText;
                _this.headerText = argsData.headerText;
                _this.createTooltip(_this.chart, isFirst, point.point.symbolLocation, point.series.clipRect, point.point, !_this.chart.tooltip.enableMarker ? [] : ['Circle'], 0, _this.chart.initialClipRect, false, null, point.point, _this.template ? argsData.template : '');
            }
            else {
                _this.removeHighlight();
                remove(_this.getElement(_this.element.id + '_tooltip'));
            }
            _this.isRemove = true;
        };
        tooltipSuccess.bind(this, point);
        this.chart.trigger(tooltipRender, argsData, tooltipSuccess);
    };
    AccumulationTooltip.prototype.getPieData = function (e, chart, x, y) {
        var target = e.target;
        var id = indexFinder(target.id, true);
        if (!isNaN(id.series)) {
            var seriesIndex = id.series;
            var pointIndex = id.point;
            if (!isNullOrUndefined(seriesIndex) && !isNaN(seriesIndex) && !isNullOrUndefined(pointIndex) && !isNaN(pointIndex)) {
                var series = this.getSeriesFromIndex(seriesIndex, chart.visibleSeries);
                if (series.enableTooltip) {
                    return new AccPointData(series.points[pointIndex], series);
                }
            }
        }
        return new AccPointData(null, null);
    };
    /**
     * To get series from index
     */
    AccumulationTooltip.prototype.getSeriesFromIndex = function (index, visibleSeries) {
        return visibleSeries[0];
    };
    AccumulationTooltip.prototype.getTooltipText = function (data, tooltip) {
        var series = data.series;
        var format = tooltip.format ? tooltip.format : '${point.x} : <b>${point.y}</b>';
        format = this.accumulation.useGroupingSeparator ? format.replace('${point.y}', '${point.separatorY}') : format;
        return this.parseTemplate(data.point, series, format);
    };
    AccumulationTooltip.prototype.findHeader = function (data) {
        if (this.header === '') {
            return '';
        }
        this.header = this.parseTemplate(data.point, data.series, this.header);
        if (this.header.replace(/<b>/g, '').replace(/<\/b>/g, '').trim() !== '') {
            return this.header;
        }
        return '';
    };
    AccumulationTooltip.prototype.parseTemplate = function (point, series, format) {
        var value;
        var textValue;
        for (var _i = 0, _a = Object.keys(point); _i < _a.length; _i++) {
            var dataValue = _a[_i];
            // eslint-disable-next-line security/detect-non-literal-regexp
            value = new RegExp('${point' + '.' + dataValue + '}', 'gm');
            format = format.replace(value.source, point[dataValue]);
        }
        for (var _b = 0, _c = Object.keys(Object.getPrototypeOf(series)); _b < _c.length; _b++) {
            var dataValue = _c[_b];
            // eslint-disable-next-line security/detect-non-literal-regexp
            value = new RegExp('${series' + '.' + dataValue + '}', 'gm');
            textValue = series[dataValue];
            format = format.replace(value.source, textValue);
        }
        return format;
    };
    /**
     * Get module name
     */
    AccumulationTooltip.prototype.getModuleName = function () {
        return 'AccumulationTooltip';
    };
    /**
     * To destroy the Tooltip.
     *
     * @return {void}
     * @private
     */
    AccumulationTooltip.prototype.destroy = function (chart) {
        /**
         * Destroy method calling here
         */
    };
    return AccumulationTooltip;
}(BaseTooltip));
export { AccumulationTooltip };
