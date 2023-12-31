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
import { createElement, remove } from '@syncfusion/ej2-base';
import { SvgRenderer } from '@syncfusion/ej2-svg-base';
/**
 * Sparkline control helper file
 */
/**
 * sparkline internal use of `Size` type
 */
var Size = /** @class */ (function () {
    function Size(width, height) {
        this.width = width;
        this.height = height;
    }
    return Size;
}());
export { Size };
/** @private */
export function getSeriesColor(theme) {
    var palette;
    switch (theme) {
        case 'Fabric':
            palette = ['#4472c4', '#ed7d31', '#ffc000', '#70ad47', '#5b9bd5',
                '#c1c1c1', '#6f6fe2', '#e269ae', '#9e480e', '#997300'];
            break;
        case 'Bootstrap4':
            palette = ['#a16ee5', '#f7ce69', '#55a5c2', '#7ddf1e', '#ff6ea6',
                '#7953ac', '#b99b4f', '#407c92', '#5ea716', '#b91c52'];
            break;
        case 'Bootstrap':
            palette = ['#a16ee5', '#f7ce69', '#55a5c2', '#7ddf1e', '#ff6ea6',
                '#7953ac', '#b99b4f', '#407c92', '#5ea716', '#b91c52'];
            break;
        case 'HighContrastLight':
        case 'HighContrast':
            palette = ['#79ECE4', '#E98272', '#DFE6B6', '#C6E773', '#BA98FF',
                '#FA83C3', '#00C27A', '#43ACEF', '#D681EF', '#D8BC6E'];
            break;
        case 'MaterialDark':
            palette = ['#9ECB08', '#56AEFF', '#C57AFF', '#61EAA9', '#EBBB3E',
                '#F45C5C', '#8A77FF', '#63C7FF', '#FF84B0', '#F7C928'];
            break;
        case 'FabricDark':
            palette = ['#4472c4', '#ed7d31', '#ffc000', '#70ad47', '#5b9bd5',
                '#c1c1c1', '#6f6fe2', '#e269ae', '#9e480e', '#997300'];
            break;
        case 'BootstrapDark':
            palette = ['#a16ee5', '#f7ce69', '#55a5c2', '#7ddf1e', '#ff6ea6',
                '#7953ac', '#b99b4f', '#407c92', '#5ea716', '#b91c52'];
            break;
        case 'Tailwind':
            palette = ['#5A61F6', '#65A30D', '#334155', '#14B8A6', '#8B5CF6',
                '#0369A1', '#F97316', '#9333EA', '#F59E0B', '#15803D'];
            break;
        case 'TailwindDark':
            palette = ['#8B5CF6', '#22D3EE', '#F87171', '#4ADE80', '#E879F9',
                '#FCD34D', '#F97316', '#2DD4BF', '#F472B6', '#10B981'];
            break;
        case 'Bootstrap5':
            palette = ['#262E0B', '#668E1F', '#AF6E10', '#862C0B', '#1F2D50',
                '#64680B', '#311508', '#4C4C81', '#0C7DA0', '#862C0B'];
            break;
        case 'Bootstrap5Dark':
            palette = ['#5ECB9B', '#A860F1', '#EBA844', '#557EF7', '#E9599B',
                '#BFC529', '#3BC6CF', '#7A68EC', '#74B706', '#EA6266'];
            break;
        case 'FluentDark':
            palette = ['#1AC9E6', '#DA4CB2', '#EDBB40', '#AF4BCF', '#FF7266',
                '#1BD565', '#EE993D', '#5887FF', '#EC548D', '#7D39C0'];
            break;
        case 'Fluent':
            palette = ['#1AC9E6', '#DA4CB2', '#EDBB40', '#AF4BCF', '#FF7266',
                '#1BD565', '#EE993D', '#5887FF', '#EC548D', '#7D39C0'];
            break;
        case 'Material3':
            palette = ['#6355C7', '#00AEE0', '#FFB400', '#F7523F', '#963C70',
                '#FD7400', '#4BE0BC', '#2196F5', '#DE3D8A', '#162F88'];
            break;
        case 'Material3Dark':
            palette = ['#4EAAFF', '#FA4EAB', '#FFF500', '#17EA58', '#38FFE7',
                '#FF9E45', '#B3F32F', '#B93CE4', '#FC5664', '#9B55FF'];
            break;
        default:
            palette = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883',
                '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb', '#ea7a57'];
            break;
    }
    return palette;
}
/**
 * To find the default colors based on theme.
 *
 * @private
 */
