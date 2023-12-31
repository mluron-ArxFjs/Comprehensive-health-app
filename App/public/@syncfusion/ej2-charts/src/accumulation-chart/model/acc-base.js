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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable jsdoc/require-param */
/* eslint-disable valid-jsdoc */
/**
 * AccumulationChart base file
 */
import { Property, ChildProperty, Complex, createElement, Browser } from '@syncfusion/ej2-base';
import { isNullOrUndefined, getValue } from '@syncfusion/ej2-base';
import { DataManager } from '@syncfusion/ej2-data';
import { Border, Font, Animation, EmptyPointSettings, Connector } from '../../common/model/base';
import { Rect, PathOption } from '@syncfusion/ej2-svg-base';
import { stringToNumber, appendChildElement } from '../../common/utils/helper';
import { seriesRender, pointRender } from '../../common/model/constants';
import { getSeriesColor } from '../../common/model/theme';
import { getElement, firstToLowerCase } from '../../common/utils/helper';
/**
 * Annotation for accumulation series
 */
var AccumulationAnnotationSettings = /** @class */ (function (_super) {
    __extends(AccumulationAnnotationSettings, _super);
    function AccumulationAnnotationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], AccumulationAnnotationSettings.prototype, "content", void 0);
    __decorate([
        Property('0')
    ], AccumulationAnnotationSettings.prototype, "x", void 0);
    __decorate([
        Property('0')
    ], AccumulationAnnotationSettings.prototype, "y", void 0);
    __decorate([
        Property('Pixel')
    ], AccumulationAnnotationSettings.prototype, "coordinateUnits", void 0);
    __decorate([
        Property('Chart')
    ], AccumulationAnnotationSettings.prototype, "region", void 0);
    __decorate([
        Property('Middle')
    ], AccumulationAnnotationSettings.prototype, "verticalAlignment", void 0);
    __decorate([
        Property('Center')
    ], AccumulationAnnotationSettings.prototype, "horizontalAlignment", void 0);
    __decorate([
        Property(null)
    ], AccumulationAnnotationSettings.prototype, "description", void 0);
    return AccumulationAnnotationSettings;
}(ChildProperty));
export { AccumulationAnnotationSettings };
/**
 * Configures the dataLabel in accumulation chart.
 */
var AccumulationDataLabelSettings = /** @class */ (function (_super) {
    __extends(AccumulationDataLabelSettings, _super);
    function AccumulationDataLabelSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], AccumulationDataLabelSettings.prototype, "visible", void 0);
    __decorate([
        Property(true)
    ], AccumulationDataLabelSettings.prototype, "showZero", void 0);
    __decorate([
        Property(null)
    ], AccumulationDataLabelSettings.prototype, "name", void 0);
    __decorate([
        Property('transparent')
    ], AccumulationDataLabelSettings.prototype, "fill", void 0);
    __decorate([
        Property('Inside')
    ], AccumulationDataLabelSettings.prototype, "position", void 0);
    __decorate([
        Property(5)
    ], AccumulationDataLabelSettings.prototype, "rx", void 0);
    __decorate([
        Property(5)
    ], AccumulationDataLabelSettings.prototype, "ry", void 0);
    __decorate([
        Property(0)
    ], AccumulationDataLabelSettings.prototype, "angle", void 0);
    __decorate([
        Property(false)
    ], AccumulationDataLabelSettings.prototype, "enableRotation", void 0);
    __decorate([
        Complex({ width: null, color: null }, Border)
    ], AccumulationDataLabelSettings.prototype, "border", void 0);
    __decorate([
        Complex({ fontFamily: null, size: "12px", fontStyle: 'Normal', fontWeight: '400', color: null }, Font)
    ], AccumulationDataLabelSettings.prototype, "font", void 0);
    __decorate([
        Complex({}, Connector)
    ], AccumulationDataLabelSettings.prototype, "connectorStyle", void 0);
    __decorate([
        Property(null)
    ], AccumulationDataLabelSettings.prototype, "template", void 0);
    __decorate([
        Property('')
    ], AccumulationDataLabelSettings.prototype, "format", void 0);
    __decorate([
        Property(null)
    ], AccumulationDataLabelSettings.prototype, "maxWidth", void 0);
    __decorate([
        Property('Ellipsis')
    ], AccumulationDataLabelSettings.prototype, "textOverflow", void 0);
    __decorate([
        Property('Normal')
    ], AccumulationDataLabelSettings.prototype, "textWrap", void 0);
    return AccumulationDataLabelSettings;
}(ChildProperty));
export { AccumulationDataLabelSettings };
/**
 * Center value of the Pie series.
 */
