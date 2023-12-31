/**
 * Specifies Circular-Gauge Common Helper methods
 */
import { CircularGauge } from '../circular-gauge';
import { Range, Axis } from '../axes/axis';
import { IVisiblePointer } from '../model/interface';
import { FontModel, BorderModel } from '../model/base-model';
/**
 * Function to measure the height and width of the text.
 *
 * @param  {string} text - Specifies the text.
 * @param  {FontModel} font - Specifies the font.
 * @returns {Size} - Returns the size of the text.
 * @private
 */
export declare function measureText(text: string, font: FontModel): Size;
/**
 * Function to find number from string
 *
 * @param {string} value - Specifies the value.
 * @param {number} maxDimension - Specifies the  maximum dimension.
 * @returns {number} - Returns the number.
 * @private
 */
export declare function toPixel(value: string, maxDimension: number): number;
/**
 * Function to get the style from FontModel.
 *
 * @param {FontModel} font - Specifies the font.
 * @returns {string} - Returns the string.
 * @private
 */
export declare function getFontStyle(font: FontModel): string;
/**
 * Function to create the text element.
 *
 * @param {TextOption} options - Specifies the options.
 * @param {FontModel} font - Specifies the font.
 * @param {string} color - Specifies the color.
 * @param {HTMLElement | Element} parent - Specifies the html element.
 * @param {string} styles - Specifies the style.
 * @returns {Element} - Returns the element.
 * @private
 */
export declare function textElement(options: TextOption, font: FontModel, color: string, parent: HTMLElement | Element, styles?: string): Element;
/**
 * Function to append the path to the element.
 *
 * @param {PathOption} options - Specifies the options.
 * @param {Element} element - Specifies the element.
 * @param {CircularGauge} gauge - Specifies the gauge.
 * @param {string} functionName - Specifies the function name.
 * @returns {Element} - Returns the element.
 * @private
 */
export declare function appendPath(options: PathOption, element: Element, gauge: CircularGauge, functionName?: string): Element;
/**
 * Function to check whether it's a complete circle for circular gauge.
 *
 * @param {number} startAngle - Specifies the startAngle.
 * @param {number} endAngle - Specifies the endAngle.
 * @returns {boolean} Returns the boolean value.
 * @private
 */
export declare function isCompleteAngle(startAngle: number, endAngle: number): boolean;
/**
 * Function to get the degree for circular gauge.
 *
 * @param {number} startAngle - Specifies the startAngle.
 * @param {number} endAngle - Specifies the endAngle.
 * @returns {number} - Returns the number.
 * @private
 */
export declare function getDegree(startAngle: number, endAngle: number): number;
/**
 * Function to get the angle from value for circular gauge.
 *
 * @param {number} value - Specifies the value.
 * @param {number} maximumValue - Specifies the maximumValue.
 * @param {number} minimumValue - Specifies the minimumValue.
 * @param {number} startAngle - Specifies the startAngle.
 * @param {number} endAngle - Specifies the endAngle.
 * @param {boolean} isClockWise - Specifies the isClockWise.
 * @returns {number} - Returns the number.
 * @private
 */
export declare function getAngleFromValue(value: number, maximumValue: number, minimumValue: number, startAngle: number, endAngle: number, isClockWise: boolean): number;
/**
 * Function to get angle from location for circular gauge.
 *
 * @param {GaugeLocation} center - Specifies the center.
 * @param {GaugeLocation} point - Specifies the point.
 * @returns {number} - Returns the number.
 * @private
 */
export declare function getAngleFromLocation(center: GaugeLocation, point: GaugeLocation): number;
/**
 * Function to get the location from angle for circular gauge.
 *
 * @param {number} degree - Specifies the degree.
 * @param {number} radius - Specifies the radius.
 * @param {GaugeLocation} center - Specifies the center.
 * @returns {GaugeLocation} - Returns the gauge location.
 * @private
 */
export declare function getLocationFromAngle(degree: number, radius: number, center: GaugeLocation): GaugeLocation;
/**
 * Function to get the path direction of the circular gauge.
 *
 * @param {GaugeLocation} center - Specifies the center.
 * @param {number} start - Specifies the start.
 * @param {number} end - Specifies the end.
 * @param {number} radius - Specifies the radius.
 * @param {number} startWidth - Specifies the startWidth.
 * @param {number} endWidth - Specifies the endWidth.
 * @param {Range} range - Specifies the range.
 * @param {Axis} axis - Specifies the axis.
 * @returns {string} - Returns the string.
 * @private
 */
