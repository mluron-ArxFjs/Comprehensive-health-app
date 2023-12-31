import { Animation, Browser, ChildProperty, Collection, Complex, Component, Event, EventHandler, Fetch, Internationalization, L10n, NotifyPropertyChanges, Property, SanitizeHtmlHelper, compile, createElement, extend, isNullOrUndefined, merge, print, remove, setValue } from '@syncfusion/ej2-base';
import { SvgRenderer, Tooltip } from '@syncfusion/ej2-svg-base';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { PdfBitmap, PdfDocument, PdfPageOrientation } from '@syncfusion/ej2-pdf-export';

var __extends$1 = (undefined && undefined.__extends) || (function () {
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
/* eslint-disable max-len */
/**
 * Helper functions for maps control
 */
/**
 * Specifies the size information of an element.
 */
var Size = /** @__PURE__ @class */ (function () {
    function Size(width, height) {
        this.width = width;
        this.height = height;
    }
    return Size;
}());
/**
 * To find number from string
 *
 * @param {string} value Specifies the value
 * @param {number} containerSize Specifies the container size
 * @returns {number} Returns the number
 * @private
 */
function stringToNumber(value, containerSize) {
    if (value !== null && value !== undefined) {
        return value.indexOf('%') !== -1 ? (containerSize / 100) * parseInt(value, 10) : parseInt(value, 10);
    }
    return null;
}
/**
 * Method to calculate the width and height of the maps
 *
 * @param {Maps} maps Specifies the maps instance
 * @returns {void}
 * @private
 */
function calculateSize(maps) {
    maps.element.style.height = !isNullOrUndefined(maps.height) ? maps.height : 'auto';
    maps.element.style.width = !isNullOrUndefined(maps.width) ? maps.width : 'auto';
    maps.element.style.setProperty("display", "block");
    var containerWidth = maps.element.clientWidth;
    var containerHeight = maps.element.clientHeight;
    var containerElementWidth = stringToNumber(maps.element.style.width, containerWidth);
    var containerElementHeight = stringToNumber(maps.element.style.height, containerHeight);
    var availableSize = new Size(0, 0);
    if (maps.width === '0px' || maps.width === '0%' || maps.height === '0%' || maps.height === '0px') {
        availableSize = new Size(0, 0);
    }
    else {
        availableSize = new Size(stringToNumber(maps.width, containerWidth) || containerWidth || containerElementWidth || 600, stringToNumber(maps.height, containerHeight) || containerHeight || containerElementHeight || (maps.isDevice ?
            Math.min(window.innerWidth, window.innerHeight) : 450));
    }
    return availableSize;
}
/**
 * Method to create svg for maps.
 *
 * @param {Maps} maps Specifies the map instance
 * @returns {void}
 * @private
 */
function createSvg(maps) {
    maps.renderer = new SvgRenderer(maps.element.id);
    maps.availableSize = calculateSize(maps);
    maps.svgObject = maps.renderer.createSvg({
        id: maps.element.id + '_svg',
        width: maps.availableSize.width,
        height: maps.availableSize.height
    });
    if (maps.width === '0px' || maps.width === '0%' || maps.height === '0%' || maps.height === '0px') {
        maps.svgObject.setAttribute('height', '0');
        maps.svgObject.setAttribute('width', '0');
    }
}
/**
 * Method to get the mouse position
 *
 * @param {number} pageX - Specifies the pageX.
 * @param {number} pageY - Specifies the pageY.
 * @param {Element} element - Specifies the element.
 * @returns {MapLocation} - Returns the location.
 * @private
 */
function getMousePosition(pageX, pageY, element) {
    var elementRect = element.getBoundingClientRect();
    var pageXOffset = element.ownerDocument.defaultView.pageXOffset;
    var pageYOffset = element.ownerDocument.defaultView.pageYOffset;
    var clientTop = element.ownerDocument.documentElement.clientTop;
    var clientLeft = element.ownerDocument.documentElement.clientLeft;
    var positionX = elementRect.left + pageXOffset - clientLeft;
    var positionY = elementRect.top + pageYOffset - clientTop;
    return new MapLocation((pageX - positionX), (pageY - positionY));
}
/**
 * Method to convert degrees to radians
 *
 * @param {number} deg Specifies the degree value
 * @returns {number} Returns the number
 * @private
 */
function degreesToRadians(deg) {
    return deg * (Math.PI / 180);
}
/**
 * Convert radians to degrees method
 *
 * @param {number} radian Specifies the radian value
 * @returns {number} Returns the number
 * @private
 */
function radiansToDegrees(radian) {
    return radian * (180 / Math.PI);
}
/**
 * Method for converting from latitude and longitude values to points
 *
 * @param {number} latitude - Specifies the latitude.
 * @param {number} longitude - Specifies the longitude.
 * @param {number} factor - Specifies the factor.
 * @param {LayerSettings} layer - Specifies the layer settings.
 * @param {Maps} mapModel - Specifies the maps.
 * @returns {Point} - Returns the point values.
 * @private
 */
function convertGeoToPoint(latitude, longitude, factor, layer, mapModel) {
    var mapSize = new Size(mapModel.mapAreaRect.width, mapModel.mapAreaRect.height);
    var x;
    var y;
    var value;
    var lat;
    var lng;
    var temp;
    var longitudeMinMax = mapModel.baseMapBounds.longitude;
    var latitudeMinMax = mapModel.baseMapBounds.latitude;
    var latRadian = degreesToRadians(latitude);
    var lngRadian = degreesToRadians(longitude);
    var type = mapModel.projectionType;
    var size = (mapModel.isTileMap) ? Math.pow(2, 1) * 256 : (isNullOrUndefined(factor)) ?
        Math.min(mapSize.width, mapSize.height) : (Math.min(mapSize.width, mapSize.height) * factor);
    if (layer.geometryType === 'Normal') {
        x = isNullOrUndefined(factor) ? longitude : Math.abs((longitude - longitudeMinMax.min) * factor);
        y = isNullOrUndefined(factor) ? latitude : Math.abs((latitudeMinMax.max - latitude) * factor);
    }
    else if (layer.geometryType === 'Geographic') {
        switch (type) {
            case 'Mercator': {
                var pixelOrigin = new Point(size / 2, size / 2);
                x = pixelOrigin.x + longitude * (size / 360);
                var sinY = calculateBound(Math.sin(degreesToRadians(latitude)), -0.9999, 0.9999);
                y = pixelOrigin.y + 0.5 * (Math.log((1 + sinY) / (1 - sinY))) * (-(size / (2 * Math.PI)));
                break;
            }
            case 'Winkel3':
                value = aitoff(lngRadian, latRadian);
                lng = (value.x + lngRadian / (Math.PI / 2)) / 2;
                lat = (value.y + latRadian) / 2;
                break;
            case 'Miller':
                lng = lngRadian;
                lat = (1.25 * Math.log(Math.tan((Math.PI / 4) + (.4 * latRadian))));
                break;
            case 'Eckert3':
                temp = Math.sqrt(Math.PI * (4 + Math.PI));
                lng = 2 / temp * lngRadian * (1 + Math.sqrt(1 - 4 * latRadian * latRadian / (Math.PI * Math.PI)));
                lat = 4 / temp * latRadian;
                break;
            case 'AitOff':
                value = aitoff(lngRadian, latRadian);
                lng = value.x;
                lat = value.y;
                break;
            case 'Eckert5':
                lng = lngRadian * (1 + Math.cos(latRadian)) / Math.sqrt(2 + Math.PI);
                lat = 2 * latRadian / Math.sqrt(2 + Math.PI);
                break;
            case 'Equirectangular':
                lng = lngRadian;
                lat = latRadian;
                break;
            case 'Eckert6': {
                var epsilon = 1e-6;
                temp = (1 + (Math.PI / 2)) * Math.sin(latRadian);
                var delta = Infinity;
                for (var i = 0; i < 10 && Math.abs(delta) > epsilon; i++) {
                    delta = (latRadian + (Math.sin(latRadian)) - temp) / (1 + Math.cos(latRadian));
                    latRadian = latRadian - delta;
                }
                temp = Math.sqrt(2 + Math.PI);
                lng = lngRadian * (1 + Math.cos(latRadian)) / temp;
                lat = 2 * latRadian / temp;
                break;
            }
        }
        x = (type === 'Mercator') ? x : roundTo(xToCoordinate(mapModel, radiansToDegrees(lng)), 3);
        y = (type === 'Mercator') ? y : (-(roundTo(yToCoordinate(mapModel, radiansToDegrees(lat)), 3)));
    }
    return new Point(x, y);
}
/**
 * Converting tile latitude and longitude to point
 *
 * @param {MapLocation} center Specifies the map center location
 * @param {number} zoomLevel Specifies the zoom level
 * @param {MapLocation} tileTranslatePoint Specifies the tile translate point
 * @param {boolean} isMapCoordinates Specifies the boolean value
 * @returns {MapLocation} Returns the location value
 * @private
 */
function convertTileLatLongToPoint(center, zoomLevel, tileTranslatePoint, isMapCoordinates) {
    var size = Math.pow(2, zoomLevel) * 256;
    var x = (center.x + 180) / 360;
    var sinLatitude = Math.sin(center.y * Math.PI / 180);
    var y = 0.5 - Math.log((1 + sinLatitude) / (1 - sinLatitude)) / (4 * Math.PI);
    var pixelX = center.x;
    var pixelY = center.y;
    if (isMapCoordinates) {
        pixelX = (x * size + 0.5) + tileTranslatePoint.x;
        pixelY = (y * size + 0.5) + tileTranslatePoint.y;
    }
    return { x: pixelX, y: pixelY };
}
/**
 * Method for calculate x point
 *
 * @param {Maps} mapObject - Specifies the maps.
 * @param {number} val - Specifies the value.
 * @returns {number} - Returns the number.
 * @private
 */
function xToCoordinate(mapObject, val) {
    var longitudeMinMax = mapObject.baseMapBounds.longitude;
    var totalSize = isNullOrUndefined(mapObject.baseSize) ? mapObject.mapAreaRect.width : mapObject.mapAreaRect.width +
        (Math.abs(mapObject.baseSize.width - mapObject.mapAreaRect.width) / 2);
    return Math.round(totalSize * (val - longitudeMinMax.min) / (longitudeMinMax.max - longitudeMinMax.min) * 100) / 100;
}
/**
 * Method for calculate y point
 *
 * @param {Maps} mapObject - Specifies the maps.
 * @param {number} val - Specifies the value.
 * @returns {number} - Returns the number.
 * @private
 */
function yToCoordinate(mapObject, val) {
    var latitudeMinMax = mapObject.baseMapBounds.latitude;
    return Math.round(mapObject.mapAreaRect.height * (val - latitudeMinMax.min) / (latitudeMinMax.max - latitudeMinMax.min) * 100) / 100;
}
/**
 * Method for calculate aitoff projection
 *
 * @param {number} x - Specifies the x value.
 * @param {number} y - Specifies the y value.
 * @returns {Point} - Returns the point value.
 * @private
 */
function aitoff(x, y) {
    var cosy = Math.cos(y);
    var sincia = sinci(acos(cosy * Math.cos(x /= 2)));
    return new Point(2 * cosy * Math.sin(x) * sincia, Math.sin(y) * sincia);
}
/**
 * Method to round the number
 *
 * @param {number} a - Specifies the a value
 * @param {number} b - Specifies the b value
 * @returns {number} - Returns the number
 * @private
 */
function roundTo(a, b) {
    var c = Math.pow(10, b);
    return (Math.round(a * c) / c);
}
/**
 *
 * @param {number} x - Specifies the x value
 * @returns {number} - Returns the number
 * @private
 */
function sinci(x) {
    return x / Math.sin(x);
}
/**
 *
 * @param {number} a - Specifies the a value
 * @returns {number} - Returns the number
 * @private
 */
function acos(a) {
    return Math.acos(a);
}
/**
 * Method to calculate bound
 *
 * @param {number} value Specifies the value
 * @param {number} min Specifies the minimum value
 * @param {number} max Specifies the maximum value
 * @returns {number} Returns the value
 * @private
 */
function calculateBound(value, min, max) {
    if (!isNullOrUndefined(min)) {
        value = Math.max(value, min);
    }
    if (!(isNullOrUndefined(max))) {
        value = Math.min(value, max);
    }
    return value;
}
/**
 * To trigger the download element
 *
 * @param {string} fileName Specifies the file name
 * @param {ExportType} type Specifies the type
 * @param {string} url Specifies the url
 * @param {boolean} isDownload Specifies whether download a file.
 * @returns {void}
 * @private
 */
function triggerDownload(fileName, type, url, isDownload) {
    createElement('a', {
        attrs: {
            'download': fileName + '.' + type.toLocaleLowerCase(),
            'href': url
        }
    }).dispatchEvent(new MouseEvent(isDownload ? 'click' : 'move', {
        view: window,
        bubbles: false,
        cancelable: true
    }));
}
/**
 * Specifies the information of the position of the point in maps.
 */
var Point = /** @__PURE__ @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
/**
 * Map internal class for min and max
 *
 */
var MinMax = /** @__PURE__ @class */ (function () {
    function MinMax(min, max) {
        this.min = min;
        this.max = max;
    }
    return MinMax;
}());
/**
 * Map internal class locations
 */
var GeoLocation = /** @__PURE__ @class */ (function () {
    function GeoLocation(latitude, longitude) {
        this.latitude = new MinMax(latitude.min, latitude.max);
        this.longitude = new MinMax(longitude.min, longitude.max);
    }
    return GeoLocation;
}());
/**
 * Function to measure the height and width of the text.
 *
 * @param  {string} text Specifies the text
 * @param  {FontModel} font Specifies the font
 * @returns {Size} Returns the size
 * @private
 */
function measureText(text, font) {
    var measureObject = document.getElementById('mapsmeasuretext');
    if (measureObject === null) {
        measureObject = createElement('text', { id: 'mapsmeasuretext' });
        document.body.appendChild(measureObject);
    }
    measureObject.innerText = text;
    measureObject.style.position = 'absolute';
    if (typeof (font.size) === 'number') {
        measureObject.style.fontSize = (font.size) + 'px';
    }
    else {
        measureObject.style.fontSize = font.size;
    }
    measureObject.style.fontWeight = font.fontWeight;
    measureObject.style.fontStyle = font.fontStyle;
    measureObject.style.fontFamily = font.fontFamily;
    measureObject.style.visibility = 'hidden';
    measureObject.style.top = '-100';
    measureObject.style.left = '0';
    measureObject.style.whiteSpace = 'nowrap';
    // For bootstrap line height issue
    measureObject.style.lineHeight = 'normal';
    return new Size(measureObject.clientWidth, measureObject.clientHeight);
}
/**
 * Internal use of text options
 *
 * @private
 */
var TextOption = /** @__PURE__ @class */ (function () {
    function TextOption(id, x, y, anchor, text, transform, baseLine) {
        if (transform === void 0) { transform = ''; }
        this.transform = '';
        this.baseLine = 'auto';
        this.id = id;
        this.text = text;
        this.transform = transform;
        this.anchor = anchor;
        this.x = x;
        this.y = y;
        this.baseLine = baseLine;
    }
    return TextOption;
}());
/**
 * Internal use of path options
 *
 * @private
 */
var PathOption = /** @__PURE__ @class */ (function () {
    function PathOption(id, fill, width, color, fillOpacity, strokeOpacity, dashArray, d) {
        this.id = id;
        this['fill-opacity'] = fillOpacity;
        this['stroke-opacity'] = strokeOpacity;
        this.fill = fill;
        this.stroke = color;
        this['stroke-width'] = width;
        this['stroke-dasharray'] = dashArray;
        this.d = d;
    }
    return PathOption;
}());
/** @private */
var ColorValue = /** @__PURE__ @class */ (function () {
    function ColorValue(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    return ColorValue;
}());
/**
 * Internal use of rectangle options
 *
 * @private
 */
var RectOption = /** @__PURE__ @class */ (function (_super) {
    __extends$1(RectOption, _super);
    function RectOption(id, fill, border, fillOpacity, rect, rx, ry, transform, dashArray) {
        var _this = _super.call(this, id, fill, border.width, border.color, fillOpacity, border.opacity) || this;
        _this.y = rect.y;
        _this.x = rect.x;
        _this.height = rect.height;
        _this.width = rect.width;
        _this.rx = rx ? rx : 0;
        _this.ry = ry ? ry : 0;
        _this.transform = transform ? transform : '';
        _this['stroke-dasharray'] = dashArray;
        _this['fill-opacity'] = fillOpacity;
        _this['stroke-opacity'] = border.opacity;
        return _this;
    }
    return RectOption;
}(PathOption));
/**
 * Internal use of circle options
 *
 * @private
 */
var CircleOption = /** @__PURE__ @class */ (function (_super) {
    __extends$1(CircleOption, _super);
    function CircleOption(id, fill, border, fillOpacity, cx, cy, r, dashArray) {
        var _this = _super.call(this, id, fill, border.width, border.color, fillOpacity, border.opacity, dashArray) || this;
        _this.cy = cy;
        _this.cx = cx;
        _this.r = r;
        _this['stroke-dasharray'] = dashArray;
        _this['fill-opacity'] = fillOpacity;
        _this['stroke-opacity'] = border.opacity;
        return _this;
    }
    return CircleOption;
}(PathOption));
/**
 * Internal use of polygon options
 *
 * @private
 */
var PolygonOption = /** @__PURE__ @class */ (function (_super) {
    __extends$1(PolygonOption, _super);
    function PolygonOption(id, points, fill, width, color, fillOpacity, strokeOpacity, dashArray) {
        if (fillOpacity === void 0) { fillOpacity = 1; }
        if (strokeOpacity === void 0) { strokeOpacity = 1; }
        if (dashArray === void 0) { dashArray = ''; }
        var _this = _super.call(this, id, fill, width, color, fillOpacity, strokeOpacity, dashArray) || this;
        _this.points = points;
        return _this;
    }
    return PolygonOption;
}(PathOption));
/**
 * Internal use of polyline options
 *
 * @private
 */
var PolylineOption = /** @__PURE__ @class */ (function (_super) {
    __extends$1(PolylineOption, _super);
    function PolylineOption(id, points, fill, width, color, fillOpacity, strokeOpacity, dashArray) {
        if (fillOpacity === void 0) { fillOpacity = 1; }
        if (strokeOpacity === void 0) { strokeOpacity = 1; }
        if (dashArray === void 0) { dashArray = ''; }
        return _super.call(this, id, points, fill, width, color, fillOpacity, strokeOpacity, dashArray) || this;
    }
    return PolylineOption;
}(PolygonOption));
/**
 * Internal use of line options
 *
 * @private
 */
var LineOption = /** @__PURE__ @class */ (function (_super) {
    __extends$1(LineOption, _super);
    function LineOption(id, line, fill, width, color, fillOpacity, strokeOpacity, dashArray) {
        if (fillOpacity === void 0) { fillOpacity = 1; }
        if (strokeOpacity === void 0) { strokeOpacity = 1; }
        if (dashArray === void 0) { dashArray = ''; }
        var _this = _super.call(this, id, fill, width, color, fillOpacity, strokeOpacity, dashArray) || this;
        _this.x1 = line.x1;
        _this.y1 = line.y1;
        _this.x2 = line.x2;
        _this.y2 = line.y2;
        return _this;
    }
    return LineOption;
}(PathOption));
/**
 * Internal use of line
 *
 * @property {number} Line - Specifies the line class
 * @private
 */
var Line = /** @__PURE__ @class */ (function () {
    function Line(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
    return Line;
}());
/**
 * Internal use of map location type
 *
 * @private
 */
var MapLocation = /** @__PURE__ @class */ (function () {
    function MapLocation(x, y) {
        this.x = x;
        this.y = y;
    }
    return MapLocation;
}());
/**
 * Internal use of type rect
 *
 * @private
 */
var Rect = /** @__PURE__ @class */ (function () {
    function Rect(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    return Rect;
}());
/**
 * Internal use for pattern creation.
 *
 * @property {PatternOptions} PatternOptions - Specifies the pattern option class.
 * @private
 */
var PatternOptions = /** @__PURE__ @class */ (function () {
    function PatternOptions(id, x, y, width, height, patternUnits, patternContentUnits, patternTransform, href) {
        if (patternUnits === void 0) { patternUnits = 'userSpaceOnUse'; }
        if (patternContentUnits === void 0) { patternContentUnits = 'userSpaceOnUse'; }
        if (patternTransform === void 0) { patternTransform = ''; }
        if (href === void 0) { href = ''; }
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.patternUnits = patternUnits;
        this.patternContentUnits = patternContentUnits;
        this.patternTransform = patternTransform;
        this.href = href;
    }
    return PatternOptions;
}());
/**
 * Internal rendering of text
 *
 * @param {TextOption} option Specifies the text option
 * @param {FontModel} style Specifies the style
 * @param {string} color Specifies the color
 * @param {HTMLElement | Element} parent Specifies the parent element
 * @param {boolean} isMinus Specifies the boolean value
 * @returns {Element} Returns the html object
 * @private
 */
function renderTextElement(option, style, color, parent, isMinus) {
    if (isMinus === void 0) { isMinus = false; }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var renderOptions = {
        'id': option.id,
        'x': option.x,
        'y': option.y,
        'fill': color,
        'font-size': style.size,
        'font-style': style.fontStyle,
        'font-family': style.fontFamily,
        'font-weight': style.fontWeight,
        'text-anchor': option.anchor,
        'transform': option.transform,
        'opacity': style.opacity,
        'dominant-baseline': option.baseLine
    };
    var text = typeof option.text === 'string' || typeof option.text === 'number' ? option.text : isMinus ? option.text[option.text.length - 1] : option.text[0];
    var tspanElement;
    var renderer = new SvgRenderer('');
    var height;
    var htmlObject = renderer.createText(renderOptions, text);
    htmlObject.style['user-select'] = 'none';
    htmlObject.style['font-family'] = style.fontFamily;
    htmlObject.style['font-size'] = style.size;
    htmlObject.style['font-weight'] = style.fontWeight;
    htmlObject.style['font-color'] = style.color;
    htmlObject.style['-moz-user-select'] = 'none';
    htmlObject.style['-webkit-touch-callout'] = 'none';
    htmlObject.style['-webkit-user-select'] = 'none';
    htmlObject.style['-khtml-user-select'] = 'none';
    htmlObject.style['-ms-user-select'] = 'none';
    htmlObject.style['-o-user-select'] = 'none';
    if (typeof option.text !== 'string' && option.text.length > 1) {
        for (var i = 1, len = option.text.length; i < len; i++) {
            height = (measureText(option.text[i], style).height);
            tspanElement = renderer.createTSpan({
                'x': option.x, 'id': option.id,
                'y': (option.y) + ((isMinus) ? -(i * height) : (i * height))
            }, isMinus ? option.text[option.text.length - (i + 1)] : option.text[i]);
            htmlObject.appendChild(tspanElement);
        }
    }
    parent.appendChild(htmlObject);
    return htmlObject;
}
/**
 * @param {HTMLCollection} element Specifies the html collection
 * @param {string} markerId Specifies the marker id
 * @param {any} data Specifies the data
 * @param {number} index Specifies the index
 * @param {Maps} mapObj Specifies the map object
 * @returns {HTMLCollection} Returns the html collection
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertElement(element, markerId, data, index, mapObj) {
    var childElement = createElement('div', {
        id: markerId
    });
    childElement.style.cssText = 'position: absolute;pointer-events: auto;';
    var elementLength = element.length;
    while (elementLength > 0) {
        childElement.appendChild(element[0]);
        elementLength--;
    }
    var templateHtml = childElement.innerHTML;
    var properties = Object.keys(data);
    var regExp = RegExp;
    for (var i = 0; i < properties.length; i++) {
        if (typeof data[properties[i]] === 'object') {
            templateHtml = convertStringToValue(templateHtml, '', data, mapObj);
            // eslint-disable-next-line @typescript-eslint/ban-types
        }
        else if (properties[i].toLowerCase() !== 'latitude' && properties[i].toLowerCase() !== 'longitude') {
            templateHtml = templateHtml.replace(new regExp('{{:' + properties[i] + '}}', 'g'), data[properties[i].toString()]);
        }
    }
    childElement.innerHTML = templateHtml;
    return childElement;
}
/**
 *
 * @param {string} value - Specifies the value
 * @param {Maps} maps - Specifies the instance of the maps
 * @returns {string} - Returns the string value
 * @private
 */
function formatValue(value, maps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var formatValue;
    var formatFunction;
    if (maps.format && !isNaN(Number(value))) {
        formatFunction = maps.intl.getNumberFormat({ format: maps.format, useGrouping: maps.useGroupingSeparator });
        formatValue = formatFunction(Number(value));
    }
    else {
        formatValue = value;
    }
    return formatValue;
}
/**
 *
 * @param {string} stringTemplate - Specifies the template
 * @param {string} format - Specifies the format
 * @param {any} data - Specifies the data
 * @param {Maps} maps - Specifies the instance of the maps
 * @returns {string} - Returns the string value
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertStringToValue(stringTemplate, format, data, maps) {
    var templateHtml = (stringTemplate === '') ? format : stringTemplate;
    var templateValue = (stringTemplate === '') ? templateHtml.split('${') : templateHtml.split('{{:');
    var regExp = RegExp;
    for (var i = 0; i < templateValue.length; i++) {
        if ((templateValue[i].indexOf('}}') > -1 && templateValue[i].indexOf('.') > -1) ||
            (templateValue[i].indexOf('}') > -1 && templateValue[i].search('.') > -1)) {
            var split = (stringTemplate === '') ? templateValue[i].split('}') : templateValue[i].split('}}');
            for (var j = 0; j < split.length; j++) {
                if (split[j].indexOf('.') > -1) {
                    var templateSplitValue = (getValueFromObject(data, split[j])).toString();
                    templateHtml = (stringTemplate === '') ?
                        templateHtml.split('${' + split[j] + '}').join(formatValue(templateSplitValue, maps)) :
                        templateHtml.replace(new regExp('{{:' + split[j] + '}}', 'g'), templateSplitValue);
                }
            }
        }
    }
    return templateHtml;
}
/**
 *
 * @param {Element} element - Specifies the element
 * @param {string} labelId - Specifies the label id
 * @param {any} data - Specifies the data
 * @param {number} index - Specifies the index
 * @param {Maps} mapObj - Specifies the map object
 * @returns {HTMLElement} - Returns the html element
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertElementFromLabel(element, labelId, data, index, mapObj) {
    var labelEle = isNullOrUndefined(element.childElementCount) ? element[0] : element;
    var templateHtml = labelEle.outerHTML;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var properties = Object.keys(data);
    var regExp = RegExp;
    for (var i = 0; i < properties.length; i++) {
        // eslint-disable-next-line @typescript-eslint/ban-types
        templateHtml = templateHtml.replace(new regExp('{{:' + properties[i] + '}}', 'g'), data[properties[i].toString()]);
    }
    var templateEle = createElement('div', {
        id: labelId,
        innerHTML: templateHtml
    });
    templateEle.style.position = 'absolute';
    return templateEle;
}
/**
 *
 * @param {MarkerType} shape - Specifies the shape
 * @param {string} imageUrl - Specifies the image url
 * @param {Point} location - Specifies the location
 * @param {string} markerID - Specifies the marker id
 * @param {any} shapeCustom - Specifies the shape custom
 * @param {Element} markerCollection - Specifies the marker collection
 * @param {Maps} maps - Specifies the instance of the maps
 * @returns {Element} - Returns the element
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function drawSymbols(shape, imageUrl, location, markerID, shapeCustom, markerCollection, maps) {
    var markerEle;
    var x;
    var y;
    var size = shapeCustom['size'];
    var borderColor = shapeCustom['borderColor'];
    var borderWidth = parseFloat(shapeCustom['borderWidth']);
    var borderOpacity = parseFloat(shapeCustom['borderOpacity']);
    var fill = shapeCustom['fill'];
    var dashArray = shapeCustom['dashArray'];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var border = { color: borderColor, width: borderWidth, opacity: borderOpacity };
    var opacity = shapeCustom['opacity'];
    var rectOptions;
    var pathOptions = new PathOption(markerID, fill, borderWidth, borderColor, opacity, borderOpacity, dashArray, '');
    size.width = typeof (size.width) === 'string' ? parseInt(size.width, 10) : size.width;
    size.height = typeof (size.height) === 'string' ? parseInt(size.height, 10) : size.height;
    if (shape === 'Circle') {
        var radius = (size.width + size.height) / 4;
        var circleOptions = new CircleOption(markerID, fill, border, opacity, location.x, location.y, radius, dashArray);
        markerEle = maps.renderer.drawCircle(circleOptions);
    }
    else if (shape === 'Rectangle') {
        x = location.x - (size.width / 2);
        y = location.y - (size.height / 2);
        rectOptions = new RectOption(markerID, fill, border, opacity, new Rect(x, y, size.width, size.height), null, null, '', dashArray);
        markerEle = maps.renderer.drawRectangle(rectOptions);
    }
    else if (shape === 'Image') {
        x = location.x - (size.width / 2);
        y = location.y - (markerID.indexOf('cluster') > -1 ? (size.height / 2) : size.height);
        merge(pathOptions, { 'href': imageUrl, 'height': size.height, 'width': size.width, x: x, y: y });
        markerEle = maps.renderer.drawImage(pathOptions);
    }
    else {
        markerEle = calculateShapes(maps, shape, pathOptions, size, location, markerCollection);
    }
    return markerEle;
}
/**
 *
 * @param {any} data - Specifies the data
 * @param {string} value - Specifies the value
 * @returns {any} - Returns the data
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getValueFromObject(data, value) {
    if (!isNullOrUndefined(data) && !isNullOrUndefined(value)) {
        var splits = value.replace(/\[/g, '.').replace(/\]/g, '').split('.');
        if (splits.length === 1) {
            data = data[splits[0]];
        }
        else {
            for (var i = 0; i < splits.length && !isNullOrUndefined(data); i++) {
                data = data[splits[i]];
            }
        }
    }
    return data;
}
/**
 *
 * @param {IMarkerRenderingEventArgs} eventArgs - Specifies the event arguments
 * @param {any} data - Specifies the data
 * @returns {IMarkerRenderingEventArgs} - Returns the arguments
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function markerColorChoose(eventArgs, data) {
    var color = (!isNullOrUndefined(eventArgs.colorValuePath)) ? ((eventArgs.colorValuePath.indexOf('.') > -1) ? (getValueFromObject(data, eventArgs.colorValuePath)).toString() :
        data[eventArgs.colorValuePath]) : data[eventArgs.colorValuePath];
    eventArgs.fill = (!isNullOrUndefined(eventArgs.colorValuePath) &&
        !isNullOrUndefined(color)) ?
        ((eventArgs.colorValuePath.indexOf('.') > -1) ? (getValueFromObject(data, eventArgs.colorValuePath)).toString() :
            data[eventArgs.colorValuePath]) : eventArgs.fill;
    return eventArgs;
}
/**
 *
 * @param {IMarkerRenderingEventArgs} eventArgs - Specifies the event arguments
 * @param {any} data - Specifies the data
 * @returns {IMarkerRenderingEventArgs} - Returns the arguments
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function markerShapeChoose(eventArgs, data) {
    if (!isNullOrUndefined(eventArgs.shapeValuePath) && !isNullOrUndefined(data[eventArgs.shapeValuePath])) {
        var shape = ((eventArgs.shapeValuePath.indexOf('.') > -1) ?
            (getValueFromObject(data, eventArgs.shapeValuePath).toString()) :
            data[eventArgs.shapeValuePath]);
        eventArgs.shape = (shape.toString() !== '') ? shape : eventArgs.shape;
        if (data[eventArgs.shapeValuePath] === 'Image') {
            eventArgs.imageUrl = (!isNullOrUndefined(eventArgs.imageUrlValuePath)) ?
                ((eventArgs.imageUrlValuePath.indexOf('.') > -1) ? getValueFromObject(data, eventArgs.imageUrlValuePath).toString() : (!isNullOrUndefined(data[eventArgs.imageUrlValuePath]) ?
                    data[eventArgs.imageUrlValuePath] : eventArgs.imageUrl)) : eventArgs.imageUrl;
        }
    }
    else {
        var shapes = (!isNullOrUndefined(eventArgs.shapeValuePath)) ? ((eventArgs.shapeValuePath.indexOf('.') > -1) ? getValueFromObject(data, eventArgs.shapeValuePath).toString() : eventArgs.shape) : eventArgs.shape;
        eventArgs.shape = (shapes.toString() !== '') ? shapes : eventArgs.shape;
        var shapeImage = (!isNullOrUndefined(eventArgs.imageUrlValuePath)) ?
            ((eventArgs.imageUrlValuePath.indexOf('.') > -1) ? getValueFromObject(data, eventArgs.imageUrlValuePath).toString() : (!isNullOrUndefined(data[eventArgs.imageUrlValuePath]) ?
                data[eventArgs.imageUrlValuePath] : eventArgs.imageUrl)) : eventArgs.imageUrl;
        eventArgs.imageUrl = shapeImage;
    }
    return eventArgs;
}
/**
 *
 * @param {LayerSettings} currentLayer - Specifies the current layer
 * @param {HTMLElement | Element} markerTemplate - Specifies the marker template
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {number} layerIndex - Specifies the layer index
 * @param {Element} markerCollection - Specifies the marker collection
 * @param {Element} layerElement - Specifies the layer element
 * @param {boolean} check - Specifies the boolean value
 * @param {boolean} zoomCheck - Specifies the boolean value
 * @returns {void}
 * @private
 */
function clusterTemplate(currentLayer, markerTemplate, maps, layerIndex, markerCollection, layerElement, check, zoomCheck) {
    var bounds1;
    var bounds2;
    var colloideBounds = [];
    var clusterColloideBounds = [];
    var tempX = 0;
    var tempY = 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var data;
    var style = currentLayer.markerClusterSettings.labelStyle;
    var options;
    var textElement;
    var tempElement1;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var shapeCustom;
    var tempElement;
    var postionY = (15 / 4);
    var m = 0;
    var indexCollection = [];
    var clusters = currentLayer.markerClusterSettings;
    var clusterGroup = maps.renderer.createGroup({ id: maps.element.id + '_LayerIndex_' + layerIndex + '_markerCluster' });
    var eventArg = {
        cancel: false, name: markerClusterRendering, fill: clusters.fill, height: clusters.height,
        width: clusters.width, imageUrl: clusters.imageUrl, shape: clusters.shape,
        data: data, maps: maps, cluster: clusters, border: clusters.border
    };
    maps.trigger('markerClusterRendering', eventArg, function (clusterargs) {
        for (var o = 0; o < markerTemplate.childElementCount; o++) {
            indexCollection = [];
            if (markerTemplate.childNodes[o]['style']['visibility'] !== 'hidden') {
                tempElement = markerTemplate.childNodes[o];
                bounds1 = tempElement.getBoundingClientRect();
                indexCollection.push(o);
                if (!isNullOrUndefined(bounds1)) {
                    for (var p = o + 1; p < markerTemplate.childElementCount; p++) {
                        if (markerTemplate.childNodes[p]['style']['visibility'] !== 'hidden') {
                            tempElement = markerTemplate.childNodes[p];
                            bounds2 = tempElement.getBoundingClientRect();
                            if (!isNullOrUndefined(bounds2)) {
                                if (!(bounds1.left > bounds2.right || bounds1.right < bounds2.left
                                    || bounds1.top > bounds2.bottom || bounds1.bottom < bounds2.top)) {
                                    colloideBounds.push(bounds2);
                                    markerTemplate.childNodes[p]['style']['visibility'] = 'hidden';
                                    indexCollection.push(p);
                                }
                            }
                        }
                    }
                    tempX = bounds1.left + bounds1.width / 2;
                    tempY = bounds1.top + bounds1.height;
                    if (colloideBounds.length > 0) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        indexCollection = indexCollection.filter(function (item, index, value) { return value.indexOf(item) === index; });
                        var container = maps.element.getBoundingClientRect();
                        tempX = tempX - container['left'];
                        tempY = (tempY - ((maps.availableSize.height <= container['height']) ?
                            container['top'] : (container['bottom'] - container['top'])));
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var translate = (maps.isTileMap) ? new Object() : getTranslate(maps, currentLayer, false);
                        var dataIndex = parseInt(markerTemplate.childNodes[o]['id'].split('_dataIndex_')[1].split('_')[0], 10);
                        var markerIndex = parseInt(markerTemplate.childNodes[o]['id'].split('_MarkerIndex_')[1].split('_')[0], 10);
                        var markerSetting = currentLayer.markerSettings[markerIndex];
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var markerData = markerSetting.dataSource[dataIndex];
                        var factor = void 0;
                        var location_1 = void 0;
                        var longitude = (!isNullOrUndefined(markerSetting.longitudeValuePath)) ?
                            Number(getValueFromObject(markerData, markerSetting.longitudeValuePath)) :
                            !isNullOrUndefined(markerData['longitude']) ? parseFloat(markerData['longitude']) :
                                !isNullOrUndefined(markerData['Latitude']) ? parseFloat(markerData['Latitude']) : 0;
                        var latitude = (!isNullOrUndefined(markerSetting.latitudeValuePath)) ?
                            Number(getValueFromObject(markerData, markerSetting.latitudeValuePath)) :
                            !isNullOrUndefined(markerData['latitude']) ? parseFloat(markerData['latitude']) :
                                !isNullOrUndefined(markerData['Latitude']) ? parseFloat(markerData['Latitude']) : 0;
                        if (!maps.isTileMap) {
                            factor = maps.mapLayerPanel.calculateFactor(currentLayer);
                            location_1 = convertGeoToPoint(latitude, longitude, factor, currentLayer, maps);
                        }
                        else if (maps.isTileMap && !maps.zoomSettings.enable) {
                            location_1 = convertTileLatLongToPoint(new Point(longitude, latitude), maps.tileZoomLevel, maps.tileTranslatePoint, true);
                        }
                        markerTemplate.childNodes[o]['style']['visibility'] = 'hidden';
                        var clusters_1 = currentLayer.markerClusterSettings;
                        if (eventArg.cancel) {
                            shapeCustom = {
                                size: new Size(clusters_1.width, clusters_1.height),
                                fill: clusters_1.fill, borderColor: clusters_1.border.color,
                                borderWidth: clusters_1.border.width, opacity: clusters_1.opacity,
                                dashArray: clusters_1.dashArray
                            };
                            shapeCustom['fill'] = clusters_1.fill;
                            shapeCustom['size']['width'] = clusters_1.width;
                            shapeCustom['size']['height'] = clusters_1.height;
                            shapeCustom['imageUrl'] = clusters_1.imageUrl;
                            shapeCustom['shape'] = clusters_1.shape;
                            shapeCustom['borderColor'] = clusters_1.border.color;
                            shapeCustom['borderWidth'] = clusters_1.border.width;
                            shapeCustom['borderOpacity'] = isNullOrUndefined(clusters_1.border.opacity) ? clusters_1.opacity : clusters_1.border.opacity;
                        }
                        else {
                            shapeCustom = {
                                size: new Size(clusters_1.width, clusters_1.height),
                                fill: clusters_1.fill, borderColor: clusters_1.border.color,
                                borderWidth: clusters_1.border.width, opacity: clusters_1.opacity,
                                dashArray: clusters_1.dashArray
                            };
                            shapeCustom['fill'] = eventArg.fill;
                            shapeCustom['size']['width'] = eventArg.width;
                            shapeCustom['size']['height'] = eventArg.height;
                            shapeCustom['imageUrl'] = eventArg.imageUrl;
                            shapeCustom['shape'] = eventArg.shape;
                            shapeCustom['borderColor'] = eventArg.border.color;
                            shapeCustom['borderWidth'] = eventArg.border.width;
                            shapeCustom['borderOpacity'] = isNullOrUndefined(eventArg.border.opacity) ? clusters_1.opacity : eventArg.border.opacity;
                        }
                        tempX = (maps.isTileMap) ? tempX : (markerTemplate.id.indexOf('_Markers_Group') > -1) ? tempX : tempX + postionY - (eventArg.width / 2);
                        tempY = (maps.isTileMap) ? tempY : (markerTemplate.id.indexOf('_Markers_Group') > -1) ? tempY : tempY - (eventArg.height / 2);
                        if (maps.isTileMap && !maps.zoomSettings.enable) {
                            tempX = location_1.x;
                            tempY = location_1.y;
                        }
                        var clusterID = maps.element.id + '_LayerIndex_' + layerIndex + '_MarkerIndex_' + markerIndex + '_dataIndex_' + dataIndex + '_cluster_' + (m);
                        var labelID = maps.element.id + '_LayerIndex_' + layerIndex + '_MarkerIndex_' + markerIndex + '_dataIndex_' + dataIndex + '_cluster_' + (m) + '_datalabel_' + m;
                        m++;
                        var ele = drawSymbols(shapeCustom['shape'], shapeCustom['imageUrl'], { x: 0, y: 0 }, clusterID, shapeCustom, markerCollection, maps);
                        ele.setAttribute('transform', 'translate( ' + tempX + ' ' + tempY + ' )');
                        if (eventArg.shape === 'Balloon') {
                            ele.children[0].textContent = indexCollection.toString();
                        }
                        else {
                            ele.textContent = indexCollection.toString();
                        }
                        options = new TextOption(labelID, (0), postionY, 'middle', (colloideBounds.length + 1).toString(), '', '');
                        textElement = renderTextElement(options, style, style.color, markerCollection);
                        textElement.setAttribute('transform', 'translate( ' + tempX + ' ' + tempY + ' )');
                        clusterGroup.appendChild(textElement);
                        clusterGroup.appendChild(ele);
                    }
                }
                colloideBounds = [];
            }
        }
        layerElement.appendChild(clusterGroup);
        maps.svgObject.appendChild(layerElement);
        maps.element.appendChild(maps.svgObject);
        for (var o = 0; o < clusterGroup.childElementCount; o++) {
            if (clusterGroup.childNodes[o]['style']['visibility'] !== 'hidden') {
                tempElement = clusterGroup.childNodes[o];
                bounds1 = tempElement.getBoundingClientRect();
                if (!isNullOrUndefined(bounds1) && !(tempElement.id.indexOf('_datalabel_') > -1)) {
                    for (var p = o + 1; p < clusterGroup.childElementCount; p++) {
                        if (clusterGroup.childNodes[p]['style']['visibility'] !== 'hidden') {
                            tempElement1 = clusterGroup.childNodes[p];
                            bounds2 = tempElement1.getBoundingClientRect();
                            if (!isNullOrUndefined(bounds2) && !(tempElement1.id.indexOf('_datalabel_') > -1)) {
                                if (!(bounds1.left > bounds2.right || bounds1.right < bounds2.left
                                    || bounds1.top > bounds2.bottom || bounds1.bottom < bounds2.top)) {
                                    clusterColloideBounds.push(tempElement1);
                                    clusterColloideBounds.push(clusterGroup.childNodes[p - 1]);
                                    clusterGroup.childNodes[p]['style']['visibility'] = 'hidden';
                                    clusterGroup.childNodes[p - 1]['style']['visibility'] = 'hidden';
                                    indexCollection.push(p);
                                }
                            }
                        }
                    }
                    if (clusterColloideBounds.length > 0) {
                        tempElement = clusterGroup.childNodes[o];
                        for (var i = 0; i < clusterColloideBounds.length; i++) {
                            if (tempElement.tagName === 'g') {
                                tempElement.childNodes[0].textContent = tempElement.childNodes[0].textContent + ',' +
                                    clusterColloideBounds[i].textContent;
                            }
                            else {
                                tempElement.textContent = tempElement.textContent + ',' + clusterColloideBounds[i].textContent;
                            }
                            clusterGroup.childNodes[o - 1].textContent = ((+(clusterGroup.childNodes[o - 1].textContent)) + (+(clusterColloideBounds[i + 1].textContent))).toString();
                            i++;
                        }
                    }
                    clusterColloideBounds = [];
                }
            }
        }
        while (0 < clusterGroup.childNodes.length) {
            markerCollection.insertBefore(clusterGroup.childNodes[0], markerCollection.firstChild);
        }
        if (check) {
            layerElement.appendChild(markerCollection);
        }
        else {
            getElementByID(maps.element.id + '_Secondary_Element').appendChild(markerCollection);
            layerElement.appendChild(markerCollection);
        }
        var markerCluster = document.getElementById(maps.element.id + '_LayerIndex_' + layerIndex + '_markerCluster');
        if (!isNullOrUndefined(markerCluster)) {
            markerCluster.remove();
        }
        if (zoomCheck) {
            var layerGroupElement = document.getElementById(maps.element.id + '_Layer_Collections');
            if (!isNullOrUndefined(layerGroupElement)) {
                layerGroupElement.appendChild(layerElement);
            }
        }
    });
}
/**
 *
 * @param {MarkerClusterData[]} sameMarkerData - Specifies the marker data
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {Element | HTMLElement} markerElement - Specifies the marker element
 * @returns {void}
 * @private
 */
function mergeSeparateCluster(sameMarkerData, maps, markerElement) {
    var layerIndex = sameMarkerData[0].layerIndex;
    var clusterIndex = sameMarkerData[0].targetClusterIndex;
    var markerIndex = sameMarkerData[0].markerIndex;
    var dataIndex = sameMarkerData[0].dataIndex;
    var markerId = maps.element.id + '_LayerIndex_' + layerIndex + '_MarkerIndex_' + markerIndex;
    var marker = maps.layers[layerIndex].markerSettings[markerIndex];
    var clusterId = markerId + '_dataIndex_' + dataIndex + '_cluster_' + clusterIndex;
    var clusterEle = maps.layers[layerIndex].markerClusterSettings.shape === 'Balloon' ? getElement(clusterId + '_Group') : getElement(clusterId);
    var clusterEleLabel = getElement(clusterId + '_datalabel_' + clusterIndex);
    clusterEle.setAttribute('visibility', 'visible');
    clusterEleLabel.setAttribute('visibility', 'visible');
    var markerEle;
    var markerDataLength = sameMarkerData[0].data.length;
    for (var i = 0; i < markerDataLength; i++) {
        markerEle = marker.shape === 'Balloon' && isNullOrUndefined(marker.template) ? getElement(markerId + '_dataIndex_' + sameMarkerData[0].data[i]['index'] + '_Group') : getElement(markerId + '_dataIndex_' + sameMarkerData[0].data[i]['index']);
        markerEle['style']['visibility'] = 'hidden';
    }
    removeElement(maps.element.id + '_LayerIndex_' + layerIndex + '_MarkerIndex_' + markerIndex + '_markerClusterConnectorLine');
}
/**
 *
 * @param {MarkerClusterData[]} sameMarkerData - Specifies the marker data
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {Element | HTMLElement} markerElement - Specifies the marker element
 * @param {boolean} isDom - Specifies the boolean value
 * @returns {void}
 * @private
 */
function clusterSeparate(sameMarkerData, maps, markerElement, isDom) {
    var layerIndex = sameMarkerData[0].layerIndex;
    var markerIndex = sameMarkerData[0].markerIndex;
    var clusterIndex = sameMarkerData[0].targetClusterIndex;
    var dataIndex = sameMarkerData[0].dataIndex;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var getElementFunction = isDom ? getElement : markerElement.querySelector.bind(markerElement);
    var getQueryConnect = isDom ? '' : '#';
    var markerId = maps.element.id + '_LayerIndex_' + layerIndex + '_MarkerIndex_' + markerIndex;
    var marker = maps.layers[layerIndex].markerSettings[markerIndex];
    var clusterId = markerId + '_dataIndex_' + dataIndex + '_cluster_' + clusterIndex;
    var clusterEle = maps.layers[layerIndex].markerClusterSettings.shape === 'Balloon' ? getElementFunction(getQueryConnect + '' + clusterId + '_Group') : getElementFunction(getQueryConnect + '' + clusterId);
    var clusterEleLabel = getElementFunction(getQueryConnect + '' + clusterId + '_datalabel_' + clusterIndex);
    clusterEle.setAttribute('visibility', 'hidden');
    clusterEleLabel.setAttribute('visibility', 'hidden');
    var markerEle = marker.shape === 'Balloon' && isNullOrUndefined(marker.template) ? getElementFunction(getQueryConnect + '' + markerId + '_dataIndex_' + dataIndex + '_Group') : getElementFunction(getQueryConnect + '' + markerId + '_dataIndex_' + dataIndex);
    var height = markerEle.parentElement.id.indexOf('Template_Group') > -1 ? markerEle.getBoundingClientRect().height : marker.height;
    var width = markerEle.parentElement.id.indexOf('Template_Group') > -1 ? markerEle.getBoundingClientRect().width : marker.width;
    var centerX = +clusterEle.getAttribute('transform').split('translate(')[1].trim().split(' ')[0];
    var centerY = +clusterEle.getAttribute('transform').split('translate(')[1].trim().split(' ')[1].split(')')[0].trim();
    var radius = width + 5;
    var area = 2 * 3.14 * radius;
    var totalMarker = 0;
    var numberOfMarker = Math.round(area / width);
    totalMarker += numberOfMarker;
    var markerDataLength = sameMarkerData[0].data.length;
    var percent = Math.round((height / area) * 100);
    percent = markerDataLength < numberOfMarker ? 100 / markerDataLength : percent;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var angle = (percent / 100) * 360;
    var newAngle = markerDataLength < numberOfMarker ? 45 : 0;
    var count = 1;
    var start = 'M ' + centerX + ' ' + centerY + ' ';
    var path = '';
    for (var i = 0; i < markerDataLength; i++) {
        if (totalMarker === i || Math.round(newAngle) >= 360) {
            count++;
            radius = (width + 5) * count;
            newAngle = 0;
            area = 2 * 3.14 * radius;
            numberOfMarker = Math.round(area / height);
            percent = Math.round((height / area) * 100);
            while (percent * numberOfMarker < 100) {
                numberOfMarker++;
            }
            angle = ((percent / 100) * 360);
            totalMarker += numberOfMarker;
        }
        var x1 = centerX + radius * Math.sin((Math.PI * 2 * newAngle) / 360);
        var y1 = centerY + radius * Math.cos((Math.PI * 2 * newAngle) / 360);
        path += start + 'L ' + (x1) + ' ' + y1 + ' ';
        markerEle = marker.shape === 'Balloon' && isNullOrUndefined(marker.template) ? getElementFunction(getQueryConnect + '' + markerId + '_dataIndex_' + sameMarkerData[0].data[i]['index'] + '_Group') : getElementFunction(getQueryConnect + '' + markerId + '_dataIndex_' + sameMarkerData[0].data[i]['index']);
        if (markerEle.parentElement.id.indexOf('Template_Group') > -1) {
            markerEle['style']['transform'] = '';
            markerEle['style']['left'] = maps.isTileMap ? x1 - (width / 2) + 'px' : (x1 - (width / 2) - 10) + 'px';
            markerEle['style']['top'] = maps.isTileMap ? y1 - (height / 2) + 'px' : (y1 - (height / 2) - 10) + 'px';
            markerEle.setAttribute('transform', 'translate( ' + x1 + ' ' + y1 + ')');
        }
        else {
            markerEle.setAttribute('transform', 'translate( ' + x1 + ' ' + y1 + ')');
        }
        markerEle['style']['visibility'] = 'visible';
        newAngle += angle;
    }
    var connectorLine = maps.layers[layerIndex].markerClusterSettings.connectorLineSettings;
    var options = {
        d: path, id: maps.element.id + '_LayerIndex_' + layerIndex + '_MarkerIndex_' + markerIndex + '_dataIndex_' + dataIndex + '_markerClusterConnectorLine', stroke: connectorLine.color,
        'fill-opacity': connectorLine.opacity, 'stroke-opacity': connectorLine.opacity, 'stroke-width': connectorLine.width
    };
    markerElement = isDom ? getElementFunction(maps.element.id + '_Markers_Group') : markerElement;
    var groupEle = maps.renderer.createGroup({ id: maps.element.id + '_LayerIndex_' + layerIndex + '_MarkerIndex_' + markerIndex + '_markerClusterConnectorLine' });
    groupEle.appendChild(maps.renderer.drawPath(options));
    if (marker.shape === 'Balloon') {
        markerElement.insertBefore(groupEle, markerElement.querySelector('#' + markerId + '_dataIndex_0_Group'));
    }
    else {
        markerElement.insertBefore(groupEle, markerElement.querySelector('#' + markerId + '_dataIndex_0'));
    }
}
/**
 *
 * @param {IMarkerRenderingEventArgs} eventArgs - Specifies the arguments
 * @param {MarkerSettings} markerSettings - Specifies the marker settings
 * @param {any[]} markerData - Specifies the marker data
 * @param {number} dataIndex - Specifies the data index
 * @param {Point} location - Specifies the location
 * @param {Point} transPoint - Specifies the translate point
 * @param {string} markerID - Specifies the marker id
 * @param {Point} offset - Specifies the offset value
 * @param {number} scale - Specifies the scale value
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {Element} markerCollection - Specifies the marker collection
 * @returns {Element} - Returns the element
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function marker(eventArgs, markerSettings, markerData, dataIndex, location, transPoint, markerID, offset, scale, maps, markerCollection) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var shapeCustom = {
        size: new Size(eventArgs.width, eventArgs.height),
        fill: eventArgs.fill, borderColor: eventArgs.border.color,
        borderWidth: eventArgs.border.width, opacity: markerSettings.opacity,
        dashArray: markerSettings.dashArray, borderOpacity: isNullOrUndefined(eventArgs.border.opacity) ? markerSettings.opacity :
            eventArgs.border.opacity
    };
    removeElement(markerID);
    var ele = drawSymbols(eventArgs.shape, eventArgs.imageUrl, { x: 0, y: 0 }, markerID, shapeCustom, markerCollection, maps);
    var x = (maps.isTileMap ? location.x : (location.x + transPoint.x) * scale) + offset.x;
    var y = (maps.isTileMap ? location.y : (location.y + transPoint.y) * scale) + offset.y;
    ele.setAttribute('transform', 'translate( ' + x + ' ' + y + ' )');
    maintainSelection(maps.selectedMarkerElementId, maps.markerSelectionClass, ele, 'MarkerselectionMapStyle');
    markerCollection.appendChild(ele);
    var element = (markerData.length - 1) === dataIndex ? 'marker' : null;
    var markerPoint = new Point(x, y);
    if (markerSettings.animationDuration > 0) {
        elementAnimate(ele, markerSettings.animationDelay, markerSettings.animationDuration, markerPoint, maps, element);
    }
    return markerCollection;
}
/**
 *
 * @param {IMarkerRenderingEventArgs} eventArgs - Specifies the arguments
 * @param {any} templateFn - Specifies the template function
 * @param {string} markerID - Specifies the marker id
 * @param {any} data - Specifies the data
 * @param {number} markerIndex - Specifies the marker index
 * @param {HTMLElement} markerTemplate - Specifies the marker template element
 * @param {Point} location - Specifies the location
 * @param {Point} transPoint - Specifies the translate point.
 * @param {number} scale - Specifies the scale value
 * @param {Point} offset - Specifies the offset value
 * @param {Maps} maps - Specifies the instance of the maps
 * @returns {HTMLElement} - Returns the html element
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function markerTemplate(eventArgs, templateFn, markerID, data, markerIndex, markerTemplate, location, transPoint, scale, offset, maps) {
    templateFn = getTemplateFunction(eventArgs.template, maps);
    if (templateFn && (templateFn(data, maps, eventArgs.template, maps.element.id + '_MarkerTemplate' + markerIndex, false).length)) {
        var templateElement = templateFn(data, maps, eventArgs.template, maps.element.id + '_MarkerTemplate' + markerIndex, false);
        var markerElement = convertElement(templateElement, markerID, data, markerIndex, maps);
        for (var i = 0; i < markerElement.children.length; i++) {
            markerElement.children[i].style.pointerEvents = 'auto';
        }
        markerElement.style.left = (maps.isTileMap ? location.x : (location.x + transPoint.x) * scale) + offset.x - maps.mapAreaRect.x + 'px';
        markerElement.style.top = (maps.isTileMap ? location.y : (location.y + transPoint.y) * scale) + offset.y - maps.mapAreaRect.y + 'px';
        markerTemplate.appendChild(markerElement);
        if (maps.layers[maps.baseLayerIndex].layerType === 'GoogleStaticMap') {
            var staticMapOffset = getElementByID(maps.element.id + '_StaticGoogleMap').getBoundingClientRect();
            var markerElementOffset = markerElement.getBoundingClientRect();
            var staticMapOffsetWidth = 640;
            if ((staticMapOffset['x'] > markerElementOffset['x'] || staticMapOffset['x'] + staticMapOffsetWidth < markerElementOffset['x'] + markerElementOffset['width'])
                && (staticMapOffset['y'] > markerElementOffset['y'] || staticMapOffset['y'] + staticMapOffset['height'] < markerElementOffset['y'] + markerElementOffset['height'])) {
                markerElement.style.display = 'none';
            }
        }
    }
    return markerTemplate;
}
/**
 * To maintain selection during page resize
 *
 * @param {string[]} elementId - Specifies the element id
 * @param {Element} elementClass - Specifies the element class
 * @param {Element} element - Specifies the element
 * @param {string} className - Specifies the class name
 * @returns {void}
 * @private
 */
function maintainSelection(elementId, elementClass, element, className) {
    if (elementId) {
        for (var index = 0; index < elementId.length; index++) {
            if (element.getAttribute('id') === elementId[index]) {
                if (index === 0 || element.tagName === 'g') {
                    if (!isNullOrUndefined(elementClass) && !isNullOrUndefined(elementClass.id)) {
                        document.body.appendChild(elementClass);
                    }
                    if (element.id.indexOf('_MarkerIndex_') > -1 && element.childElementCount > 0) {
                        element.children[0].setAttribute('class', className);
                    }
                }
                element.setAttribute('class', className);
            }
        }
    }
}
/**
 * To maintain selection style class
 *
 * @param {string} id - Specifies the id
 * @param {string} idClass - Specifies the class id
 * @param {string} fill - Specifies the fill
 * @param {string} opacity - Specifies the opactiy
 * @param {string} borderColor - Specifies the border color
 * @param {string} borderWidth - Specifies the border width
 * @param {Maps} maps - Specifies the maps
 * @returns {void}
 * @private
 */
function maintainStyleClass(id, idClass, fill, opacity, borderColor, borderWidth, maps) {
    if (!getElement(id)) {
        var styleClass = createElement('style', {
            id: id
        });
        styleClass.innerText = '.' + idClass + '{fill:'
            + fill + ';' + 'opacity:' + opacity + ';' +
            'stroke-width:' + borderWidth + ';' +
            'stroke:' + borderColor + ';' + '}';
        maps.shapeSelectionClass = styleClass;
        document.body.appendChild(styleClass);
    }
}
/**
 * Internal use of append shape element
 *
 * @param {Element} shape - Specifies the shape
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
function appendShape(shape, element) {
    if (element) {
        element.appendChild(shape);
    }
    return shape;
}
/**
 * Internal rendering of Circle
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {CircleOption} options - Specifies the circle options
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
function drawCircle(maps, options, element) {
    return appendShape(maps.renderer.drawCircle(options), element);
}
/**
 * Internal rendering of Rectangle
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {RectOption} options - Specifies the rect options
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
function drawRectangle(maps, options, element) {
    return appendShape(maps.renderer.drawRectangle(options), element);
}
/**
 * Internal rendering of Path
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PathOption} options - Specifies the polygon options
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
function drawPath(maps, options, element) {
    return appendShape(maps.renderer.drawPath(options), element);
}
/**
 * Internal rendering of Polygon
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PolygonOption} options - Specifies the polygon options
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
function drawPolygon(maps, options, element) {
    return appendShape(maps.renderer.drawPolygon(options), element);
}
/**
 * Internal rendering of Polyline
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PolylineOption} options - Specifies the poly line options
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
function drawPolyline(maps, options, element) {
    return appendShape(maps.renderer.drawPolyline(options), element);
}
/**
 * Internal rendering of Line
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {LineOption} options - Specifies the line options
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
function drawLine(maps, options, element) {
    return appendShape(maps.renderer.drawLine(options), element);
}
/**
 * Calculate marker shapes
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {MarkerType} shape - Specifies the marker type
 * @param {PathOption} options - Specifies the path options
 * @param {Size} size - Specifies the size
 * @param {MapLocation} location - Specifies the map location
 * @param {Element} markerEle - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
function calculateShapes(maps, shape, options, size, location, markerEle) {
    var tempGroup;
    switch (shape) {
        case 'Balloon':
            tempGroup = drawBalloon(maps, options, size, location, 'Marker', markerEle);
            break;
        case 'Cross':
            options.d = 'M ' + location.x + ' ' + (location.y - size.height / 2) + ' L ' + location.x + ' ' + (location.y + size.height
                / 2) + ' M ' + (location.x - size.width / 2) + ' ' + location.y + ' L ' + (location.x + size.width / 2) + ' ' + location.y;
            break;
        case 'Diamond':
            options.d = 'M ' + location.x + ' ' + (location.y - size.height / 2) + ' L ' + (location.x + size.width / 2) + ' '
                + location.y + ' L ' + location.x + ' ' + (location.y + size.height / 2) + ' L ' + (location.x - size.width / 2)
                + ' ' + location.y + ' Z';
            break;
        case 'Star':
            options.d = 'M ' + (location.x + size.width / 3) + ' ' + (location.y - size.height / 2) + ' L ' + (location.x - size.width / 2)
                + ' ' + (location.y + size.height / 6) + ' L ' + (location.x + size.width / 2) + ' ' + (location.y + size.height / 6)
                + ' L ' + (location.x - size.width / 3) + ' ' + (location.y - size.height / 2) + ' L ' + location.x + ' ' +
                (location.y + size.height / 2) + ' L ' + (location.x + size.width / 3) + ' ' + (location.y - size.height / 2) + ' Z';
            break;
        case 'Triangle':
            options.d = 'M ' + location.x + ' ' + (location.y - size.height / 2) + ' L ' + (location.x + size.width / 2) + ' ' +
                (location.y + size.height / 2) + ' L ' + (location.x - size.width / 2) + ' ' + (location.y + size.height / 2) + ' Z';
            break;
        case 'HorizontalLine':
            options.d = ' M ' + (location.x - size.width / 2) + ' ' + location.y + ' L ' + (location.x + size.width / 2) + ' '
                + location.y;
            break;
        case 'VerticalLine':
            options.d = 'M ' + location.x + ' ' + (location.y - size.height / 2) + ' L ' + location.x + ' ' +
                (location.y + size.height / 2);
            break;
        case 'InvertedTriangle':
            options.d = 'M ' + (location.x - size.width / 2) + ' ' + (location.y - size.height / 2) + ' L ' + (location.x + size.width / 2) + ' ' +
                (location.y - size.height / 2) + ' L ' + (location.x) + ' ' + (location.y + size.height / 2) + ' Z';
            break;
        case 'Pentagon':
            // eslint-disable-next-line no-case-declarations
            var eq = 72;
            var xValue = void 0;
            var yValue = void 0;
            for (var i = 0; i < 5; i++) {
                xValue = (size.width / 2) * Math.cos((Math.PI / 180) * (i * eq));
                yValue = (size.height / 2) * Math.sin((Math.PI / 180) * (i * eq));
                options.d += (i === 0 ? 'M ' : 'L ') + (location.x + xValue) + ' ' + (location.y + yValue);
            }
            options.d += ' Z';
            break;
    }
    if (shape === 'Cross' || shape === 'HorizontalLine' || shape === 'VerticalLine') {
        options['stroke'] = (options['stroke'] === 'transparent') ? options['fill'] : options['stroke'];
    }
    return shape === 'Balloon' ? tempGroup : maps.renderer.drawPath(options);
}
/**
 * Internal rendering of Diamond
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PathOption} options - Specifies the path options
 * @param {Size} size - Specifies the size
 * @param {MapLocation} location - Specifies the map location
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
function drawDiamond(maps, options, size, location, element) {
    options.d = 'M ' + location.x + ' ' + (location.y - size.height / 2) + ' L ' + (location.x + size.width / 2) + ' ' + location.y +
        ' L ' + location.x + ' ' + (location.y + size.height / 2) + ' L ' + (location.x - size.width / 2) + ' ' + location.y + ' Z';
    return appendShape(maps.renderer.drawPath(options), element);
}
/**
 * Internal rendering of Triangle
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PathOption} options - Specifies the path options
 * @param {Size} size - Specifies the size
 * @param {MapLocation} location - Specifies the map location
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
function drawTriangle(maps, options, size, location, element) {
    options.d = 'M ' + location.x + ' ' + (location.y - size.height / 2) + ' L ' + (location.x + size.width / 2) + ' ' +
        (location.y + size.height / 2) + ' L ' + (location.x - size.width / 2) + ' ' + (location.y + size.height / 2) + ' Z';
    return appendShape(maps.renderer.drawPath(options), element);
}
/**
 * Internal rendering of Cross
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PathOption} options - Specifies the path options
 * @param {Size} size - Specifies the size
 * @param {MapLocation} location - Specifies the map location
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
function drawCross(maps, options, size, location, element) {
    options.d = 'M ' + location.x + ' ' + (location.y - size.height / 2) + ' L ' + location.x + ' ' + (location.y + size.height / 2) +
        ' M ' + (location.x - size.width / 2) + ' ' + location.y + ' L ' + (location.x + size.width / 2) + ' ' + location.y;
    return appendShape(maps.renderer.drawPath(options), element);
}
/**
 * Internal rendering of HorizontalLine
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PathOption} options - Specifies the path options
 * @param {Size} size - Specifies the size
 * @param {MapLocation} location - Specifies the map location
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
function drawHorizontalLine(maps, options, size, location, element) {
    options.d = ' M ' + (location.x - size.width / 2) + ' ' + location.y + ' L ' + (location.x + size.width / 2) + ' ' + location.y;
    return appendShape(maps.renderer.drawPath(options), element);
}
/**
 * Internal rendering of VerticalLine
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PathOption} options - Specifies the path options
 * @param {Size} size - Specifies the size
 * @param {MapLocation} location - Specifies the map location
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
function drawVerticalLine(maps, options, size, location, element) {
    options.d = 'M ' + location.x + ' ' + (location.y - size.height / 2) + ' L ' + location.x + ' ' + (location.y + size.height / 2);
    return appendShape(maps.renderer.drawPath(options), element);
}
/**
 * Internal rendering of Star
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PathOption} options - Specifies the path options
 * @param {Size} size - Specifies the size
 * @param {MapLocation} location - Specifies the map location
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
function drawStar(maps, options, size, location, element) {
    options.d = 'M ' + (location.x + size.width / 3) + ' ' + (location.y - size.height / 2) + ' L ' + (location.x - size.width / 2)
        + ' ' + (location.y + size.height / 6) + ' L ' + (location.x + size.width / 2) + ' ' + (location.y + size.height / 6) + ' L '
        + (location.x - size.width / 3) + ' ' + (location.y - size.height / 2) + ' L ' + location.x + ' ' + (location.y + size.height / 2)
        + ' L ' + (location.x + size.width / 3) + ' ' + (location.y - size.height / 2) + ' Z';
    return appendShape(maps.renderer.drawPath(options), element);
}
/**
 * Internal rendering of Balloon
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PathOption} options - Specifies the path options
 * @param {Size} size - Specifies the size
 * @param {MapLocation} location - Specifies the map location
 * @param {string} type - Specifies the type.
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
function drawBalloon(maps, options, size, location, type, element) {
    var width = size.width;
    var height = size.height;
    var pathElement;
    location.x -= width / 2;
    location.y -= height / 2;
    options.d = 'M15,0C8.8,0,3.8,5,3.8,11.2C3.8,17.5,9.4,24.4,15,30c5.6-5.6,11.2-12.5,11.2-18.8C26.2,5,21.2,0,15,0z M15,16' +
        'c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5S17.8,16,15,16z';
    var balloon = maps.renderer.drawPath(options);
    var x = size.width / 30;
    var y = size.height / 30;
    balloon.setAttribute('transform', 'translate(' + location.x + ', ' + location.y + ') scale(' + x + ', ' + y + ')');
    if (type === 'Marker') {
        var g = maps.renderer.createGroup({ id: options.id + '_Group' });
        appendShape(balloon, g);
        pathElement = appendShape(g, element);
    }
    else {
        pathElement = balloon;
    }
    return pathElement;
}
/**
 * Internal rendering of Pattern
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {PatternOptions} options - Specifies the pattern options
 * @param {Element[]} elements - Specifies the elements
 * @param {Element} element - Specifies the element
 * @returns {Element} - Returns the element
 * @private
 */
function drawPattern(maps, options, elements, element) {
    var pattern = maps.renderer.createPattern(options, 'pattern');
    for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
        var ele = elements_1[_i];
        appendShape(ele, pattern);
    }
    return appendShape(pattern, element);
}
/**
 * Method to get specific field and vaues from data.
 *
 * @param {any[]} dataSource - Specifies the data source
 * @param {string[]} fields - Specifies the fields
 * @returns {any[]} - Returns the object
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getFieldData(dataSource, fields) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var newData = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var data;
    for (var _i = 0, dataSource_1 = dataSource; _i < dataSource_1.length; _i++) {
        var temp = dataSource_1[_i];
        data = {};
        for (var _a = 0, fields_1 = fields; _a < fields_1.length; _a++) {
            var field = fields_1[_a];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (temp[field]) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data[field] = temp[field];
            }
        }
        newData.push(data);
    }
    return newData;
}
/**
 * To find the index of dataSource from shape properties
 *
 * @param {any[]} dataSource - Specifies the data source
 * @param {any} properties - Specifies the properties
 * @param {string} dataPath - Specifies the data path
 * @param {string | string[]} propertyPath - Specifies the property path
 * @param {LayerSettingsModel} layer - Specifies the layer settings
 * @returns {number} - Returns the number
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkShapeDataFields(dataSource, properties, dataPath, propertyPath, layer) {
    if (!(isNullOrUndefined(properties))) {
        for (var i = 0; i < dataSource.length; i++) {
            var shapeDataPath = ((dataPath.indexOf('.') > -1) ? getValueFromObject(dataSource[i], dataPath) :
                dataSource[i][dataPath]);
            var shapePath = checkPropertyPath(shapeDataPath, propertyPath, properties);
            var shapeDataPathValue = !isNullOrUndefined(shapeDataPath) && isNaN(properties[shapePath])
                ? (typeof shapeDataPath === 'string' ? shapeDataPath.toLowerCase() : shapeDataPath) : shapeDataPath;
            var propertiesShapePathValue = !isNullOrUndefined(properties[shapePath]) && isNaN(properties[shapePath])
                ? properties[shapePath].toLowerCase() : properties[shapePath];
            if (shapeDataPathValue === propertiesShapePathValue) {
                return i;
            }
        }
    }
    return null;
}
/**
 *
 * @param {string} shapeData - Specifies the shape data
 * @param {string | string[]} shapePropertyPath -  Specifies the shape property path
 * @param {any} shape -  Specifies the shape
 * @returns {string} - Returns the string value
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkPropertyPath(shapeData, shapePropertyPath, shape) {
    if (!isNullOrUndefined(shapeData) && !isNullOrUndefined(shape)) {
        if (!isNullOrUndefined(shapePropertyPath)) {
            var properties = (Object.prototype.toString.call(shapePropertyPath) === '[object Array]' ?
                shapePropertyPath : [shapePropertyPath]);
            for (var i = 0; i < properties.length; i++) {
                var shapeDataValue = !isNullOrUndefined(shapeData) && typeof shapeData === 'string' ?
                    shapeData.toLowerCase() : shapeData;
                var shapePropertiesValue = !isNullOrUndefined(shape[properties[i]])
                    && isNaN(shape[properties[i]])
                    ? shape[properties[i]].toLowerCase() : shape[properties[i]];
                if (shapeDataValue === shapePropertiesValue) {
                    return properties[i];
                }
            }
        }
    }
    return null;
}
/**
 *
 * @param {MapLocation[]} points - Specifies the location
 * @param {number} start - Specifies the start value
 * @param {number} end - Specifies the end value
 * @returns {MapLocation[]} - Returns the location
 * @private
 */
function filter(points, start, end) {
    var pointObject = [];
    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        if (start <= point.y && end >= point.y) {
            pointObject.push(point);
        }
    }
    return pointObject;
}
/**
 *
 * @param {number} min - Specifies the min value
 * @param {number} max - Specifies the max value
 * @param {number} value - Specifies the value
 * @param {number} minValue - Specifies the minValue
 * @param {number} maxValue -Specifies the maxValue
 * @returns {number} - Returns the number
 * @private
 */
function getRatioOfBubble(min, max, value, minValue, maxValue) {
    var percent = (100 / (maxValue - minValue)) * (value - minValue);
    var bubbleRadius = (((max - min) / 100) * percent) + min;
    if (maxValue === minValue) {
        bubbleRadius = (((max - min) / 100)) + min;
    }
    return bubbleRadius;
}
/**
 * To find the midpoint of the polygon from points
 *
 * @param {MapLocation[]} points - Specifies the points
 * @param {string} type - Specifies the type
 * @param {string} geometryType - Specified the type of the geometry
 * @returns {any} - Specifies the object
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function findMidPointOfPolygon(points, type, geometryType) {
    if (!points.length) {
        return null;
    }
    var min = 0;
    var max = points.length;
    var startX;
    var startY;
    var startX1;
    var startY1;
    var sum = 0;
    var xSum = 0;
    var ySum = 0;
    for (var i = min; i <= max - 1; i++) {
        startX = points[i].x;
        startY = type === 'Mercator' || geometryType === 'Normal' ? points[i].y : -(points[i].y);
        if (i === max - 1) {
            startX1 = points[0].x;
            startY1 = type === 'Mercator' || geometryType === 'Normal' ? points[0].y : -(points[0].y);
        }
        else {
            startX1 = points[i + 1].x;
            startY1 = type === 'Mercator' || geometryType === 'Normal' ? points[i + 1].y : -(points[i + 1].y);
        }
        sum = sum + Math.abs(((startX * startY1)) - (startX1 * startY));
        xSum = xSum + Math.abs(((startX + startX1) * (((startX * startY1) - (startX1 * startY)))));
        ySum = ySum + Math.abs(((startY + startY1) * (((startX * startY1) - (startX1 * startY)))));
    }
    sum = 0.5 * sum;
    var pointValue = points.some(function (point) { return point.x < 5 && point.y < 5; }) && geometryType === 'Normal' ? 6 : 4;
    xSum = (1 / (pointValue * sum)) * xSum;
    ySum = (1 / (pointValue * sum)) * ySum;
    /* Code for finding nearest points in polygon related to midPoint*/
    var rightMinPoint = { x: 0, y: 0 };
    var rightMaxPoint = { x: 0, y: 0 };
    var leftMinPoint = { x: 0, y: 0 };
    var leftMaxPoint = { x: 0, y: 0 };
    var bottomMinPoint = { x: 0, y: 0 };
    var bottomMaxPoint = { x: 0, y: 0 };
    var topMinPoint = { x: 0, y: 0 };
    var topMaxPoint = { x: 0, y: 0 };
    var height = 0;
    for (var i = min; i <= max - 1; i++) {
        var point = points[i];
        point.y = type === 'Mercator' || geometryType === 'Normal' ? point.y : -(point.y);
        if (point.y > ySum) {
            if (point.x < xSum && xSum - point.x < xSum - bottomMinPoint.x) {
                bottomMinPoint = { x: point.x, y: point.y };
            }
            else if (point.x > xSum && (bottomMaxPoint.x === 0 || point.x - xSum < bottomMaxPoint.x - xSum)) {
                bottomMaxPoint = { x: point.x, y: point.y };
            }
        }
        else {
            if (point.x < xSum && xSum - point.x < xSum - topMinPoint.x) {
                topMinPoint = { x: point.x, y: point.y };
            }
            else if (point.x > xSum && (topMaxPoint.x === 0 || point.x - xSum < topMaxPoint.x - xSum)) {
                topMaxPoint = { x: point.x, y: point.y };
            }
        }
        height = (bottomMaxPoint.y - topMaxPoint.y) + ((bottomMaxPoint.y - topMaxPoint.y) / 4);
        if (point.x > xSum) {
            if (point.y < ySum && ySum - point.y < ySum - rightMinPoint.y) {
                rightMinPoint = { x: point.x, y: point.y };
            }
            else if (point.y > ySum && (rightMaxPoint.y === 0 || point.y - ySum < rightMaxPoint.y - ySum)) {
                rightMaxPoint = { x: point.x, y: point.y };
            }
        }
        else {
            if (point.y < ySum && ySum - point.y < ySum - leftMinPoint.y) {
                leftMinPoint = { x: point.x, y: point.y };
            }
            else if (point.y > ySum && (leftMaxPoint.y === 0 || point.y - ySum < leftMaxPoint.y - ySum)) {
                leftMaxPoint = { x: point.x, y: point.y };
            }
        }
    }
    return {
        x: xSum, y: ySum, rightMin: rightMinPoint, rightMax: rightMaxPoint,
        leftMin: leftMinPoint, leftMax: leftMaxPoint, points: points, topMax: topMaxPoint, topMin: topMinPoint,
        bottomMax: bottomMaxPoint, bottomMin: bottomMinPoint, height: height
    };
}
/**
 * Check custom path
 *
 * @param {any[]} layerData - Specifies the layer data
 * @returns {boolean} - Returns the boolean vlue
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isCustomPath(layerData) {
    var customPath = false;
    if (Object.prototype.toString.call(layerData) === '[object Array]') {
        Array.prototype.forEach.call(layerData, function (layer, index) {
            if (!isNullOrUndefined(layer['geometry']) && layer['geometry']['type'] === 'Path') {
                customPath = true;
            }
        });
    }
    return customPath;
}
/**
 * Trim the title text
 *
 * @param {number} maxWidth - Specifies the maximum width
 * @param {string} text - Specifies the text
 * @param {FontModel} font - Specifies the font
 * @returns {string} - Returns the string
 * @private
 */
function textTrim(maxWidth, text, font) {
    var label = text;
    var size = measureText(text, font).width;
    if (size > maxWidth) {
        var textLength = text.length;
        for (var i = textLength - 1; i >= 0; --i) {
            label = text.substring(0, i) + '...';
            size = measureText(label, font).width;
            if (size <= maxWidth || label.length < 4) {
                if (label.length < 4) {
                    label = ' ';
                }
                return label;
            }
        }
    }
    return label;
}
/**
 * Method to calculate x position of title
 *
 * @param {Rect} location - Specifies the location
 * @param {Alignment} alignment - Specifies the alignment
 * @param {Size} textSize - Specifies the text size
 * @param {string} type - Specifies the type
 * @returns {Point} - Returns the point values
 * @private
 */
function findPosition(location, alignment, textSize, type) {
    var x;
    switch (alignment) {
        case 'Near':
            x = location.x;
            break;
        case 'Center':
            x = (type === 'title') ? (location.width / 2 - textSize.width / 2) :
                ((location.x + (location.width / 2)) - textSize.width / 2);
            break;
        case 'Far':
            x = (type === 'title') ? (location.width - location.y - textSize.width) :
                ((location.x + location.width) - textSize.width);
            break;
    }
    var y = (type === 'title') ? location.y + (textSize.height / 2) : ((location.y + location.height / 2) + textSize.height / 2);
    return new Point(x, y);
}
/**
 * To remove element by id
 *
 * @param {string} id - Specifies the id
 * @returns {void}
 * @private
 */
function removeElement(id) {
    var element = document.getElementById(id);
    return element ? remove(element) : null;
}
/**
 * To calculate map center position from pixel values
 *
 * @param {Maps} mapObject - Specifies the map object
 * @param {LayerSettings} layer - Specifies the layer settings
 * @returns {Point} - Returns the x and y points
 * @private
 */
function calculateCenterFromPixel(mapObject, layer) {
    var point1 = convertGeoToPoint(mapObject.minLatOfGivenLocation, mapObject.minLongOfGivenLocation, mapObject.mapLayerPanel.calculateFactor(layer), layer, mapObject);
    var point2 = convertGeoToPoint(mapObject.maxLatOfGivenLocation, mapObject.maxLongOfGivenLocation, mapObject.mapLayerPanel.calculateFactor(layer), layer, mapObject);
    var x = (point1.x + point2.x) / 2;
    var y = (point1.y + point2.y) / 2;
    return new Point(x, y);
}
/**
 * @param {Maps} mapObject - Specifies the map object
 * @param {LayerSettings} layer - Specifies the layer settings
 * @param {boolean} animate - Specifies the boolean value
 * @returns {any} - Returns the object
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getTranslate(mapObject, layer, animate) {
    var zoomFactorValue = mapObject.zoomSettings.zoomFactor;
    var scaleFactor;
    var center = mapObject.centerPosition;
    var centerLatitude = center.latitude;
    var centerLongitude = center.longitude;
    var checkMethodeZoom = !isNullOrUndefined(mapObject.centerLatOfGivenLocation) &&
        !isNullOrUndefined(mapObject.centerLongOfGivenLocation) && mapObject.zoomNotApplied;
    if (isNullOrUndefined(mapObject.mapScaleValue)) {
        mapObject.mapScaleValue = zoomFactorValue;
    }
    if (mapObject.zoomSettings.shouldZoomInitially && mapObject.zoomSettings.enable) {
        mapObject.mapScaleValue = scaleFactor = zoomFactorValue = ((mapObject.zoomSettings.shouldZoomInitially || mapObject.enablePersistence) && mapObject.scale === 1)
            ? mapObject.scale : (isNullOrUndefined(mapObject.markerZoomFactor)) ? 1 : mapObject.markerZoomFactor;
        if (mapObject.mapScaleValue !== mapObject.markerZoomFactor && !mapObject.enablePersistence) {
            mapObject.mapScaleValue = zoomFactorValue = mapObject.markerZoomFactor;
        }
        if (!isNullOrUndefined(mapObject.markerCenterLatitude) && !isNullOrUndefined(mapObject.markerCenterLongitude)) {
            centerLatitude = mapObject.markerCenterLatitude;
            centerLongitude = mapObject.markerCenterLongitude;
        }
    }
    if (checkMethodeZoom) {
        mapObject.mapScaleValue = scaleFactor = zoomFactorValue = mapObject.scaleOfGivenLocation;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var min = !isNullOrUndefined(mapObject.baseMapRectBounds) ? mapObject.baseMapRectBounds['min'] : null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var max = !isNullOrUndefined(mapObject.baseMapRectBounds) ? mapObject.baseMapRectBounds['max'] : null;
    var zoomFactor = animate ? 1 : mapObject.mapScaleValue;
    if (isNullOrUndefined(mapObject.currentShapeDataLength)) {
        mapObject.currentShapeDataLength = !isNullOrUndefined(layer.shapeData['features'])
            ? layer.shapeData['features'].length : layer.shapeData['geometries'].length;
    }
    var size = (mapObject.totalRect && mapObject.legendSettings.visible) ? mapObject.totalRect : mapObject.mapAreaRect;
    var availSize = mapObject.availableSize;
    var x;
    var y;
    if (!isNullOrUndefined(min) && !isNullOrUndefined(max)) {
        var mapWidth = Math.abs(max['x'] - min['x']);
        var mapHeight = Math.abs(min['y'] - max['y']);
        var factor = animate ? 1 : mapObject.markerZoomFactor === 1 ? mapObject.mapScaleValue : zoomFactorValue;
        center = mapObject.zoomSettings.shouldZoomInitially
            && mapObject.markerZoomedState && !mapObject.zoomPersistence ? mapObject.markerZoomCenterPoint :
            mapObject.centerPosition;
        if (((!isNullOrUndefined(centerLongitude) && centerLongitude !== 0) && (!isNullOrUndefined(centerLatitude) && centerLatitude !== 0)) || checkMethodeZoom) {
            var leftPosition = (((mapWidth + Math.abs(mapObject.mapAreaRect.width - mapWidth)) / 2) + mapObject.mapAreaRect.x) / factor;
            var topPosition = (((mapHeight + Math.abs(mapObject.mapAreaRect.height - mapHeight)) / 2) + mapObject.mapAreaRect.y) / factor;
            var point = checkMethodeZoom ? calculateCenterFromPixel(mapObject, layer) :
                convertGeoToPoint(centerLatitude, centerLongitude, mapObject.mapLayerPanel.calculateFactor(layer), layer, mapObject);
            if (isNullOrUndefined(mapObject.previousProjection) || mapObject.previousProjection !== mapObject.projectionType) {
                x = -point.x + leftPosition;
                y = -point.y + topPosition;
                scaleFactor = zoomFactor;
            }
            else {
                if (Math.floor(mapObject.scale) !== 1 && mapObject.zoomSettings.shouldZoomInitially || (mapObject.zoomNotApplied)) {
                    x = -point.x + leftPosition;
                    y = -point.y + topPosition;
                }
                else {
                    if (mapObject.zoomSettings.shouldZoomInitially || mapObject.zoomNotApplied) {
                        x = -point.x + leftPosition;
                        y = -point.y + topPosition;
                        scaleFactor = zoomFactor;
                    }
                    else {
                        x = mapObject.zoomTranslatePoint.x;
                        y = mapObject.zoomTranslatePoint.y;
                    }
                }
                scaleFactor = mapObject.mapScaleValue;
            }
        }
        else {
            if (isNullOrUndefined(mapObject.previousProjection) || mapObject.previousProjection !== mapObject.projectionType) {
                if (mapHeight === 0 || mapWidth === 0 || mapHeight === mapWidth) {
                    mapWidth = size.width / 2;
                    mapHeight = size.height;
                }
                scaleFactor = parseFloat(Math.min(size.width / mapWidth, size.height / mapHeight).toFixed(2));
                scaleFactor = scaleFactor > 1.05 ? 1 : scaleFactor;
                mapWidth *= scaleFactor;
                mapHeight *= scaleFactor;
                var widthDiff = min['x'] !== 0 && mapObject.translateType === 'layers' ? availSize.width - size.width : 0;
                x = size.x + ((-(min['x'])) + ((size.width / 2) - (mapWidth / 2))) - widthDiff;
                y = size.y + ((-(min['y'])) + ((size.height / 2) - (mapHeight / 2)));
                mapObject.previousTranslate = new Point(x, y);
            }
            else {
                if (!mapObject.zoomSettings.shouldZoomInitially && mapObject.markerZoomFactor === 1 && mapObject.mapScaleValue === 1) {
                    scaleFactor = parseFloat(Math.min(size.width / mapWidth, size.height / mapHeight).toFixed(2));
                    mapHeight *= scaleFactor;
                    mapWidth *= scaleFactor;
                    y = size.y + ((-(min['y'])) + ((size.height / 2) - (mapHeight / 2)));
                    x = size.x + ((-(min['x'])) + ((size.width / 2) - (mapWidth / 2)));
                }
                else {
                    scaleFactor = mapObject.mapScaleValue < 1 ? mapObject.mapScaleValue + 1 : mapObject.mapScaleValue;
                    mapObject.mapScaleValue = mapObject.zoomSettings.enable && mapObject.mapScaleValue !== 1 ? mapObject.mapScaleValue : 1;
                    if ((mapObject.currentShapeDataLength !== (!isNullOrUndefined(layer.shapeData['features'])
                        ? layer.shapeData['features'].length : layer.shapeData['geometries'].length)) && layer.type !== 'SubLayer') {
                        var scale = parseFloat(Math.min(size.height / mapHeight, size.width / mapWidth).toFixed(2));
                        mapHeight *= scale;
                        mapWidth *= scale;
                        y = size.y + ((-(min['y'])) + ((size.height / 2)
                            - (mapHeight / 2)));
                        scaleFactor = scale;
                        x = size.x + ((-(min['x']))
                            + ((size.width / 2) - (mapWidth / 2)));
                    }
                    else if (mapObject.availableSize.height !== mapObject.heightBeforeRefresh || mapObject.widthBeforeRefresh !== mapObject.availableSize.width) {
                        var cscaleFactor = parseFloat(Math.min(size.width / mapWidth, size.height / mapHeight).toFixed(2));
                        var cmapWidth = mapWidth;
                        cmapWidth *= cscaleFactor;
                        var cmapHeight = mapHeight;
                        cmapHeight *= cscaleFactor;
                        var x1 = size.x + ((-(min['x'])) + ((size.width / 2) - (cmapWidth / 2)));
                        var y1 = size.y + ((-(min['y'])) + ((size.height / 2) - (cmapHeight / 2)));
                        var xdiff = (mapObject.translatePoint.x - mapObject.previousTranslate.x) / (mapObject.widthBeforeRefresh);
                        var ydiff = (mapObject.translatePoint.y - mapObject.previousTranslate.y) / (mapObject.heightBeforeRefresh);
                        var actxdiff = xdiff * (mapObject.availableSize.width);
                        var actydiff = ydiff * (mapObject.availableSize.height);
                        x = x1 + actxdiff;
                        y = y1 + actydiff;
                        mapObject.previousTranslate = new Point(x1, y1);
                        mapObject.zoomTranslatePoint.x = x;
                        mapObject.zoomTranslatePoint.y = y;
                    }
                    else {
                        if (!isNullOrUndefined(mapObject.previousProjection) && (mapObject.mapScaleValue === 1
                            || mapObject.mapScaleValue <= 1.05) && !mapObject.zoomModule.isDragZoom) {
                            scaleFactor = parseFloat(Math.min(size.width / mapWidth, size.height / mapHeight).toFixed(2));
                            scaleFactor = scaleFactor > 1.05 ? 1 : scaleFactor;
                            mapWidth *= scaleFactor;
                            x = size.x + ((-(min['x'])) + ((size.width / 2) - (mapWidth / 2)));
                            mapHeight *= scaleFactor;
                            y = size.y + ((-(min['y'])) + ((size.height / 2) - (mapHeight / 2)));
                        }
                        else {
                            x = mapObject.zoomTranslatePoint.x;
                            y = mapObject.zoomTranslatePoint.y;
                            scaleFactor = mapObject.scale;
                        }
                    }
                }
            }
        }
        if (!isNullOrUndefined(mapObject.translatePoint)) {
            x = (mapObject.enablePersistence && mapObject.translatePoint.x !== 0 && !mapObject.zoomNotApplied) ?
                mapObject.translatePoint.x : x;
            y = (mapObject.enablePersistence && mapObject.translatePoint.y !== 0 && !mapObject.zoomNotApplied) ?
                mapObject.translatePoint.y : y;
        }
    }
    scaleFactor = (mapObject.enablePersistence) ? ((mapObject.mapScaleValue >= 1) ? mapObject.mapScaleValue : 1) : scaleFactor;
    mapObject.widthBeforeRefresh = mapObject.availableSize.width;
    mapObject.heightBeforeRefresh = mapObject.availableSize.height;
    return { scale: scaleFactor, location: new Point(x, y) };
}
/**
 * @param {Maps} mapObject - Specifies the map object
 * @param {LayerSettings} layer - Specifies the layer
 * @param {boolean} animate - Specifies the boolean value
 * @returns {any} - Returns the object.
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getZoomTranslate(mapObject, layer, animate) {
    var zoomFactorValue = mapObject.zoomSettings.zoomFactor;
    var scaleFactor;
    var center = mapObject.centerPosition;
    var latitude = center.latitude;
    var longitude = center.longitude;
    var checkZoomMethod = !isNullOrUndefined(mapObject.centerLongOfGivenLocation) &&
        !isNullOrUndefined(mapObject.centerLatOfGivenLocation) && mapObject.zoomNotApplied;
    if (isNullOrUndefined(mapObject.previousCenterLatitude) &&
        isNullOrUndefined(mapObject.previousCenterLongitude)) {
        mapObject.previousCenterLatitude = mapObject.centerPosition.latitude;
        mapObject.previousCenterLongitude = mapObject.centerPosition.longitude;
    }
    else if (mapObject.previousCenterLatitude !==
        mapObject.centerPosition.latitude && mapObject.previousCenterLongitude !==
        mapObject.centerPosition.longitude) {
        mapObject.centerPositionChanged = true;
        mapObject.previousCenterLatitude = mapObject.centerPosition.latitude;
        mapObject.previousCenterLongitude = mapObject.centerPosition.longitude;
    }
    else {
        mapObject.centerPositionChanged = false;
    }
    if (isNullOrUndefined(mapObject.mapScaleValue) || (zoomFactorValue > mapObject.mapScaleValue)) {
        if (mapObject.isReset && mapObject.mapScaleValue === 1) {
            // eslint-disable-next-line no-self-assign
            mapObject.mapScaleValue = mapObject.mapScaleValue;
        }
        else {
            mapObject.mapScaleValue = zoomFactorValue;
        }
    }
    mapObject.mapScaleValue = mapObject.zoomSettings.zoomFactor !== 1 &&
        mapObject.zoomSettings.zoomFactor ===
            mapObject.mapScaleValue ? mapObject.zoomSettings.zoomFactor :
        mapObject.zoomSettings.zoomFactor !== mapObject.mapScaleValue && !mapObject.centerPositionChanged ?
            mapObject.mapScaleValue : mapObject.zoomSettings.zoomFactor;
    if (mapObject.zoomSettings.shouldZoomInitially && !mapObject.isZoomByPosition) {
        mapObject.mapScaleValue = zoomFactorValue = scaleFactor = ((mapObject.enablePersistence
            || mapObject.zoomSettings.shouldZoomInitially) && mapObject.scale === 1)
            ? mapObject.scale : (isNullOrUndefined(mapObject.markerZoomFactor)) ? mapObject.mapScaleValue : mapObject.markerZoomFactor;
        zoomFactorValue = mapObject.mapScaleValue;
        if (!isNullOrUndefined(mapObject.markerCenterLatitude) && !isNullOrUndefined(mapObject.markerCenterLongitude)) {
            latitude = mapObject.markerCenterLatitude;
            longitude = mapObject.markerCenterLongitude;
        }
    }
    if (checkZoomMethod) {
        mapObject.mapScaleValue = scaleFactor = zoomFactorValue = mapObject.scaleOfGivenLocation;
    }
    var zoomFactor = animate ? 1 : mapObject.mapScaleValue;
    var size = mapObject.mapAreaRect;
    var x;
    var y;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var min = mapObject.baseMapRectBounds['min'];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var max = mapObject.baseMapRectBounds['max'];
    var factor = animate ? 1 : mapObject.mapScaleValue;
    var mapWidth = Math.abs(max['x'] - min['x']);
    var mapHeight = Math.abs(min['y'] - max['y']);
    if (((!isNullOrUndefined(longitude) && longitude !== 0) && (!isNullOrUndefined(latitude) && latitude !== 0)) || checkZoomMethod) {
        var topPosition = ((mapHeight + Math.abs(mapObject.mapAreaRect.height - mapHeight)) / 2) / factor;
        var leftPosition = ((mapWidth + Math.abs(mapObject.mapAreaRect.width - mapWidth)) / 2) / factor;
        var point = checkZoomMethod ? calculateCenterFromPixel(mapObject, layer) :
            convertGeoToPoint(latitude, longitude, mapObject.mapLayerPanel.calculateFactor(layer), layer, mapObject);
        if ((!isNullOrUndefined(mapObject.zoomTranslatePoint) || !isNullOrUndefined(mapObject.previousProjection)) &&
            !mapObject.zoomNotApplied) {
            if (mapObject.previousProjection !== mapObject.projectionType) {
                x = -point.x + leftPosition;
                y = -point.y + topPosition;
            }
            else {
                if (mapObject.isZoomByPosition) {
                    mapObject.zoomTranslatePoint.x = -point.x + leftPosition;
                    mapObject.zoomTranslatePoint.y = -point.y + topPosition;
                }
                x = mapObject.zoomTranslatePoint.x;
                y = mapObject.zoomTranslatePoint.y;
                zoomFactorValue = zoomFactor;
            }
        }
        else {
            x = -point.x + leftPosition + mapObject.mapAreaRect.x / zoomFactor;
            y = -point.y + topPosition + mapObject.mapAreaRect.y / zoomFactor;
        }
        if (!isNullOrUndefined(mapObject.translatePoint)) {
            y = (mapObject.enablePersistence && mapObject.translatePoint.y !== 0 && !mapObject.zoomNotApplied) ?
                mapObject.translatePoint.y : y;
            x = (mapObject.enablePersistence && mapObject.translatePoint.x !== 0 && !mapObject.zoomNotApplied) ?
                mapObject.translatePoint.x : x;
        }
        scaleFactor = zoomFactorValue !== 0 ? zoomFactorValue : 1;
    }
    else {
        var zoomFact = mapObject.zoomSettings.zoomFactor === 0 ? 1 : mapObject.zoomSettings.zoomFactor;
        var maxZoomFact = mapObject.zoomSettings.maxZoom;
        zoomFact = zoomFact > maxZoomFact ? maxZoomFact : zoomFact;
        scaleFactor = zoomFact;
        var mapScale = mapObject.mapScaleValue === 0 ? 1 : mapObject.mapScaleValue > maxZoomFact
            ? maxZoomFact : mapObject.mapScaleValue;
        var leftPosition = (size.x + ((-(min['x'])) + ((size.width / 2) - (mapWidth / 2))));
        var topPosition = (size.y + ((-(min['y'])) + ((size.height / 2) - (mapHeight / 2))));
        if (!isNullOrUndefined(mapObject.zoomTranslatePoint) || !isNullOrUndefined(mapObject.previousProjection)) {
            if (mapObject.previousProjection !== mapObject.projectionType) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var previousPositions = [];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var previousPoints = { x: leftPosition, y: topPosition };
                previousPositions.push(previousPoints);
                for (var i = 1; i < maxZoomFact; i++) {
                    var translatePointX = previousPositions[i - 1]['x'] - (((size.width / (i)) - (size.width / (i + 1))) / 2);
                    var translatePointY = previousPositions[i - 1]['y'] - (((size.height / (i)) - (size.height / (i + 1))) / 2);
                    previousPoints = { x: translatePointX, y: translatePointY };
                    previousPositions.push(previousPoints);
                }
                leftPosition = previousPositions[zoomFact - 1]['x'];
                topPosition = previousPositions[zoomFact - 1]['y'];
            }
            else {
                leftPosition = mapObject.zoomTranslatePoint.x;
                topPosition = mapObject.zoomTranslatePoint.y;
                if (zoomFact !== mapScale) {
                    scaleFactor = mapScale;
                }
            }
        }
        if (!isNullOrUndefined(mapObject.translatePoint)) {
            x = (mapObject.enablePersistence && mapObject.translatePoint.x !== 0 && !mapObject.zoomNotApplied) ?
                mapObject.translatePoint.x : leftPosition;
            y = (mapObject.enablePersistence && mapObject.translatePoint.y !== 0 && !mapObject.zoomNotApplied) ?
                mapObject.translatePoint.y : topPosition;
        }
    }
    scaleFactor = (mapObject.enablePersistence) ? (mapObject.mapScaleValue === 0 ? 1 : mapObject.mapScaleValue) : scaleFactor;
    mapObject.widthBeforeRefresh = mapObject.availableSize.width;
    mapObject.heightBeforeRefresh = mapObject.availableSize.height;
    return { scale: animate ? 1 : scaleFactor, location: new Point(x, y) };
}
/**
 * To get the html element by specified id
 *
 * @param {Maps} map - Specifies the instance of the maps
 * @returns {void}
 * @private
 */
function fixInitialScaleForTile(map) {
    map.tileZoomScale = map.tileZoomLevel = Math.floor(map.availableSize.height / 512) + 1;
    var padding = map.layers[map.baseLayerIndex].layerType !== 'GoogleStaticMap' ?
        20 : 0;
    var totalSize = Math.pow(2, map.tileZoomLevel) * 256;
    map.tileTranslatePoint.x = (map.availableSize.width / 2) - (totalSize / 2);
    map.tileTranslatePoint.y = (map.availableSize.height / 2) - (totalSize / 2) + padding;
    map.previousTileWidth = map.availableSize.width;
    map.previousTileHeight = map.availableSize.height;
}
/**
 * To get the html element by specified id
 *
 * @param {string} id - Specifies the id
 * @returns {Element} - Returns the element
 * @private
 */
function getElementByID(id) {
    return document.getElementById(id);
}
/**
 * Function to get clientElement from id.
 *
 * @param {string} id - Specifies the id
 * @returns {Element} - Returns the element
 * @private
 */
function getClientElement(id) {
    var element = document.getElementById(id);
    if (!isNullOrUndefined(element)) {
        return element.getClientRects()[0];
    }
    else {
        return null;
    }
}
/**
 * To apply internalization
 *
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {number} value - Specifies the value
 * @returns {string} - Returns the string
 * @private
 */
function Internalize(maps, value) {
    maps.formatFunction =
        maps.intl.getNumberFormat({ format: maps.format, useGrouping: maps.useGroupingSeparator });
    return maps.formatFunction(value);
}
/**
 * Function to compile the template function for maps.
 *
 * @param {string} template - Specifies the template
 * @param {Maps} maps - Specifies the Maps instance.
 * @returns {Function} - Returns the function
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getTemplateFunction(template, maps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var templateFn = null;
    try {
        if (typeof template !== 'function' && document.querySelectorAll(template).length) {
            templateFn = compile(document.querySelector(template).innerHTML.trim());
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        else if (maps.isVue || maps.isVue3) {
            templateFn = compile(template);
        }
        else if (typeof template === 'function') {
            templateFn = compile(template);
        }
    }
    catch (e) {
        templateFn = compile(template);
    }
    return templateFn;
}
/**
 * Function to get element from id.
 *
 * @param {string} id - Specifies the id
 * @returns {Element} - Returns the element
 * @private
 */
function getElement(id) {
    return document.getElementById(id);
}
/**
 * Function to get shape data using target id
 *
 * @param {string} targetId - Specifies the target id
 * @param {Maps} map - Specifies the instance of the maps
 * @returns {any} - Returns the object
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getShapeData(targetId, map) {
    var layerIndex = parseInt(targetId.split('_LayerIndex_')[1].split('_')[0], 10);
    var shapeIndex = parseInt(targetId.split('_shapeIndex_')[1].split('_')[0], 10);
    var layer = map.layersCollection[layerIndex];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var shapeData = layer.layerData[shapeIndex]['property'];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var data;
    if (layer.dataSource) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data = layer.dataSource[checkShapeDataFields(layer.dataSource, shapeData, layer.shapeDataPath, layer.shapePropertyPath, layer)];
    }
    return { shapeData: shapeData, data: data };
}
/**
 * Function to trigger shapeSelected event
 *
 * @param {string} targetId - Specifies the target id
 * @param {SelectionSettingsModel} selection - Specifies the selection
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {string} eventName - Specifies the event name
 * @returns {IShapeSelectedEventArgs} - Returns the event args
 * @private
 */
function triggerShapeEvent(targetId, selection, maps, eventName) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var shape = getShapeData(targetId, maps);
    var border = {
        color: selection.border.color, opacity: selection.border.opacity,
        width: selection.border.width
    };
    var eventArgs = (selection.enableMultiSelect) ? {
        cancel: false,
        name: eventName,
        fill: selection.fill,
        opacity: selection.opacity,
        border: border,
        shapeData: shape.shapeData,
        data: shape.data,
        target: targetId,
        maps: maps,
        shapeDataCollection: maps.shapeSelectionItem
    } : {
        cancel: false,
        name: eventName,
        fill: selection.fill,
        opacity: selection.opacity,
        border: border,
        shapeData: shape.shapeData,
        data: shape.data,
        target: targetId,
        maps: maps
    };
    maps.trigger(eventName, eventArgs, function () {
        eventArgs.border.opacity = isNullOrUndefined(eventArgs.border.opacity) ? eventArgs.opacity : eventArgs.border.opacity;
    });
    return eventArgs;
}
/**
 * Function to get elements using class name
 *
 * @param {string} className - Specifies the class name
 * @returns {HTMLCollectionOf<Element>} - Returns the collection
 * @private
 */
function getElementsByClassName(className) {
    return document.getElementsByClassName(className);
}
/**
 * Function to get elements using querySelectorAll
 */
// export function querySelectorAll(args: string, element: Element): ArrayOf<Element> {
//     return element.querySelectorAll('.' + args);
// }
/**
 * Function to get elements using querySelector
 *
 * @param {string} args - Specifies the args
 * @param {string} elementSelector - Specifies the element selector
 * @returns {Element} - Returns the element
 * @private
 */
function querySelector(args, elementSelector) {
    var targetEle = null;
    if (document.getElementById(elementSelector)) {
        targetEle = document.getElementById(elementSelector).querySelector('#' + args);
    }
    return targetEle;
}
/**
 * Function to get the element for selection and highlight using public method
 *
 * @param {number} layerIndex - Specifies the layer index
 * @param {string} name - Specifies the layer name
 * @param {boolean} enable - Specifies the boolean value
 * @param {Maps} map - Specifies the instance of the maps
 * @returns {Element} - Returns the element
 * @private
 */
function getTargetElement(layerIndex, name, enable, map) {
    var targetId;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var shapeData = map.layers[layerIndex].shapeData['features'];
    for (var i = 0; i < shapeData.length; i++) {
        if (shapeData[i]['properties'].name === name) {
            targetId = map.element.id + '_' + 'LayerIndex_' + layerIndex + '_shapeIndex_' + i + '_dataIndex_undefined';
            break;
        }
    }
    var targetEle = getElement(targetId);
    return targetEle;
}
/**
 * Function to create style element for highlight and selection
 *
 * @param {string} id - Specifies the id
 * @param {string} className - Specifies the class name
 * @param {IShapeSelectedEventArgs | any} eventArgs - Specifies the event args
 * @returns {Element} - Returns the element
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createStyle(id, className, eventArgs) {
    var styleEle = createElement('style', {
        id: id
    });
    styleEle.innerText = '.' + className + '{fill:'
        + eventArgs['fill'] + ';' + 'fill-opacity:' + (eventArgs['opacity']).toString() + ';' +
        'stroke-opacity:' + (eventArgs['border']['opacity']).toString() + ';' +
        'stroke-width:' + (eventArgs['border']['width']).toString() + ';' +
        'stroke:' + eventArgs['border']['color'] + ';' + '}';
    return styleEle;
}
/**
 * Function to customize the style for highlight and selection
 *
 * @param {string} id - Specifies the id
 * @param {string} className - Specifies the class name
 * @param {IShapeSelectedEventArgs | any} eventArgs - Specifies the event args
 * @returns {void}
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function customizeStyle(id, className, eventArgs) {
    var styleEle = getElement(id);
    if (!isNullOrUndefined(styleEle)) {
        styleEle.innerText = '.' + className + '{fill:'
            + eventArgs['fill'] + ';' + 'fill-opacity:' + (eventArgs['opacity']).toString() + ';' +
            'stroke-width:' + (eventArgs['border']['width']).toString() + ';' +
            'stroke-opacity:' + (eventArgs['border']['opacity']).toString() + ';' +
            'stroke:' + eventArgs['border']['color'] + '}';
    }
}
/**
 * Function to trigger itemSelection event for legend selection and public method
 *
 * @param {SelectionSettingsModel} selectionSettings - Specifies the selection settings
 * @param {Maps} map - Specifies the instance of the maps
 * @param {Element} targetElement - Specifies the target element
 * @param {any} shapeData - Specifies the shape data
 * @param {any} data - Specifies the data
 * @returns {void}
 * @private
 */
function triggerItemSelectionEvent(selectionSettings, map, targetElement, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
shapeData, data) {
    var border = {
        color: selectionSettings.border.color,
        width: selectionSettings.border.width / map.scale,
        opacity: selectionSettings.border.opacity
    };
    var eventArgs = {
        opacity: selectionSettings.opacity,
        fill: selectionSettings.fill,
        border: border,
        name: itemSelection,
        target: targetElement.id,
        cancel: false,
        shapeData: shapeData,
        data: data,
        maps: map
    };
    map.trigger('itemSelection', eventArgs, function (observedArgs) {
        eventArgs.border.opacity = isNullOrUndefined(selectionSettings.border.opacity) ? selectionSettings.opacity :
            selectionSettings.border.opacity;
        map.shapeSelectionItem.push(eventArgs.shapeData);
        if (!getElement('ShapeselectionMap')) {
            document.body.appendChild(createStyle('ShapeselectionMap', 'ShapeselectionMapStyle', eventArgs));
        }
        else {
            customizeStyle('ShapeselectionMap', 'ShapeselectionMapStyle', eventArgs);
        }
    });
}
/**
 * Function to remove class from element
 *
 * @param {Element} element - Specifies the element
 * @returns {void}
 * @private
 */
function removeClass(element) {
    element.removeAttribute('class');
}
/**
 * Animation Effect Calculation End
 *
 * @param {Element} element - Specifies the element
 * @param {number} delay - Specifies the delay
 * @param {number} duration - Specifies the duration
 * @param {MapLocation} point - Specifies the location
 * @param {Maps} maps - Specifies the instance of the maps
 * @param {string} ele - Specifies the element
 * @param {number} radius - Specifies the radius
 * @returns {void}
 * @private
 */
function elementAnimate(element, delay, duration, point, maps, ele, radius) {
    if (radius === void 0) { radius = 0; }
    var centerX = point.x;
    var centerY = point.y;
    var height = 0;
    var transform = element.getAttribute('transform') || '';
    new Animation({}).animate(element, {
        duration: duration,
        delay: delay,
        progress: function (args) {
            if (args.timeStamp > args.delay) {
                if (maps.isTileMap && height === 0) {
                    var layerGroupElement = document.querySelector('.GroupElement');
                    if (!isNullOrUndefined(layerGroupElement)) {
                        layerGroupElement.style.display = 'block';
                    }
                }
                height = ((args.timeStamp - args.delay) / args.duration);
                element.setAttribute('transform', 'translate( ' + (centerX - (radius * height)) + ' ' + (centerY - (radius * height)) +
                    ' ) scale(' + height + ')');
            }
        },
        end: function (model) {
            element.setAttribute('transform', transform);
            if (!ele) {
                return;
            }
            var event = {
                cancel: false, name: animationComplete, element: ele, maps: maps
            };
            maps.trigger(animationComplete, event);
        }
    });
}
/**
 * @param {string} id - Specifies the id
 * @returns {void}
 * @private
 */
function timeout(id) {
    removeElement(id);
}
/**
 * @param {string} text - Specifies the text
 * @param {string} size - Specifies the size
 * @param {number} x - Specifies the x value
 * @param {number} y - Specifies the y value
 * @param {number} areaWidth - Specifies the area width
 * @param {number} areaHeight - Specifies the area height
 * @param {string} id - Specifies the id
 * @param {Element} element - Specifies the element
 * @param {boolean} isTouch - Specifies the boolean value
 * @returns {void}
 * @private
 */
function showTooltip(text, size, x, y, areaWidth, areaHeight, id, element, isTouch) {
    var location = getMousePosition(x, y, element);
    if (!isNullOrUndefined(location)) {
        x = location.x;
        y = location.y;
    }
    var tooltip = document.getElementById(id);
    var width = measureText(text, {
        fontFamily: 'Segoe UI', size: '8px',
        fontStyle: 'Normal', fontWeight: 'Regular'
    }).width;
    var str = text.split(' ');
    var demo = str[0].length;
    for (var i = 1; i < str.length; i++) {
        if (demo < str[i].length) {
            demo = (str[i]).length;
        }
    }
    if (!tooltip) {
        tooltip = createElement('div', {
            id: id
        });
        tooltip.style.cssText = 'background-color: rgb(255, 255, 255) !important; color:black !important; ' +
            'position:absolute;border:1px solid rgb(0, 0, 0); padding-left:5px;' +
            'font-size:12px; font-family: "Segoe UI"; text-align:center';
    }
    if (x < (areaWidth - width)) {
        // eslint-disable-next-line no-self-assign
        x = x;
    }
    else if (x > (areaWidth - width) && x < areaWidth - (demo * 8)) {
        width = (areaWidth - x);
    }
    else if (x >= areaWidth - demo * 8) {
        if (x > width) {
            x = x - width;
        }
        else {
            width = x;
            x = 0;
        }
    }
    var size1 = size.split('px');
    wordWrap(tooltip, text, x, y, size1, width, areaWidth, element);
    var height = tooltip.clientHeight;
    if ((height + parseInt(size1[0], 10) * 2) > areaHeight) {
        width = x;
        x = 0;
    }
    wordWrap(tooltip, text, x, y, size1, width, areaWidth, element);
    if (isTouch) {
        setTimeout(timeout, 5000, id);
    }
}
/**
 * @param {HTMLElement} tooltip - Specifies the tooltip element
 * @param {string} text - Specifies the text
 * @param {number} x - Specifies the x value
 * @param {number} y - Specifies the y value
 * @param {string[]} size1 - Specifies the size
 * @param {number} width - Specifies the width
 * @param {number} areaWidth - Specifies the area width
 * @param {Element} element - Specifies the element
 * @returns {void}
 * @private
 */
function wordWrap(tooltip, text, x, y, size1, width, areaWidth, element) {
    tooltip.innerText = text;
    tooltip.style.top = tooltip.id.indexOf('_Legend') !== -1 ?
        (parseInt(size1[0], 10) + y).toString() + 'px' : (parseInt(size1[0], 10) * 2).toString() + 'px';
    tooltip.style.left = (x).toString() + 'px';
    tooltip.style.width = width.toString() + 'px';
    tooltip.style.maxWidth = (areaWidth).toString() + 'px';
    tooltip.style.wordWrap = 'break-word';
    element.appendChild(tooltip);
}
// /**
//  *
//  * @param touchList
//  * @param e
//  * @param touches
//  */
// export function addTouchPointer(touchList: ITouches[], e: PointerEvent, touches: TouchList): ITouches[] {
//     if (touches) {
//         touchList = [];
//         for (let i: number = 0, length: number = touches.length; i < length; i++) {
//             touchList.push({ pageX: touches[i as number].clientX, pageY: touches[i as number].clientY, pointerId: null });
//         }
//     } else {
//         touchList = touchList ? touchList : [];
//         if (touchList.length === 0) {
//             touchList.push({ pageX: e.clientX, pageY: e.clientY, pointerId: e.pointerId });
//         } else {
//             for (let i: number = 0, length: number = touchList.length; i < length; i++) {
//                 if (touchList[i as number].pointerId === e.pointerId) {
//                     touchList[i as number] = { pageX: e.clientX, pageY: e.clientY, pointerId: e.pointerId };
//                 } else {
//                     touchList.push({ pageX: e.clientX, pageY: e.clientY, pointerId: e.pointerId });
//                 }
//             }
//         }
//     }
//     return touchList;
// }
/**
 * @param {string} id - Specifies the id
 * @param {string} text - Specifies the text
 * @param {string} top - Specifies the top
 * @param {string} left - Specifies the left
 * @param {ZoomToolbarTooltipSettingsModel} settings - Specifies the tooltip settings.
 * @returns {void}
 * @private
 */
function createTooltip(id, text, top, left, settings) {
    var tooltip = getElement(id);
    var borderColor = getHexColor(settings.borderColor);
    var fontColor = getHexColor(settings.fontColor);
    var style = 'top:' + top.toString() + 'px;' +
        'left:' + left.toString() + 'px;' +
        'color:' + (fontColor ? 'rgba(' + fontColor.r + ',' + fontColor.g + ',' + fontColor.b + ',' + settings.fontOpacity + ')'
        : settings.fontColor) + ';' +
        'background:' + settings.fill + ';' +
        'z-index: 2;' +
        'position:absolute;border:' + settings.borderWidth + 'px solid ' +
        (borderColor ? 'rgba(' + borderColor.r + ',' + borderColor.g + ',' + borderColor.b + ',' + settings.borderOpacity + ')'
            : settings.borderColor) + ';font-family:' + settings.fontFamily +
        ';font-style:' + settings.fontStyle + ';font-weight:' + settings.fontWeight +
        ';font-size:' + settings.fontSize + ';border-radius:' + settings.borderWidth + 'px;';
    if (!tooltip && settings.visible) {
        tooltip = createElement('div', {
            id: id
        });
        tooltip.innerHTML = SanitizeHtmlHelper.sanitize('&nbsp;' + text + '&nbsp;');
        tooltip.style.cssText = style;
        document.body.appendChild(tooltip);
    }
    else if (settings.visible) {
        tooltip.innerHTML = SanitizeHtmlHelper.sanitize('&nbsp;' + text + '&nbsp;');
        tooltip.style.cssText = style;
    }
}
/**
 * @private
 */
function getHexColor(color) {
    if (color.indexOf('#') !== -1 && color.toLowerCase().indexOf('rgb') === -1) {
        var colorArray = (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i).exec(color);
        return colorArray ? { r: parseInt(colorArray[1], 16), g: parseInt(colorArray[2], 16), b: parseInt(colorArray[3], 16) } : null;
    }
    else if (color.toLowerCase().indexOf('rgb') !== -1) {
        var colorArray = color.match(/\d+/g).map(function (a) { return parseInt(a, 10); });
        return colorArray ? { r: colorArray[0], g: colorArray[1], b: colorArray[2] } : null;
    }
    else {
        var divElment = document.createElement('div');
        divElment.style.color = color;
        // eslint-disable-next-line @typescript-eslint/tslint/config
        var colorArray = window.getComputedStyle(document.body.appendChild(divElment)).color.match(/\d+/g).map(function (a) { return parseInt(a, 10); });
        document.body.removeChild(divElment);
        return colorArray ? { r: colorArray[0], g: colorArray[1], b: colorArray[2] } : null;
    }
}
/**
 * @param {Point} location - Specifies the location
 * @param {string} shape - Specifies the shape
 * @param {Size} size - Specifies the size
 * @param {string} url - Specifies the url
 * @param {PathOption} options - Specifies the options
 * @returns {Element} - Returns the element
 * @private
 */
function drawSymbol(location, shape, size, url, options) {
    var renderer = new SvgRenderer('');
    var temp = renderLegendShape(location, size, shape, options, url);
    var htmlObject = renderer['draw' + temp.functionName](temp.renderOption);
    return htmlObject;
}
/**
 * @param {MapLocation} location - Specifies the location
 * @param {Size} size - Specifies the size
 * @param {string} shape - Specifies the shape
 * @param {PathOption} options - Specifies the path options
 * @param {string} url - Specifies the url
 * @returns {IShapes} - Returns the shapes
 * @private
 */
function renderLegendShape(location, size, shape, options, url) {
    var renderPath;
    var functionName = 'Path';
    var shapeWidth = size.width;
    var shapeHeight = size.height;
    var shapeX = location.x;
    var shapeY = location.y;
    var x = location.x + (-shapeWidth / 2);
    var y = location.y + (-shapeHeight / 2);
    options['stroke'] = (shape === 'HorizontalLine' || shape === 'VerticalLine' || shape === 'Cross') ? options['fill'] : options['stroke'];
    options['stroke-width'] = (options['stroke-width'] === 0 && (shape === 'HorizontalLine' || shape === 'VerticalLine' || shape === 'Cross')) ? 1 : options['stroke-width'];
    switch (shape) {
        case 'Circle':
        case 'Bubble':
            functionName = 'Ellipse';
            merge(options, { 'rx': shapeWidth / 2, 'ry': shapeHeight / 2, 'cx': shapeX, 'cy': shapeY });
            break;
        case 'VerticalLine':
            renderPath = 'M' + ' ' + shapeX + ' ' + (shapeY + (shapeHeight / 2)) + ' ' + 'L' + ' ' + shapeX + ' '
                + (shapeY + (-shapeHeight / 2));
            merge(options, { 'd': renderPath });
            break;
        case 'HorizontalLine':
            renderPath = 'M' + ' ' + shapeX + ' ' + shapeY + ' ' + 'L' + ' ' + (shapeX + (shapeWidth / 2)) + ' '
                + shapeY;
            merge(options, { 'd': renderPath });
            break;
        case 'Diamond':
            renderPath = 'M' + ' ' + x + ' ' + shapeY + ' ' +
                'L' + ' ' + shapeX + ' ' + (shapeY + (-shapeHeight / 2)) + ' ' +
                'L' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + shapeY + ' ' +
                'L' + ' ' + shapeX + ' ' + (shapeY + (shapeHeight / 2)) + ' ' +
                'L' + ' ' + x + ' ' + shapeY + ' z';
            merge(options, { 'd': renderPath });
            break;
        case 'Rectangle':
            renderPath = 'M' + ' ' + x + ' ' + (shapeY + (-shapeHeight / 2)) + ' ' +
                'L' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + (shapeY + (-shapeHeight / 2)) + ' ' +
                'L' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + (shapeY + (shapeHeight / 2)) + ' ' +
                'L' + ' ' + x + ' ' + (shapeY + (shapeHeight / 2)) + ' ' +
                'L' + ' ' + x + ' ' + (shapeY + (-shapeHeight / 2)) + ' z';
            merge(options, { 'd': renderPath });
            break;
        case 'Triangle':
            renderPath = 'M' + ' ' + x + ' ' + (shapeY + (shapeHeight / 2)) + ' ' +
                'L' + ' ' + shapeX + ' ' + (shapeY + (-shapeHeight / 2)) + ' ' +
                'L' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + (shapeY + (shapeHeight / 2)) + ' ' +
                'L' + ' ' + x + ' ' + (shapeY + (shapeHeight / 2)) + ' z';
            merge(options, { 'd': renderPath });
            break;
        case 'InvertedTriangle':
            renderPath = 'M' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + (shapeY - (shapeHeight / 2)) + ' ' +
                'L' + ' ' + shapeX + ' ' + (shapeY + (shapeHeight / 2)) + ' ' +
                'L' + ' ' + (shapeX - (shapeWidth / 2)) + ' ' + (shapeY - (shapeHeight / 2)) + ' ' +
                'L' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + (shapeY - (shapeHeight / 2)) + ' z';
            merge(options, { 'd': renderPath });
            break;
        case 'Pentagon':
            // eslint-disable-next-line no-case-declarations
            var eq = 72;
            var xValue = void 0;
            var yValue = void 0;
            for (var i = 0; i <= 5; i++) {
                xValue = (shapeWidth / 2) * Math.cos((Math.PI / 180) * (i * eq));
                yValue = (shapeWidth / 2) * Math.sin((Math.PI / 180) * (i * eq));
                if (i === 0) {
                    renderPath = 'M' + ' ' + (shapeX + xValue) + ' ' + (shapeY + yValue) + ' ';
                }
                else {
                    renderPath = renderPath.concat('L' + ' ' + (shapeX + xValue) + ' ' + (shapeY + yValue) + ' ');
                }
            }
            renderPath = renderPath.concat('Z');
            merge(options, { 'd': renderPath });
            break;
        case 'Star':
            renderPath = 'M ' + (location.x + size.width / 3) + ' ' + (location.y - size.height / 2) + ' L ' + (location.x - size.width / 2)
                + ' ' + (location.y + size.height / 6) + ' L ' + (location.x + size.width / 2) + ' ' + (location.y + size.height / 6)
                + ' L ' + (location.x - size.width / 3) + ' ' + (location.y - size.height / 2) + ' L ' + location.x + ' ' +
                (location.y + size.height / 2) + ' L ' + (location.x + size.width / 3) + ' ' + (location.y - size.height / 2) + ' Z';
            merge(options, { 'd': renderPath });
            break;
        case 'Cross':
            renderPath = 'M' + ' ' + x + ' ' + shapeY + ' ' + 'L' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + shapeY + ' ' +
                'M' + ' ' + shapeX + ' ' + (shapeY + (shapeHeight / 2)) + ' ' + 'L' + ' ' + shapeX + ' ' +
                (shapeY + (-shapeHeight / 2));
            merge(options, { 'd': renderPath });
            break;
        case 'Image':
            functionName = 'Image';
            merge(options, { 'href': url, 'height': shapeHeight, 'width': shapeWidth, x: x, y: y });
            break;
    }
    return { renderOption: options, functionName: functionName };
}
/**
 * Animation Effect Calculation End
 *
 * @private
 */
// export function markerTemplateAnimate(element: Element, delay: number, duration: number, point: MapLocation): void {
//     let delta: number = 0;
//     let top: string = (element as HTMLElement).style.top;
//     let y: number = parseInt(top, 10);
//     new Animation({}).animate(<HTMLElement>element, {
//         duration: duration,
//         delay: delay,
//         progress: (args: AnimationOptions): void => {
//             if (args.timeStamp > args.delay) {
//                 delta = ((args.timeStamp - args.delay) / args.duration);
//                 (element as HTMLElement).style.top = y - 100 + (delta * 100) + 'px';
//             }
//         },
//         end: (model: AnimationOptions) => {
//             (element as HTMLElement).style.top = top;
//         }
//     });
// }
/**
 * @param {HTMLElement} childElement - Specifies the child element
 * @param {HTMLElement} parentElement - Specifies the parent element
 * @returns {Size} - Returns the size
 * @private
 */
function getElementOffset(childElement, parentElement) {
    parentElement.appendChild(childElement);
    var width = childElement.offsetWidth;
    var height = childElement.offsetHeight;
    parentElement.removeChild(childElement);
    return new Size(width, height);
}
/**
 * @param {Element} element - Specifies the element
 * @param {number} index - Specifies the element
 * @param {number} scale - Specifies the scale
 * @param {Maps} maps - Specifies the instance of the maps
 * @returns {void}
 * @private
 */
function changeBorderWidth(element, index, scale, maps) {
    var childNode;
    for (var l = 0; l < element.childElementCount; l++) {
        childNode = element.childNodes[l];
        if (childNode.id.indexOf('_NavigationGroup') > -1) {
            changeNavaigationLineWidth(childNode, index, scale, maps);
        }
        else {
            var currentStroke = void 0;
            var value = 0;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var borderWidthValue = maps.layersCollection[index].shapeSettings.borderWidthValuePath;
            var borderWidth = maps.layersCollection[index].shapeSettings.border.width;
            var circleRadius = maps.layersCollection[index].shapeSettings.circleRadius;
            if (maps.layersCollection[index].shapeSettings.borderWidthValuePath) {
                value = checkShapeDataFields(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                maps.layersCollection[index].dataSource, maps.layersCollection[index].layerData[l]['property'], maps.layersCollection[index].shapeDataPath, maps.layersCollection[index].shapePropertyPath, maps.layersCollection[index]);
                if (value !== null) {
                    if (maps.layersCollection[index].dataSource[value][borderWidthValue]) {
                        currentStroke = maps.layersCollection[index].dataSource[value][borderWidthValue];
                    }
                    else {
                        currentStroke = (isNullOrUndefined(borderWidth) ? 0 : borderWidth);
                    }
                }
                else {
                    currentStroke = (isNullOrUndefined(borderWidth) ? 0 : borderWidth);
                }
            }
            else {
                currentStroke = (isNullOrUndefined(borderWidth) ? 0 : borderWidth);
            }
            childNode.setAttribute('stroke-width', (currentStroke / scale).toString());
            if (element.id.indexOf('_Point') > -1 || element.id.indexOf('_MultiPoint') > -1) {
                childNode.setAttribute('r', (circleRadius / scale).toString());
            }
        }
    }
}
/**
 * @param {Element} element - Specifies the element
 * @param {number} index - Specifies the element
 * @param {number} scale - Specifies the scale
 * @param {Maps} maps - Specifies the instance of the maps
 * @returns {void}
 * @private
 */
function changeNavaigationLineWidth(element, index, scale, maps) {
    var node;
    for (var m = 0; m < element.childElementCount; m++) {
        node = element.childNodes[m];
        if (node.tagName === 'path') {
            var currentStroke = (maps.layersCollection[index]
                .navigationLineSettings[parseFloat(node.id.split('_NavigationIndex_')[1].split('_')[0])].width);
            node.setAttribute('stroke-width', (currentStroke / scale).toString());
        }
    }
}
// /** Pinch zoom helper methods */
/**
 * @param {PointerEvent | TouchEvent} event - Specifies the pointer or touch event
 * @returns {ITouches[]} - Returns the target
 * @private */
function targetTouches(event) {
    var targetTouches = [];
    var touches = event.touches;
    for (var i = 0; i < touches.length; i++) {
        targetTouches.push({ pageX: touches[i].pageX, pageY: touches[i].pageY });
    }
    return targetTouches;
}
/**
 * @param {ITouches[]} startTouches - Specifies the start touches
 * @param {ITouches[]} endTouches - Specifies the end touches
 * @returns {number} - Returns the number
 * @private
 */
function calculateScale(startTouches, endTouches) {
    var startDistance = getDistance(startTouches[0], startTouches[1]);
    var endDistance = getDistance(endTouches[0], endTouches[1]);
    return (endDistance / startDistance);
}
/**
 * @param {ITouches} a - Specifies the a value
 * @param {ITouches} b - Specifies the b value
 * @returns {number} - Returns the number
 * @private */
function getDistance(a, b) {
    var x = a.pageX - b.pageX;
    var y = a.pageY - b.pageY;
    return Math.sqrt(x * x + y * y);
}
/**
 * @param {ITouches[]} touches - Specifies the touches
 * @param {Maps} maps - Specifies the instance of the maps
 * @returns {any[]} - Returns the object
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getTouches(touches, maps) {
    var rect = maps.element.getBoundingClientRect();
    var posTop = rect.top + document.defaultView.pageXOffset;
    var posLeft = rect.left + document.defaultView.pageYOffset;
    return Array.prototype.slice.call(touches).map(function (touch) {
        return {
            x: touch.pageX - posLeft,
            y: touch.pageY - posTop
        };
    });
}
/**
 * @param {any[]} touches - Specifies the touches
 * @returns {Point} - Returns the point
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getTouchCenter(touches) {
    return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        x: touches.map(function (e) { return e['x']; }).reduce(sum) / touches.length,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        y: touches.map(function (e) { return e['y']; }).reduce(sum) / touches.length
    };
}
/**
 * @param {number} a - Specifies a value
 * @param {number} b - Specifies b value
 * @returns {number} - Returns the sum of a and b
 * @private
 */
function sum(a, b) {
    return a + b;
}
/**
 * Animation Effect Calculation End
 *
 * @param {Element} element - Specifies the element.
 * @param {number} delay - Specifies the delay.
 * @param {number} duration - Specifies the duration.
 * @param {MapLocation} point - Specifies the location.
 * @param {number} scale - Specifies the scale value.
 * @param {Size} size - Specifies the size.
 * @param {Maps} maps - Specifies the maps.
 * @returns {void}
 * @private
 */
function zoomAnimate(element, delay, duration, point, scale, size, maps) {
    var delta = 0;
    var previousLocation = maps.previousPoint;
    var preScale = maps.previousScale;
    var diffScale = scale - preScale;
    var currentLocation = new MapLocation(0, 0);
    var currentScale = 1;
    if (scale === preScale) {
        element.setAttribute('transform', 'scale( ' + (scale) + ' ) translate( ' + point.x + ' ' + point.y + ' )');
        return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var slope = function (previousLocation, point) {
        if (previousLocation.x === point.x) {
            return null;
        }
        return (point.y - previousLocation.y) / (point.x - previousLocation.x);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var intercept = function (point, slopeValue) {
        if (slopeValue === null) {
            return point.x;
        }
        return point.y - slopeValue * point.x;
    };
    var slopeFactor = slope(previousLocation, point);
    var slopeIntersection = intercept(previousLocation, slopeFactor);
    var horizontalDifference = point.x - previousLocation.x;
    var verticalDifference = point.y - previousLocation.y;
    animate(element, delay, duration, function (args) {
        if (args.timeStamp > args.delay) {
            delta = ((args.timeStamp - args.delay) / args.duration);
            currentScale = preScale + (delta * diffScale);
            currentLocation.x = previousLocation.x + (delta * horizontalDifference) / (currentScale / scale);
            if (slopeFactor == null) {
                currentLocation.y = previousLocation.y + (delta * verticalDifference);
            }
            else {
                currentLocation.y = ((slopeFactor * currentLocation.x) + slopeIntersection);
            }
            args.element.setAttribute('transform', 'scale( ' + currentScale + ' ) ' +
                'translate( ' + currentLocation.x + ' ' + currentLocation.y + ' )');
            maps.translatePoint = currentLocation;
            maps.scale = currentScale;
            maps.zoomModule.processTemplate(point.x, point.y, currentScale, maps);
        }
    }, function () {
        maps.translatePoint = point;
        maps.scale = scale;
        element.setAttribute('transform', 'scale( ' + (scale) + ' ) translate( ' + point.x + ' ' + point.y + ' )');
        maps.zoomModule.processTemplate(point.x, point.y, scale, maps);
    });
}
/**
 * To process custom animation
 *
 * @param {Element} element - Specifies the element
 * @param {number} delay - Specifies the delay
 * @param {number} duration - Specifies the duration
 * @param {Function} process - Specifies the process
 * @param {Function} end - Specifies the end
 * @returns {void}
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function animate(element, delay, duration, process, end) {
    var _this = this;
    var start = null;
    // eslint-disable-next-line prefer-const
    var clearAnimation;
    var markerStyle = 'visibility:visible';
    var startAnimation = function (timestamp) {
        if (!start) {
            start = timestamp;
        }
        var progress = timestamp - start;
        if (progress < duration) {
            process.call(_this, { element: element, delay: 0, timeStamp: progress, duration: duration });
            window.requestAnimationFrame(startAnimation);
        }
        else {
            window.cancelAnimationFrame(clearAnimation);
            end.call(_this, { element: element });
            if (element.id.indexOf('Marker') > -1) {
                var markerElement = getElementByID(element.id.split('_Layer')[0] + '_Markers_Group');
                markerElement.style.cssText = markerStyle;
            }
        }
    };
    clearAnimation = window.requestAnimationFrame(startAnimation);
}
/**
 * Defines the options to get shape data file using Ajax request.
 */
var MapAjax = /** @__PURE__ @class */ (function () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function MapAjax(options, type, async, contentType, sendData) {
        this.dataOptions = options;
        this.type = type || 'GET';
        this.async = async || true;
        this.contentType = contentType;
        this.sendData = sendData;
    }
    return MapAjax;
}());
/**
 * Animation Translate
 *
 * @param {Element} element - Specifies the element
 * @param {number} delay - Specifies the delay
 * @param {number} duration - Specifies the duration
 * @param {MapLocation} point - Specifies the location
 * @returns {void}
 * @private
 */
function smoothTranslate(element, delay, duration, point) {
    var delta = 0;
    var transform = element.getAttribute('transform').split(' ');
    if (transform.length === 2) {
        transform[2] = transform[1].split(')')[0];
        transform[1] = transform[0].split('(')[1];
    }
    var previousLocation = new MapLocation(parseInt(transform[1], 10), parseInt(transform[2], 10));
    var diffx = point.x - previousLocation.x;
    var diffy = point.y - previousLocation.y;
    var currentLocation = new MapLocation(0, 0);
    animate(element, delay, duration, function (args) {
        if (args.timeStamp > args.delay) {
            delta = ((args.timeStamp - args.delay) / args.duration);
            currentLocation.x = previousLocation.x + (delta * diffx);
            currentLocation.y = previousLocation.y + (delta * diffy);
            args.element.setAttribute('transform', 'translate( ' + currentLocation.x + ' ' + currentLocation.y + ' )');
        }
    }, function () {
        element.setAttribute('transform', 'translate( ' + point.x + ' ' + point.y + ' )');
    });
}
/**
 * To find compare should zoom factor with previous factor and current factor
 *
 * @param {number} scaleFactor - Specifies the scale factor
 * @param {Maps} maps - Specifies the instance of the maps
 * @returns {void}
 * @private
 */
function compareZoomFactor(scaleFactor, maps) {
    var previous = isNullOrUndefined(maps.shouldZoomPreviousFactor) ?
        null : maps.shouldZoomPreviousFactor;
    var current = isNullOrUndefined(maps.shouldZoomCurrentFactor) ?
        null : maps.shouldZoomCurrentFactor;
    if (!isNullOrUndefined(current)) {
        maps.shouldZoomCurrentFactor = null;
        maps.shouldZoomPreviousFactor = null;
    }
    else if (!isNullOrUndefined(previous)
        && isNullOrUndefined(current)
        && maps.shouldZoomPreviousFactor !== scaleFactor) {
        maps.shouldZoomCurrentFactor = scaleFactor;
    }
    else {
        maps.shouldZoomPreviousFactor = scaleFactor;
    }
}
/**
 * To find zoom level for the min and max latitude values
 *
 * @param {number} minLat - Specifies the minimum latitude
 * @param {number} maxLat - Specifies the maximum latitude
 * @param {number} minLong - Specifies the minimum longitude
 * @param {number} maxLong - Specifies the maximum longitude
 * @param {number} mapWidth - Specifies the width of the maps
 * @param {number} mapHeight - Specifies the height of the maps
 * @param {Maps} maps - Specifies the instance of the maps
 * @returns {number} - Returns the scale factor
 * @private
 */
function calculateZoomLevel(minLat, maxLat, minLong, maxLong, mapWidth, mapHeight, maps, isZoomToCoordinates) {
    var scaleFactor;
    var maxZoomFact = maps.zoomSettings.maxZoom;
    var applyMethodeZoom;
    var maxLatSin = Math.sin(maxLat * Math.PI / 180);
    var maxLatRad = Math.log((1 + maxLatSin) / (1 - maxLatSin)) / 2;
    var maxLatValue = Math.max(Math.min(maxLatRad, Math.PI), -Math.PI) / 2;
    var minLatSin = Math.sin(minLat * Math.PI / 180);
    var minLatRad = Math.log((1 + minLatSin) / (1 - minLatSin)) / 2;
    var minLatValue = Math.max(Math.min(minLatRad, Math.PI), -Math.PI) / 2;
    if (maps.zoomNotApplied && !maps.isTileMap) {
        var latiRatio = Math.abs((maps.baseMapBounds.latitude.max - maps.baseMapBounds.latitude.min) / (maxLat - minLat));
        var longiRatio = Math.abs((maps.baseMapBounds.longitude.max - maps.baseMapBounds.longitude.min) / (maxLong - minLong));
        applyMethodeZoom = isZoomToCoordinates ? (latiRatio + longiRatio) / 2 : Math.min(latiRatio, longiRatio);
    }
    var latRatio = (maxLatValue - minLatValue) / Math.PI;
    var lngDiff = maxLong - minLong;
    var lngRatio = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;
    var WORLD_PX_HEIGHT = 256;
    var WORLD_PX_WIDTH = 256;
    var latZoom = (Math.log(mapHeight / WORLD_PX_HEIGHT / latRatio) / Math.LN2);
    var lngZoom = (Math.log(mapWidth / WORLD_PX_WIDTH / lngRatio) / Math.LN2);
    var result = (maps.zoomNotApplied && !maps.isTileMap) ? applyMethodeZoom :
        isZoomToCoordinates && !maps.isTileMap ? (latZoom + lngZoom) / 2 : Math.min(latZoom, lngZoom);
    scaleFactor = Math.min(result, maxZoomFact);
    scaleFactor = maps.isTileMap || !maps.zoomNotApplied ? Math.floor(scaleFactor) : scaleFactor;
    if (!maps.isTileMap) {
        compareZoomFactor(scaleFactor, maps);
    }
    return scaleFactor;
}
/**
 * Method to get the result
 *
 * @param {any} e - Specifies the any type value
 * @returns {any} - Returns the data value
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function processResult(e) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var dataValue;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var resultValue = !isNullOrUndefined(e['result']) ? e['result'] : e['actual'];
    if (isNullOrUndefined(resultValue.length)) {
        if (!isNullOrUndefined(resultValue['Items'])) {
            dataValue = resultValue['Items'];
        }
    }
    else {
        dataValue = resultValue;
    }
    return dataValue;
}

/**
 * Specifies Maps Themes
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
var Theme;
(function (Theme) {
    /** @private */
    Theme.mapsTitleFont = {
        size: '14px',
        fontWeight: null,
        color: '#424242',
        fontStyle: 'Medium',
        fontFamily: 'Roboto, Noto, Sans-serif'
    };
    /** @private */
    Theme.mapsSubTitleFont = {
        size: '13px',
        fontWeight: null,
        color: '#424242',
        fontStyle: 'Medium',
        fontFamily: 'Roboto, Noto, Sans-serif'
    };
    /** @private */
    Theme.tooltipLabelFont = {
        size: '12px',
        fontWeight: 'Regular',
        color: null,
        fontStyle: 'Regular',
        fontFamily: null
    };
    /** @private */
    Theme.legendTitleFont = {
        size: '12px',
        fontWeight: 'Medium',
        color: null,
        fontStyle: 'Medium',
        fontFamily: null
    };
    /** @private */
    Theme.legendLabelFont = {
        size: '13px',
        fontWeight: 'Medium',
        color: null,
        fontStyle: 'Medium',
        fontFamily: 'Roboto, Noto, Sans-serif'
    };
    /** @private */
    Theme.dataLabelFont = {
        size: '12px',
        fontWeight: 'Medium',
        color: '#000000',
        fontStyle: 'Medium',
        fontFamily: 'Roboto, Noto, Sans-serif'
    };
})(Theme || (Theme = {}));
// eslint-disable-next-line @typescript-eslint/no-namespace
var FabricTheme;
(function (FabricTheme) {
    /** @private */
    FabricTheme.mapsTitleFont = {
        size: '14px',
        fontWeight: 'Semibold',
        color: '#424242',
        fontStyle: 'Semibold',
        fontFamily: 'SegoeUI, Helvetica Neue, Helvetica, Arial, sans-serif'
    };
    /** @private */
    FabricTheme.mapsSubTitleFont = {
        size: '13px',
        fontWeight: 'Regular',
        color: '#424242',
        fontStyle: 'Regular',
        fontFamily: 'SegoeUI, Helvetica Neue, Helvetica, Arial, sans-serif'
    };
    /** @private */
    FabricTheme.tooltipLabelFont = {
        size: '12px',
        fontWeight: 'Regular',
        color: '#FFFFFF',
        fontStyle: 'Regular',
        fontFamily: 'Roboto'
    };
    /** @private */
    FabricTheme.legendTitleFont = {
        size: '14px',
        fontWeight: 'Regular',
        color: '#757575',
        fontStyle: 'Regular',
        fontFamily: 'SegoeUI, Helvetica Neue, Helvetica, Arial, sans-serif'
    };
    /** @private */
    FabricTheme.legendLabelFont = {
        size: '13px',
        fontWeight: 'Medium',
        color: '#757575',
        fontStyle: 'Medium',
        fontFamily: 'SegoeUI, Helvetica Neue, Helvetica, Arial, sans-serif'
    };
    /** @private */
    FabricTheme.dataLabelFont = {
        size: '12px',
        fontWeight: 'Medium',
        color: '#000000',
        fontStyle: 'Medium',
        fontFamily: 'SegoeUI, Helvetica Neue, Helvetica, Arial, sans-serif'
    };
})(FabricTheme || (FabricTheme = {}));
// eslint-disable-next-line @typescript-eslint/no-namespace
var BootstrapTheme;
(function (BootstrapTheme) {
    /** @private */
    BootstrapTheme.mapsTitleFont = {
        size: '14px',
        fontWeight: 'Semibold',
        color: '#424242',
        fontStyle: 'Semibold',
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
    };
    /** @private */
    BootstrapTheme.mapsSubTitleFont = {
        size: '13px',
        fontWeight: 'Regular',
        color: '#424242',
        fontStyle: 'Regular',
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
    };
    /** @private */
    BootstrapTheme.tooltipLabelFont = {
        size: '12px',
        fontWeight: 'Regular',
        color: '#FFFFFF',
        fontStyle: 'Regular',
        fontFamily: 'Roboto'
    };
    /** @private */
    BootstrapTheme.legendTitleFont = {
        size: '14px',
        fontWeight: 'Regular',
        color: '#757575',
        fontStyle: 'Regular',
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
    };
    /** @private */
    BootstrapTheme.legendLabelFont = {
        size: '13px',
        fontWeight: 'Medium',
        color: '#757575',
        fontStyle: 'Medium',
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
    };
    /** @private */
    BootstrapTheme.dataLabelFont = {
        size: '12px',
        fontWeight: 'Medium',
        color: '#000000',
        fontStyle: 'Medium',
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
    };
})(BootstrapTheme || (BootstrapTheme = {}));
/**
 * Internal use of Method to getting colors based on themes.
 *
 * @private
 * @param {MapsTheme} theme Specifies the theme of the maps
 * @returns {string[]} Returns the shape color
 */
function getShapeColor(theme) {
    var themePalette;
    switch (theme.toLowerCase()) {
        case 'tailwind':
            themePalette = ['#0369A1', '#14B8A6', '#15803D', '#334155', '#5A61F6',
                '#65A30D', '#8B5CF6', '#9333EA', '#F59E0B', '#F97316'];
            break;
        case 'tailwinddark':
            themePalette = ['#10B981', '#22D3EE', '#2DD4BF', '#4ADE80', '#8B5CF6',
                '#E879F9', '#F472B6', '#F87171', '#F97316', '#FCD34D'];
            break;
        case 'bootstrap5':
            themePalette = ['#262E0B', '#668E1F', '#AF6E10', '#862C0B', '#1F2D50',
                '#64680B', '#311508', '#4C4C81', '#0C7DA0', '#862C0B'];
            break;
        case 'bootstrap5dark':
            themePalette = ['#5ECB9B', '#A860F1', '#EBA844', '#557EF7', '#E9599B',
                '#BFC529', '#3BC6CF', '#7A68EC', '#74B706', '#EA6266'];
            break;
        case 'fluent':
            themePalette = ['#614570', '#4C6FB1', '#CC6952', '#3F579A', '#4EA09B',
                '#6E7A89', '#D4515C', '#E6AF5D', '#639751', '#9D4D69'];
            break;
        case 'fluentdark':
            themePalette = ['#8AB113', '#2A72D5', '#43B786', '#584EC6', '#E85F9C',
                '#6E7A89', '#EA6266', '#EBA844', '#26BC7A', '#BC4870'];
            break;
        case 'material3':
            themePalette = ['#6200EE', '#E77A16', '#82C100', '#7107DC', '#05BB3D',
                '#D21020', '#FAD200', '#0085FF', '#9204EA', '#08EE9B'];
            break;
        case 'material3dark':
            themePalette = ['#4EAAFF', '#FA4EAB', '#FFF500', '#17EA58', '#38FFE7',
                '#FF9E45', '#B3F32F', '#B93CE4', '#FC5664', '#9B55FF'];
            break;
        default:
            themePalette = ['#B5E485', '#7BC1E8', '#DF819C', '#EC9B79', '#78D0D3',
                '#D6D572', '#9178E3', '#A1E5B4', '#87A4B4', '#E4C16C'];
            break;
    }
    return themePalette;
}
/**
 * HighContrast Theme configuration
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
var HighContrastTheme;
(function (HighContrastTheme) {
    /** @private */
    HighContrastTheme.mapsTitleFont = {
        size: '14px',
        fontWeight: 'Medium',
        color: '#FFFFFF',
        fontStyle: 'Medium',
        fontFamily: 'Roboto, Noto, Sans-serif'
    };
    /** @private */
    HighContrastTheme.mapsSubTitleFont = {
        size: '13px',
        fontWeight: 'Medium',
        color: '#FFFFFF',
        fontStyle: 'Medium',
        fontFamily: 'Roboto, Noto, Sans-serif'
    };
    /** @private */
    HighContrastTheme.tooltipLabelFont = {
        size: '12px',
        fontWeight: 'Regular',
        color: '#000000',
        fontStyle: 'Regular',
        fontFamily: 'Roboto'
    };
    /** @private */
    HighContrastTheme.legendTitleFont = {
        size: '14px',
        fontWeight: 'Regular',
        color: '#FFFFFF',
        fontStyle: 'Regular',
        fontFamily: 'Roboto, Noto, Sans-serif'
    };
    /** @private */
    HighContrastTheme.legendLabelFont = {
        size: '13px',
        fontWeight: 'Medium',
        color: '#FFFFFF',
        fontStyle: 'Medium',
        fontFamily: 'Roboto, Noto, Sans-serif'
    };
    /** @private */
    HighContrastTheme.dataLabelFont = {
        size: '12px',
        fontWeight: 'Medium',
        color: '#000000',
        fontStyle: 'Medium',
        fontFamily: 'Roboto, Noto, Sans-serif'
    };
})(HighContrastTheme || (HighContrastTheme = {}));
/**
 * Dark Theme configuration
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
var DarkTheme;
(function (DarkTheme) {
    /** @private */
    DarkTheme.mapsTitleFont = {
        fontFamily: 'Roboto, Noto, Sans-serif',
        fontWeight: 'Medium',
        size: '14px',
        fontStyle: 'Medium',
        color: '#FFFFFF'
    };
    /** @private */
    DarkTheme.mapsSubTitleFont = {
        size: '13px',
        color: '#FFFFFF',
        fontWeight: 'Medium',
        fontFamily: 'Roboto, Noto, Sans-serif',
        fontStyle: 'Medium'
    };
    /** @private */
    DarkTheme.tooltipLabelFont = {
        size: '12px',
        color: '#282727',
        fontWeight: 'Regular',
        fontFamily: 'Roboto',
        fontStyle: 'Regular'
    };
    /** @private */
    DarkTheme.legendTitleFont = {
        size: '14px',
        fontWeight: 'Regular',
        color: '#FFFFFF',
        fontStyle: 'Regular',
        fontFamily: 'Roboto, Noto, Sans-serif'
    };
    /** @private */
    DarkTheme.legendLabelFont = {
        size: '13px',
        fontFamily: 'Roboto, Noto, Sans-serif',
        fontWeight: 'Medium',
        color: '#DADADA',
        fontStyle: 'Medium'
    };
})(DarkTheme || (DarkTheme = {}));
/**
 * Method to get the theme style
 *
 * @param {MapsTheme} theme - Specifies the theme.
 * @returns {IThemeStyle} - Returns the theme style.
 * @private
 */
function getThemeStyle(theme) {
    var style;
    var color;
    switch (theme.toLowerCase()) {
        case 'materialdark':
            color = '#303030';
            break;
        case 'fabricdark':
            color = '#201F1F';
            break;
        case 'bootstrapdark':
            color = '#1A1A1A';
            break;
    }
    switch (theme.toLowerCase()) {
        case 'materialdark':
        case 'fabricdark':
        case 'bootstrapdark':
            style = {
                backgroundColor: color,
                areaBackgroundColor: color,
                titleFontColor: '#FFFFFF',
                titleFontSize: '14px',
                subTitleFontColor: '#FFFFFF',
                legendTitleFontColor: '#DADADA',
                legendTextColor: '#DADADA',
                dataLabelFontColor: '#DADADA',
                tooltipFontColor: '#FFFFFF',
                tooltipFillColor: '#363F4C',
                zoomFillColor: '#FFFFFF',
                labelFontFamily: 'Roboto, Noto, Sans-serif',
                fontFamily: 'Roboto, Noto, Sans-serif',
                fontSize: '12px',
                fontWeight: 'Medium',
                titleFontWeight: 'Medium',
                zoomSelectionColor: '#e61576',
                shapeFill: '#A6A6A6',
                rectangleZoomFillColor: '#d3d3d3',
                rectangleZoomFillOpacity: 0.5,
                rectangleZoomBorderColor: "#009900"
            };
            break;
        case 'highcontrast':
            style = {
                backgroundColor: '#000000',
                areaBackgroundColor: '#000000',
                titleFontColor: '#FFFFFF',
                titleFontSize: '14px',
                subTitleFontColor: '#FFFFFF',
                legendTitleFontColor: '#FFFFFF',
                legendTextColor: '#FFFFFF',
                dataLabelFontColor: '#000000',
                tooltipFontColor: '#000000',
                tooltipFillColor: '#ffffff',
                zoomFillColor: '#FFFFFF',
                fontFamily: 'Roboto, Noto, Sans-serif',
                fontSize: '12px',
                fontWeight: 'Medium',
                labelFontFamily: 'Roboto, Noto, Sans-serif',
                titleFontWeight: 'Medium',
                zoomSelectionColor: '#e61576',
                shapeFill: '#A6A6A6',
                rectangleZoomFillColor: '#d3d3d3',
                rectangleZoomFillOpacity: 0.5,
                rectangleZoomBorderColor: "#009900"
            };
            break;
        case 'bootstrap4':
            style = {
                backgroundColor: '#FFFFFF',
                areaBackgroundColor: '#FFFFFF',
                titleFontColor: '#212529',
                subTitleFontColor: '#212529',
                legendTitleFontColor: '#212529',
                legendTextColor: '#212529',
                dataLabelFontColor: '#212529',
                tooltipFontColor: '#FFFFFF',
                tooltipFillColor: '#000000',
                zoomFillColor: '#5B6269',
                fontFamily: 'HelveticaNeue-Medium',
                fontSize: '12px',
                fontWeight: 'Medium',
                titleFontSize: '16px',
                legendFontSize: '14px',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 0.9,
                labelFontFamily: 'HelveticaNeue-Medium',
                titleFontWeight: 'Medium',
                zoomSelectionColor: '#e61576',
                shapeFill: '#A6A6A6',
                rectangleZoomFillColor: '#d3d3d3',
                rectangleZoomFillOpacity: 0.5,
                rectangleZoomBorderColor: "#009900"
            };
            break;
        case 'tailwind':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                areaBackgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#374151',
                subTitleFontColor: '#374151',
                legendTitleFontColor: '#374151',
                legendTextColor: '#6B7280',
                dataLabelFontColor: '#505967',
                tooltipFontColor: '#F9FAFB',
                tooltipFillColor: '#111827',
                zoomFillColor: '#6b7280',
                fontFamily: 'Inter',
                fontSize: '12px',
                fontWeight: 'Medium',
                titleFontSize: '14px',
                legendFontSize: '12px',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 0.9,
                labelFontFamily: 'Inter',
                titleFontWeight: '500',
                zoomSelectionColor: '#374151',
                shapeFill: '#E5E7EB',
                rectangleZoomFillColor: '#d3d3d3',
                rectangleZoomFillOpacity: 0.5,
                rectangleZoomBorderColor: "#009900"
            };
            break;
        case 'tailwinddark':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                areaBackgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#D1D5DB',
                subTitleFontColor: '#D1D5DB',
                legendTitleFontColor: '#D1D5DB',
                legendTextColor: '#D1D5DB',
                dataLabelFontColor: '#D1D5DB',
                tooltipFontColor: '#1F2937',
                tooltipFillColor: '#F9FAFB',
                zoomFillColor: '#D1D5DB',
                fontFamily: 'Inter',
                fontSize: '12px',
                fontWeight: 'Medium',
                titleFontSize: '14px',
                legendFontSize: '12px',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 0.9,
                labelFontFamily: 'Inter',
                titleFontWeight: '500',
                zoomSelectionColor: '#F3F4F6',
                shapeFill: '#374151',
                rectangleZoomFillColor: '#d3d3d3',
                rectangleZoomFillOpacity: 0.5,
                rectangleZoomBorderColor: "#009900"
            };
            break;
        case 'bootstrap5':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                areaBackgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#212529',
                subTitleFontColor: '#212529',
                legendTitleFontColor: '#212529',
                legendTextColor: '#212529',
                dataLabelFontColor: '#212529',
                tooltipFontColor: '#F9FAFB',
                tooltipFillColor: '#212529',
                zoomFillColor: '#6C757D',
                fontFamily: 'Helvetica Neue',
                fontSize: '12px',
                fontWeight: 'Medium',
                titleFontSize: '14px',
                legendFontSize: '12px',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                labelFontFamily: 'Helvetica Neue',
                titleFontWeight: 'normal',
                zoomSelectionColor: '#343A40',
                shapeFill: '#E9ECEF',
                rectangleZoomFillColor: '#d3d3d3',
                rectangleZoomFillOpacity: 0.5,
                rectangleZoomBorderColor: "#009900"
            };
            break;
        case 'bootstrap5dark':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                areaBackgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#FFFFFF',
                subTitleFontColor: '#FFFFFF',
                legendTitleFontColor: '#FFFFFF',
                legendTextColor: '#FFFFFF',
                dataLabelFontColor: '#FFFFFF',
                tooltipFontColor: '#212529',
                tooltipFillColor: '#E9ECEF',
                zoomFillColor: '#B5BABE',
                fontFamily: 'Helvetica Neue',
                fontSize: '12px',
                fontWeight: 'Medium',
                titleFontSize: '14px',
                legendFontSize: '12px',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                labelFontFamily: 'Helvetica Neue',
                titleFontWeight: 'normal',
                zoomSelectionColor: '#DEE2E6',
                shapeFill: '#495057',
                rectangleZoomFillColor: '#d3d3d3',
                rectangleZoomFillOpacity: 0.5,
                rectangleZoomBorderColor: "#009900"
            };
            break;
        case 'fluent':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                areaBackgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#201F1E',
                subTitleFontColor: '#201F1E',
                legendTitleFontColor: '#201F1E',
                legendTextColor: '#201F1E',
                dataLabelFontColor: '#201F1E',
                tooltipFontColor: '#323130',
                tooltipFillColor: '#FFFFFF',
                zoomFillColor: '#A19F9D',
                fontFamily: 'Segoe UI',
                fontSize: '12px',
                fontWeight: 'Medium',
                titleFontSize: '14px',
                legendFontSize: '12px',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                labelFontFamily: 'Segoe UI',
                titleFontWeight: '600',
                zoomSelectionColor: '#323130',
                shapeFill: '#F3F2F1',
                rectangleZoomFillColor: '#d3d3d3',
                rectangleZoomFillOpacity: 0.5,
                rectangleZoomBorderColor: "#009900"
            };
            break;
        case 'fluentdark':
            style = {
                backgroundColor: 'rgba(255,255,255, 0.0)',
                areaBackgroundColor: 'rgba(255,255,255, 0.0)',
                titleFontColor: '#F3F2F1',
                subTitleFontColor: '#F3F2F1',
                legendTitleFontColor: '#F3F2F1',
                legendTextColor: '#F3F2F1',
                dataLabelFontColor: '#F3F2F1',
                tooltipFontColor: '#F3F2F1',
                tooltipFillColor: '#252423',
                zoomFillColor: '#484644',
                fontFamily: 'Segoe UI',
                fontSize: '12px',
                fontWeight: 'Medium',
                titleFontSize: '14px',
                legendFontSize: '12px',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                labelFontFamily: 'Segoe UI',
                titleFontWeight: '600',
                zoomSelectionColor: '#F3F2F1',
                shapeFill: '#252423',
                rectangleZoomFillColor: '#d3d3d3',
                rectangleZoomFillOpacity: 0.5,
                rectangleZoomBorderColor: "#009900"
            };
            break;
        case 'material3':
            style = {
                backgroundColor: 'transparent',
                areaBackgroundColor: 'transparent',
                titleFontColor: '#1C1B1F',
                subTitleFontColor: '#1C1B1F',
                legendTitleFontColor: '#1C1B1F',
                legendTextColor: '#49454E',
                dataLabelFontColor: '#1C1B1F',
                tooltipFontColor: '#F4EFF4',
                tooltipFillColor: '#313033',
                zoomFillColor: '#49454E',
                fontFamily: 'Roboto',
                fontSize: '14px',
                titleFontSize: '16px',
                subTitleFontSize: '14px',
                legendFontSize: '12px',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                labelFontFamily: 'Roboto',
                titleFontWeight: '500',
                fontWeight: '400',
                zoomSelectionColor: '#49454E',
                shapeFill: '#E7E0EC',
                rectangleZoomFillColor: '#6750A4',
                rectangleZoomFillOpacity: 0.24,
                rectangleZoomBorderColor: "#6750A4"
            };
            break;
        case 'material3dark':
            style = {
                backgroundColor: 'transparent',
                areaBackgroundColor: 'transparent',
                titleFontColor: '#E6E1E5',
                subTitleFontColor: '#E6E1E5',
                legendTitleFontColor: '#E6E1E5',
                legendTextColor: '#CAC4D0',
                dataLabelFontColor: '#E6E1E5',
                tooltipFontColor: '#313033',
                tooltipFillColor: '#E6E1E5',
                zoomFillColor: '#E6E1E5',
                fontFamily: 'Roboto',
                fontSize: '14px',
                titleFontSize: '16px',
                subTitleFontSize: '14px',
                legendFontSize: '12px',
                tooltipFillOpacity: 1,
                tooltipTextOpacity: 1,
                labelFontFamily: 'Roboto',
                titleFontWeight: '500',
                fontWeight: '400',
                zoomSelectionColor: '#E6E1E5',
                shapeFill: '#49454F',
                rectangleZoomFillColor: '#D0BCFF',
                rectangleZoomFillOpacity: 0.24,
                rectangleZoomBorderColor: "#D0BCFF"
            };
            break;
        default:
            style = {
                backgroundColor: '#FFFFFF',
                areaBackgroundColor: '#FFFFFF',
                titleFontColor: '#424242',
                titleFontSize: '14px',
                subTitleFontColor: '#424242',
                legendTitleFontColor: '#757575',
                legendTextColor: '#757575',
                dataLabelFontColor: '#000000',
                tooltipFontColor: '#FFFFFF',
                tooltipFillColor: '#000000',
                zoomFillColor: '#737373',
                labelFontFamily: 'Roboto, Noto, Sans-serif',
                fontFamily: 'Roboto, Noto, Sans-serif',
                fontSize: '12px',
                fontWeight: 'Medium',
                titleFontWeight: 'Medium',
                zoomSelectionColor: '#e61576',
                shapeFill: '#A6A6A6',
                rectangleZoomFillColor: '#d3d3d3',
                rectangleZoomFillOpacity: 0.5,
                rectangleZoomBorderColor: "#009900"
            };
            break;
    }
    return style;
}

var __extends$2 = (undefined && undefined.__extends) || (function () {
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
var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable max-len */
/**
 * Maps base document
 */
/**
 * Gets or sets the options for customizing the annotation element in maps.
 */
var Annotation = /** @__PURE__ @class */ (function (_super) {
    __extends$2(Annotation, _super);
    function Annotation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property('')
    ], Annotation.prototype, "content", void 0);
    __decorate$1([
        Property('0px')
    ], Annotation.prototype, "x", void 0);
    __decorate$1([
        Property('0px')
    ], Annotation.prototype, "y", void 0);
    __decorate$1([
        Property('None')
    ], Annotation.prototype, "verticalAlignment", void 0);
    __decorate$1([
        Property('None')
    ], Annotation.prototype, "horizontalAlignment", void 0);
    __decorate$1([
        Property('-1')
    ], Annotation.prototype, "zIndex", void 0);
    return Annotation;
}(ChildProperty));
/**
 * Gets or sets the options to customize the arrow in the navigation line.
 */
var Arrow = /** @__PURE__ @class */ (function (_super) {
    __extends$2(Arrow, _super);
    function Arrow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property('Start')
    ], Arrow.prototype, "position", void 0);
    __decorate$1([
        Property('false')
    ], Arrow.prototype, "showArrow", void 0);
    __decorate$1([
        Property(2)
    ], Arrow.prototype, "size", void 0);
    __decorate$1([
        Property('black')
    ], Arrow.prototype, "color", void 0);
    __decorate$1([
        Property(0)
    ], Arrow.prototype, "offSet", void 0);
    return Arrow;
}(ChildProperty));
/**
 * Gets or sets the options to customize the style of the text in data label, legend and other texts in maps.
 */
var Font = /** @__PURE__ @class */ (function (_super) {
    __extends$2(Font, _super);
    function Font() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property('12px')
    ], Font.prototype, "size", void 0);
    __decorate$1([
        Property(null)
    ], Font.prototype, "color", void 0);
    __decorate$1([
        Property('Roboto, Noto, Sans-serif')
    ], Font.prototype, "fontFamily", void 0);
    __decorate$1([
        Property('Medium')
    ], Font.prototype, "fontWeight", void 0);
    __decorate$1([
        Property('Medium')
    ], Font.prototype, "fontStyle", void 0);
    __decorate$1([
        Property(1)
    ], Font.prototype, "opacity", void 0);
    return Font;
}(ChildProperty));
/**
 * Specifies the options to customize the buttons in the zoom toolbar.
 */
var ZoomToolbarButtonSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$2(ZoomToolbarButtonSettings, _super);
    function ZoomToolbarButtonSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property('transparent')
    ], ZoomToolbarButtonSettings.prototype, "fill", void 0);
    __decorate$1([
        Property(null)
    ], ZoomToolbarButtonSettings.prototype, "color", void 0);
    __decorate$1([
        Property(1)
    ], ZoomToolbarButtonSettings.prototype, "borderOpacity", void 0);
    __decorate$1([
        Property(1)
    ], ZoomToolbarButtonSettings.prototype, "borderWidth", void 0);
    __decorate$1([
        Property(null)
    ], ZoomToolbarButtonSettings.prototype, "borderColor", void 0);
    __decorate$1([
        Property(30)
    ], ZoomToolbarButtonSettings.prototype, "radius", void 0);
    __decorate$1([
        Property(null)
    ], ZoomToolbarButtonSettings.prototype, "selectionColor", void 0);
    __decorate$1([
        Property(null)
    ], ZoomToolbarButtonSettings.prototype, "highlightColor", void 0);
    __decorate$1([
        Property(5)
    ], ZoomToolbarButtonSettings.prototype, "padding", void 0);
    __decorate$1([
        Property(1)
    ], ZoomToolbarButtonSettings.prototype, "opacity", void 0);
    __decorate$1([
        Property(['ZoomIn', 'ZoomOut', 'Reset'])
    ], ZoomToolbarButtonSettings.prototype, "toolbarItems", void 0);
    return ZoomToolbarButtonSettings;
}(ChildProperty));
/**
 * Specifies the options to customize the tooltip of the zoom toolbar.
 */
var ZoomToolbarTooltipSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$2(ZoomToolbarTooltipSettings, _super);
    function ZoomToolbarTooltipSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(true)
    ], ZoomToolbarTooltipSettings.prototype, "visible", void 0);
    __decorate$1([
        Property('white')
    ], ZoomToolbarTooltipSettings.prototype, "fill", void 0);
    __decorate$1([
        Property(1)
    ], ZoomToolbarTooltipSettings.prototype, "borderOpacity", void 0);
    __decorate$1([
        Property(1)
    ], ZoomToolbarTooltipSettings.prototype, "borderWidth", void 0);
    __decorate$1([
        Property('#707070')
    ], ZoomToolbarTooltipSettings.prototype, "borderColor", void 0);
    __decorate$1([
        Property('black')
    ], ZoomToolbarTooltipSettings.prototype, "fontColor", void 0);
    __decorate$1([
        Property('')
    ], ZoomToolbarTooltipSettings.prototype, "fontFamily", void 0);
    __decorate$1([
        Property('')
    ], ZoomToolbarTooltipSettings.prototype, "fontStyle", void 0);
    __decorate$1([
        Property('')
    ], ZoomToolbarTooltipSettings.prototype, "fontWeight", void 0);
    __decorate$1([
        Property('')
    ], ZoomToolbarTooltipSettings.prototype, "fontSize", void 0);
    __decorate$1([
        Property(1)
    ], ZoomToolbarTooltipSettings.prototype, "fontOpacity", void 0);
    return ZoomToolbarTooltipSettings;
}(ChildProperty));
/**
 * Sets and gets the options to customize the border of the zoom toolbar.
 */
var ZoomToolbarSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$2(ZoomToolbarSettings, _super);
    function ZoomToolbarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property('transparent')
    ], ZoomToolbarSettings.prototype, "backgroundColor", void 0);
    __decorate$1([
        Property(1)
    ], ZoomToolbarSettings.prototype, "borderOpacity", void 0);
    __decorate$1([
        Property(1)
    ], ZoomToolbarSettings.prototype, "borderWidth", void 0);
    __decorate$1([
        Property('transparent')
    ], ZoomToolbarSettings.prototype, "borderColor", void 0);
    __decorate$1([
        Property('Far')
    ], ZoomToolbarSettings.prototype, "horizontalAlignment", void 0);
    __decorate$1([
        Property('Near')
    ], ZoomToolbarSettings.prototype, "verticalAlignment", void 0);
    __decorate$1([
        Property('Horizontal')
    ], ZoomToolbarSettings.prototype, "orientation", void 0);
    __decorate$1([
        Complex({}, ZoomToolbarButtonSettings)
    ], ZoomToolbarSettings.prototype, "buttonSettings", void 0);
    __decorate$1([
        Complex({}, ZoomToolbarTooltipSettings)
    ], ZoomToolbarSettings.prototype, "tooltipSettings", void 0);
    return ZoomToolbarSettings;
}(ChildProperty));
/**
 * Gets or sets the options to customize the border of the maps.
 */
var Border = /** @__PURE__ @class */ (function (_super) {
    __extends$2(Border, _super);
    function Border() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property('')
    ], Border.prototype, "color", void 0);
    __decorate$1([
        Property(0)
    ], Border.prototype, "width", void 0);
    __decorate$1([
        Property(null)
    ], Border.prototype, "opacity", void 0);
    return Border;
}(ChildProperty));
/**
 * Gets or sets the values to change the center position of the maps.
 */
var CenterPosition = /** @__PURE__ @class */ (function (_super) {
    __extends$2(CenterPosition, _super);
    function CenterPosition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(null)
    ], CenterPosition.prototype, "latitude", void 0);
    __decorate$1([
        Property(null)
    ], CenterPosition.prototype, "longitude", void 0);
    return CenterPosition;
}(ChildProperty));
/**
 * Gets or sets the options to customize the tooltip of layers, markers, and bubble in maps.
 */
var TooltipSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$2(TooltipSettings, _super);
    function TooltipSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(false)
    ], TooltipSettings.prototype, "visible", void 0);
    __decorate$1([
        Property('')
    ], TooltipSettings.prototype, "template", void 0);
    __decorate$1([
        Property('')
    ], TooltipSettings.prototype, "fill", void 0);
    __decorate$1([
        Complex({ color: 'transparent', width: 1 }, Border)
    ], TooltipSettings.prototype, "border", void 0);
    __decorate$1([
        Complex({ fontFamily: null, size: null, fontWeight: null }, Font)
    ], TooltipSettings.prototype, "textStyle", void 0);
    __decorate$1([
        Property(null)
    ], TooltipSettings.prototype, "format", void 0);
    __decorate$1([
        Property(null)
    ], TooltipSettings.prototype, "valuePath", void 0);
    return TooltipSettings;
}(ChildProperty));
/**
 * Gets or sets the options to customize the margin of the maps.
 */
var Margin = /** @__PURE__ @class */ (function (_super) {
    __extends$2(Margin, _super);
    function Margin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(10)
    ], Margin.prototype, "left", void 0);
    __decorate$1([
        Property(10)
    ], Margin.prototype, "right", void 0);
    __decorate$1([
        Property(10)
    ], Margin.prototype, "top", void 0);
    __decorate$1([
        Property(10)
    ], Margin.prototype, "bottom", void 0);
    return Margin;
}(ChildProperty));
/**
 * Gets or sets the options to customize the lines that connect the markers in marker cluster of the maps.
 */
var ConnectorLineSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$2(ConnectorLineSettings, _super);
    function ConnectorLineSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property('#000000')
    ], ConnectorLineSettings.prototype, "color", void 0);
    __decorate$1([
        Property(1)
    ], ConnectorLineSettings.prototype, "width", void 0);
    __decorate$1([
        Property(1)
    ], ConnectorLineSettings.prototype, "opacity", void 0);
    return ConnectorLineSettings;
}(ChildProperty));
/**
 * Gets or sets the options to customize the cluster of markers in maps.
 */
var MarkerClusterSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$2(MarkerClusterSettings, _super);
    function MarkerClusterSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(false)
    ], MarkerClusterSettings.prototype, "allowClustering", void 0);
    __decorate$1([
        Complex({ color: 'transparent', width: 1 }, Border)
    ], MarkerClusterSettings.prototype, "border", void 0);
    __decorate$1([
        Property('#D2691E')
    ], MarkerClusterSettings.prototype, "fill", void 0);
    __decorate$1([
        Property(1)
    ], MarkerClusterSettings.prototype, "opacity", void 0);
    __decorate$1([
        Property('Rectangle')
    ], MarkerClusterSettings.prototype, "shape", void 0);
    __decorate$1([
        Property(12)
    ], MarkerClusterSettings.prototype, "width", void 0);
    __decorate$1([
        Property(12)
    ], MarkerClusterSettings.prototype, "height", void 0);
    __decorate$1([
        Property(new Point(0, 0))
    ], MarkerClusterSettings.prototype, "offset", void 0);
    __decorate$1([
        Property('')
    ], MarkerClusterSettings.prototype, "imageUrl", void 0);
    __decorate$1([
        Property('')
    ], MarkerClusterSettings.prototype, "dashArray", void 0);
    __decorate$1([
        Complex({}, Font)
    ], MarkerClusterSettings.prototype, "labelStyle", void 0);
    __decorate$1([
        Property(false)
    ], MarkerClusterSettings.prototype, "allowClusterExpand", void 0);
    __decorate$1([
        Complex({}, ConnectorLineSettings)
    ], MarkerClusterSettings.prototype, "connectorLineSettings", void 0);
    return MarkerClusterSettings;
}(ChildProperty));
/**
 * Gets or sets the data in the marker cluster.
 */
var MarkerClusterData = /** @__PURE__ @class */ (function (_super) {
    __extends$2(MarkerClusterData, _super);
    function MarkerClusterData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MarkerClusterData;
}(ChildProperty));
/**
 * Gets or sets the options to customize the color-mapping in maps.
 */
var ColorMappingSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$2(ColorMappingSettings, _super);
    function ColorMappingSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(null)
    ], ColorMappingSettings.prototype, "from", void 0);
    __decorate$1([
        Property(null)
    ], ColorMappingSettings.prototype, "to", void 0);
    __decorate$1([
        Property(null)
    ], ColorMappingSettings.prototype, "value", void 0);
    __decorate$1([
        Property(null)
    ], ColorMappingSettings.prototype, "color", void 0);
    __decorate$1([
        Property(null)
    ], ColorMappingSettings.prototype, "minOpacity", void 0);
    __decorate$1([
        Property(null)
    ], ColorMappingSettings.prototype, "maxOpacity", void 0);
    __decorate$1([
        Property(null)
    ], ColorMappingSettings.prototype, "label", void 0);
    __decorate$1([
        Property(true)
    ], ColorMappingSettings.prototype, "showLegend", void 0);
    return ColorMappingSettings;
}(ChildProperty));
/**
 * Gets or sets the options to select the marker shape when the maps is loaded initially.
 * The initial selection of the markers will work only when the selection settings of marker is enabled.
 */
var InitialMarkerSelectionSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$2(InitialMarkerSelectionSettings, _super);
    function InitialMarkerSelectionSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(null)
    ], InitialMarkerSelectionSettings.prototype, "latitude", void 0);
    __decorate$1([
        Property(null)
    ], InitialMarkerSelectionSettings.prototype, "longitude", void 0);
    return InitialMarkerSelectionSettings;
}(ChildProperty));
/**
 * Gets or sets the options to select the shapes when the maps is loaded initially.
 * The initial selection of the shapes will work only when the selection settings of layer is enabled.
 */
var InitialShapeSelectionSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$2(InitialShapeSelectionSettings, _super);
    function InitialShapeSelectionSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(null)
    ], InitialShapeSelectionSettings.prototype, "shapePath", void 0);
    __decorate$1([
        Property(null)
    ], InitialShapeSelectionSettings.prototype, "shapeValue", void 0);
    return InitialShapeSelectionSettings;
}(ChildProperty));
/**
 * Gets or sets the options to customize the maps on selecting the shapes.
 */
var SelectionSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$2(SelectionSettings, _super);
    function SelectionSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(false)
    ], SelectionSettings.prototype, "enable", void 0);
    __decorate$1([
        Property(null)
    ], SelectionSettings.prototype, "fill", void 0);
    __decorate$1([
        Property(1)
    ], SelectionSettings.prototype, "opacity", void 0);
    __decorate$1([
        Property(false)
    ], SelectionSettings.prototype, "enableMultiSelect", void 0);
    __decorate$1([
        Complex({ color: 'transparent', width: 0 }, Border)
    ], SelectionSettings.prototype, "border", void 0);
    return SelectionSettings;
}(ChildProperty));
/**
 * Gets or sets the options to customize the shapes on which the mouse has hovered in maps.
 */
var HighlightSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$2(HighlightSettings, _super);
    function HighlightSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(null)
    ], HighlightSettings.prototype, "fill", void 0);
    __decorate$1([
        Property(false)
    ], HighlightSettings.prototype, "enable", void 0);
    __decorate$1([
        Property(1)
    ], HighlightSettings.prototype, "opacity", void 0);
    __decorate$1([
        Complex({ color: 'transparent', width: 0 }, Border)
    ], HighlightSettings.prototype, "border", void 0);
    return HighlightSettings;
}(ChildProperty));
/**
 * Gets or sets the options to customize the navigation lines in maps which is used to connect different locations.
 */
var NavigationLineSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$2(NavigationLineSettings, _super);
    function NavigationLineSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(false)
    ], NavigationLineSettings.prototype, "visible", void 0);
    __decorate$1([
        Property(1)
    ], NavigationLineSettings.prototype, "width", void 0);
    __decorate$1([
        Property(null)
    ], NavigationLineSettings.prototype, "longitude", void 0);
    __decorate$1([
        Property(null)
    ], NavigationLineSettings.prototype, "latitude", void 0);
    __decorate$1([
        Property('')
    ], NavigationLineSettings.prototype, "dashArray", void 0);
    __decorate$1([
        Property('black')
    ], NavigationLineSettings.prototype, "color", void 0);
    __decorate$1([
        Property(0)
    ], NavigationLineSettings.prototype, "angle", void 0);
    __decorate$1([
        Complex({ showArrow: false, position: 'Start', size: 5, color: 'black' }, Arrow)
    ], NavigationLineSettings.prototype, "arrowSettings", void 0);
    __decorate$1([
        Complex({}, SelectionSettings)
    ], NavigationLineSettings.prototype, "selectionSettings", void 0);
    __decorate$1([
        Complex({}, HighlightSettings)
    ], NavigationLineSettings.prototype, "highlightSettings", void 0);
    return NavigationLineSettings;
}(ChildProperty));
/**
 * Gets or sets the options to customize the bubble elements in the maps.
 */
var BubbleSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$2(BubbleSettings, _super);
    function BubbleSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Complex({}, Border)
    ], BubbleSettings.prototype, "border", void 0);
    __decorate$1([
        Property(false)
    ], BubbleSettings.prototype, "visible", void 0);
    __decorate$1([
        Property([])
    ], BubbleSettings.prototype, "dataSource", void 0);
    __decorate$1([
        Property()
    ], BubbleSettings.prototype, "query", void 0);
    __decorate$1([
        Property(1000)
    ], BubbleSettings.prototype, "animationDuration", void 0);
    __decorate$1([
        Property(0)
    ], BubbleSettings.prototype, "animationDelay", void 0);
    __decorate$1([
        Property('')
    ], BubbleSettings.prototype, "fill", void 0);
    __decorate$1([
        Property(10)
    ], BubbleSettings.prototype, "minRadius", void 0);
    __decorate$1([
        Property(20)
    ], BubbleSettings.prototype, "maxRadius", void 0);
    __decorate$1([
        Property(1)
    ], BubbleSettings.prototype, "opacity", void 0);
    __decorate$1([
        Property(null)
    ], BubbleSettings.prototype, "valuePath", void 0);
    __decorate$1([
        Property('Circle')
    ], BubbleSettings.prototype, "bubbleType", void 0);
    __decorate$1([
        Property(null)
    ], BubbleSettings.prototype, "colorValuePath", void 0);
    __decorate$1([
        Collection([], ColorMappingSettings)
    ], BubbleSettings.prototype, "colorMapping", void 0);
    __decorate$1([
        Complex({}, TooltipSettings)
    ], BubbleSettings.prototype, "tooltipSettings", void 0);
    __decorate$1([
        Complex({}, SelectionSettings)
    ], BubbleSettings.prototype, "selectionSettings", void 0);
    __decorate$1([
        Complex({}, HighlightSettings)
    ], BubbleSettings.prototype, "highlightSettings", void 0);
    return BubbleSettings;
}(ChildProperty));
/**
 * Gets or sets the options to customize the title of the maps.
 */
var CommonTitleSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$2(CommonTitleSettings, _super);
    function CommonTitleSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property('')
    ], CommonTitleSettings.prototype, "text", void 0);
    __decorate$1([
        Property('')
    ], CommonTitleSettings.prototype, "description", void 0);
    return CommonTitleSettings;
}(ChildProperty));
/**
 * Gets or sets the options to customize the subtitle of the maps.
 */
var SubTitleSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$2(SubTitleSettings, _super);
    function SubTitleSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Complex({ size: null, fontWeight: null, fontFamily: null }, Font)
    ], SubTitleSettings.prototype, "textStyle", void 0);
    __decorate$1([
        Property('Center')
    ], SubTitleSettings.prototype, "alignment", void 0);
    return SubTitleSettings;
}(CommonTitleSettings));
/**
 * Gets or sets the options to customize the title of the maps.
 */
var TitleSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$2(TitleSettings, _super);
    function TitleSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Complex({ size: null, fontWeight: null, fontFamily: null }, Font)
    ], TitleSettings.prototype, "textStyle", void 0);
    __decorate$1([
        Property('Center')
    ], TitleSettings.prototype, "alignment", void 0);
    __decorate$1([
        Complex({}, SubTitleSettings)
    ], TitleSettings.prototype, "subtitleSettings", void 0);
    return TitleSettings;
}(CommonTitleSettings));
/**
 * Gets or sets the options to configure maps zooming operations.
 */
var ZoomSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$2(ZoomSettings, _super);
    function ZoomSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(false)
    ], ZoomSettings.prototype, "enable", void 0);
    __decorate$1([
        Property(true)
    ], ZoomSettings.prototype, "enablePanning", void 0);
    __decorate$1([
        Property(true)
    ], ZoomSettings.prototype, "enableSelectionZooming", void 0);
    __decorate$1([
        Property('Horizontal')
    ], ZoomSettings.prototype, "toolBarOrientation", void 0);
    __decorate$1([
        Property(null)
    ], ZoomSettings.prototype, "color", void 0);
    __decorate$1([
        Property(null)
    ], ZoomSettings.prototype, "highlightColor", void 0);
    __decorate$1([
        Property(null)
    ], ZoomSettings.prototype, "selectionColor", void 0);
    __decorate$1([
        Property('Far')
    ], ZoomSettings.prototype, "horizontalAlignment", void 0);
    __decorate$1([
        Property('Near')
    ], ZoomSettings.prototype, "verticalAlignment", void 0);
    __decorate$1([
        Property(['ZoomIn', 'ZoomOut', 'Reset'])
    ], ZoomSettings.prototype, "toolbars", void 0);
    __decorate$1([
        Property(true)
    ], ZoomSettings.prototype, "mouseWheelZoom", void 0);
    __decorate$1([
        Property(false)
    ], ZoomSettings.prototype, "doubleClickZoom", void 0);
    __decorate$1([
        Property(true)
    ], ZoomSettings.prototype, "pinchZooming", void 0);
    __decorate$1([
        Property(false)
    ], ZoomSettings.prototype, "zoomOnClick", void 0);
    __decorate$1([
        Property(1)
    ], ZoomSettings.prototype, "zoomFactor", void 0);
    __decorate$1([
        Property(10)
    ], ZoomSettings.prototype, "maxZoom", void 0);
    __decorate$1([
        Property(1)
    ], ZoomSettings.prototype, "minZoom", void 0);
    __decorate$1([
        Property(false)
    ], ZoomSettings.prototype, "shouldZoomInitially", void 0);
    __decorate$1([
        Property(true)
    ], ZoomSettings.prototype, "resetToInitial", void 0);
    __decorate$1([
        Complex({}, ZoomToolbarSettings)
    ], ZoomSettings.prototype, "toolbarSettings", void 0);
    return ZoomSettings;
}(ChildProperty));
/**
 * Gets or sets the settings to customize the color-mapping visibility based on the legend visibility.
 */
var ToggleLegendSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$2(ToggleLegendSettings, _super);
    function ToggleLegendSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(false)
    ], ToggleLegendSettings.prototype, "enable", void 0);
    __decorate$1([
        Property(true)
    ], ToggleLegendSettings.prototype, "applyShapeSettings", void 0);
    __decorate$1([
        Property(1)
    ], ToggleLegendSettings.prototype, "opacity", void 0);
    __decorate$1([
        Property('')
    ], ToggleLegendSettings.prototype, "fill", void 0);
    __decorate$1([
        Complex({ color: '', width: 0 }, Border)
    ], ToggleLegendSettings.prototype, "border", void 0);
    return ToggleLegendSettings;
}(ChildProperty));
/**
 * Gets or sets the options to customize the legend of the maps.
 */
var LegendSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$2(LegendSettings, _super);
    function LegendSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(false)
    ], LegendSettings.prototype, "useMarkerShape", void 0);
    __decorate$1([
        Property(false)
    ], LegendSettings.prototype, "toggleVisibility", void 0);
    __decorate$1([
        Property(false)
    ], LegendSettings.prototype, "visible", void 0);
    __decorate$1([
        Property('transparent')
    ], LegendSettings.prototype, "background", void 0);
    __decorate$1([
        Property('Layers')
    ], LegendSettings.prototype, "type", void 0);
    __decorate$1([
        Property(false)
    ], LegendSettings.prototype, "invertedPointer", void 0);
    __decorate$1([
        Property('After')
    ], LegendSettings.prototype, "labelPosition", void 0);
    __decorate$1([
        Property('None')
    ], LegendSettings.prototype, "labelDisplayMode", void 0);
    __decorate$1([
        Property('Circle')
    ], LegendSettings.prototype, "shape", void 0);
    __decorate$1([
        Property('')
    ], LegendSettings.prototype, "width", void 0);
    __decorate$1([
        Property('')
    ], LegendSettings.prototype, "height", void 0);
    __decorate$1([
        Complex({ fontFamily: null, fontWeight: null }, Font)
    ], LegendSettings.prototype, "textStyle", void 0);
    __decorate$1([
        Property(15)
    ], LegendSettings.prototype, "shapeWidth", void 0);
    __decorate$1([
        Property(15)
    ], LegendSettings.prototype, "shapeHeight", void 0);
    __decorate$1([
        Property(10)
    ], LegendSettings.prototype, "shapePadding", void 0);
    __decorate$1([
        Complex({ color: '#000000', width: 0 }, Border)
    ], LegendSettings.prototype, "border", void 0);
    __decorate$1([
        Complex({ color: '#000000', width: 0 }, Border)
    ], LegendSettings.prototype, "shapeBorder", void 0);
    __decorate$1([
        Complex({}, CommonTitleSettings)
    ], LegendSettings.prototype, "title", void 0);
    __decorate$1([
        Complex({ size: null, color: Theme.legendTitleFont.color, fontStyle: Theme.legendTitleFont.fontStyle, fontWeight: null, fontFamily: null }, Font)
    ], LegendSettings.prototype, "titleStyle", void 0);
    __decorate$1([
        Property('Bottom')
    ], LegendSettings.prototype, "position", void 0);
    __decorate$1([
        Property('Center')
    ], LegendSettings.prototype, "alignment", void 0);
    __decorate$1([
        Property('None')
    ], LegendSettings.prototype, "orientation", void 0);
    __decorate$1([
        Property({ x: 0, y: 0 })
    ], LegendSettings.prototype, "location", void 0);
    __decorate$1([
        Property(null)
    ], LegendSettings.prototype, "fill", void 0);
    __decorate$1([
        Property(1)
    ], LegendSettings.prototype, "opacity", void 0);
    __decorate$1([
        Property('Default')
    ], LegendSettings.prototype, "mode", void 0);
    __decorate$1([
        Property(null)
    ], LegendSettings.prototype, "showLegendPath", void 0);
    __decorate$1([
        Property(null)
    ], LegendSettings.prototype, "valuePath", void 0);
    __decorate$1([
        Property(false)
    ], LegendSettings.prototype, "removeDuplicateLegend", void 0);
    __decorate$1([
        Complex({}, ToggleLegendSettings)
    ], LegendSettings.prototype, "toggleLegendSettings", void 0);
    return LegendSettings;
}(ChildProperty));
/**
 * Gets or sets the options to customize the data labels in maps.
 */
var DataLabelSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$2(DataLabelSettings, _super);
    function DataLabelSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(false)
    ], DataLabelSettings.prototype, "visible", void 0);
    __decorate$1([
        Complex({ width: 0, color: 'transparent' }, Border)
    ], DataLabelSettings.prototype, "border", void 0);
    __decorate$1([
        Property('black')
    ], DataLabelSettings.prototype, "fill", void 0);
    __decorate$1([
        Property(1)
    ], DataLabelSettings.prototype, "opacity", void 0);
    __decorate$1([
        Property(5)
    ], DataLabelSettings.prototype, "rx", void 0);
    __decorate$1([
        Property(5)
    ], DataLabelSettings.prototype, "ry", void 0);
    __decorate$1([
        Complex({ fontWeight: null }, Font)
    ], DataLabelSettings.prototype, "textStyle", void 0);
    __decorate$1([
        Property('')
    ], DataLabelSettings.prototype, "labelPath", void 0);
    __decorate$1([
        Property('None')
    ], DataLabelSettings.prototype, "smartLabelMode", void 0);
    __decorate$1([
        Property('None')
    ], DataLabelSettings.prototype, "intersectionAction", void 0);
    __decorate$1([
        Property('')
    ], DataLabelSettings.prototype, "template", void 0);
    return DataLabelSettings;
}(ChildProperty));
/**
 * Gets or sets the options to customize the shapes in the maps.
 */
var ShapeSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$2(ShapeSettings, _super);
    function ShapeSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(null)
    ], ShapeSettings.prototype, "fill", void 0);
    __decorate$1([
        Property([])
    ], ShapeSettings.prototype, "palette", void 0);
    __decorate$1([
        Property(5)
    ], ShapeSettings.prototype, "circleRadius", void 0);
    __decorate$1([
        Complex({ width: null, color: '#000000' }, Border)
    ], ShapeSettings.prototype, "border", void 0);
    __decorate$1([
        Property('')
    ], ShapeSettings.prototype, "dashArray", void 0);
    __decorate$1([
        Property(1)
    ], ShapeSettings.prototype, "opacity", void 0);
    __decorate$1([
        Property(null)
    ], ShapeSettings.prototype, "colorValuePath", void 0);
    __decorate$1([
        Property(null)
    ], ShapeSettings.prototype, "borderColorValuePath", void 0);
    __decorate$1([
        Property(null)
    ], ShapeSettings.prototype, "borderWidthValuePath", void 0);
    __decorate$1([
        Property(null)
    ], ShapeSettings.prototype, "valuePath", void 0);
    __decorate$1([
        Collection([], ColorMappingSettings)
    ], ShapeSettings.prototype, "colorMapping", void 0);
    __decorate$1([
        Property(false)
    ], ShapeSettings.prototype, "autofill", void 0);
    return ShapeSettings;
}(ChildProperty));
/**
 * Gets or sets the options to customize the markers in the maps.
 */
var MarkerBase = /** @__PURE__ @class */ (function (_super) {
    __extends$2(MarkerBase, _super);
    function MarkerBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Complex({ color: 'transparent', width: 1 }, Border)
    ], MarkerBase.prototype, "border", void 0);
    __decorate$1([
        Property(null)
    ], MarkerBase.prototype, "dashArray", void 0);
    __decorate$1([
        Property(false)
    ], MarkerBase.prototype, "visible", void 0);
    __decorate$1([
        Property(false)
    ], MarkerBase.prototype, "enableDrag", void 0);
    __decorate$1([
        Property('#FF471A')
    ], MarkerBase.prototype, "fill", void 0);
    __decorate$1([
        Property(10)
    ], MarkerBase.prototype, "height", void 0);
    __decorate$1([
        Property(10)
    ], MarkerBase.prototype, "width", void 0);
    __decorate$1([
        Property(1)
    ], MarkerBase.prototype, "opacity", void 0);
    __decorate$1([
        Property(null)
    ], MarkerBase.prototype, "colorValuePath", void 0);
    __decorate$1([
        Property(null)
    ], MarkerBase.prototype, "shapeValuePath", void 0);
    __decorate$1([
        Property(null)
    ], MarkerBase.prototype, "imageUrlValuePath", void 0);
    __decorate$1([
        Property('Balloon')
    ], MarkerBase.prototype, "shape", void 0);
    __decorate$1([
        Property('')
    ], MarkerBase.prototype, "legendText", void 0);
    __decorate$1([
        Property(new Point(0, 0))
    ], MarkerBase.prototype, "offset", void 0);
    __decorate$1([
        Property('')
    ], MarkerBase.prototype, "imageUrl", void 0);
    __decorate$1([
        Property(null)
    ], MarkerBase.prototype, "template", void 0);
    __decorate$1([
        Property([])
    ], MarkerBase.prototype, "dataSource", void 0);
    __decorate$1([
        Property()
    ], MarkerBase.prototype, "query", void 0);
    __decorate$1([
        Complex({}, TooltipSettings)
    ], MarkerBase.prototype, "tooltipSettings", void 0);
    __decorate$1([
        Property(1000)
    ], MarkerBase.prototype, "animationDuration", void 0);
    __decorate$1([
        Property(0)
    ], MarkerBase.prototype, "animationDelay", void 0);
    __decorate$1([
        Complex({}, SelectionSettings)
    ], MarkerBase.prototype, "selectionSettings", void 0);
    __decorate$1([
        Complex({}, HighlightSettings)
    ], MarkerBase.prototype, "highlightSettings", void 0);
    __decorate$1([
        Property(null)
    ], MarkerBase.prototype, "latitudeValuePath", void 0);
    __decorate$1([
        Property(null)
    ], MarkerBase.prototype, "longitudeValuePath", void 0);
    __decorate$1([
        Collection([], InitialMarkerSelectionSettings)
    ], MarkerBase.prototype, "initialMarkerSelection", void 0);
    return MarkerBase;
}(ChildProperty));
/**
 * Gets or sets the options to customize the markers in the maps.
 */
var MarkerSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$2(MarkerSettings, _super);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function MarkerSettings(parent, propName, defaultValue, isArray) {
        return _super.call(this, parent, propName, defaultValue, isArray) || this;
    }
    return MarkerSettings;
}(MarkerBase));
/**
 * Gets or sets the options to customize the layers of the maps.
 */
var LayerSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$2(LayerSettings, _super);
    function LayerSettings() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * @private
         */
        _this.isBaseLayer = false;
        return _this;
    }
    __decorate$1([
        Property(null)
    ], LayerSettings.prototype, "shapeData", void 0);
    __decorate$1([
        Property()
    ], LayerSettings.prototype, "query", void 0);
    __decorate$1([
        Complex({}, ShapeSettings)
    ], LayerSettings.prototype, "shapeSettings", void 0);
    __decorate$1([
        Property([])
    ], LayerSettings.prototype, "dataSource", void 0);
    __decorate$1([
        Property('Layer')
    ], LayerSettings.prototype, "type", void 0);
    __decorate$1([
        Property('Geographic')
    ], LayerSettings.prototype, "geometryType", void 0);
    __decorate$1([
        Property('Aerial')
    ], LayerSettings.prototype, "bingMapType", void 0);
    __decorate$1([
        Property('RoadMap')
    ], LayerSettings.prototype, "staticMapType", void 0);
    __decorate$1([
        Property('')
    ], LayerSettings.prototype, "key", void 0);
    __decorate$1([
        Property('Geometry')
    ], LayerSettings.prototype, "layerType", void 0);
    __decorate$1([
        Property('')
    ], LayerSettings.prototype, "urlTemplate", void 0);
    __decorate$1([
        Property(true)
    ], LayerSettings.prototype, "visible", void 0);
    __decorate$1([
        Property('name')
    ], LayerSettings.prototype, "shapeDataPath", void 0);
    __decorate$1([
        Property('name')
    ], LayerSettings.prototype, "shapePropertyPath", void 0);
    __decorate$1([
        Property(0)
    ], LayerSettings.prototype, "animationDuration", void 0);
    __decorate$1([
        Collection([], MarkerSettings)
    ], LayerSettings.prototype, "markerSettings", void 0);
    __decorate$1([
        Complex({}, MarkerClusterSettings)
    ], LayerSettings.prototype, "markerClusterSettings", void 0);
    __decorate$1([
        Complex({}, DataLabelSettings)
    ], LayerSettings.prototype, "dataLabelSettings", void 0);
    __decorate$1([
        Collection([], BubbleSettings)
    ], LayerSettings.prototype, "bubbleSettings", void 0);
    __decorate$1([
        Collection([], NavigationLineSettings)
    ], LayerSettings.prototype, "navigationLineSettings", void 0);
    __decorate$1([
        Complex({}, TooltipSettings)
    ], LayerSettings.prototype, "tooltipSettings", void 0);
    __decorate$1([
        Complex({}, SelectionSettings)
    ], LayerSettings.prototype, "selectionSettings", void 0);
    __decorate$1([
        Complex({}, HighlightSettings)
    ], LayerSettings.prototype, "highlightSettings", void 0);
    __decorate$1([
        Complex({}, ToggleLegendSettings)
    ], LayerSettings.prototype, "toggleLegendSettings", void 0);
    __decorate$1([
        Collection([], InitialShapeSelectionSettings)
    ], LayerSettings.prototype, "initialShapeSelection", void 0);
    return LayerSettings;
}(ChildProperty));
/**
 * Internal use for bing type layer rendering
 */
var Tile = /** @__PURE__ @class */ (function () {
    function Tile(x, y, height, width, top, left, src) {
        if (height === void 0) { height = 256; }
        if (width === void 0) { width = 256; }
        if (top === void 0) { top = 0; }
        if (left === void 0) { left = 0; }
        if (src === void 0) { src = null; }
        this.x = x;
        this.y = y;
        this.top = top;
        this.left = left;
        this.height = height;
        this.width = width;
        this.src = src;
    }
    return Tile;
}());
/**
 * Gets or sets the options to customize the area around the shapes in the map layer.
 */
var MapsAreaSettings = /** @__PURE__ @class */ (function (_super) {
    __extends$2(MapsAreaSettings, _super);
    function MapsAreaSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(null)
    ], MapsAreaSettings.prototype, "background", void 0);
    __decorate$1([
        Complex({ color: 'transparent', width: 1 }, Border)
    ], MapsAreaSettings.prototype, "border", void 0);
    return MapsAreaSettings;
}(ChildProperty));

/**
 * Marker class
 */
var Marker = /** @__PURE__ @class */ (function () {
    function Marker(maps) {
        this.maps = maps;
        this.trackElements = [];
        this.sameMarkerData = [];
    }
    Marker.prototype.markerRender = function (maps, layerElement, layerIndex, factor, type) {
        var _this = this;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var templateFn;
        var markerCount = 0;
        var nullCount = 0;
        var markerTemplateCount = 0;
        maps.translateType = 'marker';
        var currentLayer = maps.layersCollection[layerIndex];
        this.markerSVGObject = maps.renderer.createGroup({
            id: maps.element.id + '_Markers_Group',
            class: 'GroupElement'
        });
        this.markerSVGObject.style.pointerEvents = 'auto';
        var markerTemplateEle = createElement('div', {
            id: maps.element.id + '_LayerIndex_' + layerIndex + '_Markers_Template_Group',
            className: maps.element.id + '_template'
        });
        markerTemplateEle.style.cssText = 'overflow: hidden; position: absolute;pointer-events: none;' +
            'top:' + maps.mapAreaRect.y + 'px;' +
            'left:' + maps.mapAreaRect.x + 'px;' +
            'height:' + maps.mapAreaRect.height + 'px;' +
            'width:' + maps.mapAreaRect.width + 'px;';
        currentLayer.markerSettings.map(function (markerSettings, markerIndex) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var markerData = markerSettings.dataSource;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Array.prototype.forEach.call(markerData, function (data, dataIndex) {
                maps.markerNullCount = markerIndex > 0 && dataIndex === 0 ? 0 : maps.markerNullCount;
                var eventArgs = {
                    cancel: false, name: markerRendering, fill: markerSettings.fill, height: markerSettings.height,
                    width: markerSettings.width, imageUrl: markerSettings.imageUrl, shape: markerSettings.shape,
                    template: markerSettings.template, data: data, maps: maps, marker: markerSettings,
                    border: markerSettings.border, colorValuePath: markerSettings.colorValuePath,
                    shapeValuePath: markerSettings.shapeValuePath, imageUrlValuePath: markerSettings.imageUrlValuePath
                };
                maps.trigger('markerRendering', eventArgs, function (MarkerArgs) {
                    eventArgs = markerColorChoose(eventArgs, data);
                    eventArgs = markerShapeChoose(eventArgs, data);
                    var lng = (!isNullOrUndefined(markerSettings.longitudeValuePath)) ?
                        Number(getValueFromObject(data, markerSettings.longitudeValuePath)) : !isNullOrUndefined(data['longitude']) ?
                        parseFloat(data['longitude']) : !isNullOrUndefined(data['Longitude']) ? parseFloat(data['Longitude']) : null;
                    var lat = (!isNullOrUndefined(markerSettings.latitudeValuePath)) ?
                        Number(getValueFromObject(data, markerSettings.latitudeValuePath)) : !isNullOrUndefined(data['latitude']) ?
                        parseFloat(data['latitude']) : !isNullOrUndefined(data['Latitude']) ? parseFloat(data['Latitude']) : null;
                    var offset = markerSettings.offset;
                    if (!eventArgs.cancel && markerSettings.visible && !isNullOrUndefined(lng) && !isNullOrUndefined(lat)) {
                        var markerID = maps.element.id + '_LayerIndex_' + layerIndex + '_MarkerIndex_'
                            + markerIndex + '_dataIndex_' + dataIndex;
                        var location_1 = (maps.isTileMap) ? convertTileLatLongToPoint(new MapLocation(lng, lat), factor, maps.tileTranslatePoint, true) : convertGeoToPoint(lat, lng, factor, currentLayer, maps);
                        var animate$$1 = currentLayer.animationDuration !== 0 || isNullOrUndefined(maps.zoomModule);
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var translate = (maps.isTileMap) ? (currentLayer.type === 'SubLayer' && isNullOrUndefined(maps.zoomModule)) ? location_1 = convertTileLatLongToPoint(new MapLocation(lng, lat), maps.tileZoomLevel, maps.tileTranslatePoint, true) : new Object() :
                            !isNullOrUndefined(maps.zoomModule) && maps.zoomSettings.zoomFactor > 1 ?
                                getZoomTranslate(maps, currentLayer, animate$$1) :
                                getTranslate(maps, currentLayer, animate$$1);
                        var scale = type === 'AddMarker' ? maps.scale : translate['scale'];
                        var transPoint = type === 'AddMarker' ? maps.translatePoint : translate['location'];
                        if (eventArgs.template && (!isNaN(location_1.x) && !isNaN(location_1.y))) {
                            markerTemplateCount++;
                            markerTemplate(eventArgs, templateFn, markerID, data, markerIndex, markerTemplateEle, location_1, transPoint, scale, offset, maps);
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            maps.renderReactTemplates();
                        }
                        else if (!eventArgs.template && (!isNaN(location_1.x) && !isNaN(location_1.y))) {
                            markerCount++;
                            marker(eventArgs, markerSettings, markerData, dataIndex, location_1, transPoint, markerID, offset, scale, maps, _this.markerSVGObject);
                        }
                    }
                    nullCount += (!isNaN(lat) && !isNaN(lng)) ? 0 : 1;
                    markerTemplateCount += (eventArgs.cancel) ? 1 : 0;
                    markerCount += (eventArgs.cancel) ? 1 : 0;
                    maps.markerNullCount = (isNullOrUndefined(lng) || isNullOrUndefined(lat)) ?
                        maps.markerNullCount + 1 : maps.markerNullCount;
                    var markerDataLength = markerData.length - maps.markerNullCount;
                    if (_this.markerSVGObject.childElementCount === (markerDataLength - markerTemplateCount - nullCount) && (type !== 'Template')) {
                        layerElement.appendChild(_this.markerSVGObject);
                        if (currentLayer.markerClusterSettings.allowClustering) {
                            maps.svgObject.appendChild(_this.markerSVGObject);
                            maps.element.appendChild(maps.svgObject);
                            if ((currentLayer.layerType === 'OSM' || (currentLayer.urlTemplate.indexOf('openstreetmap') !== -1 && isNullOrUndefined(currentLayer.shapeData)))
                                && maps.zoomSettings.enable) {
                                layerElement.appendChild(_this.markerSVGObject);
                            }
                            else {
                                clusterTemplate(currentLayer, _this.markerSVGObject, maps, layerIndex, _this.markerSVGObject, layerElement, true, false);
                            }
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            maps.renderReactTemplates();
                        }
                    }
                    if (markerTemplateEle.childElementCount === (markerDataLength - markerCount - nullCount) && getElementByID(maps.element.id + '_Secondary_Element')) {
                        getElementByID(maps.element.id + '_Secondary_Element').appendChild(markerTemplateEle);
                        if (maps.checkInitialRender) {
                            if (currentLayer.markerClusterSettings.allowClustering) {
                                clusterTemplate(currentLayer, markerTemplateEle, maps, layerIndex, _this.markerSVGObject, layerElement, false, false);
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                maps.renderReactTemplates();
                            }
                        }
                    }
                });
            });
        });
    };
    /**
     * To find zoom level for individual layers like India, USA.
     *
     * @param {number} mapWidth - Specifies the width of the maps
     * @param {number} mapHeight - Specifies the height of the maps
     * @param {number} maxZoomFact - Specifies the maximum zoom factor
     * @returns {number} - Returns the scale factor
     */
    Marker.prototype.calculateIndividualLayerMarkerZoomLevel = function (mapWidth, mapHeight, maxZoomFact) {
        var latZoom;
        var lngZoom;
        var height = Math.abs(this.maps.baseMapBounds.latitude.max - this.maps.baseMapBounds.latitude.min);
        var width = Math.abs(this.maps.baseMapBounds.longitude.max - this.maps.baseMapBounds.longitude.min);
        latZoom = Math.floor(Math.log(mapHeight / height));
        latZoom = (latZoom > maxZoomFact) ? maxZoomFact : latZoom;
        lngZoom = Math.floor(Math.log(mapWidth / width));
        lngZoom = (lngZoom > maxZoomFact) ? maxZoomFact : lngZoom;
        var result = Math.min(latZoom, lngZoom);
        var scaleFactor = Math.min(result, maxZoomFact - 1);
        if (!this.maps.isTileMap) {
            compareZoomFactor(scaleFactor, this.maps);
        }
        return scaleFactor;
    };
    /**
     * To calculate center position and factor value dynamically
     *
     * @param {LayerSettings[]} layersCollection - Specifies the layer settings instance.
     * @returns {void}
     * @private
     */
    Marker.prototype.calculateZoomCenterPositionAndFactor = function (layersCollection) {
        if (!isNullOrUndefined(this.maps)) {
            if (this.maps.zoomSettings.shouldZoomInitially && this.maps.markerModule) {
                var minLong_1;
                var maxLat_1;
                var minLat_1;
                var maxLong_1;
                var zoomLevel = void 0;
                var centerLat = void 0;
                var centerLong = void 0;
                var maxZoomFact = this.maps.zoomSettings.maxZoom;
                var mapWidth = this.maps.mapAreaRect.width;
                var mapHeight = this.maps.mapAreaRect.height;
                this.maps.markerZoomedState = this.maps.markerZoomedState ? this.maps.markerZoomedState :
                    isNullOrUndefined(this.maps.markerZoomFactor) ? !this.maps.markerZoomedState :
                        this.maps.markerZoomFactor > 1 ? this.maps.markerZoomedState : !this.maps.markerZoomedState;
                this.maps.defaultState = this.maps.markerZoomedState ? !this.maps.markerZoomedState : this.maps.defaultState;
                Array.prototype.forEach.call(layersCollection, function (currentLayer) {
                    var isMarker = currentLayer.markerSettings.length !== 0;
                    if (isMarker) {
                        Array.prototype.forEach.call(currentLayer.markerSettings, function (markerSetting) {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            var markerData = markerSetting.dataSource;
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            Array.prototype.forEach.call(markerData, function (data, dataIndex) {
                                var latitude = !isNullOrUndefined(data['latitude']) ? parseFloat(data['latitude']) :
                                    !isNullOrUndefined(data['Latitude']) ? parseFloat(data['Latitude']) : null;
                                var longitude = !isNullOrUndefined(data['longitude']) ? parseFloat(data['longitude']) :
                                    !isNullOrUndefined(data['Longitude']) ? parseFloat(data['Longitude']) : null;
                                minLong_1 = isNullOrUndefined(minLong_1) && dataIndex === 0 ?
                                    longitude : minLong_1;
                                maxLat_1 = isNullOrUndefined(maxLat_1) && dataIndex === 0 ?
                                    latitude : maxLat_1;
                                minLat_1 = isNullOrUndefined(minLat_1) && dataIndex === 0 ?
                                    latitude : minLat_1;
                                maxLong_1 = isNullOrUndefined(maxLong_1) && dataIndex === 0 ?
                                    longitude : maxLong_1;
                                if (minLong_1 > longitude) {
                                    minLong_1 = longitude;
                                }
                                if (minLat_1 > latitude) {
                                    minLat_1 = latitude;
                                }
                                if (maxLong_1 < longitude) {
                                    maxLong_1 = longitude;
                                }
                                if (maxLat_1 < latitude) {
                                    maxLat_1 = latitude;
                                }
                            });
                        });
                    }
                });
                if (!isNullOrUndefined(minLat_1) && !isNullOrUndefined(minLong_1) &&
                    !isNullOrUndefined(maxLong_1) && !isNullOrUndefined(maxLat_1)) {
                    // To find the center position
                    centerLat = (minLat_1 + maxLat_1) / 2;
                    centerLong = (minLong_1 + maxLong_1) / 2;
                    this.maps.markerCenterLatitude = centerLat;
                    this.maps.markerCenterLongitude = centerLong;
                    if (isNullOrUndefined(this.maps.markerZoomCenterPoint) || this.maps.markerZoomedState) {
                        this.maps.markerZoomCenterPoint = {
                            latitude: centerLat,
                            longitude: centerLong
                        };
                    }
                    var markerFactor = void 0;
                    if (this.maps.isTileMap || this.maps.baseMapRectBounds['min']['x'] === 0) {
                        zoomLevel = calculateZoomLevel(minLat_1, maxLat_1, minLong_1, maxLong_1, mapWidth, mapHeight, this.maps, false);
                        if (this.maps.isTileMap) {
                            markerFactor = isNullOrUndefined(this.maps.markerZoomFactor) ?
                                zoomLevel : isNullOrUndefined(this.maps.mapScaleValue) ?
                                zoomLevel : this.maps.mapScaleValue > 1 && this.maps.markerZoomFactor !== 1 ?
                                this.maps.mapScaleValue : zoomLevel;
                        }
                        else {
                            markerFactor = isNullOrUndefined(this.maps.mapScaleValue) ? zoomLevel :
                                (Math.floor(this.maps.scale) !== 1 &&
                                    this.maps.mapScaleValue !== zoomLevel)
                                    &&
                                        (isNullOrUndefined(this.maps.shouldZoomCurrentFactor))
                                    ? this.maps.mapScaleValue : zoomLevel;
                            if (((markerFactor === this.maps.mapScaleValue &&
                                (this.maps.markerZoomFactor === 1 || this.maps.mapScaleValue === 1))
                                && (!this.maps.enablePersistence))) {
                                markerFactor = zoomLevel;
                            }
                        }
                    }
                    else {
                        zoomLevel = this.calculateIndividualLayerMarkerZoomLevel(mapWidth, mapHeight, maxZoomFact);
                        markerFactor = isNullOrUndefined(this.maps.mapScaleValue) ? zoomLevel :
                            (this.maps.mapScaleValue !== zoomLevel)
                                ? this.maps.mapScaleValue : zoomLevel;
                    }
                    this.maps.markerZoomFactor = markerFactor;
                }
            }
            else {
                this.maps.markerZoomedState = false;
                if (this.maps.markerZoomFactor > 1) {
                    this.maps.markerCenterLatitude = null;
                    this.maps.markerCenterLongitude = null;
                    this.maps.markerZoomFactor = 1;
                    if (!this.maps.enablePersistence) {
                        this.maps.mapScaleValue = 1;
                    }
                }
                if (this.maps.isTileMap && !this.maps.enablePersistence
                    && this.maps.mapScaleValue <= 1) {
                    this.maps.tileZoomLevel = this.maps.mapScaleValue === 0 ? (this.maps.isZoomByPosition ? this.maps.tileZoomLevel : 1)
                        : this.maps.mapScaleValue;
                    if (this.maps.mapScaleValue === 1 && this.maps.markerZoomFactor === 1) {
                        this.maps.tileTranslatePoint.x = 0;
                        this.maps.tileTranslatePoint.y = 0;
                    }
                }
            }
        }
    };
    /**
     * To check and trigger marker click event
     * @param {PointerEvent} e - Specifies the pointer event argument.
     * @returns {void}
     * @private
     */
    Marker.prototype.markerClick = function (e) {
        var target = e.target.id;
        if (target.indexOf('_LayerIndex_') === -1 || target.indexOf('_cluster_') > 0) {
            return;
        }
        var options = this.getMarker(target);
        if (isNullOrUndefined(options)) {
            return;
        }
        if (options.marker.enableDrag) {
            document.getElementById(this.maps.element.id + "_svg").style.cursor = 'grabbing';
        }
        var eventArgs = {
            cancel: false, name: markerClick, data: options.data, maps: this.maps,
            marker: options.marker, target: target, x: e.clientX, y: e.clientY,
            latitude: options.data['latitude'] || options.data['Latitude'],
            longitude: options.data['longitude'] || options.data['Longitude'],
            value: options.data['name']
        };
        this.maps.trigger(markerClick, eventArgs);
        if (options.marker.enableDrag) {
            var isCluster = false;
            var layerIndex = parseInt(target.split('_LayerIndex_')[1].split('_')[0], 10);
            var markerIndex = parseInt(target.split('_MarkerIndex_')[1].split('_')[0], 10);
            var dataIndex_1 = parseInt(target.split('_dataIndex_')[1].split('_')[0], 10);
            var marker_1 = this.maps.layers[layerIndex].markerSettings[markerIndex];
            if (this.sameMarkerData.length > 0) {
                isCluster = (this.sameMarkerData[0].data.filter(function (el) { return (el['index'] == dataIndex_1); })).length > 0 &&
                    this.sameMarkerData[0].layerIndex === layerIndex && this.sameMarkerData[0].markerIndex === markerIndex;
            }
            if (!isCluster) {
                var dragEventArgs = {
                    name: markerDragStart, x: e.clientX, y: e.clientY,
                    latitude: options.data['latitude'] || options.data['Latitude'],
                    longitude: options.data['longitude'] || options.data['Longitude'],
                    layerIndex: layerIndex, markerIndex: markerIndex, dataIndex: dataIndex_1
                };
                this.maps.trigger(markerDragStart, dragEventArgs);
                this.maps.markerDragArgument = {
                    targetId: target, x: e.clientX, y: e.clientY,
                    latitude: options.data['latitude'] || options.data['Latitude'],
                    longitude: options.data['longitude'] || options.data['Longitude'],
                    shape: isNullOrUndefined(marker_1.shapeValuePath) ? marker_1.shape : marker_1.dataSource[dataIndex_1][marker_1.shapeValuePath],
                    layerIndex: layerIndex, markerIndex: markerIndex, dataIndex: dataIndex_1
                };
            }
        }
    };
    /**
     * To check and trigger Cluster click event
     * @param {PointerEvent} e - Specifies the pointer event argument.
     * @returns {void}
     * @private
     */
    Marker.prototype.markerClusterClick = function (e) {
        var target = e.target.id;
        if (target.indexOf('_LayerIndex_') === -1 || target.indexOf('_cluster_') === -1) {
            return;
        }
        var options = this.getMarker(target);
        if (isNullOrUndefined(options)) {
            return;
        }
        if ((options.clusterCollection.length > 0 && this.maps.markerClusterExpand)) {
            if (getElement(this.maps.element.id + '_mapsTooltip') &&
                this.maps.mapsTooltipModule.tooltipTargetID.indexOf('_MarkerIndex_') > -1) {
                removeElement(this.maps.element.id + '_mapsTooltip');
            }
            if (this.sameMarkerData.length > 0 && !this.maps.markerClusterExpandCheck) {
                this.maps.markerClusterExpandCheck = true;
                mergeSeparateCluster(this.sameMarkerData, this.maps, this.markerSVGObject);
            }
            else {
                this.sameMarkerData = options.clusterCollection;
                this.maps.markerClusterExpandCheck = false;
                clusterSeparate(this.sameMarkerData, this.maps, this.markerSVGObject, true);
            }
        }
        var eventArgs = {
            cancel: false, name: markerClusterClick, data: options, maps: this.maps,
            target: target, x: e.clientX, y: e.clientY,
            latitude: options.data['latitude'] || options.data['Latitude'], longitude: options.data['longitude'] || options.data['Longitude'],
            markerClusterCollection: options['markCollection']
        };
        this.maps.trigger(markerClusterClick, eventArgs);
    };
    /**
     * To get marker from target id
     *
     * @param {string} target - Specifies the target
     * @returns {string} - Returns the string
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Marker.prototype.getMarker = function (target) {
        var id = target.split('_LayerIndex_');
        var index = parseInt(id[1].split('_')[0], 10);
        var layer = this.maps.layers[index];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var markCollection = [];
        var clusterCollection = [];
        var marker$$1;
        this.maps.markerClusterExpand = layer.markerClusterSettings.allowClusterExpand;
        if (target.indexOf('_MarkerIndex_') > -1) {
            var markerIndex = parseInt(id[1].split('_MarkerIndex_')[1].split('_')[0], 10);
            var dataIndex = parseInt(id[1].split('_dataIndex_')[1].split('_')[0], 10);
            marker$$1 = layer.markerSettings[markerIndex];
            if (!isNaN(markerIndex)) {
                data = marker$$1.dataSource[dataIndex];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var collection_1 = [];
                if (!marker$$1.template && (target.indexOf('_cluster_') > -1) && (this.maps.layers[index].markerClusterSettings.allowClusterExpand)) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    Array.prototype.forEach.call(marker$$1.dataSource, function (location, index) {
                        if (location['latitude'] === data['latitude'] && location['longitude'] === data['longitude']) {
                            collection_1.push({ data: data, index: index });
                        }
                    });
                }
                if ((target.indexOf('_cluster_') > -1)) {
                    var isClusterSame = false;
                    var clusterElement = document.getElementById(target.indexOf('_datalabel_') > -1 ? layer.markerClusterSettings.shape === 'Balloon' ? target.split('_datalabel_')[0] + '_Group' : target.split('_datalabel_')[0] : layer.markerClusterSettings.shape === 'Balloon' ? target + '_Group' : target);
                    var indexes = layer.markerClusterSettings.shape === 'Balloon' ? clusterElement.children[0].textContent.split(',').map(Number) : clusterElement.textContent.split(',').map(Number);
                    collection_1 = [];
                    for (var _i = 0, indexes_1 = indexes; _i < indexes_1.length; _i++) {
                        var i = indexes_1[_i];
                        collection_1.push({ data: marker$$1.dataSource[i], index: i });
                        markCollection.push(marker$$1.dataSource[i]);
                    }
                    isClusterSame = false;
                    clusterCollection.push({
                        data: collection_1, layerIndex: index, markerIndex: markerIndex, dataIndex: dataIndex,
                        targetClusterIndex: +(target.split('_cluster_')[1].indexOf('_datalabel_') > -1 ? target.split('_cluster_')[1].split('_datalabel_')[0] : target.split('_cluster_')[1]),
                        isClusterSame: isClusterSame
                    });
                }
                return { marker: marker$$1, data: data, clusterCollection: clusterCollection, markCollection: markCollection };
            }
        }
        return null;
    };
    /**
     * To check and trigger marker move event
     *
     * @param {PointerEvent} e - Specifies the pointer event argument.
     * @returns {void}
     * @private
     */
    Marker.prototype.markerMove = function (e) {
        var targetId = e.target.id;
        if (targetId.indexOf('_LayerIndex_') === -1 || targetId.indexOf('_cluster_') > 0) {
            return;
        }
        var options = this.getMarker(targetId);
        if (isNullOrUndefined(options)) {
            return;
        }
        if (options.marker.enableDrag) {
            document.getElementById(this.maps.element.id + "_svg").style.cursor = isNullOrUndefined(this.maps.markerDragArgument) ?
                'pointer' : 'grabbing';
        }
        var eventArgs = {
            cancel: false, name: markerMouseMove, data: options.data,
            maps: this.maps, target: targetId, x: e.clientX, y: e.clientY
        };
        this.maps.trigger(markerMouseMove, eventArgs);
    };
    /**
     * To check and trigger cluster move event
     *
     * @param {PointerEvent} e - Specifies the pointer event argument.
     * @returns {void}
     * @private
     */
    Marker.prototype.markerClusterMouseMove = function (e) {
        var targetId = e.target.id;
        if (targetId.indexOf('_LayerIndex_') === -1 || targetId.indexOf('_cluster_') === -1) {
            return;
        }
        var options = this.getMarker(targetId);
        if (this.maps.markerClusterExpand) {
            e.target.style.cursor = 'pointer';
        }
        if (isNullOrUndefined(options)) {
            return;
        }
        var eventArgs = {
            cancel: false, name: markerClusterMouseMove, data: options.data, maps: this.maps,
            target: targetId, x: e.clientX, y: e.clientY
        };
        this.maps.trigger(markerClusterMouseMove, eventArgs);
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name
     */
    Marker.prototype.getModuleName = function () {
        return 'Marker';
    };
    /**
     * To destroy the layers.
     *
     * @returns {void}
     * @private
     */
    Marker.prototype.destroy = function () {
        this.maps = null;
        this.trackElements = [];
        this.markerSVGObject = null;
        this.sameMarkerData = [];
    };
    return Marker;
}());

/**
 * Maps constants doc
 */
/**
 * Specifies the maps load event name.
 *
 * @private
 */
var load = 'load';
/**
 * Specifies the maps loaded event name.
 *
 * @private
 */
var loaded = 'loaded';
/**
 * Specifies the maps click event name.
 *
 * @private
 */
var click = 'click';
/**
 * Specifies the maps onclick event name.
 *
 * @private
 */
var onclick = 'onclick';
/**
 * Specifies the maps right click event name.
 *
 * @private
 */
var rightClick = 'rightClick';
/**
 * Specifies the maps double click event name.
 *
 * @private
 */
var doubleClick = 'doubleClick';
/**
 * Specifies the maps resize event name.
 *
 * @private
 */
var resize = 'resize';
/**
 * Specifies the maps tooltip event name.
 *
 */
var tooltipRender = 'tooltipRender';
/**
 * Specifies the map shape selected event.
 *
 */
var shapeSelected = 'shapeSelected';
/**
 * Specifies the maps shape highlight event.
 *
 */
var shapeHighlight = 'shapeHighlight';
/**
 * Specifies the maps mouse move event name.
 *
 * @private
 */
var mousemove = 'mousemove';
/**
 * Specifies the maps mouse up event name.
 *
 * @private
 */
var mouseup = 'mouseup';
/**
 * Specifies the maps mouse down event name.
 *
 * @private
 */
var mousedown = 'mousedown';
/**
 * Specifies the maps layer rendering event name.
 *
 * @private
 */
var layerRendering = 'layerRendering';
/**
 * Specifies the maps shape rendering event name.
 *
 * @private
 */
var shapeRendering = 'shapeRendering';
/**
 * Specifies the maps marker rendering event name.
 *
 * @private
 */
var markerRendering = 'markerRendering';
/**
 * Specifies the maps cluster rendering event name.
 *
 * @private
 */
var markerClusterRendering = 'markerClusterRendering';
/**
 * Specifies the maps marker click event name.
 *
 * @private
 */
var markerClick = 'markerClick';
/**
 * Specifies the maps marker drag start event name.
 *
 * @private
 */
var markerDragStart = 'markerDragStart';
/**
 * Specifies the maps marker drag end event name.
 *
 * @private
 */
var markerDragEnd = 'markerDragEnd';
/**
 * Specifies the maps cluster click event name.
 *
 * @private
 */
var markerClusterClick = 'markerClusterClick';
/**
 * Specifies the maps marker mouse move event name.
 *
 * @private
 */
var markerMouseMove = 'markerMouseMove';
/**
 * Specifies the maps cluster mouse move event name.
 *
 * @private
 */
var markerClusterMouseMove = 'markerClusterMouseMove';
/**
 * Specifies the maps data label rendering event name.
 *
 * @private
 */
var dataLabelRendering = 'dataLabelRendering';
/**
 * Specifies the maps bubbleRendering event name.
 *
 * @private
 */
var bubbleRendering = 'bubbleRendering';
/**
 * Specifies the maps bubble click event name.
 *
 * @private
 */
var bubbleClick = 'bubbleClick';
/**
 * Specifies the maps bubble mouse move event name.
 *
 * @private
 */
var bubbleMouseMove = 'bubbleMouseMove';
/**
 * Specifies the maps animation complete event name.
 *
 * @private
 */
var animationComplete = 'animationComplete';
/**
 * Specifies the maps legend rendering event name.
 *
 * @private
 */
var legendRendering = 'legendRendering';
/**
 * Specifies the maps annotation rendering event name.
 *
 * @private
 */
var annotationRendering = 'annotationRendering';
/**
 * Specifies the maps item selection event name.
 *
 * @private
 */
var itemSelection = 'itemSelection';
/**
 * Specifies the maps item highlight event name.
 *
 */
var itemHighlight = 'itemHighlight';
/**
 * Specifies the maps before print event name.
 *
 */
var beforePrint = 'beforePrint';
/**
 * Specifies the maps zoom in event name.
 *
 */
var zoomIn = 'zoomIn';
/**
 * Specifies the maps zoom out event name.
 *
 */
var zoomOut = 'zoomOut';
/**
 * Specifies the maps pan event name.
 *
 */
var pan = 'pan';

/**
 * Bing map src doc
 */
var BingMap = /** @__PURE__ @class */ (function () {
    function BingMap(maps) {
        this.maps = maps;
    }
    BingMap.prototype.getBingMap = function (tile, key, type, language, imageUrl, subDomains) {
        var quadKey = '';
        var maxZoom = Math.min(this.maps.tileZoomLevel, parseInt(this.maxZoom, 10));
        for (var i = maxZoom; i > 0; i--) {
            var digit = 0;
            var mask = 1 << (i - 1);
            if ((tile.x & mask) !== 0) {
                digit++;
            }
            if ((tile.y & mask) !== 0) {
                digit += 2;
            }
            quadKey = quadKey + '' + digit;
        }
        if (!isNullOrUndefined(subDomains)) {
            var subDomain = subDomains[Math.min(parseInt(quadKey.substr(quadKey.length - 1, 1), 10), subDomains.length)];
            imageUrl = imageUrl.replace('{quadkey}', quadKey).replace('{subdomain}', subDomain);
            return imageUrl += '&mkt=' + language + '&ur=IN&Key=' + key;
        }
        else {
            return '';
        }
    };
    /**
     * @returns {void}
     * @private
     */
    BingMap.prototype.destroy = function () {
        this.maps = null;
        this.subDomains = [];
    };
    return BingMap;
}());

/**
 * ColorMapping class
 */
var ColorMapping = /** @__PURE__ @class */ (function () {
    function ColorMapping(maps) {
        this.maps = maps;
    }
    /**
     * To get color based on shape settings.
     *
     * @param { ShapeSettingsModel } shapeSettings - Specifies the shape settings.
     * @param { object } layerData - Specifies the layer data.
     * @param { string } color - Specifies the color.
     * @returns {Object} - Returns the object.
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ColorMapping.prototype.getShapeColorMapping = function (shapeSettings, layerData, color) {
        var colorValuePath = shapeSettings.colorValuePath ? shapeSettings.colorValuePath : shapeSettings.valuePath;
        var equalValue = (!isNullOrUndefined(colorValuePath)) ? ((colorValuePath.indexOf('.') > -1) ?
            getValueFromObject(layerData, colorValuePath) : layerData[colorValuePath]) : layerData[colorValuePath];
        var colorValue = Number(equalValue);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var shapeColor = this.getColorByValue(shapeSettings.colorMapping, colorValue, equalValue);
        return !isNullOrUndefined(shapeColor) ? shapeColor : color;
    };
    /**
     * To color by value and color mapping
     *
     * @param {ColorMappingSettingsModel[]} colorMapping - Specifies the color mapping instance.
     * @param {number} colorValue - Specifies the color value
     * @param {string} equalValue - Specifies the equal value.
     * @returns {any} - Returns the color mapping values.
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ColorMapping.prototype.getColorByValue = function (colorMapping, colorValue, equalValue) {
        if (isNaN(colorValue) && isNullOrUndefined(equalValue)) {
            return null;
        }
        var fill = '';
        var opacity;
        var gradientFill;
        for (var _i = 0, colorMapping_1 = colorMapping; _i < colorMapping_1.length; _i++) {
            var colorMap = colorMapping_1[_i];
            if ((!isNullOrUndefined(colorMap.from) && !isNullOrUndefined(colorMap.to)
                && (colorValue >= colorMap.from && colorValue <= colorMap.to)) ||
                (colorMap.value === equalValue)) {
                if (Object.prototype.toString.call(colorMap.color) === '[object Array]') {
                    if (!isNullOrUndefined(colorMap.value)) {
                        fill = colorMap.color[0];
                    }
                    else {
                        gradientFill = this.getColor(colorMap, colorValue);
                        fill = gradientFill;
                    }
                }
                else {
                    fill = colorMap.color;
                }
            }
            if (((colorValue >= colorMap.from && colorValue <= colorMap.to) || (colorMap.value === equalValue))
                && (!isNullOrUndefined(colorMap.minOpacity) && !isNullOrUndefined(colorMap.maxOpacity) && fill)) {
                opacity = this.deSaturationColor(colorMap, fill, colorValue, equalValue);
            }
            if ((fill === '' || isNullOrUndefined(fill)) && isNullOrUndefined(colorMap.from) && isNullOrUndefined(colorMap.to)
                && isNullOrUndefined(colorMap.minOpacity) && isNullOrUndefined(colorMap.maxOpacity) && isNullOrUndefined(colorMap.value)) {
                fill = Object.prototype.toString.call(colorMap.color) === '[object Array]' ? colorMap.color[0] : colorMap.color;
            }
        }
        return { fill: fill || ((!colorMapping.length) ? equalValue : null), opacity: opacity };
    };
    ColorMapping.prototype.deSaturationColor = function (colorMapping, color, rangeValue, equalValue) {
        var opacity = 1;
        if (((rangeValue >= colorMapping.from && rangeValue <= colorMapping.to) || colorMapping.value === equalValue)) {
            var ratio = !isNaN(rangeValue) ? (rangeValue - colorMapping.from) / (colorMapping.to - colorMapping.from) :
                colorMapping.from / (colorMapping.to - colorMapping.from);
            opacity = (ratio * (colorMapping.maxOpacity - colorMapping.minOpacity)) + colorMapping.minOpacity;
        }
        return opacity;
    };
    ColorMapping.prototype.rgbToHex = function (r, g, b) {
        return '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    };
    ColorMapping.prototype.componentToHex = function (value) {
        var hex = value.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    ColorMapping.prototype.getColor = function (colorMap, value) {
        var color = '';
        var rbg;
        if (Number(value) === colorMap.from) {
            color = colorMap.color[0];
        }
        else if (Number(value) === colorMap.to) {
            color = colorMap.color[colorMap.color.length - 1];
        }
        else {
            rbg = this.getGradientColor(Number(value), colorMap);
            color = this.rgbToHex(rbg.r, rbg.g, rbg.b);
        }
        return color;
    };
    ColorMapping.prototype.getGradientColor = function (value, colorMap) {
        var previousOffset = colorMap.from;
        var nextOffset = colorMap.to;
        var percent = 0;
        var full = nextOffset - previousOffset;
        var midColor;
        percent = (value - previousOffset) / full;
        var previousColor;
        var nextColor;
        if (colorMap.color.length <= 2) {
            previousColor = colorMap.color[0].charAt(0) === '#' ? colorMap.color[0] : this._colorNameToHex(colorMap.color[0]);
            nextColor = colorMap.color[colorMap.color.length - 1].charAt(0) === '#' ?
                colorMap.color[colorMap.color.length - 1] : this._colorNameToHex(colorMap.color[colorMap.color.length - 1]);
        }
        else {
            previousColor = colorMap.color[0].charAt(0) === '#' ? colorMap.color[0] : this._colorNameToHex(colorMap.color[0]);
            nextColor = colorMap.color[colorMap.color.length - 1].charAt(0) === '#' ?
                colorMap.color[colorMap.color.length - 1] : this._colorNameToHex(colorMap.color[colorMap.color.length - 1]);
            var a = full / (colorMap.color.length - 1);
            var b = void 0;
            var c = void 0;
            var length_1 = colorMap.color.length - 1;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var splitColorValueOffset = [];
            var splitColor = {};
            for (var j = 1; j < length_1; j++) {
                c = j * a;
                b = previousOffset + c;
                splitColor = { b: b, color: colorMap.color[j] };
                splitColorValueOffset.push(splitColor);
            }
            for (var i = 0; i < splitColorValueOffset.length; i++) {
                if (previousOffset <= value && value <= splitColorValueOffset[i]['b'] && i === 0) {
                    midColor = splitColorValueOffset[i]['color'].charAt(0) === '#' ?
                        splitColorValueOffset[i]['color'] : this._colorNameToHex(splitColorValueOffset[i]['color']);
                    nextColor = midColor;
                    percent = value < splitColorValueOffset[i]['b'] ? 1 - Math.abs((value - splitColorValueOffset[i]['b']) / a)
                        : (value - splitColorValueOffset[i]['b']) / a;
                }
                else if (splitColorValueOffset[i]['b'] <= value && value <= nextOffset && i === (splitColorValueOffset.length - 1)) {
                    midColor = splitColorValueOffset[i]['color'].charAt(0) === '#' ?
                        splitColorValueOffset[i]['color'] : this._colorNameToHex(splitColorValueOffset[i]['color']);
                    previousColor = midColor;
                    percent = value < splitColorValueOffset[i]['b'] ?
                        1 - Math.abs((value - splitColorValueOffset[i]['b']) / a) : (value - splitColorValueOffset[i]['b']) / a;
                }
                if (i !== splitColorValueOffset.length - 1 && i < splitColorValueOffset.length) {
                    if (splitColorValueOffset[i]['b'] <= value && value <= splitColorValueOffset[i + 1]['b']) {
                        midColor = splitColorValueOffset[i]['color'].charAt(0) === '#' ?
                            splitColorValueOffset[i]['color'] : this._colorNameToHex(splitColorValueOffset[i]['color']);
                        previousColor = midColor;
                        nextColor = splitColorValueOffset[i + 1]['color'].charAt(0) === '#' ?
                            splitColorValueOffset[i + 1]['color'] : this._colorNameToHex(splitColorValueOffset[i + 1]['color']);
                        percent = Math.abs((value - splitColorValueOffset[i + 1]['b'])) / a;
                    }
                }
            }
        }
        return this.getPercentageColor(percent, previousColor, nextColor);
    };
    ColorMapping.prototype.getPercentageColor = function (percent, previous, next) {
        var nextColor = next.split('#')[1];
        var prevColor = previous.split('#')[1];
        var r = this.getPercentage(percent, parseInt(prevColor.substr(0, 2), 16), parseInt(nextColor.substr(0, 2), 16));
        var g = this.getPercentage(percent, parseInt(prevColor.substr(2, 2), 16), parseInt(nextColor.substr(2, 2), 16));
        var b = this.getPercentage(percent, parseInt(prevColor.substr(4, 2), 16), parseInt(nextColor.substr(4, 2), 16));
        return new ColorValue(r, g, b);
    };
    ColorMapping.prototype.getPercentage = function (percent, previous, next) {
        var full = next - previous;
        return Math.round((previous + (full * percent)));
    };
    ColorMapping.prototype._colorNameToHex = function (color) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var colors = {
            'aliceblue': '#f0f8ff', 'antiquewhite': '#faebd7', 'aqua': '#00ffff', 'aquamarine': '#7fffd4', 'azure': '#f0ffff',
            'beige': '#f5f5dc', 'bisque': '#ffe4c4', 'black': '#000000', 'blanchedalmond': '#ffebcd', 'blue': '#0000ff',
            'blueviolet': '#8a2be2', 'brown': '#a52a2a', 'burlywood': '#deb887',
            'cadetblue': '#5f9ea0', 'chartreuse': '#7fff00', 'chocolate': '#d2691e', 'coral': '#ff7f50',
            'cornflowerblue': '#6495ed', 'cornsilk': '#fff8dc', 'crimson': '#dc143c', 'cyan': '#00ffff',
            'darkblue': '#00008b', 'darkcyan': '#008b8b', 'darkgoldenrod': '#b8860b', 'darkgray': '#a9a9a9', 'darkgreen': '#006400',
            'darkkhaki': '#bdb76b', 'darkmagenta': '#8b008b', 'darkolivegreen': '#556b2f',
            'darkorange': '#ff8c00', 'darkorchid': '#9932cc', 'darkred': '#8b0000', 'darksalmon': '#e9967a', 'darkseagreen': '#8fbc8f',
            'darkslateblue': '#483d8b', 'darkslategray': '#2f4f4f', 'darkturquoise': '#00ced1',
            'darkviolet': '#9400d3', 'deeppink': '#ff1493', 'deepskyblue': '#00bfff', 'dimgray': '#696969', 'dodgerblue': '#1e90ff',
            'firebrick': '#b22222', 'floralwhite': '#fffaf0', 'forestgreen': '#228b22', 'fuchsia': '#ff00ff',
            'gainsboro': '#dcdcdc', 'ghostwhite': '#f8f8ff', 'gold': '#ffd700', 'goldenrod': '#daa520', 'gray': '#808080',
            'green': '#008000', 'greenyellow': '#adff2f',
            'honeydew': '#f0fff0', 'hotpink': '#ff69b4',
            'indianred ': '#cd5c5c', 'indigo ': '#4b0082', 'ivory': '#fffff0', 'khaki': '#f0e68c',
            'lavender': '#e6e6fa', 'lavenderblush': '#fff0f5', 'lawngreen': '#7cfc00', 'lemonchiffon': '#fffacd', 'lightblue': '#add8e6',
            'lightcoral': '#f08080', 'lightcyan': '#e0ffff', 'lightgoldenrodyellow': '#fafad2',
            'lightgrey': '#d3d3d3', 'lightgreen': '#90ee90', 'lightpink': '#ffb6c1', 'lightsalmon': '#ffa07a', 'lightseagreen': '#20b2aa',
            'lightskyblue': '#87cefa', 'lightslategray': '#778899', 'lightsteelblue': '#b0c4de',
            'lightyellow': '#ffffe0', 'lime': '#00ff00', 'limegreen': '#32cd32', 'linen': '#faf0e6',
            'magenta': '#ff00ff', 'maroon': '#800000', 'mediumaquamarine': '#66cdaa', 'mediumblue': '#0000cd', 'mediumorchid': '#ba55d3',
            'mediumpurple': '#9370d8', 'mediumseagreen': '#3cb371', 'mediumslateblue': '#7b68ee',
            'mediumspringgreen': '#00fa9a', 'mediumturquoise': '#48d1cc', 'mediumvioletred': '#c71585', 'midnightblue': '#191970',
            'mintcream': '#f5fffa', 'mistyrose': '#ffe4e1', 'moccasin': '#ffe4b5',
            'navajowhite': '#ffdead', 'navy': '#000080', 'orchid': '#da70d6', 'papayawhip': '#ffefd5',
            'oldlace': '#fdf5e6', 'olive': '#808000', 'olivedrab': '#6b8e23', 'orange': '#ffa500', 'orangered': '#ff4500',
            'palegoldenrod': '#eee8aa', 'palegreen': '#98fb98', 'paleturquoise': '#afeeee', 'palevioletred': '#d87093',
            'peachpuff': '#ffdab9', 'peru': '#cd853f', 'pink': '#ffc0cb', 'plum': '#dda0dd', 'powderblue': '#b0e0e6', 'purple': '#800080',
            'red': '#ff0000', 'rosybrown': '#bc8f8f', 'royalblue': '#4169e1',
            'saddlebrown': '#8b4513', 'salmon': '#fa8072', 'sandybrown': '#f4a460', 'seagreen': '#2e8b57', 'seashell': '#fff5ee',
            'sienna': '#a0522d', 'silver': '#c0c0c0', 'skyblue': '#87ceeb', 'slateblue': '#6a5acd',
            'slategray': '#708090', 'snow': '#fffafa', 'springgreen': '#00ff7f', 'steelblue': '#4682b4',
            'tan': '#d2b48c', 'teal': '#008080', 'thistle': '#d8bfd8', 'tomato': '#ff6347', 'turquoise': '#40e0d0',
            'violet': '#ee82ee',
            'wheat': '#f5deb3', 'white': '#ffffff', 'whitesmoke': '#f5f5f5',
            'yellow': '#ffff00', 'yellowgreen': '#9acd32'
        };
        if (Object.prototype.toString.call(color) === '[object Array]') {
            return color;
        }
        if (typeof colors[color.toLowerCase()] !== 'undefined') {
            return colors[color.toLowerCase()];
        }
        return color;
    };
    return ColorMapping;
}());

/* eslint-disable no-case-declarations */
/**
 * To calculate and render the shape layer
 */
var LayerPanel = /** @__PURE__ @class */ (function () {
    function LayerPanel(map) {
        this.isMapCoordinates = true;
        this.horizontalPan = false;
        this.horizontalPanXCount = 0;
        this.mapObject = map;
        this.ajaxModule = new Fetch();
        this.ajaxResponse = [];
    }
    LayerPanel.prototype.measureLayerPanel = function () {
        var _this = this;
        var layerCollection = this.mapObject.layersCollection;
        var areaRect = this.mapObject.mapAreaRect;
        var secondaryEle = getElementByID(this.mapObject.element.id + '_Secondary_Element');
        if (this.mapObject.isTileMap && secondaryEle) {
            this.tileSvgObject = this.mapObject.renderer.createSvg({
                id: this.mapObject.element.id + '_Tile_SVG', width: areaRect.width,
                height: areaRect.height
            });
            var parentElement = createElement('div', {
                id: this.mapObject.element.id + '_Tile_SVG_Parent'
            });
            parentElement.style.cssText = 'position: absolute; height: ' + (areaRect.height) + 'px; width: ' +
                (areaRect.width) + 'px;';
            parentElement.appendChild(this.tileSvgObject);
            secondaryEle.appendChild(parentElement);
        }
        this.layerGroup = (this.mapObject.renderer.createGroup({
            id: this.mapObject.element.id + '_Layer_Collections',
            'clip-path': 'url(#' + this.mapObject.element.id + '_MapArea_ClipRect)'
        }));
        if (this.mapObject.layers[this.mapObject.baseLayerIndex].layerType === 'GoogleStaticMap') {
            var staticMapSize = 640;
            this.clipRectElement = this.mapObject.renderer.drawClipPath(new RectOption(this.mapObject.element.id + '_MapArea_ClipRect', 'transparent', { width: 1, color: 'Gray' }, 1, {
                x: ((areaRect.width - staticMapSize) / 2), y: 0,
                width: staticMapSize, height: areaRect.height
            }));
        }
        else {
            this.clipRectElement = this.mapObject.renderer.drawClipPath(new RectOption(this.mapObject.element.id + '_MapArea_ClipRect', 'transparent', { width: 1, color: 'Gray' }, 1, {
                x: this.mapObject.isTileMap ? 0 : areaRect.x, y: this.mapObject.isTileMap ? 0 : areaRect.y,
                width: areaRect.width, height: areaRect.height
            }));
        }
        this.layerGroup.appendChild(this.clipRectElement);
        this.mapObject.baseMapBounds = null;
        this.mapObject.baseMapRectBounds = null;
        this.mapObject.baseSize = null;
        Array.prototype.forEach.call(layerCollection, function (layer, index) {
            _this.currentLayer = layer;
            _this.processLayers(layer, index);
        });
        if (!isNullOrUndefined(this.mapObject.legendModule) && this.mapObject.legendSettings.position === 'Float') {
            if (this.mapObject.isTileMap) {
                this.layerGroup.appendChild(this.mapObject.legendModule.legendGroup);
            }
            else {
                this.mapObject.svgObject.appendChild(this.mapObject.legendModule.legendGroup);
            }
        }
    };
    /**
     * Tile rendering
     *
     * @param {LayerPanel} panel - Specifies the layer panel.
     * @param {LayerSettings} layer - Specifies the layer settings.
     * @param {number} layerIndex - Specifies the layer index.
     * @param {BingMap} bing - Specifies the bing map.
     * @returns {void}
     * @private
     */
    LayerPanel.prototype.renderTileLayer = function (panel, layer, layerIndex, bing) {
        panel.currentFactor = panel.calculateFactor(layer);
        panel.mapObject.defaultState = ((panel.mapObject.zoomSettings.zoomFactor !== 1) &&
            (!isNullOrUndefined(panel.mapObject.tileZoomLevel) && panel.mapObject.tileZoomLevel !== 1)) ?
            false : true;
        if (isNullOrUndefined(panel.mapObject.previousCenterLatitude) &&
            isNullOrUndefined(panel.mapObject.previousCenterLongitude) && !panel.mapObject.isZoomByPosition) {
            panel.mapObject.previousCenterLatitude = panel.mapObject.centerPosition.latitude;
            panel.mapObject.previousCenterLongitude = panel.mapObject.centerPosition.longitude;
        }
        else if ((panel.mapObject.previousCenterLatitude !==
            panel.mapObject.centerPosition.latitude && panel.mapObject.previousCenterLongitude !==
            panel.mapObject.centerPosition.longitude) || panel.mapObject.isZoomByPosition) {
            panel.mapObject.centerPositionChanged = true;
            panel.mapObject.previousCenterLatitude = panel.mapObject.centerPosition.latitude;
            panel.mapObject.previousCenterLongitude = panel.mapObject.centerPosition.longitude;
        }
        else {
            panel.mapObject.centerPositionChanged = false;
        }
        var center = new Point(panel.mapObject.centerPosition.longitude, panel.mapObject.centerPosition.latitude);
        var centerTileMap = center;
        if ((this.mapObject.isTileMap && panel.mapObject.markerModule) && panel.mapObject.zoomSettings.enable) {
            panel.mapObject.markerModule.calculateZoomCenterPositionAndFactor(this.mapObject.layersCollection);
            if (!isNullOrUndefined(this.mapObject.markerCenterLatitude) && !isNullOrUndefined(this.mapObject.markerCenterLongitude)
                && !panel.mapObject.isZoomByPosition) {
                centerTileMap = new Point(panel.mapObject.markerCenterLongitude, panel.mapObject.markerCenterLatitude);
            }
        }
        if (!panel.mapObject.zoomSettings.shouldZoomInitially && panel.mapObject.centerPosition.longitude
            && panel.mapObject.centerPosition.latitude && !panel.mapObject.zoomPersistence && panel.mapObject.defaultState) {
            center = new Point(panel.mapObject.centerPosition.longitude, panel.mapObject.centerPosition.latitude);
        }
        else if (panel.mapObject.zoomSettings.shouldZoomInitially
            && panel.mapObject.markerZoomedState && !panel.mapObject.zoomPersistence
            && !isNullOrUndefined(panel.mapObject.markerZoomCenterPoint)) {
            center = new Point(panel.mapObject.markerZoomCenterPoint.longitude, panel.mapObject.markerZoomCenterPoint.latitude);
        }
        else {
            center = { x: null, y: null };
        }
        var zoomFactorValue = (panel.mapObject.zoomSettings.shouldZoomInitially && !panel.mapObject.isZoomByPosition) ?
            isNullOrUndefined(panel.mapObject.markerZoomFactor) ? 1 :
                panel.mapObject.markerZoomFactor : panel.mapObject.zoomSettings.zoomFactor;
        zoomFactorValue = (panel.mapObject.enablePersistence) ? ((isNullOrUndefined(panel.mapObject.mapScaleValue))
            ? (isNullOrUndefined(panel.mapObject.markerZoomFactor) ? panel.mapObject.zoomSettings.zoomFactor :
                panel.mapObject.markerZoomFactor) : panel.mapObject.mapScaleValue) : zoomFactorValue;
        zoomFactorValue = panel.mapObject.zoomSettings.enable ? zoomFactorValue : panel.mapObject.zoomSettings.zoomFactor;
        zoomFactorValue = zoomFactorValue > 0 ? zoomFactorValue : 1;
        panel.mapObject.defaultState = zoomFactorValue !== 1 ? false : true;
        if (!panel.mapObject.markerZoomedState && panel.mapObject.zoomSettings.shouldZoomInitially &&
            panel.mapObject.zoomSettings.zoomFactor === 1) {
            panel.mapObject.defaultState = true;
        }
        if (isNullOrUndefined(panel.mapObject.tileZoomLevel)) {
            panel.mapObject.tileZoomLevel = zoomFactorValue;
            panel.mapObject.previousZoomFactor = zoomFactorValue;
        }
        else if (this.mapObject.isReset && panel.mapObject.tileZoomLevel === 1 && !panel.mapObject.zoomSettings.shouldZoomInitially) {
            var zoomLevel = panel.mapObject.tileZoomLevel;
            panel.mapObject.tileZoomLevel = zoomLevel;
        }
        else if (panel.mapObject.zoomSettings.zoomFactor !== 1 || panel.mapObject.zoomSettings.shouldZoomInitially) {
            panel.mapObject.previousZoomFactor = panel.mapObject.tileZoomLevel;
            panel.mapObject.tileZoomLevel = panel.mapObject.defaultState && panel.mapObject.zoomSettings.enable ?
                panel.mapObject.tileZoomLevel : !panel.mapObject.zoomSettings.shouldZoomInitially
                && !panel.mapObject.centerPositionChanged ?
                panel.mapObject.previousZoomFactor !== panel.mapObject.zoomSettings.zoomFactor ?
                    panel.mapObject.zoomSettings.zoomFactor : panel.mapObject.tileZoomLevel : zoomFactorValue;
            panel.mapObject.tileZoomLevel = zoomFactorValue === 1 && panel.mapObject.zoomSettings.zoomFactor === 0 ?
                zoomFactorValue : panel.mapObject.tileZoomLevel;
            if (!isNullOrUndefined(panel.mapObject.tileTranslatePoint) &&
                (panel.mapObject.markerZoomFactor !== panel.mapObject.mapScaleValue
                    || (isNullOrUndefined(panel.mapObject.markerZoomFactor)
                        && isNullOrUndefined(panel.mapObject.mapScaleValue)))
                && (panel.mapObject.zoomSettings.zoomFactor <= 1 || panel.mapObject.previousZoomFactor !==
                    panel.mapObject.zoomSettings.zoomFactor)) {
                panel.mapObject.tileTranslatePoint.x = 0;
                panel.mapObject.tileTranslatePoint.y = 0;
            }
        }
        else if (panel.mapObject.defaultState) {
            panel.mapObject.previousZoomFactor = panel.mapObject.tileZoomLevel;
            panel.mapObject.tileZoomLevel = zoomFactorValue;
            panel.mapObject.tileTranslatePoint.x = 0;
            panel.mapObject.tileTranslatePoint.y = 0;
        }
        if (zoomFactorValue <= 1 && !isNullOrUndefined(panel.mapObject.height) && !panel.mapObject.zoomSettings.shouldZoomInitially
            && (panel.mapObject.tileZoomLevel === panel.mapObject.tileZoomScale) && this.mapObject.initialCheck) {
            fixInitialScaleForTile(this.mapObject);
        }
        if (!isNullOrUndefined(panel.mapObject.centerLatOfGivenLocation) && !isNullOrUndefined(panel.mapObject.centerLongOfGivenLocation) &&
            panel.mapObject.zoomNotApplied) {
            centerTileMap.y = panel.mapObject.centerLatOfGivenLocation;
            centerTileMap.x = panel.mapObject.centerLongOfGivenLocation;
            panel.mapObject.tileZoomLevel = panel.mapObject.mapScaleValue = panel.mapObject.scaleOfGivenLocation;
        }
        panel.mapObject.tileTranslatePoint = panel.panTileMap(panel.mapObject.availableSize.width, panel.mapObject.availableSize.height, centerTileMap);
        if (this.mapObject.zoomSettings.resetToInitial && this.mapObject.initialCheck && !isNullOrUndefined(panel.mapObject.height)
            && this.mapObject.availableSize.height > 512) {
            this.mapObject.applyZoomReset = true;
            this.mapObject.initialZoomLevel = Math.floor(this.mapObject.availableSize.height / 512);
            var padding = this.mapObject.layers[this.mapObject.baseLayerIndex].layerType !== 'GoogleStaticMap' ?
                20 : 0;
            var totalSize = Math.pow(2, this.mapObject.initialZoomLevel) * 256;
            this.mapObject.initialTileTranslate.x = (this.mapObject.availableSize.width / 2) - (totalSize / 2);
            this.mapObject.initialTileTranslate.y = (this.mapObject.availableSize.height / 2) - (totalSize / 2) + padding;
        }
        panel.generateTiles(panel.mapObject.tileZoomLevel, panel.mapObject.tileTranslatePoint, null, bing);
        if (!isNullOrUndefined(panel.mapObject.previousZoomFactor)
            && panel.mapObject.previousZoomFactor !== panel.mapObject.zoomSettings.zoomFactor) {
            panel.mapObject.previousZoomFactor = panel.mapObject.zoomSettings.zoomFactor;
        }
        if (panel.mapObject.navigationLineModule) {
            var navigationLineElement = panel.mapObject.navigationLineModule.renderNavigation(panel.currentLayer, panel.mapObject.tileZoomLevel, layerIndex);
            if (!isNullOrUndefined(navigationLineElement)) {
                panel.layerObject.appendChild(navigationLineElement);
            }
        }
        if (panel.mapObject.markerModule) {
            panel.mapObject.markerModule.markerRender(this.mapObject, panel.layerObject, layerIndex, panel.mapObject.tileZoomLevel, null);
        }
        panel.translateLayerElements(panel.layerObject, layerIndex);
        panel.layerGroup.appendChild(panel.layerObject);
    };
    LayerPanel.prototype.processLayers = function (layer, layerIndex) {
        var _this = this;
        this.layerObject = (this.mapObject.renderer.createGroup({
            id: this.mapObject.element.id + '_LayerIndex_' + layerIndex
        }));
        if (!this.mapObject.enablePersistence) {
            var itemName = this.mapObject.getModuleName() + this.mapObject.element.id;
            if (navigator.userAgent.indexOf('Edge') === -1) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var data = void 0;
                try {
                    data = window.localStorage;
                }
                catch (e) {
                    data = null;
                }
                if (!isNullOrUndefined(data) && window.localStorage.getItem(itemName)) {
                    window.localStorage.removeItem(itemName);
                }
            }
        }
        var eventArgs = {
            cancel: false, name: layerRendering, index: layerIndex,
            layer: layer, maps: this.mapObject, visible: layer.visible
        };
        this.mapObject.trigger('layerRendering', eventArgs, function (observedArgs) {
            if (!eventArgs.cancel && eventArgs.visible) {
                if (layer.layerType === 'OSM') {
                    layer.urlTemplate = 'https://a.tile.openstreetmap.org/level/tileX/tileY.png';
                }
                if (layer.layerType === 'Google') {
                    layer.urlTemplate = 'https://mt1.google.com/vt/lyrs=m@129&hl=en&x=tileX&y=tileY&z=level';
                }
                if (layer.layerType !== 'Geometry' || (isNullOrUndefined(layer.shapeData) && !isNullOrUndefined(layer.urlTemplate) && layer.urlTemplate !== '')) {
                    if (layer.layerType !== 'Bing' || _this.bing) {
                        if (!isNullOrUndefined(layer.urlTemplate) && layer.urlTemplate.indexOf('quadkey') > -1) {
                            var bing = new BingMap(_this.mapObject);
                            _this.bingMapCalculation(layer, layerIndex, _this, bing);
                        }
                        else {
                            _this.renderTileLayer(_this, layer, layerIndex);
                        }
                    }
                    else if (layer.key && layer.key.length > 1) {
                        // eslint-disable-next-line @typescript-eslint/no-this-alias
                        var proxy_1 = _this;
                        var bing_1 = new BingMap(_this.mapObject);
                        var bingType = layer.bingMapType === 'AerialWithLabel' ? 'AerialWithLabelsOnDemand' : layer.bingMapType;
                        var url = 'https://dev.virtualearth.net/REST/V1/Imagery/Metadata/' + bingType;
                        var ajax = new Fetch({
                            url: url + '?output=json&include=ImageryProviders&urischeme=https&key=' + layer.key
                        });
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        ajax.onSuccess = function (json) {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            var resource = json['resourceSets'][0]['resources'][0];
                            var imageUrl = resource['imageUrl'];
                            var subDomains = resource['imageUrlSubdomains'];
                            var maxZoom = resource['zoomMax'];
                            if (imageUrl !== null && imageUrl !== undefined && imageUrl !== bing_1.imageUrl) {
                                bing_1.imageUrl = imageUrl;
                            }
                            if (subDomains !== null && subDomains !== undefined && subDomains !== bing_1.subDomains) {
                                bing_1.subDomains = subDomains;
                            }
                            if (maxZoom !== null && maxZoom !== undefined && maxZoom !== bing_1.maxZoom) {
                                bing_1.maxZoom = maxZoom;
                            }
                            proxy_1.mapObject['bingMap'] = bing_1;
                            proxy_1.renderTileLayer(proxy_1, layer, layerIndex, bing_1);
                            _this.mapObject.arrangeTemplate();
                            if (_this.mapObject.zoomModule && (_this.mapObject.previousScale !== _this.mapObject.scale)) {
                                _this.mapObject.zoomModule.applyTransform(_this.mapObject, true);
                            }
                        };
                        ajax.send();
                    }
                }
                else {
                    if (!isNullOrUndefined(layer.shapeData) && (!isNullOrUndefined(layer.shapeData['geometries']) ||
                        !isNullOrUndefined(layer.shapeData['features']))) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var featureData = (!isNullOrUndefined(layer.shapeData['geometries']) &&
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            layer.shapeData['geometries'].length > 0 ? layer.shapeData['geometries'] :
                            layer.shapeData['features']);
                        layer.layerData = [];
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var bbox = layer.shapeData['bbox'];
                        if (!isNullOrUndefined(bbox) && layer.isBaseLayer) {
                            _this.mapObject.baseMapBounds = new GeoLocation({ min: bbox[0][1], max: bbox[1][1] }, { min: bbox[0][0], max: bbox[1][0] });
                        }
                        else if (isNullOrUndefined(_this.mapObject.baseMapBounds) && !isCustomPath(featureData)) {
                            _this.calculateRectBounds(featureData);
                        }
                        _this.calculatePathCollection(layerIndex, featureData);
                    }
                }
            }
        });
        if (!this.mapObject.isTileMap) {
            this.mapObject.svgObject.appendChild(this.layerGroup);
        }
        else if (this.tileSvgObject) {
            this.tileSvgObject.appendChild(this.layerGroup);
            this.mapObject.baseMapBounds = null;
        }
    };
    LayerPanel.prototype.bingMapCalculation = function (layer, layerIndex, proxy, bing) {
        bing.imageUrl = layer.urlTemplate;
        bing.subDomains = ['t0', 't1', 't2', 't3'];
        bing.maxZoom = '21';
        proxy.mapObject['bingMap'] = bing;
        proxy.renderTileLayer(proxy, layer, layerIndex, bing);
        this.mapObject.arrangeTemplate();
        if (this.mapObject.zoomModule && (this.mapObject.previousScale !== this.mapObject.scale)) {
            this.mapObject.zoomModule.applyTransform(this.mapObject, true);
        }
    };
    LayerPanel.prototype.bubbleCalculation = function (bubbleSettings, range) {
        if (bubbleSettings.dataSource != null && bubbleSettings != null) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var bubbleDataSource = bubbleSettings.dataSource;
            for (var i = 0; i < bubbleDataSource.length; i++) {
                var bubbledata = (!isNullOrUndefined(bubbleSettings.valuePath)) ? ((bubbleSettings.valuePath.indexOf('.') > -1) ?
                    Number(getValueFromObject(bubbleSettings.dataSource[i], bubbleSettings.valuePath)) :
                    parseFloat(bubbleSettings.dataSource[i][bubbleSettings.valuePath])) :
                    parseFloat(bubbleSettings.dataSource[i][bubbleSettings.valuePath]);
                if (i !== 0) {
                    if (bubbledata > range.max) {
                        range.max = bubbledata;
                    }
                    else if (bubbledata < range.min) {
                        range.min = bubbledata;
                    }
                }
                else {
                    range.max = range.min = bubbledata;
                }
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LayerPanel.prototype.calculatePathCollection = function (layerIndex, renderData) {
        var _this = this;
        this.groupElements = [];
        if ((!isCustomPath(renderData))) {
            this.currentFactor = this.calculateFactor(this.currentLayer);
        }
        this.rectBounds = null;
        var shapeSettings = this.currentLayer.shapeSettings;
        var bubbleSettings = this.currentLayer.bubbleSettings;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Array.prototype.forEach.call(renderData, function (geometryData, index) {
            if (!isNullOrUndefined(geometryData['geometry']) || !isNullOrUndefined(geometryData['coordinates'])) {
                var type = !isNullOrUndefined(geometryData['geometry']) ? geometryData['geometry']['type'] : geometryData['type'];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var coords = !isNullOrUndefined(geometryData['geometry']) ? geometryData['geometry']['coordinates'] :
                    geometryData['coordinates'];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var data = geometryData['geometry'];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var properties = geometryData['properties'];
                _this.generatePoints(type, coords, data, properties);
            }
        });
        this.currentLayer.rectBounds = this.rectBounds;
        if (isNullOrUndefined(this.mapObject.baseMapRectBounds) && this.currentLayer.isBaseLayer) {
            this.mapObject.baseMapRectBounds = this.rectBounds;
        }
        var colors = shapeSettings.palette.length > 1 ? shapeSettings.palette : getShapeColor(this.mapObject.theme);
        var labelTemplateEle = createElement('div', {
            id: this.mapObject.element.id + '_LayerIndex_' + layerIndex + '_Label_Template_Group',
            className: this.mapObject.element.id + '_template'
        });
        labelTemplateEle.style.cssText = 'pointer-events: none; overflow: hidden; position: absolute;' +
            'top:' + this.mapObject.mapAreaRect.y + 'px;' +
            'left:' + this.mapObject.mapAreaRect.x + 'px;' +
            'height:' + this.mapObject.mapAreaRect.height + 'px;' +
            'width:' + this.mapObject.mapAreaRect.width + 'px;';
        if (this.currentLayer.layerData.length !== 0) {
            var _loop_1 = function (i) {
                var k = void 0;
                var borderValue = {
                    color: shapeSettings.border.color,
                    width: shapeSettings.border.width,
                    opacity: shapeSettings.border.opacity
                };
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var currentShapeData = this_1.currentLayer.layerData[i];
                var pathOptions;
                var circleOptions;
                var groupElement;
                var path = '';
                var fill = (shapeSettings.autofill) ? colors[i % colors.length] :
                    (shapeSettings.fill || this_1.mapObject.themeStyle.shapeFill);
                if (shapeSettings.colorValuePath !== null && !isNullOrUndefined(currentShapeData['property'])) {
                    k = checkShapeDataFields(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    this_1.currentLayer.dataSource, currentShapeData['property'], this_1.currentLayer.shapeDataPath, this_1.currentLayer.shapePropertyPath, this_1.currentLayer);
                    if (k !== null && shapeSettings.colorMapping.length === 0) {
                        fill = ((this_1.currentLayer.shapeSettings.colorValuePath.indexOf('.') > -1) ?
                            (getValueFromObject(this_1.currentLayer.dataSource[k], shapeSettings.colorValuePath)) :
                            this_1.currentLayer.dataSource[k][shapeSettings.colorValuePath]);
                    }
                    else if (currentShapeData['property'][shapeSettings.colorValuePath] &&
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        this_1.currentLayer.dataSource.length === 0 && shapeSettings.colorMapping.length === 0) {
                        fill = ((this_1.currentLayer.shapeSettings.colorValuePath.indexOf('.') > -1) ?
                            (getValueFromObject(currentShapeData['property'], shapeSettings.colorValuePath)) :
                            currentShapeData['property'][shapeSettings.colorValuePath]);
                    }
                    fill = !isNullOrUndefined(fill) ? fill : (shapeSettings.fill || this_1.mapObject.themeStyle.shapeFill);
                }
                var shapeID = this_1.mapObject.element.id + '_LayerIndex_' + layerIndex + '_shapeIndex_' + i + '_dataIndex_' + k;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var getShapeColor_1 = this_1.getShapeColorMapping(this_1.currentLayer, currentShapeData['property'], fill);
                fill = Object.prototype.toString.call(getShapeColor_1) === '[object Object]' && !isNullOrUndefined(getShapeColor_1['fill'])
                    ? getShapeColor_1['fill'] : fill;
                if (this_1.currentLayer.shapeSettings.borderColorValuePath || this_1.currentLayer.shapeSettings.borderWidthValuePath) {
                    k = checkShapeDataFields(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    this_1.currentLayer.dataSource, currentShapeData['property'], this_1.currentLayer.shapeDataPath, this_1.currentLayer.shapePropertyPath, this_1.currentLayer);
                    if (k !== null) {
                        if (this_1.currentLayer.dataSource[k][shapeSettings.borderColorValuePath]) {
                            borderValue.color = this_1.currentLayer.dataSource[k][shapeSettings.borderColorValuePath];
                        }
                        if (this_1.currentLayer.dataSource[k][shapeSettings.borderWidthValuePath]) {
                            borderValue.width = this_1.currentLayer.dataSource[k][shapeSettings.borderWidthValuePath];
                        }
                    }
                }
                var opacity = (Object.prototype.toString.call(getShapeColor_1) === '[object Object]'
                    && !isNullOrUndefined(getShapeColor_1['opacity'])) ? getShapeColor_1['opacity'] : shapeSettings.opacity;
                var eventArgs = {
                    cancel: false, name: shapeRendering, index: i,
                    data: this_1.currentLayer.dataSource ? this_1.currentLayer.dataSource[k] : null,
                    maps: this_1.mapObject,
                    shape: shapeSettings, fill: fill,
                    border: { width: borderValue.width, color: borderValue.color, opacity: borderValue.opacity }
                };
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var shapeRenderingSuccess = function (eventArgs) {
                    var drawingType = !isNullOrUndefined(currentShapeData['_isMultiPolygon'])
                        ? 'MultiPolygon' : isNullOrUndefined(currentShapeData['type']) ? currentShapeData[0]['type'] : currentShapeData['type'];
                    drawingType = (drawingType === 'Polygon' || drawingType === 'MultiPolygon') ? 'Polygon' : drawingType;
                    if (!eventArgs.cancel) {
                        eventArgs.fill = eventArgs.fill === '#A6A6A6' ? eventArgs.shape.fill ||
                            _this.mapObject.themeStyle.shapeFill : eventArgs.fill;
                        eventArgs.border.color = eventArgs.border.color === '#000000' ?
                            eventArgs.shape.border.color : eventArgs.border.color;
                        eventArgs.border.width = eventArgs.border.width === 0 ? eventArgs.shape.border.width : eventArgs.border.width;
                        if (isNullOrUndefined(shapeSettings.borderColorValuePath)) {
                            _this.mapObject.layers[layerIndex].shapeSettings.border.color = eventArgs.border.color;
                        }
                        if (isNullOrUndefined(shapeSettings.borderWidthValuePath)) {
                            _this.mapObject.layers[layerIndex].shapeSettings.border.width = eventArgs.border.width;
                        }
                    }
                    else {
                        eventArgs.fill = fill;
                        eventArgs.border.color = shapeSettings.border.color;
                        eventArgs.border.width = shapeSettings.border.width;
                        _this.mapObject.layers[layerIndex].shapeSettings.border = shapeSettings.border;
                    }
                    eventArgs.border.opacity = isNullOrUndefined(eventArgs.border.opacity) ? opacity : eventArgs.border.opacity;
                    if (_this.groupElements.length < 1) {
                        groupElement = _this.mapObject.renderer.createGroup({
                            id: _this.mapObject.element.id + '_LayerIndex_' + layerIndex + '_' + drawingType + '_Group', transform: ''
                        });
                        _this.groupElements.push(groupElement);
                    }
                    else {
                        for (var i_1 = 0; i_1 < _this.groupElements.length; i_1++) {
                            var ele = _this.groupElements[i_1];
                            if (ele.id.indexOf(drawingType) > -1) {
                                groupElement = ele;
                                break;
                            }
                            else if (i_1 >= _this.groupElements.length - 1) {
                                groupElement = _this.mapObject.renderer.createGroup({
                                    id: _this.mapObject.element.id + '_LayerIndex_' + layerIndex + '_' + drawingType + '_Group'
                                });
                                _this.groupElements.push(groupElement);
                                break;
                            }
                        }
                    }
                    var pathEle;
                    switch (drawingType) {
                        case 'Polygon':
                            if (!currentShapeData['_isMultiPolygon']) {
                                path += 'M' + (currentShapeData[0]['point']['x']) + ' ' + (currentShapeData[0]['point']['y']);
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                currentShapeData.map(function (shapeData) {
                                    path += ' L ' + (shapeData['point']['x']) + ' ' + (shapeData['point']['y']);
                                });
                            }
                            else {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                path = _this.generateMultiPolygonPath(currentShapeData);
                            }
                            path += ' z ';
                            if (path.length > 3) {
                                pathOptions = new PathOption(shapeID, eventArgs.fill, eventArgs.border.width, eventArgs.border.color, opacity, eventArgs.border.opacity, shapeSettings.dashArray, path);
                                pathEle = _this.mapObject.renderer.drawPath(pathOptions);
                            }
                            break;
                        case 'LineString':
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            currentShapeData.map(function (lineData, index) {
                                if (index === 0) {
                                    path += 'M ' + (lineData['point']['x']) + ' ' + (lineData['point']['y']);
                                }
                                else {
                                    path += 'L' + (lineData['point']['x']) + ' , ' + (lineData['point']['y']) + ' ';
                                }
                            });
                            if (path.length > 3) {
                                pathOptions = new PathOption(shapeID, 'transparent', !isNullOrUndefined(eventArgs.border.width) ? eventArgs.border.width : 1, !isNullOrUndefined(eventArgs.fill) ? eventArgs.fill :
                                    eventArgs.border.color, opacity, eventArgs.border.opacity, shapeSettings.dashArray, path);
                                pathEle = _this.mapObject.renderer.drawPath(pathOptions);
                            }
                            break;
                        case 'MultiLineString':
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            currentShapeData.map(function (multilineData) {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                multilineData.map(function (lineData, index) {
                                    if (index === 0) {
                                        path += 'M ' + (lineData['point']['x']) + ' ' + (lineData['point']['y']);
                                    }
                                    else {
                                        path += 'L' + (lineData['point']['x']) + ' , ' + (lineData['point']['y']) + ' ';
                                    }
                                });
                            });
                            if (path.length > 3) {
                                pathOptions = new PathOption(shapeID, 'transparent', !isNullOrUndefined(eventArgs.border.width) ? eventArgs.border.width : 1, !isNullOrUndefined(eventArgs.fill) ? eventArgs.fill :
                                    eventArgs.border.color, opacity, eventArgs.border.opacity, shapeSettings.dashArray, path);
                                pathEle = _this.mapObject.renderer.drawPath(pathOptions);
                            }
                            break;
                        case 'Point':
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            var pointData = currentShapeData['point'];
                            var circleRadius = (_this.mapObject.layers[layerIndex].type !== 'SubLayer') ?
                                shapeSettings.circleRadius : shapeSettings.circleRadius / (_this.mapObject.isTileMap ?
                                _this.mapObject.scale : _this.currentFactor);
                            circleOptions = new CircleOption(shapeID, eventArgs.fill, eventArgs.border, opacity, pointData['x'], pointData['y'], circleRadius, shapeSettings.dashArray);
                            pathEle = _this.mapObject.renderer.drawCircle(circleOptions);
                            break;
                        case 'MultiPoint':
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            currentShapeData.map(function (multiPointData, index) {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                var pointData = multiPointData['point'];
                                var circleRadius = (_this.mapObject.layers[layerIndex].type !== 'SubLayer') ? shapeSettings.circleRadius : shapeSettings.circleRadius / (_this.mapObject.isTileMap ? _this.mapObject.scale : _this.currentFactor);
                                circleOptions = new CircleOption((shapeID + '_multiLine_' + index), eventArgs.fill, eventArgs.border, opacity, pointData['x'], pointData['y'], circleRadius, shapeSettings.dashArray);
                                pathEle = _this.mapObject.renderer.drawCircle(circleOptions);
                                _this.pathAttributeCalculate(groupElement, pathEle, drawingType, currentShapeData, i);
                            });
                            break;
                        case 'Path':
                            path = currentShapeData['point'];
                            pathOptions = new PathOption(shapeID, eventArgs.fill, eventArgs.border.width, eventArgs.border.color, opacity, eventArgs.border.opacity, shapeSettings.dashArray, path);
                            pathEle = _this.mapObject.renderer.drawPath(pathOptions);
                            break;
                    }
                    if (!isNullOrUndefined(pathEle) && drawingType !== 'MultiPoint') {
                        _this.pathAttributeCalculate(groupElement, pathEle, drawingType, currentShapeData, i);
                    }
                    if (i === _this.currentLayer.layerData.length - 1) {
                        _this.layerFeatures(layerIndex, colors, renderData, labelTemplateEle);
                    }
                };
                shapeRenderingSuccess.bind(this_1);
                this_1.mapObject.trigger('shapeRendering', eventArgs, shapeRenderingSuccess);
            };
            var this_1 = this;
            for (var i = 0; i < this.currentLayer.layerData.length; i++) {
                _loop_1(i);
            }
        }
        else {
            this.layerFeatures(layerIndex, colors, renderData, labelTemplateEle);
        }
    };
    /**
     * layer features as bubble, marker, datalabel, navigation line.
     *
     * @param {Element} groupElement - Specifies the element to append the group.
     * @param {Element} pathEle - Specifies the svg element.
     * @param {string} drawingType - Specifies the data type.
     * @param {any} currentShapeData - Specifies the layer of shapedata.
     * @param {number} index - Specifies the tab index.
     * @returns {void}
     */
    LayerPanel.prototype.pathAttributeCalculate = function (groupElement, pathEle, drawingType, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    currentShapeData, index) {
        var property = (Object.prototype.toString.call(this.currentLayer.shapePropertyPath) === '[object Array]' ?
            this.currentLayer.shapePropertyPath : [this.currentLayer.shapePropertyPath]);
        var properties;
        for (var j = 0; j < property.length; j++) {
            if (!isNullOrUndefined(currentShapeData['property'])) {
                properties = property[j];
                break;
            }
        }
        pathEle.setAttribute('aria-label', ((!isNullOrUndefined(currentShapeData['property'])) ?
            (currentShapeData['property'][properties]) : ''));
        if (this.currentLayer.selectionSettings.enable || this.currentLayer.highlightSettings.enable) {
            pathEle.tabIndex = this.mapObject.tabIndex + index + 3;
            pathEle.setAttribute('role', 'button');
            pathEle.style.cursor = this.currentLayer.highlightSettings.enable && !this.currentLayer.selectionSettings.enable ? 'default' : 'pointer';
        }
        else {
            pathEle.setAttribute('role', 'region');
        }
        if (drawingType === 'LineString' || drawingType === 'MultiLineString') {
            pathEle.style.cssText = 'outline:none';
        }
        maintainSelection(this.mapObject.selectedElementId, this.mapObject.shapeSelectionClass, pathEle, 'ShapeselectionMapStyle');
        if (this.mapObject.toggledShapeElementId) {
            for (var j = 0; j < this.mapObject.toggledShapeElementId.length; j++) {
                var styleProperty = this.mapObject.legendSettings.toggleLegendSettings.applyShapeSettings ?
                    this.currentLayer.shapeSettings : this.mapObject.legendSettings.toggleLegendSettings;
                if (this.mapObject.toggledShapeElementId[j] === pathEle.id) {
                    pathEle.setAttribute('fill', styleProperty.fill);
                    pathEle.setAttribute('stroke', styleProperty.border.color);
                    pathEle.setAttribute('fill-opacity', (styleProperty.opacity).toString());
                    pathEle.setAttribute('stroke-opacity', (isNullOrUndefined(styleProperty.border.opacity) ? styleProperty.opacity : styleProperty.border.opacity).toString());
                    pathEle.setAttribute('stroke-width', (isNullOrUndefined(styleProperty.border.width) ? 0 : styleProperty.border.width).toString());
                }
            }
        }
        groupElement.appendChild(pathEle);
    };
    /**
     * layer features as bubble, marker, datalabel, navigation line.
     *
     * @param {number} layerIndex - Specifies the layer index
     * @param {string[]} colors - Specifies the colors
     * @param {Object[]} renderData - Specifies the render data
     * @param {HTMLElement} labelTemplateEle - Specifies the label template element
     * @returns {void}
     */
    LayerPanel.prototype.layerFeatures = function (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    layerIndex, colors, renderData, labelTemplateEle) {
        var _this = this;
        var bubbleG;
        if (this.currentLayer.bubbleSettings.length && this.mapObject.bubbleModule) {
            var length_1 = this.currentLayer.bubbleSettings.length;
            var bubble_1;
            var _loop_2 = function (j) {
                bubble_1 = this_2.currentLayer.bubbleSettings[j];
                bubbleG = this_2.mapObject.renderer.createGroup({
                    id: this_2.mapObject.element.id + '_LayerIndex_' + layerIndex + '_bubble_Group_' + j
                });
                var range = { min: 0, max: 0 };
                this_2.bubbleCalculation(bubble_1, range);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var bubbleDataSource = bubble_1.dataSource;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this_2.mapObject.bubbleModule.bubbleCollection = [];
                bubbleDataSource.map(function (bubbleData, i) {
                    _this.renderBubble(_this.currentLayer, bubbleData, colors[i % colors.length], range, j, i, bubbleG, layerIndex, bubble_1);
                });
                this_2.groupElements.push(bubbleG);
            };
            var this_2 = this;
            for (var j = 0; j < length_1; j++) {
                _loop_2(j);
            }
        }
        if ((this.mapObject.markerModule && !this.mapObject.isTileMap) && this.mapObject.zoomSettings.enable) {
            this.mapObject.markerModule.calculateZoomCenterPositionAndFactor(this.mapObject.layersCollection);
        }
        var group = (this.mapObject.renderer.createGroup({
            id: this.mapObject.element.id + '_LayerIndex_' + layerIndex + '_dataLableIndex_Group'
        }));
        group.style.pointerEvents = 'none';
        if (this.mapObject.dataLabelModule && this.currentLayer.dataLabelSettings.visible) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var intersect_1 = [];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            renderData.map(function (currentShapeData, i) {
                _this.renderLabel(_this.currentLayer, layerIndex, currentShapeData, group, i, labelTemplateEle, intersect_1);
            });
            this.groupElements.push(group);
        }
        if (this.mapObject.navigationLineModule) {
            this.groupElements.push(this.mapObject.navigationLineModule.renderNavigation(this.currentLayer, this.currentFactor, layerIndex));
        }
        this.groupElements.map(function (element) {
            _this.layerObject.appendChild(element);
        });
        if (this.mapObject.markerModule) {
            this.mapObject.markerModule.markerRender(this.mapObject, this.layerObject, layerIndex, (this.mapObject.isTileMap ? Math.floor(this.currentFactor) :
                this.currentFactor), null);
        }
        this.translateLayerElements(this.layerObject, layerIndex);
        this.layerGroup.appendChild(this.layerObject);
    };
    /**
     * render datalabel
     *
     * @param {LayerSettings} layer - Specifies the layer
     * @param {number} layerIndex - Specifies the layer index
     * @param {any[]} shape - Specifies the shape
     * @param {Element} group - Specifies the group
     * @param {number} shapeIndex - Specifies the shape index
     * @param {HTMLElement} labelTemplateEle - Specifies the label template element
     * @param {any[]} intersect - Specifies the intersect
     * @returns {void}
     */
    LayerPanel.prototype.renderLabel = function (layer, layerIndex, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    shape, group, shapeIndex, labelTemplateEle, intersect) {
        this.mapObject.dataLabelModule.renderLabel(layer, layerIndex, shape, layer.layerData, group, labelTemplateEle, shapeIndex, intersect);
    };
    /**
     * To render path for multipolygon
     *
     * @param {any[]} currentShapeData Specifies the current shape data
     * @returns {string} Returns the path
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LayerPanel.prototype.generateMultiPolygonPath = function (currentShapeData) {
        var path = '';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var shape;
        for (var j = 0; j < currentShapeData.length; j++) {
            path += 'M' + (currentShapeData[j][0]['point']['x']) + ' ' + (currentShapeData[j][0]['point']['y']);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            shape = currentShapeData[j];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            shape.map(function (shapeData) {
                path += ' L ' + (shapeData['point']['x']) + ' ' + (shapeData['point']['y']);
            });
        }
        return path;
    };
    /**
     * To render bubble
     *
     * @param {LayerSettings} layer - Specifies the layer
     * @param {object} bubbleData - Specifies the bubble data
     * @param {string} color - Specifies the color
     * @param {number} range - Specifies the range
     * @param {number} bubbleIndex - Specifies the bubble index
     * @param {number} dataIndex - Specifies the data index
     * @param {number} group - Specifies the group
     * @param {number} layerIndex - Specifies the layer index
     * @param {BubbleSettingsModel} bubbleSettings - Specifies the bubble settings
     * @returns {void}
     */
    LayerPanel.prototype.renderBubble = function (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    layer, bubbleData, color, range, bubbleIndex, dataIndex, group, layerIndex, bubbleSettings) {
        if (isNullOrUndefined(this.mapObject.bubbleModule) || !bubbleSettings.visible) {
            return null;
        }
        color = bubbleSettings.fill ? bubbleSettings.fill : color;
        this.mapObject.bubbleModule.id = this.mapObject.element.id + '_LayerIndex_' + layerIndex + '_BubbleIndex_' +
            bubbleIndex + '_dataIndex_' + dataIndex;
        this.mapObject.bubbleModule.renderBubble(bubbleSettings, bubbleData, color, range, bubbleIndex, dataIndex, layerIndex, layer, group, this.mapObject.bubbleModule.id);
    };
    /**
     * To get the shape color from color mapping module
     *
     * @param {LayerSettingsModel} layer - Specifies the layer
     * @param {object} shape - Specifies the shape
     * @param {string} color - Specifies the color
     * @returns {Object} - Returns the object
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LayerPanel.prototype.getShapeColorMapping = function (layer, shape, color) {
        color = color ? color : layer.shapeSettings.fill;
        if (layer.shapeSettings.colorMapping.length === 0 && isNullOrUndefined(layer.dataSource)) {
            return color;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var index = checkShapeDataFields(layer.dataSource, shape, layer.shapeDataPath, layer.shapePropertyPath, layer);
        var colorMapping = new ColorMapping(this.mapObject);
        if (isNullOrUndefined(layer.dataSource[index])) {
            return color;
        }
        return colorMapping.getShapeColorMapping(layer.shapeSettings, layer.dataSource[index], color);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LayerPanel.prototype.generatePoints = function (type, coordinates, data, properties) {
        var _this = this;
        var latitude;
        var longitude;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var newData = [];
        switch (type.toLowerCase()) {
            case 'polygon':
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                newData = this.calculatePolygonBox(coordinates[0], data, properties);
                if (newData.length > 0) {
                    newData['property'] = properties;
                    newData['type'] = type;
                    newData['_isMultiPolygon'] = false;
                    this.currentLayer.layerData.push(newData);
                }
                break;
            case 'multipolygon':
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var multiPolygonDatas = [];
                for (var i = 0; i < coordinates.length; i++) {
                    for (var j = 0; j < coordinates[i].length; j++) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        newData = this.calculatePolygonBox(coordinates[i][j], data, properties);
                        if (newData.length > 0) {
                            multiPolygonDatas.push(newData);
                        }
                    }
                }
                multiPolygonDatas['property'] = properties;
                multiPolygonDatas['type'] = type;
                multiPolygonDatas['_isMultiPolygon'] = true;
                this.currentLayer.layerData.push(multiPolygonDatas);
                break;
            case 'linestring':
                var lineExtraSpace_1 = !isNullOrUndefined(this.currentLayer.shapeSettings.border.width) ?
                    (typeof (this.currentLayer.shapeSettings.border.width) === 'string' ?
                        parseInt(this.currentLayer.shapeSettings.border.width, 10) : this.currentLayer.shapeSettings.border.width) : 1;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                coordinates.map(function (points) {
                    latitude = points[1];
                    longitude = points[0];
                    var point = convertGeoToPoint(latitude, longitude, _this.currentFactor, _this.currentLayer, _this.mapObject);
                    _this.calculateBox(point, lineExtraSpace_1);
                    newData.push({
                        point: point, lat: latitude, lng: longitude
                    });
                });
                newData['property'] = properties;
                newData['type'] = type;
                this.currentLayer.layerData.push(newData);
                break;
            case 'multilinestring':
                var extraSpaces_1 = !isNullOrUndefined(this.currentLayer.shapeSettings.border.width) ?
                    (typeof (this.currentLayer.shapeSettings.border.width) === 'string' ?
                        parseInt(this.currentLayer.shapeSettings.border.width, 10) : this.currentLayer.shapeSettings.border.width) : 1;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var multiLineData_1 = [];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                coordinates.map(function (multiPoints) {
                    newData = [];
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    multiPoints.map(function (points) {
                        latitude = points[1];
                        longitude = points[0];
                        var point = convertGeoToPoint(latitude, longitude, _this.currentFactor, _this.currentLayer, _this.mapObject);
                        _this.calculateBox(point, extraSpaces_1);
                        newData.push({
                            point: point, lat: latitude, lng: longitude
                        });
                    });
                    multiLineData_1.push(newData);
                });
                multiLineData_1['property'] = properties;
                multiLineData_1['type'] = type;
                this.currentLayer.layerData.push(multiLineData_1);
                break;
            case 'point':
                var pointExtraSpace = (!isNullOrUndefined(this.currentLayer.shapeSettings.border.width) ?
                    (typeof (this.currentLayer.shapeSettings.border.width) === 'string' ?
                        parseInt(this.currentLayer.shapeSettings.border.width, 10) : this.currentLayer.shapeSettings.border.width) : 1) +
                    (this.currentLayer.shapeSettings.circleRadius * 2);
                latitude = coordinates[1];
                longitude = coordinates[0];
                var point = convertGeoToPoint(latitude, longitude, this.currentFactor, this.currentLayer, this.mapObject);
                this.calculateBox(point, pointExtraSpace);
                this.currentLayer.layerData.push({
                    point: point, type: type, lat: latitude, lng: longitude, property: properties
                });
                break;
            case 'multipoint':
                var extraSpace_1 = (!isNullOrUndefined(this.currentLayer.shapeSettings.border.width) ?
                    (typeof (this.currentLayer.shapeSettings.border.width) === 'string' ?
                        parseInt(this.currentLayer.shapeSettings.border.width, 10) : this.currentLayer.shapeSettings.border.width) : 1) +
                    (this.currentLayer.shapeSettings.circleRadius * 2);
                newData = [];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                coordinates.map(function (points) {
                    latitude = points[1];
                    longitude = points[0];
                    var point = convertGeoToPoint(latitude, longitude, _this.currentFactor, _this.currentLayer, _this.mapObject);
                    _this.calculateBox(point, extraSpace_1);
                    newData.push({
                        point: point, lat: latitude, lng: longitude
                    });
                });
                newData['property'] = properties;
                newData['type'] = type;
                this.currentLayer.layerData.push(newData);
                break;
            case 'path':
                this.currentLayer.layerData.push({
                    point: data['d'], type: type, property: properties
                });
                break;
        }
    };
    LayerPanel.prototype.calculateBox = function (point, extraSpace) {
        if (isNullOrUndefined(this.rectBounds)) {
            this.rectBounds = { min: { x: point.x - extraSpace, y: point.y - extraSpace }, max: { x: point.x + extraSpace,
                    y: point.y + extraSpace } };
        }
        else {
            this.rectBounds['min']['x'] = Math.min(this.rectBounds['min']['x'], point.x - extraSpace);
            this.rectBounds['min']['y'] = Math.min(this.rectBounds['min']['y'], point.y - extraSpace);
            this.rectBounds['max']['x'] = Math.max(this.rectBounds['max']['x'], point.x + extraSpace);
            this.rectBounds['max']['y'] = Math.max(this.rectBounds['max']['y'], point.y + extraSpace);
        }
    };
    LayerPanel.prototype.calculateFactor = function (layer) {
        var horFactor;
        var verFactor = 1;
        var divide = 10;
        var exp = 'e+1';
        var bounds = this.mapObject.baseMapBounds;
        var mapSize = new Size(this.mapObject.mapAreaRect.width, this.mapObject.mapAreaRect.height - 5);
        var mapHeight;
        var mapWidth;
        if (bounds) {
            var start = convertGeoToPoint(bounds.latitude.min, bounds.longitude.min, null, layer, this.mapObject);
            var end = convertGeoToPoint(bounds.latitude.max, bounds.longitude.max, null, layer, this.mapObject);
            mapHeight = end.y - start.y;
            mapWidth = end.x - start.x;
            if (mapHeight === 0 || mapWidth === 0) {
                mapWidth = mapSize.width / 2;
                mapHeight = mapSize.height;
            }
        }
        else {
            mapHeight = mapWidth = 500;
        }
        if (mapHeight < mapSize.height) {
            horFactor = parseFloat(Math.abs(Number(mapSize.height / Number(mapHeight.toString() + exp)) * 100).toString().split('.')[0])
                / divide;
        }
        else {
            horFactor = mapSize.height / mapHeight;
        }
        if (mapWidth < mapSize.width) {
            verFactor = parseFloat(Math.abs(Number(mapSize.width / Number(mapWidth.toString() + exp)) * 100).toString().split('.')[0])
                / divide;
        }
        else {
            verFactor = mapSize.width / mapWidth;
        }
        return (Math.min(verFactor, horFactor));
    };
    LayerPanel.prototype.translateLayerElements = function (layerElement, index) {
        var childNode;
        this.mapObject.translateType = 'layer';
        if (!isNullOrUndefined(this.mapObject.baseMapRectBounds)) {
            var duration = this.currentLayer.animationDuration;
            var animate$$1 = duration !== 0 || isNullOrUndefined(this.mapObject.zoomModule);
            this.mapObject.baseTranslatePoint = this.mapObject.zoomTranslatePoint;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var translate = void 0;
            if (this.mapObject.zoomSettings.zoomFactor > 1 && !isNullOrUndefined(this.mapObject.zoomModule)) {
                translate = getZoomTranslate(this.mapObject, this.currentLayer, animate$$1);
            }
            else {
                translate = getTranslate(this.mapObject, this.currentLayer, animate$$1);
            }
            var scale = this.mapObject.previousScale = translate['scale'];
            var location_1 = this.mapObject.previousPoint = translate['location'];
            this.mapObject.baseTranslatePoint = this.mapObject.translatePoint = location_1;
            this.mapObject.baseScale = this.mapObject.scale = scale;
            for (var i = 0; i < layerElement.childElementCount; i++) {
                childNode = layerElement.childNodes[i];
                if (!(childNode.id.indexOf('_Markers_Group') > -1) &&
                    (!(childNode.id.indexOf('_bubble_Group') > -1)) &&
                    (!(childNode.id.indexOf('_dataLableIndex_Group') > -1))) {
                    var transform = 'scale( ' + scale + ' ) '
                        + 'translate( ' + location_1.x + ' ' + location_1.y + ' ) ';
                    childNode.setAttribute('transform', transform);
                    if (duration > 0 && !isNullOrUndefined(this.mapObject.zoomModule)) {
                        if (this.mapObject.zoomSettings.zoomFactor > 1) {
                            translate = getZoomTranslate(this.mapObject, this.currentLayer);
                        }
                        else {
                            translate = getTranslate(this.mapObject, this.currentLayer);
                        }
                        this.mapObject.scale = translate['scale'];
                        this.mapObject.zoomTranslatePoint = this.mapObject.translatePoint = translate['location'];
                    }
                }
            }
        }
        else if (this.mapObject.isTileMap && !isNullOrUndefined(this.mapObject.scale)) {
            for (var j = 0; j < layerElement.childElementCount; j++) {
                childNode = layerElement.childNodes[j];
                if (!(childNode.id.indexOf('_Markers_Group') > -1) &&
                    (!(childNode.id.indexOf('_bubble_Group') > -1)) &&
                    (!(childNode.id.indexOf('_dataLableIndex_Group') > -1)) &&
                    (!(childNode.id.indexOf('_line_Group') > -1))) {
                    var transform = 'scale( ' + this.mapObject.scale + ' ) ' + 'translate( ' + this.mapObject.translatePoint.x
                        + ' ' + this.mapObject.translatePoint.y + ' ) ';
                    childNode.setAttribute('transform', transform);
                }
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LayerPanel.prototype.calculateRectBounds = function (layerData) {
        var _this = this;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Array.prototype.forEach.call(layerData, function (obj, index) {
            if (!isNullOrUndefined(obj['geometry']) || !isNullOrUndefined(obj['coordinates'])) {
                var type = !isNullOrUndefined(obj['geometry']) ? obj['geometry']['type'] : obj['type'];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var coordinates = !isNullOrUndefined(obj['geometry']) ? obj['geometry']['coordinates'] : obj['coordinates'];
                switch (type.toLowerCase()) {
                    case 'polygon':
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        _this.calculateRectBox(coordinates[0]);
                        break;
                    case 'multipolygon':
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        coordinates.map(function (point, index) {
                            _this.calculateRectBox(point[0]);
                        });
                        break;
                    case 'multilinestring':
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        coordinates.map(function (multiPoint, index) {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            multiPoint.map(function (point, index) {
                                _this.calculateRectBox(point, 'multilinestring', index === 0 ? true : false);
                            });
                        });
                        break;
                    case 'linestring':
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        coordinates.map(function (point, index) {
                            _this.calculateRectBox(point, 'linestring', index === 0 ? true : false);
                        });
                        break;
                    case 'point':
                        _this.calculateRectBox(coordinates, 'point');
                        break;
                    case 'multipoint':
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        coordinates.map(function (point, index) {
                            _this.calculateRectBox(point, 'multipoint', index === 0 ? true : false);
                        });
                        break;
                }
            }
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LayerPanel.prototype.calculatePolygonBox = function (coordinates, data, properties) {
        var _this = this;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var newData = [];
        var bounds = this.mapObject.baseMapBounds;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        coordinates.map(function (currentPoint) {
            var latitude = currentPoint[1];
            var longitude = currentPoint[0];
            if ((longitude >= bounds.longitude.min && longitude <= bounds.longitude.max)
                && (latitude >= bounds.latitude.min && latitude <= bounds.latitude.max)) {
                var point = convertGeoToPoint(latitude, longitude, _this.currentFactor, _this.currentLayer, _this.mapObject);
                if (isNullOrUndefined(_this.rectBounds)) {
                    _this.rectBounds = { min: { x: point.x, y: point.y }, max: { x: point.x, y: point.y } };
                }
                else {
                    _this.rectBounds['min']['x'] = Math.min(_this.rectBounds['min']['x'], point.x);
                    _this.rectBounds['min']['y'] = Math.min(_this.rectBounds['min']['y'], point.y);
                    _this.rectBounds['max']['x'] = Math.max(_this.rectBounds['max']['x'], point.x);
                    _this.rectBounds['max']['y'] = Math.max(_this.rectBounds['max']['y'], point.y);
                }
                newData.push({
                    point: point,
                    lat: latitude,
                    lng: longitude
                });
            }
        });
        return newData;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LayerPanel.prototype.calculateRectBox = function (coordinates, type, isFirstItem) {
        var _this = this;
        if ((type !== 'linestring' && type !== 'multilinestring') && (type !== 'point' && type !== 'multipoint')) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Array.prototype.forEach.call(coordinates, function (currentCoords) {
                if (isNullOrUndefined(_this.mapObject.baseMapBounds)) {
                    _this.mapObject.baseMapBounds = new GeoLocation({ min: currentCoords[1], max: currentCoords[1] }, { min: currentCoords[0], max: currentCoords[0] });
                }
                else {
                    _this.mapObject.baseMapBounds.latitude.min = Math.min(_this.mapObject.baseMapBounds.latitude.min, currentCoords[1]);
                    _this.mapObject.baseMapBounds.latitude.max = Math.max(_this.mapObject.baseMapBounds.latitude.max, currentCoords[1]);
                    _this.mapObject.baseMapBounds.longitude.min = Math.min(_this.mapObject.baseMapBounds.longitude.min, currentCoords[0]);
                    _this.mapObject.baseMapBounds.longitude.max = Math.max(_this.mapObject.baseMapBounds.longitude.max, currentCoords[0]);
                }
            });
        }
        else {
            if ((isFirstItem || type === 'point') && isNullOrUndefined(this.mapObject.baseMapBounds)) {
                this.mapObject.baseMapBounds = new GeoLocation({ min: coordinates[1], max: coordinates[1] }, { min: coordinates[0], max: coordinates[0] });
            }
            else {
                this.mapObject.baseMapBounds.latitude.min = Math.min(this.mapObject.baseMapBounds.latitude.min, coordinates[1]);
                this.mapObject.baseMapBounds.latitude.max = Math.max(this.mapObject.baseMapBounds.latitude.max, coordinates[1]);
                this.mapObject.baseMapBounds.longitude.min = Math.min(this.mapObject.baseMapBounds.longitude.min, coordinates[0]);
                this.mapObject.baseMapBounds.longitude.max = Math.max(this.mapObject.baseMapBounds.longitude.max, coordinates[0]);
            }
        }
    };
    LayerPanel.prototype.generateTiles = function (zoomLevel, tileTranslatePoint, zoomType, bing, position) {
        var userLang = this.mapObject.locale;
        var size = this.mapObject.availableSize;
        this.tiles = [];
        var xcount;
        var ycount;
        xcount = ycount = Math.pow(2, zoomLevel);
        var xLeft = 0;
        var xRight = 0;
        if ((tileTranslatePoint.x + (xcount * 256)) < size.width) {
            xLeft = tileTranslatePoint.x > 0 ? Math.ceil(tileTranslatePoint.x / 256) : 0;
            xRight = ((tileTranslatePoint.x + xcount * 256) < size.width) ?
                Math.ceil((size.width - (tileTranslatePoint.x + xcount * 256)) / 256) : 0;
        }
        xcount += xLeft + xRight;
        if (zoomType === 'Pan') {
            xcount = (this.horizontalPanXCount >= xcount) ? this.horizontalPanXCount : xcount;
            this.horizontalPan = false;
        }
        else {
            this.horizontalPanXCount = xcount;
            this.horizontalPan = true;
        }
        var baseLayer = this.mapObject.layers[this.mapObject.baseLayerIndex];
        this.urlTemplate = baseLayer.urlTemplate;
        var endY = Math.min(ycount, ((-tileTranslatePoint.y + size.height) / 256) + 1);
        var endX = Math.min(xcount, ((-tileTranslatePoint.x + size.width + (xRight * 256)) / 256) + 1);
        var startX = (-((tileTranslatePoint.x + (xLeft * 256)) + 256) / 256);
        var startY = (-(tileTranslatePoint.y + 256) / 256);
        bing = bing || this.bing || this.mapObject['bingMap'];
        for (var i = Math.round(startX); i < Math.round(endX); i++) {
            for (var j = Math.round(startY); j < Math.round(endY); j++) {
                var x = 256 * i + tileTranslatePoint.x;
                var y = 256 * j + tileTranslatePoint.y;
                if (x > -256 && x <= size.width && y > -256 && y < size.height) {
                    if (j >= 0) {
                        var tileI = i;
                        if (i < 0) {
                            tileI = (tileI % ycount) + ycount;
                        }
                        var tile = new Tile(tileI % ycount, j);
                        tile.left = Math.round(x);
                        tile.top = Math.round(y);
                        if (baseLayer.layerType === 'Bing' || (bing && !isNullOrUndefined(baseLayer.urlTemplate) && baseLayer.urlTemplate !== '')) {
                            var key = baseLayer.key;
                            tile.src = bing.getBingMap(tile, key, baseLayer.bingMapType, userLang, bing.imageUrl, bing.subDomains);
                        }
                        else {
                            tile.src = this.urlTemplate.replace('level', zoomLevel.toString()).replace('tileX', tile.x.toString())
                                .replace('tileY', tile.y.toString());
                        }
                        this.tiles.push(tile);
                    }
                }
            }
        }
        if (!isNullOrUndefined(zoomType)) {
            if (zoomType.indexOf('wheel') > 1) {
                this.animateToZoomX = (this.mapObject.availableSize.width / 2) - position.x - 10;
                this.animateToZoomY = -position.y;
            }
            else {
                this.animateToZoomX = -10;
                this.animateToZoomY = -(this.mapObject.availableSize.height / 2 + 11.5) + 10;
            }
        }
        var proxTiles = extend([], this.tiles, [], true);
        for (var _i = 0, _a = this.mapObject.layers; _i < _a.length; _i++) {
            var layer = _a[_i];
            if (!(layer.type === 'SubLayer' && layer.visible)) {
                continue;
            }
            if ((layer.layerType !== 'Geometry' && layer.layerType !== 'GoogleStaticMap') || (layer.layerType === 'Geometry' &&
                isNullOrUndefined(layer.shapeData) && !isNullOrUndefined(layer.urlTemplate) && layer.urlTemplate !== '')) {
                for (var _b = 0, proxTiles_1 = proxTiles; _b < proxTiles_1.length; _b++) {
                    var baseTile = proxTiles_1[_b];
                    var subtile = extend({}, baseTile, {}, true);
                    if (layer.layerType === 'Bing') {
                        bing = new BingMap(this.mapObject);
                        subtile.src = bing.getBingMap(subtile, layer.key, layer.bingMapType, userLang, bing.imageUrl, bing.subDomains);
                    }
                    else {
                        subtile.src = layer.urlTemplate.replace('level', zoomLevel.toString()).replace('tileX', baseTile.x.toString())
                            .replace('tileY', baseTile.y.toString());
                    }
                    this.tiles.push(subtile);
                }
            }
        }
        if (this.mapObject.previousScale !== this.mapObject.scale || this.mapObject.isReset || this.mapObject.isZoomByPosition
            || this.mapObject.zoomNotApplied) {
            this.arrangeTiles(zoomType, this.animateToZoomX, this.animateToZoomY);
        }
    };
    LayerPanel.prototype.arrangeTiles = function (type, x, y) {
        var _this = this;
        var element = document.getElementById(this.mapObject.element.id + '_tile_parent');
        var element1 = document.getElementById(this.mapObject.element.id + '_tiles');
        var timeOut;
        if (!isNullOrUndefined(type) && type !== 'Pan') {
            this.tileAnimation(type, x, y);
            timeOut = this.mapObject.layersCollection[0].animationDuration;
        }
        else {
            timeOut = 0;
        }
        if (this.mapObject.layers[this.mapObject.baseLayerIndex].layerType === 'GoogleStaticMap') {
            this.renderGoogleMap(this.mapObject.layers[0].key, this.mapObject.staticMapZoom);
        }
        else {
            setTimeout(function () {
                if (element) {
                    element.style.zIndex = '1';
                }
                if (element1) {
                    element1.style.zIndex = '0';
                }
                var animateElement;
                if (!document.getElementById(_this.mapObject.element.id + '_animated_tiles') && element) {
                    animateElement = createElement('div', { id: _this.mapObject.element.id + '_animated_tiles' });
                    element.appendChild(animateElement);
                }
                else {
                    if (type !== 'Pan' && element1 && element) {
                        element1.appendChild(element.children[0]);
                        if (!_this.mapObject.isAddLayer && !isNullOrUndefined(document.getElementById(_this.mapObject.element.id + '_animated_tiles'))) {
                            document.getElementById(_this.mapObject.element.id + '_animated_tiles').id =
                                _this.mapObject.element.id + '_animated_tiles_old';
                        }
                        animateElement = createElement('div', { id: _this.mapObject.element.id + '_animated_tiles' });
                        element.appendChild(animateElement);
                    }
                    else {
                        animateElement = element ? element.children[0] : null;
                    }
                }
                for (var id = 0; id < _this.tiles.length; id++) {
                    var tile = _this.tiles[id];
                    var imgElement = null;
                    var mapId = _this.mapObject.element.id;
                    if (type === 'Pan') {
                        var child = document.getElementById(mapId + '_tile_' + id);
                        var isNewTile = false;
                        if (isNullOrUndefined(child)) {
                            isNewTile = true;
                            child = createElement('div', { id: mapId + '_tile_' + id });
                            imgElement = createElement('img');
                        }
                        else {
                            child.style.removeProperty('display');
                            imgElement = child.children[0];
                        }
                        if (!isNewTile && imgElement && imgElement.src !== tile.src) {
                            imgElement.src = tile.src;
                        }
                        child.style.position = 'absolute';
                        child.style.left = tile.left + 'px';
                        child.style.top = tile.top + 'px';
                        child.style.height = tile.height + 'px';
                        child.style.width = tile.width + 'px';
                        if (isNewTile) {
                            imgElement.setAttribute('height', '256px');
                            imgElement.setAttribute('width', '256px');
                            imgElement.setAttribute('src', tile.src);
                            imgElement.setAttribute('alt', _this.mapObject.getLocalizedLabel('ImageNotFound'));
                            imgElement.style.setProperty('user-select', 'none');
                            child.appendChild(imgElement);
                            animateElement.appendChild(child);
                        }
                    }
                    else {
                        imgElement = createElement('img');
                        imgElement.setAttribute('height', '256px');
                        imgElement.setAttribute('width', '256px');
                        imgElement.setAttribute('src', tile.src);
                        imgElement.style.setProperty('user-select', 'none');
                        imgElement.setAttribute('alt', _this.mapObject.getLocalizedLabel('ImageNotFound'));
                        var child = createElement('div', { id: mapId + '_tile_' + id });
                        child.style.position = 'absolute';
                        child.style.left = tile.left + 'px';
                        child.style.top = tile.top + 'px';
                        child.style.height = tile.height + 'px';
                        child.style.width = tile.width + 'px';
                        child.appendChild(imgElement);
                        if (animateElement) {
                            animateElement.appendChild(child);
                        }
                    }
                    if (id === (_this.tiles.length - 1) && document.getElementById(_this.mapObject.element.id + '_animated_tiles_old')) {
                        removeElement(_this.mapObject.element.id + '_animated_tiles_old');
                    }
                }
                if (!isNullOrUndefined(_this.mapObject.currentTiles)) {
                    for (var l = _this.tiles.length; l < animateElement.childElementCount; l++) {
                        var isExistingElement = false;
                        for (var a = 0; a < _this.mapObject.currentTiles.childElementCount; a++) {
                            if (!isExistingElement &&
                                _this.mapObject.currentTiles.children[a].id === animateElement.children[l].id) {
                                isExistingElement = true;
                            }
                        }
                        if (isExistingElement) {
                            animateElement.children[l].style.display = 'none';
                        }
                        else {
                            animateElement.removeChild(animateElement.children[l]);
                        }
                    }
                }
            }, timeOut);
        }
    };
    /**
     * Animation for tile layers and hide the group element until the tile layer rendering
     *
     * @param {string} zoomType - Specifies the zoom type
     * @param {number} translateX - Specifies the x translate point
     * @param {number} translateY - Specifies the y translate point
     * @returns {void}
     */
    LayerPanel.prototype.tileAnimation = function (zoomType, translateX, translateY) {
        var tileParent = document.getElementById(this.mapObject.element.id + '_tile_parent');
        var animatedTiles = document.getElementById(this.mapObject.element.id + '_animated_tiles');
        var tileElement = document.getElementById(this.mapObject.element.id + '_tiles');
        var scaleValue = '2';
        if (zoomType.indexOf('ZoomOut') === 0 || zoomType === 'Reset') {
            tileElement.style.zIndex = '1';
            tileParent.style.zIndex = '0';
            while (tileElement.childElementCount >= 1) {
                tileElement.removeChild(tileElement.children[0]);
            }
            translateX = 0;
            translateY = document.getElementById(this.mapObject.element.id + '_tile_parent').getClientRects()[0].height / 4;
            scaleValue = zoomType.indexOf('ZoomOut') === 0 ? '0.5' : '0.2';
        }
        if (!isNullOrUndefined(animatedTiles)) {
            animatedTiles.style.transition = this.mapObject.layersCollection[0].animationDuration + 'ms';
            animatedTiles.style.transform = 'translate(' + translateX + 'px, ' + translateY + 'px) scale(' + scaleValue + ')';
        }
    };
    /**
     * Static map rendering
     *
     * @param {string} apikey - Specifies the api key
     * @param {number} zoom - Specifies the zoom value
     * @returns {void}
     * @private
     */
    LayerPanel.prototype.renderGoogleMap = function (apikey, zoom) {
        var map = this.mapObject;
        // zoom = this.mapObject.zoomSettings.shouldZoomInitially ? this.mapObject.markerZoomFactor : zoom;
        zoom = this.mapObject.tileZoomLevel;
        var totalSize = Math.pow(2, zoom) * 256;
        var x = (map.mapAreaRect.width / 2) - (totalSize / 2);
        var y = (map.mapAreaRect.height / 2) - (totalSize / 2);
        var centerPoint = new Point(null, null);
        var diffX = 0;
        var diffY = 0;
        var position = convertTileLatLongToPoint(centerPoint, zoom, { x: x, y: y }, this.isMapCoordinates);
        if (map.zoomModule && map.zoomSettings.enable) {
            diffX = map.zoomModule.mouseDownLatLong['x'] - map.zoomModule.mouseMoveLatLong['x'];
            diffY = map.zoomModule.mouseDownLatLong['y'] - map.zoomModule.mouseMoveLatLong['y'];
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var panLatLng = map.pointToLatLong(position.x - diffX, position.y - diffY);
        map.centerPosition.latitude = panLatLng['latitude'];
        map.centerPosition.longitude = panLatLng['longitude'];
        var mapWidth;
        var mapHeight;
        if (isNullOrUndefined(parseInt(map.width, 10))) {
            mapWidth = parseInt(map.width, 10) - 22;
        }
        else {
            mapWidth = Math.round(map.mapAreaRect.width);
        }
        if (isNullOrUndefined(parseInt(map.height, 10))) {
            mapHeight = parseInt(map.height, 10) - 22;
        }
        else {
            mapHeight = Math.round(map.mapAreaRect.height);
        }
        var eleWidth = mapWidth > 640 ? (mapWidth - 640) / 2 : 0;
        var eleHeight = mapHeight > 640 ? (mapHeight - 640) / 2 : 0;
        var center;
        var mapType = (map.layers[map.layers.length - 1].staticMapType).toString().toLowerCase();
        if (map.centerPosition.latitude && map.centerPosition.longitude) {
            center = map.centerPosition.latitude.toString() + ',' + map.centerPosition.longitude.toString();
        }
        else {
            center = '0,0';
        }
        var staticMapString = 'https://maps.googleapis.com/maps/api/staticmap?size=' + mapWidth + 'x' + mapHeight +
            '&zoom=' + zoom + '&center=' + center + '&maptype=' + mapType + '&key=' + apikey;
        document.getElementById(this.mapObject.element.id + '_tile_parent').innerHTML
            = '<div id="' + this.mapObject.element.id + '_StaticGoogleMap"' + 'style="position:absolute; left:' + eleWidth + 'px; top:'
                + eleHeight + 'px"><img src="' + staticMapString + '"' + 'alt="' + this.mapObject.getLocalizedLabel('ImageNotFound') + '"></div>';
    };
    /**
     * To find the tile translate point
     *
     * @param {number} factorX - Specifies the x factor
     * @param {number} factorY - Specifies the x factor
     * @param {MapLocation} centerPosition - Specifies the map location
     * @returns {Point} - Returns point values
     */
    LayerPanel.prototype.panTileMap = function (factorX, factorY, centerPosition) {
        if (this.mapObject.tileZoomLevel <= this.mapObject.tileZoomScale && this.mapObject.initialCheck) {
            this.mapObject.tileZoomLevel = this.mapObject.tileZoomScale;
        }
        var level = this.mapObject.tileZoomLevel;
        var padding = this.mapObject.layers[this.mapObject.layers.length - 1].layerType !== 'GoogleStaticMap' ?
            20 : 0;
        var x;
        var y;
        var totalSize = Math.pow(2, level) * 256;
        x = (factorX / 2) - (totalSize / 2);
        y = (factorY / 2) - (totalSize / 2);
        var position = convertTileLatLongToPoint(centerPosition, level, { x: x, y: y }, this.isMapCoordinates);
        padding = this.mapObject.zoomNotApplied ? 0 : padding;
        x -= position.x - (factorX / 2);
        y = (y - (position.y - (factorY / 2))) + padding;
        this.mapObject.scale = Math.pow(2, level - 1);
        if ((isNullOrUndefined(this.mapObject.tileTranslatePoint) || (this.mapObject.tileTranslatePoint.y === 0 &&
            this.mapObject.tileTranslatePoint.x === 0)) || (isNullOrUndefined(this.mapObject.previousTileWidth) ||
            isNullOrUndefined(this.mapObject.previousTileHeight))) {
            this.mapObject.previousTileWidth = factorX;
            this.mapObject.previousTileHeight = factorY;
        }
        if (!isNullOrUndefined(this.mapObject.tileTranslatePoint) && (isNullOrUndefined(centerPosition.x)) &&
            (this.mapObject.zoomSettings.zoomFactor === 1 ||
                this.mapObject.zoomSettings.zoomFactor !== level || !this.mapObject.defaultState)) {
            if ((factorX !== this.mapObject.previousTileWidth || factorY !== this.mapObject.previousTileHeight)) {
                var xdiff = x - ((this.mapObject.previousTileWidth / 2) - (totalSize / 2));
                var ydiff = y - ((this.mapObject.previousTileHeight / 2) - (totalSize / 2) + padding);
                this.mapObject.tileTranslatePoint.x = this.mapObject.tileTranslatePoint.x + xdiff;
                this.mapObject.tileTranslatePoint.y = this.mapObject.tileTranslatePoint.y + ydiff;
            }
        }
        if (!isNullOrUndefined(this.mapObject.tileTranslatePoint) && !this.mapObject.zoomNotApplied) {
            if (this.mapObject.tileTranslatePoint.x !== 0 && this.mapObject.tileTranslatePoint.x !== x
                && !this.mapObject.centerPositionChanged) {
                x = this.mapObject.tileTranslatePoint.x;
            }
            if (this.mapObject.tileTranslatePoint.y !== 0 && this.mapObject.tileTranslatePoint.y !== y
                && !this.mapObject.centerPositionChanged) {
                y = this.mapObject.tileTranslatePoint.y;
            }
        }
        this.mapObject.translatePoint = new Point((x - (0.01 * this.mapObject.zoomSettings.zoomFactor)) / this.mapObject.scale, (y - (0.01 * this.mapObject.zoomSettings.zoomFactor)) / this.mapObject.scale);
        this.mapObject.previousTileWidth = factorX;
        this.mapObject.previousTileHeight = factorY;
        return new Point(x, y);
    };
    /**
     * @returns {void}
     * @private
     */
    LayerPanel.prototype.destroy = function () {
        this.mapObject = null;
        this.groupElements = [];
        this.layerObject = null;
        this.currentLayer = null;
        this.rectBounds = null;
        this.tiles = [];
        this.clipRectElement = null;
        this.tileSvgObject = null;
        this.ajaxModule = null;
        this.ajaxResponse = [];
        this.layerGroup = null;
        if (!isNullOrUndefined(this.bing)) {
            this.bing.destroy();
        }
        this.bing = null;
    };
    return LayerPanel;
}());

/**
 * Represents the annotation elements for map.
 */
var Annotations = /** @__PURE__ @class */ (function () {
    function Annotations(map) {
        this.map = map;
    }
    Annotations.prototype.renderAnnotationElements = function () {
        var _this = this;
        var secondaryID = this.map.element.id + '_Secondary_Element';
        var annotationGroup = createElement('div', { id: this.map.element.id + '_Annotations_Group' });
        annotationGroup.style.position = 'absolute';
        annotationGroup.style.top = '0px';
        annotationGroup.style.left = '0px';
        this.map.annotations.map(function (annotation, index) {
            if (annotation.content !== null) {
                _this.createAnnotationTemplate(annotationGroup, annotation, index);
            }
        });
        if (annotationGroup.childElementCount > 0 && !(isNullOrUndefined(getElementByID(secondaryID)))) {
            getElementByID(secondaryID).appendChild(annotationGroup);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.map.renderReactTemplates();
    };
    // eslint-disable-next-line valid-jsdoc
    /**
     * To create annotation elements
     *
     * @private
     */
    Annotations.prototype.createAnnotationTemplate = function (parentElement, annotation, annotationIndex) {
        var _this = this;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var left;
        var top;
        var templateFn;
        var map = this.map;
        var templateElement;
        var availSize = map.availableSize;
        var id = map.element.id + '_Annotation_' + annotationIndex;
        var childElement = createElement('div', {
            id: map.element.id + '_Annotation_' + annotationIndex
        });
        childElement.style.cssText = 'position: absolute; z-index:' + annotation.zIndex + ';';
        var argsData = {
            cancel: false, name: annotationRendering, content: annotation.content,
            annotation: annotation
        };
        this.map.trigger(annotationRendering, argsData, function (annotationArgs) {
            if (argsData.cancel) {
                return;
            }
            templateFn = getTemplateFunction(argsData.content, _this.map);
            if (templateFn && templateFn(_this.map, _this.map, argsData.content, _this.map.element.id + '_ContentTemplate_' + annotationIndex).length) {
                templateElement = Array.prototype.slice.call(templateFn(_this.map, _this.map, argsData.content, _this.map.element.id + '_ContentTemplate_' + annotationIndex));
                var length_1 = templateElement.length;
                for (var i = 0; i < length_1; i++) {
                    childElement.appendChild(templateElement[i]);
                }
            }
            else {
                childElement.appendChild(createElement('div', {
                    innerHTML: argsData.content
                }));
            }
        });
        var offset = getElementOffset(childElement.cloneNode(true), map.element);
        var elementRect = map.element.getBoundingClientRect();
        var bounds = map.svgObject.getBoundingClientRect();
        left = Math.abs(bounds.left - elementRect.left);
        top = Math.abs(bounds.top - elementRect.top);
        var annotationXValue = (annotation.x.indexOf('%') > -1) ? (availSize.width / 100) * parseFloat(annotation.x) :
            parseFloat(annotation.x);
        var annotationYValue = (annotation.y.indexOf('%') > -1) ? (availSize.height / 100) * parseFloat(annotation.y) :
            parseFloat(annotation.y);
        left = (annotation.horizontalAlignment === 'None') ? (left + annotationXValue) : left;
        top = (annotation.verticalAlignment === 'None') ? (top + annotationYValue) : top;
        switch (annotation.verticalAlignment) {
            case 'Near':
                top = (top + annotationYValue);
                break;
            case 'Center':
                top = (top + annotationYValue) + ((bounds.height / 2) - (offset.height / 2));
                break;
            case 'Far':
                top = (top + bounds.height + annotationYValue) - offset.height;
                break;
        }
        switch (annotation.horizontalAlignment) {
            case 'Near':
                left = (left + annotationXValue);
                break;
            case 'Center':
                left = (left + annotationXValue) + ((bounds.width / 2) - (offset.width / 2));
                break;
            case 'Far':
                left = (left + bounds.width + annotationXValue) - offset.width;
                break;
        }
        childElement.style.left = left + 'px';
        childElement.style.top = top + 'px';
        parentElement.appendChild(childElement);
    };
    /*
   * Get module name.
   */
    Annotations.prototype.getModuleName = function () {
        return 'Annotations';
    };
    /**
     * To destroy the annotation.
     *
     * @returns {void}
     * @private
     */
    Annotations.prototype.destroy = function () {
        this.map = null;
    };
    return Annotations;
}());

var __extends = (undefined && undefined.__extends) || (function () {
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
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Maps Component file
 */
/**
 * Represents the maps control. It is ideal for rendering maps from GeoJSON data or other map providers like OpenStreetMap, Google Maps, Bing Maps, etc that
 * has rich feature set that includes markers, labels, bubbles and much more.
 * ```html
 * <div id="maps"/>
 * <script>
 *   var maps = new Maps();
 *   maps.appendTo("#maps");
 * </script>
 * ```
 */
var Maps = /** @__PURE__ @class */ (function (_super) {
    __extends(Maps, _super);
    /**
     * Constructor for creating the widget
     *
     * @param {MapsModel} options Specifies the options
     * @param {string | HTMLElement} element Specifies the element
     */
    function Maps(options, element) {
        var _this = _super.call(this, options, element) || this;
        /**
         * Check layer whether is geometry or tile
         *
         * @private
         */
        _this.isTileMap = false;
        /**
         * Resize the map
         */
        _this.isResize = false;
        /**
         * @private
         */
        _this.isReset = false;
        /** @private */
        _this.baseSize = new Size(0, 0);
        /** @public */
        _this.translatePoint = new Point(0, 0);
        /** @private */
        _this.baseTranslatePoint = new Point(0, 0);
        /** @public */
        _this.zoomTranslatePoint = new Point(0, 0);
        /** @private */
        _this.markerZoomedState = true;
        /** @private */
        _this.zoomPersistence = false;
        /** @private */
        _this.defaultState = true;
        /** @private */
        _this.centerPositionChanged = false;
        /** @private */
        _this.isTileMapSubLayer = false;
        /** @private */
        _this.markerNullCount = 0;
        /** @private */
        _this.tileTranslatePoint = new Point(0, 0);
        /** @private */
        _this.baseTileTranslatePoint = new Point(0, 0);
        /** @private */
        // eslint-disable-next-line @typescript-eslint/ban-types
        _this.isDevice = false;
        /** @private */
        _this.staticMapZoom = _this.zoomSettings.enable ? _this.zoomSettings.zoomFactor : 0;
        /** @private */
        _this.zoomNotApplied = false;
        /** @public */
        _this.dataLabelShape = [];
        _this.zoomShapeCollection = [];
        _this.zoomLabelPositions = [];
        _this.mouseDownEvent = { x: null, y: null };
        _this.mouseClickEvent = { x: null, y: null };
        /** @private */
        _this.selectedElementId = [];
        /** @private */
        _this.selectedMarkerElementId = [];
        /** @private */
        _this.selectedBubbleElementId = [];
        /** @private */
        _this.selectedNavigationElementId = [];
        /** @private */
        _this.selectedLegendElementId = [];
        /** @private */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _this.legendSelectionCollection = [];
        /** @private */
        _this.shapeSelections = true;
        /** @private */
        _this.legendSelection = true;
        /** @private */
        _this.toggledLegendId = [];
        /** @private */
        _this.toggledShapeElementId = [];
        /** @private */
        _this.checkInitialRender = true;
        /** @private */
        _this.initialTileTranslate = new Point(0, 0);
        /** @private */
        _this.markerDragId = '';
        /** @private */
        _this.initialCheck = true;
        /** @private */
        _this.applyZoomReset = false;
        /** @private */
        _this.markerClusterExpandCheck = false;
        /** @private */
        _this.markerClusterExpand = false;
        /** @private */
        _this.mouseMoveId = '';
        /** @private */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _this.shapeSelectionItem = [];
        /** @private */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _this.markerDragArgument = null;
        setValue('mergePersistData', _this.mergePersistMapsData, _this);
        return _this;
    }
    Object.defineProperty(Maps.prototype, "isShapeSelected", {
        /**
         *
         * Specifies whether the shape is selected in the maps or not.
         *
         * @returns {boolean} - Returns a boolean value to specify whether the shape is selected in the maps or not.
         */
        get: function () {
            return this.mapSelect;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * To manage persist maps data
     *
     * @returns {void}
     */
    Maps.prototype.mergePersistMapsData = function () {
        var data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var windowData;
        try {
            windowData = window.localStorage;
        }
        catch (e) {
            windowData = null;
        }
        if (!isNullOrUndefined(windowData)) {
            data = window.localStorage.getItem(this.getModuleName() + this.element.id);
        }
        if (!(isNullOrUndefined(data) || (data === ''))) {
            var dataObj = JSON.parse(data);
            var keys = Object.keys(dataObj);
            this.isProtectedOnChange = true;
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                if ((typeof this[key] === 'object') && !isNullOrUndefined(this[key])) {
                    extend(this[key], dataObj[key]);
                }
                else {
                    this[key] = dataObj[key];
                }
            }
            this.isProtectedOnChange = false;
        }
    };
    /**
     * Gets the localized label by locale keyword.
     *
     * @param  {string} key - Specifies the key
     * @returns {string} - Returns the string value
     * @private
     */
    Maps.prototype.getLocalizedLabel = function (key) {
        return this.localeObject.getConstant(key);
    };
    /**
     * Initializing pre-required values.
     *
     * @returns {void}
     */
    Maps.prototype.preRender = function () {
        this.isDevice = Browser.isDevice;
        this.initPrivateVariable();
        this.allowServerDataBinding = false;
        this.unWireEVents();
        this.wireEVents();
        this.setCulture();
    };
    Maps.prototype.renderElements = function () {
        if (!this.isDestroyed) {
            this.trigger(load, { maps: this });
            this.createSVG();
            this.findBaseAndSubLayers();
            this.createSecondaryElement();
            this.addTabIndex();
            this.themeStyle = getThemeStyle(this.theme);
            this.renderBorder();
            this.renderTitle(this.titleSettings, 'title', null, null);
            this.renderArea();
            this.processRequestJsonData();
            this.renderComplete();
            this.isAddLayer = !this.isTileMap ? false : this.isAddLayer;
        }
    };
    /**
     * To Initialize the control rendering.
     *
     * @returns {void}
     */
    Maps.prototype.render = function () {
        this.renderElements();
    };
    Maps.prototype.processRequestJsonData = function () {
        var _this = this;
        var length = this.layersCollection.length - 1;
        this.serverProcess = { request: 0, response: 0 };
        var queryModule;
        var dataModule;
        Array.prototype.forEach.call(this.layersCollection, function (layer, layerIndex) {
            if (layer.shapeData instanceof DataManager) {
                _this.serverProcess['request']++;
                dataModule = layer.shapeData;
                queryModule = layer.query instanceof Query ? layer.query : new Query();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var dataManager = dataModule.executeQuery(queryModule);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                dataManager.then(function (e) {
                    _this.processResponseJsonData('DataManager', e, layer, 'ShapeData');
                });
            }
            else if (layer.shapeData instanceof MapAjax || layer.shapeData) {
                if (!isNullOrUndefined(layer.shapeData['dataOptions'])) {
                    _this.processAjaxRequest(layer, layer.shapeData, 'ShapeData');
                }
            }
            if (layer.dataSource instanceof DataManager) {
                _this.serverProcess['request']++;
                dataModule = layer.dataSource;
                queryModule = layer.query instanceof Query ? layer.query : new Query();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var dataManager = dataModule.executeQuery(queryModule);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                dataManager.then(function (e) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    layer.dataSource = processResult(e);
                });
            }
            if (layer.markerSettings.length > 0) {
                var _loop_1 = function (i) {
                    if (layer.markerSettings[i].dataSource instanceof DataManager) {
                        _this.serverProcess['request']++;
                        dataModule = layer.markerSettings[i].dataSource;
                        queryModule = layer.markerSettings[i].query instanceof Query ?
                            layer.markerSettings[i].query : new Query();
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var dataManager = dataModule.executeQuery(queryModule);
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        dataManager.then(function (e) {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            layer.markerSettings[i].dataSource = processResult(e);
                        });
                    }
                };
                for (var i = 0; i < layer.markerSettings.length; i++) {
                    _loop_1(i);
                }
            }
            if (layer.bubbleSettings.length > 0) {
                var _loop_2 = function (i) {
                    if (layer.bubbleSettings[i].dataSource instanceof DataManager) {
                        _this.serverProcess['request']++;
                        dataModule = layer.bubbleSettings[i].dataSource;
                        queryModule = layer.bubbleSettings[i].query instanceof Query ?
                            layer.bubbleSettings[i].query : new Query();
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var dataManager = dataModule.executeQuery(queryModule);
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        dataManager.then(function (e) {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            layer.bubbleSettings[i].dataSource = processResult(e);
                        });
                    }
                };
                for (var i = 0; i < layer.bubbleSettings.length; i++) {
                    _loop_2(i);
                }
            }
            if (layer.dataSource instanceof MapAjax || !isNullOrUndefined(layer.dataSource['dataOptions'])) {
                _this.processAjaxRequest(layer, layer.dataSource, 'DataSource');
            }
            if (_this.serverProcess['request'] === _this.serverProcess['response'] && length === layerIndex) {
                _this.processResponseJsonData(null);
            }
        });
    };
    /* eslint-disable @typescript-eslint/no-explicit-any */
    Maps.prototype.processAjaxRequest = function (layer, localAjax, type) {
        var _this = this;
        this.serverProcess['request']++;
        var fetchApiModule = new Fetch(localAjax.dataOptions, localAjax.type, localAjax.contentType);
        fetchApiModule.onSuccess = function (args) {
            _this.processResponseJsonData('Fetch', args, layer, type);
        };
        fetchApiModule.send(localAjax.sendData);
    };
    /**
     * This method is used to process the JSON data to render the maps.
     *
     * @param {string} processType - Specifies the process type in maps.
     * @param {any | string} data - Specifies the data for maps.
     * @param {LayerSettings} layer - Specifies the layer for the maps.
     * @param {string} dataType - Specifies the data type for maps.
     * @returns {void}
     * @private
     */
    Maps.prototype.processResponseJsonData = function (processType, data, layer, dataType) {
        this.serverProcess['response']++;
        if (processType) {
            if (dataType === 'ShapeData') {
                layer.shapeData = (processType === 'DataManager') ? processResult(data) : data;
            }
            else {
                layer.dataSource = (processType === 'DataManager') ? processResult(data) : data;
            }
        }
        if (!isNullOrUndefined(processType) && this.serverProcess['request'] === this.serverProcess['response']) {
            var collection = this.layersCollection;
            this.layersCollection = [];
            for (var i = 0; i < collection.length; i++) {
                if (collection[i].isBaseLayer) {
                    this.layersCollection.push(collection[i]);
                }
            }
            for (var j = 0; j < collection.length; j++) {
                if (!collection[j].isBaseLayer) {
                    this.layersCollection.push(collection[j]);
                }
            }
            this.renderMap();
        }
        else if (isNullOrUndefined(processType)) {
            this.renderMap();
        }
    };
    Maps.prototype.renderMap = function () {
        if (this.legendModule && this.legendSettings.visible) {
            this.legendModule.renderLegend();
        }
        this.createTile();
        if (this.zoomSettings.enable && this.zoomModule) {
            this.zoomModule.createZoomingToolbars();
        }
        if (!isNullOrUndefined(this.dataLabelModule)) {
            this.dataLabelModule.dataLabelCollections = [];
        }
        this.mapLayerPanel.measureLayerPanel();
        if (!isNullOrUndefined(this.svgObject)) {
            this.element.appendChild(this.svgObject);
        }
        this.setSecondaryElementPosition();
        for (var i = 0; i < this.layers.length; i++) {
            if (this.layers[i].selectionSettings && this.layers[i].selectionSettings.enable &&
                this.layers[i].initialShapeSelection.length > 0 && this.checkInitialRender) {
                var checkSelection = this.layers[i].selectionSettings.enableMultiSelect;
                this.layers[i].selectionSettings.enableMultiSelect = checkSelection ? checkSelection : true;
                var shapeSelection = this.layers[i].initialShapeSelection;
                for (var j = 0; j < this.layers[i].initialShapeSelection.length; j++) {
                    this.shapeSelection(i, shapeSelection[j].shapePath, shapeSelection[j].shapeValue, true);
                }
                this.layers[i].selectionSettings.enableMultiSelect = checkSelection;
                if (i === this.layers.length - 1) {
                    this.checkInitialRender = false;
                }
            }
            if (!this.isResize) {
                for (var k = 0; k < this.layers[i].markerSettings.length; k++) {
                    // eslint-disable-next-line max-len
                    if (this.layers[i].markerSettings[k].selectionSettings && this.layers[i].markerSettings[k].selectionSettings.enable
                        && this.layers[i].markerSettings[k].initialMarkerSelection.length > 0) {
                        var markerSelectionValues = this.layers[i].markerSettings[k].initialMarkerSelection;
                        for (var j = 0; j < markerSelectionValues.length; j++) {
                            this.markerInitialSelection(i, k, this.layers[i].markerSettings[k], markerSelectionValues[j].latitude, markerSelectionValues[j].longitude);
                        }
                    }
                }
            }
        }
        if (!isNullOrUndefined(document.getElementById(this.element.id + '_tile_parent'))) {
            var svg = this.svgObject.getBoundingClientRect();
            var element = document.getElementById(this.element.id);
            var tileElement = document.getElementById(this.element.id + '_tile_parent');
            var tileElement1 = document.getElementById(this.element.id + '_tiles');
            var tile = tileElement.getBoundingClientRect();
            var bottom = void 0;
            var top_1;
            var left = void 0;
            left = parseFloat(tileElement.style.left);
            var titleTextSize = measureText(this.titleSettings.text, this.titleSettings.textStyle);
            var subTitleTextSize = measureText(this.titleSettings.subtitleSettings.text, this.titleSettings.subtitleSettings.textStyle);
            if (this.isTileMap && this.isTileMapSubLayer && this.legendSettings.position === 'Bottom' && this.legendSettings.visible) {
                if (this.legendSettings.mode !== 'Default') {
                    if (titleTextSize.width !== 0 && titleTextSize.height !== 0) {
                        top_1 = parseFloat(tileElement.style.top) + (subTitleTextSize.height / 2)
                            - (this.legendModule.legendBorderRect.height / 2);
                    }
                    else {
                        top_1 = parseFloat(tileElement.style.top) - this.mapAreaRect.y;
                    }
                }
                else {
                    left = this.legendModule.legendBorderRect.x;
                    if (titleTextSize.width !== 0 && titleTextSize.height !== 0) {
                        top_1 = parseFloat(tileElement.style.top) + (subTitleTextSize['height'] / 2)
                            - this.legendModule.legendBorderRect.y;
                    }
                    else {
                        top_1 = parseFloat(tileElement.style.top) + (subTitleTextSize['height'] / 2);
                    }
                }
            }
            else {
                bottom = svg.bottom - tile.bottom - element.offsetTop;
                top_1 = parseFloat(tileElement.style.top);
            }
            top_1 = (bottom <= 11) ? top_1 : (!isNullOrUndefined(this.legendModule) && this.legendSettings.position === 'Bottom') ? this.mapAreaRect.y : (top_1 * 2);
            left = (bottom <= 11) ? left : !isNullOrUndefined(this.legendModule) ? left : (left * 2);
            tileElement.style.top = top_1 + 'px';
            tileElement.style.left = left + 'px';
            tileElement1.style.top = top_1 + 'px';
            tileElement1.style.left = left + 'px';
            if (!isNullOrUndefined(this.legendModule) && this.legendModule.totalPages.length > 0) {
                tileElement.style.height = tileElement1.style.height = this.legendModule.legendTotalRect.height + 'px';
                tileElement.style.width = tileElement1.style.width = this.legendModule.legendTotalRect.width + 'px';
            }
        }
        this.arrangeTemplate();
        if (this.annotationsModule) {
            if (this.width !== '0px' && this.height !== '0px' && this.width !== '0%' && this.height !== '0%') {
                this.annotationsModule.renderAnnotationElements();
            }
        }
        this.element.style.outline = 'none';
        this.element.style.position = 'relative';
        for (var i = 0; i < document.getElementsByTagName('path').length - 1; i++) {
            if (document.getElementsByTagName('path')[i].id.indexOf('shapeIndex') > -1) {
                document.getElementsByTagName('path')[i].style.outline = 'none';
            }
        }
        this.zoomingChange();
        if (this.zoomModule && this.isDevice) {
            this.zoomModule.removeToolbarOpacity(this.isTileMap ? Math.round(this.tileZoomLevel) : this.mapScaleValue, this.element.id + '_Zooming_');
        }
        if (!this.isZoomByPosition && !this.zoomNotApplied) {
            this.trigger(loaded, { maps: this, isResized: this.isResize });
        }
        this.isResize = false;
    };
    /**
     * To apply color to the initial selected marker
     *
     * @param {SelectionSettingsModel} selectionSettings - Specifies the selection settings
     * @param {Maps} map - Specifies the instance of the maps
     * @param {Element} targetElement - Specifies the target element
     * @param {any} data - Specifies the data
     * @returns {void}
     * @private
     */
    Maps.prototype.markerSelection = function (selectionSettings, map, targetElement, data) {
        var border = {
            color: selectionSettings.border.color,
            width: selectionSettings.border.width / map.scale,
            opacity: selectionSettings.border.opacity
        };
        var markerSelectionProperties = {
            opacity: selectionSettings.opacity,
            fill: selectionSettings.fill,
            border: border,
            target: targetElement.id,
            cancel: false,
            data: data,
            maps: map
        };
        if (!getElement('MarkerselectionMap')) {
            document.body.appendChild(createStyle('MarkerselectionMap', 'MarkerselectionMapStyle', markerSelectionProperties));
        }
        else {
            customizeStyle('MarkerselectionMap', 'MarkerselectionMapStyle', markerSelectionProperties);
        }
        if (this.selectedMarkerElementId.length === 0 || selectionSettings.enableMultiSelect) {
            if (targetElement.tagName === 'g') {
                targetElement.children[0].setAttribute('class', 'MarkerselectionMapStyle');
                this.selectedMarkerElementId.push(targetElement.children[0].id);
            }
            else {
                targetElement.setAttribute('class', 'MarkerselectionMapStyle');
                this.selectedMarkerElementId.push(targetElement.id);
            }
        }
    };
    /**
     * initial selection of marker
     *
     * @param {number} layerIndex - Specifies the layer index
     * @param {number} markerIndex - Specifies the marker index
     * @param {MarkerSettingsModel} markerSettings - Specifies the marker settings
     * @param {number} latitude - Specifies hte latitude
     * @param {number} longitude - Specifies the longitude
     * @returns {void}
     * @private
     */
    Maps.prototype.markerInitialSelection = function (layerIndex, markerIndex, markerSettings, latitude, longitude) {
        var selectionSettings = markerSettings.selectionSettings;
        if (selectionSettings.enable) {
            for (var i = 0; i < markerSettings.dataSource['length']; i++) {
                var data = markerSettings.dataSource[i];
                if (data['latitude'] === latitude && data['longitude'] === longitude) {
                    var targetId = this.element.id + '_' + 'LayerIndex_' + layerIndex + '_MarkerIndex_' + markerIndex +
                        '_dataIndex_' + i;
                    this.markerSelection(selectionSettings, this, getElement(targetId), data);
                }
            }
        }
    };
    /**
     * Render the map area border
     *
     * @returns {void}
     */
    Maps.prototype.renderArea = function () {
        var width = this.mapsArea.border.width;
        var background = this.mapsArea.background;
        if (width > 0 || (background || this.themeStyle.areaBackgroundColor)) {
            var mapBorder = {
                opacity: isNullOrUndefined(this.mapsArea.border.opacity) ? 1 : this.mapsArea.border.opacity,
                color: this.mapsArea.border.color, width: this.mapsArea.border.width
            };
            var rect = new RectOption(this.element.id + '_MapAreaBorder', background || this.themeStyle.areaBackgroundColor, mapBorder, 1, this.mapAreaRect);
            this.svgObject.appendChild(this.renderer.drawRectangle(rect));
        }
    };
    /**
     * To add tab index for map element
     *
     * @returns {void}
     */
    Maps.prototype.addTabIndex = function () {
        this.element.setAttribute('aria-label', this.description || 'Maps Element');
        this.element.setAttribute('role', '');
        this.element.tabIndex = this.tabIndex;
    };
    Maps.prototype.setSecondaryElementPosition = function () {
        var element = getElementByID(this.element.id + '_Secondary_Element');
        var rect = this.element.getBoundingClientRect();
        var svgElement = getElementByID(this.element.id + '_svg');
        if (!isNullOrUndefined(svgElement)) {
            var svgRect = svgElement.getBoundingClientRect();
            element.style.left = Math.max(svgRect.left - rect.left, 0) + 'px';
            element.style.top = Math.max(svgRect.top - rect.top, 0) + 'px';
        }
    };
    Maps.prototype.zoomingChange = function () {
        var left;
        var top;
        if (getElementByID(this.element.id + '_Layer_Collections') && this.zoomModule) {
            this.zoomModule.layerCollectionEle = getElementByID(this.element.id + '_Layer_Collections');
        }
        if (this.isTileMap && getElementByID(this.element.id + '_Tile_SVG') && getElementByID(this.element.id + '_tile_parent')) {
            var tileElement = getElementByID(this.element.id + '_tile_parent');
            var tileSvgElement = getElementByID(this.element.id + '_Tile_SVG');
            var tileSvgParentElement = getElementByID(this.element.id + '_Tile_SVG_Parent');
            var tileRect = tileElement.getBoundingClientRect();
            var tileSvgRect = tileSvgElement.getBoundingClientRect();
            left = (tileRect.left - tileSvgRect.left);
            top = (tileRect.top - tileSvgRect.top);
            tileSvgParentElement.style.left = left + 'px';
            tileSvgParentElement.style.top = top + 'px';
            if (!isNullOrUndefined(this.legendModule) && this.legendModule.totalPages.length > 0) {
                tileElement.style.width = tileSvgElement.style.width =
                    this.legendModule.legendTotalRect.width.toString();
                tileElement.style.height = tileSvgElement.style.height =
                    this.legendModule.legendTotalRect.height.toString();
                tileSvgParentElement.style.width = this.legendModule.legendTotalRect.width + 'px';
                tileSvgParentElement.style.height = this.legendModule.legendTotalRect.height + 'px';
            }
            var markerTemplateElements = document.getElementsByClassName('template');
            if (!isNullOrUndefined(markerTemplateElements) && markerTemplateElements.length > 0) {
                for (var i = 0; i < markerTemplateElements.length; i++) {
                    var templateGroupEle = markerTemplateElements[i];
                    templateGroupEle.style.left = left + 'px';
                    templateGroupEle.style.top = top + 'px';
                }
            }
        }
        if (this.zoomSettings.zoomFactor >= 0) {
            if (this.zoomModule && this.zoomModule.toolBarGroup && this.zoomSettings.enable) {
                this.zoomModule.alignToolBar();
            }
            var elements = document.getElementById(this.element.id + '_Layer_Collections');
            if (!isNullOrUndefined(elements) && elements.childElementCount > 0) {
                for (var i = 0; i < elements.childNodes.length; i++) {
                    var childElement = elements.childNodes[i];
                    if (childElement.tagName === 'g' && childElement.id.indexOf('_Legend_Group') === -1) {
                        var layerIndex = parseFloat(childElement.id.split('_LayerIndex_')[1].split('_')[0]);
                        for (var j = 0; j < childElement.childNodes.length; j++) {
                            var childNode = childElement.childNodes[j];
                            if (!(childNode.id.indexOf('_Markers_Group') > -1) &&
                                (!(childNode.id.indexOf('_bubble_Group') > -1)) &&
                                (!(childNode.id.indexOf('_dataLableIndex_Group') > -1))) {
                                changeBorderWidth(childNode, layerIndex, this.scale, this);
                            }
                        }
                    }
                }
            }
            if (this.zoomModule && ((this.previousScale !== this.scale) || this.zoomNotApplied || this.isZoomByPosition)) {
                this.zoomModule.applyTransform(this, true);
            }
        }
    };
    Maps.prototype.createSecondaryElement = function () {
        if (isNullOrUndefined(document.getElementById(this.element.id + '_Secondary_Element'))) {
            var secondaryElement = createElement('div', {
                id: this.element.id + '_Secondary_Element'
            });
            secondaryElement.style.cssText = 'position: relative;z-index:2;';
            this.element.appendChild(secondaryElement);
        }
    };
    /**
     * @returns {void}
     * @private
     */
    Maps.prototype.arrangeTemplate = function () {
        if (document.getElementById(this.element.id + '_Legend_Border')) {
            document.getElementById(this.element.id + '_Legend_Border').style.pointerEvents = 'none';
        }
        var templateElements = document.getElementsByClassName(this.element.id + '_template');
        if (!isNullOrUndefined(templateElements) && templateElements.length > 0 &&
            getElementByID(this.element.id + '_Layer_Collections') && !this.isTileMap) {
            for (var i = 0; i < templateElements.length; i++) {
                var offSetLetValue = 0;
                var offSetTopValue = 0;
                var templateGroupEle = templateElements[i];
                if (!isNullOrUndefined(templateGroupEle) && templateGroupEle.childElementCount > 0) {
                    var layerOffset = getElementByID(this.element.id + '_Layer_Collections').getBoundingClientRect();
                    var elementOffset = getElementByID(templateGroupEle.id).getBoundingClientRect();
                    if (templateGroupEle.id.indexOf('Marker') === -1) {
                        offSetLetValue = this.isTileMap ? 0 : (layerOffset.left < elementOffset.left) ?
                            -(Math.abs(elementOffset.left - layerOffset.left)) : (Math.abs(elementOffset.left - layerOffset.left));
                        offSetTopValue = this.isTileMap ? 0 : (layerOffset.top < elementOffset.top) ?
                            -(Math.abs(elementOffset.top - layerOffset.top)) : Math.abs(elementOffset.top - layerOffset.top);
                    }
                    for (var j = 0; j < templateGroupEle.childElementCount; j++) {
                        var currentTemplate = templateGroupEle.childNodes[j];
                        if (currentTemplate.id.indexOf('Marker') !== -1) {
                            var elementOffset_1 = getElementByID(currentTemplate.id).getBoundingClientRect();
                            currentTemplate.style.left = parseFloat(currentTemplate.style.left) - (this.isTileMap ? 0 : elementOffset_1.width / 2) + 'px';
                            currentTemplate.style.top = parseFloat(currentTemplate.style.top) - (this.isTileMap ? 0 : elementOffset_1.height / 2) + 'px';
                        }
                        else {
                            currentTemplate.style.left = parseFloat(currentTemplate.style.left) + offSetLetValue + 'px';
                            currentTemplate.style.top = parseFloat(currentTemplate.style.top) + offSetTopValue + 'px';
                            currentTemplate.style.transform = 'translate(-50%, -50%)';
                        }
                    }
                }
            }
        }
    };
    Maps.prototype.createTile = function () {
        var mainLayer = this.layersCollection[0];
        var padding = 0;
        if (mainLayer.isBaseLayer && (mainLayer.layerType === 'OSM' || mainLayer.layerType === 'Bing' ||
            mainLayer.layerType === 'GoogleStaticMap' || mainLayer.layerType === 'Google' || (!isNullOrUndefined(mainLayer.urlTemplate) && mainLayer.urlTemplate !== ''))) {
            removeElement(this.element.id + '_tile_parent');
            removeElement(this.element.id + '_tiles');
            removeElement('animated_tiles');
            var ele = createElement('div', {
                id: this.element.id + '_tile_parent'
            });
            ele.style.cssText = 'position: absolute; left: ' +
                (this.mapAreaRect.x) + 'px; right: ' + (this.margin.right) + 'px; top: '
                + (this.mapAreaRect.y + padding) + 'px; height: ' +
                (this.mapAreaRect.height) + 'px; width: '
                + (this.mapAreaRect.width) + 'px; overflow: hidden;';
            var ele1 = createElement('div', {
                id: this.element.id + '_tiles'
            });
            ele1.style.cssText = 'position: absolute; left: ' +
                (this.mapAreaRect.x) + 'px;  right: ' + (this.margin.right) + 'px; top: '
                + (this.mapAreaRect.y + padding) + 'px; height: ' + (this.mapAreaRect.height) + 'px; width: '
                + (this.mapAreaRect.width) + 'px; overflow: hidden;';
            this.element.appendChild(ele);
            this.element.appendChild(ele1);
        }
    };
    /**
     * To initilize the private varibales of maps.
     *
     * @returns {void}
     */
    Maps.prototype.initPrivateVariable = function () {
        if (this.element.id === '') {
            var collection = document.getElementsByClassName('e-maps').length;
            this.element.id = 'maps_control_' + collection;
        }
        this.renderer = new SvgRenderer(this.element.id);
        this.mapLayerPanel = new LayerPanel(this);
    };
    Maps.prototype.findBaseAndSubLayers = function () {
        var _this = this;
        var baseIndex = this.baseLayerIndex;
        var mainLayers = [];
        var subLayers = [];
        this.layersCollection = [];
        Array.prototype.forEach.call(this.layers, function (layer) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            (layer.type === 'Layer') ? mainLayers.push(layer) : subLayers.push(layer);
        });
        for (var i = 0; i < mainLayers.length; i++) {
            var baseLayer = mainLayers[i];
            if (baseLayer.visible && baseIndex === i) {
                baseLayer.isBaseLayer = true;
                this.isTileMap = (baseLayer.layerType === 'Geometry' && !isNullOrUndefined(baseLayer.shapeData)) ? false : true;
                this.layersCollection.push(baseLayer);
                break;
            }
            else if (i === mainLayers.length - 1) {
                this.layersCollection.push(mainLayers[0]);
                break;
            }
        }
        subLayers.map(function (subLayer) {
            if (subLayer.visible) {
                _this.layersCollection.push(subLayer);
            }
        });
    };
    /**
     * Render the map border
     *
     * @private
     * @returns {void}
     */
    Maps.prototype.renderBorder = function () {
        var width = this.border.width;
        var borderElement = this.svgObject.querySelector('#' + this.element.id + '_MapBorder');
        if ((width > 0 || (this.background || this.themeStyle.backgroundColor)) && isNullOrUndefined(borderElement)) {
            var border = {
                opacity: isNullOrUndefined(this.border.opacity) ? 1 : this.border.opacity,
                color: this.border.color, width: this.border.width
            };
            var borderRect = new RectOption(this.element.id + '_MapBorder', this.background || this.themeStyle.backgroundColor, border, 1, new Rect(width / 2, width / 2, this.availableSize.width - width, this.availableSize.height - width));
            this.svgObject.appendChild(this.renderer.drawRectangle(borderRect));
        }
        else {
            borderElement.setAttribute('fill', this.background || this.themeStyle.backgroundColor);
        }
    };
    /**
     * Render the title and subtitle
     *
     * @param {TitleSettingsModel} title - Specifies the title
     * @param {string} type - Specifies the type
     * @param {Rect} bounds - Specifies the bounds
     * @param {Element} groupEle - Specifies the group element
     * @returns {void}
     * @private
     */
    Maps.prototype.renderTitle = function (title, type, bounds, groupEle) {
        var style = {
            size: title.textStyle.size,
            color: title.textStyle.color,
            fontFamily: title.textStyle.fontFamily,
            fontWeight: title.textStyle.fontWeight,
            fontStyle: title.textStyle.fontStyle,
            opacity: title.textStyle.opacity
        };
        var height;
        var width = Math.abs((this.margin.left + this.margin.right) - this.availableSize.width);
        style.fontFamily = !isNullOrUndefined(style.fontFamily) ? style.fontFamily : this.themeStyle.fontFamily;
        style.fontWeight = type === 'title' ? style.fontWeight || this.themeStyle.titleFontWeight : style.fontWeight || this.themeStyle.titleFontWeight;
        style.size = type === 'title' ? (style.size || this.themeStyle.titleFontSize) : (style.size || this.themeStyle.subTitleFontSize || Theme.mapsSubTitleFont.size);
        if (title.text) {
            if (isNullOrUndefined(groupEle)) {
                groupEle = this.renderer.createGroup({ id: this.element.id + '_Title_Group' });
            }
            var trimmedTitle = textTrim(width, title.text, style);
            var elementSize = measureText(trimmedTitle, style);
            var rect = (isNullOrUndefined(bounds)) ? new Rect(this.margin.left, this.margin.top, this.availableSize.width, this.availableSize.height) : bounds;
            var location_1 = findPosition(rect, title.alignment, elementSize, type);
            var options = new TextOption(this.element.id + '_Map_' + type, location_1.x, location_1.y, 'start', trimmedTitle);
            var titleBounds = new Rect(location_1.x, location_1.y, elementSize.width, elementSize.height);
            var element = renderTextElement(options, style, style.color || (type === 'title' ? this.themeStyle.titleFontColor : this.themeStyle.subTitleFontColor), groupEle);
            element.setAttribute('aria-label', this.description || title.text);
            element.setAttribute('role', '');
            if ((type === 'title' && !title.subtitleSettings.text) || (type === 'subtitle')) {
                height = Math.abs((titleBounds.y + this.margin.bottom) - this.availableSize.height);
                this.mapAreaRect = new Rect(this.margin.left, titleBounds.y + 10, width, height - 10);
            }
            if (type !== 'subtitle' && title.subtitleSettings.text) {
                this.renderTitle(title.subtitleSettings, 'subtitle', titleBounds, groupEle);
            }
            else {
                this.svgObject.appendChild(groupEle);
            }
        }
        else {
            height = Math.abs((this.margin.top + this.margin.bottom) - this.availableSize.height);
            this.mapAreaRect = new Rect(this.margin.left, this.margin.top, width, height);
        }
    };
    /**
     * To create svg element for maps
     *
     * @returns {void}
     */
    Maps.prototype.createSVG = function () {
        this.removeSvg();
        createSvg(this);
    };
    /**
     * To Remove the SVG
     *
     * @returns {void}
     */
    Maps.prototype.removeSvg = function () {
        removeElement(this.element.id + '_Secondary_Element');
        removeElement(this.element.id + '_tile_parent');
        removeElement(this.element.id + '_tiles');
        if (this.svgObject) {
            while (this.svgObject.childNodes.length > 0) {
                this.svgObject.removeChild(this.svgObject.firstChild);
            }
            if (!this.svgObject.hasChildNodes() && this.svgObject.parentNode) {
                remove(this.svgObject);
            }
        }
        this.clearTemplate();
    };
    /**
     * To bind event handlers for maps.
     *
     * @returns {void}
     */
    Maps.prototype.wireEVents = function () {
        //let cancelEvent: string = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        EventHandler.add(this.element, 'click', this.mapsOnClick, this);
        EventHandler.add(this.element, 'contextmenu', this.mapsOnRightClick, this);
        EventHandler.add(this.element, 'dblclick', this.mapsOnDoubleClick, this);
        EventHandler.add(this.element, Browser.touchStartEvent, this.mouseDownOnMap, this);
        EventHandler.add(this.element, Browser.touchMoveEvent, this.mouseMoveOnMap, this);
        EventHandler.add(this.element, Browser.touchEndEvent, this.mouseEndOnMap, this);
        EventHandler.add(this.element, 'pointerleave mouseleave', this.mouseLeaveOnMap, this);
        EventHandler.add(this.element, 'keydown', this.keyDownHandler, this);
        EventHandler.add(this.element, 'keyup', this.keyUpHandler, this);
        //  EventHandler.add(this.element, cancelEvent, this.mouseLeaveOnMap, this);
        this.resizeEvent = this.mapsOnResize.bind(this);
        window.addEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.resizeEvent);
    };
    /**
     * To unbind event handlers from maps.
     *
     * @returns {void}
     */
    Maps.prototype.unWireEVents = function () {
        //let cancelEvent: string = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        EventHandler.remove(this.element, 'click', this.mapsOnClick);
        EventHandler.remove(this.element, 'contextmenu', this.mapsOnRightClick);
        EventHandler.remove(this.element, 'dblclick', this.mapsOnDoubleClick);
        EventHandler.remove(this.element, Browser.touchStartEvent, this.mouseDownOnMap);
        EventHandler.remove(this.element, Browser.touchMoveEvent, this.mouseMoveOnMap);
        EventHandler.remove(this.element, Browser.touchEndEvent, this.mouseEndOnMap);
        EventHandler.remove(this.element, 'pointerleave mouseleave', this.mouseLeaveOnMap);
        EventHandler.remove(this.element, 'keydown', this.keyDownHandler);
        EventHandler.remove(this.element, 'keyup', this.keyUpHandler);
        //EventHandler.remove(this.element, cancelEvent, this.mouseLeaveOnMap);
        window.removeEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.resizeEvent);
    };
    /**
     * This method is used to perform operations when mouse pointer leave from maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event on maps.
     * @returns {void}
     * @private
     */
    Maps.prototype.mouseLeaveOnMap = function (e) {
        if (document.getElementsByClassName('highlightMapStyle').length > 0 && this.legendModule) {
            this.legendModule.removeShapeHighlightCollection();
            removeClass(document.getElementsByClassName('highlightMapStyle')[0]);
        }
    };
    Maps.prototype.keyUpHandler = function (event) {
        var id = event.target['id'];
        if (this.isTileMap) {
            this.removeTileMap();
        }
        if (event.code === 'Tab' && id.indexOf('_LayerIndex_') > -1 && id.indexOf('shapeIndex') > -1) {
            this.keyboardHighlightSelection(id, event.type);
        }
        else if (id.indexOf('_LayerIndex_') === -1 && id.indexOf('shapeIndex') === -1 &&
            getElementsByClassName('highlightMapStyle').length > 0) {
            removeClass(getElementsByClassName('highlightMapStyle')[0]);
            if (this.legendSettings.visible && this.legendModule) {
                this.legendModule.removeShapeHighlightCollection();
            }
        }
    };
    Maps.prototype.keyboardHighlightSelection = function (id, key) {
        var layerIndex = parseInt(id.split('_LayerIndex_')[1].split('_')[0], 10);
        var shapeIndex = parseInt(id.split('_shapeIndex_')[1].split('_')[0], 10);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var shapeData = this.layers[layerIndex].shapeData['features']['length'] > shapeIndex ?
            this.layers[layerIndex].shapeData['features'][shapeIndex]['properties'] : null;
        var dataIndex = parseInt(id.split('_dataIndex_')[1].split('_')[0], 10);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var data = isNullOrUndefined(dataIndex) ? null : this.layers[layerIndex].dataSource[dataIndex];
        if (this.layers[layerIndex].selectionSettings.enable && key === 'keydown' && this.selectionModule) {
            this.selectionModule.selectionsettings = this.layers[layerIndex].selectionSettings;
            this.selectionModule.selectionType = 'Shape';
            this.selectionModule.selectElement(event.target, layerIndex, data, shapeData);
        }
        else if (this.highlightModule && (this.layers[layerIndex].highlightSettings.enable && key === 'keyup' &&
            !event.target.classList.contains('ShapeselectionMapStyle'))) {
            this.highlightModule.highlightSettings = this.layers[layerIndex].highlightSettings;
            this.highlightModule.handleHighlight(event.target, layerIndex, data, shapeData);
        }
    };
    Maps.prototype.keyDownHandler = function (event) {
        var zoom = this.zoomModule;
        var id = event.target['id'];
        if ((event.code === 'ArrowUp' || event.code === 'ArrowDown' || event.code === 'ArrowLeft'
            || event.code === 'ArrowRight') && zoom) {
            var animatedTiles = document.getElementById(this.element.id + '_animated_tiles');
            if (this.isTileMap && !isNullOrUndefined(animatedTiles)) {
                this.currentTiles = animatedTiles.cloneNode(true);
            }
        }
        if (this.zoomSettings.enable && zoom && (event.key === '+' || event.code === 'Equal')) {
            zoom.performZoomingByToolBar('zoomin');
        }
        else if (this.zoomSettings.enable && zoom && (event.key === '-' || event.code === 'Minus')) {
            zoom.performZoomingByToolBar('zoomout');
        }
        else if (this.zoomSettings.enable && zoom && event['keyCode'] === 82) {
            zoom.performZoomingByToolBar('reset');
            zoom.isPanning = false;
        }
        else if (this.zoomSettings.enable && this.zoomSettings.enablePanning && zoom
            && (event.code === 'ArrowUp' || event.code === 'ArrowDown')) {
            event.preventDefault();
            zoom.mouseDownLatLong['x'] = 0;
            zoom.mouseMoveLatLong['y'] = this.mapAreaRect.height / 7;
            zoom.panning('None', zoom.mouseDownLatLong['x'], event.code === 'ArrowUp' ? -(zoom.mouseMoveLatLong['y']) :
                zoom.mouseMoveLatLong['y'], event);
            zoom.mouseDownLatLong['y'] = zoom.mouseMoveLatLong['y'];
        }
        else if (this.zoomSettings.enable && this.zoomSettings.enablePanning && zoom
            && (event.code === 'ArrowLeft' || event.code === 'ArrowRight')) {
            event.preventDefault();
            zoom.mouseDownLatLong['y'] = 0;
            zoom.mouseMoveLatLong['x'] = this.mapAreaRect.width / 7;
            zoom.panning('None', event.code === 'ArrowLeft' ? -(zoom.mouseMoveLatLong['x']) : zoom.mouseMoveLatLong['x'], zoom.mouseDownLatLong['y'], event);
            zoom.mouseDownLatLong['x'] = zoom.mouseMoveLatLong['x'];
        }
        else if (event.code === 'Enter') {
            id = event.target['id'];
            event.preventDefault();
            if (this.legendModule && (id.indexOf('_Left_Page_Rect') > -1 || id.indexOf('_Right_Page_Rect') > -1)) {
                this.mapAreaRect = this.legendModule.initialMapAreaRect;
                this.legendModule.currentPage = (id.indexOf('_Left_Page_') > -1) ? (this.legendModule.currentPage - 1) :
                    (this.legendModule.currentPage + 1);
                this.legendModule.legendGroup = this.renderer.createGroup({ id: this.element.id + '_Legend_Group' });
                this.legendModule.drawLegendItem(this.legendModule.currentPage);
                var textContent = (document.getElementById(this.element.id + '_Paging_Text')).textContent;
                var text = textContent.split('/').map(Number);
                if (id.indexOf('_Left_Page_Rect') > -1) {
                    if (text[0] !== 1) {
                        event.target.focus();
                    }
                    event.target.style.outlineColor = text[0] - 1 !== text[1] ? '' : 'transparent';
                }
                else if (id.indexOf('_Right_Page_Rect') > -1) {
                    if (text[0] !== text[1]) {
                        event.target.focus();
                    }
                    event.target.style.outlineColor = text[0] !== text[1] + 1 ? '' : 'transparent';
                }
                if (querySelector(this.element.id + '_Legend_Border', this.element.id)) {
                    querySelector(this.element.id + '_Legend_Border', this.element.id).style.pointerEvents = 'none';
                }
            }
            if (id.indexOf('shapeIndex') > -1) {
                this.keyboardHighlightSelection(id, event.type);
            }
        }
        if (this.zoomModule) {
            this.zoomModule.removeToolbarOpacity(this.isTileMap ? Math.round(this.tileZoomLevel) : this.mapScaleValue, this.mouseMoveId);
        }
    };
    /**
     * Gets the selected element to be maintained or not.
     *
     * @param {Element} targetEle - Specifies the target element
     * @returns {boolean} - Returns the boolean value
     * @private
     */
    Maps.prototype.SelectedElement = function (targetEle) {
        var isSelect = false;
        if (targetEle.getAttribute('class') === 'ShapeselectionMapStyle') {
            isSelect = true;
        }
        return isSelect;
    };
    /**
     * This method is used to perform the operations when a click operation is performed on maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event on maps.
     * @returns {void}
     * @private
     */
    Maps.prototype.mapsOnClick = function (e) {
        var _this = this;
        var targetEle = e.target;
        var targetId = targetEle.id;
        var latitude = null;
        var longitude = null;
        this.mouseClickEvent = { x: e.x, y: e.y };
        if (targetEle.id.indexOf('_ToolBar') === -1) {
            var latLongValue = this.getClickLocation(targetId, e.pageX, e.pageY, targetEle, e['layerX'], e['layerY']);
            if (!isNullOrUndefined(latLongValue)) {
                latitude = latLongValue.latitude;
                longitude = latLongValue.longitude;
            }
            var eventArgs_1 = {
                cancel: false, name: click, target: targetId, x: e.clientX, y: e.clientY,
                latitude: latitude, longitude: longitude,
                isShapeSelected: this.SelectedElement(targetEle)
            };
            if (this.onclick) {
                eventArgs_1.name = onclick;
                this.trigger('onclick', eventArgs_1, function (mouseArgs) {
                    _this.clickHandler(e, eventArgs_1, targetEle);
                });
            }
            else {
                this.trigger('click', eventArgs_1, function (mouseArgs) {
                    _this.clickHandler(e, eventArgs_1, targetEle);
                });
            }
        }
        if (this.zoomModule) {
            this.zoomModule.removeToolbarOpacity(this.isTileMap ? Math.round(this.tileZoomLevel) : this.mapScaleValue, targetId);
            if (this.isDevice) {
                this.zoomModule.removeToolbarClass('', '', '', '', '');
            }
        }
    };
    Maps.prototype.clickHandler = function (e, eventArgs, targetEle) {
        if (targetEle.id.indexOf('shapeIndex') > -1) {
            this.mergeCluster();
            if (getElement(this.element.id + '_mapsTooltip') &&
                this.mapsTooltipModule.tooltipTargetID.indexOf('_MarkerIndex_') > -1) {
                removeElement(this.element.id + '_mapsTooltip');
            }
        }
        if (this.markerModule) {
            this.markerModule.markerClusterClick(e);
        }
        if (!eventArgs.cancel) {
            this.notify(click, targetEle);
        }
        if (!eventArgs.cancel && targetEle.id.indexOf('shapeIndex') !== -1) {
            this.triggerShapeSelection(targetEle);
        }
    };
    Maps.prototype.triggerShapeSelection = function (targetEle) {
        var layerIndex = parseInt(targetEle.id.split('_LayerIndex_')[1].split('_')[0], 10);
        var shapeSelectedEventArgs = triggerShapeEvent(targetEle.id, this.layers[layerIndex].selectionSettings, this, shapeSelected);
        if (!shapeSelectedEventArgs.cancel && this.selectionModule && !isNullOrUndefined(this.shapeSelected)) {
            customizeStyle(this.selectionModule.selectionType + 'selectionMap', this.selectionModule.selectionType + 'selectionMapStyle', shapeSelectedEventArgs);
        }
        else if (shapeSelectedEventArgs.cancel && this.selectionModule
            && isNullOrUndefined(shapeSelectedEventArgs['data'])) {
            removeClass(targetEle);
            this.selectionModule.removedSelectionList(targetEle);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Maps.prototype.getMarkerClickLocation = function (pageX, pageY, x, y, marker$$1, isDragEnd) {
        document.getElementById(this.element.id + "_svg").style.cursor = 'grabbing';
        var targetElement = getElement(marker$$1.targetId);
        var latLongValue = this.getClickLocation(marker$$1.targetId, pageX, pageY, targetElement, x, y);
        var location = (this.isTileMap) ? convertTileLatLongToPoint(new MapLocation(latLongValue.longitude, latLongValue.latitude), this.scale, this.tileTranslatePoint, true) : convertGeoToPoint(latLongValue.latitude, latLongValue.longitude, this.mapLayerPanel.currentFactor, this.layersCollection[marker$$1.layerIndex], this);
        var transPoint = this.translatePoint;
        var translateX = (this.isTileMap ? location.x : (location.x + transPoint.x) * this.scale);
        var translateY = (this.isTileMap ? location.y : (location.y + transPoint.y) * this.scale);
        if (this.markerDragArgument.shape !== 'Balloon') {
            targetElement.setAttribute('transform', 'translate( ' + translateX + ' ' + translateY + ' )');
        }
        else {
            targetElement.parentElement.setAttribute('transform', 'translate( ' + translateX + ' ' + translateY + ' )');
        }
        if (isDragEnd) {
            var markerSettings = this.layers[marker$$1.layerIndex].markerSettings[marker$$1.markerIndex];
            latLongValue = this.getClickLocation(marker$$1.targetId, (pageX - markerSettings.offset.x), (pageY - markerSettings.offset.y), targetElement, (x - markerSettings.offset.x), (y - markerSettings.offset.y));
        }
        return latLongValue;
    };
    Maps.prototype.getClickLocation = function (targetId, pageX, pageY, targetElement, x, y) {
        var layerIndex = 0;
        var latLongValue;
        if (targetId.indexOf('_LayerIndex_') !== -1 && !this.isTileMap &&
            (parseInt(this.mouseDownEvent['x'], 10) === parseInt(this.mouseClickEvent['x'], 10)) &&
            (parseInt(this.mouseDownEvent['y'], 10) === parseInt(this.mouseClickEvent['y'], 10))) {
            layerIndex = parseFloat(targetId.split('_LayerIndex_')[1].split('_')[0]);
            if (this.layers[layerIndex].geometryType === 'Normal') {
                if (targetId.indexOf('_shapeIndex_') > -1) {
                    var location_2 = getMousePosition(pageX, pageY, targetElement.parentElement);
                    var minLongitude = Math.abs((-this.baseMapBounds.longitude.min) * this.mapLayerPanel.currentFactor);
                    var minLatitude = Math.abs(this.baseMapBounds.latitude.max * this.mapLayerPanel.currentFactor);
                    latLongValue = {
                        latitude: Math.abs(this.baseMapBounds.latitude.max - (location_2.y / this.mapLayerPanel.currentFactor)),
                        longitude: Math.abs((location_2.x / this.mapLayerPanel.currentFactor) + this.baseMapBounds.longitude.min)
                    };
                    if (this.baseMapBounds.longitude.min < 0 && minLongitude > location_2.x) {
                        latLongValue.longitude = -latLongValue.longitude;
                    }
                    if (this.baseMapBounds.latitude.min < 0 && minLatitude > location_2.y) {
                        latLongValue.latitude = -latLongValue.latitude;
                    }
                }
                else if (targetId.indexOf('_MarkerIndex_') > -1 && this.markerModule && !this.markerDragArgument) {
                    var markerIndex = parseInt(targetId.split('_MarkerIndex_')[1].split('_')[0], 10);
                    var dataIndex = parseInt(targetId.split('_dataIndex_')[1].split('_')[0], 10);
                    if (!isNaN(markerIndex) && !isNaN(dataIndex)) {
                        var dataObject = this.layers[layerIndex].markerSettings[markerIndex].dataSource[dataIndex];
                        latLongValue = { latitude: dataObject['latitude'], longitude: dataObject.longitude };
                    }
                    else {
                        latLongValue = { latitude: null, longitude: null };
                    }
                }
                else if (targetId.indexOf('_MarkerIndex_') > -1 && this.markerModule && this.markerDragArgument) {
                    var element = document.getElementById(this.element.id + '_LayerIndex_' + this.markerDragArgument.layerIndex);
                    var elementRect = element.getBoundingClientRect();
                    var location_3 = new MapLocation(pageX > elementRect.left ? Math.abs(elementRect.left - pageX) : 0, pageY > elementRect.top ? Math.abs(elementRect.top - pageY) : 0);
                    var minLongitude = Math.abs((-this.baseMapBounds.longitude.min) * this.mapLayerPanel.currentFactor);
                    var minLatitude = Math.abs(this.baseMapBounds.latitude.max * this.mapLayerPanel.currentFactor);
                    latLongValue = {
                        latitude: Math.abs(this.baseMapBounds.latitude.max - (location_3.y / (this.mapLayerPanel.currentFactor * this.scale))),
                        longitude: Math.abs((location_3.x / (this.mapLayerPanel.currentFactor * this.scale)) + this.baseMapBounds.longitude.min)
                    };
                    if (this.baseMapBounds.longitude.min < 0 && minLongitude > location_3.x) {
                        latLongValue.longitude = -latLongValue.longitude;
                    }
                    if (this.baseMapBounds.latitude.min < 0 && minLatitude > location_3.y) {
                        latLongValue.latitude = -latLongValue.latitude;
                    }
                }
                else {
                    latLongValue = { latitude: null, longitude: null };
                }
            }
            else {
                latLongValue = this.getGeoLocation(layerIndex, x, y);
            }
        }
        else if (this.isTileMap && (parseInt(this.mouseDownEvent['x'], 10) === parseInt(this.mouseClickEvent['x'], 10)) &&
            (parseInt(this.mouseDownEvent['y'], 10) === parseInt(this.mouseClickEvent['y'], 10))) {
            latLongValue = this.getTileGeoLocation(x, y);
        }
        return latLongValue;
    };
    Maps.prototype.removeTileMap = function () {
        var animateElement = document.getElementById(this.element.id + '_animated_tiles');
        if (!isNullOrUndefined(this.currentTiles) && animateElement.childElementCount < this.currentTiles.childElementCount) {
            for (var l = animateElement.childElementCount - 1; l >= this.currentTiles.childElementCount; l--) {
                animateElement.removeChild(animateElement.children[l]);
            }
        }
        this.currentTiles = null;
    };
    /**
     * This method is used to perform operations when mouse click on maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event on maps.
     * @returns {boolean} - Returns the boolean value
     * @private
     */
    Maps.prototype.mouseEndOnMap = function (e) {
        var targetEle = e.target;
        var targetId = targetEle.id;
        var pageX;
        var latitude = null;
        var longitude = null;
        var pageY;
        var target;
        var touchArg;
        var layerX = 0;
        var layerY = 0;
        var rect = this.element.getBoundingClientRect();
        var element = e.target;
        if (e.type.indexOf('touch') !== -1) {
            this.isTouch = true;
            touchArg = e;
            layerX = pageX = touchArg.changedTouches[0].pageX;
            pageY = touchArg.changedTouches[0].pageY;
            layerY = pageY - (this.isTileMap ? 10 : 0);
            target = touchArg.target;
            this.mouseClickEvent = { x: pageX, y: pageY };
        }
        else {
            this.isTouch = e.pointerType === 'touch';
            pageX = e.pageX;
            pageY = e.pageY;
            layerX = e['layerX'];
            layerY = e['layerY'] - (this.isTileMap ? 10 : 0);
            target = e.target;
        }
        if (this.isTileMap) {
            this.removeTileMap();
        }
        if (this.isTouch) {
            if (targetEle.id.indexOf('_ToolBar') === -1) {
                var latLongValue = this.getClickLocation(targetId, pageX, pageY, targetEle, pageX, pageY);
                if (!isNullOrUndefined(latLongValue)) {
                    latitude = latLongValue.latitude;
                    longitude = latLongValue.longitude;
                }
            }
            this.titleTooltip(e, pageX, pageY, true);
            if (!isNullOrUndefined(this.legendModule)) {
                this.legendTooltip(e, e.pageX, e.pageY, true);
            }
        }
        this.notify(Browser.touchEndEvent, e);
        if (e.cancelable && !this.isTouch) {
            e.preventDefault();
        }
        if (!isNullOrUndefined(this.markerDragArgument)) {
            var marker$$1 = this.markerDragArgument;
            this.mouseClickEvent['x'] = this.mouseDownEvent['x'];
            this.mouseClickEvent['y'] = this.mouseDownEvent['y'];
            var latLongValue = this.getMarkerClickLocation(pageX, pageY, layerX, layerY, this.markerDragArgument, true);
            var markerObject = this.layers[marker$$1.layerIndex].markerSettings[marker$$1.markerIndex];
            document.getElementById(this.element.id + "_svg").style.cursor = markerObject.enableDrag ? 'pointer' : 'grabbing';
            var dragEventArgs = {
                name: 'markerDragEnd', x: pageX, y: pageY,
                latitude: latLongValue.latitude, longitude: latLongValue.longitude,
                layerIndex: marker$$1.layerIndex, markerIndex: marker$$1.markerIndex,
                dataIndex: marker$$1.dataIndex
            };
            if (isNullOrUndefined(markerObject.latitudeValuePath) && isNullOrUndefined(markerObject.longitudeValuePath)) {
                var data = markerObject.dataSource[marker$$1.dataIndex];
                if (!isNullOrUndefined(data['Longitude']) && !isNullOrUndefined(data['Latitude'])) {
                    markerObject.dataSource[marker$$1.dataIndex].Latitude = dragEventArgs.latitude;
                    markerObject.dataSource[marker$$1.dataIndex].Longitude = dragEventArgs.longitude;
                }
                else {
                    markerObject.dataSource[marker$$1.dataIndex].latitude = dragEventArgs.latitude;
                    markerObject.dataSource[marker$$1.dataIndex].longitude = dragEventArgs.longitude;
                }
            }
            else {
                markerObject.dataSource[marker$$1.dataIndex][markerObject.latitudeValuePath] = dragEventArgs.latitude;
                markerObject.dataSource[marker$$1.dataIndex][markerObject.longitudeValuePath] = dragEventArgs.longitude;
            }
            this.markerDragId = '';
            this.markerDragArgument = null;
            this.trigger('markerDragEnd', dragEventArgs);
        }
        else {
            document.getElementById(this.element.id + "_svg").style.cursor = 'auto';
        }
        if (this.zoomModule && this.isDevice) {
            this.zoomModule.removeToolbarOpacity(this.isTileMap ? Math.round(this.tileZoomLevel) : this.scale, this.element.id + '_Zooming_');
            this.zoomModule.removeToolbarClass('', '', '', '', '');
        }
        return false;
    };
    /**
     * This method is used to perform operations when mouse is clicked down on maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event on maps
     * @returns {void}
     * @private
     */
    Maps.prototype.mouseDownOnMap = function (e) {
        this.mouseDownEvent = { x: e.x, y: e.y };
        if (e.type.indexOf('touch') !== -1 && e.changedTouches) {
            this.mouseDownEvent = { x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY };
        }
        if (this.isDevice) {
            this.mapsTooltipModule.renderTooltip(e);
        }
        var rect = this.element.getBoundingClientRect();
        var element = e.target;
        this.markerDragId = element.id;
        var animatedTiles = document.getElementById(this.element.id + '_animated_tiles');
        if (this.isTileMap && !isNullOrUndefined(animatedTiles)) {
            this.currentTiles = animatedTiles.cloneNode(true);
        }
        if (element.id.indexOf('_ToolBar') === -1) {
            var markerModule = this.markerModule;
            if (element.id.indexOf('shapeIndex') > -1 || element.id.indexOf('Tile') > -1) {
                this.mergeCluster();
            }
            if (markerModule) {
                markerModule.markerClick(e);
                markerModule.markerClusterClick(e);
            }
            if (this.bubbleModule) {
                this.bubbleModule.bubbleClick(e);
            }
        }
        this.notify(Browser.touchStartEvent, e);
    };
    /**
     * Merges the marker clusters.
     *
     * @returns {void}
     * @private
     */
    Maps.prototype.mergeCluster = function () {
        if (this.markerModule && (this.markerModule.sameMarkerData.length > 0) &&
            (this.zoomModule ? this.zoomModule.isSingleClick : true)) {
            mergeSeparateCluster(this.markerModule.sameMarkerData, this, getElement(this.element.id + '_Markers_Group'));
            this.markerModule.sameMarkerData = [];
        }
    };
    /**
     * @param {PointerEvent} e - Specifies the pointer event.
     * @returns {void}
     * @private
     */
    Maps.prototype.mapsOnRightClick = function (e) {
        var targetEle = e.target;
        var targetId = targetEle.id;
        var latitude = null;
        var longitude = null;
        this.mouseClickEvent = this.mouseDownEvent = { x: e.x, y: e.y };
        if (targetEle.id.indexOf('_ToolBar') === -1) {
            var latLongValue = this.getClickLocation(targetId, e.pageX, e.pageY, targetEle, e['layerX'], e['layerY']);
            if (!isNullOrUndefined(latLongValue)) {
                latitude = latLongValue.latitude;
                longitude = latLongValue.longitude;
            }
            var eventArgs = {
                cancel: false, name: rightClick, target: targetId, x: e.clientX, y: e.clientY,
                latitude: latitude, longitude: longitude,
                isShapeSelected: false
            };
            this.trigger('rightClick', eventArgs);
        }
    };
    /**
     * This method is used to perform operations when performing the double click operation on maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event.
     * @returns {void}
     * @private
     */
    Maps.prototype.mapsOnDoubleClick = function (e) {
        this.notify('dblclick', e);
        var targetElement = e.target;
        var targetId = targetElement.id;
        var layerIndex = 0;
        var latLongValue;
        var latitude = null;
        var longitude = null;
        if (targetElement.id.indexOf('_ToolBar') === -1) {
            if (targetElement.id.indexOf('_LayerIndex_') !== -1 && !this.isTileMap && (this.mouseDownEvent['x'] === e.clientX)
                && (this.mouseDownEvent['y'] === e.clientY)) {
                layerIndex = parseFloat(targetElement.id.split('_LayerIndex_')[1].split('_')[0]);
                latLongValue = this.getGeoLocation(layerIndex, e['layerX'], e['layerY']);
                latitude = latLongValue['latitude'];
                longitude = latLongValue['longitude'];
            }
            else if (this.isTileMap && (this.mouseDownEvent['x'] === e.clientX)
                && (this.mouseDownEvent['y'] === e.clientY)) {
                latLongValue = this.getTileGeoLocation(e['layerX'], e['layerY']);
                latitude = latLongValue['latitude'];
                longitude = latLongValue['longitude'];
            }
            var doubleClickArgs = {
                cancel: false, name: doubleClick, x: e.clientX, y: e.clientY,
                target: targetId, latitude: latitude, longitude: longitude, isShapeSelected: null
            };
            this.trigger('doubleClick', doubleClickArgs);
        }
    };
    /**
     * This method is used to perform operations while performing mouse over on maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event on maps.
     * @returns {void}
     * @private
     */
    Maps.prototype.mouseMoveOnMap = function (e) {
        var target;
        target = (e.type === 'touchmove') ? e.target :
            target = e.target;
        // if (target.id.indexOf('shapeIndex') !== -1 && !this.highlightSettings.enable) {
        //     triggerShapeEvent(target.id, this.highlightSettings, this, shapeHighlight);
        // }
        if (this.markerModule) {
            this.markerModule.markerMove(e);
            this.markerModule.markerClusterMouseMove(e);
        }
        if (this.bubbleModule) {
            this.bubbleModule.bubbleMove(e);
        }
        if (target.id.indexOf('MarkerIndex') == -1) {
            document.getElementById(this.element.id + "_svg").style.cursor = 'auto';
        }
        this.onMouseMove(e);
        this.notify(Browser.touchMoveEvent, e);
    };
    /**
     * This method is used to perform operations when mouse move event is performed on maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event on maps.
     * @returns {void}
     * @private
     */
    Maps.prototype.onMouseMove = function (e) {
        var element = e.target;
        this.mouseMoveId = element['id'];
        var pageX;
        var pageY;
        var touches = null;
        var layerX = 0;
        var layerY = 0;
        if (e.type.indexOf('touch') == -1) {
            pageX = e.pageX;
            pageY = e.pageY;
            layerX = e['layerX'];
            layerY = e['layerY'] - (this.isTileMap ? 10 : 0);
            this.titleTooltip(e, e.pageX, e.pageY);
            if (!isNullOrUndefined(this.legendModule)) {
                this.legendTooltip(e, e.pageX, e.pageY, true);
            }
        }
        else {
            touches = e.touches;
            layerX = pageX = touches[0].clientX;
            layerY = pageY = touches[0].clientY - (this.isTileMap ? 10 : 0);
        }
        if (!isNullOrUndefined(this.markerDragArgument)) {
            var marker$$1 = this.markerDragArgument;
            this.mouseClickEvent['x'] = this.mouseDownEvent['x'];
            this.mouseClickEvent['y'] = this.mouseDownEvent['y'];
            this.getMarkerClickLocation(pageX, pageY, layerX, layerY, marker$$1, false);
        }
        if (this.zoomModule) {
            this.zoomModule.removeToolbarOpacity(this.isTileMap ? Math.round(this.tileZoomLevel) : this.scale, e.target.id);
        }
        return false;
    };
    Maps.prototype.legendTooltip = function (event, x, y, isTouch) {
        var targetId = event.target.id;
        var legendText;
        var page = this.legendModule.currentPage;
        var legendIndex = event.target.id.split('_Index_')[1];
        var collection;
        page = this.legendModule.totalPages.length <= this.legendModule.currentPage
            ? this.legendModule.totalPages.length - 1 : this.legendModule.currentPage < 0 ?
            0 : this.legendModule.currentPage;
        var count = this.legendModule.totalPages.length !== 0 ?
            this.legendModule.totalPages[page]['Collection'].length : this.legendModule.totalPages.length;
        for (var i = 0; i < count; i++) {
            collection = this.legendModule.totalPages[page]['Collection'][i];
            legendText = collection['DisplayText'];
            targetId = event.target['id'];
            legendIndex = event.target['id'].split('_Index_')[1];
            if ((targetId === (this.element.id + '_Legend_Text_Index_' + legendIndex)) &&
                (event.target.textContent.indexOf('...') > -1) && collection['idIndex'] === parseInt(legendIndex, 10)) {
                showTooltip(legendText, this.legendSettings.textStyle.size, x, y, this.element.offsetWidth, this.element.offsetHeight, this.element.id + '_EJ2_Legend_Text_Tooltip', getElement(this.element.id + '_Secondary_Element'), isTouch);
            }
        }
        if ((targetId !== (this.element.id + '_Legend_Text_Index_' + legendIndex))) {
            removeElement(this.element.id + '_EJ2_Legend_Text_Tooltip');
        }
    };
    Maps.prototype.titleTooltip = function (event, x, y, isTouch) {
        var targetId = event.target.id;
        if (targetId === (this.element.id + '_LegendTitle') && (event.target.textContent.indexOf('...') > -1)) {
            showTooltip(this.legendSettings.title.text, this.legendSettings.titleStyle.size, x, y, this.element.offsetWidth, this.element.offsetHeight, this.element.id + '_EJ2_LegendTitle_Tooltip', getElement(this.element.id + '_Secondary_Element'), isTouch);
        }
        else {
            removeElement(this.element.id + '_EJ2_LegendTitle_Tooltip');
        }
        if ((targetId === (this.element.id + '_Map_title')) && (event.target.textContent.indexOf('...') > -1)) {
            showTooltip(this.titleSettings.text, this.titleSettings.textStyle.size || this.themeStyle.titleFontSize, x, y, this.element.offsetWidth, this.element.offsetHeight, this.element.id + '_EJ2_Title_Tooltip', getElement(this.element.id + '_Secondary_Element'), isTouch);
        }
        else {
            removeElement(this.element.id + '_EJ2_Title_Tooltip');
        }
    };
    /*

    /**
     * This method is used to perform operations while resizing the window.
     *
     * @param e - Specifies the arguments of window resize event.
     */
    Maps.prototype.mapsOnResize = function (e) {
        var _this = this;
        if (!this.isDestroyed && !this.isExportInitialTileMap) {
            this.isResize = this.isReset = true;
            var args = {
                cancel: false,
                name: resize,
                previousSize: this.availableSize,
                currentSize: calculateSize(this),
                maps: this
            };
            this.trigger(resize, args);
            if (!args.cancel) {
                if (this.resizeTo) {
                    clearTimeout(this.resizeTo);
                }
                if (!isNullOrUndefined(this.element) && this.element.classList.contains('e-maps')) {
                    this.resizeTo = setTimeout(function () {
                        _this.unWireEVents();
                        _this.createSVG();
                        _this.refreshing = true;
                        _this.wireEVents();
                        _this.render();
                        _this.refreshing = false;
                    }, 500);
                }
            }
        }
        return false;
    };
    /**
     * This method is used to zoom the map by specifying the center position.
     *
     * @param {number} centerPosition - Specifies the location of the maps to be zoomed as geographical coordinates.
     * @param {number} zoomFactor - Specifies the zoom factor for the maps.
     * @returns {void}
     */
    Maps.prototype.zoomByPosition = function (centerPosition, zoomFactor) {
        if (!this.isDestroyed) {
            this.zoomNotApplied = false;
            var isRefresh = this.zoomSettings.zoomFactor === zoomFactor;
            if (!this.isTileMap && this.zoomModule) {
                if (!isNullOrUndefined(centerPosition)) {
                    this.zoomSettings.zoomFactor = zoomFactor;
                    isRefresh = this.centerPosition.latitude === centerPosition.latitude &&
                        this.centerPosition.longitude === centerPosition.longitude ? true : isRefresh;
                    this.centerPosition = centerPosition;
                    this.isZoomByPosition = true;
                    this.mapScaleValue = null;
                }
                else {
                    this.zoomSettings.zoomFactor = zoomFactor;
                    this.isZoomByPosition = true;
                    this.mapScaleValue = null;
                }
            }
            else if (this.zoomModule) {
                this.tileZoomLevel = this.zoomSettings.zoomFactor = zoomFactor;
                isRefresh = this.centerPosition.latitude === centerPosition.latitude &&
                    this.centerPosition.longitude === centerPosition.longitude ? true : isRefresh;
                this.centerPosition = centerPosition;
                this.isZoomByPosition = true;
            }
            if (isRefresh) {
                this.refresh();
            }
        }
    };
    /**
     * This method is used to perform panning by specifying the direction.
     *
     * @param {PanDirection} direction - Specifies the direction in which the panning must be performed.
     * @param {PointerEvent | TouchEvent} mouseLocation - Specifies the location of the mouse pointer in maps in pixels.
     * @returns {void}
     */
    Maps.prototype.panByDirection = function (direction, mouseLocation) {
        if (!this.isDestroyed) {
            var xDiff = 0;
            var yDiff = 0;
            switch (direction) {
                case 'Left':
                    xDiff = -(this.mapAreaRect.width / 7);
                    break;
                case 'Right':
                    xDiff = (this.mapAreaRect.width / 7);
                    break;
                case 'Top':
                    yDiff = -(this.mapAreaRect.height / 7);
                    break;
                case 'Bottom':
                    yDiff = (this.mapAreaRect.height / 7);
                    break;
            }
            if (this.zoomModule) {
                this.zoomModule.panning(direction, xDiff, yDiff, mouseLocation);
            }
        }
    };
    /**
     * This method is used to add the layers dynamically to the maps.
     *
     * @param {Object} layer - Specifies the layer to be added in the maps.
     * @returns {void}
     */
    Maps.prototype.addLayer = function (layer) {
        if (!this.isDestroyed) {
            var mapsLayer = this.layers;
            mapsLayer.push(layer);
            this.isAddLayer = true;
            this.layers = mapsLayer;
        }
    };
    /**
     * This method is used to remove a layer from the maps.
     *
     * @param {number} index - Specifies the index number of the layer to be removed.
     * @returns {void}
     */
    Maps.prototype.removeLayer = function (index) {
        if (!this.isDestroyed) {
            var mapsLayer = this.layers;
            mapsLayer.splice(index, 1);
            this.layers = mapsLayer;
        }
    };
    /**
     * This method is used to add markers dynamically in the maps.
     * If we provide the index value of the layer in which the marker to be added and the settings
     * of the marker as parameters, the marker will be added in the location.
     *
     * @param {number} layerIndex - Specifies the index number of the layer.
     * @param {MarkerSettingsModel[]} markerCollection - Specifies the settings of the marker to be added.
     * @returns {void}
     */
    Maps.prototype.addMarker = function (layerIndex, markerCollection) {
        if (!this.isDestroyed) {
            var layerEle = document.getElementById(this.element.id + '_LayerIndex_' + layerIndex);
            if (markerCollection.length > 0 && layerEle) {
                for (var _i = 0, markerCollection_1 = markerCollection; _i < markerCollection_1.length; _i++) {
                    var newMarker = markerCollection_1[_i];
                    this.layersCollection[layerIndex].markerSettings.push(new MarkerSettings(this, 'markerSettings', newMarker));
                }
                var markerModule = new Marker(this);
                markerModule.markerRender(this, layerEle, layerIndex, this.mapLayerPanel['currentFactor'], 'AddMarker');
                this.arrangeTemplate();
            }
        }
    };
    /**
     * This method is used to select the geometric shape element in the maps.
     *
     * @param {number} layerIndex - Specifies the index of the layer in maps.
     * @param {string | string[]} propertyName - Specifies the property name from the data source.
     * @param {string} name - Specifies the name of the shape, which is mapped from the data source, that is selected.
     * @param {boolean} enable - Specifies whether the shape should be selected or the selection should be removed.
     * @returns {void}
     */
    Maps.prototype.shapeSelection = function (layerIndex, propertyName, name, enable) {
        if (!this.isDestroyed) {
            var targetEle = void 0;
            var subLayerIndex = void 0;
            var popertyNameArray = Array.isArray(propertyName) ? propertyName : Array(propertyName);
            if (isNullOrUndefined(enable)) {
                enable = true;
            }
            var selectionsettings = this.layers[layerIndex].selectionSettings;
            if (!selectionsettings.enableMultiSelect && this.legendSelection && enable) {
                this.removeShapeSelection();
            }
            if (this.layers[layerIndex].type === 'SubLayer') {
                for (var i = 0; i < this.layersCollection.length; i++) {
                    if ((this.layersCollection[i].shapeData === this.layers[layerIndex].shapeData)) {
                        subLayerIndex = i;
                        break;
                    }
                }
            }
            if (selectionsettings.enable) {
                var targetId = void 0;
                var dataIndex = void 0;
                var shapeIndex = void 0;
                var indexValue = void 0;
                var shapeDataValue = void 0;
                var data = void 0;
                var shapeData = this.layers[layerIndex].shapeData['features'];
                for (var i = 0; i < shapeData.length; i++) {
                    for (var j = 0; j < popertyNameArray.length; j++) {
                        var propertyName_1 = !isNullOrUndefined(shapeData[i]['properties'][popertyNameArray[j]])
                            && isNaN(shapeData[i]['properties'][popertyNameArray[j]]) ?
                            shapeData[i]['properties'][popertyNameArray[j]].toLowerCase() : shapeData[i]['properties'][popertyNameArray[j]];
                        var shapeName = !isNullOrUndefined(name) && typeof name === 'string' ? name.toLowerCase() : name;
                        var k = void 0;
                        if (propertyName_1 === shapeName) {
                            if (!isNullOrUndefined(this.layers[layerIndex].shapeSettings.colorValuePath)) {
                                k = checkShapeDataFields(this.layers[layerIndex].dataSource, shapeData[i]['properties'], this.layers[layerIndex].shapeDataPath, this.layers[layerIndex].shapePropertyPath, this.layers[layerIndex]);
                            }
                            var baseLayer = this.layers[layerIndex];
                            if (this.baseLayerIndex >= 0 && baseLayer.isBaseLayer) {
                                indexValue = 0;
                            }
                            else if (this.layers[layerIndex].type === 'SubLayer') {
                                indexValue = subLayerIndex;
                            }
                            targetId = this.element.id + '_' + 'LayerIndex_' + indexValue + '_shapeIndex_' + i + '_dataIndex_' + k;
                            targetEle = getElement(targetId);
                            if (isNullOrUndefined(k) && isNullOrUndefined(targetEle)) {
                                targetId = this.element.id + '_' + 'LayerIndex_' + layerIndex + '_shapeIndex_' + i + '_dataIndex_null';
                                targetEle = getElement(targetId);
                            }
                            shapeIndex = parseInt(targetEle.id.split('_shapeIndex_')[1].split('_')[0], 10);
                            shapeDataValue = this.layers[layerIndex].shapeData['features']['length'] > shapeIndex ?
                                this.layers[layerIndex].shapeData['features'][shapeIndex]['properties'] : null;
                            dataIndex = parseInt(targetEle.id.split('_dataIndex_')[1].split('_')[0], 10);
                            data = isNullOrUndefined(dataIndex) ? null : this.layers[layerIndex].dataSource[dataIndex];
                            if (enable) {
                                triggerItemSelectionEvent(selectionsettings, this, targetEle, shapeDataValue, data);
                                this.shapeSelectionClass = getElement('ShapeselectionMap');
                                if (this.legendSettings.visible && targetEle.id.indexOf('_MarkerIndex_') === -1) {
                                    this.legendModule.shapeHighLightAndSelection(targetEle, data, selectionsettings, 'selection', layerIndex);
                                }
                                var shapeToggled = this.legendSettings.visible ? this.legendModule.shapeToggled : true;
                                if (shapeToggled) {
                                    targetEle.setAttribute('class', 'ShapeselectionMapStyle');
                                    if (this.selectedElementId.indexOf(targetEle.getAttribute('id')) === -1) {
                                        this.selectedElementId.push(targetEle.getAttribute('id'));
                                    }
                                    if (!selectionsettings.enableMultiSelect) {
                                        return;
                                    }
                                }
                            }
                            else {
                                this.legendSelection = (!selectionsettings.enableMultiSelect && !this.legendSelection) ?
                                    true : this.legendSelection;
                                if (this.legendSettings.visible && targetEle.id.indexOf('_MarkerIndex_') === -1 &&
                                    targetEle.getAttribute('class') === 'ShapeselectionMapStyle') {
                                    this.legendModule.shapeHighLightAndSelection(targetEle, data, selectionsettings, 'selection', layerIndex);
                                }
                                var shapeToggled = this.legendSettings.visible ? this.legendModule.shapeToggled : true;
                                if (shapeToggled) {
                                    removeClass(targetEle);
                                    var selectedElementIdIndex = this.selectedElementId.indexOf(targetEle.getAttribute('id'));
                                    if (selectedElementIdIndex !== -1) {
                                        this.selectedElementId.splice(selectedElementIdIndex, 1);
                                        if (!selectionsettings.enableMultiSelect && this.legendSelection
                                            && this.selectedElementId.length > 0) {
                                            this.removeShapeSelection();
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    /**
     * This method is used to zoom the maps based on the provided coordinates.
     *
     * @param {number} minLatitude - Specifies the minimum latitude of the location to be zoomed.
     * @param {number} minLongitude - Specifies the minimum latitude of the location to be zoomed.
     * @param {number} maxLatitude - Specifies the maximum latitude of the location to be zoomed.
     * @param {number} maxLongitude - Specifies the maximum longitude of the location to be zoomed.
     * @returns {void}
     */
    Maps.prototype.zoomToCoordinates = function (minLatitude, minLongitude, maxLatitude, maxLongitude) {
        var _a, _b;
        if (!this.isDestroyed) {
            var centerLatitude = void 0;
            var centerLongtitude = void 0;
            var isTwoCoordinates = false;
            this.centerPosition = {
                latitude: null,
                longitude: null
            };
            this.isZoomByPosition = false;
            if (isNullOrUndefined(maxLatitude) && isNullOrUndefined(maxLongitude)
                || isNullOrUndefined(minLatitude) && isNullOrUndefined(minLongitude)) {
                minLatitude = isNullOrUndefined(minLatitude) ? 0 : minLatitude;
                minLongitude = isNullOrUndefined(minLatitude) ? 0 : minLongitude;
                maxLatitude = isNullOrUndefined(maxLatitude) ? minLatitude : maxLatitude;
                maxLongitude = isNullOrUndefined(maxLongitude) ? minLongitude : maxLongitude;
                isTwoCoordinates = true;
            }
            if (minLatitude > maxLatitude) {
                _a = [maxLatitude, minLatitude], minLatitude = _a[0], maxLatitude = _a[1];
            }
            if (minLongitude > maxLongitude) {
                _b = [maxLongitude, minLongitude], minLongitude = _b[0], maxLongitude = _b[1];
            }
            if (!isTwoCoordinates) {
                centerLatitude = (minLatitude + maxLatitude) / 2;
                centerLongtitude = (minLongitude + maxLongitude) / 2;
            }
            else {
                centerLatitude = (minLatitude + maxLatitude);
                centerLongtitude = (minLongitude + maxLongitude);
            }
            this.centerLatOfGivenLocation = centerLatitude;
            this.centerLongOfGivenLocation = centerLongtitude;
            this.minLatOfGivenLocation = minLatitude;
            this.minLongOfGivenLocation = minLongitude;
            this.maxLatOfGivenLocation = maxLatitude;
            this.maxLongOfGivenLocation = maxLongitude;
            this.zoomNotApplied = true;
            this.scaleOfGivenLocation = calculateZoomLevel(minLatitude, maxLatitude, minLongitude, maxLongitude, this.mapAreaRect.width, this.mapAreaRect.height, this, true);
            var zoomArgs = {
                cancel: false, name: 'zoom', type: zoomIn, maps: this,
                tileTranslatePoint: {}, translatePoint: {},
                tileZoomLevel: this.isTileMap ? { previous: this.tileZoomLevel, current: this.scaleOfGivenLocation } : {},
                scale: !this.isTileMap ? { previous: this.scale, current: this.scaleOfGivenLocation } :
                    { previous: this.tileZoomLevel, current: this.scaleOfGivenLocation }
            };
            this.trigger('zoom', zoomArgs);
            this.refresh();
        }
    };
    /**
     * This method is used to remove multiple selected shapes in the maps.
     *
     * @returns {void}
     */
    Maps.prototype.removeShapeSelection = function () {
        var selectedElements = this.selectedElementId.length;
        for (var i = 0; i < selectedElements; i++) {
            removeClass(getElementByID(this.selectedElementId[0]));
            this.selectedElementId.splice(0, 1);
        }
        if (this.legendSettings.visible) {
            var legendSelectedElements = this.legendSelectionCollection.length;
            for (var i = 0; i < legendSelectedElements; i++) {
                removeClass(getElementByID(this.legendSelectionCollection[i]['legendElement']['id']));
                this.selectedLegendElementId.splice(0, 1);
            }
        }
        this.shapeSelectionItem = [];
        this.legendSelectionCollection = [];
    };
    /**
     * This method is used to set culture for maps.
     *
     * @returns {void}
     */
    Maps.prototype.setCulture = function () {
        this.intl = new Internationalization();
        this.setLocaleConstants();
        this.localeObject = new L10n(this.getModuleName(), this.defaultLocalConstants, this.locale);
    };
    /**
     * This method to set locale constants to the maps.
     *
     * @returns {void}
     */
    Maps.prototype.setLocaleConstants = function () {
        // Need to modify after the api confirm
        this.defaultLocalConstants = {
            ZoomIn: 'Zoom in',
            Zoom: 'Zoom',
            ZoomOut: 'Zoom out',
            Pan: 'Pan',
            Reset: 'Reset',
            ImageNotFound: 'Image Not Found'
        };
    };
    /**
     * This method destroys the maps. This method removes the events associated with the maps and disposes the objects created for rendering and updating the maps.
     *
     * @returns {void}
     */
    Maps.prototype.destroy = function () {
        this.unWireEVents();
        if (!isNullOrUndefined(this.mapsTooltipModule)) {
            this.mapsTooltipModule.removeEventListener();
        }
        _super.prototype.destroy.call(this);
        this.shapeSelectionItem = [];
        this.toggledShapeElementId = [];
        this.toggledLegendId = [];
        this.legendSelectionCollection = [];
        this.selectedLegendElementId = [];
        this.selectedNavigationElementId = [];
        this.selectedBubbleElementId = [];
        this.selectedMarkerElementId = [];
        this.selectedElementId = [];
        this.dataLabelShape = [];
        this.zoomShapeCollection = [];
        this.zoomLabelPositions = [];
        this.mouseDownEvent = { x: null, y: null };
        this.mouseClickEvent = { x: null, y: null };
        this.formatFunction = null;
        //TODO: Calling the below code throws spec issue.
        //this.renderer = null;
        this.availableSize = new Size(0, 0);
        if (document.getElementById('mapsmeasuretext')) {
            document.getElementById('mapsmeasuretext').remove();
        }
        this.removeSvg();
    };
    /**
     * Gets component name
     *
     * @returns {string} - Returns the string value
     * @private
     */
    Maps.prototype.getModuleName = function () {
        return 'maps';
    };
    /**
     * Gets the properties to be maintained in the persisted state.
     *
     * @returns {string} - Returns the string value
     * @private
     */
    Maps.prototype.getPersistData = function () {
        var keyEntity = ['translatePoint', 'zoomSettings', 'mapScaleValue', 'tileTranslatePoint', 'baseTranslatePoint',
            'scale', 'zoomPersistence', 'defaultState', 'markerZoomedState', 'initialCheck', 'initialZoomLevel', 'initialTileTranslate',
            'applyZoomReset', 'markerZoomFactor'];
        return this.addOnPersist(keyEntity);
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param {MapsModel} newProp - Specifies the new property
     * @param {MapsModel} oldProp - Specifies the old property
     * @returns {void}
     * @private
     */
    Maps.prototype.onPropertyChanged = function (newProp, oldProp) {
        if (!this.isDestroyed) {
            var render = false;
            var isMarker = false;
            var isLayer = false;
            var isStaticMapType = false;
            var layerEle = void 0;
            if (newProp['layers']) {
                var newLayerLength = Object.keys(newProp['layers']).length;
                layerEle = document.getElementById(this.element.id + '_LayerIndex_' + (newLayerLength - 1));
            }
            for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
                var prop = _a[_i];
                switch (prop) {
                    case 'background':
                        this.renderBorder();
                        break;
                    case 'height':
                    case 'width':
                    case 'layers':
                    case 'projectionType':
                    case 'centerPosition':
                    case 'legendSettings':
                    case 'baseLayerIndex':
                        if (prop === 'layers') {
                            isLayer = true;
                            var layerPropLength = Object.keys(newProp.layers).length;
                            for (var x = 0; x < layerPropLength; x++) {
                                if (!isNullOrUndefined(newProp.layers[x])) {
                                    var collection = Object.keys(newProp.layers[x]);
                                    for (var _b = 0, collection_1 = collection; _b < collection_1.length; _b++) {
                                        var collectionProp = collection_1[_b];
                                        if ((collectionProp === 'layerType' && newProp.layers[x].layerType !== 'Geometry') ||
                                            (isNullOrUndefined(this.layers[x].shapeData)
                                                && !isNullOrUndefined(this.layers[x].urlTemplate) && this.layers[x].urlTemplate !== '')) {
                                            this.isReset = true;
                                        }
                                        else if (collectionProp === 'markerSettings') {
                                            isMarker = true;
                                        }
                                        else if (collectionProp === 'staticMapType') {
                                            isStaticMapType = true;
                                        }
                                    }
                                }
                            }
                        }
                        render = true;
                        break;
                    case 'zoomSettings':
                        if (!isNullOrUndefined(oldProp.zoomSettings)) {
                            if (newProp.zoomSettings.zoomFactor !== oldProp.zoomSettings.zoomFactor && !isLayer) {
                                render = false;
                            }
                            else if (newProp.zoomSettings.shouldZoomInitially !== oldProp.zoomSettings.shouldZoomInitially) {
                                this.zoomSettings.zoomFactor = 1;
                                render = true;
                            }
                            else if (newProp.zoomSettings.enable !== oldProp.zoomSettings.enable) {
                                this.zoomSettings.zoomFactor = 1;
                                render = true;
                            }
                            else {
                                render = true;
                            }
                        }
                        break;
                    case 'locale':
                    case 'currencyCode':
                        _super.prototype.refresh.call(this);
                        break;
                }
            }
            if (render) {
                if (newProp.layers && isMarker) {
                    removeElement(this.element.id + '_Markers_Group');
                    if (this.isTileMap) {
                        this.mapLayerPanel.renderTileLayer(this.mapLayerPanel, this.layers['currentFactor'], (this.layers.length - 1));
                    }
                    else {
                        this.render();
                    }
                }
                else if (newProp.layers && isStaticMapType) {
                    this.mapLayerPanel.renderGoogleMap(this.layers[this.layers.length - 1].key, this.staticMapZoom);
                }
                else {
                    this.createSVG();
                    this.renderElements();
                }
            }
        }
    };
    /**
     * To provide the array of modules needed for maps rendering
     *
     * @returns {ModuleDeclaration[]} - Returns the modules
     * @private
     */
    Maps.prototype.requiredModules = function () {
        var modules = [];
        var isVisible = this.findVisibleLayers(this.layers);
        var annotationEnable = false;
        this.annotations.map(function (annotation) {
            annotationEnable = annotation.content != null;
        });
        if (this.isBubbleVisible()) {
            modules.push({
                member: 'Bubble',
                args: [this]
            });
        }
        if (isVisible.highlight) {
            modules.push({
                member: 'Highlight',
                args: [this]
            });
        }
        if (isVisible.selection) {
            modules.push({
                member: 'Selection',
                args: [this]
            });
        }
        if (this.legendSettings.visible) {
            modules.push({
                member: 'Legend',
                args: [this]
            });
        }
        if (this.zoomSettings.enable || this.zoomSettings.zoomFactor > this.zoomSettings.minZoom) {
            modules.push({
                member: 'Zoom',
                args: [this]
            });
        }
        if (this.isMarkersVisible()) {
            modules.push({
                member: 'Marker',
                args: [this]
            });
        }
        if (this.isDataLabelVisible()) {
            modules.push({
                member: 'DataLabel',
                args: [this]
            });
        }
        if (this.isNavigationVisible()) {
            modules.push({
                member: 'NavigationLine',
                args: [this]
            });
        }
        if (isVisible.tooltip) {
            modules.push({
                member: 'MapsTooltip',
                args: [this]
            });
        }
        if (annotationEnable) {
            modules.push({
                member: 'Annotations',
                args: [this, Annotations]
            });
        }
        if (this.allowPrint) {
            modules.push({
                member: 'Print',
                args: [this]
            });
        }
        if (this.allowImageExport) {
            modules.push({
                member: 'ImageExport',
                args: [this]
            });
        }
        if (this.allowPdfExport) {
            modules.push({
                member: 'PdfExport',
                args: [this]
            });
        }
        return modules;
    };
    /**
     * To find marker visibility
     *
     * @returns {boolean} - Returns whether the markers are visible or not.
     */
    Maps.prototype.isMarkersVisible = function () {
        var isVisible = false;
        Array.prototype.forEach.call(this.layers, function (layer) {
            for (var i = 0; i < layer.markerSettings.length; i++) {
                if (layer.markerSettings[i].visible) {
                    isVisible = true;
                    break;
                }
            }
        });
        return isVisible;
    };
    /**
     * To find DataLabel visibility
     *
     * @returns {boolean} - Returns whether the data labels are visible or not.
     */
    Maps.prototype.isDataLabelVisible = function () {
        var isVisible = false;
        for (var i = 0; i < this.layers.length; i++) {
            if (this.layers[i].dataLabelSettings.visible) {
                isVisible = true;
                break;
            }
        }
        return isVisible;
    };
    /**
     * To find navigation line visibility
     *
     * @returns {boolean} - Returns whether the navigation lines are visible or not.
     */
    Maps.prototype.isNavigationVisible = function () {
        var isVisible = false;
        Array.prototype.forEach.call(this.layers, function (layer) {
            for (var i = 0; i < layer.navigationLineSettings.length; i++) {
                if (layer.navigationLineSettings[i].visible) {
                    isVisible = true;
                    break;
                }
            }
        });
        return isVisible;
    };
    /**
     * To find marker visibility
     */
    Maps.prototype.isBubbleVisible = function () {
        var isVisible = false;
        for (var _i = 0, _a = this.layers; _i < _a.length; _i++) {
            var layer = _a[_i];
            if (this.getBubbleVisible(layer)) {
                isVisible = true;
                break;
            }
        }
        return isVisible;
    };
    /**
     * To find the bubble visibility from layer
     *
     * @param {LayerSettingsModel} layer - Spcifies the layer settings model
     * @returns {boolean} - Returns the boolean value
     * @private
     */
    Maps.prototype.getBubbleVisible = function (layer) {
        var isVisible = false;
        for (var _i = 0, _a = layer.bubbleSettings; _i < _a.length; _i++) {
            var bubble = _a[_i];
            if (bubble.visible) {
                isVisible = true;
                break;
            }
        }
        return isVisible;
    };
    /**
     * This method handles the printing functionality for the maps.
     *
     * @param {string[] | string | Element} id - Specifies the element to be printed.
     * @returns {void}
     */
    Maps.prototype.print = function (id) {
        if ((this.allowPrint) && (this.printModule) && !this.isDestroyed) {
            this.printModule.print(this, id);
        }
    };
    /**
     * This method handles the export functionality for the maps.
     *
     * @param {ExportType} type - Specifies the type of the exported file.
     * @param {string} fileName - Specifies the name of the file with which the rendered maps need to be exported.
     * @param {PdfPageOrientation} orientation - Specifies the orientation of the PDF document while exporting.
     * @param {boolean} allowDownload - Specifies whether to download as a file or get as base64 string for the file.
     * @returns {Promise<string>} - Specifies the base64 string of the exported image which is returned when the `allowDownload` is set to false.
     */
    Maps.prototype.export = function (type, fileName, orientation, allowDownload) {
        var _this = this;
        if (!this.isDestroyed) {
            if (isNullOrUndefined(allowDownload)) {
                allowDownload = true;
            }
            if ((type !== 'PDF') && (this.allowImageExport) && (this.imageExportModule)) {
                return new Promise(function (resolve, reject) {
                    resolve(_this.imageExportModule.export(_this, type, fileName, allowDownload));
                });
            }
            else if ((this.allowPdfExport) && (this.pdfExportModule)) {
                return new Promise(function (resolve, reject) {
                    resolve(_this.pdfExportModule.export(_this, type, fileName, allowDownload, orientation));
                });
            }
        }
        return null;
    };
    /**
     * This method is used to get the Bing maps URL.
     *
     * @param {string} url - Specifies the URL of the Bing maps along with the API key.
     * @returns {Promise<string>} - Returns the processed Bing URL as `Promise`.
     */
    Maps.prototype.getBingUrlTemplate = function (url) {
        var promise;
        if (!this.isDestroyed) {
            promise = new Promise(function (resolve, reject) {
                var fetchApi = new Fetch({
                    url: url
                });
                fetchApi.onSuccess = function (json) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var resource = json['resourceSets'][0]['resources'][0];
                    resolve(resource['imageUrl']);
                };
                fetchApi.send();
            });
        }
        return promise;
    };
    /**
     * To find visibility of layers and markers for required modules load.
     *
     * @param {LayerSettingsModel[]} layers - Specifies the layers.
     * @param {boolean} isLayerVisible - Specifies whether the layer is visible or not.
     * @param {boolean} isBubblevisible - Specifies whether the bubble is visible or not.
     * @param {boolean} istooltipVisible - Specifies whether the tooltip is visible or not.
     * @param {boolean} isSelection - Specifies whether the shape is selectd or not.
     * @param {boolean} isHighlight - Specfies whether the shape is highlighted or not.
     * @returns {boolean} - Returns the boolean value
     */
    Maps.prototype.findVisibleLayers = function (layers, isLayerVisible, isBubblevisible, istooltipVisible, isSelection, isHighlight) {
        if (isLayerVisible === void 0) { isLayerVisible = false; }
        if (isBubblevisible === void 0) { isBubblevisible = false; }
        if (istooltipVisible === void 0) { istooltipVisible = false; }
        if (isSelection === void 0) { isSelection = false; }
        if (isHighlight === void 0) { isHighlight = false; }
        var bubbles;
        var markers;
        var navigationLine;
        for (var _i = 0, layers_1 = layers; _i < layers_1.length; _i++) {
            var layer = layers_1[_i];
            isLayerVisible = layer.visible || isLayerVisible;
            if (layer.visible) {
                bubbles = layer.bubbleSettings;
                markers = layer.markerSettings;
                navigationLine = layer.navigationLineSettings;
                for (var _a = 0, navigationLine_1 = navigationLine; _a < navigationLine_1.length; _a++) {
                    var navigation = navigationLine_1[_a];
                    if (navigation.visible) {
                        isSelection = navigation.highlightSettings.enable || isSelection;
                        isHighlight = navigation.selectionSettings.enable || isHighlight;
                    }
                }
                for (var _b = 0, markers_1 = markers; _b < markers_1.length; _b++) {
                    var marker$$1 = markers_1[_b];
                    if (marker$$1.visible) {
                        istooltipVisible = marker$$1.tooltipSettings.visible || istooltipVisible;
                        isSelection = marker$$1.selectionSettings.enable || isSelection;
                        isHighlight = marker$$1.highlightSettings.enable || isHighlight;
                    }
                    if (istooltipVisible) {
                        break;
                    }
                }
                for (var _c = 0, bubbles_1 = bubbles; _c < bubbles_1.length; _c++) {
                    var bubble = bubbles_1[_c];
                    if (bubble.visible) {
                        istooltipVisible = bubble.tooltipSettings.visible || istooltipVisible;
                        isSelection = bubble.selectionSettings.enable || isSelection;
                        isHighlight = bubble.highlightSettings.enable || isHighlight;
                    }
                    if (istooltipVisible) {
                        break;
                    }
                }
                istooltipVisible = layer.tooltipSettings.visible || istooltipVisible;
                isSelection = layer.selectionSettings.enable || isSelection;
                isHighlight = layer.highlightSettings.enable || isHighlight;
            }
            if (isLayerVisible && isBubblevisible && istooltipVisible) {
                break;
            }
        }
        return {
            layer: isLayerVisible, bubble: isBubblevisible, tooltip: istooltipVisible,
            selection: isSelection, highlight: isHighlight
        };
    };
    /**
     * This method is used to get the geographical coordinates for location points in pixels when shape maps are rendered in the maps.
     *
     * @param {number} layerIndex - Specifies the index number of the layer of the maps.
     * @param {number} x - Specifies the x value in pixel.
     * @param {number} y - Specifies the y value in pixel.
     * @returns {GeoPosition}- Returns the geographical coordinates.
     */
    Maps.prototype.getGeoLocation = function (layerIndex, x, y) {
        var latitude = 0;
        var longitude = 0;
        if (!this.isDestroyed) {
            var container = document.getElementById(this.element.id);
            var pageX = x - (isNullOrUndefined(this.markerDragArgument) ? container.offsetLeft : 0);
            var pageY = y - (isNullOrUndefined(this.markerDragArgument) ? container.offsetTop : 0);
            var currentLayer = this.layersCollection[layerIndex];
            var translate = getTranslate(this, currentLayer, false);
            var translatePoint = translate['location'];
            var translatePointX = translatePoint.x * this.scale;
            var translatePointY = translatePoint.y * this.scale;
            var mapSize = (Math.min(this.mapAreaRect.height, this.mapAreaRect.width)
                * this.mapLayerPanel['currentFactor']) * this.scale;
            var xx = (this.clip(pageX - translatePointX, 0, mapSize - 1) / mapSize) - 0.5;
            var yy = 0.5 - (this.clip(pageY - translatePointY, 0, mapSize - 1) / mapSize);
            latitude = 90 - 360 * Math.atan(Math.exp(-yy * 2 * Math.PI)) / Math.PI;
            longitude = 360 * xx;
        }
        return { latitude: latitude, longitude: longitude };
    };
    Maps.prototype.clip = function (value, minVal, maxVal) {
        return Math.min(Math.max(value, minVal), maxVal);
    };
    /**
     * This method is used to get the geographical coordinates for location points in pixels when an online map provider is rendered in the maps.
     *
     * @param {number} x - Specifies the x value in pixel.
     * @param {number} y - Specifies the y value in pixel.
     * @returns {GeoPosition} - Returns the geographical coordinates.
     */
    Maps.prototype.getTileGeoLocation = function (x, y) {
        var latitude = 0;
        var longitude = 0;
        if (!this.isDestroyed) {
            var container = document.getElementById(this.element.id);
            var ele = document.getElementById(this.element.id + '_tile_parent');
            var latLong = this.pointToLatLong(x + this.mapAreaRect.x - (ele.offsetLeft - (isNullOrUndefined(this.markerDragArgument) ? container.offsetLeft : 0)), y + this.mapAreaRect.y - (ele.offsetTop - (isNullOrUndefined(this.markerDragArgument) ? container.offsetTop : 0)));
            latitude = latLong['latitude'];
            longitude = latLong['longitude'];
        }
        return { latitude: latitude, longitude: longitude };
    };
    /**
     * This method is used to convert the point in pixels to latitude and longitude in maps.
     *
     * @param {number} pageX - Specifies the x position value in pixels.
     * @param {number} pageY - Specifies the y position value in pixels.
     * @returns {Object} - Returns the latitude and longitude values.
     */
    Maps.prototype.pointToLatLong = function (pageX, pageY) {
        var latitude = 0;
        var longitude = 0;
        if (!this.isDestroyed) {
            var padding = this.layers[this.layers.length - 1].layerType === 'GoogleStaticMap' ? 0 : 10;
            pageY = pageY + padding;
            var mapSize = 256 * Math.pow(2, this.tileZoomLevel);
            var x1 = (this.clip(pageX - (this.translatePoint.x * this.scale), 0, mapSize - 1) / mapSize) - 0.5;
            var y1 = 0.5 - (this.clip(pageY - (this.translatePoint.y * this.scale), 0, mapSize - 1) / mapSize);
            latitude = 90 - 360 * Math.atan(Math.exp(-y1 * 2 * Math.PI)) / Math.PI;
            longitude = 360 * x1;
        }
        return { latitude: latitude, longitude: longitude };
    };
    __decorate([
        Property(null)
    ], Maps.prototype, "background", void 0);
    __decorate([
        Property(false)
    ], Maps.prototype, "useGroupingSeparator", void 0);
    __decorate([
        Property(null)
    ], Maps.prototype, "format", void 0);
    __decorate([
        Property(null)
    ], Maps.prototype, "width", void 0);
    __decorate([
        Property(null)
    ], Maps.prototype, "height", void 0);
    __decorate([
        Property('MouseMove')
    ], Maps.prototype, "tooltipDisplayMode", void 0);
    __decorate([
        Property(false)
    ], Maps.prototype, "allowPrint", void 0);
    __decorate([
        Property(false)
    ], Maps.prototype, "allowImageExport", void 0);
    __decorate([
        Property(false)
    ], Maps.prototype, "allowPdfExport", void 0);
    __decorate([
        Complex({}, TitleSettings)
    ], Maps.prototype, "titleSettings", void 0);
    __decorate([
        Complex({}, ZoomSettings)
    ], Maps.prototype, "zoomSettings", void 0);
    __decorate([
        Complex({}, LegendSettings)
    ], Maps.prototype, "legendSettings", void 0);
    __decorate([
        Collection([], LayerSettings)
    ], Maps.prototype, "layers", void 0);
    __decorate([
        Collection([], Annotation)
    ], Maps.prototype, "annotations", void 0);
    __decorate([
        Complex({}, Margin)
    ], Maps.prototype, "margin", void 0);
    __decorate([
        Complex({ color: '#DDDDDD', width: 0 }, Border)
    ], Maps.prototype, "border", void 0);
    __decorate([
        Property('Material')
    ], Maps.prototype, "theme", void 0);
    __decorate([
        Property('Mercator')
    ], Maps.prototype, "projectionType", void 0);
    __decorate([
        Property(0)
    ], Maps.prototype, "baseLayerIndex", void 0);
    __decorate([
        Property(null)
    ], Maps.prototype, "description", void 0);
    __decorate([
        Property(1)
    ], Maps.prototype, "tabIndex", void 0);
    __decorate([
        Complex({ latitude: null, longitude: null }, CenterPosition)
    ], Maps.prototype, "centerPosition", void 0);
    __decorate([
        Complex({}, MapsAreaSettings)
    ], Maps.prototype, "mapsArea", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "load", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "beforePrint", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "loaded", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "click", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "onclick", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "doubleClick", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "rightClick", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "resize", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "tooltipRender", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "legendRendering", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "tooltipRenderComplete", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "shapeSelected", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "itemSelection", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "itemHighlight", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "shapeHighlight", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "layerRendering", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "shapeRendering", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "markerRendering", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "markerClusterRendering", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "markerClick", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "markerDragStart", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "markerDragEnd", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "markerClusterClick", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "markerClusterMouseMove", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "markerMouseMove", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "dataLabelRendering", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "bubbleRendering", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "bubbleClick", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "bubbleMouseMove", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "animationComplete", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "annotationRendering", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "zoom", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "pan", void 0);
    Maps = __decorate([
        NotifyPropertyChanges
    ], Maps);
    return Maps;
}(Component));

/**
 * Bubble module class
 */
var Bubble = /** @__PURE__ @class */ (function () {
    function Bubble(maps) {
        /**
         * Bubble Id for current layer
         * @private
         */
        this.id = '';
        this.maps = maps;
        this.bubbleCollection = [];
    }
    // eslint-disable-next-line valid-jsdoc
    /**
     * To render bubble
     *
     * @private
     */
    Bubble.prototype.renderBubble = function (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bubbleSettings, shapeData, color, range, bubbleIndex, dataIndex, layerIndex, layer, group, bubbleID) {
        var _this = this;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var layerData = layer.layerData;
        var colorValuePath = bubbleSettings.colorValuePath;
        var equalValue = (!isNullOrUndefined(colorValuePath)) ? ((colorValuePath.indexOf('.') > -1) ?
            (getValueFromObject(shapeData, bubbleSettings.colorValuePath)) : shapeData[colorValuePath]) :
            shapeData[colorValuePath];
        var colorValue = (!isNullOrUndefined(colorValuePath)) ? ((colorValuePath.indexOf('.') > -1) ?
            Number(getValueFromObject(shapeData, bubbleSettings.colorValuePath)) : Number(shapeData[colorValuePath])) :
            Number(shapeData[colorValuePath]);
        var bubbleValue = (!isNullOrUndefined(bubbleSettings.valuePath)) ? ((bubbleSettings.valuePath.indexOf('.') > -1) ?
            Number(getValueFromObject(shapeData, bubbleSettings.valuePath)) : Number(shapeData[bubbleSettings.valuePath])) :
            Number(shapeData[bubbleSettings.valuePath]);
        var opacity;
        var bubbleColor;
        if (isNaN(bubbleValue) && isNaN(colorValue) && isNullOrUndefined(equalValue)) {
            return null;
        }
        var radius = getRatioOfBubble(bubbleSettings.minRadius, bubbleSettings.maxRadius, bubbleValue, range.min, range.max);
        var colorMapping = new ColorMapping(this.maps);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var shapeColor = colorMapping.getColorByValue(bubbleSettings.colorMapping, colorValue, equalValue);
        // eslint-disable-next-line prefer-const
        bubbleColor = (Object.prototype.toString.call(shapeColor) === '[object Object]' &&
            !isNullOrUndefined(shapeColor['fill'])) ? shapeColor['fill'] : color;
        // eslint-disable-next-line prefer-const
        opacity = (Object.prototype.toString.call(shapeColor) === '[object Object]' &&
            !isNullOrUndefined(shapeColor['opacity'])) ? shapeColor['opacity'] : bubbleSettings.opacity;
        var shapePoints = [[]];
        this.maps.translateType = 'bubble';
        var midIndex = 0;
        var pointsLength = 0;
        var currentLength = 0;
        for (var i = 0, len = layerData.length; i < len; i++) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var shape = layerData[i];
            shape = shape['property'];
            var shapePath = checkPropertyPath(shapeData[layer.shapeDataPath], layer.shapePropertyPath, shape);
            var shapeDataLayerPathValue = !isNullOrUndefined(shapeData[layer.shapeDataPath]) &&
                isNaN(shapeData[layer.shapeDataPath]) ? shapeData[layer.shapeDataPath].toLowerCase() : shapeData[layer.shapeDataPath];
            var shapePathValue = !isNullOrUndefined(shape[shapePath]) && isNaN(shape[shapePath])
                ? shape[shapePath].toLowerCase() : shape[shapePath];
            if (shapeDataLayerPathValue === shapePathValue && (layerData[i].type !== 'LineString' && layerData[i].type !== 'MultiLineString' && layerData[i]['type'] !== 'Point' && layerData[i]['type'] !== 'MultiPoint')) {
                if (!layerData[i]['_isMultiPolygon']) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    shapePoints.push(this.getPoints(layerData[i], []));
                    currentLength = shapePoints[shapePoints.length - 1].length;
                    if (pointsLength < currentLength) {
                        pointsLength = currentLength;
                        midIndex = shapePoints.length - 1;
                    }
                }
                else {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var layer_1 = layerData[i];
                    for (var j = 0; j < layer_1.length; j++) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        shapePoints.push(this.getPoints(layer_1[j], []));
                        currentLength = shapePoints[shapePoints.length - 1].length;
                        if (pointsLength < currentLength) {
                            pointsLength = currentLength;
                            midIndex = shapePoints.length - 1;
                        }
                    }
                }
            }
        }
        var projectionType = this.maps.projectionType;
        var centerY;
        var eventArgs;
        var bubbleBorder = {
            color: bubbleSettings.border.color, opacity: bubbleSettings.border.opacity,
            width: bubbleSettings.border.width
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var center = findMidPointOfPolygon(shapePoints[midIndex], projectionType, layer.geometryType);
        if (bubbleSettings.visible) {
            if (!isNullOrUndefined(center)) {
                centerY = this.maps.projectionType === 'Mercator' ? center['y'] : (-center['y']);
                eventArgs = {
                    cancel: false, name: bubbleRendering, border: bubbleBorder,
                    cx: center['x'], cy: centerY, data: shapeData, fill: bubbleColor,
                    maps: this.maps, radius: radius
                };
            }
            else {
                var shapePointsLength = shapePoints.length - 1;
                if (shapePoints[shapePointsLength]['x'] && shapePoints[shapePointsLength]['y']) {
                    eventArgs = {
                        cancel: false, name: bubbleRendering, border: bubbleBorder,
                        cx: shapePoints[shapePointsLength]['x'], cy: shapePoints[shapePointsLength]['y'],
                        data: shapeData, fill: bubbleColor, maps: this.maps,
                        radius: radius
                    };
                }
                else {
                    return;
                }
            }
            this.maps.trigger('bubbleRendering', eventArgs, function (bubbleArgs) {
                if (eventArgs.cancel) {
                    return;
                }
                var bubbleElement;
                eventArgs.border.opacity = isNullOrUndefined(eventArgs.border.opacity) ? opacity : eventArgs.border.opacity;
                if (bubbleSettings.bubbleType === 'Circle') {
                    var circle = new CircleOption(bubbleID, eventArgs.fill, eventArgs.border, opacity, 0, 0, eventArgs.radius, null);
                    bubbleElement = drawCircle(_this.maps, circle, group);
                }
                else {
                    var y = _this.maps.projectionType === 'Mercator' ? (eventArgs.cy - radius) : (eventArgs.cy + radius);
                    var rectangle = new RectOption(bubbleID, eventArgs.fill, eventArgs.border, opacity, new Rect(0, 0, radius * 2, radius * 2), 2, 2);
                    eventArgs.cx -= radius;
                    eventArgs.cy = y;
                    bubbleElement = drawRectangle(_this.maps, rectangle, group);
                }
                maintainSelection(_this.maps.selectedBubbleElementId, _this.maps.bubbleSelectionClass, bubbleElement, 'BubbleselectionMapStyle');
                _this.bubbleCollection.push({
                    LayerIndex: layerIndex,
                    BubbleIndex: bubbleIndex,
                    DataIndex: dataIndex,
                    element: bubbleElement,
                    center: { x: eventArgs.cx, y: eventArgs.cy }
                });
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var translate;
                var animate$$1 = layer.animationDuration !== 0 || isNullOrUndefined(_this.maps.zoomModule);
                if (_this.maps.zoomSettings.zoomFactor > 1 && !isNullOrUndefined(_this.maps.zoomModule) && !_this.maps.isTileMap) {
                    translate = getZoomTranslate(_this.maps, layer, animate$$1);
                }
                else {
                    translate = getTranslate(_this.maps, layer, animate$$1);
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var bubbleDataSource = bubbleSettings.dataSource;
                var scale = translate['scale'];
                var transPoint = translate['location'];
                var position = new MapLocation((_this.maps.isTileMap ? ((eventArgs.cx + _this.maps.translatePoint.x) * _this.maps.tileZoomLevel) : ((eventArgs.cx + transPoint.x) * scale)), (_this.maps.isTileMap ? ((eventArgs.cy + _this.maps.translatePoint.y) * _this.maps.tileZoomLevel) : ((eventArgs.cy + transPoint.y) * scale)));
                bubbleElement.setAttribute('transform', 'translate( ' + (position.x) + ' ' + (position.y) + ' )');
                var bubble = (bubbleDataSource.length - 1) === dataIndex ? 'bubble' : null;
                if (bubbleSettings.bubbleType === 'Square') {
                    position.x += radius;
                    position.y += radius * (_this.maps.projectionType === 'Mercator' ? 1 : -1);
                }
                else {
                    radius = 0;
                }
                if (bubbleSettings.animationDuration > 0) {
                    elementAnimate(bubbleElement, bubbleSettings.animationDelay, bubbleSettings.animationDuration, position, _this.maps, bubble, radius);
                }
            });
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Bubble.prototype.getPoints = function (shape, points) {
        if (isNullOrUndefined(shape.map)) {
            points = shape['point'];
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            shape.map(function (current) {
                points.push(new Point(current['point']['x'], current['point']['y']));
            });
        }
        return points;
    };
    /**
     * To check and trigger bubble click event
     *
     * @param {PointerEvent} e - Specifies the pointer event argument.
     * @returns {void}
     * @private
     */
    Bubble.prototype.bubbleClick = function (e) {
        var target = e.target.id;
        if (target.indexOf('_LayerIndex_') === -1) {
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var data = this.getbubble(target);
        if (isNullOrUndefined(data)) {
            return;
        }
        var eventArgs = {
            cancel: false, name: bubbleClick, data: data, maps: this.maps,
            target: target, x: e.clientX, y: e.clientY
        };
        this.maps.trigger(bubbleClick, eventArgs);
    };
    /**
     * To get bubble from target id
     *
     * @param {string} target - Specifies the target
     * @returns {object} - Returns the object
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Bubble.prototype.getbubble = function (target) {
        var id = target.split('_LayerIndex_');
        var index = parseInt(id[1].split('_')[0], 10);
        var layer = this.maps.layers[index];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var data;
        if (target.indexOf('_BubbleIndex_') > -1) {
            var bubbleIndex = parseInt(id[1].split('_BubbleIndex_')[1], 10);
            var dataIndex = parseInt(id[1].split('_BubbleIndex_')[1].split('_dataIndex_')[1], 10);
            if (!isNaN(bubbleIndex)) {
                data = layer.bubbleSettings[bubbleIndex].dataSource[dataIndex];
                return data;
            }
        }
        return null;
    };
    // eslint-disable-next-line valid-jsdoc
    /**
     * To check and trigger bubble move event
     *
     * @param {PointerEvent} e - Specifies the pointer event argument.
     * @retruns {void}
     * @private
     */
    Bubble.prototype.bubbleMove = function (e) {
        var target = e.target.id;
        if (target.indexOf('_LayerIndex_') === -1) {
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var data = this.getbubble(target);
        if (isNullOrUndefined(data)) {
            return;
        }
        var eventArgs = {
            cancel: false, name: bubbleMouseMove, data: data, maps: this.maps,
            target: target, x: e.clientX, y: e.clientY
        };
        this.maps.trigger(bubbleMouseMove, eventArgs);
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    Bubble.prototype.getModuleName = function () {
        return 'Bubble';
    };
    /**
     * To destroy the bubble.
     *
     * @returns {void}
     * @private
     */
    Bubble.prototype.destroy = function () {
        this.bubbleCollection = [];
        //TODO: Calling the below code throws spec issue.
        //this.maps = null;
    };
    return Bubble;
}());

/**
 * DataLabel Module used to render the maps datalabel
 */
var DataLabel = /** @__PURE__ @class */ (function () {
    function DataLabel(maps) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.value = { rightWidth: 0, leftWidth: 0, heightTop: 0, heightBottom: 0 };
        this.maps = maps;
        this.dataLabelCollections = [];
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    DataLabel.prototype.getDataLabel = function (dataSource, labelPath, shapeName, shapeDataPath) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var text;
        var shapeNameValue;
        for (var i = 0; i < dataSource.length; i++) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var data = dataSource[i];
            var dataShapePathValue = !isNullOrUndefined(data[shapeDataPath]) && isNaN(data[shapeDataPath]) &&
                typeof data[shapeDataPath] === 'string' ? data[shapeDataPath].toLowerCase() : data[shapeDataPath];
            shapeName = !isNullOrUndefined(shapeName) && typeof shapeName === 'string' ? shapeName.toString() : shapeName;
            shapeNameValue = !isNullOrUndefined(shapeName) && typeof shapeName === 'string' ? shapeName.toLowerCase() : shapeName;
            if ((dataShapePathValue) === shapeNameValue) {
                text = data;
                break;
            }
        }
        return text;
    };
    /**
     * To render label for maps
     *
     * @param {LayerSettings} layer - Specifies the layer settings
     * @param {number} layerIndex - Specifies the layer index.
     * @param {any} shape - Specifies the shape.
     * @param {any[]} layerData - Specifies the layer data.
     * @param {Element} group Specifies the element.
     * @param {HTMLElement} labelTemplateElement - Specifies the template element.
     * @param {number} index - Specifies the index number.
     * @param {any[]} intersect - Specifies the intersect.
     * @returns {void}
     * @private
     */
    DataLabel.prototype.renderLabel = function (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    layer, layerIndex, shape, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    layerData, group, labelTemplateElement, index, intersect) {
        var _this = this;
        var dataLabel = layer.dataLabelSettings;
        var style = layer.dataLabelSettings.textStyle;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var templateFn;
        var options;
        var dataLabelSettings = layer.dataLabelSettings;
        var labelpath = layer.dataLabelSettings.labelPath;
        var shapePoint = [[]];
        var midIndex = 0;
        var pointsLength = 0;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var shapeData = shape;
        var element;
        var text = '';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var datasrcObj;
        var currentLength = 0;
        var oldIndex;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var location;
        var sublayerIndexLabel = false;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var shapeProperties = shape['properties'];
        var labelId = this.maps.element.id + '_LayerIndex_' + layerIndex + '_shapeIndex_' + index + '_LabelIndex_' + index;
        var textLocation = new Point(0, 0);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var shapes = layerData[index];
        var locationX;
        var locationY;
        style.fontFamily = this.maps.theme.toLowerCase() !== 'material' ? this.maps.themeStyle.labelFontFamily : style.fontFamily;
        style.fontWeight = style.fontWeight || this.maps.themeStyle.fontWeight || Theme.dataLabelFont.fontWeight;
        shape = shapes['property'];
        var properties = (Object.prototype.toString.call(layer.shapePropertyPath) === '[object Array]' ?
            layer.shapePropertyPath : [layer.shapePropertyPath]);
        var propertyPath;
        var isPoint = false;
        var animate$$1 = layer.animationDuration !== 0 || isNullOrUndefined(this.maps.zoomModule);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var translate = (this.maps.isTileMap) ? new Object() : ((this.maps.zoomSettings.zoomFactor > 1 &&
            !isNullOrUndefined(this.maps.zoomModule)) ? getZoomTranslate(this.maps, layer, animate$$1) :
            getTranslate(this.maps, layer, animate$$1));
        var scale = (this.maps.isTileMap) ? this.maps.scale : translate['scale'];
        var transPoint = (this.maps.isTileMap) ? this.maps.translatePoint : translate['location'];
        var zoomTransPoint = this.maps.zoomTranslatePoint;
        var shapeWidth;
        var scaleZoomValue = !isNullOrUndefined(this.maps.scale) ? Math.floor(this.maps.scale) : 1;
        var zoomLabelsPosition = this.maps.zoomSettings.enable ? !isNullOrUndefined(this.maps.zoomShapeCollection) &&
            this.maps.zoomShapeCollection.length > 0 && !this.maps.isAddLayer : this.maps.zoomSettings.enable;
        this.maps.translateType = 'labels';
        for (var j = 0; j < properties.length; j++) {
            if (shapeProperties[properties[j]]) {
                propertyPath = properties[j];
                datasrcObj = this.getDataLabel(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                layer.dataSource, layer.shapeDataPath, shapeData['properties'][propertyPath], layer.shapeDataPath);
                if (datasrcObj) {
                    break;
                }
            }
        }
        datasrcObj = this.getDataLabel(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        layer.dataSource, layer.shapeDataPath, shapeData['properties'][propertyPath], layer.shapeDataPath);
        if (!isNullOrUndefined(shapes['property'])) {
            shapePoint = [[]];
            if (!layerData[index]['_isMultiPolygon'] && layerData[index]['type'] !== 'Point' && layerData[index]['type'] !== 'MultiPoint') {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                shapePoint.push(this.getPoint(layerData[index], []));
                currentLength = shapePoint[shapePoint.length - 1].length;
                if (pointsLength < currentLength) {
                    pointsLength = currentLength;
                    midIndex = shapePoint.length - 1;
                }
            }
            else if (layerData[index]['type'] !== 'Point' && layerData[index]['type'] !== 'MultiPoint') {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var layer_1 = layerData[index];
                for (var j = 0; j < layer_1.length; j++) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    shapePoint.push(this.getPoint(layer_1[j], []));
                    currentLength = shapePoint[shapePoint.length - 1].length;
                    if (pointsLength < currentLength) {
                        pointsLength = currentLength;
                        midIndex = shapePoint.length - 1;
                    }
                }
            }
        }
        text = (!isNullOrUndefined(datasrcObj)) ? !isNullOrUndefined(datasrcObj[labelpath]) ?
            datasrcObj[labelpath].toString() : datasrcObj[layer.shapeDataPath] : shapeData['properties'][labelpath];
        if ((Object.prototype.toString.call(layer.shapePropertyPath) === '[object Array]') &&
            (isNullOrUndefined(text) && layer.dataSource['length'] === 0)) {
            for (var l = 0; l < layer.shapePropertyPath.length; l++) {
                if (shapeData['properties'][layer.shapePropertyPath[l]]) {
                    text = shapeData['properties'][layer.shapePropertyPath[l]];
                    break;
                }
            }
        }
        if (isNullOrUndefined(text) && (layer.dataLabelSettings.template !== '' && layer.dataSource['length'] === 0)) {
            text = shapeData['properties'][layer.shapePropertyPath];
        }
        if (isNullOrUndefined(text) && layer.dataSource['length'] > 0) {
            text = '';
        }
        var dataLabelText = text;
        var projectionType = this.maps.projectionType;
        if (isPoint) {
            location = {
                x: shapePoint[midIndex][index]['x'], y: shapePoint[midIndex][index]['y'],
                rightMin: 0, rightMax: 0, leftMin: 0, leftMax: 0,
                points: shapePoint[midIndex][index], topMax: 0, topMin: 0,
                bottomMax: 0, bottomMin: 0, height: 0
            };
        }
        else {
            location = findMidPointOfPolygon(shapePoint[midIndex], projectionType, layer.geometryType);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var firstLevelMapLocation = location;
        if (!isNullOrUndefined(text) && !isNullOrUndefined(location)) {
            if (zoomLabelsPosition && scaleZoomValue > 1 && !this.maps.zoomNotApplied && dataLabel.template === '') {
                if (layerIndex > 0) {
                    for (var k = 0; k < this.maps.zoomLabelPositions.length; k++) {
                        if (this.maps.zoomLabelPositions[k]['dataLabelText'] === text) {
                            oldIndex = index;
                            index = k;
                            sublayerIndexLabel = true;
                            break;
                        }
                    }
                }
                locationX = location['x'];
                locationY = location['y'];
                location['x'] = ((location['x'] + zoomTransPoint['x']) * scale);
                location['y'] = ((location['y'] + zoomTransPoint['y']) * scale);
            }
            location['y'] = (this.maps.projectionType === 'Mercator') || layer.geometryType === 'Normal' ? location['y'] : (-location['y']);
            if (!isNullOrUndefined(this.maps.format) && !isNaN(parseFloat(text))) {
                if (this.maps.useGroupingSeparator) {
                    text = Internalize(this.maps, parseFloat(text));
                    if (!isNullOrUndefined(datasrcObj)) {
                        datasrcObj[labelpath] = text;
                    }
                }
            }
            var eventargs_1 = {
                name: dataLabelRendering, maps: this.maps, cancel: false, border: { color: dataLabel.border.color,
                    width: dataLabel.border.width, opacity: dataLabel.border.opacity }, datalabel: dataLabel,
                fill: dataLabel.fill, template: dataLabel.template, text: text, offsetX: 0, offsetY: 0
            };
            this.maps.trigger('dataLabelRendering', eventargs_1, function (labelArgs) {
                if (eventargs_1.cancel) {
                    return;
                }
                var position = [];
                var width = zoomLabelsPosition && scaleZoomValue > 1 && !_this.maps.zoomNotApplied
                    && _this.maps.zoomShapeCollection.length > index ? (_this.maps.dataLabelShape[index]) * scale :
                    (location['rightMax']['x'] - location['leftMax']['x']) * scale;
                if (!isNullOrUndefined(_this.maps.dataLabelShape) && !_this.maps.isReset) {
                    shapeWidth = firstLevelMapLocation['rightMax']['x'] - firstLevelMapLocation['leftMax']['x'];
                    _this.maps.dataLabelShape.push(shapeWidth);
                }
                if (eventargs_1.text !== text && !eventargs_1.cancel) {
                    text = eventargs_1.text;
                }
                var textSize = measureText(text, style);
                var trimmedLable = text;
                var elementSize = textSize;
                var startY = location['y'] - textSize['height'] / 4;
                var endY = location['y'] + textSize['height'] / 4;
                var start = ((location['y'] + transPoint['y']) * scale) - textSize['height'] / 4;
                var end = ((location['y'] + transPoint['y']) * scale) + textSize['height'] / 4;
                position = filter(shapePoint[midIndex], startY, endY);
                if (!isPoint && position.length > 5 && (shapeData['geometry']['type'] !== 'MultiPolygon') &&
                    (shapeData['type'] !== 'MultiPolygon')) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var location1 = findMidPointOfPolygon(position, projectionType, layer.geometryType);
                    if (zoomLabelsPosition && scaleZoomValue > 1 && !_this.maps.zoomNotApplied && eventargs_1.template === '') {
                        location1['x'] = ((_this.maps.zoomLabelPositions[index]['location']['x'] + zoomTransPoint['x']) * scale);
                        location1['y'] = ((_this.maps.zoomLabelPositions[index]['location']['y'] + zoomTransPoint['y']) * scale);
                    }
                    locationX = location1['x'];
                    location['x'] = location1['x'];
                    width = zoomLabelsPosition && scaleZoomValue > 1 && !_this.maps.zoomNotApplied
                        && _this.maps.zoomShapeCollection.length > index ? (_this.maps.dataLabelShape[index]) * scale :
                        ((location1['rightMax']['x'] - location1['leftMax']['x']) * scale) > 0 ?
                            ((location1['rightMax']['x'] - location1['leftMax']['x']) * scale) : width;
                }
                var xpositionEnds = ((location['x'] + transPoint['x']) * scale) + textSize['width'] / 2;
                var xpositionStart = ((location['x'] + transPoint['x']) * scale) - textSize['width'] / 2;
                _this.value[index] = { rightWidth: xpositionEnds, leftWidth: xpositionStart, heightTop: start, heightBottom: end };
                var labelElement;
                if (eventargs_1.template !== '') {
                    templateFn = getTemplateFunction(eventargs_1.template, _this.maps);
                    var templateElement = templateFn ? templateFn(!isNullOrUndefined(datasrcObj) ?
                        datasrcObj : shapeData['properties'], _this.maps, eventargs_1.template, _this.maps.element.id + '_LabelTemplate', false) : document.createElement('div');
                    templateElement.innerHTML = !templateFn ? eventargs_1.template : '';
                    labelElement = convertElementFromLabel(templateElement, labelId, !isNullOrUndefined(datasrcObj) ? datasrcObj : shapeData['properties'], index, _this.maps);
                    if (_this.maps.isTileMap) {
                        labelElement.style.left = (((location['x'] + transPoint['x']) * scale) - (textSize['width'] / 2)) + 'px';
                        labelElement.style.top = (((location['y'] + transPoint['y']) * scale) - textSize['height']) + 'px';
                    }
                    else {
                        labelElement.style.left = ((Math.abs(_this.maps.baseMapRectBounds['min']['x'] - location['x'])) * scale) + labelArgs.offsetX + 'px';
                        labelElement.style.top = ((Math.abs(_this.maps.baseMapRectBounds['min']['y'] - location['y'])) * scale) + labelArgs.offsetY + 'px';
                    }
                    labelTemplateElement.appendChild(labelElement);
                }
                else {
                    if (dataLabelSettings.smartLabelMode === 'Trim') {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var textType = typeof text === 'number' ? text.toString() : text;
                        trimmedLable = textTrim(width, textType, style);
                        elementSize = measureText(trimmedLable, style);
                        options = new TextOption(labelId, textLocation.x, textLocation.y, 'middle', trimmedLable, '', '');
                    }
                    if (dataLabelSettings.smartLabelMode === 'None') {
                        options = new TextOption(labelId, (textLocation.x), textLocation.y, 'middle', text, '', '');
                    }
                    if (dataLabelSettings.smartLabelMode === 'Hide') {
                        text = (width >= textSize['width']) ? text : '';
                        options = new TextOption(labelId, (textLocation.x), (textLocation.y), 'middle', text, '', '');
                    }
                    text = options['text'];
                    if (dataLabelSettings.intersectionAction === 'Hide') {
                        for (var i = 0; i < intersect.length; i++) {
                            if (!isNullOrUndefined(intersect[i])) {
                                if (!(_this.value[index]['leftWidth'] > intersect[i]['rightWidth']
                                    || _this.value[index]['rightWidth'] < intersect[i]['leftWidth']
                                    || _this.value[index]['heightTop'] > intersect[i]['heightBottom']
                                    || _this.value[index]['heightBottom'] < intersect[i]['heightTop'])) {
                                    text = '';
                                    break;
                                }
                            }
                        }
                        intersect.push(_this.value[index]);
                        options = new TextOption(labelId, textLocation.x, textLocation.y, 'middle', text, '', '');
                    }
                    var difference = void 0;
                    if (dataLabelSettings.intersectionAction === 'Trim') {
                        for (var j = 0; j < intersect.length; j++) {
                            if (!isNullOrUndefined(intersect[j])) {
                                if (intersect[j]['rightWidth'] < _this.value[index]['leftWidth']
                                    || intersect[j]['leftWidth'] > _this.value[index]['rightWidth']
                                    || intersect[j]['heightBottom'] < _this.value[index]['heightTop']
                                    || intersect[j]['heightTop'] > _this.value[index]['heightBottom']) {
                                    trimmedLable = text;
                                    difference = 0;
                                }
                                else {
                                    if (_this.value[index]['leftWidth'] > intersect[j]['leftWidth']) {
                                        width = intersect[j]['rightWidth'] - _this.value[index]['leftWidth'];
                                        difference = width - (_this.value[index]['rightWidth'] - _this.value[index]['leftWidth']);
                                        trimmedLable = textTrim(difference, text, style);
                                        break;
                                    }
                                    if (_this.value[index]['leftWidth'] < intersect[j]['leftWidth']) {
                                        width = _this.value[index]['rightWidth'] - intersect[j]['leftWidth'];
                                        difference = Math.abs(width - (_this.value[index]['rightWidth'] - _this.value[index]['leftWidth']));
                                        trimmedLable = textTrim(difference, text, style);
                                        break;
                                    }
                                }
                            }
                        }
                        elementSize = measureText(trimmedLable, style);
                        intersect.push(_this.value[index]);
                        options = new TextOption(labelId, textLocation.x, (textLocation.y), 'middle', trimmedLable, '', '');
                    }
                    if (dataLabelSettings.intersectionAction === 'None') {
                        options = new TextOption(labelId, (textLocation.x), (textLocation.y), 'middle', text, '', '');
                    }
                    if (trimmedLable.length > 1) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var border = eventargs_1.border;
                        if (border['width'] > 1) {
                            var fill = eventargs_1.fill;
                            var opacity = dataLabelSettings.opacity;
                            var rx = dataLabelSettings.rx;
                            var ry = dataLabelSettings.ry;
                            var x = void 0;
                            var y = void 0;
                            var padding = 5;
                            if (zoomLabelsPosition && scaleZoomValue > 1 && !_this.maps.zoomNotApplied) {
                                x = ((location['x'])) - textSize['width'] / 2;
                                y = ((location['y'])) - textSize['height'] / 2 - padding;
                            }
                            else {
                                x = ((location['x'] + transPoint['x']) * scale) - textSize['width'] / 2;
                                y = ((location['y'] + transPoint['y']) * scale) - textSize['height'] / 2;
                            }
                            border.opacity = isNullOrUndefined(border.opacity) ? opacity : border.opacity;
                            var rectOptions = new RectOption(_this.maps.element.id + '_LayerIndex_' + layerIndex + '_shapeIndex_' + index + '_rectIndex_' + index, fill, border, opacity, new Rect((x + labelArgs.offsetX), (y + labelArgs.offsetY), textSize['width'], textSize['height']), rx, ry);
                            var rect = _this.maps.renderer.drawRectangle(rectOptions);
                            group.appendChild(rect);
                        }
                    }
                    element = renderTextElement(options, style, style.color || _this.maps.themeStyle.dataLabelFontColor, group);
                    if (zoomLabelsPosition && scaleZoomValue > 1 && !_this.maps.zoomNotApplied) {
                        element.setAttribute('transform', 'translate( ' + ((location['x'] + labelArgs.offsetX)) + ' '
                            + (((location['y'] + labelArgs.offsetY))) + ' )');
                        location['x'] = locationX;
                        location['y'] = locationY;
                    }
                    else {
                        element.setAttribute('transform', 'translate( ' + (((location['x'] + transPoint.x) * scale) + labelArgs.offsetX) + ' '
                            + ((((location['y'] + transPoint.y) * scale) + (elementSize.height / 4)) + labelArgs.offsetY) + ' )');
                    }
                    group.appendChild(element);
                }
                _this.dataLabelCollections.push({
                    location: { x: location['x'] + labelArgs.offsetX, y: location['y'] + labelArgs.offsetY },
                    element: isNullOrUndefined(labelElement) ? element : labelElement,
                    layerIndex: layerIndex,
                    shapeIndex: sublayerIndexLabel ? oldIndex : index,
                    labelIndex: sublayerIndexLabel ? oldIndex : index,
                    dataLabelText: dataLabelText
                });
                if (labelTemplateElement.childElementCount > 0 && !_this.maps.element.contains(labelTemplateElement)) {
                    document.getElementById(_this.maps.element.id + '_Secondary_Element').appendChild(labelTemplateElement);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    _this.maps.renderReactTemplates();
                }
            });
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    DataLabel.prototype.getPoint = function (shapes, points) {
        if (shapes['type'] === 'MultiLineString') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            shapes.map(function (current) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                current.map(function (shape) {
                    points.push(new Point(shape['point']['x'], shape['point']['y']));
                });
            });
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            shapes.map(function (current) {
                points.push(new Point(current['point']['x'], current['point']['y']));
            });
        }
        return points;
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    DataLabel.prototype.getModuleName = function () {
        return 'DataLabel';
    };
    /**
     * @returns {void}
     * @private
     */
    DataLabel.prototype.destroy = function () {
        this.dataLabelCollections = [];
        this.value = null;
        this.maps = null;
    };
    return DataLabel;
}());

/**
 * navigation-selected-line
 */
var NavigationLine = /** @__PURE__ @class */ (function () {
    function NavigationLine(maps) {
        this.maps = maps;
    }
    /**
     * To render navigation line for maps
     *
     * @param {LayerSettings} layer - Specifies the layer instance to which the navigation line is to be rendered.
     * @param {number} factor - Specifies the current zoom factor of the Maps.
     * @param {number} layerIndex -Specifies the index of current layer.
     * @returns {Element} - Returns the navigation line element.
     * @private
     */
    NavigationLine.prototype.renderNavigation = function (layer, factor, layerIndex) {
        var group;
        if (!isNullOrUndefined(this.maps)) {
            var navigationEle = void 0;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var navigation = layer.navigationLineSettings;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var longitude = void 0;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var point = [];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var latitude = void 0;
            var visible = void 0;
            var angle = void 0;
            var width = void 0;
            var color = void 0;
            var dashArray = void 0;
            var pathOption = void 0;
            var direction = void 0;
            var showArrow = void 0;
            var arrowColor = void 0;
            var arrowSize = void 0;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var arrowSettings = void 0;
            var arrowPosition = void 0;
            var startArrow = void 0;
            var endArrow = void 0;
            var offSet = void 0;
            var offSetValue = void 0;
            var navigationGroup = void 0;
            var d = void 0;
            group = (this.maps.renderer.createGroup({
                id: this.maps.element.id + '_LayerIndex_' + layerIndex + '_line_Group'
            }));
            for (var i = 0; i < navigation.length; i++) {
                latitude = navigation[i]['properties']['latitude'];
                longitude = navigation[i]['properties']['longitude'];
                visible = navigation[i]['properties']['visible'];
                angle = navigation[i]['angle'];
                width = navigation[i]['width'] || 1;
                color = navigation[i]['color'];
                dashArray = navigation[i]['properties']['dashArray'];
                arrowSettings = navigation[i]['properties']['arrowSettings'];
                showArrow = (isNullOrUndefined(arrowSettings)) ? false : arrowSettings['properties']['showArrow'];
                if (longitude['length'] === latitude['length'] && visible) {
                    for (var i_1 = 0; i_1 < longitude['length']; i_1++) {
                        var location_1 = (this.maps.isTileMap) ? convertTileLatLongToPoint(new Point(longitude[i_1], latitude[i_1]), factor, this.maps.tileTranslatePoint, true) : convertGeoToPoint(latitude[i_1], longitude[i_1], factor, layer, this.maps);
                        point.push(location_1);
                    }
                }
                navigationGroup = (this.maps.renderer.createGroup({
                    id: this.maps.element.id + '_LayerIndex_' + layerIndex + '_NavigationGroup' + i + ''
                }));
                for (var j = 0; j < point['length'] - 1; j++) {
                    angle = (-1 > angle) ? -1 : angle;
                    angle = (1 < angle) ? 1 : angle;
                    var arcId = this.maps.element.id + '_LayerIndex_' + layerIndex + '_NavigationIndex_' + i + '_Line' + j + '';
                    var radius = this.convertRadius(point[j], point[j + 1]);
                    if (angle <= 1 && angle > 0) {
                        direction = 0;
                        if (point[j]['x'] > point[j + 1]['x']) {
                            direction = 1;
                        }
                    }
                    if (angle >= -1 && angle < 0) {
                        direction = 1;
                        if (point[j]['x'] > point[j + 1]['x']) {
                            direction = 0;
                        }
                    }
                    if (showArrow) {
                        arrowColor = arrowSettings['properties']['color'];
                        arrowSize = arrowSettings['properties']['size'];
                        offSetValue = (arrowSettings['properties']['offSet'] === undefined) ? 0 : arrowSettings['properties']['offSet'];
                        var divide = (Math.round(arrowSize / 2));
                        arrowPosition = arrowSettings['properties']['position'];
                        startArrow = (arrowPosition === 'Start') ? 'url(#triangle' + i + ')' : null;
                        endArrow = (arrowPosition === 'End') ? 'url(#triangle' + i + ')' : null;
                        if (offSet !== 0 && angle === 0) {
                            offSet = (arrowPosition === 'Start') ? offSetValue : -(offSetValue);
                        }
                        offSet = (isNullOrUndefined(offSet)) ? 0 : offSet;
                        var triId = this.maps.element.id + '_triangle';
                        var defElement = this.maps.renderer.createDefs();
                        defElement.innerHTML += '<marker id="' + 'triangle' + i + '"></marker>';
                        var markerEle = defElement.querySelector('#' + 'triangle' + i);
                        markerEle.setAttribute('markerWidth', (arrowSize.toString()));
                        markerEle.setAttribute('markerHeight', (arrowSize.toString()));
                        markerEle.setAttribute('refX', (divide - offSet).toString());
                        markerEle.setAttribute('refY', divide.toString());
                        markerEle.setAttribute('orient', 'auto');
                        var d2 = 'M 0,0  L 0,' + arrowSize + ' L ' + divide + ', ' + divide + ' Z';
                        pathOption = new PathOption(triId, arrowColor, width, color, 1, 1, dashArray, d2);
                        navigationEle = this.maps.renderer.drawPath(pathOption);
                        markerEle.appendChild(navigationEle);
                        defElement.appendChild(markerEle);
                        navigationGroup.appendChild(defElement);
                    }
                    angle = Math.abs(angle);
                    d = (angle === 0) ? 'M ' + point[j]['x'] + ',' + point[j]['y'] + 'L ' + point[j + 1]['x']
                        + ',' + point[j + 1]['y'] + ' ' :
                        'M ' + point[j]['x'] + ',' + point[j]['y'] + ' A ' + (radius / 2 + (1 - angle) * radius / (angle * 10)) +
                            ' ' + (radius / 2 + (1 - angle) * radius / (angle * 10)) + ' ' + 0 + ',' + 0 + ','
                            + direction + ' , ' + point[j + 1]['x'] + ',' + point[j + 1]['y'] + ' ';
                    pathOption = new PathOption(arcId, 'none', width, color, 1, 1, dashArray, d);
                    navigationEle = this.maps.renderer.drawPath(pathOption);
                    if (!isNullOrUndefined(arrowPosition)) {
                        var position = (arrowPosition === 'Start') ? navigationEle.setAttribute('marker-start', startArrow)
                            : navigationEle.setAttribute('marker-end', endArrow);
                    }
                    maintainSelection(this.maps.selectedNavigationElementId, this.maps.navigationSelectionClass, navigationEle, 'navigationlineselectionMapStyle');
                    navigationGroup.appendChild(navigationEle);
                    group.appendChild(navigationGroup);
                }
                point = [];
            }
        }
        return group;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    NavigationLine.prototype.convertRadius = function (point1, point2) {
        var value1 = point2['x'] - point1['x'];
        var value2 = point2['y'] - point1['y'];
        var value = Math.sqrt((Math.pow(value1, 2) + Math.pow(value2, 2)));
        return value;
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name
     */
    NavigationLine.prototype.getModuleName = function () {
        return 'NavigationLine';
    };
    /**
     * To destroy the layers.
     *
     * @returns {void}
     * @private
     */
    NavigationLine.prototype.destroy = function () {
        this.maps = null;
    };
    return NavigationLine;
}());

/**
 * Legend module is used to render legend for the maps
 */
var Legend = /** @__PURE__ @class */ (function () {
    function Legend(maps) {
        /**
         * @private
         */
        this.legendBorderRect = new Rect(0, 0, 0, 0);
        /**
         * @private
         */
        this.initialMapAreaRect = new Rect(0, 0, 0, 0);
        /**
         * @private
         */
        this.legendTotalRect = new Rect(0, 0, 0, 0);
        /**
         * @private
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.totalPages = [];
        this.page = 0;
        /**
         * @private
         */
        this.currentPage = 0;
        this.legendItemRect = new Rect(0, 0, 0, 0);
        this.heightIncrement = 0;
        this.widthIncrement = 0;
        this.textMaxWidth = 0;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.shapeHighlightCollection = [];
        /**
         * @private
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.legendHighlightCollection = [];
        /**
         * @private
         */
        this.shapePreviousColor = [];
        /**
         * @private
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.selectedNonLegendShapes = [];
        /**
         * @private
         */
        this.shapeToggled = true;
        /**
         * @private
         */
        this.legendElement = null;
        this.maps = maps;
        this.addEventListener();
    }
    /**
     * To calculate legend bounds and draw the legend shape and text.
     *
     * @returns {void}
     * @private
     */
    Legend.prototype.renderLegend = function () {
        this.legendRenderingCollections = [];
        this.legendCollection = [];
        this.totalPages = [];
        this.widthIncrement = 0;
        this.heightIncrement = 0;
        this.defsElement = this.maps.renderer.createDefs();
        this.maps.svgObject.appendChild(this.defsElement);
        this.initialMapAreaRect = this.maps.mapAreaRect;
        this.calculateLegendBounds();
        this.drawLegend();
    };
    Legend.prototype.calculateLegendBounds = function () {
        var _this = this;
        var map = this.maps;
        var legend = map.legendSettings;
        this.legendCollection = [];
        var spacing = 10;
        var leftPadding = 10;
        var topPadding = map.mapAreaRect.y;
        this.legendRenderingCollections = [];
        Array.prototype.forEach.call(map.layersCollection, function (layer, layerIndex) {
            if (!isNullOrUndefined(layer.shapeData)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var layerData = layer.shapeData['features'];
                var dataPath = layer.shapeDataPath;
                var propertyPath = layer.shapePropertyPath;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var dataSource = layer.dataSource;
                var colorValuePath = void 0;
                var colorMapping = void 0;
                if (legend.type === 'Layers' && layer.visible) {
                    colorValuePath = layer.shapeSettings.colorValuePath;
                    colorMapping = layer.shapeSettings.colorMapping;
                    _this.getLegends(layerIndex, layerData, colorMapping, dataSource, dataPath, colorValuePath, propertyPath);
                }
                else if (legend.type === 'Bubbles') {
                    for (var _i = 0, _a = layer.bubbleSettings; _i < _a.length; _i++) {
                        var bubble = _a[_i];
                        if (bubble.visible) {
                            colorValuePath = bubble.colorValuePath;
                            colorMapping = bubble.colorMapping;
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            dataSource = bubble.dataSource;
                            _this.getLegends(layerIndex, layerData, colorMapping, dataSource, dataPath, colorValuePath, propertyPath);
                        }
                    }
                }
            }
            if (legend.type === 'Markers') {
                _this.getMarkersLegendCollections(layerIndex, layer.markerSettings);
            }
        });
        if (this.legendCollection.length > 0) {
            for (var i = 0; i < this.legendCollection.length; i++) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var legendItem = this.legendCollection[i];
                var eventArgs = {
                    name: legendRendering, cancel: false, fill: legendItem['fill'], shape: legend.shape,
                    shapeBorder: legend.shapeBorder,
                    text: typeof legendItem['text'] === 'number' ? legendItem['text'].toString() : legendItem['text']
                };
                map.trigger('legendRendering', eventArgs);
                legendItem['fill'] = eventArgs.fill;
                legendItem['shape'] = eventArgs.shape;
                legendItem['shapeBorder'] = eventArgs.shapeBorder;
                legendItem['text'] = eventArgs.text;
                if (eventArgs.cancel) {
                    this.legendCollection.splice(i, 1);
                    i--;
                }
            }
        }
        var defaultSize = 25;
        var legendTitle = map.legendSettings.title.text;
        var titleTextStyle = map.legendSettings.titleStyle;
        if (this.legendCollection.length > 0) {
            var legendMode = legend.mode;
            var shapeX = 0;
            var shapeY = 0;
            var textX = 0;
            var textY = 0;
            var shapePadding = legend.shapePadding;
            var textPadding = 10;
            var shapeHeight = legend.shapeHeight;
            var shapeWidth = legend.shapeWidth;
            var shapeLocation = [];
            var textLocation = [];
            var position = legend.position;
            var labelAction = legend.labelDisplayMode;
            var arrangement = (legend.orientation === 'None') ? ((position === 'Top' || position === 'Bottom')
                ? 'Horizontal' : 'Vertical') : legend.orientation;
            var legendWidth = (legend.width.length > 1) ? (legend.width.indexOf('%') > -1) ? (map.availableSize.width / 100)
                * parseInt(legend.width, 10) : parseInt(legend.width, 10) : null;
            var legendHeight = (legend.height.length > 1) ? (legend.height.indexOf('%') > -1) ? (map.availableSize.height / 100) *
                parseInt(legend.height, 10) : parseInt(legend.height, 10) : null;
            var legendItemStartX_1;
            var legendItemStartY_1;
            var startX = 0;
            var startY = 0;
            var legendtitleSize = measureText(legendTitle, titleTextStyle);
            if (legendMode === 'Interactive') {
                var itemTextStyle = legend.textStyle;
                var legendLength = this.legendCollection.length;
                var rectWidth = (arrangement === 'Horizontal') ? (isNullOrUndefined(legendWidth)) ? (map.mapAreaRect.width / legendLength) :
                    (legendWidth / legendLength) : (isNullOrUndefined(legendWidth)) ? defaultSize : legendWidth;
                var rectHeight = (arrangement === 'Horizontal') ? (isNullOrUndefined(legendHeight)) ? defaultSize : legendHeight :
                    (isNullOrUndefined(legendHeight)) ? (map.mapAreaRect.height / legendLength) : (legendHeight / legendLength);
                startX = 0;
                startY = legendtitleSize.height + spacing;
                var position_1 = legend.labelPosition;
                var textX_1 = 0;
                var textY_1 = 0;
                var textPadding_1 = 10;
                var itemStartX = 0;
                var itemStartY = 0;
                var maxTextHeight = 0;
                var maxTextWidth = 0;
                for (var i = 0; i < this.legendCollection.length; i++) {
                    startX = (arrangement === 'Horizontal') ? (startX + rectWidth) : startX;
                    startY = (arrangement === 'Horizontal') ? startY : (startY + rectHeight);
                    var legendText = this.legendCollection[i]['text'];
                    var itemTextSize = new Size(0, 0);
                    if (labelAction === 'None') {
                        itemTextSize = measureText(legendText, itemTextStyle);
                    }
                    else if (labelAction === 'Trim') {
                        legendText = textTrim((arrangement === 'Horizontal' ? rectWidth : rectHeight), legendText, itemTextStyle);
                        itemTextSize = measureText(legendText, itemTextStyle);
                    }
                    else {
                        legendText = '';
                    }
                    maxTextHeight = Math.max(maxTextHeight, itemTextSize.height);
                    maxTextWidth = Math.max(maxTextWidth, itemTextSize.width);
                    if (itemTextSize.width > 0 && itemTextSize.height > 0) {
                        if (arrangement === 'Horizontal') {
                            textX_1 = startX + (rectWidth / 2);
                            textY_1 = (position_1 === 'After') ? (startY + rectHeight + (itemTextSize.height / 2)) + textPadding_1 :
                                (startY - textPadding_1);
                        }
                        else {
                            textX_1 = (position_1 === 'After') ? startX - (itemTextSize.width / 2) - textPadding_1
                                : (startX + rectWidth + itemTextSize.width / 2) + textPadding_1;
                            textY_1 = startY + (rectHeight / 2) + (itemTextSize.height / 4);
                        }
                    }
                    if (i === 0) {
                        itemStartX = (arrangement === 'Horizontal') ? startX : (position_1 === 'After') ?
                            textX_1 - (itemTextSize.width / 2) : startX;
                        itemStartY = (arrangement === 'Horizontal') ? (position_1 === 'After') ? startY :
                            textY_1 - (itemTextSize.height / 2) : startY;
                        if (this.legendCollection.length === 1) {
                            legendWidth = (arrangement === 'Horizontal') ? Math.abs((startX + rectWidth) - itemStartX) :
                                (rectWidth + maxTextWidth + textPadding_1);
                            legendHeight = (arrangement === 'Horizontal') ? (rectHeight + (maxTextHeight / 2) + textPadding_1) :
                                Math.abs((startY + rectHeight) - itemStartY);
                        }
                    }
                    else if (i === this.legendCollection.length - 1) {
                        legendWidth = (arrangement === 'Horizontal') ? Math.abs((startX + rectWidth) - itemStartX) :
                            (rectWidth + maxTextWidth + textPadding_1);
                        legendHeight = (arrangement === 'Horizontal') ? (rectHeight + (maxTextHeight / 2) + textPadding_1) :
                            Math.abs((startY + rectHeight) - itemStartY);
                    }
                    this.legendRenderingCollections.push({
                        fill: this.legendCollection[i]['fill'], x: startX, y: startY,
                        width: rectWidth, height: rectHeight,
                        text: legendText, textX: textX_1, textY: textY_1,
                        textWidth: itemTextSize.width, textHeight: itemTextSize.height,
                        shapeBorder: this.legendCollection[i]['shapeBorder']
                    });
                }
                if (this.legendCollection.length === 1) {
                    legendHeight = rectHeight;
                    legendWidth = rectWidth;
                }
                this.legendItemRect = { x: itemStartX, y: itemStartY, width: legendWidth, height: legendHeight };
            }
            else {
                legendWidth = (isNullOrUndefined(legendWidth)) ? map.mapAreaRect.width : legendWidth;
                legendHeight = (isNullOrUndefined(legendHeight)) ? map.mapAreaRect.height : legendHeight;
                var j = 0;
                this.page = 0;
                for (var i = 0; i < this.legendCollection.length; i++) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var legendItem = this.legendCollection[i];
                    if (isNullOrUndefined(this.totalPages[this.page])) {
                        this.totalPages[this.page] = { Page: (this.page + 1), Collection: [] };
                    }
                    var legendTextSize = measureText(legendItem['text'], legend.textStyle);
                    this.textMaxWidth = Math.max(this.textMaxWidth, legendTextSize.width);
                    if (i === 0) {
                        startX = shapeX = (leftPadding + (shapeWidth / 2));
                        startY = shapeY = topPadding + legendtitleSize.height + (shapeHeight > legendTextSize.height ? shapeHeight / 2
                            : (legendTextSize.height / 4));
                    }
                    else {
                        var maxSize = (legendTextSize.height > shapeHeight) ? legendTextSize.height : shapeHeight;
                        if (arrangement === 'Horizontal') {
                            var prvePositionX = (textLocation[j - 1].x + textLocation[j - 1].width) + textPadding + shapeWidth;
                            if ((prvePositionX + shapePadding + legendTextSize.width) > legendWidth) {
                                var nextPositionY = (textLocation[j - 1].y > (shapeLocation[j - 1].y + (shapeHeight / 2)) ?
                                    textLocation[j - 1].y : (shapeLocation[j - 1].y + (shapeHeight / 2))) + topPadding;
                                if ((nextPositionY + maxSize) > legendHeight) {
                                    this.getPageChanged();
                                    j = 0;
                                    shapeLocation = [];
                                    textLocation = [];
                                    shapeX = startX;
                                    shapeY = startY;
                                }
                                else {
                                    shapeX = (shapeLocation[0].x);
                                    shapeY = (nextPositionY + (maxSize / 2));
                                }
                            }
                            else {
                                shapeX = (prvePositionX - (shapeWidth / 2));
                                shapeY = (shapeLocation[j - 1]).y;
                            }
                        }
                        else {
                            var prevPositionY = textLocation[j - 1].y > shapeLocation[j - 1].y + (shapeHeight / 2) ?
                                textLocation[j - 1].y : shapeLocation[j - 1].y + (shapeHeight / 2);
                            if ((prevPositionY + topPadding + maxSize) > legendHeight) {
                                var nextPositionX = (textLocation[j - 1].x + this.textMaxWidth + textPadding);
                                if ((nextPositionX + shapePadding + legendTextSize.width) > legendWidth) {
                                    shapeX = startX;
                                    shapeY = startY;
                                    textLocation = [];
                                    shapeLocation = [];
                                    this.getPageChanged();
                                    j = 0;
                                }
                                else {
                                    shapeX = nextPositionX + (shapeWidth / 2);
                                    shapeY = (shapeLocation[0].y);
                                }
                            }
                            else {
                                var padding = 10;
                                shapeX = shapeLocation[j - 1].x;
                                shapeY = prevPositionY + padding + (shapeHeight / 2);
                            }
                        }
                    }
                    textX = shapeX + (shapeWidth / 2) + shapePadding;
                    textY = shapeY + (legendTextSize.height / 4);
                    shapeLocation.push({ x: shapeX, y: shapeY });
                    textLocation.push({ x: textX, y: textY, width: legendTextSize.width, height: (legendTextSize.height / 2) });
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    this.totalPages[this.page]['Collection'].push({
                        DisplayText: legendItem['text'],
                        ImageSrc: legendItem['imageSrc'],
                        Shape: { x: shapeX, y: shapeY },
                        Text: { x: textX, y: textY },
                        Fill: legendItem['fill'],
                        legendShape: legendItem['shape'],
                        shapeBorder: legendItem['shapeBorder'],
                        idIndex: i,
                        Rect: {
                            x: shapeLocation[j].x - (shapeWidth / 2),
                            y: (shapeLocation[j].y - (shapeHeight / 2)) < (textY - legendTextSize.height) ?
                                (shapeLocation[j].y - (shapeHeight / 2)) : (textY - legendTextSize.height),
                            width: Math.abs((shapeLocation[j].x - (shapeWidth / 2)) - (textX + legendTextSize.width)),
                            height: ((shapeHeight > legendTextSize.height) ? shapeHeight : legendTextSize.height)
                        }
                    });
                    j++;
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var collection = this.totalPages[0]['Collection'];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                Array.prototype.forEach.call(collection, function (legendObj, index) {
                    var legendRect = new Rect(legendObj['Rect']['x'], legendObj['Rect']['y'], legendObj['Rect']['width'], legendObj['Rect']['height']);
                    if (index === 0) {
                        legendItemStartX_1 = legendRect.x;
                        legendItemStartY_1 = legendRect.y;
                    }
                    _this.widthIncrement = Math.max(_this.widthIncrement, Math.abs(legendItemStartX_1 - (legendRect.x + legendRect.width)));
                    _this.heightIncrement = Math.max(_this.heightIncrement, Math.abs(legendItemStartY_1 - (legendRect.y + legendRect.height)));
                });
                legendWidth = ((this.widthIncrement < legendWidth) ? this.widthIncrement : legendWidth);
                legendHeight = ((this.heightIncrement < legendHeight) ? this.heightIncrement : legendHeight);
                this.legendItemRect = {
                    x: collection[0]['Rect']['x'], y: collection[0]['Rect']['y'],
                    width: legendWidth, height: legendHeight
                };
            }
        }
    };
    /**
     * Get the legend collections
     *
     * @param {number} layerIndex - Specifies the layer index
     * @param {object[]} layerData - Specifies the layer data
     * @param {ColorMappingSettings[]} colorMapping - Specifies the color mapping
     * @param {object[]} dataSource - Specifies the data source
     * @param {string} dataPath - Specifies the data path
     * @param {string} colorValuePath - Specifies the color value path
     * @param {string | string[]} propertyPath - Specifies the property path
     * @returns {void}
     */
    Legend.prototype.getLegends = function (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    layerIndex, layerData, colorMapping, dataSource, dataPath, colorValuePath, propertyPath) {
        this.getRangeLegendCollection(layerIndex, layerData, colorMapping, dataSource, dataPath, colorValuePath, propertyPath);
        this.getEqualLegendCollection(layerIndex, layerData, colorMapping, dataSource, dataPath, colorValuePath, propertyPath);
        this.getDataLegendCollection(layerIndex, layerData, colorMapping, dataSource, dataPath, colorValuePath, propertyPath);
    };
    Legend.prototype.getPageChanged = function () {
        this.page++;
        if (isNullOrUndefined(this.totalPages[this.page])) {
            this.totalPages[this.page] = { Page: (this.page + 1), Collection: [] };
        }
    };
    Legend.prototype.legendTextTrim = function (maxWidth, text, font, legendRectSize) {
        var label = text;
        var size = measureText(text, font).width;
        var legendWithoutTextSize = legendRectSize - size;
        if (legendRectSize > maxWidth) {
            var textLength = text.length;
            for (var i = textLength - 1; i >= 0; --i) {
                label = text.substring(0, i) + '...';
                size = measureText(label, font).width;
                var totalSize = legendWithoutTextSize + size;
                if (totalSize <= maxWidth || label.length < 4) {
                    if (label.length < 4) {
                        label = ' ';
                    }
                    return label;
                }
            }
        }
        return label;
    };
    // eslint-disable-next-line valid-jsdoc
    /**
     * To draw the legend shape and text.
     * @private
     */
    Legend.prototype.drawLegend = function () {
        var map = this.maps;
        var legend = map.legendSettings;
        var render = map.renderer;
        var textOptions;
        var textFont = {
            size: legend.textStyle.size,
            color: legend.textStyle.color,
            fontFamily: legend.textStyle.fontFamily,
            fontWeight: legend.textStyle.fontWeight,
            fontStyle: legend.textStyle.fontStyle,
            opacity: legend.textStyle.opacity
        };
        this.legendGroup = render.createGroup({ id: map.element.id + '_Legend_Group' });
        if (legend.mode === 'Interactive') {
            for (var i = 0; i < this.legendRenderingCollections.length; i++) {
                var itemId = map.element.id + '_Legend_Index_' + i;
                var textId = map.element.id + '_Legend_Index_' + i + '_Text';
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var item = this.legendRenderingCollections[i];
                var bounds = new Rect(item['x'], item['y'], item['width'], item['height']);
                if (i === 0) {
                    this.renderLegendBorder();
                }
                var textLocation = new Point(item['textX'], item['textY']);
                textFont.color = (textFont.color !== null) ? textFont.color : this.maps.themeStyle.legendTextColor;
                var rectOptions = new RectOption(itemId, item['fill'], item['shapeBorder'], legend.opacity, bounds);
                textOptions = new TextOption(textId, textLocation.x, textLocation.y, 'middle', item['text'], '', '');
                textFont.fontFamily = !isNullOrUndefined(textFont.fontFamily) ? textFont.fontFamily : this.maps.themeStyle.fontFamily;
                textFont.size = map.themeStyle.legendFontSize || textFont.size;
                renderTextElement(textOptions, textFont, textFont.color, this.legendGroup);
                this.legendGroup.appendChild(render.drawRectangle(rectOptions));
                this.legendToggle();
            }
        }
        else {
            this.drawLegendItem(this.currentPage);
        }
    };
    /**
     * @param {string} page - Specifies the legend page.
     * @returns {void}
     * @private
     */
    Legend.prototype.drawLegendItem = function (page) {
        var map = this.maps;
        var legend = map.legendSettings;
        var spacing = 10;
        var shapeSize = new Size(legend.shapeWidth, legend.shapeHeight);
        var textOptions;
        var render = map.renderer;
        var legendShape = legend.shape;
        if (page >= 0 && page < this.totalPages.length) {
            if (querySelector(this.legendGroup.id, this.maps.element.id)) {
                remove(querySelector(this.legendGroup.id, this.maps.element.id));
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            for (var i = 0; i < this.totalPages[page]['Collection'].length; i++) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var collection = this.totalPages[page]['Collection'][i];
                var shapeBorder = collection['shapeBorder'];
                var legendElement = render.createGroup({ id: map.element.id + '_Legend_Index_' + collection['idIndex'] });
                var legendText = collection['DisplayText'];
                var pagingArrowPadding = 4;
                var shape = ((legend.type === 'Markers') ? ((isNullOrUndefined(collection['ImageSrc'])) ?
                    legend.shape : 'Image') : collection['legendShape']);
                var strokeColor = (legend.shape === 'HorizontalLine' || legend.shape === 'VerticalLine'
                    || legend.shape === 'Cross') ? isNullOrUndefined(legend.fill) ? '#000000' : legend.fill : shapeBorder.color;
                var strokeWidth = (legend.shape === 'HorizontalLine' || legend.shape === 'VerticalLine'
                    || legend.shape === 'Cross') ? (shapeBorder.width === 0) ?
                    1 : shapeBorder.width : shapeBorder.width;
                var shapeId = map.element.id + '_Legend_Shape_Index_' + collection['idIndex'];
                var textId = map.element.id + '_Legend_Text_Index_' + collection['idIndex'];
                var shapeLocation = new Point(collection['Shape']['x'], (collection['Shape']['y'] - pagingArrowPadding));
                var textLocation = new Point(collection['Text']['x'], (collection['Text']['y'] - pagingArrowPadding));
                var renderOptions = new PathOption(shapeId, collection['Fill'], strokeWidth, strokeColor, legend.opacity, isNullOrUndefined(shapeBorder.opacity) ? legend.opacity : shapeBorder.opacity, '');
                var legendTextStyle = {
                    fontFamily: legend.textStyle.fontFamily, fontStyle: legend.textStyle.fontStyle,
                    fontWeight: legend.textStyle.fontWeight, size: legend.textStyle.size, color: legend.textStyle.color,
                    opacity: legend.textStyle.opacity
                };
                legendTextStyle.color = (legendTextStyle.color !== null) ? legendTextStyle.color :
                    this.maps.themeStyle.legendTextColor;
                legendTextStyle.fontFamily = !isNullOrUndefined(legendTextStyle.fontFamily) ? legendTextStyle.fontFamily :
                    this.maps.themeStyle.fontFamily;
                legendTextStyle.size = map.themeStyle.legendFontSize || legendTextStyle.size;
                legendTextStyle.fontWeight = legendTextStyle.fontWeight || map.themeStyle.fontWeight;
                if (i === 0) {
                    this.renderLegendBorder();
                }
                if (legend.type === 'Markers' && legend.useMarkerShape) {
                    var legendShapeData = this.legendCollection[collection['idIndex']].data[0];
                    var marker$$1 = map.layers[legendShapeData['layerIndex']].markerSettings[legendShapeData['markerIndex']];
                    legendShape = !isNullOrUndefined(marker$$1.dataSource[legendShapeData['dataIndex']][marker$$1['shapeValuePath']]) && marker$$1.dataSource[legendShapeData['dataIndex']][marker$$1['shapeValuePath']] !== '' ? marker$$1.dataSource[legendShapeData['dataIndex']][marker$$1['shapeValuePath']] : marker$$1.shape;
                }
                if (legendShape === 'Balloon') {
                    legendElement.appendChild(drawBalloon(map, renderOptions, shapeSize, { x: shapeLocation.x, y: (shapeLocation.y + 5) }, 'Legend'));
                }
                else {
                    legendElement.appendChild(drawSymbol(shapeLocation, legendShape, shapeSize, collection['ImageSrc'], renderOptions));
                }
                var legendRectSize = collection['Rect']['x'] + collection['Rect']['width'];
                if (legendRectSize > this.legendBorderRect.width) {
                    var trimmedText = this.legendTextTrim(this.legendBorderRect.width, legendText, legendTextStyle, legendRectSize);
                    legendText = trimmedText;
                }
                textOptions = new TextOption(textId, textLocation.x, textLocation.y, 'start', legendText, '', '');
                renderTextElement(textOptions, legendTextStyle, legendTextStyle.color, legendElement);
                this.legendGroup.appendChild(legendElement);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (i === (this.totalPages[page]['Collection'].length - 1)) {
                    var pagingGroup = void 0;
                    var width = spacing;
                    var height = (spacing / 2);
                    if (this.page !== 0) {
                        var pagingText = (page + 1) + '/' + this.totalPages.length;
                        var pagingFont = legend.textStyle;
                        var pagingTextSize = measureText(pagingText, pagingFont);
                        var leftPageX = (this.legendItemRect.x + this.legendItemRect.width) - pagingTextSize.width -
                            (width * 2) - (spacing * 2) + (pagingArrowPadding / 2);
                        var rightPageX = (this.legendItemRect.x + this.legendItemRect.width);
                        var pageTextX = rightPageX - width - (pagingTextSize.width / 2) - (spacing / 2) - pagingArrowPadding;
                        var locY = (this.legendItemRect.y + this.legendItemRect.height) + (height / 2) + spacing;
                        pagingGroup = render.createGroup({ id: map.element.id + '_Legend_Paging_Group' });
                        var leftPageElement = render.createGroup({ id: map.element.id + '_Legend_Left_Paging_Group' });
                        var rightPageElement = render.createGroup({ id: map.element.id + '_Legend_Right_Paging_Group' });
                        var rightPath = ' M ' + rightPageX + ' ' + locY + ' L ' + (rightPageX - width) + ' ' + (locY - height) +
                            ' L ' + (rightPageX - width) + ' ' + (locY + height) + ' z ';
                        var leftPath = ' M ' + leftPageX + ' ' + locY + ' L ' + (leftPageX + width) + ' ' + (locY - height) +
                            ' L ' + (leftPageX + width) + ' ' + (locY + height) + ' z ';
                        var leftPageOptions = new PathOption(map.element.id + '_Left_Page', this.maps.themeStyle.legendTextColor, 0, this.maps.themeStyle.legendTextColor, ((page + 1) === 1 ? 0.5 : 1), 1, '', leftPath);
                        leftPageElement.appendChild(render.drawPath(leftPageOptions));
                        var leftRectPageOptions = new RectOption(map.element.id + '_Left_Page_Rect', 'transparent', {}, 1, new Rect(leftPageX - (width / 2), (locY - (height * 2)), width * 2, spacing * 2), null, null, '', '');
                        var pathEle = render.drawRectangle(leftRectPageOptions);
                        pathEle.tabIndex = (page + 1) === 1 ? -1 : (map.tabIndex + 1);
                        leftPageElement.appendChild(pathEle);
                        this.wireEvents(leftPageElement);
                        var rightPageOptions = new PathOption(map.element.id + '_Right_Page', this.maps.themeStyle.legendTextColor, 0, this.maps.themeStyle.legendTextColor, ((page + 1) === this.totalPages.length ? 0.5 : 1), 1, '', rightPath);
                        rightPageElement.appendChild(render.drawPath(rightPageOptions));
                        var rightRectPageOptions = new RectOption(map.element.id + '_Right_Page_Rect', 'transparent', {}, 1, new Rect(rightPageX - spacing - (width / 2), (locY - (height * 2)), width * 2, spacing * 2), null, null, '', '');
                        pathEle = render.drawRectangle(rightRectPageOptions);
                        pathEle.tabIndex = (page + 1) === this.totalPages.length ? -1 : (map.tabIndex + 2);
                        rightPageElement.appendChild(pathEle);
                        this.wireEvents(rightPageElement);
                        pagingGroup.appendChild(leftPageElement);
                        pagingGroup.appendChild(rightPageElement);
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var pageTextOptions = {
                            'id': map.element.id + '_Paging_Text',
                            'x': pageTextX,
                            'y': locY + (pagingTextSize.height / 4),
                            'fill': this.maps.themeStyle.legendTextColor,
                            'font-size': '14px',
                            'font-style': pagingFont.fontStyle,
                            'font-family': pagingFont.fontFamily,
                            'font-weight': pagingFont.fontWeight,
                            'text-anchor': 'middle',
                            'transform': '',
                            'opacity': 1,
                            'dominant-baseline': ''
                        };
                        var pagingTextElement = render.createText(pageTextOptions, pagingText);
                        pagingTextElement.style.cssText = 'user-select: none;';
                        pagingGroup.appendChild(pagingTextElement);
                        this.legendGroup.appendChild(pagingGroup);
                    }
                    this.legendToggle();
                }
            }
        }
    };
    Legend.prototype.legendHighLightAndSelection = function (targetElement, value) {
        var shapeIndex;
        var layerIndex;
        var dataIndex;
        var pointIndex;
        var legend = this.maps.legendSettings;
        var textEle = legend.mode === 'Default' ? document.getElementById(targetElement.id.replace('Shape', 'Text')) :
            document.getElementById(targetElement.id + '_Text');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var collection = this.maps.legendModule.legendCollection;
        var length;
        var multiSelectEnable = !isNullOrUndefined(collection[0]['data'][0]['layerIndex']) ? this.maps.layers[collection[0]['data'][0]['layerIndex']].selectionSettings.enableMultiSelect : false;
        var selectLength = 0;
        var interactProcess = true;
        var idIndex = parseFloat(targetElement.id.charAt(targetElement.id.length - 1));
        this.updateLegendElement();
        var toggleLegendCheck = this.maps.toggledLegendId.indexOf(idIndex);
        if (this.maps.legendSettings.toggleLegendSettings.enable && value === 'highlight' && toggleLegendCheck !== -1) {
            var collectionIndex = this.getIndexofLegend(this.legendHighlightCollection, targetElement);
            if (collectionIndex !== -1) {
                this.legendHighlightCollection.splice(collectionIndex, 1);
            }
            this.removeLegendHighlightCollection();
            return null;
        }
        if (value === 'selection') {
            this.shapeHighlightCollection = [];
            if (!this.maps.shapeSelections && !multiSelectEnable) {
                this.removeAllSelections();
                this.maps.shapeSelections = true;
            }
            if (this.maps.legendSelectionCollection.length > 0 && (!multiSelectEnable ? this.maps.shapeSelections : true)) {
                for (var k = 0; k < this.maps.legendSelectionCollection.length; k++) {
                    if (targetElement === this.maps.legendSelectionCollection[k]['legendElement']) {
                        this.maps.legendSelectionCollection[k]['legendElement'] = targetElement;
                        interactProcess = false;
                        this.removeLegendSelectionCollection(this.maps.legendSelectionCollection[k]['legendElement']);
                        this.maps.selectedLegendElementId.splice(this.maps.selectedLegendElementId.indexOf(idIndex), 1);
                        this.maps.legendSelectionCollection.splice(k, 1);
                        this.maps.legendSelection = this.maps.legendSelectionCollection.length > 0 ? false : true;
                        break;
                    }
                    else if (!multiSelectEnable) {
                        if (this.maps.legendSelectionCollection.length > 1) {
                            for (var z = 0; z < this.maps.legendSelectionCollection.length; z++) {
                                this.removeLegendSelectionCollection(this.maps.legendSelectionCollection[z]['legendElement']);
                            }
                            this.maps.legendSelectionCollection = [];
                        }
                        else {
                            this.removeLegendSelectionCollection(this.maps.legendSelectionCollection[k]['legendElement']);
                            this.maps.legendSelectionCollection.splice(k, 1);
                        }
                    }
                }
            }
        }
        else {
            if (this.maps.legendSelectionCollection.length > 0) {
                for (var k = 0; k < this.maps.legendSelectionCollection.length; k++) {
                    if ((targetElement.id.indexOf('_Legend_Shape') > -1 || targetElement.id.indexOf('_Legend_Index')) &&
                        targetElement === this.maps.legendSelectionCollection[k]['legendElement']) {
                        interactProcess = false;
                        break;
                    }
                    else {
                        this.removeLegendHighlightCollection();
                    }
                }
            }
            this.removeLegendHighlightCollection();
        }
        if (interactProcess) {
            for (var i = 0; i < collection.length; i++) {
                var idIndex_1 = this.maps.legendSettings.mode === 'Interactive' ?
                    parseFloat(targetElement.id.split('_Legend_Index_')[1]) :
                    parseFloat(targetElement.id.split('_Legend_Shape_Index_')[1]);
                if (textEle.textContent === collection[i]['text'] && collection[i]['data'].length > 0
                    && idIndex_1 === i) {
                    var layer = this.maps.layers[collection[i]['data'][0]['layerIndex']];
                    var enable = void 0;
                    var module = void 0;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var data = void 0;
                    if (!isNullOrUndefined(layer)) {
                        enable = (value === 'selection') ? layer.selectionSettings.enable : layer.highlightSettings.enable;
                        module = void 0;
                        module = (value === 'selection') ? layer.selectionSettings : layer.highlightSettings;
                        data = collection[i]['data'];
                    }
                    if (enable) {
                        for (var j = 0; j < data.length; j++) {
                            var shapeElement = void 0;
                            shapeIndex = data[j]['shapeIndex'];
                            layerIndex = data[j]['layerIndex'];
                            dataIndex = data[j]['dataIndex'];
                            pointIndex = data[j]['pointIndex'];
                            if (pointIndex === -1) {
                                shapeElement = document.getElementById(this.maps.element.id + '_LayerIndex_' +
                                    layerIndex + '_shapeIndex_' + shapeIndex + '_dataIndex_' + dataIndex);
                            }
                            else {
                                shapeElement = document.getElementById(this.maps.element.id + '_LayerIndex_' +
                                    layerIndex + '_shapeIndex_' + shapeIndex + '_dataIndex_' + dataIndex + '_multiLine_' + pointIndex);
                            }
                            if (shapeElement !== null) {
                                var shapeMatch = true;
                                if (this.maps.legendSelectionCollection !== null) {
                                    for (var i_1 = 0; i_1 < this.maps.legendSelectionCollection.length; i_1++) {
                                        if (this.maps.legendSelectionCollection[i_1]['legendElement'] === targetElement) {
                                            shapeMatch = false;
                                            break;
                                        }
                                    }
                                }
                                if (value === 'highlight' && shapeMatch) {
                                    if (j === 0) {
                                        this.legendHighlightCollection = [];
                                        this.pushCollection(targetElement, this.legendHighlightCollection, collection[i], layer.shapeSettings);
                                    }
                                    length = this.legendHighlightCollection.length;
                                    var legendHighlightColor = this.legendHighlightCollection[length - 1]['legendOldFill'];
                                    this.legendHighlightCollection[length - 1]['MapShapeCollection']['Elements'].push(shapeElement);
                                    var shapeItemCount = this.legendHighlightCollection[length - 1]['MapShapeCollection']['Elements'].length - 1;
                                    var shapeOldFillColor = shapeElement.getAttribute('fill');
                                    var shapeOldOpacity = shapeElement.getAttribute('fill-opacity');
                                    this.legendHighlightCollection[length - 1]['shapeOldFillColor'].push(shapeOldFillColor);
                                    this.legendHighlightCollection[length - 1]['shapeOldOpacity'] = shapeOldOpacity;
                                    var shapeOldColor = this.legendHighlightCollection[length - 1]['shapeOldFillColor'][shapeItemCount];
                                    var shapeOldFillOpacity = this.legendHighlightCollection[length - 1]['shapeOldOpacity'];
                                    this.shapePreviousColor = this.legendHighlightCollection[length - 1]['shapeOldFillColor'];
                                    this.setColor(shapeElement, !isNullOrUndefined(module.fill) ? module.fill : shapeOldColor, isNullOrUndefined(module.opacity) ? shapeOldFillOpacity : module.opacity.toString(), module.border.color, module.border.width.toString(), 'highlight');
                                    this.setColor(targetElement, !isNullOrUndefined(module.fill) ? module.fill : legendHighlightColor, isNullOrUndefined(module.opacity) ? shapeOldFillOpacity : module.opacity.toString(), module.border.color, module.border.width.toString(), 'highlight');
                                }
                                else if (value === 'selection') {
                                    this.legendHighlightCollection = [];
                                    this.maps.legendSelectionClass = module;
                                    if (j === 0) {
                                        this.pushCollection(targetElement, this.maps.legendSelectionCollection, collection[i], layer.shapeSettings);
                                        if (multiSelectEnable) {
                                            this.maps.selectedLegendElementId.push(i);
                                        }
                                        else {
                                            if (this.maps.selectedLegendElementId.length === 0) {
                                                this.maps.selectedLegendElementId.push(i);
                                            }
                                            else {
                                                this.maps.selectedLegendElementId = [];
                                                this.maps.selectedLegendElementId.push(i);
                                            }
                                        }
                                    }
                                    selectLength = this.maps.legendSelectionCollection.length;
                                    var legendSelectionColor = this.maps.legendSelectionCollection[selectLength - 1]['legendOldFill'];
                                    this.maps.legendSelectionCollection[selectLength - 1]['MapShapeCollection']['Elements'].push(shapeElement);
                                    this.maps.legendSelectionCollection[selectLength - 1]['shapeOldFillColor'] = this.shapePreviousColor;
                                    this.setColor(targetElement, !isNullOrUndefined(module.fill) ? module.fill : legendSelectionColor, module.opacity.toString(), module.border.color, module.border.width.toString(), 'selection');
                                    this.setColor(shapeElement, !isNullOrUndefined(module.fill) ? module.fill : legendSelectionColor, module.opacity.toString(), module.border.color, module.border.width.toString(), 'selection');
                                    if (this.maps.selectedElementId.indexOf(shapeElement.getAttribute('id')) === -1) {
                                        this.maps.selectedElementId.push(shapeElement.getAttribute('id'));
                                    }
                                    if (j === data.length - 1) {
                                        this.maps.legendSelection = false;
                                        this.removeLegend(this.maps.legendSelectionCollection);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    Legend.prototype.setColor = function (element, fill, opacity, borderColor, borderWidth, type) {
        var isLineStringShape = (element.parentElement.id.indexOf('LineString') > -1);
        if (type === 'selection') {
            maintainStyleClass((isLineStringShape ? 'LineselectionMap' : 'ShapeselectionMap'), (isLineStringShape ? 'LineselectionMapStyle' : 'ShapeselectionMapStyle'), (isLineStringShape ? 'transparent' : fill), opacity, (isLineStringShape ? fill : borderColor), borderWidth, this.maps);
            element.setAttribute('class', isLineStringShape ? 'LineselectionMapStyle' : 'ShapeselectionMapStyle');
        }
        else {
            element.setAttribute('fill', isLineStringShape ? 'transparent' : fill);
            element.setAttribute('fill-opacity', opacity);
            element.setAttribute('stroke', isLineStringShape ? fill : borderColor);
            element.setAttribute('stroke-width', (Number(borderWidth) / this.maps.scale).toString());
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Legend.prototype.pushCollection = function (targetElement, collection, oldElement, shapeSettings) {
        collection.push({
            legendElement: targetElement, legendOldFill: oldElement['fill'], legendOldOpacity: oldElement['opacity'],
            legendOldBorderColor: oldElement['borderColor'], legendOldBorderWidth: oldElement['borderWidth'],
            shapeOpacity: shapeSettings.opacity, shapeOldBorderColor: shapeSettings.border.color,
            shapeOldBorderWidth: shapeSettings.border.width
        });
        var length = collection.length;
        collection[length - 1]['MapShapeCollection'] = { Elements: [] };
        collection[length - 1]['shapeOldFillColor'] = [];
        collection[length - 1]['shapeOldOpacity'] = null;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Legend.prototype.removeLegend = function (collection) {
        for (var i = 0; i < collection.length; i++) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var item = collection[i];
            this.setColor(item['legendElement'], item['legendOldFill'], item['legendOldOpacity'], item['legendOldBorderColor'], item['legendOldBorderWidth'], 'highlight');
            var dataCount = item['MapShapeCollection']['Elements'].length;
            for (var j = 0; j < dataCount; j++) {
                var shapeFillColor = item['legendOldFill'].indexOf('url') !== -1
                    ? item['shapeOldFillColor'][j] : item['legendOldFill'];
                var shapeOpacity = !isNullOrUndefined(item['shapeOldOpacity']) ? item['shapeOldOpacity'] : item['shapeOpacity'];
                this.setColor(item['MapShapeCollection']['Elements'][j], shapeFillColor, shapeOpacity, item['shapeOldBorderColor'], item['shapeOldBorderWidth'], 'highlight');
            }
        }
    };
    Legend.prototype.removeLegendHighlightCollection = function () {
        if (this.legendHighlightCollection.length > 0) {
            this.removeLegend(this.legendHighlightCollection);
            this.legendHighlightCollection = [];
        }
    };
    Legend.prototype.removeLegendSelectionCollection = function (targetElement) {
        if (this.maps.legendSelectionCollection.length > 0) {
            removeClass(targetElement);
            var shapeElements = this.shapesOfLegend(targetElement);
            var dataCount = shapeElements.length;
            for (var j = 0; j < dataCount; j++) {
                var shapeElement = getElement(shapeElements[j]);
                if (shapeElement.getAttribute('class') === 'ShapeselectionMapStyle' ||
                    shapeElement.getAttribute('class') === 'LineselectionMapStyle') {
                    removeClass(shapeElement);
                    var selectedElementIdIndex = this.maps.selectedElementId.indexOf(shapeElement.id);
                    if (selectedElementIdIndex !== -1) {
                        this.maps.selectedElementId.splice(selectedElementIdIndex, 1);
                    }
                }
            }
        }
    };
    Legend.prototype.removeShapeHighlightCollection = function () {
        if (this.shapeHighlightCollection.length > 0) {
            for (var i = 0; i < this.shapeHighlightCollection.length; i++) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var item = this.shapeHighlightCollection[i];
                var removeFill = true;
                for (var j = 0; j < this.maps.legendSelectionCollection.length; j++) {
                    if (this.maps.legendSelectionCollection[j]['legendElement'] === item['legendElement']) {
                        removeFill = false;
                    }
                }
                if (removeFill) {
                    this.setColor(item['legendElement'], item['legendOldFill'], item['legendOldOpacity'], item['legendOldBorderColor'], item['legendOldBorderWidth'], 'highlight');
                }
            }
        }
    };
    Legend.prototype.shapeHighLightAndSelection = function (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    targetElement, data, module, getValue, layerIndex) {
        if (data !== undefined) {
            this.updateLegendElement();
            this.shapeToggled = true;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var collection = this.maps.legendModule.legendCollection;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var indexes = this.legendIndexOnShape(data, layerIndex);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var shapeElement = this.shapeDataOnLegend(targetElement);
            var toggleLegendCheck = this.maps.toggledLegendId.indexOf(indexes['actualIndex']);
            if (this.maps.legendSettings.toggleLegendSettings.enable && toggleLegendCheck !== -1) {
                this.shapeToggled = false;
                this.legendHighlightCollection = [];
                var collectionIndex = this.getIndexofLegend(this.shapeHighlightCollection, shapeElement['LegendEle']);
                if (collectionIndex !== -1) {
                    this.shapeHighlightCollection.splice(collectionIndex, 1);
                }
                this.removeShapeHighlightCollection();
                return null;
            }
            if (indexes['currentIndex'] === undefined && indexes['actualIndex'] === undefined) {
                this.removeShapeHighlightCollection();
                return null;
            }
            if (indexes['currentIndex'] === undefined && getValue === 'selection'
                && !this.maps.layers[layerIndex].selectionSettings.enableMultiSelect &&
                targetElement.getAttribute('class') !== 'ShapeselectionMapStyle') {
                this.maps.legendSelection = false;
            }
            if (getValue === 'selection' && !this.maps.layers[layerIndex].selectionSettings.enableMultiSelect &&
                !this.maps.legendSelection) {
                this.removeAllSelections();
                this.maps.legendSelection = true;
            }
            if (indexes['currentIndex'] === undefined) {
                if (getValue === 'selection' && indexes['actualIndex'] !== undefined) {
                    var checkSelection = 0;
                    for (var i = 0; i < shapeElement['Elements'].length; i++) {
                        if (shapeElement['Elements'][i].getAttribute('class') === 'ShapeselectionMapStyle') {
                            checkSelection++;
                        }
                    }
                    var selectionIndex = this.maps.selectedLegendElementId.indexOf(indexes['actualIndex']);
                    if (selectionIndex === -1) {
                        this.maps.selectedLegendElementId.push(indexes['actualIndex']);
                        this.maps.legendSelectionClass = module;
                    }
                    else {
                        if ((checkSelection <= 1) && (targetElement.getAttribute('class') === 'ShapeselectionMapStyle'
                            || targetElement.getAttribute('class') === 'LineselectionMapStyle')) {
                            if (!this.maps.layers[layerIndex].selectionSettings.enableMultiSelect) {
                                this.maps.selectedLegendElementId.splice(selectionIndex, 1);
                            }
                            else {
                                if (checkSelection <= 1 && (targetElement.getAttribute('class') === 'ShapeselectionMapStyle'
                                    || targetElement.getAttribute('class') === 'LineselectionMapStyle')) {
                                    this.maps.selectedLegendElementId.splice(selectionIndex, 1);
                                }
                            }
                        }
                    }
                }
                this.removeShapeHighlightCollection();
                return null;
            }
            var text = collection[indexes['actualIndex']]['text'];
            var content = void 0;
            var legendShape = void 0;
            if (this.maps.legendSettings.mode === 'Default') {
                if (indexes['currentIndex'] !== undefined) {
                    content = document.getElementById(this.maps.element.id + '_Legend_Text_Index_' + indexes['actualIndex']).textContent;
                    legendShape = document.getElementById(this.maps.element.id + '_Legend_Shape_Index_' + indexes['actualIndex']);
                }
            }
            else {
                content = document.getElementById(this.maps.element.id + '_Legend_Index_' + indexes['actualIndex']
                    + '_Text').textContent;
                legendShape = document.getElementById(this.maps.element.id + '_Legend_Index_' + indexes['actualIndex']);
            }
            this.oldShapeElement = shapeElement['LegendEle'];
            var length_1 = this.maps.legendSelectionCollection.length;
            if (text === content) {
                var shapeMatched = true;
                if (this.maps.legendSelectionCollection) {
                    for (var i = 0; i < this.maps.legendSelectionCollection.length; i++) {
                        if (this.maps.legendSelectionCollection[i]['legendElement'] === shapeElement['LegendEle']) {
                            shapeMatched = false;
                            break;
                        }
                    }
                }
                if (getValue === 'highlight' && shapeMatched) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var selectionEle = this.isTargetSelected(shapeElement, this.shapeHighlightCollection);
                    if (selectionEle === undefined || (selectionEle && !selectionEle['IsSelected'])) {
                        this.pushCollection(legendShape, this.shapeHighlightCollection, collection[indexes['actualIndex']], this.maps.layers[layerIndex].shapeSettings);
                    }
                    for (var j = 0; j < this.shapeHighlightCollection.length; j++) {
                        if (shapeElement['LegendEle'].id === this.shapeHighlightCollection[j]['legendElement'].id) {
                            this.shapeHighlightCollection[j]['legendElement'] = shapeElement['LegendEle'];
                        }
                    }
                    if (length_1 > 0) {
                        for (var j = 0; j < length_1; j++) {
                            if (shapeElement['LegendEle'] === this.maps.legendSelectionCollection[j]['legendElement']) {
                                this.maps.legendSelectionCollection[j]['legendElement'] = shapeElement['LegendEle'];
                                this.removeShapeHighlightCollection();
                                break;
                            }
                            else if (j === length_1 - 1) {
                                this.removeShapeHighlightCollection();
                                this.setColor(legendShape, !isNullOrUndefined(module.fill) ? module.fill : legendShape.getAttribute('fill'), module.opacity.toString(), module.border.color, module.border.width.toString(), 'highlight');
                            }
                        }
                    }
                    else {
                        this.removeShapeHighlightCollection();
                        this.setColor(legendShape, !isNullOrUndefined(module.fill) ? module.fill : legendShape.getAttribute('fill'), module.opacity.toString(), module.border.color, module.border.width.toString(), 'highlight');
                    }
                }
                else if (getValue === 'selection') {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var selectionEle = this.isTargetSelected(shapeElement, this.maps.legendSelectionCollection);
                    if (length_1 > 0) {
                        var j = 0;
                        while (j < this.maps.legendSelectionCollection.length) {
                            if (shapeElement['LegendEle'] !== this.maps.legendSelectionCollection[j]['legendElement'] &&
                                !module.enableMultiSelect) {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                var element = this.maps.legendSelectionCollection[j];
                                var selectedLegendIndex = this.maps.selectedLegendElementId.indexOf(indexes['actualIndex']);
                                this.maps.selectedLegendElementId.splice(selectedLegendIndex, 1);
                                this.maps.legendSelectionCollection.splice(j, 1);
                                removeClass(element['legendElement']);
                                this.maps.shapeSelections = true;
                                j = 0;
                            }
                            else {
                                j++;
                            }
                        }
                    }
                    if (selectionEle && (selectionEle['IsSelected'] && (targetElement.getAttribute('class') === 'ShapeselectionMapStyle'
                        || targetElement.getAttribute('class') === 'LineselectionMapStyle'))) {
                        var multiSelection = 0;
                        if (module.enableMultiSelect) {
                            for (var i = 0; i < shapeElement['Elements'].length; i++) {
                                if (targetElement.getAttribute('class') === shapeElement['Elements'][i].getAttribute('class')) {
                                    multiSelection++;
                                }
                            }
                        }
                        if (multiSelection <= 1 && (!module.enableMultiSelect ?
                            this.maps.legendSelection : true)) {
                            this.maps.selectedLegendElementId.splice(this.maps.selectedLegendElementId.indexOf(indexes['actualIndex']), 1);
                            if (!isNullOrUndefined(shapeElement['LegendEle'])) {
                                removeClass(shapeElement['LegendEle']);
                            }
                            this.maps.legendSelectionCollection.splice(selectionEle['SelectionIndex'], 1);
                            this.maps.shapeSelections = true;
                        }
                    }
                    else {
                        if ((selectionEle === undefined || (selectionEle && !selectionEle['IsSelected'])) &&
                            !isNullOrUndefined(legendShape)) {
                            var legendSelectionIndex = this.getIndexofLegend(this.maps.legendSelectionCollection, legendShape);
                            if (legendSelectionIndex === -1) {
                                this.pushCollection(legendShape, this.maps.legendSelectionCollection, collection[indexes['actualIndex']], this.maps.layers[layerIndex].shapeSettings);
                            }
                        }
                        var addId = true;
                        for (var i = 0; i < this.maps.selectedLegendElementId.length; i++) {
                            if (indexes['actualIndex'] === this.maps.selectedLegendElementId[i]) {
                                addId = false;
                            }
                        }
                        if (addId) {
                            this.maps.selectedLegendElementId.push(indexes['actualIndex']);
                        }
                        this.maps.legendSelectionClass = module;
                        this.removeLegend(this.shapeHighlightCollection);
                        if (!isNullOrUndefined(legendShape)) {
                            this.setColor(legendShape, !isNullOrUndefined(module.fill) ? module.fill : legendShape.getAttribute('fill'), module.opacity.toString(), module.border.color, module.border.width.toString(), 'selection');
                            var legendSelectionIndex = this.getIndexofLegend(this.maps.legendSelectionCollection, legendShape);
                            this.maps.legendSelectionCollection[legendSelectionIndex]['MapShapeCollection']['Elements'].push(targetElement);
                        }
                        this.maps.shapeSelections = false;
                    }
                }
                else if (document.getElementsByClassName('highlightMapStyle').length > 0) {
                    this.removeShapeHighlightCollection();
                    removeClass(document.getElementsByClassName('highlightMapStyle')[0]);
                }
            }
        }
        else {
            this.removeShapeHighlightCollection();
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Legend.prototype.isTargetSelected = function (target, collection) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var selectEle;
        for (var i = 0; i < collection.length; i++) {
            if (!isNullOrUndefined(target['LegendEle'].getAttribute('id')) &&
                (target['LegendEle'].getAttribute('id') === collection[i]['legendElement'].getAttribute('id'))) {
                selectEle = { IsSelected: true, SelectionIndex: i };
            }
        }
        return selectEle;
    };
    Legend.prototype.updateLegendElement = function () {
        for (var i = 0; i < this.maps.legendSelectionCollection.length; i++) {
            if (document.getElementById(this.maps.legendSelectionCollection[i]['legendElement'].id)) {
                this.maps.legendSelectionCollection[i]['legendElement'] =
                    document.getElementById(this.maps.legendSelectionCollection[i]['legendElement'].id);
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Legend.prototype.getIndexofLegend = function (targetCollection, targetElement) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var legendIndex = targetCollection.map(function (e) { return e['legendElement']; }).indexOf(targetElement);
        return legendIndex;
    };
    Legend.prototype.removeAllSelections = function () {
        for (var i = 0; i < this.maps.selectedElementId.length; i++) {
            var selectedElement = document.getElementById(this.maps.selectedElementId[i]);
            removeClass(selectedElement);
        }
        for (var j = 0; j < this.maps.selectedLegendElementId.length; j++) {
            var idIndex = this.maps.legendSettings.mode === 'Interactive' ?
                this.maps.element.id + '_Legend_Index_' : this.maps.element.id + '_Legend_Shape_Index_';
            var selectedElement = idIndex + this.maps.selectedLegendElementId[j];
            var legendElement = document.getElementById(selectedElement);
            if (!isNullOrUndefined(legendElement)) {
                removeClass(document.getElementById(selectedElement));
            }
        }
        this.maps.legendSelectionCollection = [];
        this.maps.selectedLegendElementId = [];
        this.maps.selectedElementId = [];
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Legend.prototype.legendIndexOnShape = function (data, index) {
        var legendIndex;
        var actualIndex;
        var path = this.maps.layers[index].shapeDataPath;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var value = data[path];
        var legendType = this.maps.legendSettings.mode;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var collection = this.maps.legendModule.legendCollection;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var currentCollection;
        if (legendType === 'Default' && !isNullOrUndefined(this.maps.legendModule.totalPages)) {
            currentCollection = this.maps.legendModule.totalPages[this.maps.legendModule.currentPage]['Collection'];
        }
        var currentCollectionLength = legendType === 'Default' ? currentCollection['length'] : 1;
        for (var i = 0; i < collection.length; i++) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var dataValue = collection[i]['data'];
            for (var k = 0; k < currentCollectionLength; k++) {
                if (legendType !== 'Default' || collection[i]['text'] === currentCollection[k]['DisplayText']) {
                    for (var j = 0; j < dataValue.length; j++) {
                        if (value === dataValue[j]['name']) {
                            legendIndex = k;
                        }
                    }
                }
            }
            for (var j = 0; j < dataValue.length; j++) {
                if (value === dataValue[j]['name']) {
                    actualIndex = i;
                }
            }
        }
        return { currentIndex: legendIndex, actualIndex: actualIndex };
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Legend.prototype.shapeDataOnLegend = function (targetElement) {
        var shapeIndex;
        var layerIndex;
        var dataIndex;
        var pointIndex;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var collection = this.maps.legendModule.legendCollection;
        var legend = this.maps.legendSettings;
        for (var i = 0; i < collection.length; i++) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var data = collection[i]['data'];
            var process = false;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var elements = [];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var currentElement = { Elements: [] };
            for (var j = 0; j < data.length; j++) {
                var shapeElement = void 0;
                shapeIndex = data[j]['shapeIndex'];
                layerIndex = data[j]['layerIndex'];
                dataIndex = data[j]['dataIndex'];
                pointIndex = data[j]['pointIndex'];
                if (pointIndex === -1) {
                    shapeElement = document.getElementById(this.maps.element.id + '_LayerIndex_' +
                        layerIndex + '_shapeIndex_' + shapeIndex + '_dataIndex_' + dataIndex);
                }
                else {
                    shapeElement = document.getElementById(this.maps.element.id + '_LayerIndex_' +
                        layerIndex + '_shapeIndex_' + shapeIndex + '_dataIndex_' + dataIndex + '_multiLine_' + pointIndex);
                }
                if (targetElement === shapeElement) {
                    process = true;
                }
                elements.push(shapeElement);
            }
            if (process) {
                if (isNullOrUndefined(currentElement['LegendEle'])) {
                    currentElement['LegendEle'] = legend.mode === 'Default' ?
                        document.getElementById(this.maps.element.id + '_Legend_Shape_Index_' + i) :
                        document.getElementById(this.maps.element.id + '_Legend_Index_' + i);
                }
                currentElement['Elements'] = elements;
                return currentElement;
            }
        }
        return null;
    };
    Legend.prototype.shapesOfLegend = function (targetElement) {
        var shapeIndex;
        var layerIndex;
        var dataIndex;
        var pointIndex;
        var idIndex = parseFloat(targetElement.id.charAt(targetElement.id.length - 1));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var data = this.maps.legendModule.legendCollection[idIndex]['data'];
        var legendShapeElements = [];
        for (var i = 0; i < data.length; i++) {
            var shapeElement = void 0;
            shapeIndex = data[i]['shapeIndex'];
            layerIndex = data[i]['layerIndex'];
            dataIndex = data[i]['dataIndex'];
            pointIndex = data[i]['pointIndex'];
            if (pointIndex === -1) {
                shapeElement = document.getElementById(this.maps.element.id + '_LayerIndex_' +
                    layerIndex + '_shapeIndex_' + shapeIndex + '_dataIndex_' + dataIndex);
            }
            else {
                shapeElement = document.getElementById(this.maps.element.id + '_LayerIndex_' +
                    layerIndex + '_shapeIndex_' + shapeIndex + '_dataIndex_' + dataIndex + '_multiLine_' + pointIndex);
            }
            if (!isNullOrUndefined(shapeElement)) {
                legendShapeElements.push(shapeElement.id);
            }
        }
        return legendShapeElements;
    };
    Legend.prototype.legendToggle = function () {
        var map = this.maps;
        var legend = map.legendSettings;
        if (this.maps.selectedLegendElementId) {
            // To maintain the state of legend selection during page resize.
            for (var j = 0; j < this.maps.selectedLegendElementId.length; j++) {
                var idIndex = legend.mode === 'Interactive' ? this.maps.element.id + '_Legend_Index_' : this.maps.element.id + '_Legend_Shape_Index_';
                var selectedElement = map.svgObject.querySelector('#' + idIndex + this.maps.selectedLegendElementId[j]);
                if (!isNullOrUndefined(selectedElement)) {
                    var fill = !isNullOrUndefined(this.maps.legendSelectionClass.fill) ?
                        this.maps.legendSelectionClass.fill : selectedElement.getAttribute('fill');
                    this.setColor(selectedElement, fill, this.maps.legendSelectionClass.opacity.toString(), this.maps.legendSelectionClass.border.color, this.maps.legendSelectionClass.border.width.toString(), 'selection');
                    for (var i = 0; i < this.maps.legendSelectionCollection.length; i++) {
                        if (this.maps.legendSelectionCollection[i]['legendElement'].id === selectedElement.id) {
                            this.maps.legendSelectionCollection[i]['legendElement'] = selectedElement;
                        }
                    }
                    var legendSelectionIndex = this.getIndexofLegend(this.maps.legendSelectionCollection, selectedElement);
                    if (legendSelectionIndex === -1) {
                        var layerIndex = this.maps.legendModule.legendCollection[this.maps.selectedLegendElementId[j]]['data'][j]['layerIndex'];
                        this.pushCollection(selectedElement, this.maps.legendSelectionCollection, this.maps.legendModule.legendCollection[this.maps.selectedLegendElementId[j]], this.maps.layers[layerIndex].shapeSettings);
                    }
                }
            }
        }
        if (this.maps.toggledLegendId) {
            for (var j = 0; j < this.maps.toggledLegendId.length; j++) {
                var legendTextId = legend.mode === 'Interactive' ? ('#' + this.maps.element.id + '_Legend_Index_' + this.maps.toggledLegendId[j] + '_Text') : ('#' + this.maps.element.id + '_Legend_Text_Index_' + this.maps.toggledLegendId[j]);
                var textElement = map.svgObject.querySelector(legendTextId);
                if (!isNullOrUndefined(textElement)) {
                    textElement.setAttribute('fill', '#E5E5E5');
                }
                var legendShapeId = legend.mode === 'Interactive' ? ('#' + this.maps.element.id + '_Legend_Index_' + this.maps.toggledLegendId[j]) : ('#' + this.maps.element.id + '_Legend_Shape_Index_' + this.maps.toggledLegendId[j]);
                var legendElement = map.svgObject.querySelector(legendShapeId);
                if (!isNullOrUndefined(legendElement)) {
                    legendElement.setAttribute('fill', '#E5E5E5');
                }
            }
        }
    };
    Legend.prototype.renderLegendBorder = function () {
        var map = this.maps;
        var legend = map.legendSettings;
        var legendTitle = legend.title.text;
        var textStyle = {
            fontFamily: legend.titleStyle.fontFamily, fontStyle: legend.titleStyle.fontStyle,
            fontWeight: legend.titleStyle.fontWeight, size: legend.titleStyle.size, color: legend.titleStyle.color,
            opacity: legend.titleStyle.opacity
        };
        var textOptions;
        var spacing = 10;
        var trimTitle = textTrim((this.legendItemRect.width + (spacing * 2)), legendTitle, textStyle);
        var textSize = measureText(trimTitle, textStyle);
        this.legendBorderRect = new Rect((this.legendItemRect.x - spacing), (this.legendItemRect.y - spacing - textSize.height), (this.legendItemRect.width) + (spacing * 2), (this.legendItemRect.height) + (spacing * 2) + textSize.height +
            (legend.mode === 'Interactive' ? 0 : (this.page !== 0) ? spacing : 0));
        var legendBorder = {
            color: legend.border.color, width: legend.border.width, opacity: legend.border.opacity
        };
        legendBorder.opacity = isNullOrUndefined(legendBorder.opacity) ? 1 : legendBorder.opacity;
        var renderOptions = new RectOption(map.element.id + '_Legend_Border', legend.background, legendBorder, 1, this.legendBorderRect, null, null, '', '');
        this.legendGroup.appendChild(map.renderer.drawRectangle(renderOptions));
        this.getLegendAlignment(map, this.legendBorderRect.width, this.legendBorderRect.height, legend);
        this.legendGroup.setAttribute('transform', 'translate( ' + (this.translate.x + (-this.legendBorderRect.x)) + ' ' +
            (this.translate.y + (-(this.legendBorderRect.y))) + ' )');
        if (legend.position !== 'Float') {
            map.svgObject.appendChild(this.legendGroup);
        }
        if (legendTitle) {
            textStyle.color = (textStyle.color !== null) ? textStyle.color : this.maps.themeStyle.legendTitleFontColor;
            textStyle.fontFamily = !isNullOrUndefined(textStyle.fontFamily) ? textStyle.fontFamily : this.maps.themeStyle.fontFamily;
            textStyle.size = !isNullOrUndefined(textStyle.size) ? textStyle.size : this.maps.themeStyle.subTitleFontSize || Theme.legendTitleFont.size;
            textStyle.fontWeight = !isNullOrUndefined(textStyle.fontWeight) ? textStyle.fontWeight : this.maps.themeStyle.titleFontWeight || Theme.legendTitleFont.fontWeight;
            textOptions = new TextOption(map.element.id + '_LegendTitle', (this.legendItemRect.x) + (this.legendItemRect.width / 2), this.legendItemRect.y - (textSize.height / 2) - spacing / 2, 'middle', trimTitle, '');
            renderTextElement(textOptions, textStyle, textStyle.color, this.legendGroup);
        }
    };
    Legend.prototype.changeNextPage = function (e) {
        this.currentPage = (e.target.id.indexOf('_Left_Page_') > -1) ? (this.currentPage - 1) :
            (this.currentPage + 1);
        this.legendGroup = this.maps.renderer.createGroup({ id: this.maps.element.id + '_Legend_Group' });
        this.maps.mapAreaRect = this.initialMapAreaRect;
        this.drawLegendItem(this.currentPage);
        if (!isNullOrUndefined(this.maps.legendModule) && this.maps.legendSettings.position === 'Float') {
            if (this.maps.isTileMap) {
                this.maps.mapLayerPanel.layerGroup.appendChild(this.maps.legendModule.legendGroup);
            }
            else {
                this.maps.svgObject.appendChild(this.maps.legendModule.legendGroup);
            }
        }
        if (querySelector(this.maps.element.id + '_Legend_Border', this.maps.element.id)) {
            querySelector(this.maps.element.id + '_Legend_Border', this.maps.element.id).style.pointerEvents = 'none';
        }
    };
    Legend.prototype.getLegendAlignment = function (map, width, height, legend) {
        var x;
        var y;
        var spacing = 10;
        var totalRect;
        // eslint-disable-next-line prefer-const
        totalRect = extend({}, map.mapAreaRect, totalRect, true);
        var areaX = totalRect.x;
        var areaY = totalRect.y;
        var areaHeight = totalRect.height;
        var areaWidth = totalRect.width;
        var totalWidth = map.availableSize.width;
        var totalHeight = map.availableSize.height;
        var locationX = !isNullOrUndefined(legend.location.x) ? legend.location.x : 0;
        var locationY = !isNullOrUndefined(legend.location.y) ? legend.location.y : 0;
        if (legend.position === 'Float') {
            this.translate = map.isTileMap ? new Point(locationX, locationY + (spacing / 4)) :
                new Point(locationX + map.mapAreaRect.x, locationY + map.mapAreaRect.y);
            this.legendTotalRect = map.mapAreaRect;
        }
        else {
            switch (legend.position) {
                case 'Top':
                case 'Bottom':
                    totalRect.height = (legend.position === 'Top') ? (areaHeight - height) : (areaHeight - height - (spacing * 2));
                    x = (totalWidth / 2) - (width / 2);
                    y = (legend.position === 'Top') ? areaY : (areaY + totalRect.height);
                    totalRect.y = (legend.position === 'Top') ? areaY + height + (map.isTileMap ? (spacing / 2) : spacing) : areaY - (spacing / 2);
                    break;
                case 'Left':
                case 'Right':
                    totalRect.width = (areaWidth - width - map.mapAreaRect.x);
                    x = (legend.position === 'Left') ? areaX + (spacing / 2) : (areaX + totalRect.width + spacing);
                    y = (totalHeight / 2) - (height / 2);
                    totalRect.x = (legend.position === 'Left') ? areaX + width + spacing : areaX;
                    break;
            }
            switch (legend.alignment) {
                case 'Near':
                    if (legend.position === 'Top' || legend.position === 'Bottom') {
                        x = totalRect.x - (legend.mode === 'Interactive' ? spacing : 0);
                    }
                    else {
                        y = totalRect.y - (!(legend.height && legend.width) && legend.mode === 'Interactive' ? map.mapAreaRect.x : 0);
                    }
                    break;
                case 'Far':
                    if (legend.position === 'Top' || legend.position === 'Bottom') {
                        x = (totalWidth - width) - (legend.mode === 'Interactive' ? 0 : spacing);
                    }
                    else {
                        y = totalHeight - height - (legend.mode === 'Default' ? spacing : 0);
                    }
                    break;
            }
            if ((legend.height || legend.width) && legend.mode !== 'Interactive') {
                this.legendTotalRect = map.mapAreaRect = map.totalRect = totalRect;
            }
            else {
                map.totalRect = null;
                if ((legend.height || legend.width) && legend.mode === 'Interactive') {
                    map.totalRect = totalRect;
                }
                this.legendTotalRect = map.mapAreaRect = totalRect;
            }
            if (legend.position === 'Left') {
                map.mapAreaRect.width = totalRect.width;
            }
            this.translate = new Point(x, y);
        }
    };
    Legend.prototype.getMarkersLegendCollections = function (layerIndex, markers) {
        var _this = this;
        Array.prototype.forEach.call(markers, function (marker$$1, markerIndex) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var dataSource = marker$$1.dataSource;
            var field = marker$$1.legendText;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var templateFn;
            Array.prototype.forEach.call(dataSource, function (data, dataIndex) {
                var imageSrc = null;
                var showLegend = isNullOrUndefined(data[_this.maps.legendSettings.showLegendPath]) ? true :
                    data[_this.maps.legendSettings.showLegendPath];
                if (marker$$1.visible && showLegend && (!isNullOrUndefined(data['latitude'])) && (!isNullOrUndefined(data['longitude']))) {
                    if (marker$$1.template) {
                        templateFn = getTemplateFunction(marker$$1.template, _this.maps);
                        var templateElement = templateFn(_this.maps);
                        var markerEle = isNullOrUndefined(templateElement.childElementCount) ? templateElement[0] :
                            templateElement;
                        imageSrc = markerEle.querySelector('img').src;
                    }
                    var text = isNullOrUndefined(data[field]) ? '' : data[field];
                    var legendFill = !isNullOrUndefined(marker$$1.colorValuePath) ? data[marker$$1.colorValuePath] : marker$$1.fill;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var newData = [];
                    if (_this.maps.legendSettings.removeDuplicateLegend) {
                        newData.push(_this.getMarkerLegendData(layerIndex, text, legendFill));
                        _this.getOverallLegendItemsCollection(text, legendFill, newData, showLegend);
                    }
                    else {
                        newData.push({ layerIndex: layerIndex, markerIndex: markerIndex, dataIndex: dataIndex, value: legendFill,
                            name: text,
                            shape: (!isNullOrUndefined(marker$$1.shapeValuePath) && !isNullOrUndefined(data[marker$$1.shapeValuePath]) && data[marker$$1.shapeValuePath] !== '') ? data[marker$$1.shapeValuePath] : (_this.maps.legendSettings.useMarkerShape ? marker$$1.shape : _this.maps.legendSettings.shape) });
                        _this.getOverallLegendItemsCollection(text, legendFill, newData, showLegend);
                    }
                }
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Legend.prototype.getMarkerLegendData = function (layerIndex, text, legendFill) {
        var _this = this;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var legendData = [];
        this.maps.layers[layerIndex].markerSettings.map(function (markerSettings, markerIndex) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var markerData = markerSettings.dataSource;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Array.prototype.forEach.call(markerData, function (data, dataIndex) {
                var marker$$1 = _this.maps.layers[layerIndex].markerSettings[markerIndex];
                if ((text === data[marker$$1.legendText] || text === '') && legendFill === data[marker$$1.colorValuePath]) {
                    legendData.push({ layerIndex: layerIndex, markerIndex: markerIndex, dataIndex: dataIndex, value: legendFill, name: text,
                        shape: !isNullOrUndefined(marker$$1.shapeValuePath) ? data[marker$$1.shapeValuePath] : marker$$1.shape });
                }
            });
        });
        return legendData;
    };
    Legend.prototype.getRangeLegendCollection = function (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    layerIndex, layerData, colorMapping, dataSource, dataPath, colorValuePath, propertyPath) {
        var _this = this;
        var legendText;
        var legendIndex = 0;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var fill = this.maps.legendSettings.fill;
        var rangeData = [];
        var _loop_1 = function (colorMap) {
            if (!isNullOrUndefined(colorMap.from) && !isNullOrUndefined(colorMap.to)) {
                legendText = !isNullOrUndefined(colorMap.label) ? colorMap.label : colorMap.from + ' - ' + colorMap.to;
                rangeData = [];
                var colorMapProcess_1 = false;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                Array.prototype.forEach.call(dataSource, function (data, dataIndex) {
                    var colorValue = (colorValuePath.indexOf('.') > -1) ? Number(getValueFromObject(data, colorValuePath)) :
                        parseFloat(data[colorValuePath]);
                    if (colorValue >= colorMap.from && colorValue <= colorMap.to) {
                        colorMapProcess_1 = true;
                        rangeData.push(_this.getLegendData(layerIndex, dataIndex, data, dataPath, layerData, propertyPath, colorValue));
                    }
                });
                if (!colorMapProcess_1) {
                    rangeData.push({
                        layerIndex: layerIndex, shapeIndex: null, dataIndex: null,
                        name: null, value: null
                    });
                }
                var legendFill = (isNullOrUndefined(fill)) ? Object.prototype.toString.call(colorMap.color) === '[object Array]' ?
                    !isNullOrUndefined(colorMap.value) ? colorMap.color[0] : this_1.legendGradientColor(colorMap, legendIndex) :
                    colorMap.color : fill;
                legendIndex++;
                this_1.getOverallLegendItemsCollection(legendText, legendFill, rangeData, colorMap.showLegend);
            }
        };
        var this_1 = this;
        for (var _i = 0, colorMapping_1 = colorMapping; _i < colorMapping_1.length; _i++) {
            var colorMap = colorMapping_1[_i];
            _loop_1(colorMap);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Legend.prototype.getOverallLegendItemsCollection = function (legendText, legendFill, legendData, showLegend) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var newColllection = [];
        var legend = this.maps.legendSettings;
        if (legendData.length > 0 && showLegend) {
            for (var i = 0; i < legendData.length; i++) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var collection = legendData[i];
                if (collection.length > 0) {
                    for (var j = 0; j < collection.length; j++) {
                        newColllection.push(collection[j]);
                    }
                }
                else {
                    newColllection.push(legendData[i]);
                }
                newColllection['_isVisible'] = true;
            }
            var isDuplicate = this.maps.legendSettings.removeDuplicateLegend ?
                this.removeDuplicates(this.legendCollection, legendText, legendFill) : false;
            if (!isDuplicate) {
                this.legendCollection.push({
                    text: legendText, fill: legendFill, data: newColllection, opacity: legend.opacity,
                    borderColor: legend.shapeBorder.color, borderWidth: legend.shapeBorder.width
                });
            }
            else {
                for (var i = 0; i < this.legendCollection.length; i++) {
                    if (this.legendCollection[i]['text'] === legendText && this.legendCollection[i]['fill'] === legendFill) {
                        this.legendCollection[i].data.push(newColllection[0]);
                    }
                }
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Legend.prototype.removeDuplicates = function (legendCollection, text, legendFill) {
        var isDuplicate = false;
        for (var i = 0; i < legendCollection.length; i++) {
            if ((legendCollection[i]['text'] === text || legendCollection[i]['text'] === '') && legendCollection[i]['fill'] === legendFill) {
                isDuplicate = true;
                break;
            }
            else {
                continue;
            }
        }
        return isDuplicate;
    };
    Legend.prototype.getEqualLegendCollection = function (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    layerIndex, layerData, colorMapping, dataSource, dataPath, colorValuePath, propertyPath) {
        var _this = this;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var fill = this.maps.legendSettings.fill;
        var equalValues = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var legendText;
        var equalData = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var outOfRangeValues = [];
        var outOfRange = [];
        var _loop_2 = function (colorMap) {
            if (!isNullOrUndefined(colorMap.value)) {
                legendText = !isNullOrUndefined(colorMap.label) ? colorMap.label : colorMap.value;
                equalData = [];
                var eqaulColorProcess_1 = false;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                Array.prototype.forEach.call(dataSource, function (data, dataIndex) {
                    var equalValue = ((colorValuePath.indexOf('.') > -1) ? (getValueFromObject(data, colorValuePath)) :
                        (data[colorValuePath]));
                    if (equalValue === colorMap.value) {
                        eqaulColorProcess_1 = true;
                        if (equalValues.indexOf(equalValue) === -1) {
                            equalValues.push(equalValue);
                        }
                        equalData.push(_this.getLegendData(layerIndex, dataIndex, data, dataPath, layerData, propertyPath, equalValue));
                    }
                    else {
                        if (outOfRangeValues.indexOf(equalValue) === -1) {
                            outOfRangeValues.push(equalValue);
                        }
                    }
                });
                for (var x = 0; x < equalValues.length; x++) {
                    for (var y = 0; y < outOfRangeValues.length; y++) {
                        if (equalValues[x] === outOfRangeValues[y]) {
                            var equalIndex = outOfRangeValues.indexOf(equalValues[x]);
                            outOfRangeValues.splice(equalIndex, 1);
                        }
                    }
                }
                if (!eqaulColorProcess_1) {
                    equalData.push({
                        layerIndex: layerIndex, shapeIndex: null, dataIndex: null,
                        name: null, value: null
                    });
                }
                var legendFill = (isNullOrUndefined(fill)) ? Object.prototype.toString.call(colorMap.color) === '[object Array]'
                    ? colorMap.color[0] : colorMap.color : fill;
                this_2.getOverallLegendItemsCollection(legendText, legendFill, equalData, colorMap.showLegend);
            }
            else if (isNullOrUndefined(colorMap.minOpacity) && isNullOrUndefined(colorMap.maxOpacity) && isNullOrUndefined(colorMap.value)
                && isNullOrUndefined(colorMap.from) && isNullOrUndefined(colorMap.to) && !isNullOrUndefined(colorMap.color)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                Array.prototype.forEach.call(dataSource, function (data, dataIndex) {
                    var equalValue = ((colorValuePath.indexOf('.') > -1) ? (getValueFromObject(data, colorValuePath)) :
                        (data[colorValuePath]));
                    for (var k = 0; k < outOfRangeValues.length; k++) {
                        if (equalValue === outOfRangeValues[k]) {
                            outOfRange.push(_this.getLegendData(layerIndex, dataIndex, data, dataPath, layerData, propertyPath, equalValue));
                        }
                    }
                });
                if (outOfRangeValues.length === 0) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var range_1 = false;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    Array.prototype.forEach.call(dataSource, function (data, dataIndex) {
                        range_1 = false;
                        var rangeValue = data[colorValuePath];
                        for (var z = 0; z < colorMapping.length; z++) {
                            if (!isNullOrUndefined(rangeValue) && !isNaN(rangeValue)) {
                                if (rangeValue >= colorMapping[z].from && rangeValue <= colorMapping[z].to) {
                                    range_1 = true;
                                }
                            }
                            else if (!range_1) {
                                range_1 = false;
                            }
                        }
                        if (!range_1) {
                            outOfRange.push(_this.getLegendData(layerIndex, dataIndex, data, dataPath, layerData, propertyPath, rangeValue));
                        }
                    });
                }
                legendText = !isNullOrUndefined(colorMap.label) ? colorMap.label : 'Others';
                var outfill = ((Object.prototype.toString.call(colorMap.color) === '[object Array]'))
                    ? colorMap.color[0] : colorMap.color;
                var legendOutFill = outfill;
                this_2.getOverallLegendItemsCollection(legendText, legendOutFill, outOfRange, colorMap.showLegend);
            }
        };
        var this_2 = this;
        for (var _i = 0, colorMapping_2 = colorMapping; _i < colorMapping_2.length; _i++) {
            var colorMap = colorMapping_2[_i];
            _loop_2(colorMap);
        }
    };
    Legend.prototype.getDataLegendCollection = function (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    layerIndex, layerData, colorMapping, dataSource, dataPath, colorValuePath, propertyPath) {
        var _this = this;
        var legendText;
        var fill = this.maps.legendSettings.fill;
        var valuePath = this.maps.legendSettings.valuePath;
        if (!isNullOrUndefined(colorValuePath) && !isNullOrUndefined(dataSource)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Array.prototype.forEach.call(dataSource, function (data, dataIndex) {
                var showLegend = isNullOrUndefined(_this.maps.legendSettings.showLegendPath) ?
                    true : isNullOrUndefined(data[_this.maps.legendSettings.showLegendPath]) ?
                    false : data[_this.maps.legendSettings.showLegendPath];
                var dataValue = ((colorValuePath.indexOf('.') > -1) ? (getValueFromObject(data, colorValuePath)) :
                    (data[colorValuePath]));
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var newData = [];
                var legendFill = (isNullOrUndefined(fill)) ? dataValue : fill;
                if (!isNullOrUndefined(dataValue) && colorMapping.length === 0) {
                    legendText = !isNullOrUndefined(data[valuePath]) ? ((valuePath.indexOf('.') > -1) ?
                        getValueFromObject(data, valuePath) : data[valuePath]) : ((dataPath.indexOf('.') > -1) ?
                        getValueFromObject(data, dataPath) : data[dataPath]);
                    newData.push(_this.getLegendData(layerIndex, dataIndex, data, dataPath, layerData, propertyPath, dataValue));
                }
                _this.getOverallLegendItemsCollection(legendText, legendFill, newData, showLegend);
            });
        }
    };
    Legend.prototype.interactiveHandler = function (e) {
        var target = e.target;
        var legend = this.maps.legendSettings;
        var id = this.maps.element.id + '_Interactive_Legend';
        var hoverId = legend.type === 'Layers' ? '_shapeIndex_' : (legend.type === 'Markers') ? '_MarkerIndex_' :
            '_BubbleIndex_';
        if (target.id.indexOf(hoverId) > 1) {
            var layerIndex = parseFloat(target.id.split('_LayerIndex_')[1].split('_')[0]);
            var dataIndex = parseFloat(target.id.split(/_dataIndex_/i)[1].split('_')[0]);
            var fill = void 0;
            var stroke = void 0;
            var strokeWidth = void 0;
            if (!(isNullOrUndefined(querySelector(id, this.maps.element.id)))) {
                remove(querySelector(id, this.maps.element.id));
            }
            var layer = this.maps.layersCollection[layerIndex];
            var markerVisible = (legend.type === 'Layers' ? layer.visible :
                legend.type === 'Markers' ? layer.markerSettings[parseFloat(target.id.split('_MarkerIndex_')[1].split('_')[0])].visible :
                    (this.maps.getBubbleVisible(this.maps.layersCollection[layerIndex])));
            if (legend.visible && this.legendRenderingCollections.length > 0
                && legend.mode === 'Interactive' && markerVisible) {
                var svgRect = this.maps.svgObject.getBoundingClientRect();
                for (var i = 0; i < this.legendCollection.length; i++) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var currentData = this.legendCollection[i];
                    var legendElement = querySelector(this.maps.element.id + '_Legend_Index_' + i, this.maps.element.id);
                    var legendRect = legendElement.getBoundingClientRect();
                    var rect = new Rect(Math.abs(legendRect.left - svgRect.left), Math.abs(legendRect.top - svgRect.top), legendRect.width, legendRect.height);
                    fill = legendElement.getAttribute('fill');
                    stroke = legend.shapeBorder.color;
                    strokeWidth = legend.shapeBorder.width;
                    if (!isNullOrUndefined(currentData['data'])) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var data = currentData['data'];
                        for (var j = 0; j < data.length; j++) {
                            if (dataIndex === data[j]['dataIndex'] && layerIndex === data[j]['layerIndex']) {
                                this.renderInteractivePointer(legend, fill, stroke, id, strokeWidth, rect);
                                break;
                            }
                        }
                    }
                }
            }
        }
        else {
            if (!(isNullOrUndefined(querySelector(id, this.maps.element.id)))) {
                remove(querySelector(id, this.maps.element.id));
            }
        }
    };
    Legend.prototype.renderInteractivePointer = function (legend, fill, stroke, id, strokeWidth, rect) {
        var path;
        var locX;
        var locY;
        var height = 10;
        var width = 10;
        var direction = (legend.orientation === 'None') ? (legend.position === 'Top' || legend.position === 'Bottom')
            ? 'Horizontal' : 'Vertical' : legend.orientation;
        rect.y = legend.position === 'Float' && this.maps.isTileMap ? rect.y - this.maps.mapAreaRect.y : rect.y;
        if (direction === 'Horizontal') {
            if (!legend.invertedPointer) {
                locX = rect.x + (rect.width / 2) - (legend.position === 'Float' && this.maps.isTileMap ? this.maps.mapAreaRect.x : 0);
                locY = rect.y;
                path = ' M ' + locX + ' ' + locY + ' L ' + (locX - width) + ' ' + (locY - height) +
                    ' L ' + (locX + width) + ' ' + (locY - height) + ' Z ';
            }
            else {
                locX = rect.x + (rect.width / 2) - (legend.position === 'Float' && this.maps.isTileMap ? this.maps.mapAreaRect.x : 0);
                locY = rect.y + (rect.height);
                path = ' M ' + locX + ' ' + locY + ' L ' + (locX - width) + ' ' + (locY + height) +
                    ' L ' + (locX + width) + ' ' + (locY + height) + ' Z ';
            }
        }
        else {
            if (!legend.invertedPointer) {
                locX = rect.x + rect.width - (legend.position === 'Float' && this.maps.isTileMap ? this.maps.mapAreaRect.x : 0);
                locY = rect.y + (rect.height / 2);
                path = ' M ' + locX + ' ' + locY + ' L ' + (locX + width) + ' ' + (locY - height) +
                    ' L ' + (locX + width) + ' ' + (locY + height) + ' z ';
            }
            else {
                locX = rect.x - (legend.position === 'Float' && this.maps.isTileMap ? this.maps.mapAreaRect.x : 0);
                locY = rect.y + (rect.height / 2);
                path = ' M ' + locX + ' ' + locY + ' L ' + (locX - width) + ' ' + (locY - height) +
                    ' L ' + (locX - width) + ' ' + (locY + height) + ' z ';
            }
        }
        var pathOptions = new PathOption(id, fill, strokeWidth, stroke, 1, 1, '', path);
        if (legend.position === 'Float' && this.maps.isTileMap) {
            this.maps.mapLayerPanel.layerGroup.appendChild(this.maps.renderer.drawPath(pathOptions));
        }
        else {
            this.maps.svgObject.appendChild(this.maps.renderer.drawPath(pathOptions));
        }
    };
    Legend.prototype.wireEvents = function (element) {
        EventHandler.add(element, Browser.touchStartEvent, this.changeNextPage, this);
    };
    Legend.prototype.addEventListener = function () {
        if (this.maps.isDestroyed) {
            return;
        }
        this.maps.on(Browser.touchMoveEvent, this.interactiveHandler, this);
        this.maps.on(Browser.touchEndEvent, this.interactiveHandler, this);
        this.maps.on(click, this.legendClick, this);
    };
    Legend.prototype.markerToggleSelection = function (mapElement, layerIndex, markerIndex, legendIndex) {
        mapElement.setAttribute('fill', this.legendCollection[legendIndex]['fill']);
        mapElement.setAttribute('stroke', this.maps.layers[layerIndex].markerSettings[markerIndex].border.color);
        mapElement.setAttribute('fill-opacity', (this.maps.layers[layerIndex].markerSettings[markerIndex].opacity).toString());
        mapElement.setAttribute('stroke-width', (this.maps.layers[layerIndex].markerSettings[markerIndex].border.width).toString());
        mapElement.setAttribute('stroke-opacity', (isNullOrUndefined(this.maps.layers[layerIndex].markerSettings[markerIndex].border.opacity) ?
            this.maps.layers[layerIndex].markerSettings[markerIndex].opacity :
            this.maps.layers[layerIndex].markerSettings[markerIndex].border.opacity).toString());
    };
    Legend.prototype.bubbleToggleSelection = function (mapElement, layerIndex, bubbleIndex, legendIndex) {
        mapElement.setAttribute('fill', this.legendCollection[legendIndex]['fill']);
        mapElement.setAttribute('stroke', this.maps.layers[layerIndex].bubbleSettings[bubbleIndex].border.color);
        mapElement.setAttribute('fill-opacity', (this.maps.layers[layerIndex].bubbleSettings[bubbleIndex].opacity).toString());
        mapElement.setAttribute('stroke-width', (this.maps.layers[layerIndex].bubbleSettings[bubbleIndex].border.width).toString());
        mapElement.setAttribute('stroke-opacity', (isNullOrUndefined(this.maps.layers[layerIndex].bubbleSettings[bubbleIndex].border.opacity) ?
            this.maps.layers[layerIndex].bubbleSettings[bubbleIndex].opacity :
            this.maps.layers[layerIndex].bubbleSettings[bubbleIndex].border.opacity).toString());
    };
    Legend.prototype.legendClick = function (targetEle) {
        var legendShapeId;
        var legendTextId;
        var legendToggleFill = this.maps.legendSettings.toggleLegendSettings.fill;
        var legendToggleOpacity = this.maps.legendSettings.toggleLegendSettings.opacity;
        var legendToggleBorderColor = this.maps.legendSettings.toggleLegendSettings.border.color;
        var legendToggleBorderWidth = this.maps.legendSettings.toggleLegendSettings.border.width;
        var legendToggleBorderOpacity = isNullOrUndefined(this.maps.legendSettings.toggleLegendSettings.border.opacity) ?
            this.maps.legendSettings.toggleLegendSettings.opacity : this.maps.legendSettings.toggleLegendSettings.border.opacity;
        if (targetEle.parentNode['id'].indexOf(this.maps.element.id + '_Legend_Index_') > -1) {
            var mapElement = void 0;
            var legendIndex = parseFloat(targetEle.parentElement.id.substr((this.maps.element.id + '_Legend_Index_').length));
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var selectedItem = this.legendCollection[legendIndex]['data'];
            var isVisible = selectedItem['_isVisible'];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var shape = void 0;
            if (this.maps.legendSettings.toggleLegendSettings.enable && (this.maps.legendSettings.type === 'Bubbles' || this.maps.legendSettings.type === 'Markers')) {
                for (var k = 0; k < this.maps.layers.length; k++) {
                    for (var j = 0; j < (this.maps.legendSettings.type === 'Bubbles' ? this.maps.layers[k].bubbleSettings.length : this.maps.layers[k].markerSettings.length); j++) {
                        for (var i = 0; i < selectedItem.length; i++) {
                            shape = this.legendCollection[legendIndex]['data'][i];
                            mapElement = this.maps.legendSettings.type === 'Bubbles' ? querySelector(this.maps.element.id + '_LayerIndex_' + shape['layerIndex'] +
                                '_BubbleIndex_' + j + '_dataIndex_' + shape['dataIndex'], this.maps.element.id) : querySelector(this.maps.element.id + '_LayerIndex_' + shape['layerIndex'] +
                                '_MarkerIndex_' + shape['markerIndex'] + '_dataIndex_' + shape['dataIndex'], this.maps.element.id);
                            if (!isNullOrUndefined(shape['shape']) && shape['shape'] === 'Balloon') {
                                mapElement = this.maps.legendSettings.type === 'Bubbles' ? querySelector(this.maps.element.id + '_LayerIndex_' + shape['layerIndex'] +
                                    '_BubbleIndex_' + j + '_dataIndex_' + shape['dataIndex'] + '_Group', this.maps.element.id) : querySelector(this.maps.element.id + '_LayerIndex_' + shape['layerIndex'] +
                                    '_MarkerIndex_' + shape['markerIndex'] + '_dataIndex_' + shape['dataIndex'] + '_Group', this.maps.element.id);
                                mapElement = mapElement.children[0];
                            }
                            if (isVisible && mapElement !== null) {
                                if (this.maps.legendSettings.toggleLegendSettings.applyShapeSettings) {
                                    mapElement.setAttribute('fill', this.maps.layers[k].shapeSettings.fill);
                                    mapElement.setAttribute('stroke', this.maps.layers[k].shapeSettings.border.color);
                                    mapElement.setAttribute('fill-opacity', (this.maps.layers[k].shapeSettings.opacity).toString());
                                    mapElement.setAttribute('stroke-width', (isNullOrUndefined(this.maps.layers[k].shapeSettings.border.width) ? 0 : this.maps.layers[k].shapeSettings.border.width).toString());
                                    mapElement.setAttribute('stroke-opacity', (isNullOrUndefined(this.maps.layers[k].shapeSettings.border.opacity) ?
                                        this.maps.layers[k].shapeSettings.opacity :
                                        this.maps.layers[k].shapeSettings.border.opacity).toString());
                                }
                                else {
                                    mapElement.setAttribute('fill', legendToggleFill);
                                    mapElement.setAttribute('fill-opacity', (legendToggleOpacity).toString());
                                    mapElement.setAttribute('stroke', legendToggleBorderColor);
                                    mapElement.setAttribute('stroke-width', (legendToggleBorderWidth).toString());
                                    mapElement.setAttribute('stroke-opacity', (legendToggleBorderOpacity).toString());
                                }
                                if (targetEle !== null) {
                                    legendShapeId = querySelector(this.maps.element.id + '_Legend_Shape_Index_' + legendIndex, this.maps.element.id);
                                    legendTextId = querySelector(this.maps.element.id + '_Legend_Text_Index_' + legendIndex, this.maps.element.id);
                                    if (!this.maps.legendSettings.toggleLegendSettings.applyShapeSettings) {
                                        this.setToggleAttributes(legendTextId, legendShapeId, legendToggleFill, legendToggleOpacity, legendToggleBorderColor, legendToggleBorderWidth, legendToggleBorderOpacity, legendToggleFill);
                                    }
                                    else {
                                        this.setToggleAttributes(legendTextId, legendShapeId, this.maps.layers[k].shapeSettings.fill, this.maps.layers[k].shapeSettings.opacity, this.maps.layers[k].shapeSettings.border.color, isNullOrUndefined(this.maps.layers[k].shapeSettings.border.width) ? 0 : this.maps.layers[k].shapeSettings.border.width, isNullOrUndefined(this.maps.layers[k].shapeSettings.border.opacity) ? this.maps.layers[k].shapeSettings.opacity : this.maps.layers[k].shapeSettings.border.opacity, this.maps.layers[k].shapeSettings.fill);
                                    }
                                }
                            }
                            else {
                                if (this.maps.legendSettings.type === 'Markers') {
                                    this.markerToggleSelection(mapElement, k, j, legendIndex);
                                }
                                else {
                                    this.bubbleToggleSelection(mapElement, k, j, legendIndex);
                                }
                                if (targetEle !== null) {
                                    legendShapeId = querySelector(this.maps.element.id + '_Legend_Shape_Index_' + legendIndex, this.maps.element.id);
                                    legendTextId = querySelector(this.maps.element.id + '_Legend_Text_Index_' + legendIndex, this.maps.element.id);
                                    this.setToggleAttributes(legendTextId, legendShapeId, this.legendCollection[legendIndex]['fill'], this.legendCollection[legendIndex]['opacity'], this.legendCollection[legendIndex]['shapeBorder']['color'], this.legendCollection[legendIndex]['shapeBorder']['width'], this.legendCollection[legendIndex]['shapeBorder']['opacity'], '#757575');
                                    if (this.maps.legendSettings.shape === 'HorizontalLine' || this.maps.legendSettings.shape === 'VerticalLine' || this.maps.legendSettings.shape === 'Cross') {
                                        legendShapeId.setAttribute('stroke', this.legendCollection[legendIndex]['fill']);
                                    }
                                }
                            }
                        }
                        selectedItem['_isVisible'] = isVisible ? false : true;
                    }
                }
            }
            if (this.maps.legendSettings.type === 'Layers' && this.maps.legendSettings.toggleLegendSettings.enable) {
                var layerElement = void 0;
                this.removeCollections(targetEle, legendIndex);
                var toggledLegendIdIndex = this.maps.toggledLegendId.indexOf(legendIndex);
                if (toggledLegendIdIndex !== -1) {
                    isVisible = false;
                }
                for (var j = 0; j < this.maps.layers.length; j++) {
                    for (var i = 0; i < selectedItem.length; i++) {
                        shape = this.legendCollection[legendIndex]['data'][i];
                        layerElement = querySelector(this.maps.element.id + '_LayerIndex_' + shape['layerIndex'] +
                            '_shapeIndex_' + shape['shapeIndex'] + '_dataIndex_' + shape['dataIndex'], this.maps.element.id);
                        if (layerElement !== null) {
                            var toggledShapeIdIndex = this.maps.toggledShapeElementId.indexOf(layerElement.id);
                            if (isVisible) {
                                if (i === 0) {
                                    this.maps.toggledLegendId.push(legendIndex);
                                }
                                if (toggledShapeIdIndex === -1) {
                                    this.maps.toggledShapeElementId.push(layerElement.id);
                                }
                                if (this.maps.legendSettings.toggleLegendSettings.applyShapeSettings) {
                                    layerElement.setAttribute('fill', this.maps.layers[j].shapeSettings.fill);
                                    layerElement.setAttribute('fill-opacity', (this.maps.layers[j].shapeSettings.opacity).toString());
                                    layerElement.setAttribute('stroke', this.maps.layers[j].shapeSettings.border.color);
                                    layerElement.setAttribute('stroke-width', (isNullOrUndefined(this.maps.layers[j].shapeSettings.border.width) ? 0 : this.maps.layers[j].shapeSettings.border.width).toString());
                                    layerElement.setAttribute('stroke-opacity', (isNullOrUndefined(this.maps.layers[j].shapeSettings.border.opacity) ?
                                        this.maps.layers[j].shapeSettings.opacity :
                                        this.maps.layers[j].shapeSettings.border.opacity).toString());
                                }
                                else {
                                    layerElement.setAttribute('fill', legendToggleFill);
                                    layerElement.setAttribute('fill-opacity', (legendToggleOpacity).toString());
                                    layerElement.setAttribute('stroke', legendToggleBorderColor);
                                    layerElement.setAttribute('stroke-width', (legendToggleBorderWidth).toString());
                                    layerElement.setAttribute('stroke-opacity', (legendToggleBorderOpacity).toString());
                                }
                                if (targetEle !== null) {
                                    legendTextId = querySelector(this.maps.element.id + '_Legend_Text_Index_' + legendIndex, this.maps.element.id);
                                    legendShapeId = querySelector(this.maps.element.id + '_Legend_Shape_Index_' + legendIndex, this.maps.element.id);
                                    if (!this.maps.legendSettings.toggleLegendSettings.applyShapeSettings) {
                                        this.setToggleAttributes(legendTextId, legendShapeId, legendToggleFill, legendToggleOpacity, legendToggleBorderColor, legendToggleBorderWidth, legendToggleBorderOpacity, legendToggleFill);
                                    }
                                    else {
                                        this.setToggleAttributes(legendTextId, legendShapeId, this.maps.layers[j].shapeSettings.fill, this.maps.layers[j].shapeSettings.opacity, this.maps.layers[j].shapeSettings.border.color, isNullOrUndefined(this.maps.layers[j].shapeSettings.border.width) ? 0 : this.maps.layers[j].shapeSettings.border.width, isNullOrUndefined(this.maps.layers[j].shapeSettings.border.opacity) ? this.maps.layers[j].shapeSettings.opacity : this.maps.layers[j].shapeSettings.border.opacity, this.maps.layers[j].shapeSettings.fill);
                                    }
                                }
                            }
                            else {
                                if (toggledLegendIdIndex !== -1 && i === 0) {
                                    this.maps.toggledLegendId.splice(toggledLegendIdIndex, 1);
                                }
                                if (toggledShapeIdIndex !== -1) {
                                    this.maps.toggledShapeElementId.splice(toggledShapeIdIndex, 1);
                                }
                                layerElement.setAttribute('fill', this.legendCollection[legendIndex]['fill']);
                                layerElement.setAttribute('stroke-opacity', (isNullOrUndefined(this.maps.layers[j].shapeSettings.border.opacity) ?
                                    this.maps.layers[j].shapeSettings.opacity :
                                    this.maps.layers[j].shapeSettings.border.opacity).toString());
                                layerElement.setAttribute('stroke-width', (isNullOrUndefined(this.maps.layers[j].shapeSettings.border.width) ? 0 : this.maps.layers[j].shapeSettings.border.width).toString());
                                layerElement.setAttribute('fill-opacity', (this.maps.layers[j].shapeSettings.opacity).toString());
                                layerElement.setAttribute('stroke', this.maps.layers[j].shapeSettings.border.color);
                                if (targetEle !== null) {
                                    legendTextId = querySelector(this.maps.element.id + '_Legend_Text_Index_' + legendIndex, this.maps.element.id);
                                    legendShapeId = querySelector(this.maps.element.id + '_Legend_Shape_Index_' + legendIndex, this.maps.element.id);
                                    this.setToggleAttributes(legendTextId, legendShapeId, this.legendCollection[legendIndex]['fill'], this.legendCollection[legendIndex]['opacity'], this.legendCollection[legendIndex]['shapeBorder']['color'], this.legendCollection[legendIndex]['shapeBorder']['width'], this.legendCollection[legendIndex]['shapeBorder']['opacity'], '#757575');
                                }
                            }
                        }
                    }
                }
                selectedItem['_isVisible'] = isVisible ? false : true;
            }
        }
        else if (!isNullOrUndefined(targetEle.id) && (targetEle.id.indexOf(this.maps.element.id + '_Legend_Shape_Index') > -1 ||
            targetEle.id.indexOf(this.maps.element.id + '_Legend_Index') !== -1) && this.maps.legendSettings.visible &&
            targetEle.id.indexOf('_Text') === -1) {
            var LegendInteractive = void 0;
            var legendIndex = parseFloat(targetEle.id.split(this.maps.element.id + '_Legend_Index_')[1]);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var mapdata = void 0;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var selectedItem = this.legendCollection[legendIndex]['data'];
            var isVisible = selectedItem['_isVisible'];
            if ((this.maps.legendSettings.type === 'Bubbles' || this.maps.legendSettings.type === 'Markers') && this.maps.legendSettings.toggleLegendSettings.enable) {
                for (var k = 0; k < this.maps.layers.length; k++) {
                    for (var j = 0; j < (this.maps.legendSettings.type === 'Bubbles' ? this.maps.layers[k].bubbleSettings.length : this.maps.layers[k].markerSettings.length); j++) {
                        for (var i = 0; i < selectedItem.length; i++) {
                            mapdata = this.legendCollection[legendIndex]['data'][i];
                            LegendInteractive = this.maps.legendSettings.type === 'Bubbles' ? querySelector(this.maps.element.id + '_LayerIndex_' + mapdata['layerIndex'] +
                                '_BubbleIndex_' + j + '_dataIndex_' + mapdata['dataIndex'], this.maps.element.id) : querySelector(this.maps.element.id + '_LayerIndex_' + mapdata['layerIndex'] +
                                '_MarkerIndex_' + j + '_dataIndex_' + mapdata['dataIndex'], this.maps.element.id);
                            if (!isNullOrUndefined(mapdata['shape']) && mapdata['shape'] === 'Balloon') {
                                LegendInteractive = this.maps.legendSettings.type === 'Bubbles' ? querySelector(this.maps.element.id + '_LayerIndex_' + mapdata['layerIndex'] +
                                    '_BubbleIndex_' + j + '_dataIndex_' + mapdata['dataIndex'] + '_Group', this.maps.element.id) : querySelector(this.maps.element.id + '_LayerIndex_' + mapdata['layerIndex'] +
                                    '_MarkerIndex_' + j + '_dataIndex_' + mapdata['dataIndex'] + '_Group', this.maps.element.id);
                                LegendInteractive = LegendInteractive.children[0];
                            }
                            if (isVisible && LegendInteractive !== null) {
                                if (this.maps.legendSettings.toggleLegendSettings.applyShapeSettings) {
                                    LegendInteractive.setAttribute('fill', this.maps.layers[k].shapeSettings.fill);
                                    LegendInteractive.setAttribute('stroke', this.maps.layers[k].shapeSettings.border.color);
                                    LegendInteractive.setAttribute('stroke-width', (isNullOrUndefined(this.maps.layers[k].shapeSettings.border.width) ? 0 : this.maps.layers[k].shapeSettings.border.width).toString());
                                    LegendInteractive.setAttribute('stroke-opacity', (isNullOrUndefined(this.maps.layers[k].shapeSettings.border.opacity) ?
                                        this.maps.layers[k].shapeSettings.opacity :
                                        this.maps.layers[k].shapeSettings.border.opacity).toString());
                                    LegendInteractive.setAttribute('fill-opacity', (this.maps.layers[k].shapeSettings.opacity).toString());
                                }
                                else {
                                    LegendInteractive.setAttribute('fill', legendToggleFill);
                                    LegendInteractive.setAttribute('fill-opacity', (legendToggleOpacity).toString());
                                    LegendInteractive.setAttribute('stroke', legendToggleBorderColor);
                                    LegendInteractive.setAttribute('stroke-width', (legendToggleBorderWidth).toString());
                                    LegendInteractive.setAttribute('stroke-opacity', (legendToggleBorderOpacity).toString());
                                }
                                if (targetEle !== null) {
                                    legendTextId = querySelector(this.maps.element.id + '_Legend_Index_' + legendIndex + '_Text', this.maps.element.id);
                                    legendShapeId = querySelector(this.maps.element.id + '_Legend_Index_' + legendIndex, this.maps.element.id);
                                    if (!this.maps.legendSettings.toggleLegendSettings.applyShapeSettings) {
                                        this.setToggleAttributes(legendTextId, legendShapeId, legendToggleFill, legendToggleOpacity, legendToggleBorderColor, legendToggleBorderWidth, legendToggleBorderOpacity, legendToggleFill);
                                    }
                                    else {
                                        this.setToggleAttributes(legendTextId, legendShapeId, this.maps.layers[k].shapeSettings.fill, this.maps.layers[k].shapeSettings.opacity, this.maps.layers[k].shapeSettings.border.color, (isNullOrUndefined(this.maps.layers[k].shapeSettings.border.width) ? 0 : this.maps.layers[k].shapeSettings.border.width), (isNullOrUndefined(this.maps.layers[k].shapeSettings.border.opacity) ? this.maps.layers[k].shapeSettings.opacity : this.maps.layers[k].shapeSettings.border.opacity), this.maps.layers[k].shapeSettings.fill);
                                    }
                                }
                            }
                            else {
                                if (this.maps.legendSettings.type === 'Markers') {
                                    this.markerToggleSelection(LegendInteractive, k, j, legendIndex);
                                }
                                else {
                                    this.bubbleToggleSelection(LegendInteractive, k, j, legendIndex);
                                }
                                if (targetEle !== null) {
                                    legendShapeId = querySelector(this.maps.element.id + '_Legend_Index_' + legendIndex, this.maps.element.id);
                                    legendShapeId.setAttribute('fill', this.legendCollection[legendIndex]['fill']);
                                    legendShapeId.setAttribute('fill-opacity', this.legendCollection[legendIndex]['opacity']);
                                    legendShapeId.setAttribute('stroke', this.legendCollection[legendIndex]['shapeBorder']['color']);
                                    legendShapeId.setAttribute('stroke-width', this.legendCollection[legendIndex]['shapeBorder']['width']);
                                    legendShapeId.setAttribute('stroke-opacity', this.legendCollection[legendIndex]['shapeBorder']['opacity']);
                                    legendTextId = querySelector(this.maps.element.id + '_Legend_Index_' + legendIndex + '_Text', this.maps.element.id);
                                    legendTextId.setAttribute('fill', '#757575');
                                }
                            }
                        }
                        selectedItem['_isVisible'] = isVisible ? false : true;
                    }
                }
            }
            if (this.maps.legendSettings.type === 'Layers' && this.maps.legendSettings.toggleLegendSettings.enable) {
                var mapLegendElement = void 0;
                this.removeCollections(targetEle, legendIndex);
                var toggleLegendIdIndex = this.maps.toggledLegendId.indexOf(legendIndex);
                if (toggleLegendIdIndex !== -1) {
                    isVisible = false;
                }
                for (var k = 0; k < this.maps.layers.length; k++) {
                    for (var i = 0; i < selectedItem.length; i++) {
                        mapdata = this.legendCollection[legendIndex]['data'][i];
                        mapLegendElement = querySelector(this.maps.element.id + '_LayerIndex_' + mapdata['layerIndex'] +
                            '_shapeIndex_' + mapdata['shapeIndex'] + '_dataIndex_' + mapdata['dataIndex'], this.maps.element.id);
                        if (mapLegendElement !== null) {
                            var toggledShapeIdIndex = this.maps.toggledShapeElementId.indexOf(mapLegendElement.id);
                            if (isVisible) {
                                if (i === 0) {
                                    this.maps.toggledLegendId.push(legendIndex);
                                }
                                if (toggledShapeIdIndex === -1) {
                                    this.maps.toggledShapeElementId.push(mapLegendElement.id);
                                }
                                if (this.maps.legendSettings.toggleLegendSettings.applyShapeSettings) {
                                    mapLegendElement.setAttribute('fill', this.maps.layers[0].shapeSettings.fill);
                                    mapLegendElement.setAttribute('stroke', this.maps.layers[0].shapeSettings.border.color);
                                    mapLegendElement.setAttribute('fill-opacity', (this.maps.layers[k].shapeSettings.opacity).toString());
                                    mapLegendElement.setAttribute('stroke-width', (isNullOrUndefined(this.maps.layers[k].shapeSettings.border.width) ? 0 : this.maps.layers[k].shapeSettings.border.width).toString());
                                    mapLegendElement.setAttribute('stroke-opacity', (isNullOrUndefined(this.maps.layers[k].shapeSettings.border.opacity) ?
                                        this.maps.layers[k].shapeSettings.opacity :
                                        this.maps.layers[k].shapeSettings.border.opacity).toString());
                                }
                                else {
                                    mapLegendElement.setAttribute('fill', legendToggleFill);
                                    mapLegendElement.setAttribute('fill-opacity', (legendToggleOpacity).toString());
                                    mapLegendElement.setAttribute('stroke', legendToggleBorderColor);
                                    mapLegendElement.setAttribute('stroke-width', (legendToggleBorderWidth).toString());
                                    mapLegendElement.setAttribute('stroke-opacity', (legendToggleBorderOpacity).toString());
                                }
                                if (targetEle !== null) {
                                    legendShapeId = querySelector(this.maps.element.id + '_Legend_Index_' + legendIndex, this.maps.element.id);
                                    legendTextId = querySelector(this.maps.element.id + '_Legend_Index_' + legendIndex + '_Text', this.maps.element.id);
                                    if (!this.maps.legendSettings.toggleLegendSettings.applyShapeSettings) {
                                        this.setToggleAttributes(legendTextId, legendShapeId, legendToggleFill, legendToggleOpacity, legendToggleBorderColor, legendToggleBorderWidth, legendToggleBorderOpacity, legendToggleFill);
                                    }
                                    else {
                                        this.setToggleAttributes(legendTextId, legendShapeId, this.maps.layers[0].shapeSettings.fill, this.maps.layers[k].shapeSettings.opacity, this.maps.layers[0].shapeSettings.border.color, isNullOrUndefined(this.maps.layers[k].shapeSettings.border.width) ? 0 : this.maps.layers[k].shapeSettings.border.width, isNullOrUndefined(this.maps.layers[k].shapeSettings.border.opacity) ? this.maps.layers[k].shapeSettings.opacity : this.maps.layers[k].shapeSettings.border.opacity, this.maps.layers[0].shapeSettings.fill);
                                    }
                                }
                            }
                            else {
                                if (toggleLegendIdIndex !== -1 && i === 0) {
                                    this.maps.toggledLegendId.splice(toggleLegendIdIndex, 1);
                                }
                                if (toggledShapeIdIndex !== -1) {
                                    this.maps.toggledShapeElementId.splice(toggledShapeIdIndex, 1);
                                }
                                mapLegendElement.setAttribute('fill-opacity', (this.maps.layers[k].shapeSettings.opacity).toString());
                                mapLegendElement.setAttribute('stroke-width', (isNullOrUndefined(this.maps.layers[k].shapeSettings.border.width) ? 0 :
                                    this.maps.layers[k].shapeSettings.border.width).toString());
                                mapLegendElement.setAttribute('stroke', this.maps.layers[0].shapeSettings.border.color);
                                mapLegendElement.setAttribute('stroke-opacity', (isNullOrUndefined(this.maps.layers[k].shapeSettings.border.opacity) ?
                                    this.maps.layers[k].shapeSettings.opacity :
                                    this.maps.layers[k].shapeSettings.border.opacity).toString());
                                mapLegendElement.setAttribute('fill', this.legendCollection[legendIndex]['fill']);
                                if (targetEle !== null) {
                                    legendTextId = querySelector(this.maps.element.id + '_Legend_Index_' + legendIndex + '_Text', this.maps.element.id);
                                    legendShapeId = querySelector(this.maps.element.id + '_Legend_Index_' + legendIndex, this.maps.element.id);
                                    this.setToggleAttributes(legendTextId, legendShapeId, this.legendCollection[legendIndex]['fill'], this.legendCollection[legendIndex]['opacity'], this.legendCollection[legendIndex]['shapeBorder']['color'], this.legendCollection[legendIndex]['shapeBorder']['width'], this.legendCollection[legendIndex]['shapeBorder']['opacity'], '#757575');
                                }
                            }
                        }
                    }
                }
                selectedItem['_isVisible'] = isVisible ? false : true;
            }
        }
    };
    Legend.prototype.removeCollections = function (targetEle, legendIndex) {
        this.removeLegendSelectionCollection(targetEle);
        var legendSelectionIndex = this.getIndexofLegend(this.maps.legendSelectionCollection, targetEle);
        if (legendSelectionIndex !== -1) {
            this.maps.legendSelectionCollection.splice(legendSelectionIndex, 1);
        }
        var legendHighlightIndex = this.getIndexofLegend(this.legendHighlightCollection, targetEle);
        if (legendHighlightIndex !== -1) {
            this.legendHighlightCollection.splice(legendSelectionIndex, 1);
        }
        var shapeHighlightIndex = this.getIndexofLegend(this.shapeHighlightCollection, targetEle);
        if (shapeHighlightIndex !== -1) {
            this.shapeHighlightCollection.splice(shapeHighlightIndex, 1);
        }
        var selectedIndex = this.maps.selectedLegendElementId.indexOf(legendIndex);
        if (selectedIndex !== -1) {
            this.maps.selectedLegendElementId.splice(selectedIndex, 1);
        }
    };
    Legend.prototype.removeEventListener = function () {
        if (this.maps.isDestroyed) {
            return;
        }
        this.maps.off(Browser.touchMoveEvent, this.interactiveHandler);
        this.maps.off(Browser.touchEndEvent, this.interactiveHandler);
        this.maps.off(click, this.legendClick);
    };
    Legend.prototype.getLegendData = function (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    layerIndex, dataIndex, data, dataPath, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    layerData, shapePropertyPath, value
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var legendData = [];
        if (Object.prototype.toString.call(layerData) === '[object Array]') {
            for (var i = 0; i < layerData.length; i++) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var shapeData = layerData[i];
                var dataPathValue = (dataPath.indexOf('.') > -1) ? getValueFromObject(data, dataPath) : data[dataPath];
                var shapePath = checkPropertyPath(data[dataPath], shapePropertyPath, shapeData['properties']);
                var dataPathValueCase = !isNullOrUndefined(dataPathValue) &&
                    typeof dataPathValue === 'string' ? dataPathValue.toLowerCase() : dataPathValue;
                var shapeDataValueCase = !isNullOrUndefined(shapeData['properties'][shapePath])
                    && isNaN(shapeData['properties'][shapePath]) ?
                    shapeData['properties'][shapePath].toLowerCase() : shapeData['properties'][shapePath];
                if (shapeDataValueCase === dataPathValueCase) {
                    if (shapeData['geometry']['type'] !== 'MultiPoint') {
                        legendData.push({
                            layerIndex: layerIndex, shapeIndex: i, dataIndex: dataIndex,
                            name: data[dataPath], value: value, pointIndex: -1
                        });
                    }
                    else {
                        for (var j = 0; j < shapeData['geometry'].coordinates.length; j++) {
                            legendData.push({
                                layerIndex: layerIndex, shapeIndex: i, dataIndex: dataIndex,
                                name: data[dataPath], value: value, pointIndex: j
                            });
                        }
                    }
                }
            }
        }
        return legendData;
    };
    Legend.prototype.setToggleAttributes = function (textElement, shapeElement, fillColor, fillOpacity, borderColor, borderWidth, borderOpacity, textColor) {
        textElement.setAttribute('fill', textColor);
        shapeElement.setAttribute('fill', fillColor);
        shapeElement.setAttribute('fill-opacity', (fillOpacity).toString());
        shapeElement.setAttribute('stroke', borderColor);
        shapeElement.setAttribute('stroke-width', (borderWidth).toString());
        if (!isNullOrUndefined(borderOpacity)) {
            shapeElement.setAttribute('stroke-opacity', (borderOpacity).toString());
        }
    };
    Legend.prototype.legendGradientColor = function (colorMap, legendIndex) {
        var legendFillColor;
        var xmlns = 'http://www.w3.org/2000/svg';
        if (!isNullOrUndefined(colorMap.color) && typeof (colorMap.color) === 'object') {
            var linerGradientEle = document.createElementNS(xmlns, 'linearGradient');
            var opacity = 1;
            var position = this.maps.legendSettings.position;
            var x2 = position === 'Top' || position === 'Bottom' ? '100' : '0';
            var y2 = position === 'Top' || position === 'Bottom' ? '0' : '100';
            linerGradientEle.setAttribute('id', 'linear_' + legendIndex + '_' + this.maps.element.id);
            linerGradientEle.setAttribute('x1', 0 + '%');
            linerGradientEle.setAttribute('y1', 0 + '%');
            linerGradientEle.setAttribute('x2', x2 + '%');
            linerGradientEle.setAttribute('y2', y2 + '%');
            for (var b = 0; b < colorMap.color.length; b++) {
                var offsetColor = 100 / (colorMap.color.length - 1);
                var stopEle = document.createElementNS(xmlns, 'stop');
                stopEle.setAttribute('offset', b * offsetColor + '%');
                stopEle.setAttribute('stop-color', colorMap.color[b]);
                stopEle.setAttribute('stop-opacity', opacity.toString());
                linerGradientEle.appendChild(stopEle);
            }
            this.legendLinearGradient = linerGradientEle;
            var color = 'url(' + '#linear_' + legendIndex + '_' + this.maps.element.id + ')';
            this.defsElement.appendChild(linerGradientEle);
            legendFillColor = color;
        }
        return legendFillColor;
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name
     */
    Legend.prototype.getModuleName = function () {
        return 'Legend';
    };
    /**
     * To destroy the legend.
     *
     * @returns {void}
     * @private
     */
    Legend.prototype.destroy = function () {
        this.legendCollection = [];
        this.legendRenderingCollections = [];
        this.translate = null;
        this.legendBorderRect = null;
        this.initialMapAreaRect = null;
        this.legendTotalRect = null;
        this.totalPages = [];
        this.legendItemRect = null;
        this.legendGroup = null;
        this.shapeHighlightCollection = [];
        this.legendHighlightCollection = [];
        this.shapePreviousColor = [];
        this.selectedNonLegendShapes = [];
        this.legendLinearGradient = null;
        this.currentLayer = null;
        this.defsElement = null;
        this.legendElement = [];
        this.oldShapeElement = null;
        this.removeEventListener();
        this.maps = null;
    };
    return Legend;
}());

/**
 * Highlight module class
 */
var Highlight = /** @__PURE__ @class */ (function () {
    function Highlight(maps) {
        this.maps = maps;
        this.addEventListener();
    }
    /**
     * To bind events for highlight module
     *
     * @returns {void}
     */
    Highlight.prototype.addEventListener = function () {
        if (this.maps.isDestroyed) {
            return;
        }
        this.maps.on(Browser.touchMoveEvent, this.mouseMove, this);
        this.maps.on(Browser.touchStartEvent, this.mouseMove, this);
    };
    /**
     * To unbind events for highlight module
     *
     * @returns {void}
     */
    Highlight.prototype.removeEventListener = function () {
        if (this.maps.isDestroyed) {
            return;
        }
        this.maps.off(Browser.touchMoveEvent, this.mouseMove);
        this.maps.off(Browser.touchStartEvent, this.mouseMove);
    };
    // eslint-disable-next-line valid-jsdoc
    /**
     * Public method for highlight module
     * @private
     */
    Highlight.prototype.addHighlight = function (layerIndex, name, enable) {
        var targetEle = getTargetElement(layerIndex, name, enable, this.maps);
        if (enable) {
            this.mapHighlight(targetEle, null, null);
        }
        else {
            removeClass(targetEle);
        }
    };
    Highlight.prototype.mouseMove = function (e) {
        var targetEle = e.target;
        var layerIndex;
        var isTouch = e.pointerType === 'touch' || e.pointerType === '2' || (e.type.indexOf('touch') > -1);
        if ((targetEle.id.indexOf('LayerIndex') !== -1 || targetEle.id.indexOf('NavigationIndex') > -1) &&
            targetEle.getAttribute('class') !== 'ShapeselectionMapStyle' && !isTouch &&
            targetEle.getAttribute('class') !== 'MarkerselectionMapStyle' &&
            targetEle.getAttribute('class') !== 'BubbleselectionMapStyle' &&
            targetEle.getAttribute('class') !== 'navigationlineselectionMapStyle' &&
            targetEle.getAttribute('class') !== 'LineselectionMapStyle') {
            layerIndex = parseInt(targetEle.id.split('_LayerIndex_')[1].split('_')[0], 10);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var shapeData = void 0;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var data = void 0;
            var shapeIn = void 0;
            var dataIndex = void 0;
            if (targetEle.id.indexOf('shapeIndex') > -1) {
                shapeIn = parseInt(targetEle.id.split('_shapeIndex_')[1].split('_')[0], 10);
                shapeData = this.maps.layers[layerIndex].shapeData['features'] &&
                    !isNullOrUndefined(this.maps.layersCollection[layerIndex].layerData[shapeIn]) ?
                    this.maps.layersCollection[layerIndex].layerData[shapeIn]['property'] : null;
                dataIndex = parseInt(targetEle.id.split('_dataIndex_')[1].split('_')[0], 10);
                data = isNullOrUndefined(dataIndex) ? null : this.maps.layers[layerIndex].dataSource[dataIndex];
                this.highlightSettings = this.maps.layers[layerIndex].highlightSettings;
            }
            else if (targetEle.id.indexOf('BubbleIndex') > -1) {
                var bubble = parseInt(targetEle.id.split('_BubbleIndex_')[1].split('_')[0], 10);
                dataIndex = parseInt(targetEle.id.split('_dataIndex_')[1].split('_')[0], 10);
                data = this.maps.layers[layerIndex].bubbleSettings[bubble].dataSource[dataIndex];
                this.highlightSettings = this.maps.layers[layerIndex].bubbleSettings[bubble].highlightSettings;
            }
            else if (targetEle.id.indexOf('MarkerIndex') > -1) {
                var marker$$1 = parseInt(targetEle.id.split('_MarkerIndex_')[1].split('_')[0], 10);
                dataIndex = parseInt(targetEle.id.split('_dataIndex_')[1].split('_')[0], 10);
                data = this.maps.layers[layerIndex].markerSettings[marker$$1].dataSource[dataIndex];
                this.highlightSettings = this.maps.layers[layerIndex].markerSettings[marker$$1].highlightSettings;
            }
            else {
                var index = parseInt(targetEle.id.split('_NavigationIndex_')[1].split('_')[0], 10);
                layerIndex = parseInt(targetEle.id.split('_LayerIndex_')[1].split('_')[0], 10);
                shapeData = null;
                data = {
                    latitude: this.maps.layers[layerIndex].navigationLineSettings[index].latitude,
                    longitude: this.maps.layers[layerIndex].navigationLineSettings[index].longitude
                };
                this.highlightSettings = this.maps.layers[layerIndex].navigationLineSettings[index].highlightSettings;
            }
            if (this.highlightSettings.enable) {
                this.handleHighlight(targetEle, layerIndex, data, shapeData);
            }
            else {
                var element = document.getElementsByClassName('highlightMapStyle')[0];
                if (!isNullOrUndefined(element)) {
                    removeClass(element);
                    if (element.id.indexOf('NavigationIndex') > -1) {
                        var index = parseInt(element.id.split('_NavigationIndex_')[1].split('_')[0], 10);
                        var layerIndex_1 = parseInt(element.parentElement.id.split('_LayerIndex_')[1].split('_')[0], 10);
                        element.setAttribute('stroke-width', this.maps.layers[layerIndex_1].navigationLineSettings[index].width.toString());
                        element.setAttribute('stroke', this.maps.layers[layerIndex_1].navigationLineSettings[index].color);
                    }
                }
            }
        }
        else if (getElementsByClassName('highlightMapStyle').length > 0) {
            targetEle = getElementsByClassName('highlightMapStyle')[0];
            if (targetEle.id.indexOf('NavigationIndex') > -1) {
                var index = parseInt(targetEle.id.split('_NavigationIndex_')[1].split('_')[0], 10);
                layerIndex = parseInt(targetEle.parentElement.id.split('_LayerIndex_')[1].split('_')[0], 10);
                targetEle.setAttribute('stroke-width', this.maps.layers[layerIndex].navigationLineSettings[index].width.toString());
                targetEle.setAttribute('stroke', this.maps.layers[layerIndex].navigationLineSettings[index].color);
            }
            removeClass(targetEle);
            if (this.maps.legendSettings.visible && this.maps.legendModule) {
                this.maps.legendModule.removeShapeHighlightCollection();
            }
        }
        else if ((targetEle.id.indexOf(this.maps.element.id + '_Legend_Shape_Index') !== -1 ||
            targetEle.id.indexOf(this.maps.element.id + '_Legend_Index') !== -1) && this.maps.legendModule &&
            this.maps.legendSettings.visible && targetEle.id.indexOf('_Text') === -1) {
            this.maps.legendModule.legendHighLightAndSelection(targetEle, 'highlight');
        }
        else {
            if (this.maps.legendSettings.visible && this.maps.legendModule) {
                this.maps.legendModule.removeLegendHighlightCollection();
            }
        }
    };
    /**
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Highlight.prototype.handleHighlight = function (targetElement, layerIndex, data, shapeData) {
        if (this.maps.legendSettings.visible && targetElement.id.indexOf('_MarkerIndex_') === -1 && this.maps.legendModule
            && this.maps.legendSettings.type === 'Layers') {
            this.maps.legendModule.shapeHighLightAndSelection(targetElement, data, this.highlightSettings, 'highlight', layerIndex);
        }
        var selectHighLight = targetElement.id.indexOf('shapeIndex') > -1 && (this.maps.legendSettings.visible && this.maps.legendModule) ?
            this.maps.legendModule.shapeToggled : true;
        if (selectHighLight) {
            this.mapHighlight(targetElement, shapeData, data);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Highlight.prototype.mapHighlight = function (targetEle, shapeData, data) {
        var _this = this;
        var layerIndex = parseInt(targetEle.id.split('_LayerIndex_')[1].split('_')[0], 10);
        var isMarkerSelect = false;
        if (targetEle.id.indexOf('MarkerIndex') > -1) {
            var marker$$1 = parseInt(targetEle.id.split('_MarkerIndex_')[1].split('_')[0], 10);
            isMarkerSelect = this.maps.layers[layerIndex].markerSettings[marker$$1].highlightSettings.enable;
        }
        var borderColor = (targetEle.parentElement.id.indexOf('LineString') === -1) ? this.highlightSettings.border.color : (this.highlightSettings.fill || this.highlightSettings.border.color);
        var borderWidth = (targetEle.parentElement.id.indexOf('LineString') === -1) ? (this.highlightSettings.border.width / (isMarkerSelect ? 1 : this.maps.scale)) : (this.highlightSettings.border.width / this.maps.scale);
        var borderOpacity = isNullOrUndefined(this.highlightSettings.border.opacity) ? this.highlightSettings.opacity :
            this.highlightSettings.border.opacity;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var eventArgs = {
            opacity: this.highlightSettings.opacity,
            fill: (targetEle.parentElement.id.indexOf('LineString') === -1) ? (targetEle.id.indexOf('NavigationIndex') === -1 ? !isNullOrUndefined(this.highlightSettings.fill)
                ? this.highlightSettings.fill : targetEle.getAttribute('fill') : 'none') : 'transparent',
            border: { color: borderColor, width: borderWidth, opacity: borderOpacity },
            cancel: false
        };
        var shapeEventArgs = {
            opacity: eventArgs.opacity,
            fill: eventArgs.fill,
            border: { color: borderColor, width: borderWidth, opacity: borderOpacity },
            name: shapeHighlight,
            target: targetEle.id,
            cancel: false,
            shapeData: shapeData,
            data: data,
            maps: this.maps
        };
        if (targetEle.id.indexOf('shapeIndex') > -1) {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            this.maps.trigger(shapeHighlight, shapeEventArgs, function () { });
        }
        var itemEventArgs = {
            opacity: eventArgs.opacity,
            fill: eventArgs.fill,
            border: { color: borderColor, width: borderWidth, opacity: borderOpacity },
            name: itemHighlight,
            target: targetEle.id,
            cancel: false,
            shapeData: shapeData,
            data: data,
            maps: this.maps
        };
        this.maps.trigger(itemHighlight, itemEventArgs, function () {
            itemEventArgs.cancel = eventArgs.cancel !== itemEventArgs.cancel ? itemEventArgs.cancel : targetEle.id.indexOf('shapeIndex') > -1 ? shapeEventArgs.cancel : eventArgs.cancel;
            itemEventArgs.fill = eventArgs.fill !== itemEventArgs.fill ? itemEventArgs.fill : targetEle.id.indexOf('shapeIndex') > -1 ? shapeEventArgs.fill : eventArgs.fill;
            itemEventArgs.opacity = eventArgs.opacity !== itemEventArgs.opacity ? itemEventArgs.opacity : targetEle.id.indexOf('shapeIndex') > -1 ? shapeEventArgs.opacity : eventArgs.opacity;
            itemEventArgs.border.color = eventArgs.border.color !== itemEventArgs.border.color ? itemEventArgs.border.color : targetEle.id.indexOf('shapeIndex') > -1 ? shapeEventArgs.border.color : eventArgs.border.color;
            itemEventArgs.border.width = eventArgs.border.width !== itemEventArgs.border.width ? itemEventArgs.border.width : targetEle.id.indexOf('shapeIndex') > -1 ? shapeEventArgs.border.width : eventArgs.border.width;
            itemEventArgs.border.opacity = eventArgs.border.opacity !== itemEventArgs.border.opacity ? itemEventArgs.border.opacity : targetEle.id.indexOf('shapeIndex') > -1 ? shapeEventArgs.border.opacity : eventArgs.border.opacity;
            _this.highlightMap(targetEle, itemEventArgs);
        });
    };
    Highlight.prototype.highlightMap = function (targetEle, eventArgs) {
        if (targetEle.getAttribute('class') === 'highlightMapStyle' || eventArgs.cancel) {
            return;
        }
        else {
            if (getElementsByClassName('highlightMapStyle').length > 0) {
                var elem = getElementsByClassName('highlightMapStyle')[0];
                removeClass(elem);
                if (elem.id.indexOf('NavigationIndex') > -1) {
                    var index = parseInt(elem.id.split('_NavigationIndex_')[1].split('_')[0], 10);
                    var layerIndex = parseInt(elem.parentElement.id.split('_LayerIndex_')[1].split('_')[0], 10);
                    elem.setAttribute('stroke-width', this.maps.layers[layerIndex].navigationLineSettings[index].width.toString());
                    elem.setAttribute('stroke', this.maps.layers[layerIndex].navigationLineSettings[index].color);
                }
            }
            if (!getElement('highlightMap')) {
                document.body.appendChild(createStyle('highlightMap', 'highlightMapStyle', eventArgs));
            }
            else {
                customizeStyle('highlightMap', 'highlightMapStyle', eventArgs);
            }
            targetEle.setAttribute('class', 'highlightMapStyle');
        }
    };
    /**
     * Get module name.
     *
     * @returns {string} - Specifies the module name
     */
    Highlight.prototype.getModuleName = function () {
        return 'Highlight';
    };
    /**
     * To destroy the highlight.
     *
     * @returns {void}
     * @private
     */
    Highlight.prototype.destroy = function () {
        this.highlightSettings = null;
        this.removeEventListener();
        this.maps = null;
    };
    return Highlight;
}());

/**
 * Selection module class
 */
var Selection = /** @__PURE__ @class */ (function () {
    function Selection(maps) {
        this.maps = maps;
        this.addEventListener();
    }
    /**
     * For binding events to selection module
     *
     * @returns {void}
     */
    Selection.prototype.addEventListener = function () {
        if (!this.maps.isDestroyed) {
            this.maps.on(click, this.mouseClick, this);
        }
    };
    /**
     * For removing events from selection modue
     *
     * @returns {void}
     */
    Selection.prototype.removeEventListener = function () {
        if (this.maps.isDestroyed) {
            return;
        }
        this.maps.off(click, this.mouseClick);
    };
    Selection.prototype.mouseClick = function (targetElement) {
        if (!isNullOrUndefined(targetElement['type']) && targetElement['type'].indexOf('touch') !== -1 &&
            isNullOrUndefined(targetElement.id)) {
            targetElement = targetElement['target'];
        }
        if (!isNullOrUndefined(targetElement.id) && (targetElement.id.indexOf('LayerIndex') > -1 ||
            targetElement.id.indexOf('NavigationIndex') > -1)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var shapeData = void 0;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var data = void 0;
            var shapeIndex = void 0;
            var dataIndex = void 0;
            var layerIndex = parseInt(targetElement.id.split('_LayerIndex_')[1].split('_')[0], 10);
            if (targetElement.id.indexOf('shapeIndex') > -1) {
                shapeIndex = parseInt(targetElement.id.split('_shapeIndex_')[1].split('_')[0], 10);
                shapeData = !isNullOrUndefined(this.maps.layers[layerIndex].shapeData['features'])
                    && this.maps.layers[layerIndex].shapeData['features']['length'] > shapeIndex ?
                    this.maps.layers[layerIndex].shapeData['features'][shapeIndex]['properties'] :
                    !isNullOrUndefined(this.maps.layers[layerIndex].shapeData['geometries'])
                        && this.maps.layers[layerIndex].shapeData['geometries']['length'] > shapeIndex ?
                        this.maps.layers[layerIndex].shapeData['geometries'][shapeIndex]['properties'] : null;
                dataIndex = parseInt(targetElement.id.split('_dataIndex_')[1].split('_')[0], 10);
                data = isNullOrUndefined(dataIndex) ? null : this.maps.layers[layerIndex].dataSource[dataIndex];
                this.selectionsettings = this.maps.layers[layerIndex].selectionSettings;
                this.selectionType = 'Shape';
            }
            else if (targetElement.id.indexOf('BubbleIndex') > -1) {
                var bubbleIndex = parseInt(targetElement.id.split('_BubbleIndex_')[1].split('_')[0], 10);
                dataIndex = parseInt(targetElement.id.split('_dataIndex_')[1].split('_')[0], 10);
                data = this.maps.layers[layerIndex].bubbleSettings[bubbleIndex].dataSource[dataIndex];
                this.selectionsettings = this.maps.layers[layerIndex].bubbleSettings[bubbleIndex].selectionSettings;
                this.selectionType = 'Bubble';
            }
            else if (targetElement.id.indexOf('MarkerIndex') > -1) {
                var markerIndex = parseInt(targetElement.id.split('_MarkerIndex_')[1].split('_')[0], 10);
                dataIndex = parseInt(targetElement.id.split('_dataIndex_')[1].split('_')[0], 10);
                data = this.maps.layers[layerIndex].markerSettings[markerIndex].dataSource[dataIndex];
                this.selectionsettings = this.maps.layers[layerIndex].markerSettings[markerIndex].selectionSettings;
                this.selectionType = 'Marker';
            }
            else if (targetElement.id.indexOf('NavigationIndex') > -1) {
                var index = parseInt(targetElement.id.split('_NavigationIndex_')[1].split('_')[0], 10);
                shapeData = null;
                data = {
                    latitude: this.maps.layers[layerIndex].navigationLineSettings[index].latitude,
                    longitude: this.maps.layers[layerIndex].navigationLineSettings[index].longitude
                };
                this.selectionsettings = this.maps.layers[layerIndex].navigationLineSettings[index].selectionSettings;
                this.selectionType = 'navigationline';
            }
            if (!isNullOrUndefined(this.selectionsettings) && this.selectionsettings.enable) {
                this.selectElement(targetElement, layerIndex, data, shapeData);
            }
        }
        else if ((this.maps.legendSettings.visible && !this.maps.legendSettings.toggleLegendSettings.enable && this.maps.legendModule) &&
            !isNullOrUndefined(targetElement.id) && targetElement.id.indexOf('_Text') === -1 &&
            (targetElement.id.indexOf(this.maps.element.id + '_Legend_Shape_Index') > -1 ||
                targetElement.id.indexOf(this.maps.element.id + '_Legend_Index') !== -1)) {
            this.maps.legendModule.legendHighLightAndSelection(targetElement, 'selection');
        }
    };
    /**
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Selection.prototype.selectElement = function (targetElement, layerIndex, data, shapeData) {
        this.maps.mapSelect = targetElement ? true : false;
        if (this.maps.legendModule && this.maps.legendSettings.visible && targetElement.id.indexOf('_MarkerIndex_') === -1) {
            this.maps.legendModule.shapeHighLightAndSelection(targetElement, data, this.selectionsettings, 'selection', layerIndex);
        }
        var shapeToggled = (targetElement.id.indexOf('shapeIndex') > -1 && this.maps.legendSettings.visible && this.maps.legendModule) ?
            this.maps.legendModule.shapeToggled : true;
        if (shapeToggled) {
            this.selectMap(targetElement, shapeData, data);
        }
    };
    // eslint-disable-next-line valid-jsdoc
    /**
     * Public method for selection
     * @private
     */
    Selection.prototype.addSelection = function (layerIndex, name, enable) {
        var targetElement = getTargetElement(layerIndex, name, enable, this.maps);
        if (enable) {
            this.selectMap(targetElement, null, null);
        }
        else {
            removeClass(targetElement);
        }
    };
    /**
     * Method for selection
     *
     * @param {Element} targetElement - Specifies the target element
     * @param {any} shapeData - Specifies the shape data
     * @param {any} data - Specifies the data
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Selection.prototype.selectMap = function (targetElement, shapeData, data) {
        var _this = this;
        var layerIndex = parseInt(targetElement.id.split('_LayerIndex_')[1].split('_')[0], 10);
        var isLineStringShape = targetElement.parentElement.id.indexOf('LineString') > -1;
        var selectionsettings = this.selectionsettings;
        var border = {
            color: isLineStringShape ? (this.selectionsettings.fill || this.selectionsettings.border.color) :
                this.selectionsettings.border.color,
            width: isLineStringShape ? (this.selectionsettings.border.width / this.maps.scale) :
                (this.selectionsettings.border.width / (this.selectionType === 'Marker' ? 1 : this.maps.scale)),
            opacity: this.selectionsettings.border.opacity
        };
        var eventArgs = {
            opacity: this.selectionsettings.opacity,
            fill: isLineStringShape ? 'transparent' : (this.selectionType !== 'navigationline' ? this.selectionsettings.fill : 'none'),
            border: border,
            name: itemSelection,
            target: targetElement.id,
            cancel: false,
            shapeData: shapeData,
            data: data,
            maps: this.maps
        };
        this.maps.trigger('itemSelection', eventArgs, function (observedArgs) {
            eventArgs.border.opacity = isNullOrUndefined(_this.selectionsettings.border.opacity) ?
                _this.selectionsettings.opacity : _this.selectionsettings.border.opacity;
            if (!eventArgs.cancel) {
                if (targetElement.getAttribute('class') === _this.selectionType + 'selectionMapStyle'
                    || targetElement.getAttribute('class') === 'LineselectionMapStyle') {
                    removeClass(targetElement);
                    _this.removedSelectionList(targetElement);
                    for (var m = 0; m < _this.maps.shapeSelectionItem.length; m++) {
                        if (_this.maps.shapeSelectionItem[m] === eventArgs.shapeData) {
                            _this.maps.shapeSelectionItem.splice(m, 1);
                            break;
                        }
                    }
                    if (targetElement.id.indexOf('NavigationIndex') > -1) {
                        var index = parseInt(targetElement.id.split('_NavigationIndex_')[1].split('_')[0], 10);
                        var layerIndex_1 = parseInt(targetElement.parentElement.id.split('_LayerIndex_')[1].split('_')[0], 10);
                        targetElement.setAttribute('stroke-width', _this.maps.layers[layerIndex_1].navigationLineSettings[index].width.toString());
                        targetElement.setAttribute('stroke', _this.maps.layers[layerIndex_1].navigationLineSettings[index].color);
                    }
                }
                else {
                    var layetElement = getElementByID(_this.maps.element.id + '_Layer_Collections');
                    if (!_this.selectionsettings.enableMultiSelect &&
                        (layetElement.getElementsByClassName(_this.selectionType + 'selectionMapStyle').length > 0 ||
                            layetElement.getElementsByClassName('LineselectionMapStyle').length > 0)) {
                        var eleCount = layetElement.getElementsByClassName(_this.selectionType + 'selectionMapStyle').length;
                        var ele = void 0;
                        for (var k = 0; k < eleCount; k++) {
                            ele = layetElement.getElementsByClassName(_this.selectionType + 'selectionMapStyle')[0];
                            removeClass(ele);
                            _this.removedSelectionList(ele);
                        }
                        if (layetElement.getElementsByClassName('LineselectionMapStyle').length > 0) {
                            eleCount = layetElement.getElementsByClassName('LineselectionMapStyle').length;
                            for (var k = 0; k < eleCount; k++) {
                                ele = layetElement.getElementsByClassName('LineselectionMapStyle')[0];
                                removeClass(ele);
                                _this.removedSelectionList(ele);
                            }
                        }
                        if (_this.selectionType === 'Shape') {
                            _this.maps.shapeSelectionItem = [];
                            var selectionLength = _this.maps.selectedElementId.length;
                            for (var i = 0; i < selectionLength; i++) {
                                ele = layetElement.getElementsByClassName(_this.selectionType + 'selectionMapStyle')[0];
                                removeClass(ele);
                                var selectedElementIdIndex = _this.maps.selectedElementId.indexOf(ele.getAttribute('id'));
                                _this.maps.selectedElementId.splice(selectedElementIdIndex, 1);
                            }
                        }
                        if (ele.id.indexOf('NavigationIndex') > -1) {
                            var index = parseInt(targetElement.id.split('_NavigationIndex_')[1].split('_')[0], 10);
                            var layerIndex_2 = parseInt(targetElement.parentElement.id.split('_LayerIndex_')[1].split('_')[0], 10);
                            ele.setAttribute('stroke-width', _this.maps.layers[layerIndex_2].navigationLineSettings[index].width.toString());
                            ele.setAttribute('stroke', _this.maps.layers[layerIndex_2].navigationLineSettings[index].color);
                        }
                    }
                    if (!isLineStringShape) {
                        if (!getElement(_this.selectionType + 'selectionMap')) {
                            document.body.appendChild(createStyle(_this.selectionType + 'selectionMap', _this.selectionType + 'selectionMapStyle', eventArgs));
                        }
                        else {
                            customizeStyle(_this.selectionType + 'selectionMap', _this.selectionType + 'selectionMapStyle', eventArgs);
                        }
                        targetElement.setAttribute('class', _this.selectionType + 'selectionMapStyle');
                    }
                    else {
                        if (!getElement('LineselectionMap')) {
                            document.body.appendChild(createStyle('LineselectionMap', 'LineselectionMapStyle', eventArgs));
                        }
                        else {
                            customizeStyle('LineselectionMap', 'LineselectionMapStyle', eventArgs);
                        }
                        targetElement.setAttribute('class', 'LineselectionMapStyle');
                    }
                    if (targetElement.getAttribute('class') === 'ShapeselectionMapStyle') {
                        _this.maps.shapeSelectionClass = getElement(_this.selectionType + 'selectionMap');
                        _this.maps.selectedElementId.push(targetElement.getAttribute('id'));
                        _this.maps.shapeSelectionItem.push(eventArgs.shapeData);
                    }
                    if (targetElement.getAttribute('class') === 'MarkerselectionMapStyle') {
                        _this.maps.markerSelectionClass = getElement(_this.selectionType + 'selectionMap');
                        _this.maps.selectedMarkerElementId.push(targetElement.getAttribute('id'));
                    }
                    if (targetElement.getAttribute('class') === 'BubbleselectionMapStyle') {
                        _this.maps.bubbleSelectionClass = getElement(_this.selectionType + 'selectionMap');
                        _this.maps.selectedBubbleElementId.push(targetElement.getAttribute('id'));
                    }
                    if (targetElement.getAttribute('class') === 'navigationlineselectionMapStyle') {
                        _this.maps.navigationSelectionClass = getElement(_this.selectionType + 'selectionMap');
                        _this.maps.selectedNavigationElementId.push(targetElement.getAttribute('id'));
                    }
                }
            }
        });
    };
    /**
     * Remove legend selection
     */
    // private removeLegendSelection(legendCollection: Object[], targetElement: Element): void {
    //     let shape: Element;
    //     if (!this.selectionsettings.enableMultiSelect) {
    //        for (let i: number = 0; i < legendCollection.length; i++) {
    //             for (let data of legendCollection[i]['data']) {
    //                 shape = getElement(this.maps.element.id + '_LayerIndex_' + data['layerIndex'] +
    //                            '_shapeIndex_' + data['shapeIndex'] + '_dataIndex_' + data['dataIndex']);
    //                 removeClass(shape);
    //             }
    //         }
    //     }
    // }
    /**
     * Get module name.
     *
     * @param {Element} targetElement - Specifies the target element
     * @returns {void}
     * @private
     */
    Selection.prototype.removedSelectionList = function (targetElement) {
        if (this.selectionType === 'Shape') {
            this.maps.selectedElementId.splice(this.maps.selectedElementId.indexOf(targetElement.getAttribute('id')), 1);
        }
        if (this.selectionType === 'Bubble') {
            this.maps.selectedBubbleElementId.splice(this.maps.selectedBubbleElementId.indexOf(targetElement.getAttribute('id')), 1);
        }
        if (this.selectionType === 'Marker') {
            this.maps.selectedMarkerElementId.splice(this.maps.selectedMarkerElementId.indexOf(targetElement.getAttribute('id')), 1);
        }
        if (this.selectionType === 'navigationline') {
            this.maps.selectedBubbleElementId.splice(this.maps.selectedBubbleElementId.indexOf(targetElement.getAttribute('id')), 1);
        }
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name
     */
    Selection.prototype.getModuleName = function () {
        return 'Selection';
    };
    /**
     * To destroy the selection.
     *
     * @returns {void}
     * @private
     */
    Selection.prototype.destroy = function () {
        this.selectionsettings = null;
        this.removeEventListener();
        this.maps = null;
    };
    return Selection;
}());

/**
 * Map Tooltip
 */
var MapsTooltip = /** @__PURE__ @class */ (function () {
    function MapsTooltip(maps) {
        this.maps = maps;
        this.tooltipId = this.maps.element.id + '_mapsTooltip';
        this.addEventListener();
    }
    /**
     * @private
     */
    MapsTooltip.prototype.renderTooltip = function (e) {
        var _this = this;
        var pageX;
        var pageY;
        var target;
        var touchArg;
        var tooltipArgs;
        var tooltipTemplateElement;
        if (e.type.indexOf('touch') !== -1) {
            this.isTouch = true;
            touchArg = e;
            pageX = touchArg.changedTouches[0].pageX;
            pageY = touchArg.changedTouches[0].pageY;
            target = touchArg.target;
        }
        else {
            this.isTouch = e.pointerType === 'touch';
            pageX = e.pageX;
            pageY = e.pageY;
            target = e.target;
        }
        if (this.maps.isDevice) {
            clearTimeout(this.clearTimeout);
            this.clearTimeout = setTimeout(this.removeTooltip.bind(this), 2000);
        }
        var option;
        var currentData = '';
        var targetId = target.id;
        var tooltipEle;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var templateData = [];
        var keyString;
        var index = targetId.indexOf('_LayerIndex_') > -1 && parseFloat(targetId.split('_LayerIndex_')[1].split('_')[0]);
        var layer = this.maps.layersCollection[index];
        var tooltipContent = [];
        var markerFill;
        var location = getMousePosition(pageX, pageY, this.maps.svgObject);
        this.tooltipTargetID = targetId;
        var istooltipRender = (targetId.indexOf('_shapeIndex_') > -1)
            || (targetId.indexOf('_MarkerIndex_') > -1) || (targetId.indexOf('_BubbleIndex_') > -1);
        if (istooltipRender && this.maps.markerDragArgument === null) {
            if (targetId.indexOf('_shapeIndex_') > -1) {
                option = layer.tooltipSettings;
                var shape = parseInt(targetId.split('_shapeIndex_')[1].split('_')[0], 10);
                if (isNullOrUndefined(layer.layerData) || isNullOrUndefined(layer.layerData[shape])) {
                    return;
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var value = layer.layerData[shape]['property'];
                var isShape = false;
                var properties = (Object.prototype.toString.call(layer.shapePropertyPath) === '[object Array]' ?
                    layer.shapePropertyPath : [layer.shapePropertyPath]);
                if (!isNullOrUndefined(properties)) {
                    for (var k = 0; k < properties.length; k++) {
                        for (var i = 0; i < layer['dataSource']['length']; i++) {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            var data = layer.dataSource[i];
                            var dataPath = (layer.shapeDataPath.indexOf('.') > -1) ?
                                (getValueFromObject(data, layer.shapeDataPath)) : data[layer.shapeDataPath];
                            var dataPathValue = !isNullOrUndefined(dataPath) && isNaN(data[layer.shapeDataPath])
                                ? dataPath.toLowerCase() : dataPath;
                            var propertyValue = !isNullOrUndefined(value[properties[k]])
                                && isNaN(value[properties[k]]) ? value[properties[k]].toLowerCase() :
                                value[properties[k]];
                            if (dataPathValue === propertyValue) {
                                isShape = true;
                                index = i;
                                k = properties.length;
                                break;
                            }
                        }
                    }
                    index = isShape ? index : null;
                    if (!isNullOrUndefined(layer.dataSource[index])) {
                        templateData = JSON.parse(JSON.stringify(layer.dataSource[index]));
                        for (keyString in value) {
                            // eslint-disable-next-line no-prototype-builtins
                            if (!templateData.hasOwnProperty(keyString)) {
                                templateData[keyString] = value[keyString];
                            }
                        }
                    }
                }
                if (option.visible && ((!isNullOrUndefined(index) && !isNaN(index)) || (!isNullOrUndefined(value)))) {
                    if (layer.tooltipSettings.format) {
                        currentData = this.formatter(layer.tooltipSettings.format, templateData);
                    }
                    else {
                        var shapePath = checkPropertyPath(layer.shapeDataPath, layer.shapePropertyPath, value);
                        currentData = (!isNullOrUndefined(layer.dataSource) && !isNullOrUndefined(index)) ?
                            formatValue(((option.valuePath.indexOf('.') > -1) ?
                                (getValueFromObject(layer.dataSource[index], option.valuePath)) :
                                layer.dataSource[index][option.valuePath]), this.maps) : value[shapePath];
                        if (isNullOrUndefined(currentData)) {
                            currentData = (option.valuePath.indexOf('.') > -1) ?
                                (getValueFromObject(value, option.valuePath)) : value[option.valuePath];
                        }
                    }
                }
                //location.y = this.template(option, location);
            }
            else if (targetId.indexOf('_MarkerIndex_') > -1) {
                var markerIdex = parseInt(targetId.split('_MarkerIndex_')[1].split('_')[0], 10);
                var dataIndex = parseInt(targetId.split('_MarkerIndex_')[1].split('_')[2], 10);
                var marker$$1 = layer.markerSettings[markerIdex];
                option = marker$$1.tooltipSettings;
                templateData = marker$$1.dataSource[dataIndex];
                if (option.visible && !isNaN(markerIdex)) {
                    if (marker$$1.tooltipSettings.format) {
                        currentData = this.formatter(marker$$1.tooltipSettings.format, marker$$1.dataSource[dataIndex]);
                    }
                    else {
                        if (typeof marker$$1.template !== 'function' && marker$$1.template && !marker$$1.tooltipSettings.valuePath) {
                            currentData = marker$$1.template.split('>')[1].split('<')[0];
                        }
                        else {
                            currentData =
                                formatValue(((marker$$1.tooltipSettings.valuePath.indexOf('.') > -1) ?
                                    (getValueFromObject(marker$$1.dataSource[dataIndex], marker$$1.tooltipSettings.valuePath)) :
                                    marker$$1.dataSource[dataIndex][marker$$1.tooltipSettings.valuePath]), this.maps);
                        }
                    }
                }
                //location.y = this.template(option, location);
            }
            else if (targetId.indexOf('_BubbleIndex_') > -1) {
                var bubbleIndex = parseInt(targetId.split('_BubbleIndex_')[1].split('_')[0], 10);
                var dataIndex = parseInt(targetId.split('_BubbleIndex_')[1].split('_')[2], 10);
                var bubble = layer.bubbleSettings[bubbleIndex];
                option = bubble.tooltipSettings;
                templateData = bubble.dataSource[dataIndex];
                if (option.visible && !isNaN(dataIndex)) {
                    if (bubble.tooltipSettings.format) {
                        currentData = this.formatter(bubble.tooltipSettings.format, bubble.dataSource[dataIndex]);
                    }
                    else {
                        currentData =
                            formatValue(((bubble.tooltipSettings.valuePath.indexOf('.') > -1) ?
                                (getValueFromObject(bubble.dataSource[dataIndex], bubble.tooltipSettings.valuePath)) :
                                bubble.dataSource[dataIndex][bubble.tooltipSettings.valuePath]), this.maps);
                    }
                }
                //location.y = this.template(option, location);
            }
            if (document.getElementById(this.tooltipId)) {
                tooltipEle = document.getElementById(this.tooltipId);
            }
            else {
                tooltipEle = createElement('div', {
                    id: this.maps.element.id + '_mapsTooltip',
                    className: 'EJ2-maps-Tooltip'
                });
                tooltipEle.style.cssText = 'position: absolute;pointer-events:none;';
                document.getElementById(this.maps.element.id + '_Secondary_Element').appendChild(tooltipEle);
            }
            if (typeof option.template !== 'function' && option.template !== null && Object.keys(typeof option.template === 'object' ? option.template : {}).length === 1) {
                option.template = option.template[Object.keys(option.template)[0]];
            }
            templateData = this.setTooltipContent(option, templateData);
            var tooltipTextStyle = {
                color: option.textStyle.color, fontFamily: option.textStyle.fontFamily, fontStyle: option.textStyle.fontStyle,
                fontWeight: option.textStyle.fontWeight, opacity: option.textStyle.opacity, size: option.textStyle.size
            };
            var tooltipOption = {
                location: location, text: tooltipContent, data: templateData,
                textStyle: tooltipTextStyle,
                template: option.template
            };
            tooltipArgs = {
                cancel: false, name: tooltipRender,
                options: tooltipOption,
                fill: option.fill,
                maps: this.maps,
                element: target, eventArgs: e, content: !isNullOrUndefined(currentData) ? currentData.toString() : ''
            };
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            this.maps.trigger(tooltipRender, tooltipArgs, function (args) {
                if (!tooltipArgs.cancel && option.visible && !isNullOrUndefined(currentData) &&
                    (targetId.indexOf('_cluster_') === -1 && targetId.indexOf('_dataLabel_') === -1)) {
                    _this.maps['isProtectedOnChange'] = true;
                    tooltipArgs.options['textStyle']['size'] = tooltipArgs.options['textStyle']['size']
                        || _this.maps.themeStyle.fontSize;
                    tooltipArgs.options['textStyle']['color'] = tooltipArgs.options['textStyle']['color']
                        || _this.maps.themeStyle.tooltipFontColor;
                    tooltipArgs.options['textStyle']['fontFamily'] = tooltipArgs.options['textStyle']['fontFamily']
                        || _this.maps.themeStyle.fontFamily;
                    tooltipArgs.options['textStyle']['fontWeight'] = tooltipArgs.options['textStyle']['fontWeight']
                        || _this.maps.themeStyle.fontWeight;
                    tooltipArgs.options['textStyle']['opacity'] = tooltipArgs.options['textStyle']['opacity']
                        || _this.maps.themeStyle.tooltipTextOpacity;
                    if (tooltipArgs.cancel) {
                        _this.svgTooltip = new Tooltip({
                            enable: true,
                            header: '',
                            data: option['data'],
                            template: option['template'],
                            content: tooltipArgs.content.toString() !== currentData.toString() ? [SanitizeHtmlHelper.sanitize(tooltipArgs.content.toString())] :
                                [SanitizeHtmlHelper.sanitize(currentData.toString())],
                            shapes: [],
                            location: option['location'],
                            palette: [markerFill],
                            areaBounds: _this.maps.mapAreaRect,
                            textStyle: option['textStyle'],
                            availableSize: _this.maps.availableSize,
                            fill: option.fill || _this.maps.themeStyle.tooltipFillColor
                        });
                    }
                    else {
                        _this.svgTooltip = new Tooltip({
                            enable: true,
                            header: '',
                            data: tooltipArgs.options['data'],
                            template: tooltipArgs.options['template'],
                            content: tooltipArgs.content.toString() !== currentData.toString() ? [SanitizeHtmlHelper.sanitize(tooltipArgs.content.toString())] :
                                [SanitizeHtmlHelper.sanitize(currentData.toString())],
                            shapes: [],
                            location: tooltipArgs.options['location'],
                            palette: [markerFill],
                            areaBounds: _this.maps.mapAreaRect,
                            textStyle: tooltipArgs.options['textStyle'],
                            availableSize: _this.maps.availableSize,
                            fill: tooltipArgs.fill || _this.maps.themeStyle.tooltipFillColor
                        });
                    }
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    if (_this.maps.isVue || _this.maps.isVue3) {
                        _this.svgTooltip.controlInstance = _this.maps;
                    }
                    _this.svgTooltip.opacity = _this.maps.themeStyle.tooltipFillOpacity || _this.svgTooltip.opacity;
                    _this.svgTooltip.appendTo(tooltipEle);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    _this.maps.renderReactTemplates();
                    tooltipTemplateElement = document.getElementById(_this.maps.element.id + '_mapsTooltip');
                    if (tooltipTemplateElement !== null && tooltipTemplateElement.innerHTML.indexOf('href') !== -1
                        && tooltipTemplateElement.innerHTML.indexOf('</a>') !== -1) {
                        var templateStyle = tooltipTemplateElement.getAttribute('style');
                        templateStyle = templateStyle.replace('pointer-events: none;', 'position-events:all;');
                        tooltipTemplateElement.style.cssText = templateStyle;
                    }
                }
                else {
                    _this.clearTooltip(e.target);
                }
            });
            if (this.svgTooltip) {
                this.maps.trigger('tooltipRenderComplete', {
                    cancel: false, name: 'tooltipRenderComplete', maps: this.maps, options: tooltipOption,
                    element: this.svgTooltip.element
                });
            }
            if (this.svgTooltip) {
                this.maps.trigger('tooltipRenderComplete', {
                    cancel: false, name: 'tooltipRenderComplete', maps: this.maps, options: tooltipOption, element: this.svgTooltip.element
                });
            }
            else {
                this.clearTooltip(e.target);
            }
        }
        else {
            tooltipTemplateElement = document.getElementById(this.maps.element.id + '_mapsTooltip');
            if (tooltipTemplateElement !== null && tooltipTemplateElement.innerHTML.indexOf('href') !== -1
                && tooltipTemplateElement.innerHTML.indexOf('</a>') !== -1) {
                this.maps.notify(click, this);
            }
            else {
                this.clearTooltip(e.target);
            }
        }
    };
    /**
     * To get content for the current toolitp
     *
     * @param {TooltipSettingsModel} options - Specifies the options for rendering tooltip
     * @param {any} templateData - Specifies the template data
     * @returns {any} - Returns the local data
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MapsTooltip.prototype.setTooltipContent = function (options, templateData) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var localData = extend({}, templateData, null, true);
        if (this.maps.format && !isNaN(Number(localData[options.valuePath]))) {
            localData[options.valuePath] = Internalize(this.maps, Number(localData[options.valuePath]));
        }
        else {
            localData = Object.keys(localData).length ? localData : undefined;
        }
        return localData;
    };
    /*private template(tooltip: TooltipSettingsModel, location: MapLocation): number {
        location.y = (tooltip.template) ? location.y + 10 : location.y;
        return location.y;
    }*/
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MapsTooltip.prototype.formatter = function (format, data) {
        if (data === void 0) { data = {}; }
        var keys = Object.keys(data);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            format = (typeof data[key] === 'object') ? convertStringToValue('', format, data, this.maps) :
                format.split('${' + key + '}').join(formatValue(data[key], this.maps));
        }
        return format;
    };
    /**
     * @private
     */
    MapsTooltip.prototype.mouseUpHandler = function (e) {
        this.renderTooltip(e);
        if (this.maps.tooltipDisplayMode === 'MouseMove') {
            clearTimeout(this.clearTimeout);
            this.clearTimeout = setTimeout(this.removeTooltip.bind(this), 2000);
        }
    };
    /**
     * @private
     */
    MapsTooltip.prototype.removeTooltip = function () {
        var isTooltipRemoved = false;
        if (document.getElementsByClassName('EJ2-maps-Tooltip').length > 0) {
            remove(document.getElementsByClassName('EJ2-maps-Tooltip')[0]);
            isTooltipRemoved = true;
        }
        return isTooltipRemoved;
    };
    MapsTooltip.prototype.clearTooltip = function (element) {
        var tooltipElement = element.closest('#' + this.maps.element.id + '_mapsTooltipparent_template');
        if (isNullOrUndefined(tooltipElement)) {
            var isTooltipRemoved = this.removeTooltip();
            if (isTooltipRemoved) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this.maps.clearTemplate();
            }
        }
    };
    // eslint-disable-next-line valid-jsdoc
    /**
     * To bind events for tooltip module
     * @private
     */
    MapsTooltip.prototype.addEventListener = function () {
        if (this.maps.isDestroyed) {
            return;
        }
        if (this.maps.tooltipDisplayMode === 'DoubleClick') {
            this.maps.on('dblclick', this.renderTooltip, this);
        }
        else if (this.maps.tooltipDisplayMode === 'Click') {
            this.maps.on(Browser.touchEndEvent, this.mouseUpHandler, this);
        }
        else {
            this.maps.on(Browser.touchMoveEvent, this.renderTooltip, this);
        }
        this.maps.on(Browser.touchCancelEvent, this.removeTooltip, this);
        this.maps.element.addEventListener('contextmenu', this.removeTooltip);
    };
    /**
     * @private
     */
    MapsTooltip.prototype.removeEventListener = function () {
        if (this.maps) {
            if (this.maps.isDestroyed) {
                return;
            }
            if (this.maps.tooltipDisplayMode === 'DoubleClick') {
                this.maps.off('dblclick', this.removeTooltip);
            }
            else if (this.maps.tooltipDisplayMode === 'Click') {
                this.maps.off(Browser.touchEndEvent, this.mouseUpHandler);
            }
            else {
                this.maps.off(Browser.touchMoveEvent, this.renderTooltip);
            }
            this.maps.off(Browser.touchCancelEvent, this.removeTooltip);
            this.maps.element.removeEventListener('contextmenu', this.removeTooltip);
        }
    };
    /**
     * Get module name.
     *
     * @returns {string} Returns the module name
     */
    MapsTooltip.prototype.getModuleName = function () {
        return 'MapsTooltip';
    };
    /**
     * To destroy the tooltip.
     *
     * @returns {void}
     * @private
     */
    MapsTooltip.prototype.destroy = function () {
        if (!isNullOrUndefined(this.svgTooltip)) {
            this.svgTooltip.destroy();
        }
        this.svgTooltip = null;
        //TODO: Calling the below code throws spec issue.
        //this.maps = null;
    };
    return MapsTooltip;
}());

/**
 * Zoom module used to process the zoom for maps
 */
var Zoom = /** @__PURE__ @class */ (function () {
    function Zoom(maps) {
        /** @private */
        this.isPanning = false;
        /** @private */
        this.mouseEnter = false;
        /** @private */
        this.isTouch = false;
        /** @private */
        this.rectZoomingStart = false;
        /** @private */
        this.browserName = Browser.info.name;
        // eslint-disable-next-line @typescript-eslint/ban-types
        /** @private */
        this.isPointer = Browser.isPointer;
        this.handled = false;
        this.isPan = false;
        this.isZoomFinal = false;
        this.isZoomSelection = false;
        this.pinchFactor = 1;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.startTouches = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        /** @private */
        this.intersect = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        /** @private */
        this.mouseDownLatLong = { x: 0, y: 0 };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        /** @private */
        this.mouseMoveLatLong = { x: 0, y: 0 };
        /** @private */
        this.isSingleClick = false;
        this.maps = maps;
        this.wheelEvent = this.browserName === 'mozilla' ? (this.isPointer ? 'mousewheel' : 'DOMMouseScroll') : 'mousewheel';
        this.cancelEvent = this.isPointer ? 'pointerleave' : 'mouseleave';
        this.selectionColor = this.maps.zoomSettings.toolbarSettings.buttonSettings.selectionColor == null ?
            this.maps.zoomSettings.selectionColor : this.maps.zoomSettings.toolbarSettings.buttonSettings.selectionColor;
        this.fillColor = this.maps.zoomSettings.toolbarSettings.buttonSettings.color == null ? this.maps.zoomSettings.color :
            this.maps.zoomSettings.toolbarSettings.buttonSettings.color;
        this.addEventListener();
    }
    /**
     * To perform zooming for maps
     *
     * @param {Point} position - Specifies the position.
     * @param {number} newZoomFactor - Specifies the zoom factor.
     * @param {string} type - Specifies the type.
     * @returns {void}
     * @private
     */
    Zoom.prototype.performZooming = function (position, newZoomFactor, type) {
        var _this = this;
        var map = this.maps;
        map.previousProjection = map.projectionType;
        map.defaultState = false;
        map.initialCheck = false;
        map.markerZoomedState = false;
        map.zoomPersistence = map.enablePersistence;
        var prevLevel = map.tileZoomLevel;
        var scale = map.previousScale = map.scale;
        var maxZoom = map.zoomSettings.maxZoom;
        var minZoom = map.zoomSettings.minZoom;
        newZoomFactor = maxZoom >= newZoomFactor ? newZoomFactor : maxZoom;
        var isToolbarPerform = true;
        switch (type.toLowerCase()) {
            case 'zoomin':
                isToolbarPerform = newZoomFactor <= this.maps.zoomSettings.maxZoom;
                break;
            case 'zoomout':
                isToolbarPerform = newZoomFactor >= this.maps.zoomSettings.minZoom;
                break;
        }
        if (isToolbarPerform) {
            var prevTilePoint = map.tileTranslatePoint;
            if ((!map.isTileMap) && ((type === 'ZoomIn' ? newZoomFactor >= minZoom && newZoomFactor <= maxZoom : newZoomFactor >= minZoom)
                || map.isReset)) {
                var availSize = map.mapAreaRect;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var minBounds = map.baseMapRectBounds['min'];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var maxBounds = map.baseMapRectBounds['max'];
                var mapTotalWidth = Math.abs(minBounds['x'] - maxBounds['x']);
                var mapTotalHeight = Math.abs(minBounds['y'] - maxBounds['y']);
                var translatePointX = void 0;
                var translatePointY = void 0;
                if (newZoomFactor < 1.2 && map.projectionType !== 'Eckert5') {
                    if (mapTotalWidth === 0 || mapTotalHeight === 0 || mapTotalWidth === mapTotalHeight) {
                        mapTotalWidth = availSize.width / 2;
                        mapTotalHeight = availSize.height;
                    }
                    newZoomFactor = parseFloat(Math.min(availSize.width / mapTotalWidth, availSize.height / mapTotalHeight).toFixed(2));
                    newZoomFactor = newZoomFactor > 1.05 ? 1 : newZoomFactor;
                    map.translatePoint = this.calculateInitalZoomTranslatePoint(newZoomFactor, mapTotalWidth, mapTotalHeight, availSize, minBounds, map);
                }
                else {
                    var point = map.translatePoint;
                    translatePointX = point.x - (((availSize.width / scale) - (availSize.width / newZoomFactor)) / (availSize.width / position.x));
                    translatePointY = point.y - (((availSize.height / scale) - (availSize.height / newZoomFactor)) / (availSize.height / position.y));
                    var currentHeight = Math.abs(map.baseMapRectBounds['max']['y'] - map.baseMapRectBounds['min']['y']) * newZoomFactor;
                    translatePointX = (currentHeight < map.mapAreaRect.height) ? (availSize.x + ((-(minBounds['x'])) + ((availSize.width / 2) - (mapTotalWidth / 2)))) : translatePointX;
                    translatePointY = (currentHeight < map.mapAreaRect.height) ? (availSize.y + ((-(minBounds['y'])) + ((availSize.height / 2) - (mapTotalHeight / 2)))) : translatePointY;
                    map.translatePoint = new Point(translatePointX, translatePointY);
                }
                map.scale = newZoomFactor;
                if (this.triggerZoomEvent(prevTilePoint, prevLevel, type)) {
                    map.translatePoint = map.previousPoint;
                    map.scale = map.mapScaleValue = map.previousScale;
                }
                else {
                    this.applyTransform(map);
                }
            }
            else if ((map.isTileMap) && (newZoomFactor >= minZoom && newZoomFactor <= maxZoom)) {
                this.getTileTranslatePosition(prevLevel, newZoomFactor, position, type);
                map.tileZoomLevel = newZoomFactor;
                map.zoomSettings.zoomFactor = newZoomFactor;
                map.scale = Math.pow(2, newZoomFactor - 1);
                if (type === 'ZoomOut' && map.zoomSettings.resetToInitial && map.applyZoomReset && newZoomFactor <= map.initialZoomLevel) {
                    map.initialCheck = true;
                    map.zoomPersistence = false;
                    map.tileTranslatePoint.x = map.initialTileTranslate.x;
                    map.tileTranslatePoint.y = map.initialTileTranslate.y;
                    newZoomFactor = map.tileZoomLevel = map.mapScaleValue = map.initialZoomLevel;
                    map.scale = Math.pow(2, newZoomFactor - 1);
                }
                map.translatePoint.y = (map.tileTranslatePoint.y - (0.01 * map.mapScaleValue)) / map.scale;
                map.translatePoint.x = (map.tileTranslatePoint.x - (0.01 * map.mapScaleValue)) / map.scale;
                if (this.triggerZoomEvent(prevTilePoint, prevLevel, type)) {
                    map.translatePoint = map.tileTranslatePoint = new Point(0, 0);
                    map.scale = map.previousScale;
                    map.tileZoomLevel = prevLevel;
                    map.zoomSettings.zoomFactor = map.previousScale;
                }
                else {
                    if (document.querySelector('.GroupElement')) {
                        document.querySelector('.GroupElement').style.display = 'none';
                    }
                    if (document.getElementById(this.maps.element.id + '_LayerIndex_1')) {
                        document.getElementById(this.maps.element.id + '_LayerIndex_1').style.display = 'none';
                    }
                    this.markerLineAnimation(map);
                    map.mapLayerPanel.generateTiles(newZoomFactor, map.tileTranslatePoint, type + 'wheel', null, position);
                    var element1 = document.getElementById(this.maps.element.id + '_tiles');
                    var animationDuration = this.maps.layersCollection[0].animationDuration;
                    setTimeout(function () {
                        // if (type === 'ZoomOut') {
                        //     element1.removeChild(element1.children[element1.childElementCount - 1]);
                        //     if (element1.childElementCount) {
                        //         element1.removeChild(element1.children[element1.childElementCount - 1]);
                        //     } else {
                        //         element1 = element1;
                        //     }
                        // }
                        _this.applyTransform(_this.maps);
                        if (document.getElementById(_this.maps.element.id + '_LayerIndex_1')) {
                            document.getElementById(_this.maps.element.id + '_LayerIndex_1').style.display = 'block';
                        }
                    }, animationDuration);
                }
            }
        }
        this.maps.zoomNotApplied = false;
        if (this.maps.isDevice) {
            this.removeToolbarOpacity(map.isTileMap ? Math.round(map.tileZoomLevel) : map.scale, map.element.id + '_Zooming_');
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Zoom.prototype.calculateInitalZoomTranslatePoint = function (newZoomFactor, mapTotalWidth, mapTotalHeight, availSize, minBounds, map) {
        mapTotalWidth *= newZoomFactor;
        mapTotalHeight *= newZoomFactor;
        var widthDiff = minBounds['x'] !== 0 && map.translateType === 'layers' ? map.availableSize.width - availSize.width : 0;
        var translatePointX = availSize.x + ((-(minBounds['x'])) + ((availSize.width / 2) - (mapTotalWidth / 2))) - widthDiff;
        var translatePointY = availSize.y + ((-(minBounds['y'])) + ((availSize.height / 2) - (mapTotalHeight / 2)));
        return new Point(translatePointX, translatePointY);
    };
    Zoom.prototype.triggerZoomEvent = function (prevTilePoint, prevLevel, type) {
        var map = this.maps;
        var zoomArgs;
        if (!map.isTileMap) {
            zoomArgs = {
                cancel: false, name: 'zoom', type: type, maps: map,
                tileTranslatePoint: {}, translatePoint: { previous: map.previousPoint, current: map.translatePoint },
                tileZoomLevel: {}, scale: { previous: map.previousScale, current: map.scale }
            };
        }
        else {
            zoomArgs = {
                cancel: false, name: 'zoom', type: type, maps: map,
                tileTranslatePoint: { previous: prevTilePoint, current: map.tileTranslatePoint }, translatePoint: { previous: map.previousPoint, current: map.translatePoint },
                tileZoomLevel: { previous: prevLevel, current: map.tileZoomLevel }, scale: { previous: map.previousScale, current: map.scale }
            };
        }
        map.trigger('zoom', zoomArgs);
        return zoomArgs.cancel;
    };
    Zoom.prototype.getTileTranslatePosition = function (prevLevel, currentLevel, position, type) {
        var map = this.maps;
        var tileDefaultSize = 256;
        var padding = type === 'ZoomOut' ? 10 : (type === 'Reset' && currentLevel > 1) ? 0 : 10;
        var bounds = map.availableSize;
        var prevSize = Math.pow(2, prevLevel) * 256;
        var totalSize = Math.pow(2, currentLevel) * 256;
        var x = ((position.x - map.tileTranslatePoint.x) / prevSize) * 100;
        var y = ((position.y - map.tileTranslatePoint.y) / prevSize) * 100;
        map.tileTranslatePoint.x = (currentLevel === 1) ? (bounds.width / 2) - ((tileDefaultSize * 2) / 2) :
            position.x - ((x * totalSize) / 100);
        map.tileTranslatePoint.y = (currentLevel === 1) ? ((bounds.height / 2) - ((tileDefaultSize * 2) / 2) + (padding * 2)) :
            position.y - ((y * totalSize) / 100);
    };
    /**
     * @private
     */
    Zoom.prototype.performRectZooming = function () {
        this.isDragZoom = true;
        var map = this.maps;
        var size = map.availableSize;
        map.previousProjection = map.projectionType;
        var prevLevel = map.tileZoomLevel;
        var prevTilePoint = map.tileTranslatePoint;
        var zoomRect = this.zoomingRect;
        var maxZoom = map.zoomSettings.maxZoom;
        var minZoom = map.zoomSettings.minZoom;
        var isZoomCancelled;
        if (zoomRect.height > 0 && zoomRect.width > 0) {
            var x = this.zoomingRect.x + (this.zoomingRect.width / 2);
            var y = this.zoomingRect.y + (this.zoomingRect.height / 2);
            var zoomCalculationFactor = void 0;
            if (!map.isTileMap) {
                var scale = map.previousScale = map.scale;
                zoomCalculationFactor = scale + Math.round((((size.width / zoomRect.width) + (size.height / zoomRect.height)) / 2));
                zoomCalculationFactor = zoomCalculationFactor < this.maps.zoomSettings.maxZoom ? zoomCalculationFactor : this.maps.zoomSettings.maxZoom;
                var translatePoint = map.previousPoint = map.translatePoint;
                if (zoomCalculationFactor <= maxZoom) {
                    var translatePointX = translatePoint.x - (((size.width / scale) - (size.width / zoomCalculationFactor)) / (size.width / x));
                    var translatePointY = translatePoint.y - (((size.height / scale) - (size.height / zoomCalculationFactor)) / (size.height / y));
                    map.translatePoint = new Point(translatePointX, translatePointY);
                }
                map.scale = zoomCalculationFactor < this.maps.zoomSettings.maxZoom ? zoomCalculationFactor : this.maps.zoomSettings.maxZoom;
                isZoomCancelled = this.triggerZoomEvent(prevTilePoint, prevLevel, '');
                if (isZoomCancelled) {
                    map.translatePoint = map.previousPoint;
                    map.scale = map.previousScale;
                }
            }
            else {
                zoomCalculationFactor = prevLevel + (Math.round(prevLevel + (((size.width / zoomRect.width) + (size.height / zoomRect.height)) / 2)));
                zoomCalculationFactor = (zoomCalculationFactor >= minZoom && zoomCalculationFactor <= maxZoom) ? zoomCalculationFactor : maxZoom;
                map.zoomSettings.zoomFactor = zoomCalculationFactor;
                this.getTileTranslatePosition(prevLevel, zoomCalculationFactor, { x: x, y: y });
                map.tileZoomLevel = zoomCalculationFactor;
                map.translatePoint.x = (map.tileTranslatePoint.x - (0.5 * Math.pow(2, zoomCalculationFactor))) /
                    (Math.pow(2, zoomCalculationFactor));
                map.translatePoint.y = (map.tileTranslatePoint.y - (0.5 * Math.pow(2, zoomCalculationFactor))) /
                    (Math.pow(2, zoomCalculationFactor));
                map.scale = (Math.pow(2, zoomCalculationFactor));
                isZoomCancelled = this.triggerZoomEvent(prevTilePoint, prevLevel, '');
                if (isZoomCancelled) {
                    map.translatePoint = map.tileTranslatePoint = new Point(0, 0);
                    map.scale = map.tileZoomLevel = map.zoomSettings.zoomFactor = prevLevel;
                }
                else {
                    map.mapLayerPanel.generateTiles(zoomCalculationFactor, map.tileTranslatePoint);
                }
            }
            if (!isZoomCancelled) {
                map.mapScaleValue = zoomCalculationFactor;
                this.applyTransform(map, true);
                this.maps.zoomNotApplied = false;
                this.zoomingRect = null;
            }
        }
        this.isZoomFinal = this.isZoomSelection && Math.round(map.scale) === this.maps.zoomSettings.maxZoom;
        this.removeToolbarOpacity(map.scale, this.maps.element.id + '_Zooming_');
    };
    Zoom.prototype.setInteraction = function (newInteraction) {
        this.lastScale = 1;
        this.interaction = newInteraction;
    };
    Zoom.prototype.updateInteraction = function () {
        if (this.fingers === 2) {
            this.setInteraction('zoom');
        }
        else {
            this.setInteraction(null);
        }
    };
    /**
     * @private
     */
    Zoom.prototype.performPinchZooming = function (e) {
        var map = this.maps;
        var prevLevel = map.tileZoomLevel;
        var availSize = map.mapAreaRect;
        map.previousScale = map.scale;
        map.previousPoint = map.translatePoint;
        var prevTilePoint = map.tileTranslatePoint;
        var scale = calculateScale(this.touchStartList, this.touchMoveList);
        var touchCenter = getTouchCenter(getTouches(this.touchMoveList, this.maps));
        var newScale = scale / this.lastScale;
        this.lastScale = scale;
        this.pinchFactor *= newScale;
        this.pinchFactor = Math.min(this.maps.zoomSettings.maxZoom, Math.max(this.pinchFactor, this.maps.zoomSettings.minZoom));
        var zoomCalculationFactor = this.pinchFactor;
        var isZoomCancelled;
        if (!map.isTileMap) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var minBounds = map.baseMapRectBounds['min'];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var maxBounds = map.baseMapRectBounds['max'];
            var mapTotalHeight = Math.abs(minBounds['y'] - maxBounds['y']);
            var mapTotalWidth = Math.abs(minBounds['x'] - maxBounds['x']);
            var translatePoint = map.translatePoint;
            var translatePointX = void 0;
            var translatePointY = void 0;
            if (zoomCalculationFactor < 1.2 && map.projectionType !== 'Eckert5') {
                if (mapTotalWidth === 0 || mapTotalHeight === 0 || mapTotalWidth === mapTotalHeight) {
                    mapTotalWidth = availSize.width / 2;
                    mapTotalHeight = availSize.height;
                }
                zoomCalculationFactor = parseFloat(Math.min(availSize.width / mapTotalWidth, availSize.height / mapTotalHeight).toFixed(2));
                zoomCalculationFactor = zoomCalculationFactor > 1.05 ? 1 : zoomCalculationFactor;
                map.translatePoint = this.calculateInitalZoomTranslatePoint(zoomCalculationFactor, mapTotalWidth, mapTotalHeight, availSize, minBounds, map);
            }
            else {
                var currentHeight = Math.abs(map.baseMapRectBounds['max']['y'] - map.baseMapRectBounds['min']['y']) * zoomCalculationFactor;
                translatePointX = translatePoint.x - (((availSize.width / map.scale) - (availSize.width / zoomCalculationFactor)) / (availSize.width / touchCenter.x));
                translatePointY = translatePoint.y - (((availSize.height / map.scale) - (availSize.height / zoomCalculationFactor)) / (availSize.height / touchCenter.y));
                translatePointX = (currentHeight < map.mapAreaRect.height) ? (availSize.x + ((-(minBounds['x'])) + ((availSize.width / 2) - (mapTotalWidth / 2)))) : translatePointX;
                translatePointY = (currentHeight < map.mapAreaRect.height) ? (availSize.y + ((-(minBounds['y'])) + ((availSize.height / 2) - (mapTotalHeight / 2)))) : translatePointY;
                map.translatePoint = new Point(translatePointX, translatePointY);
            }
            map.scale = zoomCalculationFactor;
            isZoomCancelled = this.triggerZoomEvent(prevTilePoint, prevLevel, '');
            if (isZoomCancelled) {
                map.translatePoint = map.previousPoint;
                map.scale = map.previousScale;
            }
        }
        else {
            var newTileFactor = zoomCalculationFactor;
            this.getTileTranslatePosition(prevLevel, newTileFactor, { x: touchCenter.x, y: touchCenter.y });
            map.tileZoomLevel = newTileFactor;
            map.translatePoint.x = (map.tileTranslatePoint.x - (0.5 * Math.pow(2, newTileFactor))) /
                (Math.pow(2, newTileFactor));
            map.translatePoint.y = (map.tileTranslatePoint.y - (0.5 * Math.pow(2, newTileFactor))) /
                (Math.pow(2, newTileFactor));
            map.scale = (Math.pow(2, newTileFactor));
            isZoomCancelled = this.triggerZoomEvent(prevTilePoint, prevLevel, '');
            if (isZoomCancelled) {
                map.translatePoint = map.tileTranslatePoint = new Point(0, 0);
                map.scale = map.previousScale;
                map.tileZoomLevel = prevLevel;
                map.zoomSettings.zoomFactor = map.previousScale;
            }
            else {
                map.mapLayerPanel.generateTiles(newTileFactor, map.tileTranslatePoint);
            }
        }
        if (!isZoomCancelled) {
            this.applyTransform(map);
        }
        if (Browser.isDevice) {
            this.removeToolbarOpacity(map.isTileMap ? Math.round(map.tileZoomLevel) : map.scale, map.element.id + '_Zooming_');
        }
    };
    /**
     * @private
     */
    Zoom.prototype.drawZoomRectangle = function () {
        var map = this.maps;
        var down = this.mouseDownPoints;
        var move = this.mouseMovePoints;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var border = { width: 1, color: this.maps.themeStyle.rectangleZoomBorderColor };
        var width = Math.abs(move.x - down.x);
        var height = Math.abs(move.y - down.y);
        var x = ((move.x > down.x) ? down.x : down.x - width);
        var y = ((move.y > down.y) ? down.y : down.y - height);
        var elementRect = getElementByID(map.element.id).getBoundingClientRect();
        if ((x > map.mapAreaRect.x && x < (map.mapAreaRect.x + map.mapAreaRect.width)) &&
            (y > map.mapAreaRect.y) && (y < map.mapAreaRect.y + map.mapAreaRect.height)) {
            this.zoomingRect = new Rect(x, y, width, height);
            var rectSVGObject = map.renderer.createSvg({
                id: map.element.id + '_Selection_Rect_Zooming',
                width: map.availableSize.width,
                height: map.availableSize.height,
                style: 'position: absolute;'
            });
            var rectOption = new RectOption(map.element.id + '_ZoomRect', this.maps.themeStyle.rectangleZoomFillColor, border, this.maps.themeStyle.rectangleZoomFillOpacity, this.zoomingRect, 0, 0, '', '3');
            rectSVGObject.appendChild(map.renderer.drawRectangle(rectOption));
            getElementByID(map.element.id + '_Secondary_Element').appendChild(rectSVGObject);
        }
    };
    /**
     * To animate the zooming process
     *
     * @param {Element} element - Specifies the element
     * @param {boolean} animate - Specifies the boolean value
     * @param {number} x - Specifies the x value
     * @param {number} y - Specifies the y value
     * @param {number} scale - Specifies the scale value
     * @returns {void}
     */
    Zoom.prototype.animateTransform = function (element, animate$$1, x, y, scale) {
        var duration = this.currentLayer.animationDuration;
        if (!animate$$1 || duration === 0 || this.maps.isTileMap) {
            element.setAttribute('transform', 'scale(' + (scale) + ') translate( ' + x + ' ' + y + ' )');
            return;
        }
        if (!this.maps.isTileMap) {
            zoomAnimate(element, 0, duration, new MapLocation(x, y), scale, this.maps.mapAreaRect, this.maps);
        }
    };
    /**
     * @private
     */
    Zoom.prototype.applyTransform = function (maps, animate$$1) {
        var layerIndex;
        this.templateCount = 0;
        var markerStyle;
        var scale = maps.scale;
        var x = maps.translatePoint.x;
        var y = maps.translatePoint.y;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        maps.zoomShapeCollection = [];
        if (document.getElementById(maps.element.id + '_mapsTooltip')) {
            removeElement(maps.element.id + '_mapsTooltip');
        }
        if (this.layerCollectionEle) {
            for (var i_1 = 0; i_1 < this.layerCollectionEle.childElementCount; i_1++) {
                var layerElement = this.layerCollectionEle.childNodes[i_1];
                if (layerElement.tagName === 'g') {
                    this.templateCount++;
                    this.index = layerElement.id.indexOf('_LayerIndex_') > -1 && parseFloat(layerElement.id.split('_LayerIndex_')[1].split('_')[0]);
                    this.currentLayer = maps.layersCollection[this.index];
                    var factor = maps.mapLayerPanel.calculateFactor(this.currentLayer);
                    var elementCount = layerElement.childElementCount;
                    for (var j = 0; j < elementCount; j++) {
                        var currentEle = layerElement.childNodes[j];
                        if (!(currentEle.id.indexOf('_Markers_Group') > -1) && (!(currentEle.id.indexOf('_bubble_Group') > -1))
                            && (!(currentEle.id.indexOf('_dataLableIndex_Group') > -1))) {
                            if (maps.isTileMap && (currentEle.id.indexOf('_line_Group') > -1)) {
                                currentEle.remove();
                                if (layerElement.children.length > 0 && layerElement.children[0]) {
                                    layerElement.insertBefore(maps.navigationLineModule.renderNavigation(this.currentLayer, maps.tileZoomLevel, this.index), layerElement.children[1]);
                                }
                                else {
                                    layerElement.appendChild(maps.navigationLineModule.renderNavigation(this.currentLayer, maps.tileZoomLevel, this.index));
                                }
                            }
                            else if (currentEle.id.indexOf('Legend') === -1) {
                                changeBorderWidth(currentEle, this.index, scale, maps);
                                maps.zoomTranslatePoint = maps.translatePoint;
                                this.animateTransform(currentEle, animate$$1, x, y, scale);
                            }
                        }
                        else if (currentEle.id.indexOf('_Markers_Group') > -1) {
                            if (!this.isPanning && !isNullOrUndefined(currentEle.childNodes[0])) {
                                this.markerTranslates(currentEle.childNodes[0], factor, x, y, scale, 'Marker', layerElement, animate$$1);
                            }
                            currentEle = layerElement.childNodes[j];
                            var markerAnimation = void 0;
                            if (!isNullOrUndefined(currentEle) && currentEle.id.indexOf('Markers') !== -1) {
                                for (var k = 0; k < currentEle.childElementCount; k++) {
                                    this.markerTranslate(currentEle.childNodes[k], factor, x, y, scale, 'Marker', animate$$1);
                                    var layerIndex_1 = parseInt(currentEle.childNodes[k]['id'].split('_LayerIndex_')[1].split('_')[0], 10);
                                    var dataIndex = parseInt(currentEle.childNodes[k]['id'].split('_dataIndex_')[1].split('_')[0], 10);
                                    var markerIndex = parseInt(currentEle.childNodes[k]['id'].split('_MarkerIndex_')[1].split('_')[0], 10);
                                    markerAnimation = this.currentLayer.markerSettings[markerIndex].animationDuration > 0;
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    var markerSelectionValues = this.currentLayer.markerSettings[markerIndex].dataSource[dataIndex];
                                    for (var x_1 = 0; x_1 < this.currentLayer.markerSettings[markerIndex].initialMarkerSelection.length; x_1++) {
                                        if (this.currentLayer.markerSettings[markerIndex].initialMarkerSelection[x_1]['latitude'] ===
                                            markerSelectionValues['latitude'] ||
                                            this.currentLayer.markerSettings[markerIndex].initialMarkerSelection[x_1]['longitude'] ===
                                                markerSelectionValues['longitude']) {
                                            maps.markerSelection(this.currentLayer.markerSettings[markerIndex].selectionSettings, maps, currentEle.children[k], this.currentLayer.markerSettings[markerIndex].dataSource[dataIndex]);
                                        }
                                    }
                                    if ((this.currentLayer.animationDuration > 0 || (maps.layersCollection[0].animationDuration > 0 && this.currentLayer.type === 'SubLayer')) && !this.isPanning) {
                                        if (maps.isTileMap) {
                                            var groupElement = document.querySelector('.GroupElement');
                                            if (groupElement && !(document.querySelector('.ClusterGroupElement')) && markerAnimation) {
                                                groupElement.style.display = 'none';
                                            }
                                        }
                                        else {
                                            markerStyle = 'visibility:hidden';
                                            currentEle.style.cssText = markerStyle;
                                        }
                                    }
                                }
                                if (this.isPanning && maps.markerModule.sameMarkerData.length > 0) {
                                    clusterSeparate(maps.markerModule.sameMarkerData, maps, currentEle, true);
                                }
                                else if (maps.markerModule.sameMarkerData.length > 0) {
                                    maps.markerModule.sameMarkerData = [];
                                    if (document.getElementById(maps.element.id + '_mapsTooltip')) {
                                        removeElement(maps.element.id + '_mapsTooltip');
                                    }
                                }
                                if (document.getElementById(maps.element.id + '_mapsTooltip') && maps.mapsTooltipModule.tooltipTargetID.indexOf('_MarkerIndex_')
                                    && !this.isPanning) {
                                    var mapsTooltip = maps.mapsTooltipModule;
                                    var tooltipElement = currentEle.querySelector('#' + mapsTooltip.tooltipTargetID);
                                    if (!isNullOrUndefined(tooltipElement)) {
                                        if (tooltipElement['style']['visibility'] === 'hidden') {
                                            removeElement(maps.element.id + '_mapsTooltip');
                                        }
                                        else {
                                            var x_2 = parseFloat(tooltipElement.getAttribute('transform').split('(')[1].split(')')[0].split(' ')[1]);
                                            var y_1 = parseFloat(tooltipElement.getAttribute('transform').split('(')[1].split(')')[0].split(' ')[2]);
                                            if (maps.isTileMap) {
                                                x_2 += +getElement(maps.element.id + '_tile_parent')['style']['left'].split('px')[0];
                                                y_1 += +getElement(maps.element.id + '_tile_parent')['style']['top'].split('px')[0];
                                            }
                                            mapsTooltip.svgTooltip.location.x = x_2;
                                            mapsTooltip.svgTooltip.location.y = y_1;
                                            mapsTooltip.svgTooltip.enableAnimation = false;
                                        }
                                    }
                                }
                            }
                        }
                        else if (currentEle.id.indexOf('_bubble_Group') > -1) {
                            var childElement = void 0;
                            for (var k = 0; k < currentEle.childElementCount; k++) {
                                childElement = currentEle.childNodes[k];
                                layerIndex = parseFloat(childElement.id.split('_LayerIndex_')[1].split('_')[0]);
                                var bubleIndex = parseFloat(childElement.id.split('_BubbleIndex_')[1].split('_')[0]);
                                var dataIndex = parseFloat(childElement.id.split('_BubbleIndex_')[1].split('_')[2]);
                                for (var l = 0; l < maps.bubbleModule.bubbleCollection.length; l++) {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    var bubbleCollection = maps.bubbleModule.bubbleCollection[l];
                                    if (bubbleCollection['LayerIndex'] === layerIndex && bubbleCollection['BubbleIndex'] === bubleIndex &&
                                        bubbleCollection['DataIndex'] === dataIndex) {
                                        var centerX = bubbleCollection['center']['x'];
                                        var centerY = bubbleCollection['center']['y'];
                                        var currentX = ((centerX + x) * scale);
                                        var currentY = ((centerY + y) * scale);
                                        var duration = this.currentLayer.animationDuration;
                                        if (!animate$$1 || duration === 0) {
                                            childElement.setAttribute('transform', 'translate( ' + currentX + ' ' + currentY + ' )');
                                        }
                                        else {
                                            smoothTranslate(childElement, 0, duration, new MapLocation(currentX, currentY));
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                        else if (currentEle.id.indexOf('_dataLableIndex_Group') > -1 && !isNullOrUndefined(maps.layers[this.index])) {
                            this.intersect = [];
                            maps.zoomLabelPositions = [];
                            maps.zoomLabelPositions = maps.dataLabelModule.dataLabelCollections;
                            var labelAnimate = !maps.isTileMap && animate$$1;
                            for (var k = 0; k < currentEle.childElementCount; k++) {
                                if (currentEle.childNodes[k]['id'].indexOf('_LabelIndex_') > -1) {
                                    var labelIndex = parseFloat(currentEle.childNodes[k]['id'].split('_LabelIndex_')[1].split('_')[0]);
                                    this.zoomshapewidth = currentEle.childNodes[k].getBoundingClientRect();
                                    maps.zoomShapeCollection.push(this.zoomshapewidth);
                                    this.dataLabelTranslate(currentEle.childNodes[k], factor, x, y, scale, 'DataLabel', labelAnimate);
                                    var dataLabel = maps.layers[this.index].dataLabelSettings;
                                    var border = dataLabel.border;
                                    if (k > 0 && border['width'] > 1) {
                                        if (currentEle.childNodes[k - 1]['id'].indexOf('_rectIndex_') > -1 && !isNullOrUndefined(maps.zoomLabelPositions[labelIndex])) {
                                            var labelX = ((maps.zoomLabelPositions[labelIndex]['location']['x'] + x) * scale);
                                            var labelY = ((maps.zoomLabelPositions[labelIndex]['location']['y'] + y) * scale);
                                            var zoomtext = currentEle.childNodes[k]['textContent'];
                                            var style = maps.layers[this.index].dataLabelSettings.textStyle;
                                            var zoomtextSize = measureText(zoomtext, style);
                                            var padding = 5;
                                            var rectElement = currentEle.childNodes[k - 1];
                                            var rectX = labelX - zoomtextSize['width'] / 2;
                                            var rectY = labelY - zoomtextSize['height'] / 2 - padding;
                                            rectElement['setAttribute']('x', rectX);
                                            rectElement['setAttribute']('y', rectY);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                maps.arrangeTemplate();
            }
            if (!isNullOrUndefined(this.currentLayer)) {
                if (!animate$$1 || this.currentLayer.animationDuration === 0 || maps.isTileMap) {
                    this.processTemplate(x, y, scale, maps);
                }
            }
        }
    };
    Zoom.prototype.markerTranslates = function (element, factor, x, y, scale, type, layerElement, animate$$1) {
        var _this = this;
        if (animate$$1 === void 0) { animate$$1 = false; }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var templateFn;
        var nullCount = 0;
        var markerCounts = 0;
        var markerTemplateCounts = 0;
        var layerIndex = parseInt((element ? element : layerElement).id.split('_LayerIndex_')[1].split('_')[0], 10);
        var markerSVGObject = this.maps.renderer.createGroup({
            id: this.maps.element.id + '_Markers_Group',
            class: 'GroupElement'
        });
        markerSVGObject.style.pointerEvents = 'auto';
        if (document.getElementById(markerSVGObject.id)) {
            removeElement(markerSVGObject.id);
        }
        var mapsAreaRect = this.maps.mapAreaRect;
        var markerTemplateElements = createElement('div', {
            id: this.maps.element.id + '_LayerIndex_' + layerIndex + '_Markers_Template_Group',
            className: 'template'
        });
        markerTemplateElements.style.cssText = 'overflow: hidden; position: absolute;pointer-events: none;' +
            'top:' + mapsAreaRect.y + 'px;' +
            'left:' + mapsAreaRect.x + 'px;' +
            'height:' + mapsAreaRect.height + 'px;' +
            'width:' + mapsAreaRect.width + 'px;';
        if (document.getElementById(markerTemplateElements.id)) {
            removeElement(markerTemplateElements.id);
        }
        var currentLayers = this.maps.layersCollection[layerIndex];
        currentLayers.markerSettings.map(function (markerSettings, markerIndex) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var markerDatas = markerSettings.dataSource;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Array.prototype.forEach.call(markerDatas, function (data, dataIndex) {
                _this.maps.markerNullCount = markerIndex >= 0 && dataIndex === 0 ? 0 : _this.maps.markerNullCount;
                var eventArgs = {
                    template: markerSettings.template, data: data, maps: _this.maps, marker: markerSettings,
                    cancel: false, name: markerRendering, fill: markerSettings.fill, colorValuePath: markerSettings.colorValuePath,
                    shapeValuePath: markerSettings.shapeValuePath, height: markerSettings.height,
                    width: markerSettings.width, imageUrl: markerSettings.imageUrl, imageUrlValuePath: markerSettings.imageUrlValuePath, shape: markerSettings.shape,
                    border: markerSettings.border
                };
                eventArgs = markerShapeChoose(eventArgs, data);
                eventArgs = markerColorChoose(eventArgs, data);
                _this.maps.trigger('markerRendering', eventArgs, function (MarkerArgs) {
                    if (markerSettings.shapeValuePath !== eventArgs.shapeValuePath) {
                        eventArgs = markerShapeChoose(eventArgs, data);
                    }
                    if (markerSettings.colorValuePath !== eventArgs.colorValuePath) {
                        eventArgs = markerColorChoose(eventArgs, data);
                    }
                    var lati = (!isNullOrUndefined(markerSettings.latitudeValuePath)) ?
                        Number(getValueFromObject(data, markerSettings.latitudeValuePath)) : !isNullOrUndefined(data['latitude']) ?
                        parseFloat(data['latitude']) : !isNullOrUndefined(data['Latitude']) ? data['Latitude'] : null;
                    var long = (!isNullOrUndefined(markerSettings.longitudeValuePath)) ?
                        Number(getValueFromObject(data, markerSettings.longitudeValuePath)) : !isNullOrUndefined(data['longitude']) ?
                        parseFloat(data['longitude']) : !isNullOrUndefined(data['Longitude']) ? data['Longitude'] : null;
                    var offset = markerSettings.offset;
                    if (!eventArgs.cancel && markerSettings.visible && !isNullOrUndefined(long) && !isNullOrUndefined(lati)) {
                        var markerID = _this.maps.element.id + '_LayerIndex_' + layerIndex + '_MarkerIndex_'
                            + markerIndex + '_dataIndex_' + dataIndex;
                        var location_1 = (_this.maps.isTileMap) ? convertTileLatLongToPoint(new MapLocation(long, lati), _this.maps.tileZoomLevel, _this.maps.tileTranslatePoint, true) : convertGeoToPoint(lati, long, factor, currentLayers, _this.maps);
                        var transPoint = { x: x, y: y };
                        if (eventArgs.template && (!isNaN(location_1.x) && !isNaN(location_1.y))) {
                            markerTemplateCounts++;
                            markerTemplate(eventArgs, templateFn, markerID, data, markerIndex, markerTemplateElements, location_1, transPoint, scale, offset, _this.maps);
                        }
                        else if (!eventArgs.template && (!isNaN(location_1.x) && !isNaN(location_1.y))) {
                            markerCounts++;
                            marker(eventArgs, markerSettings, markerDatas, dataIndex, location_1, transPoint, markerID, offset, scale, _this.maps, markerSVGObject);
                        }
                    }
                    nullCount += (!isNaN(lati) && !isNaN(long)) ? 0 : 1;
                    markerTemplateCounts += (eventArgs.cancel) ? 1 : 0;
                    markerCounts += (eventArgs.cancel) ? 1 : 0;
                    _this.maps.markerNullCount = (isNullOrUndefined(lati) || isNullOrUndefined(long))
                        ? _this.maps.markerNullCount + 1 : _this.maps.markerNullCount;
                    var markerDataLength = markerDatas.length - _this.maps.markerNullCount;
                    if (markerSVGObject.childElementCount === (markerDataLength - markerTemplateCounts - nullCount) && (type !== 'Template')) {
                        layerElement.appendChild(markerSVGObject);
                        if (currentLayers.markerClusterSettings.allowClustering) {
                            _this.maps.svgObject.appendChild(markerSVGObject);
                            _this.maps.element.appendChild(_this.maps.svgObject);
                            clusterTemplate(currentLayers, markerSVGObject, _this.maps, layerIndex, markerSVGObject, layerElement, true, true);
                        }
                    }
                    if (markerTemplateElements.childElementCount === (markerDataLength - markerCounts - nullCount) && getElementByID(_this.maps.element.id + '_Secondary_Element')) {
                        getElementByID(_this.maps.element.id + '_Secondary_Element').appendChild(markerTemplateElements);
                        if (scale >= 1) {
                            if (currentLayers.markerClusterSettings.allowClustering) {
                                clusterTemplate(currentLayers, markerTemplateElements, _this.maps, layerIndex, markerSVGObject, layerElement, false, true);
                            }
                        }
                    }
                });
            });
        });
    };
    /**
     * To translate the layer template elements
     *
     * @param {number} x - Specifies the x value
     * @param {number} y - Specifies the y value
     * @param {number} scale - Specifies the scale value
     * @param {Maps} maps - Specifies the maps value
     * @returns {void}
     * @private
     */
    Zoom.prototype.processTemplate = function (x, y, scale, maps) {
        for (var i = 0; i < this.templateCount; i++) {
            var factor = maps.mapLayerPanel.calculateFactor(this.currentLayer);
            var markerTemplateElement = getElementByID(maps.element.id + '_LayerIndex_' +
                i + '_Markers_Template_Group');
            var datalabelTemplateElemement = getElementByID(maps.element.id + '_LayerIndex_'
                + i + '_Label_Template_Group');
            if ((!isNullOrUndefined(markerTemplateElement)) && markerTemplateElement.childElementCount > 0) {
                markerTemplateElement.style.visibility = 'visible';
                for (var k = 0; k < markerTemplateElement.childElementCount; k++) {
                    this.markerTranslate(markerTemplateElement.childNodes[k], factor, x, y, scale, 'Template');
                }
            }
            if ((!isNullOrUndefined(datalabelTemplateElemement)) && datalabelTemplateElemement.childElementCount > 0) {
                for (var k = 0; k < datalabelTemplateElemement.childElementCount; k++) {
                    this.dataLabelTranslate(datalabelTemplateElemement.childNodes[k], factor, x, y, scale, 'Template');
                }
            }
        }
    };
    Zoom.prototype.dataLabelTranslate = function (element, factor, x, y, scale, type, animate$$1) {
        if (animate$$1 === void 0) { animate$$1 = false; }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var labelCollection = this.maps.dataLabelModule.dataLabelCollections;
        var text;
        var trimmedLable;
        var style = this.maps.layers[this.index].dataLabelSettings.textStyle;
        var zoomtext;
        var zoomtextSize;
        var zoomtrimLabel;
        var layerIndex = parseFloat(element.id.split('_LayerIndex_')[1].split('_')[0]);
        var shapeIndex = parseFloat(element.id.split('_shapeIndex_')[1].split('_')[0]);
        var labelIndex;
        if (element.id.indexOf('_LabelIndex_') > -1) {
            labelIndex = parseFloat(element.id.split('_LabelIndex_')[1].split('_')[0]);
        }
        var duration = this.currentLayer.animationDuration;
        for (var l = 0; l < labelCollection.length; l++) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var label = labelCollection[l];
            if (label['layerIndex'] === layerIndex && label['shapeIndex'] === shapeIndex
                && label['labelIndex'] === labelIndex) {
                var labelX = label['location']['x'];
                var labelY = label['location']['y'];
                if (type === 'Template') {
                    var locationX = 0;
                    var locationY = 0;
                    if (this.maps.isTileMap) {
                        zoomtext = label['dataLabelText'];
                        zoomtextSize = measureText(zoomtext, style);
                        locationX = ((labelX + x) * scale) - (zoomtextSize['width'] / 2);
                        locationY = ((labelY + y) * scale) - (zoomtextSize['height']);
                    }
                    else {
                        var layerEle = getElementByID(this.maps.element.id + '_Layer_Collections');
                        labelX = ((Math.abs(this.maps.baseMapRectBounds['min']['x'] - labelX)) * scale);
                        labelY = ((Math.abs(this.maps.baseMapRectBounds['min']['y'] - labelY)) * scale);
                        var layerOffset = layerEle.getBoundingClientRect();
                        var elementOffset = element.parentElement.getBoundingClientRect();
                        locationX = ((labelX) + (layerOffset.left - elementOffset.left));
                        locationY = ((labelY) + (layerOffset.top - elementOffset.top));
                    }
                    element.style.left = locationX + 'px';
                    element.style.top = locationY + 'px';
                }
                else {
                    labelX = ((labelX + x) * scale);
                    labelY = ((labelY + y) * scale);
                    zoomtext = label['dataLabelText'];
                    zoomtextSize = measureText(zoomtext, style);
                    var start = labelY - zoomtextSize['height'] / 4;
                    var end = labelY + zoomtextSize['height'] / 4;
                    labelY = end;
                    var xpositionEnds = labelX + zoomtextSize['width'] / 2;
                    var xpositionStart = labelX - zoomtextSize['width'] / 2;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var textLocations = { rightWidth: xpositionEnds, leftWidth: xpositionStart, heightTop: start, heightBottom: end };
                    if (!animate$$1 || duration === 0) {
                        element.setAttribute('transform', 'translate( ' + labelX + ' ' + labelY + ' )');
                    }
                    if (this.maps.layers[this.index].dataLabelSettings.smartLabelMode === 'Hide') {
                        if (scale > 1) {
                            text = ((this.maps.dataLabelShape[l] * scale) >= zoomtextSize['width']) ? zoomtext : '';
                            element.textContent = text;
                        }
                        else {
                            text = (this.maps.dataLabelShape[l] >= zoomtextSize['width']) ? zoomtext : '';
                            element.textContent = text;
                        }
                    }
                    if (this.maps.layers[this.index].dataLabelSettings.smartLabelMode === 'Trim') {
                        if (scale > 1) {
                            zoomtrimLabel = textTrim((this.maps.dataLabelShape[l] * scale), zoomtext, style);
                            text = zoomtrimLabel;
                            element.textContent = text;
                        }
                        else {
                            zoomtrimLabel = textTrim(this.maps.dataLabelShape[l], zoomtext, style);
                            text = zoomtrimLabel;
                            element.textContent = text;
                        }
                    }
                    if (this.maps.layers[this.index].dataLabelSettings.intersectionAction === 'Hide') {
                        for (var m = 0; m < this.intersect.length; m++) {
                            if (!isNullOrUndefined(this.intersect[m])) {
                                if (textLocations['leftWidth'] > this.intersect[m]['rightWidth']
                                    || textLocations['rightWidth'] < this.intersect[m]['leftWidth']
                                    || textLocations['heightTop'] > this.intersect[m]['heightBottom']
                                    || textLocations['heightBottom'] < this.intersect[m]['heightTop']) {
                                    text = !isNullOrUndefined(text) ? text : zoomtext;
                                    element.textContent = text;
                                }
                                else {
                                    text = '';
                                    element.textContent = text;
                                    break;
                                }
                            }
                        }
                        this.intersect.push(textLocations);
                    }
                    if (this.maps.layers[this.index].dataLabelSettings.intersectionAction === 'Trim') {
                        for (var j = 0; j < this.intersect.length; j++) {
                            if (!isNullOrUndefined(this.intersect[j])) {
                                if (textLocations['rightWidth'] < this.intersect[j]['leftWidth']
                                    || textLocations['leftWidth'] > this.intersect[j]['rightWidth']
                                    || textLocations['heightBottom'] < this.intersect[j]['heightTop']
                                    || textLocations['heightTop'] > this.intersect[j]['heightBottom']) {
                                    trimmedLable = !isNullOrUndefined(text) ? text : zoomtext;
                                    if (scale > 1) {
                                        trimmedLable = textTrim((this.maps.dataLabelShape[l] * scale), trimmedLable, style);
                                    }
                                    element.textContent = trimmedLable;
                                }
                                else {
                                    if (textLocations['leftWidth'] > this.intersect[j]['leftWidth']) {
                                        var width = this.intersect[j]['rightWidth'] - textLocations['leftWidth'];
                                        var difference = width - (textLocations['rightWidth'] - textLocations['leftWidth']);
                                        text = !isNullOrUndefined(text) ? text : zoomtext;
                                        trimmedLable = textTrim(difference, text, style);
                                        element.textContent = trimmedLable;
                                        break;
                                    }
                                    if (textLocations['leftWidth'] < this.intersect[j]['leftWidth']) {
                                        var width = textLocations['rightWidth'] - this.intersect[j]['leftWidth'];
                                        var difference = Math.abs(width - (textLocations['rightWidth'] - textLocations['leftWidth']));
                                        text = !isNullOrUndefined(text) ? text : zoomtext;
                                        trimmedLable = textTrim(difference, text, style);
                                        element.textContent = trimmedLable;
                                        break;
                                    }
                                }
                            }
                        }
                        this.intersect.push(textLocations);
                        if (isNullOrUndefined(trimmedLable)) {
                            trimmedLable = textTrim((this.maps.dataLabelShape[l] * scale), zoomtext, style);
                            element.textContent = trimmedLable;
                        }
                    }
                    if (animate$$1 || duration > 0) {
                        smoothTranslate(element, 0, duration, new MapLocation(labelX, labelY));
                    }
                }
            }
        }
    };
    Zoom.prototype.markerTranslate = function (element, factor, x, y, scale, type, animate$$1) {
        if (animate$$1 === void 0) { animate$$1 = false; }
        var layerIndex = parseInt(element.id.split('_LayerIndex_')[1].split('_')[0], 10);
        var markerIndex = parseInt(element.id.split('_MarkerIndex_')[1].split('_')[0], 10);
        var dataIndex = parseInt(element.id.split('_dataIndex_')[1].split('_')[0], 10);
        var layer = this.maps.layersCollection[layerIndex];
        var marker$$1 = layer.markerSettings[markerIndex];
        if (!isNullOrUndefined(marker$$1) && !isNullOrUndefined(marker$$1.dataSource) && !isNullOrUndefined(marker$$1.dataSource[dataIndex])) {
            var lng = (!isNullOrUndefined(marker$$1.longitudeValuePath)) ?
                Number(getValueFromObject(marker$$1.dataSource[dataIndex], marker$$1.longitudeValuePath)) :
                !isNullOrUndefined(marker$$1.dataSource[dataIndex]['longitude']) ? parseFloat(marker$$1.dataSource[dataIndex]['longitude']) :
                    !isNullOrUndefined(marker$$1.dataSource[dataIndex]['Latitude']) ? parseFloat(marker$$1.dataSource[dataIndex]['Latitude']) : 0;
            var lat = (!isNullOrUndefined(marker$$1.latitudeValuePath)) ?
                Number(getValueFromObject(marker$$1.dataSource[dataIndex], marker$$1.latitudeValuePath)) :
                !isNullOrUndefined(marker$$1.dataSource[dataIndex]['latitude']) ? parseFloat(marker$$1.dataSource[dataIndex]['latitude']) :
                    !isNullOrUndefined(marker$$1.dataSource[dataIndex]['Latitude']) ? parseFloat(marker$$1.dataSource[dataIndex]['Latitude']) : 0;
            var duration = this.currentLayer.animationDuration;
            var location_2 = (this.maps.isTileMap) ? convertTileLatLongToPoint(new Point(lng, lat), this.maps.tileZoomLevel, this.maps.tileTranslatePoint, true) : convertGeoToPoint(lat, lng, factor, layer, this.maps);
            if (this.maps.isTileMap) {
                if (type === 'Template') {
                    var templateOffset = element.getBoundingClientRect();
                    element.style.left = ((location_2.x - (templateOffset.width / 2)) + marker$$1.offset.x) + 'px';
                    element.style.top = ((location_2.y - (templateOffset.height / 2)) + marker$$1.offset.y) + 'px';
                    if (this.maps.layers[this.maps.baseLayerIndex].layerType === 'GoogleStaticMap') {
                        var staticMapOffset = getElementByID(this.maps.element.id + '_StaticGoogleMap').getBoundingClientRect();
                        var staticMapOffsetWidth = 640;
                        if (element['style']['display'] !== 'none') {
                            if ((staticMapOffset['x'] > templateOffset['x'] || staticMapOffset['x'] + staticMapOffsetWidth < templateOffset['x'] + templateOffset['width'])
                                && (staticMapOffset['y'] > templateOffset['y'] || staticMapOffset['y'] + staticMapOffset['height'] < templateOffset['y'] + templateOffset['height'])) {
                                element.style.display = 'none';
                            }
                            else if ((staticMapOffset['x'] > templateOffset['x'] || staticMapOffset['x'] + staticMapOffsetWidth < templateOffset['x'] + templateOffset['width'])) {
                                element.style.display = 'none';
                            }
                        }
                    }
                }
                else {
                    location_2.x += marker$$1.offset.x;
                    location_2.y += marker$$1.offset.y;
                    element.setAttribute('transform', 'translate( ' + location_2.x + ' ' + location_2.y + ' )');
                }
            }
            else {
                if (type === 'Template') {
                    if (duration > 0) {
                        location_2.x = ((Math.abs(this.maps.baseMapRectBounds['min']['x'] - location_2.x)) * scale);
                        location_2.y = ((Math.abs(this.maps.baseMapRectBounds['min']['y'] - location_2.y)) * scale);
                        var layerOffset = getElementByID(this.maps.element.id + '_Layer_Collections').getBoundingClientRect();
                        var elementOffset = element.parentElement.getBoundingClientRect();
                        element.style.left = (((location_2.x) + (layerOffset.left - elementOffset.left)) + marker$$1.offset.x) + 'px';
                        element.style.top = (((location_2.y) + (layerOffset.top - elementOffset.top)) + marker$$1.offset.y) + 'px';
                        element.style.transform = 'translate(-50%, -50%)';
                    }
                    else {
                        var elementOffset = element.getBoundingClientRect();
                        element.style.left = ((location_2.x + x) * scale) + marker$$1.offset.x - this.maps.mapAreaRect.x - (elementOffset.width / 2) + 'px';
                        element.style.top = ((location_2.y + y) * scale) + marker$$1.offset.y - this.maps.mapAreaRect.y - (elementOffset.height / 2) + 'px';
                    }
                }
                else {
                    location_2.x = (((location_2.x + x) * scale) + marker$$1.offset.x);
                    location_2.y = (((location_2.y + y) * scale) + marker$$1.offset.y);
                    if (!animate$$1 || duration === 0) {
                        element.setAttribute('transform', 'translate( ' + location_2.x + ' ' + location_2.y + ' )');
                    }
                    else {
                        smoothTranslate(element, 0, duration, location_2);
                    }
                }
            }
        }
    };
    Zoom.prototype.markerLineAnimation = function (map) {
        if (map.isTileMap) {
            for (var i = 0; i < map.layersCollection.length; i++) {
                var markerTemplateElement = getElementByID(this.maps.element.id + '_LayerIndex_' + i + '_Markers_Template_Group');
                var lineElement = getElementByID(this.maps.element.id + '_LayerIndex_' + i + '_line_Group');
                if (!isNullOrUndefined(markerTemplateElement)) {
                    markerTemplateElement.style.visibility = 'hidden';
                }
                if (!isNullOrUndefined(lineElement)) {
                    lineElement.style.visibility = 'hidden';
                }
            }
        }
    };
    /**
     * @param {PanDirection} direction - Specifies the direction of the panning.
     * @param {number} xDifference - Specifies the distance moved in the horizontal direction.
     * @param {number} yDifference - Specifies the distance moved in the vertical direction.
     * @param {PointerEvent | TouchEvent | KeyboardEvent} mouseLocation - Specifies the pointer event argument.
     * @returns {void}
     * @private
     */
    Zoom.prototype.panning = function (direction, xDifference, yDifference, mouseLocation) {
        var map = this.maps;
        var panArgs;
        var down = this.mouseDownPoints;
        var move = this.mouseMovePoints;
        var scale = map.scale;
        map.markerZoomedState = false;
        map.zoomPersistence = map.enablePersistence;
        map.defaultState = false;
        map.initialCheck = false;
        var translatePoint = map.translatePoint;
        var prevTilePoint = map.tileTranslatePoint;
        var x;
        var y;
        xDifference = !isNullOrUndefined(xDifference) ? xDifference : (down.x - move.x);
        yDifference = !isNullOrUndefined(yDifference) ? yDifference : (down.y - move.y);
        this.maps.mergeCluster();
        if (!map.isTileMap) {
            var legendElement = document.getElementById(map.element.id + '_Legend_Group');
            var legendHeight = !isNullOrUndefined(legendElement) ? legendElement.getClientRects()[0].height : 0;
            x = translatePoint.x - xDifference / scale;
            y = translatePoint.y - yDifference / scale;
            var layerRect = getElementByID(map.element.id + '_Layer_Collections').getBoundingClientRect();
            var elementRect = getElementByID(map.element.id + '_svg').getBoundingClientRect();
            var panningXDirection = ((xDifference < 0 ? layerRect.left <= (elementRect.left + map.mapAreaRect.x) :
                ((layerRect.left + layerRect.width + map.mapAreaRect.x) >= (elementRect.width))));
            var panningYDirection = ((yDifference < 0 ? layerRect.top <= (elementRect.top + map.mapAreaRect.y) :
                ((layerRect.top + layerRect.height + legendHeight + map.margin.top) >= (elementRect.top + elementRect.height))));
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var location_3 = this.maps.getGeoLocation(this.maps.layersCollection.length - 1, mouseLocation['layerX'], mouseLocation['layerY']);
            panArgs = {
                cancel: false, name: pan, maps: map,
                tileTranslatePoint: {}, translatePoint: { previous: translatePoint, current: new Point(x, y) },
                scale: map.scale, tileZoomLevel: map.tileZoomLevel, latitude: location_3['latitude'], longitude: location_3['longitude']
            };
            map.trigger(pan, panArgs);
            if (!panArgs.cancel) {
                if (panningXDirection && panningYDirection) {
                    map.translatePoint = new Point(x, y);
                    this.applyTransform(map);
                }
                else if (panningXDirection) {
                    map.translatePoint = new Point(x, map.translatePoint.y);
                    this.applyTransform(map);
                }
                else if (panningYDirection) {
                    map.translatePoint = new Point(map.translatePoint.x, y);
                    this.applyTransform(map);
                }
            }
            this.maps.zoomNotApplied = false;
        }
        else if (this.maps.tileZoomLevel > 1) {
            x = map.tileTranslatePoint.x - xDifference;
            y = map.tileTranslatePoint.y - yDifference;
            this.distanceX = x - map.tileTranslatePoint.x;
            this.distanceY = y - map.tileTranslatePoint.y;
            map.tileTranslatePoint.x = x;
            map.tileTranslatePoint.y = y;
            if ((map.tileTranslatePoint.y > -10 && yDifference < 0) || ((map.tileTranslatePoint.y < -((Math.pow(2, this.maps.tileZoomLevel) - 2) * 256) && yDifference > 0))) {
                map.tileTranslatePoint.x = x + xDifference;
                map.tileTranslatePoint.y = y + yDifference;
            }
            map.translatePoint.x = (map.tileTranslatePoint.x - xDifference) / map.scale;
            map.translatePoint.y = (map.tileTranslatePoint.y - yDifference) / map.scale;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var location_4 = this.maps.getTileGeoLocation(mouseLocation['layerX'], mouseLocation['layerY']);
            panArgs = {
                cancel: false, name: pan, maps: map,
                tileTranslatePoint: { previous: prevTilePoint, current: map.tileTranslatePoint },
                translatePoint: { previous: translatePoint, current: map.translatePoint }, scale: map.scale,
                tileZoomLevel: map.tileZoomLevel, latitude: location_4['latitude'], longitude: location_4['longitude']
            };
            map.trigger(pan, panArgs);
            map.mapLayerPanel.generateTiles(map.tileZoomLevel, map.tileTranslatePoint, 'Pan');
            this.applyTransform(map);
        }
        map.zoomTranslatePoint = map.translatePoint;
        this.mouseDownPoints = this.mouseMovePoints;
        this.isSingleClick = false;
    };
    Zoom.prototype.toAlignSublayer = function () {
        this.maps.translatePoint.x = !isNullOrUndefined(this.distanceX) ? (this.maps.translatePoint.x -
            (this.distanceX / this.maps.scale)) : this.maps.translatePoint.x;
        this.maps.translatePoint.y = !isNullOrUndefined(this.distanceY) ? this.maps.translatePoint.y -
            (this.distanceY / this.maps.scale) : this.maps.translatePoint.y;
        this.applyTransform(this.maps, false);
    };
    /**
     * @private
     */
    Zoom.prototype.toolBarZooming = function (zoomFactor, type) {
        var _this = this;
        var map = this.maps;
        map.initialCheck = false;
        map.defaultState = ((type === 'Reset' && zoomFactor === 1 && !(map.zoomSettings.resetToInitial && map.applyZoomReset))
            || (type === 'ZoomOut' && zoomFactor === 1));
        var prevLevel = map.tileZoomLevel;
        var scale = map.previousScale = map.scale;
        map.markerZoomedState = false;
        map.zoomPersistence = map.enablePersistence;
        map.mapScaleValue = zoomFactor;
        var maxZoom = map.zoomSettings.maxZoom;
        var minZoom = map.zoomSettings.minZoom;
        var size = map.mapAreaRect;
        var translatePoint = map.previousPoint = map.translatePoint;
        var prevTilePoint = map.tileTranslatePoint;
        map.previousProjection = map.projectionType;
        zoomFactor = (type === 'ZoomOut') ? (Math.round(zoomFactor) === 1 ? 1 : zoomFactor) : zoomFactor;
        zoomFactor = (type === 'Reset') ? minZoom : (Math.round(zoomFactor) === 0) ? 1 : zoomFactor;
        zoomFactor = (minZoom > zoomFactor && type === 'ZoomIn') ? minZoom + 1 : zoomFactor;
        if ((!map.isTileMap) && (type === 'ZoomIn' ? zoomFactor >= minZoom && Math.round(zoomFactor) <= maxZoom : zoomFactor >= minZoom
            || map.isReset)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var min = map.baseMapRectBounds['min'];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var max = map.baseMapRectBounds['max'];
            var mapWidth = Math.abs(max['x'] - min['x']);
            var mapHeight = Math.abs(min['y'] - max['y']);
            var translatePointX = void 0;
            var translatePointY = void 0;
            if (zoomFactor < 1.2 && map.projectionType !== 'Eckert5') {
                if (mapHeight === 0 || mapWidth === 0 || mapHeight === mapWidth) {
                    mapWidth = size.width / 2;
                    mapHeight = size.height;
                }
                zoomFactor = parseFloat(Math.min(size.width / mapWidth, size.height / mapHeight).toFixed(2));
                zoomFactor = zoomFactor > 1.05 ? 1 : zoomFactor;
                map.translatePoint = this.calculateInitalZoomTranslatePoint(zoomFactor, mapWidth, mapHeight, size, min, map);
            }
            else {
                translatePointX = translatePoint.x - (((size.width / scale) - (size.width / zoomFactor)) / 2);
                translatePointY = translatePoint.y - (((size.height / scale) - (size.height / zoomFactor)) / 2);
                var currentHeight = Math.abs(map.baseMapRectBounds['max']['y'] - map.baseMapRectBounds['min']['y']) * zoomFactor;
                translatePointX = (currentHeight < map.mapAreaRect.height) ? (size.x + ((-(min['x'])) + ((size.width / 2) - (mapWidth / 2))))
                    : translatePointX;
                translatePointY = (currentHeight < map.mapAreaRect.height) ? (size.y + ((-(min['y'])) + ((size.height / 2) - (mapHeight / 2))))
                    : translatePointY;
                map.translatePoint = new Point(translatePointX, translatePointY);
            }
            map.zoomTranslatePoint = map.translatePoint;
            map.scale = zoomFactor;
            if (this.triggerZoomEvent(prevTilePoint, prevLevel, type)) {
                map.translatePoint = map.zoomTranslatePoint = map.previousPoint;
                map.scale = map.previousScale;
            }
            else {
                this.applyTransform(map, true);
            }
        }
        else if ((map.isTileMap) && ((zoomFactor >= minZoom && zoomFactor <= maxZoom) || map.isReset)) {
            var tileZoomFactor = prevLevel < minZoom && !map.isReset ? minZoom : zoomFactor;
            map.scale = Math.pow(2, tileZoomFactor - 1);
            map.tileZoomLevel = tileZoomFactor;
            if (map.previousScale !== map.scale || map.isReset) {
                map.zoomSettings.zoomFactor = zoomFactor;
                var position = { x: map.availableSize.width / 2, y: map.availableSize.height / 2 };
                this.getTileTranslatePosition(prevLevel, tileZoomFactor, position, type);
                if (map.zoomSettings.resetToInitial && map.applyZoomReset && type === 'Reset' || (type === 'ZoomOut' && map.zoomSettings.resetToInitial && map.applyZoomReset && tileZoomFactor <= map.initialZoomLevel)) {
                    map.initialCheck = true;
                    map.zoomPersistence = false;
                    map.tileTranslatePoint.x = map.initialTileTranslate.x;
                    map.tileTranslatePoint.y = map.initialTileTranslate.y;
                    tileZoomFactor = map.tileZoomLevel = map.mapScaleValue = map.initialZoomLevel;
                }
                if (this.triggerZoomEvent(prevTilePoint, prevLevel, type)) {
                    map.translatePoint = map.tileTranslatePoint = new Point(0, 0);
                    map.scale = map.previousScale;
                    map.tileZoomLevel = prevLevel;
                    map.zoomSettings.zoomFactor = map.previousScale;
                }
                else {
                    map.translatePoint.y = (map.tileTranslatePoint.y - (0.01 * map.mapScaleValue)) / map.scale;
                    map.translatePoint.x = (map.tileTranslatePoint.x - (0.01 * map.mapScaleValue)) / map.scale;
                    if (document.getElementById(this.maps.element.id + '_LayerIndex_1')) {
                        document.getElementById(this.maps.element.id + '_LayerIndex_1').style.display = 'none';
                    }
                    if (document.querySelector('.GroupElement')) {
                        document.querySelector('.GroupElement').style.display = 'none';
                    }
                    this.markerLineAnimation(map);
                    map.mapLayerPanel.generateTiles(tileZoomFactor, map.tileTranslatePoint, type);
                    var element1 = document.getElementById(this.maps.element.id + '_tiles');
                    var animationDuration = this.maps.layersCollection[0].animationDuration;
                    setTimeout(function () {
                        _this.applyTransform(_this.maps, true);
                        if (document.getElementById(_this.maps.element.id + '_LayerIndex_1')) {
                            document.getElementById(_this.maps.element.id + '_LayerIndex_1').style.display = 'block';
                        }
                        _this.maps.isAddLayer = false;
                    }, animationDuration);
                }
            }
            this.maps.zoomNotApplied = false;
        }
    };
    /**
     * @private
     */
    Zoom.prototype.createZoomingToolbars = function () {
        var map = this.maps;
        var zoomInElements;
        var zoomOutElements;
        this.toolBarGroup = map.renderer.createGroup({
            id: map.element.id + '_Zooming_KitCollection',
            opacity: map.theme.toLowerCase() === 'fluentdark' ? 0.6 : 0.3
        });
        var xSpacing = 15;
        var ySpacing = 15;
        var toolbar = map.zoomSettings.toolbarSettings;
        var button = map.zoomSettings.toolbarSettings.buttonSettings;
        this.maps.toolbarProperties = {
            toolBarOrientation: toolbar.orientation === 'Horizontal' ? map.zoomSettings.toolBarOrientation : toolbar.orientation,
            highlightColor: button.highlightColor == null ? map.zoomSettings.highlightColor : button.highlightColor,
            selectionColor: button.selectionColor == null ? map.zoomSettings.selectionColor : button.selectionColor,
            horizontalAlignment: toolbar.horizontalAlignment === 'Far' ? map.zoomSettings.horizontalAlignment : toolbar.horizontalAlignment,
            verticalAlignment: toolbar.verticalAlignment === 'Near' ? map.zoomSettings.verticalAlignment : toolbar.verticalAlignment,
            color: button.color == null ? map.zoomSettings.color : button.color,
            shapeOpacity: button.opacity !== 1 ? button.opacity : 1,
            borderOpacity: button.borderOpacity !== 1 ? button.borderOpacity : 1
        };
        var cx = button.radius / 4;
        var cy = button.radius / 4;
        var radius = button.radius / 2;
        var padding = button.padding;
        var orientation = this.maps.toolbarProperties.toolBarOrientation;
        var toolbarCollection = map.zoomSettings.toolbarSettings.buttonSettings.toolbarItems.map(function (value) { return value; });
        var toolbarsCollection = toolbarCollection.length === 3 ? map.zoomSettings.toolbars : toolbarCollection;
        xSpacing = (button.radius / 4) + (button.borderWidth / 2) + padding;
        ySpacing = (button.radius / 4) + (button.borderWidth / 2) + padding;
        var shadowElement = '<filter id="chart_shadow" height="130%"><feGaussianBlur in="SourceAlpha" stdDeviation="5"/>';
        shadowElement += '<feOffset dx="-3" dy="4" result="offsetblur"/><feComponentTransfer><feFuncA type="linear" slope="1"/>';
        shadowElement += '</feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
        var toolBarLength = toolbarCollection.length;
        var toolWidth = (orientation === 'Horizontal') ? ((toolBarLength * button.radius) + (toolBarLength * padding) + padding + (toolBarLength * button.borderWidth)) : (button.radius + button.borderWidth + (2 * padding));
        var toolHeight = (orientation === 'Horizontal') ? (button.radius + button.borderWidth + (2 * padding)) : ((toolBarLength * button.radius) + (toolBarLength * padding) + padding + (toolBarLength * button.borderWidth));
        var defElement = map.renderer.createDefs();
        defElement.innerHTML = shadowElement;
        this.toolBarGroup.appendChild(defElement);
        var outerElement = map.renderer.drawRectangle(new RectOption(map.element.id + '_Zooming_Rect', toolbar.backgroundColor, { color: toolbar.borderColor, width: toolbar.borderWidth, opacity: toolbar.borderOpacity }, toolbar.borderOpacity, new Rect((toolbar.borderWidth / 2), (toolbar.borderWidth / 2), (toolWidth - toolbar.borderWidth), (toolHeight - toolbar.borderWidth)), 0, 0));
        this.toolBarGroup.appendChild(outerElement);
        var scaleX = (button.radius - (button.borderWidth / 2)) / 30;
        for (var i = 0; i < toolbarsCollection.length; i++) {
            if (i !== 0) {
                xSpacing = (map.toolbarProperties.toolBarOrientation === 'Horizontal') ? (xSpacing + (button.radius + padding) + button.borderWidth) : xSpacing;
                ySpacing = (map.toolbarProperties.toolBarOrientation === 'Horizontal') ? ySpacing : (ySpacing + (button.radius + padding) + button.borderWidth);
            }
            var toolbar_1 = toolbarsCollection[i];
            var pathStroke = !isNullOrUndefined(this.maps.toolbarProperties.color) ? this.maps.toolbarProperties.color : this.maps.themeStyle.zoomFillColor;
            var borderColor = button.borderColor || this.maps.themeStyle.zoomFillColor;
            this.currentToolbarEle = map.renderer.createGroup({
                id: map.element.id + '_Zooming_ToolBar_' + toolbar_1 + '_Group',
                transform: 'translate( ' + xSpacing + ' ' + ySpacing + ' ) '
            });
            this.currentToolbarEle.setAttribute('class', 'e-maps-toolbar');
            this.currentToolbarEle.appendChild(map.renderer.drawCircle(new CircleOption(map.element.id + '_Zooming_ToolBar_' + toolbar_1 + '_Rect', button.fill, { color: borderColor, width: button.borderWidth, opacity: button.borderOpacity }, button.opacity, cx, cy, radius, '')));
            var opacity = 1;
            var direction = '';
            var fill = button.fill;
            this.selectionColor = this.maps.toolbarProperties.selectionColor || this.maps.themeStyle.zoomSelectionColor;
            switch (toolbar_1.toLowerCase()) {
                case 'zoom': {
                    var fillColor_1 = void 0;
                    var strokeColor = void 0;
                    direction = 'M0.001,14.629L1.372,16l4.571-4.571v-0.685l0.228-0.274c1.051,0.868,2.423,1.417,3.885,1.417c3.291,0,';
                    direction += '5.943-2.651,5.943-5.943S13.395,0,10.103,0S4.16,2.651,4.16,5.943c0,1.508,0.503,2.834,1.417,3.885l-0.274,0.228H4.571';
                    direction = direction + 'L0.001,14.629L0.001,14.629z M5.943,5.943c0-2.285,1.828-4.114,4.114-4.114s4.114,1.828,4.114,';
                    this.currentToolbarEle.setAttribute('class', (this.maps.zoomSettings.enableSelectionZooming ? 'e-maps-toolbar' : ''));
                    if (this.maps.zoomSettings.enablePanning && !this.maps.zoomSettings.enableSelectionZooming) {
                        fillColor_1 = fill;
                        strokeColor = pathStroke;
                    }
                    else if (this.maps.zoomSettings.enablePanning && this.maps.zoomSettings.enableSelectionZooming) {
                        fillColor_1 = fill;
                        strokeColor = pathStroke;
                    }
                    else if (!this.maps.zoomSettings.enablePanning && !this.maps.zoomSettings.enableSelectionZooming) {
                        fillColor_1 = fill;
                        strokeColor = pathStroke;
                    }
                    else if (!this.maps.zoomSettings.enablePanning && this.maps.zoomSettings.enableSelectionZooming) {
                        fillColor_1 = this.maps.themeStyle.zoomFillColor;
                        strokeColor = pathStroke;
                    }
                    else if (!this.maps.zoomSettings.enablePanning && !this.maps.zoomSettings.enableSelectionZooming) {
                        fillColor_1 = fill;
                        strokeColor = pathStroke;
                    }
                    else {
                        fillColor_1 = this.selectionColor;
                        strokeColor = this.selectionColor;
                    }
                    var zoomPath = map.renderer.drawPath(new PathOption(map.element.id + '_Zooming_ToolBar_' + toolbar_1, fillColor_1, 1, strokeColor, opacity, opacity, null, direction + '4.114s-1.828,4.114-4.114,4.114S5.943,8.229,5.943,5.943z'));
                    zoomPath.setAttribute('transform', 'scale( ' + scaleX + ',' + scaleX + ' )');
                    this.currentToolbarEle.appendChild(zoomPath);
                    this.zoomElements = this.currentToolbarEle;
                    this.wireEvents(this.currentToolbarEle, this.performToolBarAction);
                    break;
                }
                case 'zoomin':
                    direction = 'M 8, 0 L 8, 16 M 0, 8 L 16, 8';
                    var zoomInPath = map.renderer.drawPath(new PathOption(map.element.id + '_Zooming_ToolBar_' + toolbar_1 + '_Path', fill, 3, pathStroke, 1, 1, null, direction));
                    zoomInPath.setAttribute('transform', 'scale( ' + scaleX + ',' + scaleX + ' )');
                    this.currentToolbarEle.appendChild(zoomInPath);
                    zoomInElements = this.currentToolbarEle;
                    this.wireEvents(this.currentToolbarEle, this.performToolBarAction);
                    break;
                case 'zoomout':
                    direction = 'M 0, 8 L 16, 8';
                    var zoomOutPath = map.renderer.drawPath(new PathOption(map.element.id + '_Zooming_ToolBar_' + toolbar_1, fill, 3, pathStroke, 1, 1, null, direction));
                    zoomOutPath.setAttribute('transform', 'scale( ' + scaleX + ',' + scaleX + ' )');
                    this.currentToolbarEle.appendChild(zoomOutPath);
                    zoomOutElements = this.currentToolbarEle;
                    this.wireEvents(this.currentToolbarEle, this.performToolBarAction);
                    break;
                case 'pan': {
                    var color = void 0;
                    direction = 'M5,3h2.3L7.275,5.875h1.4L8.65,3H11L8,0L5,3z M3,11V8.7l2.875,0.025v-1.4L3,7.35V5L0,8L3,';
                    direction += '11z M11,13H8.7l0.025-2.875h-1.4L7.35,13H5l3,3L11,13z M13,5v2.3l-2.875-0.025v1.4L13,8.65V11l3-3L13,5z';
                    this.currentToolbarEle.setAttribute('class', (this.maps.zoomSettings.enablePanning ? 'e-maps-toolbar' : ''));
                    if (this.maps.zoomSettings.enablePanning && this.maps.zoomModule.isDragZoom) {
                        color = this.selectionColor || this.maps.themeStyle.zoomFillColor;
                    }
                    else if (!this.maps.zoomSettings.enablePanning) {
                        color = this.selectionColor || this.maps.themeStyle.zoomFillColor;
                        this.currentToolbarEle.setAttribute('class', '');
                    }
                    else {
                        color = fill || this.maps.themeStyle.zoomFillColor;
                    }
                    var panPath = map.renderer.drawPath(new PathOption(map.element.id + '_Zooming_ToolBar_' + toolbar_1, color, 1, pathStroke, opacity, opacity, null, direction));
                    panPath.setAttribute('transform', 'scale( ' + scaleX + ',' + scaleX + ' )');
                    this.currentToolbarEle.appendChild(panPath);
                    this.panColor = color;
                    this.panElements = this.currentToolbarEle;
                    this.wireEvents(this.currentToolbarEle, this.performToolBarAction);
                    break;
                }
                case 'reset':
                    direction = 'M12.364,8h-2.182l2.909,3.25L16,8h-2.182c0-3.575-2.618-6.5-5.818-6.5c-1.128,0-2.218,0.366-3.091,';
                    direction += '1.016l1.055,1.178C6.581,3.328,7.272,3.125,8,3.125C10.4,3.125,12.363,5.319,12.364,8L12.364,8z M11.091,';
                    direction += '13.484l-1.055-1.178C9.419,12.672,8.728,12.875,8,12.875c-2.4,0-4.364-2.194-4.364-4.875h2.182L2.909,4.75L0,8h2.182c0,';
                    var resetPath = map.renderer.drawPath(new PathOption(map.element.id + '_Zooming_ToolBar_' + toolbar_1, fill, null, pathStroke, 1, 1, null, direction + '3.575,2.618,6.5,5.818,6.5C9.128,14.5,10.219,14.134,11.091,13.484L11.091,13.484z'));
                    resetPath.setAttribute('transform', 'scale( ' + scaleX + ',' + scaleX + ' )');
                    this.currentToolbarEle.appendChild(resetPath);
                    this.wireEvents(this.currentToolbarEle, this.performToolBarAction);
                    break;
            }
            this.toolBarGroup.appendChild(this.currentToolbarEle);
        }
    };
    /**
     * @private
     */
    Zoom.prototype.performToolBarAction = function (e) {
        var target = e.target;
        e.stopImmediatePropagation();
        var isTouch = e.pointerType === 'touch' || e.pointerType === '2' || (e.type.indexOf('touch') > -1);
        var toolbar = target.id.split('_Zooming_ToolBar_')[1].split('_')[0];
        var isToolbarPerform = true;
        switch (toolbar.toLowerCase()) {
            case 'zoomin':
                isToolbarPerform = (this.maps.isTileMap ? this.maps.tileZoomLevel : this.maps.scale) + 1 <= this.maps.zoomSettings.maxZoom;
                break;
            case 'zoomout':
                isToolbarPerform = (this.maps.isTileMap ? this.maps.tileZoomLevel : this.maps.scale) - 1 >= this.maps.zoomSettings.minZoom;
                break;
            case 'reset':
                isToolbarPerform = Math.round(this.maps.isTileMap ? this.maps.tileZoomLevel : this.maps.scale) != this.maps.zoomSettings.minZoom;
                break;
        }
        if (isTouch && isToolbarPerform) {
            this.handled = true;
            this.performZoomingByToolBar(toolbar);
        }
        else if ((e.type === 'mousedown' || e.type === 'pointerdown') && !this.handled && isToolbarPerform) {
            this.handled = false;
            this.performZoomingByToolBar(toolbar);
        }
        else {
            this.handled = false;
        }
    };
    /**
     * @param {string} type - Specifies the type.
     * @returns {void}
     * @private
     */
    Zoom.prototype.performZoomingByToolBar = function (type) {
        var map = this.maps;
        map.isReset = false;
        var scale = 0;
        var stateColor = this.fillColor || this.maps.themeStyle.zoomFillColor;
        switch (type.toLowerCase()) {
            case 'zoom':
                this.panColor = stateColor;
                this.zoomColor = this.maps.zoomSettings.enableSelectionZooming ? this.selectionColor : stateColor;
                this.applySelection(this.zoomElements, this.zoomColor);
                this.applySelection(this.panElements, this.panColor);
                this.isPan = false;
                this.isZoomSelection = this.maps.zoomSettings.enableSelectionZooming;
                break;
            case 'pan':
                this.panColor = this.maps.zoomSettings.enablePanning ? this.selectionColor : stateColor;
                this.zoomColor = stateColor;
                if (!this.maps.zoomSettings.enablePanning) {
                    this.applySelection(this.zoomElements, this.selectionColor);
                    this.applySelection(this.panElements, this.panColor);
                }
                else {
                    this.applySelection(this.zoomElements, (this.fillColor || stateColor));
                    this.applySelection(this.panElements, this.panColor);
                }
                this.isPan = this.maps.zoomSettings.enablePanning;
                this.isZoomSelection = false;
                break;
            case 'zoomin':
                map.staticMapZoom = map.tileZoomLevel;
                if (map.staticMapZoom > 0 && map.staticMapZoom < 22) {
                    map.staticMapZoom += 1;
                }
                this.toolBarZooming((map.isTileMap ? map.tileZoomLevel : map.scale) + 1, 'ZoomIn');
                scale = this.maps.isTileMap ? Math.round(this.maps.tileZoomLevel) : Math.round(this.maps.mapScaleValue);
                if (!this.isZoomSelection) {
                    if (scale === map.zoomSettings.maxZoom || scale > 1 || (scale === 1 && this.maps.isTileMap)) {
                        this.applySelection(this.zoomElements, stateColor);
                        this.applySelection(this.panElements, map.zoomSettings.enablePanning ? this.selectionColor : stateColor);
                    }
                    else if (scale === 1 && !this.maps.isTileMap) {
                        this.applySelection(this.zoomElements, stateColor);
                        this.applySelection(this.panElements, stateColor);
                    }
                }
                break;
            case 'zoomout':
                map.staticMapZoom = map.tileZoomLevel;
                map.markerCenterLatitude = null;
                map.markerCenterLongitude = null;
                this.toolBarZooming((map.isTileMap ? map.tileZoomLevel : map.scale) - 1, 'ZoomOut');
                scale = this.maps.isTileMap ? Math.round(this.maps.tileZoomLevel) : Math.round(this.maps.mapScaleValue);
                if (!this.isPan && this.isZoomSelection) {
                    this.panColor = stateColor;
                    this.zoomColor = this.selectionColor;
                    this.applySelection(this.zoomElements, this.selectionColor);
                    this.applySelection(this.panElements, this.panColor);
                }
                else {
                    if (scale <= 1 && !map.isTileMap) {
                        this.applySelection(this.panElements, stateColor);
                    }
                    else {
                        this.applySelection(this.panElements, map.zoomSettings.enablePanning ? this.selectionColor : stateColor);
                    }
                }
                break;
            case 'reset':
                map.staticMapZoom = map.zoomSettings.enable ? map.zoomSettings.zoomFactor : 0;
                map.markerCenterLatitude = null;
                map.markerCenterLongitude = null;
                this.isZoomSelection = false;
                this.isPan = map.zoomSettings.enablePanning;
                this.toolBarZooming(map.zoomSettings.minZoom, 'Reset');
                if ((this.isPan && !this.isZoomSelection) || (!this.isPan && this.isZoomSelection)) {
                    if (!this.maps.zoomSettings.enablePanning) {
                        this.applySelection(this.zoomElements, this.selectionColor);
                        this.applySelection(this.panElements, stateColor);
                    }
                    else {
                        this.applySelection(this.zoomElements, stateColor);
                        this.applySelection(this.panElements, this.selectionColor);
                    }
                }
                else if (!this.isPan && !this.isZoomSelection) {
                    this.applySelection(this.zoomElements, stateColor);
                    this.applySelection(this.panElements, stateColor);
                }
        }
        this.panningStyle(type.toLowerCase());
    };
    Zoom.prototype.panningStyle = function (toolbar) {
        var svg = getElementByID(this.maps.element.id + '_svg');
        if (toolbar === 'pan' || (this.isPanning && toolbar !== 'reset')) {
            svg.setAttribute('class', 'e-maps-panning');
        }
        else {
            svg.setAttribute('class', '');
        }
    };
    Zoom.prototype.applySelection = function (elements, color) {
        if (!elements) {
            return;
        }
        var childElement;
        for (var i = 0; i < elements.childElementCount; i++) {
            childElement = elements.childNodes[i];
            if (childElement.tagName !== 'circle') {
                childElement.setAttribute('fill', (elements.id.indexOf('Pan') > -1 ? color : 'transparent'));
                childElement.setAttribute('stroke', color);
            }
        }
    };
    /**
     * @private
     */
    Zoom.prototype.showTooltip = function (e) {
        var text = e.target.id.split('_Zooming_ToolBar_')[1].split('_')[0];
        var tooltip = this.maps.zoomSettings.toolbarSettings.tooltipSettings;
        var tooltipSettings = {
            visible: tooltip.visible,
            fill: tooltip.fill,
            borderOpacity: tooltip.borderOpacity,
            borderWidth: tooltip.borderWidth,
            borderColor: tooltip.borderColor,
            fontColor: tooltip.fontColor,
            fontFamily: tooltip.fontFamily,
            fontStyle: tooltip.fontStyle,
            fontWeight: tooltip.fontWeight,
            fontSize: tooltip.fontSize || '10px',
            fontOpacity: tooltip.fontOpacity
        };
        tooltipSettings.fontFamily = this.maps.themeStyle.fontFamily;
        if (!this.isTouch) {
            createTooltip('EJ2_Map_Toolbar_Tip', this.maps.getLocalizedLabel(text), (e.pageY + 10), (e.pageX + 10), tooltipSettings);
            if (this.maps.isDevice) {
                clearTimeout(this.clearTimeout);
                this.clearTimeout = setTimeout(this.removeTooltip.bind(this), 2000);
            }
        }
    };
    /**
     * @private
     */
    Zoom.prototype.removeTooltip = function () {
        if (getElementByID('EJ2_Map_Toolbar_Tip')) {
            remove(getElementByID('EJ2_Map_Toolbar_Tip'));
        }
    };
    /**
     * @private
     */
    Zoom.prototype.alignToolBar = function () {
        var map = this.maps;
        var padding = 10;
        var element = createElement('div', { id: map.element.id + '_ToolBar' });
        element.style.cssText = 'position:absolute;z-index:2';
        var rectSVGObject = map.renderer.createSvg({
            id: map.element.id + '_Zooming_ToolBar', width: 10, height: 10
        });
        rectSVGObject.appendChild(this.toolBarGroup);
        element.appendChild(rectSVGObject);
        if (getElementByID(map.element.id + '_Secondary_Element')) {
            getElementByID(map.element.id + '_Secondary_Element').appendChild(element);
        }
        var toolBarSize = this.toolBarGroup.getBoundingClientRect();
        rectSVGObject.setAttribute('height', (toolBarSize.height + map.zoomSettings.toolbarSettings.borderWidth).toString());
        rectSVGObject.setAttribute('width', (toolBarSize.width + map.zoomSettings.toolbarSettings.borderWidth).toString());
        var size = !isNullOrUndefined(map.totalRect) ? map.totalRect : map.mapAreaRect;
        var x = 0;
        var y = 0;
        switch (map.toolbarProperties.verticalAlignment) {
            case 'Near':
                y = size.y;
                break;
            case 'Center':
                y = (size.height / 2) - (toolBarSize.height / 2);
                break;
            case 'Far':
                y = (size.height - toolBarSize.height) - padding;
                break;
        }
        switch (map.toolbarProperties.horizontalAlignment) {
            case 'Near':
                x = size.x;
                break;
            case 'Center':
                x = (size.width / 2) - (toolBarSize.width / 2);
                break;
            case 'Far':
                if (!isNullOrUndefined(map.legendModule) && map.legendSettings.position === 'Left') {
                    x = size.width + size.x - toolBarSize.width - padding;
                }
                else {
                    x = (size.width - toolBarSize.width) - padding;
                }
                break;
        }
        element.style.left = x + 'px';
        element.style.top = y + 'px';
        var color = this.maps.toolbarProperties.highlightColor || this.maps.themeStyle.zoomSelectionColor;
        var css = ' .e-maps-toolbar:hover > circle { stroke:' + color + '; } .e-maps-toolbar:hover > path { fill: ' + color + ' ;  stroke: ' + color + '; }' +
            '.e-maps-toolbar:hover { cursor: pointer; } .e-maps-cursor-disable:hover { cursor: not-allowed; } .e-maps-panning:hover { cursor: pointer; } ' +
            '.e-maps-popup-close { display: block; opacity: 0; }';
        var style = document.createElement('style');
        style.appendChild(document.createTextNode(css));
        element.appendChild(style);
    };
    /**
     * @private
     */
    Zoom.prototype.removeToolbarOpacity = function (factor, id) {
        if (this.maps.zoomModule && this.maps.zoomSettings.enable) {
            if (getElementByID(this.maps.element.id + '_Zooming_KitCollection') && id.indexOf(this.maps.element.id + '_Zooming_') > -1) {
                if (this.maps.isDevice) {
                    getElementByID(this.maps.element.id + '_Zooming_KitCollection').setAttribute('opacity', '1');
                    this.removeToolbarClass('', '', '', '', '');
                }
                else {
                    this.removeToolbarClass(this.maps.zoomSettings.enableSelectionZooming ? 'e-maps-toolbar' : '', 'e-maps-toolbar', 'e-maps-toolbar', this.maps.zoomSettings.enablePanning ? 'e-maps-toolbar' : '', 'e-maps-toolbar');
                }
                var toolbarShapeOpacity = this.maps.toolbarProperties.shapeOpacity;
                var toolbarButtonOpacity = this.maps.toolbarProperties.borderOpacity;
                if (this.maps.isTileMap && (factor <= 1.1 || this.maps.zoomSettings.minZoom === factor)) {
                    if (!this.maps.isDevice) {
                        this.removeToolbarClass(this.maps.zoomSettings.enableSelectionZooming ? 'e-maps-toolbar' : '', 'e-maps-toolbar', '', this.maps.zoomSettings.enablePanning ? 'e-maps-toolbar' : '', '');
                    }
                    if (this.maps.zoomSettings.enablePanning) {
                        this.removePanColor(this.maps.toolbarProperties.selectionColor || this.maps.themeStyle.zoomSelectionColor);
                    }
                    if (this.isZoomSelection && this.maps.zoomSettings.enableSelectionZooming && !this.maps.isReset) {
                        this.removeZoomColor(this.maps.toolbarProperties.selectionColor || this.maps.themeStyle.zoomSelectionColor);
                        this.removePanColor(this.maps.toolbarProperties.color || this.maps.themeStyle.zoomFillColor);
                    }
                    this.removeZoomOpacity((this.maps.zoomSettings.enableSelectionZooming ? toolbarShapeOpacity : 0.3), (this.maps.zoomSettings.enableSelectionZooming ? toolbarButtonOpacity : 0.3), toolbarShapeOpacity, toolbarButtonOpacity, 0.3, 0.3, (this.maps.zoomSettings.enablePanning ? toolbarShapeOpacity : 0.3), (this.maps.zoomSettings.enablePanning ? toolbarButtonOpacity : 0.3), 0.3, 0.3);
                }
                else if ((factor <= 1.1 || this.maps.zoomSettings.minZoom === factor)) {
                    if (!this.maps.isDevice) {
                        this.removeToolbarClass(this.maps.zoomSettings.enableSelectionZooming ? 'e-maps-toolbar' : '', 'e-maps-toolbar', '', '', '');
                    }
                    if (!this.isZoomSelection && this.maps.zoomSettings.enablePanning) {
                        this.removePanColor(this.maps.toolbarProperties.color || this.maps.themeStyle.zoomFillColor);
                    }
                    if (this.isZoomSelection && this.maps.zoomSettings.enableSelectionZooming && !this.maps.isReset) {
                        this.removeZoomColor(this.maps.toolbarProperties.selectionColor || this.maps.themeStyle.zoomSelectionColor);
                        this.removePanColor(this.maps.toolbarProperties.color || this.maps.themeStyle.zoomFillColor);
                    }
                    this.removeZoomOpacity((this.maps.zoomSettings.enableSelectionZooming ? toolbarShapeOpacity : 0.3), (this.maps.zoomSettings.enableSelectionZooming ? toolbarButtonOpacity : 0.3), toolbarShapeOpacity, toolbarButtonOpacity, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3);
                }
                else if (factor < this.maps.zoomSettings.maxZoom) {
                    if (!this.maps.isDevice) {
                        this.removeToolbarClass(this.maps.zoomSettings.enableSelectionZooming ? 'e-maps-toolbar' : '', 'e-maps-toolbar', 'e-maps-toolbar', this.maps.zoomSettings.enablePanning ? 'e-maps-toolbar' : '', 'e-maps-toolbar');
                    }
                    if (!this.maps.zoomModule.isZoomFinal) {
                        this.removeZoomOpacity((this.maps.zoomSettings.enableSelectionZooming ? toolbarShapeOpacity : 0.3), (this.maps.zoomSettings.enableSelectionZooming ? toolbarButtonOpacity : 0.3), toolbarShapeOpacity, toolbarButtonOpacity, toolbarShapeOpacity, toolbarButtonOpacity, (this.maps.zoomSettings.enablePanning ? toolbarShapeOpacity : 0.3), (this.maps.zoomSettings.enablePanning ? toolbarButtonOpacity : 0.3), toolbarShapeOpacity, toolbarButtonOpacity);
                    }
                    else {
                        this.maps.zoomModule.isZoomFinal = false;
                    }
                    if (this.isZoomSelection && this.maps.zoomSettings.enableSelectionZooming) {
                        this.removeZoomColor(this.maps.toolbarProperties.selectionColor || this.maps.themeStyle.zoomSelectionColor);
                        if (this.maps.zoomModule.isPan && this.maps.zoomSettings.enablePanning) {
                            this.removePanColor(this.maps.toolbarProperties.color || this.maps.themeStyle.zoomFillColor);
                        }
                    }
                    else if (!this.isZoomSelection && this.maps.zoomSettings.enablePanning) {
                        this.removePanColor(this.maps.toolbarProperties.selectionColor || this.maps.themeStyle.zoomSelectionColor);
                        if (this.maps.zoomSettings.enableSelectionZooming) {
                            this.removeZoomColor(this.maps.toolbarProperties.color || this.maps.themeStyle.zoomFillColor);
                        }
                    }
                }
                else {
                    if (!this.maps.isDevice) {
                        this.removeToolbarClass('', '', 'e-maps-toolbar', this.maps.zoomSettings.enablePanning ? 'e-maps-toolbar' : '', 'e-maps-toolbar');
                    }
                    this.removeZoomOpacity(0.3, 0.3, 0.3, 0.3, toolbarShapeOpacity, toolbarButtonOpacity, (this.maps.zoomSettings.enablePanning ? toolbarShapeOpacity : 0.3), (this.maps.zoomSettings.enablePanning ? toolbarButtonOpacity : 0.3), toolbarShapeOpacity, toolbarButtonOpacity);
                    if (this.maps.zoomSettings.enableSelectionZooming) {
                        this.removeZoomColor(this.maps.toolbarProperties.color || this.maps.themeStyle.zoomFillColor);
                    }
                    if (!this.isZoomSelection && this.maps.zoomSettings.enablePanning) {
                        this.removePanColor(this.maps.toolbarProperties.selectionColor || this.maps.themeStyle.zoomSelectionColor);
                    }
                }
            }
            else {
                if (!this.maps.isDevice) {
                    this.removePanColor(this.maps.toolbarProperties.color || this.maps.themeStyle.zoomFillColor);
                    this.removeZoomColor(this.maps.toolbarProperties.color || this.maps.themeStyle.zoomFillColor);
                    this.removeZoomOpacity(1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
                }
            }
        }
    };
    Zoom.prototype.setOpacity = function (circleId, pathId, circleOpacity, pathOpacity) {
        if (getElementByID(this.maps.element.id + circleId)) {
            getElementByID(this.maps.element.id + circleId).setAttribute('stroke-opacity', circleOpacity.toString());
            getElementByID(this.maps.element.id + circleId).setAttribute('fill-opacity', circleOpacity.toString());
            getElementByID(this.maps.element.id + pathId).setAttribute('stroke-opacity', pathOpacity.toString());
            getElementByID(this.maps.element.id + pathId).setAttribute('fill-opacity', pathOpacity.toString());
        }
    };
    Zoom.prototype.removeZoomOpacity = function (zoomOpacity, zoomStrokeOpacity, zoomInOpacity, zoomInStrokeOpacity, zoomOutOpacity, zoomOutStrokeOpacity, panOpacity, panStrokeOpacity, resetOpacity, resetStrokeOpacity) {
        this.setOpacity('_Zooming_ToolBar_Zoom_Rect', '_Zooming_ToolBar_Zoom', zoomStrokeOpacity, zoomOpacity);
        this.setOpacity('_Zooming_ToolBar_ZoomIn_Rect', '_Zooming_ToolBar_ZoomIn_Path', zoomInStrokeOpacity, zoomInOpacity);
        this.setOpacity('_Zooming_ToolBar_ZoomOut_Rect', '_Zooming_ToolBar_ZoomOut', zoomOutStrokeOpacity, zoomOutOpacity);
        this.setOpacity('_Zooming_ToolBar_Pan_Rect', '_Zooming_ToolBar_Pan', panStrokeOpacity, panOpacity);
        this.setOpacity('_Zooming_ToolBar_Reset_Rect', '_Zooming_ToolBar_Reset', resetStrokeOpacity, resetOpacity);
    };
    /**
     * @private
     */
    Zoom.prototype.removeToolbarClass = function (zoomClassStyle, zoomInClassStyle, zoomOutClassStyle, panClassStyle, resetClassStyle) {
        if (getElementByID(this.maps.element.id + '_Zooming_KitCollection')) {
            if (document.getElementById(this.maps.element.id + '_Zooming_ToolBar_ZoomIn_Group')) {
                getElementByID(this.maps.element.id + '_Zooming_ToolBar_ZoomIn_Group').setAttribute('class', zoomInClassStyle);
            }
            if (document.getElementById(this.maps.element.id + '_Zooming_ToolBar_ZoomOut_Group')) {
                getElementByID(this.maps.element.id + '_Zooming_ToolBar_ZoomOut_Group').setAttribute('class', zoomOutClassStyle);
            }
            if (document.getElementById(this.maps.element.id + '_Zooming_ToolBar_Reset_Group')) {
                getElementByID(this.maps.element.id + '_Zooming_ToolBar_Reset_Group').setAttribute('class', resetClassStyle);
            }
            if (document.getElementById(this.maps.element.id + '_Zooming_ToolBar_Zoom_Group') && this.maps.zoomSettings.enableSelectionZooming) {
                getElementByID(this.maps.element.id + '_Zooming_ToolBar_Zoom_Group').setAttribute('class', zoomClassStyle);
            }
            if (document.getElementById(this.maps.element.id + '_Zooming_ToolBar_Pan_Group') && this.maps.zoomSettings.enablePanning) {
                getElementByID(this.maps.element.id + '_Zooming_ToolBar_Pan_Group').setAttribute('class', panClassStyle);
            }
        }
    };
    Zoom.prototype.removePanColor = function (selectionColor) {
        if (getElementByID(this.maps.element.id + '_Zooming_ToolBar_Pan_Rect') && this.maps.zoomSettings.enablePanning) {
            getElementByID(this.maps.element.id + '_Zooming_ToolBar_Pan').setAttribute('fill', selectionColor);
            getElementByID(this.maps.element.id + '_Zooming_ToolBar_Pan').setAttribute('stroke', selectionColor);
        }
    };
    Zoom.prototype.removeZoomColor = function (selectionColor) {
        if (getElementByID(this.maps.element.id + '_Zooming_ToolBar_Zoom_Rect') && this.maps.zoomSettings.enableSelectionZooming) {
            getElementByID(this.maps.element.id + '_Zooming_ToolBar_Zoom').setAttribute('fill', 'transparent');
            getElementByID(this.maps.element.id + '_Zooming_ToolBar_Zoom').setAttribute('stroke', selectionColor);
        }
    };
    /**
     * To bind events.
     *
     * @param {Element} element - Specifies the element.
     * @param {any} process - Specifies the process.
     * @returns {void}
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Zoom.prototype.wireEvents = function (element, process) {
        EventHandler.add(element, Browser.touchStartEvent, process, this);
        EventHandler.add(element, 'mouseover', this.showTooltip, this);
        EventHandler.add(element, 'mouseout', this.removeTooltip, this);
    };
    /**
     * @private
     */
    Zoom.prototype.mapMouseWheel = function (e) {
        if (this.maps.zoomSettings.enable && this.maps.zoomSettings.mouseWheelZoom) {
            var map = this.maps;
            var size = map.availableSize;
            map.markerZoomedState = false;
            map.zoomPersistence = map.enablePersistence;
            var position = this.getMousePosition(e.pageX, e.pageY);
            var prevLevel = map.tileZoomLevel;
            var prevScale = map.scale;
            var delta = 1;
            var staticMaxZoomLevel = 22; // google map maximum zoom level value
            var value = (map.isTileMap) ? prevLevel : prevScale;
            if (((position.x > map.mapAreaRect.x) && (position.x < (map.mapAreaRect.x + map.mapAreaRect.width))) &&
                (position.y > map.mapAreaRect.y) && position.y < (map.mapAreaRect.y + map.mapAreaRect.height)) {
                e.preventDefault();
                var direction = (this.browserName === 'mozilla' && !this.isPointer) ?
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    -(e.detail) / 3 > 0 ? 'ZoomIn' : 'ZoomOut' : (e.wheelDelta / 120) > 0 ? 'ZoomIn' : 'ZoomOut';
                if (direction === 'ZoomIn') {
                    map.mapScaleValue = value + delta;
                    map.staticMapZoom = map.tileZoomLevel;
                    if (map.staticMapZoom > 0 && map.staticMapZoom < staticMaxZoomLevel) {
                        map.staticMapZoom += 1;
                    }
                    this.performZooming(position, (value + delta), direction);
                }
                else {
                    map.mapScaleValue = value - delta;
                    map.isReset = (map.mapScaleValue < 1) ? true : false;
                    map.staticMapZoom = map.tileZoomLevel;
                    if (map.mapScaleValue === 1) {
                        map.markerCenterLatitude = null;
                        map.markerCenterLongitude = null;
                    }
                    if (map.staticMapZoom > 1 && map.staticMapZoom < staticMaxZoomLevel) {
                        map.staticMapZoom -= 1;
                    }
                    this.performZooming(position, (value - delta), direction);
                }
            }
            this.removeToolbarOpacity(map.mapScaleValue, (!this.maps.isDevice ? (!isNullOrUndefined(e.target) ? e.target['id'] :
                this.maps.element.id) : this.maps.element.id + '_Zooming_'));
        }
    };
    /**
     * @private
     */
    Zoom.prototype.doubleClick = function (e) {
        var pageX = e.pageX;
        var pageY = e.pageY;
        var target = e.target;
        if (this.maps.zoomSettings.enable && this.maps.zoomSettings.doubleClickZoom
            && !(e.target['id'].indexOf('_Zooming_') > -1)) {
            var position = this.getMousePosition(pageX, pageY);
            var map = this.maps;
            var size = map.availableSize;
            var prevLevel = map.tileZoomLevel;
            var prevScale = map.scale;
            map.mapScaleValue = map.mapScaleValue + 1;
            var value = (map.isTileMap) ? prevLevel : prevScale;
            if (((position.x > map.mapAreaRect.x) && (position.x < (map.mapAreaRect.x + map.mapAreaRect.width))) &&
                (position.y > map.mapAreaRect.y) && position.y < (map.mapAreaRect.y + map.mapAreaRect.height)) {
                this.performZooming(position, (value + 1), 'ZoomIn');
            }
        }
    };
    /**
     * @private
     */
    Zoom.prototype.mouseDownHandler = function (e) {
        var pageX;
        var pageY;
        var target;
        var touches = null;
        var element = e.target;
        if (e.type === 'touchstart') {
            this.isTouch = true;
            touches = e.touches;
            target = e.target;
            pageX = touches[0].clientX;
            pageY = touches[0].clientY;
        }
        else {
            pageX = e.pageX;
            pageY = e.pageY;
            target = e.target;
        }
        if (!this.maps.zoomSettings.enablePanning) {
            this.isPan = this.isPanning = this.panColor !== this.selectionColor ? this.maps.zoomSettings.enablePanning
                : this.zoomColor === this.selectionColor;
        }
        else {
            this.isPan = this.isPanning = !this.isZoomSelection;
        }
        this.mouseDownLatLong = { x: pageX, y: pageY };
        var scale = this.maps.isTileMap ? Math.round(this.maps.tileZoomLevel) : Math.round(this.maps.mapScaleValue);
        this.rectZoomingStart = ((this.isZoomSelection && scale < this.maps.zoomSettings.maxZoom) && this.maps.zoomSettings.enable);
        this.mouseDownPoints = this.getMousePosition(pageX, pageY);
        if (this.isTouch) {
            this.firstMove = true;
            this.pinchFactor = this.maps.scale;
            this.fingers = touches.length;
        }
        this.isSingleClick = true;
    };
    /**
     * @private
     */
    Zoom.prototype.mouseMoveHandler = function (e) {
        var pageX;
        var pageY;
        var map = this.maps;
        var target;
        var touches = null;
        var zoom = this.maps.zoomSettings;
        if (e.type === 'touchmove') {
            this.isTouch = true;
            target = e.target;
            touches = e.touches;
            pageX = touches[0].clientX;
            pageY = touches[0].clientY;
        }
        else {
            pageX = e.pageX;
            pageY = e.pageY;
            target = e.target;
        }
        if (getElementByID(map.element.id + '_Zooming_KitCollection')) {
            if (target.id.indexOf('_Zooming_') > -1) {
                getElementByID(map.element.id + '_Zooming_KitCollection').setAttribute('opacity', '1');
            }
            else if (!map.isDevice) {
                getElementByID(map.element.id + '_Zooming_KitCollection').setAttribute('opacity', map.theme.toLowerCase() === 'fluentdark' ? '0.6' : '0.3');
            }
        }
        if (this.isTouch) {
            if (this.maps.zoomSettings.pinchZooming) {
                if (this.firstMove && touches.length === 2) {
                    this.rectZoomingStart = false;
                    this.updateInteraction();
                    this.touchStartList = targetTouches(e);
                }
                else if (touches.length === 2 && this.touchStartList.length === 2) {
                    this.touchMoveList = targetTouches(e);
                    e.preventDefault();
                    this.rectZoomingStart = false;
                    this.performPinchZooming(e);
                }
                this.firstMove = false;
            }
        }
        this.mouseMovePoints = this.getMousePosition(pageX, pageY);
        var targetId = e.target['id'];
        var targetEle = e.target;
        if (zoom.enable && this.isPanning && this.maps.markerDragId.indexOf('_MarkerIndex_') == -1 && ((Browser.isDevice && touches.length >= 1) || !Browser.isDevice)) {
            e.preventDefault();
            this.maps.element.style.cursor = 'pointer';
            this.mouseMoveLatLong = { x: pageX, y: pageY };
            if ((this.mouseDownLatLong['x'] !== this.mouseMoveLatLong['x']) && (this.mouseDownLatLong['y'] !== this.mouseMoveLatLong['y'])) {
                if (this.maps.zoomSettings.enablePanning) {
                    this.panning('None', null, null, e);
                }
                this.mouseDownLatLong['x'] = pageX;
                this.mouseDownLatLong['y'] = pageY;
            }
        }
        if (this.isTouch ? (touches.length === 1 && this.rectZoomingStart) : this.rectZoomingStart) {
            e.preventDefault();
            var scale = this.maps.isTileMap ? Math.round(this.maps.tileZoomLevel) : Math.round(this.maps.mapScaleValue);
            if (this.maps.zoomSettings.enableSelectionZooming && scale < this.maps.zoomSettings.maxZoom) {
                this.drawZoomRectangle();
            }
            else {
                this.rectZoomingStart = false;
                this.isPan = true;
            }
        }
    };
    /**
     * @private
     */
    Zoom.prototype.mouseUpHandler = function (e) {
        var map = this.maps;
        this.rectZoomingStart = false;
        this.isPanning = false;
        this.isSingleClick = this.isSingleClick ? true : false;
        this.isTouch = false;
        this.touchStartList = [];
        this.touchMoveList = [];
        this.lastScale = 1;
        this.maps.element.style.cursor = 'auto';
        if ((!isNullOrUndefined(this.distanceX) || !isNullOrUndefined(this.distanceY)) && (!isNullOrUndefined(this.currentLayer) && this.currentLayer.type === 'SubLayer')) {
            this.toAlignSublayer();
            this.distanceX = this.distanceY = null;
        }
        var zoomRectElement = getElementByID(this.maps.element.id + '_Selection_Rect_Zooming');
        if (zoomRectElement && this.maps.zoomSettings.enable && this.maps.zoomSettings.enableSelectionZooming) {
            remove(zoomRectElement);
            this.performRectZooming();
        }
        this.mouseMoveLatLong = { x: 0, y: 0 };
        this.mouseDownLatLong = { x: 0, y: 0 };
    };
    /**
     * @private
     */
    Zoom.prototype.mouseCancelHandler = function (e) {
        this.isPanning = false;
        this.isTouch = false;
        this.rectZoomingStart = false;
        var zoomRectElement = getElementByID(this.maps.element.id + '_Selection_Rect_Zooming');
        if (zoomRectElement && this.maps.zoomSettings.enable) {
            remove(zoomRectElement);
            this.performRectZooming();
        }
    };
    /**
     * To handle the click event for maps.
     *
     * @param {PointerEvent} e - Specifies the pointer event.
     * @returns {void}
     * @private
     */
    Zoom.prototype.click = function (e) {
        var map = this.maps;
        if ((map.markerModule && map.markerModule.sameMarkerData.length > 0) ||
            (e.target['id'].indexOf('MarkerIndex') > -1 && e.target['id'].indexOf('cluster') === -1)) {
            return null;
        }
        if (this.isSingleClick && map.zoomSettings.zoomOnClick && !(e.target['id'].indexOf('_Zooming_') > -1) && !map.zoomSettings.doubleClickZoom
            && (this.zoomColor !== this.selectionColor)) {
            var pageX = e.pageX;
            var pageY = e.pageY;
            var position = this.getMousePosition(pageX, pageY);
            var prevLevel = map.tileZoomLevel;
            var prevScale = map.scale;
            map.mapScaleValue = map.mapScaleValue + 1;
            var value = (map.isTileMap) ? prevLevel : prevScale;
            if (((position.x > map.mapAreaRect.x) && (position.x < (map.mapAreaRect.x + map.mapAreaRect.width))) &&
                (position.y > map.mapAreaRect.y) && position.y < (map.mapAreaRect.y + map.mapAreaRect.height)) {
                this.performZooming(position, (value + 1), 'ZoomIn');
            }
        }
    };
    /**
     * @private
     */
    Zoom.prototype.getMousePosition = function (pageX, pageY) {
        var map = this.maps;
        var elementRect = map.element.getBoundingClientRect();
        var pageXOffset = map.element.ownerDocument.defaultView.pageXOffset;
        var pageYOffset = map.element.ownerDocument.defaultView.pageYOffset;
        var clientTop = map.element.ownerDocument.documentElement.clientTop;
        var clientLeft = map.element.ownerDocument.documentElement.clientLeft;
        var positionX = elementRect.left + pageXOffset - clientLeft;
        var positionY = elementRect.top + pageYOffset - clientTop;
        return new Point(Math.abs(pageX - positionX), Math.abs(pageY - positionY));
    };
    /**
     * @private
     */
    Zoom.prototype.addEventListener = function () {
        if (this.maps.isDestroyed) {
            return;
        }
        EventHandler.add(this.maps.element, this.wheelEvent, this.mapMouseWheel, this);
        EventHandler.add(this.maps.element, 'click', this.click, this);
        EventHandler.add(this.maps.element, 'dblclick', this.doubleClick, this);
        this.maps.on(Browser.touchMoveEvent, this.mouseMoveHandler, this);
        this.maps.on(Browser.touchStartEvent, this.mouseDownHandler, this);
        this.maps.on(Browser.touchEndEvent, this.mouseUpHandler, this);
        EventHandler.add(this.maps.element, this.cancelEvent, this.mouseCancelHandler, this);
    };
    /**
     * @private
     */
    Zoom.prototype.removeEventListener = function () {
        if (this.maps.isDestroyed) {
            return;
        }
        EventHandler.remove(this.maps.element, this.wheelEvent, this.mapMouseWheel);
        EventHandler.remove(this.maps.element, 'click', this.click);
        EventHandler.remove(this.maps.element, 'dblclick', this.doubleClick);
        this.maps.off(Browser.touchMoveEvent, this.mouseMoveHandler);
        this.maps.off(Browser.touchStartEvent, this.mouseDownHandler);
        this.maps.off(Browser.touchEndEvent, this.mouseUpHandler);
        this.maps.off(this.cancelEvent, this.mouseCancelHandler);
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    Zoom.prototype.getModuleName = function () {
        return 'Zoom';
    };
    /**
     * To destroy the zoom.
     *
     * @returns {void}
     * @private
     */
    Zoom.prototype.destroy = function () {
        this.toolBarGroup = null;
        this.currentToolbarEle = null;
        this.zoomingRect = null;
        this.zoomElements = null;
        this.panElements = null;
        this.baseTranslatePoint = null;
        this.touchStartList = null;
        this.touchMoveList = null;
        this.previousTouchMoveList = null;
        this.mouseDownPoints = null;
        this.mouseMovePoints = null;
        this.startTouches = [];
        this.zoomshapewidth = null;
        this.intersect = [];
        this.mouseDownLatLong = null;
        this.mouseMoveLatLong = null;
        this.removeEventListener();
        //TODO: Calling the below code throws spec issue.
        //this.maps = null;
        this.currentLayer = null;
    };
    return Zoom;
}());

/**
 * This module enables the print functionality in maps.
 *
 * @hidden
 */
var Print = /** @__PURE__ @class */ (function () {
    /**
     * Constructor for Maps
     *
     * @param {Maps} control - Specifies the instance of the Maps
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    function Print(control) {
    }
    /**
     * To print the Maps
     *
     * @param {Maps} maps -Specifies the Maps instance.
     * @param {string[] | string | Element} elements - Specifies the element of the Maps
     * @returns {void}
     * @private
     */
    Print.prototype.print = function (maps, elements) {
        var printWindow = window.open('', 'print', 'height=' + window.outerHeight + ',width=' + window.outerWidth + ',tabbar=no');
        printWindow.moveTo(0, 0);
        printWindow.resizeTo(screen.availWidth, screen.availHeight);
        var argsData = {
            cancel: false, htmlContent: this.getHTMLContent(maps, elements), name: beforePrint
        };
        maps.trigger('beforePrint', argsData, function (beforePrintArgs) {
            if (!argsData.cancel) {
                print(argsData.htmlContent, printWindow);
            }
        });
    };
    /**
     * To get the html string of the Maps
     *
     * @param {Maps} maps -Specifies the Maps instance.
     * @param {string[] | string | Element} elements - Specifies the html element
     * @returns {Element} - Returns the div element
     * @private
     */
    Print.prototype.getHTMLContent = function (maps, elements) {
        var div = createElement('div');
        var divElement = maps.element.cloneNode(true);
        var backgroundElement = (!maps.isTileMap ? divElement.getElementsByTagName('svg')[0] : divElement.getElementsByTagName('svg')[1]);
        if (!isNullOrUndefined(backgroundElement)) {
            backgroundElement = backgroundElement.childNodes[0];
            if (!isNullOrUndefined(backgroundElement)) {
                var backgroundColor = backgroundElement.getAttribute('fill');
                if ((maps.theme === 'Tailwind' || maps.theme === 'Bootstrap5' || maps.theme === 'Fluent' || maps.theme === 'Material3') && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent')) {
                    backgroundElement.setAttribute('fill', 'rgba(255,255,255, 1)');
                }
                else if ((maps.theme === 'TailwindDark' || maps.theme === 'Bootstrap5Dark' || maps.theme === 'FluentDark' || maps.theme === 'Material3Dark') && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent')) {
                    backgroundElement.setAttribute('fill', 'rgba(0, 0, 0, 1)');
                }
            }
        }
        if (maps.isTileMap) {
            for (var i = 0; i < divElement.childElementCount; i++) {
                if (divElement.children[i].id === maps.element.id + '_tile_parent') {
                    divElement.children[i].style.removeProperty('height');
                    divElement.children[i].style.removeProperty('width');
                    divElement.children[i].style.removeProperty('top');
                    divElement.children[i].style.removeProperty('left');
                    divElement.children[i].style.removeProperty('right');
                    divElement.children[i].style.removeProperty('overflow');
                    var svgElement = document.getElementById(maps.element.id + '_Tile_SVG_Parent');
                    divElement.children[i].children[0].style.overflow = 'hidden';
                    divElement.children[i].children[0].style.position = 'absolute';
                    divElement.children[i].children[0].style.height = svgElement.style.height;
                    divElement.children[i].children[0].style.width = svgElement.style.width;
                    divElement.children[i].children[0].style.left = svgElement.style.left;
                    divElement.children[i].children[0].style.top = svgElement.style.top;
                    break;
                }
            }
        }
        if (elements) {
            if (elements instanceof Array) {
                Array.prototype.forEach.call(elements, function (value) {
                    div.appendChild(getElement(value).cloneNode(true));
                });
            }
            else if (elements instanceof Element) {
                div.appendChild(elements.cloneNode(true));
            }
            else {
                div.appendChild(getElement(elements).cloneNode(true));
            }
        }
        else {
            div.appendChild(divElement);
        }
        return div;
    };
    /**
     * Get module name.
     *
     * @returns {string} Returns the module name
     */
    Print.prototype.getModuleName = function () {
        return 'Print';
    };
    /**
     * To destroy the print.
     *
     * @returns {void}
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    Print.prototype.destroy = function () { };
    return Print;
}());

/**
 * This module enables the export to Image functionality in maps.
 *
 * @hidden
 */
var ImageExport = /** @__PURE__ @class */ (function () {
    /**
     * Constructor for Maps
     *
     * @param {Maps} control - Specifies the instance of the map
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    function ImageExport(control) {
    }
    /**
     * To export the file as image/svg format
     *
     * @param {Maps} maps - Specifies the Maps instance.
     * @param {ExportType} type - Specifies the type of the image file for exporting.
     * @param {string} fileName - Specifies the file name of the image file for exporting.
     * @param {boolean} allowDownload - Specifies whether to download image as a file or not.
     * @returns {Promise<string>} - Specifies the base64 string of the exported image which is returned when the allowDownload is set to false.
     * @private
     */
    ImageExport.prototype.export = function (maps, type, fileName, allowDownload) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
        var promise = new Promise(function (resolve, reject) {
            var imageCanvasElement = createElement('canvas', {
                id: 'ej2-canvas',
                attrs: {
                    'width': maps.availableSize.width.toString(),
                    'height': maps.availableSize.height.toString()
                }
            });
            var isDownload = !(Browser.userAgent.toString().indexOf('HeadlessChrome') > -1);
            var svgParent = document.getElementById(maps.element.id + '_Tile_SVG_Parent');
            var svgDataElement;
            var tileSvg;
            var svgObject = getElementByID(maps.element.id + '_svg').cloneNode(true);
            var backgroundElement = svgObject.childNodes[0];
            var backgroundColor = backgroundElement.getAttribute('fill');
            if ((maps.theme === 'Tailwind' || maps.theme === 'Bootstrap5' || maps.theme === 'Fluent' || maps.theme === 'Material3') && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent')) {
                svgObject.childNodes[0].setAttribute('fill', 'rgba(255,255,255, 1)');
            }
            else if ((maps.theme === 'TailwindDark' || maps.theme === 'Bootstrap5Dark' || maps.theme === 'FluentDark' || maps.theme === 'Material3Dark') && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent')) {
                svgObject.childNodes[0].setAttribute('fill', 'rgba(0, 0, 0, 1)');
            }
            if (!maps.isTileMap) {
                svgDataElement = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
                    svgObject.outerHTML + '</svg>';
            }
            else {
                tileSvg = getElementByID(maps.element.id + '_Tile_SVG').cloneNode(true);
                svgDataElement = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
                    svgObject.outerHTML + tileSvg.outerHTML + '</svg>';
            }
            var url = window.URL.createObjectURL(new Blob(type === 'SVG' ? [svgDataElement] :
                [(new XMLSerializer()).serializeToString(svgObject)], { type: 'image/svg+xml' }));
            if (type === 'SVG') {
                if (allowDownload) {
                    triggerDownload(fileName, type, url, isDownload);
                }
                else {
                    resolve(null);
                }
            }
            else {
                var image_1 = new Image();
                var ctxt_1 = imageCanvasElement.getContext('2d');
                if (!maps.isTileMap) {
                    image_1.onload = (function () {
                        ctxt_1.drawImage(image_1, 0, 0);
                        window.URL.revokeObjectURL(url);
                        if (allowDownload) {
                            triggerDownload(fileName, type, imageCanvasElement.toDataURL('image/png').replace('image/png', 'image/octet-stream'), isDownload);
                        }
                        else {
                            if (type === 'PNG') {
                                resolve(imageCanvasElement.toDataURL('image/png'));
                            }
                            else if (type === 'JPEG') {
                                resolve(imageCanvasElement.toDataURL('image/jpeg'));
                            }
                        }
                    });
                    image_1.src = url;
                }
                else {
                    maps.isExportInitialTileMap = true;
                    var svgParentElement = document.getElementById(maps.element.id + '_MapAreaBorder');
                    var top_1 = parseFloat(svgParentElement.getAttribute('y'));
                    var left_1 = parseFloat(svgParentElement.getAttribute('x'));
                    var imgxHttp = new XMLHttpRequest();
                    var imgTileLength_1 = maps.mapLayerPanel.tiles.length;
                    var _loop_1 = function (i) {
                        var tile = document.getElementById(maps.element.id + '_tile_' + (i - 1));
                        var exportTileImg = new Image();
                        exportTileImg.crossOrigin = 'Anonymous';
                        var background = maps.background ? maps.background : ((maps.theme === 'Tailwind' || maps.theme === 'Bootstrap5' || maps.theme === 'Fluent' || maps.theme === 'Material3') && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent')) ? '#ffffff' :
                            (maps.theme === 'TailwindDark' || maps.theme === 'Bootstrap5Dark' || maps.theme === 'FluentDark' || maps.theme === 'Material3Dark') && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent') ? '#000000' : '#ffffff';
                        ctxt_1.fillStyle = background;
                        ctxt_1.fillRect(0, 0, maps.availableSize.width, maps.availableSize.height);
                        ctxt_1.font = maps.titleSettings.textStyle.size + ' Arial';
                        var titleElement = document.getElementById(maps.element.id + '_Map_title');
                        if (!isNullOrUndefined(titleElement)) {
                            ctxt_1.fillStyle = titleElement.getAttribute('fill');
                            ctxt_1.fillText(maps.titleSettings.text, parseFloat(titleElement.getAttribute('x')), parseFloat(titleElement.getAttribute('y')));
                        }
                        exportTileImg.onload = (function () {
                            if (i === 0 || i === imgTileLength_1 + 1) {
                                if (i === 0) {
                                    ctxt_1.setTransform(1, 0, 0, 1, 0, 0);
                                    ctxt_1.rect(0, top_1, parseFloat(svgParent.style.width), parseFloat(svgParent.style.height));
                                    ctxt_1.clip();
                                }
                                else {
                                    ctxt_1.setTransform(1, 0, 0, 1, left_1, top_1);
                                }
                            }
                            else {
                                ctxt_1.setTransform(1, 0, 0, 1, parseFloat(tile.style.left) + left_1, parseFloat(tile.style.top) +
                                    top_1);
                            }
                            ctxt_1.drawImage(exportTileImg, 0, 0);
                            if (i === imgTileLength_1 + 1) {
                                localStorage.setItem('local-canvasImage', imageCanvasElement.toDataURL('image/png'));
                                var localBase64 = localStorage.getItem('local-canvasImage');
                                if (allowDownload) {
                                    triggerDownload(fileName, type, localBase64, isDownload);
                                    localStorage.removeItem('local-canvasImage');
                                    maps.isExportInitialTileMap = false;
                                }
                                else {
                                    maps.isExportInitialTileMap = false;
                                    if (type === 'PNG') {
                                        resolve(localBase64);
                                    }
                                    else if (type === 'JPEG') {
                                        resolve(imageCanvasElement.toDataURL('image/jpeg'));
                                    }
                                }
                            }
                        });
                        if (i === 0 || i === imgTileLength_1 + 1) {
                            if (i === 0) {
                                exportTileImg.src = url;
                            }
                            else {
                                setTimeout(function () {
                                    exportTileImg.src = window.URL.createObjectURL(new Blob([(new XMLSerializer()).serializeToString(tileSvg)], { type: 'image/svg+xml' }));
                                }, 300);
                            }
                        }
                        else {
                            imgxHttp.open('GET', tile.children[0].getAttribute('src'), true);
                            imgxHttp.send();
                            exportTileImg.src = tile.children[0].getAttribute('src');
                        }
                    };
                    for (var i = 0; i <= imgTileLength_1 + 1; i++) {
                        _loop_1(i);
                    }
                }
            }
        });
        return promise;
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name
     */
    ImageExport.prototype.getModuleName = function () {
        return 'ImageExport';
    };
    /**
     * To destroy the ImageExport.
     *
     * @returns {void}
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    ImageExport.prototype.destroy = function () { };
    return ImageExport;
}());

/**
 * This module enables the export to PDF functionality in maps.
 *
 * @hidden
 */
var PdfExport = /** @__PURE__ @class */ (function () {
    /**
     * Constructor for Maps
     *
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    function PdfExport() {
    }
    /**
     * To export the file as image/svg format
     *
     * @param {Maps} maps - Specifies the Maps instance.
     * @param {ExportType} type - Specifies the type of the document.
     * @param {string} fileName - Specifies the name of the PDF document.
     * @param {boolean} allowDownload - Specifies whether to download the document or not.
     * @param {PdfPageOrientation} orientation - Specifies the orientation of the PDF document to export the maps.
     * @returns {Promise<string>} - Returns "null" value when the allowDownload is set to false.
     * @private
     */
    PdfExport.prototype.export = function (maps, type, fileName, allowDownload, orientation) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var promise = new Promise(function (resolve, reject) {
            if (maps.isTileMap) {
                maps.isExportInitialTileMap = true;
            }
            var canvasElement = createElement('canvas', {
                id: 'ej2-canvas',
                attrs: {
                    'width': maps.availableSize.width.toString(),
                    'height': maps.availableSize.height.toString()
                }
            });
            orientation = isNullOrUndefined(orientation) ? PdfPageOrientation.Landscape : orientation;
            var svgParent = document.getElementById(maps.element.id + '_Tile_SVG_Parent');
            var svgData;
            var exportElement = maps.svgObject.cloneNode(true);
            var backgroundElement = exportElement.childNodes[0];
            var backgroundColor = backgroundElement.getAttribute('fill');
            if ((maps.theme === 'Tailwind' || maps.theme === 'Bootstrap5' || maps.theme === 'Fluent' || maps.theme === 'Material3') && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent')) {
                exportElement.childNodes[0].setAttribute('fill', 'rgba(255,255,255, 1)');
            }
            else if ((maps.theme === 'TailwindDark' || maps.theme === 'Bootstrap5Dark' || maps.theme === 'FluentDark' || maps.theme === 'Material3Dark') && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent')) {
                exportElement.childNodes[0].setAttribute('fill', 'rgba(0, 0, 0, 1)');
            }
            var url = window.URL.createObjectURL(new Blob(type === 'SVG' ? [svgData] :
                [(new XMLSerializer()).serializeToString(exportElement)], { type: 'image/svg+xml' }));
            var pdfDocument = new PdfDocument();
            var image = new Image();
            var ctx = canvasElement.getContext('2d');
            if (!maps.isTileMap) {
                image.onload = (function () {
                    ctx.drawImage(image, 0, 0);
                    window.URL.revokeObjectURL(url);
                    if (type === 'PDF') {
                        var imageString = canvasElement.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
                        pdfDocument.pageSettings.orientation = orientation;
                        imageString = imageString.slice(imageString.indexOf(',') + 1);
                        pdfDocument.pages.add().graphics.drawImage(new PdfBitmap(imageString), 0, 0, (maps.availableSize.width - 60), maps.availableSize.height);
                        if (allowDownload) {
                            pdfDocument.save(fileName + '.pdf');
                            pdfDocument.destroy();
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
                image.src = url;
            }
            else {
                var svgParentElement = document.getElementById(maps.element.id + '_MapAreaBorder');
                var top_1 = parseFloat(svgParentElement.getAttribute('y'));
                var left_1 = parseFloat(svgParentElement.getAttribute('x'));
                var xHttp = new XMLHttpRequest();
                var tileLength_1 = maps.mapLayerPanel.tiles.length;
                var _loop_1 = function (i) {
                    var tile = document.getElementById(maps.element.id + '_tile_' + (i - 1));
                    var tileImg = new Image();
                    tileImg.crossOrigin = 'Anonymous';
                    var background = maps.background ? maps.background : ((maps.theme === 'Tailwind' || maps.theme === 'Bootstrap5' || maps.theme === 'Fluent' || maps.theme === 'Material3') && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent')) ? '#ffffff' :
                        (maps.theme === 'TailwindDark' || maps.theme === 'Bootstrap5Dark' || maps.theme === 'FluentDark' || maps.theme === 'Material3Dark') && (backgroundColor === 'rgba(255,255,255, 0.0)' || backgroundColor === 'transparent') ? '#000000' : '#ffffff';
                    ctx.fillStyle = background;
                    ctx.fillRect(0, 0, maps.availableSize.width, maps.availableSize.height);
                    ctx.font = maps.titleSettings.textStyle.size + ' Arial';
                    var titleElement = document.getElementById(maps.element.id + '_Map_title');
                    if (!isNullOrUndefined(titleElement)) {
                        ctx.fillStyle = titleElement.getAttribute('fill');
                        ctx.fillText(maps.titleSettings.text, parseFloat(titleElement.getAttribute('x')), parseFloat(titleElement.getAttribute('y')));
                    }
                    tileImg.onload = (function () {
                        if (i === 0 || i === tileLength_1 + 1) {
                            if (i === 0) {
                                ctx.setTransform(1, 0, 0, 1, 0, 0);
                                ctx.rect(0, top_1, parseFloat(svgParent.style.width), parseFloat(svgParent.style.height));
                                ctx.clip();
                            }
                            else {
                                ctx.setTransform(1, 0, 0, 1, left_1, top_1);
                            }
                        }
                        else {
                            ctx.setTransform(1, 0, 0, 1, parseFloat(tile.style.left) + left_1, parseFloat(tile.style.top) + top_1);
                        }
                        ctx.drawImage(tileImg, 0, 0);
                        if (i === tileLength_1 + 1) {
                            if (type === 'PDF') {
                                localStorage.setItem('saved-image-example', canvasElement.toDataURL('image/jpeg'));
                                var x = localStorage.getItem('saved-image-example');
                                pdfDocument.pageSettings.orientation = orientation;
                                x = x.slice(x.indexOf(',') + 1);
                                pdfDocument.pages.add().graphics.drawImage(new PdfBitmap(x), 0, 0, (maps.availableSize.width - 60), maps.availableSize.height);
                                maps.isExportInitialTileMap = false;
                                if (allowDownload) {
                                    pdfDocument.save(fileName + '.pdf');
                                    pdfDocument.destroy();
                                }
                                else {
                                    resolve(null);
                                }
                            }
                        }
                    });
                    if (i === 0 || i === tileLength_1 + 1) {
                        if (i === 0) {
                            tileImg.src = url;
                        }
                        else {
                            setTimeout(function () {
                                var tileSvg = document.getElementById(maps.element.id + '_Tile_SVG');
                                tileImg.src = window.URL.createObjectURL(new Blob([(new XMLSerializer()).serializeToString(tileSvg)], { type: 'image/svg+xml' }));
                            }, 300);
                        }
                    }
                    else {
                        xHttp.open('GET', tile.children[0].getAttribute('src'), true);
                        xHttp.send();
                        tileImg.src = tile.children[0].getAttribute('src');
                    }
                };
                for (var i = 0; i <= tileLength_1 + 1; i++) {
                    _loop_1(i);
                }
            }
        });
        return promise;
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name
     */
    PdfExport.prototype.getModuleName = function () {
        return 'PdfExport';
    };
    /**
     * To destroy the PdfExport.
     *
     * @returns {void}
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    PdfExport.prototype.destroy = function () { };
    return PdfExport;
}());

/**
 * export all modules from maps component
 */

/**
 * exporting all modules from maps index
 */

export { Maps, load, loaded, click, onclick, rightClick, doubleClick, resize, tooltipRender, shapeSelected, shapeHighlight, mousemove, mouseup, mousedown, layerRendering, shapeRendering, markerRendering, markerClusterRendering, markerClick, markerDragStart, markerDragEnd, markerClusterClick, markerMouseMove, markerClusterMouseMove, dataLabelRendering, bubbleRendering, bubbleClick, bubbleMouseMove, animationComplete, legendRendering, annotationRendering, itemSelection, itemHighlight, beforePrint, zoomIn, zoomOut, pan, Annotation, Arrow, Font, ZoomToolbarButtonSettings, ZoomToolbarTooltipSettings, ZoomToolbarSettings, Border, CenterPosition, TooltipSettings, Margin, ConnectorLineSettings, MarkerClusterSettings, MarkerClusterData, ColorMappingSettings, InitialMarkerSelectionSettings, InitialShapeSelectionSettings, SelectionSettings, HighlightSettings, NavigationLineSettings, BubbleSettings, CommonTitleSettings, SubTitleSettings, TitleSettings, ZoomSettings, ToggleLegendSettings, LegendSettings, DataLabelSettings, ShapeSettings, MarkerBase, MarkerSettings, LayerSettings, Tile, MapsAreaSettings, Size, stringToNumber, calculateSize, createSvg, getMousePosition, degreesToRadians, radiansToDegrees, convertGeoToPoint, convertTileLatLongToPoint, xToCoordinate, yToCoordinate, aitoff, roundTo, sinci, acos, calculateBound, triggerDownload, Point, MinMax, GeoLocation, measureText, TextOption, PathOption, ColorValue, RectOption, CircleOption, PolygonOption, PolylineOption, LineOption, Line, MapLocation, Rect, PatternOptions, renderTextElement, convertElement, formatValue, convertStringToValue, convertElementFromLabel, drawSymbols, getValueFromObject, markerColorChoose, markerShapeChoose, clusterTemplate, mergeSeparateCluster, clusterSeparate, marker, markerTemplate, maintainSelection, maintainStyleClass, appendShape, drawCircle, drawRectangle, drawPath, drawPolygon, drawPolyline, drawLine, calculateShapes, drawDiamond, drawTriangle, drawCross, drawHorizontalLine, drawVerticalLine, drawStar, drawBalloon, drawPattern, getFieldData, checkShapeDataFields, checkPropertyPath, filter, getRatioOfBubble, findMidPointOfPolygon, isCustomPath, textTrim, findPosition, removeElement, calculateCenterFromPixel, getTranslate, getZoomTranslate, fixInitialScaleForTile, getElementByID, getClientElement, Internalize, getTemplateFunction, getElement, getShapeData, triggerShapeEvent, getElementsByClassName, querySelector, getTargetElement, createStyle, customizeStyle, triggerItemSelectionEvent, removeClass, elementAnimate, timeout, showTooltip, wordWrap, createTooltip, getHexColor, drawSymbol, renderLegendShape, getElementOffset, changeBorderWidth, changeNavaigationLineWidth, targetTouches, calculateScale, getDistance, getTouches, getTouchCenter, sum, zoomAnimate, animate, MapAjax, smoothTranslate, compareZoomFactor, calculateZoomLevel, processResult, LayerPanel, Bubble, BingMap, Marker, ColorMapping, DataLabel, NavigationLine, Legend, Highlight, Selection, MapsTooltip, Zoom, Annotations, Print, ImageExport, PdfExport };
//# sourceMappingURL=ej2-maps.es5.js.map
