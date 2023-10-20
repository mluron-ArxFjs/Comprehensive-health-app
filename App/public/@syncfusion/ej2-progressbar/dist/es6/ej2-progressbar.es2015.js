import { Animation, Browser, ChildProperty, Collection, Complex, Component, Event, EventHandler, NotifyPropertyChanges, Property, createElement, isNullOrUndefined, remove } from '@syncfusion/ej2-base';
import { PathOption, SvgRenderer, Tooltip, getElement, measureText } from '@syncfusion/ej2-svg-base';

/* eslint-disable security/detect-unsafe-regex */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable valid-jsdoc */
/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */
/**
 * helper for progress bar
 */
/** @private */
class Rect {
    constructor(x, y, height, width) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }
}
/** @private */
class Size {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
}
/** @private */
class Pos {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
/** @private */
class RectOption extends PathOption {
    constructor(id, fill, width, color, opacity, rect, rx, ry, transform, dashArray) {
        super(id, fill, width, color, opacity, dashArray);
        this.y = rect.y;
        this.x = rect.x;
        this.height = rect.height;
        this.width = rect.width;
        this.rx = rx ? rx : 0;
        this.ry = ry ? ry : 0;
        this.transform = transform ? transform : '';
        this.stroke = (width !== 0 && this.stroke !== '') ? color : 'transparent';
    }
}
/** @private */
class ColorValue {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}
/** @private */
function convertToHexCode(value) {
    return '#' + componentToHex(value.r) + componentToHex(value.g) + componentToHex(value.b);
}
/** @private */
function componentToHex(value) {
    const hex = value.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}
/** @private */
function convertHexToColor(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? new ColorValue(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)) :
        new ColorValue(255, 255, 255);
}
/** @private */
function colorNameToHex(color) {
    color = color === 'transparent' ? 'white' : color;
    document.body.appendChild(createElement('text', { id: 'chartmeasuretext' }));
    const element = document.getElementById('chartmeasuretext');
    element.style.color = color;
    color = window.getComputedStyle(element).color;
    remove(element);
    const exp = /^(rgb|hsl)(a?)[(]\s*([\d.]+\s*%?)\s*,\s*([\d.]+\s*%?)\s*,\s*([\d.]+\s*%?)\s*(?:,\s*([\d.]+)\s*)?[)]$/;
    const isRGBValue = exp.exec(color);
    return convertToHexCode(new ColorValue(parseInt(isRGBValue[3], 10), parseInt(isRGBValue[4], 10), parseInt(isRGBValue[5], 10)));
}
/** @private */
class TextOption {
    constructor(id, fontSize, fontStyle, fontFamily, fontWeight, textAnchor, fill, x, y, width, height) {
        this.id = id;
        this['font-size'] = fontSize;
        this['font-style'] = fontStyle;
        this['font-family'] = fontFamily;
        this['font-weight'] = fontWeight;
        this['text-anchor'] = textAnchor;
        this.fill = fill;
        this.x = x;
        this.y = y;
        this.width = width ? width : 0;
        this.height = height ? height : 0;
    }
}
/** calculate the start and end point of circle */
function degreeToLocation(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180);
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}
/** calculate the path of the circle */
function getPathArc(x, y, radius, startAngle, endAngle, enableRtl, pieView) {
    const start = degreeToLocation(x, y, radius, startAngle);
    const end = degreeToLocation(x, y, radius, endAngle);
    let largeArcFlag = '0';
    const sweepFlag = (enableRtl) ? '0' : '1';
    if (!enableRtl) {
        largeArcFlag = ((endAngle >= startAngle) ? endAngle : endAngle + 360) - startAngle <= 180 ? '0' : '1';
    }
    else {
        largeArcFlag = ((startAngle >= endAngle) ? startAngle : startAngle + 360) - endAngle <= 180 ? '0' : '1';
    }
    let d;
    if (pieView) {
        d = 'M ' + x + ' ' + y + ' L ' + start.x + ' ' + start.y + ' A ' + radius + ' ' +
            radius + ' ' + ' 0 ' + ' ' + largeArcFlag + ' ' + sweepFlag + ' ' + end.x + ' ' + end.y + ' ' + 'Z';
    }
    else {
        d = 'M' + start.x + ' ' + start.y +
            'A' + radius + ' ' + radius + ' ' + '0' + ' ' + largeArcFlag + ' ' + sweepFlag + ' ' + end.x + ' ' + end.y;
    }
    return d;
}
/** @private */
function stringToNumber(value, containerSize) {
    if (value !== null && value !== undefined) {
        return value.indexOf('%') !== -1 ? (containerSize / 100) * parseInt(value, 10) : parseInt(value, 10);
    }
    return null;
}
/** @private */
function setAttributes(options, element) {
    const keys = Object.keys(options);
    for (let i = 0; i < keys.length; i++) {
        element.setAttribute(keys[i], options[keys[i]]);
    }
    return element;
}
/**
 * Animation Effect Calculation
 *
 * @private
 */
function effect(currentTime, startValue, endValue, duration, enableRtl) {
    const start = (enableRtl) ? endValue : -endValue;
    const end = startValue + ((enableRtl) ? -endValue : endValue);
    return start * Math.cos(currentTime / duration * (Math.PI / 2)) + end;
}
/**
 * @private
 */
const annotationRender = 'annotationRender';
/**
 * @private
 */
function getElement$1(id) {
    return document.getElementById(id);
}
/**
 * @private
 */
function removeElement(id) {
    if (!id) {
        return null;
    }
    const element = typeof id === 'string' ? getElement$1(id) : id;
    if (element) {
        remove(element);
    }
}
/**
 * @private
 */
