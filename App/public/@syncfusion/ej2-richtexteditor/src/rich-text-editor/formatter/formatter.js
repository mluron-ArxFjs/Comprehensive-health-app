import { extend, isNullOrUndefined as isNOU, Browser } from '@syncfusion/ej2-base';
import * as CONSTANT from '../base/constant';
import { updateUndoRedoStatus, isIDevice } from '../base/util';
import { KEY_DOWN, KEY_UP } from './../../common/constant';
/**
 * Formatter
 *
 * @hidden

 */
var Formatter = /** @class */ (function () {
    function Formatter() {
    }
    /**
     * To execute the command
     *
     * @param  {IRichTextEditor} self - specifies the self element.
     * @param  {ActionBeginEventArgs} args - specifies the event arguments.
     * @param  {MouseEvent|KeyboardEvent} event - specifies the keyboard event.
     * @param  {IItemCollectionArgs} value - specifies the collection arguments
     * @returns {void}
     * @hidden

     */
    Formatter.prototype.process = function (self, args, event, value) {
        var _this = this;
        var selection = self.contentModule.getDocument().getSelection();
        var range = (selection.rangeCount > 0) ? selection.getRangeAt(selection.rangeCount - 1) : null;
        var saveSelection;
        var isKeyboardVideoInsert = (!isNOU(value) && !isNOU(value.cssClass) &&
            value.cssClass !== 'e-video-inline');
        if (self.editorMode === 'HTML') {
            if (!isNOU(args) && !isKeyboardVideoInsert) {
                if (isNOU(args.name) || (!isNOU(args.name) && args.name !== 'showDialog')) {
                    saveSelection = this.editorManager.nodeSelection.save(range, self.contentModule.getDocument());
                }
            }
        }
        if (!isNOU(args)
            && args.item.command
            && args.item.command !== 'Table'
            && args.item.command !== 'Actions'
            && args.item.command !== 'Links'
            && args.item.command !== 'Images'
            && args.item.command !== 'Files'
            && args.item.command !== 'Audios'
            && args.item.command !== 'Videos'
            && args.item.command !== 'EmojiPicker'
            && range
            && !(self.contentModule.getEditPanel().contains(this.getAncestorNode(range.commonAncestorContainer))
                || self.contentModule.getEditPanel() === range.commonAncestorContainer
                || self.contentModule.getPanel() === range.commonAncestorContainer)) {
            return;
        }
        if (!isNOU(args) && self.maxLength !== -1 && !isNOU(args.item.command)) {
            var currentInsertContentLength = 0;
            if (args.item.command === 'Links') {
                currentInsertContentLength = value.text.length === 0 ? value.url.length : value.text.length;
            }
            if (args.item.command === 'Images' || args.item.command === 'Videos' || args.item.command === 'Table' || args.item.command === 'Files') {
                currentInsertContentLength = 1;
            }
            var currentLength = self.getText().trim().length;
            var selectionLength = self.getSelection().length;
            var totalLength = (currentLength - selectionLength) + currentInsertContentLength;
            if (!(self.maxLength === -1 || totalLength <= self.maxLength)) {
                return;
            }
        }
        if (isNOU(args)) {
            var action_1 = event.action;
            if (action_1 !== 'tab' && action_1 !== 'enter' && action_1 !== 'space' && action_1 !== 'escape') {
                args = {};
                if (self.editorMode === 'Markdown' && action_1 === 'insert-table') {
                    value = {
                        'headingText': self.localeObj.getConstant('TableHeadingText'),
                        'colText': self.localeObj.getConstant('TableColText')
                    };
                }
                var items = {
                    originalEvent: event, cancel: false,
                    requestType: action_1 || (event.key + 'Key'),
                    itemCollection: value
                };
                extend(args, args, items, true);
                self.trigger(CONSTANT.actionBegin, args, function (actionBeginArgs) {
                    if (actionBeginArgs.cancel) {
                        if (action_1 === 'paste' || action_1 === 'cut' || action_1 === 'copy') {
                            event.preventDefault();
                        }
                    }
                });
            }
            var isTableModule = isNOU(self.tableModule) ? true : self.tableModule ?
                self.tableModule.ensureInsideTableList : false;
            if ((event.which === 9 && isTableModule) || event.which !== 9) {
                if (event.which === 13 && self.editorMode === 'HTML') {
                    value = {
                        'enterAction': self.enterKey
                    };
                }
                this.editorManager.observer.notify((event.type === 'keydown' ? KEY_DOWN : KEY_UP), {
                    event: event,
                    callBack: this.onSuccess.bind(this, self),
                    value: value,
                    enterAction: self.enterKey
                });
            }
        }
        else if (!isNOU(args) && args.item.command && args.item.subCommand && ((args.item.command !== args.item.subCommand
            && args.item.command !== 'Font')
            || ((args.item.subCommand === 'FontName' || args.item.subCommand === 'FontSize') && args.name === 'dropDownSelect')
            || ((args.item.subCommand === 'BackgroundColor' || args.item.subCommand === 'FontColor')
                && args.name === 'colorPickerChanged') || args.item.subCommand === 'FormatPainter' || args.item.subCommand === 'EmojiPicker')) {
            extend(args, args, { requestType: args.item.subCommand, cancel: false, itemCollection: value, selectType: args.name }, true);
            self.trigger(CONSTANT.actionBegin, args, function (actionBeginArgs) {
                if (!actionBeginArgs.cancel) {
                    var formatPainterCopy = !isNOU(actionBeginArgs.requestType) && actionBeginArgs.requestType === 'FormatPainter' && actionBeginArgs.name === 'format-copy';
                    var formatPainterPaste = !isNOU(actionBeginArgs.requestType) && actionBeginArgs.requestType === 'FormatPainter' && actionBeginArgs.name === 'format-paste';
                    if ((_this.getUndoRedoStack().length === 0 && actionBeginArgs.item.command !== 'Links' && actionBeginArgs.item.command !== 'Images' && !formatPainterCopy)
                        || formatPainterPaste) {
                        _this.saveData();
                    }
                    self.isBlur = false;
                    self.contentModule.getEditPanel().focus();
                    if (self.editorMode === 'HTML' && !isKeyboardVideoInsert) {
                        if (isNOU(args.selectType) || (!isNOU(args.selectType) && args.selectType !== 'showDialog')) {
                            saveSelection.restore();
                        }
                    }
                    var command = actionBeginArgs.item.subCommand.toLocaleLowerCase();
                    if (command === 'paste' || command === 'cut' || command === 'copy') {
                        self.clipboardAction(command, event);
                    }
                    else {
                        _this.editorManager.observer.notify(CONSTANT.checkUndo, { subCommand: actionBeginArgs.item.subCommand });
                        _this.editorManager.execCommand(actionBeginArgs.item.command, actionBeginArgs.item.subCommand, event, _this.onSuccess.bind(_this, self), actionBeginArgs.item.value, actionBeginArgs.item.subCommand === 'Pre' && actionBeginArgs.selectType === 'dropDownSelect' ?
                            { name: actionBeginArgs.selectType } : value, ('#' + self.getID() + ' iframe'), self.enterKey);
                    }
                }
            });
        }
        if ((isNOU(event) || event && event.action !== 'copy')) {
            this.enableUndo(self);
        }
    };
    Formatter.prototype.getAncestorNode = function (node) {
        node = node.nodeType === 3 ? node.parentNode : node;
        return node;
    };
    /**
     * onKeyHandler method
     *
     * @param {IRichTextEditor} self - specifies the self element.
     * @param {KeyboardEvent} e - specifies the keyboard event.
     * @returns {void}
     * @hidden

     */
    Formatter.prototype.onKeyHandler = function (self, e) {
        var _this = this;
        this.editorManager.observer.notify(KEY_UP, {
            event: e, callBack: function () {
                self.notify(CONSTANT.contentChanged, {});
                _this.enableUndo(self);
            }
        });
    };
    /**
     * onSuccess method
     *
     * @param {IRichTextEditor} self - specifies the self element.
     * @param {IMarkdownFormatterCallBack} events - specifies the event call back
     * @returns {void}
     * @hidden

     */
    Formatter.prototype.onSuccess = function (self, events) {
        self.notify(CONSTANT.contentChanged, {});
        if (events && (isNOU(events.event) || events.event.action !== 'copy')) {
            this.enableUndo(self);
            self.notify(CONSTANT.execCommandCallBack, events);
        }
        self.trigger(CONSTANT.actionComplete, events, function (callbackArgs) {
            self.setPlaceHolder();
            if ((callbackArgs.requestType === 'Images' || callbackArgs.requestType === 'Links' || callbackArgs.requestType === 'Audios' || callbackArgs.requestType === 'Videos') && self.editorMode === 'HTML') {
                var args = callbackArgs;
                if (callbackArgs.requestType === 'Links' && callbackArgs.event &&
                    callbackArgs.event.type === 'keydown' &&
                    callbackArgs.event.keyCode === 32) {
                    return;
                }
                self.notify(CONSTANT.insertCompleted, {
                    args: args.event, type: callbackArgs.requestType, isNotify: true,
                    elements: args.elements
                });
            }
            if (callbackArgs.requestType === 'VideosPlayPause') {
                self.notify('editAreaClick', { args: event });
            }
            self.autoResize();
        });
    };
    /**
     * Save the data for undo and redo action.
     *
     * @param {KeyboardEvent} e - specifies the keyboard event.
     * @returns {void}
     * @hidden

     */
    Formatter.prototype.saveData = function (e) {
        this.editorManager.undoRedoManager.saveData(e);
    };
    /**
     * getUndoStatus method
     *
     * @returns {void}
     * @hidden

     */
    Formatter.prototype.getUndoStatus = function () {
        return this.editorManager.undoRedoManager.getUndoStatus();
    };
    /* eslint-disable */
    /**
     * getUndoRedoStack method
     *
     * @param {IHtmlUndoRedoData}  - specifies the redo data.
     * @returns {void}
     * @hidden

     */
    /* eslint-enable */
    Formatter.prototype.getUndoRedoStack = function () {
        return this.editorManager.undoRedoManager.undoRedoStack;
    };
    /**
     * enableUndo method
     *
     * @param {IRichTextEditor} self - specifies the self element.
     * @returns {void}
     * @hidden

     */
    Formatter.prototype.enableUndo = function (self) {
        var status = this.getUndoStatus();
        if (self.inlineMode.enable && (!Browser.isDevice || isIDevice())) {
            updateUndoRedoStatus(self.quickToolbarModule.inlineQTBar.quickTBarObj, status);
        }
        else {
            if (self.toolbarModule) {
                updateUndoRedoStatus(self.toolbarModule.baseToolbar, status);
            }
        }
    };
    return Formatter;
}());
export { Formatter };