export declare function getPathArc(center: GaugeLocation, start: number, end: number, radius: number, startWidth?: number, endWidth?: number, range?: Range, axis?: Axis): string;
/**
 * Function to get the range path arc direction of the circular gauge.
 *
 * @param {GaugeLocation} start - Specifies the start.
 * @param {GaugeLocation} end - Specifies the end.
 * @param {number} radius - Specifies the radius.
 * @param {number} arcStartOne - Specifies the arcStartOne.
 * @param {number} arcEndOne - Specifies the arcEndOne.
 * @param {number} arcStartTwo - Specifies the arcStartTwo.
 * @param {number} arcEndTwo - Specifies the arcEndTwo.
 * @param {number} clockWise - Specifies the clockWise.
 * @param {GaugeLocation} innerStart - Specifies the innerStart.
 * @param {GaugeLocation} innerEnd - Specifies the innerEnd.
 * @param {GaugeLocation} pointPosition - Specifies the pointPosition.
 * @returns {string} - Returns the string.
 * @private
 */
export declare function arcPath(start: GaugeLocation, end: GaugeLocation, radius: number, arcStartOne: number, arcEndOne: number, arcStartTwo: number, arcEndTwo: number, clockWise: number, innerStart: GaugeLocation, innerEnd: GaugeLocation, pointPosition: GaugeLocation): string;
/**
 * Function to get the range path arc direction of the circular gauge.
 *
 * @param {GaugeLocation} start - Specifies the start.
 * @param {GaugeLocation} end - Specifies the end.
 * @param {number} radius - Specifies the radius.
 * @param {GaugeLocation} outerOldEnd - Specifies the outerOldEnd.
 * @param {GaugeLocation} innerOldEnd - Specifies the innerOldEnd.
 * @param {number} arcStartOne - Specifies the arcStartOne.
 * @param {number} arcEndOne - Specifies the arcEndOne.
 * @param {number} arcStartTwo - Specifies the arcStartTwo.
 * @param {number} arcEndTwo - Specifies the arcEndTwo.
 * @param {number} clockWise - Specifies the clockWise.
 * @param {GaugeLocation} innerStart - Specifies the innerStart.
 * @param {GaugeLocation} innerEnd - Specifies the innerEnd.
 * @param {GaugeLocation} innerOldStart - Specifies the innerOldStart.
 * @param {GaugeLocation} outerOldStart - Specifies the outerOldStart.
 * @param {GaugeLocation} pointPosition - Specifies the pointPosition.
 * @returns {string} - Returns the string.
 * @private
 */
export declare function arcRoundedPath(start: GaugeLocation, end: GaugeLocation, radius: number, outerOldEnd: GaugeLocation, innerOldEnd: GaugeLocation, arcStartOne: number, arcEndOne: number, arcStartTwo: number, arcEndTwo: number, clockWise: number, innerStart: GaugeLocation, innerEnd: GaugeLocation, innerOldStart: GaugeLocation, outerOldStart: GaugeLocation, pointPosition: GaugeLocation): string;
/**
 * Function to get the range path direction for different start and end width of the circular gauge.
 *
 * @param {GaugeLocation} start - Specifies the options.
 * @param {GaugeLocation} end - Specifies the end.
 * @param {GaugeLocation} innerStart - Specifies the innerStart.
 * @param {GaugeLocation} innerEnd - Specifies the innerEnd.
 * @param {number} radius - Specifies the radius.
 * @param {number} startRadius - Specifies the startRadius.
 * @param {number} endRadius - Specifies the endRadius.
 * @param {number} clockWise - Specifies the clockWise.
 * @returns {string} - Returns the string.
 * @private
 */
export declare function arcWidthPath(start: GaugeLocation, end: GaugeLocation, innerStart: GaugeLocation, innerEnd: GaugeLocation, radius: number, startRadius: number, endRadius: number, clockWise: number): string;
/**
 * Function to get the range path direction of the circular gauge.
 *
 * @param {GaugeLocation} start - Specifies the start values.
 * @param {GaugeLocation} end - Specifies the end values.
 * @param {GaugeLocation} innerStart - Specifies the innerStart values.
 * @param {GaugeLocation} innerEnd - Specifies the innerEnd values.
 * @param {number} radius - Specifies the radius value.
 * @param {number} startRadius - Specifies the startRadius value.
 * @param {number} endRadius - Specifies the endRadius value.
 * @param {number} arcRadius - Specifies the arcRadius value.
 * @param {number} clockWise - Specifies the clockWise value.
 * @param {GaugeLocation} center - Specifies the center value.
 * @param {number} degree - Specifies the degree value.
 * @param {Range} range - Specifies the range value.
 * @param {Axis} axis - Specifies the axis value.
 * @returns {string} - Returns the string value.
 * @private
 */
