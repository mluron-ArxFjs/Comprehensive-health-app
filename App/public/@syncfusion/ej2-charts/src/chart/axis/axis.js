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
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable valid-jsdoc */
/* eslint-disable jsdoc/require-param */
import { Property, Complex, ChildProperty, Collection, extend, Browser } from '@syncfusion/ej2-base';
import { Font, Border } from '../../common/model/base';
import { rotateTextSize, firstToLowerCase, valueToCoefficient, inside, isBreakLabel, isZoomSet, getTitle } from '../../common/utils/helper';
import { Size, Rect, measureText } from '@syncfusion/ej2-svg-base';
import { DoubleRange } from '../utils/double-range';
import { Double } from '../axis/double-axis';
import { axisRangeCalculated } from '../../common/model/constants';
import { StripLineSettings, MultiLevelLabels, LabelBorder, ScrollbarSettings } from '../model/chart-base';
import { textWrap } from '../../common/utils/helper';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * Configures the `rows` of the chart.
 */
var Row = /** @class */ (function (_super) {
    __extends(Row, _super);
    function Row() {
        /**
         * The height of the row as a string accept input both as '100px' and '100%'.
         * If specified as '100%, row renders to the full height of its chart.
         *
         * @default '100%'
         */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @private */
        _this.axes = [];
        /** @private */
        _this.nearSizes = [];
        /** @private */
        _this.farSizes = [];
        /** @private */
        _this.insideFarSizes = [];
        /** @private */
        _this.insideNearSizes = [];
        return _this;
    }
    /**
     * Measure the row size
     *
     * @returns {void}
     * @private
     */
    Row.prototype.computeSize = function (axis, scrollBarHeight, definition, chart) {
        var width = 0;
        var innerPadding = (axis.labelPosition === 'Inside' && (chart.axes.indexOf(axis) > -1)) ? -5 : 5;
        if (axis.visible && axis.internalVisibility) {
            width += (axis.findTickSize(axis.crossInAxis) + scrollBarHeight +
                axis.findLabelSize(axis.crossInAxis, innerPadding, definition, chart) + axis.lineStyle.width * 0.5);
        }
        if (axis.isAxisOpposedPosition) {
            this.farSizes.push(width);
        }
        else {
            this.nearSizes.push(width);
        }
    };
    __decorate([
        Property('100%')
    ], Row.prototype, "height", void 0);
    __decorate([
        Complex({}, Border)
    ], Row.prototype, "border", void 0);
    return Row;
}(ChildProperty));
export { Row };
/**
 * Configures the `columns` of the chart.
 */
var Column = /** @class */ (function (_super) {
    __extends(Column, _super);
    function Column() {
        /**
         * The width of the column as a string accepts input both as like '100px' or '100%'.
         * If specified as '100%, column renders to the full width of its chart.
         *
         * @default '100%'
         */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @private */
        _this.axes = [];
        /** @private */
        _this.nearSizes = [];
        /** @private */
        _this.farSizes = [];
        /** @private */
        _this.insideFarSizes = [];
        /** @private */
        _this.insideNearSizes = [];
        /** @private */
        _this.padding = 0;
        return _this;
    }
    /**
     * Measure the column size
     *
     * @returns {void}
     * @private
     */
    Column.prototype.computeSize = function (axis, scrollBarHeight, definition, chart) {
        var height = 0;
        var innerPadding = 5;
        if (axis.visible && axis.internalVisibility) {
            height += (axis.findTickSize(axis.crossInAxis) + scrollBarHeight +
                axis.findLabelSize(axis.crossInAxis, innerPadding, definition, chart) + axis.lineStyle.width * 0.5);
        }
        if (axis.isAxisOpposedPosition) {
            this.farSizes.push(height);
        }
        else {
            this.nearSizes.push(height);
        }
    };
    __decorate([
        Property('100%')
    ], Column.prototype, "width", void 0);
    __decorate([
        Complex({}, Border)
    ], Column.prototype, "border", void 0);
    return Column;
}(ChildProperty));
export { Column };
/**
 * Configures the major grid lines in the `axis`.
 */
