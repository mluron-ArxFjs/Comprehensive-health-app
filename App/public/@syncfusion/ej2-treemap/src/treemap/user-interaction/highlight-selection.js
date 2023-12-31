import { Browser } from '@syncfusion/ej2-base';
import { itemHighlight, itemSelected } from '../model/constants';
import { findHightLightItems, removeClassNames, applyOptions, removeShape, removeLegend, removeSelectionWithHighlight, setColor, getLegendIndex, pushCollection, setItemTemplateContent } from '../utils/helper';
/**
 * Performing treemap highlight
 */
var TreeMapHighlight = /** @class */ (function () {
    function TreeMapHighlight(treeMap) {
        this.target = 'highlight';
        this.shapeTarget = 'highlight';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.shapeHighlightCollection = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.legendHighlightCollection = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.currentElement = [];
        this.treemap = treeMap;
        this.addEventListener();
    }
    /**
     * Mouse down event in highlight
     *
     * @param {PointerEvent} e - Specifies the pointer argument.
     * @returns {boolean} - return the highlight process is true or false.
     * @private
     */
    TreeMapHighlight.prototype.mouseMove = function (e) {
        var treemap = this.treemap;
        var processHighlight;
        var targetId = e.target.id;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var eventArgs;
        var items = [];
        var highlight = this.treemap.highlightSettings;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var item;
        var highLightElements = [];
        var process;
        var treeMapElement;
        var element;
        var orders;
        var selectionModule = this.treemap.treeMapSelectionModule;
        if (targetId.indexOf('_Item_Index') > -1 && (selectionModule ? this.treemap.selectionId !== targetId : true)) {
            if (this.highLightId !== targetId) {
                treeMapElement = document.getElementById(treemap.element.id + '_TreeMap_' + treemap.layoutType + '_Layout');
                var selectionElements = document.getElementsByClassName('treeMapSelection');
                item = this.treemap.layout.renderItems[parseFloat(targetId.split('_Item_Index_')[1])];
                var index = void 0;
                if (this.treemap.legendSettings.visible) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var collection = this.treemap.treeMapLegendModule.legendCollections;
                    var length_1 = this.treemap.treeMapLegendModule.legendCollections.length;
                    index = getLegendIndex(length_1, item, treemap);
                    this.shapeElement = this.treemap.legendSettings.mode === 'Default' ? document.getElementById(this.treemap.element.id + '_Legend_Shape_Index_' + index) : document.getElementById(this.treemap.element.id + '_Legend_Index_' + index);
                    if (this.shapeElement !== null && (selectionModule ? this.shapeElement.getAttribute('id') !== selectionModule.legendSelectId : true)) {
                        if (selectionModule ? this.shapeElement !== selectionModule.shapeElement : true) {
                            this.currentElement.push({ currentElement: this.shapeElement });
                            removeShape(this.shapeHighlightCollection);
                            this.shapeHighlightCollection.push({ legendEle: this.shapeElement, oldFill: collection[index]['legendFill'],
                                oldOpacity: collection[index]['opacity'], oldBorderColor: collection[index]['borderColor'],
                                oldBorderWidth: collection[index]['borderWidth']
                            });
                            setColor(this.shapeElement, highlight.fill, highlight.opacity, highlight.border.color, highlight.border.width.toString());
                            this.target = 'highlight';
                        }
                        else if (this.currentElement.length > 0 && this.currentElement[this.currentElement.length - 1]['currentElement'] !== this.shapeElement) {
                            removeSelectionWithHighlight(this.shapeHighlightCollection, this.currentElement, treemap);
                            this.highLightId = '';
                        }
                    }
                    else if (this.currentElement.length > 0 && this.currentElement[this.currentElement.length - 1]['currentElement'] !== this.shapeElement) {
                        removeSelectionWithHighlight(this.shapeHighlightCollection, this.currentElement, treemap);
                        this.highLightId = '';
                    }
                }
                orders = findHightLightItems(item, [], highlight.mode, treemap);
                if (this.treemap.legendSettings.visible ? selectionModule ? this.shapeElement ? this.shapeElement.getAttribute('id') !== selectionModule.legendSelectId : true : true : true) {
                    if (this.treemap.legendSettings.visible ? selectionModule ?
                        this.shapeElement !== selectionModule.shapeElement : true : true) {
                        for (var i = 0; i < treeMapElement.childElementCount; i++) {
                            element = treeMapElement.childNodes[i];
                            process = true;
                            item = treemap.layout.renderItems[parseFloat(element.id.split('_Item_Index_')[1])];
                            for (var j = 0; j < selectionElements.length; j++) {
                                if (element.id === selectionElements[j].id) {
                                    process = false;
                                    break;
                                }
                            }
                            if (orders.indexOf(item['levelOrderName']) > -1 && process) {
                                highLightElements.push(element);
                                items.push(item);
                            }
                        }
                        removeClassNames(document.getElementsByClassName('treeMapHighLight'), 'treeMapHighLight', treemap);
                        for (var k = 0; k < highLightElements.length; k++) {
                            element = highLightElements[k];
                            applyOptions(element.childNodes[0], { border: highlight.border, fill: highlight.fill, opacity: highlight.opacity });
                            element.classList.add('treeMapHighLight');
                            this.highLightId = targetId;
                        }
                        eventArgs = { cancel: false, name: itemHighlight, treemap: treemap, items: items, elements: highLightElements };
                        treemap.trigger(itemHighlight, eventArgs);
                    }
                    else {
                        processHighlight = false;
                    }
                }
            }
        }
        else if (targetId.indexOf('_Legend_Shape') > -1 || targetId.indexOf('_Legend_Index') > -1) {
            if (this.treemap.legendSettings.visible && (selectionModule ? selectionModule.legendSelectId !== targetId : true)
                && (selectionModule ? selectionModule.shapeSelectId !== targetId : true)) {
                var itemIndex = void 0;
                var groupIndex = void 0;
                var length_2;
                var targetEle = document.getElementById(targetId);
                if (this.shapeTarget === 'highlight') {
                    removeLegend(this.legendHighlightCollection);
                }
                this.shapeTarget = 'highlight';
                var index = this.treemap.legendSettings.mode === 'Default' ? parseFloat(targetId.split('_Legend_Shape_Index_')[1]) : parseFloat(targetId.split('_Legend_Index_')[1]);
                var dataLength = this.treemap.treeMapLegendModule.legendCollections[index]['legendData'].length;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var collection = this.treemap.treeMapLegendModule.legendCollections;
                var legendIndex = parseInt(targetId[targetId.length - 1], 10);
                for (var i = 0; i < dataLength; i++) {
                    for (var j = 0; j < this.treemap.layout.renderItems.length; j++) {
                        if (this.treemap.treeMapLegendModule.legendCollections[index]['legendData'][i]['levelOrderName'] === this.treemap.layout.renderItems[j]['levelOrderName']) {
                            itemIndex = j;
                            groupIndex = this.treemap.layout.renderItems[j]['groupIndex'];
                            var nodeEle = document.getElementById(this.treemap.element.id + '_Level_Index_' + groupIndex + '_Item_Index_' + itemIndex + '_RectPath');
                            if (i === 0) {
                                this.legendHighlightCollection = [];
                                pushCollection(this.legendHighlightCollection, legendIndex, j, targetEle, nodeEle, this.treemap.layout.renderItems, collection);
                                length_2 = this.legendHighlightCollection.length;
                                this.legendHighlightCollection[length_2 - 1]['ShapeCollection'] = { Elements: [] };
                            }
                            setColor(targetEle, highlight.fill, highlight.opacity, highlight.border.color, highlight.border.width.toString());
                            setColor(nodeEle, highlight.fill, highlight.opacity, highlight.border.color, highlight.border.width.toString());
                            length_2 = this.legendHighlightCollection.length;
                            this.legendHighlightCollection[length_2 - 1]['ShapeCollection']['Elements'].push(nodeEle);
                        }
                    }
                }
            }
        }
        else {
            if (selectionModule ? this.shapeElement ? this.shapeElement.getAttribute('id') !== selectionModule.legendSelectId : true : true) {
                if (selectionModule ? this.shapeElement !== selectionModule.shapeElement : true && this.treemap.legendSettings.visible) {
                    removeClassNames(document.getElementsByClassName('treeMapHighLight'), 'treeMapHighLight', treemap);
                }
            }
            if ((this.shapeTarget === 'highlight' || this.target === 'highlight') && this.treemap.legendSettings.visible) {
                if (selectionModule ? this.shapeElement ? this.shapeElement.getAttribute('id') !== selectionModule.legendSelectId : true : true) {
                    if (selectionModule ? this.shapeElement !== selectionModule.shapeElement : true && selectionModule ?
                        selectionModule.legendSelect : true) {
                        removeShape(this.shapeHighlightCollection);
                        this.shapeHighlightCollection = [];
                    }
                }
            }
            if (this.shapeTarget === 'highlight' && this.treemap.legendSettings.visible) {
                removeLegend(this.legendHighlightCollection);
            }
            this.highLightId = '';
            processHighlight = false;
        }
        return processHighlight;
    };
    /**
     * To bind events for highlight
     *
     * @returns {void}
     */
    TreeMapHighlight.prototype.addEventListener = function () {
        if (this.treemap.isDestroyed) {
            return;
        }
        this.treemap.on(Browser.touchMoveEvent, this.mouseMove, this);
    };
    /**
     * To unbind events for highlight
     *
     * @returns {void}
     */
    TreeMapHighlight.prototype.removeEventListener = function () {
        if (this.treemap.isDestroyed) {
            return;
        }
        this.treemap.off(Browser.touchMoveEvent, this.mouseMove);
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name
     */
    TreeMapHighlight.prototype.getModuleName = function () {
        return 'treeMapHighlight';
    };
    /**
     * To destroy the hightlight.
     *
     * @returns {void}
     * @private
     */
    TreeMapHighlight.prototype.destroy = function () {
        this.shapeElement = null;
        this.shapeHighlightCollection = [];
        this.legendHighlightCollection = [];
        this.currentElement = [];
        this.removeEventListener();
        this.treemap = null;
    };
    return TreeMapHighlight;
}());
export { TreeMapHighlight };
/**
 * Performing treemap selection
 */