// tslint:disable-next-line:max-func-body-length
export function getThemeColor(theme) {
    var themeColors;
    switch (theme) {
        case 'BootstrapDark':
        case 'FabricDark':
        case 'MaterialDark':
        case 'HighContrast':
            themeColors = {
                axisLineColor: '#ffffff',
                dataLabelColor: theme === 'BootstrapDark' ? '#676767' : theme === 'FabricDark' ? '#A19F9D' : theme === 'MaterialDark' ? 'rgba(255, 255, 255, 0.6)' : '#969696',
                rangeBandColor: '#ffffff',
                tooltipFill: theme === 'BootstrapDark' ? '#F0F0F0' : theme === 'FabricDark' ? '#A19F9D' : theme === 'MaterialDark' ? '#F4F4F4' : '#FFFFFF',
                background: '#000000',
                tooltipFontColor: theme === 'BootstrapDark' ? '#1A1A1A' : theme === 'FabricDark' ? '#DADADA' : theme === 'MaterialDark' ? 'rgba(18, 18, 18, 1)' : '#000000',
                trackerLineColor: '#ffffff',
                labelFontFamily: theme === 'BootstrapDark' ? 'Helvetica' : theme === 'FabricDark' ? 'Segoe UI' : theme === 'MaterialDark' ? 'Roboto' : 'Segoe UI',
                tooltipFontFamily: theme === 'BootstrapDark' ? 'Helvetica' : theme === 'FabricDark' ? 'Segoe UI' : theme === 'MaterialDark' ? 'Roboto' : 'Segoe UI',
                dataLabelFont: {
                    fontFamily: theme === 'BootstrapDark' ? 'Helvetica' : theme === 'FabricDark' ? 'Segoe UI' : theme === 'MaterialDark' ? 'Roboto' : 'Segoe UI', color: theme === 'BootstrapDark' ? '#676767' : theme === 'FabricDark' ? '#A19F9D' : theme === 'MaterialDark' ? 'rgba(255, 255, 255, 0.6)' : '#969696'
                }
            };
            break;
        case 'Bootstrap4':
            themeColors = {
                axisLineColor: '#6C757D',
                dataLabelColor: '#495057',
                rangeBandColor: '#212529',
                tooltipFill: '#212529',
                background: '#FFFFFF',
                tooltipFontColor: '#F9FAFB',
                trackerLineColor: '#212529',
                fontFamily: 'Helvetica',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 0.9,
                labelFontFamily: 'Helvetica',
                tooltipFontFamily: 'Helvetica',
                dataLabelFont: {
                    fontFamily: 'Helvetica', color: '#495057'
                }
            };
            break;
        case 'Tailwind':
            themeColors = {
                axisLineColor: '#4B5563',
                dataLabelColor: '#6B7280',
                rangeBandColor: '#212529',
                background: '#FFFFFF',
                tooltipFill: '#111827',
                tooltipFontColor: '#F9FAFB',
                trackerLineColor: '#1F2937',
                fontFamily: 'Inter',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                labelFontFamily: 'Inter',
                tooltipFontFamily: 'Inter',
                dataLabelFont: {
                    fontFamily: 'Inter', color: '#6B7280'
                }
            };
            break;
        case 'TailwindDark':
            themeColors = {
                axisLineColor: '#D1D5DB',
                dataLabelColor: '#9CA3AF',
                rangeBandColor: '#F9FAFB',
                background: 'transparent',
                tooltipFill: '#E9ECEF',
                tooltipFontColor: '#1F2937',
                trackerLineColor: '#9CA3AF',
                fontFamily: 'Inter',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                labelFontFamily: 'Inter',
                tooltipFontFamily: 'Inter',
                dataLabelFont: {
                    fontFamily: 'Inter', color: '#9CA3AF'
                }
            };
            break;
        case 'Bootstrap5':
            themeColors = {
                axisLineColor: '#D1D5DB',
                dataLabelColor: '#495057',
                rangeBandColor: '#212529',
                background: 'rgba(255, 255, 255, 0.0)',
                tooltipFill: '#212529',
                tooltipFontColor: '#F9FAFB',
                trackerLineColor: '#1F2937',
                fontFamily: 'Helvetica',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                labelFontFamily: 'Helvetica',
                tooltipFontFamily: 'Helvetica',
                dataLabelFont: {
                    fontFamily: 'Helvetica', color: '#495057'
                }
            };
            break;
        case 'Bootstrap5Dark':
            themeColors = {
                axisLineColor: '#D1D5DB',
                dataLabelColor: '#E9ECEF',
                rangeBandColor: '#ADB5BD',
                background: 'rgba(255, 255, 255, 0.0)',
                tooltipFill: '#E9ECEF',
                tooltipFontColor: '#212529',
                trackerLineColor: '#ADB5BD',
                fontFamily: 'Helvetica',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                labelFontFamily: 'Helvetica',
                tooltipFontFamily: 'Helvetica',
                dataLabelFont: {
                    fontFamily: 'Helvetica', color: '#E9ECEF'
                }
            };
            break;
        case 'Fluent':
            themeColors = {
                axisLineColor: '#D2D0CE;',
                dataLabelColor: '#3B3A39',
                rangeBandColor: '#A19F9D',
                background: 'rgba(255, 255, 255, 0.0001)',
                tooltipFill: '#FFFFFF',
                tooltipFontColor: '#323130',
                trackerLineColor: '#A19F9D',
                fontFamily: 'Segoe UI',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                labelFontFamily: 'Segoe UI',
                tooltipFontFamily: 'Segoe UI',
                dataLabelFont: {
                    fontFamily: 'Segoe UI', color: '#3B3A39'
                }
            };
            break;
        case 'FluentDark':
            themeColors = {
                axisLineColor: '#3B3A39;',
                dataLabelColor: '#D2D0CE',
                rangeBandColor: '#797775',
                background: 'transparent',
                tooltipFill: '#323130',
                tooltipFontColor: '#F3F2F1',
                trackerLineColor: '#797775',
                fontFamily: 'Segoe UI',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                labelFontFamily: 'Segoe UI',
                tooltipFontFamily: 'Segoe UI',
                dataLabelFont: {
                    fontFamily: 'Segoe UI', color: '#D2D0CE'
                }
            };
            break;
        case 'Material3':
            themeColors = {
                axisLineColor: '#C4C7C5',
                dataLabelColor: '#49454E',
                rangeBandColor: 'rgba(73, 69, 78, 0.3)',
                background: 'rgba(255, 255, 255, 0.0001)',
                tooltipFill: '#313033',
                tooltipFontColor: '#F4EFF4',
                trackerLineColor: '#49454E',
                fontFamily: 'Roboto',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                labelFontFamily: 'Roboto',
                tooltipFontFamily: 'Roboto',
                dataLabelFont: {
                    fontFamily: 'Roboto', color: '#49454E'
                }
            };
            break;
        case 'Material3Dark':
            themeColors = {
                axisLineColor: '#49454F',
                dataLabelColor: '#CAC4D0',
                rangeBandColor: 'rgba(202, 196, 208, 0.3)',
                background: 'transparent',
                tooltipFill: '#E6E1E5',
                tooltipFontColor: '#313033',
                trackerLineColor: '#CAC4D0',
                fontFamily: 'Roboto',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                labelFontFamily: 'Roboto',
                tooltipFontFamily: 'Roboto',
                dataLabelFont: {
                    fontFamily: 'Roboto', color: '#CAC4D0'
                }
            };
            break;
        default: {
            themeColors = {
                axisLineColor: '#000000',
                dataLabelColor: theme === 'Bootstrap' ? '#676767' : theme === 'Fabric' ? '#666666' : 'rgba(97, 97, 97, 1)',
                rangeBandColor: '#000000',
                background: '#FFFFFF',
                tooltipFill: theme === 'Bootstrap' ? '#212529' : theme === 'Fabric' ? '#FFFFFF' : '#000816',
                tooltipFontColor: theme === 'Bootstrap' ? '#F9FAFB' : theme === 'Fabric' ? '#333333' : 'rgba(249, 250, 251, 1)',
                trackerLineColor: '#000000',
                labelFontFamily: theme === 'Bootstrap' ? 'Helvetica' : theme === 'Fabric' ? 'Segoe UI' : 'Roboto',
                tooltipFontFamily: theme === 'Bootstrap' ? 'Helvetica' : theme === 'Fabric' ? 'Segoe UI' : 'Roboto',
                dataLabelFont: {
                    fontFamily: theme === 'Bootstrap' ? 'Helvetica' : theme === 'Fabric' ? 'Segoe UI' : 'Roboto', color: theme === 'Bootstrap' ? '#676767' : theme === 'Fabric' ? '#666666' : 'rgba(97, 97, 97, 1)'
                }
            };
            break;
        }
    }
    return themeColors;
}
/**
 * To find number from string
 *
 * @private
 */
