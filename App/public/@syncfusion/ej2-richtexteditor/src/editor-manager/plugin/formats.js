import * as EVENTS from './../../common/constant';
import { isNullOrUndefined as isNOU, detach, createElement, closest } from '@syncfusion/ej2-base';
import { isIDevice, setEditFrameFocus } from '../../common/util';
import { markerClassName } from './dom-node';
import { NodeCutter } from './nodecutter';
/**
 * Formats internal component
 *
 * @hidden

 */
var Formats = /** @class */ (function () {
    /**
     * Constructor for creating the Formats plugin
     *
     * @param {EditorManager} parent - specifies the parent element.
     * @hidden

     */
    function Formats(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    Formats.prototype.addEventListener = function () {
        this.parent.observer.on(EVENTS.FORMAT_TYPE, this.applyFormats, this);
        this.parent.observer.on(EVENTS.KEY_UP_HANDLER, this.onKeyUp, this);
        this.parent.observer.on(EVENTS.KEY_DOWN_HANDLER, this.onKeyDown, this);
    };
    Formats.prototype.getParentNode = function (node) {
        for (; node.parentNode && node.parentNode !== this.parent.editableElement; null) {
            node = node.parentNode;
        }
        return node;
    };
    Formats.prototype.onKeyUp = function (e) {
        var range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
        var endCon = range.endContainer;
        var lastChild = endCon.lastChild;
        if (e.event.which === 13 && range.startContainer === endCon && endCon.nodeType !== 3) {
            var pTag = createElement('p');
            pTag.innerHTML = '<br>';
            if (!isNOU(lastChild) && lastChild && lastChild.nodeName === 'BR' && (lastChild.previousSibling && lastChild.previousSibling.nodeName === 'TABLE')) {
                endCon.replaceChild(pTag, lastChild);
                this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, pTag, 0);
            }
            else {
                var brNode = this.parent.nodeSelection.getSelectionNodeCollectionBr(range)[0];
                if (!isNOU(brNode) && brNode.nodeName === 'BR' && (brNode.previousSibling && brNode.previousSibling.nodeName === 'TABLE')) {
                    endCon.replaceChild(pTag, brNode);
                    this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, pTag, 0);
                }
            }
        }
    };
    Formats.prototype.onKeyDown = function (e) {
        if (e.event.which === 13) {
            var range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
            var startCon = (range.startContainer.textContent.length === 0 || range.startContainer.nodeName === 'PRE')
                ? range.startContainer : range.startContainer.parentElement;
            var endCon = (range.endContainer.textContent.length === 0 || range.endContainer.nodeName === 'PRE')
                ? range.endContainer : range.endContainer.parentElement;
            var preElem = closest(startCon, 'pre');
            var endPreElem = closest(endCon, 'pre');
            var liParent = !isNOU(preElem) && !isNOU(preElem.parentElement) && preElem.parentElement.tagName === 'LI';
            if (liParent) {
                return;
            }
            if (((isNOU(preElem) && !isNOU(endPreElem)) || (!isNOU(preElem) && isNOU(endPreElem)))) {
                e.event.preventDefault();
                this.deleteContent(range);
                this.removeCodeContent(range);
                range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
                this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, endCon, 0);
            }
            if (e.event.which === 13 && !isNOU(preElem) && !isNOU(endPreElem)) {
                e.event.preventDefault();
                this.deleteContent(range);
                this.removeCodeContent(range);
                range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
                var lastEmpty = range.startContainer.childNodes[range.endOffset];
                var lastBeforeBr = range.startContainer.childNodes[range.endOffset - 1];
                var startParent = range.startContainer;
                if (!isNOU(lastEmpty) && !isNOU(lastBeforeBr) && isNOU(lastEmpty.nextSibling) &&
                    lastEmpty.nodeName === 'BR' && lastBeforeBr.nodeName === 'BR') {
                    this.paraFocus(range.startContainer, e.enterAction);
                }
                else if ((startParent.textContent.charCodeAt(0) === 8203 &&
                    startParent.textContent.length === 1) || startParent.textContent.length === 0) {
                    //Double enter with any parent tag for the node
                    while (startParent.parentElement.nodeName !== 'PRE' &&
                        (startParent.textContent.length === 1 || startParent.textContent.length === 0)) {
                        startParent = startParent.parentElement;
                    }
                    if (!isNOU(startParent.previousSibling) && startParent.previousSibling.nodeName === 'BR' &&
                        isNOU(startParent.nextSibling)) {
                        this.paraFocus(startParent.parentElement);
                    }
                    else {
                        this.isNotEndCursor(preElem, range);
                    }
                }
                else {
                    //Cursor at start and middle
                    this.isNotEndCursor(preElem, range);
                }
            }
        }
    };
    Formats.prototype.removeCodeContent = function (range) {
        // eslint-disable-next-line
        var regEx = new RegExp(String.fromCharCode(65279), 'g');
        if (!isNOU(range.endContainer.textContent.match(regEx))) {
            var pointer = range.endContainer.textContent.charCodeAt(range.endOffset - 1) === 65279 ?
                range.endOffset - 2 : range.endOffset;
            range.endContainer.textContent = range.endContainer.textContent.replace(regEx, '');
            if (range.endContainer.textContent === '') {
                this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, range.endContainer.parentElement, 0);
            }
            else {
                this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, range.endContainer, pointer);
            }
        }
    };
    Formats.prototype.deleteContent = function (range) {
        if (range.startContainer !== range.endContainer || range.startOffset !== range.endOffset) {
            range.deleteContents();
        }
    };
    Formats.prototype.paraFocus = function (referNode, enterAction) {
        var insertTag;
        if (enterAction === 'DIV') {
            insertTag = createElement('div');
            insertTag.innerHTML = '<br>';
        }
        else if (enterAction === 'BR') {
            insertTag = createElement('br');
        }
        else {
            insertTag = createElement('p');
            insertTag.innerHTML = '<br>';
        }
        this.parent.domNode.insertAfter(insertTag, referNode);
        this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, insertTag, 0);
        detach(referNode.lastChild);
    };
    Formats.prototype.isNotEndCursor = function (preElem, range) {
        var nodeCutter = new NodeCutter();
        var isEnd = range.startOffset === preElem.lastChild.textContent.length &&
            preElem.lastChild.textContent === range.startContainer.textContent;
        //Cursor at start point
        if (preElem.textContent.indexOf(range.startContainer.textContent) === 0 &&
            ((range.startOffset === 0 && range.endOffset === 0) || range.startContainer.nodeName === 'PRE')) {
            this.insertMarker(preElem, range);
            var brTag = createElement('br');
            preElem.childNodes[range.endOffset].parentElement.insertBefore(brTag, preElem.childNodes[range.endOffset]);
        }
        else {
            //Cursor at middle
            var cloneNode = nodeCutter.SplitNode(range, preElem, true);
            this.insertMarker(preElem, range);
            var previousSib = preElem.previousElementSibling;
            if (previousSib.tagName === 'PRE') {
                previousSib.insertAdjacentHTML('beforeend', '<br>' + cloneNode.innerHTML);
                detach(preElem);
            }
        }
        //To place the cursor position
        this.setCursorPosition(isEnd, preElem);
    };
    Formats.prototype.setCursorPosition = function (isEnd, preElem) {
        var isEmpty = false;
        var markerElem = this.parent.editableElement.querySelector('.tempSpan');
        var mrkParentElem = markerElem.parentElement;
        // eslint-disable-next-line
        markerElem.parentNode.textContent === '' ? isEmpty = true :
            this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, markerElem, 0);
        if (isEnd) {
            if (isEmpty) {
                //Enter press when pre element is empty
                if (mrkParentElem === preElem) {
                    this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, markerElem, 0);
                    detach(markerElem);
                }
                else {
                    this.focusSelectionParent(markerElem, mrkParentElem);
                }
            }
            else {
                var brElm = createElement('br');
                this.parent.domNode.insertAfter(brElm, markerElem);
                this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, markerElem, 0);
                detach(markerElem);
            }
        }
        else {
            // eslint-disable-next-line
            isEmpty ? this.focusSelectionParent(markerElem, mrkParentElem) : detach(markerElem);
        }
    };
    Formats.prototype.focusSelectionParent = function (markerElem, tempSpanPElem) {
        detach(markerElem);
        tempSpanPElem.innerHTML = '\u200B';
        this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, tempSpanPElem, 0);
    };
    Formats.prototype.insertMarker = function (preElem, range) {
        var tempSpan = createElement('span', { className: 'tempSpan' });
        if (range.startContainer.nodeName === 'PRE') {
            preElem.childNodes[range.endOffset].parentElement.insertBefore(tempSpan, preElem.childNodes[range.endOffset]);
        }
        else {
            range.startContainer.parentElement.insertBefore(tempSpan, range.startContainer);
        }
    };
    Formats.prototype.applyFormats = function (e) {
        var range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
        var isSelectAll = false;
        if (this.parent.editableElement === range.endContainer &&
            !isNOU(this.parent.editableElement.children[range.endOffset - 1]) &&
            this.parent.editableElement.children[range.endOffset - 1].tagName === 'TABLE' && !range.collapsed) {
            isSelectAll = true;
        }
        var save = this.parent.nodeSelection.save(range, this.parent.currentDocument);
        this.parent.domNode.setMarker(save);
        var formatsNodes = this.parent.domNode.blockNodes();
        if (e.enterAction === 'BR') {
            this.setSelectionBRConfig();
            var allSelectedNode = this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument);
            var selectedNodes = this.parent.nodeSelection.getSelectionNodes(allSelectedNode);
            var currentFormatNodes = [];
            if (selectedNodes.length === 0) {
                selectedNodes.push(formatsNodes[0]);
            }
            for (var i = 0; i < selectedNodes.length; i++) {
                var currentNode = selectedNodes[i];
                var previousCurrentNode = void 0;
                while (!this.parent.domNode.isBlockNode(currentNode) && currentNode !== this.parent.editableElement) {
                    previousCurrentNode = currentNode;
                    currentNode = currentNode.parentElement;
                }
                if (this.parent.domNode.isBlockNode(currentNode) && currentNode === this.parent.editableElement) {
                    currentFormatNodes.push(previousCurrentNode);
                }
            }
            for (var i = 0; i < currentFormatNodes.length; i++) {
                if (!this.parent.domNode.isBlockNode(currentFormatNodes[i])) {
                    var currentNode = currentFormatNodes[i];
                    var previousNode = currentNode;
                    while (currentNode === this.parent.editableElement) {
                        previousNode = currentNode;
                        currentNode = currentNode.parentElement;
                    }
                    var tempElem = void 0;
                    if (this.parent.domNode.isBlockNode(previousNode.parentElement) &&
                        previousNode.parentElement === this.parent.editableElement) {
                        tempElem = createElement('div');
                        previousNode.parentElement.insertBefore(tempElem, previousNode);
                        tempElem.appendChild(previousNode);
                    }
                    else {
                        tempElem = previousNode;
                    }
                    var preNode = tempElem.previousSibling;
                    while (!isNOU(preNode) && preNode.nodeName !== 'BR' &&
                        !this.parent.domNode.isBlockNode(preNode)) {
                        tempElem.firstChild.parentElement.insertBefore(preNode, tempElem.firstChild);
                        preNode = tempElem.previousSibling;
                    }
                    if (!isNOU(preNode) && preNode.nodeName === 'BR') {
                        detach(preNode);
                    }
                    var postNode = tempElem.nextSibling;
                    while (!isNOU(postNode) && postNode.nodeName !== 'BR' &&
                        !this.parent.domNode.isBlockNode(postNode)) {
                        tempElem.appendChild(postNode);
                        postNode = tempElem.nextSibling;
                    }
                    if (!isNOU(postNode) && postNode.nodeName === 'BR') {
                        detach(postNode);
                    }
                }
            }
            this.setSelectionBRConfig();
            formatsNodes = this.parent.domNode.blockNodes();
        }
        for (var i = 0; i < formatsNodes.length; i++) {
            var parentNode = void 0;
            var replaceHTML = void 0;
            if (e.subCommand.toLowerCase() === 'blockquote') {
                parentNode = this.getParentNode(formatsNodes[i]);
                replaceHTML = this.parent.domNode.isList(parentNode) ||
                    parentNode.tagName === 'TABLE' ? parentNode.outerHTML : parentNode.innerHTML;
            }
            else {
                parentNode = formatsNodes[i];
                replaceHTML = parentNode.innerHTML;
            }
            if ((e.subCommand.toLowerCase() === parentNode.tagName.toLowerCase() &&
                (e.subCommand.toLowerCase() !== 'pre' ||
                    (!isNOU(e.exeValue) && e.exeValue.name === 'dropDownSelect'))) ||
                isNOU(parentNode.parentNode) ||
                (parentNode.tagName === 'TABLE' && e.subCommand.toLowerCase() === 'pre')) {
                continue;
            }
            this.cleanFormats(parentNode, e.subCommand);
            var replaceNode = (e.subCommand.toLowerCase() === 'pre' && parentNode.tagName.toLowerCase() === 'pre') ?
                'p' : e.subCommand;
            var replaceTag = this.parent.domNode.createTagString(replaceNode, parentNode, replaceHTML.replace(/>\s+</g, '><'));
            if (parentNode.tagName === 'LI') {
                parentNode.innerHTML = '';
                parentNode.insertAdjacentHTML('beforeend', replaceTag);
            }
            else {
                this.parent.domNode.replaceWith(parentNode, replaceTag);
            }
        }
        this.preFormatMerge();
        var startNode = this.parent.editableElement.querySelector('.' + markerClassName.startSelection);
        var endNode = this.parent.editableElement.querySelector('.' + markerClassName.endSelection);
        if (!isNOU(startNode) && !isNOU(endNode)) {
            startNode = startNode.lastChild;
            endNode = endNode.lastChild;
        }
        save = this.parent.domNode.saveMarker(save, null);
        if (isIDevice()) {
            setEditFrameFocus(this.parent.editableElement, e.selector);
        }
        if (isSelectAll) {
            this.parent.nodeSelection.setSelectionText(this.parent.currentDocument, startNode, endNode, 0, endNode.textContent.length);
        }
        else {
            save.restore();
        }
        if (e.callBack) {
            e.callBack({
                requestType: e.subCommand,
                editorMode: 'HTML',
                event: e.event,
                range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                elements: this.parent.domNode.blockNodes()
            });
        }
    };
    Formats.prototype.setSelectionBRConfig = function () {
        var startElem = this.parent.editableElement.querySelector('.' + markerClassName.startSelection);
        var endElem = this.parent.editableElement.querySelector('.' + markerClassName.endSelection);
        if (isNOU(endElem)) {
            this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, startElem, 0);
        }
        else {
            this.parent.nodeSelection.setSelectionText(this.parent.currentDocument, startElem, endElem, 0, 0);
        }
    };
    Formats.prototype.preFormatMerge = function () {
        var preNodes = this.parent.editableElement.querySelectorAll('PRE');
        if (!isNOU(preNodes)) {
            for (var i = 0; i < preNodes.length; i++) {
                var previousSib = preNodes[i].previousElementSibling;
                if (!isNOU(previousSib) && previousSib.tagName === 'PRE') {
                    previousSib.insertAdjacentHTML('beforeend', '<br>' + preNodes[i].innerHTML);
                    detach(preNodes[i]);
                }
            }
        }
    };
    Formats.prototype.cleanFormats = function (element, tagName) {
        var ignoreAttr = ['display', 'font-size', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right', 'font-weight'];
        tagName = tagName.toLowerCase();
        for (var i = 0; i < ignoreAttr.length && (tagName !== 'p' && tagName !== 'blockquote' && tagName !== 'pre'); i++) {
            element.style.removeProperty(ignoreAttr[i]);
        }
    };
    return Formats;
}());
export { Formats };