var TreeMapSelection = /** @class */ (function () {
    function TreeMapSelection(treeMap) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.shapeSelectionCollection = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.legendSelectionCollection = [];
        this.shapeSelect = true;
        this.legendSelect = true;
        this.treemap = treeMap;
        this.addEventListener();
    }
    /**
     * Mouse down event in selection
     *
     * @param {PointerEvent} e - Specifies the pointer argument.
     * @returns {void}
     * @private
     */
    TreeMapSelection.prototype.mouseDown = function (e) {
        var targetEle = e.target;
        var eventArgs;
        var treemap = this.treemap;
        treemap.levelSelection = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var items = [];
        var targetId = targetEle.id;
        var labelText = targetEle.innerHTML;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var item;
        var selectionElements = [];
        var treeMapElement;
        var element;
        var orders;
        var selection = treemap.selectionSettings;
        var highlightModule = this.treemap.treeMapHighlightModule;
        var layoutID = treemap.element.id + '_TreeMap_' + treemap.layoutType + '_Layout';
        if (targetId.indexOf('_Item_Index') > -1) {
            e.preventDefault();
            if (this.treemap.selectionId !== targetId && this.legendSelect) {
                treeMapElement = document.getElementById(layoutID);
                item = treemap.layout.renderItems[parseFloat(targetId.split('_Item_Index_')[1])];
                var index = void 0;
                if (this.treemap.legendSettings.visible) {
                    this.shapeSelect = false;
                    var length_3 = this.treemap.treeMapLegendModule.legendCollections.length;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var collection = this.treemap.treeMapLegendModule.legendCollections;
                    this.shapeElement = undefined;
                    removeShape(this.shapeSelectionCollection);
                    if (highlightModule) {
                        highlightModule.shapeTarget = 'selection';
                        highlightModule.shapeHighlightCollection = [];
                    }
                    index = getLegendIndex(length_3, item, treemap);
                    this.shapeElement = this.treemap.legendSettings.mode === 'Default' ? document.getElementById(this.treemap.element.id + '_Legend_Shape_Index_' + index) : document.getElementById(this.treemap.element.id + '_Legend_Index_' + index);
                    if (this.shapeElement !== null) {
                        this.shapeSelectId = this.shapeElement.getAttribute('id');
                        this.shapeSelectionCollection.push({ legendEle: this.shapeElement, oldFill: collection[index]['legendFill'],
                            oldOpacity: collection[index]['opacity'], oldBorderColor: collection[index]['borderColor'],
                            oldBorderWidth: collection[index]['borderWidth']
                        });
                        setColor(this.shapeElement, selection.fill, selection.opacity, selection.border.color, selection.border.width.toString());
                    }
                }
                orders = findHightLightItems(item, [], selection.mode, treemap);
                for (var i = 0; i < treeMapElement.childElementCount; i++) {
                    element = treeMapElement.childNodes[i];
                    item = treemap.layout.renderItems[parseFloat(element.id.split('_Item_Index_')[1])];
                    if (orders.indexOf(item['levelOrderName']) > -1) {
                        selectionElements.push(element);
                        treemap.levelSelection.push(element.id);
                        items.push(item);
                    }
                }
                removeClassNames(document.getElementsByClassName('treeMapSelection'), 'treeMapSelection', treemap);
                this.treemap.selectionId = targetId;
                var highLightElements = document.getElementsByClassName('treeMapHighLight');
                for (var k = 0; k < selectionElements.length; k++) {
                    element = selectionElements[k];
                    if (highLightElements.length > 0) {
                        for (var j = 0; j < highLightElements.length; j++) {
                            if (highLightElements[j].id === element.id) {
                                highLightElements[j].classList.remove('treeMapHighLight');
                            }
                            applyOptions(element.childNodes[0], { border: selection.border, fill: selection.fill, opacity: selection.opacity });
                            element.classList.add('treeMapSelection');
                        }
                    }
                    else {
                        applyOptions(element.childNodes[0], { border: selection.border, fill: selection.fill, opacity: selection.opacity });
                        element.classList.add('treeMapSelection');
                    }
                    eventArgs = { cancel: false, name: itemSelected, treemap: treemap, items: items, elements: selectionElements,
                        text: labelText, contentItemTemplate: labelText };
                    treemap.trigger(itemSelected, eventArgs, function (observedArgs) {
                        if (observedArgs.contentItemTemplate !== labelText) {
                            setItemTemplateContent(targetId, targetEle, observedArgs.contentItemTemplate);
                        }
                    });
                }
            }
            else {
                removeShape(this.shapeSelectionCollection);
                this.shapeSelectionCollection = [];
                this.shapeElement = undefined;
                this.shapeSelect = true;
                this.shapeSelectId = '';
                this.treemap.legendId = [];
                removeClassNames(document.getElementsByClassName('treeMapSelection'), 'treeMapSelection', treemap);
                this.treemap.selectionId = '';
            }
        }
        else if (targetId.indexOf('_Legend_Shape') > -1 || targetId.indexOf('_Legend_Index') > -1) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var collection = this.treemap.treeMapLegendModule.legendCollections;
            if (this.treemap.legendSettings.visible && this.legendSelectId !== targetId && this.shapeSelect) {
                var itemIndex = void 0;
                var groupIndex = void 0;
                var length_4;
                this.legendSelectId = targetId;
                this.legendSelect = false;
                var legendIndex = parseInt(targetId[targetId.length - 1], 10);
                var targetEle_1 = document.getElementById(targetId);
                removeLegend(this.legendSelectionCollection);
                if (highlightModule) {
                    highlightModule.shapeTarget = 'selection';
                }
                var index = this.treemap.legendSettings.mode === 'Default' ? parseFloat(targetId.split('_Legend_Shape_Index_')[1]) : parseFloat(targetId.split('_Legend_Index_')[1]);
                var dataLength = this.treemap.treeMapLegendModule.legendCollections[index]['legendData'].length;
                for (var k = 0; k < dataLength; k++) {
                    for (var l = 0; l < this.treemap.layout.renderItems.length; l++) {
                        if (this.treemap.treeMapLegendModule.legendCollections[index]['legendData'][k]['levelOrderName'] === this.treemap.layout.renderItems[l]['levelOrderName']) {
                            itemIndex = l;
                            groupIndex = this.treemap.layout.renderItems[l]['groupIndex'];
                            var nodeEle = document.getElementById(this.treemap.element.id + '_Level_Index_' + groupIndex + '_Item_Index_' + itemIndex + '_RectPath');
                            if (k === 0) {
                                pushCollection(this.legendSelectionCollection, legendIndex, l, targetEle_1, nodeEle, this.treemap.layout.renderItems, collection);
                                length_4 = this.legendSelectionCollection.length;
                                this.legendSelectionCollection[length_4 - 1]['ShapeCollection'] = { Elements: [] };
                            }
                            setColor(targetEle_1, selection.fill, selection.opacity, selection.border.color, selection.border.width.toString());
                            setColor(nodeEle, selection.fill, selection.opacity, selection.border.color, selection.border.width.toString());
                            length_4 = this.legendSelectionCollection.length;
                            this.legendSelectionCollection[length_4 - 1]['ShapeCollection']['Elements'].push(nodeEle);
                        }
                    }
                }
            }
            else {
                removeLegend(this.legendSelectionCollection);
                if (highlightModule) {
                    highlightModule.shapeTarget = 'highlight';
                }
                this.legendSelect = true;
                this.legendSelectId = '';
            }
        }
    };
    /**
     * @param {string} levelOrder - Specifies the level order of treemap item
     * @param {boolean} enable - Specifies the boolean value
     * @returns {void}
     * @private
     */
    TreeMapSelection.prototype.selectTreemapItem = function (levelOrder, enable) {
        if (enable) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var item = void 0;
            for (var s = 0; s < this.treemap.layout.renderItems.length; s++) {
                if (levelOrder === this.treemap.layout.renderItems[s]['levelOrderName']) {
                    item = this.treemap.layout.renderItems[s];
                    break;
                }
            }
            var selection = this.treemap.selectionSettings;
            var selectionElements = [];
            var element = void 0;
            var index = void 0;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var items = [];
            this.treemap.levelSelection = [];
            var layoutID = this.treemap.element.id + '_TreeMap_' + this.treemap.layoutType + '_Layout';
            var treeMapElement = document.getElementById(layoutID);
            var orders = findHightLightItems(item, [], selection.mode, this.treemap);
            for (var i = 0; i < treeMapElement.childElementCount; i++) {
                element = treeMapElement.childNodes[i];
                item = this.treemap.layout.renderItems[parseFloat(element.id.split('_Item_Index_')[1])];
                if (orders.indexOf(item['levelOrderName']) > -1) {
                    selectionElements.push(element);
                    this.treemap.levelSelection.push(element.id);
                    items.push(item);
                }
            }
            if (this.treemap.legendSettings.visible) {
                for (var m = 0; m < items.length; m++) {
                    this.shapeSelect = false;
                    var length_5 = this.treemap.treeMapLegendModule.legendCollections.length;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var collection = this.treemap.treeMapLegendModule.legendCollections;
                    this.shapeElement = undefined;
                    removeShape(this.shapeSelectionCollection);
                    index = getLegendIndex(length_5, items[m], this.treemap);
                    this.shapeElement = this.treemap.legendSettings.mode === 'Default' ? document.getElementById(this.treemap.element.id + '_Legend_Shape_Index_' + index) : document.getElementById(this.treemap.element.id + '_Legend_Index_' + index);
                    if (this.shapeElement !== null) {
                        this.shapeSelectId = this.shapeElement.getAttribute('id');
                        this.treemap.legendId.push(this.shapeSelectId);
                        this.shapeSelectionCollection.push({
                            legendEle: this.shapeElement, oldFill: collection[index]['legendFill'],
                            oldOpacity: collection[index]['opacity'], oldBorderColor: collection[index]['borderColor'],
                            oldBorderWidth: collection[index]['borderWidth']
                        });
                        setColor(this.shapeElement, selection.fill, selection.opacity, selection.border.color, selection.border.width.toString());
                    }
                }
            }
            removeClassNames(document.getElementsByClassName('treeMapSelection'), 'treeMapSelection', this.treemap);
            var selectionElement = document.getElementById(this.treemap.levelSelection[0]);
            this.treemap.selectionId = selectionElement.childNodes[0]['id'];
            var highLightElements = document.getElementsByClassName('treeMapHighLight');
            for (var k = 0; k < selectionElements.length; k++) {
                element = selectionElements[k];
                if (highLightElements.length > 0) {
                    for (var j = 0; j < highLightElements.length; j++) {
                        if (highLightElements[j].id === element.id) {
                            highLightElements[j].classList.remove('treeMapHighLight');
                        }
                        applyOptions(element.childNodes[0], { border: selection.border, fill: selection.fill, opacity: selection.opacity });
                        element.classList.add('treeMapSelection');
                    }
                }
                else {
                    selection.fill = selection.fill === 'null' ?
                        this.treemap.layout.renderItems[parseInt(element.id.split('Item_Index_')[1], 10)]['options']['fill']
                        : selection.fill;
                    applyOptions(element.childNodes[0], { border: selection.border, fill: selection.fill, opacity: selection.opacity });
                    element.classList.add('treeMapSelection');
                }
            }
        }
        else {
            removeShape(this.shapeSelectionCollection);
            this.shapeElement = undefined;
            this.treemap.levelSelection = [];
            this.shapeSelect = true;
            this.shapeSelectId = '';
            this.treemap.legendId = [];
            removeClassNames(document.getElementsByClassName('treeMapSelection'), 'treeMapSelection', this.treemap);
            this.treemap.selectionId = '';
        }
    };
    /**
     * To bind events for selection
     *
     * @returns {void}
     */
    TreeMapSelection.prototype.addEventListener = function () {
        if (this.treemap.isDestroyed) {
            return;
        }
        this.treemap.on(Browser.touchStartEvent, this.mouseDown, this);
    };
    /**
     * To unbind events for selection
     *
     * @returns {void}
     */
    TreeMapSelection.prototype.removeEventListener = function () {
        if (this.treemap.isDestroyed) {
            return;
        }
        this.treemap.off(Browser.touchStartEvent, this.mouseDown);
    };
    /**
     * Get module name.
     *
     * @returns {string} - Returns the module name.
     */
    TreeMapSelection.prototype.getModuleName = function () {
        return 'treeMapSelection';
    };
    /**
     * To destroy the selection.
     *
     * @returns {void}
     * @private
     */
    TreeMapSelection.prototype.destroy = function () {
        this.shapeElement = null;
        this.shapeSelectionCollection = [];
        this.legendSelectionCollection = [];
        this.removeEventListener();
        this.treemap = null;
    };
    return TreeMapSelection;
}());
export { TreeMapSelection };
