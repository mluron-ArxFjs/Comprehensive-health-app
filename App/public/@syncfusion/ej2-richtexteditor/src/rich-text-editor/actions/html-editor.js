import * as events from '../base/constant';
import { isNullOrUndefined, closest, attributes, removeClass, addClass, Browser, detach } from '@syncfusion/ej2-base';
import { isNullOrUndefined as isNOU } from '@syncfusion/ej2-base';
import { HTMLFormatter } from '../formatter/html-formatter';
import { RenderType } from '../base/enum';
import * as classes from '../base/classes';
import { HtmlToolbarStatus } from './html-toolbar-status';
import { IframeContentRender } from '../renderer/iframe-content-renderer';
import { ContentRender } from '../renderer/content-renderer';
import { ColorPickerInput } from './color-picker';
import { NodeSelection } from '../../selection/selection';
import { InsertHtml } from '../../editor-manager/plugin/inserthtml';
import { getTextNodesUnder, sanitizeHelper, getDefaultValue } from '../base/util';
import { isIDevice } from '../../common/util';
import { XhtmlValidation } from './xhtml-validation';
import { ON_BEGIN } from './../../common/constant';
/**
 * `HtmlEditor` module is used to HTML editor
 */
var HtmlEditor = /** @class */ (function () {
    function HtmlEditor(parent, serviceLocator) {
        this.rangeCollection = [];
        this.isImageDelete = false;
        this.parent = parent;
        this.locator = serviceLocator;
        this.renderFactory = this.locator.getService('rendererFactory');
        this.xhtmlValidation = new XhtmlValidation(parent);
        this.addEventListener();
    }
    /**
     * Destroys the Markdown.
     *
     * @function destroy
     * @returns {void}
     * @hidden

     */
    HtmlEditor.prototype.destroy = function () {
        this.removeEventListener();
    };
    /**
     * @param {string} value - specifies the string value
     * @returns {void}
     * @hidden

     */
    HtmlEditor.prototype.sanitizeHelper = function (value) {
        value = sanitizeHelper(value, this.parent);
        return value;
    };
    HtmlEditor.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.nodeSelectionObj = new NodeSelection();
        this.colorPickerModule = new ColorPickerInput(this.parent, this.locator);
        this.parent.on(events.initialLoad, this.instantiateRenderer, this);
        this.parent.on(events.htmlToolbarClick, this.onToolbarClick, this);
        this.parent.on(events.keyDown, this.onKeyDown, this);
        this.parent.on(events.keyUp, this.onKeyUp, this);
        this.parent.on(events.renderColorPicker, this.renderColorPicker, this);
        this.parent.on(events.initialEnd, this.render, this);
        this.parent.on(events.modelChanged, this.onPropertyChanged, this);
        this.parent.on(events.destroy, this.destroy, this);
        this.parent.on(events.selectAll, this.selectAll, this);
        this.parent.on(events.selectRange, this.selectRange, this);
        this.parent.on(events.getSelectedHtml, this.getSelectedHtml, this);
        this.parent.on(events.selectionSave, this.onSelectionSave, this);
        this.parent.on(events.selectionRestore, this.onSelectionRestore, this);
        this.parent.on(events.readOnlyMode, this.updateReadOnly, this);
        this.parent.on(events.paste, this.onPaste, this);
        this.parent.on(events.tableclass, this.isTableClassAdded, this);
    };
    HtmlEditor.prototype.updateReadOnly = function () {
        if (this.parent.readonly) {
            attributes(this.parent.contentModule.getEditPanel(), { contenteditable: 'false' });
            addClass([this.parent.element], classes.CLS_RTE_READONLY);
        }
        else {
            attributes(this.parent.contentModule.getEditPanel(), { contenteditable: 'true' });
            removeClass([this.parent.element], classes.CLS_RTE_READONLY);
        }
    };
    HtmlEditor.prototype.onSelectionSave = function () {
        var currentDocument = this.contentRenderer.getDocument();
        var range = this.nodeSelectionObj.getRange(currentDocument);
        this.saveSelection = this.nodeSelectionObj.save(range, currentDocument);
    };
    HtmlEditor.prototype.onSelectionRestore = function (e) {
        this.parent.isBlur = false;
        this.contentRenderer.getEditPanel().focus();
        if (isNullOrUndefined(e.items) || e.items) {
            this.saveSelection.restore();
        }
    };
    HtmlEditor.prototype.isTableClassAdded = function () {
        var tableElement = this.parent.inputElement.querySelectorAll('table');
        for (var i = 0; i < tableElement.length; i++) {
            if (!tableElement[i].classList.contains('e-rte-table')) {
                tableElement[i].classList.add('e-rte-table');
            }
        }
    };
    HtmlEditor.prototype.onKeyUp = function (e) {
        var args = e.args;
        var restrictKeys = [8, 9, 13, 16, 17, 18, 20, 27, 37, 38, 39, 40, 44, 45, 46, 91,
            112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123];
        var range = this.parent.getRange();
        // eslint-disable-next-line
        var regEx = new RegExp(String.fromCharCode(8203), 'g');
        var pointer;
        var isRootParent = false;
        if (restrictKeys.indexOf(args.keyCode) < 0 && !args.shiftKey && !args.ctrlKey && !args.altKey) {
            pointer = range.startOffset;
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            range.startContainer.nodeName === '#text' ? range.startContainer.parentElement !== this.parent.inputElement ? range.startContainer.parentElement.classList.add('currentStartMark')
                : isRootParent = true : range.startContainer.classList.add('currentStartMark');
            if (range.startContainer.textContent.charCodeAt(0) === 8203) {
                var previousLength_1 = range.startContainer.textContent.length;
                var previousRange = range.startOffset;
                range.startContainer.textContent = range.startContainer.textContent.replace(regEx, '');
                pointer = previousRange === 0 ? previousRange : previousRange - (previousLength_1 - range.startContainer.textContent.length);
                this.parent.formatter.editorManager.nodeSelection.setCursorPoint(this.parent.contentModule.getDocument(), range.startContainer, pointer);
            }
            var previousLength = this.parent.inputElement.innerHTML.length;
            var currentLength = this.parent.inputElement.innerHTML.replace(regEx, '').length;
            var focusNode = range.startContainer;
            if (previousLength > currentLength && !isRootParent) {
                var currentChild = this.parent.inputElement.firstChild;
                while (!isNOU(currentChild) && currentChild.textContent.replace(regEx, '').trim().length > 0) {
                    currentChild.innerHTML = currentChild.innerHTML.replace(regEx, '');
                    currentChild = currentChild.nextElementSibling;
                }
                var currentChildNode = this.parent.inputElement.querySelector('.currentStartMark').childNodes;
                if (currentChildNode.length > 1) {
                    for (var i = 0; i < currentChildNode.length; i++) {
                        if (currentChildNode[i].nodeName === '#text' && currentChildNode[i].textContent.length === 0) {
                            detach(currentChildNode[i]);
                            i--;
                        }
                        if (focusNode.textContent.replace(regEx, '') === currentChildNode[i].textContent) {
                            pointer = focusNode.textContent.length > 1 ?
                                (focusNode.textContent === currentChildNode[i].textContent ? pointer :
                                    pointer - (focusNode.textContent.length - focusNode.textContent.replace(regEx, '').length)) :
                                focusNode.textContent.length;
                            focusNode = currentChildNode[i];
                        }
                    }
                }
                else if (currentChildNode.length === 1) {
                    if (focusNode.textContent.replace(regEx, '') === currentChildNode[0].textContent) {
                        focusNode = currentChildNode[0];
                    }
                }
                this.parent.formatter.editorManager.nodeSelection.setCursorPoint(this.parent.contentModule.getDocument(), focusNode, pointer);
            }
            var currentElem = this.parent.inputElement.querySelector('.currentStartMark');
            if (!isNOU(currentElem)) {
                currentElem.classList.remove('currentStartMark');
                if (currentElem.getAttribute('class').trim() === '') {
                    currentElem.removeAttribute('class');
                }
            }
            if (!isNOU(range.startContainer.previousSibling) && !isNOU(range.startContainer.previousSibling.parentElement) &&
                range.startContainer.parentElement === range.startContainer.previousSibling.parentElement &&
                range.startContainer.previousSibling.textContent.charCodeAt(0) === 8203 &&
                range.startContainer.previousSibling.textContent.length <= 1) {
                range.startContainer.previousSibling.textContent = range.startContainer.previousSibling.textContent.replace(regEx, '');
            }
            if (range.endContainer.textContent.charCodeAt(range.endOffset) === 8203) {
                pointer = range.startOffset;
                range.endContainer.textContent = range.endContainer.textContent.replace(regEx, '');
                this.parent.formatter.editorManager.nodeSelection.setCursorPoint(this.parent.contentModule.getDocument(), range.startContainer, pointer);
            }
        }
    };
    HtmlEditor.prototype.onKeyDown = function (e) {
        var _this = this;
        var currentRange;
        var args = e.args;
        if (Browser.info.name === 'chrome') {
            currentRange = this.parent.getRange();
            this.backSpaceCleanup(e, currentRange);
            this.deleteCleanup(e, currentRange);
        }
        if (args.keyCode === 9 && this.parent.enableTabKey) {
            if (!isNOU(args.target) && isNullOrUndefined(closest(args.target, '.e-rte-toolbar'))) {
                var range = this.nodeSelectionObj.getRange(this.contentRenderer.getDocument());
                var parentNode = this.nodeSelectionObj.getParentNodeCollection(range);
                if (!((parentNode[0].nodeName === 'LI' || closest(parentNode[0], 'li') ||
                    closest(parentNode[0], 'table')) && range.startOffset === 0)) {
                    args.preventDefault();
                    if (!args.shiftKey) {
                        InsertHtml.Insert(this.contentRenderer.getDocument(), '&nbsp;&nbsp;&nbsp;&nbsp;');
                        this.rangeCollection.push(this.nodeSelectionObj.getRange(this.contentRenderer.getDocument()));
                    }
                    else if (this.rangeCollection.length > 0 &&
                        this.rangeCollection[this.rangeCollection.length - 1].startContainer.textContent.length === 4) {
                        var textCont = this.rangeCollection[this.rangeCollection.length - 1].startContainer;
                        this.nodeSelectionObj.setSelectionText(this.contentRenderer.getDocument(), textCont, textCont, 0, textCont.textContent.length);
                        InsertHtml.Insert(this.contentRenderer.getDocument(), document.createTextNode(''));
                        this.rangeCollection.pop();
                    }
                }
            }
        }
        if (e.args.action === 'space' ||
            e.args.action === 'enter' ||
            e.args.keyCode === 13) {
            this.spaceLink(e.args);
            if (this.parent.editorMode === 'HTML' && !this.parent.readonly) {
                var currentLength = this.parent.getText().trim().length;
                var selectionLength = this.parent.getSelection().length;
                var totalLength = (currentLength - selectionLength) + 1;
                if (!(this.parent.maxLength === -1 || totalLength <= this.parent.maxLength) &&
                    e.args.keyCode === 13) {
                    e.args.preventDefault();
                    return;
                }
                else {
                    this.parent.notify(events.enterHandler, { args: e.args });
                }
            }
        }
        if (e.args.action === 'space') {
            var currentRange_1 = this.parent.getRange();
            var editorValue = currentRange_1.startContainer.textContent.slice(0, currentRange_1.startOffset);
            var orderedList_1 = this.isOrderedList(editorValue);
            var unOrderedList = this.isUnOrderedList(editorValue);
            if (orderedList_1 && !unOrderedList || unOrderedList && !orderedList_1) {
                var eventArgs_1 = {
                    callBack: null,
                    event: e.args,
                    name: 'keydown-handler'
                };
                var actionBeginArgs = {
                    cancel: false,
                    item: { command: 'Lists', subCommand: orderedList_1 ? 'OL' : 'UL' },
                    name: 'actionBegin',
                    originalEvent: e.args,
                    requestType: orderedList_1 ? 'OL' : 'UL'
                };
                this.parent.trigger(events.actionBegin, actionBeginArgs, function (actionBeginArgs) {
                    if (!actionBeginArgs.cancel) {
                        _this.parent.formatter.editorManager.observer.notify(ON_BEGIN, eventArgs_1);
                        _this.parent.trigger(events.actionComplete, {
                            editorMode: _this.parent.editorMode,
                            elements: _this.parent.formatter.editorManager.domNode.blockNodes(),
                            event: e.args,
                            name: events.actionComplete,
                            range: _this.parent.getRange(),
                            requestType: orderedList_1 ? 'OL' : 'UL'
                        });
                    }
                });
            }
        }
        if (Browser.info.name === 'chrome' && (!isNullOrUndefined(this.rangeElement) && !isNullOrUndefined(this.oldRangeElement) ||
            !isNullOrUndefined(this.deleteRangeElement) && !isNullOrUndefined(this.deleteOldRangeElement)) &&
            currentRange.startContainer.parentElement.tagName !== 'TD' && currentRange.startContainer.parentElement.tagName !== 'TH') {
            this.rangeElement = null;
            this.oldRangeElement = null;
            this.deleteRangeElement = null;
            this.deleteOldRangeElement = null;
            if (!this.isImageDelete) {
                args.preventDefault();
            }
            args.preventDefault();
        }
    };
    HtmlEditor.prototype.isOrderedList = function (editorValue) {
        editorValue = editorValue.replace(/\u200B/g, '');
        var olListStartRegex = [/^[1]+[.]+$/, /^[i]+[.]+$/, /^[a]+[.]+$/];
        if (!isNullOrUndefined(editorValue)) {
            for (var i = 0; i < olListStartRegex.length; i++) {
                if (olListStartRegex[i].test(editorValue)) {
                    return true;
                }
            }
        }
        return false;
    };
    HtmlEditor.prototype.isUnOrderedList = function (editorValue) {
        editorValue = editorValue.replace(/\u200B/g, '');
        var ulListStartRegex = [/^[*]$/, /^[-]$/];
        if (!isNullOrUndefined(editorValue)) {
            for (var i = 0; i < ulListStartRegex.length; i++) {
                if (ulListStartRegex[i].test(editorValue)) {
                    return true;
                }
            }
        }
        return false;
    };
    HtmlEditor.prototype.backSpaceCleanup = function (e, currentRange) {
        var isLiElement = false;
        var isPreviousNotContentEditable = true;
        if (!isNOU(currentRange.startContainer.previousSibling) &&
            currentRange.startContainer.previousSibling.nodeName === 'SPAN') {
            isPreviousNotContentEditable = currentRange.startContainer.previousSibling.contentEditable === 'false' ? false : true;
        }
        if (e.args.code === 'Backspace' && e.args.keyCode === 8 && currentRange.startOffset === 0 &&
            currentRange.endOffset === 0 && this.parent.getSelection().length === 0 && currentRange.startContainer.textContent.length > 0 &&
            currentRange.startContainer.parentElement.tagName !== 'TD' && currentRange.startContainer.parentElement.tagName !== 'TH' &&
            isPreviousNotContentEditable) {
            var checkNode = currentRange.startContainer.nodeName === '#text' ? currentRange.startContainer.parentElement : currentRange.startContainer;
            if ((!this.parent.formatter.editorManager.domNode.isBlockNode(checkNode) &&
                !isNOU(checkNode.previousSibling) && checkNode.previousSibling.nodeName === 'BR') ||
                (!isNOU(currentRange.startContainer.previousSibling) && currentRange.startContainer.previousSibling.nodeName === 'BR')) {
                return;
            }
            this.rangeElement = this.getRootBlockNode(currentRange.startContainer);
            if (this.rangeElement.tagName === 'OL' || this.rangeElement.tagName === 'UL') {
                var liElement = this.getRangeLiNode(currentRange.startContainer);
                if (liElement.previousElementSibling && liElement.previousElementSibling.childElementCount > 0) {
                    this.oldRangeElement = liElement.previousElementSibling.lastElementChild.nodeName === 'BR' ?
                        liElement.previousElementSibling : liElement.previousElementSibling.lastElementChild;
                    if (!isNullOrUndefined(liElement.lastElementChild) && liElement.lastElementChild.nodeName !== 'BR') {
                        this.rangeElement = liElement.lastElementChild;
                        isLiElement = true;
                    }
                    else {
                        this.rangeElement = liElement;
                    }
                }
            }
            else if (this.rangeElement === this.parent.inputElement || this.rangeElement.tagName === 'TABLE' ||
                (!isNullOrUndefined(this.rangeElement.previousElementSibling) && this.rangeElement.previousElementSibling.tagName === 'TABLE')) {
                return;
            }
            else {
                this.oldRangeElement = this.rangeElement.previousElementSibling;
            }
            if (isNullOrUndefined(this.oldRangeElement)) {
                return;
            }
            else {
                if (this.oldRangeElement.tagName === 'OL' || this.oldRangeElement.tagName === 'UL') {
                    this.oldRangeElement = this.oldRangeElement.lastElementChild.lastElementChild
                        ? this.oldRangeElement.lastElementChild.lastElementChild :
                        this.oldRangeElement.lastElementChild;
                }
                var lastNode = this.oldRangeElement.lastChild;
                while (lastNode.nodeType !== 3 && lastNode.nodeName !== '#text' &&
                    lastNode.nodeName !== 'BR') {
                    lastNode = lastNode.lastChild;
                }
                this.parent.formatter.editorManager.nodeSelection.setCursorPoint(this.parent.contentModule.getDocument(), 
                // eslint-disable-next-line
                lastNode, lastNode.textContent.length);
                if (this.oldRangeElement.querySelectorAll('BR').length === 1) {
                    detach(this.oldRangeElement.querySelector('BR'));
                }
                if (!isNullOrUndefined(this.rangeElement) && this.oldRangeElement !== this.rangeElement) {
                    while (this.rangeElement.firstChild) {
                        this.oldRangeElement.appendChild(this.rangeElement.childNodes[0]);
                    }
                    // eslint-disable-next-line
                    !isLiElement ? detach(this.rangeElement) : detach(this.rangeElement.parentElement);
                    this.oldRangeElement.normalize();
                }
            }
        }
    };
    HtmlEditor.prototype.deleteCleanup = function (e, currentRange) {
        var isLiElement = false;
        var liElement;
        var rootElement;
        if (e.args.code === 'Delete' && e.args.keyCode === 46 &&
            this.parent.contentModule.getText().trim().length !== 0 && this.parent.getSelection().length === 0 && currentRange.startContainer.parentElement.tagName !== 'TD' &&
            currentRange.startContainer.parentElement.tagName !== 'TH') {
            this.deleteRangeElement = rootElement = this.getRootBlockNode(currentRange.startContainer);
            if (this.deleteRangeElement.tagName === 'OL' || this.deleteRangeElement.tagName === 'UL') {
                liElement = this.getRangeLiNode(currentRange.startContainer);
                if (liElement.nextElementSibling && liElement.nextElementSibling.childElementCount > 0
                    && !liElement.nextElementSibling.querySelector('BR')) {
                    if (!isNullOrUndefined(liElement.lastElementChild)) {
                        this.deleteRangeElement = liElement.lastElementChild;
                        isLiElement = true;
                    }
                    else {
                        this.deleteRangeElement = liElement;
                    }
                }
                else {
                    this.deleteRangeElement = this.getRangeElement(liElement);
                }
            }
            else if (this.deleteRangeElement.nodeType === 3 || (this.deleteRangeElement.tagName === 'TABLE' ||
                (!isNullOrUndefined(this.deleteRangeElement.nextElementSibling) && this.deleteRangeElement.nextElementSibling.tagName === 'TABLE'))) {
                return;
            }
            if (this.getCaretIndex(currentRange, this.deleteRangeElement) === this.deleteRangeElement.textContent.length) {
                if (!isNullOrUndefined(liElement)) {
                    if (isLiElement || !isNullOrUndefined(liElement.nextElementSibling)) {
                        this.deleteOldRangeElement = this.getRangeElement(liElement.nextElementSibling);
                    }
                    else {
                        this.deleteOldRangeElement = rootElement.nextElementSibling;
                    }
                }
                else {
                    this.deleteOldRangeElement = this.deleteRangeElement.nextElementSibling;
                }
                if (isNullOrUndefined(this.deleteOldRangeElement)) {
                    return;
                }
                else {
                    if (currentRange.startOffset === 0 && currentRange.endOffset === 1 &&
                        this.deleteRangeElement.childNodes[0].nodeName === 'IMG') {
                        this.parent.formatter.editorManager.nodeSelection.setSelectionText(this.parent.contentModule.getDocument(), this.deleteRangeElement, this.deleteRangeElement, 0, 1);
                        this.isImageDelete = true;
                    }
                    else {
                        this.parent.formatter.editorManager.nodeSelection.setCursorPoint(this.parent.contentModule.getDocument(), this.deleteRangeElement, this.deleteRangeElement.childNodes.length);
                        this.isImageDelete = false;
                    }
                    if (this.deleteRangeElement.querySelector('BR')) {
                        detach(this.deleteRangeElement.querySelector('BR'));
                    }
                    if (!isNullOrUndefined(this.deleteRangeElement) && (this.deleteOldRangeElement.tagName !== 'OL' && this.deleteOldRangeElement.tagName !== 'UL')
                        && this.deleteOldRangeElement !== this.deleteRangeElement) {
                        while (this.deleteOldRangeElement.firstChild) {
                            this.deleteRangeElement.appendChild(this.deleteOldRangeElement.childNodes[0]);
                        }
                        if (!isLiElement) {
                            detach(this.deleteOldRangeElement);
                        }
                        else {
                            detach(this.deleteOldRangeElement.parentElement);
                        }
                        this.deleteRangeElement.normalize();
                    }
                    else {
                        this.deleteRangeElement = null;
                        this.deleteOldRangeElement = null;
                    }
                }
            }
            else {
                this.deleteRangeElement = null;
            }
        }
    };
    HtmlEditor.prototype.getCaretIndex = function (currentRange, element) {
        var position = 0;
        if (this.parent.contentModule.getDocument().getSelection().rangeCount !== 0) {
            var preCaretRange = currentRange.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(currentRange.endContainer, currentRange.endOffset);
            position = preCaretRange.toString().length;
        }
        return position;
    };
    HtmlEditor.prototype.getRangeElement = function (element) {
        var rangeElement = element.lastElementChild ? element.lastElementChild.tagName === 'BR' ?
            element.lastElementChild.previousElementSibling ? element.lastElementChild.previousElementSibling
                : element : element.lastElementChild : element;
        return rangeElement;
    };
    HtmlEditor.prototype.getRootBlockNode = function (rangeBlockNode) {
        // eslint-disable-next-line
        for (; rangeBlockNode && this.parent && this.parent.inputElement !== rangeBlockNode; rangeBlockNode = rangeBlockNode) {
            if (rangeBlockNode.parentElement === this.parent.inputElement) {
                break;
            }
            else {
                rangeBlockNode = rangeBlockNode.parentElement;
            }
        }
        return rangeBlockNode;
    };
    HtmlEditor.prototype.getRangeLiNode = function (rangeLiNode) {
        var node = rangeLiNode.parentElement;
        while (node !== this.parent.inputElement) {
            if (node.nodeType === 1 && node.tagName === 'LI') {
                break;
            }
            node = node.parentElement;
        }
        return node;
    };
    HtmlEditor.prototype.onPaste = function (e) {
        // eslint-disable-next-line
        var regex = new RegExp(/([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi);
        if (e.text.match(regex)) {
            if (e.isWordPaste) {
                return;
            }
            e.args.preventDefault();
            var range = this.parent.formatter.editorManager.nodeSelection.getRange(this.parent.contentModule.getDocument());
            // eslint-disable-next-line
            var saveSelection = this.parent.formatter.editorManager.nodeSelection.save(range, this.parent.contentModule.getDocument());
            // eslint-disable-next-line
            var httpRegex = new RegExp(/([^\S]|^)(((https?\:\/\/)))/gi);
            var wwwRegex = new RegExp(/([^\S]|^)(((www\.))(\S+))/gi);
            var enterSplitText = e.text.split('\n');
            var contentInnerElem = '';
            for (var i = 0; i < enterSplitText.length; i++) {
                if (enterSplitText[i].trim() === '') {
                    contentInnerElem += getDefaultValue(this.parent);
                }
                else {
                    var contentWithSpace = '';
                    var spaceBetweenContent = true;
                    var spaceSplit = enterSplitText[i].split(' ');
                    for (var j = 0; j < spaceSplit.length; j++) {
                        if (spaceSplit[j].trim() === '') {
                            contentWithSpace += spaceBetweenContent ? '&nbsp;' : ' ';
                        }
                        else {
                            spaceBetweenContent = false;
                            contentWithSpace += spaceSplit[j] + ' ';
                        }
                    }
                    if (i === 0) {
                        contentInnerElem += '<span>' + contentWithSpace.trim() + '</span>';
                    }
                    else {
                        contentInnerElem += '<p>' + contentWithSpace.trim() + '</p>';
                    }
                }
            }
            var divElement = this.parent.createElement('div');
            divElement.setAttribute('class', 'pasteContent');
            divElement.style.display = 'inline';
            divElement.innerHTML = contentInnerElem.replace('&para', '&amp;para');
            var paraElem = divElement.querySelectorAll('span, p');
            for (var i = 0; i < paraElem.length; i++) {
                var splitTextContent = paraElem[i].innerHTML.split(' ');
                var resultSplitContent = '';
                for (var j = 0; j < splitTextContent.length; j++) {
                    if (splitTextContent[j].match(httpRegex) || splitTextContent[j].match(wwwRegex)) {
                        resultSplitContent += '<a class="e-rte-anchor" href="' + splitTextContent[j] +
                            '" title="' + splitTextContent[j] + '"target="_blank">' + splitTextContent[j] + ' </a>';
                    }
                    else {
                        resultSplitContent += splitTextContent[j] + ' ';
                    }
                }
                paraElem[i].innerHTML = resultSplitContent.trim();
            }
            if (!isNullOrUndefined(this.parent.pasteCleanupModule)) {
                e.callBack(divElement.innerHTML);
            }
            else {
                this.parent.formatter.editorManager.execCommand('insertHTML', null, null, null, divElement);
            }
        }
    };
    HtmlEditor.prototype.spaceLink = function (e) {
        var range = this.nodeSelectionObj.getRange(this.contentRenderer.getDocument());
        var selectNodeEle = this.nodeSelectionObj.getParentNodeCollection(range);
        var text = range.startContainer.textContent.substr(0, range.endOffset);
        var splitText = text.split(' ');
        var urlText = splitText[splitText.length - 1];
        var urlTextRange = range.startOffset - (text.length - splitText[splitText.length - 1].length);
        urlText = urlText.slice(0, urlTextRange);
        // eslint-disable-next-line
        var regex = new RegExp(/([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi);
        if (selectNodeEle[0].nodeName !== 'A' && urlText.match(regex)) {
            var selection = this.nodeSelectionObj.save(range, this.parent.contentModule.getDocument());
            var url = urlText.indexOf('http') > -1 ? urlText : 'http://' + urlText;
            var selectParent = this.parent.formatter.editorManager.nodeSelection.getParentNodeCollection(range);
            var value = {
                url: url,
                selection: selection, selectParent: selectParent,
                text: urlText,
                title: '',
                target: '_blank'
            };
            this.parent.formatter.process(this.parent, {
                item: {
                    'command': 'Links',
                    'subCommand': 'CreateLink'
                }
            }, e, value);
        }
    };
    HtmlEditor.prototype.onToolbarClick = function (args) {
        var _this = this;
        var save;
        var selectNodeEle;
        var selectParentEle;
        var item = args.item;
        var closestElement = closest(args.originalEvent.target, '.e-rte-quick-popup');
        if (item.command !== 'FormatPainter') {
            if (closestElement && !closestElement.classList.contains('e-rte-inline-popup')) {
                if (!(item.subCommand === 'SourceCode' || item.subCommand === 'Preview' ||
                    item.subCommand === 'FontColor' || item.subCommand === 'BackgroundColor')) {
                    if (isIDevice() && item.command === 'Images') {
                        this.nodeSelectionObj.restore();
                    }
                    var range = this.nodeSelectionObj.getRange(this.parent.contentModule.getDocument());
                    save = this.nodeSelectionObj.save(range, this.parent.contentModule.getDocument());
                    selectNodeEle = this.nodeSelectionObj.getNodeCollection(range);
                    selectParentEle = this.nodeSelectionObj.getParentNodeCollection(range);
                }
                if (item.command === 'Images') {
                    this.parent.notify(events.imageToolbarAction, {
                        member: 'image', args: args, selectNode: selectNodeEle, selection: save, selectParent: selectParentEle
                    });
                }
                if (item.command === 'Audios') {
                    this.parent.notify(events.audioToolbarAction, {
                        member: 'audio', args: args, selectNode: selectNodeEle, selection: save, selectParent: selectParentEle
                    });
                }
                if (item.command === 'Videos') {
                    this.parent.notify(events.videoToolbarAction, {
                        member: 'video', args: args, selectNode: selectNodeEle, selection: save, selectParent: selectParentEle
                    });
                }
                if (item.command === 'Links') {
                    this.parent.notify(events.linkToolbarAction, {
                        member: 'link', args: args, selectNode: selectNodeEle, selection: save, selectParent: selectParentEle
                    });
                }
                if (item.command === 'Table') {
                    this.parent.notify(events.tableToolbarAction, {
                        member: 'table', args: args, selectNode: selectNodeEle, selection: save, selectParent: selectParentEle
                    });
                }
            }
            else {
                var linkDialog = document.getElementById(this.parent.getID() + '_rtelink');
                var imageDialog = document.getElementById(this.parent.getID() + '_image');
                if (!(item.subCommand === 'SourceCode' || item.subCommand === 'Preview' ||
                    item.subCommand === 'FontColor' || item.subCommand === 'BackgroundColor')) {
                    var range = this.nodeSelectionObj.getRange(this.parent.contentModule.getDocument());
                    if (isNullOrUndefined(linkDialog) && isNullOrUndefined(imageDialog)) {
                        save = this.nodeSelectionObj.save(range, this.parent.contentModule.getDocument());
                    }
                    selectNodeEle = this.nodeSelectionObj.getNodeCollection(range);
                    selectParentEle = this.nodeSelectionObj.getParentNodeCollection(range);
                }
                switch (item.subCommand) {
                    case 'Maximize':
                        this.parent.notify(events.enableFullScreen, { args: args });
                        break;
                    case 'Minimize':
                        this.parent.notify(events.disableFullScreen, { args: args });
                        break;
                    case 'CreateLink':
                        this.parent.notify(events.insertLink, {
                            member: 'link', args: args, selectNode: selectNodeEle, selection: save, selectParent: selectParentEle
                        });
                        break;
                    case 'RemoveLink':
                        this.parent.notify(events.unLink, {
                            member: 'link', args: args, selectNode: selectNodeEle, selection: save, selectParent: selectParentEle
                        });
                        break;
                    case 'Print':
                        this.parent.print();
                        break;
                    case 'Image':
                        this.parent.notify(events.insertImage, {
                            member: 'image', args: args, selectNode: selectNodeEle, selection: save, selectParent: selectParentEle
                        });
                        break;
                    case 'Audio':
                        this.parent.notify(events.insertAudio, {
                            member: 'audio', args: args, selectNode: selectNodeEle, selection: save, selectParent: selectParentEle
                        });
                        break;
                    case 'Video':
                        this.parent.notify(events.insertVideo, {
                            member: 'video', args: args, selectNode: selectNodeEle, selection: save, selectParent: selectParentEle
                        });
                        break;
                    case 'CreateTable':
                        this.parent.notify(events.createTable, {
                            member: 'table', args: args, selection: save
                        });
                        break;
                    case 'SourceCode':
                        this.parent.notify(events.sourceCode, { member: 'viewSource', args: args });
                        break;
                    case 'Preview':
                        this.parent.notify(events.updateSource, { member: 'updateSource', args: args });
                        break;
                    case 'FontColor':
                    case 'BackgroundColor':
                        break;
                    case 'File':
                        this.parent.notify(events.renderFileManager, {
                            member: 'fileManager', args: args, selectNode: selectNodeEle, selection: save, selectParent: selectParentEle
                        });
                        break;
                    case 'EmojiPicker':
                        this.parent.notify(events.emojiPicker, { member: 'emojiPicker', args: args });
                        break;
                    default:
                        this.parent.formatter.process(this.parent, args, args.originalEvent, null);
                        break;
                }
            }
        }
        else {
            if (args.originalEvent.detail === 1) {
                clearTimeout(this.clickTimeout);
                this.clickTimeout = setTimeout(function () {
                    _this.parent.notify(events.formatPainterClick, {
                        member: 'formatPainter', args: args
                    });
                }, 200);
            }
            else {
                clearTimeout(this.clickTimeout);
                this.parent.notify(events.formatPainterDoubleClick, {
                    member: 'formatPainter', args: args
                });
            }
        }
    };
    HtmlEditor.prototype.renderColorPicker = function (args) {
        this.colorPickerModule.renderColorPickerInput(args);
    };
    HtmlEditor.prototype.instantiateRenderer = function () {
        if (this.parent.iframeSettings.enable) {
            this.renderFactory.addRenderer(RenderType.Content, new IframeContentRender(this.parent, this.locator));
        }
        else {
            this.renderFactory.addRenderer(RenderType.Content, new ContentRender(this.parent, this.locator));
        }
    };
    HtmlEditor.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.initialEnd, this.render);
        this.parent.off(events.modelChanged, this.onPropertyChanged);
        this.parent.off(events.htmlToolbarClick, this.onToolbarClick);
        this.parent.off(events.renderColorPicker, this.renderColorPicker);
        this.parent.off(events.destroy, this.destroy);
        this.parent.off(events.keyDown, this.onKeyDown);
        this.parent.off(events.initialLoad, this.instantiateRenderer);
        this.parent.off(events.selectAll, this.selectAll);
        this.parent.off(events.selectRange, this.selectRange);
        this.parent.off(events.getSelectedHtml, this.getSelectedHtml);
        this.parent.off(events.selectionSave, this.onSelectionSave);
        this.parent.off(events.selectionRestore, this.onSelectionRestore);
        this.parent.off(events.readOnlyMode, this.updateReadOnly);
        this.parent.off(events.paste, this.onPaste);
        this.parent.off(events.tableclass, this.isTableClassAdded);
    };
    HtmlEditor.prototype.render = function () {
        this.contentRenderer = this.renderFactory.getRenderer(RenderType.Content);
        var editElement = this.contentRenderer.getEditPanel();
        var option = { undoRedoSteps: this.parent.undoRedoSteps, undoRedoTimer: this.parent.undoRedoTimer };
        if (isNullOrUndefined(this.parent.formatter)) {
            var formatterClass = new HTMLFormatter({
                currentDocument: this.contentRenderer.getDocument(),
                element: editElement,
                options: option,
                formatPainterSettings: this.parent.formatPainterSettings
            });
            this.parent.setProperties({ formatter: formatterClass }, true);
        }
        else {
            this.parent.formatter.updateFormatter(editElement, this.contentRenderer.getDocument(), option);
        }
        if (this.parent.enableXhtml) {
            this.parent.notify(events.xhtmlValidation, {});
        }
        if (this.parent.toolbarSettings.enable) {
            this.toolbarUpdate = new HtmlToolbarStatus(this.parent);
        }
        if (this.parent.inlineMode.enable) {
            if (!isNullOrUndefined(this.parent.fontFamily.default)) {
                editElement.style.fontFamily = this.parent.fontFamily.default;
            }
            if (!isNullOrUndefined(this.parent.fontSize.default)) {
                editElement.style.fontSize = this.parent.fontSize.default;
            }
        }
        this.parent.notify(events.bindOnEnd, {});
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param {RichTextEditorModel} e - specifies the editor model
     * @returns {void}
     * @hidden

     */
    HtmlEditor.prototype.onPropertyChanged = function (e) {
        // On property code change here
        if (!isNullOrUndefined(e.newProp.formatter)) {
            var editElement = this.contentRenderer.getEditPanel();
            var option = { undoRedoSteps: this.parent.undoRedoSteps,
                undoRedoTimer: this.parent.undoRedoTimer };
            this.parent.formatter.updateFormatter(editElement, this.contentRenderer.getDocument(), option);
        }
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} - returns the string value
     * @hidden
     */
    HtmlEditor.prototype.getModuleName = function () {
        return 'htmlEditor';
    };
    /**
     * For selecting all content in RTE
     *
     * @returns {void}
     * @private
     * @hidden
     */
    HtmlEditor.prototype.selectAll = function () {
        var nodes = getTextNodesUnder(this.parent.contentModule.getDocument(), this.parent.contentModule.getEditPanel());
        if (nodes.length > 0) {
            this.parent.formatter.editorManager.nodeSelection.setSelectionText(this.parent.contentModule.getDocument(), nodes[0], nodes[nodes.length - 1], 0, nodes[nodes.length - 1].textContent.length);
        }
    };
    /**
     * For selecting all content in RTE
     *
     * @param {NotifyArgs} e - specifies the notified arguments
     * @returns {void}
     * @private
     * @hidden
     */
    HtmlEditor.prototype.selectRange = function (e) {
        this.parent.formatter.editorManager.nodeSelection.setRange(this.parent.contentModule.getDocument(), e.range);
    };
    /**
     * For get a selected text in RTE
     *
     * @param {NotifyArgs} e - specifies the notified arguments
     * @returns {void}
     * @hidden
     */
    HtmlEditor.prototype.getSelectedHtml = function (e) {
        e.callBack(this.parent.formatter.editorManager.nodeSelection.getRange(this.parent.contentModule.getDocument()).toString());
    };
    return HtmlEditor;
}());
export { HtmlEditor };
