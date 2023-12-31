import { tooltipRender } from '../index';
import { Tooltip } from '@syncfusion/ej2-svg-base';
import { createElement, Browser, isNullOrUndefined, extend, remove, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { getMousePosition, Internalize, checkPropertyPath, getValueFromObject, formatValue, convertStringToValue } from '../utils/helper';
import { click } from '../model/constants';
/**
 * Map Tooltip
 */
var MapsTooltip = /** @class */ (function () {
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
                var marker = layer.markerSettings[markerIdex];
                option = marker.tooltipSettings;
                templateData = marker.dataSource[dataIndex];
                if (option.visible && !isNaN(markerIdex)) {
                    if (marker.tooltipSettings.format) {
                        currentData = this.formatter(marker.tooltipSettings.format, marker.dataSource[dataIndex]);
                    }
                    else {
                        if (typeof marker.template !== 'function' && marker.template && !marker.tooltipSettings.valuePath) {
                            currentData = marker.template.split('>')[1].split('<')[0];
                        }
                        else {
                            currentData =
                                formatValue(((marker.tooltipSettings.valuePath.indexOf('.') > -1) ?
                                    (getValueFromObject(marker.dataSource[dataIndex], marker.tooltipSettings.valuePath)) :
                                    marker.dataSource[dataIndex][marker.tooltipSettings.valuePath]), this.maps);
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
export { MapsTooltip };