export declare function getRangePath(start: GaugeLocation, end: GaugeLocation, innerStart: GaugeLocation, innerEnd: GaugeLocation, radius: number, startRadius: number, endRadius: number, arcRadius: number, clockWise: number, center: GaugeLocation, degree: number, range?: Range, axis?: Axis): string;
/**
 * Function to get start and end width range path calculation to the circular gauge.
 *
 * @param {GaugeLocation} start - Specifies the start value.
 * @param {GaugeLocation} end - Specifies the end value.
 * @param {GaugeLocation} innerStart - Specifies the innerStart value.
 * @param {GaugeLocation} innerEnd - Specifies the innerEnd value.
 * @param {number} radius - Specifies the radius value.
 * @param {number} startRadius - Specifies the startRadius value.
 * @param {number} endRadius - Specifies the endRadius value.
 * @param {number} arcRadius - Specifies the arcRadius value.
 * @param {number} clockWise - Specifies the clockWise value.
 * @param {GaugeLocation} center - Specifies the center value.
 * @param {GaugeLocation} outerOldEnd - Specifies the outerOldEnd value.
 * @param {GaugeLocation} innerOldEnd - Specifies the innerOldEnd value.
 * @param {GaugeLocation} outerOldStart - Specifies the outerOldStart value.
 * @param {GaugeLocation} innerOldStart - Specifies the innerOldStart value.
 * @param {number} startWidth - Specifies the startWidth value.
 * @param {number} endWidth - Specifies the endWidth value.
 * @param {number} degree - Specifies the degree value.
 * @param {Range} range - Specifies the range value.
 * @param {Axis} axis - Specifies the axis value.
 * @returns {string} - Returns the svg path.
 * @private
 */
export declare function arcWidthPathCalculation(start: GaugeLocation, end: GaugeLocation, innerStart: GaugeLocation, innerEnd: GaugeLocation, radius: number, startRadius: number, endRadius: number, arcRadius: number, clockWise: number, center: GaugeLocation, outerOldEnd: GaugeLocation, innerOldEnd: GaugeLocation, outerOldStart: GaugeLocation, innerOldStart: GaugeLocation, startWidth: number, endWidth: number, degree: number, range?: Range, axis?: Axis): string;
/**
 * Function to get start and end width range rounded path calculation to the circular gauge.
 *
 * @param {GaugeLocation} start - Specifies the start value.
 * @param {GaugeLocation} end - Specifies the end value.
 * @param {GaugeLocation} innerStart - Specifies the innerStart value.
 * @param {GaugeLocation} innerEnd - Specifies the innerEnd value.
 * @param {number} radius - Specifies the radius value.
 * @param {number} startRadius - Specifies the startRadius value.
 * @param {number} endRadius - Specifies the endRadius value.
 * @param {number} clockWise - Specifies the clockWise value.
 * @param {GaugeLocation} outerOldEnd - Specifies the outerOldEnd value.
 * @param {GaugeLocation} innerOldEnd - Specifies the innerOldEnd value.
 * @param {GaugeLocation} outerOldStart - Specifies the outerOldStart value.
 * @param {GaugeLocation} innerOldStart - Specifies the innerOldStart value.
 * @returns {string} - Returns the path value.
 * @private
 */
export declare function roundedArcWidthPathCalculation(start: GaugeLocation, end: GaugeLocation, innerStart: GaugeLocation, innerEnd: GaugeLocation, radius: number, startRadius: number, endRadius: number, clockWise: number, outerOldEnd: GaugeLocation, innerOldEnd: GaugeLocation, outerOldStart: GaugeLocation, innerOldStart: GaugeLocation): string;
/**
 * Function to get the rounded path direction of the circular gauge.
 *
 * @param {GaugeLocation} center - Specifies the center value.
 * @param {number} actualStart - Specifies the actualStart value.
 * @param {number} actualEnd - Specifies the actualEnd value.
 * @param {number} oldStart - Specifies the oldStart value.
 * @param {number} oldEnd - Specifies the oldEnd value.
 * @param {number} radius - Specifies the radius value.
 * @param {number} startWidth - Specifies the startWidth value.
 * @param {number} endWidth - Specifies the endWidth value.
 * @param {Range} range - Specifies the range value.
 * @param {Axis} axis - Specifies the axis value.
 * @returns {string} - Returns the path value.
 * @private
 */
