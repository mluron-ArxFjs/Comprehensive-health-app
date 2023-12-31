import * as CONSTANT from './../base/constant';
import { createElement, detach, prepend, append, attributes, Browser } from '@syncfusion/ej2-base';
import { markerClassName } from './dom-node';
import * as EVENTS from './../../common/constant';
import { setStyleAttribute } from '@syncfusion/ej2-base';
import { isIDevice, setEditFrameFocus } from '../../common/util';
import { isNullOrUndefined, isNullOrUndefined as isNOU, closest } from '@syncfusion/ej2-base';
/**
 * Lists internal component
 *
 * @hidden

 */
var Lists = /** @class */ (function () {
    /**
     * Constructor for creating the Lists plugin
     *
     * @param {EditorManager} parent - specifies the parent element
     * @hidden

     */
    function Lists(parent) {
        this.parent = parent;
        this.domNode = this.parent.domNode;
        this.addEventListener();
    }
    Lists.prototype.addEventListener = function () {
        this.parent.observer.on(EVENTS.LIST_TYPE, this.applyListsHandler, this);
        this.parent.observer.on(EVENTS.KEY_UP_HANDLER, this.onKeyUp, this);
        this.parent.observer.on(EVENTS.KEY_DOWN_HANDLER, this.keyDownHandler, this);
        this.parent.observer.on(EVENTS.SPACE_ACTION, this.spaceKeyAction, this);
    };
    Lists.prototype.testList = function (elem) {
        var olListRegex = [/^[\d]+[.]+$/,
            /^(?=[MDCLXVI])M*(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})[.]$/gi,
            /^[a-zA-Z][.]+$/];
        var elementStart = !isNullOrUndefined(elem) ? elem.innerText.trim().split('.')[0] + '.' : null;
        if (!isNullOrUndefined(elementStart)) {
            for (var i = 0; i < olListRegex.length; i++) {
                if (olListRegex[i].test(elementStart)) {
                    return true;
                }
            }
        }
        return false;
    };
    Lists.prototype.testCurrentList = function (range) {
        var olListStartRegex = [/^[1]+[.]+$/, /^[i]+[.]+$/, /^[a]+[.]+$/];
        if (!isNullOrUndefined(range.startContainer.textContent.slice(0, range.startOffset))) {
            var currentContent = range.startContainer.textContent.replace(/\u200B/g, '').slice(0, range.startOffset).trim();
            for (var i = 0; i < olListStartRegex.length; i++) {
                if (olListStartRegex[i].test(currentContent) && currentContent.length === 2) {
                    return true;
                }
            }
        }
        return false;
    };
    Lists.prototype.spaceList = function (e) {
        var range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
        this.saveSelection = this.parent.nodeSelection.save(range, this.parent.currentDocument);
        var startNode = this.parent.domNode.getSelectedNode(range.startContainer, range.startOffset);
        // eslint-disable-next-line
        var endNode = this.parent.domNode.getSelectedNode(range.endContainer, range.endOffset);
        var preElement = startNode.previousElementSibling;
        var nextElement = startNode.nextElementSibling;
        var preElemULStart = !isNullOrUndefined(preElement) ?
            preElement.innerText.trim().substring(0, 1) : null;
        var nextElemULStart = !isNullOrUndefined(nextElement) ?
            nextElement.innerText.trim().substring(0, 1) : null;
        var startElementOLTest = this.testCurrentList(range);
        var preElementOLTest = this.testList(preElement);
        var nextElementOLTest = this.testList(nextElement);
        if (!preElementOLTest && !nextElementOLTest && preElemULStart !== '*' && nextElemULStart !== '*') {
            if (startElementOLTest) {
                range.startContainer.textContent = range.startContainer.textContent.slice(range.startOffset, range.startContainer.textContent.length);
                this.applyListsHandler({ subCommand: 'OL', callBack: e.callBack });
                e.event.preventDefault();
            }
            else if (range.startContainer.textContent.replace(/\u200B/g, '').slice(0, range.startOffset).trim() === '*' ||
                range.startContainer.textContent.replace(/\u200B/g, '').slice(0, range.startOffset).trim() === '-') {
                range.startContainer.textContent = range.startContainer.textContent.slice(range.startOffset, range.startContainer.textContent.length);
                this.applyListsHandler({ subCommand: 'UL', callBack: e.callBack });
                e.event.preventDefault();
            }
        }
    };
    Lists.prototype.enterList = function (e) {
        var range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
        var startNode = range.startContainer.nodeName === 'LI' ? range.startContainer :
            range.startContainer.parentElement.closest('LI');
        var endNode = range.endContainer.nodeName === 'LI' ? range.endContainer :
            range.endContainer.parentElement.closest('LI');
        // Checks for Image, Audio , Video Element inside List Element
        var hasMediaElem = false;
        if (!isNOU(startNode)) {
            var videoElemList = startNode.querySelectorAll('.e-video-clickelem');
            var embedVideoElem = videoElemList.length > 0 && videoElemList[0].childNodes[0].nodeName === 'IFRAME';
            hasMediaElem = startNode.querySelectorAll('IMG').length > 0 || startNode.querySelectorAll('AUDIO').length > 0 || startNode.querySelectorAll('VIDEO').length > 0 || embedVideoElem;
        }
        if (!isNOU(startNode) && !isNOU(endNode) && startNode === endNode && startNode.tagName === 'LI' &&
            startNode.textContent.trim() === '' && !hasMediaElem) {
            if (startNode.innerHTML.indexOf('&nbsp;') >= 0) {
                return;
            }
            if (startNode.textContent.charCodeAt(0) === 65279) {
                startNode.textContent = '';
            }
            var startNodeParent = startNode.parentElement;
            if (isNOU(startNodeParent.parentElement.closest('UL')) && isNOU(startNodeParent.parentElement.closest('OL'))) {
                if (!isNOU(startNode.nextElementSibling)) {
                    var nearBlockNode = this.parent.domNode.blockParentNode(startNode);
                    this.parent.nodeCutter.GetSpliceNode(range, nearBlockNode);
                }
                var insertTag = void 0;
                if (e.enterAction === 'DIV') {
                    insertTag = createElement('div');
                    insertTag.innerHTML = '<br>';
                }
                else if (e.enterAction === 'P') {
                    insertTag = createElement('p');
                    insertTag.innerHTML = '<br>';
                }
                else {
                    insertTag = createElement('br');
                }
                this.parent.domNode.insertAfter(insertTag, startNodeParent);
                e.event.preventDefault();
                this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, insertTag, 0);
                if (startNodeParent.textContent === '' && (startNodeParent.querySelectorAll('audio,video').length === 0)) {
                    detach(startNodeParent);
                }
                else {
                    detach(startNode);
                }
            }
        }
    };
    Lists.prototype.backspaceList = function (e) {
        var range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
        var startNode = this.parent.domNode.getSelectedNode(range.startContainer, range.startOffset);
        var endNode = this.parent.domNode.getSelectedNode(range.endContainer, range.endOffset);
        startNode = startNode.nodeName === 'BR' ? startNode.parentElement : startNode;
        endNode = endNode.nodeName === 'BR' ? endNode.parentElement : endNode;
        if (startNode === endNode && !isNullOrUndefined(closest(startNode, 'li')) &&
            ((startNode.textContent.trim() === '' && startNode.textContent.charCodeAt(0) === 65279) ||
                (startNode.textContent.length === 1 && startNode.textContent.charCodeAt(0) === 8203))) {
            startNode.textContent = '';
        }
        if (startNode === endNode && startNode.tagName === 'LI' && startNode.textContent.length === 0 &&
            isNOU(startNode.previousElementSibling)) {
            startNode.removeAttribute('style');
        }
        if (startNode === endNode && startNode.textContent === '') {
            if (startNode.parentElement.tagName === 'LI' && endNode.parentElement.tagName === 'LI') {
                detach(startNode);
            }
            else if (startNode.closest('ul') || startNode.closest('ol')) {
                var parentList = !isNOU(startNode.closest('ul')) ? startNode.closest('ul') : startNode.closest('ol');
                if (parentList.firstElementChild === startNode && !isNOU(parentList.children[1]) &&
                    (parentList.children[1].tagName === 'OL' || parentList.children[1].tagName === 'UL')) {
                    if (parentList.tagName === parentList.children[1].tagName) {
                        while (parentList.children[1].lastChild) {
                            this.parent.domNode.insertAfter(parentList.children[1].lastChild, parentList.children[1]);
                        }
                        detach(parentList.children[1]);
                    }
                    else {
                        parentList.parentElement.insertBefore(parentList.children[1], parentList);
                    }
                }
            }
        }
        else if (!isNOU(startNode.firstChild) && startNode.firstChild.nodeName === 'BR' &&
            (!isNullOrUndefined(startNode.childNodes[1]) && (startNode.childNodes[1].nodeName === 'UL' ||
                startNode.childNodes[1].nodeName === 'OL'))) {
            var parentList = !isNOU(startNode.closest('ul')) ? startNode.closest('ul') : startNode.closest('ol');
            if (parentList.tagName === startNode.childNodes[1].nodeName) {
                while (startNode.childNodes[1].lastChild) {
                    this.parent.domNode.insertAfter(startNode.children[1].lastChild, startNode);
                }
                detach(startNode.childNodes[1]);
            }
            else {
                parentList.parentElement.insertBefore(startNode.children[1], parentList);
            }
        }
        this.removeList(range, e);
        this.firstListBackSpace(range, e);
    };
    Lists.prototype.removeList = function (range, e) {
        var startNode = this.parent.domNode.getSelectedNode(range.startContainer, range.startOffset);
        var endNode = this.parent.domNode.getSelectedNode(range.endContainer, range.endOffset);
        startNode = startNode.nodeName === 'BR' ? startNode.parentElement : startNode;
        endNode = endNode.nodeName === 'BR' ? endNode.parentElement : endNode;
        startNode = startNode.nodeName !== 'LI' && !isNOU(startNode.closest('LI')) ? startNode.closest('LI') : startNode;
        endNode = endNode.nodeName !== 'LI' && !isNOU(endNode.closest('LI')) ? endNode.closest('LI') : endNode;
        if (((range.commonAncestorContainer.nodeName === 'OL' || range.commonAncestorContainer.nodeName === 'UL' || range.commonAncestorContainer.nodeName === 'LI') &&
            isNOU(endNode.nextElementSibling) && endNode.textContent.length === range.endOffset &&
            isNOU(startNode.previousElementSibling) && range.startOffset === 0) ||
            (Browser.userAgent.indexOf('Firefox') !== -1 && range.startContainer === range.endContainer && range.startContainer === this.parent.editableElement &&
                range.startOffset === 0 && range.endOffset === 1)) {
            if (Browser.userAgent.indexOf('Firefox') !== -1) {
                detach(range.commonAncestorContainer.childNodes[0]);
            }
            else if (range.commonAncestorContainer.nodeName === 'LI') {
                detach(range.commonAncestorContainer.parentElement);
            }
            else {
                detach(range.commonAncestorContainer);
            }
            e.event.preventDefault();
        }
    };
    Lists.prototype.onKeyUp = function () {
        if (!isNOU(this.commonLIParent) && !isNOU(this.commonLIParent.querySelector('.removeList'))) {
            var currentLIElem = this.commonLIParent.querySelector('.removeList');
            while (!isNOU(currentLIElem.firstChild)) {
                this.parent.domNode.insertAfter(currentLIElem.firstChild, currentLIElem);
            }
            detach(currentLIElem);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Lists.prototype.firstListBackSpace = function (range, _e) {
        var startNode = this.parent.domNode.getSelectedNode(range.startContainer, range.startOffset);
        if (!isNOU(startNode.closest('OL'))) {
            this.commonLIParent = startNode.closest('OL');
        }
        else if (!isNOU(startNode.closest('UL'))) {
            this.commonLIParent = startNode.closest('UL');
        }
        if (startNode.nodeName === 'LI' && range.startOffset === 0 && range.endOffset === 0 &&
            isNOU(startNode.previousSibling) && !isNOU(this.commonLIParent) && isNOU(this.commonLIParent.previousSibling) &&
            (isNOU(this.commonLIParent.parentElement.closest('OL')) && isNOU(this.commonLIParent.parentElement.closest('UL')) &&
                isNOU(this.commonLIParent.parentElement.closest('LI')))) {
            var currentElem = createElement('P');
            currentElem.innerHTML = '&#8203;';
            startNode.classList.add('removeList');
            this.commonLIParent.parentElement.insertBefore(currentElem, this.commonLIParent);
        }
    };
    Lists.prototype.keyDownHandler = function (e) {
        if (e.event.which === 13) {
            this.enterList(e);
        }
        if (e.event.which === 32) {
            this.spaceList(e);
        }
        if (e.event.which === 8) {
            this.backspaceList(e);
        }
        if (e.event.which === 46 && e.event.action === 'delete') {
            var range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
            var commonAncestor = range.commonAncestorContainer;
            var startEle = range.startContainer;
            var endEle = range.endContainer;
            var startNode = startEle.nodeType === 3 ? startEle.parentElement : startEle;
            var endNode = endEle.nodeType === 3 ? endEle.parentElement : endEle;
            if ((commonAncestor.nodeName === 'UL' || commonAncestor.nodeName === 'OL') && startNode !== endNode
                && (!isNullOrUndefined(closest(startNode, 'ul')) || !isNullOrUndefined(closest(startNode, 'ol')))
                && (!isNullOrUndefined(closest(endNode, 'ul')) || !isNullOrUndefined(closest(endNode, 'ol')))
                && (commonAncestor.lastElementChild === closest(endNode, 'li')) && !range.collapsed) {
                detach(commonAncestor);
            }
            this.removeList(range, e);
        }
        if (e.event.which === 9) {
            var range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
            if (!(e.event.action && e.event.action === 'indent')) {
                this.saveSelection = this.parent.nodeSelection.save(range, this.parent.currentDocument);
            }
            var blockNodes = void 0;
            var startOffset = range.startOffset;
            var endOffset = range.endOffset;
            var startNode = this.parent.domNode.getSelectedNode(range.startContainer, range.startOffset);
            var endNode = this.parent.domNode.getSelectedNode(range.endContainer, range.endOffset);
            if ((startNode === endNode && (startNode.nodeName === 'BR' || startNode.nodeName === '#text') &&
                CONSTANT.IGNORE_BLOCK_TAGS.indexOf(startNode.parentNode.tagName.toLocaleLowerCase()) >= 0)) {
                return;
            }
            else {
                if (!(e.event.action && e.event.action === 'indent')) {
                    this.domNode.setMarker(this.saveSelection);
                }
                blockNodes = this.domNode.blockNodes();
            }
            var nodes = [];
            var isNested = true;
            for (var i = 0; i < blockNodes.length; i++) {
                if (blockNodes[i].parentNode.tagName === 'LI') {
                    nodes.push(blockNodes[i].parentNode);
                }
                else if (blockNodes[i].tagName === 'LI' && blockNodes[i].childNodes[0].tagName !== 'P' &&
                    (blockNodes[i].childNodes[0].tagName !== 'OL' &&
                        blockNodes[i].childNodes[0].tagName !== 'UL')) {
                    nodes.push(blockNodes[i]);
                }
            }
            if (nodes.length > 1 || nodes.length && ((startOffset === 0 && endOffset === 0) || e.ignoreDefault)) {
                e.event.preventDefault();
                e.event.stopPropagation();
                this.currentAction = this.getAction(nodes[0]);
                if (e.event.shiftKey) {
                    this.revertList(nodes, e);
                    this.revertClean();
                }
                else {
                    isNested = this.nestedList(nodes);
                }
                if (isNested) {
                    this.cleanNode();
                    this.parent.editableElement.focus();
                }
                if (!(e.event.action && e.event.action === 'indent')) {
                    this.saveSelection = this.domNode.saveMarker(this.saveSelection);
                    this.saveSelection.restore();
                    if (e.callBack) {
                        e.callBack({
                            requestType: this.currentAction,
                            editorMode: 'HTML',
                            range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                            elements: this.parent.domNode.blockNodes(),
                            event: e.event
                        });
                    }
                }
            }
            else {
                if (!(e.event.action && e.event.action === 'indent')) {
                    if (e.event && e.event.shiftKey && e.event.key === 'Tab') {
                        e.event.action = 'tab';
                    }
                    this.saveSelection = this.domNode.saveMarker(this.saveSelection, e.event.action);
                    this.saveSelection.restore();
                }
            }
        }
        else {
            switch (e.event.action) {
                case 'ordered-list':
                    this.applyListsHandler({ subCommand: 'OL', callBack: e.callBack });
                    e.event.preventDefault();
                    break;
                case 'unordered-list':
                    this.applyListsHandler({ subCommand: 'UL', callBack: e.callBack });
                    e.event.preventDefault();
                    break;
            }
        }
    };
    Lists.prototype.spaceKeyAction = function (e) {
        if (e.event.which === 32) {
            this.spaceList(e);
        }
    };
    Lists.prototype.getAction = function (element) {
        var parentNode = element.parentNode;
        return (parentNode.nodeName === 'OL' ? 'OL' : 'UL');
    };
    Lists.prototype.revertClean = function () {
        var collectionNodes = this.parent.editableElement.querySelectorAll('ul, ol');
        for (var i = 0; i < collectionNodes.length; i++) {
            var listNodes = collectionNodes[i].querySelectorAll('ul, ol');
            if (listNodes.length > 0) {
                for (var j = 0; j < listNodes.length; j++) {
                    var prevSibling = listNodes[j].previousSibling;
                    if (prevSibling && prevSibling.tagName === 'LI') {
                        prevSibling.appendChild(listNodes[j]);
                    }
                }
            }
        }
    };
    Lists.prototype.noPreviousElement = function (elements) {
        var firstNode;
        var firstNodeOL;
        var siblingListOL = elements.querySelectorAll('ol, ul');
        var siblingListLI = elements
            .querySelectorAll('li');
        var siblingListLIFirst = this.domNode.contents(siblingListLI[0])[0];
        if (siblingListLI.length > 0 && (siblingListLIFirst.nodeName === 'OL' || siblingListLIFirst.nodeName === 'UL')) {
            firstNode = siblingListLI[0];
        }
        else {
            firstNodeOL = siblingListOL[0];
        }
        if (firstNode) {
            for (var h = this.domNode.contents(elements)[0]; h && !this.domNode.isList(h); null) {
                var nextSibling = h.nextSibling;
                prepend([h], firstNode);
                setStyleAttribute(elements, { 'list-style-type': 'none' });
                setStyleAttribute(firstNode, { 'list-style-type': '' });
                h = nextSibling;
            }
        }
        else if (firstNodeOL) {
            var nestedElement = createElement('li');
            prepend([nestedElement], firstNodeOL);
            for (var h = this.domNode.contents(elements)[0]; h && !this.domNode.isList(h); null) {
                var nextSibling = h.nextSibling;
                nestedElement.appendChild(h);
                h = nextSibling;
            }
            prepend([firstNodeOL], elements.parentNode);
            detach(elements);
            var nestedElementLI = createElement('li', { styles: 'list-style-type: none;' });
            prepend([nestedElementLI], firstNodeOL.parentNode);
            append([firstNodeOL], nestedElementLI);
        }
        else {
            var nestedElementLI = createElement('li', { styles: 'list-style-type: none;' });
            prepend([nestedElementLI], elements.parentNode);
            var nestedElement = createElement(elements.parentNode.tagName);
            prepend([nestedElement], nestedElementLI);
            append([elements], nestedElement);
        }
    };
    Lists.prototype.nestedList = function (elements) {
        var isNested = false;
        for (var i = 0; i < elements.length; i++) {
            var prevSibling = this.domNode.getPreviousNode(elements[i]);
            if (prevSibling) {
                isNested = true;
                var firstNode = void 0;
                var firstNodeLI = void 0;
                var siblingListOL = elements[i].querySelectorAll('ol, ul');
                var siblingListLI = elements[i]
                    .querySelectorAll('li');
                var siblingListLIFirst = this.domNode.contents(siblingListLI[0])[0];
                if (siblingListLI.length > 0 && (siblingListLIFirst.nodeName === 'OL' || siblingListLIFirst.nodeName === 'UL')) {
                    firstNodeLI = siblingListLI[0];
                }
                else {
                    firstNode = siblingListOL[0];
                }
                if (firstNode) {
                    var nestedElement = createElement('li');
                    prepend([nestedElement], firstNode);
                    for (var h = this.domNode.contents(elements[i])[0]; h && !this.domNode.isList(h); null) {
                        var nextSibling = h.nextSibling;
                        nestedElement.appendChild(h);
                        h = nextSibling;
                    }
                    append([firstNode], prevSibling);
                    detach(elements[i]);
                }
                else if (firstNodeLI) {
                    if (prevSibling.tagName === 'LI') {
                        for (var h = this.domNode.contents(elements[i])[0]; h && !this.domNode.isList(h); null) {
                            var nextSibling = h.nextSibling;
                            prepend([h], firstNodeLI);
                            setStyleAttribute(elements[i], { 'list-style-type': 'none' });
                            setStyleAttribute(firstNodeLI, { 'list-style-type': '' });
                            h = nextSibling;
                        }
                        append([firstNodeLI.parentNode], prevSibling);
                        detach(elements[i]);
                    }
                }
                else {
                    if (prevSibling.tagName === 'LI') {
                        var nestedElement = createElement(elements[i].parentNode.tagName);
                        append([nestedElement], prevSibling);
                        append([elements[i]], nestedElement);
                    }
                    else if (prevSibling.tagName === 'OL' || prevSibling.tagName === 'UL') {
                        append([elements[i]], prevSibling);
                    }
                }
            }
            else {
                var element = elements[i];
                isNested = true;
                this.noPreviousElement(element);
            }
        }
        return isNested;
    };
    Lists.prototype.applyListsHandler = function (e) {
        var range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
        if (Browser.userAgent.indexOf('Firefox') !== -1 && range.startContainer === range.endContainer && range.startContainer === this.parent.editableElement) {
            var startChildNodes = range.startContainer.childNodes;
            var startNode = ((startChildNodes[(range.startOffset > 0) ? (range.startOffset - 1) :
                range.startOffset]) || range.startContainer);
            var endNode = (range.endContainer.childNodes[(range.endOffset > 0) ? (range.endOffset - 1) :
                range.endOffset] || range.endContainer);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var lastSelectionNode = endNode.lastChild.nodeName === 'BR' ? (isNOU(endNode.lastChild.previousSibling) ? endNode
                : endNode.lastChild.previousSibling) : endNode.lastChild;
            while (!isNOU(lastSelectionNode) && lastSelectionNode.nodeName !== '#text' && lastSelectionNode.nodeName !== 'IMG' &&
                lastSelectionNode.nodeName !== 'BR' && lastSelectionNode.nodeName !== 'HR') {
                lastSelectionNode = lastSelectionNode.lastChild;
            }
            this.parent.nodeSelection.setSelectionText(this.parent.currentDocument, startNode, lastSelectionNode, 0, lastSelectionNode.textContent.length);
            range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
        }
        if (range.startContainer === range.endContainer && range.startContainer === this.parent.editableElement &&
            range.startOffset === range.endOffset && range.startOffset === 0 &&
            this.parent.editableElement.textContent.length === 0 && (this.parent.editableElement.childNodes[0].nodeName !== 'TABLE' &&
            this.parent.editableElement.childNodes[0].nodeName !== 'IMG')) {
            var focusNode = range.startContainer.childNodes[0];
            this.parent.nodeSelection.setSelectionText(this.parent.currentDocument, focusNode, focusNode, 0, 0);
            range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
        }
        this.saveSelection = this.parent.nodeSelection.save(range, this.parent.currentDocument);
        this.currentAction = e.subCommand;
        this.currentAction = e.subCommand = this.currentAction === 'NumberFormatList' ? 'OL' : this.currentAction === 'BulletFormatList' ? 'UL' : this.currentAction;
        this.domNode.setMarker(this.saveSelection);
        var listsNodes = this.domNode.blockNodes();
        if (e.enterAction === 'BR') {
            this.setSelectionBRConfig();
            var allSelectedNode = this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument);
            var selectedNodes = this.parent.nodeSelection.getSelectionNodes(allSelectedNode);
            var currentFormatNodes = [];
            if (selectedNodes.length === 0) {
                selectedNodes.push(listsNodes[0]);
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
                        tempElem = createElement('p');
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
            listsNodes = this.parent.domNode.blockNodes();
        }
        for (var i = 0; i < listsNodes.length; i++) {
            if (listsNodes[i].tagName === 'TABLE' && !range.collapsed) {
                listsNodes.splice(i, 1);
            }
            if (listsNodes.length > 0 && listsNodes[i].tagName !== 'LI'
                && 'LI' === listsNodes[i].parentNode.tagName) {
                listsNodes[i] = listsNodes[i].parentNode;
            }
        }
        this.applyLists(listsNodes, this.currentAction, e.selector, e.item, e);
        if (e.callBack) {
            e.callBack({
                requestType: this.currentAction,
                event: e.event,
                editorMode: 'HTML',
                range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                elements: this.parent.domNode.blockNodes()
            });
        }
    };
    Lists.prototype.setSelectionBRConfig = function () {
        var startElem = this.parent.editableElement.querySelector('.' + markerClassName.startSelection);
        var endElem = this.parent.editableElement.querySelector('.' + markerClassName.endSelection);
        if (isNOU(endElem)) {
            this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, startElem, 0);
        }
        else {
            this.parent.nodeSelection.setSelectionText(this.parent.currentDocument, startElem, endElem, 0, 0);
        }
    };
    Lists.prototype.applyLists = function (elements, type, selector, item, e) {
        var isReverse = true;
        if (this.isRevert(elements, type, item) && isNOU(item)) {
            this.revertList(elements, e);
            this.removeEmptyListElements();
        }
        else {
            this.checkLists(elements, type, item);
            for (var i = 0; i < elements.length; i++) {
                if (!isNOU(item) && !isNOU(item.listStyle)) {
                    if (item.listStyle === 'listImage') {
                        setStyleAttribute(elements[i], { 'list-style-image': item.listImage });
                    }
                    else {
                        setStyleAttribute(elements[i], { 'list-style-image': 'none' });
                        setStyleAttribute(elements[i], { 'list-style-type': item.listStyle.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() });
                    }
                }
                if (elements[i].getAttribute('contenteditable') === 'true'
                    && elements[i].childNodes.length === 1 && elements[i].childNodes[0].nodeName === 'TABLE') {
                    var listEle = document.createElement(type);
                    listEle.innerHTML = '<li><br/></li>';
                    elements[i].appendChild(listEle);
                }
                else if ('LI' !== elements[i].tagName && isNOU(item)) {
                    isReverse = false;
                    var elemAtt = elements[i].tagName === 'IMG' ? '' : this.domNode.attributes(elements[i]);
                    var openTag = '<' + type + '>';
                    var closeTag = '</' + type + '>';
                    var newTag = 'li' + elemAtt;
                    var replaceHTML = (elements[i].tagName.toLowerCase() === CONSTANT.DEFAULT_TAG ?
                        elements[i].innerHTML : elements[i].outerHTML);
                    var innerHTML = this.domNode.createTagString(newTag, null, replaceHTML);
                    var collectionString = openTag + innerHTML + closeTag;
                    this.domNode.replaceWith(elements[i], collectionString);
                }
                else if (!isNOU(item) && 'LI' !== elements[i].tagName) {
                    // eslint-disable-next-line
                    isReverse = false;
                    var elemAtt = elements[i].tagName === 'IMG' ? '' : this.domNode.attributes(elements[i]);
                    var openTag = '<' + type + elemAtt + '>';
                    var closeTag = '</' + type + '>';
                    var newTag = 'li';
                    var replaceHTML = (elements[i].tagName.toLowerCase() === CONSTANT.DEFAULT_TAG ?
                        elements[i].innerHTML : elements[i].outerHTML);
                    var innerHTML = this.domNode.createTagString(newTag, null, replaceHTML);
                    var collectionString = openTag + innerHTML + closeTag;
                    this.domNode.replaceWith(elements[i], collectionString);
                }
            }
        }
        this.cleanNode();
        this.parent.editableElement.focus();
        if (isIDevice()) {
            setEditFrameFocus(this.parent.editableElement, selector);
        }
        this.saveSelection = this.domNode.saveMarker(this.saveSelection);
        this.saveSelection.restore();
    };
    Lists.prototype.removeEmptyListElements = function () {
        var listElem = this.parent.editableElement.querySelectorAll('ol, ul');
        for (var i = 0; i < listElem.length; i++) {
            if (listElem[i].textContent.trim() === '') {
                detach(listElem[i]);
            }
        }
    };
    Lists.prototype.isRevert = function (nodes, tagName, item) {
        var isRevert = true;
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].tagName !== 'LI') {
                return false;
            }
            if (nodes[i].parentNode.tagName !== tagName ||
                isNOU(item) && nodes[i].parentNode.style.listStyleType !== '') {
                isRevert = false;
            }
        }
        return isRevert;
    };
    Lists.prototype.checkLists = function (nodes, tagName, item) {
        var nodesTemp = [];
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i].parentNode;
            if (!isNOU(item) && 'LI' === nodes[i].tagName && !isNOU(item.listStyle)) {
                if (item.listStyle === 'listImage') {
                    setStyleAttribute(node, { 'list-style-image': item.listImage });
                }
                else {
                    setStyleAttribute(node, { 'list-style-image': 'none' });
                    setStyleAttribute(node, { 'list-style-type': item.listStyle.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() });
                }
            }
            if ((nodes[i].tagName === 'LI' && node.tagName !== tagName && nodesTemp.indexOf(node) < 0) ||
                (nodes[i].tagName === 'LI' && node.tagName === tagName && nodesTemp.indexOf(node) < 0 && item !== null)) {
                nodesTemp.push(node);
            }
            if (isNOU(item) && (node.tagName === tagName ||
                ((node.tagName === 'UL' || node.tagName === 'OL') && node.hasAttribute('style')))) {
                if (node.hasAttribute('style')) {
                    node.removeAttribute('style');
                }
            }
        }
        for (var j = nodesTemp.length - 1; j >= 0; j--) {
            var h = nodesTemp[j];
            var replace = '<' + tagName.toLowerCase() + ' '
                + this.domNode.attributes(h) + '>' + h.innerHTML + '</' + tagName.toLowerCase() + '>';
            this.domNode.replaceWith(nodesTemp[j], replace);
        }
    };
    Lists.prototype.cleanNode = function () {
        var liParents = this.parent.editableElement.querySelectorAll('ol + ol, ul + ul');
        for (var c = 0; c < liParents.length; c++) {
            var node = liParents[c];
            if (this.domNode.isList(node.previousElementSibling) &&
                this.domNode.openTagString(node) === this.domNode.openTagString(node.previousElementSibling)) {
                var contentNodes = this.domNode.contents(node);
                for (var f = 0; f < contentNodes.length; f++) {
                    node.previousElementSibling.appendChild(contentNodes[f]);
                }
                node.parentNode.removeChild(node);
            }
            else if (!isNOU(node.getAttribute('level'))) {
                if (node.tagName === node.previousElementSibling.tagName) {
                    node.previousElementSibling.lastChild.append(node);
                }
            }
        }
    };
    Lists.prototype.findUnSelected = function (temp, elements) {
        temp = temp.slice().reverse();
        if (temp.length > 0) {
            var rightIndent = [];
            var indentElements = [];
            var lastElement = elements[elements.length - 1];
            var lastElementChild = [];
            var childElements = [];
            lastElementChild = (lastElement.childNodes);
            for (var z = 0; z < lastElementChild.length; z++) {
                if (lastElementChild[z].tagName === 'OL' || lastElementChild[z].tagName === 'UL') {
                    var childLI = lastElementChild[z]
                        .querySelectorAll('li');
                    if (childLI.length > 0) {
                        for (var y = 0; y < childLI.length; y++) {
                            childElements.push(childLI[y]);
                        }
                    }
                }
            }
            for (var i = 0; i < childElements.length; i++) {
                var count = 0;
                for (var j = 0; j < temp.length; j++) {
                    if (!childElements[i].contains((temp[j]))) {
                        count = count + 1;
                    }
                }
                if (count === temp.length) {
                    indentElements.push(childElements[i]);
                }
            }
            if (indentElements.length > 0) {
                for (var x = 0; x < indentElements.length; x++) {
                    if (this.domNode.contents(indentElements[x])[0].nodeName !== 'OL' &&
                        this.domNode.contents(indentElements[x])[0].nodeName !== 'UL') {
                        rightIndent.push(indentElements[x]);
                    }
                }
            }
            if (rightIndent.length > 0) {
                this.nestedList(rightIndent);
            }
        }
    };
    Lists.prototype.revertList = function (elements, e) {
        var temp = [];
        for (var i = elements.length - 1; i >= 0; i--) {
            for (var j = i - 1; j >= 0; j--) {
                if (elements[j].contains((elements[i])) || elements[j] === elements[i]) {
                    temp.push(elements[i]);
                    elements.splice(i, 1);
                    break;
                }
            }
        }
        this.findUnSelected(temp, elements);
        var viewNode = [];
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (this.domNode.contents(element)[0].nodeType === 3 && this.domNode.contents(element)[0].textContent.trim().length === 0) {
                detach(this.domNode.contents(element)[0]);
            }
            var parentNode = elements[i].parentNode;
            var className = element.getAttribute('class');
            if (temp.length === 0) {
                var siblingList = elements[i].querySelectorAll('ul, ol');
                var firstNode = siblingList[0];
                if (firstNode) {
                    var child = firstNode
                        .querySelectorAll('li');
                    if (child) {
                        var nestedElement = createElement(firstNode.tagName);
                        append([nestedElement], firstNode.parentNode);
                        var nestedElementLI = createElement('li', { styles: 'list-style-type: none;' });
                        append([nestedElementLI], nestedElement);
                        append([firstNode], nestedElementLI);
                    }
                }
            }
            if (element.parentNode.insertBefore(this.closeTag(parentNode.tagName), element),
                'LI' === parentNode.parentNode.tagName || 'OL' === parentNode.parentNode.tagName ||
                    'UL' === parentNode.parentNode.tagName) {
                element.parentNode.insertBefore(this.closeTag('LI'), element);
            }
            else {
                var classAttr = '';
                if (className) {
                    // eslint-disable-next-line
                    classAttr += ' class="' + className + '"';
                }
                if (CONSTANT.DEFAULT_TAG && 0 === element.querySelectorAll(CONSTANT.BLOCK_TAGS.join(', ')).length) {
                    var wrapperclass = isNullOrUndefined(className) ? ' class="e-rte-wrap-inner"' :
                        ' class="' + className + ' e-rte-wrap-inner"';
                    var wrapper = '<' + CONSTANT.DEFAULT_TAG + wrapperclass +
                        this.domNode.attributes(parentNode) + '></' + CONSTANT.DEFAULT_TAG + '>';
                    if (e.enterAction !== 'BR') {
                        this.domNode.wrapInner(element, this.domNode.parseHTMLFragment(wrapper));
                    }
                }
                else if (this.domNode.contents(element)[0].nodeType === 3) {
                    var replace = this.domNode.createTagString(CONSTANT.DEFAULT_TAG, parentNode, this.parent.domNode.encode(this.domNode.contents(element)[0].textContent));
                    this.domNode.replaceWith(this.domNode.contents(element)[0], replace);
                }
                else if (this.domNode.contents(element)[0].classList.contains(markerClassName.startSelection) ||
                    this.domNode.contents(element)[0].classList.contains(markerClassName.endSelection)) {
                    var replace = this.domNode.createTagString(CONSTANT.DEFAULT_TAG, parentNode, this.domNode.contents(element)[0].outerHTML);
                    this.domNode.replaceWith(this.domNode.contents(element)[0], replace);
                }
                else {
                    var childNode = element.firstChild;
                    className = childNode.getAttribute('class');
                    attributes(childNode, this.domNode.rawAttributes(parentNode));
                    if (className && childNode.getAttribute('class')) {
                        attributes(childNode, { 'class': className + ' ' + childNode.getAttribute('class') });
                    }
                }
                append([this.openTag('LI')], element);
                prepend([this.closeTag('LI')], element);
            }
            this.domNode.insertAfter(this.openTag(parentNode.tagName), element);
            if (parentNode.parentNode.tagName === 'LI') {
                parentNode = parentNode.parentNode.parentNode;
            }
            if (viewNode.indexOf(parentNode) < 0) {
                viewNode.push(parentNode);
            }
        }
        for (var i = 0; i < viewNode.length; i++) {
            var node = viewNode[i];
            var nodeInnerHtml = node.innerHTML;
            var closeTag = /<span class="e-rte-list-close-([a-z]*)"><\/span>/g;
            var openTag = /<span class="e-rte-list-open-([a-z]*)"><\/span>/g;
            nodeInnerHtml = nodeInnerHtml.replace(closeTag, '</$1>');
            nodeInnerHtml = nodeInnerHtml.replace(openTag, '<$1 ' + this.domNode.attributes(node) + '>');
            this.domNode.replaceWith(node, this.domNode.openTagString(node) + nodeInnerHtml.trim() + this.domNode.closeTagString(node));
        }
        var emptyUl = this.parent.editableElement.querySelectorAll('ul:empty, ol:empty');
        for (var i = 0; i < emptyUl.length; i++) {
            detach(emptyUl[i]);
        }
        var emptyLi = this.parent.editableElement.querySelectorAll('li:empty');
        for (var i = 0; i < emptyLi.length; i++) {
            detach(emptyLi[i]);
        }
    };
    Lists.prototype.openTag = function (type) {
        return this.domNode.parseHTMLFragment('<span class="e-rte-list-open-' + type.toLowerCase() + '"></span>');
    };
    Lists.prototype.closeTag = function (type) {
        return this.domNode.parseHTMLFragment('<span class="e-rte-list-close-' + type.toLowerCase() + '"></span>');
    };
    return Lists;
}());
export { Lists };