class ProgressLocation {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * progress bar complex interface
 */
class Margin extends ChildProperty {
}
__decorate$1([
    Property(10)
], Margin.prototype, "top", void 0);
__decorate$1([
    Property(10)
], Margin.prototype, "bottom", void 0);
__decorate$1([
    Property(10)
], Margin.prototype, "left", void 0);
__decorate$1([
    Property(10)
], Margin.prototype, "right", void 0);
/**
 * Configures the fonts in progressbar
 */
class Font extends ChildProperty {
}
__decorate$1([
    Property('Normal')
], Font.prototype, "fontStyle", void 0);
__decorate$1([
    Property('16px')
], Font.prototype, "size", void 0);
__decorate$1([
    Property('Normal')
], Font.prototype, "fontWeight", void 0);
__decorate$1([
    Property('')
], Font.prototype, "color", void 0);
__decorate$1([
    Property('Segoe UI')
], Font.prototype, "fontFamily", void 0);
__decorate$1([
    Property(null)
], Font.prototype, "opacity", void 0);
__decorate$1([
    Property('Far')
], Font.prototype, "textAlignment", void 0);
__decorate$1([
    Property('')
], Font.prototype, "text", void 0);
/**
 * Animation
 */
class Animation$1 extends ChildProperty {
}
__decorate$1([
    Property(false)
], Animation$1.prototype, "enable", void 0);
__decorate$1([
    Property(2000)
], Animation$1.prototype, "duration", void 0);
__decorate$1([
    Property(0)
], Animation$1.prototype, "delay", void 0);
/**
 * Annotation
 */
class ProgressAnnotationSettings extends ChildProperty {
}
__decorate$1([
    Property(null)
], ProgressAnnotationSettings.prototype, "content", void 0);
__decorate$1([
    Property(0)
], ProgressAnnotationSettings.prototype, "annotationAngle", void 0);
__decorate$1([
    Property('0%')
], ProgressAnnotationSettings.prototype, "annotationRadius", void 0);
/**
 * Configures the borders .
 */
class Border extends ChildProperty {
}
__decorate$1([
    Property('')
], Border.prototype, "color", void 0);
__decorate$1([
    Property(1)
], Border.prototype, "width", void 0);
/**
 *  Options to customize the tooltip for the progress bar.
 *
 *  @default {}
 */
class TooltipSettings extends ChildProperty {
}
__decorate$1([
    Property(false)
], TooltipSettings.prototype, "enable", void 0);
__decorate$1([
    Property(null)
], TooltipSettings.prototype, "fill", void 0);
__decorate$1([
    Property(null)
], TooltipSettings.prototype, "format", void 0);
__decorate$1([
    Property(false)
], TooltipSettings.prototype, "showTooltipOnHover", void 0);
__decorate$1([
    Complex({ fontFamily: null, size: '12px', fontWeight: '400', fontStyle: 'Normal', color: null }, Font)
], TooltipSettings.prototype, "textStyle", void 0);
__decorate$1([
    Complex({ color: '#cccccc', width: 0.5 }, Border)
], TooltipSettings.prototype, "border", void 0);
/**
 * RangeColor
 */
class RangeColor extends ChildProperty {
}
__decorate$1([
    Property('')
], RangeColor.prototype, "color", void 0);
__decorate$1([
    Property(null)
], RangeColor.prototype, "start", void 0);
__decorate$1([
    Property(null)
], RangeColor.prototype, "end", void 0);

/** @private */
function getProgressThemeColor(theme) {
    let style;
    switch (theme) {
        case 'Material':
            style = {
                linearTrackColor: '#E3165B',
                linearProgressColor: '#E3165B',
                circularTrackColor: '#E3165B',
                circularProgressColor: '#E3165B',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 0.26,
                bufferOpacity: 0.4,
                linearGapWidth: 4,
                circularGapWidth: 4,
                linearTrackThickness: 4,
                linearProgressThickness: 4,
                circularTrackThickness: 4,
                circularProgressThickness: 4,
                tooltipFill: '#ffffff',
                tooltipLightLabel: '#000000',
                success: '#4caf50',
                danger: '#ff6652',
                warning: '#ff9800',
                info: '#03a9f4',
                tooltipLabelFont: {
                    color: 'rgba(249, 250, 251, 1)', fontFamily: 'Roboto'
                },
                linearLabelFont: {
                    size: '10', fontWeight: '400', color: '#000000', fontStyle: 'Normal', fontFamily: 'Roboto'
                },
                circularLabelFont: {
                    size: '12', fontWeight: '500', color: '#000000', fontStyle: 'Normal', fontFamily: 'Roboto'
                }
            };
            break;
        case 'Bootstrap':
            style = {
                linearTrackColor: '#EEEEEE',
                linearProgressColor: '#317ab9',
                circularTrackColor: '#EEEEEE',
                circularProgressColor: '#317ab9',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 1,
                bufferOpacity: 0.44,
                linearGapWidth: 4,
                circularGapWidth: 4,
                linearTrackThickness: 20,
                linearProgressThickness: 20,
                circularTrackThickness: 6,
                circularProgressThickness: 6,
                tooltipFill: '#ffffff',
                tooltipLightLabel: '#000000',
                success: '#48b14c',
                danger: '#d44f4f',
                warning: '#fac168',
                info: '#2aaac0',
                tooltipLabelFont: {
                    color: '#F9FAFB', fontFamily: 'Helvetica Neue'
                },
                linearLabelFont: {
                    size: '10', fontWeight: '400', color: '#000000', fontStyle: 'Normal', fontFamily: 'Helvetica Neue'
                },
                circularLabelFont: {
                    size: '12', fontWeight: '500', color: '#000000', fontStyle: 'Normal', fontFamily: 'Helvetica Neue'
                }
            };
            break;
        case 'Bootstrap4':
            style = {
                linearTrackColor: '#E9ECEF',
                linearProgressColor: '#007bff',
                circularTrackColor: '#E9ECEF',
                circularProgressColor: '#007bff',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 1,
                bufferOpacity: 0.44,
                linearGapWidth: 4,
                circularGapWidth: 4,
                linearTrackThickness: 16,
                linearProgressThickness: 16,
                circularTrackThickness: 6,
                circularProgressThickness: 6,
                tooltipFill: '#ffffff',
                tooltipLightLabel: '#000000',
                success: '#28a745',
                danger: '#dc3545',
                warning: '#ffc107',
                info: '#17a2b8',
                tooltipLabelFont: {
                    color: '#F9FAFB', fontFamily: 'Helvetica Neue'
                },
                linearLabelFont: {
                    size: '10', fontWeight: '400', color: '#000000', fontStyle: 'Normal', fontFamily: 'Helvetica Neue'
                },
                circularLabelFont: {
                    size: '12', fontWeight: '500', color: '#000000', fontStyle: 'Normal', fontFamily: 'Helvetica Neue'
                }
            };
            break;
        case 'HighContrast':
            style = {
                linearTrackColor: '#BFBFBF',
                linearProgressColor: '#FFD939',
                circularTrackColor: '#BFBFBF',
                circularProgressColor: '#FFD939',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 1,
                bufferOpacity: 0.35,
                linearGapWidth: 2,
                circularGapWidth: 4,
                linearTrackThickness: 2,
                linearProgressThickness: 2,
                circularTrackThickness: 4,
                circularProgressThickness: 4,
                tooltipFill: '#ffffff',
                tooltipLightLabel: '#000000',
                success: '#2bc700',
                danger: '#ff6161',
                warning: '#ff7d1a',
                info: '#66b0ff',
                tooltipLabelFont: {
                    color: '#000000', fontFamily: 'Segoe UI'
                },
                linearLabelFont: {
                    size: '10', fontWeight: '400', color: '#FFFFFF', fontStyle: 'Normal', fontFamily: 'Segoe UI'
                },
                circularLabelFont: {
                    size: '12', fontWeight: '500', color: '#FFFFFF', fontStyle: 'Normal', fontFamily: 'Segoe UI'
                }
            };
            break;
        case 'Tailwind':
            style = {
                linearTrackColor: '#E5E7EB',
                linearProgressColor: '#4F46E5',
                circularTrackColor: '#E5E7EB',
                circularProgressColor: '#4F46E5',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 1,
                bufferOpacity: 0.35,
                linearGapWidth: 2,
                circularGapWidth: 4,
                linearTrackThickness: 2,
                linearProgressThickness: 2,
                circularTrackThickness: 4,
                circularProgressThickness: 4,
                tooltipFill: '#ffffff',
                tooltipLightLabel: '#000000',
                success: '#15803D',
                danger: '#DC2626',
                warning: '#C2410C',
                info: '#0E7490',
                tooltipLabelFont: {
                    color: '#F9FAFB', fontFamily: 'Inter'
                },
                linearLabelFont: {
                    size: '10', fontWeight: '400', color: '#FFFFFF', fontStyle: 'Normal', fontFamily: 'Inter'
                },
                circularLabelFont: {
                    size: '12', fontWeight: '500', color: '#FFFFFF', fontStyle: 'Normal', fontFamily: 'Inter'
                }
            };
            break;
        case 'TailwindDark':
            style = {
                linearTrackColor: '#4B5563',
                linearProgressColor: '#22D3EE',
                circularTrackColor: '#4B5563',
                circularProgressColor: '#22D3EE',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 1,
                bufferOpacity: 0.45,
                linearGapWidth: 2,
                circularGapWidth: 4,
                linearTrackThickness: 2,
                linearProgressThickness: 2,
                circularTrackThickness: 4,
                circularProgressThickness: 4,
                tooltipFill: '#ffffff',
                tooltipLightLabel: '#000000',
                success: '#22C55E',
                danger: '#F87171',
                warning: '#ea580c',
                info: '#06B6D4',
                tooltipLabelFont: {
                    color: '#1F2937', fontFamily: 'Inter'
                },
                linearLabelFont: {
                    size: '10', fontWeight: '400', color: '#D1D5DB', fontStyle: 'Normal', fontFamily: 'Inter'
                },
                circularLabelFont: {
                    size: '12', fontWeight: '500', color: '#D1D5DB', fontStyle: 'Normal', fontFamily: 'Inter'
                }
            };
            break;
        case 'FabricDark':
        case 'BootstrapDark':
        case 'MaterialDark':
            style = {
                linearTrackColor: '#C8C8C8',
                linearProgressColor: '#9A9A9A',
                circularTrackColor: '#C8C8C8',
                circularProgressColor: '#9A9A9A',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 1,
                bufferOpacity: 0.44,
                linearGapWidth: 2,
                circularGapWidth: 4,
                linearTrackThickness: 16,
                linearProgressThickness: 16,
                circularTrackThickness: 4,
                circularProgressThickness: 4,
                tooltipFill: '#ffffff',
                tooltipLightLabel: '#000000',
                success: '#22b24b',
                danger: '#ac2a2a',
                warning: '#ffca1c',
                info: '#489bd5',
                tooltipLabelFont: {
                    color: theme === 'BootstrapDark' ? '#1A1A1A' : theme === 'FabricDark' ? '#DADADA' : 'rgba(18, 18, 18, 1)', fontFamily: theme === 'BootstrapDark' ? 'Helvetica Neue' : theme === 'FabricDark' ? 'Segoe UI' : 'Roboto'
                },
                linearLabelFont: {
                    size: '10', fontWeight: '400', color: '#000000', fontStyle: 'Normal', fontFamily: theme === 'BootstrapDark' ? 'Helvetica Neue' : theme === 'FabricDark' ? 'Segoe UI' : 'Roboto'
                },
                circularLabelFont: {
                    size: '12', fontWeight: '500', color: '#000000', fontStyle: 'Normal', fontFamily: theme === 'BootstrapDark' ? 'Helvetica Neue' : theme === 'FabricDark' ? 'Segoe UI' : 'Roboto'
                }
            };
            break;
        case 'Bootstrap5':
            style = {
                linearTrackColor: '#E9ECEF',
                linearProgressColor: '#0D6EFD',
                circularTrackColor: '#E9ECEF',
                circularProgressColor: '#0D6EFD',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 1,
                bufferOpacity: 0.44,
                linearGapWidth: 4,
                circularGapWidth: 4,
                linearTrackThickness: 16,
                linearProgressThickness: 16,
                circularTrackThickness: 4,
                circularProgressThickness: 4,
                tooltipFill: '#ffffff',
                tooltipLightLabel: '#000000',
                success: '#198754',
                danger: '#DC3545',
                warning: '#FFC107',
                info: '#0DCAF0',
                tooltipLabelFont: {
                    color: '#F9FAFB', fontFamily: 'Helvetica Neue'
                },
                linearLabelFont: {
                    size: '10', fontWeight: '400', color: '#0D6EFD', fontStyle: 'Normal', fontFamily: 'Helvetica Neue'
                },
                circularLabelFont: {
                    size: '12', fontWeight: '500', color: '#0D6EFD', fontStyle: 'Normal', fontFamily: 'Helvetica Neue'
                }
            };
            break;
        case 'Bootstrap5Dark':
            style = {
                linearTrackColor: '#3B4248',
                linearProgressColor: '#0D6EFD',
                circularTrackColor: '#3B4248',
                circularProgressColor: '#0D6EFD',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 1,
                bufferOpacity: 0.4,
                linearGapWidth: 4,
                circularGapWidth: 4,
                linearTrackThickness: 16,
                linearProgressThickness: 16,
                circularTrackThickness: 4,
                circularProgressThickness: 4,
                tooltipFill: '#ffffff',
                tooltipLightLabel: '#000000',
                success: '#21B26F',
                danger: '#E4606D',
                warning: '#FFC107',
                info: '#0DCAF0',
                tooltipLabelFont: {
                    color: '#212529', fontFamily: 'Helvetica Neue'
                },
                linearLabelFont: {
                    size: '10', fontWeight: '400', color: '#0D6EFD', fontStyle: 'Normal', fontFamily: 'Helvetica Neue'
                },
                circularLabelFont: {
                    size: '12', fontWeight: '500', color: '#0D6EFD', fontStyle: 'Normal', fontFamily: 'Helvetica Neue'
                }
            };
            break;
        case 'Fluent':
            style = {
                linearTrackColor: '#F3F2F1',
                linearProgressColor: '#0D6EFD',
                circularTrackColor: '#F3F2F1',
                circularProgressColor: '#0D6EFD',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 1,
                bufferOpacity: 0.45,
                linearGapWidth: 4,
                circularGapWidth: 4,
                linearTrackThickness: 16,
                linearProgressThickness: 16,
                circularTrackThickness: 4,
                circularProgressThickness: 4,
                tooltipFill: '#ffffff',
                tooltipLightLabel: '#000000',
                success: '#0B6A0B',
                danger: '#D13438',
                warning: '#CA5010',
                info: '#038387',
                tooltipLabelFont: {
                    color: '#323130', fontFamily: 'Segoe UI'
                },
                linearLabelFont: {
                    size: '10', fontWeight: '400', color: '#0D6EFD', fontStyle: 'Normal', fontFamily: 'Segoe UI'
                },
                circularLabelFont: {
                    size: '12', fontWeight: '500', color: '#0D6EFD', fontStyle: 'Normal', fontFamily: 'Segoe UI'
                }
            };
            break;
        case 'FluentDark':
            style = {
                linearTrackColor: '#3B4248',
                linearProgressColor: '#0D6EFD',
                circularTrackColor: '#3B4248',
                circularProgressColor: '#0D6EFD',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 1,
                bufferOpacity: 0.35,
                linearGapWidth: 4,
                circularGapWidth: 4,
                linearTrackThickness: 16,
                linearProgressThickness: 16,
                circularTrackThickness: 4,
                circularProgressThickness: 4,
                tooltipFill: '#ffffff',
                tooltipLightLabel: '#000000',
                success: '#0B6A0B',
                danger: '#D13438',
                warning: '#CA5010',
                info: '#038387',
                tooltipLabelFont: {
                    color: '#F3F2F1', fontFamily: 'Segoe UI'
                },
                linearLabelFont: {
                    size: '10', fontWeight: '400', color: '#0D6EFD', fontStyle: 'Normal', fontFamily: 'Segoe UI'
                },
                circularLabelFont: {
                    size: '12', fontWeight: '500', color: '#0D6EFD', fontStyle: 'Normal', fontFamily: 'Segoe UI'
                }
            };
            break;
        case 'Material3':
            style = {
                linearTrackColor: '#E7E0EC',
                linearProgressColor: '#6750A4',
                circularTrackColor: '#E7E0EC',
                circularProgressColor: '#6750A4',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 1,
                bufferOpacity: 0.24,
                linearGapWidth: 4,
                circularGapWidth: 4,
                linearTrackThickness: 4,
                linearProgressThickness: 4,
                circularTrackThickness: 4,
                circularProgressThickness: 4,
                tooltipFill: '#313033',
                tooltipLightLabel: '#F4EFF4',
                success: '#0B6A0B',
                danger: '#D13438',
                warning: '#CA5010',
                info: '#038387',
                tooltipLabelFont: {
                    size: '12px', fontWeight: '400', color: '#F4EFF4', fontStyle: 'Normal', fontFamily: 'Roboto'
                },
                linearLabelFont: {
                    size: '10', fontWeight: '400', color: '#FFFFFF', fontStyle: 'Normal', fontFamily: 'Roboto'
                },
                circularLabelFont: {
                    size: '12', fontWeight: '500', color: '#6750A4', fontStyle: 'Normal', fontFamily: 'Roboto'
                }
            };
            break;
        case 'Material3Dark':
            style = {
                linearTrackColor: '#49454F',
                linearProgressColor: '#D0BCFF',
                circularTrackColor: '#49454F',
                circularProgressColor: '#D0BCFF',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 1,
                bufferOpacity: 0.24,
                linearGapWidth: 4,
                circularGapWidth: 4,
                linearTrackThickness: 4,
                linearProgressThickness: 4,
                circularTrackThickness: 4,
                circularProgressThickness: 4,
                tooltipFill: '#E6E1E5',
                tooltipLightLabel: '#313033',
                success: '#0B6A0B',
                danger: '#D13438',
                warning: '#CA5010',
                info: '#038387',
                tooltipLabelFont: {
                    color: '#313033', fontFamily: 'roboto'
                },
                linearLabelFont: {
                    size: '10', fontWeight: '400', color: '#371E73', fontStyle: 'Normal', fontFamily: 'Roboto'
                },
                circularLabelFont: {
                    size: '12', fontWeight: '500', color: '#D0BCFF', fontStyle: 'Normal', fontFamily: 'Roboto'
                }
            };
            break;
        default:
            style = {
                linearTrackColor: '#EAEAEA',
                linearProgressColor: '#0078D6',
                circularTrackColor: '#E6E6E6',
                circularProgressColor: '#0078D6',
                backgroundColor: 'transparent',
                progressOpacity: 1,
                trackOpacity: 1,
                bufferOpacity: 0.3,
                linearGapWidth: 2,
                circularGapWidth: 4,
                linearTrackThickness: 2,
                linearProgressThickness: 2,
                circularTrackThickness: 4,
                circularProgressThickness: 4,
                tooltipFill: '#ffffff',
                tooltipLightLabel: '#000000',
                success: '#166600',
                danger: '#b30900',
                warning: '#944000',
                info: '#0056b3',
                tooltipLabelFont: {
                    color: '#333333', fontFamily: 'Segoe UI'
                },
                linearLabelFont: {
                    size: '10', fontWeight: '400', color: null, fontStyle: 'Normal', fontFamily: 'Segoe UI'
                },
                circularLabelFont: {
                    size: '12', fontWeight: '500', color: null, fontStyle: 'Normal', fontFamily: 'Segoe UI'
                }
            };
            break;
    }
    return style;
}

/**
 * corner Radius
 */
const lineCapRadius = 0.9;
/**
 * complete Angle
 */
const completeAngle = 359.99;
/**
 * valueChanged event
 */
const valueChanged = 'valueChanged';
/**
 * progressCompleted event
 */
const progressCompleted = 'progressCompleted';
/**
 * mouseClick event
 */
const mouseClick = 'mouseClick';
/**
 * mouseDown event
 */
const mouseDown = 'mouseDown';
/**
 * mouseUp event
 */
const mouseUp = 'mouseUp';
/**
 * mouseMove event
 */
const mouseMove = 'mouseMove';
/**
 * mouseLeave event
 */
const mouseLeave = 'mouseLeave';
/**
 * svgLink
 */
const svgLink = 'http://www.w3.org/2000/svg';
/**
 * gradient type
 */
const gradientType = 'linearGradient';
/**
 * stop element
 */
const stopElement = 'stop';
/**
 * Render for the tooltip.
 */
const tooltipRender = 'tooltipRender';

/**
 * Base file for annotation
 */
class AnnotationBase {
    /**
     * Constructor for progress annotation
     *
     * @param {ProgressBar} control It called constructor
     */
    constructor(control) {
        this.control = control;
    }
    render(annotation, index) {
        this.annotation = annotation;
        const childElement = createElement('div', {
            id: this.control.element.id + 'Annotation' + index,
            styles: 'position:absolute;z-index:1', innerHTML: annotation.content
        });
        return childElement;
    }
    /**
     * To process the annotation
     *
     * @param {ProgressAnnotationSettings} annotation One of the parameter called annotation
     * @param {number} index Index of the annotation
     * @param {HTMLElement} parentElement Parent element of the annotation
     */
    processAnnotation(annotation, index, parentElement) {
        const location = new ProgressLocation(0, 0);
        const annotationElement = this.render(annotation, index);
        if (annotationElement) {
            this.setElementStyle(location, annotationElement, parentElement);
        }
        else if (this.control.redraw) {
            removeElement(annotationElement.id);
            // tslint:disable-next-line:no-any
            if (this.control.isReact) {
                this.control.clearTemplate();
            }
        }
    }
    setElementStyle(location, element, parentElement) {
        const argsData = {
            cancel: false, name: annotationRender, content: element,
            location: location
        };
        this.control.trigger(annotationRender, argsData);
        if (!argsData.cancel) {
            const result = this.Location(this.annotation.annotationRadius, this.annotation.annotationAngle);
            argsData.content.style.left = result.left + 'px';
            argsData.content.style.top = result.top + 'px';
            argsData.content.style.transform = 'translate(-50%, -50%)';
            argsData.content.setAttribute('aria-label', 'Annotation');
            parentElement.appendChild(argsData.content);
            // tslint:disable-next-line:no-any
            if (this.control.isReact) {
                this.control.renderReactTemplates();
            }
        }
    }
    Location(radius, angle) {
        let top;
        let left;
        const radius1 = parseFloat(radius);
        if (radius1 === 0 && angle === 0) {
            const rect = this.control.progressRect;
            left = rect.x + (rect.width / 2);
            top = rect.y + (rect.height / 2);
        }
        else {
            const degToRadFactor = Math.PI / 180;
            angle = angle - 90;
            angle = angle * degToRadFactor;
            const x = Math.round(this.control.progressSize.width / 2.25);
            const y = Math.round(this.control.progressSize.height / 2.25);
            left = (radius1 * Math.cos(angle)) + x;
            top = (radius1 * Math.sin(angle)) + y;
        }
        return {
            top: top, left: left
        };
    }
}

/* eslint-disable valid-jsdoc */
/* eslint-disable jsdoc/require-param */
/**
 * Animation for progress bar
 */
class ProgressAnimation {
    /** Linear Animation */
    doLinearAnimation(element, progress, delay, previousWidth, active) {
        const animation = new Animation({});
        const linearPath = element;
        const duration = (progress.isActive) ? 3000 : progress.animation.duration;
        const width = linearPath.getAttribute('width');
        const x = linearPath.getAttribute('x');
        let opacityValue = 0;
        let value = 0;
        const start = (!progress.enableRtl || (progress.cornerRadius === 'Round4px')) ? previousWidth : parseInt(x, 10);
        const end = (!progress.enableRtl || (progress.cornerRadius === 'Round4px')) ? parseInt(width, 10) - start :
            parseInt(width, 10) - previousWidth;
        const rtlX = parseInt(x, 10) - end;
        linearPath.style.visibility = 'hidden';
        animation.animate(linearPath, {
            duration: duration,
            delay: delay,
            progress: (args) => {
                progress.cancelResize = true;
                if (progress.enableRtl && !(progress.cornerRadius === 'Round4px')) {
                    if (args.timeStamp >= args.delay) {
                        linearPath.style.visibility = 'visible';
                        if (progress.isActive) {
                            value = this.activeAnimate((args.timeStamp / args.duration), parseInt(x, 10), parseInt(width, 10), true);
                            opacityValue = effect(args.timeStamp, 0.5, 0.5, args.duration, true);
                            active.setAttribute('opacity', opacityValue.toString());
                            linearPath.setAttribute('x', value.toString());
                        }
                        else {
                            value = effect(args.timeStamp, start, end, args.duration, true);
                            linearPath.setAttribute('x', value.toString());
                        }
                    }
                }
                else {
                    if (args.timeStamp >= args.delay) {
                        linearPath.style.visibility = 'visible';
                        if (progress.isActive) {
                            value = this.activeAnimate((args.timeStamp / args.duration), 0, parseInt(width, 10), false);
                            opacityValue = effect(args.timeStamp, 0.5, 0.5, args.duration, true);
                            active.setAttribute('opacity', opacityValue.toString());
                            linearPath.setAttribute('width', value.toString());
                        }
                        else {
                            value = effect(args.timeStamp, start, end, args.duration, false);
                            linearPath.setAttribute('width', value.toString());
                        }
                    }
                }
            },
            end: () => {
                progress.cancelResize = false;
                linearPath.style.visibility = '';
                if (progress.enableRtl && !(progress.cornerRadius === 'Round4px')) {
                    if (progress.isActive) {
                        linearPath.setAttribute('x', x.toString());
                        this.doLinearAnimation(element, progress, delay, previousWidth, active);
                    }
                    else {
                        linearPath.setAttribute('x', rtlX.toString());
                    }
                }
                else {
                    linearPath.setAttribute('width', width);
                    if (progress.isActive) {
                        this.doLinearAnimation(element, progress, delay, previousWidth, active);
                    }
                }
                progress.trigger('animationComplete', {
                    value: progress.value, trackColor: progress.trackColor,
                    progressColor: progress.progressColor
                });
            }
        });
    }
    /** Linear Indeterminate */
    doLinearIndeterminate(element, progressWidth, thickness, progress, clipPath) {
        const animation = new Animation({});
        const linearPath = element;
        const x = linearPath.getAttribute('x');
        const width = linearPath.getAttribute('width');
        let value = 0;
        const start = (width) ? -(parseInt(width, 10)) : -progressWidth;
        const end = (progress.progressRect.x + progress.progressRect.width) + ((width) ? (parseInt(width, 10)) : progressWidth);
        const duration = (!progress.enableProgressSegments) ? progress.animation.duration : progress.animation.duration + 1000;
        animation.animate(clipPath, {
            duration: duration,
            delay: 0,
            progress: (args) => {
                if (progress.enableRtl && !(progress.cornerRadius === 'Round4px')) {
                    value = effect(args.timeStamp, parseInt(x, 10) || progress.progressRect.x + progressWidth, end, args.duration, true);
                    if (!progress.enableProgressSegments) {
                        linearPath.setAttribute('x', value.toString());
                    }
                    else {
                        linearPath.setAttribute('d', progress.getPathLine(value, progressWidth, thickness));
                    }
                }
                else {
                    value = effect(args.timeStamp, start, end, args.duration, false);
                    if (!progress.enableProgressSegments) {
                        linearPath.setAttribute('x', value.toString());
                    }
                    else {
                        linearPath.setAttribute('d', progress.getPathLine(value, progressWidth, thickness));
                    }
                }
            },
            end: () => {
                if (progress.enableRtl && !progress.enableProgressSegments && !(progress.cornerRadius === 'Round4px')) {
                    linearPath.setAttribute('x', x.toString());
                }
                else if (!progress.enableProgressSegments) {
                    linearPath.setAttribute('x', start.toString());
                }
                if (!progress.destroyIndeterminate) {
                    this.doLinearIndeterminate(element, progressWidth, thickness, progress, clipPath);
                }
            }
        });
    }
    /** Linear striped */
    doStripedAnimation(element, progress, value) {
        const animation = new Animation({});
        const point = 1000 / progress.animation.duration;
        animation.animate(element, {
            duration: progress.animation.duration,
            delay: progress.animation.delay,
            progress: () => {
                value += (progress.enableRtl) ? -point : point;
                element.setAttribute('gradientTransform', 'translate(' + value + ') rotate(-45)');
            },
            end: () => {
                if (!progress.destroyIndeterminate) {
                    this.doStripedAnimation(element, progress, value);
                }
            }
        });
    }
    /** Circular animation */
    doCircularAnimation(x, y, radius, progressEnd, totalEnd, element, progress, thickness, delay, startValue, previousTotal, active) {
        const animation = new Animation({});
        const circularPath = element;
        let start = progress.startAngle;
        const pathRadius = radius + (thickness / 2);
        let end = 0;
        let opacityValue = 0;
        const duration = (progress.isActive) ? 3000 : progress.animation.duration;
        start += (progress.cornerRadius === 'Round' && totalEnd !== completeAngle && totalEnd !== 0) ?
            ((progress.enableRtl) ? (lineCapRadius / 2) * thickness : -(lineCapRadius / 2) * thickness) : 0;
        totalEnd += (progress.cornerRadius === 'Round' && totalEnd !== completeAngle && totalEnd !== 0) ?
            (lineCapRadius / 2) * thickness : 0;
        progressEnd += (progress.cornerRadius === 'Round' && totalEnd !== completeAngle && totalEnd !== 0) ?
            ((progress.enableRtl) ? -(lineCapRadius / 2) * thickness : (lineCapRadius / 2) * thickness) : 0;
        const startPos = (!isNullOrUndefined(startValue)) ? startValue : start;
        const endPos = (!isNullOrUndefined(startValue)) ? totalEnd - previousTotal : totalEnd;
        circularPath.setAttribute('visibility', 'Hidden');
        animation.animate(circularPath, {
            duration: duration,
            delay: delay,
            progress: (args) => {
                progress.cancelResize = true;
                if (args.timeStamp >= args.delay) {
                    circularPath.setAttribute('visibility', 'visible');
                    if (progress.isActive) {
                        end = this.activeAnimate((args.timeStamp / args.duration), startPos, endPos, progress.enableRtl);
                        opacityValue = effect(args.timeStamp, 0.5, 0.5, args.duration, true);
                        active.setAttribute('opacity', opacityValue.toString());
                        circularPath.setAttribute('d', getPathArc(x, y, pathRadius, start, end % 360, progress.enableRtl, true));
                    }
                    else {
                        end = effect(args.timeStamp, startPos, endPos, args.duration, progress.enableRtl);
                        circularPath.setAttribute('d', getPathArc(x, y, pathRadius, start, end % 360, progress.enableRtl, true));
                    }
                }
            },
            end: () => {
                progress.cancelResize = false;
                circularPath.setAttribute('visibility', '');
                circularPath.setAttribute('d', getPathArc(x, y, pathRadius, start, progressEnd, progress.enableRtl, true));
                if (progress.isActive) {
                    this.doCircularAnimation(x, y, radius, progressEnd, totalEnd, element, progress, thickness, delay, startValue, previousTotal, active);
                }
                progress.trigger('animationComplete', {
                    value: progress.value, trackColor: progress.trackColor,
                    progressColor: progress.progressColor
                });
            }
        });
    }
    /** Circular indeterminate */
    doCircularIndeterminate(circularProgress, progress, start, end, x, y, radius, thickness, clipPath) {
        const animation = new Animation({});
        const pathRadius = radius + ((!progress.enableProgressSegments) ? (thickness / 2) : 0);
        const duration = progress.animation.duration;
        const value = (!progress.enableProgressSegments) ? 6000 / duration : 4000 / duration;
        animation.animate(clipPath, {
            progress: () => {
                circularProgress.style.visibility = 'visible';
                start += (progress.enableRtl) ? -value : value;
                end += (progress.enableRtl) ? -value : value;
                circularProgress.setAttribute('d', getPathArc(x, y, pathRadius, start % 360, end % 360, progress.enableRtl, !progress.enableProgressSegments));
            },
            end: () => {
                if (!progress.destroyIndeterminate) {
                    this.doCircularIndeterminate(circularProgress, progress, start, end, x, y, radius, thickness, clipPath);
                }
            }
        });
    }
    /** To do the label animation for progress bar */
    doLabelAnimation(labelPath, start, end, progress, delay, textSize) {
        const animation = new Animation({});
        const label = new Animation({});
        let startPos;
        let endPos;
        const text = labelPath.innerHTML;
        let value = 0;
        let xPos = 0;
        let valueChanged$$1 = 0;
        const percentage = 100;
        const labelText = progress.labelStyle.text;
        const labelPos = progress.labelStyle.textAlignment;
        const posX = parseInt(labelPath.getAttribute('x'), 10);
        labelPath.setAttribute('visibility', 'Hidden');
        if (progress.type === 'Linear') {
            startPos = (progress.enableRtl) ? (progress.progressRect.x + progress.progressRect.width) + (textSize / 2) :
                start - (textSize / 2);
            startPos = (startPos <= 0) ? 0 : startPos;
            endPos = (progress.enableRtl) ? startPos - posX : posX - startPos;
        }
        animation.animate(labelPath, {
            duration: progress.animation.duration,
            delay: delay,
            progress: (args) => {
                progress.cancelResize = true;
                args.name = 'SlideRight';
                if (progress.type === 'Linear') {
                    if (args.timeStamp >= args.delay) {
                        if (labelText === '') {
                            labelPath.setAttribute('visibility', 'visible');
                            value = effect(args.timeStamp, start, end, args.duration, false);
                            valueChanged$$1 = parseInt((((Math.round(value)) / progress.progressRect.width) * percentage).toString(), 10);
                            labelPath.innerHTML = valueChanged$$1.toString() + '%';
                            if (labelPos === 'Far' || labelPos === 'Center') {
                                xPos = effect(args.timeStamp, startPos, endPos, args.duration, progress.enableRtl);
                                labelPath.setAttribute('x', xPos.toString());
                            }
                        }
                    }
                }
                else if (progress.type === 'Circular') {
                    if (labelText === '') {
                        labelPath.setAttribute('visibility', 'visible');
                        value = effect(args.timeStamp, start, end - start, args.duration, false);
                        valueChanged$$1 = parseInt((((Math.round(value)) / progress.totalAngle) * percentage).toString(), 10);
                        labelPath.innerHTML = valueChanged$$1.toString() + '%';
                    }
                }
            },
            end: () => {
                progress.cancelResize = false;
                if (labelText === '') {
                    labelPath.innerHTML = text;
                    labelPath.setAttribute('x', posX.toString());
                }
                else {
                    label.animate(labelPath, {
                        progress: (args) => {
                            labelPath.setAttribute('visibility', 'visible');
                            value = effect(args.timeStamp, 0, 1, args.duration, false);
                            labelPath.setAttribute('opacity', value.toString());
                        },
                        end: () => {
                            labelPath.setAttribute('opacity', '1');
                        }
                    });
                }
            }
        });
    }
    /** To do the annotation animation for circular progress bar */
    doAnnotationAnimation(circularPath, progress, previousEnd, previousTotal) {
        const animation = new Animation({});
        let value = 0;
        const percentage = 100;
        const isAnnotation = progress.annotations.length > 0;
        let annotatElementChanged;
        let firstAnnotatElement;
        const start = progress.startAngle;
        const totalAngle = progress.totalAngle;
        let totalEnd;
        let annotateValueChanged;
        let annotateValue;
        if (isAnnotation && progress.progressAnnotationModule) {
            firstAnnotatElement = document.getElementById(progress.element.id + 'Annotation0').children[0];
            if (firstAnnotatElement && firstAnnotatElement.children[0]) {
                if (firstAnnotatElement.children[0].tagName === 'SPAN') {
                    annotatElementChanged = firstAnnotatElement.children[0];
                }
            }
        }
        totalEnd = ((progress.argsData.value - progress.minimum) / (progress.maximum - progress.minimum)) * progress.totalAngle;
        progress.annotateTotal = totalEnd =
            (progress.argsData.value < progress.minimum || progress.argsData.value > progress.maximum) ? 0 : totalEnd;
        progress.annotateEnd = start + totalEnd;
        annotateValue = ((progress.argsData.value - progress.minimum) / (progress.maximum - progress.minimum)) * percentage;
        annotateValue = (progress.argsData.value < progress.minimum || progress.argsData.value > progress.maximum) ? 0 :
            Math.round(annotateValue);
        const startValue = (!isNullOrUndefined(previousEnd)) ? previousEnd : start;
        const endValue = (!isNullOrUndefined(previousEnd)) ? totalEnd - previousTotal : totalEnd;
        if (progress.argsData.value <= progress.minimum || progress.argsData.value > progress.maximum) {
            annotatElementChanged.innerHTML = annotateValue + '%';
        }
        else {
            animation.animate(circularPath, {
                duration: progress.animation.duration,
                delay: progress.animation.delay,
                progress: (args) => {
                    progress.cancelResize = true;
                    if (isAnnotation && annotatElementChanged) {
                        value = effect(args.timeStamp, startValue, endValue, args.duration, false);
                        annotateValueChanged = parseInt((((Math.round(value) - start) / totalAngle) * percentage).toString(), 10);
                        annotatElementChanged.innerHTML = annotateValueChanged ? annotateValueChanged.toString() + '%' : '0%';
                    }
                },
                end: () => {
                    progress.cancelResize = false;
                    annotatElementChanged.innerHTML = annotateValue + '%';
                }
            });
        }
    }
    activeAnimate(t, start, end, enableRtl) {
        const time = 1 - Math.pow(1 - t, 3);
        const attrValue = start + ((!enableRtl) ? (time * end) : -(time * end));
        return attrValue;
    }
}

/**
 * Class for progress annotation
 */
class ProgressAnnotation extends AnnotationBase {
    /**
     * Constructor for ProgressBar annotation
     *
     * @private
     * @param {ProgressBar} control Passed the control
     * @param {annotations} annotations ProgressAnnotationSettings
     */
    constructor(control, annotations) {
        super(control);
        this.animation = new ProgressAnimation();
        this.progress = control;
        this.annotations = annotations;
    }
    /**
     * Method to render the annotation for ProgressBar
     *
     * @param {Element} element Annotation element.
     * @private
     */
    renderAnnotations(element) {
        this.annotations = this.progress.annotations;
        const parentElement = document.getElementById(this.progress.element.id + 'Annotation_collections');
        this.parentElement = parentElement ? parentElement : createElement('div', {
            id: this.progress.element.id + 'Annotation_collections',
            styles: 'position:absolute'
        });
        this.annotations.map((annotation, index) => {
            this.processAnnotation(annotation, index, this.parentElement);
        });
        if (!parentElement) {
            element.appendChild(this.parentElement);
        }
        if (this.progress.animation.enable && !this.progress.isIndeterminate) {
            this.animation.doAnnotationAnimation(this.progress.clipPath, this.progress);
        }
    }
    /**
     * Get module name.
     */
    getModuleName() {
        return 'ProgressAnnotation';
    }
    /**
     * To destroy the annotation.
     *
     * @returns {void}
     * @private
     */
    destroy() {
        // Destroy method performed here
    }
}

/**
 * class for tooltip.
 */
class ProgressTooltip {
    /**
     * Constructor for progress tooltip.
     *
     * @param {ProgressBar} control
     */
    constructor(control) {
        // Defines text collection passed to svg tooltip.
        this.text = [];
        this.control = control;
    }
    /**
     * Method to render the tooltip for progress bar.
     */
    tooltip(e) {
        const svgElement = document.getElementById(this.control.element.id + '_tooltip');
        const isTooltip = (svgElement && parseInt(svgElement.getAttribute('opacity'), 10) > 0);
        this.renderTooltip(e, this.control, !isTooltip);
        if (this.control.tooltip.enable && this.control.type === 'Circular' && this.control.animation.enable && !(this.control.tooltip.showTooltipOnHover)) {
            svgElement.style.visibility = 'hidden';
            const delay = this.control.secondaryProgress ? this.control.circular.delay + this.control.animation.duration :
                this.control.animation.duration;
            this.tooltipDelay(this.control, svgElement, delay);
        }
        if (this.control.animation.enable && !(this.control.tooltip.showTooltipOnHover) && !(this.control.type === 'Circular')) {
            const delay = this.control.secondaryProgress ? this.control.linear.delay : this.control.animation.delay;
            if (this.control.secondaryProgress) {
                svgElement.style.visibility = 'hidden';
            }
            this.toolTipAnimation(svgElement, this.control, delay);
        }
    }
    /**
     * Function to delay tooltip at initial stage of circular progress.
     */
    tooltipDelay(progress, element, delay) {
        const animation = new Animation({});
        animation.animate(element, {
            duration: progress.animation.duration,
            delay: delay,
            progress: (args) => {
                args.element.style.visibility = 'visible';
            }
        });
    }
    /**
     * Function to animate tooltip.
     */
    toolTipAnimation(element, progress, delay) {
        const animation = new Animation({});
        const endValue = parseInt(element.style.left, 10);
        const tooltipSVG = document.getElementById(this.control.element.id + '_tooltip_svg');
        const width = parseInt(tooltipSVG.getAttribute('width'), 10);
        animation.animate(element, {
            duration: progress.animation.duration,
            delay: delay,
            progress: (args) => {
                progress.cancelResize = true;
                args.name = 'SlideRight';
                if (progress.type === 'Linear') {
                    if (args.timeStamp >= args.delay) {
                        args.element.style.visibility = 'visible';
                        const value = effect(args.timeStamp, (0 - (width / 2 - this.control.progressRect.x - 5)), endValue + (width / 2 - this.control.progressRect.x - 5), args.duration, progress.enableRtl);
                        args.element.style.left = '';
                        args.element.style.left = value + 'px'.toString();
                    }
                }
            },
            end: (args) => {
                progress.cancelResize = false;
                args.element.style.left = '';
                args.element.style.left = endValue + 'px'.toString();
            }
        });
    }
    renderTooltip(e, chart, isFirst) {
        this.textFormat = this.format((this.control.tooltip.showTooltipOnHover) ? e.target.id.indexOf('Linearbuffer') >= 0 || e.target.id.indexOf('Circularbuffer') >= 0 ? this.control.secondaryProgress : this.control.value : this.control.value);
        this.triggerTooltipRender(e, isFirst, this.textFormat);
    }
    /**
     * Function to get format of tooltip text.
     */
    format(formatValue) {
        let currentFormat = formatValue.toString();
        let value;
        if (this.control.tooltip.format) {
            currentFormat = this.control.tooltip.format;
            value = new RegExp('${value' + '}', 'gm');
            currentFormat = currentFormat.replace(value.source, formatValue.toString());
        }
        return currentFormat;
    }
    /**
     * Function to remove tooltip.
     */
    removeTooltip(duration) {
        const tooltipElement = document.getElementById(this.control.element.id + '_tooltip');
        if (tooltipElement) {
            this.fadeInInterval = +setTimeout(() => {
                if (this.svgTooltip) {
                    this.svgTooltip.fadeOut();
                }
            }, duration);
        }
    }
    /**
     * Function to get arguments of tooltip.
     */
    triggerTooltipRender(e, isFirst, textCollection) {
        const padding = 5;
        const argsData = {
            cancel: false, name: tooltipRender, text: textCollection + '%'
        };
        this.control.trigger(tooltipRender, argsData);
        textCollection = argsData.text;
        if (!argsData.cancel) {
            this.text = [].concat(argsData.text);
            if (this.control.type === 'Linear') {
                const linearEndPointX = (this.control.linear.linearProgressWidth - padding / 2 + (this.control.progressRect.x));
                const linearEndPointY = (this.control.cornerRadius === 'Round4px') ? (this.control.progressRect.y + padding) : (this.control.progressRect.y + (this.control.progressRect.height / 2)) -
                    (this.control.progressThickness ? this.control.progressThickness : this.control.themeStyle.linearProgressThickness) / 2 +
                    padding;
                this.createTooltip(this.control, isFirst, (this.control.tooltip.enable && !this.control.tooltip.showTooltipOnHover || !(e.target.id.indexOf('Linearbuffer') >= 0)) ? (new ProgressLocation((this.control.cornerRadius === 'Round4px') ? linearEndPointX - padding : linearEndPointX, linearEndPointY)) : (new ProgressLocation(this.control.linear.bufferWidth - (padding / 2) + (this.control.progressRect.x), linearEndPointY)), this.control.initialClipRect);
            }
            else {
                const circularEndPointX = this.control.circular.endPosition.x - padding / 2;
                const circularEndPointY = this.control.circular.endPosition.y + this.control.progressRect.y - padding / 2;
                this.createTooltip(this.control, isFirst, (this.control.tooltip.enable && !this.control.tooltip.showTooltipOnHover || !(e.target.id.indexOf('Circularbuffer') >= 0)) ? (new ProgressLocation(circularEndPointX, circularEndPointY)) : (new ProgressLocation(this.control.circular.bufferEndPosition.x - padding / 2, this.control.circular.bufferEndPosition.y + this.control.progressRect.y - padding / 2)), this.control.initialClipRect);
            }
        }
        this.isRendered = true;
    }
    /**
     * Function to pass arguments into svg tooltip.
     */
    createTooltip(chart, isFirst, location, bounds) {
        if (isFirst) {
            this.svgTooltip = new Tooltip({
                opacity: this.control.tooltip.textStyle.opacity ? this.control.tooltip.textStyle.opacity : ((this.control.theme === 'Material3' || this.control.theme === 'Material3Dark') ? 1 : 0.75),
                header: '',
                content: this.text,
                fill: this.control.tooltip.fill,
                border: this.control.tooltip.border,
                enableAnimation: true,
                location: location,
                theme: this.control.theme,
                areaBounds: bounds,
                template: null,
                // To set tooltip location.
                offset: 7.5,
                // To set left and right margin of tooltip.
                marginX: 8,
                // To set top margin of tooltip.
                marginY: 4.5,
                textStyle: this.control.tooltip.textStyle,
                arrowPadding: 7,
                availableSize: this.control.progressSize,
                duration: 300,
                blazorTemplate: { name: 'Template', parent: this.control.tooltip },
                controlInstance: this.control,
                enableRTL: chart.enableRtl,
                controlName: 'Progressbar'
            }, '#' + this.control.element.id + '_tooltip');
        }
        else {
            if (this.svgTooltip) {
                this.svgTooltip.location = location;
                this.svgTooltip.content = this.text;
                this.svgTooltip.header = '';
                this.svgTooltip.offset = 7.5;
                this.svgTooltip.textStyle = this.control.tooltip.textStyle;
                this.svgTooltip.areaBounds = bounds;
                this.svgTooltip.arrowPadding = 7;
                this.svgTooltip.dataBind();
            }
        }
    }
    /**
     * Get module name.
     */
    getModuleName() {
        return 'ProgressTooltip';
    }
    /**
     * To destroy the annotation.
     *
     * @returns {void}
     * @private
     */
    destroy() {
        // Destroy method performed here
    }
}

/**
 * Progressbar Segment
 */
class Segment {
    /** To render the linear segment */
    createLinearSegment(progress, id, width, opacity, thickness, progressWidth) {
        let locX = (progress.enableRtl) ? ((progress.cornerRadius === 'Round') ?
            (progress.progressRect.x + progress.progressRect.width) - ((lineCapRadius / 2) * thickness) :
            (progress.progressRect.x + progress.progressRect.width)) :
            ((progress.cornerRadius === 'Round') ? (progress.progressRect.x + (lineCapRadius / 2) * thickness) : progress.progressRect.x);
        const locY = (progress.progressRect.y + (progress.progressRect.height / 2));
        const gapWidth = (progress.gapWidth || progress.themeStyle.linearGapWidth);
        const avlWidth = progressWidth / progress.segmentCount;
        let avlSegWidth = (progressWidth - ((progress.segmentCount - 1) * gapWidth));
        avlSegWidth = (avlSegWidth -
            ((progress.cornerRadius === 'Round') ? progress.segmentCount * (lineCapRadius * thickness) : 0)) / progress.segmentCount;
        const gap = (progress.cornerRadius === 'Round') ? (gapWidth + (lineCapRadius * thickness)) : gapWidth;
        const segmentGroup = progress.renderer.createGroup({ 'id': progress.element.id + id });
        let count = Math.ceil(width / avlWidth);
        count = (count > progress.segmentCount) ? progress.segmentCount : count;
        let segWidth;
        let color;
        let j = 0;
        let option;
        let segmentPath;
        let tolWidth = (progress.cornerRadius === 'Round') ? (width - (lineCapRadius * thickness)) : width;
        const linearThickness = progress.progressThickness || progress.themeStyle.linearProgressThickness;
        for (let i = 0; i < count; i++) {
            segWidth = (tolWidth < avlSegWidth) ? tolWidth : avlSegWidth;
            if (j < progress.segmentColor.length) {
                color = progress.segmentColor[j];
                j++;
            }
            else {
                j = 0;
                color = progress.segmentColor[j];
                j++;
            }
            option = new PathOption(progress.element.id + id + i, 'none', linearThickness, color, opacity, '0', this.getLinearSegmentPath(locX, locY, segWidth, progress.enableRtl));
            segmentPath = progress.renderer.drawPath(option);
            if (progress.cornerRadius === 'Round') {
                segmentPath.setAttribute('stroke-linecap', 'round');
            }
            segmentGroup.appendChild(segmentPath);
            locX += (progress.enableRtl) ? -avlSegWidth - gap : avlSegWidth + gap;
            tolWidth -= avlSegWidth + gap;
            tolWidth = (tolWidth < 0) ? 0 : tolWidth;
        }
        return segmentGroup;
    }
    getLinearSegmentPath(x, y, width, enableRtl) {
        return 'M' + ' ' + x + ' ' + y + ' ' + 'L' + (x + ((enableRtl) ? -width : width)) + ' ' + y;
    }
    /** To render the circular segment */
    createCircularSegment(progress, id, x, y, r, value, opacity, thickness, totalAngle, progressWidth) {
        let start = progress.startAngle;
        let end = this.widthToAngle(progress.minimum, progress.maximum, value, progress.totalAngle);
        end -= (progress.cornerRadius === 'Round' && progress.totalAngle === completeAngle) ?
            this.widthToAngle(0, progressWidth, ((lineCapRadius / 2) * thickness), totalAngle) : 0;
        let size = (progressWidth - ((progress.totalAngle === completeAngle) ? progress.segmentCount :
            progress.segmentCount - 1) * (progress.gapWidth || progress.themeStyle.circularGapWidth));
        size = (size -
            ((progress.cornerRadius === 'Round') ?
                (((progress.totalAngle === completeAngle) ?
                    progress.segmentCount : progress.segmentCount - 1) * lineCapRadius * thickness) : 0)) / progress.segmentCount;
        let avlTolEnd = this.widthToAngle(0, progressWidth, (progressWidth / progress.segmentCount), totalAngle);
        avlTolEnd -= (progress.cornerRadius === 'Round' && progress.totalAngle === completeAngle) ?
            this.widthToAngle(0, progressWidth, ((lineCapRadius / 2) * thickness), totalAngle) : 0;
        const avlEnd = this.widthToAngle(0, progressWidth, size, totalAngle);
        let gap = this.widthToAngle(0, progressWidth, (progress.gapWidth || progress.themeStyle.circularGapWidth), totalAngle);
        gap += (progress.cornerRadius === 'Round') ? this.widthToAngle(0, progressWidth, (lineCapRadius * thickness), totalAngle) : 0;
        const segmentGroup = progress.renderer.createGroup({ 'id': progress.element.id + id });
        const gapCount = Math.floor(end / avlTolEnd);
        const count = Math.ceil((end - gap * gapCount) / avlEnd);
        let segmentPath;
        let circularSegment;
        let segmentEnd;
        let avlSegEnd = (start + ((progress.enableRtl) ? -avlEnd : avlEnd)) % 360;
        let color;
        let j = 0;
        let option;
        const circularThickness = progress.progressThickness || progress.themeStyle.circularProgressThickness;
        for (let i = 0; i < count; i++) {
            segmentEnd = (progress.enableRtl) ? ((progress.startAngle - end > avlSegEnd) ? progress.startAngle - end : avlSegEnd) :
                ((progress.startAngle + end < avlSegEnd) ? progress.startAngle + end : avlSegEnd);
            segmentPath = getPathArc(x, y, r, start, segmentEnd, progress.enableRtl);
            if (j < progress.segmentColor.length) {
                color = progress.segmentColor[j];
                j++;
            }
            else {
                j = 0;
                color = progress.segmentColor[j];
                j++;
            }
            option = new PathOption(progress.element.id + id + i, 'none', circularThickness, color, opacity, '0', segmentPath);
            circularSegment = progress.renderer.drawPath(option);
            if (progress.cornerRadius === 'Round') {
                circularSegment.setAttribute('stroke-linecap', 'round');
            }
            segmentGroup.appendChild(circularSegment);
            start = segmentEnd + ((progress.enableRtl) ? -gap : gap);
            avlSegEnd += (progress.enableRtl) ? -avlEnd - gap : avlEnd + gap;
        }
        return segmentGroup;
    }
    widthToAngle(min, max, value, totalAngle) {
        const angle = ((value - min) / (max - min)) * totalAngle;
        return angle;
    }
    createLinearRange(totalWidth, progress, progressWidth) {
        const posX = progress.progressRect.x + ((progress.enableRtl) ? progress.progressRect.width : 0);
        const startY = (progress.progressRect.y + (progress.progressRect.height / 2));
        const rangeGroup = progress.renderer.createGroup({ 'id': progress.element.id + '_LinearRangeGroup' });
        const range = progress.rangeColors;
        const thickness = progress.progressThickness || progress.themeStyle.linearProgressThickness;
        const opacity = progress.themeStyle.progressOpacity;
        const rangeMin = progress.minimum;
        const rangeMax = progress.value;
        const gradX = (progress.enableRtl) ? 0.1 : -0.1;
        let gradient;
        let validRange;
        let rangePath;
        let option;
        let startPos;
        let endPos;
        let startX;
        let endX;
        let color;
        let endColor;
        for (let i = 0; i < range.length; i++) {
            validRange = (range[i].start >= rangeMin && range[i].start <= rangeMax &&
                range[i].end >= rangeMin && range[i].end <= rangeMax);
            startPos = totalWidth * progress.calculateProgressRange(range[i].start, rangeMin, rangeMax);
            endPos = totalWidth * progress.calculateProgressRange(range[i].end, rangeMin, rangeMax);
            startX = posX + ((progress.enableRtl) ? -startPos : startPos);
            endX = posX + ((progress.enableRtl) ? -endPos : endPos);
            startX = (validRange) ? ((progress.isGradient && i > 0) ? startX + gradX : startX) : posX;
            endX = (validRange) ? endX : posX;
            color = (progress.isGradient) ? 'url(#lineRangeGrad_' + i + ')' : range[i].color;
            option = new PathOption(progress.element.id + '_LinearRange_' + i, 'none', thickness, color, opacity, '0', 'M' + ' ' + startX + ' ' + startY + ' ' + 'L' + endX + ' ' + startY);
            rangePath = progress.renderer.drawPath(option);
            if (progress.cornerRadius === 'Round' && progressWidth) {
                rangePath.setAttribute('stroke-linecap', 'round');
            }
            rangeGroup.appendChild(rangePath);
            if (progress.isGradient) {
                if (range.length - 1 === i) {
                    endColor = range[i].color;
                }
                else {
                    endColor = range[i + 1].color;
                }
                gradient = this.setLinearGradientColor(i, range[i].color, endColor, startX, endX, progress);
                rangeGroup.appendChild(gradient);
            }
        }
        return rangeGroup;
    }
    createCircularRange(centerX, centerY, radius, progress) {
        const rangeGroup = progress.renderer.createGroup({ 'id': progress.element.id + '_CircularRangeGroup' });
        const range = progress.rangeColors;
        const thickness = progress.progressThickness || progress.themeStyle.linearProgressThickness;
        const opacity = progress.themeStyle.progressOpacity;
        const rangeMin = progress.minimum;
        const rangeMax = progress.value;
        const start = progress.startAngle;
        const tolAngle = this.widthToAngle(progress.minimum, progress.maximum, progress.value, progress.totalAngle);
        let gradient;
        let startAngle;
        let endAngle;
        let rangePath;
        let isValidRange;
        let option;
        let color;
        let endColor;
        for (let i = 0; i < range.length; i++) {
            isValidRange = (range[i].start >= rangeMin && range[i].start <= rangeMax &&
                range[i].end >= rangeMin && range[i].end <= rangeMax);
            startAngle = this.widthToAngle(rangeMin, rangeMax, range[i].start, tolAngle);
            endAngle = this.widthToAngle(rangeMin, rangeMax, range[i].end, tolAngle);
            startAngle = (isValidRange) ? (start + ((progress.enableRtl) ? -startAngle : startAngle)) % 360 : start;
            endAngle = (isValidRange) ? (start + ((progress.enableRtl) ? -endAngle : endAngle)) % 360 : start;
            color = (progress.isGradient) ? 'url(#circleRangeGrad_' + i + ')' : range[i].color;
            option = new PathOption(progress.element.id + '_CircularRange_' + i, 'none', thickness, color, opacity, '0', getPathArc(centerX, centerY, radius, startAngle, endAngle, progress.enableRtl));
            rangePath = progress.renderer.drawPath(option);
            if (progress.cornerRadius === 'Round' && startAngle !== endAngle) {
                rangePath.setAttribute('stroke-linecap', 'round');
            }
            rangeGroup.appendChild(rangePath);
            if (progress.isGradient) {
                if (range.length - 1 === i) {
                    endColor = range[i].color;
                }
                else {
                    endColor = range[i + 1].color;
                }
                gradient = this.setCircularGradientColor(i, range[i].color, endColor, startAngle, endAngle, radius, centerX, centerY, progress);
                rangeGroup.appendChild(gradient);
            }
        }
        return rangeGroup;
    }
    setLinearGradientColor(id, startColor, endColor, start, end, progress) {
        const stopColor = [];
        const option = { id: 'lineRangeGrad_' + id + '', x1: start.toString(), x2: end.toString() };
        stopColor[0] = { color: startColor, colorStop: '50%' };
        stopColor[1] = { color: endColor, colorStop: '100%' };
        const linearGradient = progress.renderer.drawGradient('linearGradient', option, stopColor);
        linearGradient.firstElementChild.setAttribute('gradientUnits', 'userSpaceOnUse');
        return linearGradient;
    }
    setCircularGradientColor(id, startColor, endColor, start, end, rad, x, y, progress) {
        const stopColor = [];
        const pos1 = degreeToLocation(x, y, rad, start);
        const pos2 = degreeToLocation(x, y, rad, end);
        const option = {
            id: 'circleRangeGrad_' + id + '', x1: pos1.x.toString(), x2: pos2.x.toString(),
            y1: pos1.y.toString(), y2: pos2.y.toString()
        };
        stopColor[0] = { color: startColor, colorStop: '50%' };
        stopColor[1] = { color: endColor, colorStop: '100%' };
        const linearGradient = progress.renderer.drawGradient('linearGradient', option, stopColor);
        linearGradient.firstElementChild.setAttribute('gradientUnits', 'userSpaceOnUse');
        return linearGradient;
    }
}

/**
 * Progress Bar of type Linear
 */
class Linear {
    constructor(progress) {
        this.segment = new Segment();
        this.animation = new ProgressAnimation();
        this.progress = progress;
    }
    /** To render the linear track  */
    renderLinearTrack() {
        const progress = this.progress;
        const linearTrackGroup = progress.renderer.createGroup({ 'id': progress.element.id + '_LinearTrackGroup' });
        let linearTrack;
        let option;
        this.isRange = (this.progress.rangeColors[0].color !== '' || this.progress.rangeColors[0].start !== null ||
            this.progress.rangeColors[0].end !== null);
        const thickness = (progress.trackThickness || progress.themeStyle.linearTrackThickness);
        const stroke = (progress.argsData.trackColor || progress.themeStyle.linearTrackColor);
        if (progress.cornerRadius === 'Round4px') {
            if (progress.segmentCount > 1) {
                linearTrack = this.createRoundCornerSegment('_LinearTrack_', stroke, thickness, true, 0, progress);
            }
            else {
                option = new PathOption(progress.element.id + '_Lineartrack', stroke, 0, 'none', progress.themeStyle.trackOpacity, '0', this.cornerRadius(progress.progressRect.x, progress.progressRect.y, progress.progressRect.width, thickness, 4, ''));
                linearTrack = progress.renderer.drawPath(option);
            }
        }
        else {
            option = new PathOption(progress.element.id + '_Lineartrack', 'none', thickness, stroke, progress.themeStyle.trackOpacity, '0', progress.getPathLine(progress.progressRect.x, progress.progressRect.width, thickness));
            linearTrack = progress.renderer.drawPath(option);
            progress.trackWidth = linearTrack.getTotalLength();
            if (progress.cornerRadius === 'Round' && !this.isRange) {
                linearTrack.setAttribute('stroke-linecap', 'round');
            }
            if (progress.segmentCount > 1 && !this.isRange && !progress.enableProgressSegments) {
                progress.segmentSize = progress.calculateSegmentSize(progress.trackWidth, thickness);
                linearTrack.setAttribute('stroke-dasharray', progress.segmentSize);
            }
        }
        linearTrackGroup.appendChild(linearTrack);
        progress.svgObject.appendChild(linearTrackGroup);
    }
    /** To render the linear progress  */
    // tslint:disable-next-line:max-func-body-length
    renderLinearProgress(refresh, previousWidth = 0) {
        const progress = this.progress;
        let option;
        let linearProgress;
        let clipPathLinear;
        let clipPathIndeterminate;
        let linearProgressGroup;
        let animationdelay;
        let segmentWidth;
        let strippedStroke;
        const ismaximum = (progress.value === progress.maximum);
        const previousProgressWidth = progress.progressRect.width * progress.calculateProgressRange(progress.value);
        const progressWidth = progress.calculateProgressRange(progress.argsData.value);
        this.linearProgressWidth = progress.progressRect.width *
            ((progress.isIndeterminate && !progress.enableProgressSegments) ? 1 : progressWidth);
        if (!refresh) {
            linearProgressGroup = progress.renderer.createGroup({ 'id': progress.element.id + '_LinearProgressGroup' });
        }
        else {
            linearProgressGroup = getElement(progress.element.id + '_LinearProgressGroup');
        }
        const thickness = (progress.progressThickness || progress.themeStyle.linearProgressThickness);
        const stroke = (!progress.isStriped) ? this.checkingLinearProgressColor() : 'url(#' + progress.element.id + '_LinearStriped)';
        if (progress.cornerRadius === 'Round4px') {
            option = new PathOption(progress.element.id + '_Linearprogress', stroke, 0, 'none', progress.themeStyle.progressOpacity, '0', this.cornerRadius(progress.progressRect.x, progress.progressRect.y, this.linearProgressWidth, thickness, 4, (ismaximum || progress.isIndeterminate) ? '' : 'start'));
        }
        else {
            option = new PathOption(progress.element.id + '_Linearprogress', 'none', thickness, stroke, progress.themeStyle.progressOpacity, '0', progress.getPathLine(progress.progressRect.x, this.linearProgressWidth, thickness));
        }
        progress.progressWidth = progress.renderer.drawPath(option).getTotalLength();
        progress.segmentSize = (!progress.enableProgressSegments) ? progress.segmentSize :
            progress.calculateSegmentSize(progress.progressWidth, thickness);
        if (progress.secondaryProgress !== null && !progress.isIndeterminate) {
            this.renderLinearBuffer(progress);
        }
        if (progress.argsData.value !== null) {
            if (progress.cornerRadius === 'Round4px') {
                if (progress.segmentCount > 1) {
                    linearProgress = this.createRoundCornerSegment('_Linearprogress_', stroke, thickness, false, this.linearProgressWidth, progress, progress.themeStyle.progressOpacity);
                }
                else {
                    linearProgress = progress.renderer.drawPath(option);
                }
            }
            else {
                if (progress.segmentColor.length !== 0 && !progress.isIndeterminate && !this.isRange) {
                    segmentWidth = (!progress.enableProgressSegments) ? progress.trackWidth : progress.progressWidth;
                    linearProgress = this.segment.createLinearSegment(progress, '_LinearProgressSegment', this.linearProgressWidth, progress.themeStyle.progressOpacity, thickness, segmentWidth);
                }
                else if (this.isRange && !progress.isIndeterminate) {
                    linearProgress = this.segment.createLinearRange(this.linearProgressWidth, progress, progressWidth);
                }
                else {
                    if (!refresh) {
                        linearProgress = progress.renderer.drawPath(option);
                    }
                    else {
                        linearProgress = getElement(progress.element.id + '_Linearprogress');
                        linearProgress.setAttribute('d', progress.getPathLine(progress.progressRect.x, this.linearProgressWidth, thickness));
                        linearProgress.setAttribute('stroke', stroke);
                    }
                    if (progress.segmentCount > 1) {
                        linearProgress.setAttribute('stroke-dasharray', progress.segmentSize);
                    }
                    if (progress.cornerRadius === 'Round' && progressWidth) {
                        linearProgress.setAttribute('stroke-linecap', 'round');
                    }
                }
            }
            linearProgressGroup.appendChild(linearProgress);
            if (progress.isStriped && !progress.isIndeterminate) {
                strippedStroke = this.checkingLinearProgressColor();
                this.renderLinearStriped(strippedStroke, linearProgressGroup, progress);
            }
            if (progress.isActive && !progress.isIndeterminate && !progress.isStriped) {
                this.renderActiveState(linearProgressGroup, progressWidth, this.linearProgressWidth, thickness, refresh);
            }
            if (progress.animation.enable && !progress.isIndeterminate && !progress.isActive && !progress.isStriped) {
                if ((progress.secondaryProgress !== null)) {
                    animationdelay = progress.animation.delay + (this.bufferWidth - this.linearProgressWidth);
                }
                else {
                    animationdelay = progress.animation.delay;
                }
                this.delay = animationdelay;
                clipPathLinear = progress.createClipPath(progress.clipPath, progressWidth, null, refresh, thickness, false, (progress.cornerRadius === 'Round4px' && ismaximum));
                linearProgressGroup.appendChild(progress.clipPath);
                linearProgress.setAttribute('style', 'clip-path:url(#' + progress.element.id + '_clippath)');
                this.animation.doLinearAnimation(clipPathLinear, progress, animationdelay, refresh ? previousWidth : 0);
            }
            if (progress.isIndeterminate) {
                clipPathIndeterminate = progress.createClipPath(progress.clipPath, (progress.enableProgressSegments) ? 1 : progressWidth, null, refresh, thickness, progress.enableProgressSegments);
                linearProgressGroup.appendChild(progress.clipPath);
                linearProgress.setAttribute('style', 'clip-path:url(#' + progress.element.id + '_clippath)');
                this.animation.doLinearIndeterminate(((!progress.enableProgressSegments) ? clipPathIndeterminate : linearProgress), this.linearProgressWidth, thickness, progress, clipPathIndeterminate);
            }
            progress.svgObject.appendChild(linearProgressGroup);
            progress.previousWidth = previousProgressWidth;
        }
    }
    /** To render the linear buffer */
    renderLinearBuffer(progress) {
        let linearBuffer;
        let clipPathBuffer;
        let linearBufferWidth;
        let option;
        let segmentWidth;
        const ismaximum = (progress.secondaryProgress === progress.maximum);
        const secondaryProgressWidth = progress.calculateProgressRange(progress.secondaryProgress);
        this.bufferWidth = linearBufferWidth = progress.progressRect.width * secondaryProgressWidth;
        const linearBufferGroup = progress.renderer.createGroup({ 'id': progress.element.id + '_LinearBufferGroup' });
        const thickness = progress.secondaryProgressThickness ? progress.secondaryProgressThickness
            : (progress.progressThickness || progress.themeStyle.linearProgressThickness);
        const stroke = progress.secondaryProgressColor ? progress.secondaryProgressColor : this.checkingLinearProgressColor();
        if (progress.cornerRadius === 'Round4px') {
            if (progress.segmentCount > 1) {
                linearBuffer = this.createRoundCornerSegment('_Linearbuffer_', stroke, thickness, false, linearBufferWidth, progress, progress.themeStyle.bufferOpacity);
            }
            else {
                option = new PathOption(progress.element.id + '_Linearbuffer', stroke, 0, 'none', progress.themeStyle.bufferOpacity, '0', this.cornerRadius(progress.progressRect.x, progress.progressRect.y, linearBufferWidth, thickness, 4, (ismaximum) ? '' : 'start'));
                linearBuffer = progress.renderer.drawPath(option);
            }
        }
        else {
            option = new PathOption(progress.element.id + '_Linearbuffer', 'none', thickness, stroke, progress.themeStyle.bufferOpacity, '0', progress.getPathLine(progress.progressRect.x, linearBufferWidth, thickness));
            if (progress.segmentColor.length !== 0 && !progress.isIndeterminate && !this.isRange) {
                segmentWidth = (!progress.enableProgressSegments) ? progress.trackWidth : progress.progressWidth;
                linearBuffer = this.segment.createLinearSegment(progress, '_LinearBufferSegment', linearBufferWidth, progress.themeStyle.bufferOpacity, (progress.progressThickness || progress.themeStyle.linearProgressThickness), segmentWidth);
            }
            else {
                linearBuffer = progress.renderer.drawPath(option);
                if (progress.segmentCount > 1 && !this.isRange) {
                    linearBuffer.setAttribute('stroke-dasharray', progress.segmentSize);
                }
                if (progress.cornerRadius === 'Round' && !this.isRange) {
                    linearBuffer.setAttribute('stroke-linecap', 'round');
                }
            }
        }
        linearBufferGroup.appendChild(linearBuffer);
        if (progress.animation.enable) {
            clipPathBuffer = progress.createClipPath(progress.bufferClipPath, secondaryProgressWidth, null, false, thickness, false, (progress.cornerRadius === 'Round4px' && ismaximum));
            linearBufferGroup.appendChild(progress.bufferClipPath);
            linearBuffer.setAttribute('style', 'clip-path:url(#' + progress.element.id + '_clippathBuffer)');
            this.animation.doLinearAnimation(clipPathBuffer, progress, progress.animation.delay, 0);
        }
        progress.svgObject.appendChild(linearBufferGroup);
    }
    /** Render the Linear Label */
    //tslint:disable-next-line:max-func-body-length
    renderLinearLabel(isProgressRefresh = false) {
        let linearlabel;
        let posX;
        let posY;
        let textSize;
        const percentage = 100;
        let option;
        let defaultPos;
        let far;
        let center;
        let pos;
        let clipPath;
        const thickness = (this.progress.progressThickness || this.progress.themeStyle.linearProgressThickness);
        const padding = 5;
        const progress = this.progress;
        const textAlignment = progress.labelStyle.textAlignment;
        const labelText = progress.labelStyle.text;
        const fontBackground = this.checkingLinearProgressColor();
        const progressWidth = progress.progressRect.width * progress.calculateProgressRange(progress.value);
        const linearLabelGroup = progress.renderer.createGroup({ 'id': progress.element.id + '_LinearLabelGroup' });
        if (document.getElementById(linearLabelGroup.id)) {
            document.getElementById(linearLabelGroup.id).remove();
        }
        const labelValue = ((progress.value - progress.minimum) / (progress.maximum - progress.minimum)) * percentage;
        const linearValue = (progress.value < progress.minimum || progress.value > progress.maximum) ? 0 : Math.round(labelValue);
        // Checking the font color
        const rgbValue = convertHexToColor(colorNameToHex(fontBackground));
        const argsData = {
            cancel: false, text: labelText ? labelText : String(linearValue) + '%', color: progress.labelStyle.color || this.progress.themeStyle.linearLabelFont.color
        };
        progress.trigger('textRender', argsData);
        if (!argsData.cancel) {
            textSize = measureText(argsData.text, progress.labelStyle, progress.themeStyle.linearLabelFont);
            defaultPos = (progress.enableRtl) ? (progress.progressRect.x + progress.progressRect.width - textSize.width / 2) :
                (progress.progressRect.x + textSize.width / 2);
            if (progress.labelOnTrack) {
                if (textAlignment === 'Near') {
                    posX = defaultPos + ((progress.enableRtl) ? -padding : padding);
                }
                else if (textAlignment === 'Center') {
                    center = (progress.enableRtl) ? (progress.progressRect.x + progress.progressRect.width - progressWidth / 2) :
                        (progress.progressRect.x + progressWidth / 2);
                    pos = (progress.enableRtl) ? (center <= defaultPos) : (center >= defaultPos);
                    if (pos) {
                        posX = center;
                    }
                    else {
                        posX = defaultPos;
                    }
                }
                else {
                    far = (progress.enableRtl) ?
                        ((progress.progressRect.x + progress.progressRect.width - progressWidth) + textSize.width / 2) :
                        (progress.progressRect.x + progressWidth - textSize.width / 2);
                    far += (progress.enableRtl) ? padding : -padding;
                    pos = (progress.enableRtl) ? (far <= defaultPos) : (far >= defaultPos);
                    if (pos) {
                        posX = far;
                    }
                    else {
                        posX = defaultPos;
                    }
                }
            }
            else {
                if (textAlignment === 'Near') {
                    posX = defaultPos + ((progress.enableRtl) ? -padding : padding);
                }
                else if (textAlignment === 'Center') {
                    posX = (progress.progressRect.x + progress.progressRect.width) / 2;
                }
                else {
                    posX = (progress.enableRtl) ?
                        (progress.progressRect.x + textSize.width / 2) :
                        (progress.progressRect.x + progress.progressRect.width - textSize.width / 2);
                    posX += (progress.enableRtl) ? padding : -padding;
                }
            }
            if (this.progress.cornerRadius === 'Round4px') {
                posY = progress.progressRect.y + (thickness / 2) + (textSize.height / 4);
            }
            else {
                posY = progress.progressRect.y + (progress.progressRect.height / 2) + (textSize.height / 4);
            }
            option = new TextOption(progress.element.id + '_linearLabel', progress.labelStyle.size || progress.themeStyle.linearLabelFont.size, progress.labelStyle.fontStyle || progress.themeStyle.linearLabelFont.fontStyle, progress.labelStyle.fontFamily || progress.themeStyle.linearLabelFont.fontFamily, progress.labelStyle.fontWeight, 'middle', argsData.color, posX, posY);
            linearlabel = progress.renderer.createText(option, argsData.text);
            linearLabelGroup.appendChild(linearlabel);
            if (progress.animation.enable && !progress.isIndeterminate) {
                clipPath = progress.renderer.createClipPath({ 'id': progress.element.id + '_clippathLabel' });
                progress.createClipPath(clipPath, 1, null, false, (progress.progressThickness || progress.themeStyle.linearProgressThickness), true);
                linearLabelGroup.appendChild(clipPath);
                linearlabel.setAttribute('style', 'clip-path:url(#' + progress.element.id + '_clippathLabel)');
                this.animation.doLabelAnimation(linearlabel, (isProgressRefresh ? progress.previousLabelWidth : 0), progressWidth - (isProgressRefresh ? progress.previousLabelWidth : 0), progress, this.delay, textSize.width);
            }
            progress.svgObject.appendChild(linearLabelGroup);
            progress.previousLabelWidth = progressWidth;
        }
    }
    /** To render a progressbar active state */
    renderActiveState(progressGroup, progressWidth, linearProgressWidth, thickness, refresh) {
        let linearActive;
        const progress = this.progress;
        let option;
        const ismaximum = (progress.value === progress.maximum);
        if (progress.cornerRadius === 'Round4px') {
            if (progress.segmentCount > 1) {
                linearActive = this.createRoundCornerSegment('_LinearActiveProgress_', '#ffffff', thickness, false, linearProgressWidth, progress, 0.5);
            }
            else {
                option = new PathOption(progress.element.id + '_LinearActiveProgress', '#ffffff', 0, 'none', 0.5, '0', this.cornerRadius(progress.progressRect.x, progress.progressRect.y, linearProgressWidth, thickness, 4, ismaximum ? '' : 'start'));
                linearActive = progress.renderer.drawPath(option);
            }
        }
        else {
            if (!refresh) {
                option = new PathOption(progress.element.id + '_LinearActiveProgress', 'none', thickness, '#ffffff', 0.5, '', progress.getPathLine(progress.progressRect.x, linearProgressWidth, thickness));
                linearActive = progress.renderer.drawPath(option);
            }
            else {
                linearActive = getElement(progress.element.id + '_LinearActiveProgress');
                linearActive.setAttribute('d', progress.getPathLine(progress.progressRect.x, linearProgressWidth, thickness));
            }
            if (progress.segmentCount > 1 && !this.isRange) {
                linearActive.setAttribute('stroke-dasharray', progress.segmentSize);
            }
            if (progress.cornerRadius === 'Round' && progressWidth && !this.isRange) {
                linearActive.setAttribute('stroke-linecap', 'round');
            }
        }
        const activeClip = progress.createClipPath(progress.clipPath, progressWidth, null, refresh, thickness, false);
        linearActive.setAttribute('style', 'clip-path:url(#' + progress.element.id + '_clippath)');
        progressGroup.appendChild(linearActive);
        progressGroup.appendChild(progress.clipPath);
        this.animation.doLinearAnimation(activeClip, progress, 0, 0, linearActive);
    }
    /** To render a striped stroke */
    renderLinearStriped(color, group, progress) {
        const defs = progress.renderer.createDefs();
        let linearGradient = document.createElementNS(svgLink, gradientType);
        const stripWidth = 14;
        let stop;
        let stopOption = [];
        const gradOption = {
            id: progress.element.id + '_LinearStriped', x1: (progress.progressRect.x).toString(),
            x2: (progress.progressRect.x + stripWidth).toString(),
            spreadMethod: 'repeat', gradientUnits: 'userSpaceOnUse', gradientTransform: 'rotate(-45)'
        };
        stopOption = [{ offset: '50%', 'stop-color': color, 'stop-opacity': '1' },
            { offset: '50%', 'stop-color': color, 'stop-opacity': '0.4' }];
        linearGradient = setAttributes(gradOption, linearGradient);
        for (let i = 0; i < stopOption.length; i++) {
            stop = document.createElementNS(svgLink, stopElement);
            stop = setAttributes(stopOption[i], stop);
            linearGradient.appendChild(stop);
        }
        defs.appendChild(linearGradient);
        group.appendChild(defs);
        if (progress.animation.enable) {
            this.animation.doStripedAnimation(linearGradient, progress, 0);
        }
    }
    /** checking progress color */
    checkingLinearProgressColor() {
        let linearColor;
        const progress = this.progress;
        const role = progress.role;
        switch (role) {
            case 'Success':
                linearColor = progress.themeStyle.success;
                break;
            case 'Info':
                linearColor = progress.themeStyle.info;
                break;
            case 'Warning':
                linearColor = progress.themeStyle.warning;
                break;
            case 'Danger':
                linearColor = progress.themeStyle.danger;
                break;
            default:
                linearColor = (progress.argsData.progressColor || progress.themeStyle.linearProgressColor);
        }
        return linearColor;
    }
    /** Bootstrap 3 & Bootstrap 4 corner path */
    cornerRadius(x, y, width, height, radius, pathtype) {
        let path = '';
        const endWidth = width;
        const endRadius = radius;
        switch (pathtype) {
            case 'start':
                path = 'M' + x + ',' + y + ' '
                    + 'h' + (width) + ' '
                    + 'v' + (height) + ' '
                    + 'h' + (-width) + ' '
                    + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + -radius + ' '
                    + 'v' + (2 * radius - height) + ' '
                    + 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius + ' '
                    + 'z';
                break;
            case 'end':
                path = 'M' + x + ',' + y + ' '
                    + 'h' + (endWidth - endRadius) + ' '
                    + 'a' + endRadius + ',' + endRadius + ' 0 0 1 ' + endRadius + ',' + endRadius + ' '
                    + 'v' + (height - 2 * endRadius) + ' '
                    + 'a' + endRadius + ',' + endRadius + ' 0 0 1 ' + -endRadius + ',' + endRadius + ' '
                    + 'h' + (radius - endWidth) + ' '
                    + 'v' + (-height) + ' '
                    + 'z';
                break;
            case 'none':
                path = 'M' + x + ',' + y + ' '
                    + 'h' + (width) + ' '
                    + 'v' + (height) + ' '
                    + 'h' + (-width) + ' '
                    + 'v' + (-height) + ' '
                    + 'z';
                break;
            default:
                path = 'M' + x + ',' + y + ' '
                    + 'h' + (width - radius) + ' '
                    + 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + radius + ' '
                    + 'v' + (height - 2 * radius) + ' '
                    + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + radius + ' '
                    + 'h' + (radius - width) + ' '
                    + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + -radius + ' '
                    + 'v' + (2 * radius - height) + ' '
                    + 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius + ' '
                    + 'z';
        }
        return path;
    }
    /** Bootstrap 3 & Bootstrap 4 corner segment */
    createRoundCornerSegment(id, stroke, thickness, isTrack, progressWidth, progress, opacity) {
        let locX = progress.progressRect.x;
        const locY = progress.progressRect.y;
        const width = progress.progressRect.width;
        let option;
        let pathType;
        let avlWidth;
        const gapWidth = (progress.gapWidth || progress.themeStyle.linearGapWidth);
        const segWidth = (width - ((progress.segmentCount - 1) * gapWidth)) / progress.segmentCount;
        const segmentGroup = progress.renderer.createGroup({ 'id': progress.element.id + id + 'SegmentGroup' });
        let segmentPath;
        for (let i = 1; i <= progress.segmentCount; i++) {
            if (i === 1 || i === progress.segmentCount) {
                pathType = (i === 1) ? 'start' : 'end';
            }
            else {
                pathType = 'none';
            }
            if (isTrack) {
                option = new PathOption(progress.element.id + id + i, stroke, 0, 'none', progress.themeStyle.trackOpacity, '0', this.cornerRadius(locX, locY, segWidth, thickness, 4, pathType));
                segmentPath = progress.renderer.drawPath(option);
                segmentGroup.appendChild(segmentPath);
                locX += (segWidth + gapWidth);
            }
            else {
                avlWidth = (progressWidth < segWidth) ? progressWidth : segWidth;
                option = new PathOption(progress.element.id + id + i, stroke, 0, 'none', opacity, '0', this.cornerRadius(locX, locY, avlWidth, thickness, 4, pathType));
                segmentPath = progress.renderer.drawPath(option);
                segmentGroup.appendChild(segmentPath);
                locX += (segWidth + gapWidth);
                progressWidth -= (segWidth + gapWidth);
                if (progressWidth <= 0) {
                    break;
                }
            }
        }
        return segmentGroup;
    }
}

/**
 * Progressbar of type circular
 */
class Circular {
    constructor(progress) {
        this.segment = new Segment();
        this.animation = new ProgressAnimation();
        this.progress = progress;
    }
    /** To render the circular track */
    renderCircularTrack() {
        const progress = this.progress;
        const circularTrackGroup = progress.renderer.createGroup({ 'id': progress.element.id + '_CircularTrackGroup' });
        let radius;
        let endAngle;
        const startAngle = progress.startAngle;
        progress.totalAngle = (progress.endAngle - progress.startAngle) % 360;
        progress.totalAngle = (progress.totalAngle <= 0 ? (360 + progress.totalAngle) : progress.totalAngle);
        progress.totalAngle -= (progress.totalAngle === 360) ? 0.01 : 0;
        this.trackEndAngle = endAngle = (progress.startAngle + ((progress.enableRtl) ? -progress.totalAngle : +progress.totalAngle)) % 360;
        this.centerX = progress.progressRect.x + (progress.progressRect.width / 2);
        this.centerY = progress.progressRect.y + (progress.progressRect.height / 2);
        this.maxThickness = Math.max(progress.trackThickness, progress.progressThickness) ||
            Math.max(progress.themeStyle.circularProgressThickness, progress.themeStyle.circularTrackThickness);
        this.availableSize = (Math.min(progress.progressRect.height, progress.progressRect.width) / 2) - this.maxThickness / 2;
        radius = stringToNumber(progress.radius, this.availableSize);
        radius = (radius === null) ? 0 : radius;
        const stroke = (progress.argsData.trackColor || progress.themeStyle.circularTrackColor);
        const fill = (progress.enablePieProgress) ? (progress.argsData.trackColor || progress.themeStyle.circularTrackColor) : 'none';
        const strokeWidth = (progress.enablePieProgress) ? 0 :
            (progress.trackThickness || progress.themeStyle.circularTrackThickness);
        const circularPath = getPathArc(this.centerX, this.centerY, radius, startAngle, endAngle, progress.enableRtl, progress.enablePieProgress);
        this.isRange = (this.progress.rangeColors[0].color !== '' || this.progress.rangeColors[0].start !== null ||
            this.progress.rangeColors[0].end !== null);
        const option = new PathOption(progress.element.id + '_Circulartrack', fill, strokeWidth, stroke, progress.themeStyle.trackOpacity, '0', circularPath);
        const circularTrack = progress.renderer.drawPath(option);
        progress.trackWidth = circularTrack.getTotalLength();
        if (progress.segmentCount > 1 && !progress.enableProgressSegments && !progress.enablePieProgress && !this.isRange) {
            progress.segmentSize = progress.calculateSegmentSize(progress.trackWidth, strokeWidth);
            circularTrack.setAttribute('stroke-dasharray', progress.segmentSize);
        }
        if (progress.cornerRadius === 'Round' && !progress.enablePieProgress && !this.isRange) {
            circularTrack.setAttribute('stroke-linecap', 'round');
        }
        circularTrackGroup.appendChild(circularTrack);
        progress.svgObject.appendChild(circularTrackGroup);
    }
    /** To render the circular progress */
    renderCircularProgress(previousEnd, previousTotalEnd, refresh) {
        const progress = this.progress;
        const startAngle = progress.startAngle;
        let endAngle;
        let totalAngle;
        let radius;
        let previousPath;
        let progressTotalAngle;
        let progressEnd;
        let circularProgress;
        let linearClipPath;
        let circularProgressGroup;
        let segmentWidth;
        if (!refresh) {
            circularProgressGroup = progress.renderer.createGroup({ 'id': progress.element.id + '_CircularProgressGroup' });
        }
        else {
            circularProgressGroup = getElement(progress.element.id + '_CircularProgressGroup');
        }
        radius = stringToNumber(progress.innerRadius, this.availableSize);
        radius = (radius === null) ? 0 : radius;
        progress.previousTotalEnd = progressEnd = progress.calculateProgressRange(progress.argsData.value);
        const progressEndAngle = (progress.startAngle + ((progress.enableRtl) ? -progressEnd : progressEnd)) % 360;
        progress.previousEndAngle = endAngle = ((progress.isIndeterminate && !progress.enableProgressSegments) ? (progress.startAngle + ((progress.enableRtl) ? -progress.totalAngle : progress.totalAngle)) % 360 : progressEndAngle);
        progressTotalAngle = (progressEnd - progress.startAngle) % 360;
        progressTotalAngle = (progressTotalAngle <= 0 ? (360 + progressTotalAngle) : progressTotalAngle);
        progressTotalAngle -= (progressTotalAngle === 360) ? 0.01 : 0;
        const circularPath = getPathArc(this.centerX, this.centerY, radius, startAngle, endAngle, progress.enableRtl, progress.enablePieProgress);
        const stroke = this.checkingCircularProgressColor();
        const fill = (progress.enablePieProgress) ? stroke : 'none';
        const thickness = (progress.progressThickness || progress.themeStyle.circularProgressThickness);
        const strokeWidth = (progress.enablePieProgress) ? 0 : thickness;
        const option = new PathOption(progress.element.id + '_Circularprogress', fill, strokeWidth, stroke, progress.themeStyle.progressOpacity, '0', circularPath);
        progress.progressWidth = progress.renderer.drawPath(option).getTotalLength();
        progress.segmentSize = this.validateSegmentSize(progress, thickness);
        this.endPosition = degreeToLocation(this.centerX, this.centerY, radius, endAngle);
        if (progress.secondaryProgress !== null && !progress.isIndeterminate) {
            this.renderCircularBuffer(progress, radius, progressTotalAngle);
        }
        if (progress.argsData.value !== null) {
            if (progress.segmentColor.length !== 0 && !progress.isIndeterminate && !progress.enablePieProgress) {
                totalAngle = (!progress.enableProgressSegments) ? progress.totalAngle : progressTotalAngle;
                segmentWidth = (!progress.enableProgressSegments) ? progress.trackWidth : progress.progressWidth;
                circularProgress = this.segment.createCircularSegment(progress, '_CircularProgressSegment', this.centerX, this.centerY, radius, progress.argsData.value, progress.themeStyle.progressOpacity, thickness, totalAngle, segmentWidth);
            }
            else if (this.isRange && !progress.isIndeterminate) {
                circularProgress = this.segment.createCircularRange(this.centerX, this.centerY, radius, progress);
            }
            else {
                if (!refresh) {
                    circularProgress = progress.renderer.drawPath(option);
                }
                else {
                    circularProgress = getElement(progress.element.id + '_Circularprogress');
                    previousPath = circularProgress.getAttribute('d');
                    circularProgress.setAttribute('stroke', stroke);
                    circularProgress.setAttribute('d', circularPath);
                }
                if (progress.segmentCount > 1 && !progress.enablePieProgress) {
                    circularProgress.setAttribute('stroke-dasharray', progress.segmentSize);
                }
                if (progress.cornerRadius === 'Round' && startAngle !== endAngle) {
                    circularProgress.setAttribute('stroke-linecap', 'round');
                }
            }
            circularProgressGroup.appendChild(circularProgress);
            if (progress.isActive && !progress.isIndeterminate && !progress.enablePieProgress) {
                this.renderActiveState(circularProgressGroup, radius, strokeWidth, circularPath, progressEndAngle, progressEnd, refresh);
            }
            if (progress.animation.enable || progress.isIndeterminate) {
                this.delay = (progress.secondaryProgress !== null) ? 300 : progress.animation.delay;
                linearClipPath = progress.createClipPath(progress.clipPath, null, refresh ? previousPath : '', refresh);
                circularProgressGroup.appendChild(progress.clipPath);
                if (progress.animation.enable && !progress.isIndeterminate && !progress.isActive) {
                    circularProgress.setAttribute('style', 'clip-path:url(#' + progress.element.id + '_clippath)');
                    this.animation.doCircularAnimation(this.centerX, this.centerY, radius, progressEndAngle, progressEnd, linearClipPath, progress, thickness, this.delay, refresh ? previousEnd : null, refresh ? previousTotalEnd : null);
                }
                if (progress.isIndeterminate) {
                    if (progress.enableProgressSegments) {
                        linearClipPath.setAttribute('d', getPathArc(this.centerX, this.centerY, radius + (thickness / 2), progress.startAngle, this.trackEndAngle, progress.enableRtl, true));
                    }
                    circularProgress.setAttribute('style', 'clip-path:url(#' + progress.element.id + '_clippath)');
                    this.animation.doCircularIndeterminate((!progress.enableProgressSegments) ? linearClipPath : circularProgress, progress, startAngle, progressEndAngle, this.centerX, this.centerY, radius, thickness, linearClipPath);
                }
            }
            progress.svgObject.appendChild(circularProgressGroup);
        }
    }
    /** To render the circular buffer */
    renderCircularBuffer(progress, radius, progressTotalAngle) {
        let bufferClipPath;
        let circularBuffer;
        let segmentWidth;
        let totalAngle;
        const circularBufferGroup = progress.renderer.createGroup({ 'id': progress.element.id + '_ CircularBufferGroup' });
        const bufferEnd = progress.calculateProgressRange(progress.secondaryProgress);
        const endAngle = (progress.startAngle + ((progress.enableRtl) ? -bufferEnd : bufferEnd)) % 360;
        const circularPath = getPathArc(this.centerX, this.centerY, radius, progress.startAngle, endAngle, progress.enableRtl, progress.enablePieProgress);
        this.bufferEndPosition = degreeToLocation(this.centerX, this.centerY, radius, endAngle);
        const stroke = progress.secondaryProgressColor ? progress.secondaryProgressColor : this.checkingCircularProgressColor();
        const fill = (progress.enablePieProgress) ? stroke : 'none';
        const strokeWidth = (progress.enablePieProgress) ? 0 :
            (progress.secondaryProgressThickness ? progress.secondaryProgressThickness :
                (progress.progressThickness || progress.themeStyle.circularProgressThickness));
        const option = new PathOption(progress.element.id + '_Circularbuffer', fill, strokeWidth, stroke, progress.themeStyle.bufferOpacity, '0', circularPath);
        if (progress.segmentColor.length !== 0 && !progress.isIndeterminate && !progress.enablePieProgress && !this.isRange) {
            totalAngle = (!progress.enableProgressSegments) ? progress.totalAngle : progressTotalAngle;
            segmentWidth = (!progress.enableProgressSegments) ? progress.trackWidth : progress.progressWidth;
            circularBuffer = this.segment.createCircularSegment(progress, '_CircularBufferSegment', this.centerX, this.centerY, radius, progress.secondaryProgress, progress.themeStyle.bufferOpacity, strokeWidth, totalAngle, segmentWidth);
        }
        else {
            circularBuffer = progress.renderer.drawPath(option);
            if (progress.segmentCount > 1 && !progress.enablePieProgress && !this.isRange) {
                circularBuffer.setAttribute('stroke-dasharray', progress.segmentSize);
            }
            if (progress.cornerRadius === 'Round' && !this.isRange) {
                circularBuffer.setAttribute('stroke-linecap', 'round');
            }
        }
        circularBufferGroup.appendChild(circularBuffer);
        if (progress.animation.enable && !progress.isActive) {
            bufferClipPath = progress.createClipPath(progress.bufferClipPath, null, '', false);
            circularBufferGroup.appendChild(progress.bufferClipPath);
            circularBuffer.setAttribute('style', 'clip-path:url(#' + progress.element.id + '_clippathBuffer)');
            this.animation.doCircularAnimation(this.centerX, this.centerY, radius, endAngle, bufferEnd, bufferClipPath, progress, (progress.progressThickness || progress.themeStyle.circularProgressThickness), progress.animation.delay);
        }
        progress.svgObject.appendChild(circularBufferGroup);
    }
    /** To render the circular Label */
    renderCircularLabel(isProgressRefresh = false) {
        let end;
        let circularLabel;
        let centerY;
        let textSize;
        let option;
        const percentage = 100;
        const progress = this.progress;
        const labelText = progress.labelStyle.text;
        const circularLabelGroup = progress.renderer.createGroup({ 'id': progress.element.id + '_CircularLabelGroup' });
        if (document.getElementById(circularLabelGroup.id)) {
            document.getElementById(circularLabelGroup.id).remove();
        }
        const labelValue = ((progress.value - progress.minimum) / (progress.maximum - progress.minimum)) * percentage;
        const circularValue = (progress.value < progress.minimum || progress.value > progress.maximum) ? 0 : Math.round(labelValue);
        const argsData = {
            cancel: false, text: labelText ? labelText : String(circularValue) + '%', color: progress.labelStyle.color || progress.themeStyle.circularLabelFont.color
        };
        progress.trigger('textRender', argsData);
        if (!argsData.cancel) {
            textSize = measureText(argsData.text, progress.labelStyle, progress.themeStyle.circularLabelFont);
            centerY = this.centerY + (textSize.height / 2);
            option = new TextOption(progress.element.id + '_circularLabel', progress.labelStyle.size || progress.themeStyle.circularLabelFont.size, progress.labelStyle.fontStyle || progress.themeStyle.circularLabelFont.fontStyle, progress.labelStyle.fontFamily || progress.themeStyle.circularLabelFont.fontFamily, progress.labelStyle.fontWeight, 'middle', argsData.color, this.centerX, centerY, progress.progressRect.width, progress.progressRect.height);
            circularLabel = progress.renderer.createText(option, argsData.text);
            circularLabelGroup.appendChild(circularLabel);
            if (progress.animation.enable && !progress.isIndeterminate) {
                end = ((progress.value - progress.minimum) / (progress.maximum - progress.minimum)) * progress.totalAngle;
                end = (progress.value < progress.minimum || progress.value > progress.maximum) ? 0 : end;
                this.animation.doLabelAnimation(circularLabel, isProgressRefresh ? progress.previousWidth :
                    progress.startAngle, end, progress, this.delay);
            }
            progress.svgObject.appendChild(circularLabelGroup);
            progress.previousWidth = end;
        }
    }
    /** To render a progressbar active state */
    renderActiveState(progressGroup, radius, strokeWidth, circularPath, endAngle, totalEnd, refresh) {
        let circularActive;
        let option;
        const progress = this.progress;
        const thickness = strokeWidth + 1;
        if (!refresh) {
            option = new PathOption(progress.element.id + '_CircularActiveProgress', 'none', thickness, '#ffffff', 0.5, '0', circularPath);
            circularActive = progress.renderer.drawPath(option);
        }
        else {
            circularActive = getElement(progress.element.id + '_CircularActiveProgress');
            circularActive.setAttribute('d', circularPath);
        }
        if (progress.segmentCount > 1) {
            circularActive.setAttribute('stroke-dasharray', progress.segmentSize);
        }
        if (progress.cornerRadius === 'Round') {
            circularActive.setAttribute('stroke-linecap', 'round');
        }
        const activeClip = progress.createClipPath(progress.clipPath, null, '', refresh);
        circularActive.setAttribute('style', 'clip-path:url(#' + progress.element.id + '_clippath)');
        progressGroup.appendChild(circularActive);
        progressGroup.appendChild(progress.clipPath);
        this.animation.doCircularAnimation(this.centerX, this.centerY, radius, endAngle, totalEnd, activeClip, progress, thickness, 0, null, null, circularActive);
    }
    /** Checking the segment size */
    validateSegmentSize(progress, thickness) {
        let validSegment;
        let progressSegment;
        const rDiff = parseInt(progress.radius, 10) - parseInt(progress.innerRadius, 10);
        if (rDiff !== 0 && !progress.enableProgressSegments) {
            progressSegment = progress.trackWidth + ((rDiff < 0) ? (progress.trackWidth * Math.abs(rDiff)) / parseInt(progress.radius, 10) :
                -(progress.trackWidth * Math.abs(rDiff)) / parseInt(progress.radius, 10));
            validSegment = progress.calculateSegmentSize(progressSegment, thickness);
        }
        else if (progress.enableProgressSegments) {
            validSegment = progress.calculateSegmentSize(progress.progressWidth, thickness);
        }
        else {
            validSegment = progress.segmentSize;
        }
        return validSegment;
    }
    /** checking progress color */
    checkingCircularProgressColor() {
        let circularColor;
        const progress = this.progress;
        const role = progress.role;
        switch (role) {
            case 'Success':
                circularColor = progress.themeStyle.success;
                break;
            case 'Info':
                circularColor = progress.themeStyle.info;
                break;
            case 'Warning':
                circularColor = progress.themeStyle.warning;
                break;
            case 'Danger':
                circularColor = progress.themeStyle.danger;
                break;
            default:
                circularColor = (progress.argsData.progressColor || progress.themeStyle.circularProgressColor);
        }
        return circularColor;
    }
}

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable valid-jsdoc */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 *  progress bar control
 */
let ProgressBar = class ProgressBar extends Component {
    constructor(options, element) {
        super(options, element);
        /** @private */
        this.linear = new Linear(this);
        /** @private */
        this.circular = new Circular(this);
        /** @private */
        this.annotateAnimation = new ProgressAnimation();
        /** @private */
        // private resizeTo: number;
        /** @private */
        this.destroyIndeterminate = false;
        /** @private */
        this.scaleX = 1;
        /** @private */
        this.scaleY = 1;
        /** ProgressTooltip module to use tooltip */
        this.progressTooltipModule = new ProgressTooltip(this);
    }
    getModuleName() {
        return 'progressbar';
    }
    preRender() {
        this.unWireEvents();
        this.initPrivateVariable();
        this.wireEvents();
    }
    initPrivateVariable() {
        this.progressRect = new Rect(0, 0, 0, 0);
        this.progressSize = new Size(0, 0);
    }
    render() {
        this.trigger('load', { progressBar: this });
        this.element.style.display = 'block';
        this.element.style.position = 'relative';
        this.calculateProgressBarSize();
        this.setTheme();
        this.createSVG();
        this.argsData = { value: this.value, progressColor: this.progressColor, trackColor: this.trackColor };
        if (this.argsData.value === this.maximum) {
            this.trigger(progressCompleted, this.argsData, () => { this.controlRendering(); });
        }
        else {
            this.trigger(valueChanged, this.argsData, () => { this.controlRendering(); });
        }
    }
    controlRendering() {
        this.renderElements();
        this.trigger('loaded', { progressBar: this });
        this.renderComplete();
        this.controlRenderedTimeStamp = new Date().getTime();
    }
    /**
     * calculate size of the progress bar
     */
    calculateProgressBarSize() {
        const containerWidth = this.element.clientWidth || this.element.offsetWidth;
        const containerHeight = this.element.clientHeight;
        const width = (this.type === 'Linear') ? 200 : 120;
        let height = (this.type === 'Linear') ? 30 : 120;
        const padding = 10;
        const thickness = Math.max(this.progressThickness, this.trackThickness);
        height = (this.type === 'Linear' && thickness > (height - padding)) ? thickness + padding : height;
        this.progressSize.width = stringToNumber(this.width, containerWidth) || containerWidth || width;
        this.progressSize.height = stringToNumber(this.height, containerHeight) || containerHeight || height;
        this.progressRect.x = this.margin.left;
        this.progressRect.y = this.margin.top;
        this.progressRect.width = this.progressSize.width - (this.margin.left + this.margin.right);
        this.progressRect.height = this.progressSize.height - (this.margin.top + this.margin.bottom);
        this.initialClipRect = new Rect(this.progressRect.x, this.progressRect.y, this.progressSize.height, this.progressSize.width);
    }
    /**
     * Render Annotation in progress bar
     */
    renderAnnotations() {
        this.renderAnnotation();
    }
    /**
     * Render SVG Element
     */
    renderElements() {
        this.createSecondaryElement();
        this.renderTrack();
        this.renderProgress();
        this.renderLabel();
        if (this.annotations.length > 0) {
            this.renderAnnotations();
        }
        this.setSecondaryElementPosition();
        if (this.tooltip.enable && !(this.tooltip.showTooltipOnHover)) {
            this.progressTooltipModule.tooltip();
        }
    }
    createSecondaryElement() {
        const secElement = document.getElementById(this.element.id + 'Secondary_Element');
        if (this.tooltip.enable) {
            this.tooltipElement = createElement('div', {
                id: this.element.id + '_tooltip',
                className: 'ejSVGTooltip',
                styles: 'pointer-events: none; position: absolute; zIndex: 1; visibility: visible'
            });
            if (secElement) {
                this.secElement.appendChild(this.tooltipElement);
            }
        }
        const tooltipElement = document.getElementById(this.element.id + '_tooltip');
        if (secElement) {
            secElement.innerHTML = '';
            this.secElement = tooltipElement ? secElement.appendChild(tooltipElement) : secElement;
            return;
        }
        this.secElement = createElement('div', {
            id: this.element.id + 'Secondary_Element',
            styles: 'position: absolute'
        });
        this.element.appendChild(this.secElement);
        if (this.tooltipElement) {
            this.secElement.appendChild(this.tooltipElement);
        }
    }
    /**
     * To set the left and top position for annotation for center aligned
     */
    setSecondaryElementPosition() {
        const element = this.secElement;
        const rect = this.element.getBoundingClientRect();
        if (getElement(this.svgObject.id)) {
            const svgRect = getElement(this.svgObject.id).getBoundingClientRect();
            element.style.left = Math.max(svgRect.left - rect.left, 0) + 'px';
            element.style.top = Math.max(svgRect.top - rect.top, 0) + 'px';
        }
    }
    createSVG() {
        this.removeSvg();
        this.renderer = new SvgRenderer(this.element.id);
        this.svgObject = this.renderer.createSvg({
            id: this.element.id + 'SVG',
            width: this.progressSize.width,
            height: this.progressSize.height,
            style: 'background-color:' + this.themeStyle.backgroundColor
        });
    }
    clipPathElement() {
        this.clipPath = this.renderer.createClipPath({ 'id': this.element.id + '_clippath' });
        this.bufferClipPath = this.renderer.createClipPath({ 'id': this.element.id + '_clippathBuffer' });
    }
    renderTrack() {
        if (this.type === 'Linear') {
            this.linear.renderLinearTrack();
        }
        else if (this.type === 'Circular') {
            this.circular.renderCircularTrack();
        }
    }
    renderProgress() {
        this.clipPathElement();
        if (this.type === 'Linear') {
            this.linear.renderLinearProgress();
        }
        else if (this.type === 'Circular') {
            this.circular.renderCircularProgress();
        }
    }
    renderLabel() {
        if (this.type === 'Linear' && this.showProgressValue && !this.isIndeterminate) {
            this.linear.renderLinearLabel();
        }
        else if (this.type === 'Circular' && this.showProgressValue && !this.isIndeterminate) {
            this.circular.renderCircularLabel();
        }
        this.element.appendChild(this.svgObject);
    }
    getPathLine(x, width, thickness) {
        const moveTo = (this.enableRtl) ? ((this.cornerRadius === 'Round') ?
            (x + this.progressRect.width) - ((lineCapRadius / 2) * thickness) : (x + this.progressRect.width)) :
            ((this.cornerRadius === 'Round') ? (x + (lineCapRadius / 2) * thickness) : x);
        //TODO : BLAZ-14309 - ProgressBar renders improperly when corner radius is set to "Round" and the value between one to four.
        thickness = width < thickness && this.cornerRadius === 'Round' ? width : thickness;
        const lineTo = (this.enableRtl) ? ((this.cornerRadius === 'Round' && width) ?
            (moveTo - width + (lineCapRadius * thickness)) : (moveTo - width)) :
            ((this.cornerRadius === 'Round' && width) ? (moveTo + width - (lineCapRadius * thickness)) : (moveTo + width));
        return 'M' + moveTo + ' ' + (this.progressRect.y + (this.progressRect.height / 2)) +
            'L' + lineTo + ' ' + (this.progressRect.y + (this.progressRect.height / 2));
    }
    calculateProgressRange(value, minimum, maximum) {
        const min = minimum || this.minimum;
        const max = maximum || this.maximum;
        const endValue = (value - min) / (max - min) * ((this.type === 'Linear') ? 1 : this.totalAngle);
        const result = (value < min || value > max) ? 0 : endValue;
        return result;
    }
    calculateSegmentSize(width, thickness) {
        const count = (this.type === 'Circular' && this.totalAngle === completeAngle) ? this.segmentCount : this.segmentCount - 1;
        const cornerCount = (this.totalAngle === completeAngle || this.type === 'Linear') ? this.segmentCount : this.segmentCount - 1;
        let gap = this.gapWidth || ((this.type === 'Linear') ? this.themeStyle.linearGapWidth : this.themeStyle.circularGapWidth);
        let size = (width - count * gap);
        size = (size - ((this.cornerRadius === 'Round') ? (cornerCount * (lineCapRadius * thickness)) : 0)) / this.segmentCount;
        gap += (this.cornerRadius === 'Round') ? lineCapRadius * thickness : 0;
        return ' ' + size + ' ' + gap;
    }
    createClipPath(clipPath, range, d, refresh, thickness, isLabel, isMaximum) {
        let path;
        let rect;
        let option;
        let posx;
        let posy;
        let pathWidth;
        const x = this.progressRect.x;
        const totalWidth = this.progressRect.width;
        if (this.type === 'Linear') {
            if (this.cornerRadius === 'Round4px') {
                posx = x;
                pathWidth = totalWidth * range;
                posx += (!isLabel) ? (-4) : 0;
                posy = this.progressRect.y;
                pathWidth += ((!isLabel && isMaximum) || this.isIndeterminate) ? 4 : 0;
            }
            else {
                //TODO : BLAZ-14309 - ProgressBar renders improperly when corner radius is set to "Round" and the value between one to four.
                posx = (this.enableRtl && !isLabel) ? (x + totalWidth + (this.cornerRadius === 'Round' ? thickness / 10 : 0)) : x - (this.cornerRadius === 'Round' ? thickness / 10 : 0);
                pathWidth = totalWidth * range;
                //TODO : BLAZ-14309 - ProgressBar renders improperly when corner radius is set to "Round" and the value between one to four.
                //posx += (this.cornerRadius === 'Round' && !isLabel) ?
                //    ((this.enableRtl) ? (lineCapRadius / 2) * thickness : -(lineCapRadius / 2) * thickness) : 0;
                posy = (this.progressRect.y + (this.progressRect.height / 2)) - (thickness / 2);
                pathWidth += (this.cornerRadius === 'Round' && !isLabel) ? (lineCapRadius * thickness) : 0;
            }
            if (!refresh) {
                rect = new RectOption(this.element.id + '_clippathrect' + (isLabel ? 'label' : ''), 'transparent', 1, 'transparent', 1, new Rect(posx, posy, thickness, pathWidth));
                path = this.renderer.drawRectangle(rect);
                clipPath.appendChild(path);
            }
            else {
                path = getElement(this.element.id + '_clippathrect' + (isLabel ? 'label' : ''));
                path.setAttribute('width', (pathWidth).toString());
                if (this.isActive) {
                    path.setAttribute('x', (posx).toString());
                }
            }
        }
        else {
            if (!refresh) {
                option = new PathOption(this.element.id + '_clippathcircle', 'transparent', 10, 'transparent', 1, '0', d);
                path = this.renderer.drawPath(option);
                clipPath.appendChild(path);
            }
            else {
                path = getElement(this.element.id + '_clippathcircle');
                path.setAttribute('d', d);
            }
        }
        return path;
    }
    /**
     * Theming for progress bar
     */
    setTheme() {
        this.themeStyle = getProgressThemeColor(this.theme);
        switch (this.theme) {
            case 'Bootstrap':
            case 'Bootstrap4':
                this.cornerRadius = this.cornerRadius === 'Auto' ?
                    ((this.type === 'Linear') ? 'Round4px' : 'Round') : this.cornerRadius;
                break;
            default:
                this.cornerRadius = this.cornerRadius === 'Auto' ? 'Square' : this.cornerRadius;
        }
    }
    /**
     * Annotation for progress bar
     */
    renderAnnotation() {
        if (this.progressAnnotationModule && this.annotations.length > 0) {
            this.progressAnnotationModule.renderAnnotations(this.secElement);
        }
    }
    /**
     * Handles the progressbar resize.
     *
     * @returns {boolean} false
     * @private
     */
    progressResize() {
        // 800 used as buffer time for resize event preventing from control rendered time
        if (!(new Date().getTime() > this.controlRenderedTimeStamp + 800)) {
            return false;
        }
        const arg = {
            bar: this,
            name: 'resized',
            currentSize: new Size(0, 0),
            previousSize: new Size(this.progressSize.width, this.progressSize.height),
            cancel: (this.cancelResize) ? true : false
        };
        if (this.resizeTo) {
            clearTimeout(this.resizeTo);
        }
        this.resizeTo = setTimeout(() => {
            if (this.isDestroyed) {
                clearTimeout(this.resizeTo);
                return;
            }
            arg.currentSize = this.progressSize;
            this.trigger('resized', arg);
            if ((this.width === null || this.height === null || this.width.indexOf('%') > -1 || this.height.indexOf('%') > -1)
                && !arg.cancel) {
                if (this.secElement) {
                    this.secElement.innerHTML = '';
                }
                this.calculateProgressBarSize();
                this.createSVG();
                this.renderElements();
            }
        }, 500);
        return false;
    }
    progressMouseClick(e) {
        this.mouseEvent(mouseClick, e);
    }
    progressMouseDown(e) {
        this.mouseEvent(mouseDown, e);
    }
    progressMouseMove(e) {
        this.mouseEvent(mouseMove, e);
        const target = e.target;
        if (this.tooltip.enable && this.tooltip.showTooltipOnHover) {
            if (target.id.indexOf('Circularprogress') >= 0 || target.id.indexOf('Circularbuffer') >= 0 || target.id.indexOf('Linearprogress') >= 0 || target.id.indexOf('Linearbuffer') >= 0 || target.id.indexOf('Linearbuffer') >= 0) {
                this.progressTooltipModule.tooltip(e);
            }
            else if (this.progressTooltipModule.isRendered) {
                this.progressTooltipModule.removeTooltip(1000);
                this.progressTooltipModule.isRendered = false;
            }
        }
    }
    progressMouseUp(e) {
        this.mouseEvent(mouseUp, e);
    }
    progressMouseLeave(e) {
        this.mouseEvent(mouseLeave, e);
    }
    mouseEvent(eventName, e) {
        const element = e.target;
        this.trigger(eventName, { target: element.id });
    }
    /**
     * Method to un-bind events for progress bar
     */
    unWireEvents() {
        const startEvent = Browser.touchStartEvent;
        const moveEvent = Browser.touchMoveEvent;
        const stopEvent = Browser.touchEndEvent;
        /*! Find the Events type */
        const cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        /*! UnBind the Event handler */
        EventHandler.remove(this.element, 'click', this.progressMouseClick);
        EventHandler.remove(this.element, startEvent, this.progressMouseDown);
        EventHandler.remove(this.element, moveEvent, this.progressMouseMove);
        EventHandler.remove(this.element, stopEvent, this.progressMouseUp);
        EventHandler.remove(this.element, cancelEvent, this.progressMouseLeave);
        window.removeEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.resizeBounds);
    }
    /**
     * Method to bind events for bullet chart
     */
    wireEvents() {
        const startEvent = Browser.touchStartEvent;
        const moveEvent = Browser.touchMoveEvent;
        const stopEvent = Browser.touchEndEvent;
        /*! Find the Events type */
        const cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        /*! Bind the Event handler */
        EventHandler.add(this.element, 'click', this.progressMouseClick, this);
        EventHandler.add(this.element, startEvent, this.progressMouseDown, this);
        EventHandler.add(this.element, moveEvent, this.progressMouseMove, this);
        EventHandler.add(this.element, stopEvent, this.progressMouseUp, this);
        EventHandler.add(this.element, cancelEvent, this.progressMouseLeave, this);
        this.resizeBounds = this.progressResize.bind(this);
        window.addEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.resizeBounds);
    }
    removeSvg() {
        const svgElement = document.getElementById(this.element.id + 'SVG');
        if (svgElement) {
            remove(svgElement);
        }
    }
    onPropertyChanged(newProp, oldProp) {
        for (const prop of Object.keys(newProp)) {
            switch (prop) {
                case 'annotations':
                    this.secElement.innerHTML = '';
                    this.renderAnnotation();
                    break;
                case 'value':
                    this.cancelResize = (this.animation.enable) ? true : false;
                    this.argsData = {
                        value: this.value,
                        progressColor: this.argsData.progressColor,
                        trackColor: this.argsData.trackColor
                    };
                    if (this.argsData.value < oldProp.value && this.animation.enable) {
                        this.argsData.value = oldProp.value;
                    }
                    if (this.argsData.value === this.maximum) {
                        this.trigger(progressCompleted, this.argsData);
                    }
                    else {
                        this.trigger(valueChanged, this.argsData);
                    }
                    if (this.type === 'Circular') {
                        this.circular.renderCircularProgress(this.previousEndAngle, this.previousTotalEnd, !isNullOrUndefined(oldProp.value));
                        if (this.showProgressValue) {
                            this.circular.renderCircularLabel(true);
                        }
                        if (this.progressAnnotationModule && this.animation.enable && !this.isIndeterminate) {
                            this.annotateAnimation.doAnnotationAnimation(this.clipPath, this, this.annotateEnd, this.annotateTotal);
                        }
                    }
                    else {
                        this.linear.renderLinearProgress(!isNullOrUndefined(oldProp.value), this.previousWidth);
                        if (this.showProgressValue) {
                            this.linear.renderLinearLabel(true);
                        }
                    }
                    break;
                case 'animation':
                    this.createSVG();
                    this.renderElements();
                    break;
            }
        }
    }
    requiredModules() {
        const modules = [];
        let enableAnnotation = false;
        enableAnnotation = this.annotations.some((value) => {
            return (value.content !== null);
        });
        if (enableAnnotation) {
            modules.push({
                member: 'ProgressAnnotation',
                args: [this]
            });
        }
        if (this.tooltip.enable) {
            modules.push({
                member: 'Tooltip',
                args: [this]
            });
        }
        return modules;
    }
    getPersistData() {
        return ' ';
    }
    show() {
        if (!isNullOrUndefined(this.svgObject)) {
            this.svgObject.setAttribute('visibility', 'Visible');
            if (this.isIndeterminate) {
                this.destroyIndeterminate = false;
                if (this.type === 'Linear') {
                    this.linear.renderLinearProgress(true);
                }
                else {
                    this.circular.renderCircularProgress(null, null, true);
                }
            }
        }
    }
    hide() {
        if (!isNullOrUndefined(this.svgObject)) {
            this.svgObject.setAttribute('visibility', 'Hidden');
            if (this.isIndeterminate) {
                this.destroyIndeterminate = true;
            }
        }
    }
    /**
     * To destroy the widget
     *
     * @function destroy
     * @returns {void}
     * @member of ProgressBar
     */
    destroy() {
        this.unWireEvents();
        super.destroy();
        this.removeSvg();
        // tslint:disable-next-line:no-any
        if (this.isReact) {
            this.clearTemplate();
        }
        this.svgObject = null;
        this.element.classList.remove('e-progressbar');
        if (!this.refreshing) {
            this.destroyIndeterminate = true;
        }
    }
};
__decorate([
    Property('Linear')
], ProgressBar.prototype, "type", void 0);
__decorate([
    Property(null)
], ProgressBar.prototype, "value", void 0);
__decorate([
    Property(null)
], ProgressBar.prototype, "secondaryProgress", void 0);
__decorate([
    Property('')
], ProgressBar.prototype, "secondaryProgressColor", void 0);
__decorate([
    Property(null)
], ProgressBar.prototype, "secondaryProgressThickness", void 0);
__decorate([
    Property(0)
], ProgressBar.prototype, "minimum", void 0);
__decorate([
    Property(100)
], ProgressBar.prototype, "maximum", void 0);
__decorate([
    Property(0)
], ProgressBar.prototype, "startAngle", void 0);
__decorate([
    Property(0)
], ProgressBar.prototype, "endAngle", void 0);
__decorate([
    Property('100%')
], ProgressBar.prototype, "radius", void 0);
__decorate([
    Property('100%')
], ProgressBar.prototype, "innerRadius", void 0);
__decorate([
    Property(1)
], ProgressBar.prototype, "segmentCount", void 0);
__decorate([
    Property(null)
], ProgressBar.prototype, "gapWidth", void 0);
__decorate([
    Property('')
], ProgressBar.prototype, "segmentColor", void 0);
__decorate([
    Property('Auto')
], ProgressBar.prototype, "cornerRadius", void 0);
__decorate([
    Property(null)
], ProgressBar.prototype, "height", void 0);
__decorate([
    Property(null)
], ProgressBar.prototype, "width", void 0);
__decorate([
    Property(false)
], ProgressBar.prototype, "isIndeterminate", void 0);
__decorate([
    Property(false)
], ProgressBar.prototype, "isActive", void 0);
__decorate([
    Property(false)
], ProgressBar.prototype, "isGradient", void 0);
__decorate([
    Property(false)
], ProgressBar.prototype, "isStriped", void 0);
__decorate([
    Property('Auto')
], ProgressBar.prototype, "role", void 0);
__decorate([
    Property(false)
], ProgressBar.prototype, "enableRtl", void 0);
__decorate([
    Property(true)
], ProgressBar.prototype, "labelOnTrack", void 0);
__decorate([
    Property(null)
], ProgressBar.prototype, "trackColor", void 0);
__decorate([
    Property(null)
], ProgressBar.prototype, "progressColor", void 0);
__decorate([
    Property(0)
], ProgressBar.prototype, "trackThickness", void 0);
__decorate([
    Property(0)
], ProgressBar.prototype, "progressThickness", void 0);
__decorate([
    Property(false)
], ProgressBar.prototype, "enablePieProgress", void 0);
__decorate([
    Property('Fabric')
], ProgressBar.prototype, "theme", void 0);
__decorate([
    Property(false)
], ProgressBar.prototype, "showProgressValue", void 0);
__decorate([
    Property(false)
], ProgressBar.prototype, "enableProgressSegments", void 0);
__decorate([
    Complex({ size: null, color: null, fontStyle: null, fontWeight: null, fontFamily: null }, Font)
], ProgressBar.prototype, "labelStyle", void 0);
__decorate([
    Complex({}, Margin)
], ProgressBar.prototype, "margin", void 0);
__decorate([
    Complex({}, Animation$1)
], ProgressBar.prototype, "animation", void 0);
__decorate([
    Complex({}, TooltipSettings)
], ProgressBar.prototype, "tooltip", void 0);
__decorate([
    Event()
], ProgressBar.prototype, "load", void 0);
__decorate([
    Event()
], ProgressBar.prototype, "textRender", void 0);
__decorate([
    Event()
], ProgressBar.prototype, "loaded", void 0);
__decorate([
    Event()
], ProgressBar.prototype, "valueChanged", void 0);
__decorate([
    Event()
], ProgressBar.prototype, "progressCompleted", void 0);
__decorate([
    Event()
], ProgressBar.prototype, "animationComplete", void 0);
__decorate([
    Event()
], ProgressBar.prototype, "mouseClick", void 0);
__decorate([
    Event()
], ProgressBar.prototype, "mouseMove", void 0);
__decorate([
    Event()
], ProgressBar.prototype, "mouseUp", void 0);
__decorate([
    Event()
], ProgressBar.prototype, "mouseDown", void 0);
__decorate([
    Event()
], ProgressBar.prototype, "mouseLeave", void 0);
__decorate([
    Event()
], ProgressBar.prototype, "tooltipRender", void 0);
__decorate([
    Collection([{}], ProgressAnnotationSettings)
], ProgressBar.prototype, "annotations", void 0);
__decorate([
    Collection([{}], RangeColor)
], ProgressBar.prototype, "rangeColors", void 0);
ProgressBar = __decorate([
    NotifyPropertyChanges
], ProgressBar);

/**
 * Progress Bar component export methods
 */

/**
 * Progress Bar component export methods
 */

export { ProgressBar, Margin, Font, Animation$1 as Animation, ProgressAnnotationSettings, Border, TooltipSettings, RangeColor, ProgressAnnotation, ProgressTooltip, Rect, Size, Pos, RectOption, ColorValue, convertToHexCode, componentToHex, convertHexToColor, colorNameToHex, TextOption, degreeToLocation, getPathArc, stringToNumber, setAttributes, effect, annotationRender, getElement$1 as getElement, removeElement, ProgressLocation, ProgressAnimation };
//# sourceMappingURL=ej2-progressbar.es2015.js.map