export function stringToNumber(value, containerSize) {
    if (value !== null && value !== undefined) {
        return value.indexOf('%') !== -1 ? (containerSize / 100) * parseInt(value, 10) : parseInt(value, 10);
    }
    return null;
}
/**
 * Method to calculate the width and height of the sparkline.
 */
export function calculateSize(sparkline) {
    var containerWidth = !sparkline.element.clientWidth ? (!sparkline.element.parentElement ? 100 :
        (!sparkline.element.parentElement.clientWidth ? window.innerWidth : sparkline.element.parentElement.clientWidth)) :
        sparkline.element.clientWidth;
    var containerHeight = !sparkline.element.clientHeight ? (!sparkline.element.parentElement ? 50 :
        sparkline.element.parentElement.clientHeight) : sparkline.element.clientHeight;
    sparkline.availableSize = new Size(stringToNumber(sparkline.width, containerWidth) || containerWidth, stringToNumber(sparkline.height, containerHeight) || containerHeight || (sparkline.isDevice ?
        Math.min(window.innerWidth, window.innerHeight) : containerHeight));
}
/**
 * Method to create svg for sparkline.
 */
export function createSvg(sparkline) {
    sparkline.renderer = new SvgRenderer(sparkline.element.id);
    calculateSize(sparkline);
    sparkline.svgObject = sparkline.renderer.createSvg({
        id: sparkline.element.id + '_svg',
        width: sparkline.availableSize.width,
        height: sparkline.availableSize.height
    });
}
/**
 * Internal use of type rect
 *
 * @private
 */