var MajorGridLines = /** @class */ (function (_super) {
    __extends(MajorGridLines, _super);
    function MajorGridLines() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], MajorGridLines.prototype, "width", void 0);
    __decorate([
        Property('')
    ], MajorGridLines.prototype, "dashArray", void 0);
    __decorate([
        Property(null)
    ], MajorGridLines.prototype, "color", void 0);
    return MajorGridLines;
}(ChildProperty));
export { MajorGridLines };
/**
 * Configures the minor grid lines in the `axis`.
 */
var MinorGridLines = /** @class */ (function (_super) {
    __extends(MinorGridLines, _super);
    function MinorGridLines() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(0.7)
    ], MinorGridLines.prototype, "width", void 0);
    __decorate([
        Property('')
    ], MinorGridLines.prototype, "dashArray", void 0);
    __decorate([
        Property(null)
    ], MinorGridLines.prototype, "color", void 0);
    return MinorGridLines;
}(ChildProperty));
export { MinorGridLines };
/**
 * Configures the axis line of a chart.
 */
var AxisLine = /** @class */ (function (_super) {
    __extends(AxisLine, _super);
    function AxisLine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], AxisLine.prototype, "width", void 0);
    __decorate([
        Property('')
    ], AxisLine.prototype, "dashArray", void 0);
    __decorate([
        Property(null)
    ], AxisLine.prototype, "color", void 0);
    return AxisLine;
}(ChildProperty));
export { AxisLine };
/**
 * Configures the major tick lines.
 */
var MajorTickLines = /** @class */ (function (_super) {
    __extends(MajorTickLines, _super);
    function MajorTickLines() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], MajorTickLines.prototype, "width", void 0);
    __decorate([
        Property(5)
    ], MajorTickLines.prototype, "height", void 0);
    __decorate([
        Property(null)
    ], MajorTickLines.prototype, "color", void 0);
    return MajorTickLines;
}(ChildProperty));
export { MajorTickLines };
/**
 * Configures the minor tick lines.
 */
var MinorTickLines = /** @class */ (function (_super) {
    __extends(MinorTickLines, _super);
    function MinorTickLines() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(0.7)
    ], MinorTickLines.prototype, "width", void 0);
    __decorate([
        Property(5)
    ], MinorTickLines.prototype, "height", void 0);
    __decorate([
        Property(null)
    ], MinorTickLines.prototype, "color", void 0);
    return MinorTickLines;
}(ChildProperty));
export { MinorTickLines };
/**
 * Configures the crosshair ToolTip.
 */
var CrosshairTooltip = /** @class */ (function (_super) {
    __extends(CrosshairTooltip, _super);
    function CrosshairTooltip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], CrosshairTooltip.prototype, "enable", void 0);
    __decorate([
        Property(null)
    ], CrosshairTooltip.prototype, "fill", void 0);
    __decorate([
        Complex({ fontFamily: null, size: "12px", fontStyle: 'Normal', fontWeight: '400', color: null }, Font)
    ], CrosshairTooltip.prototype, "textStyle", void 0);
    return CrosshairTooltip;
}(ChildProperty));
export { CrosshairTooltip };
/**
 * Configures the axes in the chart.
 *
 * @public
 */
