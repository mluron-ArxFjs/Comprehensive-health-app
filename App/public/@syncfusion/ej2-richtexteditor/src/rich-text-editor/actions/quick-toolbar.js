import { select, isNullOrUndefined, Browser, addClass, removeClass, EventHandler, closest, isNullOrUndefined as isNOU } from '@syncfusion/ej2-base';
import { RenderType } from '../base/enum';
import * as events from '../base/constant';
import { pageYOffset, hasClass, isIDevice } from '../base/util';
import { BaseQuickToolbar } from './base-quick-toolbar';
import { PopupRenderer } from '../renderer/popup-renderer';
import { CLS_INLINE_POP, CLS_INLINE } from '../base/classes';
/**
 * `Quick toolbar` module is used to handle Quick toolbar actions.
 */
var QuickToolbar = /** @class */ (function () {
    function QuickToolbar(parent, locator) {
        this.parent = parent;
        this.locator = locator;
        this.renderFactory = this.locator.getService('rendererFactory');
        this.renderFactory.addRenderer(RenderType.Popup, new PopupRenderer(this.parent));
        this.addEventListener();
    }
    QuickToolbar.prototype.formatItems = function (items) {
        var formattedItems = [];
        items.forEach(function (item) {
            if (typeof item === 'string') {
                switch (item.toLocaleLowerCase()) {
                    case 'open':
                        formattedItems.push('openLink');
                        break;
                    case 'edit':
                        formattedItems.push('editLink');
                        break;
                    case 'unlink':
                        formattedItems.push('removeLink');
                        break;
                    default:
                        formattedItems.push(item);
                        break;
                }
            }
            else {
                formattedItems.push(item);
            }
        });
        return formattedItems;
    };
    QuickToolbar.prototype.getQTBarOptions = function (popType, mode, items, type) {
        return {
            popupType: popType,
            toolbarItems: items,
            mode: mode,
            renderType: type,
            cssClass: this.parent.cssClass
        };
    };
    /**
     * createQTBar method
     *
     * @param {string} popupType - specifies the string value
     * @param {string} mode - specifies the string value.
     * @param {string} items - specifies the string.
     * @param {RenderType} type - specifies the render type.
     * @returns {BaseQuickToolbar} - specifies the quick toolbar
     * @hidden

     */
    QuickToolbar.prototype.createQTBar = function (popupType, mode, items, type) {
        if (items.length < 1) {
            return null;
        }
        var qTBar = new BaseQuickToolbar(this.parent, this.locator);
        qTBar.render(this.getQTBarOptions(popupType, mode, this.formatItems(items), type));
        return qTBar;
    };
    QuickToolbar.prototype.initializeQuickToolbars = function () {
        this.parent.quickToolbarModule = this;
        this.contentRenderer = this.renderFactory.getRenderer(RenderType.Content);
        if (this.parent.inlineMode.enable && this.parent.inlineMode.onSelection && isIDevice()) {
            EventHandler.add(this.contentRenderer.getDocument(), 'selectionchange', this.selectionChangeHandler, this);
        }
    };
    // eslint-disable-next-line
    QuickToolbar.prototype.onMouseDown = function (e) {
        this.parent.isBlur = false;
        this.parent.isRTE = true;
    };
    QuickToolbar.prototype.keyUpQT = function (e) {
        if (e.which === 27) {
            this.hideQuickToolbars();
        }
    };
    QuickToolbar.prototype.renderQuickToolbars = function () {
        if (this.linkQTBar || this.imageQTBar || this.audioQTBar || this.videoQTBar || this.textQTBar || this.tableQTBar) {
            return;
        }
        this.linkQTBar = this.createQTBar('Link', 'Scrollable', this.parent.quickToolbarSettings.link, RenderType.LinkToolbar);
        this.renderFactory.addRenderer(RenderType.LinkToolbar, this.linkQTBar);
        this.textQTBar = this.createQTBar('Text', 'Scrollable', this.parent.quickToolbarSettings.text, RenderType.TextToolbar);
        this.renderFactory.addRenderer(RenderType.TextToolbar, this.textQTBar);
        this.imageQTBar = this.createQTBar('Image', 'MultiRow', this.parent.quickToolbarSettings.image, RenderType.ImageToolbar);
        this.renderFactory.addRenderer(RenderType.ImageToolbar, this.imageQTBar);
        this.audioQTBar = this.createQTBar('Audio', 'MultiRow', this.parent.quickToolbarSettings.audio, RenderType.AudioToolbar);
        this.renderFactory.addRenderer(RenderType.AudioToolbar, this.audioQTBar);
        this.videoQTBar = this.createQTBar('Video', 'MultiRow', this.parent.quickToolbarSettings.video, RenderType.VideoToolbar);
        this.renderFactory.addRenderer(RenderType.VideoToolbar, this.videoQTBar);
        this.tableQTBar = this.createQTBar('Table', 'MultiRow', this.parent.quickToolbarSettings.table, RenderType.TableToolbar);
        this.renderFactory.addRenderer(RenderType.TableToolbar, this.tableQTBar);
        if (this.linkQTBar) {
            EventHandler.add(this.linkQTBar.element, 'mousedown', this.onMouseDown, this);
            EventHandler.add(this.linkQTBar.element, 'keyup', this.keyUpQT, this);
        }
        if (this.imageQTBar) {
            EventHandler.add(this.imageQTBar.element, 'mousedown', this.onMouseDown, this);
            EventHandler.add(this.imageQTBar.element, 'keyup', this.keyUpQT, this);
        }
        if (this.audioQTBar) {
            EventHandler.add(this.audioQTBar.element, 'mousedown', this.onMouseDown, this);
            EventHandler.add(this.audioQTBar.element, 'keyup', this.keyUpQT, this);
        }
        if (this.videoQTBar) {
            EventHandler.add(this.videoQTBar.element, 'mousedown', this.onMouseDown, this);
            EventHandler.add(this.videoQTBar.element, 'keyup', this.keyUpQT, this);
        }
        if (this.textQTBar) {
            EventHandler.add(this.textQTBar.element, 'mousedown', this.onMouseDown, this);
            EventHandler.add(this.textQTBar.element, 'keyup', this.keyUpQT, this);
        }
        if (this.tableQTBar) {
            EventHandler.add(this.tableQTBar.element, 'mousedown', this.onMouseDown, this);
            EventHandler.add(this.tableQTBar.element, 'keyup', this.keyUpQT, this);
        }
    };
    QuickToolbar.prototype.renderInlineQuickToolbar = function () {
        if (this.parent.inlineMode.enable && (!Browser.isDevice || isIDevice())) {
            addClass([this.parent.element], [CLS_INLINE]);
            this.inlineQTBar = this.createQTBar('Inline', 'MultiRow', this.parent.toolbarSettings.items, RenderType.InlineToolbar);
            this.renderFactory.addRenderer(RenderType.InlineToolbar, this.inlineQTBar);
            EventHandler.add(this.inlineQTBar.element, 'mousedown', this.onMouseDown, this);
            EventHandler.add(this.inlineQTBar.element, 'keyup', this.keyUpQT, this);
        }
    };
    /**
     * Method for showing the inline quick toolbar
     *
     * @param {number} x -specifies the value of x.
     * @param {number} y - specifies the y valu.
     * @param {HTMLElement} target - specifies the target element.
     * @returns {void}
     * @hidden

     */
    QuickToolbar.prototype.showInlineQTBar = function (x, y, target) {
        if (this.parent.readonly || target.tagName.toLowerCase() === 'img') {
            return;
        }
        this.inlineQTBar.showPopup(x, y, target);
    };
    /**
     * Method for hidding the inline quick toolbar
     *
     * @returns {void}
     * @hidden

     */
    QuickToolbar.prototype.hideInlineQTBar = function () {
        if (this.inlineQTBar && !hasClass(this.inlineQTBar.element, 'e-popup-close')) {
            this.inlineQTBar.hidePopup();
        }
    };
    /**
     * Method for hidding the quick toolbar
     *
     * @returns {void}
     * @hidden

     */
    QuickToolbar.prototype.hideQuickToolbars = function () {
        if (this.linkQTBar && !hasClass(this.linkQTBar.element, 'e-popup-close') && document.body.contains(this.linkQTBar.element)) {
            this.linkQTBar.hidePopup();
        }
        if (this.textQTBar && !hasClass(this.textQTBar.element, 'e-popup-close') && document.body.contains(this.textQTBar.element)) {
            this.textQTBar.hidePopup();
        }
        if (this.imageQTBar && !hasClass(this.imageQTBar.element, 'e-popup-close') && document.body.contains(this.imageQTBar.element)) {
            this.imageQTBar.hidePopup();
        }
        if (this.audioQTBar && !hasClass(this.audioQTBar.element, 'e-popup-close') && document.body.contains(this.audioQTBar.element)) {
            this.audioQTBar.hidePopup();
        }
        if (this.videoQTBar && !hasClass(this.videoQTBar.element, 'e-popup-close') && document.body.contains(this.videoQTBar.element)) {
            this.videoQTBar.hidePopup();
        }
        if (this.tableQTBar && !hasClass(this.tableQTBar.element, 'e-popup-close') && document.body.contains(this.tableQTBar.element)) {
            this.tableQTBar.hidePopup();
        }
        if (!isNOU(this.parent) && this.parent.inlineMode.enable && (!Browser.isDevice || isIDevice())) {
            this.hideInlineQTBar();
        }
    };
    QuickToolbar.prototype.deBounce = function (x, y, target) {
        var _this = this;
        clearTimeout(this.deBouncer);
        this.deBouncer = window.setTimeout(function () {
            _this.showInlineQTBar(x, y, target);
        }, 1000);
    };
    QuickToolbar.prototype.mouseUpHandler = function (e) {
        if (this.parent.inlineMode.enable && (!Browser.isDevice || isIDevice())) {
            var args = e.args.touches ?
                e.args.changedTouches[0] : e.args;
            var range = this.parent.getRange();
            var target = e.args.target;
            if (isNullOrUndefined(select('.' + CLS_INLINE_POP, document.body))) {
                if (isIDevice() && e.touchData && e.touchData.prevClientX !== e.touchData.clientX
                    && e.touchData.prevClientY !== e.touchData.clientY) {
                    return;
                }
                this.hideInlineQTBar();
                var parentLeft = this.parent.element.getBoundingClientRect().left;
                this.offsetX = this.parent.iframeSettings.enable ? window.pageXOffset + parentLeft + args.clientX : args.pageX;
                this.offsetY = pageYOffset(args, this.parent.element, this.parent.iframeSettings.enable);
                if (target.nodeName === 'TEXTAREA') {
                    this.showInlineQTBar(this.offsetX, this.offsetY, target);
                }
                else {
                    var closestAnchor = closest(target, 'a');
                    target = closestAnchor ? closestAnchor : target;
                    var startNode = this.parent.getRange().startContainer.parentElement;
                    var endNode = this.parent.getRange().endContainer.parentElement;
                    if ((isNOU(closest(startNode, 'A')) || isNOU(closest(endNode, 'A'))) && (!closest(target, 'td,th') || !range.collapsed) &&
                        (target.tagName !== 'IMG' || this.parent.getRange().startOffset !== this.parent.getRange().endOffset)) {
                        if (this.parent.inlineMode.onSelection && range.collapsed) {
                            return;
                        }
                        this.target = target;
                        this.showInlineQTBar(this.offsetX, this.offsetY, target);
                    }
                }
            }
        }
    };
    QuickToolbar.prototype.keyDownHandler = function () {
        if ((this.parent.inlineMode.enable && (!Browser.isDevice || isIDevice()))
            && !isNullOrUndefined(select('.' + CLS_INLINE_POP, document))) {
            this.hideInlineQTBar();
        }
    };
    QuickToolbar.prototype.inlineQTBarMouseDownHandler = function () {
        if ((this.parent.inlineMode.enable && (!Browser.isDevice || isIDevice()))
            && !isNullOrUndefined(select('.' + CLS_INLINE_POP, document))) {
            this.hideInlineQTBar();
        }
    };
    QuickToolbar.prototype.keyUpHandler = function (e) {
        if (this.parent.inlineMode.enable && !Browser.isDevice) {
            var args = e.args;
            if (this.parent.inlineMode.onSelection) {
                if (this.parent.getSelection().length > 0) {
                    if ((args.ctrlKey && args.keyCode === 65) || (args.shiftKey && (args.keyCode === 33 || args.keyCode === 34 ||
                        args.keyCode === 35 || args.keyCode === 36 || args.keyCode === 37 || args.keyCode === 38 ||
                        args.keyCode === 39 || args.keyCode === 40))) {
                        this.showInlineQTBar(this.offsetX, this.offsetY, args.target);
                    }
                }
                return;
            }
            this.deBounce(this.offsetX, this.offsetY, args.target);
        }
    };
    QuickToolbar.prototype.selectionChangeHandler = function (e) {
        var _this = this;
        clearTimeout(this.deBouncer);
        this.deBouncer = window.setTimeout(function () {
            _this.onSelectionChange(e);
        }, 1000);
    };
    QuickToolbar.prototype.onSelectionChange = function (e) {
        if (!isNullOrUndefined(select('.' + CLS_INLINE_POP, document.body))) {
            return;
        }
        var selection = this.contentRenderer.getDocument().getSelection();
        if (!selection.isCollapsed) {
            this.mouseUpHandler({ args: e });
        }
    };
    /**
     * getInlineBaseToolbar method
     *
     * @returns {void}
     * @hidden

     */
    QuickToolbar.prototype.getInlineBaseToolbar = function () {
        return this.inlineQTBar && this.inlineQTBar.quickTBarObj;
    };
    /**
     * Destroys the ToolBar.
     *
     * @function destroy
     * @returns {void}
     * @hidden

     */
    QuickToolbar.prototype.destroy = function () {
        if (this.linkQTBar) {
            EventHandler.remove(this.linkQTBar.element, 'mousedown', this.onMouseDown);
            EventHandler.remove(this.linkQTBar.element, 'keyup', this.keyUpQT);
            this.linkQTBar.destroy();
        }
        if (this.textQTBar) {
            EventHandler.remove(this.textQTBar.element, 'mousedown', this.onMouseDown);
            EventHandler.remove(this.textQTBar.element, 'keyup', this.keyUpQT);
            this.textQTBar.destroy();
        }
        if (this.imageQTBar) {
            EventHandler.remove(this.imageQTBar.element, 'mousedown', this.onMouseDown);
            EventHandler.remove(this.imageQTBar.element, 'keyup', this.keyUpQT);
            this.imageQTBar.destroy();
        }
        if (this.audioQTBar) {
            EventHandler.remove(this.audioQTBar.element, 'mousedown', this.onMouseDown);
            EventHandler.remove(this.audioQTBar.element, 'keyup', this.keyUpQT);
            this.audioQTBar.destroy();
        }
        if (this.videoQTBar) {
            EventHandler.remove(this.videoQTBar.element, 'mousedown', this.onMouseDown);
            EventHandler.remove(this.videoQTBar.element, 'keyup', this.keyUpQT);
            this.videoQTBar.destroy();
        }
        if (this.tableQTBar) {
            EventHandler.remove(this.tableQTBar.element, 'mousedown', this.onMouseDown);
            EventHandler.remove(this.tableQTBar.element, 'keyup', this.keyUpQT);
            this.tableQTBar.destroy();
        }
        if (this.inlineQTBar) {
            EventHandler.remove(this.inlineQTBar.element, 'mousedown', this.onMouseDown);
            EventHandler.remove(this.inlineQTBar.element, 'keyup', this.keyUpQT);
            if (isIDevice()) {
                EventHandler.remove(document, 'selectionchange', this.selectionChangeHandler);
            }
            this.inlineQTBar.destroy();
        }
        this.removeEventListener();
    };
    QuickToolbar.prototype.moduleDestroy = function () {
        this.parent = null;
    };
    QuickToolbar.prototype.wireInlineQTBarEvents = function () {
        this.parent.on(events.mouseUp, this.mouseUpHandler, this);
        this.parent.on(events.mouseDown, this.inlineQTBarMouseDownHandler, this);
        this.parent.on(events.keyDown, this.keyDownHandler, this);
        this.parent.on(events.keyUp, this.keyUpHandler, this);
        this.parent.on(events.sourceCodeMouseDown, this.mouseUpHandler, this);
        this.parent.on(events.renderInlineToolbar, this.renderInlineQuickToolbar, this);
        this.parent.on(events.moduleDestroy, this.moduleDestroy, this);
    };
    QuickToolbar.prototype.unWireInlineQTBarEvents = function () {
        this.parent.off(events.mouseUp, this.mouseUpHandler);
        this.parent.off(events.mouseDown, this.inlineQTBarMouseDownHandler);
        this.parent.off(events.keyDown, this.keyDownHandler);
        this.parent.off(events.keyUp, this.keyUpHandler);
        this.parent.off(events.sourceCodeMouseDown, this.mouseUpHandler);
        this.parent.off(events.renderInlineToolbar, this.renderInlineQuickToolbar);
        this.parent.off(events.moduleDestroy, this.moduleDestroy);
    };
    // eslint-disable-next-line
    QuickToolbar.prototype.toolbarUpdated = function (args) {
        if (this.linkQTBar && !hasClass(this.linkQTBar.element, 'e-popup-close')) {
            this.linkQTBar.hidePopup();
        }
        if (this.imageQTBar && !hasClass(this.imageQTBar.element, 'e-popup-close')) {
            this.imageQTBar.hidePopup();
        }
        if (this.audioQTBar && !hasClass(this.audioQTBar.element, 'e-popup-close')) {
            this.audioQTBar.hidePopup();
        }
        if (this.videoQTBar && !hasClass(this.videoQTBar.element, 'e-popup-close')) {
            this.videoQTBar.hidePopup();
        }
        if (this.tableQTBar && !hasClass(this.tableQTBar.element, 'e-popup-close')) {
            this.tableQTBar.hidePopup();
        }
    };
    /**
     * addEventListener
     *
     * @returns {void}
     * @hidden

     */
    QuickToolbar.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.initialEnd, this.initializeQuickToolbars, this);
        this.parent.on(events.mouseDown, this.renderQuickToolbars, this);
        this.parent.on(events.toolbarUpdated, this.toolbarUpdated, this);
        this.parent.on(events.drop, this.renderQuickToolbars, this);
        this.wireInlineQTBarEvents();
        this.parent.on(events.modelChanged, this.onPropertyChanged, this);
        if (this.parent.quickToolbarSettings.actionOnScroll === 'hide') {
            this.parent.on(events.scroll, this.hideQuickToolbars, this);
            this.parent.on(events.contentscroll, this.hideQuickToolbars, this);
        }
        this.parent.on(events.focusChange, this.hideQuickToolbars, this);
        this.parent.on(events.iframeMouseDown, this.onIframeMouseDown, this);
        this.parent.on(events.destroy, this.destroy, this);
        this.parent.on(events.keyDown, this.onKeyDown, this);
        this.parent.on(events.rtlMode, this.setRtl, this);
        this.parent.on(events.bindCssClass, this.setCssClass, this);
    };
    QuickToolbar.prototype.onKeyDown = function (e) {
        var args = e.args;
        if (args.which === 8 || args.which === 46) {
            if (this.imageQTBar && !hasClass(this.imageQTBar.element, 'e-popup-close')) {
                this.imageQTBar.hidePopup();
            }
            if (this.audioQTBar && !hasClass(this.audioQTBar.element, 'e-popup-close')) {
                this.audioQTBar.hidePopup();
            }
            if (this.videoQTBar && !hasClass(this.videoQTBar.element, 'e-popup-close')) {
                this.videoQTBar.hidePopup();
            }
        }
    };
    QuickToolbar.prototype.onIframeMouseDown = function () {
        this.hideQuickToolbars();
        this.hideInlineQTBar();
    };
    QuickToolbar.prototype.updateCss = function (baseQTObj, e) {
        if (baseQTObj && e.cssClass) {
            if (isNullOrUndefined(e.oldCssClass && baseQTObj.quickTBarObj.toolbarObj.cssClass !== e.cssClass)) {
                baseQTObj.quickTBarObj.toolbarObj.setProperties({ cssClass: (baseQTObj.quickTBarObj.toolbarObj.cssClass + ' ' + e.cssClass).trim() });
            }
            else {
                baseQTObj.quickTBarObj.toolbarObj.setProperties({ cssClass: (baseQTObj.quickTBarObj.toolbarObj.cssClass.replace(e.oldCssClass, '').trim() + ' ' + e.cssClass).trim() });
            }
        }
    };
    QuickToolbar.prototype.setCssClass = function (e) {
        var baseQuickToolbarObj = [
            this.inlineQTBar, this.imageQTBar, this.linkQTBar, this.textQTBar, this.tableQTBar
        ];
        for (var i = 0; i < baseQuickToolbarObj.length; i++) {
            this.updateCss(baseQuickToolbarObj[i], e);
        }
    };
    QuickToolbar.prototype.setRtl = function (args) {
        if (this.inlineQTBar) {
            this.inlineQTBar.quickTBarObj.toolbarObj.setProperties({ enableRtl: args.enableRtl });
        }
        if (this.imageQTBar) {
            this.imageQTBar.quickTBarObj.toolbarObj.setProperties({ enableRtl: args.enableRtl });
        }
        if (this.audioQTBar) {
            this.audioQTBar.quickTBarObj.toolbarObj.setProperties({ enableRtl: args.enableRtl });
        }
        if (this.videoQTBar) {
            this.videoQTBar.quickTBarObj.toolbarObj.setProperties({ enableRtl: args.enableRtl });
        }
        if (this.linkQTBar) {
            this.linkQTBar.quickTBarObj.toolbarObj.setProperties({ enableRtl: args.enableRtl });
        }
    };
    /**
     * removeEventListener
     *
     * @returns {void}
     * @hidden

     */
    QuickToolbar.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.initialEnd, this.initializeQuickToolbars);
        this.parent.off(events.mouseDown, this.renderQuickToolbars);
        this.parent.off(events.toolbarUpdated, this.toolbarUpdated);
        this.parent.off(events.drop, this.renderQuickToolbars);
        this.unWireInlineQTBarEvents();
        this.parent.off(events.modelChanged, this.onPropertyChanged);
        if (this.parent.quickToolbarSettings.actionOnScroll === 'hide') {
            this.parent.off(events.scroll, this.hideQuickToolbars);
            this.parent.off(events.contentscroll, this.hideQuickToolbars);
        }
        this.parent.off(events.focusChange, this.hideQuickToolbars);
        this.parent.off(events.destroy, this.destroy);
        this.parent.off(events.iframeMouseDown, this.onIframeMouseDown);
        this.parent.off(events.keyDown, this.onKeyDown);
        this.parent.off(events.rtlMode, this.setRtl);
        this.parent.off(events.bindCssClass, this.setCssClass);
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param {RichTextEditorModel} e - specifies the element.
     * @returns {void}
     * @hidden

     */
    QuickToolbar.prototype.onPropertyChanged = function (e) {
        if (!isNullOrUndefined(e.newProp.quickToolbarSettings)) {
            for (var _i = 0, _a = Object.keys(e.newProp.quickToolbarSettings); _i < _a.length; _i++) {
                var prop = _a[_i];
                switch (prop) {
                    case 'actionOnScroll':
                        if (e.newProp.quickToolbarSettings.actionOnScroll === 'none') {
                            this.parent.off(events.scroll, this.hideQuickToolbars);
                            this.parent.off(events.contentscroll, this.hideQuickToolbars);
                        }
                        else {
                            this.parent.on(events.scroll, this.hideQuickToolbars, this);
                            this.parent.on(events.contentscroll, this.hideQuickToolbars, this);
                        }
                        break;
                }
            }
        }
        if (e.module !== this.getModuleName()) {
            return;
        }
        if (this.inlineQTBar) {
            removeClass([this.parent.element], [CLS_INLINE]);
            this.unWireInlineQTBarEvents();
            this.hideInlineQTBar();
        }
        if (this.parent.inlineMode.enable && (!Browser.isDevice || isIDevice())) {
            addClass([this.parent.element], [CLS_INLINE]);
            this.wireInlineQTBarEvents();
        }
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     * @hidden
     */
    QuickToolbar.prototype.getModuleName = function () {
        return 'quickToolbar';
    };
    return QuickToolbar;
}());
export { QuickToolbar };
