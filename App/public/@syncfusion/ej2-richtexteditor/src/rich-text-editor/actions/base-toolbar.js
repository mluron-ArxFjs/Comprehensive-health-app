import { RenderType } from '../base/enum';
import { CLS_HR_SEPARATOR } from '../base/classes';
import * as events from '../base/constant';
import { getTooltipText, isIDevice, toObjectLowerCase } from '../base/util';
import { tools, templateItems, windowKeys } from '../models/items';
import { isNullOrUndefined, extend, Browser } from '@syncfusion/ej2-base';
/**
 * `Toolbar` module is used to handle Toolbar actions.
 */
var BaseToolbar = /** @class */ (function () {
    function BaseToolbar(parent, serviceLocator) {
        this.tools = {};
        this.parent = parent;
        this.locator = serviceLocator;
        this.renderFactory = this.locator.getService('rendererFactory');
        this.addEventListener();
        if (this.parent.toolbarSettings && Object.keys(this.parent.toolbarSettings.itemConfigs).length > 0) {
            extend(this.tools, tools, toObjectLowerCase(this.parent.toolbarSettings.itemConfigs), true);
        }
        else {
            this.tools = tools;
        }
    }
    BaseToolbar.prototype.addEventListener = function () {
        this.parent.on(events.rtlMode, this.setRtl, this);
        this.parent.on(events.bindCssClass, this.setCssClass, this);
        this.parent.on(events.destroy, this.removeEventListener, this);
    };
    BaseToolbar.prototype.removeEventListener = function () {
        this.parent.off(events.rtlMode, this.setRtl);
        this.parent.off(events.bindCssClass, this.setCssClass);
        this.parent.off(events.destroy, this.removeEventListener);
    };
    BaseToolbar.prototype.setCssClass = function (e) {
        if (!isNullOrUndefined(this.toolbarObj)) {
            if (isNullOrUndefined(e.oldCssClass)) {
                this.toolbarObj.setProperties({ cssClass: (this.toolbarObj.cssClass + ' ' + e.cssClass).trim() });
            }
            else {
                this.toolbarObj.setProperties({ cssClass: (this.toolbarObj.cssClass.replace(e.oldCssClass, '').trim() + ' ' + e.cssClass).trim() });
            }
        }
    };
    BaseToolbar.prototype.setRtl = function (args) {
        if (!isNullOrUndefined(this.toolbarObj)) {
            this.toolbarObj.setProperties({ enableRtl: args.enableRtl });
        }
    };
    BaseToolbar.prototype.getClass = function (item) {
        var classes;
        switch (item) {
            case 'fontsize':
                classes = 'e-rte-inline-size-template';
                break;
            case 'fontcolor':
            case 'backgroundcolor':
                classes = 'e-rte-inline-color-template';
                break;
            default:
                classes = 'e-rte-inline-template';
                break;
        }
        return classes;
    };
    BaseToolbar.prototype.getTemplateObject = function (itemStr, container) {
        var tagName;
        switch (itemStr) {
            case 'fontcolor':
            case 'backgroundcolor':
            case 'numberformatlist':
            case 'bulletformatlist':
                tagName = 'span';
                break;
            default:
                tagName = 'button';
                break;
        }
        return {
            command: this.tools[itemStr.toLocaleLowerCase()].command,
            subCommand: this.tools[itemStr.toLocaleLowerCase()].subCommand,
            template: this.parent.createElement(tagName, {
                id: this.parent.getID() + '_' + container
                    + '_' + this.tools[itemStr.toLocaleLowerCase()].id
            }).outerHTML,
            cssClass: this.parent.inlineMode.enable ? this.getClass(itemStr) : '',
            tooltipText: getTooltipText(itemStr, this.locator)
        };
    };
    /**
     * getObject method
     *
     * @param {string} item - specifies the string value
     * @param {string} container - specifies the value of string
     * @returns {IToolbarItemModel} - returns the model element
     * @hidden

     */
    BaseToolbar.prototype.getObject = function (item, container) {
        var itemStr = item.toLowerCase();
        if (templateItems.indexOf(itemStr) !== -1) {
            return this.getTemplateObject(itemStr, container);
        }
        else {
            switch (itemStr) {
                case '|':
                    return { type: 'Separator' };
                case '-':
                    return { type: 'Separator', cssClass: CLS_HR_SEPARATOR };
                default:
                    if (this.parent.showTooltip) {
                        return {
                            id: this.parent.getID() + '_' + container + '_' + this.tools[itemStr.toLocaleLowerCase()].id,
                            prefixIcon: this.tools[itemStr.toLocaleLowerCase()].icon,
                            tooltipText: getTooltipText(itemStr, this.locator),
                            command: this.tools[itemStr.toLocaleLowerCase()].command,
                            subCommand: this.tools[itemStr.toLocaleLowerCase()].subCommand
                        };
                    }
                    else {
                        return {
                            id: this.parent.getID() + '_' + container + '_' + this.tools[itemStr.toLocaleLowerCase()].id,
                            prefixIcon: this.tools[itemStr.toLocaleLowerCase()].icon,
                            command: this.tools[itemStr.toLocaleLowerCase()].command,
                            subCommand: this.tools[itemStr.toLocaleLowerCase()].subCommand
                        };
                    }
            }
        }
    };
    /**
     * @param {string} tbItems - specifies the string value
     * @param {string} container - specifies the container value
     * @returns {ItemModel} - retunrs the model element
     * @hidden

     */
    BaseToolbar.prototype.getItems = function (tbItems, container) {
        var _this = this;
        if (this.parent.toolbarSettings.items.length < 1) {
            return [];
        }
        var items = [];
        var _loop_1 = function (item) {
            switch (typeof item) {
                case 'string':
                    items.push(this_1.getObject(item, container));
                    break;
                default:
                    if (!isNullOrUndefined(item.click)) {
                        var proxy_1 = item;
                        var callback_1 = proxy_1.click;
                        proxy_1.click = function () {
                            if (proxy_1.undo && _this.parent.formatter.getUndoRedoStack().length === 0) {
                                _this.parent.formatter.saveData();
                            }
                            callback_1.call(_this);
                            var currentContentElem = _this.parent.createElement('div');
                            currentContentElem.appendChild(_this.parent.formatter.getUndoRedoStack()[_this.parent.formatter.getUndoRedoStack().length - 1].text);
                            if (currentContentElem.innerHTML.trim() === _this.parent.inputElement.innerHTML.trim()) {
                                return;
                            }
                            if (proxy_1.undo) {
                                _this.parent.formatter.saveData();
                            }
                        };
                    }
                    items.push(item);
            }
        };
        var this_1 = this;
        for (var _i = 0, tbItems_1 = tbItems; _i < tbItems_1.length; _i++) {
            var item = tbItems_1[_i];
            _loop_1(item);
        }
        for (var num = 0; num < items.length; num++) {
            var tooltipText = items[num].tooltipText;
            var shortCutKey = void 0;
            if (windowKeys["" + tooltipText]) {
                shortCutKey = Browser.isDevice && isIDevice() ? windowKeys["" + tooltipText].replace('Ctrl', 'Cmd') : windowKeys["" + tooltipText];
            }
            else {
                shortCutKey = tooltipText;
            }
            if (shortCutKey) {
                items[num].tooltipText = (tooltipText !== shortCutKey) ? tooltipText + ' (' + shortCutKey + ')' : tooltipText;
            }
        }
        return items;
    };
    BaseToolbar.prototype.getToolbarOptions = function (args) {
        return {
            target: args.target,
            rteToolbarObj: this,
            items: this.getItems(args.items, args.container),
            overflowMode: args.mode,
            enablePersistence: this.parent.enablePersistence,
            enableRtl: this.parent.enableRtl,
            cssClass: args.cssClass
        };
    };
    /**
     * render method
     *
     * @param {IToolbarRenderOptions} args - specifies the toolbar options
     * @returns {void}
     * @hidden

     */
    BaseToolbar.prototype.render = function (args) {
        this.toolbarRenderer = this.renderFactory.getRenderer(RenderType.Toolbar);
        this.toolbarRenderer.renderToolbar(this.getToolbarOptions(args));
    };
    return BaseToolbar;
}());
export { BaseToolbar };
