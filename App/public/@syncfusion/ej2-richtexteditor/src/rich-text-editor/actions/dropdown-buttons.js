import { addClass, isNullOrUndefined, removeClass, select, closest } from '@syncfusion/ej2-base';
import { RenderType } from '../base/enum';
import { getIndex } from '../base/util';
import * as events from '../base/constant';
import * as classes from '../base/classes';
import { getDropDownValue, getFormattedFontSize, getTooltipText } from '../base/util';
import * as model from '../models/items';
import { dispatchEvent } from '../base/util';
/**
 * `Toolbar` module is used to handle Toolbar actions.
 */
var DropDownButtons = /** @class */ (function () {
    function DropDownButtons(parent, serviceLocator) {
        this.parent = parent;
        this.locator = serviceLocator;
        this.renderFactory = this.locator.getService('rendererFactory');
        this.addEventListener();
    }
    DropDownButtons.prototype.initializeInstance = function () {
        this.toolbarRenderer = this.renderFactory.getRenderer(RenderType.Toolbar);
    };
    DropDownButtons.prototype.beforeRender = function (args) {
        var item = args.item;
        if (item.cssClass) {
            addClass([args.element], item.cssClass);
        }
        if (item.command === 'Alignments' || item.subCommand === 'JustifyLeft'
            || item.subCommand === 'JustifyRight' || item.subCommand === 'JustifyCenter') {
            args.element.setAttribute('title', getTooltipText(item.subCommand.toLocaleLowerCase(), this.locator));
        }
    };
    DropDownButtons.prototype.dropdownContent = function (width, type, content) {
        return ('<span style="display: inline-flex;' + 'width:' + ((type === 'quick') ? 'auto' : width) + '" >' +
            '<span class="e-rte-dropdown-btn-text">' + content + '</span></span>');
    };
    /**
     * renderDropDowns method
     *
     * @param {IDropDownRenderArgs} args - specifies the arguments
     * @returns {void}
     * @hidden

     */
    DropDownButtons.prototype.renderDropDowns = function (args) {
        var _this = this;
        this.initializeInstance();
        var type = args.containerType;
        var tbElement = args.container;
        model.templateItems.forEach(function (item) {
            var targetElement = undefined;
            if (getIndex(item, args.items) !== -1) {
                switch (item) {
                    case 'numberformatlist': {
                        targetElement = select('#' + _this.parent.getID() + '_' + type + '_NumberFormatList', tbElement);
                        if (isNullOrUndefined(targetElement) || targetElement.classList.contains(classes.CLS_DROPDOWN_BTN)) {
                            return;
                        }
                        var formatOLItem = _this.parent.numberFormatList.types.slice();
                        formatOLItem.forEach(function (item) {
                            Object.defineProperties(item, {
                                command: { value: 'Lists', enumerable: true }, subCommand: { value: 'NumberFormatList', enumerable: true }
                            });
                        });
                        _this.numberFormatListDropDown = _this.toolbarRenderer.renderListDropDown({
                            cssClass: 'e-order-list' + ' ' + classes.CLS_RTE_ELEMENTS + ' ' + classes.CLS_ICONS,
                            itemName: 'NumberFormatList', items: formatOLItem, element: targetElement
                        });
                        break;
                    }
                    case 'bulletformatlist': {
                        targetElement = select('#' + _this.parent.getID() + '_' + type + '_BulletFormatList', tbElement);
                        if (isNullOrUndefined(targetElement) || targetElement.classList.contains(classes.CLS_DROPDOWN_BTN)) {
                            return;
                        }
                        var formatULItem = _this.parent.bulletFormatList.types.slice();
                        formatULItem.forEach(function (item) {
                            Object.defineProperties(item, {
                                command: { value: 'Lists', enumerable: true }, subCommand: { value: 'BulletFormatList', enumerable: true }
                            });
                        });
                        _this.bulletFormatListDropDown = _this.toolbarRenderer.renderListDropDown({
                            cssClass: 'e-unorder-list' + ' ' + classes.CLS_RTE_ELEMENTS + ' ' + classes.CLS_ICONS,
                            itemName: 'BulletFormatList', items: formatULItem, element: targetElement
                        });
                        break;
                    }
                    case 'formats': {
                        targetElement = select('#' + _this.parent.getID() + '_' + type + '_Formats', tbElement);
                        if (isNullOrUndefined(targetElement) || targetElement.classList.contains(classes.CLS_DROPDOWN_BTN)) {
                            return;
                        }
                        var formatItem = _this.parent.format.types.slice();
                        formatItem.forEach(function (item) {
                            Object.defineProperties(item, {
                                command: { value: 'Formats', enumerable: true }, subCommand: { value: item.value, enumerable: true }
                            });
                        });
                        var formatContent = isNullOrUndefined(_this.parent.format.default) ? formatItem[0].text :
                            _this.parent.format.default;
                        _this.formatDropDown = _this.toolbarRenderer.renderDropDownButton({
                            iconCss: ((type === 'quick') ? 'e-formats e-icons' : ''),
                            content: _this.dropdownContent(_this.parent.format.width, type, ((type === 'quick') ? '' : getDropDownValue(formatItem, formatContent, 'text', 'text'))),
                            cssClass: classes.CLS_DROPDOWN_POPUP + ' ' + classes.CLS_DROPDOWN_ITEMS + ' ' + classes.CLS_FORMATS_TB_BTN,
                            itemName: 'Formats', items: formatItem, element: targetElement
                        });
                        break;
                    }
                    case 'fontname': {
                        targetElement = select('#' + _this.parent.getID() + '_' + type + '_FontName', tbElement);
                        if (isNullOrUndefined(targetElement) || targetElement.classList.contains(classes.CLS_DROPDOWN_BTN)) {
                            return;
                        }
                        var fontItem = _this.parent.fontFamily.items.slice();
                        fontItem.forEach(function (item) {
                            Object.defineProperties(item, {
                                command: { value: 'Font', enumerable: true }, subCommand: { value: 'FontName', enumerable: true }
                            });
                        });
                        var fontNameContent = isNullOrUndefined(_this.parent.fontFamily.default) ? fontItem[0].text :
                            _this.parent.fontFamily.default;
                        _this.fontNameDropDown = _this.toolbarRenderer.renderDropDownButton({
                            iconCss: ((type === 'quick') ? 'e-font-name e-icons' : ''),
                            content: _this.dropdownContent(_this.parent.fontFamily.width, type, ((type === 'quick') ? '' : getDropDownValue(fontItem, fontNameContent, 'text', 'text'))),
                            cssClass: classes.CLS_DROPDOWN_POPUP + ' ' + classes.CLS_DROPDOWN_ITEMS + ' ' + classes.CLS_FONT_NAME_TB_BTN,
                            itemName: 'FontName', items: fontItem, element: targetElement
                        });
                        if (!isNullOrUndefined(_this.parent.fontFamily.default)) {
                            _this.getEditNode().style.fontFamily = _this.parent.fontFamily.default;
                        }
                        break;
                    }
                    case 'fontsize': {
                        targetElement = select('#' + _this.parent.getID() + '_' + type + '_FontSize', tbElement);
                        if (isNullOrUndefined(targetElement) || targetElement.classList.contains(classes.CLS_DROPDOWN_BTN)) {
                            return;
                        }
                        var fontsize = _this.parent.fontSize.items.slice();
                        fontsize.forEach(function (item) {
                            Object.defineProperties(item, {
                                command: { value: 'Font', enumerable: true }, subCommand: { value: 'FontSize', enumerable: true }
                            });
                        });
                        var fontSizeContent = isNullOrUndefined(_this.parent.fontSize.default) ? fontsize[1].text :
                            _this.parent.fontSize.default;
                        _this.fontSizeDropDown = _this.toolbarRenderer.renderDropDownButton({
                            content: _this.dropdownContent(_this.parent.fontSize.width, type, getFormattedFontSize(getDropDownValue(fontsize, fontSizeContent.replace(/\s/g, ''), 'value', 'text'))),
                            cssClass: classes.CLS_DROPDOWN_POPUP + ' ' + classes.CLS_DROPDOWN_ITEMS + ' ' + classes.CLS_FONT_SIZE_TB_BTN,
                            itemName: 'FontSize', items: fontsize, element: targetElement
                        });
                        if (!isNullOrUndefined(_this.parent.fontSize.default)) {
                            _this.getEditNode().style.fontSize = _this.parent.fontSize.default;
                        }
                        break;
                    }
                    case 'alignments':
                        targetElement = select('#' + _this.parent.getID() + '_' + type + '_Alignments', tbElement);
                        if (isNullOrUndefined(targetElement) || targetElement.classList.contains(classes.CLS_DROPDOWN_BTN)) {
                            return;
                        }
                        _this.alignDropDown = _this.toolbarRenderer.renderDropDownButton({
                            iconCss: 'e-justify-left e-icons',
                            cssClass: classes.CLS_DROPDOWN_POPUP + ' ' + classes.CLS_DROPDOWN_ITEMS + ' ' + classes.CLS_ALIGN_TB_BTN,
                            itemName: 'Alignments', items: model.alignmentItems, element: targetElement
                        });
                        break;
                    case 'align':
                    case 'videoalign':
                        _this.renderAlignmentDropDown(type, tbElement, targetElement, item);
                        break;
                    case 'display':
                    case 'audiolayoutoption':
                    case 'videolayoutoption':
                        _this.renderDisplayDropDown(type, tbElement, targetElement, item);
                        break;
                    case 'tablerows':
                        _this.rowDropDown(type, tbElement, targetElement);
                        break;
                    case 'tablecolumns':
                        _this.columnDropDown(type, tbElement, targetElement);
                        break;
                    case 'tablecell':
                        _this.cellDropDown(type, tbElement, targetElement);
                        break;
                    case 'tablecellverticalalign':
                        _this.verticalAlignDropDown(type, tbElement, targetElement);
                        break;
                    case 'styles':
                        _this.tableStylesDropDown(type, tbElement, targetElement);
                        break;
                }
            }
        });
        if (this.parent.inlineMode.enable) {
            this.setCssClass({ cssClass: this.parent.cssClass });
        }
    };
    DropDownButtons.prototype.getUpdateItems = function (items, value) {
        var dropDownItems = items.slice();
        dropDownItems.forEach(function (item) {
            Object.defineProperties(item, {
                command: { value: (value === 'Format' ? 'Formats' : 'Font'), enumerable: true },
                subCommand: { value: (value === 'Format' ? item.value : value), enumerable: true }
            });
        });
        return dropDownItems;
    };
    DropDownButtons.prototype.onPropertyChanged = function (model) {
        var newProp = model.newProp;
        var type;
        var content;
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'fontFamily':
                    if (this.fontNameDropDown) {
                        for (var _b = 0, _c = Object.keys(newProp.fontFamily); _b < _c.length; _b++) {
                            var fontFamily = _c[_b];
                            switch (fontFamily) {
                                case 'default':
                                case 'width': {
                                    var fontItems = this.fontNameDropDown.items;
                                    type = !isNullOrUndefined(closest(this.fontNameDropDown.element, '.' + classes.CLS_QUICK_TB)) ?
                                        'quick' : 'toolbar';
                                    var fontNameContent = isNullOrUndefined(this.parent.fontFamily.default) ? fontItems[0].text :
                                        this.parent.fontFamily.default;
                                    content = this.dropdownContent(this.parent.fontFamily.width, type, ((type === 'quick') ? '' : getDropDownValue(fontItems, fontNameContent, 'text', 'text')));
                                    this.fontNameDropDown.setProperties({ content: content });
                                    if (!isNullOrUndefined(this.parent.fontFamily.default)) {
                                        this.getEditNode().style.fontFamily = this.parent.fontFamily.default;
                                    }
                                    else {
                                        this.getEditNode().style.removeProperty('font-family');
                                    }
                                    break;
                                }
                                case 'items':
                                    this.fontNameDropDown.setProperties({
                                        items: this.getUpdateItems(newProp.fontFamily.items, 'FontName')
                                    });
                                    break;
                            }
                        }
                    }
                    break;
                case 'fontSize':
                    if (this.fontSizeDropDown) {
                        for (var _d = 0, _e = Object.keys(newProp.fontSize); _d < _e.length; _d++) {
                            var fontSize = _e[_d];
                            switch (fontSize) {
                                case 'default':
                                case 'width': {
                                    var fontsize = this.fontSizeDropDown.items;
                                    type = !isNullOrUndefined(closest(this.fontSizeDropDown.element, '.' + classes.CLS_QUICK_TB)) ? 'quick' : 'toolbar';
                                    var fontSizeContent = isNullOrUndefined(this.parent.fontSize.default) ? fontsize[1].text :
                                        this.parent.fontSize.default;
                                    content = this.dropdownContent(this.parent.fontSize.width, type, getFormattedFontSize(getDropDownValue(fontsize, fontSizeContent.replace(/\s/g, ''), 'value', 'text')));
                                    this.fontSizeDropDown.setProperties({ content: content });
                                    if (!isNullOrUndefined(this.parent.fontSize.default)) {
                                        this.getEditNode().style.fontSize = this.parent.fontSize.default;
                                    }
                                    else {
                                        this.getEditNode().style.removeProperty('font-size');
                                    }
                                    break;
                                }
                                case 'items':
                                    this.fontSizeDropDown.setProperties({
                                        items: this.getUpdateItems(newProp.fontSize.items, 'FontSize')
                                    });
                                    break;
                            }
                        }
                    }
                    break;
                case 'format':
                    if (this.formatDropDown) {
                        for (var _f = 0, _g = Object.keys(newProp.format); _f < _g.length; _f++) {
                            var format = _g[_f];
                            switch (format) {
                                case 'default':
                                case 'width': {
                                    var formatItems = this.formatDropDown.items;
                                    type = !isNullOrUndefined(closest(this.formatDropDown.element, '.' + classes.CLS_QUICK_TB)) ? 'quick' : 'toolbar';
                                    var formatContent = isNullOrUndefined(this.parent.format.default) ? formatItems[0].text :
                                        this.parent.format.default;
                                    content = this.dropdownContent(this.parent.format.width, type, ((type === 'quick') ? '' : getDropDownValue(formatItems, formatContent, 'text', 'text')));
                                    this.formatDropDown.setProperties({ content: content });
                                    break;
                                }
                                case 'types':
                                    this.formatDropDown.setProperties({
                                        items: this.getUpdateItems(newProp.format.types, 'Format')
                                    });
                                    break;
                            }
                        }
                    }
                    break;
            }
        }
    };
    DropDownButtons.prototype.getEditNode = function () {
        return this.parent.contentModule.getEditPanel();
    };
    DropDownButtons.prototype.rowDropDown = function (type, tbElement, targetElement) {
        targetElement = select('#' + this.parent.getID() + '_' + type + '_TableRows', tbElement);
        if (targetElement.classList.contains(classes.CLS_DROPDOWN_BTN)) {
            return;
        }
        this.tableRowsDropDown = this.toolbarRenderer.renderDropDownButton({
            iconCss: 'e-table-rows e-icons',
            cssClass: classes.CLS_DROPDOWN_POPUP + ' ' + classes.CLS_DROPDOWN_ITEMS + ' ' + classes.CLS_QUICK_DROPDOWN,
            itemName: 'TableRows',
            items: model.tableRowsItems,
            element: targetElement
        });
    };
    DropDownButtons.prototype.columnDropDown = function (type, tbElement, targetElement) {
        targetElement = select('#' + this.parent.getID() + '_' + type + '_TableColumns', tbElement);
        if (targetElement.classList.contains(classes.CLS_DROPDOWN_BTN)) {
            return;
        }
        this.tableColumnsDropDown = this.toolbarRenderer.renderDropDownButton({
            iconCss: 'e-table-columns e-icons',
            cssClass: classes.CLS_DROPDOWN_POPUP + ' ' + classes.CLS_DROPDOWN_ITEMS + ' ' + classes.CLS_QUICK_DROPDOWN,
            itemName: 'TableColumns',
            items: model.tableColumnsItems,
            element: targetElement
        });
    };
    DropDownButtons.prototype.cellDropDown = function (type, tbElement, targetElement) {
        targetElement = select('#' + this.parent.getID() + '_' + type + '_TableCell', tbElement);
        if (targetElement.classList.contains(classes.CLS_DROPDOWN_BTN)) {
            return;
        }
        this.tableRowsDropDown = this.toolbarRenderer.renderDropDownButton({
            iconCss: 'e-table-cell e-icons',
            cssClass: classes.CLS_DROPDOWN_POPUP + ' ' + classes.CLS_DROPDOWN_ITEMS + ' ' + classes.CLS_QUICK_DROPDOWN,
            itemName: 'TableCell',
            items: model.tableCellItems,
            element: targetElement
        });
    };
    DropDownButtons.prototype.verticalAlignDropDown = function (type, tbElement, targetElement) {
        targetElement = select('#' + this.parent.getID() + '_' + type + '_TableCellVerticalAlign', tbElement);
        if (targetElement.classList.contains(classes.CLS_DROPDOWN_BTN)) {
            return;
        }
        this.tableCellVerticalAlignDropDown = this.toolbarRenderer.renderDropDownButton({
            iconCss: 'e-table-cell-ver-align e-icons',
            cssClass: classes.CLS_DROPDOWN_POPUP + ' ' + classes.CLS_DROPDOWN_ITEMS + ' ' + classes.CLS_QUICK_DROPDOWN,
            itemName: 'TableCellVerticalAlign',
            items: model.TableCellVerticalAlignItems,
            element: targetElement
        });
    };
    DropDownButtons.prototype.renderDisplayDropDown = function (type, tbElement, targetElement, item) {
        targetElement = select('#' + this.parent.getID() + '_' + type + (item === 'display' ? '_Display' : item === 'videolayoutoption' ? '_VideoLayoutOption' : '_AudioLayoutOption'), tbElement);
        if (targetElement.classList.contains(classes.CLS_DROPDOWN_BTN)) {
            return;
        }
        this.displayDropDown = this.toolbarRenderer.renderDropDownButton({
            iconCss: item === 'display' ? 'e-display e-icons' : item === 'videolayoutoption' ? 'e-video-display e-icons' : 'e-audio-display e-icons',
            cssClass: classes.CLS_DROPDOWN_POPUP + ' ' + classes.CLS_DROPDOWN_ITEMS + ' ' + classes.CLS_QUICK_DROPDOWN,
            itemName: item === 'display' ? 'Display' : item === 'videolayoutoption' ? 'VideoLayoutOption' : 'AudioLayoutOption',
            items: item === 'display' ? model.imageDisplayItems : item === 'videolayoutoption' ? model.videoLayoutOptionItems : model.audioLayoutOptionItems,
            element: targetElement
        });
    };
    DropDownButtons.prototype.renderAlignmentDropDown = function (type, tbElement, targetElement, item) {
        targetElement = select('#' + this.parent.getID() + '_' + type + (item === 'align' ? '_Align' : '_VideoAlign'), tbElement);
        if (targetElement.classList.contains(classes.CLS_DROPDOWN_BTN)) {
            return;
        }
        this.imageAlignDropDown = this.toolbarRenderer.renderDropDownButton({
            iconCss: 'e-justify-left e-icons',
            cssClass: classes.CLS_DROPDOWN_POPUP + ' ' + classes.CLS_DROPDOWN_ICONS + ' ' + classes.CLS_QUICK_DROPDOWN,
            itemName: item === 'align' ? 'Align' : 'VideoAlign',
            items: item === 'align' ? model.imageAlignItems : model.videoAlignItems,
            element: targetElement
        });
    };
    DropDownButtons.prototype.tableStylesDropDown = function (type, tbElement, targetElement) {
        targetElement = select('#' + this.parent.getID() + '_' + type + '_Styles', tbElement);
        if (targetElement.classList.contains(classes.CLS_DROPDOWN_BTN)) {
            return;
        }
        this.imageAlignDropDown = this.toolbarRenderer.renderDropDownButton({
            iconCss: 'e-style e-icons',
            cssClass: classes.CLS_DROPDOWN_POPUP + ' ' + classes.CLS_DROPDOWN_ICONS + ' ' + classes.CLS_QUICK_DROPDOWN,
            itemName: 'Styles',
            items: this.parent.tableSettings.styles,
            element: targetElement
        });
    };
    DropDownButtons.prototype.removeDropDownClasses = function (target) {
        removeClass([target], [
            classes.CLS_DROPDOWN_BTN,
            classes.CLS_DROPDOWN_POPUP,
            classes.CLS_DROPDOWN_ICONS,
            classes.CLS_DROPDOWN_ITEMS
        ]);
    };
    /**
     * destroyDropDowns method
     *
     * @returns {void}
     * @hidden

     */
    DropDownButtons.prototype.destroyDropDowns = function () {
        if (this.formatDropDown) {
            this.removeDropDownClasses(this.formatDropDown.element);
            this.formatDropDown.destroy();
        }
        if (this.fontNameDropDown) {
            this.removeDropDownClasses(this.fontNameDropDown.element);
            this.fontNameDropDown.destroy();
        }
        if (this.fontSizeDropDown) {
            this.removeDropDownClasses(this.fontSizeDropDown.element);
            this.fontSizeDropDown.destroy();
        }
        if (this.alignDropDown) {
            this.removeDropDownClasses(this.alignDropDown.element);
            this.alignDropDown.destroy();
        }
        if (this.imageAlignDropDown) {
            this.removeDropDownClasses(this.imageAlignDropDown.element);
            this.imageAlignDropDown.destroy();
        }
        if (this.displayDropDown) {
            this.removeDropDownClasses(this.displayDropDown.element);
            this.displayDropDown.destroy();
        }
        if (this.tableRowsDropDown) {
            this.removeDropDownClasses(this.tableRowsDropDown.element);
            this.tableRowsDropDown.destroy();
        }
        if (this.tableColumnsDropDown) {
            this.removeDropDownClasses(this.tableColumnsDropDown.element);
            this.tableColumnsDropDown.destroy();
        }
        if (this.tableCellVerticalAlignDropDown) {
            this.removeDropDownClasses(this.tableCellVerticalAlignDropDown.element);
            this.tableCellVerticalAlignDropDown.destroy();
        }
        if (this.numberFormatListDropDown) {
            this.removeDropDownClasses(this.numberFormatListDropDown.element);
            this.numberFormatListDropDown.destroy();
        }
        if (this.bulletFormatListDropDown) {
            this.removeDropDownClasses(this.bulletFormatListDropDown.element);
            this.bulletFormatListDropDown.destroy();
        }
    };
    DropDownButtons.prototype.setRtl = function (args) {
        if (this.formatDropDown) {
            this.formatDropDown.setProperties({ enableRtl: args.enableRtl });
        }
        if (this.fontNameDropDown) {
            this.fontNameDropDown.setProperties({ enableRtl: args.enableRtl });
        }
        if (this.fontSizeDropDown) {
            this.fontSizeDropDown.setProperties({ enableRtl: args.enableRtl });
        }
        if (this.alignDropDown) {
            this.alignDropDown.setProperties({ enableRtl: args.enableRtl });
        }
        if (this.imageAlignDropDown) {
            this.imageAlignDropDown.setProperties({ enableRtl: args.enableRtl });
        }
        if (this.displayDropDown) {
            this.displayDropDown.setProperties({ enableRtl: args.enableRtl });
        }
        if (this.numberFormatListDropDown) {
            this.numberFormatListDropDown.setProperties({ enableRtl: args.enableRtl });
        }
        if (this.bulletFormatListDropDown) {
            this.bulletFormatListDropDown.setProperties({ enableRtl: args.enableRtl });
        }
    };
    DropDownButtons.prototype.updateCss = function (dropDownObj, e) {
        if (dropDownObj && e.cssClass) {
            if (isNullOrUndefined(e.oldCssClass)) {
                dropDownObj.setProperties({ cssClass: (dropDownObj.cssClass + ' ' + e.cssClass).trim() });
            }
            else {
                dropDownObj.setProperties({ cssClass: (dropDownObj.cssClass.replace(e.oldCssClass, '').trim() + ' ' + e.cssClass).trim() });
            }
        }
    };
    DropDownButtons.prototype.setCssClass = function (e) {
        var dropDownObj = [
            this.formatDropDown, this.fontNameDropDown, this.fontSizeDropDown, this.alignDropDown, this.imageAlignDropDown,
            this.displayDropDown, this.numberFormatListDropDown, this.bulletFormatListDropDown, this.tableRowsDropDown,
            this.tableColumnsDropDown, this.tableCellVerticalAlignDropDown
        ];
        for (var i = 0; i < dropDownObj.length; i++) {
            this.updateCss(dropDownObj[i], e);
        }
    };
    DropDownButtons.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.beforeDropDownItemRender, this.beforeRender, this);
        this.parent.on(events.iframeMouseDown, this.onIframeMouseDown, this);
        this.parent.on(events.rtlMode, this.setRtl, this);
        this.parent.on(events.destroy, this.removeEventListener, this);
        this.parent.on(events.modelChanged, this.onPropertyChanged, this);
        this.parent.on(events.bindCssClass, this.setCssClass, this);
    };
    DropDownButtons.prototype.onIframeMouseDown = function () {
        dispatchEvent(document, 'mousedown');
    };
    DropDownButtons.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.iframeMouseDown, this.onIframeMouseDown);
        this.parent.off(events.rtlMode, this.setRtl);
        this.parent.off(events.beforeDropDownItemRender, this.beforeRender);
        this.parent.off(events.destroy, this.removeEventListener);
        this.parent.off(events.modelChanged, this.onPropertyChanged);
        this.parent.off(events.bindCssClass, this.setCssClass);
    };
    return DropDownButtons;
}());
export { DropDownButtons };