var Axis = /** @class */ (function (_super) {
    __extends(Axis, _super);
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    function Axis(parent, propName, defaultValue, isArray) {
        var _this = _super.call(this, parent, propName, defaultValue, isArray) || this;
        /** @private */
        _this.visibleLabels = [];
        /** @private */
        _this.series = [];
        /** @private */
        _this.rect = new Rect(undefined, undefined, 0, 0);
        /** @private */
        _this.axisBottomLine = null;
        /** @private */
        _this.intervalDivs = [10, 5, 2, 1];
        /** @private */
        _this.isStack100 = false;
        /** @private */
        _this.crossAt = null;
        /** @private */
        _this.updatedRect = null;
        /** @private */
        _this.multiLevelLabelHeight = 0;
        /** @private */
        _this.isChart = true;
        /** @private */
        _this.isIntervalInDecimal = true;
        /** @private */
        _this.titleCollection = [];
        /** @private */
        _this.titleSize = new Size(0, 0);
        /**
         * Task: BLAZ-2044
         * This property used to hide the axis when series hide from legend click
         *
         * @private
         */
        _this.internalVisibility = true;
        /**
         * This property is used to place the vertical axis in opposed position and horizontal axis in inversed
         * when RTL is enabled in chart
         *
         * @private */
        _this.isRTLEnabled = false;
        _this.angle = _this.labelRotation;
        return _this;
    }
    /**
     * The function used to find tick size.
     *
     * @returns {number} tick line size
     * @private
     */
    Axis.prototype.findTickSize = function (crossAxis) {
        if (this.tickPosition === 'Inside') {
            return 0;
        }
        if (crossAxis && (!crossAxis.visibleRange || this.isInside(crossAxis.visibleRange))) {
            return 0;
        }
        return this.majorTickLines.height;
    };
    /**
     * The function used to find axis position.
     *
     * @returns {number}
     * @private
     */
    Axis.prototype.isInside = function (range) {
        return (inside(this.crossAt, range) ||
            (!this.isAxisOpposedPosition && this.crossAt >= range.max) || (this.isAxisOpposedPosition && this.crossAt <= range.min));
    };
    /**
     * The function used to find label Size.
     *
     * @returns {number} labelSize
     * @private
     */
    Axis.prototype.findLabelSize = function (crossAxis, innerPadding, definition, chart) {
        var titleSize = 0;
        var isHorizontal = this.orientation === 'Horizontal';
        if (this.title) {
            var angle = this.titleRotation;
            if ((isNullOrUndefined(angle))) {
                this.titleSize = measureText(this.title, this.titleStyle, chart.themeStyle.axisTitleFont);
                titleSize = this.titleSize.height + innerPadding;
            }
            else {
                this.titleSize = rotateTextSize(this.titleStyle, this.title, angle, chart);
                titleSize = (this.orientation === 'Vertical' ? this.titleSize.width : this.titleSize.height) + innerPadding;
            }
            if (this.rect.width || this.rect.height) {
                var length_1 = isHorizontal ? this.rect.width : this.rect.height;
                this.titleCollection = getTitle(this.title, this.titleStyle, length_1, chart.themeStyle.legendLabelFont);
                titleSize = (titleSize * this.titleCollection.length);
            }
        }
        var diff;
        var value;
        var labelSize = titleSize + innerPadding + this.titlePadding + this.labelPadding +
            ((this.orientation === 'Vertical') ? this.maxLabelSize.width : this.maxLabelSize.height) + this.multiLevelLabelHeight;
        if (crossAxis && this.placeNextToAxisLine) {
            var range = crossAxis.visibleRange;
            var size = (crossAxis.orientation === 'Horizontal') ? crossAxis.rect.width : crossAxis.rect.height;
            if (!range || !size) {
                return 0;
            }
            else if (this.isInside(range)) {
                value = this.findDifference(crossAxis);
                diff = (value) * (size / range.delta);
                diff = (value) * ((size - (diff < labelSize ? (labelSize - diff) : 0)) / range.delta);
                labelSize = (diff < labelSize) ? (labelSize - diff) : 0;
            }
        }
        if (this.isAxisOpposedPosition) {
            definition.insideFarSizes.push(labelSize);
        }
        else {
            definition.insideNearSizes.push(labelSize);
        }
        if (this.labelPosition === 'Inside') {
            return titleSize + innerPadding;
        }
        return labelSize;
    };
    /**
     * The function used to find axis position.
     *
     * @returns {void}
     * @private
     */
    Axis.prototype.updateCrossValue = function () {
        var value = this.crossAt;
        if (value === null || !this.isInside(this.crossInAxis.visibleRange)) {
            this.updatedRect = this.rect;
            return null;
        }
        var range = this.crossInAxis.visibleRange;
        if (!this.isAxisOpposedPosition) {
            if (this.crossAt > range.max) {
                value = range.max;
            }
        }
        else {
            if (this.crossAt < range.min) {
                value = range.min;
            }
        }
        this.updatedRect = extend({}, this.rect, null, true);
        if (this.orientation === 'Horizontal') {
            value = this.crossInAxis.rect.height - (valueToCoefficient(value, this.crossInAxis) * this.crossInAxis.rect.height);
            this.updatedRect.y = this.crossInAxis.rect.y + value;
        }
        else {
            value = valueToCoefficient(value, this.crossInAxis) * this.crossInAxis.rect.width;
            this.updatedRect.x = this.crossInAxis.rect.x + value;
        }
    };
    Axis.prototype.findDifference = function (crossAxis) {
        var value = 0;
        if (this.isAxisOpposedPosition) {
            value = crossAxis.isAxisInverse ? crossAxis.visibleRange.min : crossAxis.visibleRange.max;
        }
        else {
            value = crossAxis.isAxisInverse ? crossAxis.visibleRange.max : crossAxis.visibleRange.min;
        }
        return Math.abs(this.crossAt - value);
    };
    /**
     * Calculate visible range for axis.
     *
     * @returns {void}
     * @private
     */
    Axis.prototype.calculateVisibleRangeOnZooming = function (size) {
        if (isZoomSet(this)) {
            var baseRange = this.actualRange;
            var start = void 0;
            var end = void 0;
            if (!this.isAxisInverse) {
                start = this.actualRange.min + this.zoomPosition * this.actualRange.delta;
                end = start + this.zoomFactor * this.actualRange.delta;
            }
            else {
                start = this.actualRange.max - (this.zoomPosition * this.actualRange.delta);
                end = start - (this.zoomFactor * this.actualRange.delta);
            }
            if (start < baseRange.min) {
                end = end + (baseRange.min - start);
                start = baseRange.min;
            }
            if (end > baseRange.max) {
                start = start - (end - baseRange.max);
                end = baseRange.max;
            }
            this.doubleRange = new DoubleRange(start, end);
            this.visibleRange = { min: this.doubleRange.start, max: this.doubleRange.end,
                delta: this.doubleRange.delta, interval: this.visibleRange.interval };
        }
    };
    /**
     * Triggers the event.
     *
     * @returns {void}
     * @private
     */
    Axis.prototype.triggerRangeRender = function (chart, minimum, maximum, interval) {
        var argsData = {
            cancel: false, name: axisRangeCalculated, axis: this,
            minimum: minimum, maximum: maximum, interval: interval
        };
        chart.trigger(axisRangeCalculated, argsData);
        if (!argsData.cancel) {
            this.visibleRange = { min: argsData.minimum, max: argsData.maximum, interval: argsData.interval,
                delta: argsData.maximum - argsData.minimum };
        }
    };
    /**
     * Calculate padding for the axis.
     *
     * @returns {string}
     * @private
     */
    Axis.prototype.getRangePadding = function (chart) {
        var padding = this.rangePadding;
        if (padding !== 'Auto') {
            return padding;
        }
        switch (this.orientation) {
            case 'Horizontal':
                if (chart.requireInvertedAxis) {
                    padding = (this.isStack100 || this.baseModule.chart.stockChart ? 'Round' : 'Normal');
                }
                else {
                    padding = 'None';
                }
                break;
            case 'Vertical':
                if (!chart.requireInvertedAxis) {
                    padding = (this.isStack100 || this.baseModule.chart.stockChart ? 'Round' : 'Normal');
                }
                else {
                    padding = 'None';
                }
                break;
        }
        return padding;
    };
    /**
     * Calculate maximum label width for the axis.
     *
     * @returns {void}
     * @private
     */
    Axis.prototype.getMaxLabelWidth = function (chart) {
        var pointX;
        var previousEnd = 0;
        var isIntersect = false;
        var isAxisLabelBreak;
        this.angle = this.labelRotation;
        this.maxLabelSize = new Size(0, 0);
        var action = this.labelIntersectAction;
        var label;
        for (var i = 0, len = this.visibleLabels.length; i < len; i++) {
            label = this.visibleLabels[i];
            isAxisLabelBreak = isBreakLabel(label.originalText);
            if (isAxisLabelBreak) {
                label.size = measureText(label.originalText.replace(/<br>/g, ' '), this.labelStyle, chart.themeStyle.axisLabelFont);
                label.breakLabelSize = measureText(this.enableTrim ? label.text.join('<br>') : label.originalText, this.labelStyle, chart.themeStyle.axisLabelFont);
            }
            else {
                label.size = measureText(label.text, this.labelStyle, chart.themeStyle.axisLabelFont);
            }
            var width = isAxisLabelBreak ? label.breakLabelSize.width : label.size.width;
            if (width > this.maxLabelSize.width) {
                this.maxLabelSize.width = width;
                this.rotatedLabel = label.text;
            }
            var height = isAxisLabelBreak ? label.breakLabelSize.height : label.size.height;
            if (height > this.maxLabelSize.height) {
                this.maxLabelSize.height = height;
            }
            if (isAxisLabelBreak) {
                label.text = this.enableTrim ? label.text : label.originalText.split('<br>');
            }
            if (action === 'None' || action === 'Hide' || action === 'Trim') {
                continue;
            }
            if ((action !== 'None' || this.angle % 360 === 0) && this.orientation === 'Horizontal' &&
                this.rect.width > 0 && !isIntersect) {
                var width1 = isAxisLabelBreak ? label.breakLabelSize.width : label.size.width;
                pointX = (valueToCoefficient(label.value, this) * this.rect.width) + this.rect.x;
                pointX -= width1 / 2;
                if (this.edgeLabelPlacement === 'Shift') {
                    if (i === 0 && pointX < this.rect.x) {
                        pointX = this.rect.x;
                    }
                    if (i === this.visibleLabels.length - 1 && ((pointX + width1) > (this.rect.x + this.rect.width))) {
                        pointX = this.rect.x + this.rect.width - width1;
                    }
                }
                switch (action) {
                    case 'MultipleRows':
                        if (i > 0) {
                            this.findMultiRows(i, pointX, label, isAxisLabelBreak);
                        }
                        break;
                    case 'Rotate45':
                    case 'Rotate90':
                        if (i > 0 && (!this.isAxisInverse ? pointX <= previousEnd : pointX + width1 >= previousEnd)) {
                            this.angle = (action === 'Rotate45') ? 45 : 90;
                            isIntersect = true;
                        }
                        break;
                    default:
                        if (isAxisLabelBreak) {
                            var result = void 0;
                            var result1 = [];
                            var str = void 0;
                            for (var index = 0; index < label.text.length; index++) {
                                result = textWrap(label.text[index], this.rect.width / this.visibleLabels.length, this.labelStyle, null, null, chart.themeStyle.axisLabelFont);
                                if (result.length > 1) {
                                    for (var j = 0; j < result.length; j++) {
                                        str = result[j];
                                        result1.push(str);
                                    }
                                }
                                else {
                                    result1.push(result[0]);
                                }
                            }
                            label.text = result1;
                        }
                        else {
                            label.text = textWrap(label.text, this.rect.width / this.visibleLabels.length, this.labelStyle, null, null, chart.themeStyle.axisLabelFont);
                        }
                        // eslint-disable-next-line no-case-declarations
                        var height_1 = (label.size.height * label.text.length);
                        if (height_1 > this.maxLabelSize.height) {
                            this.maxLabelSize.height = height_1;
                        }
                        break;
                }
                previousEnd = this.isAxisInverse ? pointX : pointX + width1;
            }
        }
        if (this.angle !== 0 && this.orientation === 'Horizontal') {
            //I264474: Fix for datasource bind im mounted console error ocurred
            this.rotatedLabel = isNullOrUndefined(this.rotatedLabel) ? '' : this.rotatedLabel;
            var isHorizontalAngle = this.angle === -360 || this.angle === 0 || this.angle === -180 ||
                this.angle === 180 || this.angle === 360;
            // To avoid overlap axis label with chart title or chart legend when it is outside.
            if (this.labelPosition === 'Outside' && !isHorizontalAngle && isBreakLabel(this.rotatedLabel)) {
                this.maxLabelSize = new Size(this.maxLabelSize.height, this.maxLabelSize.width);
            }
            else if (!chart.stockChart) {
                this.maxLabelSize = rotateTextSize(this.labelStyle, this.rotatedLabel, this.angle, chart);
            }
        }
        else if (this.angle !== 0 && this.orientation === 'Vertical') {
            //I264474: Fix for datasource bind im mounted console error ocurred
            this.rotatedLabel = isNullOrUndefined(this.rotatedLabel) ? '' : this.rotatedLabel;
            var isHorizontalAngle = this.angle === -360 || this.angle === 0 || this.angle === -180 ||
                this.angle === 180 || this.angle === 360;
            // To avoid overlap axis label with chart title or chart legend when it is outside.
            if (this.labelPosition === 'Outside' && !isHorizontalAngle && isBreakLabel(this.rotatedLabel)) {
                this.maxLabelSize = new Size(this.maxLabelSize.height, this.maxLabelSize.width);
            }
            else if (!chart.stockChart) {
                this.maxLabelSize = rotateTextSize(this.labelStyle, this.rotatedLabel, this.angle, chart);
            }
        }
        if (chart.multiLevelLabelModule && this.multiLevelLabels.length > 0) {
            chart.multiLevelLabelModule.getMultilevelLabelsHeight(this);
        }
    };
    /**
     * Finds the multiple rows for axis.
     *
     * @returns {void}
     */
    Axis.prototype.findMultiRows = function (length, currentX, currentLabel, isBreakLabels) {
        var label;
        var pointX;
        var width2;
        var store = [];
        var isMultiRows;
        for (var i = length - 1; i >= 0; i--) {
            label = this.visibleLabels[i];
            width2 = isBreakLabels ? label.breakLabelSize.width : label.size.width;
            pointX = (valueToCoefficient(label.value, this) * this.rect.width) + this.rect.x;
            isMultiRows = !this.isAxisInverse ? currentX < (pointX + width2 * 0.5) :
                currentX + currentLabel.size.width > (pointX - width2 * 0.5);
            if (isMultiRows) {
                store.push(label.index);
                currentLabel.index = (currentLabel.index > label.index) ? currentLabel.index : label.index + 1;
            }
            else {
                currentLabel.index = store.indexOf(label.index) > -1 ? currentLabel.index : label.index;
            }
        }
        var height = ((isBreakLabels ? currentLabel.breakLabelSize.height : currentLabel.size.height) * currentLabel.index) +
            (5 * (currentLabel.index - 1));
        if (height > this.maxLabelSize.height) {
            this.maxLabelSize.height = height;
        }
    };
    /**
     * Finds the default module for axis.
     *
     * @returns {void}
     * @private
     */
    Axis.prototype.getModule = function (chart) {
        if (this.valueType === 'Double') {
            this.baseModule = new Double(chart);
        }
        else {
            this.baseModule = chart[firstToLowerCase(this.valueType) + 'Module'];
        }
    };
    /**
     * Set the axis `opposedPosition` and `isInversed` properties.
     *
     * @returns {void}
     * @private
     */
    Axis.prototype.setIsInversedAndOpposedPosition = function (isPolar) {
        if (isPolar === void 0) { isPolar = false; }
        this.isAxisOpposedPosition = this.opposedPosition || (!isPolar && this.isRTLEnabled && this.orientation === 'Vertical');
        this.isAxisInverse = this.isInversed || (this.isRTLEnabled && this.orientation === 'Horizontal');
    };
    __decorate([
        Complex({ fontFamily: null, size: "12px", fontStyle: 'Normal', fontWeight: '400', color: null }, Font)
    ], Axis.prototype, "labelStyle", void 0);
    __decorate([
        Complex({}, CrosshairTooltip)
    ], Axis.prototype, "crosshairTooltip", void 0);
    __decorate([
        Property('')
    ], Axis.prototype, "title", void 0);
    __decorate([
        Complex({ fontFamily: null, size: "14px", fontStyle: 'Normal', fontWeight: '600', color: null }, Font)
    ], Axis.prototype, "titleStyle", void 0);
    __decorate([
        Property('')
    ], Axis.prototype, "labelFormat", void 0);
    __decorate([
        Property('')
    ], Axis.prototype, "skeleton", void 0);
    __decorate([
        Property('DateTime')
    ], Axis.prototype, "skeletonType", void 0);
    __decorate([
        Property('Center')
    ], Axis.prototype, "lineBreakAlignment", void 0);
    __decorate([
        Property(0)
    ], Axis.prototype, "plotOffset", void 0);
    __decorate([
        Property(null)
    ], Axis.prototype, "plotOffsetLeft", void 0);
    __decorate([
        Property(null)
    ], Axis.prototype, "plotOffsetTop", void 0);
    __decorate([
        Property(null)
    ], Axis.prototype, "plotOffsetRight", void 0);
    __decorate([
        Property(null)
    ], Axis.prototype, "plotOffsetBottom", void 0);
    __decorate([
        Property(false)
    ], Axis.prototype, "isIndexed", void 0);
    __decorate([
        Property(10)
    ], Axis.prototype, "logBase", void 0);
    __decorate([
        Property(0)
    ], Axis.prototype, "columnIndex", void 0);
    __decorate([
        Property(0)
    ], Axis.prototype, "rowIndex", void 0);
    __decorate([
        Property(1)
    ], Axis.prototype, "span", void 0);
    __decorate([
        Property(null)
    ], Axis.prototype, "desiredIntervals", void 0);
    __decorate([
        Property(3)
    ], Axis.prototype, "maximumLabels", void 0);
    __decorate([
        Property(1)
    ], Axis.prototype, "zoomFactor", void 0);
    __decorate([
        Property(0)
    ], Axis.prototype, "zoomPosition", void 0);
    __decorate([
        Property(true)
    ], Axis.prototype, "enableScrollbarOnZooming", void 0);
    __decorate([
        Property(false)
    ], Axis.prototype, "opposedPosition", void 0);
    __decorate([
        Property(true)
    ], Axis.prototype, "enableAutoIntervalOnZooming", void 0);
    __decorate([
        Property('Auto')
    ], Axis.prototype, "rangePadding", void 0);
    __decorate([
        Property('Double')
    ], Axis.prototype, "valueType", void 0);
    __decorate([
        Property('None')
    ], Axis.prototype, "edgeLabelPlacement", void 0);
    __decorate([
        Property('Auto')
    ], Axis.prototype, "intervalType", void 0);
    __decorate([
        Property('BetweenTicks')
    ], Axis.prototype, "labelPlacement", void 0);
    __decorate([
        Property('Outside')
    ], Axis.prototype, "tickPosition", void 0);
    __decorate([
        Property('Outside')
    ], Axis.prototype, "labelPosition", void 0);
    __decorate([
        Property('')
    ], Axis.prototype, "name", void 0);
    __decorate([
        Property(true)
    ], Axis.prototype, "visible", void 0);
    __decorate([
        Property(0)
    ], Axis.prototype, "minorTicksPerInterval", void 0);
    __decorate([
        Property(0)
    ], Axis.prototype, "labelRotation", void 0);
    __decorate([
        Property(null)
    ], Axis.prototype, "titleRotation", void 0);
    __decorate([
        Property(null)
    ], Axis.prototype, "crossesAt", void 0);
    __decorate([
        Property(true)
    ], Axis.prototype, "placeNextToAxisLine", void 0);
    __decorate([
        Property(null)
    ], Axis.prototype, "crossesInAxis", void 0);
    __decorate([
        Property(null)
    ], Axis.prototype, "minimum", void 0);
    __decorate([
        Property(null)
    ], Axis.prototype, "maximum", void 0);
    __decorate([
        Property(null)
    ], Axis.prototype, "interval", void 0);
    __decorate([
        Property(34)
    ], Axis.prototype, "maximumLabelWidth", void 0);
    __decorate([
        Property(false)
    ], Axis.prototype, "enableTrim", void 0);
    __decorate([
        Property(5)
    ], Axis.prototype, "labelPadding", void 0);
    __decorate([
        Property(5)
    ], Axis.prototype, "titlePadding", void 0);
    __decorate([
        Complex({}, MajorTickLines)
    ], Axis.prototype, "majorTickLines", void 0);
    __decorate([
        Complex({}, MinorTickLines)
    ], Axis.prototype, "minorTickLines", void 0);
    __decorate([
        Complex({}, MajorGridLines)
    ], Axis.prototype, "majorGridLines", void 0);
    __decorate([
        Complex({}, MinorGridLines)
    ], Axis.prototype, "minorGridLines", void 0);
    __decorate([
        Complex({}, AxisLine)
    ], Axis.prototype, "lineStyle", void 0);
    __decorate([
        Property(Browser.isDevice ? 'Rotate45' : 'Trim')
    ], Axis.prototype, "labelIntersectAction", void 0);
    __decorate([
        Property(false)
    ], Axis.prototype, "isInversed", void 0);
    __decorate([
        Property(100)
    ], Axis.prototype, "coefficient", void 0);
    __decorate([
        Property(0)
    ], Axis.prototype, "startAngle", void 0);
    __decorate([
        Property(true)
    ], Axis.prototype, "startFromZero", void 0);
    __decorate([
        Property(null)
    ], Axis.prototype, "description", void 0);
    __decorate([
        Property(2)
    ], Axis.prototype, "tabIndex", void 0);
    __decorate([
        Collection([], StripLineSettings)
    ], Axis.prototype, "stripLines", void 0);
    __decorate([
        Collection([], MultiLevelLabels)
    ], Axis.prototype, "multiLevelLabels", void 0);
    __decorate([
        Complex({ color: null, width: 0, type: 'Rectangle' }, LabelBorder)
    ], Axis.prototype, "border", void 0);
    __decorate([
        Complex({}, ScrollbarSettings)
    ], Axis.prototype, "scrollbarSettings", void 0);
    return Axis;
}(ChildProperty));
export { Axis };
/** @private */
var VisibleLabels = /** @class */ (function () {
    function VisibleLabels(text, value, labelStyle, originalText, size, breakLabelSize, index) {
        if (size === void 0) { size = new Size(0, 0); }
        if (breakLabelSize === void 0) { breakLabelSize = new Size(0, 0); }
        if (index === void 0) { index = 1; }
        this.text = text;
        this.originalText = originalText;
        this.value = value;
        this.labelStyle = labelStyle;
        this.size = size;
        this.breakLabelSize = breakLabelSize;
        this.index = index;
    }
    return VisibleLabels;
}());
export { VisibleLabels };