var PieCenter = /** @class */ (function (_super) {
    __extends(PieCenter, _super);
    function PieCenter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('50%')
    ], PieCenter.prototype, "x", void 0);
    __decorate([
        Property('50%')
    ], PieCenter.prototype, "y", void 0);
    return PieCenter;
}(ChildProperty));
export { PieCenter };
/**
 * Points model for the series.
 *
 * @public
 */
var AccPoints = /** @class */ (function () {
    function AccPoints() {
        /** accumulation point visibility. */
        this.visible = true;
        /** accumulation point symbol location. */
        this.symbolLocation = null;
        /** @private */
        this.region = null;
        /** @private */
        this.labelRegion = null;
        /** @private */
        this.labelVisible = true;
        this.regions = null;
        /** @private */
        this.isExplode = false;
        /** @private */
        this.isClubbed = false;
        /** @private */
        this.isSliced = false;
        /** @private  */
        this.argsData = null;
        /** @private */
        this.isLabelUpdated = null;
        /** @private */
        this.initialLabelRegion = null;
    }
    return AccPoints;
}());
export { AccPoints };
/**
 *  Configures the series in accumulation chart.
 */
var AccumulationSeries = /** @class */ (function (_super) {
    __extends(AccumulationSeries, _super);
    function AccumulationSeries() {
        /**
         * Specifies the dataSource for the series. It can be an array of JSON objects or an instance of DataManager.
         * ```html
         * <div id='Pie'></div>
         * ```
         * ```typescript
         * let dataManager: DataManager = new DataManager({
         *         url: 'http://mvc.syncfusion.com/Services/Northwnd.svc/Tasks/'
         * });
         * let query: Query = new Query().take(50).where('Estimate', 'greaterThan', 0, false);
         * let pie: AccumulationChart = new AccumulationChart({
         * ...
         *     series: [{
         *        dataSource: dataManager,
         *        xName: 'Id',
         *        yName: 'Estimate',
         *        query: query
         *    }],
         * ...
         * });
         * pie.appendTo('#Pie');
         * ```
         *
         * @default ''
         */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @private */
        _this.points = [];
        /** @private */
        _this.clubbedPoints = [];
        /** @private */
        _this.sumOfPoints = 0;
        /** @private */
        _this.isRectSeries = true;
        /** @private */
        _this.clipRect = new Rect(0, 0, 0, 0);
        /** @private */
        _this.category = 'Series';
        /** @private */
        _this.rightSidePoints = [];
        /** @private */
        _this.leftSidePoints = [];
        return _this;
    }
    /**
     * To refresh the Datamanager for series
     *
     * @private
     */
    AccumulationSeries.prototype.refreshDataManager = function (accumulation, render) {
        var _this = this;
        this.radius = this.radius ? this.radius : (Browser.isDevice && this.dataLabel.position === 'Outside') ? '40%' : '80%';
        var dateSource = this.dataSource || accumulation.dataSource;
        if (!(dateSource instanceof DataManager) && isNullOrUndefined(this.query)) {
            this.dataManagerSuccess({ result: dateSource, count: dateSource.length }, accumulation, render);
            return;
        }
        var dataManager = this.dataModule.getData(this.dataModule.generateQuery().requiresCount());
        dataManager.then(function (e) { return _this.dataManagerSuccess(e, accumulation); });
    };
    /**
     * To get points on dataManager is success
     *
     * @private
     */
    AccumulationSeries.prototype.dataManagerSuccess = function (e, accumulation, render) {
        if (render === void 0) { render = true; }
        var argsData = {
            name: seriesRender, series: this, data: e.result
        };
        accumulation.allowServerDataBinding = false;
        accumulation.trigger(seriesRender, argsData);
        this.resultData = e.result !== '' ? e.result : [];
        if (!accumulation.isBlazor && !render) {
            this.getPoints(this.resultData, accumulation); // To update datasource using onPropertyChanged method. incident id: 290690
        }
        /* eslint-disable */
        if ((++accumulation.seriesCounts === accumulation.visibleSeries.length && render)
            // tslint:disable-next-line:no-string-literal
            || (window['Blazor'] && !render && accumulation.seriesCounts === 1)) {
            this.getPoints(this.resultData, accumulation);
            accumulation.refreshChart();
        }
    };
    /** @private To find points from result data */
    AccumulationSeries.prototype.getPoints = function (result, accumulation) {
        var length = Object.keys(result).length;
        this.sumOfPoints = 0;
        if (length === 0) {
            // fix for Pie datalabels are not removed for empty datasource
            this.points = [];
            return null;
        }
        this.findSumOfPoints(result);
        this.points = [];
        this.clubbedPoints = [];
        this.sumOfClub = 0;
        var point;
        var colors = this.palettes.length ? this.palettes : getSeriesColor(accumulation.theme);
        var clubValue = stringToNumber(this.groupTo, this.sumOfPoints);
        for (var i = 0; i < length; i++) {
            point = this.setPoints(result, i, colors, accumulation);
            var currentY = point.y;
            if (!this.isClub(point, clubValue, i)) {
                if (isNullOrUndefined(point.y)) {
                    point.visible = false;
                }
                this.pushPoints(point, colors);
            }
            else {
                point.index = this.clubbedPoints.length;
                point.isExplode = true;
                this.clubbedPoints.push(point);
                point.isSliced = true;
            }
        }
        this.lastGroupTo = this.groupTo;
        if (this.sumOfClub > 0) {
            var clubPoint_1 = this.generateClubPoint();
            this.pushPoints(clubPoint_1, colors);
            var pointsLength_1 = this.points.length - 1;
            this.clubbedPoints.map(function (point) {
                point.index += pointsLength_1;
                point.color = clubPoint_1.color;
            });
        }
        if (this.clubbedPoints.length && this.explode && this.type === 'Pie'
            && (this.explodeAll || this.points[this.points.length - 1].index === this.explodeIndex)) {
            this.points.splice(this.points.length - 1, 1);
            this.points = this.points.concat(this.clubbedPoints);
        }
    };
    AccumulationSeries.prototype.generateClubPoint = function () {
        var clubPoint = new AccPoints();
        clubPoint.isClubbed = true;
        clubPoint.x = 'Others';
        clubPoint.y = this.sumOfClub;
        clubPoint.text = clubPoint.originalText = clubPoint.x + ': ' + this.sumOfClub;
        clubPoint.sliceRadius = '80%';
        return clubPoint;
    };
    /**
     * Method to set point index and color
     */
    AccumulationSeries.prototype.pushPoints = function (point, colors) {
        point.index = this.points.length;
        point.isExplode = this.explodeAll || (point.index === this.explodeIndex);
        point.color = point.color || colors[point.index % colors.length];
        this.points.push(point);
    };
    /**
     * Method to find club point
     */
    AccumulationSeries.prototype.isClub = function (point, clubValue, index) {
        if (!isNullOrUndefined(clubValue)) {
            if (this.groupMode === 'Value' && Math.abs(point.y) <= clubValue) {
                this.sumOfClub += Math.abs(point.y);
                return true;
            }
            else if (this.groupMode === 'Point' && index >= clubValue) {
                this.sumOfClub += Math.abs(point.y);
                return true;
            }
        }
        return false;
    };
    /**
     * Method to find sum of points in the series
     */
    AccumulationSeries.prototype.findSumOfPoints = function (result) {
        var length = Object.keys(result).length;
        for (var i = 0; i < length; i++) {
            if (!isNullOrUndefined(result[i]) && !isNullOrUndefined(result[i][this.yName]) && !isNaN(result[i][this.yName])) {
                this.sumOfPoints += Math.abs(result[i][this.yName]);
            }
        }
    };
    /**
     * Method to set points x, y and text from data source
     */
    AccumulationSeries.prototype.setPoints = function (data, i, colors, accumulation) {
        var point = new AccPoints();
        point.x = getValue(this.xName, data[i]);
        point.y = getValue(this.yName, data[i]);
        point.percentage = (+(point.y / this.sumOfPoints * 100).toFixed(2));
        point.legendImageUrl = getValue(this.legendImageUrl, data[i]);
        point.color = getValue(this.pointColorMapping, data[i]);
        point.text = point.originalText = getValue(this.dataLabel.name || '', data[i]);
        point.tooltip = getValue(this.tooltipMappingName || '', data[i]);
        point.sliceRadius = getValue(this.radius, data[i]);
        point.sliceRadius = isNullOrUndefined(point.sliceRadius) ? '80%' : point.sliceRadius;
        point.separatorY = accumulation.intl.formatNumber(point.y, { useGrouping: accumulation.useGroupingSeparator });
        this.setAccEmptyPoint(point, i, data, colors);
        return point;
    };
    /**
     * Method render the series elements for accumulation chart
     * @private
     */
    AccumulationSeries.prototype.renderSeries = function (accumulation, redraw) {
        var seriesGroup = redraw ? getElement(accumulation.element.id + '_Series_' + this.index) :
            accumulation.renderer.createGroup({ id: accumulation.element.id + '_Series_' + this.index });
        this.renderPoints(accumulation, seriesGroup, redraw);
        var datalabelGroup;
        if (accumulation.accumulationDataLabelModule && this.dataLabel.visible) {
            datalabelGroup = accumulation.renderer.createGroup({ id: accumulation.element.id + '_datalabel_Series_' + this.index });
            datalabelGroup.style.visibility =
                (this.animation.enable && accumulation.animateSeries && this.type === 'Pie') ? 'hidden' : 'visible';
            this.renderDataLabel(accumulation, datalabelGroup, redraw);
        }
        if (this.type === 'Pie') {
            this.findMaxBounds(this.labelBound, this.accumulationBound);
            accumulation.pieSeriesModule.animateSeries(accumulation, this.animation, this, seriesGroup);
        }
        if (accumulation.accumulationLegendModule) {
            this.labelBound.x -= accumulation.explodeDistance;
            this.labelBound.y -= accumulation.explodeDistance;
            this.labelBound.height += (accumulation.explodeDistance - this.labelBound.y);
            this.labelBound.width += (accumulation.explodeDistance - this.labelBound.x);
        }
    };
    /**
     * Method render the points elements for accumulation chart series.
     */
    AccumulationSeries.prototype.renderPoints = function (accumulation, seriesGroup, redraw) {
        var pointId = accumulation.element.id + '_Series_' + this.index + '_Point_';
        var option;
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            var argsData = {
                cancel: false, name: pointRender, series: this, point: point, fill: point.color,
                border: this.isEmpty(point) ? { width: this.emptyPointSettings.border.width, color: this.emptyPointSettings.border.color } :
                    { width: this.border.width, color: this.border.color }
            };
            accumulation.trigger(pointRender, argsData);
            point.color = argsData.fill;
            option = new PathOption(pointId + point.index, point.color, argsData.border.width || 1, argsData.border.color || point.color, this.opacity, argsData.series.dashArray, '');
            accumulation[(firstToLowerCase(this.type) + 'SeriesModule')].
                renderPoint(point, this, accumulation, option, seriesGroup, redraw);
        }
        appendChildElement(false, accumulation.getSeriesElement(), seriesGroup, redraw);
    };
    /**
     * Method render the datalabel elements for accumulation chart.
     */
    AccumulationSeries.prototype.renderDataLabel = function (accumulation, datalabelGroup, redraw) {
        accumulation.accumulationDataLabelModule.findAreaRect();
        var element = createElement('div', {
            id: accumulation.element.id + '_Series_0' + '_DataLabelCollections'
        });
        this.leftSidePoints = [], this.rightSidePoints = [];
        var firstQuarter = [];
        var secondQuarter = [];
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            if (point.visible) {
                if (this.dataLabel.showZero || (!this.dataLabel.showZero && ((point.y !== 0) || (point.y === 0 &&
                    this.emptyPointSettings.mode === 'Zero')))) {
                    accumulation.accumulationDataLabelModule.renderDataLabel(point, this.dataLabel, datalabelGroup, this.points, this.index, element, redraw);
                }
            }
            if (point.midAngle >= 90 && point.midAngle <= 270) {
                this.leftSidePoints.push(point);
            }
            else {
                if (point.midAngle >= 0 && point.midAngle <= 90) {
                    secondQuarter.push(point);
                }
                else {
                    firstQuarter.push(point);
                }
            }
        }
        firstQuarter.sort(function (a, b) { return a.midAngle - b.midAngle; });
        secondQuarter.sort(function (a, b) { return a.midAngle - b.midAngle; });
        this.leftSidePoints.sort(function (a, b) { return a.midAngle - b.midAngle; });
        this.rightSidePoints = firstQuarter.concat(secondQuarter);
        accumulation.accumulationDataLabelModule.drawDataLabels(this, this.dataLabel, datalabelGroup, element, redraw);
        if (this.dataLabel.template !== null && element.childElementCount) {
            var dataLabelCallBack = accumulation.accumulationDataLabelModule.drawDataLabels.bind(accumulation.accumulationDataLabelModule, this, this.dataLabel, datalabelGroup, element, redraw);
            // tslint:disable-next-line:no-any
            if (accumulation.isReact) {
                accumulation.renderReactTemplates(dataLabelCallBack);
            }
            appendChildElement(false, getElement(accumulation.element.id + '_Secondary_Element'), element, redraw);
        }
        appendChildElement(false, accumulation.getSeriesElement(), datalabelGroup, redraw);
    };
    /**
     * To find maximum bounds for smart legend placing
     *
     * @private
     */
    AccumulationSeries.prototype.findMaxBounds = function (totalbound, bound) {
        totalbound.x = bound.x < totalbound.x ? bound.x : totalbound.x;
        totalbound.y = bound.y < totalbound.y ? bound.y : totalbound.y;
        totalbound.height = (bound.y + bound.height) > totalbound.height ? (bound.y + bound.height) : totalbound.height;
        totalbound.width = (bound.x + bound.width) > totalbound.width ? (bound.x + bound.width) : totalbound.width;
    };
    /**
     * To set empty point value for null points
     * @private
     */
    AccumulationSeries.prototype.setAccEmptyPoint = function (point, i, data, colors) {
        if (!(isNullOrUndefined(point.y) || isNaN(point.y))) {
            return null;
        }
        point.color = this.emptyPointSettings.fill || point.color;
        switch (this.emptyPointSettings.mode) {
            case 'Zero':
                point.y = 0;
                point.visible = true;
                break;
            case 'Average':
                var previous = data[i - 1] ? (data[i - 1][this.yName] || 0) : 0;
                var next = data[i + 1] ? (data[i + 1][this.yName] || 0) : 0;
                point.y = (Math.abs(previous) + Math.abs(next)) / 2;
                this.sumOfPoints += point.y;
                point.visible = true;
                break;
            default:
                point.visible = false;
                break;
        }
    };
    /**
     * To find point is empty
     */
    AccumulationSeries.prototype.isEmpty = function (point) {
        return point.color === this.emptyPointSettings.fill;
    };
    __decorate([
        Property('')
    ], AccumulationSeries.prototype, "dataSource", void 0);
    __decorate([
        Property()
    ], AccumulationSeries.prototype, "query", void 0);
    __decorate([
        Property('')
    ], AccumulationSeries.prototype, "xName", void 0);
    __decorate([
        Property('')
    ], AccumulationSeries.prototype, "name", void 0);
    __decorate([
        Property('')
    ], AccumulationSeries.prototype, "tooltipMappingName", void 0);
    __decorate([
        Property('')
    ], AccumulationSeries.prototype, "yName", void 0);
    __decorate([
        Property(true)
    ], AccumulationSeries.prototype, "visible", void 0);
    __decorate([
        Complex({ color: null, width: 0 }, Border)
    ], AccumulationSeries.prototype, "border", void 0);
    __decorate([
        Complex(null, Animation)
    ], AccumulationSeries.prototype, "animation", void 0);
    __decorate([
        Property('SeriesType')
    ], AccumulationSeries.prototype, "legendShape", void 0);
    __decorate([
        Property('')
    ], AccumulationSeries.prototype, "legendImageUrl", void 0);
    __decorate([
        Property('')
    ], AccumulationSeries.prototype, "pointColorMapping", void 0);
    __decorate([
        Property(null)
    ], AccumulationSeries.prototype, "selectionStyle", void 0);
    __decorate([
        Property(null)
    ], AccumulationSeries.prototype, "groupTo", void 0);
    __decorate([
        Property('Value')
    ], AccumulationSeries.prototype, "groupMode", void 0);
    __decorate([
        Complex({}, AccumulationDataLabelSettings)
    ], AccumulationSeries.prototype, "dataLabel", void 0);
    __decorate([
        Property([])
    ], AccumulationSeries.prototype, "palettes", void 0);
    __decorate([
        Property(0)
    ], AccumulationSeries.prototype, "startAngle", void 0);
    __decorate([
        Property(null)
    ], AccumulationSeries.prototype, "endAngle", void 0);
    __decorate([
        Property(null)
    ], AccumulationSeries.prototype, "radius", void 0);
    __decorate([
        Property('0')
    ], AccumulationSeries.prototype, "innerRadius", void 0);
    __decorate([
        Property('Pie')
    ], AccumulationSeries.prototype, "type", void 0);
    __decorate([
        Property(true)
    ], AccumulationSeries.prototype, "enableTooltip", void 0);
    __decorate([
        Property(false)
    ], AccumulationSeries.prototype, "explode", void 0);
    __decorate([
        Property('30%')
    ], AccumulationSeries.prototype, "explodeOffset", void 0);
    __decorate([
        Property(false)
    ], AccumulationSeries.prototype, "explodeAll", void 0);
    __decorate([
        Property(null)
    ], AccumulationSeries.prototype, "explodeIndex", void 0);
    __decorate([
        Complex({ mode: 'Drop' }, EmptyPointSettings)
    ], AccumulationSeries.prototype, "emptyPointSettings", void 0);
    __decorate([
        Property(0)
    ], AccumulationSeries.prototype, "gapRatio", void 0);
    __decorate([
        Property('80%')
    ], AccumulationSeries.prototype, "width", void 0);
    __decorate([
        Property('80%')
    ], AccumulationSeries.prototype, "height", void 0);
    __decorate([
        Property('20%')
    ], AccumulationSeries.prototype, "neckWidth", void 0);
    __decorate([
        Property('20%')
    ], AccumulationSeries.prototype, "neckHeight", void 0);
    __decorate([
        Property('Linear')
    ], AccumulationSeries.prototype, "pyramidMode", void 0);
    __decorate([
        Property(1)
    ], AccumulationSeries.prototype, "opacity", void 0);
    __decorate([
        Property('0')
    ], AccumulationSeries.prototype, "dashArray", void 0);
    return AccumulationSeries;
}(ChildProperty));
export { AccumulationSeries };
/**
 * method to get series from index
 * @private
 */
export function getSeriesFromIndex(index, visibleSeries) {
    for (var _i = 0, visibleSeries_1 = visibleSeries; _i < visibleSeries_1.length; _i++) {
        var series = visibleSeries_1[_i];
        if (index === series.index) {
            return series;
        }
    }
    return visibleSeries[0];
}
/**
 * method to get point from index
 * @private
 */
export function pointByIndex(index, points) {
    for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
        var point = points_1[_i];
        if (point.index === index) {
            return point;
        }
    }
    return null;
}