export declare function getRoundedPathArc(center: GaugeLocation, actualStart: number, actualEnd: number, oldStart: number, oldEnd: number, radius: number, startWidth?: number, endWidth?: number, range?: Range, axis?: Axis): string;
/**
 * Function to get the circular path direction of the circular gauge.
 *
 * @param {GaugeLocation} start - Specifies the start value.
 * @param {GaugeLocation} end - Specifies the end value.
 * @param {number} radius - Specifies the radius value.
 * @param {number} clockWise - Specifies the clockWise.
 * @returns {string} - Returns the path.
 * @private
 */
export declare function getCirclePath(start: GaugeLocation, end: GaugeLocation, radius: number, clockWise: number): string;
/**
 * Function to compile the template function for circular gauge.
 *
 * @param {string} template - Specifies the template.
 * @param {CircularGauge} gauge - Specifies the gauge instance.
 * @returns {Function} - Returns the template function.
 * @private
 */
export declare function getTemplateFunction(template: string | Function, gauge: CircularGauge): any;
/**
 * Function to remove the element from id.
 *
 * @param {string} id Specifies the id
 * @returns {void}
 * @private
 */
export declare function removeElement(id: string): void;
/**
 * Function to get element from id.
 *
 * @param {string} id - Specifies the id.
 * @returns {Element} - Returns the element.
 * @private
 */
export declare function getElement(id: string): Element;
/**
 * Function to convert the number from string.
 *
 * @param {string} value - Specifies the value.
 * @param {number} containerSize - Specifies the container size.
 * @returns {number} - Returns the number.
 * @private
 */
export declare function stringToNumber(value: string, containerSize: number): number;
/**
 * Function to get current point for circular gauge using element id.
 *
 * @param {string} targetId - Specifies the target id.
 * @param {CircularGauge} gauge - Specifies the gauge instance.
 * @returns {IVisiblePointer} - Returns the pointer and axis index.
 * @private
 */
export declare function getPointer(targetId: string, gauge: CircularGauge): IVisiblePointer;
/**
 * Function to convert the label using format for cirular gauge.
 *
 * @param {string} format - Specifies the format.
 * @returns {string} - Returns th string.
 * @private
 */
export declare function getLabelFormat(format: string): string;
/**
 * Function to calculate the marker shape for circular gauge.
 *
 * @param {GaugeLocation} location - Specifies the location.
 * @param {string} shape - Specifies the shape.
 * @param {Size} size - Specifies the size.
 * @param {string} url - Specifies the url.
 * @param {PathOption} options - Specifies the path option.
 * @returns {PathOption} - Returns the path.
 * @private
 */
export declare function calculateShapes(location: GaugeLocation, shape: string, size: Size, url: string, options: PathOption): PathOption;
/** @private */
export declare class CustomizeOption {
    id: string;
    constructor(id?: string);
}
/** @private */
export declare class PathOption extends CustomizeOption {
    opacity: number;
    fill: string;
    stroke: string;
    ['stroke-width']: number;
    ['stroke-dasharray']: string;
    d: string;
    transform: string;
    style: string;
    constructor(id: string, fill: string, width: number, color: string, opacity?: number, dashArray?: string, d?: string, transform?: string, style?: string);
}
/** @private */
export declare class RectOption extends CustomizeOption {
    x: number;
    y: number;
    height: number;
    width: number;
    opacity: number;
    fill: string;
    stroke: string;
    ['stroke-width']: number;
    ['stroke-dasharray']: string;
    constructor(id: string, fill: string, border: BorderModel, opacity: number, rect: Rect);
}
/**
 * Specifies the size information of an element.
 */
export declare class Size {
    /**
     * Specifies the height of an element.
     */
    height: number;
    /**
     * Specifies the width of an element.
     */
    width: number;
    constructor(width: number, height: number);
}
/**
 * Specifies the location of the element in the circular gauge.
 */
export declare class GaugeLocation {
    /**
     * Specifies the x position of the location in pixels.
     */
    x: number;
    /**
     * Specifies the y position of the location in pixels.
     */
    y: number;
    constructor(x: number, y: number);
}
/** @private */
export declare class Rect {
    x: number;
    y: number;
    height: number;
    width: number;
    constructor(x: number, y: number, width: number, height: number);
}
/** @private */
export declare class TextOption extends CustomizeOption {
    anchor: string;
    text: string;
    transform: string;
    x: number;
    y: number;
    baseLine: string;
    constructor(id?: string, x?: number, y?: number, anchor?: string, text?: string, transform?: string, baseLine?: string);
}
/** @private */
export declare class VisibleLabels {
    text: string;
    value: number;
    size: Size;
    constructor(text: string, value: number, size?: Size);
}