var Rect = /** @class */ (function () {
    function Rect(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    return Rect;
}());
export { Rect };
/**
 * Internal use of path options
 *
 * @private
 */
var PathOption = /** @class */ (function () {
    function PathOption(id, fill, width, color, opacity, dashArray, d) {
        this.id = id;
        this.fill = fill;
        this.opacity = opacity;
        this['stroke-width'] = width;
        this.stroke = color;
        this.d = d;
        this['stroke-dasharray'] = dashArray;
    }
    return PathOption;
}());
export { PathOption };
/**
 * Internal use of rectangle options
 *
 * @private
 */
var RectOption = /** @class */ (function (_super) {
    __extends(RectOption, _super);
    function RectOption(id, fill, border, opacity, rect, tl, tr, bl, br) {
        if (tl === void 0) { tl = 0; }
        if (tr === void 0) { tr = 0; }
        if (bl === void 0) { bl = 0; }
        if (br === void 0) { br = 0; }
        var _this = _super.call(this, id, fill, border.width, border.color, opacity) || this;
        _this.rect = rect;
        _this.topLeft = tl;
        _this.topRight = tr;
        _this.bottomLeft = bl;
        _this.bottomRight = br;
        return _this;
    }
    return RectOption;
}(PathOption));
export { RectOption };
/**
 * Internal use of circle options
 *
 * @private
 */
var CircleOption = /** @class */ (function (_super) {
    __extends(CircleOption, _super);
    function CircleOption(id, fill, border, opacity, cx, cy, r, dashArray) {
        var _this = _super.call(this, id, fill, border.width, border.color, opacity) || this;
        _this.cy = cy;
        _this.cx = cx;
        _this.r = r;
        _this['stroke-dasharray'] = dashArray;
        return _this;
    }
    return CircleOption;
}(PathOption));
export { CircleOption };
/**
 * Internal use of append shape element
 *
 * @private
 */
export function appendShape(shape, element) {
    if (element) {
        element.appendChild(shape);
    }
    return shape;
}
/**
 * Internal rendering of Circle
 *
 * @private
 */
export function drawCircle(sparkline, options, element) {
    return appendShape(sparkline.renderer.drawCircle(options), element);
}
/**
 * To get rounded rect path direction.
 */
export function calculateRoundedRectPath(r, topLeft, topRight, bottomLeft, bottomRight) {
    return 'M' + ' ' + r.x + ' ' + (topLeft + r.y) +
        ' Q ' + r.x + ' ' + r.y + ' ' + (r.x + topLeft) + ' ' +
        r.y + ' ' + 'L' + ' ' + (r.x + r.width - topRight) + ' ' + r.y +
        ' Q ' + (r.x + r.width) + ' ' + r.y + ' ' +
        (r.x + r.width) + ' ' + (r.y + topRight) + ' ' + 'L ' +
        (r.x + r.width) + ' ' + (r.y + r.height - bottomRight)
        + ' Q ' + (r.x + r.width) + ' ' + (r.y + r.height) + ' ' + (r.x + r.width - bottomRight) + ' ' +
        (r.y + r.height) + ' ' + 'L ' + (r.x + bottomLeft) + ' ' + (r.y + r.height) + ' Q ' + r.x + ' ' +
        (r.y + r.height) + ' ' + r.x + ' ' + (r.y + r.height - bottomLeft) + ' ' + 'L' + ' ' + r.x + ' ' +
        (topLeft + r.y) + ' ' + 'Z';
}
/**
 * Internal rendering of Rectangle
 *
 * @private
 */
export function drawRectangle(sparkline, options, element) {
    options.d = calculateRoundedRectPath(options.rect, options.topLeft, options.topRight, options.bottomLeft, options.bottomRight);
    return appendShape(sparkline.renderer.drawPath(options), element);
}
/**
 * Internal rendering of Path
 *
 * @private
 */
export function drawPath(sparkline, options, element) {
    return appendShape(sparkline.renderer.drawPath(options), element);
}
/**
 * Function to measure the height and width of the text.
 *
 * @private
 */
export function measureText(text, font, themeStyle) {
    var htmlObject = document.getElementById('sparklinesmeasuretext');
    if (htmlObject === null) {
        htmlObject = createElement('text', { id: 'sparklinesmeasuretext' });
        document.body.appendChild(htmlObject);
    }
    htmlObject.innerText = text;
    htmlObject.style.fontStyle = font.fontStyle;
    htmlObject.style.fontFamily = font.fontFamily || themeStyle.fontFamily;
    htmlObject.style.visibility = 'hidden';
    htmlObject.style.top = '-100';
    htmlObject.style.left = '0';
    htmlObject.style.position = 'absolute';
    htmlObject.style.fontSize = font.size;
    htmlObject.style.fontWeight = font.fontWeight;
    htmlObject.style.whiteSpace = 'nowrap';
    // For Bootstrap line height issue
    htmlObject.style.lineHeight = 'normal';
    return new Size(htmlObject.clientWidth, htmlObject.clientHeight);
}
/**
 * Internal use of text options
 *
 * @private
 */
var TextOption = /** @class */ (function () {
    function TextOption(id, x, y, anchor, text, baseLine, transform) {
        if (transform === void 0) { transform = ''; }
        this.transform = '';
        this.baseLine = 'auto';
        this.id = id;
        this.x = x;
        this.y = y;
        this.anchor = anchor;
        this.text = text;
        this.transform = transform;
        this.baseLine = baseLine;
    }
    return TextOption;
}());
export { TextOption };
/**
 * Internal rendering of text
 *
 * @private
 */
export function renderTextElement(options, font, color, parent, themeStyle) {
    var textOptions = {
        'id': options.id,
        'x': options.x,
        'y': options.y,
        'transform': options.transform,
        'opacity': font.opacity,
        'fill': color,
        'font-family': font.fontFamily || themeStyle.fontFamily,
        'font-weight': font.fontWeight,
        'font-size': font.size,
        'font-style': font.fontStyle,
        'text-anchor': options.anchor,
        'dominant-baseline': options.baseLine
    };
    var renderer = new SvgRenderer('');
    var htmlObject = renderer.createText(textOptions, options.text);
    htmlObject.style['user-select'] = 'none';
    htmlObject.style['-moz-user-select'] = 'none';
    htmlObject.style['-webkit-touch-callout'] = 'none';
    htmlObject.style['-webkit-user-select'] = 'none';
    htmlObject.style['-khtml-user-select'] = 'none';
    htmlObject.style['-ms-user-select'] = 'none';
    htmlObject.style['-o-user-select'] = 'none';
    parent.appendChild(htmlObject);
    return htmlObject;
}
/**
 * To remove element by id.
 */
export function removeElement(id) {
    var element = document.getElementById(id);
    return element ? remove(element) : null;
}
/**
 * To find the element by id.
 */
export function getIdElement(id) {
    return document.getElementById(id);
}
/**
 * To find point within the bounds.
 */
export function withInBounds(x, y, bounds) {
    return (x >= bounds.x && x <= bounds.x + bounds.width && y >= bounds.y && y <= bounds.y + bounds.height);
}
